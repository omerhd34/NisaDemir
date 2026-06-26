'use client';

import { useEffect } from 'react';
import ErrorPage from '@/app/components/ui/ErrorPage';
import { Button } from '@/components/ui/button';
import HrefLink from '@/components/ui/HrefLink';

export default function RouteError({ error, reset }) {
 useEffect(() => {
  console.error(error);
 }, [error]);

 return (
  <ErrorPage
   code="500"
   title="Bir şeyler ters gitti"
   description="Beklenmeyen bir hata oluştu. Lütfen biraz sonra tekrar deneyin veya ana sayfaya dönün."
   links={[]}
  >
   <Button onClick={reset}>Tekrar Dene</Button>
   <Button variant="outline" asChild>
    <HrefLink href="/">Ana Sayfaya Dön</HrefLink>
   </Button>
  </ErrorPage>
 );
}
