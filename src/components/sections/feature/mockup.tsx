"use client";

import Glow from "../../ui/glow";
import { Mockup } from "../../ui/mockup";
import { Section } from "../../ui/section";
import { Image } from "../../ui/image";
import { useTheme } from "../../ui/theme-provider";

export default function Feature() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/app-light.png";
      break;
    case "dark":
      src = "/app-dark.png";
      break;
    default:
      src = "/app-dark.png";
      break;
  }

  return (
    <Section className="fade-bottom relative w-full overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="relative">
        <div className="mx-auto flex max-w-container flex-col items-center gap-8 sm:gap-24">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
            <h1 className="inline-block max-w-[920px] text-balance bg-linear-to-r from-foreground to-foreground bg-clip-text text-3xl font-semibold text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight ">
              You can change anything. But you don&apos;t have to.
            </h1>
            <p className="text-md max-w-[620px] text-balance font-medium text-muted-foreground sm:text-xl">
              Get the full control of the code of your website. Change it or
              just use the defaults. Customize it in seconds with CSS variables.
            </p>
          </div>
          <div className="relative">
            <Mockup>
              <Image
                src={src}
                alt="Launch UI app screenshot"
                width={1248}
                height={765}
              />
            </Mockup>
            <Glow variant="top" />
          </div>
        </div>
      </div>
    </Section>
  );
}
