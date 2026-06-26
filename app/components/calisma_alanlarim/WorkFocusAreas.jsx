import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
  <section className="max-w-6xl mx-auto mb-10 md:mb-14 animate-slideUp">
   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
    {FOCUS_AREAS.map((area) => (
     <li
      key={area}
      className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-dark-500/60 bg-white/70 dark:bg-dark-800/50 px-4 py-3.5 md:px-5 md:py-4"
     >
      <span
       aria-hidden
       className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-dark-light"
      />
      <span className="text-sm sm:text-base leading-relaxed text-heading">{area}</span>
     </li>
    ))}
   </ul>

   <div className="mt-8 md:mt-10 flex justify-center">
    <Button asChild size="lg" className="h-auto max-w-3xl whitespace-normal text-center px-6 py-3.5 leading-snug">
     <Link href="/iletisim" className="group">
      Bu ve benzeri süreçler üzerine çalışmak ve randevu oluşturmak için iletişim sayfasını ziyaret
      edebilirsiniz
      <ArrowRight className="group-hover:translate-x-0.5 transition-transform shrink-0" />
     </Link>
    </Button>
   </div>
  </section>
 );
};

export default WorkFocusAreas;
