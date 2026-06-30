import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
 subsets: ["latin", "latin-ext"],
 weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    {children}
   </body>
  </html>
 );
}
