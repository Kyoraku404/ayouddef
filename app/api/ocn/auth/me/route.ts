import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnAdmin } from "@/lib/ocn-db";

export async function GET() {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await getOcnAdmin();

  return NextResponse.json({
    user: {
      id: admin.id,
      username: admin.username,
      mustChangePassword: admin.mustChangePassword,
      lastLoginAt: admin.lastLoginAt,
    },
  });
}
