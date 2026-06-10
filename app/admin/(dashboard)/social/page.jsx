"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/app/admin/components/AdminNav";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminSocialPage() {
 const [form, setForm] = useState({
  email: "",
  instagramUsername: "",
  instagramUrl: "",
 });

 useEffect(() => {
  fetchJson("/api/admin/social").then(setForm);
 }, []);

 async function save() {
  await fetchJson("/api/admin/social", {
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
     <h2 className="font-serif text-3xl text-heading">Sosyal Medya</h2>
     <p className="text-body mt-2">E-posta ve Instagram bilgilerini düzenleyin.</p>
    </div>

    <Card>
     <CardContent className="p-6 space-y-4">
      <div className="space-y-2">
       <Label htmlFor="email">E-posta</Label>
       <Input
        id="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="instagramUsername">Instagram kullanıcı adı</Label>
       <Input
        id="instagramUsername"
        value={form.instagramUsername}
        onChange={(e) => setForm({ ...form, instagramUsername: e.target.value })}
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="instagramUrl">Instagram URL</Label>
       <Input
        id="instagramUrl"
        value={form.instagramUrl}
        onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
       />
      </div>
      <SaveButton onSave={save} />
     </CardContent>
    </Card>
   </div>
  </>
 );
}
