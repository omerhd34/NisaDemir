import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-gray-300 dark:border-dark-500 bg-white dark:bg-dark-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-50 ring-offset-background placeholder:text-gray-400 dark:placeholder:text-dark-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary dark:focus-visible:ring-primary-dark/40 dark:focus-visible:border-primary-dark disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
