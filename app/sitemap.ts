import { MetadataRoute } from "next";
import { toursData } from "@/lib/tours-data";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://marrakeshi-guide.vercel.app";
  const now = new Date();

  // 1. Gather all static tours
  const seenSlugs = new Set<string>();
  const tourEntries: MetadataRoute.Sitemap = [];

  for (const tour of toursData) {
    seenSlugs.add(tour.slug);
    tourEntries.push({
      url: `${baseUrl}/tours/${tour.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 2. Query any additional active database packages gracefully
  try {
    const dbTours = await prisma.tourPackage.findMany({
      select: { slug: true, updatedAt: true },
    });

    for (const dbTour of dbTours) {
      if (!seenSlugs.has(dbTour.slug)) {
        seenSlugs.add(dbTour.slug);
        tourEntries.push({
          url: `${baseUrl}/tours/${dbTour.slug}`,
          lastModified: dbTour.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // Database query fallback: proceed with static toursData
  }

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...tourEntries,
  ];
}
