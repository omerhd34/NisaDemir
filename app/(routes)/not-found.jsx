import ErrorPage, { HomeButton } from '@/app/components/ui/ErrorPage';

export const metadata = {
 title: 'Sayfa Bulunamadı',
 robots: { index: false, follow: false },
};

export default function RouteNotFound() {
 return (
  <ErrorPage
   code="404"
   title="Sayfa bulunamadı"
   description="Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Adresi kontrol edip tekrar deneyebilirsiniz."
  >
   <HomeButton />
  </ErrorPage>
 );
}
