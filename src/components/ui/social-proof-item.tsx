import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "../../lib/utils";
import { Link } from "./link";

export interface SocialProofItemProps {
  name: string;
  username: string;
  text: React.ReactNode;
  className?: string;
  url?: string;
  image?: string;
}

const commonClasses =
  "flex max-w-[320px] flex-col rounded-lg bg-theme-gradient-card p-4 text-start shadow-theme-md sm:max-w-[420px] sm:p-6 border border-theme-border transition-all duration-[var(--theme-transition-normal)]";

export default function SocialProofItem({
  name,
  username,
  text,
  className,
  url,
  image,
}: SocialProofItemProps) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md leading-none font-semibold text-theme-primary">{name}</h3>
          <p className="text-theme-secondary text-sm">@{username}</p>
        </div>
      </div>
      <p className="sm:text-md text-theme-secondary mt-4 text-sm">{text}</p>
    </>
  );

  if (url) {
    return (
      <Link
        href={url}
        data-slot="social-proof-item"
        className={cn(
          commonClasses,
          "hover:bg-theme-gradient-card hover:shadow-theme-lg hover-bubbly-sm",
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div data-slot="social-proof-item" className={cn(commonClasses, className)}>
      {content}
    </div>
  );
}
