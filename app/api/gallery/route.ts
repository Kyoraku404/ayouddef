import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FALLBACK_SOURCES = [
  "/images/hero.jpg",
  "/images/medina.jpg",
  "/images/souks.jpg",
  "/images/bahia.jpg",
  "/images/zaky-riad.jpg",
];

const FALLBACK_CAPTIONS = [
  "Historic Medina alleyways of Marrakesh",
  "Guided walk with Zaky through heritage landmarks",
  "Artisan souks, brass lanterns and Berber carpets",
  "Moorish courtyards and palace architecture",
  "Riad courtyard moments with guests",
];

function buildFallbackGallery(count = 40) {
  return Array.from({ length: count }, (_, i) => {
    const src = FALLBACK_SOURCES[i % FALLBACK_SOURCES.length];
    return {
      id: `fallback-${i + 1}`,
      slotKey: `gallery_fallback_${i + 1}`,
      label: `Gallery photo ${i + 1}`,
      url: src,
      alt: FALLBACK_CAPTIONS[i % FALLBACK_CAPTIONS.length],
      caption: FALLBACK_CAPTIONS[i % FALLBACK_CAPTIONS.length],
      section: "Gallery",
      sortOrder: i + 1,
    };
  });
}

// GET: Public gallery photos (section = "Gallery"), 40+ items.
// Falls back to 40 local photos when the admin has not uploaded any yet.
export async function GET() {
  try {
    const photos = await prisma.siteImage.findMany({
      where: { section: "Gallery" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (photos.length === 0) {
      return NextResponse.json(
        { success: true, photos: buildFallbackGallery(40), fallback: true },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    // If admin uploaded fewer than 40, top up with fallback so the
    // gallery section always looks full (40+ photos).
    if (photos.length < 40) {
      const needed = 40 - photos.length;
      const filler = buildFallbackGallery(needed).map((f, i) => ({
        ...f,
        id: `filler-${i + 1}`,
      }));
      return NextResponse.json(
        { success: true, photos: [...photos, ...filler], fallback: false },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { success: true, photos, fallback: false },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Public gallery API error:", error);
    return NextResponse.json({ success: true, photos: buildFallbackGallery(40), fallback: true });
  }
}
