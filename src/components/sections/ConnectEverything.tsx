import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getImage } from "../../utils/imageMap";

interface ConnectEverythingProps {
  className?: string;
  id?: string;
}

export const ConnectEverything: React.FC<ConnectEverythingProps> = ({ className = "", id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use our image mapping utility to get the actual images with proper error handling
  const appIcons = {
    creatorHud: getImage('main', 'AppIcons', 'Hud') ?? '',
    scranAr: getImage('main', 'AppIcons', 'Scran-ar') ?? '',
    spitt: getImage('main', 'AppIcons', 'Scranar-prPRO extension') ?? ''
  };

  // Check if any required images are missing
  const missingImages = Object.entries(appIcons).filter(([, value]) => !value);
  if (missingImages.length > 0) {
    console.warn('Missing required images:', missingImages.map(([key]) => key));
  }

  // Simplified GSAP animations to reduce lag
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Only do minimal icon animations
      gsap.utils.toArray<Element>('.app-icon').forEach((icon, index) => {
        // Simple floating animation
        gsap.to(icon, {
          y: -10,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });

        // Simple hover effect with reduced motion preference check
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.05,
              duration: 0.3
            });
          });

          icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3
            });
          });
        }
      });

      // Simplified glow effect with reduced motion check
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray<Element>('.app-icon-glow').forEach((glow, i) => {
          gsap.to(glow, {
            opacity: 0.6,
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            delay: i * 0.5
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full md:max-w-7xl lg:max-w-full px-2 md:px-4 lg:px-6 xl:px-8 pt-12 md:pt-16 lg:pt-24 pb-0 bg-[var(--theme-bg-primary)] dark:bg-gradient-to-b dark:from-[var(--theme-bg-secondary)] dark:to-[var(--theme-bg-tertiary)] flex flex-col justify-center items-center gap-12 md:gap-16 lg:gap-24 overflow-hidden relative">
      {/* Theme-aware floating elements */}
      <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] 
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity)] 
                    bg-[var(--theme-float-bg-secondary)]
                    animate-float-medium"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-[35%] rotate-45 opacity-[var(--theme-float-opacity)] 
                    bg-[var(--theme-float-bg-accent)]
                    animate-float-fast"></div>
                      
      <div className="flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl relative z-10">
        <div className="text-center">
          <span className="text-[var(--theme-text-primary)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">Connect </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--theme-accent)] to-[var(--theme-accent-secondary)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">Everything</span>
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl font-normal mb-4">
          We don't just know how to do it. We're defining how to do it.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-xl font-normal">
          <span className="text-[var(--theme-accent-secondary)] font-semibold">The first part of the problem</span> is knowing what content to make (and how to make it) - which our course solves.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-xl font-normal">
          <span className="text-[var(--theme-accent-secondary)] font-semibold">The second part of the problem</span> is being able to keep this content going out, every single, day, for years - in an efficient way that doesn't drain your team's energy, and your bank account.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl font-normal">
          It's the main problem we've struggled with an agency.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl font-normal max-w-3xl">
          Which is why the Vertical Shortcut includes our custom in house-solution: the utilities, apps and extensions, needed to run an efficient content machine.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl font-normal max-w-3xl">
          These tools made our team 4x more efficient, and increased the quality of our output too.
        </div>
        <div className="text-center text-[var(--theme-accent)] text-xl md:text-2xl font-semibold">
          And you're getting them all for free.
        </div>
      </div>
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 relative z-10">
        {/* Creator HUD */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 w-full bg-[var(--theme-surface)]/20 backdrop-blur-sm rounded-xl p-3 shadow-[var(--theme-shadow-sm)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--theme-radial-glow)] opacity-50 blur-md rounded-full"></div>
            <img className="app-icon w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl relative z-10" src={appIcons.creatorHud} alt="Creator HUD" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-[var(--theme-accent-quaternary)] text-3xl md:text-4xl lg:text-5xl font-normal mb-1">Creator HUD</h3>
            <p className="text-[var(--theme-text-primary)] text-base md:text-lg lg:text-xl mb-2">for Notion</p>
            <p className="text-[var(--theme-text-secondary)] text-sm md:text-base lg:text-lg">
              A custom-code Notion Script Template that works with Premiere Pro, and the data from our custom tool Scran.ar to remove ALL the manual effort after filming.<br /><br />
              In a single click of a button CreatorHUD connects with Scran.ar and Splitt to create all your individual editing files in Premier Pro, populated with all the appropriate footage, and each timeline is titled with the name of your Notion script.<br /><br />
              Yes. It literally works out which video matches each script, and puts it into instantly editable timelines with all the relevant data and information.
            </p>
          </div>
        </div>
        
        {/* Scran.ar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 w-full bg-[var(--theme-surface)]/20 backdrop-blur-sm rounded-xl p-3 shadow-[var(--theme-shadow-sm)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--theme-radial-glow)] opacity-50 blur-md rounded-full"></div>
            <img className="app-icon w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl relative z-10" src={appIcons.scranAr} alt="Scran.ar" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-[var(--theme-accent-tertiary)] text-3xl md:text-4xl lg:text-5xl font-normal mb-1">Scran.ar</h3>
            <p className="text-[var(--theme-text-primary)] text-base md:text-lg lg:text-xl mb-2">(beta)</p>
            <p className="text-[var(--theme-text-secondary)] text-sm md:text-base lg:text-lg">
              A powerful video ingest application, specifically for editing buckets of shorts, <strong>quickly</strong>.<br /><br />
              By communicating directly with the Creator HUD, this tool knows everything about your raw footage before even you do.
            </p>
          </div>
        </div>
        
        {/* Spitt.ar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 w-full bg-[var(--theme-surface)]/20 backdrop-blur-sm rounded-xl p-3 shadow-[var(--theme-shadow-sm)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--theme-radial-glow)] opacity-50 blur-md rounded-full"></div>
            <img className="app-icon w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl relative z-10" src={appIcons.spitt} alt="Spitt.ar" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-[var(--theme-accent-secondary)] text-3xl md:text-4xl lg:text-5xl font-normal mb-1">Spitt.ar</h3>
            <p className="text-[var(--theme-text-primary)] text-sm md:text-base lg:text-lg">
              A Premiere Pro Extension for Scran.ar<br /><br />
              Video editing can be cruel, whether you're the one doing it or not.<br /><br />
              This tool works natively with Premiere Pro and the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6 md:gap-8 relative z-10">
        <div className="text-center text-[var(--theme-text-primary)] text-xl md:text-2xl lg:text-3xl font-normal">
          The best part is,
        </div>
        <div className="text-center text-[var(--theme-accent)] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">
          They speak to each-other.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          So, so much easier.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          All 'busy work' is eliminated.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          Plus we've got more in the works: Custom analytics tools, video editing automators, AI driven 'authentic performance' checkers… and more
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          As part of Vertical Shortcut alpha, you will have permanent access to the entire code suite, as well as early access to all the updates and expansions we make to the course, when we're happy to offer these publicly.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          Trust us, this will save you HOURS.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          And don't worry if you're a code newbie, the Creator HUD, Scran.ar and Splitt are incredibly easy to install, use and run (but we'll chuck in some free tech support if you want a hand)
        </div>
      </div>
      
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--theme-text-primary)/0.03_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default ConnectEverything;