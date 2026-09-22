"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  Users,
  Languages,
  Star,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { Tour } from "@/lib/types";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { AnimatedGallery } from "@/components/tours/AnimatedGallery";
import { TourMap } from "@/components/tours/TourMap";
import { TourCard } from "@/components/tours/TourCard";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getWhatsAppReservationUrl } from "@/lib/whatsapp";
import { useCurrency } from "@/components/common/CurrencyProvider";
import { useLanguage } from "@/components/common/LanguageProvider";

interface TourDetailClientProps {
  tour: Tour;
  otherTours: Tour[];
}

export function TourDetailClient({ tour, otherTours }: TourDetailClientProps) {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  const formattedPrice = tour.price ? formatPrice(tour.price) : "";

  const whatsAppUrl = getWhatsAppReservationUrl({
    fullName: "Traveler",
    email: "",
    phone: "",
    date: "Flexible",
    tour: tour.title,
    people: 2,
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink selection:bg-sand selection:text-brown">
      {/* Sticky Navigation Header */}
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          {/* Breadcrumb & Back Link */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-ink/70" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-terracotta transition-colors">
                {t.nav.home}
              </Link>
              <span>/</span>
              <Link href="/#tours" className="hover:text-terracotta transition-colors">
                {t.nav.tours}
              </Link>
              <span>/</span>
              <span className="text-brown font-semibold truncate max-w-[200px] sm:max-w-none">
                {tour.title}
              </span>
            </nav>

            <Link
              href="/#tours"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.tourDetail.backHome}</span>
            </Link>
          </div>

          {/* Tour Header Title Banner */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-soft border border-sand text-xs font-semibold text-terracotta uppercase tracking-wider mb-3">
              <span>{t.tours.privateTour} Marrakesh Experience</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brown font-semibold leading-tight">
              {tour.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-brown-soft max-w-3xl leading-relaxed">
              {tour.subtitle}
            </p>

            {/* Quick Badges Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-sand text-xs sm:text-sm text-brown">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-terracotta" />
                <span className="font-semibold">{tour.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span>{tour.groupType}</span>
              </div>

              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-terracotta" />
                <span>{tour.languages}</span>
              </div>

              {formattedPrice && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand text-terracotta-dark font-bold text-xs">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{formattedPrice}</span>
                </div>
              )}
            </div>

            {/* Quick Mobile Action Buttons */}
            <div className="mt-4 flex sm:hidden items-center gap-2.5">
              <Link
                href={`/?tour=${encodeURIComponent(tour.slug)}#reservation`}
                className="flex-1 btn btn-primary py-2.5 px-4 text-xs font-semibold justify-center text-center"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.tourDetail.bookThisTour}</span>
              </Link>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark py-2.5 px-3.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                aria-label="WhatsApp Inquiry"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Animated Photo Gallery Component */}
          <div className="mb-14">
            <AnimatedGallery images={tour.gallery} tourTitle={tour.title} tourSlug={tour.slug} />
          </div>

          {/* 2-Column Main Content & Booking Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Content Column (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Tour Overview / Narrative */}
              <section>
                <h2 className="font-heading text-2xl sm:text-3xl text-brown font-semibold mb-4">
                  {t.tourDetail.overview}
                </h2>
                <div className="space-y-4 text-ink/85 leading-relaxed text-base sm:text-lg">
                  {tour.fullDescription?.map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Highlights Checklist */}
              {tour.highlights && tour.highlights.length > 0 && (
                <section className="p-6 sm:p-8 rounded-2xl bg-sand-soft/60 border border-sand">
                  <h3 className="font-heading text-xl sm:text-2xl text-brown font-semibold mb-4">
                    {t.tourDetail.highlights}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {tour.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-ink/85">
                        <CheckCircle2 className="w-4 h-4 text-terracotta flex-shrink-0 mt-1" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Interactive Route Map & Itinerary */}
              <section id="route-map">
                <TourMap
                  stops={tour.itinerary || []}
                  mapCenter={tour.mapCenter}
                  tourTitle={tour.title}
                />
              </section>

              {/* What's Included / Not Included */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-cream border border-sand shadow-xs">
                  <h4 className="font-heading text-lg font-semibold text-brown mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{t.tourDetail.included}</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-ink/80">
                    {tour.included?.map((inc: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-cream border border-sand shadow-xs">
                  <h4 className="font-heading text-lg font-semibold text-brown mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-brown/50" />
                    <span>{t.tourDetail.notIncluded}</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-ink/80">
                    {tour.notIncluded?.map((notInc: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brown/40 font-bold">•</span>
                        <span>{notInc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Right Booking Sidebar (lg:col-span-4) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-cream border-2 border-gold/40 shadow-xl">
                <span className="eyebrow text-xs uppercase tracking-widest text-gold mb-1">
                  Private Reservation
                </span>
                <h3 className="font-heading text-2xl text-brown font-semibold mb-2">
                  {t.tourDetail.bookThisTour}
                </h3>

                {formattedPrice && (
                  <div className="mb-4 pb-4 border-b border-sand/70">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-3xl font-bold text-terracotta">
                        {formattedPrice}
                      </span>
                      <span className="text-xs text-ink/70 font-medium">/ {t.tourDetail.perPrivateGroup}</span>
                    </div>
                    {tour.priceNote && (
                      <p className="text-[11px] text-ink/70 mt-1">{tour.priceNote}</p>
                    )}
                  </div>
                )}

                <p className="text-xs text-ink/75 mb-6">
                  {t.tourDetail.bookSub}
                </p>

                {/* Primary CTA: Jump to Booking form on Home page with tour preselected */}
                <Link
                  href={`/?tour=${encodeURIComponent(tour.slug)}#reservation`}
                  className="w-full btn btn-primary flex items-center justify-center gap-2 py-4 mb-3"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.tourDetail.bookThisTour}</span>
                </Link>

                {/* WhatsApp Quick Direct Message */}
                <WhatsAppButton
                  href={whatsAppUrl}
                  source={`tour_page_${tour.slug}`}
                >
                  {t.tourDetail.instantWhatsApp}
                </WhatsAppButton>

                {/* Trust Badges */}
                <div className="mt-6 pt-5 border-t border-sand space-y-3 text-xs text-brown/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <span>Certified Guide (License #2007)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Free cancellation up to 24h prior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <span>100% Private, customizable pace</span>
                  </div>
                </div>
              </div>

              {/* Guide Bio Teaser */}
              <div className="p-5 rounded-2xl bg-sand-soft/70 border border-sand text-center">
                <p className="font-heading text-sm text-brown font-semibold">
                  &ldquo;Let me show you the real Marrakesh.&rdquo;
                </p>
                <span className="text-xs text-terracotta font-serif italic block mt-1">
                  — Zaky, Local Guide
                </span>
              </div>
            </div>
          </div>

          {/* Explore Other Experiences Carousel */}
          {otherTours.length > 0 && (
            <div className="mt-20 pt-14 border-t border-sand">
              <div className="sec-head mb-8">
                <span className="eyebrow">More Experiences</span>
                <h2>Discover other Marrakesh tours</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherTours.map((t) => (
                  <TourCard key={t.id} tour={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}
