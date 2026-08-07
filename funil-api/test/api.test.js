import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { MemoryRepository } from "../src/store.js";
import {
  hardDisqualifierFixture,
  nurtureFixture,
  qualifiedFixture,
  waitlistFixture
} from "./fixtures.js";

test("GET config returns soulgenia-v1 questionnaire", async () => {
  const app = createApp({ repository: new MemoryRepository(), env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);

  try {
    const baseUrl = getServerUrl(server);
    const response = await fetch(`${baseUrl}/funil/soulgenia-v1/config`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.config.slug, "soulgenia-v1");
    assert.equal(body.config.routePath, "/diagnostico");
    assert.equal(body.config.scoringVersion, "soulgenia-v1-2026-06-23");
    assert.equal(body.config.questions.length, 7);
  } finally {
    await closeServer(server);
  }
});

test("POST submit stores and returns route result", async () => {
  const repository = new MemoryRepository();
  const app = createApp({ repository, env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);

  try {
    const baseUrl = getServerUrl(server);
    const response = await fetch(`${baseUrl}/funil/soulgenia-v1/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(qualifiedFixture)
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.route, "qualified_trial");
    assert.equal(body.score, 11);
    assert.equal(body.capi.sent, false);
    assert.match(body.routing_target, /^https:\/\/wa\.me\/554885040633/);
    assert.equal(repository.responses.length, 1);
  } finally {
    await closeServer(server);
  }
});

test("POST submit returns every route over HTTP", async () => {
  const repository = new MemoryRepository();
  const app = createApp({ repository, env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);

  try {
    const baseUrl = getServerUrl(server);
    const cases = [
      [qualifiedFixture, "qualified_trial"],
      [nurtureFixture, "nurture"],
      [waitlistFixture, "waitlist_poor_fit"],
      [hardDisqualifierFixture, "hard_disqualified"]
    ];

    for (const [fixture, expectedRoute] of cases) {
      const response = await fetch(`${baseUrl}/funil/soulgenia-v1/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(fixture)
      });
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.equal(body.route, expectedRoute);
      assert.equal(body.capi.sent, false);
    }

    assert.equal(repository.responses.length, cases.length);
  } finally {
    await closeServer(server);
  }
});

function getServerUrl(server) {
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

// ---------------------------------------------------------------------------
// E-MAIL — acrescentado 2026-08-07.
//
// Sem e-mail o ramo `nurture` nao tem como entregar nada, e e justamente o ramo
// onde a pessoa NAO recebe botao de WhatsApp. A tela promete "receber exemplos".
// Recusar aqui e melhor que gravar um lead que nasce impossivel de atender.
// ---------------------------------------------------------------------------
async function submit(contactPatch, repository = new MemoryRepository()) {
  const app = createApp({ repository, env: { CAPI_MODE: "disabled" } });
  const server = app.listen(0);
  try {
    const response = await fetch(`${getServerUrl(server)}/funil/soulgenia-v1/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...qualifiedFixture,
        contact: { ...qualifiedFixture.contact, ...contactPatch }
      })
    });
    return { status: response.status, body: await response.json(), repository };
  } finally {
    await closeServer(server);
  }
}

test("submit sem e-mail e RECUSADO (422) e NAO grava lead", async () => {
  const repository = new MemoryRepository();
  const r = await submit({ email: undefined }, repository);
  assert.equal(r.status, 422);
  assert.equal(r.body.error, "email_invalido");
  assert.equal(repository.responses.length, 0, "nao pode ter gravado");
});

test("e-mail malformado e RECUSADO", async () => {
  for (const ruim of ["sem-arroba", "a@b", "a @b.co", "   ", "@dominio.com"]) {
    const r = await submit({ email: ruim });
    assert.equal(r.status, 422, `deveria recusar: ${JSON.stringify(ruim)}`);
  }
});

test("e-mail legitimo incomum e ACEITO — perder lead e pior que aceitar typo", async () => {
  for (const bom of ["bruno+diagnostico@soulgenia.com.br", "a@dominio.novo", "x@y.tecnologia"]) {
    const r = await submit({ email: bom });
    assert.equal(r.status, 200, `deveria aceitar: ${bom}`);
  }
});

test("o e-mail e normalizado no SERVIDOR (minusculas, sem espaco)", async () => {
  const repository = new MemoryRepository();
  await submit({ email: "  BRUNO@SoulGenia.Com.BR  " }, repository);
  const salvo = repository.responses[repository.responses.length - 1];
  assert.equal(salvo.contact.email, "bruno@soulgenia.com.br");
});
