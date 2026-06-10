"use client";

import { useEffect, useState } from "react";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";

const ABOUT_FIELDS = [
 { key: "text1", label: "Eğitim" },
 { key: "text2", label: "Süpervizyon ve Eğitimler" },
 { key: "text3", label: "Bugün" },
];

function textPreview(value) {
 if (!value?.trim()) return "Metin eklenmedi";
 const text = value.trim();
 return text.length > 96 ? `${text.slice(0, 96)}…` : text;
}

export default function AdminAboutPage() {
 const [form, setForm] = useState({ text1: "", text2: "", text3: "" });

 useEffect(() => {
  fetchJson("/api/admin/about").then(setForm);
 }, []);

 async function save() {
  await fetchJson("/api/admin/about", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(form),
  });
 }

 return (
  <div className="space-y-6">
   <div>
    <h2 className="font-serif text-3xl text-heading">Hakkımda</h2>
    <p className="text-body mt-2">
     Tanışalım sayfasındaki metin bloklarını düzenleyin. Düzenlemek için başlığa tıklayın.
    </p>
   </div>

   <Accordion type="multiple" defaultValue={[]} className="space-y-3">
    {ABOUT_FIELDS.map(({ key, label }) => (
     <AccordionItem key={key} value={key} className="border-0">
      <Card className="overflow-hidden">
       <AccordionTrigger className="px-4 sm:px-5 py-4 font-sans text-base hover:no-underline hover:text-heading [&>svg]:size-4 [&>svg]:text-muted">
        <span className="min-w-0 flex-1 text-left">
         <span className="block text-sm font-medium text-heading">{label}</span>
         <span className="block text-sm text-muted truncate mt-0.5 font-normal">
          {textPreview(form[key])}
         </span>
        </span>
       </AccordionTrigger>

       <AccordionContent className="border-t border-gray-100 dark:border-dark-500/40">
        <div className="px-4 sm:px-5 pb-5 pt-4 space-y-2">
         <Label htmlFor={key}>{label}</Label>
         <Textarea
          id={key}
          rows={6}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
         />
        </div>
       </AccordionContent>
      </Card>
     </AccordionItem>
    ))}
   </Accordion>

   <SaveButton onSave={save} />
  </div>
 );
}
