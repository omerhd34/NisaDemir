import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { adminHandler } from "@/lib/adminApi";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
 ["image/jpeg", "jpg"],
 ["image/png", "png"],
 ["image/webp", "webp"],
 ["image/gif", "gif"],
]);

export async function POST(request) {
 return adminHandler(async () => {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
   return NextResponse.json({ error: "Dosya gerekli" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
   return NextResponse.json({ error: "Yalnızca JPG, PNG, WebP veya GIF yüklenebilir" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
   return NextResponse.json({ error: "Dosya en fazla 5 MB olabilir" }, { status: 400 });
  }

  const ext = ALLOWED_TYPES.get(file.type);
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${filename}` });
 });
}
