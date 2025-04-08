import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border text-xs font-semibold transition-all duration-[--transition-bounce] shadow-none hover:shadow-theme-sm hover:translate-y-[-1px] hover:scale-[1.02] focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-theme-gradient-primary text-white shadow-theme-sm hover:shadow-theme-md",
        secondary:
          "border-transparent bg-theme-gradient-secondary text-white shadow-theme-sm hover:shadow-theme-md",
        accent:
          "border-transparent bg-theme-gradient-accent text-white shadow-theme-sm hover:shadow-theme-md",
        destructive:
          "border-transparent bg-theme-accent-quaternary text-white shadow-theme-sm hover:shadow-theme-md",
        outline: 
          "border-theme-border bg-theme-secondary/60 text-theme-primary backdrop-blur-sm",
        subtle:
          "border-transparent bg-theme-secondary/70 text-theme-primary shadow-theme-sm",
        section:
          "border-theme-border bg-theme-secondary/60 text-theme-primary",
      },
      size: {
        default: "px-2.5 py-1",
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2.5 py-1",
        lg: "px-3 py-2 text-sm",
        xl: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };