import test from "node:test";
import assert from "node:assert/strict";
import { buildLeadMessage, notifyNewLead } from "../src/notify.js";

const contato = { name: "Maria Silva Souza", whatsapp: "+55 (48) 99123-4567" };

test("o aviso identifica a pessoa sem vazar o telefone inteiro", () => {
  const m = buildLeadMessage({ route: "qualified_trial", score: 12, contact: contato, answers: {} });
  assert.match(m, /Maria/);
  assert.match(m, /…4567/);
  // o número completo NÃO pode aparecer — o aviso serve para reconhecer, não para vazar
  assert.doesNotMatch(m, /99123/);
  assert.doesNotMatch(m, /5548/);
});

test("degrada sem quebrar quando faltam dados", () => {
  const m = buildLeadMessage({ route: "nurture", score: 3, contact: {}, answers: {} });
  assert.match(m, /sem nome/);
  assert.match(m, /sem telefone/);
});

// ---------------------------------------------------------------------------
// O PONTO DO AVISO: dizer O QUE A PESSOA RECEBEU, para você saber se precisa agir.
//
// `qualified_trial` sai com botão de WhatsApp; `nurture` não — o próximo passo
// dela é só o e-mail do diagnóstico. Um aviso que não distingue os dois não
// serve para nada às 2 da manhã.
// ---------------------------------------------------------------------------
test("nurture diz que o próximo passo dela é o e-mail, e que quem puxa é você", () => {
  const m = buildLeadMessage({ route: "nurture", score: 7, contact: contato, answers: {} });
  assert.match(m, /Sem botão de WhatsApp/);
  assert.match(m, /e-mail do diagnóstico/);
});

test("qualificado avisa que ela recebeu o botão", () => {
  const m = buildLeadMessage({ route: "qualified_trial", score: 12, contact: contato, answers: {} });
  assert.match(m, /recebeu o botão/);
  assert.doesNotMatch(m, /Sem botão/);
});

// ---------------------------------------------------------------------------
// O CAMPO QUE MAIS IMPORTA DESDE QUE O E-MAIL PASSOU A SAIR.
// Se o diagnóstico NÃO foi entregue, a pessoa ficou sem nada mesmo — e isso
// muda o que o Bruno precisa fazer. Um aviso que não distingue é inútil.
// ---------------------------------------------------------------------------
test("e-mail que FALHOU aparece em vermelho no aviso", () => {
  const m = buildLeadMessage({ route: "nurture", score: 7, contact: contato, answers: {}, emailEnviado: false });
  assert.match(m, /🔴/);
  assert.match(m, /NÃO saiu/);
  assert.match(m, /nem isso/);
});

test("e-mail entregue aparece como confirmado", () => {
  const m = buildLeadMessage({ route: "nurture", score: 7, contact: contato, answers: {}, emailEnviado: true });
  assert.match(m, /✅/);
  assert.doesNotMatch(m, /NÃO saiu/);
});

test("sem informação sobre o e-mail, não inventa nenhum dos dois", () => {
  const m = buildLeadMessage({ route: "nurture", score: 7, contact: contato, answers: {} });
  assert.doesNotMatch(m, /🔴/);
  assert.doesNotMatch(m, /✅/);
});

test("rota desconhecida não some em silêncio", () => {
  const m = buildLeadMessage({ route: "rota_que_nao_existe", score: 1, contact: contato, answers: {} });
  assert.match(m, /Rota desconhecida/);
});

test("o contexto do quiz entra quando existe", () => {
  const m = buildLeadMessage({
    route: "qualified_trial",
    score: 12,
    contact: contato,
    answers: { profile: "clinic_owner", volume: "40+", main_pain: "follow_up" },
    routingTarget: "https://wa.me/554885040633?text=oi"
  });
  assert.match(m, /clinic_owner/);
  assert.match(m, /40\+/);
  assert.match(m, /follow_up/);
  assert.match(m, /wa\.me/);
});

// ---------------------------------------------------------------------------
// CONTRATO DE SEGURANÇA: notifyNewLead NUNCA lança.
// Quando ela roda, o lead JÁ está salvo. Uma exceção aqui trocaria um aviso
// perdido por um LEAD perdido.
// ---------------------------------------------------------------------------
test("sem configuração, não envia e não quebra", async () => {
  const r = await notifyNewLead({ env: {}, route: "nurture", score: 3, contact: contato, answers: {} });
  assert.equal(r.sent, false);
  assert.equal(r.reason, "telegram_nao_configurado");
});

test("token sem chat (config pela metade) também não quebra", async () => {
  const r = await notifyNewLead({ env: { TELEGRAM_BOT_TOKEN: "x" }, route: "nurture", score: 3, contact: contato, answers: {} });
  assert.equal(r.sent, false);
  assert.equal(r.reason, "telegram_nao_configurado");
});

test("falha de rede NÃO propaga — devolve resultado", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("ECONNREFUSED");
  };
  try {
    const r = await notifyNewLead({
      env: { TELEGRAM_BOT_TOKEN: "t", TELEGRAM_CHAT_ID: "1" },
      route: "nurture",
      score: 3,
      contact: contato,
      answers: {}
    });
    assert.equal(r.sent, false);
    assert.equal(r.reason, "telegram_falhou");
    assert.match(r.detail, /ECONNREFUSED/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("HTTP de erro do Telegram vira resultado, não exceção", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 401, text: async () => "Unauthorized" });
  try {
    const r = await notifyNewLead({
      env: { TELEGRAM_BOT_TOKEN: "t", TELEGRAM_CHAT_ID: "1" },
      route: "qualified_trial",
      score: 12,
      contact: contato,
      answers: {}
    });
    assert.equal(r.sent, false);
    assert.equal(r.reason, "telegram_http_401");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sucesso devolve sent:true", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, status: 200, text: async () => "{}" });
  try {
    const r = await notifyNewLead({
      env: { TELEGRAM_BOT_TOKEN: "t", TELEGRAM_CHAT_ID: "1" },
      route: "qualified_trial",
      score: 12,
      contact: contato,
      answers: {}
    });
    assert.equal(r.sent, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
