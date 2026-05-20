import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark-light",
        secondary:
          "border-transparent bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-gray-100",
        outline:
          "border-gray-300 dark:border-dark-500 text-gray-700 dark:text-dark-100 bg-transparent",
        accent:
          "border-transparent bg-accent/15 dark:bg-accent-dark/15 text-accent dark:text-accent-dark",
        eyebrow:
          "border-transparent uppercase tracking-[0.18em] text-[0.7rem] px-3 py-1 bg-transparent text-primary dark:text-primary-dark-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
