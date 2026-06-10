import { getAbout } from '@/lib/siteData';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage() {
 const about = await getAbout();
 return <AboutPageClient about={about} />;
}
