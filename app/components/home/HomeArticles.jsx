import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HomeArticles = ({ articles = [] }) => {
 const featured = articles.slice(0, 3);

 if (featured.length === 0) return null;

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
        Yazılarım
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

     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {featured.map((article, index) => (
       <Link
        key={article.slug || index}
        href={`/yazilarim/${article.slug}`}
        className="group block animate-slideUp"
        style={{ animationDelay: `${index * 120}ms` }}
       >
        <Card className="overflow-hidden h-full flex flex-col hover-card relative border-gray-200/80 dark:border-dark-500/40">
         <div className="relative aspect-5/4 overflow-hidden">
          <Image
           src={article.image}
           alt={article.title}
           fill
           sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
           className="object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
           unoptimized
          />

          <div className="absolute top-4 left-4">
           <Badge className="backdrop-blur-md bg-white/90 dark:bg-dark-900/85 border border-white/40 dark:border-white/10 text-primary dark:text-primary-dark-light shadow-sm">
            <BookOpen className="w-3 h-3" />
            Psikoloji
           </Badge>
          </div>
         </div>

         <CardContent className="p-6 md:p-7 flex flex-col flex-1 relative">
          <span
           aria-hidden
           className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-primary/30 dark:via-primary-dark/30 to-transparent"
          />

          <h3 className="font-serif text-xl md:text-[1.45rem] leading-snug text-heading mb-3 group-hover:text-primary dark:group-hover:text-primary-dark-light transition-colors duration-500">
           {article.title}
          </h3>

          {article.excerpt && (
           <p className="text-sm leading-relaxed text-body line-clamp-3 mb-6 flex-1">
            {article.excerpt}
           </p>
          )}

          <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100 dark:border-dark-500/30">
           <span className="inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-primary-dark-light">
            Devamını oku
           </span>
           <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-primary/30 dark:border-primary-dark/30 text-primary dark:text-primary-dark-light group-hover:bg-primary group-hover:text-white group-hover:border-primary dark:group-hover:bg-primary-dark dark:group-hover:text-gray-950 dark:group-hover:border-primary-dark transition-all duration-500">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
           </span>
          </div>
         </CardContent>
        </Card>
       </Link>
      ))}
     </div>
    </div>
   </div>
  </section>
 );
};

export default HomeArticles;
