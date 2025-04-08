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
          "vs-btn-primary-gradient hover:vs-btn-primary-gradient-hover text-white shadow-theme-btn hover:shadow-theme-md",
        destructive:
          "vs-btn-destructive-gradient hover:vs-btn-destructive-gradient-hover text-white shadow-theme-btn hover:shadow-theme-md",
        outline:
          "border border-theme-accent-secondary bg-transparent text-theme-accent-secondary shadow-xs hover:bg-theme-accent-secondary/5",
        glow: "bg-white/10 backdrop-blur-sm border border-white/20 shadow-theme-sm hover:bg-white/15 hover:border-white/30",
        secondary:
          "vs-btn-secondary-gradient hover:vs-btn-secondary-gradient-hover text-white shadow-theme-btn hover:shadow-theme-md",
        ghost: "hover:bg-theme-secondary/10",
        link: "text-theme-primary hover:text-theme-primary-hover underline-offset-4 hover:underline",
        subtle: "bg-theme-secondary/50 text-theme-primary hover:bg-theme-secondary/80",
        vibrant: "vs-btn-vibrant-gradient hover:vs-btn-vibrant-gradient-hover text-white shadow-theme-btn hover:shadow-theme-md",
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