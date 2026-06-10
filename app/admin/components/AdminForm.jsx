"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CircleCheck, CircleAlert, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SaveButton({ onSave, label = "Kaydet" }) {
 const [loading, setLoading] = useState(false);

 async function handleClick() {
  setLoading(true);
  try {
   await onSave();
   toast.success("Kaydedildi.", {
    icon: (
     <CircleCheck
      className="size-5 text-primary dark:text-white"
      strokeWidth={2}
     />
    ),
   });
  } catch (error) {
   toast.error(error.message || "Kaydetme başarısız", {
    icon: (
     <CircleAlert
      className="size-5 text-[#a86b5c] dark:text-[#d49a8a]"
      strokeWidth={2}
     />
    ),
   });
  } finally {
   setLoading(false);
  }
 }

 return (
  <Button onClick={handleClick} disabled={loading}>
   {loading ? <Loader2 className="animate-spin" /> : <Save />}
   {loading ? "Kaydediliyor..." : label}
  </Button>
 );
}

async function fetchJson(url, options) {
 const res = await fetch(url, options);
 const data = await res.json();
 if (!res.ok) {
  throw new Error(data.error || "İstek başarısız");
 }
 return data;
}

export { fetchJson };
