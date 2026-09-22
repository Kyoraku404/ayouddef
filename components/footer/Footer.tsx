"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { trackWhatsAppClick } from "@/lib/analytics-client";

import { useSiteImages } from "@/components/common/SiteImagesProvider";
import { useLanguage } from "@/components/common/LanguageProvider";

export function Footer() {
  const { getImage } = useSiteImages();
  const logoImage = getImage("footer_logo", "/brand-mark.png");
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container-custom">
        <div className="foot-grid">
          {/* Column 1: Brand & Bio */}
          <div className="foot-brand">
            <a href="#home" className="brand">
              <Image
                src={logoImage.url}
                alt={logoImage.alt || "Marrakeshi Tour Guide"}
                width={40}
                height={40}
                className="brand-mark"
                unoptimized={logoImage.url.startsWith("/uploads")}
              />
              <span>{t.nav.brandTitle}</span>
            </a>
            <p>
              {t.footer.secondGenGuide}
            </p>
            <div className="foot-socials">
              <a
                href="https://wa.me/212661176369"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackWhatsAppClick("footer_social_icon", "https://wa.me/212661176369", e)}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20l1.4-4A8 8 0 1 1 9 19.5L4 20z" />
                  <path d="M9 10c0 3 2 5 5 5" />
                </svg>
              </a>
              <a href="mailto:hello@marrakeshitourguide.com" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-sand/10 flex items-center gap-1.5 text-xs text-sand-soft/70">
              <span>Made by</span>
              <span
                className="text-gold font-bold tracking-wide"
              >
                Zaky
              </span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="foot-col">
            <h4>{t.footer.navigation}</h4>
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#tours">{t.nav.tours}</a>
            <a href="#gallery">{t.nav.gallery}</a>
            <a href="#reviews">{t.nav.reviews}</a>
          </div>

          {/* Column 3: Signature Tours */}
          <div className="foot-col">
            <h4>{t.footer.experiences}</h4>
            <Link href="/tours/marrakesh-medina-tour">Medina Heritage Tour</Link>
            <Link href="/tours/souks-local-markets">Souks & Craft Markets</Link>
            <Link href="/tours/marrakesh-by-night">Marrakesh by Night</Link>
            <Link href="/tours/atlas-mountains-three-valleys">Atlas Mountains Day Trip</Link>
            <Link href="/#tours">All Private Tours</Link>
          </div>

          {/* Column 4: Contact */}
          <div className="foot-col">
            <h4>{t.footer.contactDirect}</h4>
            <a href="mailto:hello@marrakeshitourguide.com">hello@marrakeshitourguide.com</a>
            <span className="text-sand-soft/80 block text-sm">Medina, Marrakesh, Morocco</span>
            <Link
              href="/adminzaky"
              className="text-xs text-sand-soft/60 hover:text-sand-soft transition-colors mt-1 block"
            >
              Guide Portal
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Positioned above and clear of floating AI widget */}
        <div className="foot-bottom flex flex-col md:flex-row items-center justify-between gap-4 pt-6 pb-24 sm:pb-16 border-t border-sand/10">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left text-xs sm:text-sm text-sand/60">
            <span>{t.footer.rights}</span>
            <span className="hidden sm:inline text-sand/30">•</span>
            <span>{t.footer.tagline}</span>
          </div>

          {/* Made by Zaky Badge with safe right margin on desktop */}
          <div className="flex items-center gap-2 md:mr-48 z-10">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-soft/10 border border-gold/40 text-xs text-sand-soft font-medium tracking-wide shadow-xs"
            >
              <span>Made by</span>
              <strong className="text-gold font-bold tracking-wider">
                Zaky
              </strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
