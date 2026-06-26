import { AppProvider } from "@/context/AppContext";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import ScrollToTop from "@/app/components/ui/ScrollToTop";
import SiteJsonLd from "@/app/components/seo/SiteJsonLd";
import { getSiteUrl } from "@/lib/site";
import {
 DEFAULT_DESCRIPTION,
 DEFAULT_KEYWORDS,
 DEFAULT_TITLE,
 LOCALE,
 OG_IMAGE_PATH,
 SITE_NAME,
 absoluteUrl,
 openGraphImages,
} from "@/lib/seo";

const siteUrl = getSiteUrl();
const defaultOgImage = openGraphImages(absoluteUrl(OG_IMAGE_PATH));

export const metadata = {
 metadataBase: siteUrl ? new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`) : undefined,
 title: {
  default: DEFAULT_TITLE,
  template: "%s | Nisa Demir",
 },
 description: DEFAULT_DESCRIPTION,
 keywords: DEFAULT_KEYWORDS,
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
  locale: LOCALE,
  siteName: SITE_NAME,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  url: siteUrl || undefined,
  ...(defaultOgImage ? { images: defaultOgImage } : {}),
 },
 twitter: {
  card: "summary_large_image",
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  ...(defaultOgImage ? { images: [defaultOgImage[0].url] } : {}),
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
