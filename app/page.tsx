/**
 * Marrakeshi Tour Guide — Official Web Application
 * Made by OCN
 * All Rights Reserved
 */

"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ReviewsMarquee } from "@/components/reviews/ReviewsMarquee";
import { AboutSection } from "@/components/about/AboutSection";
import { ToursSection } from "@/components/tours/ToursSection";
import { ReservationSection } from "@/components/reservation/ReservationSection";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<string | undefined>(undefined);

  const handleSelectTour = (tourTitle: string) => {
    setSelectedTour(tourTitle);
  };

  // Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Marrakeshi Tour Guide by Zaky",
    description: "Local Marrakesh tour guide offering authentic private tours of the Medina, souks, culture, history, and customized experiences with licensed guide Zaky.",
    founder: {
      "@type": "Person",
      name: "Zaky",
      jobTitle: "Licensed Tour Guide",
    },
    creator: {
      "@type": "Organization",
      name: "OCN",
      url: "https://ocndev.vercel.app/",
      description: "Digital Agency & Web Solutions",
    },
    areaServed: "Marrakesh, Morocco",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakesh",
      addressCountry: "MA",
    },
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

          {/* Reservation & Direct Contact Engine */}
          <ReservationSection selectedTour={selectedTour} />
        </main>

        {/* 4-Column Footer */}
        <Footer />
      </div>
    </>
  );
}
