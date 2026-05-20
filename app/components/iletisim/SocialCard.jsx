'use client';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SOCIALS = [
 {
  href: 'mailto:psikolognisademir@gmail.com',
  icon: Mail,
  label: 'E-posta',
  hint: 'psikolognisademir@gmail.com',
 },
 {
  href: 'https://instagram.com/psikolognisademir',
  icon: FaInstagram,
  label: 'Instagram',
  hint: '@psikolognisademir',
  external: true,
 },
 {
  href: 'https://www.linkedin.com/in/nisa-demir-798815202/',
  icon: FaLinkedin,
  label: 'LinkedIn',
  hint: 'Nisa Demir',
  external: true,
 },
];

const SocialCard = () => {
 return (
  <Card className="overflow-hidden animate-slideUp">
   <CardContent className="p-6 md:p-7">
    <div className="flex items-center gap-3 mb-5">
     <Badge variant="eyebrow" className="px-0 shrink-0">
      Sosyal
     </Badge>
     <span className="flex-1 h-px bg-linear-to-r from-primary/40 via-primary/20 to-transparent dark:from-primary-dark/40 dark:via-primary-dark/20" />
    </div>

    <div className="grid sm:grid-cols-3 gap-3">
     {SOCIALS.map(({ href, icon: Icon, label, hint, external }) => (
      <Link
       key={label}
       href={href}
       target={external ? '_blank' : undefined}
       rel={external ? 'noopener noreferrer' : undefined}
       aria-label={label}
       className="group relative flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-500/60 bg-gray-50/60 dark:bg-dark-800/40 hover:bg-white dark:hover:bg-dark-800 hover:border-primary/40 dark:hover:border-primary-dark/40 hover:shadow-md transition-all duration-300"
      >
       <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-primary/25 dark:border-primary-dark/25 text-primary dark:text-primary-dark-light shrink-0 overflow-hidden">
        <span
         aria-hidden
         className="absolute inset-0 scale-0 rounded-full bg-linear-to-br from-primary to-primary-light dark:from-primary-dark dark:to-primary-dark-light group-hover:scale-100 transition-transform duration-500 ease-out"
        />
        <Icon className="relative z-10 w-[18px] h-[18px] group-hover:text-white dark:group-hover:text-gray-950 transition-colors duration-300" />
       </span>
       <div className="flex flex-col min-w-0">
        <span className="font-medium text-heading text-[0.95rem] leading-tight group-hover:text-primary dark:group-hover:text-primary-dark-light transition-colors duration-300">
         {label}
        </span>
        <span className="text-xs text-muted truncate mt-0.5">{hint}</span>
       </div>
      </Link>
     ))}
    </div>
   </CardContent>
  </Card>
 );
};

export default SocialCard;
