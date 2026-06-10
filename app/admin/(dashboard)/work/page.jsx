"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/app/admin/components/AdminNav";
import SaveButton, { fetchJson } from "@/app/admin/components/AdminForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const emptyArea = () => ({ title: "", description: "", icon: "User" });

export default function AdminWorkPage() {
 const [subtitle, setSubtitle] = useState("");
 const [workAreas, setWorkAreas] = useState([]);

 useEffect(() => {
  fetchJson("/api/admin/work").then((data) => {
   setSubtitle(data.subtitle || "");
   setWorkAreas(data.workAreas || []);
  });
 }, []);

 function updateArea(index, field, value) {
  setWorkAreas((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
 }

 async function save() {
  await fetchJson("/api/admin/work", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ subtitle, workAreas }),
  });
 }

 return (
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div className="flex items-start justify-between gap-4">
     <div>
      <h2 className="font-serif text-3xl text-heading">Çalışma Alanları</h2>
      <p className="text-body mt-2">Terapi alanlarını ve açıklamalarını düzenleyin.</p>
     </div>
     <Button variant="outline" onClick={() => setWorkAreas([...workAreas, emptyArea()])}>
      <Plus />
      Alan Ekle
     </Button>
    </div>

    <Card>
     <CardContent className="p-6 space-y-2">
      <Label>Alt başlık</Label>
      <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
     </CardContent>
    </Card>

    <div className="space-y-4">
     {workAreas.map((area, index) => (
      <Card key={index}>
       <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
         <h3 className="font-medium text-heading">Alan {index + 1}</h3>
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
          <Label>İkon (User, Video, Headphones, Users, Brain)</Label>
          <Input
           value={area.icon}
           onChange={(e) => updateArea(index, "icon", e.target.value)}
          />
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
  </>
 );
}
