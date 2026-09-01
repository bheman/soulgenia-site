import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import sql from "@/lib/db";

/**
 * VOCABULARIO DE EVENTOS — tres camadas que precisam andar JUNTAS:
 *   1. `AnalyticsEvent` em lib/analytics.ts   (o que o cliente pode emitir)
 *   2. este enum zod                          (o que a borda aceita)
 *   3. o CHECK de `event_name` em db/migrations (o que o banco grava)
 *
 * Ate 2026-09-01 a camada 2 tinha 14 valores, a 3 tinha 8 e a 1 tinha 16. Os
 * eventos de quiz passavam no zod, violavam o CHECK, e o erro era engolido por
 * um catch que devolvia 202. Guarda que prende as tres:
 * funil-api/test/analytics-event-vocabulary.test.js
 */
const EventSchema = z.object({
  event: z.enum([
    "landing_view",
    "cta_clicked",
    "trial_form_viewed",
    "trial_form_submitted",
    "trial_form_error",
    "pricing_tier_viewed",
    "faq_item_opened",
    "demo_video_played",
    "quiz_view",
    "quiz_started",
    "quiz_step_completed",
    "quiz_submitted",
    "quiz_result_viewed",
    "quiz_cta_clicked",
    // diagnostico-ia-v1 — emitidos pelo componente e declarados em
    // lib/analytics.ts desde sempre, mas nunca adicionados aqui: davam 422.
    "calculator_shown",
    "schedule_click",
  ]),
  properties: z
    .object({
      variant: z.enum(["exausto", "escala", "conta", "default"]).optional(),
      page: z.string().max(120).optional(),
      position: z.string().max(120).optional(),
      destination: z.string().max(120).optional(),
      href: z.string().max(1000).optional(),
      path: z.string().max(500).optional(),
      utm_source: z.string().max(200).optional(),
      utm_medium: z.string().max(200).optional(),
      utm_campaign: z.string().max(200).optional(),
      utm_content: z.string().max(200).optional(),
      referrer: z.string().max(500).optional(),
    })
    .catchall(z.union([z.string(), z.number(), z.boolean(), z.undefined()]))
    .optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ accepted: false }, { status: 400 });
  }

  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ accepted: false }, { status: 422 });
  }

  try {
    const properties = parsed.data.properties ?? {};
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") ?? undefined;

    await sql`
      INSERT INTO landing_events (
        event_name, landing_variant, page, position, destination, href, path,
        utm_source, utm_medium, utm_campaign, utm_content, referrer, properties,
        user_agent, ip
      ) VALUES (
        ${parsed.data.event},
        ${properties.variant ?? "default"},
        ${properties.page ?? null},
        ${properties.position ?? null},
        ${properties.destination ?? null},
        ${properties.href ?? null},
        ${properties.path ?? null},
        ${properties.utm_source ?? null},
        ${properties.utm_medium ?? null},
        ${properties.utm_campaign ?? null},
        ${properties.utm_content ?? null},
        ${properties.referrer ?? null},
        ${sql.json(properties)},
        ${userAgent ?? null},
        ${ip ? sql`${ip}::inet` : null}
      )
    `;
  } catch (err) {
    // NAO engolir. A versao anterior logava e devolvia 202 { accepted: true }:
    // uma falha de escrita virava sucesso silencioso, e foi assim que os
    // eventos de quiz ficaram meses sem gravar sem ninguem perceber.
    // O unico chamador (lib/analytics.ts) usa sendBeacon/void fetch e ignora a
    // resposta, entao o 500 nao quebra UX — ele aparece em log e monitoramento,
    // que e' exatamente o ponto.
    console.error("[api/event] failed to persist landing event:", err);
    return NextResponse.json(
      { accepted: false, error: "persist_failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ accepted: true }, { status: 202 });
}

function getClientIp(request: NextRequest): string | undefined {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? undefined;
}
