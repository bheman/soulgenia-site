// Aviso de lead novo no diagnóstico.
//
// POR QUE ISTO EXISTE: até 2026-08-07 um lead entrava, era pontuado, classificado
// e gravado — e NINGUÉM ficava sabendo. O funil capturou 106 pessoas que nunca
// receberam uma resposta, e o único jeito de saber que alguém tinha entrado era
// abrir o banco.
//
// O aviso diz o que a PESSOA recebeu, para você saber se precisa agir. Desde que
// o diagnóstico por e-mail passou a sair, o campo `emailEnviado` é a parte que
// mais importa: se ele falhou, ela ficou sem nada mesmo.
//
// CONTRATO DE SEGURANÇA: esta função NUNCA lança. Quando ela é chamada, o lead JÁ
// está salvo — deixar uma falha de notificação derrubar a resposta trocaria um
// aviso perdido por um LEAD perdido, que é infinitamente pior. Toda saída é um
// objeto de resultado, no mesmo formato do meta-capi.

const TELEGRAM_API = "https://api.telegram.org";

/** Só os últimos 4 dígitos. O aviso serve para reconhecer, não para vazar. */
function maskPhone(raw) {
  const d = String(raw ?? "").replace(/\D/g, "");
  if (d.length < 4) return "sem telefone";
  return `…${d.slice(-4)}`;
}

function firstName(raw) {
  const n = String(raw ?? "").trim().split(/\s+/)[0];
  return n || "sem nome";
}

/**
 * Monta o texto do aviso. Puro — testável sem rede.
 *
 * O que o aviso PRECISA responder para ser útil de madrugada:
 *  - quem é (nome + final do telefone, para achar no WhatsApp)
 *  - qual a classificação e o score
 *  - o que a pessoa disse que dói
 *  - e, crucialmente, SE ALGUÉM PRECISA AGIR — porque o ramo `nurture` não tem
 *    botão nenhum do lado da pessoa: se ninguém for atrás, acabou ali.
 */
export function buildLeadMessage({ route, score, contact, answers, routingTarget, emailEnviado }) {
  const acaoPorRota = {
    qualified_trial: "Ela recebeu o botão do WhatsApp. Pode ser que já te chame.",
    nurture: "Sem botão de WhatsApp — o próximo passo dela é o e-mail do diagnóstico. Se quiser puxar, é você que puxa.",
    waitlist_poor_fit: "Sem botão de WhatsApp — recebeu o diagnóstico por e-mail e parou aí.",
    hard_disqualified: "Fora de escopo — nenhuma ação esperada.",
    // Funil diagnostico-ia-v1:
    agendar_diagnostico: "Recebeu o botão de agendar a conversa de 20 min. Se não agendar, é você que puxa.",
    self_serve_genia: "Foi direcionada para a página da Gênia (self-serve). Nenhuma ação sua esperada."
  };

  const linhas = [
    "🔔 Lead novo no diagnóstico da Gênia",
    "",
    `Nome: ${firstName(contact?.name)}`,
    `WhatsApp: ${maskPhone(contact?.whatsapp)}`,
    `Rota: ${route} (score ${score})`
  ];

  if (answers?.profile) linhas.push(`Perfil: ${answers.profile}`);
  if (answers?.volume) linhas.push(`Volume: ${answers.volume}`);
  if (answers?.main_pain) linhas.push(`Dor: ${answers.main_pain}`);

  linhas.push("", acaoPorRota[route] ?? "Rota desconhecida — vale olhar.");

  // Se o diagnóstico por e-mail FALHOU, isso muda o que você precisa fazer:
  // a pessoa ficou sem receber nada mesmo. Dizer é o ponto.
  if (emailEnviado === false) {
    linhas.push("🔴 O e-mail do diagnóstico NÃO saiu. Ela não recebeu nem isso.");
  } else if (emailEnviado === true) {
    linhas.push("✅ Diagnóstico enviado por e-mail.");
  }

  if (routingTarget) linhas.push("", `Contexto que ela leva: ${routingTarget}`);

  return linhas.join("\n");
}

/**
 * Envia o aviso. Devolve sempre um objeto; nunca lança.
 * Desligado por padrão: sem token/chat configurados, não faz nada e diz por quê.
 */
export async function notifyNewLead({ env = process.env, route, score, contact, answers, routingTarget, emailEnviado }) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { sent: false, reason: "telegram_nao_configurado" };
  }

  try {
    const text = buildLeadMessage({ route, score, contact, answers, routingTarget, emailEnviado });
    const controller = new AbortController();
    // Teto curto: o visitante está esperando a tela de resultado. Se o Telegram
    // demorar, perdemos o aviso — não a experiência dele.
    const timer = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: controller.signal
    });
    clearTimeout(timer);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, reason: `telegram_http_${res.status}`, detail: body.slice(0, 120) };
    }
    return { sent: true, reason: null };
  } catch (error) {
    // Inclui o abort do timeout. Nunca propaga.
    return { sent: false, reason: "telegram_falhou", detail: String(error?.message ?? error).slice(0, 120) };
  }
}
