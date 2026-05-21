'use client';
import { Send } from 'lucide-react';
import SectionHero from '../ui/SectionHero';

const ContactHero = () => {
 return (
  <SectionHero
   icon={Send}
   pillText="İletişim"
   title="İletişim"
   className="mb-20"
  />
 );
};

export default ContactHero;