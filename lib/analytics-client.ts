"use client";

export async function sendAnalyticsEvent(
  eventType:
    | "PAGE_VIEW"
    | "VISITOR"
    | "CLICK"
    | "WHATSAPP_CLICK"
    | "PHONE_CLICK"
    | "INSTAGRAM_CLICK"
    | "RESERVATION_START"
    | "RESERVATION_SUBMITTED",
  page: string = typeof window !== "undefined" ? window.location.pathname : "/",
  metadata?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  try {
    const payload = {
      domain: "marrakeshitourguide.com",
      eventType,
      page,
      referrer: document.referrer || null,
      metadata,
    };

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/ocn/analytics/event", blob);
    } else {
      await fetch("/api/ocn/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch (err) {
    console.debug("[Telemetry Notice] Event delivery non-blocking error:", err);
  }
}

/**
 * Real WhatsApp Click Tracking:
 * 1. Sends real WHATSAPP_CLICK event to /api/ocn/analytics/event in PostgreSQL
 * 2. Opens WhatsApp link in new window
 * 3. Guarantees WhatsApp opens even if network fails
 */
export async function trackWhatsAppClick(
  source: string,
  targetUrl: string,
  e?: React.MouseEvent
) {
  if (e) {
    e.preventDefault();
  }

  // Fire tracking asynchronously without blocking navigation
  sendAnalyticsEvent("WHATSAPP_CLICK", typeof window !== "undefined" ? window.location.pathname : "/", {
    source,
    target: targetUrl,
    timestamp: new Date().toISOString(),
  });

  // Open WhatsApp
  if (typeof window !== "undefined") {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }
}
