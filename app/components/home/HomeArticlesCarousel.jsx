'use client';

import Link from 'next/link';
import Image from 'next/image';
import { articleImageAlt } from '@/lib/imageAlt';
import ArticleReadMore, { articleLinkAriaLabel } from '@/app/components/yazilarim/ArticleReadMore';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from '@/components/ui/carousel';

const HomeArticlesCarousel = ({ articles = [] }) => {
 if (articles.length === 0) return null;

 const showNav = articles.length > 1;

 return (
  <div className="container mx-auto px-5 sm:px-6 lg:px-8">
   <Carousel
    opts={{
     align: 'start',
     loop: articles.length > 3,
    }}
    className="relative w-full max-w-6xl mx-auto"
   >
    <CarouselContent className="-ml-4 md:-ml-6">
     {articles.map((article, index) => (
      <CarouselItem
       key={article.slug || index}
       className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
      >
       <Link
        href={`/yazilarim/${article.slug}`}
        aria-label={articleLinkAriaLabel(article.title)}
        className="group block h-full animate-slideUp"
        style={{ animationDelay: `${(index % 3) * 120}ms` }}
       >
        <Card className="overflow-hidden h-full flex flex-col hover-card relative border-gray-200/80 dark:border-dark-500/40">
         <div className="relative aspect-5/4 overflow-hidden">
          <Image
           src={article.image}
           alt={articleImageAlt(article.title)}
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
           <ArticleReadMore title={article.title} />
           <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-primary/30 dark:border-primary-dark/30 text-primary dark:text-primary-dark-light group-hover:bg-primary group-hover:text-white group-hover:border-primary dark:group-hover:bg-primary-dark dark:group-hover:text-gray-950 dark:group-hover:border-primary-dark transition-all duration-500">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
           </span>
          </div>
         </CardContent>
        </Card>
       </Link>
      </CarouselItem>
     ))}
    </CarouselContent>

    {showNav ? (
     <>
      <CarouselPrevious
       variant="default"
       className="hidden sm:inline-flex h-9 w-9 md:h-10 md:w-10 [&_svg]:size-4 -left-6 sm:-left-8 md:-left-10 lg:-left-12 xl:-left-14 border-0 shadow-md disabled:opacity-30"
      />
      <CarouselNext
       variant="default"
       className="hidden sm:inline-flex h-9 w-9 md:h-10 md:w-10 [&_svg]:size-4 -right-6 sm:-right-8 md:-right-10 lg:-right-12 xl:-right-14 border-0 shadow-md disabled:opacity-30"
      />
     </>
    ) : null}
   </Carousel>
  </div>
 );
};

export default HomeArticlesCarousel;
