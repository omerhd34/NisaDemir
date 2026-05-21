import { Briefcase } from 'lucide-react';
import { work } from '@/lib/siteData';
import SectionHero from '../ui/SectionHero';

const WorkHero = () => {
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
