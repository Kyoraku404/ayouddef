"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useLanguage } from "@/components/common/LanguageProvider";
import { useBodyScrollLock } from "@/components/common/useBodyScrollLock";

interface GalleryPhoto {
  id: string;
  slotKey: string;
  label: string;
  url: string;
  alt: string | null;
  caption: string | null;
  section: string;
  sortOrder: number;
}

export function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useBodyScrollLock(lightboxIndex !== null);
  const { language } = useLanguage();

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.photos) && data.photos.length > 0) {
          setPhotos(data.photos);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, photos.length]);

  const title =
    language === "fr"
      ? "Galerie Photos"
      : language === "es"
        ? "Galería de Fotos"
        : "Photo Gallery";
  const subtitle =
    language === "fr"
      ? "40+ moments authentiques à Marrakech — médina, souks, monuments et désert, capturés avec Zaky."
      : language === "es"
        ? "Más de 40 momentos auténticos en Marrakech — medina, zocos, monumentos y desierto con Zaky."
        : "40+ authentic Marrakech moments — medina, souks, landmarks and desert, captured with Zaky.";
  const showMore = language === "fr" ? "Voir plus de photos" : language === "es" ? "Ver más fotos" : "Show more photos";
  const showLess = language === "fr" ? "Voir moins" : language === "es" ? "Ver menos" : "Show less";

  const visible = photos.slice(0, visibleCount);
  const active = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery">
      <div className="container-custom">
        <div className="sec-head center">
          <span className="eyebrow">
            <Camera className="inline w-4 h-4 mr-1 -mt-0.5" />
            {language === "fr" ? "Galerie" : language === "es" ? "Galería" : "Gallery"}
          </span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {photos.length === 0 ? (
          <p className="text-center text-ink/60">Loading gallery…</p>
        ) : (
          <>
            <div className="gallery-grid">
              {visible.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="gallery-item"
                  aria-label={`Open photo ${i + 1}: ${photo.alt || photo.label}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt || photo.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="gallery-img"
                    unoptimized={photo.url.startsWith("/uploads") || photo.url.startsWith("http")}
                  />
                  <span className="gallery-overlay">
                    <span>{photo.caption || photo.label}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="gallery-actions">
              <span className="gallery-count">
                {visible.length} / {photos.length} photos
              </span>
              {visibleCount < photos.length ? (
                <button type="button" className="btn btn-dark" onClick={() => setVisibleCount((c) => c + 12)}>
                  {showMore}
                </button>
              ) : (
                photos.length > 12 && (
                  <button type="button" className="btn btn-dark" onClick={() => setVisibleCount(12)}>
                    {showLess}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>

      {active && (
        <div className="gallery-lightbox" onClick={() => setLightboxIndex(null)}>
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav left"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex! - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="gallery-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <Image
              src={active.url}
              alt={active.alt || active.label}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized={active.url.startsWith("/uploads") || active.url.startsWith("http")}
              priority
            />
            {(active.caption || active.label) && (
              <span className="gallery-lightbox-caption">{active.caption || active.label}</span>
            )}
            <span className="gallery-lightbox-counter">
              {(lightboxIndex ?? 0) + 1} / {photos.length}
            </span>
          </div>
          <button
            type="button"
            className="gallery-lightbox-nav right"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex! + 1) % photos.length);
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
