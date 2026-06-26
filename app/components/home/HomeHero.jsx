import Link from 'next/link';
import Image from 'next/image';
import { PORTRAIT_ALT } from '@/lib/imageAlt';
import { ArrowRight, Calendar, Mail, Phone } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import HrefLink from '@/components/ui/HrefLink';
import SocialAppLink from '@/components/ui/SocialAppLink';
import { CONTACT_PHONE, contactPhoneTelUrl } from '@/lib/contactPhone';
import { instagramAppUrl, mailLinkProps } from '@/lib/socialAppLinks';

const HomeHero = ({ social }) => {
 const SOCIALS = [
  { href: contactPhoneTelUrl, icon: Phone, label: CONTACT_PHONE.display },
  { ...mailLinkProps(social.email), icon: Mail, label: 'E-posta' },
  {
   href: social.instagram.url,
   appHref: instagramAppUrl(social.instagram.username),
   icon: FaInstagram,
   label: 'Instagram',
  },
 ];

 return (
  <section className="relative overflow-hidden bg-paper min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)] flex flex-col justify-center">
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

   <div className="container relative mx-auto px-5 sm:px-6 lg:px-8 py-8 md:py-12">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center max-w-7xl mx-auto">
     <div className="lg:col-span-7 text-center lg:text-left animate-slideUp">
      <h1 className="display-serif mt-5 text-[3.25rem] sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem] xl:text-[7rem] text-heading">
       Nisa <span className="italic font-normal text-primary dark:text-primary-dark-light">Demir</span>
      </h1>

      <div className="w-fit mx-auto lg:mx-0 mb-7">
       <p className="font-serif italic text-xl sm:text-2xl md:text-3xl mt-1 font-light text-gray-600 dark:text-dark-100 tracking-wide">
        Klinik Psikolog & Psikoterapist
       </p>
       <div className="divider-line w-full mt-4" />
      </div>
      <p className="text-[0.95rem] sm:text-base leading-[1.7] text-body max-w-2xl mx-auto lg:mx-0 mb-9">
       Uzman Klinik Psikolog Nisa Demir, İstanbul Ticaret Üniversitesi Psikoloji bölümünü 2021 yılında tamamladıktan sonra İstanbul Okan Üniversitesi Tezli Klinik Psikoloji Yüksek Lisans Programı'ndan mezun olarak uzman unvanını almıştır. Yüksek lisans döneminde psikanalitik yönelimli süpervizyon ve eğitimler almıştır. Güncel olarak yetişkinlerle yüzyüze ve online bireysel psikoterapi çalışmalarını psikanalitik psikoterapi yaklaşımıyla sürdürmekte; mesleki süpervizyonuna devam etmektedir.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
       <Button asChild size="lg" className="group">
        <Link href="/iletisim">
         <Calendar />
         Ön Görüşme Talebi
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
         alt={PORTRAIT_ALT}
         fill
         sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 32vw"
         className="object-cover"
         priority
        />
       </div>

       <div className="absolute -top-3 -left-3 hidden md:block w-20 h-20 border border-primary/25 dark:border-primary-dark/25 rounded-2xl -z-10" />
       <div className="absolute -bottom-3 -right-3 hidden md:block w-24 h-24 border border-accent/25 dark:border-accent-dark/20 rounded-2xl -z-10" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-w-md mx-auto">
       <SocialRow socials={SOCIALS} />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

function SocialRow({ socials }) {
 return (
  <div className="flex flex-wrap items-center justify-center gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm transition-colors duration-300">
   {socials.map(({ href, appHref, tryAppOnDesktop, icon: Icon, label, text }) => {
    const LinkComponent = appHref ? SocialAppLink : HrefLink;
    const linkProps = appHref
     ? { appHref, webHref: href, tryAppOnDesktop }
     : { href };

    return (
     <LinkComponent
      key={label}
      {...linkProps}
      aria-label={label}
      title={label}
      className={`group relative inline-flex items-center justify-center h-11 ${text ? 'gap-2 px-4 rounded-full' : 'w-11 rounded-full'} border border-primary/25 dark:border-primary-dark/25 text-primary dark:text-primary-dark-light overflow-hidden transition-colors duration-300`}
     >
      <span
       aria-hidden
       className="absolute inset-0 scale-0 rounded-full bg-linear-to-br from-primary to-primary-light dark:from-primary-dark dark:to-primary-dark-light group-hover:scale-100 transition-transform duration-500 ease-out"
      />
      <Icon className="relative z-10 w-[18px] h-[18px] group-hover:text-white dark:group-hover:text-gray-950 transition-colors duration-300" />
      {text ? (
       <span className="relative z-10 text-sm font-medium tracking-wide group-hover:text-white dark:group-hover:text-gray-950 transition-colors duration-300">
        {text}
       </span>
      ) : null}
     </LinkComponent>
    );
   })}
  </div>
 );
}

export default HomeHero;
