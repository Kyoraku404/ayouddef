import { NextRequest, NextResponse } from "next/server";
import { reservationSchema } from "@/lib/validation";
import { createReservationRecord } from "@/lib/db";
import { sendReservationNotificationEmail } from "@/lib/email";

// Simple in-memory rate limiting: max 5 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Basic Rate Limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many reservation requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // Anti-spam honeypot check (if bot filled hidden field)
    if (body.website_trap || body._hp) {
      return NextResponse.json({ success: true, message: "Request received." });
    }

    const parseResult = reservationSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (path) {
          fieldErrors[path] = issue.message;
        }
      });

      return NextResponse.json(
        { error: "Validation failed. Please verify your entries.", fieldErrors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 3. Persist to Database via Prisma (with fallback resilience)
    const reservationDate = new Date(data.date);
    const reservation = await createReservationRecord({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      date: reservationDate,
      people: data.people,
      tour: data.tour,
      message: data.message || null,
    });

    // 4. Trigger Email Notifications asynchronously
    // Does not block response if SMTP takes a moment
    sendReservationNotificationEmail(data).catch((err) => {
      console.error("[Email Notification Error]", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your tour reservation request has been received.",
        reservationId: reservation.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Reservation API Error]", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again or contact Zaky directly." },
      { status: 500 }
    );
  }
}
