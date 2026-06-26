function normalizeUrl(raw) {
 if (!raw) return "";
 const trimmed = raw.trim().replace(/\/$/, "");
 if (!trimmed) return "";
 return trimmed.startsWith("http://") || trimmed.startsWith("https://")
  ? trimmed
  : `https://${trimmed}`;
}

function isVercelPreviewHost(host) {
 return /\.vercel\.app$/i.test(host);
}

export function getSiteUrl() {
 const explicit = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
 if (explicit) return explicit;

 const productionUrl = normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
 if (productionUrl && process.env.VERCEL_ENV === "production") {
  return productionUrl;
 }

 const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
 if (vercelUrl) {
  const candidate = normalizeUrl(vercelUrl);
  try {
   const host = new URL(candidate).hostname;
   if (isVercelPreviewHost(host)) return "";
   return candidate;
  } catch {
   // ignore malformed VERCEL_URL
  }
 }

 if (process.env.NODE_ENV === "development") {
  return "http://localhost:3000";
 }

 return "";
}
