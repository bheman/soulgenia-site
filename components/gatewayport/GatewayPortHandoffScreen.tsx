"use client";

import { useMemo, useState } from "react";
import type { GatewayPortLocale } from "@/components/gatewayport/GatewayPortPageContent";

type TemplateKey = "generic" | "codex" | "chatgpt" | "claude" | "openclaw";

type Template = {
  key: TemplateKey;
  label: string;
  purpose: string;
  body: string;
};

type HandoffCopy = {
  eyebrow: string;
  title: string;
  body: string;
  helper: string;
  stateChips: string[];
  connectorTitle: string;
  connectorRows: Array<[string, string]>;
  tabsLabel: string;
  promptAction: string;
  configAction: string;
  downloadAction: string;
  copied: string;
  downloadName: string;
  configSnippet: string;
  templates: Template[];
  safetyTitle: string;
  safety: string[];
  dryRunTitle: string;
  dryRun: string[];
  auditLabel: string;
  auditValue: string;
};

const handoffCopy: Record<GatewayPortLocale, HandoffCopy> = {
  en: {
    eyebrow: "Post-connection screen",
    title: "WhatsApp is online. Connect your agent next.",
    body:
      "Copy one of these templates into your agent so it can read approved WhatsApp context, process media, request approvals, schedule messages, and inspect audit logs through GatewayPort.",
    helper:
      "Preview of the screen users see after connection. Endpoint placeholders stay dashboard-driven so global GatewayPort can migrate to a dedicated API domain later.",
    stateChips: ["Connected", "Limited trial", "Approval-first"],
    connectorTitle: "Connector details",
    connectorRows: [
      ["API base", "${GATEWAYPORT_API_BASE}"],
      ["MCP endpoint", "${GATEWAYPORT_MCP_URL}"],
      ["Auth", "Bearer API key or OAuth token"],
      ["Workspace", "${GATEWAYPORT_WORKSPACE_ID}"],
      ["Connection", "${GATEWAYPORT_CONNECTION_ID}"],
      ["Limits", "${GATEWAYPORT_MESSAGE_LIMIT} messages / ${GATEWAYPORT_MEDIA_ACTION_LIMIT} media actions"],
    ],
    tabsLabel: "Choose agent template",
    promptAction: "Copy prompt",
    configAction: "Copy MCP config",
    downloadAction: "Download skill pack",
    copied: "Copied",
    downloadName: "gatewayport-agent-handoff.txt",
    configSnippet: `GATEWAYPORT_API_KEY=<paste from dashboard once>
GATEWAYPORT_API_BASE=<copy API base from dashboard>
GATEWAYPORT_MCP_URL=<copy MCP URL from dashboard>
GATEWAYPORT_WORKSPACE_ID=<workspace id>
GATEWAYPORT_CONNECTION_ID=<connection id>
GATEWAYPORT_APPROVAL_MODE=human_required`,
    templates: [
      {
        key: "generic",
        label: "Generic MCP",
        purpose: "Default setup note for any MCP-compatible agent.",
        body: `You have access to GatewayPort, a hosted WhatsApp connection layer for agents.

Use GatewayPort for authorized WhatsApp context, media processing, approval-first scheduled sends, connection health, quotas, retention, and audit logs.

Default workflow:
1. Call list_connections and verify the connection is healthy and authorized.
2. Read only the bounded conversation/message window needed for the task.
3. Process media only when the user asks or when it is necessary for the task.
4. If you prepare an outbound payload, call request_approval or schedule_message as approval-first.
5. Use send_approved_message only when GatewayPort confirms a valid approval, entitlement, quota, consent, connection health, idempotency, and policy pass.
6. Record or summarize the audit event id for any approval, schedule, cancel, blocked attempt, or sent message.

Never paste secrets into chat, logs, memory, files, screenshots, or support messages.`,
      },
      {
        key: "codex",
        label: "Codex",
        purpose: "Repo/workspace instruction for Codex agents.",
        body: `Use GatewayPort only through its configured MCP/API tools. Treat it as the WhatsApp connection, media/context, scheduled-send, approval, quota, retention, connection-health, and audit layer.

Environment/config placeholders:
- GATEWAYPORT_MCP_URL=${"${GATEWAYPORT_MCP_URL}"}
- GATEWAYPORT_WORKSPACE_ID=${"${GATEWAYPORT_WORKSPACE_ID}"}
- GATEWAYPORT_CONNECTION_ID=${"${GATEWAYPORT_CONNECTION_ID}"}
- GATEWAYPORT_API_KEY is secret and must stay outside prompts and repo files.

Rules:
- Read before acting: call list_connections or a status/audit tool before assuming the connection is available.
- GatewayPort is not the reply writer. Draft text as the customer's agent, then submit it as a payload for human approval.
- Trial/Starter sends are approval-first. Never bypass request_approval, approval records, idempotency, quota, consent, risk, and connection-health checks.
- Do not build or run bulk outbound, scraping, cold lead lists, unattended follow-up sequences, or self-approval.`,
      },
      {
        key: "chatgpt",
        label: "ChatGPT / GPT",
        purpose: "Custom GPT or project instruction paste.",
        body: `You are connected to GatewayPort tools for a single authorized WhatsApp workspace. GatewayPort provides WhatsApp connectivity for agents. It is not WhatsApp, Meta, a bulk sender, a compliance guarantee, or the AI reply writer.

Use GatewayPort tools only for connection health, bounded WhatsApp context, requested media processing, approval-first outbound payloads, scheduled sends, audit logs, and quota/retention state.

Before any outbound action, request human approval through GatewayPort and wait for the approval result. Never claim a message was sent unless GatewayPort returns a successful approved-send result.

Never reveal API keys, OAuth tokens, QR/session secrets, raw credentials, or provider/session details.`,
      },
      {
        key: "claude",
        label: "Claude Desktop",
        purpose: "MCP config plus companion instruction.",
        body: `Use the GatewayPort MCP server as an approval-first WhatsApp connection layer. Keep credentials in local MCP configuration, not in prompts.

Read bounded context, process media only when requested, submit outbound payloads for human approval, and use audit logs to confirm outcomes.

Do not use GatewayPort for bulk messaging, scraping, cold outbound, contact export, unattended sequences, or self-approval.`,
      },
      {
        key: "openclaw",
        label: "OpenClaw",
        purpose: "Agent profile or skill wrapper guidance.",
        body: `Route WhatsApp work through GatewayPort for this workspace.

Allowed operations:
- focused inbox context;
- approved media understanding;
- approval-first drafts;
- approved scheduled actions;
- audit-log lookup;
- connection-health checks.

Blocked operations:
- direct sends without approval;
- bulk or cold outreach;
- unreviewed customer-data export;
- claims of guaranteed deliverability;
- workflows that continue after the GatewayPort connection is unhealthy.

Keep GatewayPort separate from Soul Genia branding and use it only as the hosted WhatsApp connection layer.`,
      },
    ],
    safetyTitle: "Safety defaults",
    safety: [
      "No autonomous sends in Trial or Starter.",
      "Sends require explicit human approval.",
      "Media actions consume quota only when processing is requested.",
      "Audit logs are part of the product.",
      "GatewayPort is not WhatsApp, Meta, a bulk sender, or the AI reply writer.",
    ],
    dryRunTitle: "First useful dry run",
    dryRun: [
      "Agent calls list_connections.",
      "Agent reads a bounded context window.",
      "Agent requests media processing only when needed.",
      "Agent submits an approval request without sending.",
      "GatewayPort shows the approval/audit event.",
    ],
    auditLabel: "Last event",
    auditValue: "connection_online -> agent_guidance_viewed",
  },
  pt: {
    eyebrow: "Tela pos-conexao",
    title: "WhatsApp conectado. Agora conecte seu agente.",
    body:
      "Copie um destes modelos para o seu agente ler contexto autorizado do WhatsApp, processar midia, pedir aprovacoes, agendar mensagens e consultar logs pela GatewayPort.",
    helper:
      "Preview da tela exibida apos a conexao. O dashboard preenche o endpoint correto; Brasil/Soul Genia pode usar api.soulgenia.com.br/gatewayport quando pronto, com api.vcnamidia.com.br/gatewayport como fallback.",
    stateChips: ["Conectado", "Trial limitado", "Approval-first"],
    connectorTitle: "Detalhes do conector",
    connectorRows: [
      ["API base", "${GATEWAYPORT_API_BASE}"],
      ["MCP endpoint", "${GATEWAYPORT_MCP_URL}"],
      ["Auth", "Bearer API key ou OAuth token"],
      ["Workspace", "${GATEWAYPORT_WORKSPACE_ID}"],
      ["Conexao", "${GATEWAYPORT_CONNECTION_ID}"],
      ["Rota Brasil", "api.soulgenia.com.br/gatewayport(/mcp) quando pronto; fallback api.vcnamidia.com.br/gatewayport(/mcp)"],
      ["Limites", "${GATEWAYPORT_MESSAGE_LIMIT} mensagens / ${GATEWAYPORT_MEDIA_ACTION_LIMIT} acoes de midia"],
    ],
    tabsLabel: "Escolha o modelo do agente",
    promptAction: "Copiar prompt",
    configAction: "Copiar config MCP",
    downloadAction: "Baixar skill pack",
    copied: "Copiado",
    downloadName: "gatewayport-agent-handoff-pt-br.txt",
    configSnippet: `GATEWAYPORT_API_KEY=<colar do dashboard uma vez>
GATEWAYPORT_API_BASE=<copiar API base do dashboard>
GATEWAYPORT_MCP_URL=<copiar MCP URL do dashboard>
GATEWAYPORT_WORKSPACE_ID=<id do workspace>
GATEWAYPORT_CONNECTION_ID=<id da conexao>
GATEWAYPORT_APPROVAL_MODE=human_required`,
    templates: [
      {
        key: "generic",
        label: "MCP generico",
        purpose: "Nota padrao para qualquer agente compativel com MCP.",
        body: `Voce tem acesso ao GatewayPort, uma camada hospedada de conexao WhatsApp para agentes.

Use GatewayPort para contexto autorizado do WhatsApp, processamento de midia, envios programados approval-first, saude da conexao, cotas, retencao e logs de auditoria.

Fluxo padrao:
1. Chame list_connections e confirme que a conexao esta saudavel e autorizada.
2. Leia apenas a janela limitada de conversa/mensagens necessaria para a tarefa.
3. Processe midia apenas quando o usuario pedir ou quando isso for necessario.
4. Se preparar um payload outbound, use request_approval ou schedule_message em modo approval-first.
5. Use send_approved_message apenas quando GatewayPort confirmar aprovacao, direito de uso, cota, consentimento, saude da conexao, idempotencia e politica.
6. Registre ou resuma o id do evento de auditoria para aprovacao, agendamento, cancelamento, bloqueio ou envio.

Nunca cole segredos em chat, logs, memoria, arquivos, screenshots ou mensagens de suporte.`,
      },
      {
        key: "codex",
        label: "Codex",
        purpose: "Instrucao de repo/workspace para agentes Codex.",
        body: `Use GatewayPort apenas pelas ferramentas MCP/API configuradas. Trate-o como a camada de conexao WhatsApp, contexto/midia, agendamento, aprovacao, cotas, retencao, saude da conexao e auditoria.

Placeholders de ambiente/config:
- GATEWAYPORT_MCP_URL=${"${GATEWAYPORT_MCP_URL}"}
- GATEWAYPORT_WORKSPACE_ID=${"${GATEWAYPORT_WORKSPACE_ID}"}
- GATEWAYPORT_CONNECTION_ID=${"${GATEWAYPORT_CONNECTION_ID}"}
- GATEWAYPORT_API_KEY e segredo e deve ficar fora de prompts e arquivos do repo.

Regras:
- Leia antes de agir: chame list_connections ou uma ferramenta de status/auditoria antes de assumir que a conexao esta disponivel.
- GatewayPort nao escreve a resposta. Rascunhe texto como agente do cliente e envie como payload para aprovacao humana.
- Trial/Starter sao approval-first. Nunca burle request_approval, registros de aprovacao, idempotencia, cota, consentimento, risco e saude da conexao.
- Nao crie disparo em massa, scraping, listas frias, sequencias sem supervisao ou autoaprovacao.`,
      },
      {
        key: "chatgpt",
        label: "ChatGPT / GPT",
        purpose: "Texto para instrucoes de GPT customizado ou projeto.",
        body: `Voce esta conectado a ferramentas GatewayPort para um unico workspace autorizado de WhatsApp. GatewayPort fornece conectividade WhatsApp para agentes. Nao e WhatsApp, Meta, disparador em massa, garantia de compliance ou escritor de respostas por IA.

Use GatewayPort apenas para saude da conexao, contexto limitado do WhatsApp, processamento de midia solicitado, payloads outbound approval-first, agendamentos, logs de auditoria e estado de cota/retencao.

Antes de qualquer acao outbound, solicite aprovacao humana pelo GatewayPort e aguarde o resultado. Nunca diga que uma mensagem foi enviada sem GatewayPort retornar um resultado de envio aprovado.

Nunca revele API keys, tokens OAuth, QR/session secrets, credenciais brutas ou detalhes de provedor/sessao.`,
      },
      {
        key: "claude",
        label: "Claude Desktop",
        purpose: "Config MCP e instrucao companheira.",
        body: `Use o servidor MCP GatewayPort como uma camada WhatsApp approval-first. Mantenha credenciais na configuracao MCP local, nao em prompts.

Leia contexto limitado, processe midia apenas quando solicitado, envie payloads outbound para aprovacao humana e use logs de auditoria para confirmar resultados.

Nao use GatewayPort para disparo em massa, scraping, prospeccao fria, exportacao de contatos, sequencias sem supervisao ou autoaprovacao.`,
      },
      {
        key: "openclaw",
        label: "OpenClaw",
        purpose: "Orientacao para perfil de agente ou wrapper de skill.",
        body: `Roteie o trabalho de WhatsApp por GatewayPort neste workspace.

Operacoes permitidas:
- contexto focado de inbox;
- leitura de midia aprovada;
- rascunhos approval-first;
- acoes programadas aprovadas;
- consulta de log de auditoria;
- checagem de saude da conexao.

Operacoes bloqueadas:
- envio direto sem aprovacao;
- disparo em massa ou prospeccao fria;
- exportacao de dados de clientes sem revisao;
- claims de entregabilidade garantida;
- fluxos que continuam depois de a conexao GatewayPort ficar instavel.

Mantenha GatewayPort separado da marca Soul Genia e use-o apenas como camada hospedada de conexao WhatsApp.`,
      },
    ],
    safetyTitle: "Padroes de seguranca",
    safety: [
      "Sem envios autonomos em Trial ou Starter.",
      "Envios exigem aprovacao humana explicita.",
      "Acoes de midia consomem cota apenas quando processamento e solicitado.",
      "Logs de auditoria fazem parte do produto.",
      "GatewayPort nao e WhatsApp, Meta, disparador em massa ou escritor de respostas por IA.",
    ],
    dryRunTitle: "Primeiro teste util",
    dryRun: [
      "O agente chama list_connections.",
      "O agente le uma janela limitada de contexto.",
      "O agente pede processamento de midia apenas quando necessario.",
      "O agente envia um pedido de aprovacao sem mandar mensagem.",
      "GatewayPort mostra o evento de aprovacao/auditoria.",
    ],
    auditLabel: "Ultimo evento",
    auditValue: "connection_online -> agent_guidance_viewed",
  },
};

export default function GatewayPortHandoffScreen({
  locale = "en",
}: {
  locale?: GatewayPortLocale;
}) {
  const copy = handoffCopy[locale];
  const [activeKey, setActiveKey] = useState<TemplateKey>("generic");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeTemplate = useMemo(
    () =>
      copy.templates.find((template) => template.key === activeKey) ??
      copy.templates[0],
    [activeKey, copy.templates],
  );

  const copyText = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  };

  const downloadPack = () => {
    const pack = [
      "GatewayPort Agent Handoff",
      "",
      "CONFIG",
      copy.configSnippet,
      "",
      "PROMPT",
      activeTemplate.body,
    ].join("\n");

    const blob = new Blob([pack], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = copy.downloadName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="agent-handoff"
      className="bg-[#102c30] px-5 py-20 text-white sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#9deaf4]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              {copy.title}
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-lg leading-8 text-white/72">
              {copy.body}
            </p>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-white/50">
              {copy.helper}
            </p>
          </div>
        </div>

        <div className="mt-10 grid min-w-0 gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <aside className="min-w-0 overflow-hidden rounded-lg border border-white/12 bg-white/7 p-6">
            <div className="flex flex-wrap gap-2">
              {copy.stateChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-[#9deaf4]/24 bg-[#9deaf4]/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#d7f9fc]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <h3 className="mt-7 text-2xl font-black">{copy.connectorTitle}</h3>
            <dl className="mt-5 grid gap-3">
              {copy.connectorRows.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-md border border-white/10 bg-[#082c32] p-3"
                >
                  <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">
                    {label}
                  </dt>
                  <dd className="mt-2 break-words font-mono text-xs font-bold leading-5 text-[#d7f9fc] [overflow-wrap:anywhere]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-md border border-[#d6b25c]/30 bg-[#d6b25c]/10 p-4">
              <p className="text-sm font-extrabold text-[#ffe3a0]">
                {copy.auditLabel}
              </p>
              <p className="mt-2 font-mono text-xs font-bold text-[#fff2c8]">
                {copy.auditValue}
              </p>
            </div>
          </aside>

          <div className="min-w-0 overflow-hidden rounded-lg border border-white/12 bg-[#fbf7ef] p-4 text-[#0b2f35] shadow-[0_28px_80px_-56px_rgba(0,0,0,0.9)] sm:p-6">
            <div
              className="flex gap-2 overflow-x-auto pb-2"
              aria-label={copy.tabsLabel}
            >
              {copy.templates.map((template) => {
                const isActive = template.key === activeKey;
                return (
                  <button
                    key={template.key}
                    type="button"
                    onClick={() => setActiveKey(template.key)}
                    className={`shrink-0 rounded-md border px-3 py-2 text-sm font-extrabold ${
                      isActive
                        ? "border-[#054048] bg-[#054048] text-white"
                        : "border-[#d7cab2] bg-white text-[#174249] hover:border-[#0b8da0]"
                    }`}
                  >
                    {template.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#0b8da0]">
                  {activeTemplate.label}
                </p>
                <h3 className="mt-2 text-2xl font-black leading-tight">
                  {activeTemplate.purpose}
                </h3>
                <pre className="mt-5 max-h-[28rem] whitespace-pre-wrap break-words rounded-md border border-[#d7cab2] bg-[#082c32] p-4 text-xs font-semibold leading-6 text-[#d7f9fc] [overflow-wrap:anywhere]">
                  <code>{activeTemplate.body}</code>
                </pre>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      copyText(`prompt-${activeTemplate.key}`, activeTemplate.body)
                    }
                    className="rounded-md bg-[#054048] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#0b5b65]"
                  >
                    {copiedKey === `prompt-${activeTemplate.key}`
                      ? copy.copied
                      : copy.promptAction}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyText("config", copy.configSnippet)}
                    className="rounded-md border border-[#c6b78f] px-4 py-3 text-sm font-extrabold text-[#174249] hover:border-[#0b8da0] hover:bg-white"
                  >
                    {copiedKey === "config" ? copy.copied : copy.configAction}
                  </button>
                  <button
                    type="button"
                    onClick={downloadPack}
                    className="rounded-md border border-[#c6b78f] px-4 py-3 text-sm font-extrabold text-[#174249] hover:border-[#0b8da0] hover:bg-white"
                  >
                    {copy.downloadAction}
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                <section className="rounded-lg border border-[#d7cab2] bg-white p-4">
                  <h4 className="text-lg font-black">{copy.safetyTitle}</h4>
                  <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-[#625b4d]">
                    {copy.safety.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b8da0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-lg border border-[#d7cab2] bg-white p-4">
                  <h4 className="text-lg font-black">{copy.dryRunTitle}</h4>
                  <ol className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-[#625b4d]">
                    {copy.dryRun.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#edf4ef] text-xs font-black text-[#0b8da0]">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="rounded-lg border border-[#d7cab2] bg-[#f7f3ea] p-4">
                  <h4 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#0b8da0]">
                    MCP config
                  </h4>
                  <pre className="mt-3 whitespace-pre-wrap break-words rounded-md bg-white p-3 text-xs font-semibold leading-5 text-[#174249] [overflow-wrap:anywhere]">
                    <code>{copy.configSnippet}</code>
                  </pre>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
