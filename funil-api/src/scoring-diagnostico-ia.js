// Pontuação + CALCULADORA do funil "Diagnóstico de IA" (diagnostico-ia-v1).
//
// Diferente do soulgenia-v1, este funil não pontua encaixe para teste guiado:
// ele qualifica pelo TAMANHO DA OPERAÇÃO DE ATENDIMENTO e devolve um número —
// horas/mês e custo/mês do atendimento manual — que é a tela de resultado.
//
// Rotas:
//   self_serve_genia     → 1 pessoa atendendo: o caminho é a página da Gênia.
//   agendar_diagnostico  → 2+ pessoas: vale uma conversa de 20 min (grátis).
//   nurture              → sem sinal suficiente para calcular.
//   hard_disqualified    → regras de conduta compartilhadas (scoring-shared).

import { findHardDisqualifiers } from "./scoring-shared.js";

export const DIAGNOSTICO_IA_SCORING_VERSION = "diagnostico-ia-v1-2026-08-08";

// Ponto médio de cada faixa. A calculadora é uma ESTIMATIVA declarada como tal
// na tela — o meio da faixa erra menos que qualquer extremo.
const ATTENDANTS_MID = { "1": 1, "2-3": 2.5, "4-10": 7, "10+": 12 };
const HOURS_MID = { "1-2": 1.5, "3-4": 3.5, "5-6": 5.5, "7+": 8 };
const COST_MID = { "ate-1800": 1600, "1800-2500": 2150, "2500-4000": 3250, "4000+": 5000 };

/** 22 dias úteis/mês; 176 = 22 × 8h converte salário mensal em custo/hora. */
export const WORKDAYS_PER_MONTH = 22;
export const HOURS_PER_MONTH_FULL_TIME = 176;

export function computeAttendanceCost(answers) {
  const attendants = ATTENDANTS_MID[answers.attendants];
  const hoursPerDay = HOURS_MID[answers.hours_per_day];
  const costPerPerson = COST_MID[answers.avg_cost];

  if (!attendants || !hoursPerDay) {
    return null;
  }

  const horasMes = attendants * hoursPerDay * WORKDAYS_PER_MONTH;
  // Sem faixa de custo respondida, o custo fica de fora — a tela mostra só as
  // horas. Nunca inventar um salário médio que a pessoa não declarou.
  const custoMes = costPerPerson
    ? Math.round(horasMes * (costPerPerson / HOURS_PER_MONTH_FULL_TIME))
    : null;

  return {
    horas_mes: Math.round(horasMes),
    custo_mes: custoMes,
  };
}

export function scoreDiagnosticoIaLead(input) {
  const answers = input?.answers || {};
  const contact = input?.contact || {};
  const hardDisqualifiers = findHardDisqualifiers(answers, contact);
  const computed = computeAttendanceCost(answers);

  // O "score" aqui é o tamanho da operação — serve para ordenar leads no admin,
  // não para gate. A rota decide por atendentes, não por pontos.
  const scoreBreakdown = {
    attendants: ATTENDANTS_MID[answers.attendants] ?? 0,
    hours_per_day: HOURS_MID[answers.hours_per_day] ?? 0,
  };
  const score = Math.round(scoreBreakdown.attendants * scoreBreakdown.hours_per_day);

  const route = routeDiagnosticoIaLead({ answers, hardDisqualifiers });

  return {
    scoring_version: DIAGNOSTICO_IA_SCORING_VERSION,
    score,
    score_breakdown: scoreBreakdown,
    hard_disqualifiers: hardDisqualifiers,
    route,
    crm_status: routeToCrmStatus(route),
    summary: buildSummary(answers),
    computed,
  };
}

export function routeDiagnosticoIaLead({ answers, hardDisqualifiers }) {
  if (hardDisqualifiers.length > 0) {
    return "hard_disqualified";
  }

  if (answers.attendants === "1") {
    return "self_serve_genia";
  }

  if (["2-3", "4-10", "10+"].includes(answers.attendants)) {
    return "agendar_diagnostico";
  }

  return "nurture";
}

/**
 * Destinos por rota. O link de agendamento vem por env — a conta da ferramenta
 * (Cal.com, decisão D6 do plano) ainda não existe; sem env, a rota consultiva
 * cai no wa.me do 0633 com prefixo PRÓPRIO deste funil, que a lane
 * genia_presales do support-router reconhece (deployada 2026-08-08).
 */
export function buildDiagnosticoIaRoutingTarget(route, env = process.env) {
  if (route === "self_serve_genia") {
    return env.DIAG_IA_GENIA_URL || "https://soulgenia.com.br/genia";
  }

  if (route === "agendar_diagnostico") {
    const schedule = (env.DIAG_IA_SCHEDULE_URL || "").trim();
    if (schedule) {
      return schedule;
    }
    const message = "Oi, quero agendar a conversa de 20 min do diagnostico de IA.";
    return `https://wa.me/554885040633?text=${encodeURIComponent(message)}`;
  }

  return null;
}

/**
 * Interpola {{horas_mes}} / {{custo_mes}} nos textos de resultado. Sem valor
 * calculado, remove a FRASE-PLACEHOLDER inteira (delimitada por {{? ... ?}})
 * em vez de deixar um buraco no texto.
 */
export function renderResultCopy(copy, computed) {
  if (!copy) {
    return copy;
  }

  const horas = computed?.horas_mes;
  const custo = computed?.custo_mes;

  const interpolate = (text) => {
    if (typeof text !== "string") {
      return text;
    }
    let out = text.replace(/\{\{\?([^]*?)\?\}\}/g, (_m, inner) => {
      return custo == null && /\{\{custo_mes\}\}/.test(inner) ? "" : inner;
    });
    out = out
      .replace(/\{\{horas_mes\}\}/g, horas != null ? formatNumberBr(horas) : "algumas")
      .replace(/\{\{custo_mes\}\}/g, custo != null ? formatBrl(custo) : "");
    return out.replace(/\s{2,}/g, " ").trim();
  };

  return {
    ...copy,
    title: interpolate(copy.title),
    body: interpolate(copy.body),
  };
}

export function formatNumberBr(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatBrl(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function routeToCrmStatus(route) {
  if (route === "agendar_diagnostico") {
    return "qualified";
  }
  if (route === "self_serve_genia") {
    return "qualifying";
  }
  return route;
}

function buildSummary(answers) {
  return {
    attendants: answers.attendants || "not_provided",
    hours_per_day: answers.hours_per_day || "not_provided",
    avg_cost: answers.avg_cost || "not_provided",
    client_value: answers.client_value || "not_provided",
    ai_today: answers.ai_today || "not_provided",
  };
}
