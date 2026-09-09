import { prisma } from "../lib/db";
import { toursData } from "../lib/tours-data";

async function main() {
  console.log("🌱 Seeding Tour Packages & Guide Bio into Neon PostgreSQL...");

  // 1. Seed Tour Packages
  let tourIndex = 1;
  for (const tour of toursData) {
    const badge =
      tour.slug === "marrakesh-medina-tour"
        ? "Most Popular"
        : tour.slug === "atlas-mountains-day-trip"
        ? "Best Seller"
        : tour.slug === "custom-marrakesh-experience"
        ? "Tailor Made"
        : undefined;

    const itineraryJson = JSON.stringify(tour.itinerary || []);
    const mapCenterJson = JSON.stringify(tour.mapCenter || { lat: 31.6295, lng: -7.988, zoom: 15 });
    const highlightsJson = JSON.stringify(tour.highlights || []);
    const includedJson = JSON.stringify(tour.included || []);
    const notIncludedJson = JSON.stringify(tour.notIncluded || []);

    await prisma.tourPackage.upsert({
      where: { slug: tour.slug },
      update: {
        description: tour.description,
        highlights: highlightsJson,
        included: includedJson,
        notIncluded: notIncludedJson,
        itinerary: itineraryJson,
        mapCenter: mapCenterJson,
      },
      create: {
        slug: tour.slug,
        title: tour.title,
        subtitle: tour.subtitle || null,
        price: tour.price || "700 MAD",
        priceNote: tour.priceNote || `${tour.price || "700 MAD"} per private group`,
        duration: tour.duration || "3–4 hours",
        groupType: tour.groupType || "1–10 guests | Private Tour",
        languages: tour.languages || "English, French, Arabic",
        badge: badge || null,
        description: tour.description,
        highlights: highlightsJson,
        included: includedJson,
        notIncluded: notIncludedJson,
        itinerary: itineraryJson,
        mapCenter: mapCenterJson,
        active: true,
        sortOrder: tourIndex++,
      },
    });
    console.log(`  ✓ Tour Pack: ${tour.title} (${tour.price || "700 MAD"}) [Itinerary: ${tour.itinerary?.length || 0} stops]`);
  }

  // 2. Seed Guide Bio
  await prisma.guideBio.upsert({
    where: { id: "guide_zaky" },
    update: {},
    create: {
      id: "guide_zaky",
      name: "Zaky",
      fullName: "Mohamed Zaky Bentabaa",
      eyebrow: "Meet your guide",
      title: "Licensed Tour Guide in Marrakesh",
      bioP1:
        "I'm Mohamed Zaky Bentabaa, a licensed tour guide in Marrakesh and a second-generation guide. I began my career as a professional tour guide in 2007.",
      bioP2:
        "Born and raised in Marrakesh, I hold a Master's degree in Tourism Management and speak Arabic, French, and English. I'm passionate about sharing my city and my country through authentic, private, and tailor-made experiences.",
      bioP3:
        "Over the years, I've had the privilege of guiding travelers from around the world, including personalities from sport, cinema, and media, such as Achraf Hakimi, Fabian Ruiz, Paul Schrader, and Eric André.",
      bioP4:
        "For me, guiding is more than showing places. It's about sharing my city, creating genuine connections, and turning a journey into a lasting memory.",
      signoff: "Welcome to Marrakesh — let me show you my Morocco.",
      rating: "5.0★",
      reviewsCount: "41",
      experienceYears: "19",
      signatureTours: "7",
      languages: "Arabic, French, English",
      badgeText: "41 verified Google reviews",
    },
  });
  console.log("  ✓ Guide Bio for Zaky initialized");

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
