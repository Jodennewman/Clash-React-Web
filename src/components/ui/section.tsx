import * as React from "react";

import { cn } from "../../lib/utils";

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn(
        "bg-theme-primary text-theme-primary px-4 py-12 sm:py-24 md:py-32 relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Theme-aware floating element for visual interest */}
      <div className="absolute -z-10 top-20 right-10 w-20 h-20 rounded-[40%] rotate-12 
                    opacity-[var(--theme-float-opacity)]
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow"></div>
      {props.children}
    </section>
  );
}

export { Section };
