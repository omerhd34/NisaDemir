import { prisma } from "@/lib/prisma";
import ArticlesList from "@/app/admin/components/ArticlesList";

export default async function AdminArticlesPage() {
 const articles = await prisma.article.findMany({
  orderBy: { sortOrder: "asc" },
  select: { id: true, title: true },
 });

 return <ArticlesList initialArticles={articles} />;
}
