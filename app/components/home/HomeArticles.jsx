import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import HomeArticlesCarousel from '@/app/components/home/HomeArticlesCarousel';

const HomeArticles = ({ articles = [] }) => {
 if (articles.length === 0) return null;

 return (
  <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-paper section-curve-top overflow-hidden">
   <div
    aria-hidden
    className="pointer-events-none absolute -top-32 right-0 w-112 h-112 rounded-full opacity-30 dark:opacity-20 blur-3xl"
    style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
   />

   <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16 animate-fadeIn">
      <div>
       <Badge variant="eyebrow" className="px-0">
        <span className="w-6 h-px bg-primary dark:bg-primary-dark-light" />
        Blog & Makaleler
       </Badge>
       <h2 className="display-serif text-4xl sm:text-5xl md:text-6xl mt-4 text-heading">
        <span className="italic font-normal text-primary dark:text-primary-dark-light">Yazılarım</span>
       </h2>
       <p className="text-base sm:text-lg text-body mt-4 max-w-2xl leading-relaxed">
        Ruh sağlığı, psikanaliz ve insan ruhuna dair yazılar.
       </p>
      </div>

      <Button asChild variant="outline" className="self-start md:self-end">
       <Link href="/yazilarim">
        Tüm yazıları gör
        <ArrowRight />
       </Link>
      </Button>
     </div>
    </div>
   </div>

   <HomeArticlesCarousel articles={articles} />
  </section>
 );
};

export default HomeArticles;
