import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-[--border-radius-md] border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(16px)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "vs-gradient-light dark:vs-gradient-dark border-white/20 dark:border-white/5 text-[var(--theme-text-primary)] dark:text-white shadow-[--shadow-sm] dark:shadow-[0_0_10px_rgba(53,115,128,0.1)]",
        destructive:
          "vs-btn-destructive-gradient text-white [&>svg]:text-white *:data-[slot=alert-description]:text-white/80 shadow-[--shadow-sm] dark:shadow-[0_0_10px_rgba(222,107,89,0.15)]",
        primary: "vs-btn-primary-gradient text-white [&>svg]:text-white *:data-[slot=alert-description]:text-white/80 shadow-[--shadow-sm] dark:shadow-[0_0_10px_rgba(254,163,93,0.15)]",
        secondary: "vs-btn-secondary-gradient text-white [&>svg]:text-white *:data-[slot=alert-description]:text-white/80 shadow-[--shadow-sm] dark:shadow-[0_0_10px_rgba(53,115,128,0.15)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight text-[var(--theme-text-primary)] dark:text-white",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-[var(--theme-text-primary)]/70 dark:text-white/70 [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
