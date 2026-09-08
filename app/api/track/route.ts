import { NextResponse } from "next/server";
import { recordOcnAnalyticsEvent } from "@/lib/ocn-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventType, page, referrer, clientId, websiteId } = body;

    if (!eventType) {
      return NextResponse.json({ error: "eventType required" }, { status: 400 });
    }

    const validTypes = ["PAGEVIEW", "BUTTON_CLICK", "WHATSAPP_CLICK", "PHONE_CLICK", "INSTAGRAM_CLICK"];
    if (!validTypes.includes(eventType)) {
      return NextResponse.json({ error: "Invalid eventType" }, { status: 400 });
    }

    // Privacy-safe: No IP address, no GPS, no fingerprinting
    await recordOcnAnalyticsEvent({
      clientId: clientId || "client_zaky",
      websiteId: websiteId || "marrakeshitourguide",
      eventType,
      page: (page || "/").slice(0, 100),
      referrer: referrer ? String(referrer).slice(0, 150) : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Non-blocking for client
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
