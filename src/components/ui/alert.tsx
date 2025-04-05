import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-[--border-radius-md] border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(16px)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-theme-gradient border-theme-border/20 text-theme-primary shadow-theme-sm",
        destructive:
          "bg-theme-gradient-destructive text-white [&>svg]:text-white *:data-[slot=alert-description]:text-white/80 shadow-theme-sm",
        primary: "bg-theme-gradient-primary text-white [&>svg]:text-white *:data-[slot=alert-description]:text-white/80 shadow-theme-sm",
        secondary: "bg-theme-gradient-secondary text-white [&>svg]:text-white *:data-[slot=alert-description]:text-white/80 shadow-theme-sm",
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
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight text-theme-primary",
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
        "col-start-2 grid justify-items-start gap-1 text-sm text-theme-secondary [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
