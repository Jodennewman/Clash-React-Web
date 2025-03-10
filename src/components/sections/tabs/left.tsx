/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Section } from "../../ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import { useTheme } from "next-themes";
import {
  BlocksIcon,
  PaletteIcon,
  SquarePenIcon,
} from "lucide-react";
import React from "react";

// Add a stand-in image component that can be used when no image is available
const StandInImage = ({ width = 500, height = 300, className = "" }) => {
  return (
    <div 
      className={`relative flex items-center justify-center bg-gradient-to-br from-[#154D59] to-[#09232F] rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10" 
             style={{ backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(to right, #FEA35D 1px, transparent 1px), linear-gradient(to bottom, #FEA35D 1px, transparent 1px)' }}>
        </div>
      </div>
      <div className="relative z-10 text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FEA35D] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <p className="text-white/80 font-medium">Image Placeholder</p>
        <p className="text-white/50 text-sm mt-2">{width} × {height}</p>
      </div>
    </div>
  );
};

export default function TabsLeft() {
  const { resolvedTheme } = useTheme();
  let sectionSrc: string;
  let contentSrc: string;
  let customizeSrc: string;

  switch (resolvedTheme) {
    case "light":
      sectionSrc = "/app-light.png";
      contentSrc = "/app-mail-light.png";
      customizeSrc = "/app-settings-light.png";
      break;
    case "dark":
      sectionSrc = "/app-dark.png";
      contentSrc = "/app-mail-dark.png";
      customizeSrc = "/app-settings-dark.png";
      break;
    default:
      sectionSrc = "/app-dark.png";
      contentSrc = "/app-mail-dark.png";
      customizeSrc = "/app-settings-dark.png";
      break;
  }

  return (
    <Section>
      <div className="max-w-container mx-auto flex flex-col gap-8 sm:gap-16">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
          <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
            Make the right impression
          </h2>
          <p className="text-md text-muted-foreground max-w-[720px] text-center font-medium text-balance sm:text-xl">
            Launch UI makes it easy to build an unforgetable website that
            resonates with professional design-centric audiences.
          </p>
        </div>
        <div className="w-full">
          <Tabs
            defaultValue="choose-sections"
            className="flex flex-col items-start gap-4 lg:grid lg:grid-cols-3"
          >
            <TabsList className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-1">
              <TabsTrigger
                value="choose-sections"
                className="flex w-full flex-row gap-2 p-3"
              >
                <div className="p-1">
                  <BlocksIcon className="size-4 shrink-0 stroke-1 md:h-5 md:w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold md:text-lg">
                    Choose your sections
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Choose among 100+ components to build a landing page suited
                    to the needs of your product.
                  </p>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="add-content"
                className="flex flex-row gap-2 p-3"
              >
                <div className="p-1">
                  <SquarePenIcon className="size-4 shrink-0 stroke-1 md:h-5 md:w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold md:text-lg">Add your content</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Fill the blanks with screenshots, videos, and other content
                    featuring your product.
                  </p>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="customize"
                className="flex flex-row gap-2 p-3"
              >
                <div className="p-1">
                  <PaletteIcon className="size-4 shrink-0 stroke-1 md:h-5 md:w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold md:text-lg">Customize</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Make design yours in no time by changing the variables that
                    control colors, typography, and other styles.
                  </p>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="choose-sections"
              className="aspect-16/9 p-8 lg:col-span-2"
            >
              <MockupFrame size="small">
                <Mockup type="responsive">
                  <StandInImage
                    width={1248}
                    height={765}
                    className="rounded-lg"
                  />
                </Mockup>
              </MockupFrame>
              <Glow variant="center" />
            </TabsContent>
            <TabsContent
              value="add-content"
              className="aspect-16/9 p-8 lg:col-span-2"
            >
              <MockupFrame size="small">
                <Mockup type="responsive">
                  <StandInImage
                    width={1248}
                    height={765}
                    className="rounded-lg"
                  />
                </Mockup>
              </MockupFrame>
              <Glow variant="center" />
            </TabsContent>
            <TabsContent
              value="customize"
              className="aspect-16/9 p-8 lg:col-span-2"
            >
              <MockupFrame size="small">
                <Mockup type="responsive">
                  <StandInImage
                    width={1248}
                    height={765}
                    className="rounded-lg"
                  />
                </Mockup>
              </MockupFrame>
              <Glow variant="center" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Section>
  );
}
