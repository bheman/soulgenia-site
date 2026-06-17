import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/healthcheck
 * Used by the Docker HEALTHCHECK instruction.
 * Returns 200 if the app is running.
 * Use /api/healthcheck?deep=1 when DB connectivity should be checked too.
 */
export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("deep") !== "1") {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  try {
    const sql = (await import("@/lib/db")).default;
    await sql`SELECT 1`;
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Database unreachable" },
      { status: 503 }
    );
  }
}
