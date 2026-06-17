"use server";

import sql from "./db";
import { Resend } from "resend";

let resend: Resend | undefined;

function getResend(): Resend | undefined {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return undefined;
  }

  resend ??= new Resend(apiKey);
  return resend;
}

export interface LeadData {
  email: string;
  nome: string;
  whatsapp?: string;
  vertical?: "saude" | "juridico" | "coach" | "criativo" | "servico_premium";
  landing_variant?: "exausto" | "escala" | "conta" | "default";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  user_agent?: string;
  ip?: string;
}

export interface CaptureResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function captureLead(data: LeadData): Promise<CaptureResult> {
  try {
    const [row] = await sql<[{ id: string }]>`
      INSERT INTO leads (
        email, nome, whatsapp, vertical, landing_variant,
        utm_source, utm_medium, utm_campaign, utm_content,
        referrer, user_agent, ip
      ) VALUES (
        ${data.email},
        ${data.nome},
        ${data.whatsapp ?? null},
        ${data.vertical ?? null},
        ${data.landing_variant ?? "default"},
        ${data.utm_source ?? null},
        ${data.utm_medium ?? null},
        ${data.utm_campaign ?? null},
        ${data.utm_content ?? null},
        ${data.referrer ?? null},
        ${data.user_agent ?? null},
        ${data.ip ? sql`${data.ip}::inet` : null}
      )
      RETURNING id
    `;

    sendWelcomeEmail(data).catch((err) =>
      console.error("[leadCapture] Resend error:", err)
    );

    sendTelegramNotification(data).catch((err) =>
      console.error("[leadCapture] Telegram error:", err)
    );

    return { success: true, id: row.id };
  } catch (err) {
    console.error("[leadCapture] DB insert error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

async function sendWelcomeEmail(data: LeadData): Promise<void> {
  const resendClient = getResend();

  if (!resendClient) {
    console.warn("[leadCapture] RESEND_API_KEY not set - skipping welcome email");
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@exemplo.com.br";
  const replyTo = process.env.RESEND_NOTIFY_EMAIL ?? "soulgenia@gmail.com";

  await resendClient.emails.send({
    from: `Soul Genia <${fromEmail}>`,
    to: data.email,
    replyTo,
    subject: `${data.nome}, recebemos seu pedido para começar com a Soul Genia`,
    html: buildWelcomeEmailHtml(data),
  });
}

function buildWelcomeEmailHtml(data: LeadData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pedido recebido - Soul Genia</title>
</head>
<body style="margin:0;padding:0;background:#f7f3ea;font-family:system-ui,sans-serif;color:#1f211c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ea;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#fbf8f1;border-radius:8px;padding:40px;border:1px solid #d8cdb9;">
          <tr>
            <td>
              <p style="font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#7a5a1f;margin:0 0 12px;">Soul Genia</p>
              <h1 style="font-size:24px;font-weight:700;color:#171813;margin:0 0 18px;">Recebemos seu pedido para começar com a Soul Genia</h1>
              <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">
                Olá, <strong>${data.nome}</strong>.
              </p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">
                A Soul Genia está em onboarding assistido. Antes de configurar lembretes, resumos ou mensagens agendadas, vamos entender como sua rotina pessoal e profissional funciona hoje.
              </p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 28px;">
                A equipe Soul Genia vai entrar em contato para combinar os próximos passos pelo WhatsApp.
              </p>
              <p style="font-size:14px;color:#6b6253;margin:0;">
                Se quiser adiantar contexto, responda este email com um resumo do que hoje está espalhado entre WhatsApp, email e calendário.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

async function sendTelegramNotification(data: LeadData): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[leadCapture] Telegram env vars not set - skipping notification");
    return;
  }

  const verticalLabel: Record<string, string> = {
    saude: "Vida pessoal / saúde / compromissos",
    juridico: "Contas / documentos / financeiro",
    coach: "Trabalho / clientes / agenda",
    criativo: "Família / casa / grupos",
    servico_premium: "Rotina inteira",
  };

  const text = [
    "*Soul Genia - Novo lead*",
    "",
    `*Nome:* ${data.nome}`,
    `*Email:* ${data.email}`,
    data.whatsapp ? `*WhatsApp:* ${data.whatsapp}` : null,
    data.vertical ? `*Vertical:* ${verticalLabel[data.vertical] ?? data.vertical}` : null,
    `*Variante:* ${data.landing_variant ?? "default"}`,
    data.utm_source ? `*Origem:* ${data.utm_source} / ${data.utm_medium ?? "-"}` : null,
    data.utm_campaign ? `*Campanha:* ${data.utm_campaign}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    throw new Error(`Telegram API error: ${res.status} ${await res.text()}`);
  }
}
