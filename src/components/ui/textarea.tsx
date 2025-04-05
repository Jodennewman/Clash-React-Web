import * as React from "react"

import { cn } from "../../lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-theme-border placeholder:text-theme-secondary focus-visible:border-theme-primary focus-visible:ring-theme-primary/50 aria-invalid:ring-theme-error/20 aria-invalid:border-theme-error flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-theme-primary text-base shadow-theme-sm transition-all duration-[var(--theme-transition-normal)] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
