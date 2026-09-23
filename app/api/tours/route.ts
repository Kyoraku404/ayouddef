import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toursData } from "@/lib/tours-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbTours = await prisma.tourPackage.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbTours.length > 0) {
      // Map DB tours and overlay extra rich media (gallery, itinerary) from toursData if available.
      // CARD description and FULL description are INDEPENDENT columns — one is
      // never derived from the other. Legacy `description` is fallback only.
      const mergedTours = dbTours.map((dbTour) => {
        const fallback = toursData.find((t) => t.slug === dbTour.slug);

        // Card: short text for the Tours page card ONLY.
        const cardText =
          (dbTour.cardDescription || "").trim() ||
          (dbTour.description || "").split(/\n\n+/)[0]?.trim() ||
          fallback?.description ||
          "";

        // Full: detailed paragraphs for the tour detail page ONLY.
        const rawFull = (dbTour.fullDescription || "").trim() || (dbTour.description || "").trim();
        const overviewParagraphs = rawFull
          ? rawFull.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
          : fallback?.fullDescription || [""];

        return {
          id: dbTour.id,
          slug: dbTour.slug,
          title: dbTour.title,
          subtitle: dbTour.subtitle || fallback?.subtitle || "",
          cls: dbTour.cls || fallback?.cls || "t1",
          icon: (dbTour.icon as "gate" | "basket" | "palace" | "tea" | "monument" | "compass" | "road") || fallback?.icon || "gate",
          cardImage: dbTour.cardImage || undefined,
          duration: dbTour.duration || fallback?.duration || "3–4 hours",
          groupType: dbTour.groupType || fallback?.groupType || "1–10 guests | Private Tour",
          languages: dbTour.languages || fallback?.languages || "English, French, Arabic",
          price: dbTour.price,
          priceNote: dbTour.priceNote || fallback?.priceNote || `${dbTour.price} per private group`,
          badge: dbTour.badge || undefined,
          description: cardText,
          fullDescription: overviewParagraphs,
          highlights: dbTour.highlights ? JSON.parse(dbTour.highlights) : fallback?.highlights || [],
          gallery: fallback?.gallery || [],
          itinerary: dbTour.itinerary ? JSON.parse(dbTour.itinerary) : fallback?.itinerary || [],
          mapCenter: dbTour.mapCenter ? JSON.parse(dbTour.mapCenter) : fallback?.mapCenter || { lat: 31.6295, lng: -7.988, zoom: 15 },
          included: dbTour.included ? JSON.parse(dbTour.included) : fallback?.included || [],
          notIncluded: dbTour.notIncluded ? JSON.parse(dbTour.notIncluded) : fallback?.notIncluded || [],
        };
      });

      return NextResponse.json({ success: true, tours: mergedTours });
    }

    return NextResponse.json({ success: true, tours: [] });
  } catch (error: any) {
    console.warn("Falling back to local toursData:", error.message);
    return NextResponse.json({ success: true, tours: toursData });
  }
}
