"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

export default function ConfirmDialog({
 open,
 onOpenChange,
 title,
 description,
 confirmLabel = "Sil",
 cancelLabel = "İptal",
 onConfirm,
 loading = false,
 variant = "destructive",
}) {
 async function handleConfirm() {
  await onConfirm?.();
 }

 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="max-w-sm">
    <DialogHeader>
     <div className="mx-auto mb-1 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400 sm:mx-0">
      <AlertTriangle className="size-5" />
     </div>
     <DialogTitle>{title}</DialogTitle>
     <DialogDescription>{description}</DialogDescription>
    </DialogHeader>

    <DialogFooter>
     <Button
      type="button"
      variant="outline"
      onClick={() => onOpenChange(false)}
      disabled={loading}
     >
      {cancelLabel}
     </Button>
     <Button
      type="button"
      variant={variant}
      onClick={handleConfirm}
      disabled={loading}
     >
      {loading ? "Siliniyor..." : confirmLabel}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
