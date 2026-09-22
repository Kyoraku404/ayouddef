import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultBio = {
  name: "Zaky",
  fullName: "Mohamed Zaky Bentabaa",
  eyebrow: "Meet your guide",
  title: "About Me",
  bioP1:
    "I’m Zaky, a second-generation official tour guide born and raised in Marrakech.",
  bioP2:
    "With a Master’s degree in Tourism Management and nearly two decades of experience, I offer a personal and authentic way to discover Marrakech and Morocco.",
  bioP3:
    "For me, guiding is not simply about showing places. It’s about sharing the stories, culture, hidden details and everyday life that make Marrakech truly special.",
  bioP4:
    "Over the years, I’ve had the privilege of guiding guests from all over the world, including internationally known personalities. But whether you are a first-time visitor or a returning guest, my approach remains the same: personal, discreet and tailored to you.",
  signoff: "Marrakech, curated by Zaky",
  rating: "5.0★",
  reviewsCount: "41",
  experienceYears: "19",
  signatureTours: "7",
  languages: "Arabic, French, English",
  badgeText: "41 verified Google reviews",
};

export async function GET() {
  try {
    const bio = await prisma.guideBio.findUnique({
      where: { id: "guide_zaky" },
    });

    if (bio) {
      return NextResponse.json({ success: true, bio });
    }

    return NextResponse.json({ success: true, bio: defaultBio });
  } catch (error: any) {
    console.warn("Falling back to default guide bio:", error.message);
    return NextResponse.json({ success: true, bio: defaultBio });
  }
}
