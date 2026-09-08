import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding PostgreSQL — INFRASTRUCTURE ONLY (zero fake data)...");

  // ==========================================
  // INFRASTRUCTURE ONLY — NO TRANSACTIONAL DATA
  // ==========================================
  // This seed creates ONLY the minimum required
  // infrastructure records. It does NOT create:
  // - Fake reservations
  // - Fake revenue
  // - Fake analytics events
  // - Fake settlements
  // - Fake audit logs
  // All transactional data must come from REAL
  // website interactions and admin actions.
  // ==========================================

  // 1. OCN Admin User
  const passwordHash = await bcrypt.hash("Mohamed@1234", 12);
  const admin = await prisma.adminUser.upsert({
    where: { username: "ocnadmin" },
    update: {
      passwordHash,
      mustChangePassword: true,
      failedAttempts: 0,
      lockedUntil: null,
    },
    create: {
      username: "ocnadmin",
      email: "admin@ocn.network",
      passwordHash,
      mustChangePassword: true,
      failedAttempts: 0,
    },
  });
  console.log("✅ Admin user seeded:", admin.username);

  // 2. Client Organization (real business entity)
  const client = await prisma.client.upsert({
    where: { id: "client_zaky" },
    update: {},
    create: {
      id: "client_zaky",
      legalName: "Mohamed Zaky Bentabaa",
      displayName: "Marrakeshi Tour Guide by Zaky",
      contactEmail: "hello@marrakeshitourguide.com",
      contactPhone: "+212 6 61 17 63 69",
      ownershipClient: new Prisma.Decimal(70.00),
      ownershipOcn: new Prisma.Decimal(30.00),
      revenueShareOcn: new Prisma.Decimal(10.00),
      maintenanceStatus: "ACTIVE",
    },
  });
  console.log("✅ Client seeded:", client.displayName);

  // 3. Client Website (real domain)
  const website = await prisma.website.upsert({
    where: { domain: "marrakeshitourguide.com" },
    update: {},
    create: {
      id: "web_zaky",
      clientId: client.id,
      domain: "marrakeshitourguide.com",
      name: "Marrakeshi Tour Guide Official Portal",
      status: "ACTIVE",
    },
  });
  console.log("✅ Website seeded:", website.domain);

  // 4. Commercial Agreement (real contract terms)
  const agreement = await prisma.commercialAgreement.upsert({
    where: { id: "agr_zaky_v12" },
    update: {},
    create: {
      id: "agr_zaky_v12",
      clientId: client.id,
      version: "v1.2 - 2026",
      title: "Master Digital Partnership & Revenue Participation Agreement",
      effectiveDate: new Date("2026-01-01T00:00:00.000Z"),
      ownershipClient: new Prisma.Decimal(70.00),
      ownershipOcn: new Prisma.Decimal(30.00),
      revenueShareOcn: new Prisma.Decimal(10.00),
      status: "ACTIVE",
      clauses: {
        ownershipSplit: "70% Client / 30% OCN",
        revenueShare: "10% Defined Net Realization",
        settlementCycles: "Bi-annual H1 & H2 within 15 calendar days",
        whatsappFunnel: "Lead verification protocol mandatory prior to revenue recognition",
        privacySLA: "Zero GPS / telemetry strictly segregated by tenant",
      },
    },
  });
  console.log("✅ Commercial agreement seeded:", agreement.version);

  // 5. Accounting Revenue Periods (calendar structure only)
  await prisma.revenuePeriod.upsert({
    where: { id: "2026-H1" },
    update: {},
    create: {
      id: "2026-H1",
      periodName: "2026-H1",
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      endDate: new Date("2026-06-30T23:59:59.999Z"),
      dueDate: new Date("2026-07-31T23:59:59.999Z"),
      status: "OPEN",
    },
  });

  await prisma.revenuePeriod.upsert({
    where: { id: "2026-H2" },
    update: {},
    create: {
      id: "2026-H2",
      periodName: "2026-H2",
      startDate: new Date("2026-07-01T00:00:00.000Z"),
      endDate: new Date("2026-12-31T23:59:59.999Z"),
      dueDate: new Date("2027-01-31T23:59:59.999Z"),
      status: "OPEN",
    },
  });
  console.log("✅ Revenue periods seeded: 2026-H1, 2026-H2");

  // 6. Tours for Public Site Compatibility
  const tours = [
    {
      slug: "marrakesh-medina-tour",
      title: "Marrakesh Medina, Souks & Heritage Experience",
      description: "Discover the heart of Marrakesh on a private walking tour through the historic Medina, vibrant souks, and iconic cultural landmarks.",
      icon: "Compass",
      duration: "3–4 hours",
    },
    {
      slug: "souks-local-markets",
      title: "Marrakesh Souks & Local Markets Experience",
      description: "Explore the authentic side of Marrakesh through vibrant local souks, artisan quarters, and bustling neighborhood markets.",
      icon: "ShoppingBag",
      duration: "3 hours",
    },
    {
      slug: "historical-marrakesh",
      title: "Marrakesh Historical & Cultural Heritage Tour",
      description: "Journey through the rich history of Marrakesh, exploring iconic monuments, historic palaces, museums, and architectural treasures.",
      icon: "Landmark",
      duration: "Half Day",
    },
  ];

  for (const t of tours) {
    await prisma.tour.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }
  // 7. Zaky Client Admin User
  const zakyPasswordHash = await bcrypt.hash("cirrav-wetZon-4boqsi", 12);
  const zakyUser = await prisma.zakyUser.upsert({
    where: { username: "zaky" },
    update: {
      password: zakyPasswordHash,
    },
    create: {
      username: "zaky",
      password: zakyPasswordHash,
    },
  });
  console.log("✅ Zaky client admin seeded:", zakyUser.username);

  // 8. Site Images (Full CMS Inventory for all website images)
  const siteImages = [
    {
      slotKey: "navbar_logo",
      label: "Header / Navbar Brand Logo",
      url: "/brand-mark.png",
      alt: "Marrakeshi Tour Guide Brand Emblem",
      caption: "Official emblem in the navigation bar",
      section: "Brand & Navigation",
      sortOrder: 1,
    },
    {
      slotKey: "footer_logo",
      label: "Footer Brand Logo",
      url: "/brand-mark.png",
      alt: "Marrakeshi Tour Guide Emblem",
      caption: "Official emblem in the footer",
      section: "Brand & Navigation",
      sortOrder: 2,
    },
    {
      slotKey: "hero_main",
      label: "Hero Section Main Photo",
      url: "/images/hero.jpg",
      alt: "Private guide Zaky showing Marrakesh historical architecture",
      caption: "Main hero visual of Zaky and the Red City",
      section: "Hero Section",
      sortOrder: 1,
    },
    {
      slotKey: "about_zaky",
      label: "About Zaky Portrait",
      url: "/images/zaky-riad.jpg",
      alt: "Mohamed Zaky Bentabaa in a traditional Marrakesh riad",
      caption: "Zaky with guests in a tranquil riad courtyard with rose petals",
      section: "About Section",
      sortOrder: 1,
    },
    {
      slotKey: "gallery_default",
      label: "Default Tour Visual",
      url: "/images/medina.jpg",
      alt: "Historic Medina of Marrakesh",
      caption: "Default visual for highlights and cards",
      section: "General & Fallbacks",
      sortOrder: 1,
    },

    // Tour 1: Medina, Souks & Heritage
    {
      slotKey: "tour_medina_1",
      label: "Medina Tour - Photo 1 (Alleyway)",
      url: "/images/medina.jpg",
      alt: "Sunlit alleyway in the historic Marrakesh Medina",
      caption: "Ancient ochre alleyways and carved wooden doorways of the Medina.",
      section: "Tour: Medina, Souks & Heritage",
      sortOrder: 1,
    },
    {
      slotKey: "tour_medina_2",
      label: "Medina Tour - Photo 2 (Riad / Guiding)",
      url: "/images/hero.jpg",
      alt: "Zaky in a traditional riad courtyard",
      caption: "Zaky guiding guests through historic architectural landmarks.",
      section: "Tour: Medina, Souks & Heritage",
      sortOrder: 2,
    },
    {
      slotKey: "tour_medina_3",
      label: "Medina Tour - Photo 3 (Artisan Souks)",
      url: "/images/souks.jpg",
      alt: "Vibrant lantern and carpet souks",
      caption: "Encountering the artisan quarters tucked inside the walled city.",
      section: "Tour: Medina, Souks & Heritage",
      sortOrder: 3,
    },
    {
      slotKey: "tour_medina_4",
      label: "Medina Tour - Photo 4 (Courtyard Architecture)",
      url: "/images/bahia.jpg",
      alt: "Traditional courtyard architecture",
      caption: "Tranquil palace courtyards hidden behind unassuming wooden gates.",
      section: "Tour: Medina, Souks & Heritage",
      sortOrder: 4,
    },

    // Tour 2: Souks & Local Markets
    {
      slotKey: "tour_souks_1",
      label: "Souks Tour - Photo 1 (Brass Lanterns)",
      url: "/images/souks.jpg",
      alt: "Vibrant lantern and carpet souks",
      caption: "Glowing handcrafted brass lamps and hand-knotted Berber carpets.",
      section: "Tour: Souks & Local Markets",
      sortOrder: 1,
    },
    {
      slotKey: "tour_souks_2",
      label: "Souks Tour - Photo 2 (Market Alleys)",
      url: "/images/medina.jpg",
      alt: "Medina market alleys",
      caption: "Navigating quiet side souks where master artisans work.",
      section: "Tour: Souks & Local Markets",
      sortOrder: 2,
    },
    {
      slotKey: "tour_souks_3",
      label: "Souks Tour - Photo 3 (Craft Details)",
      url: "/images/bahia.jpg",
      alt: "Carved details in architectural setting",
      caption: "Appreciating centuries-old craft traditions still practiced today.",
      section: "Tour: Souks & Local Markets",
      sortOrder: 3,
    },
    {
      slotKey: "tour_souks_4",
      label: "Souks Tour - Photo 4 (Guiding with Guests)",
      url: "/images/hero.jpg",
      alt: "Zaky with guests in Marrakesh",
      caption: "Zaky explaining artisan traditions with guests.",
      section: "Tour: Souks & Local Markets",
      sortOrder: 4,
    },

    // Tour 3: Historical & Cultural Heritage
    {
      slotKey: "tour_historical_1",
      label: "Historical Tour - Photo 1 (Palace Courtyard)",
      url: "/images/bahia.jpg",
      alt: "Bahia Palace courtyard",
      caption: "Splendid Moorish tilework and courtyards of the imperial palaces.",
      section: "Tour: Historical & Cultural Heritage",
      sortOrder: 1,
    },
    {
      slotKey: "tour_historical_2",
      label: "Historical Tour - Photo 2 (Medina Ramparts)",
      url: "/images/medina.jpg",
      alt: "Ancient Medina walls",
      caption: "The ochre rammed-earth ramparts that have guarded Marrakesh for 900 years.",
      section: "Tour: Historical & Cultural Heritage",
      sortOrder: 2,
    },
    {
      slotKey: "tour_historical_3",
      label: "Historical Tour - Photo 3 (Zaky Sharing Context)",
      url: "/images/hero.jpg",
      alt: "Zaky with architectural detail",
      caption: "Zaky sharing historical context at historical sites.",
      section: "Tour: Historical & Cultural Heritage",
      sortOrder: 3,
    },
    {
      slotKey: "tour_historical_4",
      label: "Historical Tour - Photo 4 (Guild Crafts)",
      url: "/images/souks.jpg",
      alt: "Artisan crafts in historic setting",
      caption: "Historic trade routes and guilds that enriched the imperial city.",
      section: "Tour: Historical & Cultural Heritage",
      sortOrder: 4,
    },

    // Tour 4: Marrakesh By Night
    {
      slotKey: "tour_bynight_1",
      label: "By Night - Photo 1 (Dusk Medina)",
      url: "/images/medina.jpg",
      alt: "Medina at dusk",
      caption: "Atmospheric evening light reflecting on Medina walls and alleyways.",
      section: "Tour: Marrakesh By Night",
      sortOrder: 1,
    },
    {
      slotKey: "tour_bynight_2",
      label: "By Night - Photo 2 (Night Souks)",
      url: "/images/souks.jpg",
      alt: "Glowing lanterns in the night souks",
      caption: "Handcrafted brass lanterns illuminating the night souks.",
      section: "Tour: Marrakesh By Night",
      sortOrder: 2,
    },
    {
      slotKey: "tour_bynight_3",
      label: "By Night - Photo 3 (Evening Walk)",
      url: "/images/hero.jpg",
      alt: "Zaky enjoying Marrakesh at night",
      caption: "Zaky guiding guests through vibrant evening traditions.",
      section: "Tour: Marrakesh By Night",
      sortOrder: 3,
    },
    {
      slotKey: "tour_bynight_4",
      label: "By Night - Photo 4 (Rooftop Vantage)",
      url: "/images/bahia.jpg",
      alt: "Traditional rooftop setting",
      caption: "Panoramic terraces overlooking the vibrant night skyline.",
      section: "Tour: Marrakesh By Night",
      sortOrder: 4,
    },

    // Tour 5: Signature Experience (7 Days)
    {
      slotKey: "tour_signature_1",
      label: "7 Days Tour - Photo 1 (Atlas Mountains)",
      url: "/images/hero.jpg",
      alt: "High Atlas Mountains and Moroccan landscapes",
      caption: "Spectacular excursions from the Atlas Mountains to the Agafay Desert.",
      section: "Tour: Signature Experience (7 Days)",
      sortOrder: 1,
    },
    {
      slotKey: "tour_signature_2",
      label: "7 Days Tour - Photo 2 (Medina Palaces)",
      url: "/images/medina.jpg",
      alt: "Marrakesh historic Medina",
      caption: "In-depth private discovery of imperial palaces and secret gardens.",
      section: "Tour: Signature Experience (7 Days)",
      sortOrder: 2,
    },
    {
      slotKey: "tour_signature_3",
      label: "7 Days Tour - Photo 3 (Essaouira Coast)",
      url: "/images/bahia.jpg",
      alt: "Essaouira and coastal ramparts",
      caption: "Atlantic coastal breezes, historic fishing ports, and seaside dining.",
      section: "Tour: Signature Experience (7 Days)",
      sortOrder: 3,
    },
    {
      slotKey: "tour_signature_4",
      label: "7 Days Tour - Photo 4 (Private Vehicle & Guiding)",
      url: "/images/souks.jpg",
      alt: "Private luxury transportation and guiding",
      caption: "Dedicated Mercedes Vito and personal concierge assistance all 7 days.",
      section: "Tour: Signature Experience (7 Days)",
      sortOrder: 4,
    },

    // Tour 6: Coastal Escape (5 Days)
    {
      slotKey: "tour_oualidia_1",
      label: "Oualidia Tour - Photo 1 (Turquoise Lagoon)",
      url: "/images/bahia.jpg",
      alt: "Oualidia coastal lagoon and waters",
      caption: "The peaceful turquoise lagoon and pristine oyster beds of Oualidia.",
      section: "Tour: Coastal Escape (5 Days)",
      sortOrder: 1,
    },
    {
      slotKey: "tour_oualidia_2",
      label: "Oualidia Tour - Photo 2 (Medina Streets)",
      url: "/images/medina.jpg",
      alt: "Marrakesh Medina streets",
      caption: "Historic streets and vibrant artisan quarters in Marrakesh.",
      section: "Tour: Coastal Escape (5 Days)",
      sortOrder: 2,
    },
    {
      slotKey: "tour_oualidia_3",
      label: "Oualidia Tour - Photo 3 (Safi Ceramics)",
      url: "/images/souks.jpg",
      alt: "Safi ceramics and pottery",
      caption: "Centuries-old pottery traditions in the coastal ceramic city of Safi.",
      section: "Tour: Coastal Escape (5 Days)",
      sortOrder: 3,
    },
    {
      slotKey: "tour_oualidia_4",
      label: "Oualidia Tour - Photo 4 (Private Mercedes Guiding)",
      url: "/images/hero.jpg",
      alt: "Zaky with guests on coastal tour",
      caption: "Dedicated guiding and private Mercedes Vito throughout Morocco.",
      section: "Tour: Coastal Escape (5 Days)",
      sortOrder: 4,
    },

    // Tour 7: Customized Private Tours
    {
      slotKey: "tour_custom_1",
      label: "Custom Tour - Photo 1 (Tailored Excursion)",
      url: "/images/hero.jpg",
      alt: "Customized Marrakesh tour with Zaky",
      caption: "Private excursions tailored around what you love most.",
      section: "Tour: Customized Private Tours",
      sortOrder: 1,
    },
    {
      slotKey: "tour_custom_2",
      label: "Custom Tour - Photo 2 (Private Alleys)",
      url: "/images/medina.jpg",
      alt: "Private Medina exploration",
      caption: "Discreet alleys and serene courtyards away from crowded routes.",
      section: "Tour: Customized Private Tours",
      sortOrder: 2,
    },
    {
      slotKey: "tour_custom_3",
      label: "Custom Tour - Photo 3 (Architectural Marvels)",
      url: "/images/bahia.jpg",
      alt: "Architectural wonders",
      caption: "Dedicated time for photography and architectural appreciation.",
      section: "Tour: Customized Private Tours",
      sortOrder: 3,
    },
    {
      slotKey: "tour_custom_4",
      label: "Custom Tour - Photo 4 (Curated Artisans)",
      url: "/images/souks.jpg",
      alt: "Curated shopping and artisan meetings",
      caption: "Meet specific master artisans matching your design interests.",
      section: "Tour: Customized Private Tours",
      sortOrder: 4,
    },
  ];

  for (const img of siteImages) {
    await prisma.siteImage.upsert({
      where: { slotKey: img.slotKey },
      update: {
        label: img.label,
        section: img.section,
        sortOrder: img.sortOrder,
      },
      create: img,
    });
  }
  console.log(`✅ Seeded ${siteImages.length} site image slots into PostgreSQL`);

  // ==========================================
  // NO fake reservations.
  // NO fake revenue.
  // NO fake analytics events.
  // NO fake settlements.
  // NO fake audit logs.
  // Dashboard will show ZERO for everything.
  // Data appears ONLY from real interactions.
  // ==========================================

  console.log("🎉 Infrastructure seeding completed. Dashboard starts at ZERO.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
