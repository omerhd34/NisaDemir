import { ArrowRight } from 'lucide-react';
import HrefLink from '@/components/ui/HrefLink';
import { Button } from '@/components/ui/button';

const FOCUS_AREAS = [
 'Depresyon ve Duygudurum Zorlukları',
 'Anksiyete (Kaygı) Bozuklukları ve Panik Atak',
 'Obsesif Kompulsif Bozukluk (OKB) ve Takıntılar',
 'Yetişkinlikte İlişki Dinamikleri ve Bağlanma Problemleri',
 'Çocukluk Çağı Yaşantıları ve Travma',
 'Psikosomatik Belirtiler (Bedensel Dışavurumlar)',
 'Kişilik Örüntüleri ve İçsel Çatışmalar',
 'Varoluşsal Sancılar ve Anlam Arayışı',
 'Yas, Kayıp ve Yaşam Geçişleri',
 'Kendini Tanıma ve Psikolojik Farkındalık',
];

const WorkFocusAreas = () => {
 return (
  <section className="max-w-4xl mx-auto mb-8 md:mb-10 animate-slideUp">
   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
    {FOCUS_AREAS.map((area) => (
     <li
      key={area}
      className="flex items-start gap-2 rounded-lg border border-gray-200/80 dark:border-dark-500/50 bg-white/60 dark:bg-dark-800/40 px-2.5 py-2 sm:px-3 sm:py-2"
     >
      <span
       aria-hidden
       className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary dark:bg-primary-dark-light"
      />
      <span className="text-xs sm:text-sm leading-snug text-heading">{area}</span>
     </li>
    ))}
   </ul>

   <div className="mt-6 md:mt-7 flex flex-col items-center gap-3 text-center">
    <p className="text-sm text-body max-w-md leading-relaxed">
     Bu ve benzeri süreçler üzerine çalışmak ve randevu oluşturmak için iletişim
     sayfasını ziyaret edebilirsiniz.
    </p>
    <Button asChild className="group">
     <HrefLink href="/iletisim">
      İletişime Geç
      <ArrowRight className="group-hover:translate-x-0.5 transition-transform shrink-0" />
     </HrefLink>
    </Button>
   </div>
  </section>
 );
};

export default WorkFocusAreas;
