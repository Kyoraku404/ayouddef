"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { TourGalleryImage } from "@/lib/types";
import { useSiteImages } from "@/components/common/SiteImagesProvider";

const TOUR_SLOT_PREFIX_MAP: Record<string, string> = {
  "marrakesh-medina-tour": "tour_medina_",
  "souks-local-markets": "tour_souks_",
  "historical-marrakesh": "tour_historical_",
  "marrakesh-by-night": "tour_bynight_",
  "marrakesh-private-signature-experience-7-days": "tour_signature_",
  "marrakesh-oualidia-coastal-escape-5-days": "tour_oualidia_",
  "customized-private-tours": "tour_custom_",
};

interface AnimatedGalleryProps {
  images: TourGalleryImage[];
  tourTitle: string;
  tourSlug?: string;
}

export function AnimatedGallery({ images, tourTitle, tourSlug }: AnimatedGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const { getImage } = useSiteImages();

  const slotPrefix = tourSlug ? TOUR_SLOT_PREFIX_MAP[tourSlug] : null;

  const baseImages = images && images.length > 0 ? images : [
    {
      src: "/images/medina.jpg",
      alt: tourTitle,
      caption: "Experience authentic moments in Marrakesh with Zaky.",
    },
  ];

  const safeImages = baseImages.map((img, i) => {
    if (slotPrefix) {
      const dbImg = getImage(`${slotPrefix}${i + 1}`, img.src);
      if (dbImg && dbImg.url) {
        return {
          src: dbImg.url,
          alt: dbImg.alt || img.alt,
          caption: dbImg.caption || img.caption,
        };
      }
    }
    return img;
  });

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [safeImages.length]);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35 },
    }),
  };

  const activeImg = safeImages[currentIndex];

  return (
    <div className="w-full">
      {/* Main Feature Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-sand-soft shadow-md border border-sand/60 group">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={activeImg.src}
              alt={activeImg.alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1180px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              unoptimized={activeImg.src.startsWith("/uploads")}
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Dark Bottom Scrim for Caption */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brown/85 via-brown/40 to-transparent pointer-events-none" />

        {/* Image Caption & Index Badge */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between gap-4 z-10">
          <p className="text-cream text-xs sm:text-sm font-medium drop-shadow-sm max-w-lg leading-snug">
            {activeImg.caption}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cream/90 backdrop-blur-md text-brown text-xs font-semibold shadow-xs">
              {currentIndex + 1} / {safeImages.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="p-1.5 rounded-full bg-cream/90 backdrop-blur-md text-brown hover:bg-cream transition-colors shadow-xs"
              aria-label="Expand photo"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Left / Right Nav Arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/90 hover:bg-cream text-brown border border-sand shadow-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/90 hover:bg-cream text-brown border border-sand shadow-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Selector Strip */}
      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`relative flex-shrink-0 w-20 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                idx === currentIndex
                  ? "border-terracotta ring-2 ring-gold/50 scale-105 shadow-sm"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="120px"
                className="object-cover"
                unoptimized={img.src.startsWith("/uploads")}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brown/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-cream/20 hover:bg-cream/40 text-cream transition-colors z-50"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-5xl w-full aspect-[4/3] sm:aspect-[16/10] max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImg.src}
                alt={activeImg.alt}
                fill
                sizes="1200px"
                className="object-contain"
                priority
                unoptimized={activeImg.src.startsWith("/uploads")}
              />

              <div className="absolute bottom-4 inset-x-4 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-brown/80 backdrop-blur-md text-cream text-sm">
                  {activeImg.caption}
                </span>
              </div>
            </div>

            {/* Lightbox Prev / Next Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-cream/20 hover:bg-cream/40 text-cream transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-cream/20 hover:bg-cream/40 text-cream transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
