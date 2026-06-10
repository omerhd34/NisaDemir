"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/app/admin/components/AdminNav";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

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
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div>
     <h2 className="font-serif text-3xl text-heading">Hakkımda</h2>
     <p className="text-body mt-2">Tanışalım sayfasındaki üç metin bloğunu düzenleyin.</p>
    </div>

    <Card>
     <CardContent className="p-6 space-y-4">
      {["text1", "text2", "text3"].map((key, index) => (
       <div key={key} className="space-y-2">
        <Label htmlFor={key}>Metin {index + 1}</Label>
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
  </>
 );
}
