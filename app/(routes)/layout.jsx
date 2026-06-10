import { AppProvider } from "@/context/AppContext";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import ScrollToTop from "@/app/components/ui/ScrollToTop";
import SiteJsonLd from "@/app/components/seo/SiteJsonLd";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata = {
 metadataBase: siteUrl ? new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`) : undefined,
 title: {
  default: "Uzman Klinik Psikolog Nisa Demir",
  template: "%s | Nisa Demir",
 },
 description:
  "Uzman Klinik Psikolog Nisa Demir — Bireysel terapi, online terapi ve psikolojik danışmanlık. Anksiyete, depresyon, stres yönetimi ve kişisel gelişim konularında profesyonel destek.",
 keywords: [
  "psikolog",
  "klinik psikolog",
  "terapi",
  "online terapi",
  "bireysel terapi",
  "psikolojik danışmanlık",
  "online psikolog",
  "Nisa Demir",
 ],
 authors: [{ name: "Nisa Demir", ...(siteUrl ? { url: siteUrl } : {}) }],
 creator: "Nisa Demir",
 robots: {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
 },
 icons: {
  icon: "/favicon.svg",
  type: "image/svg+xml",
 },
 openGraph: {
  type: "website",
  locale: "tr_TR",
  siteName: "Nisa Demir — Psikolog",
  title: "Uzman Klinik Psikolog Nisa Demir",
  description:
   "Bireysel ve online terapi, psikolojik danışmanlık. Profesyonel ve güvenli terapi desteği.",
  url: siteUrl || undefined,
 },
 twitter: {
  card: "summary_large_image",
  title: "Uzman Klinik Psikolog Nisa Demir",
  description: "Bireysel ve online terapi, psikolojik danışmanlık hizmetleri.",
 },
 category: "health",
};

export const viewport = {
 width: "device-width",
 initialScale: 1,
};

export default function SiteLayout({ children }) {
 return (
  <>
   <SiteJsonLd />
   <AppProvider>
    <div className="min-h-screen flex flex-col">
     <Header />
     <main className="flex-1">{children}</main>
     <Footer />
     <ScrollToTop />
    </div>
   </AppProvider>
  </>
 );
}
