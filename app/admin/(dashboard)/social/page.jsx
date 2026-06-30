"use client";

import { formatPhoneDisplay } from "@/lib/contactPhone";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const emptyForm = {
 email: "",
 phoneDisplay: "",
 instagramUsername: "",
};

export default function AdminSocialPage() {
 const [form, setForm] = useState(emptyForm);

 useEffect(() => {
  fetchJson("/api/admin/social").then((data) => {
   setForm({
    ...data,
    phoneDisplay: formatPhoneDisplay(data.phoneDisplay || ""),
   });
  });
 }, []);

 function updateField(key, value) {
  setForm((prev) => ({
   ...prev,
   [key]: key === "phoneDisplay" ? formatPhoneDisplay(value) : value,
  }));
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
    <CardContent className="p-5 sm:p-6">
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="space-y-2">
       <Label htmlFor="email">E-posta</Label>
       <Input
        id="email"
        type="email"
        value={form.email}
        onChange={(e) => updateField("email", e.target.value)}
       />
      </div>

      <div className="space-y-2">
       <Label htmlFor="phoneDisplay">Telefon</Label>
       <Input
        id="phoneDisplay"
        value={form.phoneDisplay}
        onChange={(e) => updateField("phoneDisplay", e.target.value)}
        placeholder="0536 640 47 01"
       />
      </div>

      <div className="space-y-2">
       <Label htmlFor="instagramUsername">Instagram kullanıcı adı</Label>
       <Input
        id="instagramUsername"
        value={form.instagramUsername}
        onChange={(e) => updateField("instagramUsername", e.target.value)}
        placeholder="psikolognisademir"
       />
      </div>
     </div>
    </CardContent>
   </Card>

   <SaveButton onSave={save} />
  </div>
 );
}
