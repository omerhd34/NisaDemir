"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";

function hasPreview(value) {
 return Boolean(value && value !== "/");
}

export default function ImageUpload({ value, onChange, label = "Görsel", large = false }) {
 const inputRef = useRef(null);
 const [uploading, setUploading] = useState(false);
 const [error, setError] = useState("");
 const [previewOpen, setPreviewOpen] = useState(false);

 useEffect(() => {
  if (!previewOpen) return;
  function onKeyDown(event) {
   if (event.key === "Escape") setPreviewOpen(false);
  }
  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
 }, [previewOpen]);

 async function handleFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  setUploading(true);
  setError("");

  const formData = new FormData();
  formData.append("file", file);

  try {
   const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Yükleme başarısız");
   onChange(data.url);
  } catch (err) {
   setError(err.message || "Yükleme başarısız");
  } finally {
   setUploading(false);
   if (inputRef.current) inputRef.current.value = "";
  }
 }

 return (
  <div className="space-y-2">
   <Label>{label}</Label>

   <div className={large ? "space-y-3" : "flex items-center gap-3 flex-wrap"}>
    {hasPreview(value) ? (
     <div
      className={
       large
        ? "relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-900 group"
        : "relative w-32 h-24 shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-900 group"
      }
     >
      <Image src={value} alt="" fill className="object-cover" unoptimized />
      <button
       type="button"
       onClick={() => setPreviewOpen(true)}
       className="absolute inset-0 cursor-zoom-in bg-black/0 hover:bg-black/20 transition-colors"
       aria-label="Görseli büyüt"
      />
      <button
       type="button"
       onClick={() => onChange("")}
       className="absolute top-1.5 right-1.5 z-10 inline-flex items-center justify-center size-7 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
       aria-label="Görseli kaldır"
      >
       <X className="size-3.5" />
      </button>
     </div>
    ) : null}

    {previewOpen && hasPreview(value) ? (
     <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={() => setPreviewOpen(false)}
     >
      <button
       type="button"
       onClick={() => setPreviewOpen(false)}
       className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 inline-flex items-center justify-center size-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
       aria-label="Önizlemeyi kapat"
      >
       <X className="size-4" />
      </button>
      <div
       className="relative w-full max-w-4xl h-[85vh]"
       onClick={(event) => event.stopPropagation()}
      >
       <Image src={value} alt="" fill className="object-contain" unoptimized />
      </div>
     </div>
    ) : null}

    <input
     ref={inputRef}
     type="file"
     accept="image/jpeg,image/png,image/webp,image/gif"
     className="hidden"
     onChange={handleFile}
    />

    <Button
     type="button"
     variant="outline"
     onClick={() => inputRef.current?.click()}
     disabled={uploading}
    >
     <ImagePlus />
     {uploading ? "Yükleniyor..." : hasPreview(value) ? "Görseli Değiştir" : "Görsel Yükle"}
    </Button>
   </div>

   {error ? <p className="text-sm text-red-500">{error}</p> : null}
  </div>
 );
}
