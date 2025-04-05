import * as React from "react";

import { cn } from "../../lib/utils";

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item"
      className={cn("text-theme-primary flex flex-col gap-4 p-4 transition-colors duration-[var(--theme-transition-normal)]", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="item-title"
      className={cn(
        "text-theme-primary text-sm leading-none font-semibold tracking-tight sm:text-base transition-colors duration-[var(--theme-transition-normal)]",
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-description"
      className={cn(
        "text-theme-secondary/70 flex max-w-[240px] flex-col gap-2 text-sm text-balance transition-colors duration-[var(--theme-transition-normal)]",
        className,
      )}
      {...props}
    />
  );
}

function ItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-icon"
      className={cn("flex items-center self-start", className)}
      {...props}
    />
  );
}

export { Item, ItemIcon, ItemTitle, ItemDescription };
