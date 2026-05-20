'use client';
import Link from 'next/link';
import { User, Video, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SERVICES = [
 {
  icon: User,
  title: 'Bireysel Terapi',
  description: 'Yüz yüze, psikanalitik yönelimli bireysel psikoterapi.',
  href: '/calisma_alanlarim',
 },
 {
  icon: Video,
  title: 'Online Terapi',
  description: 'Görüntülü, mahremiyetin korunduğu çevrimiçi seanslar.',
  href: '/calisma_alanlarim',
 },
];

const ServicesCard = () => {
 return (
  <Card className="overflow-hidden animate-slideUp">
   <CardContent className="p-6 md:p-7">
    <div className="flex items-center gap-3 mb-5">
     <Badge variant="eyebrow" className="px-0 shrink-0">
      Çalışma Alanları
     </Badge>
     <span className="flex-1 h-px bg-linear-to-r from-primary/40 via-primary/20 to-transparent dark:from-primary-dark/40 dark:via-primary-dark/20" />
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
     {SERVICES.map(({ icon: Icon, title, description, href }) => (
      <Link
       key={title}
       href={href}
       className="group relative flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-500/60 bg-gray-50/60 dark:bg-dark-800/40 hover:bg-white dark:hover:bg-dark-800 hover:border-primary/40 dark:hover:border-primary-dark/40 hover:shadow-md transition-all duration-300"
      >
       <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-dark dark:group-hover:text-gray-950 transition-colors duration-300">
        <Icon className="w-5 h-5" strokeWidth={1.6} />
       </span>
       <div className="flex-1 min-w-0">
        <h4 className="font-serif text-lg md:text-xl text-heading leading-tight mb-1 group-hover:text-primary dark:group-hover:text-primary-dark-light transition-colors duration-300">
         {title}
        </h4>
        <p className="text-xs sm:text-sm text-body leading-relaxed">
         {description}
        </p>
       </div>
       <ArrowRight className="shrink-0 w-4 h-4 mt-1 text-muted group-hover:text-primary dark:group-hover:text-primary-dark-light group-hover:translate-x-0.5 transition-all duration-300" />
      </Link>
     ))}
    </div>
   </CardContent>
  </Card>
 );
};

export default ServicesCard;
