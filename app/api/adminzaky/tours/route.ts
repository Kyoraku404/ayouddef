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

const VALID_ICONS = ["gate", "basket", "palace", "tea", "monument", "compass", "road"];
const VALID_THEMES = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"];

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
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
      cardDescription,
      fullDescription,
      icon,
      cls,
      cardImage,
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

    if (icon !== undefined && icon !== null && icon !== "" && !VALID_ICONS.includes(String(icon))) {
      return NextResponse.json(
        { error: `Invalid icon. Must be one of: ${VALID_ICONS.join(", ")}` },
        { status: 400 }
      );
    }
    if (cls !== undefined && cls !== null && cls !== "" && !VALID_THEMES.includes(String(cls))) {
      return NextResponse.json(
        { error: `Invalid theme. Must be one of: ${VALID_THEMES.join(", ")}` },
        { status: 400 }
      );
    }

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
        // Card + Full descriptions are stored in SEPARATE columns and saved
        // independently — updating one never touches the other.
        ...(cardDescription !== undefined && {
          cardDescription: cardDescription ? String(cardDescription).trim() : null,
        }),
        ...(fullDescription !== undefined && {
          fullDescription: fullDescription ? String(fullDescription).trim() : null,
        }),
        // Legacy `description` alias: only honored when the new fields are
        // absent, and routed to the full description (its historic meaning).
        ...(description !== undefined &&
          cardDescription === undefined &&
          fullDescription === undefined && {
            fullDescription: description ? String(description).trim() : null,
          }),
        ...(icon !== undefined && {
          icon: icon ? String(icon).trim() : null,
        }),
        ...(cls !== undefined && {
          cls: cls ? String(cls).trim() : null,
        }),
        ...(cardImage !== undefined && {
          cardImage: cardImage ? String(cardImage).trim() : null,
        }),
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

// POST: Create a new tour package with independent card + full descriptions
export async function POST(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      subtitle,
      price,
      priceNote,
      duration,
      groupType,
      languages,
      badge,
      cardDescription,
      fullDescription,
      description,
      icon,
      cls,
      cardImage,
      highlights,
      included,
      notIncluded,
      itinerary,
      mapCenter,
      active,
      sortOrder,
    } = body;

    if (!title || !String(title).trim()) {
      return NextResponse.json({ error: "Tour title is required" }, { status: 400 });
    }
    if (!price || !String(price).trim()) {
      return NextResponse.json({ error: "Price is required (e.g. 700 MAD)" }, { status: 400 });
    }

    let finalSlug = slug && String(slug).trim()
      ? slugifyTitle(String(slug))
      : slugifyTitle(String(title));
    if (!finalSlug) {
      return NextResponse.json({ error: "Could not generate a URL slug from the title" }, { status: 400 });
    }

    // Ensure slug uniqueness
    const conflict = await prisma.tourPackage.findUnique({ where: { slug: finalSlug } });
    if (conflict) {
      finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
    }

    if (icon !== undefined && icon !== null && icon !== "" && !VALID_ICONS.includes(String(icon))) {
      return NextResponse.json(
        { error: `Invalid icon. Must be one of: ${VALID_ICONS.join(", ")}` },
        { status: 400 }
      );
    }
    if (cls !== undefined && cls !== null && cls !== "" && !VALID_THEMES.includes(String(cls))) {
      return NextResponse.json(
        { error: `Invalid theme. Must be one of: ${VALID_THEMES.join(", ")}` },
        { status: 400 }
      );
    }

    const maxSort = await prisma.tourPackage.aggregate({ _max: { sortOrder: true } });

    const created = await prisma.tourPackage.create({
      data: {
        slug: finalSlug,
        title: String(title).trim(),
        subtitle: subtitle ? String(subtitle).trim() : null,
        price: String(price).trim(),
        priceNote: priceNote ? String(priceNote).trim() : null,
        duration: duration ? String(duration).trim() : null,
        groupType: groupType ? String(groupType).trim() : null,
        languages: languages ? String(languages).trim() : null,
        badge: badge ? String(badge).trim() : null,
        // Independent content fields — card shown on Tours page, full on detail page.
        cardDescription: cardDescription
          ? String(cardDescription).trim()
          : description
            ? String(description).split(/\n\n+/)[0].trim()
            : null,
        fullDescription: fullDescription
          ? String(fullDescription).trim()
          : description
            ? String(description).trim()
            : null,
        description: description
          ? String(description).trim()
          : fullDescription
            ? String(fullDescription).trim()
            : null,
        icon: icon ? String(icon).trim() : "compass",
        cls: cls ? String(cls).trim() : "t1",
        cardImage: cardImage ? String(cardImage).trim() : null,
        highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights ?? []),
        included: typeof included === "string" ? included : JSON.stringify(included ?? []),
        notIncluded:
          typeof notIncluded === "string" ? notIncluded : JSON.stringify(notIncluded ?? []),
        itinerary: typeof itinerary === "string" ? itinerary : JSON.stringify(itinerary ?? []),
        mapCenter:
          typeof mapCenter === "string"
            ? mapCenter
            : JSON.stringify(mapCenter ?? { lat: 31.6295, lng: -7.988, zoom: 15 }),
        active: active === undefined ? true : Boolean(active),
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : (maxSort._max.sortOrder ?? -1) + 1,
      },
    });

    return NextResponse.json(
      { success: true, message: `Tour "${created.title}" created.`, tour: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating tour package:", error);
    return NextResponse.json(
      { error: "Failed to create tour package", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a tour package (?id= or ?slug=)
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ error: "id or slug is required" }, { status: 400 });
    }

    const target = id
      ? await prisma.tourPackage.findUnique({ where: { id } })
      : await prisma.tourPackage.findUnique({ where: { slug: slug! } });

    if (!target) {
      return NextResponse.json({ error: "Tour package not found" }, { status: 404 });
    }

    await prisma.tourPackage.delete({ where: { id: target.id } });

    return NextResponse.json({
      success: true,
      message: `Tour "${target.title}" deleted.`,
    });
  } catch (error: any) {
    console.error("Error deleting tour package:", error);
    return NextResponse.json(
      { error: "Failed to delete tour package", details: error.message },
      { status: 500 }
    );
  }
}
