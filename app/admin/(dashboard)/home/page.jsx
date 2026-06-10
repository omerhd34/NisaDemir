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

const emptyQuote = () => ({ text: "", title: "", book: "", image: "" });

export default function AdminHomePage() {
 const [quotes, setQuotes] = useState([]);

 useEffect(() => {
  fetchJson("/api/admin/home").then((data) => setQuotes(data.quotes || []));
 }, []);

 function updateQuote(index, field, value) {
  setQuotes((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
 }

 async function save() {
  await fetchJson("/api/admin/home", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ quotes }),
  });
 }

 return (
  <>
   <AdminNav />
   <div className="flex-1 space-y-6">
    <div className="flex items-start justify-between gap-4">
     <div>
      <h2 className="font-serif text-3xl text-heading">Ana Sayfa Alıntıları</h2>
      <p className="text-body mt-2">Dinlemenin sanatı bölümündeki alıntıları düzenleyin.</p>
     </div>
     <Button variant="outline" onClick={() => setQuotes([...quotes, emptyQuote()])}>
      <Plus />
      Alıntı Ekle
     </Button>
    </div>

    <div className="space-y-4">
     {quotes.map((quote, index) => (
      <Card key={index}>
       <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
         <h3 className="font-medium text-heading">Alıntı {index + 1}</h3>
         <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuotes(quotes.filter((_, i) => i !== index))}
         >
          <Trash2 className="w-4 h-4" />
         </Button>
        </div>
        <div className="space-y-2">
         <Label>Alıntı metni</Label>
         <Textarea
          rows={3}
          value={quote.text}
          onChange={(e) => updateQuote(index, "text", e.target.value)}
         />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label>Yazar</Label>
          <Input
           value={quote.title}
           onChange={(e) => updateQuote(index, "title", e.target.value)}
          />
         </div>
         <div className="space-y-2">
          <Label>Kitap</Label>
          <Input
           value={quote.book}
           onChange={(e) => updateQuote(index, "book", e.target.value)}
          />
         </div>
        </div>
        <div className="space-y-2">
         <Label>Görsel yolu</Label>
         <Input
          value={quote.image}
          onChange={(e) => updateQuote(index, "image", e.target.value)}
          placeholder="/above.jpg"
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
