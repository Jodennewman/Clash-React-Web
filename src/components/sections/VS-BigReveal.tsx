import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRightCircle } from 'lucide-react';
import AnimatedLogo from '../../components/logos/AnimatedLogo';
import IsometricGridBackground from '../hero/IsometricPattern';
import { VSText, VSHeading, VSGradientText } from '../ui/vs-text';
import { VSCard, VSSection } from '../ui/vs-background';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Program details data
const programDetails = [
  { label: "Duration", value: "8 Weeks (ish)" },
  { label: "Commitment", value: "4 Hours a week" },
  { label: "Format", value: "Online + Live Sessions" },
  { label: "Next Cohort", value: "25th April, 2025", highlight: true },
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
    description: "Everything you need to create short form: from basic theory, to advanced editing and monetisation. Taught through hundreds of video modules, PDFs and workshops.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "Weekly live coaching", 
    description: "You'll have direct access to our team of experts — who've generated over 1 billion views — on calls with some of the best founders in the world, offering you personalised feedback and advice on your content.",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  },
  { 
    title: "Private community access", 
    description: "Plus you'll get access to our exclusive community of founders also wanting to grow on short form, who can help with collaboration, feedback, and accountability. (Plus its a great networking opportunity, CEOs we see you)",
    icon: <CheckCircle className="h-5 w-5 text-theme-accent" />
  }
];

const VSBigReveal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations with proper cleanup
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
    
    // Create animation context for proper cleanup
    const ctx = gsap.context(() => {
      // Fixed animation for the logo that properly handles scrolling up/down
      const logoTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse", // Explicit handling of scroll direction
          scrub: true, // Changed to boolean for smoother behavior
        }
      });
      
      // Single animation that works with scrub and toggleActions - PRESERVING MASSIVE SIZE
      logoTl.fromTo(".vs-logo-wrapper", 
        // From state
        {
          x: 400,
          y: 100,
          opacity: 0,
          // DO NOT MODIFY THE SCALE - we want to preserve the massive 3x scale
          rotation: 10,
        },
        // To state (final position)
        {
          x: -100,
          y: -40,
          opacity: 1,
          // DO NOT MODIFY THE SCALE - we want to preserve the massive 3x scale
          rotation: -3,
          ease: "power1.inOut"
        }
      );
      
      // Create a coordinated timeline for heading and tagline
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Add heading animation to timeline
      introTl.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: parseFloat(animDuration) * 1.8,
        ease: "power3.out"
      });
      
      // Add tagline animation to timeline with a slight delay
      introTl.from(taglineRef.current, {
        y: 25,
        opacity: 0,
        duration: parseFloat(animDuration) * 1.5,
        ease: "power2.out"
      }, "-=0.8"); // Start before heading animation completes
      
      // Card and feature animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl.from(".feature-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out"
      })
      .from(".program-details", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");
      
      // Feature item animations
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: ".feature-list",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: parseFloat(animDistance) * -5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      // CTA button animation with bounce effect
      gsap.from(".cta-button", {
        scrollTrigger: {
          trigger: ".program-details",
          start: "top 70%",
          toggleActions: "play none none reverse"
        },
        scale: 0.9,
        y: 15,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)"
      });
      
    }, sectionRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);
  
  return (
    <VSSection 
      ref={sectionRef} 
      background="bg-theme-primary"
      className="big-reveal-section pt-20 pb-32 overflow-hidden relative min-h-[1000px]"
    >
      {/* Isometric Grid Background */}
      <IsometricGridBackground />
      {/* Enhanced decorative elements */}
      {/* Large top-left floating square */}
      <div className="absolute top-20 left-10 w-60 h-60 rounded-[40%] rotate-12 
                     opacity-theme-float
                     bg-theme-float-primary 
                     animate-float-slow"></div>
      
      {/* Large bottom-right floating element */}
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-[30%] -rotate-6 
                     opacity-theme-float
                     bg-theme-float-secondary
                     animate-float-medium"></div>
                     
      {/* Medium floating accent */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-[35%] rotate-45
                     opacity-theme-float
                     bg-theme-float-accent
                     animate-float-fast"></div>
                     
      {/* Floating circle element */}
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full
                     opacity-theme-float
                     bg-theme-accent/10
                     animate-float-medium"></div>
                    
      {/* Extra decorative element - ring */}
      <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full border-4 border-theme-accent/20
                     opacity-theme-float
                     animate-spin-slow"></div>
                     
      {/* Extra decorative element - donut */}
      <div className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full border-8 border-theme-primary/15
                     opacity-theme-float
                     animate-float-medium"></div>
      
      {/* VS Logo with animation - ABSOLUTELY MASSIVE and ALL THE WAY to the right */}
      <div ref={logoRef} className="vs-logo-wrapper absolute top-[350px] right-[-120vw] md:right-[-100vw] lg:right-[-80vw] xl:right-[-70vw] w-[200vw] max-w-[none] min-w-[1200px] z-0 transform-gpu pointer-events-none scale-[3]">
        <AnimatedLogo onAnimationComplete={() => console.log('Logo animation complete')} />
        <div className="absolute inset-0 -z-10 blur-3xl">
          <div className="w-full h-full rounded-full bg-theme-radial-glow opacity-80"></div>
        </div>
      </div>
        
      <div className="container mx-auto px-4 relative">
        {/* Main intro section - normal positioning */}
        <div className="text-center md:text-left mt-[250px] mb-16 max-w-[700px] mx-auto md:mx-0 relative z-10 overflow-visible">
          <p 
            ref={headingRef}
            className="font-[200] !font-extralight mb-6 text-theme-primary text-center md:text-left lowercase tracking-wide whitespace-nowrap"
            style={{ 
              fontWeight: 200,
              fontSize: "clamp(3.5rem, 6vw, 8rem)"
            }}
          >
            the vertical shortcut<span className="text-theme-accent">.</span>
          </p>
          
          <div ref={taglineRef} className="text-center md:text-left md:pl-12">
            <p className="body-text mb-8 mx-auto md:mx-0 max-w-[90%] md:max-w-none">
              We've combined everything we know: All the knowledge, systems and tools that we use on a daily basis to get our clients billions of views — so you can do it all yourself.
            </p>

            <VSGradientText
              variant="h2"
              className="text-2xl md:text-3xl font-bold mb-12 mx-auto md:mx-0 max-w-[90%] md:max-w-none"
            >
              The Vertical Shortcut is the proven system for content creation that's guaranteed millions of views
            </VSGradientText>
          </div>
        </div>
        
        {/* Features and details grid */}
        <div ref={detailsRef} className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4 md:px-6 lg:px-4">
          {/* Left column: Features */}
          <div className="feature-card bg-theme-surface/60 p-6 md:p-0 rounded-xl md:rounded-none shadow-theme-sm md:shadow-none">
            <h3 className="text-center md:hidden text-2xl font-bold mb-8 text-theme-primary">Key Features</h3>
            <ul className="feature-list space-y-12 md:space-y-8">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="feature-item flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                  <div className="mt-0 md:mt-1 flex-shrink-0 mb-4 md:mb-0 transform scale-150 md:scale-100">
                    {feature.icon}
                  </div>
                  <div className="w-full">
                    <VSHeading variant="h3" color="theme-primary" className="text-xl font-bold mb-3">
                      {feature.title}
                    </VSHeading>
                    <p className="body-text-sm max-w-[95%] mx-auto md:mx-0">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right column: Program details card */}
          <div className="program-details">
            <VSCard
              background="bg-theme-surface"
              className="p-10 rounded-xl shadow-theme-md border border-theme-border-light overflow-hidden transform transition-all duration-300 hover:shadow-theme-lg hover:translate-y-[-4px]"
            >
              <VSHeading variant="h3" color="theme-primary" className="text-3xl font-bold mb-10 text-center">
                Program Details
              </VSHeading>
              
              <div className="space-y-10 mb-10">
                {programDetails.map((detail, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-3 border border-theme-accent rounded-theme-md card-theme text-center text-[20px] font-bold">
                    <div className="mb-4">
                      <VSText color="theme-secondary" className="text-lg uppercase tracking-wider font-semibold m4">
                        {detail.label}
                      </VSText>
                    </div>
                    {detail.highlight ? (
                      <div className="inline-block px-6 py-3 rounded-full bg-theme-accent/10 m4 ">
                        <VSText color="theme-accent" className="text-2xl font-bold">
                          {detail.value}
                        </VSText>
                      </div>
                    ) : (
                      <VSText color="theme-primary" className="text-2xl font-bold">
                        {detail.value}
                      </VSText>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="cta-button mt-12">
                <button className="bg-theme-gradient-primary text-white w-full py-5 rounded-lg flex items-center justify-center gap-3 font-bold text-xl shadow-theme-md hover-bubbly">
                  <span>Get your Plan</span>
                  <ArrowRightCircle className="h-7 w-7" />
                </button>
              </div>
            </VSCard>
          </div>
        </div>
      </div>
    </VSSection>
  );
};

export default VSBigReveal;