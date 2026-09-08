"use client";

import React from "react";
import Image from "next/image";

import { useSiteImages } from "@/components/common/SiteImagesProvider";

export function AboutSection() {
  const { getImage } = useSiteImages();
  const aboutImage = getImage("about_zaky", "/images/zaky-riad.jpg");

  return (
    <section className="about" id="about">
      <div className="container-custom about-grid">
        {/* Left Column: Authentic Arch Portrait & Badge */}
        <div className="about-photo">
          <div className="arch">
            {/* Architectural Moorish SVG Background Motif */}
            <svg
              viewBox="0 0 64 64"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M32 8c-12 0-18 9-18 20v20h36V28c0-11-6-20-18-20z" />
              <circle cx="32" cy="26" r="6" />
              <path d="M20 48h24" />
            </svg>

            {/* Real photo of Zaky in courtyard */}
            <Image
              className="arch-photo"
              src={aboutImage.url}
              alt={aboutImage.alt || "Zaky, Marrakesh tour guide"}
              fill
              sizes="(max-width: 860px) 90vw, 420px"
              priority
              style={{ objectFit: "cover", objectPosition: "50% 15%" }}
              unoptimized={aboutImage.url.startsWith("/uploads")}
            />
          </div>

          {/* Arch Badge */}
          <div className="arch-badge">
            <b>5.0★</b>
            <span>41 verified Google reviews</span>
          </div>
        </div>

        {/* Right Column: Bio & Qualifications */}
        <div className="about-text">
          <span className="eyebrow">Meet your guide</span>
          <h2>Zaky</h2>
          
          <p>
            I&apos;m Mohamed Zaky Bentabaa, a licensed tour guide in Marrakesh and a second-generation guide. I began my career as a professional tour guide in 2007.
          </p>
          <p>
            Born and raised in Marrakesh, I hold a Master&apos;s degree in Tourism Management and speak Arabic, French, and English. I&apos;m passionate about sharing my city and my country through authentic, private, and tailor-made experiences.
          </p>
          <p>
            Over the years, I&apos;ve had the privilege of guiding travelers from around the world, including personalities from sport, cinema, and media, such as Achraf Hakimi, Fabian Ruiz, Paul Schrader, and Eric André.
          </p>
          <p>
            For me, guiding is more than showing places. It&apos;s about sharing my city, creating genuine connections, and turning a journey into a lasting memory.
          </p>

          <p className="guide-signoff">
            Welcome to Marrakesh — let me show you my Morocco.
          </p>

          {/* Stats */}
          <div className="about-stats">
            <div>
              <b>5.0★</b>
              <span>Google rating</span>
            </div>
            <div>
              <b>41</b>
              <span>Verified Google reviews</span>
            </div>
            <div>
              <b>7</b>
              <span>Signature tour experiences</span>
            </div>
          </div>

          {/* Language Pills */}
          <div className="lang-pills">
            <span>Arabic</span>
            <span>French</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </section>
  );
}
