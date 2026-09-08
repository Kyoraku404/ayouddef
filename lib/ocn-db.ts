import {
  Prisma,
  ReservationStatus,
  WhatsAppLeadStatus,
  AnalyticsEventType,
} from "@prisma/client";
import { prisma } from "./db";
import {
  OcnOverviewMetrics,
  OcnBookingStatus,
  OcnWhatsAppLeadStatus,
  OcnPeriod,
  OcnAuditAction,
} from "./ocn-types";

// ================= ADMIN USER AUTHENTICATION =================
export async function getOcnAdmin() {
  const admin = await prisma.adminUser.findFirst({
    where: { username: "ocnadmin" },
  });
  if (!admin) return null;
  return {
    id: admin.id,
    username: admin.username,
    passwordHash: admin.passwordHash,
    mustChangePassword: admin.mustChangePassword,
    failedAttempts: admin.failedAttempts,
    lockedUntil: admin.lockedUntil ? admin.lockedUntil.toISOString() : null,
    lastLoginAt: admin.lastLoginAt ? admin.lastLoginAt.toISOString() : null,
    createdAt: admin.createdAt.toISOString(),
    updatedAt: admin.updatedAt.toISOString(),
  };
}

export async function updateOcnAdminPassword(newHash: string) {
  const admin = await prisma.adminUser.findFirst({ where: { username: "ocnadmin" } });
  if (!admin) return;
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: {
      passwordHash: newHash,
      mustChangePassword: false,
      failedAttempts: 0,
      lockedUntil: null,
    },
  });

  await logOcnAudit({
    action: "PASSWORD_CHANGED",
    entityType: "AdminUser",
    entityId: admin.id,
    performedBy: admin.username,
    details: { reason: "Admin password updated in PostgreSQL" },
  });
}

export async function incrementOcnFailedAttempts() {
  const admin = await prisma.adminUser.findFirst({ where: { username: "ocnadmin" } });
  if (!admin) return 0;
  const attempts = admin.failedAttempts + 1;
  const lockedUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: {
      failedAttempts: attempts,
      lockedUntil,
    },
  });

  await logOcnAudit({
    action: "LOGIN_FAILED",
    entityType: "AdminUser",
    entityId: admin.id,
    performedBy: "unknown",
    details: { attempts, locked: attempts >= 5 },
  });

  return attempts;
}

export async function resetOcnFailedAttempts() {
  const admin = await prisma.adminUser.findFirst({ where: { username: "ocnadmin" } });
  if (!admin) return;
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: {
      failedAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    },
  });

  await logOcnAudit({
    action: "LOGIN_SUCCESS",
    entityType: "AdminUser",
    entityId: admin.id,
    performedBy: admin.username,
    details: { loginAt: new Date().toISOString() },
  });
}


// ================= OVERVIEW METRICS =================
export async function getOcnOverviewMetrics(clientId?: string): Promise<OcnOverviewMetrics> {
  const clientWhere = clientId ? { id: clientId } : undefined;
  const eventWhere = clientId ? { clientId } : undefined;
  const bookingWhere = clientId ? { clientId } : undefined;
  const revenueWhere = clientId ? { clientId, isVerified: true } : { isVerified: true };

  // 1. Client & Website Counts
  const totalClients = await prisma.client.count({ where: clientWhere });
  const totalWebsites = await prisma.website.count({
    where: clientId ? { clientId } : undefined,
  });

  // 2. Real Telemetry Aggregation from PostgreSQL
  const totalPageviews = await prisma.analyticsEvent.count({
    where: { ...eventWhere, eventType: AnalyticsEventType.PAGE_VIEW },
  });

  const whatsappClicks = await prisma.analyticsEvent.count({
    where: { ...eventWhere, eventType: AnalyticsEventType.WHATSAPP_CLICK },
  });

  const totalClicks = await prisma.analyticsEvent.count({
    where: {
      ...eventWhere,
      eventType: {
        in: [
          AnalyticsEventType.CLICK,
          AnalyticsEventType.WHATSAPP_CLICK,
          AnalyticsEventType.PHONE_CLICK,
          AnalyticsEventType.INSTAGRAM_CLICK,
        ],
      },
    },
  });

  const visitorEvents = await prisma.analyticsEvent.count({
    where: {
      ...eventWhere,
      eventType: { in: [AnalyticsEventType.VISITOR, AnalyticsEventType.PAGE_VIEW] },
    },
  });
  // Total visitors is at least unique sessions/pageviews
  const totalVisitors = Math.max(visitorEvents, totalPageviews);

  // 3. Real Bookings & Completed Tours
  const totalLeads = await prisma.reservation.count({ where: bookingWhere });
  const confirmedReservations = await prisma.reservation.count({
    where: {
      ...bookingWhere,
      status: { in: [ReservationStatus.ACCEPTED, ReservationStatus.COMPLETED] },
    },
  });
  const completedTours = await prisma.reservation.count({
    where: {
      ...bookingWhere,
      status: ReservationStatus.COMPLETED,
    },
  });

  // 4. Real Financial Totals using PostgreSQL Decimal Aggregations
  const revenueAgg = await prisma.revenue.aggregate({
    _sum: {
      grossAmount: true,
      definedRevenue: true,
    },
    where: revenueWhere,
  });

  const shareAgg = await prisma.ocnRevenueShare.aggregate({
    _sum: {
      ocnAmount: true,
    },
    where: clientId ? { revenue: { clientId } } : undefined,
  });

  const settlementAgg = await prisma.settlement.aggregate({
    _sum: {
      balanceDue: true,
    },
    where: clientId ? { clientId } : undefined,
  });

  const totalTrackedRevenue = revenueAgg._sum.grossAmount ? revenueAgg._sum.grossAmount.toNumber() : 0;
  const ocnShareTotal = shareAgg._sum.ocnAmount ? shareAgg._sum.ocnAmount.toNumber() : 0;
  const unpaidOcnAmount = settlementAgg._sum.balanceDue ? settlementAgg._sum.balanceDue.toNumber() : 0;

  return {
    totalClients,
    totalWebsites,
    totalVisitors,
    totalPageviews,
    totalClicks,
    whatsappClicks,
    totalLeads,
    confirmedReservations,
    completedTours,
    totalTrackedRevenue,
    ocnShareTotal,
    unpaidOcnAmount,
  };
}

// ================= CLIENTS =================
export async function getOcnClients() {
  return await prisma.client.findMany({
    include: {
      websites: true,
      commercialAgreements: true,
      settlements: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function getOcnClient(id: string) {
  return await prisma.client.findUnique({
    where: { id },
    include: {
      websites: true,
      commercialAgreements: true,
      settlements: true,
    },
  });
}

// ================= BOOKINGS =================
export async function getOcnBookings(filter?: {
  clientId?: string;
  status?: string | "ALL";
}) {
  const where: Prisma.ReservationWhereInput = {};
  if (filter?.clientId) where.clientId = filter.clientId;
  if (filter?.status && filter.status !== "ALL") {
    where.status = filter.status as ReservationStatus;
  }

  const list = await prisma.reservation.findMany({
    where,
    include: {
      statusHistory: { orderBy: { createdAt: "desc" } },
      revenue: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return list.map((b) => ({
    id: b.id,
    clientId: b.clientId,
    websiteId: b.websiteId,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    serviceTitle: b.serviceTitle,
    bookingDate: b.bookingDate.toISOString().slice(0, 10),
    partySize: b.partySize,
    status: b.status as OcnBookingStatus,
    whatsappLeadStatus: b.whatsappLeadStatus as OcnWhatsAppLeadStatus,
    revenueAmount: b.revenueAmount ? b.revenueAmount.toNumber() : undefined,
    notes: b.notes || "",
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));
}

export async function createOcnBooking(booking: {
  clientId?: string;
  websiteId?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceTitle: string;
  bookingDate: string;
  partySize: number;
  status: OcnBookingStatus;
  whatsappLeadStatus: OcnWhatsAppLeadStatus;
  revenueAmount?: number;
  notes?: string;
}) {
  let client = await prisma.client.findFirst({ where: booking.clientId ? { id: booking.clientId } : undefined });
  if (!client) {
    client = await prisma.client.findFirst() || await prisma.client.create({
      data: { id: "client_zaky", legalName: "Mohamed Zaky Bentabaa", displayName: "Marrakeshi Tour Guide by Zaky" },
    });
  }

  let website = await prisma.website.findFirst({ where: { clientId: client.id } });
  if (!website) {
    website = await prisma.website.create({
      data: { id: "web_zaky", clientId: client.id, domain: "marrakeshitourguide.com", name: "Marrakeshi Tour Guide Official Portal" },
    });
  }

  const created = await prisma.reservation.create({
    data: {
      clientId: client.id,
      websiteId: website.id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail || "",
      customerPhone: booking.customerPhone || "",
      serviceTitle: booking.serviceTitle,
      bookingDate: new Date(booking.bookingDate),
      partySize: booking.partySize,
      status: booking.status as ReservationStatus,
      whatsappLeadStatus: booking.whatsappLeadStatus as WhatsAppLeadStatus,
      revenueAmount: booking.revenueAmount ? new Prisma.Decimal(booking.revenueAmount) : null,
      notes: booking.notes || null,
      statusHistory: {
        create: {
          toStatus: booking.status as ReservationStatus,
          changedBy: "ocnadmin",
          notes: "Booking manually created in OCN Admin",
        },
      },
    },
  });

  await logOcnAudit({
    action: "BOOKING_CREATED",
    entityType: "Reservation",
    entityId: created.id,
    clientId: client.id,
    performedBy: "ocnadmin",
    details: { customerName: created.customerName, service: created.serviceTitle, status: created.status },
  });

  return {
    id: created.id,
    clientId: created.clientId,
    websiteId: created.websiteId,
    customerName: created.customerName,
    customerEmail: created.customerEmail,
    customerPhone: created.customerPhone,
    serviceTitle: created.serviceTitle,
    bookingDate: created.bookingDate.toISOString().slice(0, 10),
    partySize: created.partySize,
    status: created.status as OcnBookingStatus,
    whatsappLeadStatus: created.whatsappLeadStatus as OcnWhatsAppLeadStatus,
    revenueAmount: created.revenueAmount ? created.revenueAmount.toNumber() : undefined,
    notes: created.notes || "",
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
}

export async function updateOcnBookingStatus(
  id: string,
  status: OcnBookingStatus,
  whatsappLeadStatus?: OcnWhatsAppLeadStatus,
  revenueAmount?: number
) {
  const existing = await prisma.reservation.findUnique({ where: { id } });
  if (!existing) return null;

  const oldStatus = existing.status;
  const updated = await prisma.reservation.update({
    where: { id },
    data: {
      status: status as ReservationStatus,
      whatsappLeadStatus: whatsappLeadStatus ? (whatsappLeadStatus as WhatsAppLeadStatus) : undefined,
      revenueAmount: revenueAmount !== undefined ? new Prisma.Decimal(revenueAmount) : undefined,
      statusHistory: {
        create: {
          fromStatus: oldStatus,
          toStatus: status as ReservationStatus,
          changedBy: "ocnadmin",
          notes: `Status changed from ${oldStatus} to ${status}`,
        },
      },
    },
  });

  // If marked COMPLETED and has revenue amount, automatically record verified revenue
  if (status === "COMPLETED") {
    const grossVal = revenueAmount || (existing.revenueAmount ? existing.revenueAmount.toNumber() : 0);
    if (grossVal > 0) {
      const existingRev = await prisma.revenue.findUnique({ where: { reservationId: id } });
      if (!existingRev) {
        await createOcnRevenueTransaction({
          bookingId: id,
          clientId: existing.clientId,
          websiteId: existing.websiteId,
          clientName: "Marrakeshi Tour Guide by Zaky",
          serviceTitle: existing.serviceTitle,
          grossAmount: grossVal,
          refundAmount: 0,
          processingFees: 0,
          period: "2026-H2",
        });
      }
    }
  }

  await logOcnAudit({
    action: "BOOKING_STATUS_CHANGED",
    entityType: "Reservation",
    entityId: id,
    clientId: existing.clientId,
    performedBy: "ocnadmin",
    details: { oldStatus, newStatus: status, whatsappLeadStatus },
  });

  return {
    id: updated.id,
    clientId: updated.clientId,
    websiteId: updated.websiteId,
    customerName: updated.customerName,
    customerEmail: updated.customerEmail,
    customerPhone: updated.customerPhone,
    serviceTitle: updated.serviceTitle,
    bookingDate: updated.bookingDate.toISOString().slice(0, 10),
    partySize: updated.partySize,
    status: updated.status as OcnBookingStatus,
    whatsappLeadStatus: updated.whatsappLeadStatus as OcnWhatsAppLeadStatus,
    revenueAmount: updated.revenueAmount ? updated.revenueAmount.toNumber() : undefined,
    notes: updated.notes || "",
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

// ================= REVENUE & EXACT 10% DECIMAL MATH =================
export async function getOcnRevenue(filter?: {
  clientId?: string;
  period?: string | "ALL";
}) {
  const where: Prisma.RevenueWhereInput = {};
  if (filter?.clientId) where.clientId = filter.clientId;
  if (filter?.period && filter.period !== "ALL") where.periodId = filter.period;

  const records = await prisma.revenue.findMany({
    where,
    include: {
      revenueShare: true,
      client: true,
      website: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return records.map((r) => {
    const ocnShare = r.revenueShare ? r.revenueShare.ocnAmount.toNumber() : r.definedRevenue.mul(new Prisma.Decimal(0.10)).toNumber();
    const clientShare = r.revenueShare ? r.revenueShare.clientAmount.toNumber() : r.definedRevenue.minus(new Prisma.Decimal(ocnShare)).toNumber();

    return {
      id: r.id,
      bookingId: r.reservationId || undefined,
      clientId: r.clientId,
      websiteId: r.websiteId,
      clientName: r.client?.displayName || "Marrakeshi Tour Guide by Zaky",
      serviceTitle: r.serviceTitle,
      grossAmount: r.grossAmount.toNumber(),
      refundAmount: r.refundAmount.toNumber(),
      processingFees: r.processingFees.toNumber(),
      definedRevenue: r.definedRevenue.toNumber(),
      ocnShare,
      clientShare,
      period: r.periodId as OcnPeriod,
      settlementStatus: r.settlementStatus as "UNPAID" | "PARTIAL" | "PAID",
      isCorrection: r.isCorrection,
      originalTransactionId: r.originalRevenueId || undefined,
      correctionReason: r.correctionReason || undefined,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  });
}

export async function createOcnRevenueTransaction(data: {
  bookingId?: string;
  clientId: string;
  websiteId: string;
  clientName?: string;
  serviceTitle: string;
  grossAmount: number;
  refundAmount?: number;
  processingFees?: number;
  period: OcnPeriod;
}) {
  const gross = new Prisma.Decimal(data.grossAmount);
  const refund = new Prisma.Decimal(data.refundAmount || 0);
  const fees = new Prisma.Decimal(data.processingFees || 0);

  // Exact Decimal calculation: defined = gross - refund - fees
  const definedRevenue = gross.minus(refund).minus(fees);
  // OCN Share = defined * 0.10 (strictly 10%)
  const ocnAmount = definedRevenue.mul(new Prisma.Decimal(0.10)).toDecimalPlaces(2);
  // Client Share = defined - ocnShare
  const clientAmount = definedRevenue.minus(ocnAmount);

  // Ensure period exists
  await prisma.revenuePeriod.upsert({
    where: { id: data.period },
    update: {},
    create: {
      id: data.period,
      periodName: data.period,
      startDate: data.period.includes("H1") ? new Date("2026-01-01") : new Date("2026-07-01"),
      endDate: data.period.includes("H1") ? new Date("2026-06-30") : new Date("2026-12-31"),
      dueDate: data.period.includes("H1") ? new Date("2026-07-31") : new Date("2027-01-31"),
    },
  });

  const rev = await prisma.revenue.create({
    data: {
      reservationId: data.bookingId || null,
      clientId: data.clientId,
      websiteId: data.websiteId,
      periodId: data.period,
      serviceTitle: data.serviceTitle,
      grossAmount: gross,
      refundAmount: refund,
      processingFees: fees,
      definedRevenue,
      isVerified: true,
      verifiedAt: new Date(),
      verifiedBy: "ocnadmin",
      settlementStatus: "UNPAID",
      revenueShare: {
        create: {
          ocnPercentage: new Prisma.Decimal(10.00),
          clientPercentage: new Prisma.Decimal(90.00),
          ocnAmount,
          clientAmount,
        },
      },
    },
    include: { revenueShare: true },
  });

  // Update settlement balance due in PostgreSQL
  const existingSettlement = await prisma.settlement.findUnique({
    where: { clientId_periodId: { clientId: data.clientId, periodId: data.period } },
  });

  if (existingSettlement) {
    const newGross = existingSettlement.grossRevenue.plus(gross);
    const newDefined = existingSettlement.definedRevenue.plus(definedRevenue);
    const newOcn = existingSettlement.ocnShare.plus(ocnAmount);
    const newBal = newOcn.minus(existingSettlement.amountPaid);
    await prisma.settlement.update({
      where: { id: existingSettlement.id },
      data: {
        grossRevenue: newGross,
        definedRevenue: newDefined,
        ocnShare: newOcn,
        balanceDue: newBal,
        status: newBal.lessThanOrEqualTo(0) ? "PAID" : existingSettlement.amountPaid.greaterThan(0) ? "PARTIAL" : "UNPAID",
      },
    });
  } else {
    await prisma.settlement.create({
      data: {
        clientId: data.clientId,
        periodId: data.period,
        grossRevenue: gross,
        definedRevenue,
        ocnShare: ocnAmount,
        amountPaid: new Prisma.Decimal(0.00),
        balanceDue: ocnAmount,
        status: "UNPAID",
        dueDate: data.period.includes("H1") ? new Date("2026-07-31") : new Date("2027-01-31"),
      },
    });
  }

  await logOcnAudit({
    action: "REVENUE_CREATED",
    entityType: "Revenue",
    entityId: rev.id,
    clientId: data.clientId,
    performedBy: "ocnadmin",
    details: { gross: data.grossAmount, defined: definedRevenue.toNumber(), ocnShare: ocnAmount.toNumber() },
  });

  return {
    id: rev.id,
    bookingId: rev.reservationId || undefined,
    clientId: rev.clientId,
    websiteId: rev.websiteId,
    clientName: "Marrakeshi Tour Guide by Zaky",
    serviceTitle: rev.serviceTitle,
    grossAmount: rev.grossAmount.toNumber(),
    refundAmount: rev.refundAmount.toNumber(),
    processingFees: rev.processingFees.toNumber(),
    definedRevenue: rev.definedRevenue.toNumber(),
    ocnShare: ocnAmount.toNumber(),
    clientShare: clientAmount.toNumber(),
    period: rev.periodId as OcnPeriod,
    settlementStatus: rev.settlementStatus as "UNPAID" | "PARTIAL" | "PAID",
    isCorrection: false,
    createdAt: rev.createdAt.toISOString(),
    updatedAt: rev.updatedAt.toISOString(),
  };
}

export async function createOcnRevenueCorrection(data: {
  originalTransactionId: string;
  reason: string;
  correctedGross: number;
  correctedRefund: number;
  correctedFees: number;
}) {
  const original = await prisma.revenue.findUnique({
    where: { id: data.originalTransactionId },
  });
  if (!original) return null;

  const gross = new Prisma.Decimal(data.correctedGross);
  const refund = new Prisma.Decimal(data.correctedRefund || 0);
  const fees = new Prisma.Decimal(data.correctedFees || 0);
  const defined = gross.minus(refund).minus(fees);
  const ocnAmount = defined.mul(new Prisma.Decimal(0.10)).toDecimalPlaces(2);
  const clientAmount = defined.minus(ocnAmount);

  // IMMUTABLE CORRECTION: Spawns a new row in PostgreSQL referencing the original
  const correction = await prisma.revenue.create({
    data: {
      reservationId: null,
      clientId: original.clientId,
      websiteId: original.websiteId,
      periodId: original.periodId,
      serviceTitle: `[CORRECTION] ${original.serviceTitle}`,
      grossAmount: gross,
      refundAmount: refund,
      processingFees: fees,
      definedRevenue: defined,
      isVerified: true,
      verifiedAt: new Date(),
      verifiedBy: "ocnadmin",
      isCorrection: true,
      originalRevenueId: original.id,
      correctionReason: data.reason,
      settlementStatus: original.settlementStatus,
      revenueShare: {
        create: {
          ocnPercentage: new Prisma.Decimal(10.00),
          clientPercentage: new Prisma.Decimal(90.00),
          ocnAmount,
          clientAmount,
        },
      },
    },
    include: { revenueShare: true },
  });

  await logOcnAudit({
    action: "REVENUE_CORRECTION",
    entityType: "Revenue",
    entityId: correction.id,
    clientId: original.clientId,
    performedBy: "ocnadmin",
    details: {
      originalId: original.id,
      reason: data.reason,
      oldGross: original.grossAmount.toNumber(),
      newGross: data.correctedGross,
      newOcnShare: ocnAmount.toNumber(),
    },
  });

  return {
    id: correction.id,
    bookingId: original.reservationId || undefined,
    clientId: correction.clientId,
    websiteId: correction.websiteId,
    clientName: "Marrakeshi Tour Guide by Zaky",
    serviceTitle: correction.serviceTitle,
    grossAmount: correction.grossAmount.toNumber(),
    refundAmount: correction.refundAmount.toNumber(),
    processingFees: correction.processingFees.toNumber(),
    definedRevenue: correction.definedRevenue.toNumber(),
    ocnShare: ocnAmount.toNumber(),
    clientShare: clientAmount.toNumber(),
    period: correction.periodId as OcnPeriod,
    settlementStatus: correction.settlementStatus as "UNPAID" | "PARTIAL" | "PAID",
    isCorrection: true,
    originalTransactionId: original.id,
    correctionReason: data.reason,
    createdAt: correction.createdAt.toISOString(),
    updatedAt: correction.updatedAt.toISOString(),
  };
}

// ================= SETTLEMENTS =================
export async function getOcnSettlements(clientId?: string) {
  const where = clientId ? { clientId } : undefined;
  const list = await prisma.settlement.findMany({
    where,
    orderBy: { periodId: "desc" },
  });

  return list.map((s) => ({
    id: s.id,
    clientId: s.clientId,
    period: s.periodId as OcnPeriod,
    grossRevenue: s.grossRevenue.toNumber(),
    ocnShare: s.ocnShare.toNumber(),
    amountPaid: s.amountPaid.toNumber(),
    balanceDue: s.balanceDue.toNumber(),
    status: s.status as "UNPAID" | "PARTIAL" | "PAID",
    settledAt: s.settledAt ? s.settledAt.toISOString() : undefined,
    paymentReference: s.paymentReference || undefined,
    dueDate: s.dueDate ? s.dueDate.toISOString() : undefined,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));
}

export async function recordSettlementPayment(
  id: string,
  paymentAmount: number,
  reference: string
) {
  const settlement = await prisma.settlement.findUnique({ where: { id } });
  if (!settlement) return null;

  const paymentDecimal = new Prisma.Decimal(paymentAmount);
  const newPaid = settlement.amountPaid.plus(paymentDecimal);
  const newBalance = settlement.ocnShare.minus(newPaid);
  const isPaid = newBalance.lessThanOrEqualTo(0);

  const updated = await prisma.settlement.update({
    where: { id },
    data: {
      amountPaid: newPaid,
      balanceDue: isPaid ? new Prisma.Decimal(0.00) : newBalance,
      status: isPaid ? "PAID" : "PARTIAL",
      paymentReference: reference,
      settledAt: isPaid ? new Date() : settlement.settledAt,
    },
  });

  await logOcnAudit({
    action: "SETTLEMENT_UPDATED",
    entityType: "Settlement",
    entityId: id,
    clientId: settlement.clientId,
    performedBy: "ocnadmin",
    details: { paymentAmount, reference, balanceDue: updated.balanceDue.toNumber(), status: updated.status },
  });

  return {
    id: updated.id,
    clientId: updated.clientId,
    period: updated.periodId as OcnPeriod,
    grossRevenue: updated.grossRevenue.toNumber(),
    ocnShare: updated.ocnShare.toNumber(),
    amountPaid: updated.amountPaid.toNumber(),
    balanceDue: updated.balanceDue.toNumber(),
    status: updated.status as "UNPAID" | "PARTIAL" | "PAID",
    settledAt: updated.settledAt ? updated.settledAt.toISOString() : undefined,
    paymentReference: updated.paymentReference || undefined,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

// ================= AUDIT LOGS =================
export async function getOcnAuditLogs(limit: number = 100) {
  const logs = await prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return logs.map((l) => ({
    id: l.id,
    action: l.action as OcnAuditAction,
    entityType: l.entityType,
    entityId: l.entityId || undefined,
    clientId: l.clientId || undefined,
    performedBy: l.performedBy,
    details: l.details as Record<string, any>,
    ipAddress: l.ipAddress || undefined,
    createdAt: l.createdAt.toISOString(),
  }));
}

export async function logOcnAudit(entry: {
  action: OcnAuditAction;
  entityType: string;
  entityId?: string;
  clientId?: string;
  performedBy: string;
  details: Record<string, any>;
  ipAddress?: string;
}) {
  return await prisma.auditLog.create({
    data: {
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      clientId: entry.clientId,
      performedBy: entry.performedBy,
      details: entry.details,
      ipAddress: entry.ipAddress,
    },
  });
}

// ================= ANALYTICS =================
export async function recordOcnAnalyticsEvent(event: {
  domain?: string;
  clientId?: string;
  websiteId?: string;
  eventType: AnalyticsEventType;
  page: string;
  referrer?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}) {
  // Resolve website and client in PostgreSQL
  let website = null;
  if (event.domain) {
    website = await prisma.website.findUnique({ where: { domain: event.domain } });
  } else if (event.websiteId) {
    website = await prisma.website.findUnique({ where: { id: event.websiteId } });
  }

  if (!website) {
    website = await prisma.website.findFirst();
  }

  if (!website) {
    throw new Error("No website registered in database");
  }

  return await prisma.analyticsEvent.create({
    data: {
      clientId: website.clientId,
      websiteId: website.id,
      eventType: event.eventType,
      page: event.page,
      referrer: event.referrer || null,
      userAgent: event.userAgent || null,
      metadata: event.metadata || null,
    },
  });
}

export async function getOcnAnalytics(clientId?: string) {
  const where = clientId ? { clientId } : undefined;

  // Real aggregations from PostgreSQL
  const totalPageviews = await prisma.analyticsEvent.count({
    where: { ...where, eventType: AnalyticsEventType.PAGE_VIEW },
  });

  const whatsappClicks = await prisma.analyticsEvent.count({
    where: { ...where, eventType: AnalyticsEventType.WHATSAPP_CLICK },
  });

  const buttonClicks = await prisma.analyticsEvent.count({
    where: { ...where, eventType: AnalyticsEventType.CLICK },
  });

  const phoneClicks = await prisma.analyticsEvent.count({
    where: { ...where, eventType: AnalyticsEventType.PHONE_CLICK },
  });

  const instagramClicks = await prisma.analyticsEvent.count({
    where: { ...where, eventType: AnalyticsEventType.INSTAGRAM_CLICK },
  });

  const conversionRate = totalPageviews > 0
    ? ((whatsappClicks / totalPageviews) * 100).toFixed(2)
    : "0.00";

  // Top visited pages grouped directly by PostgreSQL
  const topPagesGroup = await prisma.analyticsEvent.groupBy({
    by: ["page"],
    _count: { id: true },
    where: { ...where, eventType: AnalyticsEventType.PAGE_VIEW },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  const topPages = topPagesGroup.map((g) => ({
    page: g.page,
    views: g._count.id,
  }));

  if (topPages.length === 0) {
    topPages.push({ page: "/", views: totalPageviews || 1 });
  }

  const recentEvents = await prisma.analyticsEvent.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return {
    totalPageviews,
    whatsappClicks,
    buttonClicks,
    phoneClicks,
    instagramClicks,
    conversionRate,
    topPages,
    recentEvents: recentEvents.map((e) => ({
      id: e.id,
      eventType: e.eventType,
      page: e.page,
      createdAt: e.createdAt.toISOString(),
    })),
  };
}
