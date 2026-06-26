import HrefLink from '@/components/ui/HrefLink';
import SocialAppLink from '@/components/ui/SocialAppLink';
import LegalPage from '@/app/components/ui/LegalPage';
import { CONTACT_PHONE, contactPhoneTelUrl } from '@/lib/contactPhone';
import { mailLinkProps } from '@/lib/socialAppLinks';
import { social } from '@/lib/initialSiteData';
import { getLegalLastUpdated } from '@/lib/getLegalLastUpdated';
import { ChevronRight } from 'lucide-react';

export const metadata = {
 title: 'Çerez Politikası',
 description: 'Web sitesinde kullanılan çerezler ve tercih yönetimi hakkında bilgilendirme.',
 alternates: { canonical: '/cerez-politikasi' },
 openGraph: {
  title: 'Çerez Politikası | Nisa Demir',
  description: 'Çerez kullanımı ve gizlilik tercihleri hakkında bilgilendirme.',
 },
};

export const revalidate = 86400;

const linkClass =
 'text-primary dark:text-primary-dark-light underline underline-offset-4 decoration-primary/40 dark:decoration-primary-dark-light/40 hover:opacity-80 transition-opacity';

const contactLinkClass =
 'text-primary dark:text-primary-dark-light no-underline hover:opacity-80 transition-opacity';

const pathIcon = (
 <ChevronRight
  className="inline-block w-3.5 h-3.5 mx-0.5 align-middle text-gray-400 dark:text-dark-200 shrink-0"
  aria-hidden
 />
);

export default function CookiePolicyPage() {
 const lastUpdated = getLegalLastUpdated();

 return (
  <LegalPage iconName="cookie" pillText="Yasal" title="Çerez Politikası">
   <p className="mb-1 text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-dark-200 font-medium">
    Son güncelleme: {lastUpdated}
   </p>

   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100 mb-2">
    Bu Çerez Politikası; Uzman Klinik Psikolog{' '}
    <strong className="font-semibold text-gray-900 dark:text-gray-50">Nisa Demir</strong> tarafından
    işletilen web sitesinde kullanılan çerezler ve çerez benzeri teknolojiler
    hakkında sizi bilgilendirmek amacıyla hazırlanmıştır. Siteyi kullanmaya devam ederek bu
    politikada açıklanan uygulamaları kabul etmiş sayılırsınız.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 mt-8 mb-3 scroll-mt-28">
    1. Çerez Nedir?
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Çerezler; ziyaret ettiğiniz web siteleri tarafından tarayıcınıza veya cihazınıza kaydedilen
    küçük metin dosyalarıdır. Çerezler, sitenin düzgün çalışmasına, tercihlerinizin hatırlanmasına
    ve kullanım deneyiminin iyileştirilmesine yardımcı olur. Benzer işlev gören yerel depolama
    (localStorage) gibi teknolojiler de bu politika kapsamında değerlendirilir.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    2. Hangi Çerezleri Kullanıyoruz?
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Sitemizde şu an için pazarlama veya hedefleme amaçlı üçüncü taraf reklam çerezleri
    kullanılmamaktadır. Aşağıda kullanılan veya kullanılabilecek çerez türleri açıklanmaktadır.
   </p>

   <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mt-5 mb-2">
    Zorunlu / Teknik Çerezler
   </h3>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Bu çerezler, sitenin temel işlevlerinin yerine getirilmesi için gereklidir ve devre dışı
    bırakılamaz.
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">
      Yönetim paneli oturum çerezi:
     </strong>{' '}
     Yalnızca site yöneticilerinin içerik yönetim paneline erişimi sırasında kullanılır. Genel
     ziyaretçileri etkilemez.
    </li>
   </ul>

   <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mt-5 mb-2">
    Tercih Çerezleri ve Yerel Depolama
   </h3>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">
      Tema tercihi:
     </strong>{' '}
     Açık veya koyu tema seçiminizi hatırlamak için tarayıcınızın yerel depolama alanında saklanır.
     Bu veri sunucularımıza iletilmez.
    </li>
   </ul>

   <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mt-5 mb-2">
    Analitik Çerezler
   </h3>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Sitemizde şu an için Google Analytics veya benzeri analitik izleme araçları kullanılmamaktadır.
    İleride bu tür araçlar devreye alınırsa, bu politika güncellenecek ve gerekli bilgilendirme
    yapılacaktır.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    3. Çerezlerin Kullanım Amaçları
   </h2>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">Web sitesinin güvenli ve kesintisiz şekilde çalıştırılması</li>
    <li className="pl-0.5">Kullanıcı tercihlerinin (tema seçimi gibi) hatırlanması</li>
    <li className="pl-0.5">Yönetim paneli oturumlarının güvenli yönetimi</li>
    <li className="pl-0.5">Hizmet kalitesinin ve teknik performansın iyileştirilmesi</li>
   </ul>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    4. Üçüncü Taraf Çerezleri
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Sitemizde doğrudan üçüncü taraf reklam veya sosyal medya izleme çerezleri kullanılmamaktadır.
    Instagram, WhatsApp veya e-posta gibi harici platformlara yönlendirme yaptığınızda, ilgili
    platformların kendi çerez ve gizlilik politikaları geçerli olacaktır.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    5. Çerezleri Nasıl Yönetebilirsiniz?
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Çoğu tarayıcı çerezleri otomatik olarak kabul eder; ancak tarayıcı ayarlarınızdan çerezleri
    engelleyebilir, silebilir veya kullanımına izin vermeden önce uyarılmasını sağlayabilirsiniz.
    Çerezleri devre dışı bırakmanız, sitenin bazı özelliklerinin (örneğin tema tercihinin
    hatırlanması) düzgün çalışmamasına yol açabilir.
   </p>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Popüler tarayıcılarda çerez ayarlarına şu yollarla ulaşabilirsiniz:
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Google Chrome:</strong>{' '}
     <span className="inline-flex flex-wrap items-center gap-x-1">
      Ayarlar {pathIcon} Gizlilik ve güvenlik {pathIcon} Çerezler ve diğer site verileri
     </span>
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Mozilla Firefox:</strong>{' '}
     <span className="inline-flex flex-wrap items-center gap-x-1">
      Ayarlar {pathIcon} Gizlilik ve Güvenlik {pathIcon} Çerezler ve Site Verileri
     </span>
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Safari:</strong>{' '}
     <span className="inline-flex flex-wrap items-center gap-x-1">
      Tercihler {pathIcon} Gizlilik {pathIcon} Çerezleri ve web sitesi verilerini yönet
     </span>
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Microsoft Edge:</strong>{' '}
     <span className="inline-flex flex-wrap items-center gap-x-1">
      Ayarlar {pathIcon} Çerezler ve site izinleri
     </span>
    </li>
   </ul>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Yerel depolama (localStorage) verilerini silmek için tarayıcınızın site verilerini temizleme
    seçeneğini kullanabilirsiniz.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    6. Kişisel Verilerin Korunması
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Çerezler aracılığıyla işlenen kişisel verilere ilişkin ayrıntılı bilgi için{' '}
    <HrefLink href="/kvkk" className={linkClass}>
     KVKK Aydınlatma Metni
    </HrefLink>{' '}
    sayfamıza bakınız. İletişim formu aracılığıyla paylaştığınız bilgiler, çerez kullanımından
    bağımsız olarak KVKK kapsamında işlenmektedir.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    7. Politika Güncellemeleri
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Bu politika, yasal düzenlemeler veya sitedeki teknik değişiklikler doğrultusunda
    güncellenebilir. Güncellemeler bu sayfada yayımlanır; önemli değişikliklerde sayfanın üst
    kısmındaki &quot;son güncelleme&quot; tarihi revize edilir.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    8. İletişim
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Çerez politikası veya kişisel verileriniz hakkında sorularınız için:
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">E-posta:</strong>{' '}
     <SocialAppLink {...mailLinkProps(social.email)} className={contactLinkClass}>
      {social.email}
     </SocialAppLink>
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Telefon:</strong>{' '}
     <HrefLink href={contactPhoneTelUrl} className={contactLinkClass}>
      {CONTACT_PHONE.display}
     </HrefLink>
    </li>
   </ul>
  </LegalPage>
 );
}
