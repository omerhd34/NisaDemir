"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, GripVertical } from "lucide-react";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {
 createUniqueCategorySlug,
 getFaqCategoryTitle,
} from "@/lib/faqCategories";
import { cn } from "@/lib/utils";

function emptyItem(categorySlug = "") {
 return {
  question: "",
  answer: "",
  category: categorySlug,
  _key: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
 };
}

function itemKey(item, index) {
 return String(item.id ?? item._key ?? index);
}

function itemPreview(item) {
 if (item.question?.trim()) return item.question.trim();
 if (item.answer?.trim()) {
  const text = item.answer.trim();
  return text.length > 72 ? `${text.slice(0, 72)}…` : text;
 }
 return "Soru eklenmedi";
}

export default function AdminFaqPage() {
 const [items, setItems] = useState([]);
 const [categories, setCategories] = useState([]);
 const [newCategoryTitle, setNewCategoryTitle] = useState("");
 const [openItems, setOpenItems] = useState([]);
 const [dragIndex, setDragIndex] = useState(null);
 const [overIndex, setOverIndex] = useState(null);
 const [savingOrder, setSavingOrder] = useState(false);

 useEffect(() => {
  fetchJson("/api/admin/faq").then((data) => {
   setItems(data.items || []);
   setCategories(data.categories || []);
  });
 }, []);

 function updateItem(index, field, value) {
  setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
 }

 function updateCategory(index, field, value) {
  setCategories((prev) =>
   prev.map((category, i) => (i === index ? { ...category, [field]: value } : category))
  );
 }

 async function persistAll(nextItems, nextCategories, showToast = false) {
  const data = await fetchJson("/api/admin/faq", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ items: nextItems, categories: nextCategories }),
  });
  setItems(data.items || nextItems);
  setCategories(data.categories || nextCategories);
  if (showToast) toast.success("Sıra güncellendi.");
 }

 async function save() {
  await persistAll(items, categories);
 }

 async function saveOrder(nextItems) {
  setSavingOrder(true);
  try {
   await persistAll(nextItems, categories, true);
  } catch (error) {
   toast.error(error.message || "Sıra kaydedilemedi");
   const data = await fetchJson("/api/admin/faq");
   setItems(data.items || []);
   setCategories(data.categories || []);
  } finally {
   setSavingOrder(false);
   setDragIndex(null);
   setOverIndex(null);
  }
 }

 function handleDrop(dropIndex) {
  if (dragIndex === null || dragIndex === dropIndex) return;

  const next = [...items];
  const [moved] = next.splice(dragIndex, 1);
  next.splice(dropIndex, 0, moved);

  setItems(next);
  saveOrder(next);
 }

 function addCategory() {
  const title = newCategoryTitle.trim();
  if (!title) {
   toast.error("Kategori adı girin.");
   return;
  }

  const slug = createUniqueCategorySlug(title, categories);
  setCategories((prev) => [...prev, { slug, title }]);
  setNewCategoryTitle("");
  toast.success("Kategori eklendi. Kaydetmeyi unutmayın.");
 }

 function removeCategory(slug) {
  if (categories.length <= 1) {
   toast.error("En az bir kategori olmalı.");
   return;
  }

  const fallback = categories.find((cat) => cat.slug !== slug)?.slug || "";
  setCategories((prev) => prev.filter((cat) => cat.slug !== slug));
  setItems((prev) =>
   prev.map((item) => (item.category === slug ? { ...item, category: fallback } : item))
  );
 }

 function addItem() {
  const item = emptyItem(categories[0]?.slug || "");
  setItems((prev) => [...prev, item]);
  setOpenItems((prev) => [...prev, itemKey(item, items.length)]);
 }

 function removeItem(index) {
  const key = itemKey(items[index], index);
  setItems((prev) => prev.filter((_, i) => i !== index));
  setOpenItems((prev) => prev.filter((item) => item !== key));
 }

 function itemMeta(item) {
  if (item.question?.trim()) {
   return getFaqCategoryTitle(item.category, categories);
  }
  if (item.answer?.trim()) {
   const text = item.answer.trim();
   return text.length > 56 ? `${text.slice(0, 56)}…` : text;
  }
  return "Cevap eklenmedi";
 }

 return (
  <div className="space-y-6">
   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
    <div>
     <h2 className="font-serif text-3xl text-heading">Sıkça Sorulan Sorular</h2>
     <p className="text-body mt-2 max-w-2xl">
      Kategorileri ve soruları düzenleyin. Sıralamak için tutamacı sürükleyin,
      düzenlemek için satıra tıklayın.
     </p>
    </div>
    <Button variant="outline" className="shrink-0 self-start" onClick={addItem}>
     <Plus />
     Soru Ekle
    </Button>
   </div>

   <Card className="p-5 sm:p-6 space-y-4">
    <div>
     <h3 className="font-serif text-xl text-heading">Kategoriler</h3>
     <p className="text-sm text-body mt-1">
      SSS sayfasında görünecek kategori başlıklarını yönetin.
     </p>
    </div>

    {categories.length === 0 ? (
     <p className="text-sm text-body">Henüz kategori yok. Aşağıdan ekleyin.</p>
    ) : (
     <div className="space-y-2">
      {categories.map((category, index) => (
       <div
        key={category.slug}
        className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 items-center"
       >
        <Input
         value={category.title}
         onChange={(e) => updateCategory(index, "title", e.target.value)}
         placeholder="Kategori adı"
        />
        <Button
         variant="ghost"
         size="icon"
         className="shrink-0 text-muted hover:text-red-500 dark:hover:text-red-400"
         onClick={() => removeCategory(category.slug)}
         aria-label={`${category.title} kategorisini sil`}
        >
         <Trash2 className="w-4 h-4" />
        </Button>
       </div>
      ))}
     </div>
    )}

    <div className="flex flex-col sm:flex-row gap-2">
     <Input
      value={newCategoryTitle}
      onChange={(e) => setNewCategoryTitle(e.target.value)}
      placeholder="Yeni kategori adı"
      onKeyDown={(e) => {
       if (e.key === "Enter") {
        e.preventDefault();
        addCategory();
       }
      }}
     />
     <Button variant="outline" className="shrink-0" onClick={addCategory}>
      <Plus />
      Kategori Ekle
     </Button>
    </div>
   </Card>

   {items.length === 0 ? (
    <Card className="p-10 text-center">
     <p className="text-body">Henüz soru yok. İlk soruyu ekleyerek başlayın.</p>
     <Button variant="outline" className="mt-4" onClick={addItem}>
      <Plus />
      Soru Ekle
     </Button>
    </Card>
   ) : (
    <div className={cn(savingOrder && "opacity-70 pointer-events-none")}>
     <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="space-y-3"
     >
      {items.map((item, index) => {
       const key = itemKey(item, index);

       return (
        <AccordionItem key={key} value={key} className="border-0">
         <Card
          onDragOver={(event) => {
           event.preventDefault();
           setOverIndex(index);
          }}
          onDragLeave={() => setOverIndex(null)}
          onDrop={() => handleDrop(index)}
          className={cn(
           "overflow-hidden transition-all",
           dragIndex === index && "opacity-40",
           overIndex === index &&
           dragIndex !== null &&
           dragIndex !== index &&
           "ring-2 ring-primary/40 dark:ring-primary-dark/40"
          )}
         >
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 w-full">
           <button
            type="button"
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragEnd={() => {
             setDragIndex(null);
             setOverIndex(null);
            }}
            className="inline-flex items-center justify-center size-10 rounded-lg text-muted hover:text-heading hover:bg-gray-100 dark:hover:bg-dark-700 cursor-grab active:cursor-grabbing shrink-0 self-center"
            aria-label={`${itemPreview(item)} sorusunu taşı`}
           >
            <GripVertical className="w-4 h-4" />
           </button>

           <AccordionTrigger className="col-start-2 min-w-0 py-0 px-2 sm:px-3 font-sans text-base hover:no-underline hover:text-heading [&>svg]:size-4 [&>svg]:text-muted [&>svg]:shrink-0">
            <span className="min-w-0 flex-1 text-left">
             <span className="block text-sm font-medium text-heading truncate">{itemPreview(item)}</span>
             <span className="block text-xs text-muted truncate mt-0.5 font-normal">{itemMeta(item)}</span>
            </span>
           </AccordionTrigger>

           <Button
            variant="ghost"
            size="icon"
            className="col-start-3 shrink-0 justify-self-end text-muted hover:text-red-500 dark:hover:text-red-400"
            onClick={(event) => {
             event.stopPropagation();
             removeItem(index);
            }}
           >
            <Trash2 className="w-4 h-4" />
           </Button>
          </div>

          <AccordionContent className="border-t border-gray-100 dark:border-dark-500/40">
           <div className="px-4 sm:px-5 pb-5 pt-4 space-y-4">
            <div className="space-y-2">
             <Label>Kategori</Label>
             {categories.length === 0 ? (
              <p className="text-sm text-body">Önce bir kategori ekleyin.</p>
             ) : (
              <Select
               value={item.category || categories[0]?.slug}
               onValueChange={(value) => updateItem(index, "category", value)}
              >
               <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
               </SelectTrigger>
               <SelectContent>
                {categories.map((category) => (
                 <SelectItem key={category.slug} value={category.slug}>
                  {category.title}
                 </SelectItem>
                ))}
               </SelectContent>
              </Select>
             )}
            </div>
            <div className="space-y-2">
             <Label>Soru</Label>
             <Input
              value={item.question}
              onChange={(e) => updateItem(index, "question", e.target.value)}
             />
            </div>
            <div className="space-y-2">
             <Label>Cevap</Label>
             <Textarea
              rows={6}
              value={item.answer}
              onChange={(e) => updateItem(index, "answer", e.target.value)}
             />
            </div>
           </div>
          </AccordionContent>
         </Card>
        </AccordionItem>
       );
      })}
     </Accordion>
    </div>
   )}

   <SaveButton onSave={save} />
  </div>
 );
}
