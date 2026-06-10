import Link from 'next/link';
import { User, Video, ArrowRight, Headphones, Users, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const iconMap = {
 User,
 Video,
 Headphones,
 Users,
 Brain,
};

const WorkAreas = ({ work }) => {
 if (!work?.workAreas) return null;

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
   {work.workAreas.map((area, index) => {
    const IconComponent = iconMap[area.icon] || User;
    return (
     <Card
      key={index}
      className="group h-full overflow-hidden hover-card animate-slideUp"
      style={{ animationDelay: `${index * 120}ms` }}
     >
      <CardContent className="p-7 md:p-9 flex flex-col h-full">
       <div className="flex items-start justify-between gap-4 mb-6">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-dark dark:group-hover:text-gray-950 transition-colors duration-500">
         <IconComponent className="w-7 h-7" strokeWidth={1.6} />
        </span>
        <Badge variant="outline" className="text-[0.7rem]">
         {`0${index + 1}`}
        </Badge>
       </div>

       <h3 className="font-serif text-2xl md:text-3xl text-heading mb-4 leading-tight">
        {area.title}
       </h3>

       <p className="text-base leading-[1.8] text-body flex-1">
        {area.description}
       </p>

       <div className="mt-7 pt-5 border-t border-gray-200 dark:border-dark-500/60">
        <Button asChild variant="link" className="p-0 h-auto text-sm font-medium">
         <Link href="/iletisim" className="group/btn">
          Randevu Al
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
         </Link>
        </Button>
       </div>
      </CardContent>
     </Card>
    );
   })}
  </div>
 );
};

export default WorkAreas;
