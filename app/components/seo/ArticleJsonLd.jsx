import { getSiteUrl } from "@/lib/site";

function absoluteImageUrl(pathOrUrl) {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base = getSiteUrl();
  if (!base) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export default function ArticleJsonLd({ article }) {
  const base = getSiteUrl();
  if (!article || !base) return null;

  const url = `${base}/yazilarim/${article.slug}`;
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
    description: article.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image: [image] } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: {
      "@type": "Person",
      name: article.writer || "Nisa Demir",
    },
    publisher: {
      "@type": "Organization",
      name: "Nisa Demir",
      url: base,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
