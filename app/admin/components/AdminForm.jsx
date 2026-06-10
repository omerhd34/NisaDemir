"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SaveButton({ onSave, label = "Kaydet" }) {
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState("");

 async function handleClick() {
  setLoading(true);
  setMessage("");
  try {
   await onSave();
   setMessage("Kaydedildi");
  } catch (error) {
   setMessage(error.message || "Kaydetme başarısız");
  } finally {
   setLoading(false);
  }
 }

 return (
  <div className="flex items-center gap-3">
   <Button onClick={handleClick} disabled={loading}>
    {loading ? "Kaydediliyor..." : label}
   </Button>
   {message ? (
    <span className={message === "Kaydedildi" ? "text-green-600 text-sm" : "text-red-500 text-sm"}>
     {message}
    </span>
   ) : null}
  </div>
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
