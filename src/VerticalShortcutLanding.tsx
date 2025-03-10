import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { ThemeProvider } from './components/ui/theme-provider';
import IsometricGrid, { COLORS } from './components/isometricGrid';
import ContentOverwhelmer from './components/ContentOverwhelmer';
import { PricingSection } from './components/sections/pricing-section.tsx';
import { Section } from './components/ui/section';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import SocialProofItem from './components/ui/social-proof-item';
import Glow from './components/ui/glow';
import { Item, ItemIcon, ItemTitle, ItemDescription } from './components/ui/item';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import FeatureStickyLeft from './components/sections/feature/sticky-left';
import SafeVideoEmbed from './components/ui/video-embed';
import VSBentoGrid from './components/sections/bento-grid/vsBentoGrid';
import VSNavbar from './components/sections/navbar/vs-navbar';
import CourseStats from './components/sections/course-stats';
import ModuleBreakdownSimplified from './components/sections/module-breakdown-simplified';
import FeaturedModules from './components/sections/featured-modules';
import FounderTrack from './components/sections/founder-track';
import FAQUpdated from './components/sections/faq-updated';
import VSCarousel from './components/sections/carousel/VSCarousel';
import TabsLeft from './components/sections/tabs/left';
import SocialProof from './components/sections/social-proof/marquee-2-rows';
import TestimonialCarousel from './components/ui/testimonial-carousel';
import LeadCaptureForm from './components/ui/lead-capture-form';
import Logo from './components/logos/Hero';

// Import only the icons we're using
import { 
  CheckCircle, 
  ArrowRightCircle, 
  Clock, 
  BarChart3, 
  Zap, 
  Flame, 
  Lightbulb, 
  Award, 
  Repeat, 
  DollarSign, 
  BriefcaseBusiness, 
  Rocket,
} from 'lucide-react';

// Import GSAP and plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Global GSAP context - key for preventing conflicts
let globalScrollSmoother: globalThis.ScrollSmoother | null = null;
const globalAnimations = {};

// Define the isometric grid cubes for hero section
const mainGridCubes = [
  // Central structure with vibrant colors to create visual impact
  { row: 5, col: 1, color: COLORS.WHITE, isGlowing: true },
  { row: 5, col: 2, color: COLORS.MAROON },
  { row: 5, col: 3, color: COLORS.TEAL_LIGHT},
  { row: 6, col: 1, color: COLORS.DEFAULT },
  { row: 6, col: 2, color: COLORS.RED, isGlowing: true },
  { row: 6, col: 3, color: COLORS.DEFAULT },
  { row: 7, col: 1, color: COLORS.DEFAULT },
  { row: 7, col: 2, color: COLORS.DEFAULT },
  { row: 7, col: 3, color: COLORS.DEFAULT },
  { row: 8, col: 2, color: COLORS.DEFAULT },
  
  // Right-side highlight cube - draws attention with glow
  { row: 4, col: 6, color: COLORS.ORANGE, isGlowing: true },
  
  // Additional cubes for visual interest and structure
  { row: 6, col: 5, color: COLORS.DEFAULT },
  { row: 7, col: 4, color: COLORS.DEFAULT },
  { row: 9, col: 3, color: COLORS.TEAL_DARK }
];

const backgroundGridCubes = [
  // Bottom-right area
  { row: 10, col: 7, color: COLORS.DEFAULT },
  { row: 11, col: 6, color: COLORS.DEFAULT },
  { row: 11, col: 8, color: COLORS.DEFAULT },
  { row: 12, col: 7, color: COLORS.ORANGE, isGlowing: true },
  
  // Top-right area
  { row: 2, col: 10, color: COLORS.WHITE, isGlowing: true },
  { row: 3, col: 11, color: COLORS.DEFAULT },
  { row: 4, col: 12, color: COLORS.DEFAULT },
  
  // Left area
  { row: 9, col: 0, color: COLORS.DEFAULT },
  { row: 10, col: 1, color: COLORS.DEFAULT },
  { row: 11, col: 0, color: COLORS.DEFAULT }
];

const farBackgroundGridCubes = [
  // Scattered pattern for visual interest
  { row: 1, col: 14, color: COLORS.DEFAULT },
  { row: 2, col: 13, color: COLORS.DEFAULT },
  { row: 3, col: 15, color: COLORS.DEFAULT },
  { row: 15, col: 1, color: COLORS.RED, isGlowing: true },
  { row: 16, col: 2, color: COLORS.DEFAULT },
  { row: 14, col: 3, color: COLORS.DEFAULT },
  { row: 15, col: 18, color: COLORS.DEFAULT },
  { row: 16, col: 11, color: COLORS.DEFAULT },
  { row: 14, col: 10, color: COLORS.DEFAULT }
];

// Testimonials data
const testimonials = [
  {
    name: "James Lewis",
    username: "jameslewisvideo",
    text: "Before Vertical Shortcut, I was posting content that went nowhere. Now I've gone from barely making £1,000/month to consistently earning £12,000+ in just 8 weeks. The ROI is f*cking incredible.",
    image: "/avatars/james.jpg"
  },
  {
    name: "Sarah Chen",
    username: "sarahcreates",
    text: "The hook mastery module alone was worth every penny. My engagement skyrocketed 400% and I landed three brand deals within a month. This isn't just theory—it's a proven system that delivers real results.",
    image: "/avatars/sarah.jpg"
  },
  {
    name: "Alex Rodriguez",
    username: "alexrodriguezbiz",
    text: "As a busy founder, I thought I'd never have time for content. The Founders Paradox module showed me how to batch create months of content in just a few hours. Complete game changer for my business.",
    image: "/avatars/alex.jpg"
  },
  {
    name: "Maya Johnson",
    username: "mayatalks",
    text: "I struggled with imposter syndrome and camera anxiety for years. The Camera Confidence module transformed how I present myself. Now my content converts at 3x my previous rate. Worth every penny.",
    image: "/avatars/maya.jpg"
  }
];

// Program benefits data 
const benefits = [
  {
    title: "Hook Your Audience Instantly",
    description: "Master the psychological triggers that make people stop scrolling and start watching. Our students see average engagement increases of 300% within 14 days.",
    icon: <Zap className="h-6 w-6 text-white" />,
    color: "#FEA35D"
  },
  {
    title: "Create Content That Converts",
    description: "Learn our proven script structures that turn passive viewers into paying customers. Stop creating content that gets views but no sales.",
    icon: <DollarSign className="h-6 w-6 text-white" />,
    color: "#B92234"
  },
  {
    title: "Build A Content Machine",
    description: "Transform from a one-person show to a content production powerhouse with our delegation systems. Produce more without sacrificing quality or authenticity.",
    icon: <Repeat className="h-6 w-6 text-white" />,
    color: "#387292"
  },
  {
    title: "Never Run Out Of Ideas",
    description: "Our content research system gives you an endless supply of proven topics your audience wants. No more staring at a blank screen wondering what to post.",
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    color: "#154D59"
  },
  {
    title: "Stand Out From The Noise",
    description: "Develop your unique voice and content style that makes you unmistakable in your industry. Stop blending in with thousands of forgettable creators.",
    icon: <Award className="h-6 w-6 text-white" />,
    color: "#DE6B59"
  },
  {
    title: "Scale With Systems",
    description: "Implement our proven workflows that let you produce more content with less personal time. Our students average 5X output with 50% less effort.",
    icon: <Rocket className="h-6 w-6 text-white" />,
    color: "#FEAC6D"
  }
];

// Course tracks data
const tracks = [
  {
    name: "Content Creator Growth",
    description: "For ambitious creators looking to rapidly scale from zero to millions of views and build sustainable income streams.",
    icon: <Rocket className="h-6 w-6" />,
    color: "#4A90E2"
  },
  {
    name: "Founders Track",
    description: "For entrepreneurs and business leaders who need to build personal brands while minimizing time investment.",
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    color: "#FF3B30"
  },
  {
    name: "Technical Skills",
    description: "For those focused on mastering the production aspects of content creation, from filming to editing.",
    icon: <Zap className="h-6 w-6" />,
    color: "#8E8E93"
  },
  {
    name: "Holistic Approach",
    description: "The complete system covering strategy, production, and monetization for those who want to master it all.",
    icon: <Flame className="h-6 w-6" />,
    color: "#FF9500"
  }
];

// Testimonial Carousel data
const carouselTestimonials = [
  {
    quote: "I was skeptical about another course, but this is different. After 10 years of posting content, I finally understand why some videos blow up while others die. Everything finally makes sense.",
    name: "Christopher Lee",
    role: "Business Coach",
    image: "/avatars/chris.jpg"
  },
  {
    quote: "I've taken every short form course out there. None of them come close to the depth and actionable strategies in Vertical Shortcut. My first video using these principles hit 1.2M views.",
    name: "Jennifer Martinez",
    role: "Content Creator",
    image: "/avatars/jennifer.jpg"
  },
  {
    quote: "As a founder of a SaaS company, I never thought short-form would work for our complex product. Within 8 weeks, our content was driving 40% of our new trial signups.",
    name: "David Wilson",
    role: "Tech Founder",
    image: "/avatars/david.jpg"
  },
  {
    quote: "The delegation frameworks alone are worth 10x the investment. I went from shooting everything myself to having a team that delivers better content than I ever could alone.",
    name: "Michelle Thompson",
    role: "Agency Owner",
    image: "/avatars/michelle.jpg"
  }
];

// Learning outcomes data
const learningOutcomes = [
  {
    title: "Master Hook Creation",
    description: "Learn 15+ hook formats that immediately capture viewer attention, including the 'Impossible Question', 'False Assumption' and 'Big-Small' techniques.",
    icon: <Zap />
  },
  {
    title: "Decode Platform Algorithms",
    description: "Understand exactly what TikTok, Instagram and YouTube algorithms prioritize, and how to craft content specifically for each platform's nuances.",
    icon: <BarChart3 />
  },
  {
    title: "Build Converting Funnels",
    description: "Create seamless pathways that turn casual viewers into email subscribers, leads, and ultimately paying customers.",
    icon: <ArrowRightCircle />
  },
  {
    title: "Create Content at Scale",
    description: "Implement our batch production system to create a month of content in a single day, without sacrificing quality or authenticity.",
    icon: <Repeat />
  },
  {
    title: "Leverage Data-Driven Iteration",
    description: "Use our analytics framework to systematically improve your content performance based on real audience behavior, not guesswork.",
    icon: <BarChart3 />
  },
  {
    title: "Develop Your Unique Voice",
    description: "Find and amplify what makes you distinctive to stand out in a crowded market and build a recognizable brand.",
    icon: <Zap />
  }
];

// Key features data
const keyFeatures = [
  { 
    title: "No More Guesswork", 
    description: "Stop wondering why some videos work while others flop. Our system reveals exactly what drives algorithmic success.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  },
  { 
    title: "Templates For Everything", 
    description: "Over 50 plug-and-play templates for hooks, scripts, and content structures that you can implement immediately.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  },
  { 
    title: "Weekly Live Coaching", 
    description: "Direct access to our team of experts who've generated over 800M views for personalized feedback and advice.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  },
  { 
    title: "Private Community", 
    description: "Connect with other serious creators and founders for collaboration, feedback, and accountability.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  }
];

// Animation controller component - This is the key improvement
function AnimationController({ children }: { children: React.ReactNode }) {
  const controllerRef = useRef<HTMLDivElement>(null);
  const [gsapInitialized, setGsapInitialized] = useState<boolean>(false);

  // Initialize global GSAP context on mount
  useEffect(() => {
    // Create a central context for all GSAP animations
    const ctx = gsap.context(() => {
      // Initialize ScrollSmoother once
      if (!globalScrollSmoother) {
        globalScrollSmoother = ScrollSmoother.create({
          smooth: 0.7,
          effects: true,
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          normalizeScroll: true,
          ignoreMobileResize: true,
        //  onUpdate: self => {
            // Optionally broadcast scroll position to child components if needed
      //    }
        });
      }
    }, controllerRef);

    // Signal to child components that GSAP is ready
    setGsapInitialized(true);

    // Clean up all animations on unmount
    return () => {
      ctx.revert();
      
      // Kill all registered scroll triggers
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Kill ScrollSmoother
      if (globalScrollSmoother) {
        globalScrollSmoother.kill();
        globalScrollSmoother = null;
      }
      
      // Clear all animations
      Object.keys(globalAnimations as Record<string, gsap.core.Animation | gsap.core.Animation[]>).forEach(key => {
        const animation = globalAnimations[key as keyof typeof globalAnimations];
        if (animation) {
          if (Array.isArray(animation)) {
            (animation as gsap.core.Animation[]).forEach((anim: gsap.core.Animation) => anim.kill());
          } else {
            (animation as gsap.core.Animation).kill();
          }
        }
        
        // After killing the animation, remove it from the globalAnimations object
        delete globalAnimations[key as keyof typeof globalAnimations];
      });
    };
  }, []);

  return (
    <div ref={controllerRef} className="animation-controller">
      {/* Context provider approach - pass down the initialized state */}
      {React.Children.map(children, child => 
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<React.PropsWithChildren<{ gsapInitialized?: boolean }>>, { 
          ...(child.props as object),
          gsapInitialized 
        }) : child
      )}
    </div>
  );
}

// Main component with improved GSAP implementation
const VerticalShortcutLanding = () => {
  // Create refs for DOM elements
  const mainRef = useRef(null);
  const contentRef = useRef(null);
  
  // Section refs
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const tracksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);

  // Initialize animations with dependencies on gsapInitialized
  useLayoutEffect(() => {
    // Create a scoped GSAP context inside our component
    const ctx = gsap.context(() => {
      // Hero section animations - centralized batch for performance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(globalAnimations as any).heroSection) {
        const heroTl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power2.out" }
        });
        heroTl.from(".hero-title", {
          y: 40,
          opacity: 0,
        })
        .from(".hero-accent", {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, "-=0.3")
        .from(".hero-badge", {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.5")
        .from(".hero-cta", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        }, "-=0.3");
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | ScrollTrigger>).heroSection = heroTl;
      }
      
      // Stats section - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).statsSection && statsRef.current) {
        const statsTrigger = ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
          id: "stats-trigger", // Use unique ID for debugging
          onEnter: () => {
            const statsAnimation = gsap.from(".stat-item", {
              y: 30,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
              clearProps: "all"
            });
            
            // Type assertion to allow dynamic property assignment
            (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).statsItems = statsAnimation;
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).statsSection = statsTrigger;
      }
      
      // Benefits section - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).benefitsSection && benefitsRef.current) {
        const benefitsTrigger = ScrollTrigger.create({
          trigger: benefitsRef.current,
          start: "top 75%",
          once: true,
          id: "benefits-trigger",
          onEnter: () => {
            const benefitsAnimation = gsap.from(".benefit-item", {
              y: 40,
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all"
            });
            
            // Type assertion to allow dynamic property assignment
            (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).benefitsItems = benefitsAnimation;
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).benefitsSection = benefitsTrigger;
      }
      
      // Tracks section - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).tracksSection && tracksRef.current) {
        const tracksTrigger = ScrollTrigger.create({
          trigger: tracksRef.current,
          start: "top 75%",
          once: true,
          id: "tracks-trigger",
          onEnter: () => {
            const tracksAnimation = gsap.from(".track-item", {
              x: -20,
              opacity: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              clearProps: "all"
            });
            
            // Type assertion to allow dynamic property assignment
            (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).tracksItems = tracksAnimation;
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).tracksSection = tracksTrigger;
      }
      
      // Video section - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).videoSection && videoRef.current) {
        const videoTrigger = ScrollTrigger.create({
          trigger: videoRef.current,
          start: "top 70%",
          once: true,
          id: "video-trigger",
          onEnter: () => {
            const videoAnimation = gsap.from(".video-container", {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              clearProps: "all"
            });
            
            // Type assertion to allow dynamic property assignment
            (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).videoItem = videoAnimation;
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).videoSection = videoTrigger;
      }
      
      // Testimonials - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).testimonialsSection && testimonialsRef.current) {
        const testimonialsTrigger = ScrollTrigger.create({
          trigger: testimonialsRef.current,
          start: "top 75%",
          once: true,
          id: "testimonials-trigger",
          onEnter: () => {
            const testimonialsAnimation = gsap.from(".testimonial-item", {
              y: 30,
              opacity: 0,
              duration: 0.7,
              stagger: 0.2,
              ease: "power2.out",
              clearProps: "all"
            });
            
            // Type assertion to allow dynamic property assignment
            (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).testimonialsItems = testimonialsAnimation;
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).testimonialsSection = testimonialsTrigger;
      }
      
      // CTA section - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).ctaSection && ctaRef.current) {
        const ctaTrigger = ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 80%",
          once: true,
          id: "cta-trigger",
          onEnter: () => {
            const ctaTl = gsap.timeline();
            
            ctaTl.from(".cta-badge", {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out"
            })
            .from(".cta-title", {
              y: 30,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out"
            }, "-=0.3")
            .from(".cta-description", {
              y: 30,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out"
            }, "-=0.4")
            .from(".cta-button", {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.5)"
            }, "-=0.3");
            
            // Type assertion to allow dynamic property assignment
            (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).ctaItems = ctaTl;
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).ctaSection = ctaTrigger;
      }
    }, mainRef);
    
    // Cleanup 
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <AnimationController>
      <ThemeProvider defaultTheme="dark">
        {/* Main wrapper for ScrollSmoother */}
        <div id="smooth-wrapper" ref={mainRef} className="min-h-screen overflow-hidden">
          {/* Floating Navbar stays outside the smooth content for fixed positioning */}
          <VSNavbar />
          
          {/* Smooth content container */}
          <div id="smooth-content" ref={contentRef} className="min-h-screen bg-gradient-to-b from-[var(--deep-blue)] to-[color(display-p3_0.008_0.08_0.106)] text-white overflow-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-32 pb-24">
              {/* Background gradient */}
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[var(--primary-orange)]/20 to-transparent opacity-40 blur-3xl"></div>
              
              {/* Floating accent elements */}
              <div className="absolute top-1/4 right-[15%] w-24 h-24 rounded-full bg-[var(--accent-crimson)]/10 blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-[10%] w-32 h-32 rounded-full bg-[var(--primary-orange)]/10 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Logo background overlay positioned to the right and up */}
              <div className="absolute top-[5%] right-[7%] w-[450px] h-[450px] opacity-50 z-0">
                <Logo type="logo-bg-overlay-svg" className="w-full h-full" />
              </div>
              
              {/* Main logo positioned on top of the overlay */}
              <div className="absolute top-[12%] right-[15%] w-[350px] h-[350px] z-0">
                <Logo type="Logo-whole" className="w-full h-full" />
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] items-center">
                  {/* Isometric Grid Column */}
                  <div className="lg:col-span-5 relative order-2 lg:order-1">
                    <div className="w-full h-[550px] relative">
                      {/* Far background layer - Smaller cubes */}
                      <div className="absolute inset-0" style={{ opacity: 0.2 }}>
                        <IsometricGrid 
                          rows={12}                 
                          cols={10}                 
                          cubeSize={50}             
                          horizontalSpacing={70}    
                          verticalSpacing={40}      
                          containerWidth={550}     
                          containerHeight={550}
                          customCubes={farBackgroundGridCubes}
                          offsetX={-100}
                          offsetY={50}
                        />
                      </div>
                    
                      {/* Background layer - Medium-sized cubes - REDUCED */}
                      <div className="absolute inset-0" style={{ opacity: 0.6 }}>
                        <IsometricGrid 
                          rows={10}                 
                          cols={10}                 
                          cubeSize={70}            
                          horizontalSpacing={80}   
                          verticalSpacing={60}     
                          containerWidth={550}     
                          containerHeight={550}
                          customCubes={backgroundGridCubes}
                          offsetX={-50}
                          offsetY={20}
                        />
                      </div>
                      
                      {/* Main foreground layer - Largest cubes */}
                      <div className="absolute inset-0" style={{ zIndex: 10 }}>
                        <IsometricGrid 
                          rows={12}                 
                          cols={8}                 
                          cubeSize={95}            
                          horizontalSpacing={135}   
                          verticalSpacing={114}     
                          containerWidth={550}     
                          containerHeight={550}
                          customCubes={mainGridCubes}
                          offsetX={-30}
                          offsetY={0}
                        />
                      </div>
                      
                      {/* Dotted path between cubes */}
                      <svg width="100%" height="100%" className="absolute top-0 left-0" 
                           style={{ zIndex: 0, pointerEvents: 'none' }}>
                        <path 
                          d="M200,310 Q250,350 300,330 L390,150" 
                          stroke="#FEA35D" 
                          strokeWidth="2" 
                          strokeDasharray="5,5" 
                          fill="none" 
                          opacity="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text Column */}
                  <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
                    <div className="hero-badge inline-block mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full max-w-max">
                      <span className="text-[var(--primary-orange)] font-semibold">10-Week Transformation Program</span>
                    </div>
                    
                    <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      <span className="hero-accent bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-red)] bg-clip-text text-transparent">800 million views</span>,<br />
                      zero spent on ads
                    </h1>
                    
                    <p className="hero-description text-white/80 text-xl mb-10 max-w-xl leading-relaxed">
                      A proven turn-key system to survive, thrive, and monetise with short-form content. Stop posting into the void. Start creating content that converts.
                    </p>
                    
                    <div className="hero-cta flex flex-wrap gap-4">
                      <Button 
                        className="px-8 py-7 bg-[var(--primary-orange)] hover:bg-[var(--primary-coral)] text-lg font-semibold"
                        onClick={() => window.location.href = '/application-form'}
                      >
                        Apply Now <span className="ml-2">&rarr;</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="px-8 py-7 border border-white/20 hover:bg-white/10 text-lg font-semibold"
                        onClick={() => window.open('https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call', '_blank')}
                      >
                        Book a Call
                      </Button>
                    </div>

                    {/* Add newsletter button in the hero section */}
                    <Button 
                      variant="ghost" 
                      className="px-8 py-3 text-white/80 hover:text-white hover:bg-white/5"
                      onClick={() => {
                        // Create a newsletter signup modal based on the example in ComingSoon.tsx
                        const form = document.createElement('form');
                        form.action = 'https://app.convertkit.com/forms/7770876/subscriptions';
                        form.className = 'seva-form formkit-form';
                        form.method = 'post';
                        form.setAttribute('data-sv-form', '7770876');
                        form.setAttribute('data-uid', 'b8e4ad5fd9');
                        form.setAttribute('data-format', 'modal');
                        form.setAttribute('data-version', '5');
                        form.setAttribute('min-width', '400 500 600 700 800');
                        form.style.backgroundColor = '#09232F';
                        form.style.borderRadius = '16px';
                        form.style.padding = '2.5rem';
                        form.style.maxWidth = '550px';
                        form.style.width = '90%';

                        form.innerHTML = `
                          <div class="formkit-background" style="opacity: 0.2;"></div>
                          <div data-style="minimal">
                            <div class="formkit-header" data-element="header" style="color: rgb(255, 255, 255); font-size: 24px; font-weight: 800; margin-bottom: 1.5rem;">
                              <h2 style="text-align:center">The Vertical Shortcut:</h2>
                            </div>
                            <div class="formkit-subheader" data-element="subheader" style="color: rgb(255, 255, 255); font-size: 18px; line-height: 1.6; margin-bottom: 2rem;">
                              <h2 style="text-align:center">A Proven System to Survive, Thrive, and Monetise<br>with Short Form Video.</h2>
                              <p style="margin-top: 1rem; opacity: 0.9; font-size: 16px;">Join the Newsletter to Stay Updated and Receive Free Content.</p>
                            </div>
                            <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                            <div data-element="fields" data-stacked="true" class="seva-fields formkit-fields" style="gap: 1rem;">
                              <div class="formkit-field">
                                <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1rem 1.5rem; font-size: 1rem; width: 100%; margin-bottom: 1rem;">
                              </div>
                              <div class="formkit-field">
                                <input class="formkit-input" aria-label="First Name" name="fields[first_name]" required="" placeholder="First Name" type="text" style="color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1rem 1.5rem; font-size: 1rem; width: 100%; margin-bottom: 1rem;">
                              </div>
                              <div class="formkit-field">
                                <input class="formkit-input" aria-label="Surname" name="fields[surname]" placeholder="Surname" type="text" style="color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1rem 1.5rem; font-size: 1rem; width: 100%; margin-bottom: 1.5rem;">
                              </div>
                              <button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background: linear-gradient(90deg, #E76662, #FEAF52); border-radius: 12px; padding: 1rem; font-size: 1rem; font-weight: 600; width: 100%; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s ease;">
                                <div class="formkit-spinner"><div></div><div></div><div></div></div>
                                <span class="">Join Newsletter</span>
                              </button>
                            </div>
                            <div class="formkit-guarantee" data-element="guarantee" style="color: rgba(255, 255, 255, 0.6); font-size: 14px; margin-top: 1rem; text-align: center;">
                              <p>We won't send you spam. Unsubscribe at any time.</p>
                            </div>
                          </div>
                        `;

                        // Create a modal container
                        const modal = document.createElement('div');
                        modal.style.position = 'fixed';
                        modal.style.top = '0';
                        modal.style.left = '0';
                        modal.style.width = '100%';
                        modal.style.height = '100%';
                        modal.style.backgroundColor = 'rgba(3, 10, 16, 0.95)';
                        modal.style.display = 'flex';
                        modal.style.justifyContent = 'center';
                        modal.style.alignItems = 'center';
                        modal.style.zIndex = '9999';
                        modal.style.backdropFilter = 'blur(10px)';

                        // Add close button
                        const closeButton = document.createElement('button');
                        closeButton.innerHTML = '×';
                        closeButton.style.position = 'absolute';
                        closeButton.style.top = '20px';
                        closeButton.style.right = '20px';
                        closeButton.style.fontSize = '32px';
                        closeButton.style.color = 'white';
                        closeButton.style.background = 'rgba(255, 255, 255, 0.1)';
                        closeButton.style.border = 'none';
                        closeButton.style.borderRadius = '50%';
                        closeButton.style.width = '48px';
                        closeButton.style.height = '48px';
                        closeButton.style.cursor = 'pointer';
                        closeButton.style.display = 'flex';
                        closeButton.style.alignItems = 'center';
                        closeButton.style.justifyContent = 'center';
                        closeButton.style.transition = 'all 0.3s ease';
                        closeButton.onmouseover = () => closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
                        closeButton.onmouseout = () => closeButton.style.background = 'rgba(255, 255, 255, 0.1)';
                        closeButton.onclick = () => modal.remove();

                        // Add form to modal
                        modal.appendChild(closeButton);
                        modal.appendChild(form);
                        document.body.appendChild(modal);

                        // Close modal on outside click
                        modal.addEventListener('click', (e) => {
                          if (e.target === modal) {
                            modal.remove();
                          }
                        });
                      }}
                    >
                      Join Newsletter
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Stats Section with Social Proof */}
            <Section ref={statsRef} className="bg-[color(display-p3_0.008_0.08_0.106)] py-20 border-t border-[var(--secondary-teal)]/30">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Course Stats That Speak for Themselves</h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    Vertical Shortcut isn't just another course. It's the culmination of years creating content that drove real business results.
                  </p>
                </div>
                
                {/* CourseStats component with animation setup */}
                <CourseStats />
                
                <div className="text-center mb-10">
                  <Badge variant="outline" className="bg-[var(--accent-crimson)]/10 text-[var(--primary-orange)] border-[var(--primary-orange)]/30 py-2 px-4">
                    Don't Just Take Our Word For It
                  </Badge>
                </div>
              </div>
            </Section>
            
            {/* Video Showcase Section with Fixed Component */}
            <div ref={videoRef} className="relative py-16 bg-[var(--deep-blue)]">
              <div className="container mx-auto px-4">
                <div className="video-container max-w-4xl mx-auto">
                  <SafeVideoEmbed videoUrl="https://www.youtube.com/embed/your-video-id" />
                </div>
              </div>
            </div>
            
            {/* Bento Grid Section - Managed by the VSBentoGrid component */}
            <VSBentoGrid />
            
            {/* Core Benefits Section */}
            <Section ref={benefitsRef} className="benefits-section bg-gradient-to-b from-[color(display-p3_0.008_0.08_0.106)] to-[var(--deep-blue)] py-24">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="bg-white/5 text-[var(--primary-orange)] border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
                    What You'll Achieve
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">What Makes This Different</span>
                  </h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    Vertical Shortcut isn't about generic advice. It's a complete system for creating content that stands out and drives real business results.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="benefit-item bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[var(--primary-orange)]/30 transition-all duration-300"
                    >
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                        style={{ backgroundColor: benefit.color }}
                      >
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                      <p className="text-white/70">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-16 text-center">
                  <Button 
                    className="px-8 py-6 bg-[var(--accent-crimson)] hover:bg-[var(--accent-red)] text-lg font-semibold"
                    onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Full Curriculum
                  </Button>
                </div>
              </div>
            </Section>
            

            
            {/* Learning Tracks Section */}
            <Section ref={tracksRef} className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                    Specialized Learning Paths
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Choose Your Path to Mastery</span>
                  </h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    Vertical Shortcut adapts to your specific goals, whether you're a founder with limited time or a dedicated creator looking to scale.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {tracks.map((track, index) => (
                    <div 
                      key={index} 
                      className="track-item bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FEA35D]/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: track.color }}
                        >
                          {track.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{track.name}</h3>
                      </div>
                      <p className="text-white/70">
                        {track.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
            
            {/* Curriculum Preview Section - Custom Module Breakdown */}
            <Section className="bg-[#08141B] py-24">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {/* Module breakdown component */}
                  <ModuleBreakdownSimplified />
                </div>
                
                <div className="mt-16 text-center">
                  <Alert className="bg-[#154D59]/50 border-[#FEA35D] max-w-3xl mx-auto mb-8">
                    <AlertTitle className="text-[#FEA35D] text-lg">This is just a preview!</AlertTitle>
                    <AlertDescription className="text-white/90">
                      The full Vertical Shortcut program contains over 178 modules across 10 categories, with new content added monthly.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    className="px-8 py-6 bg-[#B92234] hover:bg-[#DE6B59] text-lg font-semibold mt-6"
                    onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Full Curriculum
                  </Button>
                </div>
              </div>
            </Section>
            
            {/* Use VSCarousel component */}
            <VSCarousel />
            
            {/* Add FeaturedModules component */}
            <FeaturedModules />
            
            {/* Use Cases Section with Tabs */}
            <TabsLeft />
            
            {/* ContentOverwhelmer section - with proper animation management */}
            <ContentOverwhelmer />
            
            {/* What You'll Learn Section */}
            <Section className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                    Real-World Skills
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">What You'll Learn</span>
                  </h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    Concrete, actionable skills you can implement immediately to see dramatic results in your content performance.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {learningOutcomes.map((outcome, index) => (
                    <Item 
                      key={index} 
                      className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#FEA35D]/30 transition-all duration-300"
                    >
                      <ItemIcon className="text-[#FEA35D] mb-4">
                        {outcome.icon}
                      </ItemIcon>
                      <ItemTitle className="text-white mb-2">{outcome.title}</ItemTitle>
                      <ItemDescription className="text-white/70">
                        {outcome.description}
                      </ItemDescription>
                    </Item>
                  ))}
                </div>
              </div>
            </Section>
            
            {/* Testimonials Full Section */}
            <Section ref={testimonialsRef} className="testimonials-section bg-[#08141B] py-24 border-t border-[#154D59]/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                    Success Stories
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">From Our Students</span>
                  </h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    Real transformations from people who applied the Vertical Shortcut system to their content.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                      <SocialProofItem
                        name={testimonial.name}
                        username={testimonial.username}
                        text={testimonial.text}
                        image={testimonial.image}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Testimonial Carousel */}
                <div className="mt-16 text-center mb-8">
                  <h3 className="text-2xl font-bold mb-6">More Success Stories</h3>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <TestimonialCarousel testimonials={carouselTestimonials} />
                </div>
              </div>
            </Section>
            
            {/* Social Proof Marquee */}
            <SocialProof />
            
            {/* Key Features Section */}
            <Section className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                  <div>
                    <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                      Program Features
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">What You Get</span>
                    </h2>
                    <p className="text-white/70 text-lg mb-8">
                      Beyond just the course content, Vertical Shortcut provides everything you need to implement what you learn successfully.
                    </p>
                    
                    <div className="space-y-6">
                      {keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="mt-1">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                            <p className="text-white/70">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">Program Details</h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <div className="text-lg">Duration</div>
                        <div className="text-lg font-bold">10 Weeks</div>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <div className="text-lg">Commitment</div>
                        <div className="text-lg font-bold">4 Hours/Week</div>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <div className="text-lg">Format</div>
                        <div className="text-lg font-bold">Online + Live Sessions</div>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <div className="text-lg">Next Cohort</div>
                        <div className="text-lg font-bold text-[#B92234]">March 25, 2025</div>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <div className="text-lg">Class Size</div>
                        <div className="text-lg font-bold">Limited to 20 Students</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-lg">Investment</div>
                        <div className="text-xl font-bold text-[#FEA35D]">£6,500</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        className="w-full py-5 bg-[#B92234] hover:bg-[#DE6B59] text-lg font-semibold"
                        onClick={() => window.location.href = '/application-form'}
                      >
                        Apply Now
                      </Button>
                      
                      <p className="text-white/50 text-sm text-center mt-4">
                        4 monthly installments of £1,625 available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
            
            {/* Pricing Section */}
            <PricingSection />
            
            {/* FAQ Section */}
            <FAQUpdated />
            
            {/* Add Founder Track section before the final CTA */}
            <FounderTrack />
            
            {/* Final CTA Section */}
            <Section ref={ctaRef} className="bg-[#08141B] py-24 border-t border-[#154D59]/30 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FEA35D]/5 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#B92234]/10 to-transparent opacity-30 blur-3xl"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <Glow variant="center" />
                    <div className="cta-badge inline-block mb-6 bg-[#FEAC6D]/10 px-6 py-3 rounded-full border border-[#FEAC6D]/30">
                      <span className="text-[#FEAC6D] font-semibold flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Limited spots available for next cohort
                      </span>
                    </div>
                    
                    <h2 className="cta-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      Ready to <span className="bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] bg-clip-text text-transparent">Transform</span> Your Content?
                    </h2>
                    
                    <p className="cta-description text-xl text-white/80 mb-10">
                      Join Vertical Shortcut today and get access to our complete system for creating high-converting content that drives real business results.
                    </p>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <LeadCaptureForm />
                  </div>
                </div>
              </div>
            </Section>
            
            {/* Footer */}
            <footer className="bg-[#09232F] py-16 border-t border-[#154D59]/30">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white mb-4">Vertical Shortcut</h4>
                    <p className="text-white/60 max-w-xs">
                      The premium 10-week program for founders and creators who want to master short-form content and generate consistent leads and revenue.
                    </p>
                    
                    <div className="pt-4">
                      <p className="text-white/40 text-sm">
                        &copy; {new Date().getFullYear()} Clash Creation
                      </p>
                      <p className="text-white/40 text-sm">
                        All rights reserved
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Program</h4>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Curriculum</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Pricing</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Success Stories</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">FAQ</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Apply Now</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Company</h4>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">About Us</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Blog</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Careers</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Contact</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Terms of Service</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Cookie Policy</a></li>
                    </ul>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                      <div className="flex gap-4">
                        <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </AnimationController>
  );
};

export default VerticalShortcutLanding;