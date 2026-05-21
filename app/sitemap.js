import { getArticleSlugs } from "@/lib/siteData";
import { getSiteUrl } from "@/lib/site";

const staticPaths = [
 "",
 "/tanisalim",
 "/yazilarim",
 "/calisma_alanlarim",
 "/iletisim",
];

export default function sitemap() {
 const baseUrl = (getSiteUrl() || "http://localhost:3000").replace(/\/$/, "");
 const articleSlugs = getArticleSlugs();

 return [
  ...staticPaths.map((path) => ({
   url: path ? `${baseUrl}${path}` : `${baseUrl}/`,
   lastModified: new Date(),
   changeFrequency: path === "" ? "weekly" : "monthly",
   priority: path === "" ? 1 : 0.8,
  })),
  ...articleSlugs.map((slug) => ({
   url: `${baseUrl}/yazilarim/${slug}`,
   lastModified: new Date(),
   changeFrequency: "monthly",
   priority: 0.7,
  })),
 ];
}
