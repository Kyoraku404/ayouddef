import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getZakySession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getZakySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const images = await prisma.siteImage.findMany({
      orderBy: [
        { section: "asc" },
        { sortOrder: "asc" },
      ],
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Fetch site images error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getZakySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slotKey, url, alt, caption } = body;

    if (!slotKey || !url) {
      return NextResponse.json(
        { error: "slotKey and url are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.siteImage.update({
      where: { slotKey },
      data: {
        url,
        ...(alt !== undefined ? { alt } : {}),
        ...(caption !== undefined ? { caption } : {}),
      },
    });

    return NextResponse.json({ success: true, image: updated });
  } catch (error) {
    console.error("Update site image error:", error);
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}
