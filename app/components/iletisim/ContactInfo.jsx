import { Clock, Mail, MapPin } from 'lucide-react';
import { contact, social } from '@/lib/siteData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ContactInfo = () => {
 const workingHours = contact?.workingHours || [];

 return (
  <Card className="w-full animate-slideUp">
   <CardContent className="p-6 md:p-7">
    <CardSectionHeader>İletişim</CardSectionHeader>
    <div className="flex flex-col gap-5">
     <InfoRow icon={MapPin} label="Lokasyon">
      <p className="text-base text-heading">İstanbul/Kadıköy</p>
      <p className="text-sm text-body mt-0.5">Yüz yüze & Online</p>
     </InfoRow>

     <Separator />

     <InfoRow icon={Mail} label="E-posta">
      <a
       href={`mailto:${social.email}`}
       className="text-sm sm:text-base text-heading hover:text-primary dark:hover:text-primary-dark-light transition-colors break-all"
      >
       {social.email}
      </a>
     </InfoRow>

     {workingHours.length > 0 && (
      <>
       <Separator />
       <InfoRow icon={Clock} label="Çalışma Saatleri">
        <ul className="space-y-1 text-sm text-body">
         {workingHours.map((line, i) => (
          <li key={i}>{line}</li>
         ))}
        </ul>
       </InfoRow>
      </>
     )}
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

function InfoRow({ icon: Icon, label, children }) {
 return (
  <div className="flex items-start gap-4">
   <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light shrink-0">
    <Icon size={18} />
   </span>
   <div className="flex-1 min-w-0">
    <p className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-muted mb-1.5">
     {label}
    </p>
    <div>{children}</div>
   </div>
  </div>
 );
}

export default ContactInfo;
