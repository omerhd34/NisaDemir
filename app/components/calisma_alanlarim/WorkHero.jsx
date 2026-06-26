'use client';

import { Briefcase } from 'lucide-react';
import SectionHero from '../ui/SectionHero';

const WorkHero = () => {
 return (
  <SectionHero
   icon={Briefcase}
   pillText="Destek Verdiğim Konular"
   title="Çalışma Alanlarım"
   className="mb-5 md:mb-7"
  />
 );
};

export default WorkHero;
