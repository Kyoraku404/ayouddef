"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSiteImages } from "@/components/common/SiteImagesProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { getImage } = useSiteImages();
  const logoImage = getImage("navbar_logo", "/brand-mark.png");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <span>Marrakeshi Tour Guide</span>
          </Link>

          <nav className="links">
            <Link href={getHref("#home")}>Home</Link>
            <Link href={getHref("#about")}>About Zaky</Link>
            <Link href={getHref("#tours")}>Tours</Link>
            <Link href={getHref("#reviews")}>Reviews</Link>
            <Link href={getHref("#reservation")}>Reservation</Link>
            <Link href={getHref("#contact")}>Contact</Link>
          </nav>

          <div className="nav-cta-wrap">
            <Link href={getHref("#tours")} className="btn btn-primary nav-cta">
              Discover More
            </Link>
            <button
              className="burger"
              id="burgerBtn"
              aria-label="Open menu"
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
        <Link href={getHref("#home")} onClick={closeMobileMenu}>Home</Link>
        <Link href={getHref("#about")} onClick={closeMobileMenu}>About Zaky</Link>
        <Link href={getHref("#tours")} onClick={closeMobileMenu}>Tours</Link>
        <Link href={getHref("#reviews")} onClick={closeMobileMenu}>Reviews</Link>
        <Link href={getHref("#reservation")} onClick={closeMobileMenu}>Reservation</Link>
        <Link href={getHref("#contact")} onClick={closeMobileMenu}>Contact</Link>
        <Link href={getHref("#tours")} className="btn btn-primary mt-2" onClick={closeMobileMenu}>
          Discover More
        </Link>
      </div>
    </>
  );
}
