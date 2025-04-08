"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("text-theme-secondary flex items-center transition-colors duration-[var(--theme-transition-normal)]", className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-theme-gradient-card ring-offset-theme-bg-primary hover:bg-theme-accent/10 hover:text-theme-accent focus-visible:ring-theme-primary data-[state=active]:text-theme-primary flex flex-col gap-3 rounded-md border border-theme-border px-5 pt-4 pb-6 text-left text-sm font-medium transition-all duration-[var(--theme-transition-normal)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-theme-md",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "border-theme-border bg-theme-gradient-card ring-offset-theme-bg-primary focus-visible:ring-theme-primary relative overflow-hidden rounded-lg border shadow-theme-md transition-all duration-[var(--theme-transition-normal)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
