import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { getUploadConfigurationError, storeUploadedImage } from "@/lib/imageStorage";

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

  try {
   const url = await storeUploadedImage(file, ext);
   return NextResponse.json({ url });
  } catch (error) {
   console.error("Image upload failed:", error);
   const message = getUploadConfigurationError(error) || "Görsel yüklenemedi";
   return NextResponse.json({ error: message }, { status: 500 });
  }
 });
}
