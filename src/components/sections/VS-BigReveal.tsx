import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRightCircle } from 'lucide-react';
import VSLogo from '../../components/logos/Hero/vs-hero-logo';
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
      // Reveal animation for the logo - enhanced parallax effect
      const logoTl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 80%",
          end: "center 30%", 
          scrub: 0.5,
        }
      });
      
      logoTl
        .from(".vs-logo-wrapper", {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(".vs-logo-wrapper", {
          y: -20,
          scale: 1.05,
          duration: 0.5,
          ease: "power1.out"
        }, "-=0.3");
      
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
      background="bg-theme-gradient"
      className="big-reveal-section py-24 overflow-hidden relative"
    >
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
        {/* VS Logo with spotlight effect */}
        <div ref={logoRef} className="vs-logo-wrapper flex justify-center mb-12">
          <div className="relative scale-[1.8]">
            <VSLogo />
            <div className="absolute inset-0 -z-10 blur-xl">
              <div className="w-full h-full rounded-full bg-theme-radial-glow"></div>
            </div>
          </div>
        </div>
        
        {/* Main intro section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-theme-primary"
          >
            The Vertical Shortcut <span className="text-theme-accent">.</span>
          </h1>
          
          <div ref={taglineRef}>
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
              className="p-8 overflow-hidden"
            >
              <VSHeading variant="h3" color="theme-primary" className="text-2xl mb-6">
                Program Details
              </VSHeading>
              
              <div className="space-y-6 mb-8">
                {programDetails.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-theme-border">
                    <VSText color="theme-secondary" className="text-lg">
                      {detail.label}
                    </VSText>
                    {detail.highlight ? (
                      <VSText color="theme-accent" className="text-lg font-bold">
                        {detail.value}
                      </VSText>
                    ) : (
                      <VSText color="theme-primary" className="text-lg font-bold">
                        {detail.value}
                      </VSText>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="cta-button">
                <button className="bg-theme-gradient-primary text-white w-full py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover-bubbly shadow-theme-md hover:shadow-theme-lg">
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