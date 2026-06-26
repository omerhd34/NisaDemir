'use client';

import { CircleHelp } from 'lucide-react';
import SectionHero from '@/app/components/ui/SectionHero';

export default function FaqHero() {
 return (
  <SectionHero
   icon={CircleHelp}
   pillText="SSS"
   title="Sıkça Sorulan Sorular"
   description="Terapi süreci, başvuru, online görüşmeler ve gizlilik konularında en çok merak edilen soruların yanıtlarını burada bulabilirsiniz."
   className="mb-12 md:mb-16"
  />
 );
}
