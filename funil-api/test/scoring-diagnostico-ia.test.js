import test from "node:test";
import assert from "node:assert/strict";
import {
  scoreDiagnosticoIaLead,
  computeAttendanceCost,
  buildDiagnosticoIaRoutingTarget,
  renderResultCopy,
  WORKDAYS_PER_MONTH
} from "../src/scoring-diagnostico-ia.js";

const contactOk = {
  name: "Maria Teste",
  whatsapp: "5548999990101",
  email: "maria@example.com",
  consent_contact: true,
  privacy_ack: true
};

// ---------------------------------------------------------------------------
// Calculadora — valores EXATOS. Estes números são o ratchet: trocar o 22 por
// qualquer outra coisa (ou um ponto médio de faixa) quebra aqui.
// ---------------------------------------------------------------------------

test("calculadora: 3-10 pessoas × 3-4h = 6 × 3.5 × 22 = 462 horas/mes", () => {
  const c = computeAttendanceCost({ attendants: "3-10", hours_per_day: "3-4", avg_cost: "2500-4000" });
  assert.equal(c.horas_mes, 462); // 6 * 3.5 * 22 = 462
  // custo = 462 * (3250/176) = 8531.25 → 8531
  assert.equal(c.custo_mes, 8531);
});

test("calculadora: a faixa NOVA de 2 pessoas tem ponto medio 2 (nao 2.5 da faixa antiga)", () => {
  const c = computeAttendanceCost({ attendants: "2", hours_per_day: "3-4", avg_cost: "2500-4000" });
  assert.equal(c.horas_mes, 154); // 2 * 3.5 * 22 = 154
  assert.equal(c.custo_mes, 2844); // 154 * (3250/176) = 2843.75 → 2844
});

test("ratchet: as faixas ANTIGAS de attendants nao calculam mais nada", () => {
  // "2-3" e "4-10" sairam do config em 2026-08-31. Se voltarem ao ATTENDANTS_MID
  // por descuido, este teste morde.
  assert.equal(computeAttendanceCost({ attendants: "2-3", hours_per_day: "3-4" }), null);
  assert.equal(computeAttendanceCost({ attendants: "4-10", hours_per_day: "3-4" }), null);
});

test("calculadora: 1 pessoa × 1-2h = 1 × 1.5 × 22 = 33 horas/mes", () => {
  const c = computeAttendanceCost({ attendants: "1", hours_per_day: "1-2", avg_cost: "ate-1800" });
  assert.equal(c.horas_mes, 33);
  assert.equal(c.custo_mes, 300); // 33 * (1600/176) = 300
});

test("ratchet negativo: a constante de dias uteis e 22 — o calculo DEPENDE dela", () => {
  assert.equal(WORKDAYS_PER_MONTH, 22);
  const c = computeAttendanceCost({ attendants: "10+", hours_per_day: "7+" });
  // 12 × 8 × 22 = 2112. Se alguem trocar o 22, este numero muda e o teste morde.
  assert.equal(c.horas_mes, 2112);
});

test("sem faixa de custo → horas calculadas, custo null (nunca inventar salario)", () => {
  const c = computeAttendanceCost({ attendants: "3-10", hours_per_day: "5-6" });
  assert.equal(c.horas_mes, 726); // 6 × 5.5 × 22 = 726
  assert.equal(c.custo_mes, null);
});

test("sem attendants ou horas → computed null (a tela nao mostra numero inventado)", () => {
  assert.equal(computeAttendanceCost({ hours_per_day: "3-4" }), null);
  assert.equal(computeAttendanceCost({ attendants: "3-10" }), null);
});

// ---------------------------------------------------------------------------
// Rotas
// ---------------------------------------------------------------------------

test("1 pessoa atendendo → self_serve_genia", () => {
  const s = scoreDiagnosticoIaLead({
    answers: { attendants: "1", hours_per_day: "3-4", avg_cost: "ate-1800", client_value: "200-1000", ai_today: "no" },
    contact: contactOk
  });
  assert.equal(s.route, "self_serve_genia");
  assert.equal(s.crm_status, "qualifying");
});

// O CORTE DE ICP (decisao D2, 2026-08-31): o diagnostico pago comeca em >= 3
// pessoas no atendimento. A faixa antiga "2-3" ficava dos dois lados da linha;
// foi partida em "2" e "3-10". Os dois testes abaixo sao o ratchet dessa linha:
// reverter routeDiagnosticoIaLead para a lista antiga derruba os dois.
test("2 pessoas → self_serve_genia: ABAIXO do corte de ICP, nao vira lead pago", () => {
  const s = scoreDiagnosticoIaLead({
    answers: { attendants: "2", hours_per_day: "5-6", avg_cost: "1800-2500", ai_today: "chatgpt_pontual" },
    contact: contactOk
  });
  assert.equal(s.route, "self_serve_genia");
  assert.equal(s.crm_status, "qualifying");
});

test("3-10 e 10+ → agendar_diagnostico (crm qualified)", () => {
  for (const attendants of ["3-10", "10+"]) {
    const s = scoreDiagnosticoIaLead({
      answers: { attendants, hours_per_day: "5-6", avg_cost: "1800-2500", ai_today: "chatgpt_pontual" },
      contact: contactOk
    });
    assert.equal(s.route, "agendar_diagnostico", attendants);
    assert.equal(s.crm_status, "qualified");
  }
});

test("as faixas ANTIGAS nao roteiam mais para lugar nenhum (caem em nurture)", () => {
  for (const attendants of ["2-3", "4-10"]) {
    const s = scoreDiagnosticoIaLead({
      answers: { attendants, hours_per_day: "5-6", avg_cost: "1800-2500", ai_today: "chatgpt_pontual" },
      contact: contactOk
    });
    assert.equal(s.route, "nurture", attendants);
  }
});

test("o scoring_version foi bumpado junto com a mudanca de faixa", () => {
  const s = scoreDiagnosticoIaLead({
    answers: { attendants: "3-10", hours_per_day: "5-6" },
    contact: contactOk
  });
  assert.equal(s.scoring_version, "diagnostico-ia-v1-2026-08-31");
});

test("sem attendants → nurture", () => {
  const s = scoreDiagnosticoIaLead({ answers: { ai_today: "no" }, contact: contactOk });
  assert.equal(s.route, "nurture");
  assert.equal(s.computed, null);
});

test("desqualificador de conduta compartilhado morde igual ao funil antigo", () => {
  const s = scoreDiagnosticoIaLead({
    answers: { attendants: "3-10", hours_per_day: "7+", other_text: "quero disparo em massa para lista comprada" },
    contact: contactOk
  });
  assert.equal(s.route, "hard_disqualified");
  assert.ok(s.hard_disqualifiers.includes("spam_or_scraping_intent"));
});

test("sem consentimento → hard_disqualified (mesma regra da casa)", () => {
  const s = scoreDiagnosticoIaLead({
    answers: { attendants: "3-10", hours_per_day: "3-4" },
    contact: { ...contactOk, consent_contact: false }
  });
  assert.equal(s.route, "hard_disqualified");
});

// ---------------------------------------------------------------------------
// Destinos
// ---------------------------------------------------------------------------

test("self_serve_genia aponta para a pagina da Genia (mao unica)", () => {
  assert.equal(buildDiagnosticoIaRoutingTarget("self_serve_genia", {}), "https://soulgenia.com.br/genia");
});

test("agendar_diagnostico usa DIAG_IA_SCHEDULE_URL quando setada", () => {
  const target = buildDiagnosticoIaRoutingTarget("agendar_diagnostico", {
    DIAG_IA_SCHEDULE_URL: "https://cal.com/exemplo/20min"
  });
  assert.equal(target, "https://cal.com/exemplo/20min");
});

test("agendar_diagnostico sem env cai no wa.me 0633 com prefixo PROPRIO do funil", () => {
  const target = buildDiagnosticoIaRoutingTarget("agendar_diagnostico", {});
  assert.match(target, /^https:\/\/wa\.me\/554885040633\?text=/);
  assert.match(decodeURIComponent(target), /agendar a conversa de 20 min do diagnostico de IA/);
});

test("nurture e hard_disqualified nao tem destino", () => {
  assert.equal(buildDiagnosticoIaRoutingTarget("nurture", {}), null);
  assert.equal(buildDiagnosticoIaRoutingTarget("hard_disqualified", {}), null);
});

// ---------------------------------------------------------------------------
// Interpolação
// ---------------------------------------------------------------------------

test("placeholders interpolam com formato pt-BR", () => {
  const copy = {
    title: "sua equipe gasta {{horas_mes}} horas",
    body: "{{? Custa {{custo_mes}} por mes. ?}} Vamos conversar.",
    cta: "x"
  };
  const out = renderResultCopy(copy, { horas_mes: 2112, custo_mes: 3555 });
  assert.equal(out.title, "sua equipe gasta 2.112 horas");
  assert.match(out.body, /Custa R\$\s?3\.555 por mes\. Vamos conversar\./);
});

test("sem custo, a frase-placeholder inteira some — nunca um buraco no texto", () => {
  const copy = { title: "t", body: "{{? Custa {{custo_mes}}. ?}} Vamos conversar.", cta: "x" };
  const out = renderResultCopy(copy, { horas_mes: 100, custo_mes: null });
  assert.equal(out.body, "Vamos conversar.");
});

test("copy sem placeholder passa intacta (funil antigo nao muda)", () => {
  const copy = { title: "Titulo fixo.", body: "Corpo fixo.", cta: "CTA" };
  const out = renderResultCopy(copy, null);
  assert.deepEqual(out, copy);
});
