'use client';
import HomeHero from '@/app/components/home/HomeHero';
import HomeWelcome from '@/app/components/home/HomeWelcome';
import HomeArticles from '@/app/components/home/HomeArticles';

export default function HomePage() {
 return (
  <div className="transition-colors duration-300">
   <HomeHero />
   <HomeArticles />
   <HomeWelcome />
  </div>
 );
}
