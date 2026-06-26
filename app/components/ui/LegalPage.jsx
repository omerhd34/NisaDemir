import LegalHero from '@/app/components/ui/LegalHero';
import { Card, CardContent } from '@/components/ui/card';

export default function LegalPage({ iconName, pillText, title, children }) {
 return (
  <div className="min-h-screen py-16 md:py-20 lg:py-24 bg-paper transition-colors duration-300">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <LegalHero iconName={iconName} pillText={pillText} title={title} className="mb-10 md:mb-12" />
    <Card className="max-w-3xl mx-auto animate-slideUp">
     <CardContent className="p-7 md:p-10 lg:p-12">
      <article className="space-y-4">{children}</article>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}
