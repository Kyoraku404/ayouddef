import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultBio = {
  name: "Zaky",
  fullName: "Mohamed Zaky Bentabaa",
  eyebrow: "Meet your guide",
  title: "Licensed Tour Guide in Marrakesh",
  bioP1:
    "I'm Mohamed Zaky Bentabaa, a licensed tour guide in Marrakesh and a second-generation guide. I began my career as a professional tour guide in 2007.",
  bioP2:
    "Born and raised in Marrakesh, I hold a Master's degree in Tourism Management and speak Arabic, French, and English. I'm passionate about sharing my city and my country through authentic, private, and tailor-made experiences.",
  bioP3:
    "Over the years, I've had the privilege of guiding travelers from around the world, including personalities from sport, cinema, and media, such as Achraf Hakimi, Fabian Ruiz, Paul Schrader, and Eric André.",
  bioP4:
    "For me, guiding is more than showing places. It's about sharing my city, creating genuine connections, and turning a journey into a lasting memory.",
  signoff: "Welcome to Marrakesh — let me show you my Morocco.",
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
