import React, { useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BarChart3, 
  FileText, 
  Eye, 
  Clock, 
  DollarSign, 
  PieChart,
  ChevronRight
} from 'lucide-react';
import { VSText, VSHeading, VSGradientText } from '../ui/vs-text';
import { VSBackground, VSCard, VSSection } from '../ui/vs-background';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Features data
const features = [
  {
    id: 1,
    title: "Algorithm Mastery",
    description: "Decode the exact signals that trigger algorithmic distribution, with platform-specific strategies for TikTok, Instagram, and YouTube.",
    icon: <BarChart3 className="h-6 w-6" />,
    highlight: "100% more views with the same content",
    color: "theme-primary"
  },
  {
    id: 2,
    title: "Script Frameworks",
    description: "Learn our proven script structures that hook viewers instantly and guide them toward conversion. No more guessing what works.",
    icon: <FileText className="h-6 w-6" />,
    highlight: "3x engagement in first 3 seconds",
    color: "theme-accent"
  },
  {
    id: 3,
    title: "Visual Strategy",
    description: "Master the visual principles that stop scrollers in their tracks, from composition to motion techniques that demand attention.",
    icon: <Eye className="h-6 w-6" />,
    highlight: "Retain 82% more viewers to completion",
    color: "theme-accent-secondary"
  },
  {
    id: 4,
    title: "Content Efficiency",
    description: "Transform your production process with our batch creation system. Create a month of content in a single day without sacrificing quality.",
    icon: <Clock className="h-6 w-6" />,
    highlight: "5x output with 50% less time",
    color: "theme-accent-tertiary"
  },
  {
    id: 5,
    title: "Monetisation Framework",
    description: "Convert views to revenue with our proven frameworks for offers, lead generation, and brand partnerships that feel natural.",
    icon: <DollarSign className="h-6 w-6" />,
    highlight: "Turn 10K views into £10K+ revenue",
    color: "theme-secondary"
  },
  {
    id: 6,
    title: "Data-Led Iteration",
    description: "Stop guessing what works. Our analytics framework shows exactly how to improve each video based on performance metrics.",
    icon: <PieChart className="h-6 w-6" />,
    highlight: "Improve every video by 47%+",
    color: "theme-accent-quaternary"
  }
];

const VSInteractiveFeatures = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  // GSAP animations with proper cleanup
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
    
    // Create animation context for proper cleanup
    const ctx = gsap.context(() => {
      // Header animations
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      headerTl
        .from(".section-badge", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        })
        .from(".section-title", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out"
        }, "-=0.3")
        .from(".section-description", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out"
        }, "-=0.4");
      
      // Features grid animation - staggered reveal
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      // Floating elements parallax effect
      gsap.to(".floating-element", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: (i, el) => {
          // Different elements move at different speeds
          const direction = el.classList.contains("float-up") ? -1 : 1;
          const speed = parseFloat(el.getAttribute("data-speed") || "1");
          return direction * 100 * speed;
        },
        ease: "none"
      });
      
      // CTA button animation
      gsap.from(".cta-button", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "center 60%",
          toggleActions: "play none none reverse"
        },
        scale: 0.9,
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
      
    }, sectionRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);
  
  // Function to handle feature card click with enhanced animations
  const handleFeatureClick = (id: number) => {
    setActiveFeature(activeFeature === id ? null : id);
    
    // Enhanced animations for the clicked card
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        // Reset all cards first
        gsap.to(".feature-card", {
          scale: 1,
          y: 0,
          boxShadow: "var(--theme-shadow-md)",
          duration: 0.3
        });
        
        // Reset all highlights
        gsap.to(".feature-highlight", {
          scale: 1,
          backgroundColor: "rgba(var(--theme-accent-rgb), 0.05)",
          duration: 0.3
        });
        
        if (activeFeature !== id) {
          // Create a timeline for coordinated animations
          const cardTl = gsap.timeline();
          
          // Initial "press" effect
          cardTl.to(`.feature-card-${id}`, {
            scale: 0.98,
            duration: 0.1,
            ease: "power2.in"
          })
          // Bounce back with elevation
          .to(`.feature-card-${id}`, {
            scale: 1.03,
            y: -8,
            boxShadow: "var(--theme-shadow-lg)",
            duration: 0.4,
            ease: "back.out(1.7)"
          })
          // Add subtle rotation for dimension
          .to(`.feature-card-${id}`, {
            rotationY: 3,
            rotationX: -2,
            duration: 0.3,
            ease: "power1.out"
          }, "-=0.3");
          
          // Highlight animation
          gsap.to(`.highlight-${id}`, {
            scale: 1.05,
            backgroundColor: "rgba(var(--theme-accent-rgb), 0.15)",
            duration: 0.4,
            ease: "power2.out"
          });
          
          // Icon animation
          gsap.to(`.icon-${id}`, {
            scale: 1.2,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        }
      }, sectionRef);
      
      // Clean up this mini context when component updates
      return () => ctx.revert();
    }
  };
  
  // Render appropriate icon for each feature with theme-aware colors
  const renderIcon = (feature: typeof features[0]) => {
    const colorClass = `text-${feature.color}`;
    return React.cloneElement(feature.icon, {
      className: `h-6 w-6 ${colorClass}`
    });
  };
  
  return (
    <VSSection 
      ref={sectionRef} 
      background="bg-theme-gradient"
      className="interactive-features-section py-24 relative overflow-hidden"
    >
      {/* Theme-aware floating elements with parallax effect */}
      <div className="absolute top-20 left-[15%] w-32 h-32 rounded-[40%] rotate-12 
                    opacity-theme-float
                    bg-theme-float-primary
                    animate-float-slow
                    floating-element float-up"
           data-speed="0.5"></div>
      
      <div className="absolute top-[40%] right-[10%] w-24 h-24 rounded-[35%] -rotate-6 
                    opacity-theme-float
                    bg-theme-float-secondary
                    animate-float-medium
                    floating-element float-down"
           data-speed="1.2"></div>
                   
      <div className="absolute bottom-[30%] left-[10%] w-20 h-20 rounded-[45%] rotate-45
                    opacity-theme-float
                    bg-theme-float-accent
                    animate-float-fast
                    floating-element float-up"
           data-speed="0.8"></div>
                   
      <div className="absolute bottom-[20%] right-[20%] w-36 h-36 rounded-[25%] rotate-[30deg]
                    opacity-theme-float
                    bg-theme-float-quaternary
                    animate-float-medium
                    floating-element float-down"
           data-speed="1.5"></div>
      
      {/* Interactive dots background effect */}
      <div className="absolute inset-0 bg-theme-dot-pattern opacity-theme-pattern pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 max-w-4xl mx-auto">
          <div className="section-badge inline-block mb-4 bg-theme-surface px-5 py-2 rounded-full shadow-theme-sm">
            <VSText color="theme-accent" className="font-medium">
              The Complete System
            </VSText>
          </div>
          
          <VSHeading 
            variant="h2" 
            color="theme-primary" 
            className="section-title text-4xl md:text-5xl font-bold mb-6"
          >
            Discover what makes it work
          </VSHeading>
          
          <VSText 
            color="theme-secondary" 
            className="section-description text-xl"
          >
            The Vertical Shortcut isn't just another course – it's a complete system for content creation that's been battle-tested with billions of views.
          </VSText>
        </div>
        
        {/* Interactive features grid */}
        <div 
          ref={featuresRef} 
          className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16"
        >
          {features.map((feature) => (
            <VSCard
              key={feature.id}
              className={`feature-card feature-card-${feature.id} p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-theme-md hover:shadow-theme-lg perspective-500 ${activeFeature === feature.id ? 'ring-2 ring-theme-accent border border-theme-accent/20' : 'border border-theme-border-light'}`}
              background="bg-theme-surface"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className="mb-6">
                <div className={`icon-${feature.id} w-12 h-12 rounded-lg flex items-center justify-center transform transition-all duration-300 ${feature.color === 'theme-primary' ? 'bg-theme-primary/10' : 
                  feature.color === 'theme-accent' ? 'bg-theme-accent/10' : 
                  feature.color === 'theme-accent-secondary' ? 'bg-theme-accent-secondary/10' :
                  feature.color === 'theme-accent-tertiary' ? 'bg-theme-accent-tertiary/10' :
                  feature.color === 'theme-secondary' ? 'bg-theme-secondary/10' :
                  'bg-theme-accent-quaternary/10'}`}>
                  {renderIcon(feature)}
                </div>
              </div>
              
              <VSHeading 
                variant="h3" 
                color="theme-primary"
                className="text-xl font-bold mb-3"
              >
                {feature.title}
              </VSHeading>
              
              <VSText 
                color="theme-secondary"
                className="mb-5"
              >
                {feature.description}
              </VSText>
              
              <div className={`highlight-${feature.id} feature-highlight mt-auto px-4 py-2 rounded-full inline-block transition-all duration-300 transform ${
                activeFeature === feature.id ? 'bg-theme-accent/10' : 
                feature.color === 'theme-primary' ? 'bg-theme-primary/5' : 
                feature.color === 'theme-accent' ? 'bg-theme-accent/5' : 
                feature.color === 'theme-accent-secondary' ? 'bg-theme-accent-secondary/5' :
                feature.color === 'theme-accent-tertiary' ? 'bg-theme-accent-tertiary/5' :
                feature.color === 'theme-secondary' ? 'bg-theme-secondary/5' :
                'bg-theme-accent-quaternary/5'
              }`}>
                <VSText 
                  color={activeFeature === feature.id ? 'theme-accent' : feature.color}
                  className="font-medium text-sm"
                >
                  {feature.highlight}
                </VSText>
              </div>
              
              {/* Expansion indicator */}
              <div className={`absolute bottom-4 right-4 transition-transform duration-300 ${activeFeature === feature.id ? 'rotate-90' : ''}`}>
                <ChevronRight className={`w-5 h-5 ${
                  activeFeature === feature.id ? 'text-theme-accent' : 
                  feature.color === 'theme-primary' ? 'text-theme-primary' : 
                  feature.color === 'theme-accent' ? 'text-theme-accent' : 
                  feature.color === 'theme-accent-secondary' ? 'text-theme-accent-secondary' :
                  feature.color === 'theme-accent-tertiary' ? 'text-theme-accent-tertiary' :
                  feature.color === 'theme-secondary' ? 'text-theme-secondary' :
                  'text-theme-accent-quaternary'
                }`} />
              </div>
            </VSCard>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center cta-button">
          <button className="bg-theme-gradient-primary text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 shadow-theme-md hover-bubbly">
            <span className="font-bold">See All Program Features</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </VSSection>
  );
};

export default VSInteractiveFeatures;