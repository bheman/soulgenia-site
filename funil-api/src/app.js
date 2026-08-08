import express from "express";
import cors from "cors";
import { getFunnelConfig, listFunnelConfigs } from "./config/index.js";
import { scoreLead, buildRoutingTargetFor } from "./scoring.js";
import { renderResultCopy } from "./scoring-diagnostico-ia.js";
import { createRepository, hashIp } from "./store.js";
import { sendLeadEvent } from "./meta-capi.js";
import { notifyNewLead } from "./notify.js";
import { sendDiagnosticEmail } from "./send-email.js";

export function createApp({ repository = createRepository(), env = process.env } = {}) {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "256kb" }));

  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "funil-api",
      funnels: listFunnelConfigs().map((config) => config.slug),
      capi_mode: env.CAPI_MODE || "disabled"
    });
  });

  app.get("/funil/:slug/config", (req, res) => {
    const config = getFunnelConfig(req.params.slug);
    if (!config) {
      res.status(404).json({ error: "funnel_not_found" });
      return;
    }

    res.json({ config: publicConfig(config) });
  });

  app.post("/funil/:slug/submit", async (req, res, next) => {
    try {
      const config = getFunnelConfig(req.params.slug);
      if (!config) {
        res.status(404).json({ error: "funnel_not_found" });
        return;
      }

      const payload = normalizeSubmitPayload(req.body);

      // Sem e-mail valido o ramo `nurture` nao tem como entregar nada — e a tela
      // promete "receber exemplos". Recusar aqui e melhor que gravar um lead que
      // nasce impossivel de atender.
      if (!isLikelyEmail(payload.contact.email)) {
        res.status(422).json({ error: "email_invalido" });
        return;
      }

      const scoring = scoreLead(config.slug, payload);
      const routingTarget = buildRoutingTargetFor(config.slug, scoring.route, payload.answers, env);
      const capi = await sendLeadEvent({ env, route: scoring.route });

      const saved = await repository.saveResponse({
        funil_slug: config.slug,
        funil_version: config.version,
        scoring_version: scoring.scoring_version,
        bucket: payload.bucket || null,
        answers: payload.answers,
        contact: payload.contact,
        consent: {
          consent_contact: payload.contact.consent_contact === true,
          privacy_ack: payload.contact.privacy_ack === true
        },
        score: scoring.score,
        route: scoring.route,
        routing_target: routingTarget,
        hard_disqualifiers: scoring.hard_disqualifiers,
        utm: payload.utm,
        user_agent: req.get("user-agent") || null,
        ip_hash: hashIp(req.ip),
        meta_capi_mode: capi.mode,
        meta_capi_sent: capi.sent,
        meta_capi_event_id: capi.event_id
      });

      if (scoring.route === "waitlist_poor_fit" || scoring.route === "nurture") {
        await repository.saveWaitlist({
          funil_slug: config.slug,
          contact: payload.contact,
          reason: scoring.route,
          source_response_id: saved.id
        });
      }

      // O diagnóstico personalizado, por e-mail. Fica DEPOIS de salvar: o lead
      // já está seguro, e uma falha aqui custa um e-mail — nunca o lead.
      // sendDiagnosticEmail NUNCA lança (contrato do módulo).
      // Só o soulgenia-v1: o texto do e-mail é escrito em cima das respostas
      // DAQUELE questionário; mandá-lo para o funil novo sairia sem sentido.
      const email =
        config.slug === "soulgenia-v1"
          ? await sendDiagnosticEmail({
              env,
              contact: payload.contact,
              answers: payload.answers,
              route: scoring.route,
              waUrl: routingTarget
            })
          : { sent: false, reason: "email_nao_escrito_para_este_funil" };
      if (!email.sent) {
        console.warn(
          `[funil] lead ${saved.id}: DIAGNOSTICO NAO ENVIADO: ${email.reason}` +
            (email.detail ? ` (${email.detail})` : "")
        );
      }

      // Aviso de lead novo. Fica DEPOIS de salvar de propósito: o lead já está
      // seguro no banco, então uma falha aqui custa um aviso — nunca o lead.
      // notifyNewLead NUNCA lança (contrato do módulo), mas o await fica dentro
      // do try do handler de qualquer forma.
      const aviso = await notifyNewLead({
        env,
        route: scoring.route,
        score: scoring.score,
        contact: payload.contact,
        answers: payload.answers,
        routingTarget,
        emailEnviado: email.sent
      });
      if (!aviso.sent) {
        // Visível no log: um lead que entrou sem ninguém saber é exatamente o
        // problema que este módulo existe para acabar.
        console.warn(
          `[funil] lead ${saved.id} salvo mas AVISO NAO ENVIADO: ${aviso.reason}` +
            (aviso.detail ? ` (${aviso.detail})` : "")
        );
      }

      res.json({
        response_id: saved.id,
        scoring_version: scoring.scoring_version,
        score: scoring.score,
        score_breakdown: scoring.score_breakdown,
        route: scoring.route,
        crm_status: scoring.crm_status,
        hard_disqualifiers: scoring.hard_disqualifiers,
        routing_target: routingTarget,
        // Placeholders ({{horas_mes}}/{{custo_mes}}) interpolados no servidor;
        // para configs sem placeholder o texto passa intacto.
        result: renderResultCopy(config.results[scoring.route], scoring.computed),
        computed: scoring.computed ?? null,
        capi: {
          mode: capi.mode,
          sent: capi.sent,
          event_id: capi.event_id,
          reason: capi.reason
        }
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/funil/:slug/waitlist", async (req, res, next) => {
    try {
      const config = getFunnelConfig(req.params.slug);
      if (!config) {
        res.status(404).json({ error: "funnel_not_found" });
        return;
      }

      const saved = await repository.saveWaitlist({
        funil_slug: config.slug,
        contact: req.body?.contact || {},
        reason: req.body?.reason || "manual_waitlist"
      });

      res.json({ waitlist_id: saved.id });
    } catch (error) {
      next(error);
    }
  });

  app.get("/admin/leads", requireAdmin(env), async (req, res, next) => {
    try {
      const limit = Math.min(Number(req.query.limit || 50), 200);
      const rows = await repository.listResponses({ slug: req.query.slug, limit });
      res.json({ leads: rows });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _req, res, _next) => {
    res.status(500).json({
      error: "internal_error",
      message: env.NODE_ENV === "production" ? "Unexpected error" : error.message
    });
  });

  return app;
}

function publicConfig(config) {
  return {
    slug: config.slug,
    client: config.client,
    version: config.version,
    routePath: config.routePath,
    scoringVersion: config.scoringVersion,
    account: config.account,
    questions: config.questions,
    results: config.results,
    events: config.events
  };
}

function normalizeSubmitPayload(body) {
  const contact = { ...(body?.contact || {}) };

  // E-mail normalizado no SERVIDOR. Validacao de cliente nao vale nada: qualquer
  // um posta direto no endpoint. Guardamos sempre em minusculas e sem espaco —
  // e a chave por onde a entrega vai sair.
  if (typeof contact.email === "string") {
    contact.email = contact.email.trim().toLowerCase();
  }

  return {
    answers: body?.answers || {},
    contact,
    utm: body?.utm || {},
    bucket: body?.bucket || null
  };
}

/**
 * Forma basica, de proposito frouxa. Regex agressiva rejeita endereco legitimo
 * (dominio novo, TLD longo, `+tag`) e o custo disso e PERDER UM LEAD — pior que
 * aceitar um digitado errado, que o bounce revela depois.
 */
function isLikelyEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
}

function requireAdmin(env) {
  return (req, res, next) => {
    const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }

    next();
  };
}
