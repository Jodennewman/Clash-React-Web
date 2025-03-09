"use client";

import * as React from "react";
import Glow from "../ui/glow";
import { Mockup, MockupFrame } from "../ui/mockup";
import Image from "next/image";
import { useTheme } from "next-themes";

function MockupMobileIllustration() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/mobile-light.png";
      break;
    case "dark":
      src = "/mobile-dark.png";
      break;
    default:
      src = "/mobile-dark.png";
      break;
  }

  return (
    <div
      data-slot="mockup-mobile-illustration"
      className="relative h-full w-full"
    >
      <MockupFrame
        size="small"
        className="absolute top-0 left-[50%] w-full max-w-[366px] -translate-x-[50%] translate-y-0 rounded-[56px] transition-all duration-1000 ease-in-out group-hover:-translate-y-8"
      >
        <Mockup type="mobile">
          <Image
            src={src}
            alt="Launch UI app screenshot"
            width={350}
            height={765}
          />
        </Mockup>
      </MockupFrame>
      <Glow
        variant="bottom"
        className="translate-y-0 scale-x-[1.2] opacity-70 transition-all duration-1000 group-hover:-translate-y-12 group-hover:opacity-100"
      />
    </div>
  );
}

export default MockupMobileIllustration;
