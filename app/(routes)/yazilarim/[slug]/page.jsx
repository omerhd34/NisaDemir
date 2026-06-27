import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/siteData";
import { articleImageAlt } from "@/lib/imageAlt";
import {
 absoluteImageUrl,
 absoluteUrl,
 openGraphImages,
} from "@/lib/seo";
import ArticleDetailClient from "./ArticleDetailClient";

export async function generateStaticParams() {
 const slugs = await getArticleSlugs();
 return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
 const { slug } = await params;
 const article = await getArticleBySlug(slug);
 if (!article) {
  return { title: "Yazı bulunamadı" };
 }

 const path = `/yazilarim/${article.slug}`;
 const canonical = absoluteUrl(path);
 const ogImage = absoluteImageUrl(article.image);
 const ogImages = openGraphImages(ogImage, articleImageAlt(article.title));

 return {
  title: article.title,
  description: article.excerpt,
  authors: [{ name: article.writer || "Nisa Demir" }],
  keywords: [
   article.title,
   "psikolog",
   "Kadıköy psikoterapi",
   "Kadıköy psikolog",
   "blog",
   "ruh sağlığı",
   "terapi",
   "Nisa Demir",
  ],
  alternates: canonical ? { canonical } : undefined,
  openGraph: {
   type: "article",
   title: article.title,
   description: article.excerpt,
   url: canonical,
   locale: "tr_TR",
   publishedTime: article.createdAt
    ? new Date(article.createdAt).toISOString()
    : undefined,
   modifiedTime: article.updatedAt
    ? new Date(article.updatedAt).toISOString()
    : undefined,
   ...(ogImages ? { images: ogImages } : {}),
  },
  twitter: {
   card: "summary_large_image",
   title: article.title,
   description: article.excerpt,
   ...(ogImage ? { images: [ogImage] } : {}),
  },
  robots: {
   index: false,
   follow: true,
   googleBot: { index: false, follow: true },
  },
 };
}

export default async function ArticlePage({ params }) {
 const { slug } = await params;
 const article = await getArticleBySlug(slug);
 if (!article) {
  notFound();
 }

 return (
  <>
   <ArticleDetailClient article={article} />
  </>
 );
}
