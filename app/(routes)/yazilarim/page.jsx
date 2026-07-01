export const dynamic = "force-dynamic";

import { getArticles } from '@/lib/siteData';
import ArticlesPageClient from './ArticlesPageClient';

export default async function ArticlesPage() {
 const articles = await getArticles();
 return <ArticlesPageClient articles={articles} />;
}
