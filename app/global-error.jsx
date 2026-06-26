'use client';

import { useEffect } from 'react';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
 subsets: ['latin', 'latin-ext'],
 variable: '--font-sans',
 display: 'swap',
});

const cormorant = Cormorant_Garamond({
 subsets: ['latin', 'latin-ext'],
 weight: ['400', '500', '600', '700'],
 style: ['normal', 'italic'],
 variable: '--font-serif',
 display: 'swap',
});

export default function GlobalError({ error, reset }) {
 useEffect(() => {
  console.error(error);
 }, [error]);

 return (
  <html lang="tr">
   <body
    className={`${inter.variable} ${cormorant.variable} font-sans bg-gray-50 dark:bg-dark-900 text-gray-950 dark:text-gray-50 antialiased min-h-screen flex items-center justify-center px-5`}
   >
    <div className="max-w-md w-full text-center animate-fadeIn">
     <p className="display-serif text-6xl text-primary dark:text-primary-dark mb-4">500</p>
     <h1 className="display-serif text-2xl sm:text-3xl text-heading mb-3">
      Kritik bir hata oluştu
     </h1>
     <p className="text-body mb-8 leading-relaxed">
      Uygulama beklenmedik bir sorunla karşılaştı. Sayfayı yenilemeyi deneyebilirsiniz.
     </p>
     <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <button type="button" onClick={reset} className="btn-primary">
       Tekrar Dene
      </button>
      <a href="/" className="btn-outline">
       Ana Sayfaya Dön
      </a>
     </div>
    </div>
   </body>
  </html>
 );
}
