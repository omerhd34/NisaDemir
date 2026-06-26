'use client';

import { useEffect } from 'react';
import ErrorPage from '@/app/components/ui/ErrorPage';
import { Button } from '@/components/ui/button';
import HrefLink from '@/components/ui/HrefLink';

export default function AdminError({ error, reset }) {
 useEffect(() => {
  console.error(error);
 }, [error]);

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center">
   <ErrorPage
    code="500"
    title="Admin panelinde hata oluştu"
    description="İşlem sırasında beklenmeyen bir sorun oluştu. Tekrar deneyebilir veya panele dönebilirsiniz."
    compact
    links={[]}
   >
    <Button onClick={reset}>Tekrar Dene</Button>
    <Button variant="outline" asChild>
     <HrefLink href="/admin">Panele Dön</HrefLink>
    </Button>
    <Button variant="ghost" asChild>
     <HrefLink href="/">Siteye Dön</HrefLink>
    </Button>
   </ErrorPage>
  </div>
 );
}
