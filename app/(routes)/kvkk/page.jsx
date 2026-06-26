import HrefLink from '@/components/ui/HrefLink';
import SocialAppLink from '@/components/ui/SocialAppLink';
import LegalPage from '@/app/components/ui/LegalPage';
import { CONTACT_PHONE, contactPhoneTelUrl } from '@/lib/contactPhone';
import { mailLinkProps } from '@/lib/socialAppLinks';
import { social } from '@/lib/initialSiteData';
import { getLegalLastUpdated } from '@/lib/getLegalLastUpdated';

export const metadata = {
 title: 'KVKK Aydınlatma Metni',
 description:
  'Kişisel verilerinizin işlenmesine ilişkin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
 alternates: { canonical: '/kvkk' },
 openGraph: {
  title: 'KVKK Aydınlatma Metni | Nisa Demir',
  description: 'Kişisel verilerin korunması ve işlenmesine ilişkin aydınlatma metni.',
 },
};

export const revalidate = 86400;

const linkClass =
 'text-primary dark:text-primary-dark-light underline underline-offset-4 decoration-primary/40 dark:decoration-primary-dark-light/40 hover:opacity-80 transition-opacity';

const contactLinkClass =
 'text-primary dark:text-primary-dark-light no-underline hover:opacity-80 transition-opacity';

export default function KvkkPage() {
 const lastUpdated = getLegalLastUpdated();

 return (
  <LegalPage iconName="shield" pillText="Yasal" title="KVKK Aydınlatma Metni">
   <p className="mb-1 text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-dark-200 font-medium">
    Son güncelleme: {lastUpdated}
   </p>

   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100 mb-2">
    6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri
    sorumlusu sıfatıyla Uzman Klinik Psikolog{' '}
    <strong className="font-semibold text-gray-900 dark:text-gray-50">Nisa Demir</strong> olarak; web sitemiz, iletişim kanallarımız ve terapi/danışmanlık
    hizmetlerimiz kapsamında kişisel verilerinizin işlenmesine ilişkin sizi
    bilgilendirmek amacıyla bu aydınlatma metnini hazırladık.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 mt-8 mb-3 scroll-mt-28">
    1. Veri Sorumlusu
   </h2>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Unvan:</strong> Uzman Klinik
     Psikolog Nisa Demir
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Adres:</strong>{' '}
     İstanbul/Kadıköy (yüz yüze görüşmeler) ve online hizmet
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">E-posta:</strong>{' '}
     <SocialAppLink
      {...mailLinkProps(social.email)}
      className={contactLinkClass}
     >
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

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    2. İşlenen Kişisel Veri Kategorileri
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Hizmetlerimiz kapsamında aşağıdaki kişisel veriler işlenebilmektedir:
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Kimlik ve iletişim bilgileri:</strong>{' '}
     ad-soyad, e-posta adresi, telefon numarası
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">İletişim formu içeriği:</strong>{' '}
     konu, mesaj metni ve randevu/ön görüşme taleplerine ilişkin bilgiler
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">
      Terapi ve danışmanlık sürecine ilişkin bilgiler:
     </strong>{' '}
     başvuru gerekçesi, psikolojik duruma ilişkin paylaşımlar, seans notları ve süreç kayıtları
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Özel nitelikli kişisel veriler:</strong>{' '}
     sağlık ve cinsel hayata ilişkin veriler; psikoterapi hizmetinin doğası gereği, yalnızca
     hizmetin sunulması ve mesleki yükümlülüklerin yerine getirilmesi amacıyla, gerekli ölçüde
     ve sınırlı olarak işlenebilir
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">İşlem güvenliği verileri:</strong>{' '}
     IP adresi, tarayıcı bilgisi, erişim kayıtları ve teknik log verileri
    </li>
   </ul>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    3. Kişisel Verilerin İşlenme Amaçları
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">İletişim taleplerinin ve randevu/ön görüşme başvurularının alınması ve yanıtlanması</li>
    <li className="pl-0.5">Bireysel ve online psikoterapi/danışmanlık hizmetlerinin yürütülmesi</li>
    <li className="pl-0.5">Danışan ilişkisinin kurulması, sürdürülmesi ve mesleki süpervizyon süreçleri</li>
    <li className="pl-0.5">Yasal yükümlülüklerin yerine getirilmesi ve yetkili kurum taleplerine yanıt verilmesi</li>
    <li className="pl-0.5">Hizmet kalitesinin artırılması, bilgi güvenliğinin sağlanması ve kötüye kullanımın önlenmesi</li>
    <li className="pl-0.5">Web sitesinin işletilmesi ve kullanıcı deneyiminin iyileştirilmesi</li>
   </ul>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebepleri
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Kişisel verileriniz; web sitemizdeki{' '}
    <HrefLink
     href="/iletisim"
     className={linkClass}
    >
     iletişim formu
    </HrefLink>
    , e-posta, telefon, WhatsApp, Instagram mesajları, yüz yüze görüşmeler ve online terapi
    platformları aracılığıyla otomatik veya otomatik olmayan yollarla toplanabilir.
   </p>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    KVKK&apos;nın 5. ve 6. maddeleri kapsamında verileriniz şu hukuki sebeplere dayanılarak işlenir:
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">Bir sözleşmenin kurulması veya ifası için veri işlemenin gerekli olması</li>
    <li className="pl-0.5">Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması</li>
    <li className="pl-0.5">
     İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun
     meşru menfaatleri için veri işlenmesinin zorunlu olması
    </li>
    <li className="pl-0.5">
     Özel nitelikli kişisel veriler bakımından: açık rızanızın bulunması veya sağlık
     hizmetlerinin planlanması, yönetimi ve finansmanı kapsamında gerekli ölçüde işlenmesi
    </li>
    <li className="pl-0.5">Açık rızanızın bulunması (örneğin iletişim formu aracılığıyla iletilen talepler)</li>
   </ul>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    5. Kişisel Verilerin Aktarılması
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Kişisel verileriniz; hizmetin sunulması için gerekli olduğu ölçüde ve KVKK&apos;ya uygun
    güvenlik önlemleri alınarak aşağıdaki alıcı gruplarına aktarılabilir:
   </p>
   <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/70 dark:marker:text-primary-dark-light/70">
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">E-posta hizmet sağlayıcıları:</strong>{' '}
     İletişim formu mesajlarının iletilmesi amacıyl
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Barındırma ve altyapı hizmet sağlayıcıları:</strong>{' '}
     Web sitesinin işletilmesi amacıyla
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Yetkili kamu kurum ve kuruluşları:</strong>{' '}
     Yasal zorunluluk halinde
    </li>
    <li className="pl-0.5">
     <strong className="font-semibold text-gray-900 dark:text-gray-50">Mesleki süpervizörler:</strong>{' '}
     Mesleki etik ve yasal yükümlülükler çerçevesinde, yalnızca gerekli olduğu ölçüde ve
     kimliksizleştirilmiş veya sınırlı bilgi paylaşımıyla
    </li>
   </ul>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Yurt dışına aktarım söz konusu olduğunda, KVKK&apos;nın 9. maddesinde öngörülen şartlara uygun
    hareket edilir.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    6. Kişisel Verilerin Saklanma Süresi
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve ilgili mevzuatta
    öngörülen zamanaşımı süreleri dikkate alınarak saklanır. İletişim formu kayıtları talebin
    sonuçlandırılmasından itibaren makul süreyle; terapi sürecine ilişkin kayıtlar ise mesleki
    ve yasal saklama yükümlülükleri süresince muhafaza edilir. Sürenin sona ermesi halinde
    veriler silinir, yok edilir veya anonim hale getirilir.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    7. Veri Güvenliği
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Kişisel verilerinizin yetkisiz erişim, kayıp, ifşa veya kötüye kullanımına karşı teknik ve
    idari güvenlik önlemleri uygulanmaktadır. Sağlık ve psikoterapi alanındaki hassasiyet göz
    önünde bulundurularak verilere erişim, yalnızca yetkili kişilerle sınırlı tutulmaktadır.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    8. İlgili Kişi Olarak Haklarınız
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
   </p>
   <ol className="list-decimal pl-5 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-dark-100 marker:text-primary/80 dark:marker:text-primary-dark-light/80">
    <li className="pl-0.5">Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
    <li className="pl-0.5">İşlenmişse buna ilişkin bilgi talep etme</li>
    <li className="pl-0.5">İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
    <li className="pl-0.5">Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
    <li className="pl-0.5">Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
    <li className="pl-0.5">
     KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini
     isteme
    </li>
    <li className="pl-0.5">
     Düzeltme, silme veya yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini
     isteme
    </li>
    <li className="pl-0.5">
     İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle
     aleyhinize bir sonucun ortaya çıkmasına itiraz etme
    </li>
    <li className="pl-0.5">
     Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme
    </li>
   </ol>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    9. Başvuru Yöntemi
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Haklarınıza ilişkin taleplerinizi{' '}
    <SocialAppLink {...mailLinkProps(social.email)} className={contactLinkClass}>
     {social.email}
    </SocialAppLink>{' '}
    e-posta adresine veya yazılı olarak iletebilirsiniz. Başvurularınız, talebin niteliğine göre
    en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet
    gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret
    alınabilir.
   </p>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Başvurunuzun reddedilmesi, verilen cevabın yetersiz bulunması veya süresinde cevap
    verilmemesi hâllerinde; cevabı öğrendiğiniz tarihten itibaren otuz gün içinde ve her hâlde
    başvuru tarihinden itibaren altmış gün içinde{' '}
    <HrefLink
     href="https://www.kvkk.gov.tr"
     target="_blank"
     rel="noopener noreferrer"
     className={linkClass}
    >
     Kişisel Verileri Koruma Kurulu
    </HrefLink>
    &apos;na şikâyet hakkınız bulunmaktadır.
   </p>

   <h2 className="font-serif text-lg md:text-xl font-bold lining-nums tabular-nums text-gray-900 dark:text-gray-50 pt-8 mt-10 mb-3 scroll-mt-28 border-t border-gray-200/80 dark:border-dark-500/50">
    10. Çerezler ve Gizlilik
   </h2>
   <p className="text-sm leading-relaxed text-gray-700 dark:text-dark-100">
    Web sitemizde kullanılan çerezler ve benzeri teknolojilere ilişkin ayrıntılı bilgi için{' '}
    <HrefLink
     href="/cerez-politikasi"
     className={linkClass}
    >
     Çerez Politikası
    </HrefLink>{' '}
    sayfamızı inceleyebilirsiniz.
   </p>
  </LegalPage>
 );
}
