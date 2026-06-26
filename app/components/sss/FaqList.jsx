'use client';

import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { groupFaqByCategory } from '@/lib/faqCategories';
import { cn } from '@/lib/utils';

export default function FaqList({ items, categories = [] }) {
 if (!items?.length) {
  return (
   <Card className="max-w-3xl mx-auto p-10 text-center border-gray-200/80 dark:border-dark-500/40">
    <p className="text-body">Henüz soru eklenmemiş.</p>
   </Card>
  );
 }

 const groups = groupFaqByCategory(items, categories);

 return (
  <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
   {groups.map((group, groupIndex) => (
    <section
     key={group.id}
     className="animate-slideUp"
     style={{ animationDelay: `${groupIndex * 80}ms` }}
    >
     <div className="flex items-center gap-3 mb-5">
      <h2 className="font-serif text-xl md:text-2xl text-heading">{group.title}</h2>
      <span className="h-px flex-1 bg-gray-200/80 dark:bg-dark-500/40" />
     </div>

     <Card className="overflow-hidden border-gray-200/80 dark:border-dark-500/40 shadow-sm">
      <Accordion type="single" collapsible className="w-full px-6 md:px-8">
       {group.items.map((item, index) => (
        <AccordionItem
         key={item.id}
         value={`faq-${item.id}`}
         className={cn(
          'border-gray-200/80 dark:border-dark-500/40',
          index === group.items.length - 1 && 'border-b-0'
         )}
        >
         <AccordionTrigger className="hover:no-underline">
          {item.question}
         </AccordionTrigger>
         <AccordionContent>
          <p className="whitespace-pre-line text-body leading-relaxed">
           {item.answer}
          </p>
         </AccordionContent>
        </AccordionItem>
       ))}
      </Accordion>
     </Card>
    </section>
   ))}
  </div>
 );
}
