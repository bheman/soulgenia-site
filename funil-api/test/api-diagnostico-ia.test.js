import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { MemoryRepository } from "../src/store.js";

const baseContact = {
  name: "Carla Operacao",
  whatsapp: "48 99999-0202",
  email: "carla@example.com",
  consent_contact: true,
  privacy_ack: true
};

function serverUrl(server) {
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}

test("GET config expõe o diagnostico-ia-v1 com rota e eventos novos", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/config`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.config.routePath, "/diagnostico-ia");
    assert.ok(body.config.events.includes("calculator_shown"));
    assert.ok(body.config.events.includes("schedule_click"));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

// A prova da acentuação é a RESPOSTA DA API, não o código-fonte: um arquivo
// salvo em UTF-8 pode chegar mojibake do outro lado do HTTP. Este teste lê o
// corpo cru da resposta e compara byte a byte com o texto acentuado do deck.
test("GET config devolve os acentos ÍNTEGROS pelo HTTP (deck 2026-08-31)", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/config`);
    const raw = await response.text();

    // Mojibake clássico: "média" lido como latin-1 vira "mÃ©dia"; byte perdido
    // vira U+FFFD. Qualquer um dos dois na resposta reprova a acentuação.
    assert.ok(!raw.includes("Ã©"), "mojibake UTF-8 lido como latin-1 na resposta");
    assert.ok(!raw.includes("Ã£"), "mojibake UTF-8 lido como latin-1 na resposta");
    assert.ok(
      !raw.includes(String.fromCharCode(0xfffd)),
      "caractere de substituicao (U+FFFD) na resposta"
    );

    const config = JSON.parse(raw).config;
    const byId = Object.fromEntries(config.questions.map((q) => [q.id, q]));

    assert.equal(
      byId.avg_cost.label,
      "Quanto custa em média cada pessoa do atendimento (salário mais encargos)?"
    );
    assert.equal(byId.ai_today.label, "Você já usa alguma IA no dia a dia da empresa?");
    assert.equal(byId.contact.label, "Para onde mandamos o seu resultado?");
    assert.equal(byId.attendants.options[0].label, "Só eu");
    assert.equal(byId.avg_cost.options[0].label, "Até R$ 1.800");
    assert.equal(byId.ai_today.options[0].label, "Não");
    assert.equal(config.results.self_serve_genia.cta, "Conhecer a Gênia");
    assert.equal(
      config.results.self_serve_genia.title,
      "responder cliente consome cerca de {{horas_mes}} horas por mês na sua operação."
    );
    assert.match(config.results.self_serve_genia.body, /Numa operação desse tamanho/);
    assert.match(config.results.agendar_diagnostico.title, /horas por mês respondendo cliente/);
    // A oferta paga e a garantia vivem na tela de resultado (deck §6.1).
    assert.match(config.results.agendar_diagnostico.body, /por R\$ 497/);
    assert.match(config.results.agendar_diagnostico.body, /devolvemos 100% do valor/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

// As opções servidas pela API são o vocabulário que o scoring aceita. Este
// teste PRENDE produtor (config) e consumidor (routeDiagnosticoIaLead) no mesmo
// literal: se um mudar sem o outro, ele morde.
test("as opções de attendants servidas são exatamente 1 / 2 / 3-10 / 10+", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/config`);
    const body = await response.json();
    const attendants = body.config.questions.find((q) => q.id === "attendants");
    assert.deepEqual(
      attendants.options.map((o) => o.value),
      ["1", "2", "3-10", "10+"]
    );
    assert.deepEqual(
      attendants.options.map((o) => o.label),
      ["Só eu", "2 pessoas", "De 3 a 10 pessoas", "Mais de 10"]
    );
    assert.equal(body.config.scoringVersion, "diagnostico-ia-v1-2026-08-31");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("submit 3-10 pessoas → agendar_diagnostico com numero INTERPOLADO e computed", async () => {
  const repository = new MemoryRepository();
  const app = createApp({
    repository,
    env: { CAPI_MODE: "disabled", DIAG_IA_SCHEDULE_URL: "https://cal.com/exemplo/20min" }
  });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answers: {
          attendants: "3-10",
          hours_per_day: "3-4",
          avg_cost: "2500-4000",
          client_value: "1000-5000",
          ai_today: "chatgpt_pontual"
        },
        contact: baseContact
      })
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.route, "agendar_diagnostico");
    assert.equal(body.routing_target, "https://cal.com/exemplo/20min");
    assert.deepEqual(body.computed, { horas_mes: 462, custo_mes: 8531 });
    // O placeholder foi interpolado no servidor — nenhum {{...}} vaza pra tela.
    assert.match(body.result.title, /462/);
    assert.doesNotMatch(body.result.title, /\{\{/);
    assert.doesNotMatch(body.result.body, /\{\{/);
    assert.equal(repository.responses.length, 1);
    assert.equal(repository.responses[0].funil_slug, "diagnostico-ia-v1");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("submit 1 pessoa → self_serve_genia apontando para /genia (mao unica)", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answers: {
          attendants: "1",
          hours_per_day: "5-6",
          avg_cost: "ate-1800",
          client_value: "200-1000",
          ai_today: "no"
        },
        contact: baseContact
      })
    });
    const body = await response.json();
    assert.equal(body.route, "self_serve_genia");
    assert.equal(body.routing_target, "https://soulgenia.com.br/genia");
    assert.ok(body.computed.horas_mes > 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

// Ratchet do deck §6.2 (corrigido 2026-09-01): a tela `self_serve_genia` recebe
// operacoes de 1 E de 2 pessoas, entao NENHUMA string dela pode presumir
// quantidade. "sozinho" estava errado para quem declarou 2; "sua equipe" estaria
// errado para quem declarou 1. Este teste morde se qualquer um voltar.
test("self_serve_genia nao presume quantidade de pessoas em nenhuma string", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/config`);
    const body = await response.json();
    const tela = body.config.results.self_serve_genia;
    const texto = [tela.title, tela.body, tela.cta].join(" ").toLowerCase();

    for (const proibido of ["sozinho", "sozinha", "sozinho(a)", "sua equipe", "voce e a", "você e a"]) {
      assert.ok(
        !texto.includes(proibido),
        `a tela self_serve_genia presume quantidade: "${proibido}"`
      );
    }
    // Controle positivo: o teste esta mesmo olhando o texto da tela certa.
    assert.ok(texto.includes("secretária de ia no seu próprio whatsapp"));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

// Ratchet do CORTE DE ICP pela borda publica: com DIAG_IA_SCHEDULE_URL setada,
// se o roteamento voltar a mandar 2 pessoas para o degrau pago, este teste
// aponta para o link de agenda em vez de /genia e fica vermelho.
test("submit 2 pessoas → self_serve_genia mesmo com agenda configurada (corte >= 3)", async () => {
  const app = createApp({
    repository: new MemoryRepository(),
    env: { CAPI_MODE: "disabled", DIAG_IA_SCHEDULE_URL: "https://cal.com/exemplo/20min" }
  });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/diagnostico-ia-v1/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answers: {
          attendants: "2",
          hours_per_day: "3-4",
          avg_cost: "2500-4000",
          client_value: "1000-5000",
          ai_today: "chatgpt_pontual"
        },
        contact: baseContact
      })
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.route, "self_serve_genia");
    assert.equal(body.routing_target, "https://soulgenia.com.br/genia");
    assert.deepEqual(body.computed, { horas_mes: 154, custo_mes: 2844 });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("o funil ANTIGO responde identico com o despacho novo (computed null, texto intacto)", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${serverUrl(server)}/funil/soulgenia-v1/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answers: {
          profession: "clinic_owner",
          message_volume: "40+",
          main_pain: "lead",
          whatsapp_business: "yes",
          guided_setup: "yes",
          workflow_this_week: "responder leads da clinica que chegam de madrugada"
        },
        contact: baseContact
      })
    });
    const body = await response.json();
    assert.equal(body.route, "qualified_trial");
    assert.equal(body.computed, null);
    assert.doesNotMatch(body.result.body, /\{\{/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
