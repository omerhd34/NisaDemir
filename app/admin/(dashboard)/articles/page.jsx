"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNav from "@/app/admin/components/AdminNav";
import { fetchJson } from "@/app/admin/components/AdminForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";

export default function AdminArticlesPage() {
 const [articles, setArticles] = useState([]);

 useEffect(() => {
  fetchJson("/api/admin/articles").then((data) => setArticles(data.articles || []));
 }, []);

 return (
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div className="flex items-start justify-between gap-4">
     <div>
      <h2 className="font-serif text-3xl text-heading">Yazılar</h2>
      <p className="text-body mt-2">Blog yazılarını ekleyin veya düzenleyin.</p>
     </div>
     <Button asChild>
      <Link href="/admin/articles/new">
       <Plus />
       Yeni Yazı
      </Link>
     </Button>
    </div>

    <div className="space-y-3">
     {articles.map((article) => (
      <Card key={article.id}>
       <CardContent className="p-5 flex items-center justify-between gap-4">
        <div>
         <h3 className="font-medium text-heading">{article.title}</h3>
         <p className="text-sm text-muted mt-1">/{article.slug}</p>
        </div>
        <Button asChild variant="outline" size="sm">
         <Link href={`/admin/articles/${article.id}`}>
          <Pencil />
          Düzenle
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
