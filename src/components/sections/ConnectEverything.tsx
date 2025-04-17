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
  // Set up click handlers for tool cards
  useEffect(() => {
    // Get all tool cards and details sections
    const toolCards = document.querySelectorAll('.tool-card');
    
    // Add click event to each card
    toolCards.forEach(card => {
      const details = card.querySelector('.tool-details');
      const closeBtn = card.querySelector('.close-details');
      
      // Open details
      card.addEventListener('click', () => {
        if (details) {
          details.classList.remove('hidden');
          gsap.fromTo(details, 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
          );
        }
      });
      
      // Close details when close button is clicked
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent triggering card click
          if (details) {
            gsap.to(details, {
              opacity: 0, 
              y: 10, 
              duration: 0.3, 
              ease: "power2.in",
              onComplete: () => details.classList.add('hidden')
            });
          }
        });
      }
    });
    
    // Cleanup event listeners on unmount
    return () => {
      toolCards.forEach(card => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, []);

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
    <div ref={containerRef} className="w-full md:max-w-7xl lg:max-w-full px-2 md:px-4 lg:px-6 xl:px-8 pt-12 md:pt-16 lg:pt-24 pb-0 bg-[var(--theme-bg-primary)] dark:bg-[var(--theme-bg-primary)] flex flex-col justify-center items-center gap-12 md:gap-16 lg:gap-24 overflow-hidden relative">
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
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-xl font-normal">
          <span className="text-[var(--theme-accent-secondary)] font-semibold">The first problem with content creation</span> is knowing what content to make (and how to make it) - which of course, our course solves.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-xl font-normal">
          <span className="text-[var(--theme-accent-secondary)] font-semibold">The second problem with content creation</span> is managing to keep your content going out, every single. day. for years - in an efficient way that doesn't drain your team's energy, and your bank account.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl font-normal">
          It was the main problem we've struggled with an agency. So we solved it.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl font-normal max-w-3xl">
          The Vertical Shortcut includes our <span className="font-semibold">custom in house-solution</span>: the utilities, apps and extensions, needed to run an efficient content machine. These tools made our team 4x more efficient, and increased the quality of our output too.
        </div>
        <div className="text-center text-[var(--theme-accent)] text-xl md:text-2xl font-semibold">
          And you're getting them all for free.
        </div>
      </div>
      
      {/* Horizontal tools section with expandable details */}
      <div className="w-full max-w-5xl flex flex-col justify-center items-center gap-8 md:gap-12 relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Creator HUD */}
          <div className="tool-card flex flex-col items-center bg-[var(--theme-surface)]/20 backdrop-blur-sm rounded-xl p-6 shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] transition-all duration-300 cursor-pointer group">
            <div className="relative flex items-center justify-center w-36 h-36 md:w-40 md:h-40">
              <div className="absolute inset-0 bg-[var(--theme-radial-glow)] opacity-50 blur-md rounded-full"></div>
              <img className="app-icon w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-110" src={appIcons.creatorHud} alt="Creator HUD" />
            </div>
            <h3 className="text-[var(--theme-accent-quaternary)] text-2xl md:text-3xl font-normal mt-4 mb-1 text-center">Creator HUD</h3>
            <p className="text-[var(--theme-text-primary)] text-base md:text-lg mb-2 text-center">for Notion</p>
            <span className="text-[var(--theme-accent)] text-sm font-medium mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">Click for details</span>
            
            {/* Hidden description that appears on click */}
            <div className="tool-details hidden absolute top-0 left-0 right-0 bottom-0 bg-[var(--theme-bg-primary)] dark:bg-[var(--theme-bg-secondary)] border-2 border-[var(--theme-accent-quaternary)]/30 shadow-lg rounded-xl p-6 z-20 overflow-auto">
              <button className="close-details absolute top-3 right-3 bg-[var(--theme-accent-quaternary)]/10 hover:bg-[var(--theme-accent-quaternary)]/20 p-1.5 rounded-full text-[var(--theme-accent-quaternary)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h3 className="text-[var(--theme-accent-quaternary)] text-2xl md:text-3xl font-semibold mb-4">Creator HUD</h3>
              <p className="text-[var(--theme-text-primary)] text-base md:text-lg font-medium mb-4">for Notion</p>
              <p className="text-[var(--theme-text-primary)] text-sm md:text-base lg:text-lg mb-4">
                A custom Notion Template that works with Premiere Pro, and the data from our custom tools Scran.ar and Splitt to <strong>remove ALL the manual effort after filming</strong>.
              </p>
              <p className="text-[var(--theme-text-primary)] text-sm md:text-base lg:text-lg">
                Translation: It works out which video clip matches each script, and puts it into instantly editable timelines with all the relevant data and information.
              </p>
            </div>
          </div>
          
          {/* Scran.ar */}
          <div className="tool-card flex flex-col items-center bg-[var(--theme-surface)]/20 backdrop-blur-sm rounded-xl p-6 shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] transition-all duration-300 cursor-pointer group">
            <div className="relative flex items-center justify-center w-36 h-36 md:w-40 md:h-40">
              <div className="absolute inset-0 bg-[var(--theme-radial-glow)] opacity-50 blur-md rounded-full"></div>
              <img className="app-icon w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-110" src={appIcons.scranAr} alt="Scran.ar" />
            </div>
            <h3 className="text-[var(--theme-accent-tertiary)] text-2xl md:text-3xl font-normal mt-4 mb-1 text-center">Scran.ar</h3>
            <p className="text-[var(--theme-text-primary)] text-base md:text-lg mb-2 text-center">(beta)</p>
            <span className="text-[var(--theme-accent)] text-sm font-medium mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">Click for details</span>
            
            {/* Hidden description that appears on click */}
            <div className="tool-details hidden absolute top-0 left-0 right-0 bottom-0 bg-[var(--theme-surface)]/95 backdrop-blur-md rounded-xl p-6 z-20 overflow-auto">
              <button className="close-details absolute top-2 right-2 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h3 className="text-[var(--theme-accent-tertiary)] text-2xl md:text-3xl font-normal mb-4">Scran.ar</h3>
              <p className="text-[var(--theme-text-primary)] text-base md:text-lg mb-2">(beta)</p>
              <p className="text-[var(--theme-text-secondary)] text-sm md:text-base lg:text-lg mb-3">
                A powerful video ingest application, specifically for editing buckets of shorts, <strong>quickly</strong>.
              </p>
              <p className="text-[var(--theme-text-secondary)] text-sm md:text-base lg:text-lg">
                This tool knows everything about your raw footage before even you do (not in a scary AI way).
              </p>
            </div>
          </div>
          
          {/* Splitt */}
          <div className="tool-card flex flex-col items-center bg-[var(--theme-surface)]/20 backdrop-blur-sm rounded-xl p-6 shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] transition-all duration-300 cursor-pointer group">
            <div className="relative flex items-center justify-center w-36 h-36 md:w-40 md:h-40">
              <div className="absolute inset-0 bg-[var(--theme-radial-glow)] opacity-50 blur-md rounded-full"></div>
              <img className="app-icon w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-110" src={appIcons.spitt} alt="Splitt" />
            </div>
            <h3 className="text-[var(--theme-accent-secondary)] text-2xl md:text-3xl font-normal mt-4 mb-1 text-center">Splitt</h3>
            <p className="text-[var(--theme-text-primary)] text-base md:text-lg mb-2 text-center">Premiere Pro extension</p>
            <span className="text-[var(--theme-accent)] text-sm font-medium mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">Click for details</span>
            
            {/* Hidden description that appears on click */}
            <div className="tool-details hidden absolute top-0 left-0 right-0 bottom-0 bg-[var(--theme-surface)]/95 backdrop-blur-md rounded-xl p-6 z-20 overflow-auto">
              <button className="close-details absolute top-2 right-2 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h3 className="text-[var(--theme-accent-secondary)] text-2xl md:text-3xl font-normal mb-4">Splitt</h3>
              <p className="text-[var(--theme-text-primary)] text-base md:text-lg mb-2">A Premiere Pro extension for Scran.ar</p>
              <p className="text-[var(--theme-text-secondary)] text-sm md:text-base lg:text-lg mb-3">
                Video editing can be cruel, whether you're the one doing it or not.
              </p>
              <p className="text-[var(--theme-text-secondary)] text-sm md:text-base lg:text-lg">
                This tool works natively with Premiere Pro and the data from Scran.ar to, in a single click of a button, create aptly named timelines (from your notion data) and populate them with the appropriate footage.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6 md:gap-8 relative z-10">
        <div className="text-center text-[var(--theme-text-primary)] text-xl md:text-2xl lg:text-3xl font-normal">
          The best part is, all of these developments are seamlessly integrated, meaning:
        </div>
        <div className="text-center text-[var(--theme-accent)] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">
          They speak to each other
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          All 'busy work' is eliminated.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          <span className="font-semibold">Plus we've got more in the works:</span> Custom analytics tools, video editing automators, AI driven 'authentic performance' checkers… and more
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          As part of <span className="font-semibold">Vertical Shortcut alpha</span>, you will have permanent access to the entire code suite, as well as early access to all the updates and expansions we make to the course, when we're happy to offer these publicly.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          Trust us, this will save you HOURS.
        </div>
        <div className="text-center text-[var(--theme-text-primary)] text-lg md:text-xl lg:text-2xl">
          (And don't worry if you're a code newbie, the Creator HUD, Scran.ar and Splitt are incredibly easy to install, use and run — but we'll chuck in some free tech support if you want a hand)
        </div>
      </div>
      
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--theme-text-primary)/0.03_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default ConnectEverything;