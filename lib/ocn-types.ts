export type OcnBookingStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELLED";
export type OcnWhatsAppLeadStatus = "CLICKED" | "CHATTED" | "QUOTED" | "CONFIRMED" | "DROPPED";
export type OcnSettlementStatus = "UNPAID" | "PARTIAL" | "PAID";
export type OcnPeriod = "2026-H1" | "2026-H2" | "2025-H1" | "2025-H2";

export interface OcnAdminUser {
  id: string;
  username: string;
  passwordHash: string;
  mustChangePassword: boolean;
  failedAttempts: number;
  lockedUntil?: string | null;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OcnClientProfile {
  id: string;
  name: string;
  legalName: string;
  domain: string;
  websiteOwnershipClient: number; // 70%
  websiteOwnershipOcn: number;    // 30%
  revenueShareOcn: number;        // 10%
  contractVersion: string;        // e.g. "v1.2 - 2026"
  maintenanceStatus: "ACTIVE" | "MAINTENANCE" | "SUSPENDED";
  contactEmail: string;
  contactPhone: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface OcnBookingRecord {
  id: string;
  clientId: string;
  websiteId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceTitle: string;
  bookingDate: string;
  partySize: number;
  status: OcnBookingStatus;
  whatsappLeadStatus: OcnWhatsAppLeadStatus;
  notes?: string;
  revenueAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OcnRevenueRecord {
  id: string;
  bookingId?: string;
  clientId: string;
  websiteId: string;
  clientName: string;
  serviceTitle: string;
  grossAmount: number;
  refundAmount: number;
  processingFees: number;
  definedRevenue: number;         // gross - refund - fees
  ocnShare: number;               // 10% of definedRevenue
  clientShare: number;            // 90% of definedRevenue
  period: OcnPeriod;
  settlementStatus: OcnSettlementStatus;
  isCorrection: boolean;
  originalTransactionId?: string;
  correctionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OcnSettlementRecord {
  id: string;
  clientId: string;
  period: OcnPeriod;
  grossRevenue: number;
  ocnShare: number;
  amountPaid: number;
  balanceDue: number;
  status: OcnSettlementStatus;
  settledAt?: string | null;
  paymentReference?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type OcnAuditAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "ACCOUNT_LOCKED"
  | "PASSWORD_CHANGED"
  | "LOGOUT"
  | "BOOKING_CREATED"
  | "BOOKING_STATUS_CHANGED"
  | "REVENUE_CREATED"
  | "REVENUE_CORRECTION"
  | "REFUND_RECORDED"
  | "SETTLEMENT_UPDATED"
  | "CLIENT_UPDATED"
  | "CONTRACT_UPDATED"
  | "ADMIN_ACTION";

export interface OcnAuditRecord {
  id: string;
  action: OcnAuditAction;
  entityType: string;
  entityId?: string;
  clientId?: string;
  performedBy: string;
  details: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

export interface OcnAnalyticsEvent {
  id: string;
  clientId: string;
  websiteId: string;
  eventType: "PAGEVIEW" | "BUTTON_CLICK" | "WHATSAPP_CLICK" | "PHONE_CLICK" | "INSTAGRAM_CLICK";
  page: string;
  referrer?: string;
  userAgent?: string;
  createdAt: string;
}

export interface OcnOverviewMetrics {
  totalClients: number;
  totalWebsites: number;
  totalVisitors: number;
  totalPageviews: number;
  totalClicks: number;
  whatsappClicks: number;
  totalLeads: number;
  confirmedReservations: number;
  completedTours: number;
  totalTrackedRevenue: number;
  ocnShareTotal: number;
  unpaidOcnAmount: number;
}
