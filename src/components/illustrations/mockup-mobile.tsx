"use client";

import * as React from "react";
import Glow from "../ui/glow";
import { Mockup, MockupFrame } from "../ui/mockup";
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
    <div className="relative flex items-center justify-center">
      <MockupFrame size="small">
        <Mockup type="mobile">
          <img 
            src={src} 
            alt="Mobile app screenshot" 
            style={{ width: '100%', height: 'auto' }}
          />
        </Mockup>
      </MockupFrame>
      <Glow variant="center" />
    </div>
  );
}

export default MockupMobileIllustration;
