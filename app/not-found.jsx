import { AppProvider } from '@/context/AppContext';
import Header from '@/app/components/ui/Header';
import Footer from '@/app/components/ui/Footer';
import ScrollToTop from '@/app/components/ui/ScrollToTop';
import SiteJsonLd from '@/app/components/seo/SiteJsonLd';
import ErrorPage, { HomeButton } from '@/app/components/ui/ErrorPage';

export const metadata = {
 title: 'Sayfa Bulunamadı',
 robots: { index: false, follow: false },
};

export default function NotFound() {
 return (
  <>
   <SiteJsonLd />
   <AppProvider>
    <div className="min-h-screen flex flex-col">
     <Header />
     <main className="flex-1">
      <ErrorPage
       code="404"
       title="Sayfa bulunamadı"
       description="Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Adresi kontrol edip tekrar deneyebilirsiniz."
      >
       <HomeButton />
      </ErrorPage>
     </main>
     <Footer />
     <ScrollToTop />
    </div>
   </AppProvider>
  </>
 );
}
