"use client";

import { useEffect, useState } from "react";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const emptyForm = {
 email: "",
 phoneDisplay: "",
 phoneTel: "",
 instagramUsername: "",
 instagramUrl: "",
};

export default function AdminSocialPage() {
 const [form, setForm] = useState(emptyForm);

 useEffect(() => {
  fetchJson("/api/admin/social").then(setForm);
 }, []);

 function updateField(key, value) {
  setForm((prev) => {
   const next = { ...prev, [key]: value };
   if (key === "instagramUsername" && !prev.instagramUrl) {
    const username = value.replace(/^@/, "").trim();
    if (username) {
     next.instagramUrl = `https://instagram.com/${username}`;
    }
   }
   return next;
  });
 }

 async function save() {
  await fetchJson("/api/admin/social", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(form),
  });
 }

 return (
  <div className="space-y-6">
   <div>
    <h2 className="font-serif text-3xl text-heading">İletişim</h2>
    <p className="text-body mt-2">
     E-posta, telefon ve sosyal medya bilgilerini düzenleyin. Bu bilgiler site genelinde
     görünür.
    </p>
   </div>

   <Card>
    <CardContent className="p-5 sm:p-6 space-y-5">
     <div className="space-y-2">
      <Label htmlFor="email">E-posta</Label>
      <Input
       id="email"
       type="email"
       value={form.email}
       onChange={(e) => updateField("email", e.target.value)}
      />
     </div>

     <div className="grid sm:grid-cols-2 gap-5">
      <div className="space-y-2">
       <Label htmlFor="phoneDisplay">Telefon (görünen)</Label>
       <Input
        id="phoneDisplay"
        value={form.phoneDisplay}
        onChange={(e) => updateField("phoneDisplay", e.target.value)}
        placeholder="0536 640 47 01"
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="phoneTel">Telefon (arama linki)</Label>
       <Input
        id="phoneTel"
        value={form.phoneTel}
        onChange={(e) => updateField("phoneTel", e.target.value)}
        placeholder="+905366404701"
       />
       <p className="text-xs text-muted">tel: ve WhatsApp linkleri bu değerden üretilir.</p>
      </div>
     </div>

     <div className="grid sm:grid-cols-2 gap-5">
      <div className="space-y-2">
       <Label htmlFor="instagramUsername">Instagram kullanıcı adı</Label>
       <Input
        id="instagramUsername"
        value={form.instagramUsername}
        onChange={(e) => updateField("instagramUsername", e.target.value)}
        placeholder="psikolognisademir"
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="instagramUrl">Instagram URL</Label>
       <Input
        id="instagramUrl"
        value={form.instagramUrl}
        onChange={(e) => updateField("instagramUrl", e.target.value)}
        placeholder="https://instagram.com/psikolognisademir"
       />
      </div>
     </div>
    </CardContent>
   </Card>

   <SaveButton onSave={save} />
  </div>
 );
}
