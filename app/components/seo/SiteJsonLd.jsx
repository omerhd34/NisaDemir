import { getSocial } from "@/lib/siteData";
import {
 absoluteImageUrl,
 absoluteUrl,
 DEFAULT_DESCRIPTION,
 DEFAULT_TITLE,
} from "@/lib/seo";

export default async function SiteJsonLd() {
 const base = absoluteUrl("/");
 if (!base) return null;

 const social = await getSocial();
 const image = absoluteImageUrl("/nisa.jpeg");
 const sameAs = [social.instagram.url].filter(Boolean);

 const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${base}/#website`,
  name: DEFAULT_TITLE,
  url: base,
  inLanguage: "tr-TR",
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${base}/#organization` },
 };

 const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${base}/#organization`,
  name: DEFAULT_TITLE,
  url: base,
  image,
  description: DEFAULT_DESCRIPTION,
  telephone: social.phone.tel,
  email: social.email,
  address: {
   "@type": "PostalAddress",
   addressLocality: "Kadıköy",
   addressRegion: "İstanbul",
   addressCountry: "TR",
  },
  areaServed: [
   { "@type": "City", name: "Kadıköy" },
   { "@type": "City", name: "İstanbul" },
  ],
  ...(sameAs.length ? { sameAs } : {}),
  priceRange: "$$",
  knowsAbout: [
   "Bireysel terapi",
   "Online terapi",
   "Psikanalitik psikoterapi",
   "Psikolojik danışmanlık",
  ],
 };

 const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${base}/#person`,
  name: "Nisa Demir",
  jobTitle: "Uzman Klinik Psikolog",
  url: base,
  image,
  worksFor: { "@id": `${base}/#organization` },
  ...(sameAs.length ? { sameAs } : {}),
 };

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
   />
  </>
 );
}
