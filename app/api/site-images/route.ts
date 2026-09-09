import { NextResponse } from "next/server";
import { getSiteImagesMap } from "@/lib/site-images";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const images = await getSiteImagesMap();
    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Public site-images API error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
