import { getArticles } from "@/lib/siteData";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
 { path: "", priority: 1, changeFrequency: "weekly" },
 { path: "/tanisalim", priority: 0.9, changeFrequency: "monthly" },
 { path: "/calisma_alanlarim", priority: 0.9, changeFrequency: "monthly" },
 { path: "/yazilarim", priority: 0.85, changeFrequency: "weekly" },
 { path: "/iletisim", priority: 0.8, changeFrequency: "monthly" },
 { path: "/sss", priority: 0.75, changeFrequency: "monthly" },
 { path: "/kvkk", priority: 0.3, changeFrequency: "yearly" },
 { path: "/cerez-politikasi", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
 const baseUrl = absoluteUrl("/") || "http://localhost:3000";
 const articles = await getArticles();

 return [
  ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
   url: path ? `${baseUrl}${path}` : `${baseUrl}/`,
   lastModified: new Date(),
   changeFrequency,
   priority,
  })),
  ...articles.map((article) => ({
   url: `${baseUrl}/yazilarim/${article.slug}`,
   lastModified: article.updatedAt || article.createdAt || new Date(),
   changeFrequency: "monthly",
   priority: 0.7,
  })),
 ];
}
