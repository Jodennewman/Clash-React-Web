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

  // GSAP animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate headers and text on scroll
      gsap.utils.toArray<Element>('.connect-animate').forEach((element, i) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            delay: i * 0.1
          }
        );
      });

      // Advanced floating animation for app icons with 3D effect
      gsap.utils.toArray<Element>('.app-icon').forEach((icon, index) => {
        // Create a timeline for complex animations
        const tl = gsap.timeline({ repeat: -1 });
        
        // Random floating animation parameters for natural movement
        const floatDuration = 3 + Math.random() * 2; // 3-5 seconds
        const floatY = 10 + Math.random() * 5; // 10-15px movement
        const floatX = 5 + Math.random() * 3; // subtle horizontal movement
        
        // Initial position offset for staggered start
        const startDelay = index * 0.3;
        
        // Create 3D floating effect with multiple movements combined
        tl.to(icon, {
          y: `-=${floatY/2}`,
          x: `+=${floatX/2}`,
          rotationY: 2,
          rotationX: -1,
          scale: 1.02,
          duration: floatDuration/2,
          ease: "sine.inOut",
          delay: startDelay
        })
        .to(icon, {
          y: `+=${floatY}`,
          x: `-=${floatX}`,
          rotationY: -2,
          rotationX: 2,
          scale: 0.98,
          duration: floatDuration,
          ease: "sine.inOut"
        })
        .to(icon, {
          y: `-=${floatY/2}`,
          x: `+=${floatX/2}`,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: floatDuration/2,
          ease: "sine.inOut"
        });
        
        // Create hover interaction
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.05,
            rotationY: 10,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 20
          });
          
          // Also animate the glow on hover
          const parentEl = icon.parentElement;
          if (parentEl) {
            const glowEl = parentEl.querySelector('.app-icon-glow');
            if (glowEl) {
              gsap.to(glowEl, {
                opacity: 0.9, 
                scale: 1.2,
                duration: 0.4
              });
            }
          }
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotationY: 0,
            duration: 0.6,
            ease: "power2.inOut",
            zIndex: 10
          });
          
          // Reset glow on mouse leave
          const parentEl = icon.parentElement;
          if (parentEl) {
            const glowEl = parentEl.querySelector('.app-icon-glow');
            if (glowEl) {
              gsap.to(glowEl, {
                opacity: 0.6, 
                scale: 1,
                duration: 0.6
              });
            }
          }
        });
      });
      
      // Create dynamic glow pulse effect for app icons with randomized parameters
      gsap.utils.toArray<Element>('.app-icon-glow').forEach((glow, i) => {
        // Different parameters for each glow for more organic feel
        const delay = i * 0.8;
        const baseDuration = 3 + Math.random() * 2;
        const scaleAmount = 1.03 + (Math.random() * 0.06);
        
        // Create a timeline for complex glow animations
        const glowTl = gsap.timeline({
          repeat: -1,
          delay: delay
        });
        
        // Multi-stage animation for more interesting effect
        glowTl.to(glow, {
          opacity: 0.7,
          scale: scaleAmount,
          duration: baseDuration * 0.6,
          ease: "sine.inOut"
        })
        .to(glow, {
          opacity: 0.4,
          scale: 1,
          duration: baseDuration * 0.4,
          ease: "sine.inOut"
        })
        .to(glow, {
          opacity: 0.6,
          scale: scaleAmount * 0.95,
          duration: baseDuration * 0.5,
          ease: "sine.inOut"
        })
        .to(glow, {
          opacity: 0.3,
          scale: 0.98,
          duration: baseDuration * 0.3,
          ease: "sine.inOut"
        });
        
        // Random color shifts for extra visual interest
        if (i === 0) {
          // Cyan HUD glow variations
          glowTl.to(glow, {
            backgroundColor: "rgba(66, 206, 255, 0.15)",
            duration: baseDuration * 2,
            ease: "sine.inOut", 
            repeat: -1,
            yoyo: true
          }, 0);
        } else if (i === 1) {
          // Rose/Orange Scran.ar glow variations
          glowTl.to(glow, {
            backgroundColor: "rgba(254, 163, 93, 0.15)",
            duration: baseDuration * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          }, 0);
        } else {
          // Purple Spitt glow variations
          glowTl.to(glow, {
            backgroundColor: "rgba(202, 54, 255, 0.15)",
            duration: baseDuration * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          }, 0);
        }
      });

      // Animate tools cards when they come into view
      gsap.utils.toArray<Element>('.tool-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            delay: 0.1 + (i * 0.2)
          }
        );
      });
      
      // Animate the connector lines in the "They speak to each-other" section
      const animateConnectors = () => {
        // Connector vertical line animation
        gsap.fromTo('.connector-line-vertical', 
          { height: 0, opacity: 0 },
          { 
            height: '100%', 
            opacity: 0.6, 
            duration: 1.5, 
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.integration-section',
              start: 'top 70%'
            }
          }
        );
        
        // Horizontal connector lines with staggered animation
        gsap.fromTo('.connector-line-left', 
          { width: 0, opacity: 0 },
          { 
            width: '100%', 
            opacity: 0.8, 
            duration: 0.8, 
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.integration-section',
              start: 'top 60%'
            },
            onComplete: () => {
              // Animate data "pulse" along the line
              animateDataPulse('.connector-line-left');
            }
          }
        );
        
        gsap.fromTo('.connector-line-right', 
          { width: 0, opacity: 0 },
          { 
            width: '100%', 
            opacity: 0.8, 
            duration: 0.8, 
            delay: 0.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.integration-section',
              start: 'top 60%'
            },
            onComplete: () => {
              // Animate data "pulse" along the line
              animateDataPulse('.connector-line-right');
            }
          }
        );
      };
      
      // Data pulse animation along connector lines
      const animateDataPulse = (selector: string) => {
        // Create data pulse elements programmatically
        const line = document.querySelector(selector) as HTMLElement;
        if (!line) return;
        
        // Create moving data "packet" effect
        for (let i = 0; i < 3; i++) {
          const dataPulse = document.createElement('div');
          dataPulse.className = 'data-pulse absolute h-2 w-2 rounded-full bg-white/90';
          line.appendChild(dataPulse);
          
          // Set initial position
          gsap.set(dataPulse, { 
            left: selector.includes('left') ? '100%' : '0%',
            opacity: 0
          });
          
          // Animate pulse along the line
          gsap.to(dataPulse, {
            left: selector.includes('left') ? '0%' : '100%',
            opacity: function(i) {
              return gsap.utils.wrap([0, 0.8, 0, 0.8, 0], i); // Fade in and out
            },
            duration: 2 + (i * 0.5),
            delay: i * 1.5,
            ease: 'power1.inOut',
            repeat: -1,
            repeatDelay: 1
          });
        }
      };
      
      // Start connector animations
      animateConnectors();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-radial-[at_75%_-11%] from-cyan-950 to-black to-78% py-20 overflow-hidden relative">
      {/* Abstract tech background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        <div className="absolute bottom-[20%] left-[15%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Circuit-like patterns */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100 Q 250 50 500 100 T 1000 100" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" fill="none" />
          <path d="M0 200 Q 250 150 500 200 T 1000 200" stroke="rgba(251, 113, 133, 0.4)" strokeWidth="1" fill="none" />
          <path d="M0 300 Q 250 250 500 300 T 1000 300" stroke="rgba(167, 139, 250, 0.5)" strokeWidth="1" fill="none" />
        </svg>
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

        {/* Integration section with animated connector lines */}
        <div className="integration-section relative flex flex-col items-center gap-6 max-w-5xl text-center mt-10">
          {/* Connection visualization */}
          <div className="absolute -top-24 left-0 right-0 h-24 flex justify-center pointer-events-none opacity-60">
            <div className="connector-line-vertical w-[1px] h-full bg-gradient-to-b from-transparent to-orange-400"></div>
          </div>
          
          <div className="connect-animate w-full relative px-6 py-8 rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-950/20 to-transparent">
            <p className="text-white text-xl md:text-2xl lg:text-4xl">
              The best part is, all of these developments are <span className="font-semibold">seamlessly integrated</span><sup className="text-xl">**</sup>, meaning:
            </p>
            
            <div className="relative py-5">
              <p className="text-orange-400 text-3xl md:text-4xl lg:text-6xl font-semibold">
                They speak to each-other.
              </p>
              
              {/* Animated connector lines */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="connector-line-left absolute w-40 h-1 left-[-130px] bg-gradient-to-r from-sky-400 to-transparent overflow-visible"></div>
                <div className="connector-line-right absolute w-40 h-1 right-[-130px] bg-gradient-to-l from-purple-400 to-transparent overflow-visible"></div>
                
                {/* Data node indicators */}
                <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 -left-[150px] top-[-6px] shadow-[0_0_10px_rgba(56,189,248,0.6)] animate-pulse"></div>
                <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 -right-[150px] top-[-6px] shadow-[0_0_10px_rgba(167,139,250,0.6)] animate-pulse"></div>
              </div>
            </div>
            
            <p className="text-white text-xl md:text-2xl lg:text-4xl mt-8">
              So, so much easier.
            </p>
            
            <div className="absolute bottom-3 right-4">
              <p className="text-white/60 text-sm italic">
                **Seams may still be present.
              </p>
            </div>
          </div>
        </div>

        {/* Cohort section */}
        <div className="connect-animate max-w-5xl text-center rounded-2xl px-6 py-10 bg-gradient-to-r from-blue-950/30 to-indigo-900/30 border border-blue-800/20">
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-blue-500"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-blue-500"></div>
          
          <p className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed">
            We have custom analytics tools, video editing automators, A.I driven 'authentic performance' checkers.
            <span className="block my-6">
              As we work towards offering more of our custom systems publicly, you, as a part of <span className="text-blue-400 font-semibold">Vertical Shortcut Cohort α</span>, will have permanent access to the entire suite, as well as permanent updates and expansions to the course.
            </span>
            <span className="block mt-6 text-blue-300 font-medium">
              You would be one of the only 12 people we would include in this alpha testing group.
            </span>
          </p>
          
          <div className="mt-8 inline-flex items-center px-4 py-2 rounded-md bg-blue-600/20 border border-blue-500/40">
            <span className="inline-block size-3 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-blue-200 font-medium">Applications open until April 30th</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectEverything;