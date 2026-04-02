import { getSiteUrl } from "@/lib/site";

export default function SiteJsonLd() {
  const base = getSiteUrl();
  if (!base) return null;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Uzman Klinik Psikolog Nisa Demir",
    url: base,
    inLanguage: "tr-TR",
    description:
      "Bireysel terapi, online terapi ve psikolojik danışmanlık hizmetleri.",
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nisa Demir",
    jobTitle: "Uzman Klinik Psikolog",
    url: base,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
    </>
  );
}
