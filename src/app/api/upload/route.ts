import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const customName = formData.get("customName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const originalName = file.name.replace(/\s+/g, "-");
    const filename = customName
      ? `${customName.replace(/\s+/g, "-")}${path.extname(originalName)}`
      : originalName;

    // 1. Cloud Upload via Vercel Blob (Primary for production & local with token)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`assets/${filename}`, file, {
        access: "public",
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        filename,
        size: file.size,
      });
    }

    // 2. Local Fallback (when working purely offline without cloud token)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "assets");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/assets/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: buffer.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}
