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
import ReactIcon from "@/app/components/ui/ReactIcon";
import { cn } from "@/lib/utils";

const emptyArea = () => ({
 title: "",
 description: "",
 icon: "LuUser",
 _key: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
});

function areaKey(area, index) {
 return String(area.id ?? area._key ?? index);
}

function areaPreview(area) {
 if (area.title?.trim()) return area.title.trim();
 if (area.description?.trim()) {
  const text = area.description.trim();
  return text.length > 72 ? `${text.slice(0, 72)}…` : text;
 }
 return "Başlık eklenmedi";
}

function areaMeta(area) {
 if (area.description?.trim() && area.title?.trim()) {
  const text = area.description.trim();
  return text.length > 56 ? `${text.slice(0, 56)}…` : text;
 }
 return area.icon?.trim() || "İkon seçilmedi";
}

export default function AdminWorkPage() {
 const [workAreas, setWorkAreas] = useState([]);
 const [openItems, setOpenItems] = useState([]);
 const [dragIndex, setDragIndex] = useState(null);
 const [overIndex, setOverIndex] = useState(null);
 const [savingOrder, setSavingOrder] = useState(false);

 useEffect(() => {
  fetchJson("/api/admin/work").then((data) => {
   setWorkAreas(data.workAreas || []);
  });
 }, []);

 function updateArea(index, field, value) {
  setWorkAreas((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
 }

 async function persistAreas(nextAreas, showToast = false) {
  const data = await fetchJson("/api/admin/work", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ workAreas: nextAreas }),
  });
  setWorkAreas(data.workAreas || nextAreas);
  if (showToast) toast.success("Sıra güncellendi.");
 }

 async function save() {
  await persistAreas(workAreas);
 }

 async function saveOrder(nextAreas) {
  setSavingOrder(true);
  try {
   await persistAreas(nextAreas, true);
  } catch (error) {
   toast.error(error.message || "Sıra kaydedilemedi");
   const data = await fetchJson("/api/admin/work");
   setWorkAreas(data.workAreas || []);
  } finally {
   setSavingOrder(false);
   setDragIndex(null);
   setOverIndex(null);
  }
 }

 function handleDrop(dropIndex) {
  if (dragIndex === null || dragIndex === dropIndex) return;

  const next = [...workAreas];
  const [moved] = next.splice(dragIndex, 1);
  next.splice(dropIndex, 0, moved);

  setWorkAreas(next);
  saveOrder(next);
 }

 function addArea() {
  const area = emptyArea();
  setWorkAreas((prev) => [...prev, area]);
  setOpenItems((prev) => [...prev, areaKey(area, workAreas.length)]);
 }

 function removeArea(index) {
  const key = areaKey(workAreas[index], index);
  setWorkAreas((prev) => prev.filter((_, i) => i !== index));
  setOpenItems((prev) => prev.filter((item) => item !== key));
 }

 return (
  <div className="space-y-6">
   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
    <div>
     <h2 className="font-serif text-3xl text-heading">Çalışma Alanları</h2>
     <p className="text-body mt-2 max-w-2xl">
      Terapi alanlarını ve açıklamalarını düzenleyin. Sıralamak için tutamacı sürükleyin,
      düzenlemek için satıra tıklayın.
     </p>
    </div>
    <Button variant="outline" className="shrink-0 self-start" onClick={addArea}>
     <Plus />
     Alan Ekle
    </Button>
   </div>

   {workAreas.length === 0 ? (
    <Card className="p-10 text-center">
     <p className="text-body">Henüz çalışma alanı yok. İlk alanı ekleyerek başlayın.</p>
     <Button variant="outline" className="mt-4" onClick={addArea}>
      <Plus />
      Alan Ekle
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
      {workAreas.map((area, index) => {
       const key = areaKey(area, index);

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
            aria-label={`${areaPreview(area)} alanını taşı`}
           >
            <GripVertical className="w-4 h-4" />
           </button>

           <AccordionTrigger className="col-start-2 min-w-0 py-0 px-2 sm:px-3 font-sans text-base hover:no-underline hover:text-heading [&>svg]:size-4 [&>svg]:text-muted [&>svg]:shrink-0">
            <span className="flex items-center gap-3 min-w-0 flex-1">
             <span className="inline-flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-900 text-primary dark:text-primary-dark-light">
              <ReactIcon name={area.icon} className="w-5 h-5" />
             </span>

             <span className="min-w-0 flex-1 text-left">
              <span className="block text-sm text-body truncate">{areaPreview(area)}</span>
              <span className="block text-xs text-muted truncate mt-0.5">{areaMeta(area)}</span>
             </span>
            </span>
           </AccordionTrigger>

           <Button
            variant="ghost"
            size="icon"
            className="col-start-3 shrink-0 justify-self-end text-muted hover:text-red-500 dark:hover:text-red-400"
            onClick={(event) => {
             event.stopPropagation();
             removeArea(index);
            }}
           >
            <Trash2 className="w-4 h-4" />
           </Button>
          </div>

          <AccordionContent className="border-t border-gray-100 dark:border-dark-500/40">
           <div className="px-4 sm:px-5 pb-5 pt-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label>Başlık</Label>
              <Input
               value={area.title}
               onChange={(e) => updateArea(index, "title", e.target.value)}
              />
             </div>
             <div className="space-y-2">
              <Label htmlFor={`icon-${index}`}>
               İkon{" "}
               <span className="text-muted font-normal">
                (
                <a
                 href="https://react-icons.github.io/react-icons/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="underline hover:text-heading"
                >
                 react-icons
                </a>
                )
               </span>
              </Label>
              <div className="flex items-center gap-3">
               <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-900 shrink-0 text-primary dark:text-primary-dark-light">
                <ReactIcon name={area.icon} className="w-5 h-5" />
               </span>
               <Input
                id={`icon-${index}`}
                value={area.icon}
                onChange={(e) => updateArea(index, "icon", e.target.value)}
                placeholder="Örn: LuUser"
               />
              </div>
             </div>
            </div>
            <div className="space-y-2">
             <Label>Açıklama</Label>
             <Textarea
              rows={6}
              value={area.description}
              onChange={(e) => updateArea(index, "description", e.target.value)}
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
