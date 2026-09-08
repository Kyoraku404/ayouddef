"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { trackWhatsAppClick } from "@/lib/analytics-client";

import { useSiteImages } from "@/components/common/SiteImagesProvider";

export function Footer() {
  const { getImage } = useSiteImages();
  const logoImage = getImage("footer_logo", "/brand-mark.png");

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
              <span>Marrakeshi Tour Guide</span>
            </a>
            <p>
              Private, authentic Marrakesh tours with licensed local guide Zaky. Second-generation guide, Master&apos;s in Tourism, since 2007.
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
            <h4>EXPLORE</h4>
            <a href="#home">Home</a>
            <a href="#about">About Zaky</a>
            <a href="#tours">Tours</a>
            <a href="#reviews">Reviews</a>
          </div>

          {/* Column 3: Book */}
          <div className="foot-col">
            <h4>BOOK</h4>
            <a href="/#tours">Discover More</a>
            <a href="/#reservation">Reservation</a>
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
            <h4>CONTACT</h4>
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
        <div className="foot-bottom">
          <span>© 2026 Marrakeshi Tour Guide by Zaky. All rights reserved.</span>
          <span>Designed for authentic Marrakesh experiences.</span>
        </div>
      </div>
    </footer>
  );
}
