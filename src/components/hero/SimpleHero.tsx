import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedLogo from '../logos/AnimatedLogo';
import IsometricGridBackground from './IsometricPattern';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';

interface SimpleHeroProps {
  onCtaClick?: () => void;
}

const SimpleHero = React.forwardRef<HTMLDivElement, SimpleHeroProps>(
  ({ onCtaClick }, ref) => {
    const [logoAnimationStarted, setLogoAnimationStarted] = useState(false);
   
    
    
    const heroRef = React.useRef<HTMLDivElement>(null);
    

    // Auto-start content fade-in after a shorter delay for better flow with logo animation
    useEffect(() => {
      const timer = setTimeout(() => {
        setLogoAnimationStarted(true);
      }, 300); // Reduced from 600ms to 300ms for quicker start
      
      return () => clearTimeout(timer);
    }, []);

    // Add GSAP animation for content elements
    useGSAP(() => {
      if (!heroRef.current) return;

      // First, ensure all hero content is visible even before animation
      gsap.set(".hero-content", { opacity: 1, visibility: "visible" });

      if (logoAnimationStarted) {
        const ctx = gsap.context(() => {
          // Staggered content reveal animation with reduced stagger time
          gsap.fromTo(".hero-content", 
            { 
              y: 30, 
              opacity: 0,
            }, 
            { 
              y: 0, 
              opacity: 1,
              duration: 0.8, 
              stagger: 0.08, // Reduced from 0.15 to 0.08 for less staggering
              ease: "power2.out"
            }
          );

          // Eyeball entrance animation with reduced delay
          gsap.fromTo("#eyeballSvg", 
            { 
              y: 60, // Reduced rise distance 
              opacity: 0,
              rotation: -2
            }, 
            { 
              y: 15, // Barely peek up
              opacity: 1,
              rotation: 0,
              duration: 1.2, 
              delay: 0.15, // Reduced from 0.4 to 0.15 for more overlap
              ease: "power2.out"
            }
          );
        }, heroRef);

        return () => ctx.revert(); // Proper cleanup
      }
    }, [logoAnimationStarted]);

    // Add cursor influence on eyeball
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        
        const eyeball = document.getElementById('eyeballSvg');
        if (!eyeball) return;
        
        // Calculate mouse position relative to window center
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const mouseXPercent = (e.clientX / windowWidth - 0.5) * 2; // -1 to 1
        const mouseYPercent = (e.clientY / windowHeight - 0.5) * 2; // -1 to 1
        
        // Apply subtle rotation based on mouse position
        gsap.to(eyeball, {
          rotation: mouseXPercent * 3, // Max 3 degree rotation based on X position
          rotationY: mouseYPercent * 2, // Max 2 degree perspective tilt based on Y position
          duration: 1.2, // Smooth, slower-than-cursor movement
          ease: "power1.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    return (
      <section 
        ref={ref} 
        className="vs-section-light relative h-screen w-full shadow-theme-md"
      >
        <IsometricGridBackground />
        {/* Theme-aware floating elements for visual interest */}
        <div className="absolute top-40 left-[15%] w-28 h-28 rounded-[40%] rotate-12
                       opacity-[var(--theme-float-opacity)]
                       bg-[var(--theme-float-bg-primary)]
                       animate-float-slow md:block"></div>
        <div className="absolute bottom-40 right-[10%] w-36 h-36 rounded-[30%] -rotate-6
                       opacity-[var(--theme-float-opacity-secondary)]
                       bg-[var(--theme-float-bg-secondary)]
                       animate-float-medium md:block"></div>
        {/* Grid Layout */}
        <div 
          ref={heroRef}
          className="w-full h-full relative"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr) minmax(0, 2.618fr) minmax(0, 4.237fr) minmax(0, 2.618fr) minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr)',
            gridTemplateRows: 'minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr) minmax(0, 2.618fr) minmax(0, 4.237fr) minmax(0, 2.618fr) minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr)'
            // Removed red grid lines
          }}
        >
          {/* Color blocks positioned in grid */}
          <div style={{ gridColumn: '5 / 6', gridRow: '1 / 3' }} className="w-full h-full bg-[var(--theme-accent-secondary)] z-10" /> {/* Teal block */}
          <div style={{ gridColumn: '6 / 8', gridRow: '1 / 4' }} className="w-full h-full bg-[var(--theme-primary)] z-10" /> {/* Orange block */}
          <div style={{ gridColumn: '8 / 10', gridRow: '1 / 5' }} className="w-full h-full bg-[var(--theme-accent-coral)] z-10" /> {/* Red block */}
          
          {/* Animated VS Logo */}
          <div 
            className="flex items-center justify-center z-20
                      col-[1_/_5] row-[3_/_9] 
                      sm:col-[2_/_5] sm:row-[3_/_9]
                      md:col-[2_/_5] md:row-[3_/_9]
                      lg:col-[2_/_5] lg:row-[3_/_9]"
          >
            <div className="relative flex items-center justify-center
                          -translate-x-[5%] sm:translate-x-0
                          translate-y-[5%] sm:translate-y-0">
              {/* Logo wrapper with fixed dimensions at each breakpoint */}
              <div className="
                relative 
                w-[240px] h-[240px] 
                sm:w-[320px] sm:h-[320px] 
                md:w-[400px] md:h-[400px] 
                lg:w-[500px] lg:h-[500px] 
                xl:w-[650px] xl:h-[650px]
                2xl:w-[750px] 2xl:h-[750px]
                transition-all duration-500"
              >
                <AnimatedLogo 
                  className="w-full h-full object-contain" 
                  onAnimationComplete={() => {/* Keep for reference but no longer needed */}}
                />
              </div>
            </div>
          </div>
          
          {/* Eyeball SVG positioned in grid but maintaining size */}
          <div 
            className="relative z-0
                      col-[1_/_4] row-[7_/_9]
                      sm:col-[1_/_4] sm:row-[7_/_9]
                      md:col-[1_/_4] md:row-[7_/_9]"
          >
            <svg
              width="679"
              height="600"
              viewBox="0 0 679 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="eyeballSvg"
              className="
                w-[320px] h-auto
                sm:w-[350px] md:w-[420px] lg:w-[500px] xl:w-[567px]
                absolute bottom-[-240px] left-0
                translate-y-[60px] -translate-x-[30px]
                sm:translate-y-[80px] sm:-translate-x-[40px]
                md:translate-y-[90px] md:-translate-x-[45px]
                lg:translate-y-[100px] lg:-translate-x-[50px]
                opacity-0
                transition-all duration-500
                animate-float-gentle
              "
              aria-hidden="true"
            >
              <circle
                cx="331.484"
                cy="347.484"
                r="231.656"
                transform="rotate(-90 331.484 347.484)"
                fill="var(--theme-eyeball-outer)"
              />
              <ellipse
                cx="387.704"
                cy="307.815"
                rx="143.553"
                ry="143.168"
                transform="rotate(-90 387.704 307.815)"
                fill="var(--theme-eyeball-iris)"
              />
              <path
                d="M324.537 240.611C337.361 218.609 357.976 202.262 382.267 194.834C406.558 187.406 432.737 189.444 455.577 200.541C478.417 211.637 496.239 230.976 505.483 254.697C514.727 278.417 514.714 304.773 505.446 328.503C496.178 352.233 478.337 371.59 455.485 382.711C432.634 393.832 406.453 395.897 382.169 388.495C357.886 381.092 337.287 364.767 324.486 342.778C311.684 320.789 307.622 294.755 313.109 269.872L411.566 291.649L324.537 240.611Z"
                fill="var(--theme-eyeball-pupil)"
              />
            </svg>
          </div>

          {/* VS Logo Header - Now hidden as we have the animated logo */}
          <header style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} className="flex items-center">
            <div className="text-5xl text-theme-primary max-sm:text-4xl opacity-0">VS</div>
          </header>

          {/* HeroHeadline with attached subheading */}
          <div 
            className="flex flex-col z-20
                     col-[4_/_9] row-[4_/_6] 
                     sm:col-[5_/_9] sm:row-[4_/_6]
                     md:col-[5_/_9] md:row-[4_/_6]
                     lg:col-[5_/_9] lg:row-[4_/_6]
                     px-4 sm:px-0 transition-all duration-500
                     max-w-[95%] sm:max-w-none"
          >
            <div className="flex items-center">
              <h1 className="hero-content mb-4 lg:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-theme-primary transition-all duration-500">
                <span className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-accent-tertiary transition-all duration-500">
                  1 Billion+
                </span>
                <span className="font-light"> views,</span>
                <span className="font-normal block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl transition-all duration-500">
                  zero ad spend
                </span>
              </h1>
            </div>

            {/* Subheading now attached to heading */}
            <div className="z-10">
              <h4 className="hero-content body-text-large mb-4 sm:mb-6 lg:mb-8 text-theme-primary transition-all duration-500">
                The proven system to survive, thrive and monetise with short form content 
                <span className="hidden md:inline"> — specifically for founders</span>.
              </h4>
              
              {/* Award Badge - Pill-shaped with prominent #1 */}
              <div className="hero-content absolute bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-24 right-8 sm:right-12 md:right-16 lg:right-20 z-30">
                <div className="group relative overflow-hidden hover-bubbly-sm rounded-full 
                                shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_25px_rgba(239,98,82,0.4)]">
                  {/* Shadow background for depth */}
                  <div className="absolute inset-0 bg-theme-accent-quaternary shadow-theme-lg transform rotate-1 rounded-full"></div>
                  
                  {/* Main badge container - wider on desktop */}
                  <div className="relative flex items-center gap-3 md:gap-4 bg-theme-gradient-accent py-3 px-5 md:px-7 lg:px-8 rounded-full 
                                 shadow-theme-tertiary border border-white/20">
                    
                    {/* Trophy icon with prominent circle */}
                    <div className="relative flex-shrink-0">
                      {/* Outer glow for trophy */}
                      <div className="absolute inset-0 rounded-full bg-white/30 blur-[10px] transform scale-150
                                     dark:bg-white/40 dark:blur-[15px]"></div>
                      {/* Circle background */}
                      <div className="relative bg-white/25 rounded-full p-3 border-2 border-white/40 shadow-inner
                                     dark:bg-white/30 dark:border-white/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                             className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
                                       dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
                          <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"></path>
                          <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"></path>
                          <path d="M4 22h16"></path>
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                          <path d="M9 2v4"></path>
                          <path d="M15 2v4"></path>
                          <path d="M12 2v2"></path>
                          <path d="M12 6v2"></path>
                          <path d="M9 12H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                          <path d="M15 12h4.5a2.5 2.5 0 0 0 0-5H18"></path>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Text with increased emphasis */}
                    <div className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
                                  dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                      <span className="block text-sm uppercase tracking-wider font-bold letter-spacing-wide opacity-90">From the</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-black leading-none tracking-tight 
                                      bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent 
                                      drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
                                      dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                          #1
                        </span>
                        <span className="text-lg md:text-xl font-extrabold uppercase tracking-tight leading-none">
                          Short Form
                        </span>
                      </div>
                      <span className="block text-base md:text-lg font-bold uppercase tracking-tight">
                        Agency <span className="opacity-85">in the world</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced shine effect on hover */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
              
              {/* Animated Buttons with responsive sizes */}
              <div className="hero-content flex flex-wrap gap-2 sm:gap-3 lg:gap-4 transition-all duration-500">
                <AnimatedButton 
                  text="Get Your Plan"
                  variant="start"
                  saturation="high"
                  size="md"
                  onClick={onCtaClick}
                  className="w-auto text-sm sm:text-base"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }
);

SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;