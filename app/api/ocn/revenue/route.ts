import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnRevenue, createOcnRevenueTransaction, createOcnRevenueCorrection } from "@/lib/ocn-db";
import { OcnPeriod } from "@/lib/ocn-types";

export async function GET(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || undefined;
  const period = (searchParams.get("period") as OcnPeriod | "ALL") || "ALL";

  const revenue = await getOcnRevenue({ clientId, period });

  // Compute summary metrics server-side
  const totalGross = revenue.reduce((sum, r) => sum + r.grossAmount, 0);
  const totalRefund = revenue.reduce((sum, r) => sum + r.refundAmount, 0);
  const totalFees = revenue.reduce((sum, r) => sum + r.processingFees, 0);
  const totalDefined = revenue.reduce((sum, r) => sum + r.definedRevenue, 0);
  const totalOcnShare = revenue.reduce((sum, r) => sum + r.ocnShare, 0);
  const totalClientShare = revenue.reduce((sum, r) => sum + r.clientShare, 0);

  return NextResponse.json({
    revenue,
    summary: {
      totalGross,
      totalRefund,
      totalFees,
      totalDefined,
      totalOcnShare,
      totalClientShare,
    },
  });
}

export async function POST(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      bookingId,
      clientId,
      websiteId,
      clientName,
      serviceTitle,
      grossAmount,
      refundAmount,
      processingFees,
      period,
    } = body;

    if (!grossAmount || !serviceTitle) {
      return NextResponse.json(
        { error: "Service title and gross revenue amount are required." },
        { status: 400 }
      );
    }

    const created = await createOcnRevenueTransaction({
      bookingId,
      clientId: clientId || "client_zaky",
      websiteId: websiteId || "marrakeshitourguide",
      clientName: clientName || "Marrakeshi Tour Guide by Zaky",
      serviceTitle,
      grossAmount: parseFloat(grossAmount),
      refundAmount: refundAmount ? parseFloat(refundAmount) : 0,
      processingFees: processingFees ? parseFloat(processingFees) : 0,
      period: (period as OcnPeriod) || "2026-H2",
    });

    return NextResponse.json({ success: true, revenue: created });
  } catch (error) {
    console.error("[OCN Revenue] Create error:", error);
    return NextResponse.json({ error: "Failed to create revenue transaction." }, { status: 500 });
  }
}

// Financial Correction: MUST create a new correction record instead of modifying the original
export async function PUT(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { originalTransactionId, reason, correctedGross, correctedRefund, correctedFees } = body;

    if (!originalTransactionId || !reason || correctedGross === undefined) {
      return NextResponse.json(
        { error: "Original transaction ID, correction reason, and corrected gross amount are required." },
        { status: 400 }
      );
    }

    const correction = await createOcnRevenueCorrection({
      originalTransactionId,
      reason,
      correctedGross: parseFloat(correctedGross),
      correctedRefund: correctedRefund ? parseFloat(correctedRefund) : 0,
      correctedFees: correctedFees ? parseFloat(correctedFees) : 0,
    });

    if (!correction) {
      return NextResponse.json({ error: "Original transaction not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, correction });
  } catch (error) {
    console.error("[OCN Revenue] Correction error:", error);
    return NextResponse.json({ error: "Failed to record correction." }, { status: 500 });
  }
}
