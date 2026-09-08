import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnAnalytics } from "@/lib/ocn-db";

export async function GET(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || undefined;

  const data = await getOcnAnalytics(clientId);

  return NextResponse.json(data);
}
