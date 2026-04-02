/**
 * Kanonik site URL’si. Üretimde ortam değişkeni zorunlu; yoksa metadata ve sitemap göreli kalır.
 * Vercel: Project Settings → Environment Variables → NEXT_PUBLIC_SITE_URL=https://alanadiniz.com
 */
export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "";

  if (raw) return raw;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "";
}
