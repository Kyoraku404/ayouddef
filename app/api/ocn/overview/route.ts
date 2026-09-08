import { NextResponse } from "next/server";
import { getOcnSession } from "@/lib/ocn-auth";
import { getOcnOverviewMetrics, getOcnClients, getOcnBookings, getOcnRevenue } from "@/lib/ocn-db";

export async function GET(request: Request) {
  const session = await getOcnSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || undefined;

  const metrics = await getOcnOverviewMetrics(clientId);
  const clients = await getOcnClients();
  const recentBookings = (await getOcnBookings({ clientId })).slice(0, 5);
  const recentRevenue = (await getOcnRevenue({ clientId })).slice(0, 5);

  // Booking Funnel calculation
  const funnel = [
    { stage: "Total Visitors", count: metrics.totalVisitors, rate: "100%" },
    { stage: "WhatsApp Clicks", count: metrics.whatsappClicks, rate: `${((metrics.whatsappClicks / metrics.totalVisitors) * 100).toFixed(1)}%` },
    { stage: "Reservation Leads", count: metrics.totalLeads, rate: `${((metrics.totalLeads / metrics.whatsappClicks) * 100).toFixed(1)}%` },
    { stage: "Confirmed Bookings", count: metrics.confirmedReservations, rate: `${((metrics.confirmedReservations / metrics.totalLeads) * 100).toFixed(1)}%` },
    { stage: "Completed Tours", count: metrics.completedTours, rate: `${((metrics.completedTours / metrics.confirmedReservations) * 100).toFixed(1)}%` },
    { stage: "Revenue Recorded", count: metrics.totalTrackedRevenue, isCurrency: true, rate: "Verified" },
  ];

  return NextResponse.json({
    metrics,
    funnel,
    clients,
    recentBookings,
    recentRevenue,
  });
}
