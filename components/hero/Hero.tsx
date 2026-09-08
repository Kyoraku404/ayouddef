"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useSiteImages } from "@/components/common/SiteImagesProvider";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { getImage } = useSiteImages();
  const heroImage = getImage("hero_main", "/images/hero.jpg");

  useEffect(() => {
    // Reveal hero elements with single orchestrated transition
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Hero background image */}
      <Image
        className="hero-photo"
        src={heroImage.url}
        alt={heroImage.alt || "Zaky, Marrakesh tour guide"}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "50% 20%" }}
        unoptimized={heroImage.url.startsWith("/uploads")}
      />
      
      {/* Moroccan Scrim Gradient & Zellige Conic Pattern */}
      <div className="hero-scrim" />
      <div className="zellige" />

      {/* Hero Content */}
      <div className="container-custom">
        <div className="hero-content">
          <span className={`eyebrow hero-fade ${mounted ? "show" : ""}`}>
            Marrakesh, Morocco
          </span>

          <h1 className={`hero-fade ${mounted ? "show" : ""}`}>
            Discover Marrakesh with a Local Guide
          </h1>

          <p className={`sub hero-fade ${mounted ? "show" : ""}`}>
            Authentic experiences, unforgettable memories, and the real Marrakesh with Zaky.
          </p>

          <div className={`hero-ctas hero-fade ${mounted ? "show" : ""}`}>
            <a href="#tours" className="btn btn-primary">
              Discover More
            </a>
            <a href="#reservation" className="btn btn-ghost">
              Reservation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
