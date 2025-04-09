import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import VSQualificationModal from './Qualification_components/qualification-modal';
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
import VSNavbar from './components/sections/navbar/vs-navbar';
import CourseStats from './components/sections/course-stats';
import FounderTrack from './components/sections/founder-track';
import FAQUpdated from './components/sections/faq-updated';
import TabsLeft from './components/sections/tabs/left';
import SocialProof from './components/sections/social-proof/marquee-2-rows';
import TestimonialCarousel from './components/ui/testimonial-carousel';
import LeadCaptureForm from './components/ui/lead-capture-form';
import { CaseStudies, VSPainPoints } from './components/sections';
import VSBigReveal from './components/sections/VS-BigReveal';
import { Link } from 'react-router-dom';
import { AnimatedButton } from './components/marble-buttons/AnimatedButton';
import { CourseViewer } from './components/sections/course-viewer';
import MeetTheTeam from './components/sections/TeamSection';
import CourseTimeline from './components/CourseTimeline';
import PricingSimple from './components/sections/PricingSimple';
import Customisation from './components/sections/Customisation';

// Import VS helper components for correct light/dark mode implementation
import { VSText, VSHeading, VSGradientText } from './components/ui/vs-text';
import { VSBackground, VSCard, VSSection } from './components/ui/vs-background';

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
  Calendar,
  Users,
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

// Features data is now in VS-BigReveal component

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
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<React.PropsWithChildren<{ "data-gsap-initialized"?: boolean }>>, { 
          ...(child.props as object),
          "data-gsap-initialized": gsapInitialized 
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

  // Add state for qualification modal
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [testMode, setTestMode] = useState(false);

  // Initialize animations with dependencies on gsapInitialized
  useLayoutEffect(() => {
    // Create a scoped GSAP context inside our component
    const ctx = gsap.context(() => {
      // Hero section animations - centralized batch for performance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
      
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

  // Function to open the qualification modal
  const openQualificationModal = () => {
    setShowQualificationModal(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Pause ScrollSmoother to prevent background page scrolling
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(true);
    }
  };
  
  // Function to close the qualification modal
  const closeQualificationModal = () => {
    setShowQualificationModal(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'auto';
    // Resume ScrollSmoother
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(false);
    }
  };
  
  // Enable test mode with keyboard shortcut (Ctrl+Shift+T)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        setTestMode(prev => !prev);
        console.log('Test mode:', !testMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testMode]);
  
  // Listen for events to open the qualification modal from other components
  useEffect(() => {
    const handleOpenQualificationModal = () => {
      openQualificationModal();
    };
    
    window.addEventListener('openQualificationModal', handleOpenQualificationModal);
    return () => window.removeEventListener('openQualificationModal', handleOpenQualificationModal);
  }, []);

  return (
    <AnimationController>

      {/* Qualification Modal for personalized implementation */}
      <VSQualificationModal
        isOpen={showQualificationModal}
        onClose={closeQualificationModal}
        testMode={testMode}

      />
    
      {/* Main wrapper for ScrollSmoother */}
      <div id="smooth-wrapper" ref={mainRef} className="min-h-screen overflow-hidden">
        {/* Floating Navbar stays outside the smooth content for fixed positioning */}
        <VSNavbar onApplyClick={openQualificationModal} />
        
        {/* Smooth content container */}
        <VSBackground 
          as="div"
          id="smooth-content" 
          ref={contentRef} 
          lightBg="bg-gradient-to-b from-white to-[var(--theme-bg-cream-gradient)]"
          darkBg="dark:bg-gradient-to-b dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]"
          className="min-h-screen overflow-hidden"
        >
          {/* Section 1: Header, rotating headlines, big numbers, emotional */}
          <SimpleHero ref={heroRef} onCtaClick={openQualificationModal} />
          
          {/* Section 2: Video (What do we do?) */}
          <VSSection 
            ref={videoRef} 
            lightBg="bg-theme-gradient"
            darkBg="dark:bg-theme-gradient"
            className="py-16 relative overflow-hidden"
          >
            {/* Theme-aware floating elements */}
            <div className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
                 opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
            <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"></div>
                 
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto mb-10">
                <VSHeading variant="h2" className="text-3xl md:text-4xl font-bold text-theme-primary mb-6">
                  What do we do?
                </VSHeading>
                <VSText className="text-lg md:text-xl text-theme-secondary mb-8 mx-auto max-w-[90%] md:max-w-none">
                  We've worked with some of the biggest business creators in the world:
                  Chris Donnelly, Charlotte Mair, James Watt, Ben Askins, Jordan Schwarzenberger, just to name a few.
                </VSText>
                <VSText className="text-lg md:text-xl text-theme-secondary mb-8 mx-auto max-w-[90%] md:max-w-none">
                  And built their content from the ground up.
                </VSText>
                <VSText className="text-lg md:text-xl text-theme-secondary mb-8 mx-auto max-w-[90%] md:max-w-none">
                  Building them over 1 Billion Views in just 2 years (we told you, we're the best)
                </VSText>
                <VSText className="text-xl md:text-2xl font-bold text-theme-primary">
                  The numbers speak for themselves
                </VSText>
              </div>
              
              {/* Video container with proper theme-aware styling */}
              <div className="video-container rounded-[var(--border-radius-lg)] overflow-hidden shadow-theme-md max-w-4xl mx-auto">
                <SafeVideoEmbed videoUrl="https://www.youtube.com/embed/your-video-id" />
              </div>
            </div>
          </VSSection>
          
          {/* Section 3: Case studies - click on each to see graphs and more in detail stats */}
          <CaseStudies />
          
          {/* Section 4: Double marquee with our biggest videos with biggest views */}
          <SocialProof />
          
          {/* Section 5: Team intros */}
          <MeetTheTeam />
          
          {/* Section 6: Pain Points */}
          <VSPainPoints />
          
          {/* Section 7: The Vertical Shortcut (big sell) */}
          <VSBigReveal />
          
          {/* Section 8: Contents */}
          <CourseStats />

          {/* Section 9: The Course Curriculum */}
          <VSSection 
            lightBg="bg-gradient-to-br from-[var(--theme-bg-primary)] to-[var(--theme-bg-secondary)]"
            darkBg="dark:bg-gradient-to-br dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]"
            className="py-24 relative overflow-hidden"
          >
            {/* Theme-aware floating elements */}
            <div className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
                 opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
            <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"></div>
                 
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <VSHeading 
                  variant="h2" 
                  color="white" 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                >
                  Is making actually good short form content really that complex?
                </VSHeading>
                
                <VSText color="white" className="text-xl md:text-2xl dark:text-white/80 mb-10">
                  Well yes and no. It's simple, but there's a lot to it.
                </VSText>
                
                <VSGradientText
                  variant="h3"
                  fromColor="--primary-orange"
                  toColor="--accent-coral"
                  className="text-2xl md:text-3xl font-bold mb-12"
                >
                  The Course Curriculum
                </VSGradientText>
              </div>
            </div>
          </VSSection>

          {/* ModuleHUD display */}
          <CourseViewer />
          
          {/* Section 10: Week by week structure */}
          <CourseTimeline />
          
          {/* Section 11: Low view count before and afters */}
          {/* This component needs to be created */}
          <VSSection 
            lightBg="bg-theme-gradient"
            darkBg="dark:bg-theme-gradient"
            className="py-24 relative overflow-hidden"
          >
            {/* Theme-aware floating elements */}
            <div className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
                 opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
            <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"></div>
            
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <VSHeading 
                  variant="h2" 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary mb-6"
                >
                  Still not convinced?
                </VSHeading>
                <VSText className="text-xl text-theme-secondary">
                  This could be you.
                </VSText>
              </div>
              
              {/* Placeholder for before/after examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <VSCard 
                  className="p-6 rounded-xl shadow-theme-md"
                  lightBg="bg-theme-surface"
                  darkBg="dark:bg-theme-surface"
                >
                  <div className="mb-4 font-bold text-theme-primary">Before</div>
                  <div className="aspect-[9/16] bg-theme-bg-secondary rounded-lg mb-4"></div>
                  <div className="flex items-center text-theme-secondary">
                    <div className="flex items-center bg-theme-bg-secondary/30 px-3 py-1 rounded-full">
                      <span className="text-sm">123 views</span>
                    </div>
                  </div>
                </VSCard>
                
                <VSCard 
                  className="p-6 rounded-xl shadow-theme-md"
                  lightBg="bg-theme-surface"
                  darkBg="dark:bg-theme-surface"
                >
                  <div className="mb-4 font-bold text-theme-accent">After</div>
                  <div className="aspect-[9/16] bg-theme-bg-secondary rounded-lg mb-4"></div>
                  <div className="flex items-center text-theme-primary font-bold">
                    <div className="flex items-center bg-theme-accent/10 px-3 py-1 rounded-full">
                      <span className="text-sm">1.2M views</span>
                    </div>
                  </div>
                </VSCard>
              </div>
            </div>
          </VSSection>
          
          {/* Section 12: The Founders Track */}
          <FounderTrack onCtaClick={openQualificationModal} />
          
          {/* Section 13: The Team Track */}
          <TabsLeft />
          
          {/* Section 14: Testimonials slideshow */}
          <TestimonialCarousel
            testimonials={carouselTestimonials}
            className="py-24 bg-theme-gradient"
          />
          
          {/* Section 15: Buy/Apply - Pricing Section */}
          <PricingSimple onCtaClick={openQualificationModal} />
          
          {/* Section 16: Customisation */}
          <Customisation onCtaClick={openQualificationModal} />
          
          {/* Section 17: FAQs */}
          <FAQUpdated />
          
          {/* What You'll Learn Section */}
          <VSSection 
            lightBg="bg-[--bg-navy)]" 
            darkBg="dark:bg-[--bg-navy)]"
            className="py-24 border-t border-[--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 border-[--primary-orange)]/30 mb-4 py-2 px-4">
                  <VSText color="--primary-orange)" className="dark:text-[--primary-orange)]">
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
                    className="backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[--primary-orange)]/30"
                    lightBg="bg-white/5"
                    darkBg="dark:bg-white/5"
                  >
                    <div style={{ color: '--primary-orange)' }} className="dark:text-[--primary-orange)] mb-4">
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
            lightBg="bg-[--bg-navy-dark)]" 
            darkBg="dark:bg-[--bg-navy-dark)]"
            className="testimonials-section py-24 border-t border-[--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 border-[--primary-orange)]/30 mb-4 py-2 px-4">
                  <VSText color="--primary-orange)" className="dark:text-[--primary-orange)]">
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
        
            </div>
          </VSSection>
          
          

          {/* Key Features Section removed - now using VS-BigReveal component */}


          
          {/* FAQ Section moved above with correct numbering - Section 17 */}
          
          {/* Add Founder Track section before the final CTA */}
         
          
          {/* Section 18: Final Application CTA */}
          <VSSection 
            ref={ctaRef} 
            lightBg="bg-theme-gradient"
            darkBg="dark:bg-theme-gradient"
            className="py-24 relative overflow-hidden"
          >
            {/* Theme-aware floating elements */}
            <div className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
                 opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
            <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"></div>
                 
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <Badge 
                    variant="outline" 
                    className="bg-theme-primary/10 border-theme-primary/30 mb-4 py-2 px-4 mx-auto"
                  >
                    <VSText className="font-semibold flex items-center gap-2 text-theme-primary">
                      <Clock className="h-4 w-4" /> Limited spots available for next cohort
                    </VSText>
                  </Badge>
                  
                  <VSHeading 
                    variant="h2" 
                    className="cta-title text-4xl md:text-5xl lg:text-6xl font-bold text-theme-primary mb-6"
                  >
                    Ready to Transform Your Content?
                  </VSHeading>
                  
                  <VSText className="cta-description text-xl text-theme-secondary mb-10 max-w-3xl mx-auto">
                    Join Vertical Shortcut today and get access to our complete system for creating high-converting content that drives real business results.
                  </VSText>
                </div>
                
                <div className="flex flex-col md:flex-row bg-theme-surface p-8 md:p-12 rounded-2xl shadow-theme-md">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <VSHeading variant="h3" className="text-2xl md:text-3xl font-bold text-theme-primary mb-6">
                      Apply Now
                    </VSHeading>
                    <VSText className="text-lg text-theme-secondary mb-4">
                      Fill out our quick qualification form to see if you're a good fit for our program. Once approved, we'll help you find the perfect implementation for your business.
                    </VSText>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Personalized strategy",
                        "Custom implementation plan",
                        "1:1 coaching sessions",
                        "Priority support"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-theme-accent mr-2 flex-shrink-0 mt-0.5" />
                          <VSText className="text-theme-secondary">{item}</VSText>
                        </li>
                      ))}
                    </ul>
                    <AnimatedButton 
                      text="Get Your Plan"
                      variant="start" 
                      saturation="high"
                      size="lg"
                      onClick={openQualificationModal}
                      className="w-full md:w-auto"
                    />
                  </div>
                  
                  <div className="md:w-1/2 md:border-l md:pl-8 border-theme-border-light">
                    <VSHeading variant="h3" className="text-2xl md:text-3xl font-bold text-theme-primary mb-6">
                      Next Cohort Details
                    </VSHeading>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Calendar className="h-5 w-5 text-theme-primary" />
                        </div>
                        <div>
                          <VSText className="font-medium text-theme-primary">Start Date</VSText>
                          <VSText className="text-theme-secondary">April 25th, 2025</VSText>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Users className="h-5 w-5 text-theme-primary" />
                        </div>
                        <div>
                          <VSText className="font-medium text-theme-primary">Class Size</VSText>
                          <VSText className="text-theme-secondary">Limited to 20 students</VSText>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Clock className="h-5 w-5 text-theme-primary" />
                        </div>
                        <div>
                          <VSText className="font-medium text-theme-primary">Time Commitment</VSText>
                          <VSText className="text-theme-secondary">4 hours per week</VSText>
                        </div>
                      </div>
                    </div>
                    
                    <VSCard 
                      className="mt-8 p-4 rounded-lg"
                      lightBg="bg-theme-primary/5" 
                      darkBg="dark:bg-theme-primary/10"
                    >
                      <VSText className="text-theme-accent font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Applications closing soon
                      </VSText>
                    </VSCard>
                  </div>
                </div>
              </div>
            </div>
          </VSSection>
          
          {/* Footer */}
          <VSBackground
            as="footer" 
            lightBg="bg-[--bg-navy)]" 
            darkBg="dark:bg-[--bg-navy)]"
            className="py-16 border-t border-[--secondary-teal)]/30"
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
                      <a href="#" className="text-white/60 hover:text-[--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Curriculum
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Pricing
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Success Stories
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-[--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          FAQ
                        </VSText>
                      </a>
                    </li>
                    <li>

                      <a href="#" onClick={(e) => { e.preventDefault(); openQualificationModal(); }} className="text-white/60 hover:text-[--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Get Your Plan
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
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          About Us
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <Link to="/marble-buttons" className="text-white/60 hover:text-[--primary-orange)] transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Marble Buttons Demo
                        </VSText>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Blog
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Careers
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
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
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Terms of Service
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
                          Privacy Policy
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText color="white" className="dark:text-white/60 hover:text-[--primary-orange)]">
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
                      <a href="#" className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href="#" className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a href="#" className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors">
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