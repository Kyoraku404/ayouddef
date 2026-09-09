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
      // Map DB tours and overlay extra rich media (gallery, itinerary) from toursData if available
      const mergedTours = dbTours.map((dbTour) => {
        const fallback = toursData.find((t) => t.slug === dbTour.slug);
        return {
          id: dbTour.id,
          slug: dbTour.slug,
          title: dbTour.title,
          subtitle: dbTour.subtitle || fallback?.subtitle || "",
          cls: fallback?.cls || "t1",
          icon: fallback?.icon || "gate",
          duration: dbTour.duration || fallback?.duration || "3–4 hours",
          groupType: dbTour.groupType || fallback?.groupType || "1–10 guests | Private Tour",
          languages: dbTour.languages || fallback?.languages || "English, French, Arabic",
          price: dbTour.price,
          priceNote: dbTour.priceNote || fallback?.priceNote || `${dbTour.price} per private group`,
          badge: dbTour.badge || undefined,
          description: dbTour.description || fallback?.description || "",
          fullDescription: fallback?.fullDescription || [dbTour.description || ""],
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

    return NextResponse.json({ success: true, tours: toursData });
  } catch (error: any) {
    console.warn("Falling back to local toursData:", error.message);
    return NextResponse.json({ success: true, tours: toursData });
  }
}
