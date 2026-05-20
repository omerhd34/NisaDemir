'use client';
import { BookOpen } from 'lucide-react';
import SectionHero from '@/app/components/ui/SectionHero';
import ArticlesGrid from '@/app/components/yazilarim/ArticlesGrid';

export default function ArticlesPage() {
 return (
  <div className="min-h-screen py-16 md:py-20 lg:py-24 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <SectionHero
     icon={BookOpen}
     pillText="Blog & Makaleler"
     title="Yazılarım"
     subtitle="Ruh sağlığı, psikanaliz ve insan ruhuna dair seçili yazılar."
    />
    <ArticlesGrid />
   </div>
  </div>
 );
}
