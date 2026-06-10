import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { getContact, getSocial } from '@/lib/siteData';

export default async function Footer() {
 const [contact, social] = await Promise.all([getContact(), getSocial()]);
 const currentYear = new Date().getFullYear();

 const socialMedia = [
  { icon: Mail, link: `mailto:${social.email}`, label: social.email },
  { icon: FaInstagram, link: social.instagram.url, label: 'Instagram' },
 ];

 const workingHours = contact?.workingHours || [];

 return (
  <footer className="relative bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-500/40">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
    <div className="flex flex-col items-center text-center">
     <h4 className="font-serif text-2xl md:text-3xl font-medium text-heading mb-6">İletişim</h4>
     <ul className="space-y-3.5 text-sm text-body inline-block text-left">
      <li className="flex items-start gap-3">
       <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-dark-light" />
       <span>İstanbul/Kadıköy & Online</span>
      </li>
      {workingHours.length > 0 && (
       <li className="flex items-start gap-3">
        <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-dark-light" />
        <p className="leading-relaxed">
         <span>Çalışma saatleri:</span>{' '}
         <span>{workingHours.join(', ')}</span>
        </p>
       </li>
      )}
      <li className="flex items-start gap-3">
       <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-dark-light" />
       <span>Ayrıntılı bilgi için lütfen telefonla bilgi alınız.</span>
      </li>
     </ul>

     <div className="mt-5 flex flex-wrap justify-center gap-3">
      {socialMedia.map((s, i) => (
       <Link
        key={i}
        href={s.link}
        target={s.link.startsWith('http') ? '_blank' : undefined}
        rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={s.label}
        title={s.label}
        className="group relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-primary/25 dark:border-primary-dark/25 text-primary dark:text-primary-dark-light overflow-hidden transition-colors duration-300"
       >
        <span
         aria-hidden
         className="absolute inset-0 scale-0 rounded-full bg-linear-to-br from-primary to-primary-light dark:from-primary-dark dark:to-primary-dark-light group-hover:scale-100 transition-transform duration-500 ease-out"
        />
        <s.icon className="relative z-10 w-[18px] h-[18px] group-hover:text-white dark:group-hover:text-gray-950 transition-colors duration-300" />
       </Link>
      ))}
     </div>
    </div>

    <div className="mt-14 md:mt-20 pt-8 md:pt-10 border-t border-gray-200 dark:border-dark-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
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
