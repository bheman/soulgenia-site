import test from "node:test";
import assert from "node:assert/strict";
import { buildDiagnosticEmail, escapeHtml } from "../src/diagnostic-email.js";

/**
 * Normaliza espaço em branco antes de casar texto.
 * Quebra de linha em HTML NÃO é semântica: uma asserção que depende de onde o
 * template quebrou a linha falha por reformatação e não por defeito. Esta função
 * existe porque exatamente isso aconteceu ao escrever estes testes.
 */
const plano = (html) => String(html).replace(/\s+/g, " ");

const base = {
  contact: { name: "maria silva", email: "maria@exemplo.com" },
  answers: {
    profession: "clinic_owner",
    message_volume: "40+",
    main_pain: "follow_up",
    workflow_this_week: "lembrar follow-up de clientes parados"
  },
  route: "qualified_trial"
};

test("o diagnóstico é personalizado pela DOR, não genérico", () => {
  const a = buildDiagnosticEmail({ ...base, answers: { ...base.answers, main_pain: "follow_up" } });
  const b = buildDiagnosticEmail({ ...base, answers: { ...base.answers, main_pain: "scheduling" } });
  assert.notEqual(a.html, b.html);
  assert.match(a.html, /Follow-up que não acontece|follow-up que não acontece/i);
  assert.match(b.html, /agenda/i);
});

test("o volume muda a leitura", () => {
  const alto = buildDiagnosticEmail({ ...base, answers: { ...base.answers, message_volume: "40+" } });
  const baixo = buildDiagnosticEmail({ ...base, answers: { ...base.answers, message_volume: "0-5" } });
  assert.notEqual(alto.html, baixo.html);
  assert.match(alto.html, /nenhuma organização pessoal segura/);
});

// ---------------------------------------------------------------------------
// O TEXTO LIVRE É CITADO, NÃO PARAFRASEADO.
// Devolver à pessoa as palavras dela é o que prova que alguém leu. Parafrasear
// é onde a invenção entra — e este e-mail é o primeiro contato da Gênia.
// ---------------------------------------------------------------------------
test("cita o que a pessoa escreveu, literalmente", () => {
  const e = buildDiagnosticEmail(base);
  assert.match(e.html, /lembrar follow-up de clientes parados/);
  assert.match(e.texto, /lembrar follow-up de clientes parados/);
});

test("o primeiro nome é capitalizado e usado", () => {
  const e = buildDiagnosticEmail(base);
  assert.match(e.assunto, /^Maria,/);
  assert.match(e.html, /Maria,/);
});

test("sem nome, não quebra nem escreve 'undefined'", () => {
  const e = buildDiagnosticEmail({ ...base, contact: { email: "x@y.com" } });
  assert.doesNotMatch(e.html, /undefined/);
  assert.doesNotMatch(e.assunto, /undefined/);
});

test("dor desconhecida cai no bloco genérico em vez de quebrar", () => {
  const e = buildDiagnosticEmail({ ...base, answers: { ...base.answers, main_pain: "inventada" } });
  assert.match(e.html, /O que você descreveu|o que você descreveu/);
});

// ---------------------------------------------------------------------------
// HONESTIDADE: o limite tem que estar no corpo, não escondido.
// ---------------------------------------------------------------------------
test("todo diagnóstico diz que ela NÃO envia sem aprovação", () => {
  for (const dor of ["lead", "follow_up", "scheduling", "payment", "post_sale", "reminders", "curiosity"]) {
    const e = buildDiagnosticEmail({ ...base, answers: { ...base.answers, main_pain: dor } });
    assert.match(plano(e.html), /não envia mensagem para ninguém sem você aprovar/, `faltou o limite em: ${dor}`);
  }
});

test("nenhum diagnóstico promete envio automático", () => {
  for (const dor of ["lead", "follow_up", "scheduling", "payment", "post_sale", "reminders"]) {
    const e = buildDiagnosticEmail({ ...base, answers: { ...base.answers, main_pain: dor } });
    assert.doesNotMatch(e.html, /envia automaticamente|dispara sozinh|responde sozinh/i, `promessa indevida em: ${dor}`);
  }
});

// ---------------------------------------------------------------------------
// O PRÓXIMO PASSO MUDA POR ROTA — e o `nurture` NÃO é puxado para venda,
// porque a tela dele disse "ainda não é hora de setup".
// ---------------------------------------------------------------------------
test("qualificado com link recebe botão", () => {
  const e = buildDiagnosticEmail({ ...base, route: "qualified_trial", waUrl: "https://wa.me/5548999?text=oi" });
  assert.match(e.html, /Falar sobre meu teste/);
  assert.match(e.html, /wa\.me/);
});

test("qualificado SEM link não fica com botão quebrado — oferece responder o e-mail", () => {
  const e = buildDiagnosticEmail({ ...base, route: "qualified_trial", waUrl: null });
  assert.doesNotMatch(e.html, /href="null"|wa\.me/);
  assert.match(e.html, /respondendo este e-mail/i);
});

test("nurture NÃO é empurrado para venda", () => {
  const e = buildDiagnosticEmail({ ...base, route: "nurture" });
  assert.match(e.html, /não vou te empurrar um setup agora/i);
  assert.doesNotMatch(e.html, /Falar sobre meu teste/);
});

test("hard_disqualified recebe um não claro, não um convite", () => {
  const e = buildDiagnosticEmail({ ...base, route: "hard_disqualified" });
  assert.match(e.html, /não é o caminho/i);
  assert.doesNotMatch(e.html, /Falar sobre meu teste/);
});

// ---------------------------------------------------------------------------
// SEGURANÇA: o texto livre vem do usuário e entra no HTML do e-mail.
// ---------------------------------------------------------------------------
test("escapa HTML do texto livre — injeção não passa", () => {
  const e = buildDiagnosticEmail({
    ...base,
    answers: { ...base.answers, workflow_this_week: '<script>alert(1)</script> & "aspas"' }
  });
  assert.doesNotMatch(e.html, /<script>/);
  assert.match(e.html, /&lt;script&gt;/);
  assert.match(e.html, /&amp;/);
});

test("escapa nome malicioso também", () => {
  const e = buildDiagnosticEmail({ ...base, contact: { name: '<img src=x onerror=1>', email: "a@b.co" } });
  assert.doesNotMatch(e.html, /<img src=x/);
});

test("escapeHtml cobre os cinco caracteres", () => {
  assert.equal(escapeHtml(`<>&"'`), "&lt;&gt;&amp;&quot;&#39;");
});

test("a versão texto existe e não carrega HTML", () => {
  const e = buildDiagnosticEmail(base);
  assert.ok(e.texto.length > 80);
  assert.doesNotMatch(e.texto, /<div|<p |style=/);
});

// ---------------------------------------------------------------------------
// ENCODING. Descoberto ao OLHAR o e-mail renderizado, não pelos testes:
// sem <meta charset>, "está" virava "estÃ¡". O Resend costuma salvar pelo
// cabeçalho MIME, mas depender disso é frágil — e o primeiro contato da Gênia
// com um desconhecido não pode chegar com acento quebrado.
// ---------------------------------------------------------------------------
test("declara charset utf-8 — acento não pode chegar quebrado", () => {
  const e = buildDiagnosticEmail(base);
  assert.match(e.html, /<meta charset="utf-8">/i);
});

test("o HTML de fato carrega acentuação", () => {
  const e = buildDiagnosticEmail(base);
  assert.match(e.html, /diagnóstico|está|Gênia/);
  // e nada de mojibake pré-existente
  assert.doesNotMatch(e.html, /Ã¡|Ã©|Ãª|Ã§/);
});
