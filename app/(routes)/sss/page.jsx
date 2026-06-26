import FaqHero from '@/app/components/sss/FaqHero';
import FaqList from '@/app/components/sss/FaqList';
import FaqJsonLd from '@/app/components/seo/FaqJsonLd';
import { getFaq } from '@/lib/siteData';

export default async function FaqPage() {
 const faq = await getFaq();

 return (
  <>
   <FaqJsonLd items={faq.items} />
  <div className="min-h-screen py-16 md:py-20 lg:py-24 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <FaqHero />
    <FaqList items={faq.items} />
   </div>
  </div>
  </>
 );
}
