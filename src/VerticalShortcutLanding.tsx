import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import SimpleHero from './components/hero/SimpleHero';
import ContentOverwhelmer from './components/ContentOverwhelmer';
import { PricingSection } from './components/sections/pricing-section.tsx';
import { Section } from './components/ui/section';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import SocialProofItem from './components/ui/social-proof-item';
import Glow from './components/ui/glow';
import { Item, ItemIcon, ItemTitle, ItemDescription } from './components/ui/item';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
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
import HeroLogo from './components/logos/Hero';
import VerticalShortcutApplicationForm from './components/form/form-shadcn-claude';
import { CourseViewer } from './components/sections/course-viewer';
import { CaseStudies } from './components/sections';
import { Link } from 'react-router-dom';
import { AnimatedButton } from './components/marble-buttons/AnimatedButton';

// Import VS helper components for correct light/dark mode implementation
import { VSText, VSHeading, VSGradientText } from './components/ui/vs-text';
import { VSBackground, VSCard, VSSection } from './components/ui/vs-background';
import { VSButton, VSIconButton } from './components/ui/vs-button';

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

// Hero section settings
const heroSettings = {
  title: "800 million views, zero spent on ads",
  subtitle: "A proven turn-key system to survive, thrive, and monetise with short-form content.",
  badgeText: "10-Week Transformation Program"
};

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
  const caseStudiesRef = useRef(null);

  // Add state for application modal
  const [showApplicationModal, setShowApplicationModal] = useState(false);

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
      
      // Case Studies section - register once
      if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).caseStudiesSection && caseStudiesRef.current) {
        const caseStudiesTrigger = ScrollTrigger.create({
          trigger: ".case-study-element",
          start: "top 75%",
          once: true,
          id: "case-studies-trigger",
          onEnter: () => {
            // Animation will be handled by the CaseStudies component itself
            // using its own GSAP context and ScrollTrigger
            console.log("Case studies section in view");
          }
        });
        
        // Type assertion to allow dynamic property assignment
        (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).caseStudiesSection = caseStudiesTrigger;
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

  // Function to open the application form modal
  const openApplicationModal = () => {
    setShowApplicationModal(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Pause ScrollSmoother to prevent background page scrolling
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(true);
    }
  };
  
  // Function to close the application form modal
  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'auto';
    // Resume ScrollSmoother
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(false);
    }
  };

  return (
    <AnimationController>
      {/* Application form modal */}
      {showApplicationModal && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            // Close modal when clicking the backdrop (outside the modal content)
            if (e.target === e.currentTarget) {
              closeApplicationModal();
            }
          }}
        >
          <div 
            className="absolute inset-0 overflow-y-auto p-4 flex items-center justify-center"
            style={{ paddingTop: '2vh', paddingBottom: '2vh' }}
          >
            <VSBackground
              as="div"
              lightBg="bg-[--deep-blue]"
              darkBg="dark:bg-[--deep-blue]"
              className="w-full max-w-5xl rounded-xl" 
              onClick={(e) => e.stopPropagation()}
            >
              <VerticalShortcutApplicationForm onClose={closeApplicationModal} />
            </VSBackground>
          </div>
        </div>
      )}
    
      {/* Main wrapper for ScrollSmoother */}
      <div id="smooth-wrapper" ref={mainRef} className="min-h-screen overflow-hidden">
        {/* Floating Navbar stays outside the smooth content for fixed positioning */}
        <VSNavbar />
        
        {/* Smooth content container */}
        <VSBackground 
          as="div"
          id="smooth-content" 
          ref={contentRef} 
          lightBg="bg-gradient-to-b from-[--deep-blue] to-[color(display-p3_0.008_0.08_0.106)]"
          darkBg="dark:bg-gradient-to-b dark:from-[--deep-blue] dark:to-[color(display-p3_0.008_0.08_0.106)]"
          className="min-h-screen overflow-hidden"
        >
          {/* Hero Section */}
          <SimpleHero ref={heroRef} onCtaClick={openApplicationModal} />

          {/* Course Viewer - Minimalist HUD Layout */}
          <CourseViewer />
          
          {/* Stats Section with Social Proof */}
          <VSSection 
            ref={statsRef} 
            lightBg="bg-[color(display-p3_0.008_0.08_0.106)]"
            darkBg="dark:bg-[color(display-p3_0.008_0.08_0.106)]"
            className="py-20 border-t border-[--secondary-teal]/30"
          >
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <VSHeading variant="h2" className="text-3xl md:text-4xl mb-6">
                  Course Stats That Speak for Themselves
                </VSHeading>
                <VSText color="--text-navy" darkClassName="dark:text-white/70" className="text-xl max-w-3xl mx-auto">
                  Vertical Shortcut isn't just another course. It's the culmination of years creating content that drove real business results.
                </VSText>
              </div>
              
              {/* CourseStats component - THIS COMPONENT MAINTAINS ITS OWN STYLING */}
              {/* It has special styling rules for stats with vibrant colors */}
              <CourseStats />
              
              <div className="text-center mb-10">
                <Badge variant="outline" className="bg-[--accent-crimson]/10 border-[--primary-orange]/30 py-2 px-4">
                  <VSText color="--primary-orange" darkClassName="dark:text-[--primary-orange]">
                    Don't Just Take Our Word For It
                  </VSText>
                </Badge>
              </div>
            </div>
          </VSSection>
          
          {/* Video Showcase Section with Video Component */}
          {/* 
            NOTE: SafeVideoEmbed maintains its own styling for both light/dark modes
            It has special animations and styling that shouldn't be overridden
          */}
          <div className="video-container" ref={videoRef}>
            <SafeVideoEmbed videoUrl="https://www.youtube.com/embed/your-video-id" />
          </div>
          
          {/* Case Studies Section - Shows real growth metrics */}
          <CaseStudies ref={caseStudiesRef} />
          
          {/* Bento Grid Section - Managed by the VSBentoGrid component */}
          <VSBentoGrid />
          
          {/* Core Benefits Section */}
          <VSSection 
            ref={benefitsRef} 
            lightBg="bg-gradient-to-b from-[color(display-p3_0.008_0.08_0.106)] to-[var(--deep-blue)]"
            darkBg="dark:bg-gradient-to-b dark:from-[color(display-p3_0.008_0.08_0.106)] dark:to-[var(--deep-blue)]"
            className="benefits-section py-24"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
                  <VSText color="var(--primary-orange)" className="dark:text-[var(--primary-orange)]">
                    What You'll Achieve
                  </VSText>
                </Badge>
                <VSGradientText
                  variant="h2"
                  fromColor="white"
                  toColor="rgba(255,255,255,0.7)"
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  What Makes This Different
                </VSGradientText>
                <VSText color="white" className="text-xl dark:text-white/70 max-w-3xl mx-auto">
                  Vertical Shortcut isn't about generic advice. It's a complete system for creating content that stands out and drives real business results.
                </VSText>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                  <VSCard 
                    key={index} 
                    className="benefit-item backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[var(--primary-orange)]/30"
                    lightBg="bg-white/5"
                    darkBg="dark:bg-white/5"
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: benefit.color }}
                    >
                      {benefit.icon}
                    </div>
                    <VSHeading variant="h3" color="white" className="text-xl mb-4">
                      {benefit.title}
                    </VSHeading>
                    <VSText color="white" className="dark:text-white/70">
                      {benefit.description}
                    </VSText>
                  </VSCard>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <AnimatedButton 
                  text="View Full Curriculum"
                  variant="learn" 
                  saturation="normal"
                  size="lg"
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-auto"
                />
              </div>
            </div>
          </VSSection>
          

          
          {/* Learning Tracks Section */}
          <VSSection 
            ref={tracksRef} 
            lightBg="bg-[--bg-navy]" 
            darkBg="dark:bg-[--bg-navy]"
            className="py-24 border-t border-[--secondary-teal]/30"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 border-[--primary-orange]/30 mb-4 py-2 px-4">
                  <VSText color="--primary-orange" className="dark:text-[--primary-orange]">
                    Specialized Learning Paths
                  </VSText>
                </Badge>
                <VSGradientText
                  variant="h2"
                  fromColor="white"
                  toColor="rgba(255,255,255,0.7)"
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Choose Your Path to Mastery
                </VSGradientText>
                <VSText color="white" className="text-xl dark:text-white/70 max-w-3xl mx-auto">
                  Vertical Shortcut adapts to your specific goals, whether you're a founder with limited time or a dedicated creator looking to scale.
                </VSText>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {tracks.map((track, index) => (
                  <VSCard
                    key={index} 
                    className="track-item backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[var(--primary-orange)]/30"
                    lightBg="bg-white/5"
                    darkBg="dark:bg-white/5"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: track.color }}
                      >
                        {track.icon}
                      </div>
                      <VSHeading variant="h3" color="white" className="text-xl">
                        {track.name}
                      </VSHeading>
                    </div>
                    <VSText color="white" className="dark:text-white/70">
                      {track.description}
                    </VSText>
                  </VSCard>
                ))}
              </div>
            </div>
          </VSSection>
          
          {/* Curriculum Preview Section - Custom Module Breakdown */}
          <VSSection 
            lightBg="bg-[var(--bg-navy-dark)]" 
            darkBg="dark:bg-[var(--bg-navy-dark)]"
            className="py-24"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Module breakdown component */}
                <ModuleBreakdownSimplified />
              </div>
              
              <div className="mt-16 text-center">
                <Alert className="bg-[var(--secondary-teal)]/50 border-[var(--primary-orange)] max-w-3xl mx-auto mb-8">
                  <AlertTitle className="text-lg">
                    <VSText color="var(--primary-orange)" className="dark:text-[var(--primary-orange)]">
                      This is just a preview!
                    </VSText>
                  </AlertTitle>
                  <AlertDescription>
                    <VSText color="white" className="dark:text-white/90">
                      The full Vertical Shortcut program contains over 178 modules across 10 categories, with new content added monthly.
                    </VSText>
                  </AlertDescription>
                </Alert>
                
                <AnimatedButton 
                  text="View Full Curriculum"
                  variant="learn" 
                  saturation="normal"
                  size="lg"
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-auto"
                />
              </div>
            </div>
          </VSSection>
          
          {/* Use VSCarousel component */}
          <VSCarousel />
          
          {/* Add FeaturedModules component */}
          <FeaturedModules />
          
          {/* Use Cases Section with Tabs */}
          <TabsLeft />
          
          {/* ContentOverwhelmer section - with proper animation management */}
          <ContentOverwhelmer />
          
          {/* What You'll Learn Section */}
          <VSSection 
            lightBg="bg-[var(--bg-navy)]" 
            darkBg="dark:bg-[var(--bg-navy)]"
            className="py-24 border-t border-[var(--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
                  <VSText color="var(--primary-orange)" className="dark:text-[var(--primary-orange)]">
                    Real-World Skills
                  </VSText>
                </Badge>
                <VSGradientText
                  variant="h2"
                  fromColor="white"
                  toColor="rgba(255,255,255,0.7)"
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  What You'll Learn
                </VSGradientText>
                <VSText color="white" className="text-xl dark:text-white/70 max-w-3xl mx-auto">
                  Concrete, actionable skills you can implement immediately to see dramatic results in your content performance.
                </VSText>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {learningOutcomes.map((outcome, index) => (
                  <VSCard 
                    key={index} 
                    className="backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[var(--primary-orange)]/30"
                    lightBg="bg-white/5"
                    darkBg="dark:bg-white/5"
                  >
                    <div style={{ color: 'var(--primary-orange)' }} className="dark:text-[var(--primary-orange)] mb-4">
                      {outcome.icon}
                    </div>
                    <VSHeading variant="h3" color="white" className="text-xl mb-2">
                      {outcome.title}
                    </VSHeading>
                    <VSText color="white" className="dark:text-white/70">
                      {outcome.description}
                    </VSText>
                  </VSCard>
                ))}
              </div>
            </div>
          </VSSection>
          
          {/* Testimonials Full Section */}
          <VSSection 
            ref={testimonialsRef} 
            lightBg="bg-[var(--bg-navy-dark)]" 
            darkBg="dark:bg-[var(--bg-navy-dark)]"
            className="testimonials-section py-24 border-t border-[var(--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
                  <VSText color="var(--primary-orange)" className="dark:text-[var(--primary-orange)]">
                    Success Stories
                  </VSText>
                </Badge>
                <VSGradientText
                  variant="h2"
                  fromColor="white"
                  toColor="rgba(255,255,255,0.7)"
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  From Our Students
                </VSGradientText>
                <VSText color="white" className="text-xl dark:text-white/70 max-w-3xl mx-auto">
                  Real transformations from people who applied the Vertical Shortcut system to their content.
                </VSText>
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
                <VSHeading variant="h3" color="white" className="text-2xl mb-6">
                  More Success Stories
                </VSHeading>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <TestimonialCarousel testimonials={carouselTestimonials} />
              </div>
            </div>
          </VSSection>
          
          {/* Social Proof Marquee */}
          <SocialProof />
          
          {/* Key Features Section */}
          <VSSection 
            lightBg="bg-[var(--bg-navy)]" 
            darkBg="dark:bg-[var(--bg-navy)]"
            className="py-24 border-t border-[var(--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                <div>
                  <Badge variant="outline" className="bg-white/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
                    <VSText color="var(--primary-orange)" className="dark:text-[var(--primary-orange)]">
                      Program Features
                    </VSText>
                  </Badge>
                  <VSGradientText
                    variant="h2"
                    fromColor="white"
                    toColor="rgba(255,255,255,0.7)"
                    className="text-3xl md:text-4xl font-bold mb-6"
                  >
                    What You Get
                  </VSGradientText>
                  <VSText color="white" className="text-lg dark:text-white/70 mb-8">
                    Beyond just the course content, Vertical Shortcut provides everything you need to implement what you learn successfully.
                  </VSText>
                  
                  <div className="space-y-6">
                    {keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="mt-1">
                          {feature.icon}
                        </div>
                        <div>
                          <VSHeading variant="h3" color="white" className="text-lg mb-1">
                            {feature.title}
                          </VSHeading>
                          <VSText color="white" className="dark:text-white/70">
                            {feature.description}
                          </VSText>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <VSCard
                  lightBg="bg-white/5"
                  darkBg="dark:bg-white/5"
                  className="backdrop-blur-sm rounded-xl p-8 border border-white/10"
                >
                  <VSHeading variant="h3" color="white" className="text-2xl mb-6">
                    Program Details
                  </VSHeading>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <VSText color="white" className="text-lg">Duration</VSText>
                      <VSText color="white" className="text-lg font-bold">10 Weeks</VSText>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <VSText color="white" className="text-lg">Commitment</VSText>
                      <VSText color="white" className="text-lg font-bold">4 Hours/Week</VSText>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <VSText color="white" className="text-lg">Format</VSText>
                      <VSText color="white" className="text-lg font-bold">Online + Live Sessions</VSText>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <VSText color="white" className="text-lg">Next Cohort</VSText>
                      <VSText color="var(--accent-crimson)" className="text-lg font-bold dark:text-[var(--accent-crimson)]">
                        March 25, 2025
                      </VSText>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <VSText color="white" className="text-lg">Class Size</VSText>
                      <VSText color="white" className="text-lg font-bold">Limited to 20 Students</VSText>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <VSText color="white" className="text-lg">Investment</VSText>
                      <VSText color="var(--primary-orange)" className="text-xl font-bold dark:text-[var(--primary-orange)]">
                        £6,500
                      </VSText>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <AnimatedButton
                      text="Apply Now"
                      variant="start"
                      saturation="high"
                      size="lg"
                      onClick={openApplicationModal}
                      className="w-auto"
                    />
                    
                    <VSText color="white" className="text-sm text-center mt-4 dark:text-white/50">
                      4 monthly installments of £1,625 available
                    </VSText>
                  </div>
                </VSCard>
              </div>
            </div>
          </VSSection>
          
          {/* Pricing Section */}
          <PricingSection />
          
          {/* FAQ Section */}
          <FAQUpdated />
          
          {/* Add Founder Track section before the final CTA */}
          <FounderTrack />
          
          {/* Final CTA Section */}
          <VSSection 
            ref={ctaRef} 
            lightBg="bg-[var(--bg-navy-dark)]"
            darkBg="dark:bg-[var(--bg-navy-dark)]"
            className="py-24 border-t border-[var(--secondary-teal)]/30 relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--primary-orange)]/5 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[var(--accent-crimson)]/10 to-transparent opacity-30 blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2 text-center lg:text-left">
                  <Glow variant="center" />
                  <div className="cta-badge inline-block mb-6 bg-[var(--primary-orange)]/10 px-6 py-3 rounded-full border border-[var(--primary-orange)]/30">
                    <VSText color="var(--primary-orange)" className="font-semibold flex items-center gap-2 dark:text-[var(--primary-orange)]">
                      <Clock className="h-4 w-4" /> Limited spots available for next cohort
                    </VSText>
                  </div>
                  
                  <h2 className="cta-title">
                    <VSHeading variant="h2" color="white" className="text-4xl md:text-5xl lg:text-6xl mb-6">
                      Ready to <span className="inline-block">
                        <VSGradientText
                          fromColor="var(--primary-orange)" 
                          toColor="var(--accent-coral)"
                        >
                          Transform
                        </VSGradientText>
                      </span> Your Content?
                    </VSHeading>
                  </h2>
                  
                  <VSText color="white" className="cta-description text-xl dark:text-white/80 mb-10">
                    Join Vertical Shortcut today and get access to our complete system for creating high-converting content that drives real business results.
                  </VSText>
                </div>
                
                <div className="lg:w-1/2">
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </VSSection>
          
          {/* Footer */}
          <VSBackground
            as="footer" 
            lightBg="bg-[var(--bg-navy)]" 
            darkBg="dark:bg-[var(--bg-navy)]"
            className="py-16 border-t border-[var(--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div className="space-y-4">
                  <VSHeading variant="h4" color="white" className="text-xl mb-4">
                    Vertical Shortcut
                  </VSHeading>
                  <VSText color="white" className="max-w-xs dark:text-white/60">
                    The premium 10-week program for founders and creators who want to master short-form content and generate consistent leads and revenue.
                  </VSText>
                  
                  <div className="pt-4">
                    <VSText color="white" className="text-sm dark:text-white/40">
                      &copy; {new Date().getFullYear()} Clash Creation
                    </VSText>
                    <VSText color="white" className="text-sm dark:text-white/40">
                      All rights reserved
                    </VSText>
                  </div>
                </div>
                
                <div>
                  <VSHeading variant="h4" color="white" className="text-lg mb-4">
                    Program
                  </VSHeading>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Curriculum
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Pricing
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Success Stories
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          FAQ
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Apply Now
                        </VSText>
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <VSHeading variant="h4" color="white" className="text-lg mb-4">
                    Company
                  </VSHeading>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          About Us
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <Link to="/marble-buttons" className="text-white/60 hover:text-[var(--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Marble Buttons Demo
                        </VSText>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Blog
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Careers
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Contact
                        </VSText>
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <VSHeading variant="h4" color="white" className="text-lg mb-4">
                    Legal
                  </VSHeading>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Terms of Service
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Privacy Policy
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[var(--primary-orange)]">
                          Cookie Policy
                        </VSText>
                      </a>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <VSHeading variant="h4" color="white" className="text-lg mb-4">
                      Follow Us
                    </VSHeading>
                    <div className="flex gap-4">
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] dark:text-white/60 dark:hover:text-[var(--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] dark:text-white/60 dark:hover:text-[var(--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] dark:text-white/60 dark:hover:text-[var(--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a href="#" className="text-white/60 hover:text-[var(--primary-orange)] dark:text-white/60 dark:hover:text-[var(--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </VSBackground>
        </VSBackground>
        </div>
      </AnimationController>
  );
};

export default VerticalShortcutLanding;