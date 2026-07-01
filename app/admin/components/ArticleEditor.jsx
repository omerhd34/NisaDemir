"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/app/admin/components/RichTextEditor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ImageUpload from "@/app/admin/components/ImageUpload";
import ConfirmDialog from "@/app/admin/components/ConfirmDialog";

const emptyArticle = {
 title: "",
 slug: "",
 image: "/",
 excerpt: "",
 content: "",
 writer: "",
 category: "Psikoloji",
};

function toFormState(article) {
 if (!article) return emptyArticle;

 return {
  title: article.title || "",
  slug: article.slug || "",
  image: article.image || "/",
  excerpt: article.excerpt || "",
  content: article.content || "",
  writer: article.writer || "",
  category: article.category || "Psikoloji",
 };
}

export default function AdminArticleEditPage({ articleId, initialArticle }) {
 const router = useRouter();
 const isNew = articleId === "new";
 const [form, setForm] = useState(() => toFormState(initialArticle));
 const [deleteOpen, setDeleteOpen] = useState(false);
 const [deleting, setDeleting] = useState(false);

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
  router.push("/admin/articles");
  router.refresh();
 }

 async function remove() {
  setDeleting(true);
  try {
   await fetchJson(`/api/admin/articles/${articleId}`, { method: "DELETE" });
   setDeleteOpen(false);
   router.push("/admin/articles");
   router.refresh();
  } catch (error) {
   toast.error(error.message || "Yazı silinemedi");
  } finally {
   setDeleting(false);
  }
 }

 return (
  <div className="space-y-6">
   <div className="flex items-start justify-between gap-4">
    <div>
     <h2 className="font-serif text-3xl text-heading">
      {isNew ? "Yeni Yazı" : "Yazıyı Düzenle"}
     </h2>
     <p className="text-body mt-2">Başlık, özet ve içerik alanlarını güncelleyin.</p>
    </div>
    {!isNew ? (
     <>
      <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
       <Trash2 />
       Sil
      </Button>
      <ConfirmDialog
       open={deleteOpen}
       onOpenChange={(open) => {
        if (deleting) return;
        setDeleteOpen(open);
       }}
       title="Yazıyı sil"
       description="Bu yazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
       confirmLabel="Evet, sil"
       onConfirm={remove}
       loading={deleting}
      />
     </>
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
       <Label>Kategori</Label>
       <Input
        value={form.category || ""}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="Boş bırakılırsa Psikoloji olarak kaydedilir"
       />
      </div>
      <div className="space-y-2">
       <Label>Yazar (opsiyonel)</Label>
       <Input value={form.writer || ""} onChange={(e) => setForm({ ...form, writer: e.target.value })} />
      </div>
     </div>
     <div className="space-y-2">
      <Label>Özet</Label>
      <Textarea
       rows={2}
       className="min-h-0"
       value={form.excerpt}
       onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
       placeholder="En fazla 25 kelime yazın. Kartlarda 3 satır olarak görünür."
      />
     </div>
     <div className="space-y-2">
      <Label>İçerik</Label>
      <p className="text-xs text-muted">
       Metnin bir bölümünü seçip stil uygulayabilirsiniz.
      </p>
      <RichTextEditor
       value={form.content}
       onChange={(content) => setForm({ ...form, content })}
      />
     </div>
     <ImageUpload
      label="Görsel"
      value={form.image}
      onChange={(url) => setForm({ ...form, image: url })}
      large
     />
     <SaveButton onSave={save} label={isNew ? "Oluştur" : "Kaydet"} />
    </CardContent>
   </Card>
  </div>
 );
}
