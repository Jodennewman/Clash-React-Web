import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getImage } from "../../utils/imageMap";

interface ConnectEverythingProps {
  // Add any props you might need here
}

export const ConnectEverything: React.FC<ConnectEverythingProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use our image mapping utility to get the actual images
  const appIcons = {
    creatorHud: getImage('main', 'AppIcons', 'Hud') || '',
    scranAr: getImage('main', 'AppIcons', 'Scran-ar') || '',
    spitt: getImage('main', 'AppIcons', 'Scranar-prPRO extension') || ''
  };

  // Simplified GSAP animations to reduce lag
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Only do minimal icon animations - simplified to reduce lag
      gsap.utils.toArray<Element>('.app-icon').forEach((icon, index) => {
        // Simple floating animation instead of complex 3D movement
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
      
      // Simplified glow effect - just one simple animation per glow
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

      // No scroll triggers anymore - all animations are just looping
      // to prevent lag from scroll-based animations
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-[1874px] h-[3383px] px-64 py-6 bg-radial-[at_75%_-11%] from-cyan-950 to-black to-78% inline-flex flex-col justify-center items-center gap-40 overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        <div className="absolute bottom-[20%] left-[15%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center gap-20 lg:gap-40 relative z-10">
        {/* Header section */}
        <div className="flex flex-col justify-start items-center gap-8 max-w-5xl text-center mt-5">
          <div className="relative inline-block">
            <h2 className="connect-animate text-white text-4xl md:text-5xl lg:text-7xl font-semibold relative z-10">
              Connect Everything
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          
          <p className="connect-animate text-white text-xl md:text-2xl lg:text-4xl max-w-2xl lg:max-w-4xl">
            Short-form is still a new medium, and most modern video pipelines just aren't fit to deal with the quantity (and quality) demands of the medium.
          </p>
          
          <div className="connect-animate relative px-4 py-6 md:py-10 rounded-xl bg-gradient-to-br from-cyan-950/30 to-slate-900/30 backdrop-blur-sm border border-cyan-800/20">
            <p className="text-white text-xl md:text-3xl lg:text-5xl font-semibold max-w-3xl lg:max-w-5xl">
              Packaged intrinsically with the Vertical Shortcut are utilities, apps, and extensions we've developed in house.
            </p>
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>
          </div>
          
          <p className="connect-animate text-white text-xl md:text-2xl lg:text-4xl max-w-2xl lg:max-w-4xl">
            Altogether implementing these made our team about <span className="text-orange-400 font-semibold">4x more efficient</span> as an agency, while also increasing quality
          </p>
        </div>

        {/* Tools section */}
        <div className="w-full max-w-5xl flex flex-col gap-24 justify-center items-center">
          {/* Creator HUD Tool */}
          <div className="tool-card flex flex-col lg:flex-row gap-12 items-center">
            <div className="relative group">
              <div className="app-icon-glow absolute inset-0 rounded-xl bg-sky-400/10 blur-xl"></div>
              <img 
                className="app-icon w-64 h-64 lg:w-72 lg:h-72 rounded-xl object-cover shadow-[0px_0px_50px_0px_rgba(66,206,255,0.4)]"
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
              <div className="mb-3 relative inline-block">
                <h3 className="text-sky-300 text-3xl lg:text-6xl font-normal leading-tight">
                  Creator HUD
                </h3>
                <div className="absolute -bottom-1 left-0 w-16 h-[2px] bg-sky-400/60"></div>
              </div>
              
              <div className="flex items-center mb-5">
                <div className="h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-2">
                  <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                </div>
                <p className="text-white/90 text-lg lg:text-2xl">for Notion</p>
              </div>
              
              <p className="text-white/80 text-base lg:text-xl mt-4 leading-relaxed">
                A custom-code heavy Notion Template. This tool works natively with Premiere Pro and
                the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
              </p>
              
              <div className="mt-5 flex items-center">
                <div className="h-2 w-2 rounded-full bg-sky-400 mr-2"></div>
                <span className="text-sky-300/80 text-sm">Import/Export API</span>
                <div className="h-2 w-2 rounded-full bg-sky-400 mx-2"></div>
                <span className="text-sky-300/80 text-sm">Automation</span>
              </div>
            </div>
          </div>

          {/* Scran.ar Tool */}
          <div className="tool-card flex flex-col lg:flex-row gap-12 items-center">
            <div className="relative group">
              <div className="app-icon-glow absolute inset-0 rounded-xl bg-rose-400/10 blur-xl"></div>
              <img 
                className="app-icon w-64 h-64 lg:w-72 lg:h-72 rounded-xl object-cover shadow-[0px_0px_50px_0px_rgba(254,163,93,0.4)]" 
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
              <div className="mb-3 relative inline-block">
                <h3 className="text-rose-200 text-3xl lg:text-6xl font-normal leading-tight">
                  Scran.ar
                </h3>
                <div className="absolute -bottom-1 left-0 w-16 h-[2px] bg-rose-400/60"></div>
              </div>
              
              <div className="inline-block px-2 py-1 rounded bg-rose-500/20 mb-3">
                <p className="text-white/90 text-xs font-medium uppercase tracking-wide">Video Ingest System</p>
              </div>
              
              <p className="text-white/80 text-base lg:text-xl leading-relaxed">
                A powerful video ingest application, specifically for editing buckets of shorts, <span className="font-medium">quickly</span>.
                <span className="block mt-4 text-sm lg:text-base opacity-90">
                  By communicating directly with the Creator HUD, this tool knows everything about your raw footage before even you do.
                </span>
              </p>
              
              <div className="mt-5 flex items-center">
                <div className="h-2 w-2 rounded-full bg-rose-400 mr-2"></div>
                <span className="text-rose-200/80 text-sm">Machine Learning</span>
                <div className="h-2 w-2 rounded-full bg-rose-400 mx-2"></div>
                <span className="text-rose-200/80 text-sm">Fast Processing</span>
              </div>
            </div>
          </div>

          {/* Spitt Tool */}
          <div className="tool-card flex flex-col lg:flex-row gap-12 items-center">
            <div className="relative group">
              <div className="app-icon-glow absolute inset-0 rounded-xl bg-purple-400/10 blur-xl"></div>
              <img 
                className="app-icon w-64 h-64 lg:w-72 lg:h-72 rounded-xl object-cover shadow-[0px_0px_50px_0px_rgba(202,54,255,0.4)]" 
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
              <div className="mb-3 relative inline-block">
                <h3 className="text-purple-400 text-3xl lg:text-6xl font-normal leading-tight">
                  Spitt
                </h3>
                <div className="absolute -bottom-1 left-0 w-16 h-[2px] bg-purple-400/60"></div>
              </div>
              
              <div className="inline-block px-2 py-1 rounded bg-purple-500/20 mb-3">
                <p className="text-white/90 text-xs font-medium uppercase tracking-wide">Premiere Pro Extension</p>
              </div>
              
              <p className="text-white/80 text-base lg:text-xl leading-relaxed">
                A Premiere Pro Extension for Scran.ar. Video editing can be cruel, whether you're the one doing it or not.
                <span className="block mt-4">
                  This tool works natively with Premiere Pro and the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.
                </span>
              </p>
              
              <div className="mt-5 flex items-center">
                <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                <span className="text-purple-200/80 text-sm">Auto Organization</span>
                <div className="h-2 w-2 rounded-full bg-purple-400 mx-2"></div>
                <span className="text-purple-200/80 text-sm">Time Saving</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integration section - using original design */}
        <div className="w-[1158px] min-h-72 text-center justify-center">
          <p className="text-white text-4xl font-normal">
            The best part is,<br/>
            all of these developments are <span className="text-white text-4xl font-semibold">seamlessly integrated</span><sup className="text-3xl font-semibold">**</sup>, meaning:<br/>
            <br/>
          </p>
          <p className="text-orange-400 text-6xl font-semibold">
            They speak to each-other.<br/>
          </p>
          <p className="text-white text-4xl font-normal mt-8">
            So, so much easier.<br/>
          </p>
          <p className="text-white text-2xl font-normal mt-4">
            **Seams may still be present.
          </p>
        </div>

        {/* Cohort section - using original design */}
        <div className="w-[1074px] text-center justify-center">
          <p className="text-white text-4xl font-normal">
            We have custom analytics tools, video editing automators, A.I driven 'authentic performance' checkers.<br/><br/>
            As we work towards offering more of our custom systems publicly, you, as a part of <span className="text-blue-500 text-4xl font-semibold">Vertical Shortcut Cohort α</span>, will have permanent access to the entire suite, as well as permanent updates and expansions to the course. <br/><br/>
            You would be one of the only 12 people we would include in this alpha testing group.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConnectEverything;