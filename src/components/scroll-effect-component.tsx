import React, { useRef, CSSProperties } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollTextEffectProps {
  startText?: string;
  words?: string[];
  startHue?: number;
  endHue?: number;
}

export default function ScrollTextEffect({ 
  startText = "you can",
  words = [
    "design.",
    "prototype.",
    "solve.",
    "build.",
    "develop.",
    "debug.",
    "learn.",
    "cook.",
    "ship.",
    "prompt.",
    "collaborate.",
    "create.",
    "inspire.",
    "follow.",
    "innovate.",
    "test.",
    "optimize.",
    "teach.",
    "visualize.",
    "transform.",
    "scale.",
    "do it."
  ],
  startHue = 0,
  endHue = 360
}: ScrollTextEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Configure GSAP animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);
      
      // Set initial opacity state
      gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });
      
      // Animation for changing opacity of list items
      const dimmer = gsap
        .timeline()
        .to(items.slice(1), {
          opacity: 1,
          stagger: 0.5,
        })
        .to(
          items.slice(0, items.length - 1),
          {
            opacity: 0.2,
            stagger: 0.5,
          },
          0
        );
      
      // Create the scroll trigger for the opacity animation
      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: "center center",
        end: "center center",
        animation: dimmer,
        scrub: 0.2,
      });
      
      // Animation for changing the hue based on scroll position
      const scroller = gsap.timeline().fromTo(
        document.documentElement,
        {
          '--hue': startHue,
        },
        {
          '--hue': endHue,
          ease: "none",
        }
      );
      
      // Create the scroll trigger for the hue animation
      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: "center center",
        end: "center center",
        animation: scroller,
        scrub: 0.2,
      });
      
      // Chromatic aberration effect on entry
      gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0,
        },
        {
          '--chroma': 0.3,
          ease: "none",
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[0],
            start: "center center+=40",
            end: "center center",
          },
        }
      );
      
      // Chromatic aberration effect on exit
      gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0.3,
        },
        {
          '--chroma': 0,
          ease: "none",
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[items.length - 2],
            start: "center center",
            end: "center center-=40",
          },
        }
      );
      
      // Set up pin for the heading
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `bottom+=${items.length * 100}px bottom`,
        pin: ".sticky-heading",
        pinSpacing: true,
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, [startHue, endHue, words.length]);

  // Calculate step value for hue interpolation
  const step = (endHue - startHue) / (words.length - 1);

  return (
    <>
      <style>
        {`
          @property --hue {
            initial-value: ${startHue};
            syntax: '<number>';
            inherits: false;
          }
          @property --chroma {
            initial-value: 0;
            syntax: '<number>';
            inherits: true;
          }
          
          .sticky-heading {
            transform: translateY(-50%);
          }
        `}
      </style>
      <div 
        ref={containerRef} 
        className="relative min-h-screen overflow-hidden"
      >
        {/* Floating elements - light mode */}
        <div className="absolute top-20 left-[15%] w-32 h-32 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] 
                     bg-[var(--theme-float-bg-primary)] animate-float-slow hidden md:block dark:hidden"></div>
        <div className="absolute bottom-40 right-[10%] w-36 h-36 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] 
                     bg-[var(--theme-float-bg-secondary)] animate-float-medium hidden md:block dark:hidden"></div>
        
        {/* Floating elements - dark mode */}
        <div className="absolute top-20 left-[15%] w-32 h-32 rounded-[40%] rotate-12 opacity-10 
                     bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)] 
                     animate-float-slow hidden md:dark:block"></div>
        <div className="absolute bottom-40 right-[10%] w-36 h-36 rounded-[30%] -rotate-6 opacity-15
                     bg-gradient-to-r from-[var(--theme-accent-secondary)] to-[var(--theme-accent-secondary-hover)] 
                     animate-float-medium hidden md:dark:block"></div>

        <header className="min-h-screen flex items-center text-[var(--theme-text-primary)] px-8 py-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight bg-theme-gradient-primary bg-clip-text text-transparent">
            {startText}<br />scroll.
          </h1>
        </header>
        
        <section ref={sectionRef} className="content px-8 py-20 relative">
          <h2 className="sticky-heading sticky top-1/2 text-4xl md:text-5xl font-semibold text-[var(--theme-text-primary)] z-10">
            <span aria-hidden="true">{startText}&nbsp;</span>
            <span className="sr-only">{startText} ship things.</span>
          </h2>
          
          <ul 
            aria-hidden="true" 
            className="pt-[50vh] pb-[150vh] ml-4 md:ml-8"
          >
            {words.map((word, index) => {
              const style: CSSProperties = {
                color: `oklch(var(--lightness, 65%) var(--base-chroma, 0.3) calc(${startHue} + (${step} * ${index})))`
              };
              
              return (
                <li
                  key={index}
                  ref={el => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  style={style}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-[50vh]"
                >
                  {word}
                </li>
              );
            })}
          </ul>
        </section>
        
        <section className="min-h-screen flex justify-center items-center py-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-theme-gradient bg-clip-text text-transparent">
            fin.
          </h2>
        </section>
      </div>
    </>
  );
}
