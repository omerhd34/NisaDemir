import { Mail, MapPin, Phone } from 'lucide-react';
import HrefLink from '@/components/ui/HrefLink';
import SocialAppLink from '@/components/ui/SocialAppLink';
import { FaInstagram } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { instagramAppUrl, mailLinkProps } from '@/lib/socialAppLinks';
import { phoneTelUrl } from '@/lib/contactPhone';
const ContactInfo = ({ social }) => {
 return (
  <Card className="w-full h-full min-h-full flex-1 flex flex-col animate-slideUp">
   <CardContent className="p-6 md:p-7 flex-1 flex flex-col h-full">
    <CardSectionHeader>İletişim</CardSectionHeader>
    <div className="flex flex-col gap-7 md:gap-8 flex-1">
     <InfoRow icon={MapPin} label="Lokasyon">
      <p className="text-base text-heading">İstanbul/Kadıköy</p>
      <p className="text-sm text-body mt-0.5">Yüz yüze & Online</p>
     </InfoRow>

     <Separator />

     <InfoRow icon={Mail} label="E-posta" {...mailLinkProps(social.email)}>
      <SocialAppLink
       {...mailLinkProps(social.email)}
       className="text-sm sm:text-base text-heading hover:text-primary dark:hover:text-primary-dark-light transition-colors break-all underline-offset-2 hover:underline"
      >
       {social.email}
      </SocialAppLink>
     </InfoRow>

     <Separator />

     <InfoRow icon={Phone} label="Telefon">
      <HrefLink
       href={phoneTelUrl(social.phone.tel)}
       className="text-sm sm:text-base text-heading hover:text-primary dark:hover:text-primary-dark-light transition-colors underline-offset-2 hover:underline"
      >
       {social.phone.display}
      </HrefLink>
     </InfoRow>

     <Separator />

     <InfoRow
      icon={FaInstagram}
      label="Instagram"
      href={social.instagram.url}
      appHref={instagramAppUrl(social.instagram.username)}
     >
      <SocialAppLink
       appHref={instagramAppUrl(social.instagram.username)}
       webHref={social.instagram.url}
       className="text-sm sm:text-base text-heading hover:text-primary dark:hover:text-primary-dark-light transition-colors underline-offset-2 hover:underline"
      >
       @{social.instagram.username}
      </SocialAppLink>
     </InfoRow>
    </div>
   </CardContent>
  </Card>
 );
};

function CardSectionHeader({ children }) {
 return (
  <div className="flex items-center gap-3 mb-5">
   <Badge variant="eyebrow" className="px-0 shrink-0">
    {children}
   </Badge>
   <span className="flex-1 h-px bg-linear-to-r from-primary/40 via-primary/20 to-transparent dark:from-primary-dark/40 dark:via-primary-dark/20" />
  </div>
 );
}

function InfoRow({ icon: Icon, label, children, href, appHref, tryAppOnDesktop }) {
 const LinkComponent = appHref ? SocialAppLink : HrefLink;
 const linkProps = appHref
  ? { appHref, webHref: href, tryAppOnDesktop }
  : { href };

 return (
  <div className="flex items-start gap-4">
   {href ? (
    <LinkComponent
     {...linkProps}
     aria-label={label}
     className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0 hover:bg-primary/20 dark:hover:bg-primary-dark/25 transition-colors"
    >
     <Icon size={18} />
    </LinkComponent>
   ) : (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0">
     <Icon size={18} />
    </span>
   )}
   <div className="flex-1 min-w-0">
    <p className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-muted mb-1.5">
     {label}
    </p>
    {children ? <div>{children}</div> : null}
   </div>
  </div>
 );
}

export default ContactInfo;
