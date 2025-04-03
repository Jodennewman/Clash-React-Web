import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:translate-y-[-3px] hover:scale-[1.02] active:translate-y-[1px] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-hover)] hover:from-[var(--primary-orange-light)] hover:to-[var(--primary-orange)] text-white shadow-[var(--shadow-btn)] hover:shadow-lg dark:shadow-[0_4px_12px_rgba(254,163,93,0.2)] dark:hover:shadow-[0_6px_16px_rgba(254,163,93,0.3)]",
        destructive:
          "bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-coral)] text-white shadow-[var(--shadow-btn)] hover:shadow-lg hover:from-[var(--accent-coral)] hover:to-[var(--accent-red)]",
        outline:
          "border border-[var(--secondary-teal)] dark:border-white/20 bg-transparent text-[var(--secondary-teal)] dark:text-white shadow-xs hover:bg-[var(--secondary-teal)]/5 dark:hover:bg-white/5",
        glow: "bg-white/10 backdrop-blur-sm border border-white/20 shadow-md hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
        secondary:
          "bg-gradient-to-r from-[var(--secondary-teal)] to-[var(--secondary-teal-hover)] hover:from-[var(--secondary-teal-light)] hover:to-[var(--secondary-teal)] text-white shadow-[var(--shadow-btn)] hover:shadow-lg",
        ghost: "hover:bg-white/10 dark:hover:bg-white/5",
        link: "text-[var(--primary-orange)] dark:text-[var(--primary-orange-light)] hover:text-[var(--primary-orange-hover)] dark:hover:text-[var(--primary-orange)] underline-offset-4 hover:underline",
        subtle: "bg-[var(--bg-cream-darker)] dark:bg-white/5 text-[var(--text-navy)] dark:text-white/80 hover:bg-[var(--bg-cream-darker)]/80 dark:hover:bg-white/10",
        vibrant: "bg-gradient-to-r from-[var(--accent-coral)] to-[var(--primary-orange)] text-white shadow-[var(--shadow-btn)] hover:shadow-lg hover:from-[var(--primary-orange)] hover:to-[var(--accent-coral)]",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        xs: "h-7 text-xs px-3 py-1.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        xl: "h-14 px-7 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
