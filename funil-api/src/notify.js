// Aviso de lead novo no diagnóstico.
//
// POR QUE ISTO EXISTE: até 2026-08-07 um lead entrava, era pontuado, classificado
// e gravado — e NINGUÉM ficava sabendo. Sem e-mail, sem notificação, sem nada. O
// funil capturou 106 pessoas que nunca receberam uma resposta, e o único jeito de
// saber que alguém tinha entrado era abrir o banco.
//
// Isto não conserta o funil. Conserta o SILÊNCIO.
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
export function buildLeadMessage({ route, score, contact, answers, routingTarget }) {
  const acaoPorRota = {
    qualified_trial: "Ela recebeu o botão do WhatsApp. Pode ser que já te chame.",
    nurture: "⚠️ ELA NÃO RECEBEU NADA. Sem botão, sem e-mail. Se ninguém for atrás, acabou aqui.",
    waitlist_poor_fit: "⚠️ Sem próximo passo do lado dela. Entrou na lista e parou.",
    hard_disqualified: "Fora de escopo — nenhuma ação esperada."
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

  if (routingTarget) linhas.push("", `Contexto que ela leva: ${routingTarget}`);

  return linhas.join("\n");
}

/**
 * Envia o aviso. Devolve sempre um objeto; nunca lança.
 * Desligado por padrão: sem token/chat configurados, não faz nada e diz por quê.
 */
export async function notifyNewLead({ env = process.env, route, score, contact, answers, routingTarget }) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { sent: false, reason: "telegram_nao_configurado" };
  }

  try {
    const text = buildLeadMessage({ route, score, contact, answers, routingTarget });
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
