"use client";

import Link from "next/link";
import HrefLink from "@/components/ui/HrefLink";
import Image from "next/image";
import { articleImageAlt } from "@/lib/imageAlt";
import { ArrowLeft, Quote, BookMarked } from "lucide-react";
import ArticleCategoryBadge from "@/app/components/yazilarim/ArticleCategoryBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prepareArticleContentForDisplay } from "@/lib/articleContent";

export default function ArticleDetailClient({ article }) {
 const content = prepareArticleContentForDisplay(article.content);

 return (
  <div className="min-h-screen py-12 md:py-16 lg:py-20 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <div className="max-w-3xl lg:max-w-4xl mx-auto">
     <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2">
      <Link href="/yazilarim">
       <ArrowLeft className="w-4 h-4" />
       Yazılara Dön
      </Link>
     </Button>

     <div className="mb-8 flex flex-wrap items-center gap-3 animate-fadeIn">
      <ArticleCategoryBadge category={article.category} />
     </div>

     <h1 className="display-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] mb-6 text-heading animate-slideUp">
      {article.title}
     </h1>

     {article.writer && (
      <p className="font-serif italic text-base md:text-lg text-muted mb-8 animate-fadeIn">
       — {article.writer}
      </p>
     )}

     <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/5 animate-fadeIn">
      <Image
       src={article.image}
       alt={articleImageAlt(article.title)}
       fill
       className="object-cover"
       sizes="(max-width: 1280px) 100vw, 1024px"
       priority
       unoptimized
      />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950/30 via-transparent to-transparent" />
     </div>

     {article.poem && (
      <Card className="mb-8 overflow-hidden animate-slideUp">
       <CardContent className="p-7 md:p-10 text-center">
        <Quote className="w-8 h-8 text-primary/40 dark:text-primary-dark/40 mx-auto mb-5" strokeWidth={1.5} />
        <p className="font-serif italic text-lg md:text-xl leading-relaxed whitespace-pre-line text-heading">
         {article.poem}
        </p>
        {article.writer2 && (
         <>
          <Separator className="my-5 mx-auto w-12 bg-primary/40 dark:bg-primary-dark/40" />
          <p className="font-serif italic text-base md:text-lg text-primary dark:text-primary-dark-light">
           {article.writer2}
          </p>
         </>
        )}
       </CardContent>
      </Card>
     )}

     <Card className="mb-8 animate-slideUp">
      <CardContent className="p-7 md:p-10 lg:p-12">
       {content.type === "html" ? (
        <div
         className="prose-content text-[1.02rem] md:text-lg leading-[1.9] text-body font-light"
         dangerouslySetInnerHTML={{ __html: content.html }}
        />
       ) : (
        <div className="prose-content text-[1.02rem] md:text-lg leading-[1.9] whitespace-pre-line text-body font-light">
         {content.text}
        </div>
       )}
      </CardContent>
     </Card>

     {article.source && (
      <Card className="mb-8 animate-slideUp">
       <CardContent className="p-6 md:p-8">
        <div className="flex items-start gap-3">
         <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0">
          <BookMarked className="w-5 h-5" />
         </span>
         <div>
          <Badge variant="eyebrow" className="px-0 mb-2">
           Kaynak
          </Badge>
          <p className="text-sm md:text-base font-serif italic leading-relaxed whitespace-pre-line text-body">
           {article.source}
          </p>
         </div>
        </div>
       </CardContent>
      </Card>
     )}

     <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-dark-500/60">
      <Button asChild variant="outline">
       <Link href="/yazilarim">
        <ArrowLeft />
        Tüm Yazılar
       </Link>
      </Button>
      <Button asChild>
       <HrefLink href="/iletisim">
        Ön Görüşme Talebi
       </HrefLink>
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
}
