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
    <div ref={containerRef} className="w-full md:max-w-7xl lg:max-w-full px-4 md:px-8 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-24 bg-gradient-to-b from-cyan-950 to-black flex flex-col justify-center items-center gap-12 md:gap-16 lg:gap-24 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-4xl">
        <div className="text-center">
          <span className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">Connect </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">Everything</span>
        </div>
        <div className="text-center text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal">
          Short-form is still a new medium, and most modern video pipelines just aren't fit to deal with the quantity (and quality) demands of the medium.
        </div>
        <div className="text-center text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          Packaged intrinsically with the Vertical Shortcut are utilities, apps, and extensions we've developed in house.
        </div>
        <div className="text-center text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal">
          Altogether implementing these made our team about 4x more efficient as an agency, while also increasing quality
        </div>
      </div>
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* Creator HUD */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 w-full">
          <img className="app-icon w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl" src={appIcons.creatorHud} alt="Creator HUD" />
          <div className="text-center md:text-left">
            <h3 className="text-sky-300 text-3xl md:text-4xl lg:text-5xl font-normal mb-1">Creator HUD</h3>
            <p className="text-white text-base md:text-lg lg:text-xl mb-2">for Notion</p>
            <p className="text-white text-sm md:text-base lg:text-lg">
              A custom-code heavy Notion Template<br />
              This tool works natively with Premiere Pro and the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
            </p>
          </div>
        </div>
        
        {/* Scran.ar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 w-full">
          <img className="app-icon w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl" src={appIcons.scranAr} alt="Scran.ar" />
          <div className="text-center md:text-left">
            <h3 className="text-rose-200 text-3xl md:text-4xl lg:text-5xl font-normal mb-1">Scran.ar</h3>
            <p className="text-white text-base md:text-lg lg:text-xl mb-2">(beta)</p>
            <p className="text-white text-sm md:text-base lg:text-lg">
              A powerful video ingest application, specifically for editing buckets of shorts, <strong>quickly</strong>.<br /><br />
              By communicating directly with the Creator HUD, this tool knows everything about your raw footage before even you do.
            </p>
          </div>
        </div>
        
        {/* Spitt.ar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 w-full">
          <img className="app-icon w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl" src={appIcons.spitt} alt="Spitt.ar" />
          <div className="text-center md:text-left">
            <h3 className="text-purple-500 text-3xl md:text-4xl lg:text-5xl font-normal mb-1">Spitt.ar</h3>
            <p className="text-white text-sm md:text-base lg:text-lg">
              A Premiere Pro Extension for Scran.ar<br /><br />
              Video editing can be cruel, whether you're the one doing it or not.<br /><br />
              This tool works natively with Premiere Pro and the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6 md:gap-8">
        <div className="text-center text-white text-xl md:text-2xl lg:text-3xl font-normal">
          The best part is,
        </div>
        <div className="text-center text-orange-400 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">
          They speak to each-other.
        </div>
        <div className="text-center text-white text-lg md:text-xl lg:text-2xl">
          As we work towards offering more of our custom systems publicly, you, as a part of
          <span className="text-blue-500 font-semibold"> Vertical Shortcut Cohort α</span>, 
          will have permanent access to the entire suite, as well as permanent updates and expansions to the course.
        </div>
        <div className="text-center text-white text-lg md:text-xl lg:text-2xl">
          We have custom analytics tools, video editing automators, A.I driven 'authentic performance' checkers.
        </div>
        <div className="text-center text-white text-lg md:text-xl lg:text-2xl">
          You would be one of the only 12 people we would
        </div>
      </div>
    </div>
  );
};

export default ConnectEverything;