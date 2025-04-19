import React, { useRef, useLayoutEffect, useEffect, useState, lazy, Suspense } from "react";
import VSQualificationModal from "./Qualification_components/qualification-modal";
import TiaQualificationModal from "./Qualification_components/tia-qualification-modal";
import SimpleHero from "./components/hero/SimpleHero";
// import IsometricGridBackground from "./components/hero/IsometricPattern";
import { Badge } from "./components/ui/badge";
// import SafeVideoEmbed from "./components/ui/video-embed";
import VSNavbar from "./components/sections/navbar/vs-navbar";
// import TabsLeft from "./components/sections/tabs/left";
// import SocialProof from "./components/sections/social-proof/marquee-2-rows";
// import TestimonialCarousel from "./components/ui/testimonial-carousel";
// import WordRoller from "@/components/Word-Rollers/WordRoller.tsx"
// import {
//   CaseStudies,
//   VSPainPoints,
//   VSBigReveal,
//   CourseViewer,
//   TeamSection as MeetTheTeam,
//   FAQUpdated,
//   PricingSimple,
//   Customisation,
//   CourseStats,
//   FounderTrack,
//   ConnectEverything,
// } from "./components/sections";
// import CourseTimeline from "./components/CourseTimeline";
import { Link } from "react-router-dom";
import { AnimatedButton } from "./components/marble-buttons/AnimatedButton";

// Import VS helper components for correct light/dark mode implementation
import { VSText, VSHeading } from "./components/ui/vs-text";
import { VSBackground, VSCard, VSSection } from "./components/ui/vs-background";

// Import only the icons we're using
import {
  CheckCircle,
  // Removed unused import: ArrowRightCircle,
  Clock,
  // Removed unused import: BarChart3,
  // Removed unused import: Zap,
  // Removed unused import: Flame,
  // Removed unused import: Lightbulb,
  // Removed unused import: Award,
  // Removed unused import: Repeat,
  // Removed unused import: DollarSign,
  // Removed unused import: BriefcaseBusiness,
  // Removed unused import: Rocket,
  Calendar,
  Users,
} from "lucide-react";

// Import GSAP and plugins
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Add custom CSS classes
import "./video-peek.css";

// Global GSAP context
let globalScrollSmoother: globalThis.ScrollSmoother | null = null;
const globalAnimations = {};

// Removed unused variable: testimonials
// Testimonials data
// const testimonials = [
//   {
//     name: "User One",
//     username: "user1",
//     text: "This is a sample text for the first user. It contains basic words and simple structure. The content is meant to take up space without using any complex terms that might trigger spell check tools.",
//     image: "/avatars/avatar1.jpg",
//   },
//   {
//     name: "User Two",
//     username: "user2",
//     text: "Here is more sample text for the second user. The words are all simple and short. This text is just here to fill the space where real content would go in a live site or app.",
//     image: "/avatars/avatar2.jpg",
//   },
//   {
//     name: "User Three",
//     username: "user3",
//     text: "Sample text for user three goes in this spot. All of these words should pass a basic spell check. The text is long enough to look like real content but has no real meaning.",
//     image: "/avatars/avatar3.jpg",
//   },
//   {
//     name: "User Four",
//     username: "user4",
//     text: "This is the last block of sample text. It uses basic words that are easy to spell. The goal is to have text that looks right in the layout but does not draw any red lines from spell check tools.",
//     image: "/avatars/avatar4.jpg",
//   },
// ];

// Features data is now in VS-BigReveal component

// --- Lazy Load Section Components ---
const LazySocialProof = lazy(() => import("./components/sections/social-proof/marquee-2-rows"));
// const LazyWordRoller = lazy(() => import("@/components/Word-Rollers/WordRoller.tsx"));
const LazyCaseStudies = lazy(() => import("./components/sections").then(module => ({ default: module.CaseStudies })));
const LazyVSPainPoints = lazy(() => import("./components/sections").then(module => ({ default: module.VSPainPoints })));
const LazyVSBigReveal = lazy(() => import("./components/sections").then(module => ({ default: module.VSBigReveal })));
// const LazyCourseViewer = lazy(() => import("./components/sections").then(module => ({ default: module.CourseViewer })));
const LazyMeetTheTeam = lazy(() => import("./components/sections").then(module => ({ default: module.TeamSection }))); // Assuming TeamSection is the export
const LazyFAQUpdated = lazy(() => import("./components/sections").then(module => ({ default: module.FAQUpdated })));
// Removed LazyCustomisation import
const LazyCourseStats = lazy(() => import("./components/sections").then(module => ({ default: module.CourseStats })));
const LazyFounderTrack = lazy(() => import("./components/sections").then(module => ({ default: module.FounderTrack })));
const LazyConnectEverything = lazy(() => import("./components/sections").then(module => ({ default: module.ConnectEverything })));
const LazyCourseTimeline = lazy(() => import("./components/CourseTimeline"));
// --- End Lazy Load Section Components ---

// Simple loading fallback component
const LoadingFallback = () => (
  <div className="min-h-[300px] flex items-center justify-center">
    <VSText>Loading section...</VSText>
  </div>
);

// Animation controller component with responsive optimization
function AnimationController({ children }: { children: React.ReactNode }) {
  const controllerRef = useRef<HTMLDivElement>(null);
  const [gsapInitialized, setGsapInitialized] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile device on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Initialize global GSAP context on mount with device-specific settings
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use conditional settings based on isMobile state
      const mobileSettings = {
        smooth: 0.4, // Even lighter smoothness for mobile
        effects: false, // Disable effects on mobile
        normalizeScroll: false, // False for mobile
        speed: 0.7, // Slower speed for mobile
        touchSpeed: 1.5, // Faster response to touch scrolling
        ignoreMobileResize: true, // Prevent resize on mobile keyboard
        preventDefault: false, // Better compatibility with native scrolling
      };

      const desktopSettings = {
        smooth: 0.7, // Plan's suggested desktop smoothness
        effects: true, // Plan suggests enabling effects
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        normalizeScroll: true, // Plan suggests true for desktop
        ignoreMobileResize: true, // Default/Recommended for desktop
      };

      if (!globalScrollSmoother) {
         console.log(`Initializing ScrollSmoother with ${isMobile ? 'mobile' : 'desktop'} settings.`);
        
        if (isMobile && window.innerWidth < 480) {
          // For very small screens, disable ScrollSmoother completely
          console.log('Small mobile device detected - disabling ScrollSmoother for better performance');
          
          // Just ensure proper scroll to top
          window.scrollTo(0, 0);
        } else {
          // Add initial scroll position explicitly
          const settings = isMobile ? 
            { ...mobileSettings, scrollTop: 0 } : 
            { ...desktopSettings, scrollTop: 0 };
          
          globalScrollSmoother = ScrollSmoother.create(settings);
          
          // Force scroll to top immediately after creation
          globalScrollSmoother.scrollTop(0);
        }
      }
      // Removed the gsap.matchMedia logic as we now use the isMobile state directly

    }, controllerRef);

    setGsapInitialized(true);

    // Enhanced cleanup logic from the plan
    return () => {
      console.log("Cleaning up AnimationController context and ScrollSmoother");
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (globalScrollSmoother) {
        globalScrollSmoother.kill();
        globalScrollSmoother = null;
      }
      // Clear animations managed globally (if any are added later)
      Object.keys(globalAnimations).forEach(key => {
        const animation = globalAnimations[key as keyof typeof globalAnimations];
        if (animation) {
          if (Array.isArray(animation)) {
            (animation as gsap.core.Animation[]).forEach(anim => anim.kill());
          } else {
            (animation as gsap.core.Animation).kill();
          }
        }
        delete globalAnimations[key as keyof typeof globalAnimations];
      });
    };
  // Dependency array includes isMobile to re-initialize if device type changes
  // (e.g., window resize crosses the 768px threshold)
  }, [isMobile]);

  return (
    <div ref={controllerRef} className="animation-controller">
      {/* Pass isMobile prop down to children */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<
                React.PropsWithChildren<{
                  "data-gsap-initialized"?: boolean,
                  "data-is-mobile"?: boolean // Prop name from plan
                }>
              >,
              {
                ...(child.props as object),
                "data-gsap-initialized": gsapInitialized,
                "data-is-mobile": isMobile, // Pass the state value
              },
            )
          : child,
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
  const whatWeDoRef = useRef(null);
  // Corrected type for videoRef to allow null initial value
  const videoRef = useRef<HTMLDivElement | null>(null);

  // Add state for qualification modal
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [showTiaQualificationModal, setShowTiaQualificationModal] = useState(false);
  const [testMode, setTestMode] = useState(false);

  // Initialize animations within the component's scope
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Setup data-speed attributes for parallax effect if ScrollSmoother is running
        if (globalScrollSmoother) {
          // Apply parallax effect to floating elements
          document.querySelectorAll('.parallax-float').forEach((element) => {
            const speed = element.getAttribute('data-speed') || '0.8';
            globalScrollSmoother.effects(element, { speed: parseFloat(speed) });
          });
          
          // Apply parallax effect to sections
          document.querySelectorAll('.parallax-section').forEach((element) => {
            const speed = element.getAttribute('data-speed') || '0.95';
            globalScrollSmoother.effects(element, { speed: parseFloat(speed) });
          });
          
          // Apply parallax effect to images and content blocks
          document.querySelectorAll('.parallax-item').forEach((element) => {
            const speed = element.getAttribute('data-speed') || '0.9';
            globalScrollSmoother.effects(element, { speed: parseFloat(speed) });
          });
        }

        // Hero animations
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).heroSection && heroRef.current) {
          const heroAnimation = gsap.timeline();
          // Initial load animations are handled by the SimpleHero component
          
          // Add a scroll trigger for elements exiting the viewport
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            id: "hero-exit-trigger",
            onLeave: () => {
              gsap.to(".hero-heading, .hero-subtitle, .hero-cta", {
                y: -50, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.6, 
                ease: "power1.in",
                clearProps: "all"
              });
            },
            onEnterBack: () => {
              gsap.to(".hero-heading, .hero-subtitle, .hero-cta", {
                y: 0, 
                opacity: 1, 
                stagger: 0.1, 
                duration: 0.6, 
                ease: "power2.out",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).heroSection = heroAnimation;
        }

        // What We Do section animations
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).whatWeDoSection && whatWeDoRef.current) {
          const whatWeDoTrigger = ScrollTrigger.create({
            trigger: whatWeDoRef.current,
            start: "top 60%",
            id: "what-we-do-trigger",
            onEnter: () => {
              const whatWeDoTl = gsap.timeline();
              whatWeDoTl
                .from(".what-we-do-title", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" })
                .from(".what-we-do-text-1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
                .from(".what-we-do-text-2", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
                .from(".what-we-do-text-3", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
                .from(".what-we-do-text-4", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
            },
            onLeaveBack: () => {
              gsap.to(".what-we-do-title, .what-we-do-text-1, .what-we-do-text-2, .what-we-do-text-3, .what-we-do-text-4", {
                y: 30, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.4, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).whatWeDoSection = whatWeDoTrigger;
        }

        // Stats section - scroll-based animation
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).statsSection && statsRef.current) {
          const statsTrigger = ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 80%",
            id: "stats-trigger",
            onEnter: () => {
              const statsAnimation = gsap.from(".stat-item", {
                y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", clearProps: "all",
              });
              (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).statsItems = statsAnimation;
            },
            onLeaveBack: () => {
              gsap.to(".stat-item", {
                y: 30, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.4, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).statsSection = statsTrigger;
        }

        // Benefits section - scroll-based animation
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).benefitsSection && benefitsRef.current) {
          const benefitsTrigger = ScrollTrigger.create({
            trigger: benefitsRef.current,
            start: "top 75%",
            id: "benefits-trigger",
            onEnter: () => {
              const benefitsAnimation = gsap.from(".benefit-item", {
                y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", clearProps: "all",
              });
              (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).benefitsItems = benefitsAnimation;
            },
            onLeaveBack: () => {
              gsap.to(".benefit-item", {
                y: 40, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.4, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).benefitsSection = benefitsTrigger;
        }

        // Tracks section - scroll-based animation
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).tracksSection && tracksRef.current) {
          const tracksTrigger = ScrollTrigger.create({
            trigger: tracksRef.current,
            start: "top 75%",
            id: "tracks-trigger",
            onEnter: () => {
              const tracksAnimation = gsap.from(".track-item", {
                x: -20, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", clearProps: "all",
              });
              (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).tracksItems = tracksAnimation;
            },
            onLeaveBack: () => {
              gsap.to(".track-item", {
                x: -20, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.4, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).tracksSection = tracksTrigger;
        }

        // Video section - scroll-based animation with scale effect
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).videoSection && videoRef.current) {
          const videoTrigger = ScrollTrigger.create({
            trigger: videoRef.current,
            start: "top 70%",
            id: "video-trigger",
            onEnter: () => {
              const videoAnimation = gsap.from(".video-container", {
                y: 30, 
                scale: 0.95,
                opacity: 0, 
                duration: 0.8, 
                ease: "power2.out", 
                clearProps: "all",
              });
              (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).videoItem = videoAnimation;
            },
            onLeaveBack: () => {
              gsap.to(".video-container", {
                y: 30, 
                scale: 0.95,
                opacity: 0, 
                duration: 0.5, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).videoSection = videoTrigger;
        }

        // Testimonials - scroll-based animation
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).testimonialsSection && testimonialsRef.current) {
          const testimonialsTrigger = ScrollTrigger.create({
            trigger: testimonialsRef.current,
            start: "top 75%",
            id: "testimonials-trigger",
            onEnter: () => {
              const testimonialsAnimation = gsap.from(".testimonial-item", {
                y: 30, opacity: 0, duration: 0.7, stagger: 0.2, ease: "power2.out", clearProps: "all",
              });
              (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).testimonialsItems = testimonialsAnimation;
            },
            onLeaveBack: () => {
              gsap.to(".testimonial-item", {
                y: 30, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.4, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).testimonialsSection = testimonialsTrigger;
        }

        // CTA section - scroll-based animation
        if (!(globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).ctaSection && ctaRef.current) {
          const ctaTrigger = ScrollTrigger.create({
            trigger: ctaRef.current,
            start: "top 80%",
            id: "cta-trigger",
            onEnter: () => {
              const ctaTl = gsap.timeline();
              ctaTl
                .from(".cta-badge", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" })
                .from(".cta-title", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
                .from(".cta-subtitle", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
                .from(".cta-description", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
                .from(".cta-button", { y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.3");
              (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).ctaItems = ctaTl;
            },
            onLeaveBack: () => {
              gsap.to(".cta-badge, .cta-title, .cta-subtitle, .cta-description, .cta-button", {
                y: 30, 
                opacity: 0, 
                stagger: 0.1, 
                duration: 0.4, 
                ease: "power1.in",
                clearProps: "all"
              });
            }
          });
          (globalAnimations as Record<string, gsap.core.Timeline | gsap.core.Tween | ScrollTrigger>).ctaSection = ctaTrigger;
        }

        // Section animations for lazy-loaded components
        ScrollTrigger.batch(".vs-section", {
          interval: 0.1,
          onEnter: batch => {
            gsap.from(batch, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all"
            });
          },
          onLeaveBack: batch => {
            gsap.to(batch, {
              y: 30,
              opacity: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "power1.in",
              clearProps: "all"
            });
          }
        });

    }, mainRef); // Scope animations to mainRef

    return () => {
      ctx.revert(); // Cleanup animations specific to this component
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to open the qualification modal
  const openQualificationModal = () => {
    setShowQualificationModal(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
    // Pause ScrollSmoother to prevent background page scrolling
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(true);
    }
  };
  
  // Function to open the Tia qualification modal
  const openTiaQualificationModal = () => {
    setShowTiaQualificationModal(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
    // Pause ScrollSmoother to prevent background page scrolling
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(true);
    }
  };

  // Function to close the qualification modal
  const closeQualificationModal = () => {
    setShowQualificationModal(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = "auto";
    // Resume ScrollSmoother
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(false);
    }
  };
  
  // Function to close the Tia qualification modal
  const closeTiaQualificationModal = () => {
    setShowTiaQualificationModal(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = "auto";
    // Resume ScrollSmoother
    if (globalScrollSmoother) {
      globalScrollSmoother.paused(false);
    }
  };

  // Enable test mode with keyboard shortcut (Ctrl+Shift+T)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "T") {
        setTestMode((prev) => !prev);
        console.log("Test mode:", !testMode);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [testMode]);

  // Listen for events to open the qualification modal from other components
  useEffect(() => {
    const handleOpenQualificationModal = () => {
      openTiaQualificationModal(); // Use Tia's modal instead of the original
    };

    window.addEventListener(
      "openQualificationModal",
      handleOpenQualificationModal,
    );
    return () =>
      window.removeEventListener(
        "openQualificationModal",
        handleOpenQualificationModal,
      );
  }, []);
  
  // Ensure page scrolls to top when loaded
  useEffect(() => {
    // Scroll to top immediately after component mounts
    window.scrollTo(0, 0);
    
    // Also use GSAP for a smoother scroll (as a backup)
    const timer = setTimeout(() => {
      if (window.scrollY > 0) {
        gsap.to(window, { 
          duration: 0.3, 
          scrollTo: { y: 0 },
          ease: "power2.out"
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimationController>
      {/* Qualification Modal for personalized implementation */}
      <VSQualificationModal
        isOpen={showQualificationModal}
        onClose={closeQualificationModal}
        testMode={testMode}
      />
      
      {/* Tia's Qualification Modal */}
      <TiaQualificationModal
        isOpen={showTiaQualificationModal}
        onClose={closeTiaQualificationModal}
        testMode={testMode}
      />

      {/* Main wrapper for ScrollSmoother */}
      <div
        id="smooth-wrapper"
        ref={mainRef}
        className="min-h-screen overflow-hidden"
      >
        {/* Floating Navbar stays outside the smooth content for fixed positioning */}
        <VSNavbar onApplyClick={openTiaQualificationModal} />

        {/* Smooth content container */}
        <div
          id="smooth-content"
          ref={contentRef}
          className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-[var(--theme-bg-cream-gradient)] dark:bg-gradient-to-b dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]"
        >
          {/* Section 1: Header */}
          <SimpleHero
            ref={heroRef}
            onCtaClick={openTiaQualificationModal}
          />
          
          {/* Section 2: Video section - mobile optimized */}
          <div ref={videoRef} className="vs-section-light pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 relative overflow-hidden parallax-section" data-speed="0.9">
            <div className="container-mobile mx-auto relative z-10">              
              <div className="video-container rounded-xl overflow-hidden shadow-theme-md sm:shadow-theme-xl border border-theme-border-light/30 sm:border-theme-border-light/50 transform hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 parallax-item" data-speed="0.85">
                <div className="aspect-[16/9] relative">
                  <iframe 
                    src="https://www.youtube.com/embed/your-video-id"
                    className="absolute inset-0 w-full h-full"
                    title="Vertical Shortcut Introduction"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: What do we do? - mobile-optimized padding */}
          <VSSection
            ref={whatWeDoRef}
            className="pt-6 md:pt-12 lg:pt-16 pb-12 sm:pb-20 md:pb-24 lg:pb-32 relative overflow-visible bg-transparent parallax-section"
            data-speed="0.95"
          >
            {/* Theme-aware floating elements - responsive sizing and positioning */}
            <div
              className="absolute -z-10 top-[10%] left-[5%] sm:top-20 sm:left-[10%] w-20 h-20 sm:w-32 sm:h-32 rounded-[40%] rotate-12
                 opacity-theme-float bg-theme-float-primary animate-float-slow hidden sm:block parallax-float"
              data-speed="1.4"
            ></div>
            <div
              className="absolute -z-10 bottom-[15%] right-[5%] sm:bottom-20 sm:right-[15%] w-24 h-24 sm:w-36 sm:h-36 rounded-[35%] -rotate-6
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium hidden sm:block"
            ></div>
            
            {/* Additional abstract shapes and texture - conditionally shown based on viewport */}
            <div className="absolute -z-10 top-[30%] right-[20%] w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-10 bg-theme-accent blur-3xl hidden md:block parallax-float" data-speed="1.15"></div>
            <div className="absolute -z-10 bottom-[20%] left-[15%] w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 bg-theme-primary blur-3xl hidden md:block parallax-float" data-speed="1.25"></div>
            <div className="absolute -z-10 top-[15%] left-[25%] w-16 h-16 sm:w-24 sm:h-24 rounded-[30%] rotate-45 opacity-5 bg-theme-secondary animate-float-slow hidden md:block parallax-float" data-speed="1.1"></div>
            <div className="absolute -z-10 bottom-[40%] right-[5%] w-24 h-24 sm:w-40 sm:h-40 rotate-12 opacity-5 bg-theme-accent rounded-[60%] animate-float-medium hidden md:block parallax-float" data-speed="1.35"></div>
            
            <div className="container mx-auto px-4">
              {/* Section header */}
              <div className="text-center max-w-4xl mx-auto mb-8 parallax-item" data-speed="0.95">
                  <h2 className="what-we-do-title text-red-500 dark:text-orange-400 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      What do we do?
                  </h2>
                </div>

              {/* Copy content - centered text layout */}
              <div className="text-center w-full mx-auto mb-8 sm:mb-12 md:mb-16 parallax-item" data-speed="0.9">
                <p className="what-we-do-text-1 body-text mb-2 sm:mb-4 mx-auto w-full text-center">
                  We make f*cking great videos.
                </p>
                <p className="what-we-do-text-2 text-sm sm:text-base md:text-base lg:text-lg text-theme-primary/80 italic mb-2 sm:mb-4 mx-auto w-full text-center">
                  For founders and execs, specifically.
                </p>
                <p className="what-we-do-text-3 body-text mb-4 sm:mb-6 md:mb-8 mx-auto w-full text-center">
                  We've worked with some of the biggest business creators in the
                  world: Chris Donnelly, Charlotte Mair, James Watt, Ben Askins,
                  Jordan Schwarzenberger... just to name a few.
                </p>
                <p className="what-we-do-text-4 body-text mb-2 sm:mb-24 md:mb-40 lg:mb-48 mx-auto w-full text-center">
                  Building them over <span className="font-bold">1 Billion Views</span> in just 2 years (we told
                  you, we're the best)
                </p>
                </div>
                
                {/* Desktop-only spacer */}
                <div className="hidden md:block h-20 lg:h-24"></div>

              {/* Section 3: Case studies - click on each to see graphs and more in detail stats */}
               <div className="mb-0 md:mb-[-120px]">
                 <Suspense fallback={<LoadingFallback />}>
                   <LazyCaseStudies onCtaClick={openQualificationModal} />
                 </Suspense>
               </div>
            </div>
          </VSSection>

          {/* Section 4: Double marquee with our biggest videos with biggest views */}
           <Suspense fallback={<LoadingFallback />}>
             <LazySocialProof />
           </Suspense>

          {/* Section 6: Pain Points */}
          <div id="benefits">
             <Suspense fallback={<LoadingFallback />}>
               <LazyVSPainPoints />
             </Suspense>
          </div>

          {/* Section 7: The Vertical Shortcut (big sell) */}
           <Suspense fallback={<LoadingFallback />}>
             <LazyVSBigReveal />
           </Suspense>

          {/* Section 8: Contents */}
           <Suspense fallback={<LoadingFallback />}>
             <LazyCourseStats />
           </Suspense>


          {/* Section 10: Week by week structure */}
           <Suspense fallback={<LoadingFallback />}>
             <LazyCourseTimeline />
           </Suspense>

          {/* Tools & Integrations - Custom systems built for creators */}
           <Suspense fallback={<LoadingFallback />}>
             <LazyConnectEverything />
           </Suspense>

           <Suspense fallback={<LoadingFallback />}>
             <LazyMeetTheTeam />
           </Suspense>

          {/* Section 12: The Founders Track */}
           <Suspense fallback={<LoadingFallback />}>
             <LazyFounderTrack onCtaClick={openTiaQualificationModal} />
           </Suspense>


          {/* Section 13: Customisation - Removed */}

          {/* Section 14: FAQs */}
           <Suspense fallback={<LoadingFallback />}>
             <LazyFAQUpdated />
           </Suspense>

          {/* Section 15: Final Application CTA */}
          <VSSection
            ref={ctaRef}
            className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-theme-gradient dark:bg-theme-gradient parallax-section"
            data-speed="0.93"
          >
            {/* Theme-aware floating elements - optimized for mobile */}
            <div
              className="absolute -z-10 top-[15%] left-[5%] sm:top-20 sm:left-[10%] w-20 h-20 sm:w-32 sm:h-32 rounded-[40%] rotate-12
                 opacity-theme-float bg-theme-float-primary animate-float-slow hidden sm:block parallax-float"
              data-speed="1.25"
            ></div>
            <div
              className="absolute -z-10 bottom-[15%] right-[5%] sm:bottom-20 sm:right-[15%] w-24 h-24 sm:w-36 sm:h-36 rounded-[35%] -rotate-6
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium hidden sm:block parallax-float"
              data-speed="1.15"
            ></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto parallax-section" data-speed="0.92">
                <div className="text-center mb-6 sm:mb-8 parallax-item" data-speed="0.9">
                  <Badge
                    variant="outline"
                    className="bg-theme-primary/10 border-theme-primary/30 mb-3 sm:mb-4 py-1.5 sm:py-2 px-3 sm:px-4 mx-auto"
                  >
                    <VSText className="font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-theme-primary">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" /> Limited spots available
                    </VSText>
                  </Badge>

                  <VSHeading
                    as="h2"
                    size="2xl"
                    className="cta-title font-bold text-theme-primary mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  >
                    Limited spots available for next cohort
                  </VSHeading>

                  <VSHeading
                    as="h3"
                    size="xl"
                    className="cta-subtitle font-bold text-theme-primary mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl"
                  >
                    Ready to Transform Your Content?
                  </VSHeading>

                  <p className="body-text mb-6 sm:mb-8 md:mb-10 mx-auto w-full sm:max-w-[95%] md:max-w-3xl">
                    Join Vertical Shortcut today and get access to our complete
                    system for creating high-converting content that drives real
                    business results.
                  </p>
                  </div>

                <div className="flex flex-col md:flex-row bg-theme-surface p-8 md:p-12 rounded-2xl shadow-theme-md parallax-item" data-speed="0.88">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <VSHeading
                      as="h3"
                      size="lg"
                      className="font-bold text-theme-primary mb-6"
                    >
                      Apply Now
                    </VSHeading>
                    <VSText className="text-lg text-theme-secondary mb-4">
                      Fill out our quick qualification form to see if you're a
                      good fit for our program. Once approved, we'll help you
                      find the perfect implementation for your business.
                    </VSText>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Personalized strategy",
                        "Custom implementation plan",
                        "1:1 coaching sessions",
                        "Priority support",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-theme-accent mr-2 flex-shrink-0 mt-0.5" />
                          <VSText className="text-theme-secondary">
                            {item}
                          </VSText>
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
                    <VSHeading
                      as="h3"
                      size="lg"
                      className="font-bold text-theme-primary mb-6"
                    >
                      Next Cohort Details
                    </VSHeading>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Calendar className="h-5 w-5 text-theme-primary" />
                  </div>
                        <div>
                          <VSText className="font-medium text-theme-primary">
                            Start Date
                          </VSText>
                          <VSText className="text-theme-secondary">
                            April 25th, 2025
                          </VSText>
                  </div>
                </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Users className="h-5 w-5 text-theme-primary" />
                  </div>
                        <div>
                          <VSText className="font-medium text-theme-primary">
                            Class Size
                          </VSText>
                          <VSText className="text-theme-secondary">
                            Limited to 20 students
                          </VSText>
                  </div>
                </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Clock className="h-5 w-5 text-theme-primary" />
                  </div>
                        <div>
                          <VSText className="font-medium text-theme-primary">
                            Time Commitment
                          </VSText>
                          <VSText className="text-theme-secondary">
                            4 hours per week
                          </VSText>
                  </div>
                </div>
              </div>

                    <VSCard
                      className="mt-8 p-4 rounded-lg bg-theme-primary/5 dark:bg-theme-primary/10"
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
            className="py-10 sm:py-12 md:py-16 bg-theme-primary border-t border-[--secondary-teal)]/30"
          >
            <div className="container-mobile mx-auto">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 mb-8 sm:mb-12">
                <div className="space-y-4">
                  <VSHeading
                    as="h4"
                    size="md"
                    color="white"
                    className="text-xl mb-4"
                  >
                    Vertical Shortcut
                  </VSHeading>
                  <VSText color="white" className="max-w-xs dark:text-white/60">
                    The premium 10-week program for founders and creators who
                    want to master short-form content and generate consistent
                    leads and revenue.
                  </VSText>

                  <div className="pt-4">
                    <VSText
                      color="white"
                      className="text-sm dark:text-white/40"
                    >
                      &copy; {new Date().getFullYear()} Clash Creation
                    </VSText>
                    <VSText
                      color="white"
                      className="text-sm dark:text-white/40"
                    >
                      All rights reserved
                    </VSText>
              </div>
            </div>

                <div>
                  <VSHeading
                    as="h4"
                    size="sm"
                    color="white"
                    className="text-lg mb-4"
                  >
                    Program
                  </VSHeading>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-white/60 hover:text-[--primary-orange)] transition-colors"
                      >
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Curriculum
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white/60 hover:text-[--primary-orange)] transition-colors"
                      >
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Pricing
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white/60 hover:text-[--primary-orange)] transition-colors"
                      >
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Success Stories
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white/60 hover:text-[--primary-orange)] transition-colors"
                      >
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          FAQ
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openQualificationModal();
                        }}
                        className="text-white/60 hover:text-[--primary-orange)] transition-colors"
                      >
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Get Your Plan
                        </VSText>
                      </a>
                    </li>
                  </ul>
                    </div>

                <div>
                  <VSHeading
                    as="h4"
                    size="sm"
                    color="white"
                    className="text-lg mb-4"
                  >
                    Company
                  </VSHeading>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          About Us
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <Link
                        to="/marble-buttons"
                        className="text-white/60 hover:text-[--primary-orange)] transition-colors"
                      >
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Marble Buttons Demo
                        </VSText>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Blog
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Careers
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Contact
                        </VSText>
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <VSHeading
                    as="h4"
                    size="sm"
                    color="white"
                    className="text-lg mb-4"
                  >
                    Legal
                  </VSHeading>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="transition-colors">
                  <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Terms of Service
                  </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Privacy Policy
                        </VSText>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors">
                        <VSText
                          color="white"
                          className="dark:text-white/60 hover:text-[--primary-orange)]"
                        >
                          Cookie Policy
                        </VSText>
                      </a>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <VSHeading
                      as="h4"
                      size="sm"
                      color="white"
                      className="text-lg mb-4"
                    >
                      Follow Us
                    </VSHeading>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors touch-target"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 sm:w-6 sm:h-6"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors touch-target"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 sm:w-6 sm:h-6"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors touch-target"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22" 
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 sm:w-6 sm:h-6"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors touch-target"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 sm:w-6 sm:h-6"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                      </a>
                </div>
              </div>
            </div>
              </div>
            </div>
          </VSBackground>
        </div>
      </div>
    </AnimationController>
  );
};

export default VerticalShortcutLanding;
