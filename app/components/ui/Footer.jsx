import HrefLink from '@/components/ui/HrefLink';
import { Button } from '@/components/ui/button';
import Logo from '@/app/components/ui/Logo';
import { Mail } from 'lucide-react';
import { getSocial } from '@/lib/siteData';
import { mainNavLinks, infoNavLinks } from '@/lib/siteNav';
import { mailLinkProps } from '@/lib/socialAppLinks';

function FooterSectionLabel({ children }) {
 return (
  <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-muted mb-5">
   {children}
  </p>
 );
}

function FooterNavLinks({ links }) {
 return (
  <ul className="space-y-1">
   {links.map(({ href, label }) => (
    <li key={href}>
     <HrefLink
      href={href}
      className="group relative block py-1.5 text-[0.95rem] text-body hover:text-heading transition-colors duration-300"
     >
      <span
       aria-hidden
       className="absolute top-1/2 -left-4 h-px w-0 -translate-y-1/2 bg-primary/70 dark:bg-primary-dark/70 transition-all duration-300 group-hover:w-3"
      />
      {label}
     </HrefLink>
    </li>
   ))}
  </ul>
 );
}

function FooterContactItem({ icon: Icon, href, children }) {
 const iconBox = (
  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200/80 bg-white/70 text-primary dark:border-dark-500/60 dark:bg-dark-800/70 dark:text-primary-dark-light">
   <Icon className="h-3.5 w-3.5" />
  </span>
 );

 return (
  <li>
   <HrefLink
    href={href}
    className="group flex items-start gap-3 text-sm text-body transition-colors duration-300 hover:text-heading"
   >
    {iconBox}
    <span className="pt-1.5 leading-relaxed">{children}</span>
   </HrefLink>
  </li>
 );
}

export default async function Footer() {
 const social = await getSocial();
 const currentYear = new Date().getFullYear();

 const emailLink = mailLinkProps(social.email);

 return (
  <footer className="relative overflow-hidden border-t border-gray-200/80 dark:border-dark-500/40 bg-gray-50 dark:bg-dark-900">
   <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-35"
    style={{
     backgroundImage:
      'radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--color-primary) 7%, transparent), transparent 42%), radial-gradient(circle at 88% 100%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 38%)',
    }}
   />

   <div className="relative h-px bg-linear-to-r from-transparent via-primary/35 dark:via-primary-dark/35 to-transparent" />

   <div className="container relative mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-16">
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] xl:gap-x-10 2xl:gap-x-14">
     <div className="sm:col-span-2 xl:col-span-1">
      <Logo compact />

      <blockquote className="mt-5 border-l-2 border-primary/35 dark:border-primary-dark/35 pl-4 font-serif text-base italic text-primary dark:text-primary-dark-light">
       Ruhsallığınız için bir adım.
      </blockquote>
     </div>

     <div>
      <FooterSectionLabel>Sayfalar</FooterSectionLabel>
      <FooterNavLinks links={mainNavLinks} />
     </div>

     <div>
      <FooterSectionLabel>Bilgi</FooterSectionLabel>
      <FooterNavLinks links={infoNavLinks} />
     </div>

     <div>
      <FooterSectionLabel>İletişim</FooterSectionLabel>
      <ul className="space-y-3.5">
       <FooterContactItem icon={Mail} href={emailLink.href}>
        {social.email}
       </FooterContactItem>
      </ul>

      <Button asChild size="sm" className="mt-5">
       <HrefLink href="/iletisim">Ön Görüşme Talebi</HrefLink>
      </Button>
     </div>
    </div>

    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200/80 pt-6 text-center dark:border-dark-500/40 md:flex-row md:gap-6 md:text-left">
     <p className="text-sm text-muted">
      © {currentYear} Nisa Demir
     </p>
     <p className="text-sm text-muted">Tüm hakları saklıdır.</p>
    </div>
   </div>
  </footer>
 );
}
