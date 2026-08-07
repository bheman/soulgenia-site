// Envio do diagnóstico por e-mail (Resend).
//
// Remetente: a conta Resend da SOUL GENIA, onde `soulgenia.com.br` está
// verified (DKIM+SPF) desde 2026-07-10. NÃO é a conta da Soul Beta, que verifica
// `betalotti.com.br` — mandar daqui pelo remetente da Beta anunciaria a marca
// errada para quem acabou de fazer o diagnóstico da Gênia.
//
// CONTRATO: nunca lança. Quando isto roda, o lead JÁ está salvo. Trocar um
// e-mail perdido por um LEAD perdido seria péssimo negócio.

import { buildDiagnosticEmail } from "./diagnostic-email.js";

export async function sendDiagnosticEmail({ env = process.env, contact, answers, route, waUrl = null }) {
  const key = env.RESEND_API_KEY;
  const from = env.EMAIL_FROM || "Gênia <noreply@soulgenia.com.br>";
  const to = String(contact?.email ?? "").trim();

  if (!key) return { sent: false, reason: "resend_nao_configurado" };
  if (!to) return { sent: false, reason: "sem_email" };

  try {
    const { assunto, html, texto } = buildDiagnosticEmail({ contact, answers, route, waUrl });

    const controller = new AbortController();
    // O visitante está esperando a tela de resultado. Se o Resend demorar,
    // perdemos o e-mail — não a experiência dele. O reenvio é recuperável;
    // uma tela travada não é.
    const timer = setTimeout(() => controller.abort(), 5000);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: assunto, html, text: texto }),
      signal: controller.signal
    });
    clearTimeout(timer);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, reason: `resend_http_${res.status}`, detail: body.slice(0, 150) };
    }
    const body = await res.json().catch(() => ({}));
    return { sent: true, reason: null, id: body?.id ?? null };
  } catch (error) {
    return { sent: false, reason: "resend_falhou", detail: String(error?.message ?? error).slice(0, 150) };
  }
}
