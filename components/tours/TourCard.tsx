"use client";

import React from "react";
import Link from "next/link";
import { Tour } from "@/lib/types";
import { useCurrency } from "@/components/common/CurrencyProvider";
import { useLanguage } from "@/components/common/LanguageProvider";

interface TourCardProps {
  tour: Tour;
  onSelectTour?: (tourTitle: string) => void;
}

export function TourIcon({ type }: { type: Tour["icon"] }) {
  switch (type) {
    case "gate":
      return (
        <>
          <path d="M14 58V30c0-10 8-18 18-18s18 8 18 18v28" strokeWidth="1.8" />
          <path d="M8 58h48" strokeWidth="1.8" />
        </>
      );
    case "basket":
      return (
        <>
          <path d="M14 26h36l-4 30H18l-4-30z" strokeWidth="1.8" />
          <path d="M22 26c0-8 4-14 10-14s10 6 10 14" strokeWidth="1.8" />
        </>
      );
    case "palace":
      return (
        <>
          <path d="M32 10l10 10H22z" strokeWidth="1.8" />
          <path d="M18 20v34h28V20" strokeWidth="1.8" />
          <path d="M26 54V38h12v16" strokeWidth="1.8" />
        </>
      );
    case "tea":
      return (
        <>
          <path d="M14 26h30l-3 8H17z" strokeWidth="1.8" />
          <path d="M17 34l3 20h24l3-20" strokeWidth="1.8" />
          <path d="M44 28h6a6 6 0 0 1 0 12h-4" strokeWidth="1.8" />
        </>
      );
    case "monument":
      return (
        <>
          <circle cx="32" cy="24" r="10" strokeWidth="1.8" />
          <path d="M18 54h28" strokeWidth="1.8" />
          <path d="M22 54V34" strokeWidth="1.8" />
          <path d="M42 54V34" strokeWidth="1.8" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="32" cy="32" r="20" strokeWidth="1.8" />
          <path d="M40 24l-6 12-12 6 6-12z" strokeWidth="1.8" />
        </>
      );
    case "road":
      return (
        <>
          <path d="M20 54L30 10h4l10 44" strokeWidth="1.8" />
          <path d="M28 34h8" strokeWidth="1.8" />
          <path d="M25 44h14" strokeWidth="1.8" />
        </>
      );
  }
}

export function TourCard({ tour }: TourCardProps) {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  return (
    <article className="tour-card">
      <Link href={`/tours/${tour.slug}`} className={`tour-photo ${tour.cls}`} tabIndex={-1}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <TourIcon type={tour.icon} />
        </svg>
      </Link>
      <div className="tour-body">
        <h3>
          <Link href={`/tours/${tour.slug}`} className="hover:text-terracotta transition-colors">
            {tour.title}
          </Link>
        </h3>
        {tour.price && (
          <div className="flex flex-wrap items-center gap-2 my-2 text-xs font-semibold">
            <span className="bg-sand px-2.5 py-1 rounded-full text-terracotta-dark">
              {formatPrice(tour.price)} — {t.tours.privateTour}
            </span>
            {tour.badge && (
              <span className="bg-terracotta text-cream text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                {tour.badge}
              </span>
            )}
            <span className="text-ink/70">{tour.duration}</span>
          </div>
        )}
        <p>{tour.description}</p>
        <Link
          href={`/tours/${tour.slug}`}
          className="btn btn-dark"
        >
          {t.tours.discoverMore}
        </Link>
      </div>
    </article>
  );
}
