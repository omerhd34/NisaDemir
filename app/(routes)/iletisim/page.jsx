import ContactHero from '@/app/components/iletisim/ContactHero';
import ContactForm from '@/app/components/iletisim/ContactForm';
import ContactInfo from '@/app/components/iletisim/ContactInfo';
import ServicesCard from '@/app/components/iletisim/ServicesCard';
import { getSocial } from '@/lib/siteData';

export default async function ContactPage() {
 const social = await getSocial();

 return (
  <div className="min-h-screen py-16 md:py-20 lg:py-24 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <ContactHero />
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
     <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 lg:items-stretch">
      <div className="lg:col-span-3 flex flex-col h-full min-h-0">
       <ContactForm />
      </div>
      <div className="lg:col-span-2 flex flex-col h-full min-h-0">
       <ContactInfo social={social} />
      </div>
     </div>
     <ServicesCard />
    </div>
   </div>
  </div>
 );
}
