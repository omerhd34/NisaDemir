"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/app/admin/components/AdminNav";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AdminContactPage() {
 const [workingHours, setWorkingHours] = useState([""]);

 useEffect(() => {
  fetchJson("/api/admin/contact").then((data) => {
   setWorkingHours(data.workingHours?.length ? data.workingHours : [""]);
  });
 }, []);

 function updateHour(index, value) {
  setWorkingHours((prev) => prev.map((item, i) => (i === index ? value : item)));
 }

 async function save() {
  await fetchJson("/api/admin/contact", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ workingHours: workingHours.filter(Boolean) }),
  });
 }

 return (
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div className="flex items-start justify-between gap-4">
     <div>
      <h2 className="font-serif text-3xl text-heading">İletişim</h2>
      <p className="text-body mt-2">Footer ve iletişim sayfasında görünen çalışma saatlerini düzenleyin.</p>
     </div>
     <Button variant="outline" onClick={() => setWorkingHours([...workingHours, ""])}>
      <Plus />
      Saat Ekle
     </Button>
    </div>

    <Card>
     <CardContent className="p-6 space-y-4">
      {workingHours.map((hour, index) => (
       <div key={index} className="flex gap-3">
        <Input
         value={hour}
         onChange={(e) => updateHour(index, e.target.value)}
         placeholder="10:00 - 20:00"
        />
        <Button
         variant="ghost"
         size="icon"
         onClick={() => setWorkingHours(workingHours.filter((_, i) => i !== index))}
        >
         <Trash2 className="w-4 h-4" />
        </Button>
       </div>
      ))}
      <SaveButton onSave={save} />
     </CardContent>
    </Card>
   </div>
  </>
 );
}
