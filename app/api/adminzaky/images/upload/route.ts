import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getMediaStorage } from "@/lib/supabase-storage";
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
    const file = formData.get("file");
    const slotValue = formData.get("slotKey");
    const slotKey = typeof slotValue === "string" ? slotValue : null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const extensions: Record<string, string> = {
      "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
      "image/gif": "gif", "image/avif": "avif", "image/x-icon": "ico",
      "image/vnd.microsoft.icon": "ico",
    };
    const extension = extensions[file.type];
    if (!extension) return NextResponse.json({ error: "Choose a JPEG, PNG, WebP, GIF, AVIF or ICO image" }, { status: 400 });
    if (!file.size || file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Images must be between 1 byte and 5 MB" }, { status: 400 });
    }
    const storage = getMediaStorage();
    const filename = `${randomUUID()}.${extension}`;
    const { error: uploadError } = await storage.upload(filename, file, { contentType: file.type });
    if (uploadError) throw uploadError;
    const publicUrl = storage.getPublicUrl(filename).data.publicUrl;

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
