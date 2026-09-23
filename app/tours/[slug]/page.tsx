import React, { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toursData } from "@/lib/tours-data";
import { Tour } from "@/lib/types";
export const dynamic = "force-dynamic";

const readTour = cache(async (slug: string) => {
  try { return { tour: await prisma.tourPackage.findUnique({ where: { slug } }), available: true }; }
  catch { return { tour: null, available: false }; }
});

interface PageProps {
  params: Promise<{ slug: string }>;
}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const staticTour = toursData.find((t) => t.slug === slug);
  const { tour: dbTour, available } = await readTour(slug);
  const title = available && !dbTour?.active ? null : dbTour?.title || staticTour?.title;
  const subtitle = dbTour?.subtitle || staticTour?.subtitle;
  const image = staticTour?.gallery?.[0]?.src || "/images/hero.jpg";

  if (!title) {
    return {
      title: "Tour Not Found | Marrakeshi Tour Guide by Zaky",
      robots: { index: false, follow: false },
    };
  }

  const pageTitle = `${title} | Private Marrakech Tour with Zaky`;
  const pageDescription = `${subtitle || "Explore Marrakech with local guide Zaky"}. Authentic private tour, customized itinerary, hidden gems, and cultural insights.`;
  const canonicalUrl = `https://marrakeshi-guide.vercel.app/tours/${slug}`;
  const imageUrl = image.startsWith("http") ? image : `https://marrakeshi-guide.vercel.app${image}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "Marrakeshi Tour Guide by Zaky",
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

import { prisma } from "@/lib/db";
import { TourDetailClient } from "@/components/tours/TourDetailClient";

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const staticTour = toursData.find((t) => t.slug === slug);
  const { tour: dbTour, available } = await readTour(slug);

  if ((!staticTour && !dbTour) || (available && !dbTour?.active)) {
    notFound();
  }

  // Card + Full descriptions are independent DB columns. The detail page
  // uses ONLY fullDescription (never the card text); the card text is used
  // ONLY by the Tours listing. Legacy `description` is fallback only.
  const dbCardText =
    (dbTour?.cardDescription || "").trim() ||
    (dbTour?.description || "").split(/\n\n+/)[0]?.trim() ||
    "";
  const dbRawFull =
    (dbTour?.fullDescription || "").trim() || (dbTour?.description || "").trim();
  const dbFullParas = dbRawFull
    ? dbRawFull.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
    : null;

  const baseTour: Tour = staticTour || {
    id: dbTour?.id || slug,
    slug,
    title: dbTour?.title || "",
    subtitle: dbTour?.subtitle || "",
    cls: dbTour?.cls || "t1",
    icon: (dbTour?.icon as Tour["icon"]) || "gate",
    cardImage: dbTour?.cardImage || undefined,
    duration: dbTour?.duration || "3–4 hours",
    groupType: dbTour?.groupType || "1–10 guests | Private Tour",
    languages: dbTour?.languages || "English, French, Arabic",
    price: dbTour?.price || "700 MAD",
    priceNote: dbTour?.priceNote || "",
    description: dbCardText,
    fullDescription: dbFullParas || [""],
    highlights: (dbTour?.highlights ? JSON.parse(dbTour.highlights) : []) as string[],
    gallery: [],
    itinerary: [],
    mapCenter: { lat: 31.6295, lng: -7.988, zoom: 15 },
    included: (dbTour?.included ? JSON.parse(dbTour.included) : []) as string[],
    notIncluded: (dbTour?.notIncluded ? JSON.parse(dbTour.notIncluded) : []) as string[],
  };

  const dbHighlights = dbTour?.highlights ? (JSON.parse(dbTour.highlights) as string[]) : null;
  const dbIncluded = dbTour?.included ? (JSON.parse(dbTour.included) as string[]) : null;
  const dbNotIncluded = dbTour?.notIncluded ? (JSON.parse(dbTour.notIncluded) as string[]) : null;
  const dbItinerary = dbTour?.itinerary ? JSON.parse(dbTour.itinerary) : null;
  const dbMapCenter = dbTour?.mapCenter ? JSON.parse(dbTour.mapCenter) : null;

  const tour: Tour = {
    ...baseTour,
    title: dbTour?.title || baseTour.title,
    subtitle: dbTour?.subtitle || baseTour.subtitle,
    price: dbTour?.price || baseTour.price,
    priceNote: dbTour?.priceNote || baseTour.priceNote,
    duration: dbTour?.duration || baseTour.duration,
    groupType: dbTour?.groupType || baseTour.groupType,
    languages: dbTour?.languages || baseTour.languages,
    badge: dbTour?.badge || undefined,
    cls: dbTour?.cls || baseTour.cls,
    icon: (dbTour?.icon as Tour["icon"]) || baseTour.icon,
    cardImage: dbTour?.cardImage || baseTour.cardImage,
    description: dbCardText || baseTour.description,
    fullDescription: dbFullParas || baseTour.fullDescription,
    highlights: dbHighlights || baseTour.highlights,
    included: dbIncluded || baseTour.included,
    notIncluded: dbNotIncluded || baseTour.notIncluded,
    itinerary: dbItinerary || baseTour.itinerary,
    mapCenter: dbMapCenter || baseTour.mapCenter,
  };

  const otherTours = toursData.filter((t) => t.slug !== tour.slug).slice(0, 3);

  const tourUrl = `https://marrakeshi-guide.vercel.app/tours/${tour.slug}`;
  const tourImageUrl = tour.gallery?.[0]?.src?.startsWith("http")
    ? tour.gallery[0].src
    : `https://marrakeshi-guide.vercel.app${tour.gallery?.[0]?.src || "/images/hero.jpg"}`;
  const numericPrice = tour.price ? tour.price.replace(/[^0-9]/g, "") : "700";

  const tourJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${tourUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://marrakeshi-guide.vercel.app/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Marrakech Tours",
            "item": "https://marrakeshi-guide.vercel.app/#tours",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tour.title,
            "item": tourUrl,
          },
        ],
      },
      {
        "@type": "TouristTrip",
        "@id": `${tourUrl}#trip`,
        "name": tour.title,
        "description": tour.subtitle || tour.description,
        "touristType": "Private Group, Cultural Explorers",
        "url": tourUrl,
        "image": tourImageUrl,
        "offers": {
          "@type": "Offer",
          "price": numericPrice,
          "priceCurrency": "MAD",
          "availability": "https://schema.org/InStock",
          "url": tourUrl,
        },
        "provider": {
          "@type": ["TouristInformationCenter", "TravelAgency"],
          "name": "Marrakeshi Tour Guide by Zaky",
          "url": "https://marrakeshi-guide.vercel.app/",
          "telephone": "+212661176369",
        },
        ...(tour.itinerary && tour.itinerary.length > 0
          ? {
              "itinerary": {
                "@type": "ItemList",
                "numberOfItems": tour.itinerary.length,
                "itemListElement": tour.itinerary.map((stop, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "item": {
                    "@type": "TouristAttraction",
                    "name": stop.name,
                    "description": stop.description,
                    ...(stop.lat && stop.lng
                      ? {
                          "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": stop.lat,
                            "longitude": stop.lng,
                          },
                        }
                      : {}),
                  },
                })),
              },
            }
          : {}),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      <TourDetailClient tour={tour} otherTours={otherTours} />
    </>
  );
}
