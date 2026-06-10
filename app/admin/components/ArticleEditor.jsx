"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/app/admin/components/AdminNav";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const emptyArticle = {
 title: "",
 slug: "",
 image: "/",
 excerpt: "",
 content: "",
 writer: "",
};

export default function AdminArticleEditPage({ articleId }) {
 const router = useRouter();
 const isNew = articleId === "new";
 const [form, setForm] = useState(emptyArticle);

 useEffect(() => {
  if (isNew) return;
  fetchJson(`/api/admin/articles/${articleId}`).then(setForm);
 }, [articleId, isNew]);

 async function save() {
  if (isNew) {
   const article = await fetchJson("/api/admin/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
   });
   router.push(`/admin/articles/${article.id}`);
   router.refresh();
   return;
  }

  await fetchJson(`/api/admin/articles/${articleId}`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(form),
  });
 }

 async function remove() {
  if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
  await fetchJson(`/api/admin/articles/${articleId}`, { method: "DELETE" });
  router.push("/admin/articles");
  router.refresh();
 }

 return (
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div className="flex items-start justify-between gap-4">
     <div>
      <h2 className="font-serif text-3xl text-heading">
       {isNew ? "Yeni Yazı" : "Yazıyı Düzenle"}
      </h2>
      <p className="text-body mt-2">Başlık, slug, özet ve içerik alanlarını güncelleyin.</p>
     </div>
     {!isNew ? (
      <Button variant="destructive" onClick={remove}>
       <Trash2 />
       Sil
      </Button>
     ) : null}
    </div>

    <Card>
     <CardContent className="p-6 space-y-4">
      <div className="space-y-2">
       <Label>Başlık</Label>
       <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
       <div className="space-y-2">
        <Label>Slug</Label>
        <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
       </div>
       <div className="space-y-2">
        <Label>Görsel yolu</Label>
        <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
       </div>
      </div>
      <div className="space-y-2">
       <Label>Yazar (opsiyonel)</Label>
       <Input value={form.writer || ""} onChange={(e) => setForm({ ...form, writer: e.target.value })} />
      </div>
      <div className="space-y-2">
       <Label>Özet</Label>
       <Textarea
        rows={3}
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
       />
      </div>
      <div className="space-y-2">
       <Label>İçerik</Label>
       <Textarea
        rows={16}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
       />
      </div>
      <SaveButton onSave={save} label={isNew ? "Oluştur" : "Kaydet"} />
     </CardContent>
    </Card>
   </div>
  </>
 );
}
