import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * GUARDA DE VOCABULARIO DE EVENTOS (defeito de 2026-09-01).
 *
 * O nome de um evento de analytics precisa existir em TRES camadas:
 *
 *   1. `AnalyticsEvent`  em lib/analytics.ts        - o que o cliente emite
 *   2. o enum zod        em app/api/event/route.ts  - o que a borda aceita
 *   3. o CHECK de `event_name` em db/migrations/    - o que o banco grava
 *
 * O placar em 2026-09-01 era 16 / 14 / 8. Alguem adicionou os seis eventos de
 * quiz na camada 2 e nunca na 3: eles passavam no zod, violavam o CHECK, e o
 * erro era engolido por um catch que devolvia 202 { accepted: true }. Outros
 * dois (calculator_shown, schedule_click) nem chegavam ao banco - 422 no zod.
 * Meses de "aceito" sem gravar nada.
 *
 * Este teste morde se alguem mexer numa camada e nao nas outras.
 *
 * POR QUE ELE MORA AQUI: funil-api e o unico pacote do repo com runner de teste
 * (node --test); o package.json do site nao tem script test. As tres camadas sao
 * listas LITERAIS em arquivos-texto, entao ler e comparar texto e o instrumento
 * certo, nao um contorno. Se o site ganhar runner proprio, este arquivo deveria
 * migrar para la.
 *
 * LIMITE DECLARADO: o varredor de trackEvent reconhece a chamada direta e a
 * forma ternaria. Um evento emitido por outra forma (variavel, map) passaria
 * despercebido. Por isso ha controles positivos: se os varredores pararem de
 * achar o que sabidamente existe, o teste falha em vez de ficar verde vazio.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");

function read(relativePath) {
  const full = path.join(REPO, relativePath);
  const text = fs.readFileSync(full, "utf8");
  assert.ok(text.length > 0, `arquivo vazio ou inacessivel: ${relativePath}`);
  return text;
}

function lerTipoDoCliente() {
  const src = read("lib/analytics.ts");
  const bloco = src.match(/export type AnalyticsEvent =([\s\S]*?);/);
  assert.ok(bloco, "nao achei a union AnalyticsEvent em lib/analytics.ts");
  return new Set([...bloco[1].matchAll(/"([a-z_]+)"/g)].map((m) => m[1]));
}

function lerEnumZod() {
  const src = read("app/api/event/route.ts");
  const bloco = src.match(/z\.enum\(\[([\s\S]*?)\]\)/);
  assert.ok(bloco, "nao achei z.enum em app/api/event/route.ts");
  return new Set([...bloco[1].matchAll(/"([a-z_]+)"/g)].map((m) => m[1]));
}

function lerCheckDoBanco() {
  const dir = path.join(REPO, "db", "migrations");
  const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  assert.ok(arquivos.length > 0, "nenhuma migration .sql encontrada");

  let vigente = null;
  let origem = null;
  for (const arquivo of arquivos) {
    const src = fs.readFileSync(path.join(dir, arquivo), "utf8");
    for (const m of src.matchAll(/event_name\s+IN\s*\(([\s\S]*?)\)/gi)) {
      const nomes = [...m[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1]);
      if (nomes.length > 0) {
        vigente = new Set(nomes);
        origem = arquivo;
      }
    }
  }

  assert.ok(vigente, "nao achei nenhum CHECK de event_name nas migrations");
  return { aceitos: vigente, origem };
}

function lerEmitidos() {
  const arquivos = [];
  const empilhar = (dir) => {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entrada.name);
      if (entrada.isDirectory()) {
        if (entrada.name === "node_modules") continue;
        empilhar(full);
      } else if (/\.(ts|tsx)$/.test(entrada.name)) {
        arquivos.push(full);
      }
    }
  };
  for (const raiz of ["app", "components", "lib"]) {
    empilhar(path.join(REPO, raiz));
  }
  assert.ok(arquivos.length > 10, "varredura de fontes achou arquivos de menos");

  const emitidos = new Set();
  for (const arquivo of arquivos) {
    const src = fs.readFileSync(arquivo, "utf8");
    for (const m of src.matchAll(/trackEvent\(\s*"([a-z_]+)"/g)) {
      emitidos.add(m[1]);
    }
    for (const m of src.matchAll(
      /trackEvent\(\s*[\s\S]{0,200}?\?\s*"([a-z_]+)"\s*:\s*"([a-z_]+)"/g
    )) {
      emitidos.add(m[1]);
      emitidos.add(m[2]);
    }
  }
  return emitidos;
}

const ordenado = (conjunto) => [...conjunto].sort();

test("controle: os quatro varredores acham o que sabidamente existe", () => {
  const tipo = lerTipoDoCliente();
  const zod = lerEnumZod();
  const { aceitos, origem } = lerCheckDoBanco();
  const emitidos = lerEmitidos();

  assert.ok(tipo.size >= 8, `union AnalyticsEvent: achei ${tipo.size}`);
  assert.ok(zod.size >= 8, `enum zod: achei ${zod.size}`);
  assert.ok(aceitos.size >= 8, `CHECK do banco: achei ${aceitos.size}`);
  assert.ok(emitidos.size >= 10, `trackEvent: achei ${emitidos.size}`);

  assert.match(origem, /^003_/, `CHECK vigente veio de ${origem}`);

  assert.ok(emitidos.has("landing_view"), "varredor de chamada direta quebrou");
  assert.ok(emitidos.has("schedule_click"), "varredor de ternario quebrou");
});

test("as tres camadas aceitam EXATAMENTE o mesmo vocabulario", () => {
  const tipo = lerTipoDoCliente();
  const zod = lerEnumZod();
  const { aceitos } = lerCheckDoBanco();

  assert.deepEqual(
    ordenado(zod),
    ordenado(tipo),
    "enum zod (app/api/event/route.ts) divergiu da union AnalyticsEvent (lib/analytics.ts)"
  );
  assert.deepEqual(
    ordenado(aceitos),
    ordenado(tipo),
    "CHECK de event_name (db/migrations) divergiu da union AnalyticsEvent (lib/analytics.ts)"
  );
});

test("todo evento EMITIDO e aceito pelas tres camadas", () => {
  const tipo = lerTipoDoCliente();
  const zod = lerEnumZod();
  const { aceitos } = lerCheckDoBanco();
  const emitidos = lerEmitidos();

  const orfaos = ordenado(emitidos).filter(
    (nome) => !tipo.has(nome) || !zod.has(nome) || !aceitos.has(nome)
  );
  assert.deepEqual(orfaos, [], `eventos emitidos que alguma camada recusa: ${orfaos.join(", ")}`);
});

test("os oito eventos do defeito de 2026-09-01 estao nas tres camadas", () => {
  const tipo = lerTipoDoCliente();
  const zod = lerEnumZod();
  const { aceitos } = lerCheckDoBanco();

  const regressao = [
    "quiz_view",
    "quiz_started",
    "quiz_step_completed",
    "quiz_submitted",
    "quiz_result_viewed",
    "quiz_cta_clicked",
    "calculator_shown",
    "schedule_click",
  ];

  for (const nome of regressao) {
    assert.ok(tipo.has(nome), `${nome} sumiu de lib/analytics.ts`);
    assert.ok(zod.has(nome), `${nome} sumiu do enum zod`);
    assert.ok(aceitos.has(nome), `${nome} sumiu do CHECK do banco`);
  }
});
