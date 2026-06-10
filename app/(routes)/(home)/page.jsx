import { getHome, getSocial, getArticles } from '@/lib/siteData';
import HomePageClient from './HomePageClient';

export default async function HomePage() {
 const [home, social, articles] = await Promise.all([
  getHome(),
  getSocial(),
  getArticles(),
 ]);

 return <HomePageClient home={home} social={social} articles={articles} />;
}
