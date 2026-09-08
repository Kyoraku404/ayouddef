import { PrismaClient, ReservationStatus, WhatsAppLeadStatus } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prismaGlobal ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export async function createReservationRecord(data: {
  fullName: string;
  email: string;
  phone: string;
  date: Date;
  people: number;
  tour: string;
  message?: string | null;
}) {
  // Ensure default client and website exist
  let client = await prisma.client.findFirst();
  if (!client) {
    client = await prisma.client.create({
      data: {
        id: "client_zaky",
        legalName: "Mohamed Zaky Bentabaa",
        displayName: "Marrakeshi Tour Guide by Zaky",
      },
    });
  }

  let website = await prisma.website.findFirst({ where: { clientId: client.id } });
  if (!website) {
    website = await prisma.website.create({
      data: {
        id: "web_zaky",
        clientId: client.id,
        domain: "marrakeshitourguide.com",
        name: "Marrakeshi Tour Guide Official Portal",
      },
    });
  }

  // Determine standard pricing estimate based on tour name
  let estimatedGross = 700.00;
  if (data.tour.toLowerCase().includes("signature") || data.tour.toLowerCase().includes("7 days")) {
    estimatedGross = 6500.00;
  } else if (data.tour.toLowerCase().includes("atlas") || data.tour.toLowerCase().includes("day trip") || data.tour.toLowerCase().includes("essaouira")) {
    estimatedGross = 1200.00;
  } else if (data.tour.toLowerCase().includes("food")) {
    estimatedGross = 800.00;
  } else if (data.tour.toLowerCase().includes("heritage") || data.tour.toLowerCase().includes("historical")) {
    estimatedGross = 900.00;
  }

  const reservation = await prisma.reservation.create({
    data: {
      clientId: client.id,
      websiteId: website.id,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
      serviceTitle: data.tour,
      bookingDate: data.date,
      partySize: data.people,
      status: ReservationStatus.PENDING,
      whatsappLeadStatus: WhatsAppLeadStatus.INITIATED,
      revenueAmount: estimatedGross,
      notes: data.message || null,
      statusHistory: {
        create: {
          toStatus: ReservationStatus.PENDING,
          changedBy: "public_website_form",
          notes: "Initial reservation submission from website form",
        },
      },
    },
  });

  // Create real audit log in PostgreSQL
  await prisma.auditLog.create({
    data: {
      clientId: client.id,
      action: "RESERVATION_CREATED",
      entityType: "Reservation",
      entityId: reservation.id,
      performedBy: "public_guest",
      details: {
        customerName: data.fullName,
        service: data.tour,
        date: data.date.toISOString(),
        partySize: data.people,
      },
    },
  });

  return reservation;
}

export async function getReservationsList(statusFilter?: string) {
  return await prisma.reservation.findMany({
    where: statusFilter && statusFilter !== "ALL" ? { status: statusFilter as ReservationStatus } : undefined,
    include: { statusHistory: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const existing = await prisma.reservation.findUnique({ where: { id } });
  if (!existing) throw new Error("Reservation not found");

  const updated = await prisma.reservation.update({
    where: { id },
    data: {
      status,
      statusHistory: {
        create: {
          fromStatus: existing.status,
          toStatus: status,
          changedBy: "admin",
          notes: `Status changed from ${existing.status} to ${status}`,
        },
      },
    },
  });

  await prisma.auditLog.create({
    data: {
      clientId: existing.clientId,
      action: "RESERVATION_STATUS_CHANGED",
      entityType: "Reservation",
      entityId: id,
      performedBy: "admin",
      details: {
        fromStatus: existing.status,
        toStatus: status,
      },
    },
  });

  return updated;
}

export async function deleteReservationRecord(id: string) {
  const existing = await prisma.reservation.findUnique({ where: { id } });
  if (!existing) throw new Error("Reservation not found");

  await prisma.reservation.delete({ where: { id } });

  await prisma.auditLog.create({
    data: {
      clientId: existing.clientId,
      action: "RESERVATION_DELETED",
      entityType: "Reservation",
      entityId: id,
      performedBy: "admin",
      details: {
        customerName: existing.customerName,
      },
    },
  });

  return { id };
}
