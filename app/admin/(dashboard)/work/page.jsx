"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import ReactIcon from "@/app/components/ui/ReactIcon";
import { cn } from "@/lib/utils";

const emptyArea = () => ({ title: "", description: "", icon: "LuUser" });

export default function AdminWorkPage() {
 const [workAreas, setWorkAreas] = useState([]);
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

 return (
  <div className="space-y-6">
   <div className="flex items-start justify-between gap-4">
    <div>
     <h2 className="font-serif text-3xl text-heading">Çalışma Alanları</h2>
     <p className="text-body mt-2">
      Terapi alanlarını ve açıklamalarını düzenleyin. Sıralamak için alanları sürükleyip bırakın.
     </p>
    </div>
    <Button variant="outline" onClick={() => setWorkAreas([...workAreas, emptyArea()])}>
     <Plus />
     Alan Ekle
    </Button>
   </div>

   <div className={cn("space-y-4", savingOrder && "opacity-70 pointer-events-none")}>
    {workAreas.map((area, index) => (
     <Card
      key={area.id ?? `area-${index}`}
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
      <CardContent className="p-6 space-y-4">
       <div className="flex items-center gap-3">
        <button
         type="button"
         draggable
         onDragStart={() => setDragIndex(index)}
         onDragEnd={() => {
          setDragIndex(null);
          setOverIndex(null);
         }}
         className="inline-flex items-center justify-center size-9 rounded-lg text-muted hover:text-heading hover:bg-gray-100 dark:hover:bg-dark-700 cursor-grab active:cursor-grabbing shrink-0"
         aria-label={`Alan ${index + 1} konumunu değiştir`}
        >
         <GripVertical className="w-4 h-4" />
        </button>
        <h3 className="font-medium text-heading flex-1">Alan {index + 1}</h3>
        <Button
         variant="ghost"
         size="icon"
         onClick={() => setWorkAreas(workAreas.filter((_, i) => i !== index))}
        >
         <Trash2 className="w-4 h-4" />
        </Button>
       </div>
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
           placeholder="Örn: Bs0Square"
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
      </CardContent>
     </Card>
    ))}
   </div>

   <SaveButton onSave={save} />
  </div>
 );
}
