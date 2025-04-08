import * as React from "react";

import { cn } from "../../lib/utils";
import { ArrowUpRight } from "lucide-react";

function Tile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile"
      className={cn(
        "group relative flex flex-col gap-6 overflow-hidden rounded-xl p-6 bg-theme-gradient-card shadow-theme-md border border-theme-border transition-all duration-[var(--theme-transition-bounce)] hover:translate-y-[var(--theme-anim-distance)] hover:shadow-theme-lg hover:border-theme-accent/20",
        className,
      )}
      {...props}
    >
      {/* Theme-aware floating element for visual interest */}
      <div className="absolute -z-10 bottom-10 right-10 w-20 h-20 rounded-[40%] rotate-12 
                    opacity-[var(--theme-float-opacity)]
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow"></div>
    </div>
  );
}

function TileTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="tile-title"
      className={cn(
        "text-2xl leading-none font-semibold tracking-tight text-theme-primary transition-colors duration-[var(--theme-transition-normal)]",
        className,
      )}
      {...props}
    />
  );
}

function TileDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-description"
      className={cn(
        "text-md text-theme-secondary flex flex-col gap-2 text-balance transition-colors duration-[var(--theme-transition-normal)]",
        className,
      )}
      {...props}
    />
  );
}

function TileContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-content"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TileVisual({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-visual"
      className={cn("flex grow items-end justify-center", className)}
      {...props}
    />
  );
}

function TileLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="tile-link"
      className={cn(
        "bg-theme-accent-secondary/50 absolute top-4 right-4 block rounded-full p-4 opacity-0 transition-all duration-[var(--theme-transition-normal)] group-hover:opacity-100 shadow-theme-sm text-theme-primary hover:bg-theme-accent-secondary/80 hover:shadow-theme-md",
        className,
      )}
      {...props}
    >
      <ArrowUpRight className="size-4" />
    </a>
  );
}

export { Tile, TileVisual, TileTitle, TileDescription, TileContent, TileLink };
