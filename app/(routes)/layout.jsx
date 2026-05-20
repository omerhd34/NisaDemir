import { Inter, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import ScrollToTop from "@/app/components/ui/ScrollToTop";
import LoadingErrorHandler from "@/app/components/ui/LoadingErrorHandler";
import SiteJsonLd from "@/app/components/seo/SiteJsonLd";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

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
    description:
      "Bireysel ve online terapi, psikolojik danışmanlık hizmetleri.",
  },
  category: "health",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.classList.toggle('dark', theme === 'dark');
      })();
    `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-gray-50 dark:bg-dark-900 text-gray-950 dark:text-gray-50 transition-colors duration-300 antialiased`}
      >
        <SiteJsonLd />
        <AppProvider>
          <LoadingErrorHandler>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </div>
          </LoadingErrorHandler>
        </AppProvider>
      </body>
    </html>
  );
}
