"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster({ ...props }) {
 return (
  <Sonner
   position="bottom-center"
   closeButton
   duration={3500}
   offset={28}
   gap={10}
   toastOptions={{
    classNames: {
     toast:
      "group toast !rounded-2xl !px-4 !py-3.5 !gap-3 !min-w-[280px] !border !font-sans !shadow-[0_16px_48px_-12px_rgba(42,38,32,0.28)] dark:!shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md",
     title: "!text-sm !font-medium !leading-snug !text-heading",
     description: "!text-sm !text-body",
     icon: "!size-5 !shrink-0",
     success:
      "!bg-gray-50/95 dark:!bg-dark-800/95 !border-primary/30 dark:!border-primary-dark/45",
     error:
      "!bg-gray-50/95 dark:!bg-dark-800/95 !border-[#c49a8a]/40 dark:!border-[#8b5e52]/50",
     closeButton:
      "!absolute !right-2.5 !top-2.5 !left-auto !transform-none !size-7 !rounded-full !border !border-gray-200 dark:!border-dark-500 !bg-white/80 dark:!bg-dark-700 !text-muted hover:!text-heading hover:!bg-gray-100 dark:hover:!bg-dark-600 !transition-colors",
    },
   }}
   {...props}
  />
 );
}
