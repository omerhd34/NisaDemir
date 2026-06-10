import WorkHero from '@/app/components/calisma_alanlarim/WorkHero';
import WorkAreas from '@/app/components/calisma_alanlarim/WorkAreas';
import { getWork } from '@/lib/siteData';

export default async function WorkPage() {
 const work = await getWork();

 return (
  <div className="min-h-screen py-16 md:py-20 lg:py-24 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <WorkHero work={work} />
    <WorkAreas work={work} />
   </div>
  </div>
 );
}
