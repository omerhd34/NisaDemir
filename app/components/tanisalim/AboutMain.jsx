'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap, BookMarked, Sparkles } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const sections = [
 { key: 'text1', icon: GraduationCap, label: 'Eğitim' },
 { key: 'text2', icon: BookMarked, label: 'Süpervizyon ve Eğitimler' },
 { key: 'text3', icon: Sparkles, label: 'Bugün' },
];

const AboutMain = () => {
 const { data } = useAppContext();
 if (!data?.about) return null;

 return (
  <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 max-w-6xl mx-auto animate-slideUp">
   <aside className="lg:col-span-4">
    <div className="lg:sticky lg:top-28">
     <div className="relative max-w-xs sm:max-w-sm mx-auto lg:max-w-none">
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/5">
       <Image
        src="/sand.jpg"
        alt="Nisa Demir"
        fill
        sizes="(max-width: 1024px) 80vw, 30vw"
        className="object-cover"
        priority
       />
       <div className="absolute inset-0 bg-linear-to-t from-gray-950/70 via-transparent to-transparent" />
       <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="eyebrow text-primary-dark-lighter mb-1.5">
         <span className="w-5 h-px bg-primary-dark-lighter" />
         Klinik Psikolog
        </p>
        <h2 className="font-serif text-3xl font-medium leading-tight">
         Nisa Demir
        </h2>
       </div>
      </div>
      <div className="absolute -top-3 -left-3 hidden md:block w-20 h-20 border border-primary/25 dark:border-primary-dark/25 rounded-2xl -z-10" />
     </div>

     <Card className="mt-6">
      <CardContent className="p-5 space-y-3">
       <div className="flex flex-col">
        <span className="eyebrow text-muted">Yaklaşım</span>
        <span className="font-serif text-lg text-heading">Psikanalitik Psikoterapi</span>
       </div>
       <Separator />
       <div className="flex flex-col">
        <span className="eyebrow text-muted">Format</span>
        <span className="font-serif text-lg text-heading">Yüz yüze · Online</span>
       </div>
       <Separator />
       <Button asChild className="w-full mt-2">
        <Link href="/iletisim">
         Randevu Al
         <ArrowRight />
        </Link>
       </Button>
      </CardContent>
     </Card>
    </div>
   </aside>

   <div className="lg:col-span-8 space-y-8">
    {sections.map(({ key, icon: Icon, label }, idx) => {
     const text = data.about[key];
     if (!text) return null;
     return (
      <Card key={key} className="overflow-hidden">
       <CardContent className="p-7 md:p-9">
        <div className="flex items-center gap-3 mb-5">
         <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0">
          <Icon className="w-5 h-5" />
         </span>
         <div>
          <Badge variant="eyebrow" className="px-0">
           {`0${idx + 1}`} · {label}
          </Badge>
         </div>
        </div>
        <p className="text-base md:text-[1.02rem] leading-[1.85] text-body">
         {text}
        </p>
       </CardContent>
      </Card>
     );
    })}
   </div>
  </div>
 );
};

export default AboutMain;
