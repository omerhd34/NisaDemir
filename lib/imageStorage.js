import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto, { randomUUID } from "crypto";

function trimEnv(value) {
 if (!value) return value;
 const trimmed = value.trim();
 if (
  (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
  (trimmed.startsWith("'") && trimmed.endsWith("'"))
 ) {
  return trimmed.slice(1, -1);
 }
 return trimmed;
}

function getCloudinaryConfig() {
 const cloudName = trimEnv(process.env.CLOUDINARY_CLOUD_NAME);
 const apiKey = trimEnv(process.env.CLOUDINARY_API_KEY);
 const apiSecret = trimEnv(process.env.CLOUDINARY_API_SECRET);

 if (!cloudName || !apiKey || !apiSecret) {
  return null;
 }

 return { cloudName, apiKey, apiSecret };
}

function signCloudinaryParams(params, apiSecret) {
 const stringToSign = Object.keys(params)
  .sort()
  .map((key) => `${key}=${params[key]}`)
  .join("&");

 return crypto.createHash("sha1").update(`${stringToSign}${apiSecret}`).digest("hex");
}

async function uploadToCloudinary(bytes, mimeType, ext) {
 const config = getCloudinaryConfig();
 if (!config) {
  throw new Error("CLOUDINARY_NOT_CONFIGURED");
 }

 const timestamp = Math.round(Date.now() / 1000);
 const folder = trimEnv(process.env.CLOUDINARY_FOLDER) || "nisademir";
 const params = { folder, timestamp };
 const signature = signCloudinaryParams(params, config.apiSecret);

 const form = new FormData();
 form.append("file", new Blob([bytes], { type: mimeType }), `upload.${ext}`);
 form.append("api_key", config.apiKey);
 form.append("timestamp", String(timestamp));
 form.append("signature", signature);
 form.append("folder", folder);

 const res = await fetch(
  `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
  { method: "POST", body: form }
 );

 const data = await res.json();
 if (!res.ok) {
  throw new Error(data.error?.message || "Cloudinary yüklemesi başarısız");
 }

 return data.secure_url;
}

async function uploadToLocal(bytes, ext) {
 const filename = `${randomUUID()}.${ext}`;
 const uploadDir = path.join(process.cwd(), "public", "uploads");
 await mkdir(uploadDir, { recursive: true });
 await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));
 return `/uploads/${filename}`;
}

export async function storeUploadedImage(file, ext) {
 const bytes = await file.arrayBuffer();
 const mimeType = file.type;

 if (getCloudinaryConfig()) {
  return uploadToCloudinary(bytes, mimeType, ext);
 }

 if (process.env.NODE_ENV === "production") {
  throw new Error("PRODUCTION_STORAGE_NOT_CONFIGURED");
 }

 return uploadToLocal(bytes, ext);
}

export function getUploadConfigurationError(error) {
 if (error.message === "CLOUDINARY_NOT_CONFIGURED" || error.message === "PRODUCTION_STORAGE_NOT_CONFIGURED") {
  return "Production ortamında görsel yüklemek için Cloudinary ayarlanmalı. CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ve CLOUDINARY_API_SECRET değişkenlerini ekleyin.";
 }

 if (error.code === "EROFS" || error.code === "EACCES" || error.code === "EPERM") {
  return "Sunucu dosya sistemine yazamıyor. Görsel yüklemek için Cloudinary kullanın.";
 }

 return null;
}
