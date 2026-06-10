'use client';
import HomeHero from '@/app/components/home/HomeHero';
import HomeWelcome from '@/app/components/home/HomeWelcome';
import HomeArticles from '@/app/components/home/HomeArticles';

export default function HomePageClient({ home, social, articles }) {
 return (
  <div className="transition-colors duration-300">
   <HomeHero social={social} />
   <HomeArticles articles={articles} />
   <HomeWelcome home={home} />
  </div>
 );
}
