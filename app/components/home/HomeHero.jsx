'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Mail, Sparkles } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SOCIALS = [
 { href: 'https://wa.me/905366404701', icon: FaWhatsapp, label: 'WhatsApp' },
 { href: 'mailto:psikolognisademir@gmail.com', icon: Mail, label: 'E-posta' },
 { href: 'https://instagram.com/psikolognisademir', icon: FaInstagram, label: 'Instagram', external: true },
 { href: 'https://www.linkedin.com/in/nisa-demir-798815202/', icon: FaLinkedin, label: 'LinkedIn', external: true },
];

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
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center lg:items-start max-w-7xl mx-auto">
     <div className="lg:col-span-7 text-center lg:text-left animate-slideUp">
      <Badge variant="eyebrow" className="px-0 mx-auto lg:mx-0">
       <Sparkles className="w-3.5 h-3.5" />
       Uzman Klinik Psikolog
      </Badge>

      <h1 className="display-serif mt-5 text-[3.25rem] sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem] xl:text-[7rem] text-heading">
       Nisa <span className="italic font-normal text-primary dark:text-primary-dark-light">Demir</span>
      </h1>

      <div className="w-fit mx-auto lg:mx-0 mb-7">
       <p className="font-serif italic text-xl sm:text-2xl md:text-3xl mt-1 font-light text-gray-600 dark:text-dark-100 tracking-wide">
        Bireysel & Online Psikoterapi
       </p>
       <div className="divider-line w-full mt-4" />
      </div>

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
         src="/nisa.jpeg"
         alt="Klinik Psikolog Nisa Demir, muayenehane ortamında portresi"
         fill
         sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 32vw"
         className="object-cover"
         priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-900/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-transparent mix-blend-overlay" />

        <div className="absolute inset-x-0 bottom-0 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 text-white">
         <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight">
          İstanbul <span className="text-primary-dark-lighter">&</span> Online
         </h3>
         <p className="text-xs sm:text-sm text-gray-200 mt-1 font-light">
          Sessiz ve güvenli bir alan
         </p>
        </div>
       </div>

       <div className="absolute -top-3 -left-3 hidden md:block w-20 h-20 border border-primary/25 dark:border-primary-dark/25 rounded-2xl -z-10" />
       <div className="absolute -bottom-3 -right-3 hidden md:block w-24 h-24 border border-accent/25 dark:border-accent-dark/20 rounded-2xl -z-10" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-w-md mx-auto">
       <SocialRow />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

function SocialRow() {
 return (
  <div className="flex items-center justify-center gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm transition-colors duration-300">
   {SOCIALS.map(({ href, icon: Icon, label, external }) => (
    <Link
     key={label}
     href={href}
     target={external ? '_blank' : undefined}
     rel={external ? 'noopener noreferrer' : undefined}
     aria-label={label}
     title={label}
     className="group relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-primary/25 dark:border-primary-dark/25 text-primary dark:text-primary-dark-light overflow-hidden transition-colors duration-300"
    >
     <span
      aria-hidden
      className="absolute inset-0 scale-0 rounded-full bg-linear-to-br from-primary to-primary-light dark:from-primary-dark dark:to-primary-dark-light group-hover:scale-100 transition-transform duration-500 ease-out"
     />
     <Icon className="relative z-10 w-[18px] h-[18px] group-hover:text-white dark:group-hover:text-gray-950 transition-colors duration-300" />
    </Link>
   ))}
  </div>
 );
}

export default HomeHero;