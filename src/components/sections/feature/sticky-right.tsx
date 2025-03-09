"use client";

import { Section } from "../../ui/section";
import { Image } from "../../ui/image";
import { useTheme } from "../../ui/theme-provider";
import { Beam } from "@/components/launch-ui/ui/beam";

export default function FeatureStickyRight() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/mobile-app-light.png";
      break;
    case "dark":
      src = "/mobile-app-dark.png";
      break;
    default:
      src = "/mobile-app-dark.png";
      break;
  }

  return (
    <Section className="border-border dark:border-border/15 relative max-md:mb-16 max-md:max-h-[850px] max-md:overflow-hidden max-md:border-b max-sm:max-h-[650px]">
      <div className="max-w-container relative z-10 mx-auto flex flex-col-reverse items-center gap-12 md:flex-row md:items-start lg:gap-24">
        <div className="relative z-10 max-w-[320px] md:max-w-[480px]">
          <Beam
            tone="brandLight"
            className="after:scale-y-150 md:after:translate-x-1/2"
          >
            <Image
              src={src}
              alt="Launch UI app screenshot"
              width={900}
              height={1840}
              className="relative z-10"
            />
          </Beam>
        </div>
        <div className="top-32 right-0 flex flex-col items-start gap-4 py-4 text-center sm:gap-12 md:sticky md:py-12 md:text-left">
          <h1 className="from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block max-w-[920px] bg-linear-to-r bg-clip-text text-3xl font-semibold text-balance text-transparent drop-shadow-2xl sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
            Everything you need at your fingertips
          </h1>
          <div className="text-md text-muted-foreground relative z-10 flex max-w-[620px] flex-col gap-4 font-medium text-balance sm:text-xl">
            <p>
              A comprehensive collection of components written in modern React,
              Typescript and Tailwind CSS.
            </p>
            <p>
              You&apos;ll find here everything you need to build your next
              landing page.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
