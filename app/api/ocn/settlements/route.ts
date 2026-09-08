import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnSettlements, recordSettlementPayment } from "@/lib/ocn-db";

export async function GET(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || undefined;
  const format = searchParams.get("format");

  const settlements = await getOcnSettlements(clientId);

  // Return CSV file download if requested
  if (format === "csv") {
    const header = "Period,Client ID,Gross Revenue (MAD),OCN Share (10%),Amount Paid (MAD),Balance Due (MAD),Status,Payment Reference,Settled At\n";
    const rows = settlements
      .map(
        (s) =>
          `"${s.period}","${s.clientId}",${s.grossRevenue},${s.ocnShare},${s.amountPaid},${s.balanceDue},"${s.status}","${s.paymentReference || ""}","${s.settledAt || ""}"`
      )
      .join("\n");

    return new NextResponse(header + rows, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="ocn_settlements_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ settlements });
}

export async function POST(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, paymentAmount, reference } = body;

    if (!id || !paymentAmount) {
      return NextResponse.json(
        { error: "Settlement ID and payment amount are required." },
        { status: 400 }
      );
    }

    const updated = await recordSettlementPayment(
      id,
      parseFloat(paymentAmount),
      reference || "WIRE-PAYMENT"
    );

    if (!updated) {
      return NextResponse.json({ error: "Settlement record not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, settlement: updated });
  } catch (error) {
    console.error("[OCN Settlements] Payment error:", error);
    return NextResponse.json({ error: "Failed to record payment." }, { status: 500 });
  }
}
