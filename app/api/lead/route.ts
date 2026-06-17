import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { captureLead } from "@/lib/leadCapture";

const LeadSchema = z.object({
  email: z.string().email("Email inválido"),
  nome: z.string().min(2, "Nome muito curto").max(100),
  whatsapp: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, "WhatsApp inválido")
    .optional()
    .or(z.literal("")),
  vertical: z
    .enum(["saude", "juridico", "coach", "criativo", "servico_premium"])
    .optional(),
  landing_variant: z
    .enum(["exausto", "escala", "conta", "default"])
    .optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Payload inválido" },
      { status: 400 }
    );
  }

  // Validate
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Dados inválidos",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // Enrich with server-side data
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;

  // Persist
  const result = await captureLead({
    ...parsed.data,
    whatsapp: parsed.data.whatsapp || undefined,
    ip,
    user_agent: userAgent,
  });

  if (!result.success) {
    console.error("[api/lead] captureLead failed:", result.error);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente em alguns segundos." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: result.id }, { status: 201 });
}

function getClientIp(request: NextRequest): string | undefined {
  // Respect Cloudflare / proxy headers when deployed behind Nginx
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? undefined;
}
