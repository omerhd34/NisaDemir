'use client';

import Link from 'next/link';
import { Clock, Mail, MapPin } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { useAppContext } from '@/context/AppContext';
import Logo from './Logo';

export default function Footer() {
 const { data } = useAppContext();
 const currentYear = new Date().getFullYear();

 const quickLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Tanışalım', href: '/tanisalim' },
  { label: 'Çalışma Alanlarım', href: '/calisma_alanlarim' },
  { label: 'Yazılarım', href: '/yazilarim' },
  { label: 'İletişim', href: '/iletisim' },
 ];

 const socialMedia = [
  { icon: Mail, link: 'mailto:psikolognisademir@gmail.com', label: 'psikolognisademir@gmail.com' },
  { icon: FaInstagram, link: 'https://instagram.com/psikolognisademir', label: 'Instagram' },
 ];

 const workingHours = data?.footer?.workingHours || [];

 return (
  <footer className="relative bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-500/40">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 max-w-6xl mx-auto">
     <div className="md:col-span-5">
      <div className="flex items-center gap-3 mb-5">
       <Logo />
       <div>
        <h3 className="font-serif text-2xl text-heading leading-none">Nisa Demir</h3>
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted mt-1.5">Klinik Psikolog</p>
       </div>
      </div>
      <p className="text-sm leading-relaxed text-body max-w-sm">
       {data?.footer?.description ||
        'Bireysel ve online terapi hizmetleriyle yanınızdayım. Ruh sağlığınız için profesyonel destek.'}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
       {socialMedia.map((s, i) => (
        <Link
         key={i}
         href={s.link}
         target={s.link.startsWith('http') ? '_blank' : undefined}
         rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
         aria-label={s.label}
         className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-dark-500 text-gray-600 dark:text-dark-100 hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary-dark dark:hover:border-primary-dark dark:hover:text-gray-950 transition-all duration-300"
        >
         <s.icon className="w-4 h-4" />
        </Link>
       ))}
      </div>
     </div>

     <div className="md:col-span-3">
      <h4 className="font-serif text-lg text-heading mb-5">Sayfalar</h4>
      <ul className="space-y-3">
       {quickLinks.map((item, idx) => (
        <li key={idx}>
         <Link
          href={item.href}
          className="text-sm text-body hover:text-primary dark:hover:text-primary-dark-light transition-colors duration-300 inline-flex items-center gap-2"
         >
          <span className="w-3 h-px bg-gray-400 dark:bg-dark-400 transition-all duration-300 group-hover:bg-primary"></span>
          {item.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div className="md:col-span-4">
      <h4 className="font-serif text-lg text-heading mb-5">İletişim</h4>
      <ul className="space-y-3.5 text-sm text-body">
       <li className="flex items-start gap-3">
        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-dark-light" />
        <span>İstanbul & Online Terapi</span>
       </li>
       <li className="flex items-start gap-3">
        <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-dark-light" />
        <Link
         href="mailto:psikolognisademir@gmail.com"
         className="hover:text-primary dark:hover:text-primary-dark-light transition-colors break-all"
        >
         psikolognisademir@gmail.com
        </Link>
       </li>
       {workingHours.length > 0 && (
        <li className="flex items-start gap-3">
         <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-dark-light" />
         <div className="space-y-1">
          {workingHours.map((hours, idx) => (
           <p key={idx} className="leading-relaxed">
            {hours}
           </p>
          ))}
         </div>
        </li>
       )}
      </ul>
     </div>
    </div>

    <div className="mt-14 md:mt-20 pt-8 md:pt-10 border-t border-gray-200 dark:border-dark-500/40 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
     <p className="text-sm md:text-[0.95rem] text-body order-2 md:order-1">
      © {currentYear} <span className="font-serif text-heading font-medium">Nisa Demir</span>. Tüm hakları saklıdır.
     </p>
     <p className="font-serif italic text-base md:text-lg text-primary dark:text-primary-dark-light order-1 md:order-2">
      Ruhsallığınız için bir adım.
     </p>
    </div>
   </div>
  </footer>
 );
}
