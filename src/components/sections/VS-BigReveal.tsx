import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRightCircle, Zap } from 'lucide-react';
import AnimatedLogo from '../../components/logos/AnimatedLogo';
import IsometricGridBackground from '../hero/IsometricPattern';
import { VSText, VSHeading, VSGradientText } from '../ui/vs-text';
import { VSCard, VSSection } from '../ui/vs-background';
import { useDeviceDetection } from '../../utils/animation-utils';
import courseUtils from "../../lib/course-utils";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Program details data
const programDetails = [
  { label: "Duration", value: "8 Weeks (ish)" },
  { label: "Commitment", value: "4 Hours a week" },
  { label: "Format", value: "Online + Live Sessions" },
  { label: "Next Cohort", value: "25th March, 2025", highlight: true },
  { label: "Class Size", value: "limited to 20 students" }
];


// Key features data from the copy
const keyFeatures = [
  { 
    title: "No more guesswork", 
    description: "Stop wondering why some videos work and others flop. We'll teach you exactly what drives success in the algorithm - and how to game it.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "All the tools you need", 
    description: "Everything you need to create short form: from basic theory, to advanced editing and monetisation. Taught through hundreds of video modules, PDFs and workshops. No bullsh*t templates or hack sheets.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "Everything you need to run a creative team", 
    description: "Knowing who to hire, where to hire them, and how to train them can seem impossible. And then trusting them to run your brand? … we know how hard it is. That's why we've included everything we've learnt on training, delegating, hiring and managing creative teams to manage short form content for founders and execs.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "Weekly live coaching", 
    description: "You'll have direct access to our team of experts — who've generated over 1 billion views — on weekly live coaching calls with you and some of the best founders and executives in the world, offering you personalised feedback and advice on your content.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "Private community access", 
    description: "You'll get access to our exclusive community of founders and executives also wanting to grow on short form, who can help with collaboration, feedback, and accountability. (Plus its a great networking opportunity, schmoozers we see you)",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "Our Custom in-house infrastructure", 
    description: "Plus custom in-house tools: CreatorHUD, Scran.ar and Splitt.ar, needed to run an efficient content machine. These tools made our team 4x more efficient, and increased the quality of our output too. And you're getting them for free.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  }
];

interface VSBigRevealProps {
  onApplyClick?: () => void;
}

const VSBigReveal = ({ onApplyClick }: VSBigRevealProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetection();
  
  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // --- Mobile Animations --- 
        console.log("Applying mobile animations for VSBigReveal");
        
        // Simple fade-in for heading
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true, id: 'reveal-heading-mobile' }
          });
        }
        
        // Simple fade-in for tagline
        if (taglineRef.current) {
          gsap.from(taglineRef.current, {
            y: 15, opacity: 0, duration: 0.6, delay: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: taglineRef.current, start: "top 88%", once: true, id: 'reveal-tagline-mobile' }
          });
        }

        // Simple fade-in for feature cards (as a group)
        gsap.from(".feature-card", {
           y: 25, opacity: 0, duration: 0.7, ease: "power2.out",
           scrollTrigger: { trigger: detailsRef.current, start: "top 80%", once: true, id: 'reveal-featurecard-mobile' }
        });
        
        // Simple fade-in for program details (as a group)
        gsap.from(".program-details-header, .program-details", {
           y: 25, opacity: 0, duration: 0.7, delay: 0.1, ease: "power2.out",
           scrollTrigger: { trigger: ".feature-list", start: "bottom 75%", once: true, id: 'reveal-details-mobile' }
        });
        
        // Simple fade-in for individual feature items
        gsap.from(".feature-item", {
           y: 15, opacity: 0, duration: 0.5, stagger: 0.15, ease: "power1.out",
           scrollTrigger: { trigger: ".feature-list", start: "top 85%", once: true, id: 'reveal-items-mobile' }
        });
        
        // Simple fade-in for founder modules container
        gsap.from(".founder-modules", {
           y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
           scrollTrigger: { trigger: ".program-details", start: "bottom 70%", once: true, id: 'reveal-modules-mobile' }
        });
        
        // Simple fade-in for module items with stagger (horizontal for mobile)
        gsap.from(".module-item", {
           x: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power1.out",
           scrollTrigger: { trigger: ".founder-modules-list", start: "top 85%", once: true, id: 'reveal-module-items-mobile' }
        });

        // Simple fade-in for CTA button
        gsap.from(".cta-button", {
           y: 10, opacity: 0, duration: 0.6, ease: "power2.out",
           scrollTrigger: { trigger: ".feature-list", start: "bottom 80%", once: true, id: 'reveal-cta-mobile' }
        });
        
        // NOTE: Large logo animation is disabled on mobile for performance.

      } else {
        // --- Desktop Animations --- (Original Logic)
        console.log("Applying desktop animations for VSBigReveal");

        const styles = getComputedStyle(document.documentElement);
        const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
        const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
        
        // Logo animation
        const logoTl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 90%", end: "bottom 20%", toggleActions: "play reverse play reverse", scrub: true, id: 'reveal-logo-desktop' } });
        logoTl.fromTo(".vs-logo-wrapper", { x: 400, y: 100, opacity: 0, rotation: 10 }, { x: -100, y: -40, opacity: 1, rotation: -3, ease: "power1.inOut" });
        
        // Heading and tagline timeline
        const introTl = gsap.timeline({ scrollTrigger: { trigger: headingRef.current, start: "top 75%", toggleActions: "play none none reverse", id: 'reveal-intro-desktop' } });
        introTl.from(headingRef.current, { y: 30, opacity: 0, duration: parseFloat(animDuration) * 1.8, ease: "power3.out" });
        introTl.from(taglineRef.current, { y: 25, opacity: 0, duration: parseFloat(animDuration) * 1.5, ease: "power2.out" }, "-=0.8");
        
        // Card and feature details timeline
        const tl = gsap.timeline({ scrollTrigger: { trigger: detailsRef.current, start: "top 70%", toggleActions: "play none none reverse", id: 'reveal-details-desktop' } });
        tl.from(".feature-card", { y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" });
        tl.from(".program-details-header, .program-details", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.4");
        
        // Feature item animations
        gsap.from(".feature-item", {
          scrollTrigger: { trigger: ".feature-list", start: "top 80%", toggleActions: "play none none reverse", id: 'reveal-items-desktop' },
          y: parseFloat(animDistance) * -5, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out"
        });
        
        // Founder modules animation
        gsap.from(".founder-modules", {
          scrollTrigger: { trigger: ".program-details", start: "bottom 60%", toggleActions: "play none none reverse", id: 'reveal-modules-desktop' },
          y: 20, opacity: 0, duration: 0.7, ease: "power2.out"
        });

        // Module items staggered animation (horizontal stagger for cards)
        gsap.from(".module-item", {
          scrollTrigger: { trigger: ".founder-modules-list", start: "top 80%", toggleActions: "play none none reverse", id: 'reveal-module-items-desktop' },
          x: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out"
        });
        
        // CTA button animation
        gsap.from(".cta-button", {
          scrollTrigger: { trigger: ".feature-list", start: "bottom 70%", toggleActions: "play none none reverse", id: 'reveal-cta-desktop' },
          scale: 0.9, y: 15, opacity: 0, duration: 0.7, ease: "back.out(1.7)"
        });
      }
    }, sectionRef);
    
    return () => {
      console.log("Cleaning up VSBigReveal animations");
      ctx.revert(); 
    };
  }, [isMobile]);
  
  return (
    <VSSection 
      ref={sectionRef} 
      className="big-reveal-section pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative min-h-[600px] sm:min-h-[800px] bg-theme-primary"
    >
      <IsometricGridBackground />
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-60 h-60 rounded-[40%] rotate-12 opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-[30%] -rotate-6 opacity-theme-float bg-theme-float-secondary animate-float-medium"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-[35%] rotate-45 opacity-theme-float bg-theme-float-accent animate-float-fast"></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full opacity-theme-float bg-theme-accent/10 animate-float-medium"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full border-4 border-theme-accent/20 opacity-theme-float animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full border-8 border-theme-primary/15 opacity-theme-float animate-float-medium"></div>
      
      {/* Conditionally render logo wrapper only on desktop to avoid performance hit */}
      {!isMobile && (
        <div ref={logoRef} className="vs-logo-wrapper absolute top-[350px] right-[-120vw] md:right-[-100vw] lg:right-[-80vw] xl:right-[-70vw] w-[200vw] max-w-[none] min-w-[1200px] z-0 transform-gpu pointer-events-none scale-[3]">
          <AnimatedLogo onAnimationComplete={() => console.log('Logo animation complete')} />
          <div className="absolute inset-0 -z-10 blur-3xl">
            <div className="w-full h-full rounded-full bg-theme-radial-glow opacity-80"></div>
          </div>
        </div>
      )}
        
      <div className="container mx-auto px-4 relative">
        <div className="text-center md:text-left mt-4 sm:mt-[40px] mb-8 sm:mb-16 max-w-[700px] mx-auto md:mx-0 relative z-10 overflow-visible">
          <p ref={headingRef} className="font-[200] !font-extralight mb-4 sm:mb-6 text-theme-primary text-center md:text-left lowercase tracking-wide md:pl-12"
            style={{ 
              fontWeight: 200,
              fontSize: "clamp(2rem, 5vw, 8rem)",
              whiteSpace: "nowrap"
            }}
          >
            the vertical shortcut<span className="text-theme-accent">.</span>
          </p>
          
          <div ref={taglineRef} className="text-center md:text-left md:pl-12">
            <VSGradientText
              as="h2"
              size="xl"
              className="font-bold mb-4 sm:mb-6 mx-auto md:mx-0 max-w-[95%] md:max-w-none text-base sm:text-xl md:text-2xl lg:text-3xl"
            >
              The Vertical Shortcut is the proven system for content creation that's guaranteed millions of views
            </VSGradientText>
            
            <p className="body-text mb-6 sm:mb-8 mx-auto md:mx-0 max-w-[95%] md:max-w-none">
              We've combined everything we know: All the knowledge, systems and tools that we use on a daily basis to get our clients billions of views — so you can do it all yourself.
            </p>
            
            <p className="body-text mb-6 sm:mb-8 mx-auto md:mx-0 max-w-[95%] md:max-w-none">
              Built with founders and execs in mind.
            </p>
          </div>
        </div>
        
        <div ref={detailsRef} className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4 md:px-6 lg:px-4">
          {/* First column - Features list */}
          <div className="feature-card bg-theme-surface/60 p-4 md:p-0 rounded-xl md:rounded-none shadow-theme-sm md:shadow-none">
            <VSHeading as="h3" size="sm" color="text-theme-primary" className="text-center md:hidden font-bold mb-4 text-base">
              Key Features
            </VSHeading>
            <div className="max-h-[450px] md:max-h-none overflow-y-auto pr-2 pb-2 custom-scrollbar">
              <ul className="feature-list space-y-6 md:space-y-4">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="feature-item flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
                  <div className="mt-0 md:mt-1 flex-shrink-0 mb-3 md:mb-0 transform scale-125 md:scale-100">
                    {feature.icon}
                  </div>
                  <div className="w-full">
                    <VSHeading as="h3" size="xs" color="text-theme-primary" className="font-bold mb-2 text-sm md:text-base">
                      {feature.title}
                    </VSHeading>
                    <p className="text-xs md:text-sm max-w-[95%] mx-auto md:mx-0 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
          
          {/* Second column - Content at bottom with button */}
          <div className="relative h-full flex flex-col justify-between pt-0 pb-0">
            {/* Course Details - Top section */}
            <div>
              <div className="program-details-header bg-transparent rounded-xl overflow-hidden transform transition-all duration-300">
                <VSHeading as="h3" size="sm" color="theme-primary" className="font-bold mb-3 text-center text-base">
                  Course Details
                </VSHeading>
              </div>
              
              {/* Program Details Boxes in a container - dramatically taller/more vertical */}
              <div className="program-details space-y-5 mb-5">
                {programDetails.map((detail, index) => (
                  <div key={index} className="relative flex flex-col items-center border-2 border-theme-accent/40 rounded-xl overflow-hidden shadow-md bg-theme-surface/30 pt-10 pb-6 px-3">
                    {/* Label as top banner */}
                    <div className="absolute top-0 left-0 right-0 bg-theme-accent/15 py-2 mb-4 flex items-center justify-center">
                      <VSText color="theme-secondary" className="text-xs uppercase tracking-wider font-extrabold px-1">
                        {detail.label}
                      </VSText>
                    </div>
                    
                    {/* Value with more vertical height */}
                    <div className="mt-2 py-3 w-full flex items-center justify-center">
                      {detail.highlight ? (
                        <div className="inline-block px-4 py-2 rounded-full bg-theme-accent/20">
                          <VSText color="theme-accent" className="text-lg font-extrabold">
                            {detail.value}
                          </VSText>
                        </div>
                      ) : (
                        <VSText color="theme-primary" className="text-lg leading-relaxed font-extrabold">
                          {detail.value}
                        </VSText>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Some of Our Favourites - Horizontal scroll carousel */}
            <div className="favorite-modules mb-1">
              <div className="bg-theme-surface/60 p-3 rounded-xl shadow-theme-sm mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-theme-accent" />
                  <VSHeading as="h3" size="sm" color="theme-primary" className="font-bold text-base">
                    Some of Our Favourites
                  </VSHeading>
                </div>
                
                <div className="founder-modules-carousel relative">
                  {/* Horizontal scrolling container with increased height */}
                  <div className="overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4">
                    <div className="flex space-x-3 snap-x snap-mandatory founder-modules-list">
                      {/* Static modules with taller vertical cards - no reliance on courseUtils */}
                      {[
                        { 
                          title: "Authority and Brand",
                          subtitle: "Building your personal brand as an authority in your industry",
                          image: "/public/assets/main/DataBaseThumbnails/pr_who_are_you.webp",
                          duration: 30
                        },
                        { 
                          title: "Repurposing from LinkedIn",
                          subtitle: "Transform your LinkedIn content into engaging vertical video",
                          image: "/public/assets/main/DataBaseThumbnails/repurposing.webp",
                          duration: 25
                        },
                        { 
                          title: "Monetisation Strategies",
                          subtitle: "Advanced tactics to drive revenue from your content",
                          image: "/public/assets/main/DataBaseThumbnails/monetisation_evolving.webp",
                          duration: 35
                        }
                      ].map((module, index) => (
                        <div key={index} className="module-item flex-shrink-0 snap-start w-[140px] rounded-lg bg-theme-surface/70 hover:bg-theme-surface/90 transition-all duration-300 border border-theme-accent/20 hover:border-theme-accent/50 overflow-hidden">
                          {/* Larger thumbnail image at top */}
                          <div className="module-image w-full h-[120px] overflow-hidden">
                            <img 
                              src={module.image} 
                              alt={module.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.src = "/public/assets/main/DataBaseThumbnails/default.webp";
                              }} 
                            />
                          </div>
                          
                          {/* Content below image */}
                          <div className="p-3">
                            <p className="text-xs font-bold text-theme-primary mb-2 line-clamp-2 min-h-[36px]">
                              {module.title}
                            </p>
                            <p className="text-[10px] text-theme-secondary leading-tight line-clamp-3 mb-3 min-h-[36px]">
                              {module.subtitle}
                            </p>
                            <div className="flex flex-col space-y-2">
                              <div className="px-2 py-1 w-full text-center rounded-full text-[9px] bg-theme-accent/20 text-theme-accent font-medium">
                                Popular Module
                              </div>
                              <div className="flex items-center justify-center text-[9px] text-theme-secondary">
                                <span>{module.duration} min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Scroll indicator dots */}
                  <div className="flex justify-center mt-2 space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-accent"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-accent/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-accent/30"></div>
                  </div>
                  
                  {/* CTA Button integrated inside modules section - moved up significantly */}
                  <div className="cta-button mt-2">
                    <button 
                      className="bg-theme-gradient-primary text-white w-full py-4 rounded-lg flex items-center justify-center gap-3 font-bold text-lg shadow-theme-md hover-bubbly transform hover:scale-[1.02] transition-all duration-300"
                      onClick={onApplyClick}
                    >
                      <span>Get Your Plan</span>
                      <ArrowRightCircle className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VSSection>
  );
};

export default VSBigReveal;