"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
import ImageUpload from "@/app/admin/components/ImageUpload";
import { cn } from "@/lib/utils";

const emptyQuote = () => ({
 text: "",
 title: "",
 book: "",
 image: "",
 _key: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
});

function quoteKey(quote, index) {
 return String(quote.id ?? quote._key ?? index);
}

function hasImage(value) {
 return Boolean(value && value !== "/");
}

function quotePreview(quote) {
 if (quote.text?.trim()) {
  const text = quote.text.trim();
  return text.length > 72 ? `${text.slice(0, 72)}…` : text;
 }
 return "Alıntı metni eklenmedi";
}

function quoteMeta(quote) {
 const parts = [quote.title?.trim(), quote.book?.trim()].filter(Boolean);
 return parts.length ? parts.join(" - ") : "Yazar ve kitap bilgisi yok";
}

export default function AdminHomePage() {
 const [quotes, setQuotes] = useState([]);
 const [openItems, setOpenItems] = useState([]);
 const [dragIndex, setDragIndex] = useState(null);
 const [overIndex, setOverIndex] = useState(null);
 const [savingOrder, setSavingOrder] = useState(false);

 useEffect(() => {
  fetchJson("/api/admin/home").then((data) => setQuotes(data.quotes || []));
 }, []);

 function updateQuote(index, field, value) {
  setQuotes((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
 }

 async function persistQuotes(nextQuotes, showToast = false) {
  const data = await fetchJson("/api/admin/home", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ quotes: nextQuotes }),
  });
  setQuotes(data.quotes || nextQuotes);
  if (showToast) toast.success("Sıra güncellendi.");
 }

 async function save() {
  await persistQuotes(quotes);
 }

 async function saveOrder(nextQuotes) {
  setSavingOrder(true);
  try {
   await persistQuotes(nextQuotes, true);
  } catch (error) {
   toast.error(error.message || "Sıra kaydedilemedi");
   const data = await fetchJson("/api/admin/home");
   setQuotes(data.quotes || []);
  } finally {
   setSavingOrder(false);
   setDragIndex(null);
   setOverIndex(null);
  }
 }

 function handleDrop(dropIndex) {
  if (dragIndex === null || dragIndex === dropIndex) return;

  const next = [...quotes];
  const [moved] = next.splice(dragIndex, 1);
  next.splice(dropIndex, 0, moved);

  setQuotes(next);
  saveOrder(next);
 }

 function addQuote() {
  const quote = emptyQuote();
  setQuotes((prev) => [...prev, quote]);
  setOpenItems((prev) => [...prev, quoteKey(quote, quotes.length)]);
 }

 function removeQuote(index) {
  const key = quoteKey(quotes[index], index);
  setQuotes((prev) => prev.filter((_, i) => i !== index));
  setOpenItems((prev) => prev.filter((item) => item !== key));
 }

 return (
  <div className="space-y-6">
   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
    <div>
     <h2 className="font-serif text-3xl text-heading">Ana Sayfa Alıntıları</h2>
     <p className="text-body mt-2 max-w-2xl">
      Sözler bölümündeki alıntıları düzenleyin. Sıralamak için tutamacı sürükleyin,
      düzenlemek için satıra tıklayın.
     </p>
    </div>
    <Button variant="outline" className="shrink-0 self-start" onClick={addQuote}>
     <Plus />
     Alıntı Ekle
    </Button>
   </div>

   {quotes.length === 0 ? (
    <Card className="p-10 text-center">
     <p className="text-body">Henüz alıntı yok. İlk alıntıyı ekleyerek başlayın.</p>
     <Button variant="outline" className="mt-4" onClick={addQuote}>
      <Plus />
      Alıntı Ekle
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
      {quotes.map((quote, index) => {
       const key = quoteKey(quote, index);

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
            aria-label={`Alıntı ${index + 1} konumunu değiştir`}
           >
            <GripVertical className="w-4 h-4" />
           </button>

           <AccordionTrigger className="col-start-2 min-w-0 py-0 px-2 sm:px-3 font-sans text-base hover:no-underline hover:text-heading [&>svg]:size-4 [&>svg]:text-muted [&>svg]:shrink-0">
            <span className="flex items-center gap-3 min-w-0 flex-1">
             {hasImage(quote.image) ? (
              <span className="relative size-11 sm:size-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-900">
               <Image
                src={quote.image}
                alt=""
                fill
                className="object-cover"
                unoptimized
               />
              </span>
             ) : (
              <span className="inline-flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-200 dark:border-dark-500 text-[0.65rem] uppercase tracking-wide text-muted">
               Görsel
              </span>
             )}

             <span className="min-w-0 flex-1 text-left">
              <span className="block text-sm text-body truncate">{quotePreview(quote)}</span>
              <span className="block text-xs text-muted truncate mt-0.5">{quoteMeta(quote)}</span>
             </span>
            </span>
           </AccordionTrigger>

           <Button
            variant="ghost"
            size="icon"
            className="col-start-3 shrink-0 justify-self-end text-muted hover:text-red-500 dark:hover:text-red-400"
            onClick={(event) => {
             event.stopPropagation();
             removeQuote(index);
            }}
           >
            <Trash2 className="w-4 h-4" />
           </Button>
          </div>

          <AccordionContent className="border-t border-gray-100 dark:border-dark-500/40">
           <div className="px-4 sm:px-5 pb-5 pt-4 space-y-4">
            <div className="space-y-2">
             <Label>Alıntı metni</Label>
             <Textarea
              rows={3}
              value={quote.text}
              onChange={(e) => updateQuote(index, "text", e.target.value)}
             />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label>Yazar</Label>
              <Input
               value={quote.title}
               onChange={(e) => updateQuote(index, "title", e.target.value)}
              />
             </div>
             <div className="space-y-2">
              <Label>Kitap</Label>
              <Input
               value={quote.book}
               onChange={(e) => updateQuote(index, "book", e.target.value)}
              />
             </div>
            </div>
            <ImageUpload
             label="Görsel"
             value={quote.image}
             onChange={(url) => updateQuote(index, "image", url)}
            />
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
