import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata = {
 metadataBase: siteUrl ? new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`) : undefined,
 title: {
  default: "Admin Panel | Nisa Demir",
  template: "%s | Nisa Demir",
 },
 robots: { index: false, follow: false },
 icons: {
  icon: "/favicon.svg",
  type: "image/svg+xml",
 },
};

export default function AdminRootLayout({ children }) {
 return children;
}
