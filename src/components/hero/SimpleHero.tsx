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
      }, 600); // Start fading in content earlier while logo is still animating
      
      return () => clearTimeout(timer);
    }, []);

    // Add GSAP animation for content elements
    useGSAP(() => {
      if (!heroRef.current) return;

      // First, ensure all hero content is visible even before animation
      gsap.set(".hero-content", { opacity: 1, visibility: "visible" });

      if (logoAnimationStarted) {
        const ctx = gsap.context(() => {
          // Staggered content reveal animation for more organic flow
          gsap.fromTo(".hero-content", 
            { 
              y: 30, 
              opacity: 0,
            }, 
            { 
              y: 0, 
              opacity: 1,
              duration: 0.8, 
              stagger: 0.15,
              ease: "power2.out"
            }
          );
        }, heroRef);

        return () => ctx.revert(); // Proper cleanup
      }
    }, [logoAnimationStarted]);

    return (
      <section 
        ref={ref} 
        style={{backgroundColor: 'var(--bg-cream)'}} 
        className="relative h-screen w-full shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] dark:bg-[var(--bg-navy-darker)]"
      >
        <IsometricGridBackground />
        {/* Floating background elements for visual interest */}
        <div className="absolute top-40 left-[15%] w-28 h-28 rounded-[40%] rotate-12 opacity-10 bg-[var(--primary-orange)] animate-float-slow md:block"></div>
        <div className="absolute bottom-40 right-[10%] w-36 h-36 rounded-[30%] -rotate-6 opacity-5 bg-[var(--primary-orange-hover)] animate-float-medium md:block"></div>
        
        {/* Dark mode floating elements */}
        <div className="absolute top-10 left-[43%] w-28 h-28 rounded-[40%] rotate-8 opacity-25 vs-float-orange animate-float-slow hidden dark:block"></div>
        <div className="absolute bottom-3 right-[24%] w-36 h-36 rounded-[30%] -rotate-6 opacity-12 vs-float-teal animate-float-medium hidden dark:block"></div>
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
          <div style={{ gridColumn: '5 / 6', gridRow: '1 / 3' }} className="w-full h-full bg-[--secondary-teal] dark:bg-[--secondary-teal-light] z-10" /> {/* Teal block */}
          <div style={{ gridColumn: '6 / 8', gridRow: '1 / 4' }} className="w-full h-full bg-[--primary-orange] dark:bg-[--primary-orange-light] z-10" /> {/* Orange block */}
          <div style={{ gridColumn: '8 / 10', gridRow: '1 / 5' }} className="w-full h-full bg-[--accent-red] dark:bg-[--accent-coral] z-10" /> {/* Red block */}
          
          {/* Animated VS Logo */}
          <div style={{ gridColumn: '2 / 5', gridRow: '3 / 9' }} className="flex items-center justify-center z-20">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatedLogo 
                className="w-auto h-auto lg:max-w-[800px] md:max-w-[450px] sm:max-w-[350px]" 
                onAnimationComplete={() => {/* Keep for reference but no longer needed */}}
              />
            </div>
          </div>
          
          {/* Eyeball SVG positioned in grid but maintaining size */}
          <div style={{ gridColumn: '1 / 4', gridRow: '7 / 9' }} className="relative z-0">
            <svg
              width="679"
              height="332"
              viewBox="0 0 679 332"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[400px] md:w-[500px] lg:w-[567px] h-auto absolute bottom-0 left-0  translate-y-[100px] -translate-x-[50px] max-sm:translate-y-[50px] max-sm:-translate-x-[70px]"
              aria-hidden="true"
            >
              <circle
                cx="331.484"
                cy="347.484"
                r="231.656"
                transform="rotate(-90 331.484 347.484)"
                fill="white"
              />
              <ellipse
                cx="387.704"
                cy="307.815"
                rx="143.553"
                ry="143.168"
                transform="rotate(-90 387.704 307.815)"
                fill="#5F949F"
              />
              <path
                d="M324.537 240.611C337.361 218.609 357.976 202.262 382.267 194.834C406.558 187.406 432.737 189.444 455.577 200.541C478.417 211.637 496.239 230.976 505.483 254.697C514.727 278.417 514.714 304.773 505.446 328.503C496.178 352.233 478.337 371.59 455.485 382.711C432.634 393.832 406.453 395.897 382.169 388.495C357.886 381.092 337.287 364.767 324.486 342.778C311.684 320.789 307.622 294.755 313.109 269.872L411.566 291.649L324.537 240.611Z"
                fill="#122E3B"
              />
            </svg>
          </div>

          {/* VS Logo Header - Now hidden as we have the animated logo */}
          <header style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} className="flex items-center">
            <div className="text-5xl text-[--text-navy] dark:text-white max-sm:text-4xl opacity-0">VS</div>
          </header>

          {/* HeroHeadline */}
          <div style={{ gridColumn: '5 / 8', gridRow: '4 / 6' }} className="flex items-center z-20">
            <h1 className={`hero-content z-20 mb-6 lg:mb-10 text-5xl lg:text-7xl leading-tight text-[--text-navy] dark:text-white max-md:text-4xl max-sm:text-3xl `}>
              <span className="text-6xl z-20 lg:text-8xl text-[var(--accent-coral)]  max-md:text-5xl max-sm:text-4xl font-bold dark:text-[var(--accent-red)]">
                Over 1 billion
              </span>
              <span> views,</span>
              <span className="block z-20 text-5xl lg:text-7xl max-md:text-4xl max-sm:text-3xl">
                zero spent on ads
              </span>
            </h1>
          </div>

          {/* HeroSubheading */}
          <div style={{ gridColumn: '5 / 9', gridRow: '6' }} className="z-10">
            <p className={`hero-content text-4xl lg:text-4xl max-md:text-xl max-sm:text-lg mb-6 lg:mb-10 text-[--text-navy] dark:text-white `}>
              <span>A </span>
              <span className="text-[--accent-red] dark:text-[--primary-orange-light] font-bold">proven, turn-key system </span>
              <span className="inline md:hidden">for short form content.</span>
              <span className="hidden md:inline">to survive, thrive, and </span>
              <span className="hidden md:inline">monetise </span>
              <span className="hidden md:inline">with short form content, for founders.</span>
            </p>
            
            {/* Animated Buttons - more professional and consistent with the design system */}
            <div className={`hero-content flex flex-wrap gap-3 lg:gap-4`}>
              <AnimatedButton 
                text="Apply Now"
                variant="start"
                saturation="high"
                size="md"
                onClick={onCtaClick}
                className="w-auto"
              />
              <AnimatedButton 
                text="Book a Call"
                variant="docs"
                saturation="normal"
                size="md"
                className="w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;