import { prisma } from "./db";

export interface SiteImageRecord {
  slotKey: string;
  url: string;
  alt: string | null;
  caption: string | null;
  label: string;
  section: string;
}

// Fallback defaults in case DB is warming up
export const DEFAULT_IMAGES: Record<string, { url: string; alt: string; caption?: string }> = {
  navbar_logo: { url: "/brand-mark.png", alt: "Marrakeshi Tour Guide" },
  footer_logo: { url: "/brand-mark.png", alt: "Marrakeshi Tour Guide" },
  hero_main: { url: "/images/hero.jpg", alt: "Private guide Zaky showing Marrakesh historical architecture" },
  about_zaky: { url: "/images/zaky-riad.jpg", alt: "Mohamed Zaky Bentabaa in a traditional Marrakesh riad" },
  gallery_default: { url: "/images/medina.jpg", alt: "Historic Medina of Marrakesh" },
};

/**
 * Fetch all images mapped by slotKey from PostgreSQL with fallback defaults.
 */
export async function getSiteImagesMap(): Promise<Record<string, { url: string; alt: string; caption?: string }>> {
  try {
    const images = await prisma.siteImage.findMany();
    const map = { ...DEFAULT_IMAGES };
    for (const img of images) {
      map[img.slotKey] = {
        url: img.url,
        alt: img.alt || DEFAULT_IMAGES[img.slotKey]?.alt || "Marrakesh tour image",
        caption: img.caption || undefined,
      };
    }
    return map;
  } catch (err) {
    console.warn("[SiteImages] Falling back to default images due to DB query failure:", err);
    return DEFAULT_IMAGES;
  }
}

/**
 * Get a specific image by slotKey
 */
export async function getSiteImage(slotKey: string, fallbackUrl: string = "/images/hero.jpg"): Promise<string> {
  try {
    const img = await prisma.siteImage.findUnique({
      where: { slotKey },
    });
    return img?.url || DEFAULT_IMAGES[slotKey]?.url || fallbackUrl;
  } catch {
    return DEFAULT_IMAGES[slotKey]?.url || fallbackUrl;
  }
}
