'use client';

import { Briefcase } from 'lucide-react';
import SectionHero from '../ui/SectionHero';

const WorkHero = ({ work }) => {
 return (
  <SectionHero
   icon={Briefcase}
   pillText="Çalışma Alanlarım"
   title="Çalışma Alanlarım"
   subtitle={work?.subtitle}
  />
 );
};

export default WorkHero;
