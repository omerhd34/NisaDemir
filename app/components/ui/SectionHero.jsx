'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SectionHero = ({
 icon: Icon,
 pillText,
 title,
 subtitle,
 className = '',
}) => {
 const words = (title || '').trim().split(' ');
 const lastWord = words.length > 1 ? words.pop() : null;
 const leading = words.join(' ');

 return (
  <div className={`text-center mb-12 md:mb-16 animate-fadeIn ${className}`}>
   {pillText && (
    <Badge variant="eyebrow" className="mx-auto">
     {Icon && <Icon className="w-3.5 h-3.5" />}
     <span>{pillText}</span>
    </Badge>
   )}
   <h1 className="display-serif text-4xl sm:text-5xl md:text-6xl mt-5 mb-4 text-heading">
    {lastWord ? (
     <>
      {leading} <span className="italic font-normal text-primary dark:text-primary-dark-light">{lastWord}</span>
     </>
    ) : (
     title
    )}
   </h1>
   <Separator className="w-16 h-px mx-auto bg-primary/50 dark:bg-primary-dark/50 my-5" />
   {subtitle && (
    <p className="text-base sm:text-lg max-w-2xl mx-auto text-body leading-relaxed">
     {subtitle}
    </p>
   )}
  </div>
 );
};

export default SectionHero;
