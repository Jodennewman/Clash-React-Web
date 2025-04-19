"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={className}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "bg-theme-primary/5 dark:bg-theme-primary/5 mb-2 flex flex-1 items-center justify-between rounded-lg px-4 py-3 text-left text-theme-primary transition-all hover-bubbly-sm shadow-theme-sm [&[data-state=open]_svg]:rotate-45 border border-theme-border-light/20",
          className,
        )}
        {...props}
      >
        {children}
        <div className="icon bg-theme-primary/20 rounded-full p-1.5 shadow-theme-xs">
          <PlusIcon className="text-theme-primary size-3.5 shrink-0 transition-transform duration-200" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cn("px-4 pt-1 pb-4 mb-2 bg-theme-primary/5 dark:bg-theme-primary/5 rounded-b-lg border-x border-b border-theme-border-light/20", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
