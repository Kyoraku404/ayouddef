import { NextResponse } from "next/server";
import { getSiteImagesMap } from "@/lib/site-images";

export async function GET() {
  try {
    const images = await getSiteImagesMap();
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Public site-images API error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
