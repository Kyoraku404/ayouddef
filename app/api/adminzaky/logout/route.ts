import { NextResponse } from "next/server";
import { clearZakySessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearZakySessionCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Zaky logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
