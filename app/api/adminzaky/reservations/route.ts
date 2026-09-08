import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getZakySession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getZakySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reservations });
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

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Update reservation error:", error);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}
