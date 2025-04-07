import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { StarIcon, Terminal } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import Figma from "../logos/figma";
import Github from "../logos/github";

export function SocialStats() {
  const avatars = [
    {
      name: "Marcin Zaremski",
      image: "/avatars/marcin.jpg",
    },
    {
      name: "Paulina Szalasz",
      image: "/avatars/paulina.jpg",
    },
    {
      name: "Mikolaj Dobrucki",
      image: "/avatars/mikolaj.jpg",
    },
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            data-slot="social-stats"
            className="hover:bg-theme-accent/10 flex items-center rounded-md p-2 transition-all transition-theme-normal"
          >
            {avatars.map((avatar) => (
              <Avatar key={avatar.name} className="-mr-2 size-8 shadow-theme-sm">
                <AvatarImage src={avatar.image} />
                <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            <div className="ml-4 flex flex-col gap-1">
              <div className="flex gap-1">
                <StarIcon className="fill-theme-primary size-3" />
                <StarIcon className="fill-theme-primary size-3" />
                <StarIcon className="fill-theme-primary size-3" />
                <StarIcon className="fill-theme-primary size-3" />
                <StarIcon className="fill-theme-primary size-3" />
              </div>
              <p className="text-theme-secondary text-left text-xs font-medium">
                Used by x designers and developers
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex w-64 flex-col gap-2 p-4 text-xs bg-theme-gradient-card border border-theme-border shadow-theme-md">
          <div className="flex">
            <p className="flex grow items-center gap-0.5 text-theme-primary">
              <Figma className="mr-2 size-3" /> Figma users
            </p>
            <p className="text-theme-secondary">x</p>
          </div>
          <div className="flex">
            <p className="flex grow items-center gap-0.5 text-theme-primary">
              <Github className="mr-2 size-3" /> Github clones
              <span className="text-theme-secondary italic">unique</span>
            </p>
            <p className="text-theme-secondary">x</p>
          </div>
          <div className="flex">
            <p className="flex grow items-center gap-0.5 text-theme-primary">
              <Terminal className="mr-2 size-3" /> CLI installations
              <span className="text-theme-secondary italic">unique</span>
            </p>
            <p className="text-theme-secondary">x</p>
          </div>
          <p className="text-theme-secondary pt-4 text-xs">
            Data updated x
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
