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
  { icon: Mail, link: 'mailto:psikolognisademir@gmail.com', label: 'E-posta' },
  { icon: FaInstagram, link: 'https://instagram.com/psikolognisademir', label: 'Instagram' },
 ];

 const workingHours = data?.footer?.workingHours || [];

 return (
  <footer className="relative overflow-hidden border-t border-gray-300 dark:border-dark-500 pt-16 pb-8 md:pt-20 md:pb-10 bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 transition-colors duration-500">
   <div className="absolute inset-0 opacity-5 dark:opacity-10">
    <div className="absolute top-0 left-0 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800 dark:bg-gray-200 blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 rounded-full bg-gray-800 dark:bg-gray-200 blur-3xl"></div>
   </div>

   <div className="container relative z-10 mx-auto px-6">
    <div className="mx-auto mb-12 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
     <div className="flex flex-col items-center space-y-4 md:items-start">
      <div className="flex items-center gap-4">
       <Logo />
       <div>
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-heading">Nisa DEMİR</h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uzman Klinik Psikolog</p>
       </div>
      </div>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">{data?.footer?.description}</p>
     </div>

     <div>
      <h4 className="relative mb-6 inline-block text-lg font-bold tracking-wide text-heading">
       Hızlı Erişim</h4>
      <ul className="space-y-2.5">
       {quickLinks.map((item, idx) => (
        <li key={idx} className="flex justify-center md:justify-start">
         <Link
          href={item.href}
          className="group relative inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-white hover:shadow-sm transition-all duration-300 "
         >
          <span className="w-2 h-2 rounded-full bg-linear-to-br from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 group-hover:from-white group-hover:to-white group-hover:dark:from-white group-hover:dark:to-white group-hover:scale-125 transition-transform duration-300" aria-hidden />
          <span className="relative font-medium">{item.label}</span>
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h4 className="relative mb-6 inline-block text-lg font-bold tracking-wide text-heading">
       İletişim ve Çalışma Saatleri
      </h4>
      <div className="space-y-4">
       <div className="group flex items-center justify-center gap-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-white/5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-white transition-all duration-300 md:justify-start">
        <MapPin className="w-5 h-5 shrink-0 group-hover:scale-110" />
        <span className="font-medium">İstanbul & Online Terapi</span>
       </div>

       {socialMedia.map((s, i) => (
        <Link
         key={i}
         href={s.link}
         target={s.link.startsWith('http') ? '_blank' : undefined}
         rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
         aria-label={s.label}
         className="group flex items-center justify-center gap-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-white/5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-white transition-all duration-300 md:justify-start"
        >
         <s.icon className="w-5 h-5 shrink-0 transform group-hover:scale-110 transition-all duration-300" />
         <p className="font-medium">{s.label === 'E-posta' ? 'psikolognisademir@gmail.com' : s.label}</p>
        </Link>
       ))}

       {workingHours.length > 0 && (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-white/5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 backdrop-blur-sm hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-white transition-all duration-300 md:justify-start">
         <Clock className="w-5 h-5 shrink-0 group-hover:scale-110" />
         <div className="flex flex-col space-y-1.5">
          {workingHours.map((hours, idx) => (
           <p key={idx} className="font-medium">{hours}</p>
          ))}
         </div>
        </div>
       )}
      </div>
     </div>
    </div>

    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-300/60 dark:border-dark-500/60 pt-8 md:flex-row">
     <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      © {currentYear}
      <span className="font-semibold text-heading transition-colors">Nisa DEMİR</span>

     </p>
     <p className="text-sm text-gray-600 dark:text-gray-400">Tüm hakları saklıdır.</p>
    </div>
   </div>
  </footer>
 );
}
