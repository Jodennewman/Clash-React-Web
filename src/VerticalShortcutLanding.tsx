import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import VSQualificationModal from "./Qualification_components/qualification-modal";
import SimpleHero from "./components/hero/SimpleHero";
import { Badge } from "./components/ui/badge";
// import SafeVideoEmbed from "./components/ui/video-embed";
import VSNavbar from "./components/sections/navbar/vs-navbar";
import TabsLeft from "./components/sections/tabs/left";
import SocialProof from "./components/sections/social-proof/marquee-2-rows";
import TestimonialCarousel from "./components/ui/testimonial-carousel";
import WordRoller from "@/components/Word-Rollers/WordRoller.tsx"
import {
  CaseStudies,
  VSPainPoints,
  VSBigReveal,
  CourseViewer,
  TeamSection as MeetTheTeam,
  FAQUpdated,
  PricingSimple,
  Customisation,
  CourseStats,
  FounderTrack,
  ConnectEverything,
} from "./components/sections";
import { Link } from "react-router-dom";
import { AnimatedButton } from "./components/marble-buttons/AnimatedButton";
import CourseTimeline from "./components/CourseTimeline";
import { beforeAfterExamples } from "./data/before-after-examples";

// Import VS helper components for correct light/dark mode implementation
import { VSText, VSHeading } from "./components/ui/vs-text";
import { VSBackground, VSCard, VSSection } from "./components/ui/vs-background";

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
} from "lucide-react";

// Import GSAP and plugins
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Add custom CSS classes
import "./video-peek.css";

// Global GSAP context - key for preventing conflicts
let globalScrollSmoother: globalThis.ScrollSmoother | null = null;
const globalAnimations = {};

// Testimonials data
const testimonials = [
  {
    name: "User One",
    username: "user1",
    text: "This is a sample text for the first user. It contains basic words and simple structure. The content is meant to take up space without using any complex terms that might trigger spell check tools.",
    image: "/avatars/avatar1.jpg",
  },
  {
    name: "User Two",
    username: "user2",
    text: "Here is more sample text for the second user. The words are all simple and short. This text is just here to fill the space where real content would go in a live site or app.",
    image: "/avatars/avatar2.jpg",
  },
  {
    name: "User Three",
    username: "user3",
    text: "Sample text for user three goes in this spot. All of these words should pass a basic spell check. The text is long enough to look like real content but has no real meaning.",
    image: "/avatars/avatar3.jpg",
  },
  {
    name: "User Four",
    username: "user4",
    text: "This is the last block of sample text. It uses basic words that are easy to spell. The goal is to have text that looks right in the layout but does not draw any red lines from spell check tools.",
    image: "/avatars/avatar4.jpg",
  },
];



// Testimonials data for carousel
const carouselTestimonials = [
  {
    quote:
      "I was skeptical about another course, but this is different. After 10 years of posting content, I finally understand why some videos blow up while others die. Everything finally makes sense.",
    name: "Christopher Lee",
    role: "Business Coach",
    image: "/avatars/chris.jpg",
  },
  {
    quote:
      "I've taken every short form course out there. None of them come close to the depth and actionable strategies in Vertical Shortcut. My first video using these principles hit 1.2M views.",
    name: "Jennifer Martinez",
    role: "Content Creator",
    image: "/avatars/jennifer.jpg",
  },
  {
    quote:
      "As a founder of a SaaS company, I never thought short-form would work for our complex product. Within 8 weeks, our content was driving 40% of our new trial signups.",
    name: "David Wilson",
    role: "Tech Founder",
    image: "/avatars/david.jpg",
  },
  {
    quote:
      "The delegation frameworks alone are worth 10x the investment. I went from shooting everything myself to having a team that delivers better content than I ever could alone.",
    name: "Michelle Thompson",
    role: "Agency Owner",
    image: "/avatars/michelle.jpg",
  },
];

// Features data is now in VS-BigReveal component

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
    
    // Initial check
    checkIfMobile();
    
    // Listen for resizes
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Initialize global GSAP context on mount with device-specific settings
  useEffect(() => {
    // Create a central context for all GSAP animations
    const ctx = gsap.context(() => {
      // Use GSAP matchMedia for responsive animations
      const mm = gsap.matchMedia();
      
      // Mobile-specific settings (screen width < 768px)
      mm.add("(max-width: 767px)", () => {
        console.log("Mobile animation settings applied");
        
        // Initialize ScrollSmoother with mobile-optimized settings
        if (!globalScrollSmoother) {
          globalScrollSmoother = ScrollSmoother.create({
            smooth: 0.4, // Reduced smoothness for mobile
            effects: false, // Disable effects on mobile that might cause performance issues
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            normalizeScroll: false, // Better mobile performance with this off
            ignoreMobileResize: false, // Allow mobile resize handling
            speed: 0.8, // Slightly slower speed for smoother mobile experience
          });
        }
        
        // Return cleanup function for this media query
        return () => {
          // Cleanup specific to mobile if needed
        };
      });
      
      // Tablet-specific settings (screen width 768px-1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        console.log("Tablet animation settings applied");
        
        // Initialize ScrollSmoother with tablet-optimized settings
        if (!globalScrollSmoother) {
          globalScrollSmoother = ScrollSmoother.create({
            smooth: 0.6,
            effects: true,
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            normalizeScroll: true,
            ignoreMobileResize: true,
          });
        }
        
        // Return cleanup function for this media query
        return () => {
          // Cleanup specific to tablet if needed
        };
      });
      
      // Desktop-specific settings (screen width >= 1024px)
      mm.add("(min-width: 1024px)", () => {
        console.log("Desktop animation settings applied");
        
        // Initialize ScrollSmoother with full desktop settings
        if (!globalScrollSmoother) {
          globalScrollSmoother = ScrollSmoother.create({
            smooth: 0.7,
            effects: true,
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            normalizeScroll: true,
            ignoreMobileResize: true,
          });
        }
        
        // Return cleanup function for this media query
        return () => {
          // Cleanup specific to desktop if needed
        };
      });
    }, controllerRef);

    // Signal to child components that GSAP is ready
    setGsapInitialized(true);

    // Clean up all animations on unmount
    return () => {
      ctx.revert();

      // Kill all registered scroll triggers
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Kill ScrollSmoother
      if (globalScrollSmoother) {
        globalScrollSmoother.kill();
        globalScrollSmoother = null;
      }

      // Clear all animations
      Object.keys(
        globalAnimations as Record<
          string,
          gsap.core.Animation | gsap.core.Animation[]
        >,
      ).forEach((key) => {
        const animation =
          globalAnimations[key as keyof typeof globalAnimations];
        if (animation) {
          if (Array.isArray(animation)) {
            (animation as gsap.core.Animation[]).forEach(
              (anim: gsap.core.Animation) => anim.kill(),
            );
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
      {/* Context provider approach - pass down the initialized state and device info */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<
                React.PropsWithChildren<{ 
                  "data-gsap-initialized"?: boolean,
                  "data-is-mobile"?: boolean 
                }>
              >,
              {
                ...(child.props as object),
                "data-gsap-initialized": gsapInitialized,
                "data-is-mobile": isMobile,
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
  const videoRef = useRef(null);

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
      if (
        !(
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).statsSection &&
        statsRef.current
      ) {
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
              clearProps: "all",
            });

            // Type assertion to allow dynamic property assignment
            (
              globalAnimations as Record<
                string,
                gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
              >
            ).statsItems = statsAnimation;
          },
        });

        // Type assertion to allow dynamic property assignment
        (
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).statsSection = statsTrigger;
      }

      // Benefits section - register once
      if (
        !(
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).benefitsSection &&
        benefitsRef.current
      ) {
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
              clearProps: "all",
            });

            // Type assertion to allow dynamic property assignment
            (
              globalAnimations as Record<
                string,
                gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
              >
            ).benefitsItems = benefitsAnimation;
          },
        });

        // Type assertion to allow dynamic property assignment
        (
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).benefitsSection = benefitsTrigger;
      }

      // Tracks section - register once
      if (
        !(
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).tracksSection &&
        tracksRef.current
      ) {
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
              clearProps: "all",
            });

            // Type assertion to allow dynamic property assignment
            (
              globalAnimations as Record<
                string,
                gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
              >
            ).tracksItems = tracksAnimation;
          },
        });

        // Type assertion to allow dynamic property assignment
        (
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).tracksSection = tracksTrigger;
      }

      // Video section - register once
      if (
        !(
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).videoSection &&
        videoRef.current
      ) {
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
              clearProps: "all",
            });

            // Type assertion to allow dynamic property assignment
            (
              globalAnimations as Record<
                string,
                gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
              >
            ).videoItem = videoAnimation;
          },
        });

        // Type assertion to allow dynamic property assignment
        (
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).videoSection = videoTrigger;
      }

      // Testimonials - register once
      if (
        !(
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).testimonialsSection &&
        testimonialsRef.current
      ) {
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
              clearProps: "all",
            });

            // Type assertion to allow dynamic property assignment
            (
              globalAnimations as Record<
                string,
                gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
              >
            ).testimonialsItems = testimonialsAnimation;
          },
        });

        // Type assertion to allow dynamic property assignment
        (
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).testimonialsSection = testimonialsTrigger;
      }

      // CTA section - register once
      if (
        !(
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).ctaSection &&
        ctaRef.current
      ) {
        const ctaTrigger = ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 80%",
          once: true,
          id: "cta-trigger",
          onEnter: () => {
            const ctaTl = gsap.timeline();

            ctaTl
              .from(".cta-badge", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
              })
              .from(
                ".cta-title",
                {
                  y: 30,
                  opacity: 0,
                  duration: 0.7,
                  ease: "power2.out",
                },
                "-=0.3",
              )
              .from(
                ".cta-description",
                {
                  y: 30,
                  opacity: 0,
                  duration: 0.7,
                  ease: "power2.out",
                },
                "-=0.4",
              )
              .from(
                ".cta-button",
                {
                  y: 20,
                  opacity: 0,
                  duration: 0.6,
                  ease: "back.out(1.5)",
                },
                "-=0.3",
              );

            // Type assertion to allow dynamic property assignment
            (
              globalAnimations as Record<
                string,
                gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
              >
            ).ctaItems = ctaTl;
          },
        });

        // Type assertion to allow dynamic property assignment
        (
          globalAnimations as Record<
            string,
            gsap.core.Timeline | gsap.core.Tween | ScrollTrigger
          >
        ).ctaSection = ctaTrigger;
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
      openQualificationModal();
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

  return (
    <AnimationController>
      {/* Qualification Modal for personalized implementation */}
      <VSQualificationModal
        isOpen={showQualificationModal}
        onClose={closeQualificationModal}
        testMode={testMode}
      />

      {/* Main wrapper for ScrollSmoother */}
      <div
        id="smooth-wrapper"
        ref={mainRef}
        className="min-h-screen overflow-hidden"
      >
        {/* Floating Navbar stays outside the smooth content for fixed positioning */}
        <VSNavbar onApplyClick={openQualificationModal} />

        {/* Smooth content container */}
        <div
          id="smooth-content"
          ref={contentRef}
          className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-[var(--theme-bg-cream-gradient)] dark:bg-gradient-to-b dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]"
        >
          {/* Section 1: Header with integrated video */}
          <SimpleHero
            ref={heroRef}
            onCtaClick={openQualificationModal}
            videoUrl="https://www.youtube.com/embed/your-video-id"
            videoRef={videoRef}
          />

          {/* Section 2: What do we do? - Adjusted spacing for video peek */}
          <VSSection
            lightBg="bg-theme-gradient"
            darkBg="dark:bg-theme-gradient"
            className="py-16 relative overflow-hidden mt-[-25vh] pt-[30vh]"
          >
            {/* Theme-aware floating elements */}
            <div
              className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12
                 opacity-theme-float bg-theme-float-primary animate-float-slow"
            ></div>
            <div
              className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"
            ></div>

            <div className="container mx-auto px-4">
              {/* Section header */}
              <div className="text-center max-w-4xl mx-auto mb-8">
                <VSHeading
                  variant="h2"
                  className="text-3xl md:text-4xl font-bold text-theme-primary mb-6"
                >
                  What do we do?
                </VSHeading>
              </div>

              {/* Copy content */}
              <div className="text-center max-w-4xl mx-auto mb-16">
                <p className="body-text mb-8 mx-auto max-w-[90%] md:max-w-none">
                  We've worked with some of the biggest business creators in the
                  world: Chris Donnelly, Charlotte Mair, James Watt, Ben Askins,
                  Jordan Schwarzenberger, just to name a few.
                </p>
                <p className="body-text mb-8 mx-auto max-w-[90%] md:max-w-none">
                  And built their content from the ground up.
                </p>
                <p className="body-text mb-8 mx-auto max-w-[90%] md:max-w-none">
                  Building them over 1 Billion Views in just 2 years (we told
                  you, we're the best)
                </p>
                <p className="body-text-large font-bold text-theme-primary">
                  The numbers speak for themselves
                </p>
              </div>

              {/* Section 3: Case studies - click on each to see graphs and more in detail stats */}
              <CaseStudies onCtaClick={openQualificationModal} />
            </div>
          </VSSection>

          <WordRoller
              words={["You've","probably","seen","our","work","before"]}
              sectionClassName="min-h-screen w-full max-w-7xl mx-auto"
              colorSpace="oklch"
              startColor={{ h: 240, s: 80, l: 60 }} // Blue
              endColor={{ h: 290, s: 80, l: 60 }}   // Purple
          />

          {/* Section 4: Double marquee with our biggest videos with biggest views */}
          <SocialProof />

          {/* Section 6: Pain Points */}
          <VSPainPoints />

          {/* Section 7: The Vertical Shortcut (big sell) */}
          <VSBigReveal />

          {/* Section 8: Contents */}
          <CourseStats />

          {/* Section 9: The Course Curriculum (Using CourseViewer component) */}
          <CourseViewer />

          {/* Tools & Integrations - Custom systems built for creators */}
          <ConnectEverything />

          {/* Section 10: Week by week structure */}
          <CourseTimeline />

          <MeetTheTeam />

          {/* Section 12: The Founders Track */}
          <FounderTrack onCtaClick={openQualificationModal} />

          {/* Section 13: The Team Track */}
          <TabsLeft />

          {/* Section 14: Testimonials slideshow */}
          <TestimonialCarousel testimonials={carouselTestimonials} />

          {/* Section 15: Buy/Apply - Pricing Section */}
          <PricingSimple onCtaClick={openQualificationModal} />

          {/* Section 16: Customisation */}
          <Customisation onCtaClick={openQualificationModal} />

          {/* Section 17: FAQs */}
          <FAQUpdated />

          {/* Section 18: Final Application CTA */}
          <VSSection
            ref={ctaRef}
            lightBg="bg-theme-gradient"
            darkBg="dark:bg-theme-gradient"
            className="py-24 relative overflow-hidden"
          >
            {/* Theme-aware floating elements */}
            <div
              className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12
                 opacity-theme-float bg-theme-float-primary animate-float-slow"
            ></div>
            <div
              className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"
            ></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <Badge
                    variant="outline"
                    className="bg-theme-primary/10 border-theme-primary/30 mb-4 py-2 px-4 mx-auto"
                  >
                    <VSText className="font-semibold flex items-center gap-2 text-theme-primary">
                      <Clock className="h-4 w-4" /> Limited spots available for
                      next cohort
                    </VSText>
                  </Badge>

                  <VSHeading
                    variant="h2"
                    className="cta-title text-4xl md:text-5xl lg:text-6xl font-bold text-theme-primary mb-6"
                  >
                    Limited spots available for next cohort
                  </VSHeading>

                  <VSHeading
                    variant="h3"
                    className="cta-subtitle text-3xl md:text-4xl font-bold text-theme-primary mb-6"
                  >
                    Ready to Transform Your Content?
                  </VSHeading>

                  <p className="body-text mb-10 mx-auto max-w-[90%] md:max-w-3xl">
                    Join Vertical Shortcut today and get access to our complete
                    system for creating high-converting content that drives real
                    business results.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row bg-theme-surface p-8 md:p-12 rounded-2xl shadow-theme-md">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <VSHeading
                      variant="h3"
                      className="text-2xl md:text-3xl font-bold text-theme-primary mb-6"
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
                      variant="h3"
                      className="text-2xl md:text-3xl font-bold text-theme-primary mb-6"
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
            className="py-16 bg-theme-primary border-t border-[--secondary-teal)]/30"
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div className="space-y-4">
                  <VSHeading
                    variant="h4"
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
                    variant="h4"
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
                    variant="h4"
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
                    variant="h4"
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
                      variant="h4"
                      color="white"
                      className="text-lg mb-4"
                    >
                      Follow Us
                    </VSHeading>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-theme-custom/60 hover:text-[--primary-orange)] /60 dark:hover:text-[--primary-orange)] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
