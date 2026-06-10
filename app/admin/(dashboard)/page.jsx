import Link from "next/link";
import AdminNav from "@/app/admin/components/AdminNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SECTIONS = [
 { href: "/admin/social", title: "Sosyal Medya", desc: "E-posta ve Instagram bilgileri" },
 { href: "/admin/home", title: "Ana Sayfa", desc: "Alıntılar, görseller ve kitap bilgileri" },
 { href: "/admin/about", title: "Hakkımda", desc: "Tanışalım sayfası metinleri" },
 { href: "/admin/work", title: "Çalışma Alanları", desc: "Terapi alanları ve açıklamalar" },
 { href: "/admin/articles", title: "Yazılar", desc: "Blog yazılarını ekle ve düzenle" },
 { href: "/admin/contact", title: "İletişim", desc: "Çalışma saatleri" },
];

export default function AdminDashboardPage() {
 return (
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div>
     <h2 className="font-serif text-3xl text-heading">Site İçeriği</h2>
     <p className="text-body mt-2">Aşağıdaki bölümlerden site verilerini düzenleyebilirsiniz.</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
     {SECTIONS.map((section) => (
      <Card key={section.href}>
       <CardContent className="p-6 flex flex-col h-full">
        <h3 className="font-serif text-xl text-heading">{section.title}</h3>
        <p className="text-sm text-body mt-2 flex-1">{section.desc}</p>
        <Button asChild variant="outline" className="mt-4 self-start">
         <Link href={section.href}>
          Düzenle
          <ArrowRight />
         </Link>
        </Button>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>
  </>
 );
}
