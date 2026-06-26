import { getSiteUrl } from "@/lib/site";

export default function robots() {
 const base = getSiteUrl() || "http://localhost:3000";
 const host = base.replace(/\/$/, "");

 return {
  rules: [
   {
    userAgent: "*",
    allow: "/",
    disallow: ["/admin", "/api/admin"],
   },
  ],
  sitemap: `${host}/sitemap.xml`,
  host,
 };
}
