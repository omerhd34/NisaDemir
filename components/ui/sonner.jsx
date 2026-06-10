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
     title: "!text-sm !font-medium !leading-snug !text-gray-900 dark:!text-white",
     description: "!text-sm !text-gray-600 dark:!text-white/80",
     icon: "!size-5 !shrink-0",
     success:
      "!bg-gray-50/95 dark:!bg-dark-800/95 !border-primary/30 dark:!border-primary-dark/45 !text-gray-900 dark:!text-white",
     error:
      "!bg-gray-50/95 dark:!bg-dark-800/95 !border-[#c49a8a]/40 dark:!border-[#8b5e52]/50 !text-gray-900 dark:!text-white",
     closeButton:
      "!absolute !right-2.5 !top-2.5 !left-auto !transform-none !size-7 !rounded-full !border !border-gray-200 dark:!border-primary-dark/30 !bg-white/80 dark:!bg-transparent !text-gray-500 dark:!text-white dark:!opacity-100 hover:!text-gray-900 dark:hover:!text-white hover:!bg-gray-100 dark:hover:!bg-white/10 !transition-colors [&>svg]:!stroke-current [&>svg]:!opacity-100",
    },
   }}
   {...props}
  />
 );
}
