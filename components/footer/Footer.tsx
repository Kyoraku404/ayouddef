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
          </div>

          {/* Column 2: Explore */}
          <div className="foot-col">
            <h4>{t.footer.navigation}</h4>
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#tours">{t.nav.tours}</a>
            <a href="#reviews">{t.nav.reviews}</a>
          </div>

          {/* Column 3: Book */}
          <div className="foot-col">
            <h4>{t.footer.experiences}</h4>
            <Link href="/#tours">{t.nav.cta}</Link>
            <Link href="/#reservation">{t.nav.reservation}</Link>
            <a
              href="https://wa.me/212661176369"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppClick("footer_book_link", "https://wa.me/212661176369", e)}
            >
              WhatsApp
            </a>
          </div>

          {/* Column 4: Contact */}
          <div className="foot-col">
            <h4>{t.footer.contactDirect}</h4>
            <a href="mailto:hello@marrakeshitourguide.com">hello@marrakeshitourguide.com</a>
            <a href="#">Medina, Marrakesh</a>
            <Link
              href="/adminzaky"
              className="text-xs text-sand-soft/60 hover:text-sand-soft transition-colors"
            >
              Guide Portal
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="foot-bottom flex flex-wrap items-center justify-between gap-4">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-3">
            <span>{t.footer.tagline}</span>
            <span className="text-sand/30">•</span>
            <a
              href="https://ocndev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sand-soft/80 hover:text-white transition-all font-medium tracking-wide group"
              title="Visit OCN Agency — https://ocndev.vercel.app/"
            >
              <span>Made by</span>
              <strong className="text-gold group-hover:text-amber-300 font-bold tracking-wider underline underline-offset-4 decoration-gold/40 group-hover:decoration-amber-300 transition-colors">
                OCN
              </strong>
              <svg
                className="w-3 h-3 text-gold/70 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
