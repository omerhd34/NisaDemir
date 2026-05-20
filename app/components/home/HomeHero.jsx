'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, Mail, Sparkles } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HomeHero = () => {
 const { data } = useAppContext();
 const bio = data?.about?.text3 || data?.about?.text1;
 const workingHours = data?.contact?.workingHours || data?.footer?.workingHours || [];

 return (
  <section className="relative overflow-hidden bg-paper">
   <div
    aria-hidden
    className="pointer-events-none absolute -top-32 -right-32 w-112 h-112 rounded-full opacity-30 dark:opacity-20 blur-3xl"
    style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
   />
   <div
    aria-hidden
    className="pointer-events-none absolute -bottom-40 -left-40 w-128 h-128 rounded-full opacity-25 dark:opacity-15 blur-3xl"
    style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
   />

   <div className="container relative mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-24">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center max-w-7xl mx-auto">
     <div className="lg:col-span-7 text-center lg:text-left animate-slideUp">
      <Badge variant="eyebrow" className="px-0 mx-auto lg:mx-0">
       <Sparkles className="w-3.5 h-3.5" />
       Uzman Klinik Psikolog
      </Badge>

      <h1 className="display-serif mt-5 text-[3.25rem] sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem] xl:text-[7rem] text-heading">
       Nisa <span className="italic font-normal text-primary dark:text-primary-dark-light">Demir</span>
      </h1>

      <p className="font-serif italic text-xl sm:text-2xl md:text-3xl mt-1 mb-7 font-light text-gray-600 dark:text-dark-100 tracking-wide">
       Bireysel & Online Psikoterapi
      </p>

      <div className="divider-line w-24 mx-auto lg:mx-0 mb-7" />

      {bio ? (
       <p className="text-[1.02rem] sm:text-lg leading-[1.8] text-body max-w-2xl mx-auto lg:mx-0 mb-9">
        {bio}
       </p>
      ) : (
       <p className="text-[1.02rem] sm:text-lg leading-[1.8] text-body max-w-2xl mx-auto lg:mx-0 mb-9">
        Yetişkin bireylerle psikanalitik yönelimli psikoterapi çalışmaları yürütüyorum. Yüz yüze ve online seanslarla; kaygı, depresyon, ilişki ve kimlik temalı sorgulamalarda iç dünyanıza eşlik etmeyi amaçlıyorum.
       </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
       <Button asChild size="lg" className="group">
        <Link href="/iletisim">
         <Calendar />
         Randevu Al
         <ArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
       </Button>
       <Button asChild variant="outline" size="lg">
        <Link href="/tanisalim">Hakkımda</Link>
       </Button>
      </div>
     </div>

     <div className="lg:col-span-5 animate-slideLeft animation-delay-200">
      <div className="relative max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
       <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/5">
        <Image
         src="/yol.jpeg"
         alt="Sakin bir yol, dingin bir terapötik yolculuk"
         fill
         sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 32vw"
         className="object-cover"
         priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-900/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-transparent mix-blend-overlay" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
         <p className="eyebrow text-primary-dark-lighter mb-1.5">
          <span className="w-5 h-px bg-primary-dark-lighter" />
          Muayenehane
         </p>
         <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight">
          İstanbul
         </h3>
         <p className="text-xs sm:text-sm text-gray-200 mt-0.5 font-light">
          Yüz yüze ve Online Terapi
         </p>
        </div>
       </div>

       <div className="absolute -top-3 -left-3 hidden md:block w-20 h-20 border border-primary/25 dark:border-primary-dark/25 rounded-2xl -z-10" />
       <div className="absolute -bottom-3 -right-3 hidden md:block w-24 h-24 border border-accent/25 dark:border-accent-dark/20 rounded-2xl -z-10" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-w-md mx-auto">
       <InfoRow
        icon={MapPin}
        label="Konum"
        value="İstanbul & Online"
       />
       <InfoRow
        icon={Mail}
        label="E-posta"
        value="psikolognisademir@gmail.com"
        href="mailto:psikolognisademir@gmail.com"
        small
       />
       {workingHours.length > 0 && (
        <InfoRow
         icon={Calendar}
         label="Çalışma Saatleri"
         value={workingHours[0]}
        />
       )}
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

function InfoRow({ icon: Icon, label, value, href, small = false }) {
 const inner = (
  <div className="group flex items-center gap-4 p-3.5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm hover:border-primary/40 dark:hover:border-primary-dark/40 hover:bg-white dark:hover:bg-dark-800 transition-all duration-300">
   <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-dark dark:group-hover:text-gray-950 transition-colors duration-300">
    <Icon size={18} />
   </span>
   <div className="min-w-0">
    <div className="eyebrow text-muted">{label}</div>
    <div className={`font-medium text-gray-900 dark:text-gray-50 truncate ${small ? 'text-sm' : 'text-[0.95rem]'}`}>
     {value}
    </div>
   </div>
  </div>
 );

 if (href) {
  return (
   <Link href={href} className="block">
    {inner}
   </Link>
  );
 }
 return inner;
}

export default HomeHero;