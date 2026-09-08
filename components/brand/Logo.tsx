"use client";

import React from "react";
import Image from "next/image";
import { useSiteImages } from "@/components/common/SiteImagesProvider";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  lightText?: boolean;
}

export function Logo({
  className = "",
  size = "md",
  showText = true,
  lightText = false,
}: LogoProps) {
  const { getImage } = useSiteImages();
  const logoImage = getImage("navbar_logo", "/brand-mark.png");
  const imgSize = size === "sm" ? 34 : size === "lg" ? 48 : 40;

  return (
    <div
      className={`brand ${className}`}
      style={lightText ? { color: "var(--cream)" } : undefined}
    >
      <Image
        src={logoImage.url}
        alt={logoImage.alt || "Marrakeshi Tour Guide"}
        width={imgSize}
        height={imgSize}
        className="brand-mark"
        style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
        priority
        unoptimized={logoImage.url.startsWith("/uploads")}
      />
      {showText && <span>Marrakeshi Tour Guide</span>}
    </div>
  );
}
