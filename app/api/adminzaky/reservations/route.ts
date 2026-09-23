import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getZakySession } from "@/lib/auth";
import { ReservationStatus } from "@prisma/client";

export async function GET() {
  try {
    const session = await getZakySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reservations: reservations.map((r) => ({
      id: r.id, bookingRef: r.id.slice(-8).toUpperCase(), fullName: r.customerName,
      email: r.customerEmail, phone: r.customerPhone, tourName: r.serviceTitle,
      tourSlug: "", date: r.bookingDate, guestsCount: r.partySize,
      totalPriceMad: r.revenueAmount === null ? null : Number(r.revenueAmount),
      status: r.status, createdAt: r.createdAt, specialRequests: r.notes,
    })) });
  } catch (error) {
    console.error("Fetch reservations error:", error);
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getZakySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status, notes } = await req.json();

    if (typeof id !== "string" || !Object.values(ReservationStatus).includes(status) || (notes !== undefined && notes !== null && typeof notes !== "string")) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    const existing = await prisma.reservation.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        status,
        statusHistory: { create: { fromStatus: existing.status, toStatus: status, changedBy: session.username } },
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Update reservation error:", error);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}
