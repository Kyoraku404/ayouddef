import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getZakySession } from "@/lib/auth";
import { getOcnSession } from "@/lib/ocn-auth";

export const dynamic = "force-dynamic";

async function isAuthorized() {
  const zaky = await getZakySession();
  if (zaky) return true;
  const ocn = await getOcnSession();
  return Boolean(ocn);
}

// GET: Fetch Guide Bio from PostgreSQL
export async function GET() {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let bio = await prisma.guideBio.findUnique({
      where: { id: "guide_zaky" },
    });

    if (!bio) {
      // Default fallback if not yet in db
      bio = {
        id: "guide_zaky",
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return NextResponse.json({ success: true, bio });
  } catch (error: any) {
    console.error("Error fetching guide bio:", error);
    return NextResponse.json(
      { error: "Failed to fetch guide bio", details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update Guide Bio in PostgreSQL
export async function PUT(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      fullName,
      eyebrow,
      title,
      bioP1,
      bioP2,
      bioP3,
      bioP4,
      signoff,
      rating,
      reviewsCount,
      experienceYears,
      signatureTours,
      languages,
      badgeText,
    } = body;

    const updated = await prisma.guideBio.upsert({
      where: { id: "guide_zaky" },
      update: {
        ...(name !== undefined && { name: String(name).trim() }),
        ...(fullName !== undefined && { fullName: String(fullName).trim() }),
        ...(eyebrow !== undefined && { eyebrow: String(eyebrow).trim() }),
        ...(title !== undefined && { title: String(title).trim() }),
        ...(bioP1 !== undefined && { bioP1: String(bioP1).trim() }),
        ...(bioP2 !== undefined && { bioP2: String(bioP2).trim() }),
        ...(bioP3 !== undefined && { bioP3: String(bioP3).trim() }),
        ...(bioP4 !== undefined && { bioP4: String(bioP4).trim() }),
        ...(signoff !== undefined && { signoff: String(signoff).trim() }),
        ...(rating !== undefined && { rating: String(rating).trim() }),
        ...(reviewsCount !== undefined && { reviewsCount: String(reviewsCount).trim() }),
        ...(experienceYears !== undefined && { experienceYears: String(experienceYears).trim() }),
        ...(signatureTours !== undefined && { signatureTours: String(signatureTours).trim() }),
        ...(languages !== undefined && { languages: String(languages).trim() }),
        ...(badgeText !== undefined && { badgeText: String(badgeText).trim() }),
      },
      create: {
        id: "guide_zaky",
        name: name || "Zaky",
        fullName: fullName || "Mohamed Zaky Bentabaa",
        eyebrow: eyebrow || "Meet your guide",
        title: title || "About Me",
        bioP1: bioP1 || "",
        bioP2: bioP2 || "",
        bioP3: bioP3 || "",
        bioP4: bioP4 || "",
        signoff: signoff || "Marrakech, curated by Zaky",
        rating: rating || "5.0★",
        reviewsCount: reviewsCount || "41",
        experienceYears: experienceYears || "19",
        signatureTours: signatureTours || "7",
        languages: languages || "Arabic, French, English",
        badgeText: badgeText || "41 verified Google reviews",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Guide bio updated successfully in database.",
      bio: updated,
    });
  } catch (error: any) {
    console.error("Error updating guide bio:", error);
    return NextResponse.json(
      { error: "Failed to update guide bio", details: error.message },
      { status: 500 }
    );
  }
}
