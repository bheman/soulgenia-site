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

test("submit 2-3 pessoas → agendar_diagnostico com numero INTERPOLADO e computed", async () => {
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
          attendants: "2-3",
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
    assert.deepEqual(body.computed, { horas_mes: 193, custo_mes: 3555 });
    // O placeholder foi interpolado no servidor — nenhum {{...}} vaza pra tela.
    assert.match(body.result.title, /193/);
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
