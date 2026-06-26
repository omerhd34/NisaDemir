import { absoluteUrl, stripHtml } from "@/lib/seo";

export default function FaqJsonLd({ items }) {
 if (!items?.length) return null;

 const pageUrl = absoluteUrl("/sss");
 const json = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...(pageUrl ? { url: pageUrl, mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl } } : {}),
  mainEntity: items.map((item) => ({
   "@type": "Question",
   name: item.question,
   acceptedAnswer: {
    "@type": "Answer",
    text: stripHtml(item.answer),
   },
  })),
 };

 return (
  <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
  />
 );
}
