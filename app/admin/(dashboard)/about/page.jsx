"use client";

import { useEffect, useState } from "react";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const ABOUT_FIELDS = [
 { key: "text1", label: "Eğitim" },
 { key: "text2", label: "Süpervizyon ve Eğitimler" },
 { key: "text3", label: "Bugün" },
];

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
     <p className="text-body mt-2">Tanışalım sayfasındaki üç metin bloğunu düzenleyin.</p>
    </div>

    <Card>
     <CardContent className="p-6 space-y-4">
      {ABOUT_FIELDS.map(({ key, label }) => (
       <div key={key} className="space-y-2">
        <Label htmlFor={key}>{label}</Label>
        <Textarea
         id={key}
         rows={6}
         value={form[key]}
         onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
       </div>
      ))}
      <SaveButton onSave={save} />
     </CardContent>
    </Card>
  </div>
 );
}
