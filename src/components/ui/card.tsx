import * as React from "react";

import { cn } from "../../lib/utils";

function Card({ className, showFloatingElements = false, ...props }: React.ComponentProps<"div"> & { showFloatingElements?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative overflow-hidden bg-theme-gradient text-theme-primary rounded-[--border-radius-lg] border border-theme-border shadow-theme-card hover-bubbly",
        className,
      )}
      {...props}
    >
      {showFloatingElements && (
        <>
          <div className="vs-float-element-light-1 top-10 right-5"></div>
          <div className="vs-float-element-light-2 bottom-5 left-10"></div>
          <div className="vs-float-element-dark-1 top-10 right-5"></div>
          <div className="vs-float-element-dark-2 bottom-5 left-10"></div>
        </>
      )}
      {props.children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("leading-none font-semibold tracking-tight text-theme-primary", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-theme-secondary text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};