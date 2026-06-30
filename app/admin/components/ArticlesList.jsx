"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { fetchJson } from "@/app/admin/components/AdminForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArticlesList({ initialArticles }) {
 const [articles, setArticles] = useState(initialArticles);
 const [dragIndex, setDragIndex] = useState(null);
 const [overIndex, setOverIndex] = useState(null);
 const [saving, setSaving] = useState(false);

 async function saveOrder(nextArticles) {
  setSaving(true);
  try {
   const data = await fetchJson("/api/admin/articles", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order: nextArticles.map((article) => article.id) }),
   });
   setArticles(data.articles || nextArticles);
   toast.success("Sıra güncellendi.");
  } catch (error) {
   toast.error(error.message || "Sıra kaydedilemedi");
  } finally {
   setSaving(false);
   setDragIndex(null);
   setOverIndex(null);
  }
 }

 function handleDrop(dropIndex) {
  if (dragIndex === null || dragIndex === dropIndex) return;

  const next = [...articles];
  const [moved] = next.splice(dragIndex, 1);
  next.splice(dropIndex, 0, moved);

  setArticles(next);
  saveOrder(next);
 }

 return (
  <div className="space-y-6">
   <div className="flex items-start justify-between gap-4">
    <div>
     <h2 className="font-serif text-3xl text-heading">Yazılar</h2>
     <p className="text-body mt-2">
      Blog yazılarını ekleyin veya düzenleyin. Sıralamak için satırları sürükleyip bırakın.
     </p>
    </div>
    <Button asChild>
     <Link href="/admin/articles/new">
      <Plus />
      Yeni Yazı
     </Link>
    </Button>
   </div>

   {articles.length === 0 ? (
    <Card className="p-10 text-center">
     <p className="text-body">Henüz yazı yok. İlk yazınızı ekleyerek başlayın.</p>
     <Button asChild variant="outline" className="mt-4">
      <Link href="/admin/articles/new">
       <Plus />
       Yeni Yazı
      </Link>
     </Button>
    </Card>
   ) : (
    <div className={cn("space-y-3", saving && "opacity-70 pointer-events-none")}>
     {articles.map((article, index) => (
      <Card
       key={article.id}
       onDragOver={(event) => {
        event.preventDefault();
        setOverIndex(index);
       }}
       onDragLeave={() => setOverIndex(null)}
       onDrop={() => handleDrop(index)}
       className={cn(
        "transition-all",
        dragIndex === index && "opacity-40",
        overIndex === index && dragIndex !== null && dragIndex !== index && "ring-2 ring-primary/40 dark:ring-primary-dark/40"
       )}
      >
       <CardContent className="p-5 flex items-center gap-3">
        <button
         type="button"
         draggable
         onDragStart={() => setDragIndex(index)}
         onDragEnd={() => {
          setDragIndex(null);
          setOverIndex(null);
         }}
         className="inline-flex items-center justify-center size-9 rounded-lg text-muted hover:text-heading hover:bg-gray-100 dark:hover:bg-dark-700 cursor-grab active:cursor-grabbing shrink-0"
         aria-label={`${article.title} yazısını taşı`}
        >
         <GripVertical className="w-4 h-4" />
        </button>

        <h3 className="font-medium text-heading flex-1 min-w-0">{article.title}</h3>

        <Button asChild variant="outline" size="sm" className="shrink-0">
         <Link href={`/admin/articles/${article.id}`}>
          <Pencil />
          Düzenle
         </Link>
        </Button>
       </CardContent>
      </Card>
     ))}
    </div>
   )}
  </div>
 );
}
