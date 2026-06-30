import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import HrefLink from '@/components/ui/HrefLink';
import { Button } from '@/components/ui/button';
import { mainNavLinks } from '@/lib/siteNav';
import { cn } from '@/lib/utils';

export default function ErrorPage({
 code = '404',
 title,
 description,
 links,
 children,
 compact = false,
 className,
}) {
 const navLinks = links ?? (compact ? [] : mainNavLinks);

 return (
  <section
   className={cn(
    'w-full bg-paper flex items-center justify-center px-5 sm:px-6 lg:px-8',
    compact ? 'py-16 md:py-24' : 'py-20 md:py-28 lg:py-32 min-h-[60vh]',
    className
   )}
  >
   <div className="container mx-auto max-w-2xl text-center animate-fadeIn">
    <Badge variant="eyebrow" className="mx-auto">
     Hata {code}
    </Badge>

    <p
     className="display-serif text-[5rem] sm:text-[6.5rem] md:text-[7.5rem] leading-none mt-6 mb-2 text-primary/80 dark:text-primary-dark/80"
     aria-hidden="true"
    >
     {code}
    </p>

    <h1 className="display-serif text-3xl sm:text-4xl md:text-5xl mt-2 mb-4 text-heading">
     {title}
    </h1>

    <Separator className="w-16 h-px mx-auto bg-primary/50 dark:bg-primary-dark/50 my-5" />

    {description && (
     <p className="text-base sm:text-lg text-body max-w-lg mx-auto leading-relaxed mb-8">
      {description}
     </p>
    )}

    {children && (
     <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
      {children}
     </div>
    )}

    {navLinks.length > 0 && (
     <nav aria-label="Hızlı bağlantılar">
      <p className="text-sm text-muted mb-4">Şu sayfalara göz atabilirsiniz:</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
       {navLinks.map((link, index) => (
        <li key={link.href} className="inline-flex items-center">
         {index > 0 && (
          <span className="text-gray-300 dark:text-dark-500 mx-2 select-none" aria-hidden="true">
           ·
          </span>
         )}
         <HrefLink
          href={link.href}
          className="text-sm text-primary dark:text-primary-dark-light hover:underline underline-offset-4 transition-colors"
         >
          {link.label}
         </HrefLink>
        </li>
       ))}
      </ul>
     </nav>
    )}
   </div>
  </section>
 );
}

export function HomeButton({ className }) {
 return (
  <Button asChild className={className}>
   <HrefLink href="/">Ana Sayfaya Dön</HrefLink>
  </Button>
 );
}
