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

// GET: Fetch all site images from PostgreSQL
export async function GET(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");
    const query = searchParams.get("q");

    const where: any = {};
    if (section && section !== "ALL") {
      where.section = section;
    }
    if (query) {
      where.OR = [
        { label: { contains: query, mode: "insensitive" } },
        { slotKey: { contains: query, mode: "insensitive" } },
        { alt: { contains: query, mode: "insensitive" } },
        { section: { contains: query, mode: "insensitive" } },
      ];
    }

    const images = await prisma.siteImage.findMany({
      where,
      orderBy: [
        { section: "asc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Fetch site images error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// POST: Add a new global image slot to PostgreSQL
export async function POST(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slotKey, label, url, alt, caption, section, sortOrder } = body;

    if (!slotKey || typeof slotKey !== "string") {
      return NextResponse.json({ error: "Slot Key is required (e.g. hero_summer_banner)" }, { status: 400 });
    }

    // Normalize slotKey to lowercase slug format
    const cleanSlotKey = slotKey
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_");

    if (!cleanSlotKey) {
      return NextResponse.json({ error: "Invalid Slot Key" }, { status: 400 });
    }

    if (!label || typeof label !== "string") {
      return NextResponse.json({ error: "Label / Title is required" }, { status: 400 });
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Image URL or photo path is required" }, { status: 400 });
    }

    // Check if slotKey already exists in database
    const existing = await prisma.siteImage.findUnique({
      where: { slotKey: cleanSlotKey },
    });

    if (existing) {
      return NextResponse.json(
        { error: `An image slot with key "${cleanSlotKey}" already exists in the database.` },
        { status: 409 }
      );
    }

    const newImage = await prisma.siteImage.create({
      data: {
        slotKey: cleanSlotKey,
        label: label.trim(),
        url: url.trim(),
        alt: alt ? String(alt).trim() : null,
        caption: caption ? String(caption).trim() : null,
        section: section && typeof section === "string" && section.trim() ? section.trim() : "General & Fallbacks",
        sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
      },
    });

    return NextResponse.json({ success: true, image: newImage }, { status: 201 });
  } catch (error) {
    console.error("Create site image error:", error);
    return NextResponse.json({ error: "Failed to create image slot in database" }, { status: 500 });
  }
}

// PUT: Edit an existing global image slot in PostgreSQL
export async function PUT(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, slotKey, label, url, alt, caption, section, sortOrder } = body;

    if (!slotKey && !id) {
      return NextResponse.json(
        { error: "slotKey or id is required to update an image" },
        { status: 400 }
      );
    }

    // Find the target record
    const target = id
      ? await prisma.siteImage.findUnique({ where: { id } })
      : await prisma.siteImage.findUnique({ where: { slotKey } });

    if (!target) {
      return NextResponse.json({ error: "Image record not found in database" }, { status: 404 });
    }

    const updateData: any = {};
    if (url !== undefined) updateData.url = String(url).trim();
    if (label !== undefined) updateData.label = String(label).trim();
    if (alt !== undefined) updateData.alt = alt ? String(alt).trim() : null;
    if (caption !== undefined) updateData.caption = caption ? String(caption).trim() : null;
    if (section !== undefined) updateData.section = String(section).trim();
    if (sortOrder !== undefined) updateData.sortOrder = Number(sortOrder) || 0;

    const updated = await prisma.siteImage.update({
      where: { id: target.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, image: updated });
  } catch (error) {
    console.error("Update site image error:", error);
    return NextResponse.json({ error: "Failed to update image in database" }, { status: 500 });
  }
}

// DELETE: Remove an image slot from PostgreSQL
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const paramSlotKey = searchParams.get("slotKey");
    const paramId = searchParams.get("id");

    let slotKeyToDelete = paramSlotKey;
    let idToDelete = paramId;

    if (!slotKeyToDelete && !idToDelete) {
      try {
        const body = await req.json();
        slotKeyToDelete = body.slotKey;
        idToDelete = body.id;
      } catch {
        // Body was empty or not JSON
      }
    }

    if (!slotKeyToDelete && !idToDelete) {
      return NextResponse.json({ error: "slotKey or id is required to delete" }, { status: 400 });
    }

    const target = idToDelete
      ? await prisma.siteImage.findUnique({ where: { id: idToDelete } })
      : await prisma.siteImage.findUnique({ where: { slotKey: slotKeyToDelete! } });

    if (!target) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    await prisma.siteImage.delete({
      where: { id: target.id },
    });

    return NextResponse.json({
      success: true,
      message: `Image slot "${target.slotKey}" deleted from database.`,
      deletedSlotKey: target.slotKey,
    });
  } catch (error) {
    console.error("Delete site image error:", error);
    return NextResponse.json({ error: "Failed to delete image from database" }, { status: 500 });
  }
}
