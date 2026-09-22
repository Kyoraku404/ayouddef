"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSiteImages } from "@/components/common/SiteImagesProvider";
import { useCurrency } from "@/components/common/CurrencyProvider";
import { useLanguage } from "@/components/common/LanguageProvider";
import { Language } from "@/lib/i18n";

const languages: { code: Language; label: string; full: string }[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "fr", label: "FR", full: "Français" },
  { code: "es", label: "ES", full: "Español" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { getImage } = useSiteImages();
  const logoImage = getImage("navbar_logo", "/brand-mark.png");

  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Helper to ensure links work from both home and tour subpages
  const getHref = (hash: string) => (isHomePage ? hash : `/${hash}`);

  return (
    <>
      <header id="siteHeader" className={`site-header ${scrolled ? "solid" : ""}`}>
        <div className="container-custom nav-row">
          <Link href={getHref("#home")} className="brand" aria-label="Marrakeshi Tour Guide Home">
            <Image
              src={logoImage.url}
              alt={logoImage.alt || "Marrakeshi Tour Guide"}
              width={40}
              height={40}
              className="brand-mark"
              priority
              unoptimized={logoImage.url.startsWith("/uploads")}
            />
            <span>{t.nav.brandTitle}</span>
          </Link>

          <nav className="links">
            <Link href={getHref("#home")}>{t.nav.home}</Link>
            <Link href={getHref("#about")}>{t.nav.about}</Link>
            <Link href={getHref("#tours")}>{t.nav.tours}</Link>
            <Link href={getHref("#gallery")}>{t.nav.gallery}</Link>
            <Link href={getHref("#reviews")}>{t.nav.reviews}</Link>
            <Link href={getHref("#reservation")}>{t.nav.reservation}</Link>
            <Link href={getHref("#contact")}>{t.nav.contact}</Link>
          </nav>

          <div className="nav-cta-wrap">
            {/* Unified Luxury Control Capsule: Currency & Language */}
            <div
              className={`hidden lg:flex items-center gap-1 px-1.5 py-1 rounded-full border transition-all duration-300 ${
                scrolled
                  ? "bg-sand-soft/95 border-sand text-brown shadow-xs"
                  : "bg-black/35 backdrop-blur-md border-white/20 text-cream shadow-sm"
              }`}
            >
              {/* Currency Segment */}
              <div className="flex items-center rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setCurrency("MAD")}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                    currency === "MAD"
                      ? "bg-terracotta text-white shadow-xs"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  title="Moroccan Dirham (MAD)"
                >
                  MAD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("EUR")}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                    currency === "EUR"
                      ? "bg-terracotta text-white shadow-xs"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  title="Euro (€)"
                >
                  € EUR
                </button>
              </div>

              {/* Subtle Elegant Divider */}
              <span className={`w-px h-3.5 mx-0.5 transition-colors ${scrolled ? "bg-brown/20" : "bg-white/25"}`} />

              {/* Language Segment */}
              <div className="flex items-center rounded-full p-0.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                      language === l.code
                        ? "bg-terracotta text-white shadow-xs"
                        : "opacity-75 hover:opacity-100"
                    }`}
                    title={l.full}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <Link href={getHref("#tours")} className="btn btn-primary nav-cta">
              {t.nav.cta}
            </Link>
            <button
              className={`burger ${mobileMenuOpen ? "open" : ""}`}
              id="burgerBtn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobileMenu">
        {/* Mobile Switchers Bar */}
        <div className="flex flex-col gap-3.5 p-4 w-full max-w-[290px] mb-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cream/75 uppercase tracking-wider">Devise / Currency</span>
            <div className="flex items-center bg-black/25 rounded-full p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setCurrency("MAD")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  currency === "MAD" ? "bg-terracotta text-white shadow-xs" : "text-cream/80"
                }`}
              >
                MAD
              </button>
              <button
                type="button"
                onClick={() => setCurrency("EUR")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  currency === "EUR" ? "bg-terracotta text-white shadow-xs" : "text-cream/80"
                }`}
              >
                € EUR
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cream/75 uppercase tracking-wider">Langue / Language</span>
            <div className="flex items-center bg-black/25 rounded-full p-0.5 border border-white/10">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                    language === l.code ? "bg-terracotta text-white shadow-xs" : "text-cream/80"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Link href={getHref("#home")} onClick={closeMobileMenu}>{t.nav.home}</Link>
        <Link href={getHref("#about")} onClick={closeMobileMenu}>{t.nav.about}</Link>
        <Link href={getHref("#tours")} onClick={closeMobileMenu}>{t.nav.tours}</Link>
        <Link href={getHref("#gallery")} onClick={closeMobileMenu}>{t.nav.gallery}</Link>
        <Link href={getHref("#reviews")} onClick={closeMobileMenu}>{t.nav.reviews}</Link>
        <Link href={getHref("#reservation")} onClick={closeMobileMenu}>{t.nav.reservation}</Link>
        <Link href={getHref("#contact")} onClick={closeMobileMenu}>{t.nav.contact}</Link>
        <Link href={getHref("#tours")} className="btn btn-primary mt-2" onClick={closeMobileMenu}>
          {t.nav.cta}
        </Link>
      </div>
    </>
  );
}
