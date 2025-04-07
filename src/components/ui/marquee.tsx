import { cn } from "../../lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

import React from 'react';

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  // Define animation styles
  const marqueeAnimationStyle = {
    animation: `${vertical ? 'scroll-up' : reverse ? 'scroll-right' : 'scroll-left'} linear infinite`,
    animationDuration: 'var(--duration, 40s)',
    animationPlayState: 'running'
  };

  // Add any explicit CSS for animations
  React.useEffect(() => {
    // Check if the animation styles already exist
    if (!document.getElementById('marquee-keyframes')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'marquee-keyframes';
      styleEl.textContent = `
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        .marquee-container:hover .marquee-hover-pause {
          animation-play-state: paused !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn(
        "marquee-container flex overflow-hidden p-2 bg-theme-bg-light/20 backdrop-blur-sm relative",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
      style={{
        '--gap': '0.5rem',
      }}
    >
      <div 
        className={cn(
          "flex gap-2 shrink-0",
          { "marquee-hover-pause": pauseOnHover }
        )}
        style={marqueeAnimationStyle}
      >
        {children}
      </div>
      
      <div 
        className={cn(
          "flex gap-2 shrink-0",
          { "marquee-hover-pause": pauseOnHover }
        )}
        style={marqueeAnimationStyle}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
