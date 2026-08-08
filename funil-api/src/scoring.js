import { findHardDisqualifiers } from "./scoring-shared.js";
import {
  scoreDiagnosticoIaLead,
  buildDiagnosticoIaRoutingTarget,
} from "./scoring-diagnostico-ia.js";

export const SCORING_VERSION = "soulgenia-v1-2026-06-23";

// ---------------------------------------------------------------------------
// Despacho por slug. O soulgenia-v1 é o default e mantém comportamento
// IDÊNTICO (os testes existentes são o ratchet disso); cada funil novo entra
// com um case aqui e um módulo próprio de pontuação.
// ---------------------------------------------------------------------------

export function scoreLead(slug, input) {
  if (slug === "diagnostico-ia-v1") {
    return scoreDiagnosticoIaLead(input);
  }
  return scoreSoulGeniaLead(input);
}

export function buildRoutingTargetFor(slug, route, answers, env = process.env) {
  if (slug === "diagnostico-ia-v1") {
    return buildDiagnosticoIaRoutingTarget(route, env);
  }
  return buildRoutingTarget(route, answers);
}

const VOLUME_POINTS = {
  "0-5": 0,
  "6-15": 1,
  "16-40": 2,
  "40+": 3
};

const BUSINESS_PAIN = new Set(["lead", "follow_up", "scheduling", "payment", "post_sale"]);
const LIGHT_PAIN = new Set(["reminders", "organization"]);
const CLEAR_PAIN = new Set([...BUSINESS_PAIN, ...LIGHT_PAIN]);
const CONCRETE_WORDS = 5;

export function scoreSoulGeniaLead(input) {
  const answers = input?.answers || {};
  const contact = input?.contact || {};
  const hardDisqualifiers = findHardDisqualifiers(answers, contact);

  const scoreBreakdown = {
    message_volume: VOLUME_POINTS[answers.message_volume] ?? 0,
    main_pain: scorePain(answers.main_pain),
    whatsapp_business: scoreWhatsAppBusiness(answers.whatsapp_business),
    guided_setup: scoreGuidedSetup(answers.guided_setup),
    workflow_this_week: scoreWorkflow(answers.workflow_this_week)
  };

  const score = Object.values(scoreBreakdown).reduce((sum, value) => sum + value, 0);
  const route = routeSoulGeniaLead({ answers, score, hardDisqualifiers });

  return {
    scoring_version: SCORING_VERSION,
    score,
    score_breakdown: scoreBreakdown,
    hard_disqualifiers: hardDisqualifiers,
    route,
    crm_status: routeToCrmStatus(route),
    summary: buildLeadSummary(answers)
  };
}

export function routeSoulGeniaLead({ answers, score, hardDisqualifiers }) {
  if (hardDisqualifiers.length > 0) {
    return "hard_disqualified";
  }

  const concreteWorkflow = isConcreteWorkflow(answers.workflow_this_week);
  const guidedFit = answers.guided_setup === "yes" || answers.guided_setup === "open";
  const whatsappFit = answers.whatsapp_business === "yes" || answers.whatsapp_business === "not_yet";

  if (score >= 9 && concreteWorkflow && guidedFit && whatsappFit) {
    return "qualified_trial";
  }

  if (score >= 5 && score <= 8 && hasClearPain(answers.main_pain)) {
    return "nurture";
  }

  return "waitlist_poor_fit";
}

export function buildRoutingTarget(route, answers) {
  if (route !== "qualified_trial") {
    return null;
  }

  const summary = buildLeadSummary(answers);
  const message = [
    "Oi, vim pelo diagnostico da Soul Genia.",
    `Perfil: ${summary.profession}.`,
    `Volume: ${summary.message_volume}.`,
    `Dor principal: ${summary.main_pain}.`,
    `Fluxo desta semana: ${summary.workflow_this_week}.`
  ].join(" ");

  return `https://wa.me/554885040633?text=${encodeURIComponent(message)}`;
}

export function isConcreteWorkflow(value) {
  if (typeof value !== "string") {
    return false;
  }

  const text = value.trim().toLowerCase();
  if (!text || text.length < 12) {
    return false;
  }

  const weak = new Set(["nada", "nao sei", "não sei", "nenhum", "teste", "ver", "entender"]);
  if (weak.has(text)) {
    return false;
  }

  return text.split(/\s+/).filter(Boolean).length >= CONCRETE_WORDS;
}

export function hasClearPain(value) {
  return CLEAR_PAIN.has(value);
}

function scorePain(value) {
  if (BUSINESS_PAIN.has(value)) {
    return 2;
  }

  if (LIGHT_PAIN.has(value)) {
    return 1;
  }

  return 0;
}

function scoreWhatsAppBusiness(value) {
  if (value === "yes") {
    return 2;
  }

  if (value === "not_yet") {
    return 1;
  }

  return 0;
}

function scoreGuidedSetup(value) {
  if (value === "yes") {
    return 2;
  }

  if (value === "open") {
    return 1;
  }

  if (value === "self_service_only") {
    return -3;
  }

  return 0;
}

function scoreWorkflow(value) {
  if (isConcreteWorkflow(value)) {
    return 3;
  }

  if (typeof value === "string" && value.trim().length >= 6) {
    return 1;
  }

  return 0;
}

function routeToCrmStatus(route) {
  if (route === "qualified_trial") {
    return "qualified";
  }

  if (route === "nurture") {
    return "qualifying";
  }

  return route;
}

function buildLeadSummary(answers) {
  return {
    profession: answers.profession || "not_provided",
    message_volume: answers.message_volume || "not_provided",
    main_pain: answers.main_pain || "not_provided",
    workflow_this_week: answers.workflow_this_week || "not_provided"
  };
}
