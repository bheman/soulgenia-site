import { NextRequest, NextResponse } from "next/server";

const DEFAULT_FUNIL_API_URL = "http://127.0.0.1:3109";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${getFunilApiUrl()}/funil/${encodeURIComponent(slug)}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": request.headers.get("user-agent") || "landing-app",
        },
        body: JSON.stringify(payload),
      }
    );
    const body = await response.json().catch(() => ({}));

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("[api/funil/submit] funil-api unavailable:", error);
    return NextResponse.json(
      {
        error: "funil_api_unavailable",
        message:
          "Nao conseguimos concluir o diagnostico agora. Tente novamente em alguns segundos.",
      },
      { status: 503 }
    );
  }
}

function getFunilApiUrl(): string {
  return (process.env.FUNIL_API_URL || DEFAULT_FUNIL_API_URL).replace(/\/$/, "");
}
