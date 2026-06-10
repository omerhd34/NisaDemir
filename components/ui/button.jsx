import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-white shadow-md hover:scale-[1.02] hover:shadow-lg [background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-light)_100%)] dark:text-gray-950 dark:[background:linear-gradient(135deg,var(--color-primary-dark)_0%,var(--color-primary-dark-light)_100%)]",
        outline:
          "border border-gray-300 dark:border-dark-500 bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-100 backdrop-blur-sm hover:border-primary dark:hover:border-primary-dark hover:text-primary dark:hover:text-primary-dark hover:bg-white/90 dark:hover:bg-white/10",
        ghost:
          "text-gray-700 dark:text-dark-100 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-primary dark:hover:text-primary-dark-light",
        link:
          "text-primary dark:text-primary-dark-light underline-offset-4 hover:underline rounded-none",
        subtle:
          "bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-700",
        destructive:
          "bg-red-500/90 text-white hover:bg-red-600 shadow",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
