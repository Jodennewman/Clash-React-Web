import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
import AnimatedLogo from '../logos/AnimatedLogo';
import IsometricGridBackground from './IsometricPattern';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';
import SafeVideoEmbed from '../ui/video-embed';

interface SimpleHeroProps {
  onCtaClick?: () => void;
  videoUrl?: string;
  videoRef?: React.RefObject<HTMLDivElement>;
}

const SimpleHero = React.forwardRef<HTMLDivElement, SimpleHeroProps>(
  ({ onCtaClick, videoUrl, videoRef }, ref) => {
    const [logoAnimationStarted, setLogoAnimationStarted] = useState(false);
    
    // Internal refs
    const heroRef = React.useRef<HTMLDivElement>(null);
    const videoContainerRef = React.useRef<HTMLDivElement>(null);
    

    // Auto-start content fade-in after a shorter delay for better flow with logo animation
    useEffect(() => {
      const timer = setTimeout(() => {
        setLogoAnimationStarted(true);
      }, 300); // Reduced from 600ms to 300ms for quicker start
      
      
      return () => {
        clearTimeout(timer);
      };
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

          // Eyeball entrance animation with reduced delay and higher position
          gsap.fromTo("#eyeballSvg", 
            { 
              y: 100, // Starting position lower 
              opacity: 0,
              rotation: -2
            }, 
            { 
              y: -20, // Position higher to ensure visibility when scrolling
              opacity: 1,
              rotation: 0,
              duration: 1.2, 
              delay: 0.15,
              ease: "power2.out"
            }
          );
          
          // Add scroll trigger to keep eyeball visible when scrolling to next section
          ScrollTrigger.create({
            trigger: "#smooth-content",
            start: "top top",
            endTrigger: ".video-container",
            end: "top 20%",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to("#eyeballSvg", {
                y: -20 + (progress * -30), // Move up slightly as user scrolls down
                duration: 0.1,
                overwrite: "auto"
              });
            }
          });
          
          // Create scroll-linked animation for video (if present)
          if (videoContainerRef.current && videoUrl) {
            // Initial setup for video position
            gsap.set(videoContainerRef.current, {
              y: 200, // Start below the fold
              opacity: 0,
              scale: 0.9
            });

            // Much simpler approach - use a class toggle
            // Video popup functionality completely removed
          }
        }, heroRef);

        return () => ctx.revert(); // Proper cleanup
      }
    }, [logoAnimationStarted, videoUrl]);

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
        className="vs-section-light relative h-[110vh] sm:h-[125vh] w-full shadow-theme-md overflow-hidden z-10 pt-8 sm:pt-0"
      >
        {/* Award Badge - positioned with consistent bottom-right placement using top/right */}
        <div className="award-badge absolute top-[85vh] right-4 sm:right-6 md:right-8 lg:right-10 z-50" style={{ transform: 'translateY(0)', opacity: 1 }}>
          <div className="group relative overflow-hidden rounded-full shadow-lg transform scale-75 sm:scale-85 md:scale-90 lg:scale-100">
            {/* Subtle shadow background */}
            <div className="absolute inset-0 bg-theme-accent-secondary opacity-80 rounded-full"></div>
            
            {/* Main badge container - cleaner design */}
            <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4 bg-theme-accent-tertiary py-2 sm:py-3 px-3 sm:px-4 md:px-6 lg:px-7 rounded-full
                         border border-white/10">
              
              {/* Badge icon with subtle styling */}
              <div className="relative flex-shrink-0">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-[5px]"></div>
                {/* Circle background */}
                <div className="relative bg-white/20 rounded-full p-1 sm:p-2 border border-white/30">
                  <svg width="24" height="24" viewBox="0 0 370.04 370.04" fill="currentColor"
                       className="text-white drop-shadow-sm w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                    <path d="M341.668,314.412c0,0-41.071-70.588-48.438-83.248c8.382-2.557,17.311-4.815,21.021-11.221
                      c6.183-10.674-4.823-28.184-1.933-39.625c2.977-11.775,20.551-21.964,20.551-33.933c0-11.661-18.169-25.284-21.148-36.99
                      c-2.91-11.439,8.063-28.968,1.86-39.629c-6.203-10.662-26.864-9.786-35.369-17.97c-8.751-8.422-8.724-29.028-19.279-34.672
                      c-10.598-5.665-27.822,5.784-39.589,3.072C207.711,17.515,197.318,0,185.167,0c-12.331,0-31.944,19.868-35.02,20.583
                      c-11.761,2.734-29.007-8.687-39.594-2.998c-10.545,5.663-10.48,26.271-19.215,34.707c-8.491,8.199-29.153,7.361-35.337,18.035
                      c-6.183,10.672,4.823,28.178,1.934,39.625c-2.897,11.476-21.083,23.104-21.083,36.376c0,11.97,17.618,22.127,20.613,33.896
                      c2.911,11.439-8.062,28.966-1.859,39.631c3.377,5.805,11.039,8.188,18.691,10.479c0.893,0.267,2.582,1.266,1.438,2.933
                      c-5.235,9.036-47.37,81.755-47.37,81.755c-3.352,5.784-0.63,10.742,6.047,11.023l32.683,1.363
                      c6.677,0.281,15.053,5.133,18.617,10.786l17.44,27.674c3.564,5.653,9.219,5.547,12.57-0.236c0,0,48.797-84.246,48.817-84.27
                      c0.979-1.144,1.963-0.909,2.434-0.509c5.339,4.546,12.782,9.081,18.994,9.081c6.092,0,11.733-4.269,17.313-9.03
                      c0.454-0.387,1.559-1.18,2.367,0.466c0.013,0.026,48.756,83.811,48.756,83.811c3.36,5.776,9.016,5.874,12.569,0.214
                      l17.391-27.707c3.554-5.657,11.921-10.528,18.598-10.819l32.68-1.424C342.315,325.152,345.028,320.187,341.668,314.412z
                      M239.18,238.631c-36.136,21.023-79.511,18.77-112.641-2.127c-48.545-31.095-64.518-95.419-35.335-145.788
                      c29.516-50.95,94.399-68.928,145.808-40.929c0.27,0.147,0.537,0.299,0.805,0.449c0.381,0.211,0.761,0.425,1.14,0.641
                      c15.86,9.144,29.613,22.415,39.461,39.342C308.516,141.955,290.915,208.533,239.18,238.631z"/>
                    <path d="M230.916,66.103c-0.15-0.087-0.302-0.168-0.452-0.254C203.002,49.955,168,48.793,138.665,65.86
                      c-43.532,25.326-58.345,81.345-33.019,124.876c7.728,13.284,18.318,23.888,30.536,31.498c1.039,0.658,2.09,1.305,3.164,1.927
                      c43.579,25.247,99.568,10.333,124.814-33.244C289.405,147.338,274.495,91.35,230.916,66.103z M241.818,137.344l-15.259,14.873
                      c-4.726,4.606-7.68,13.698-6.563,20.203l3.602,21.001c1.116,6.505-2.75,9.314-8.592,6.243l-18.861-9.916
                      c-5.842-3.071-15.401-3.071-21.243,0l-18.86,9.916c-5.842,3.071-9.709,0.262-8.593-6.243l3.602-21.001
                      c1.116-6.505-1.838-15.597-6.564-20.203l-15.258-14.873c-4.727-4.606-3.249-9.152,3.282-10.102l21.086-3.064
                      c6.531-0.949,14.265-6.568,17.186-12.486l9.43-19.107c2.921-5.918,7.701-5.918,10.621,0l9.431,19.107
                      c2.921,5.918,10.654,11.537,17.186,12.486l21.086,3.064C245.067,128.192,246.544,132.738,241.818,137.344z"/>
                  </svg>
                </div>
              </div>
              
              {/* Text with more professional styling */}
              <div className="text-white drop-shadow-sm">
                <span className="block text-xs sm:text-sm md:text-base font-medium">From the</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-xl md:text-2xl font-bold leading-none">
                    #1
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                    Short Form Agency
                  </span>
                </div>
                <span className="hidden sm:block text-xs sm:text-sm md:text-base">
                  <span className="italic font-light">(we're deadly serious)</span>
                </span>
              </div>
            </div>
            
            {/* Enhanced shine effect on hover */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
          </div>
        </div>
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
                       
        {/* Video container - REMOVED as it's now a static section below */}
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
            className="flex items-center justify-center z-20 scale-140
                      col-[3_/_5] row-[2_/_3]
                      sm:col-[2_/_5] sm:row-[2_/_5]
                      md:col-[2_/_5] md:row-[2_/_5]
                      lg:col-[2_/_5] lg:row-[2_/_7]"
            data-speed="0.86"
          >
            <div className="relative flex items-center justify-center
                          -translate-x-[5%] sm:translate-x-0
                          translate-y-[5%] sm:translate-y-0">
              {/* Logo wrapper with fixed dimensions at each breakpoint */}
              <div className="
                relative 
                w-[200px] h-[200px]
                sm:w-[450px] sm:h-[450px]
                md:w-[550px] md:h-[550px]
                lg:w-[600px] lg:h-[600px]
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
            className="relative animate-float-slow z-0
                      col-[1_/_4] row-[5_/_7]
                      sm:col-[1_/_4] sm:row-[5_/_7]
                      md:col-[1_/_4] md:row-[5_/_7]"
            data-speed="0.9"
          >
            <svg
              width="679"
              height="600"
              viewBox="0 0 679 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="eyeballSvg"
              className="
                w-[260px] h-auto
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
            className="flex flex-col z-20 max-w-fit align-items-center items-center
                     col-[1_/_10] row-[4_/_7]
                     sm:col-[5_/_9] sm:row-[4_/_6] 
                     md:col-[5_/_9] md:row-[4_/_6]
                     lg:col-[5_/_9] lg:row-[4_/_6]
                     px-4 sm:px-0 transition-all duration-500 
                     mt-10 sm:mt-0
                     sm:max-w-none sm:ml-2"
            data-speed="0.95"
          >

              <div className="w-full px-4 sm:px-6 md:px-6 lg:px-8 xl:px-10 pr-0 sm:pr-0 md:pr-0 lg:pr-0">
                <div className="w-full max-w-full lg:max-w-[120%] overflow-x-hidden">
                  <h1 className="hero-content text-left mb-6 text-theme-primary transition-theme-fast duration-500">
                    <span className="inline font-semibold glow-theme-tertiary text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-accent-tertiary transition-all duration-500" data-speed="0.95">
                      Billions
                    </span>
                    <span className="inline-block ml-2 sm:ml-3 lg:ml-4 font-light text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl" data-speed="0.99">
                      of Views.
                    </span>
                    <span className="block font-normal text-3xl sm:text-4xl sm:font-light md:text-4xl lg:text-5xl xl:text-6xl transition-all duration-500 mt-2" data-speed="0.97">
                      Built for Founders.
                    </span>
                  </h1>
                  
                  <div className="h-6 sm:h-8 md:h-9 lg:h-10 w-full"></div>
                  
                  <p className="hero-content !text-lg !sm:text-2xl !md:text-3xl !lg:text-4xl mb-4 text-theme-primary !font-normal transition-theme-fast duration-500 leading-tight" style={{fontSize: "1.15rem", fontWeight: 400}} data-speed="0.99">
                    We've used vertical video to get founders and execs just like you, billions of views — in fact we're the top-performing agency in the world at doing exactly that.
                  </p>
                  
                  <div className="h-1 sm:h-2 md:h-3 lg:h-4 w-full"></div>
                  
                  <p className="hero-content text-left text-xs sm:text-sm md:text-base lg:text-lg mb-6 text-theme-primary/80 transition-all duration-500 pr-2 sm:pr-4 md:pr-6 w-full sm:w-[125%] max-w-full sm:max-w-[125%]" data-speed="0.99">
                    Now we've packaged everything it takes to build a brand from the ground up — not just the knowledge — but the strategy, custom programs, and infrastructure we've built, into a proven system so you can do it yourself. Zero guesswork. All results.
                  </p>
                </div>
              </div>
              
              
              {/* Animated Buttons with responsive sizes - moved further down */}
              <div className="hero-content relative w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12" style={{paddingLeft: 0}}>
                <div className="absolute left-0 flex flex-col sm:flex-row sm:items-center gap-4" style={{transform: "translateX(32px)"}}>
                  <AnimatedButton 
                    text="Get Your Plan"
                    variant="start"
                    saturation="high"
                    size="md"
                    onClick={onCtaClick}
                    className="w-auto text-sm sm:text-base"
                  />
                  <a href="https://calendly.com/clash-creation/15min" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center text-theme-primary hover:text-theme-accent-tertiary transition-colors duration-300">
                    <span className="text-theme-primary/60 mx-2">|</span>
                    <span className="text-sm sm:text-base font-medium underline-offset-4 hover:underline">Book in a call</span>
                  </a>
                  {/* Mobile "Book in a call" link removed */}
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