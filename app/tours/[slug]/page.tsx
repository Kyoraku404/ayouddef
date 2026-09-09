import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toursData } from "@/lib/tours-data";
import { Tour } from "@/lib/types";
import { siteConfig } from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return toursData.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Marrakeshi Tour Guide by Zaky",
    };
  }

  return {
    title: `${tour.title} | Marrakeshi Tour Guide by Zaky`,
    description: `${tour.subtitle}. Discover Marrakesh with licensed second-generation guide Zaky.`,
    alternates: {
      canonical: `/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${tour.title} | Marrakeshi Tour Guide by Zaky`,
      description: tour.subtitle,
      url: `${siteConfig.urls.site}/tours/${tour.slug}`,
      images: [
        {
          url: tour.gallery?.[0]?.src || "/images/hero.jpg",
          width: 1200,
          height: 800,
          alt: tour.title,
        },
      ],
    },
  };
}

import { prisma } from "@/lib/db";
import { TourDetailClient } from "@/components/tours/TourDetailClient";

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const staticTour = toursData.find((t) => t.slug === slug);
  const dbTour = await prisma.tourPackage.findUnique({ where: { slug } }).catch(() => null);

  if (!staticTour && !dbTour) {
    notFound();
  }

  const baseTour: Tour = staticTour || {
    id: dbTour?.id || slug,
    slug,
    title: dbTour?.title || "",
    subtitle: dbTour?.subtitle || "",
    cls: "t1",
    icon: "gate",
    duration: dbTour?.duration || "3–4 hours",
    groupType: dbTour?.groupType || "1–10 guests | Private Tour",
    languages: dbTour?.languages || "English, French, Arabic",
    price: dbTour?.price || "700 MAD",
    priceNote: dbTour?.priceNote || "",
    description: dbTour?.description || "",
    fullDescription: [dbTour?.description || ""],
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
    description: dbTour?.description || baseTour.description,
    fullDescription: dbTour?.description
      ? dbTour.description.split("\n\n").filter(Boolean)
      : baseTour.fullDescription,
    highlights: dbHighlights || baseTour.highlights,
    included: dbIncluded || baseTour.included,
    notIncluded: dbNotIncluded || baseTour.notIncluded,
    itinerary: dbItinerary || baseTour.itinerary,
    mapCenter: dbMapCenter || baseTour.mapCenter,
  };

  const otherTours = toursData.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return <TourDetailClient tour={tour} otherTours={otherTours} />;
}
