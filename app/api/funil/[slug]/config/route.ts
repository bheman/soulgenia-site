import { NextRequest, NextResponse } from "next/server";

const DEFAULT_FUNIL_API_URL = "http://127.0.0.1:3109";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const response = await fetch(
      `${getFunilApiUrl()}/funil/${encodeURIComponent(slug)}/config`,
      { cache: "no-store" }
    );
    const body = await response.json().catch(() => ({}));

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("[api/funil/config] funil-api unavailable:", error);
    return NextResponse.json(
      {
        error: "funil_api_unavailable",
        message:
          "Diagnostico temporariamente indisponivel. Rode o funil-api local e tente novamente.",
      },
      { status: 503 }
    );
  }
}

function getFunilApiUrl(): string {
  return (process.env.FUNIL_API_URL || DEFAULT_FUNIL_API_URL).replace(/\/$/, "");
}
