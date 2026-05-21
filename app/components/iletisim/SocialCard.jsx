import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { social } from '@/lib/siteData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SOCIALS = [
 {
  href: `mailto:${social.email}`,
  icon: Mail,
  label: 'E-posta',
 },
 {
  href: social.instagram.url,
  icon: FaInstagram,
  label: 'Instagram',
  external: true,
 },
];

const SocialCard = () => {
 return (
  <Card className="w-full overflow-hidden animate-slideUp animation-delay-100">
   <CardContent className="p-6 md:p-7">
    <div className="flex items-center gap-3 mb-5">
     <Badge variant="eyebrow" className="px-0 shrink-0">
      Sosyal
     </Badge>
     <span className="flex-1 h-px bg-linear-to-r from-primary/40 via-primary/20 to-transparent dark:from-primary-dark/40 dark:via-primary-dark/20" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
     {SOCIALS.map(({ href, icon: Icon, label, external }) => (
      <Link
       key={label}
       href={href}
       target={external ? '_blank' : undefined}
       rel={external ? 'noopener noreferrer' : undefined}
       aria-label={label}
       className="group relative flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-dark-500/60 bg-gray-50/60 dark:bg-dark-800/40 hover:bg-white dark:hover:bg-dark-800 hover:border-primary/40 dark:hover:border-primary-dark/40 hover:shadow-md transition-all duration-300"
      >
       <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/25 dark:border-primary-dark/25 text-primary dark:text-primary-dark-light shrink-0 overflow-hidden">
        <span
         aria-hidden
         className="absolute inset-0 scale-0 rounded-full bg-linear-to-br from-primary to-primary-light dark:from-primary-dark dark:to-primary-dark-light group-hover:scale-100 transition-transform duration-500 ease-out"
        />
        <Icon className="relative z-10 w-[17px] h-[17px] group-hover:text-white dark:group-hover:text-gray-950 transition-colors duration-300" />
       </span>
       <span className="font-medium text-heading text-[0.95rem] leading-tight group-hover:text-primary dark:group-hover:text-primary-dark-light transition-colors duration-300">
        {label}
       </span>
      </Link>
     ))}
    </div>
   </CardContent>
  </Card>
 );
};

export default SocialCard;
