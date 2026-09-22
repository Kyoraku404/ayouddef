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
  title: "About Me",
  bioP1:
    "I’m Zaky, a second-generation official tour guide born and raised in Marrakech.",
  bioP2:
    "With a Master’s degree in Tourism Management and nearly two decades of experience, I offer a personal and authentic way to discover Marrakech and Morocco.",
  bioP3:
    "For me, guiding is not simply about showing places. It’s about sharing the stories, culture, hidden details and everyday life that make Marrakech truly special.",
  bioP4:
    "Over the years, I’ve had the privilege of guiding guests from all over the world, including internationally known personalities. But whether you are a first-time visitor or a returning guest, my approach remains the same: personal, discreet and tailored to you.",
  signoff: "Marrakech, curated by Zaky",
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
          <h2>{bio.title === "About Me" ? "About Me" : (bio.title ? `${bio.name} — ${bio.title}` : "About Me")}</h2>

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

