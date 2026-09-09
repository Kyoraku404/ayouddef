"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useSiteImages } from "@/components/common/SiteImagesProvider";
import { useLanguage } from "@/components/common/LanguageProvider";

interface GuideBioData {
  name: string;
  fullName: string;
  eyebrow: string;
  title: string;
  bioP1: string;
  bioP2: string;
  bioP3: string;
  bioP4: string;
  signoff: string;
  rating: string;
  reviewsCount: string;
  experienceYears: string;
  signatureTours: string;
  languages: string;
  badgeText: string;
}

const defaultBio: GuideBioData = {
  name: "Zaky",
  fullName: "Mohamed Zaky Bentabaa",
  eyebrow: "Meet your guide",
  title: "Licensed Tour Guide in Marrakesh",
  bioP1:
    "I'm Mohamed Zaky Bentabaa, a licensed tour guide in Marrakesh and a second-generation guide. I began my career as a professional tour guide in 2007.",
  bioP2:
    "Born and raised in Marrakesh, I hold a Master's degree in Tourism Management and speak Arabic, French, and English. I'm passionate about sharing my city and my country through authentic, private, and tailor-made experiences.",
  bioP3:
    "Over the years, I've had the privilege of guiding travelers from around the world, including personalities from sport, cinema, and media, such as Achraf Hakimi, Fabian Ruiz, Paul Schrader, and Eric André.",
  bioP4:
    "For me, guiding is more than showing places. It's about sharing my city, creating genuine connections, and turning a journey into a lasting memory.",
  signoff: "Welcome to Marrakesh — let me show you my Morocco.",
  rating: "5.0★",
  reviewsCount: "41",
  experienceYears: "19",
  signatureTours: "7",
  languages: "Arabic, French, English",
  badgeText: "41 verified Google reviews",
};

export function AboutSection() {
  const { getImage } = useSiteImages();
  const aboutImage = getImage("about_zaky", "/images/zaky-riad.jpg");
  const [bio, setBio] = useState<GuideBioData>(defaultBio);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/bio")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.bio) {
          setBio(data.bio);
        }
      })
      .catch(() => {
        // keep default
      });
  }, []);

  const languageList = (bio.languages || "Arabic, French, English")
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

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
              alt={aboutImage.alt || `${bio.name}, Marrakesh tour guide`}
              fill
              sizes="(max-width: 860px) 90vw, 420px"
              priority
              style={{ objectFit: "cover", objectPosition: "50% 15%" }}
              unoptimized={aboutImage.url.startsWith("/uploads")}
            />
          </div>

          {/* Arch Badge */}
          <div className="arch-badge">
            <b>{bio.rating}</b>
            <span>{bio.badgeText || `${bio.reviewsCount} ${t.about.verifiedReviews}`}</span>
          </div>
        </div>

        {/* Right Column: Bio & Qualifications */}
        <div className="about-text">
          <span className="eyebrow">{bio.eyebrow || t.about.eyebrow}</span>
          <h2>{bio.name}</h2>

          {bio.bioP1 && <p>{bio.bioP1}</p>}
          {bio.bioP2 && <p>{bio.bioP2}</p>}
          {bio.bioP3 && <p>{bio.bioP3}</p>}
          {bio.bioP4 && <p>{bio.bioP4}</p>}

          {bio.signoff && (
            <p className="guide-signoff">{bio.signoff || t.about.signoff}</p>
          )}

          {/* Stats */}
          <div className="about-stats">
            <div>
              <b>{bio.rating}</b>
              <span>{t.about.googleRating}</span>
            </div>
            <div>
              <b>{bio.reviewsCount}</b>
              <span>{t.about.verifiedReviews}</span>
            </div>
            <div>
              <b>{bio.signatureTours}</b>
              <span>{t.about.signatureTours}</span>
            </div>
          </div>

          {/* Language Pills */}
          <div className="lang-pills">
            {languageList.map((lang) => (
              <span key={lang}>{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

