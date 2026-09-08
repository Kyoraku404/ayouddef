import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { AnalyticsEventType } from "@prisma/client";

// In-memory rate limiting: max 60 events per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxEvents = 60;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= maxEvents) {
    return true;
  }

  entry.count += 1;
  return false;
}

const analyticsEventSchema = z.object({
  domain: z.string().optional(),
  websiteId: z.string().optional(),
  eventType: z.nativeEnum(AnalyticsEventType),
  page: z.string().min(1).max(500),
  referrer: z.string().max(1000).optional().nullable(),
  metadata: z.record(z.string(), z.any()).optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const json = await req.json();
    const parsed = analyticsEventSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid analytics event payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { domain, websiteId, eventType, page, referrer, metadata } = parsed.data;

    // 2. Verify the website exists in PostgreSQL
    let website = null;
    if (domain) {
      website = await prisma.website.findUnique({
        where: { domain },
        include: { client: true },
      });
    } else if (websiteId) {
      website = await prisma.website.findUnique({
        where: { id: websiteId },
        include: { client: true },
      });
    }

    // Default to main client website if from local or matching domain
    if (!website) {
      website = await prisma.website.findFirst({
        where: { domain: "marrakeshitourguide.com" },
        include: { client: true },
      });
    }

    // 6. Reject invalid websites
    if (!website) {
      return NextResponse.json(
        { error: "Website not recognized or unauthorized" },
        { status: 404 }
      );
    }

    // 3. Resolve the website's client server-side
    const clientId = website.clientId;

    const userAgent = req.headers.get("user-agent") || undefined;

    // 4 & 5. Record the event in PostgreSQL with server timestamp
    const recorded = await prisma.analyticsEvent.create({
      data: {
        clientId,
        websiteId: website.id,
        eventType,
        page,
        referrer: referrer || null,
        userAgent: userAgent ? userAgent.slice(0, 500) : null,
        metadata: metadata || undefined,
        createdAt: new Date(), // Server timestamp
      },
    });

    return NextResponse.json(
      {
        success: true,
        eventId: recorded.id,
        eventType: recorded.eventType,
        serverTimestamp: recorded.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[OCN Analytics Event API Error]", error);
    return NextResponse.json(
      { error: "Failed to record analytics event" },
      { status: 500 }
    );
  }
}
