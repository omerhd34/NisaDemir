import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/siteData";
import { getSiteUrl } from "@/lib/site";
import ArticleJsonLd from "@/app/components/seo/ArticleJsonLd";
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

 const siteUrl = getSiteUrl();
 const path = `/yazilarim/${article.slug}`;
 const canonical = siteUrl ? `${siteUrl}${path}` : undefined;
 let ogImage;
 if (article.image) {
  if (article.image.startsWith("http://") || article.image.startsWith("https://")) {
   ogImage = article.image;
  } else if (siteUrl) {
   const p = article.image.startsWith("/") ? article.image : `/${article.image}`;
   ogImage = `${siteUrl}${p}`;
  }
 }

 return {
  title: article.title,
  description: article.excerpt,
  keywords: [
   article.title,
   "psikolog",
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
   ...(ogImage ? { images: [{ url: ogImage, alt: article.title }] } : {}),
  },
  twitter: {
   card: "summary_large_image",
   title: article.title,
   description: article.excerpt,
   ...(ogImage ? { images: [ogImage] } : {}),
  },
  robots: { index: true, follow: true },
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
   <ArticleJsonLd article={article} />
   <ArticleDetailClient article={article} />
  </>
 );
}
