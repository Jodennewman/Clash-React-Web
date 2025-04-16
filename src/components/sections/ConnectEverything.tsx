import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getImage } from "../../utils/imageMap";

interface ConnectEverythingProps {
  className?: string;
}

export const ConnectEverything: React.FC<ConnectEverythingProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use our image mapping utility to get the actual images
  const appIcons = {
    creatorHud: getImage('main', 'AppIcons', 'Hud') || '',
    scranAr: getImage('main', 'AppIcons', 'Scran-ar') || '',
    spitt: getImage('main', 'AppIcons', 'Scranar-prPRO extension') || ''
  };

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

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
        
        // Simple hover effect
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
      });
      
      // Simplified glow effect for performance
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className={`w-full min-h-screen py-16 md:py-24 lg:py-32 
                bg-gradient-to-b from-cyan-950 to-black
                flex flex-col justify-center items-center ${className}`}
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        <div className="absolute bottom-[20%] left-[15%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center gap-16 md:gap-24 relative z-10">
        {/* Header section */}
        <div className="flex flex-col justify-start items-center gap-8 max-w-5xl text-center mt-5">
          <div className="relative inline-block">
            <h2 className="connect-animate text-white text-4xl md:text-5xl font-semibold relative z-10 whitespace-nowrap">
              Connect Everything with Custom Tools
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          
          <p className="connect-animate text-white text-[25px] leading-tight max-w-2xl md:max-w-4xl">
            Short-form is still a new medium, and most modern video pipelines just aren't fit to deal with the quantity and quality demands of the medium.
          </p>
          
          <div className="connect-animate relative px-4 py-6 md:py-10 rounded-xl bg-gradient-to-br from-cyan-950/30 to-slate-900/30 backdrop-blur-sm border border-cyan-800/20">
            <p className="text-white text-[25px] leading-tight md:leading-snug font-semibold max-w-3xl md:max-w-4xl">
              Packaged intrinsically with the Vertical Shortcut are utilities, apps, and extensions we've developed in-house specifically for content creators.
            </p>
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>
          </div>
          
          <p className="connect-animate text-white text-[25px] leading-tight max-w-2xl md:max-w-4xl">
            Altogether implementing these made our team about <span className="text-orange-400 font-semibold">4x more efficient</span> as an agency, while also increasing content quality and consistency.
          </p>
        </div>

        {/* Tools section */}
        <div className="w-full max-w-5xl flex flex-col gap-20 md:gap-24 justify-center items-center">
          {/* Creator HUD Tool */}
          <div className="tool-card flex flex-col lg:flex-row gap-10 items-center w-full">
            <div className="relative group">
              <div className="app-icon-glow absolute inset-0 rounded-xl bg-sky-400/10 blur-xl"></div>
              <img 
                className="app-icon w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-xl object-cover shadow-[0px_0px_50px_0px_rgba(66,206,255,0.4)]"
                src={appIcons.creatorHud} 
                alt="Creator HUD" 
              />
              <div className="absolute -top-3 -right-3 flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-sky-400 px-3 text-xs text-white">
                <span className="relative z-10">NOTION</span>
              </div>
              
              {/* Tech decorators */}
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-sky-400 opacity-70"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-sky-400 opacity-70"></div>
            </div>
            
            <div className="max-w-md">
              <div className="mb-4 relative inline-block">
                <h3 className="text-sky-300 text-4xl md:text-5xl font-normal leading-tight whitespace-nowrap">
                  Creator HUD Dashboard
                </h3>
                <div className="absolute -bottom-1 left-0 w-20 h-[2px] bg-sky-400/60"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-2">
                  <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                </div>
                <p className="text-white/90 text-lg md:text-xl">for Notion</p>
              </div>
              
              <p className="text-white/80 text-[25px] leading-tight mt-4">
                A custom-code heavy Notion Template. This tool works natively with Premiere Pro and
                the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
              </p>
              
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-sky-400 mr-2"></div>
                  <span className="text-sky-300/80 text-sm">Import/Export API</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-sky-400 mr-2"></div>
                  <span className="text-sky-300/80 text-sm">Automation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scran.ar Tool */}
          <div className="tool-card flex flex-col lg:flex-row gap-10 items-center w-full">
            <div className="relative group">
              <div className="app-icon-glow absolute inset-0 rounded-xl bg-rose-400/10 blur-xl"></div>
              <img 
                className="app-icon w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-xl object-cover shadow-[0px_0px_50px_0px_rgba(254,163,93,0.4)]" 
                src={appIcons.scranAr}
                alt="Scran.ar" 
              />
              <div className="absolute -top-3 -right-3 flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-rose-600 to-orange-400 px-3 text-xs text-white">
                <span className="relative z-10">BETA</span>
              </div>
              
              {/* Tech decorators */}
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-rose-400 opacity-70"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-rose-400 opacity-70"></div>
            </div>
            
            <div className="max-w-md">
              <div className="mb-4 relative inline-block">
                <h3 className="text-rose-200 text-4xl md:text-5xl font-normal leading-tight whitespace-nowrap">
                  Scran.ar Processing System
                </h3>
                <div className="absolute -bottom-1 left-0 w-20 h-[2px] bg-rose-400/60"></div>
              </div>
              
              <div className="inline-block px-2 py-1 rounded bg-rose-500/20 mb-3">
                <p className="text-white/90 text-xs font-medium uppercase tracking-wide">Video Ingest System</p>
              </div>
              
              <p className="text-white/80 text-[25px] leading-tight">
                A powerful video ingest application, specifically for editing buckets of shorts, <span className="font-medium">quickly</span>.
                <span className="block mt-4 opacity-90">
                  By communicating directly with the Creator HUD, this tool knows everything about your raw footage before even you do.
                </span>
              </p>
              
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-rose-400 mr-2"></div>
                  <span className="text-rose-200/80 text-sm">Machine Learning</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-rose-400 mr-2"></div>
                  <span className="text-rose-200/80 text-sm">Fast Processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spitt Tool */}
          <div className="tool-card flex flex-col lg:flex-row gap-10 items-center w-full">
            <div className="relative group">
              <div className="app-icon-glow absolute inset-0 rounded-xl bg-purple-400/10 blur-xl"></div>
              <img 
                className="app-icon w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-xl object-cover shadow-[0px_0px_50px_0px_rgba(202,54,255,0.4)]" 
                src={appIcons.spitt}
                alt="Spitt" 
              />
              <div className="absolute -top-3 -right-3 flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-400 px-3 text-xs text-white">
                <span className="relative z-10">EXTENSION</span>
              </div>
              
              {/* Tech decorators */}
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-purple-400 opacity-70"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-purple-400 opacity-70"></div>
            </div>
            
            <div className="max-w-md">
              <div className="mb-4 relative inline-block">
                <h3 className="text-purple-400 text-4xl md:text-5xl font-normal leading-tight whitespace-nowrap">
                  Spitt Production Extension
                </h3>
                <div className="absolute -bottom-1 left-0 w-20 h-[2px] bg-purple-400/60"></div>
              </div>
              
              <div className="inline-block px-2 py-1 rounded bg-purple-500/20 mb-3">
                <p className="text-white/90 text-xs font-medium uppercase tracking-wide">Premiere Pro Extension</p>
              </div>
              
              <p className="text-white/80 text-[25px] leading-tight">
                A Premiere Pro Extension for Scran.ar. Video editing can be cruel, whether you're the one doing it or not.
                <span className="block mt-4">
                  This tool works natively with Premiere Pro and the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
                </span>
              </p>
              
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                  <span className="text-purple-200/80 text-sm">Auto Organization</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                  <span className="text-purple-200/80 text-sm">Time Saving</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration section */}
        <div className="w-full max-w-5xl bg-gradient-to-br from-cyan-950/30 to-slate-900/30 backdrop-blur-sm border border-cyan-800/20 py-8 px-4 rounded-xl text-center">
          <p className="text-white text-[25px] leading-tight">
            The best part is,<br className="sm:hidden"/>
            all of these developments are <span className="text-white font-semibold">seamlessly integrated with each other</span><sup className="text-xl font-semibold">**</sup>, meaning:
          </p>
          <p className="text-orange-400 text-4xl md:text-5xl font-semibold mt-6">
            They speak to each-other.
          </p>
          <p className="text-white text-[25px] leading-tight mt-6">
            So, so much easier.
          </p>
          <p className="text-white/70 text-lg mt-4">
            **Seams may still be present.
          </p>
        </div>

        {/* Cohort section */}
        <div className="w-full max-w-5xl bg-gradient-to-br from-slate-900/30 to-cyan-950/30 backdrop-blur-sm border border-cyan-800/20 py-8 px-4 rounded-xl text-center">
          <p className="text-white text-[25px] leading-tight">
            We have custom analytics tools, video editing automators, A.I driven 'authentic performance' checkers.
          </p>
          <p className="text-white text-[25px] leading-tight mt-6">
            As we work towards offering more of our custom systems publicly, you, as a part of <span className="text-blue-500 font-semibold">Vertical Shortcut Cohort Alpha</span>, will have permanent access to the entire suite, as well as permanent updates and expansions to the course.
          </p>
          <p className="text-white text-[25px] leading-tight mt-6 font-semibold">
            You would be one of the only 12 people we would include in this alpha testing group.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConnectEverything;