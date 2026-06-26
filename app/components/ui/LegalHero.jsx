'use client';

import { Cookie, Shield } from 'lucide-react';
import SectionHero from '@/app/components/ui/SectionHero';

const ICONS = {
 shield: Shield,
 cookie: Cookie,
};

export default function LegalHero({ iconName, pillText, title, className }) {
 const Icon = ICONS[iconName];

 return (
  <SectionHero
   icon={Icon}
   pillText={pillText}
   title={title}
   className={className}
  />
 );
}
