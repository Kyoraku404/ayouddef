import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnBookings, updateOcnBookingStatus, createOcnBooking } from "@/lib/ocn-db";
import { OcnBookingStatus, OcnWhatsAppLeadStatus } from "@/lib/ocn-types";

export async function GET(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || undefined;
  const status = (searchParams.get("status") as OcnBookingStatus | "ALL") || "ALL";

  const bookings = await getOcnBookings({ clientId, status });

  return NextResponse.json({ bookings });
}

export async function PUT(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, whatsappLeadStatus, revenueAmount } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Booking ID and status are required." }, { status: 400 });
    }

    const updated = await updateOcnBookingStatus(
      id,
      status as OcnBookingStatus,
      whatsappLeadStatus as OcnWhatsAppLeadStatus,
      revenueAmount !== undefined ? parseFloat(revenueAmount) : undefined
    );

    if (!updated) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("[OCN Bookings] Update error:", error);
    return NextResponse.json({ error: "Failed to update booking." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      clientId,
      websiteId,
      customerName,
      customerEmail,
      customerPhone,
      serviceTitle,
      bookingDate,
      partySize,
      status,
      whatsappLeadStatus,
      revenueAmount,
      notes,
    } = body;

    if (!customerName || !serviceTitle || !bookingDate) {
      return NextResponse.json(
        { error: "Customer name, service, and date are required." },
        { status: 400 }
      );
    }

    const created = await createOcnBooking({
      clientId: clientId || "client_zaky",
      websiteId: websiteId || "marrakeshitourguide",
      customerName,
      customerEmail: customerEmail || "",
      customerPhone: customerPhone || "",
      serviceTitle,
      bookingDate,
      partySize: parseInt(partySize, 10) || 2,
      status: (status as OcnBookingStatus) || "PENDING",
      whatsappLeadStatus: (whatsappLeadStatus as OcnWhatsAppLeadStatus) || "CLICKED",
      revenueAmount: revenueAmount ? parseFloat(revenueAmount) : undefined,
      notes: notes || "",
    });

    return NextResponse.json({ success: true, booking: created });
  } catch (error) {
    console.error("[OCN Bookings] Create error:", error);
    return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
  }
}
