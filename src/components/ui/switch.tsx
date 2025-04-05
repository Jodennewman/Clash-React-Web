"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "../../lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      data-slot="switch"
      className={cn(
        "peer focus-visible:ring-theme-primary focus-visible:ring-offset-theme-bg-primary data-[state=checked]:bg-theme-accent-secondary data-[state=unchecked]:bg-theme-border inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-theme-sm transition-all duration-[var(--theme-transition-normal)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-theme-bg-surface pointer-events-none block size-4 rounded-full shadow-theme-sm ring-0 transition-transform duration-[var(--theme-transition-normal)] data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
