/**
 * Marrakeshi Tour Guide — Official Web Application
 * Made by Zaky
 * All Rights Reserved
 */

"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ReviewsMarquee } from "@/components/reviews/ReviewsMarquee";
import { AboutSection } from "@/components/about/AboutSection";
import { ToursSection } from "@/components/tours/ToursSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ReservationSection } from "@/components/reservation/ReservationSection";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<string | undefined>(undefined);

  const handleSelectTour = (tourTitle: string) => {
    setSelectedTour(tourTitle);
  };

  // Deep-link support: /?tour=<slug-or-title>#reservation preselects the pack
  // when a visitor clicks "Book" from any pack (home cards or tour pages).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tourParam = params.get("tour");
      if (!tourParam) return;
      const raw = decodeURIComponent(tourParam);
      fetch("/api/tours")
        .then((res) => res.json())
        .then((data) => {
          const tours = Array.isArray(data?.tours) ? data.tours : [];
          const match = tours.find(
            (tour: { slug: string; title: string }) =>
              tour.slug?.toLowerCase() === raw.toLowerCase() ||
              tour.title?.toLowerCase() === raw.toLowerCase()
          );
          setSelectedTour(match ? match.title : raw);
        })
        .catch(() => setSelectedTour(raw))
        .finally(() => {
          // Scroll to the booking zone after the pack is preselected.
          setTimeout(() => {
            document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
          }, 350);
        });
    } catch {}
  }, []);

  // Structured Data Schema (Google Search Console & Rich Results compliant)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://marrakeshi-guide.vercel.app/#website",
        "url": "https://marrakeshi-guide.vercel.app/",
        "name": "Marrakeshi Tour Guide by Zaky",
        "description": "Authentic private Marrakech tours, Medina walking experiences, souks, cultural landmarks, and tailor-made Morocco day trips.",
        "inLanguage": ["en", "fr", "es"],
      },
      {
        "@type": ["TouristInformationCenter", "TravelAgency"],
        "@id": "https://marrakeshi-guide.vercel.app/#business",
        "name": "Marrakeshi Tour Guide by Zaky",
        "alternateName": "Marrakech Private Tours with Zaky",
        "url": "https://marrakeshi-guide.vercel.app/",
        "logo": "https://marrakeshi-guide.vercel.app/logo.svg",
        "image": "https://marrakeshi-guide.vercel.app/images/hero.jpg",
        "telephone": "+212661176369",
        "email": "contact@marrakeshitourguide.com",
        "priceRange": "700 MAD - 2500 MAD",
        "currenciesAccepted": "MAD, EUR, USD",
        "paymentAccepted": "Cash, Bank Transfer",
        "areaServed": [
          {
            "@type": "City",
            "name": "Marrakesh",
          },
          {
            "@type": "Country",
            "name": "Morocco",
          },
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Medina",
          "addressLocality": "Marrakesh",
          "addressRegion": "Marrakesh-Safi",
          "postalCode": "40000",
          "addressCountry": "MA",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.6295,
          "longitude": -7.9811,
        },
        "founder": {
          "@type": "Person",
          "name": "Mohamed Zaky Bentabaa",
          "alternateName": "Zaky",
          "jobTitle": "Official Tour Guide",
          "description": "Second-generation Marrakesh tour guide since 2007 with a Master's degree in Tourism Management.",
          "knowsLanguage": ["Arabic", "French", "English"],
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "41",
          "bestRating": "5",
          "worstRating": "1",
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Marrakech Private Guided Tours & Experiences",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Marrakesh Medina, Souks & Heritage Experience",
                "url": "https://marrakeshi-guide.vercel.app/tours/marrakesh-medina-tour",
                "touristType": "Private Group",
              },
              "price": "700",
              "priceCurrency": "MAD",
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Marrakesh Souks & Local Markets Experience",
                "url": "https://marrakeshi-guide.vercel.app/tours/souks-local-markets",
                "touristType": "Private Group",
              },
              "price": "700",
              "priceCurrency": "MAD",
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Marrakesh by Night & Street Food Tour",
                "url": "https://marrakeshi-guide.vercel.app/tours/marrakesh-by-night",
                "touristType": "Private Group",
              },
              "price": "800",
              "priceCurrency": "MAD",
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Atlas Mountains & Three Valleys Day Trip",
                "url": "https://marrakeshi-guide.vercel.app/tours/atlas-mountains-three-valleys",
                "touristType": "Private Group",
              },
              "price": "1400",
              "priceCurrency": "MAD",
            },
          ],
        },
        "sameAs": [
          "https://instagram.com/zaky_marrakesh_tours",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Sticky Header with Nav & Mobile Menu */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />

          {/* Guest Reviews Marquee */}
          <ReviewsMarquee />

          {/* About Zaky Section */}
          <AboutSection />

          {/* 7 Signature Experiences */}
          <ToursSection onSelectTour={handleSelectTour} />

          {/* Photo Gallery (40+ photos, managed from admin) */}
          <GallerySection />

          {/* Reservation & Direct Contact Engine */}
          <ReservationSection selectedTour={selectedTour} />
        </main>

        {/* 4-Column Footer */}
        <Footer />
      </div>
    </>
  );
}
