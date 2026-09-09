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

// GET: Fetch all tour packages with prices from PostgreSQL
export async function GET() {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tours = await prisma.tourPackage.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, tours });
  } catch (error: any) {
    console.error("Error fetching tour packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour packages", details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update tour package details and prices in PostgreSQL
export async function PUT(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      id,
      slug,
      price,
      priceNote,
      title,
      subtitle,
      duration,
      groupType,
      languages,
      badge,
      description,
      highlights,
      included,
      notIncluded,
      itinerary,
      mapCenter,
      active,
      sortOrder,
    } = body;

    if (!id && !slug) {
      return NextResponse.json(
        { error: "Package ID or slug is required" },
        { status: 400 }
      );
    }

    const where = id ? { id } : { slug };

    const updated = await prisma.tourPackage.update({
      where,
      data: {
        ...(price !== undefined && { price: String(price).trim() }),
        ...(priceNote !== undefined && { priceNote: String(priceNote).trim() }),
        ...(title !== undefined && { title: String(title).trim() }),
        ...(subtitle !== undefined && { subtitle: String(subtitle).trim() }),
        ...(duration !== undefined && { duration: String(duration).trim() }),
        ...(groupType !== undefined && { groupType: String(groupType).trim() }),
        ...(languages !== undefined && { languages: String(languages).trim() }),
        ...(badge !== undefined && { badge: badge ? String(badge).trim() : null }),
        ...(description !== undefined && { description: String(description).trim() }),
        ...(highlights !== undefined && {
          highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights),
        }),
        ...(included !== undefined && {
          included: typeof included === "string" ? included : JSON.stringify(included),
        }),
        ...(notIncluded !== undefined && {
          notIncluded: typeof notIncluded === "string" ? notIncluded : JSON.stringify(notIncluded),
        }),
        ...(itinerary !== undefined && {
          itinerary: typeof itinerary === "string" ? itinerary : JSON.stringify(itinerary),
        }),
        ...(mapCenter !== undefined && {
          mapCenter: typeof mapCenter === "string" ? mapCenter : JSON.stringify(mapCenter),
        }),
        ...(active !== undefined && { active: Boolean(active) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Tour package "${updated.title}" updated successfully.`,
      tour: updated,
    });
  } catch (error: any) {
    console.error("Error updating tour package:", error);
    return NextResponse.json(
      { error: "Failed to update tour package", details: error.message },
      { status: 500 }
    );
  }
}
