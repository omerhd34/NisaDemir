import {
 DEFAULT_DESCRIPTION,
 DEFAULT_TITLE,
 OG_IMAGE_PATH,
} from "@/lib/seo";

export default function manifest() {
 return {
  name: DEFAULT_TITLE,
  short_name: "Nisa Demir",
  description: DEFAULT_DESCRIPTION,
  start_url: "/",
  display: "standalone",
  background_color: "#f9fafb",
  theme_color: "#0f172a",
  lang: "tr",
  icons: [
   {
    src: "/favicon.svg",
    type: "image/svg+xml",
    sizes: "any",
   },
   {
    src: OG_IMAGE_PATH,
    type: "image/jpeg",
    sizes: "512x512",
   },
  ],
 };
}
