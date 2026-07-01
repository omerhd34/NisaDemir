import Link from 'next/link';
import Image from 'next/image';
import { articleImageAlt } from '@/lib/imageAlt';
import ArticleReadMore, { articleLinkAriaLabel } from '@/app/components/yazilarim/ArticleReadMore';
import ArticleCategoryBadge from '@/app/components/yazilarim/ArticleCategoryBadge';
import ArticleExcerpt from '@/app/components/yazilarim/ArticleExcerpt';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ArticlesGrid = ({ articles = [] }) => {
 if (!articles || articles.length === 0) {
  return (
   <div className="text-center py-16">
    <p className="text-base text-body">Makale bulunamadı</p>
   </div>
  );
 }

 return (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
   {articles.map((article, index) => (
    <Link
     key={article.slug || index}
     href={`/yazilarim/${article.slug}`}
     aria-label={articleLinkAriaLabel(article.title)}
     className="group block animate-slideUp"
     style={{ animationDelay: `${(index % 9) * 60}ms` }}
    >
     <Card className="overflow-hidden h-full flex flex-col hover-card border-gray-200/80 dark:border-dark-500/40">
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
        <ArticleCategoryBadge category={article.category} overlay />
       </div>
      </div>

      <CardContent className="p-6 md:p-7 flex flex-col flex-1 relative">
       <h3 className="font-serif text-xl md:text-[1.45rem] leading-snug text-heading mb-3 group-hover:text-primary dark:group-hover:text-primary-dark-light transition-colors duration-500">
        {article.title}
       </h3>

       <ArticleExcerpt excerpt={article.excerpt} />

       <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100 dark:border-dark-500/30">
        <ArticleReadMore title={article.title} />
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-primary/30 dark:border-primary-dark/30 text-primary dark:text-primary-dark-light group-hover:bg-primary group-hover:text-white group-hover:border-primary dark:group-hover:bg-primary-dark dark:group-hover:text-gray-950 dark:group-hover:border-primary-dark transition-all duration-500">
         <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
       </div>
      </CardContent>
     </Card>
    </Link>
   ))}
  </div>
 );
};

export default ArticlesGrid;
