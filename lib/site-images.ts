import "server-only";
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
export { DEFAULT_IMAGES } from "./site-image-defaults";
import { DEFAULT_IMAGES } from "./site-image-defaults";

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
