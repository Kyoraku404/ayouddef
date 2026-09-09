import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getZakySession } from "@/lib/auth";
import { getOcnSession } from "@/lib/ocn-auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const zakySession = await getZakySession();
    const ocnSession = await getOcnSession();
    if (!zakySession && !ocnSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slotKey = formData.get("slotKey") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique path
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    // If slotKey provided, update database immediately
    let updatedImage = null;
    if (slotKey) {
      const exists = await prisma.siteImage.findUnique({ where: { slotKey } });
      if (exists) {
        updatedImage = await prisma.siteImage.update({
          where: { slotKey },
          data: { url: publicUrl },
        });
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      image: updatedImage,
    });
  } catch (error) {
    console.error("Upload image error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
