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
      title: "About Me",
      bioP1:
        "I’m Zaky, a second-generation official tour guide born and raised in Marrakech.",
      bioP2:
        "With a Master’s degree in Tourism Management and nearly two decades of experience, I offer a personal and authentic way to discover Marrakech and Morocco.",
      bioP3:
        "For me, guiding is not simply about showing places. It’s about sharing the stories, culture, hidden details and everyday life that make Marrakech truly special.",
      bioP4:
        "Over the years, I’ve had the privilege of guiding guests from all over the world, including internationally known personalities. But whether you are a first-time visitor or a returning guest, my approach remains the same: personal, discreet and tailored to you.",
      signoff: "Marrakech, curated by Zaky",
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
