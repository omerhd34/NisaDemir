import { articleImageAlt } from "@/lib/imageAlt";
import { htmlToPlainText } from "@/lib/articleContent";
import { absoluteImageUrl, absoluteUrl } from "@/lib/seo";

export default function ArticleJsonLd({ article }) {
 const base = absoluteUrl("/");
 if (!article || !base) return null;

 const url = absoluteUrl(`/yazilarim/${article.slug}`);
 const image = absoluteImageUrl(article.image);
 const published = article.createdAt
  ? new Date(article.createdAt).toISOString()
  : undefined;
 const modified = article.updatedAt
  ? new Date(article.updatedAt).toISOString()
  : published;

 const json = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: htmlToPlainText(article.excerpt),
  url,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  inLanguage: "tr-TR",
  ...(image
   ? { image: [{ "@type": "ImageObject", url: image, caption: articleImageAlt(article.title) }] }
   : {}),
  ...(published ? { datePublished: published } : {}),
  ...(modified ? { dateModified: modified } : {}),
  author: {
   "@type": "Person",
   name: article.writer || "Nisa Demir",
   url: base,
  },
  publisher: {
   "@type": "Organization",
   name: "Nisa Demir",
   url: base,
   logo: {
    "@type": "ImageObject",
    url: absoluteImageUrl("/nisa.jpeg"),
   },
  },
 };

 return (
  <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
  />
 );
}
