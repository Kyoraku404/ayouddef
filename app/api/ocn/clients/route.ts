import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnClients, getOcnClient } from "@/lib/ocn-db";

export async function GET(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const client = await getOcnClient(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }
    return NextResponse.json({ client });
  }

  const clients = await getOcnClients();
  return NextResponse.json({ clients });
}
