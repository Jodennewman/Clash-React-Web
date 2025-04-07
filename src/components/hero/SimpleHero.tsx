import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import AnimatedLogo from '../logos/AnimatedLogo';
import IsometricGridBackground from './IsometricPattern';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';

interface SimpleHeroProps {
  onCtaClick?: () => void;
}

interface HeadlineData {
  main: string;
  middle: string;
  end: string;
}

const SimpleHero = React.forwardRef<HTMLDivElement, SimpleHeroProps>(
  ({ onCtaClick }, ref) => {
    const [logoAnimationStarted, setLogoAnimationStarted] = useState(false);
    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
    const [prevHeadlineIndex, setPrevHeadlineIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const headlineRef = useRef<HTMLDivElement>(null);
    const headlineMainRef = useRef<HTMLSpanElement>(null);
    const headlineMiddleRef = useRef<HTMLSpanElement>(null);
    const headlineEndRef = useRef<HTMLSpanElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    
    // Timeline references
    const mainTl = useRef<gsap.core.Timeline | null>(null);
    
    // Headline data with different parts to maintain formatting
    const headlines: HeadlineData[] = [
      {
        main: "Billions",
        middle: " of views,",
        end: "zero ad spend."
      },
      {
        main: "No hacky",
        middle: " templates,",
        end: "no bullsh*t"
      },
      {
        main: "Content",
        middle: " that actually",
        end: "feels like YOU"
      }
    ];

    // Auto-start content fade-in after a shorter delay for better flow with logo animation
    useEffect(() => {
      const timer = setTimeout(() => {
        setLogoAnimationStarted(true);
      }, 300); // Reduced from 600ms to 300ms for quicker start
      
      return () => clearTimeout(timer);
    }, []);

    // Initialize SplitType for text animation
    useGSAP(() => {
      if (!headlineRef.current) return;
      
      // Initialize split text on each headline part
      const splitOptions = { 
        types: 'words',
        wordClass: 'headline-word'
      };
      
      // Split text for each headline section
      if (headlineMainRef.current) {
        new SplitType(headlineMainRef.current, splitOptions);
      }
      
      if (headlineMiddleRef.current) {
        new SplitType(headlineMiddleRef.current, splitOptions);
      }
      
      if (headlineEndRef.current) {
        new SplitType(headlineEndRef.current, splitOptions);
      }
      
    }, [currentHeadlineIndex]);

    // Rotate headlines with advanced animation
    useEffect(() => {
      let rotationInterval: NodeJS.Timeout | null = null;
      
      // Only start rotating after initial animation and if not currently animating
      const startRotation = () => {
        if (logoAnimationStarted && !isAnimating) {
          rotationInterval = setInterval(() => {
            setPrevHeadlineIndex(currentHeadlineIndex);
            setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
          }, 4000); // Change headline every 4 seconds
        }
      };
      
      startRotation();
      
      return () => {
        if (rotationInterval) clearInterval(rotationInterval);
      };
    }, [logoAnimationStarted, isAnimating, currentHeadlineIndex, headlines.length]);

    // Handle headline animation whenever currentHeadlineIndex changes
    useGSAP(() => {
      if (!headlineRef.current || prevHeadlineIndex === currentHeadlineIndex) return;
      
      // Get theme variables for animations
      const styles = getComputedStyle(document.documentElement);
      const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.5');
      
      const ctx = gsap.context(() => {
        setIsAnimating(true);
        
        // Create main timeline
        mainTl.current = gsap.timeline({
          onComplete: () => setIsAnimating(false)
        });
        
        // 1. Animate out each word of the current headline with staggered upward movement
        const mainWords = headlineMainRef.current?.querySelectorAll('.headline-word');
        const middleWords = headlineMiddleRef.current?.querySelectorAll('.headline-word');
        const endWords = headlineEndRef.current?.querySelectorAll('.headline-word');
        
        // Animate main words first
        if (mainWords?.length) {
          mainTl.current.to(mainWords, {
            y: -60,
            opacity: 0,
            stagger: 0.05,
            duration: animDuration * 0.5,
            ease: "power2.in"
          }, 0);
        }
        
        // Animate middle words
        if (middleWords?.length) {
          mainTl.current.to(middleWords, {
            y: -60,
            opacity: 0,
            stagger: 0.05,
            duration: animDuration * 0.5,
            ease: "power2.in"
          }, 0.1);
        }
        
        // Animate end words
        if (endWords?.length) {
          mainTl.current.to(endWords, {
            y: -60,
            opacity: 0,
            stagger: 0.05,
            duration: animDuration * 0.5,
            ease: "power2.in"
          }, 0.2);
        }
        
        // After animation completes, re-initialize SplitType on the new content
        mainTl.current.add(() => {
          // Force a reset of SplitType once the elements are invisible
          if (headlineMainRef.current) {
            headlineMainRef.current.innerHTML = headlines[currentHeadlineIndex].main;
          }
          
          if (headlineMiddleRef.current) {
            headlineMiddleRef.current.innerHTML = headlines[currentHeadlineIndex].middle;
          }
          
          if (headlineEndRef.current) {
            headlineEndRef.current.innerHTML = headlines[currentHeadlineIndex].end;
          }
          
          // Re-split the text
          const splitOptions = { 
            types: 'words',
            wordClass: 'headline-word'
          };
          
          if (headlineMainRef.current) {
            new SplitType(headlineMainRef.current, splitOptions);
          }
          
          if (headlineMiddleRef.current) {
            new SplitType(headlineMiddleRef.current, splitOptions);
          }
          
          if (headlineEndRef.current) {
            new SplitType(headlineEndRef.current, splitOptions);
          }
          
          // Set initial state for incoming animation
          const newMainWords = headlineMainRef.current?.querySelectorAll('.headline-word');
          const newMiddleWords = headlineMiddleRef.current?.querySelectorAll('.headline-word');
          const newEndWords = headlineEndRef.current?.querySelectorAll('.headline-word');
          
          if (newMainWords?.length) {
            gsap.set(newMainWords, { y: 40, opacity: 0 });
          }
          
          if (newMiddleWords?.length) {
            gsap.set(newMiddleWords, { y: 40, opacity: 0 });
          }
          
          if (newEndWords?.length) {
            gsap.set(newEndWords, { y: 40, opacity: 0 });
          }
        });
        
        // 2. Animate in the new headline words with staggered upward movement
        mainTl.current.add(() => {
          // Get fresh references to the words after the content has been updated
          const newMainWords = headlineMainRef.current?.querySelectorAll('.headline-word');
          const newMiddleWords = headlineMiddleRef.current?.querySelectorAll('.headline-word');
          const newEndWords = headlineEndRef.current?.querySelectorAll('.headline-word');
          
          // Animate main words first
          if (newMainWords?.length) {
            gsap.to(newMainWords, {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: animDuration * 0.6,
              ease: "power2.out"
            });
          }
          
          // Animate middle words with slight delay
          if (newMiddleWords?.length) {
            gsap.to(newMiddleWords, {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: animDuration * 0.6,
              delay: 0.1,
              ease: "power2.out"
            });
          }
          
          // Animate end words with more delay
          if (newEndWords?.length) {
            gsap.to(newEndWords, {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: animDuration * 0.6,
              delay: 0.2,
              ease: "power2.out"
            });
          }
        });
      }, headlineRef);
      
      return () => {
        // Proper cleanup
        if (mainTl.current) {
          mainTl.current.kill();
        }
        ctx.revert();
      };
    }, [currentHeadlineIndex, prevHeadlineIndex]);

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
        className="bg-theme-primary relative h-screen w-full shadow-theme-md"
      >
        <IsometricGridBackground />
        {/* Theme-aware floating elements for visual interest */}
        <div className="absolute top-40 left-[15%] w-28 h-28 rounded-[40%] rotate-12
                      opacity-theme-float
                      bg-theme-float-primary
                      animate-float-slow md:block"></div>
        <div className="absolute bottom-40 right-[10%] w-36 h-36 rounded-[30%] -rotate-6
                      opacity-theme-float-secondary
                      bg-theme-float-secondary
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
          <div style={{ gridColumn: '5 / 6', gridRow: '1 / 3' }} className="w-full h-full bg-theme-accent-secondary z-10" /> {/* Teal block */}
          <div style={{ gridColumn: '6 / 8', gridRow: '1 / 4' }} className="w-full h-full bg-theme-primary z-10" /> {/* Orange block */}
          <div style={{ gridColumn: '8 / 10', gridRow: '1 / 5' }} className="w-full h-full bg-theme-accent-coral z-10" /> {/* Red block */}
          
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
                {logoAnimationStarted ? (
                  <AnimatedLogo 
                    key="stable-logo-key"
                    className="w-full h-full object-contain"
                    onAnimationComplete={() => {/* Keep for reference but no longer needed */}}
                  />
                ) : null}
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
              <div 
                ref={headlineRef} 
                className="hero-content mb-4 lg:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-theme-primary transition-all duration-500 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] lg:min-h-[8rem] overflow-hidden"
              >
                <span 
                  ref={headlineMainRef}
                  className="headline-main inline-block font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-accent-tertiary transition-all duration-500"
                >
                  {headlines[currentHeadlineIndex].main}
                </span>
                <span 
                  ref={headlineMiddleRef}
                  className="headline-middle inline-block font-light"
                >
                  {headlines[currentHeadlineIndex].middle}
                </span>
                <span 
                  ref={headlineEndRef}
                  className="headline-end font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl transition-all duration-500"
                >
                  {headlines[currentHeadlineIndex].end}
                </span>
              </div>
            </div>

            {/* Subheading now attached to heading */}
            <div className="z-10">
              <h4 className="hero-content text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-8 text-theme-primary transition-all duration-500">
                <span>A </span>
                <span className="text-theme-accent-tertiary font-bold">proven, turn-key system </span>
                <span className="inline md:hidden">for short form content.</span>
                <span className="hidden md:inline">to survive, thrive, </span>
                <span className="hidden md:block">and monetise with short form content,</span>
                <span className="hidden md:block">for founders.</span>
              </h4>
              
              {/* Animated Buttons with responsive sizes */}
              <div className="hero-content flex flex-wrap gap-2 sm:gap-3 lg:gap-4 transition-all duration-500">
                <AnimatedButton 
                  text="Apply Now"
                  variant="start"
                  saturation="high"
                  size="md"
                  onClick={onCtaClick}
                  className="w-auto text-sm sm:text-base"
                />
                <AnimatedButton 
                  text="Book a Call"
                  variant="docs"
                  saturation="normal"
                  size="md"
                  className="w-auto text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add a style tag for the split text animation classes */}
        <style jsx>{`
          .headline-word {
            display: inline-block;
            margin-right: 0.15em;
            overflow: hidden;
          }
          
          .headline-main, .headline-middle, .headline-end {
            white-space: normal;
          }
          
          .headline-main {
            margin-right: 0.15em;
          }
          
          .headline-middle {
            margin-right: 0;
          }
          
          .headline-end {
            display: block;
            margin-top: 0.25em;
          }
        `}</style>
      </section>
    );
  }
);

SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;