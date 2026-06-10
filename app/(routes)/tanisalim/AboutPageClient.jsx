'use client';

import { UserCircle } from 'lucide-react';
import SectionHero from '@/app/components/ui/SectionHero';
import AboutMain from '@/app/components/tanisalim/AboutMain';

export default function AboutPageClient({ about }) {
 return (
  <div className="min-h-screen py-16 md:py-20 lg:py-24 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <SectionHero
     icon={UserCircle}
     pillText="Hakkımda"
     title="Tanışalım"
     subtitle="Mesleki yolculuğum ve klinik yaklaşımım hakkında kısa bir tanışma."
    />
    <AboutMain about={about} />
   </div>
  </div>
 );
}
