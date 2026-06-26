import { getSiteUrl } from "./site";

export const SITE_NAME = "Nisa Demir — Psikolog";
export const DEFAULT_TITLE = "Uzman Klinik Psikolog Nisa Demir";
export const DEFAULT_DESCRIPTION =
 "Uzman Klinik Psikolog Nisa Demir — Kadıköy ve online bireysel terapi, psikolojik danışmanlık. Anksiyete, depresyon, stres yönetimi ve kişisel gelişim konularında profesyonel destek.";
export const OG_IMAGE_PATH = "/nisa.jpeg";
export const LOCALE = "tr_TR";

export const DEFAULT_KEYWORDS = [
 "psikolog",
 "klinik psikolog",
 "Kadıköy psikolog",
 "Kadıköy psikoterapi",
 "İstanbul psikolog",
 "terapi",
 "online terapi",
 "bireysel terapi",
 "psikolojik danışmanlık",
 "psikanalitik psikoterapi",
 "online psikolog",
 "Nisa Demir",
];

export function absoluteUrl(path = "") {
 const base = getSiteUrl();
 if (!base) return undefined;
 const normalizedBase = base.replace(/\/$/, "");
 if (!path || path === "/") return normalizedBase;
 const normalizedPath = path.startsWith("/") ? path : `/${path}`;
 return `${normalizedBase}${normalizedPath}`;
}

export function absoluteImageUrl(pathOrUrl) {
 if (!pathOrUrl || pathOrUrl === "/") return absoluteUrl(OG_IMAGE_PATH);
 if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
  return pathOrUrl;
 }
 return absoluteUrl(pathOrUrl);
}

export function stripHtml(text) {
 return text?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ?? "";
}

export function openGraphImages(url, alt = DEFAULT_TITLE) {
 if (!url) return undefined;
 return [{ url, width: 1200, height: 630, alt }];
}
