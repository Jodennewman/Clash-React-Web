import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRightCircle } from 'lucide-react';
import AnimatedLogo from '../../components/logos/AnimatedLogo';
import IsometricGridBackground from '../hero/IsometricPattern';
import { VSText, VSHeading, VSGradientText } from '../ui/vs-text';
import { VSBackground, VSCard, VSSection } from '../ui/vs-background';

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
    
    const section = sectionRef.current;
    
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
    
    // Create animation context for proper cleanup
    const ctx = gsap.context(() => {
      // Enhanced animation for the large logo with dramatic entrance
      const logoTl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 90%",
          end: "bottom 10%", 
          scrub: 0.8,
        }
      });
      
      // Initial animation with more dramatic effects
      logoTl
        .from(".vs-logo-wrapper > div", {
          x: -200,
          y: 80,
          opacity: 0,
          scale: 0.7,
          rotation: -5,
          duration: 1.2,
          ease: "power3.out"
        })
        // Add rotation and floating effect as you scroll
        .to(".vs-logo-wrapper > div", {
          rotation: 2,
          y: -30,
          scale: 1.1,
          duration: 0.8,
          ease: "power1.inOut"
        }, 0.5);
      
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
      className="big-reveal-section py-24 overflow-hidden relative"
    >
      {/* Isometric Grid Background */}
      <IsometricGridBackground />
      {/* Theme-aware floating elements using brand utility classes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-[40%] rotate-12 
                     opacity-theme-float
                     bg-theme-float-primary
                     animate-float-slow"></div>
      
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-[30%] -rotate-6 
                     opacity-theme-float
                     bg-theme-float-secondary
                     animate-float-medium"></div>
                     
      <div className="absolute top-2/3 left-1/3 w-24 h-24 rounded-[35%] rotate-45
                     opacity-theme-float
                     bg-theme-float-accent
                     animate-float-fast"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* VS Logo with animation - much bigger and positioned left */}
        <div ref={logoRef} className="vs-logo-wrapper relative h-[500px] mb-8">
          <div className="absolute top-0 left-[5%] lg:left-[10%] -z-0 w-[450px] max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] transform-gpu">
            <AnimatedLogo onAnimationComplete={() => console.log('Logo animation complete')} />
            <div className="absolute inset-0 -z-10 blur-2xl">
              <div className="w-full h-full rounded-full bg-theme-radial-glow opacity-70"></div>
            </div>
          </div>
        </div>
        
        {/* Main intro section - shifted to the right */}
        <div className="text-left md:text-left ml-auto mr-4 mb-16 max-w-3xl md:max-w-4xl lg:max-w-5xl mt-[-120px] md:mt-[-150px] relative z-10 overflow-visible">
          <p 
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[200] !font-extralight mb-6 text-theme-primary pl-8 md:pl-12 lowercase tracking-wide whitespace-nowrap"
            style={{ fontWeight: 200 }}
          >
            the vertical shortcut<span className="text-theme-accent">.</span>
          </p>
          
          <div ref={taglineRef} className="pl-8 md:pl-12">
            <p className="text-theme-secondary text-xl mb-8">
              We've combined everything we know: All the knowledge, systems and tools that we use on a daily basis to get our clients billions of views — so you can do it all yourself.
            </p>
            
            <VSGradientText
              variant="h2"
              className="text-2xl md:text-3xl font-bold mb-12"
            >
              The proven system for content creation that's guaranteed millions of views
            </VSGradientText>
          </div>
        </div>
        
        {/* Features and details grid */}
        <div ref={detailsRef} className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column: Features */}
          <div className="feature-card">
            <ul className="feature-list space-y-8">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="feature-item flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <VSHeading variant="h3" color="theme-primary" className="text-xl mb-2">
                      {feature.title}
                    </VSHeading>
                    <VSText color="theme-secondary">
                      {feature.description}
                    </VSText>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right column: Program details card */}
          <div className="program-details">
            <VSCard
              background="bg-theme-surface"
              className="p-8 rounded-xl shadow-theme-md border border-theme-border-light overflow-hidden transform transition-all duration-300 hover:shadow-theme-lg hover:translate-y-[-4px]"
            >
              <VSHeading variant="h3" color="theme-primary" className="text-2xl font-bold mb-6">
                Program Details
              </VSHeading>
              
              <div className="space-y-6 mb-8">
                {programDetails.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-theme-border">
                    <VSText color="theme-secondary" className="text-lg">
                      {detail.label}
                    </VSText>
                    {detail.highlight ? (
                      <div className="px-3 py-1 rounded-full bg-theme-accent/10">
                        <VSText color="theme-accent" className="text-lg font-bold">
                          {detail.value}
                        </VSText>
                      </div>
                    ) : (
                      <VSText color="theme-primary" className="text-lg font-bold">
                        {detail.value}
                      </VSText>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="cta-button">
                <button className="bg-theme-gradient-primary text-white w-full py-4 rounded-lg flex items-center justify-center gap-2 font-medium shadow-theme-md hover-bubbly">
                  <span className="font-bold">Get your Plan</span>
                  <ArrowRightCircle className="h-5 w-5" />
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