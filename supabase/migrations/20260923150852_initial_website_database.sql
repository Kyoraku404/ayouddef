-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WhatsAppLeadStatus" AS ENUM ('CLICKED', 'INITIATED', 'CHATTING', 'QUOTE_SENT', 'CONVERTED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "AnalyticsEventType" AS ENUM ('PAGE_VIEW', 'VISITOR', 'CLICK', 'WHATSAPP_CLICK', 'PHONE_CLICK', 'INSTAGRAM_CLICK', 'RESERVATION_START', 'RESERVATION_SUBMITTED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT NOT NULL,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,
    "failedAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "ownershipClient" DECIMAL(5,2) NOT NULL DEFAULT 70.00,
    "ownershipOcn" DECIMAL(5,2) NOT NULL DEFAULT 30.00,
    "revenueShareOcn" DECIMAL(5,2) NOT NULL DEFAULT 10.00,
    "maintenanceStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommercialAgreement" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT 'v1.2 - 2026',
    "title" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownershipClient" DECIMAL(5,2) NOT NULL DEFAULT 70.00,
    "ownershipOcn" DECIMAL(5,2) NOT NULL DEFAULT 30.00,
    "revenueShareOcn" DECIMAL(5,2) NOT NULL DEFAULT 10.00,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "clauses" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommercialAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "eventType" "AnalyticsEventType" NOT NULL,
    "page" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "serviceTitle" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "partySize" INTEGER NOT NULL DEFAULT 2,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "whatsappLeadStatus" "WhatsAppLeadStatus" NOT NULL DEFAULT 'CLICKED',
    "revenueAmount" DECIMAL(10,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationStatusHistory" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "fromStatus" "ReservationStatus",
    "toStatus" "ReservationStatus" NOT NULL,
    "changedBy" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReservationStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenuePeriod" (
    "id" TEXT NOT NULL,
    "periodName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RevenuePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT,
    "clientId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "serviceTitle" TEXT NOT NULL,
    "grossAmount" DECIMAL(10,2) NOT NULL,
    "refundAmount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "processingFees" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "definedRevenue" DECIMAL(10,2) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "isCorrection" BOOLEAN NOT NULL DEFAULT false,
    "originalRevenueId" TEXT,
    "correctionReason" TEXT,
    "settlementStatus" TEXT NOT NULL DEFAULT 'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OcnRevenueShare" (
    "id" TEXT NOT NULL,
    "revenueId" TEXT NOT NULL,
    "ocnPercentage" DECIMAL(5,2) NOT NULL DEFAULT 10.00,
    "clientPercentage" DECIMAL(5,2) NOT NULL DEFAULT 90.00,
    "ocnAmount" DECIMAL(10,2) NOT NULL,
    "clientAmount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OcnRevenueShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settlement" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "grossRevenue" DECIMAL(10,2) NOT NULL,
    "definedRevenue" DECIMAL(10,2) NOT NULL,
    "ocnShare" DECIMAL(10,2) NOT NULL,
    "amountPaid" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "balanceDue" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNPAID',
    "paymentReference" TEXT,
    "settledAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "performedBy" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "getYourGuideUrl" TEXT,
    "duration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZakyUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'zaky',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZakyUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteImage" (
    "id" TEXT NOT NULL,
    "slotKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "section" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourPackage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "price" TEXT NOT NULL,
    "priceNote" TEXT,
    "duration" TEXT,
    "groupType" TEXT,
    "languages" TEXT,
    "badge" TEXT,
    "description" TEXT,
    "cardDescription" TEXT,
    "fullDescription" TEXT,
    "icon" TEXT,
    "cls" TEXT,
    "cardImage" TEXT,
    "highlights" TEXT,
    "included" TEXT,
    "notIncluded" TEXT,
    "itinerary" TEXT,
    "mapCenter" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideBio" (
    "id" TEXT NOT NULL DEFAULT 'guide_zaky',
    "name" TEXT NOT NULL DEFAULT 'Zaky',
    "fullName" TEXT NOT NULL DEFAULT 'Mohamed Zaky Bentabaa',
    "eyebrow" TEXT NOT NULL DEFAULT 'Meet your guide',
    "title" TEXT NOT NULL DEFAULT 'About Me',
    "bioP1" TEXT NOT NULL,
    "bioP2" TEXT NOT NULL,
    "bioP3" TEXT NOT NULL,
    "bioP4" TEXT NOT NULL,
    "signoff" TEXT NOT NULL DEFAULT 'Marrakech, curated by Zaky',
    "rating" TEXT NOT NULL DEFAULT '5.0★',
    "reviewsCount" TEXT NOT NULL DEFAULT '41',
    "experienceYears" TEXT NOT NULL DEFAULT '19',
    "signatureTours" TEXT NOT NULL DEFAULT '7',
    "languages" TEXT NOT NULL DEFAULT 'Arabic, French, English',
    "badgeText" TEXT NOT NULL DEFAULT '41 verified Google reviews',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuideBio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Website_domain_key" ON "Website"("domain");

-- CreateIndex
CREATE INDEX "Website_clientId_idx" ON "Website"("clientId");

-- CreateIndex
CREATE INDEX "CommercialAgreement_clientId_idx" ON "CommercialAgreement"("clientId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_clientId_eventType_createdAt_idx" ON "AnalyticsEvent"("clientId", "eventType", "createdAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_websiteId_createdAt_idx" ON "AnalyticsEvent"("websiteId", "createdAt");

-- CreateIndex
CREATE INDEX "Reservation_clientId_status_idx" ON "Reservation"("clientId", "status");

-- CreateIndex
CREATE INDEX "Reservation_websiteId_createdAt_idx" ON "Reservation"("websiteId", "createdAt");

-- CreateIndex
CREATE INDEX "ReservationStatusHistory_reservationId_createdAt_idx" ON "ReservationStatusHistory"("reservationId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Revenue_reservationId_key" ON "Revenue"("reservationId");

-- CreateIndex
CREATE INDEX "Revenue_clientId_periodId_idx" ON "Revenue"("clientId", "periodId");

-- CreateIndex
CREATE INDEX "Revenue_isVerified_settlementStatus_idx" ON "Revenue"("isVerified", "settlementStatus");

-- CreateIndex
CREATE UNIQUE INDEX "OcnRevenueShare_revenueId_key" ON "OcnRevenueShare"("revenueId");

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_clientId_periodId_key" ON "Settlement"("clientId", "periodId");

-- CreateIndex
CREATE INDEX "AuditLog_action_createdAt_idx" ON "AuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_clientId_createdAt_idx" ON "AuditLog"("clientId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tour_slug_key" ON "Tour"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ZakyUser_username_key" ON "ZakyUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SiteImage_slotKey_key" ON "SiteImage"("slotKey");

-- CreateIndex
CREATE INDEX "SiteImage_section_idx" ON "SiteImage"("section");

-- CreateIndex
CREATE UNIQUE INDEX "TourPackage_slug_key" ON "TourPackage"("slug");

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommercialAgreement" ADD CONSTRAINT "CommercialAgreement_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationStatusHistory" ADD CONSTRAINT "ReservationStatusHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "RevenuePeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OcnRevenueShare" ADD CONSTRAINT "OcnRevenueShare_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "Revenue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "RevenuePeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE public."AdminUser" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."AdminUser" FROM anon, authenticated;

ALTER TABLE public."Client" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."Client" FROM anon, authenticated;

ALTER TABLE public."Website" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."Website" FROM anon, authenticated;

ALTER TABLE public."CommercialAgreement" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."CommercialAgreement" FROM anon, authenticated;

ALTER TABLE public."AnalyticsEvent" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."AnalyticsEvent" FROM anon, authenticated;

ALTER TABLE public."Reservation" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."Reservation" FROM anon, authenticated;

ALTER TABLE public."ReservationStatusHistory" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."ReservationStatusHistory" FROM anon, authenticated;

ALTER TABLE public."RevenuePeriod" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."RevenuePeriod" FROM anon, authenticated;

ALTER TABLE public."Revenue" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."Revenue" FROM anon, authenticated;

ALTER TABLE public."OcnRevenueShare" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."OcnRevenueShare" FROM anon, authenticated;

ALTER TABLE public."Settlement" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."Settlement" FROM anon, authenticated;

ALTER TABLE public."AuditLog" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."AuditLog" FROM anon, authenticated;

ALTER TABLE public."Tour" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."Tour" FROM anon, authenticated;

ALTER TABLE public."ZakyUser" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."ZakyUser" FROM anon, authenticated;

ALTER TABLE public."SiteImage" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."SiteImage" FROM anon, authenticated;

ALTER TABLE public."TourPackage" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."TourPackage" FROM anon, authenticated;

ALTER TABLE public."GuideBio" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."GuideBio" FROM anon, authenticated;
