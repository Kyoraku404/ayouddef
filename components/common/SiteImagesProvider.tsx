"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_IMAGES } from "@/lib/site-images";

export interface ImageInfo {
  url: string;
  alt: string;
  caption?: string;
}

interface SiteImagesContextType {
  images: Record<string, ImageInfo>;
  getImage: (slotKey: string, fallback?: string) => ImageInfo;
  refetchImages: () => Promise<void>;
}

const SiteImagesContext = createContext<SiteImagesContextType>({
  images: DEFAULT_IMAGES,
  getImage: (slotKey: string, fallback?: string) => ({
    url: DEFAULT_IMAGES[slotKey]?.url || fallback || "/images/hero.jpg",
    alt: DEFAULT_IMAGES[slotKey]?.alt || "Marrakesh tour guide",
  }),
  refetchImages: async () => {},
});

export function SiteImagesProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<Record<string, ImageInfo>>(DEFAULT_IMAGES);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/site-images");
      if (res.ok) {
        const data = await res.json();
        if (data.images) {
          setImages((prev) => ({ ...prev, ...data.images }));
        }
      }
    } catch (err) {
      console.warn("[SiteImagesProvider] Could not load live images, using defaults:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const getImage = (slotKey: string, fallback?: string): ImageInfo => {
    if (images[slotKey]) {
      return images[slotKey];
    }
    return {
      url: fallback || DEFAULT_IMAGES[slotKey]?.url || "/images/hero.jpg",
      alt: DEFAULT_IMAGES[slotKey]?.alt || "Marrakesh tour guide",
    };
  };

  return (
    <SiteImagesContext.Provider value={{ images, getImage, refetchImages: fetchImages }}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export function useSiteImages() {
  return useContext(SiteImagesContext);
}
