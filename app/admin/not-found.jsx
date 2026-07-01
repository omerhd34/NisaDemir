import ErrorPage from '@/app/components/ui/ErrorPage';
import { Button } from '@/components/ui/button';
import HrefLink from '@/components/ui/HrefLink';

export const metadata = {
 title: 'Sayfa Bulunamadı',
 robots: { index: false, follow: false },
};

export default function AdminNotFound() {
 return (
  <ErrorPage
   className="min-h-screen py-0"
   code="404"
   title="Admin sayfası bulunamadı"
   description="Erişmeye çalıştığınız yönetim paneli sayfası mevcut değil."
   compact
   links={[]}
  >
   <Button asChild>
    <HrefLink href="/admin">Panele Dön</HrefLink>
   </Button>
   <Button variant="outline" asChild>
    <HrefLink href="/">Siteye Dön</HrefLink>
   </Button>
  </ErrorPage>
 );
}
