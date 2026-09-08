import { NextResponse } from "next/server";
import { clearOcnSessionCookie, getOcnSession } from "@/lib/ocn-auth";
import { logOcnAudit } from "@/lib/ocn-db";

export async function POST() {
  try {
    const session = await getOcnSession();
    if (session) {
      await logOcnAudit({
        action: "LOGOUT",
        entityType: "ADMIN_USER",
        entityId: session.sub,
        performedBy: session.username,
        details: { timestamp: new Date().toISOString() },
      });
    }

    await clearOcnSessionCookie();

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("[OCN Auth] Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
