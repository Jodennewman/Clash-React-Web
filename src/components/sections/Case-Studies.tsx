import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "../ui/section";
import { AnimatedButton } from "../marble-buttons/AnimatedButton";

// Import the image utility - only import what we use
import { getImage } from "../../utils/imageMap";
// Import the explicit image finder
import { findImageByBasename } from "../../utils/importImages";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Set ScrollTrigger defaults for better performance
ScrollTrigger.config({
  ignoreMobileResize: true, // Reduces updates during mobile resize events
});

// Import creator case study data from the database via course-utils
import courseUtils, { Creator } from "../../lib/course-utils";

// Extend Creator interface to support our image mapping system
interface EnhancedCreator extends Creator {
  // Original property might be a string path
  avatarSrc?: string;
}

// Custom CSS class to be added for hiding scrollbars
// We'll use this with a regular div instead of a styled component
const SCROLLBAR_HIDE_CLASS = "scrollbar-hide";

// Define component props interface
interface CaseStudiesProps {
  onCtaClick?: () => void;
}

// Type for ScrollTrigger instance
type ScrollTriggerInstance = ReturnType<typeof ScrollTrigger.create>;

// Get creators data from the database with a fallback for UI display
// Note: This fallback is only for display in the UI component and doesn't affect the course-utils module
const creators: EnhancedCreator[] = courseUtils.getCreators().length > 0 ? 
  courseUtils.getCreators() : 
  [
    {
      id: 1,
      name: "Chris Donnelly",
      avatar: "/assets/main/Clients-webp-300px/Chris_Donnelly.webp",
      description: "Chris Donnelly is the founder of luxury digital marketing agency Verb, the cofounder of Lottie, a tech startup for social care, plus an investor, author, speaker and creator. He is now the founder of the creator accelerator, and host of the Wake Up podcast.\nWe started working with Chris in 2022, and grew his TikTok and Instagram accounts from 1k to 1m followers, in just under 2 years, amassing over 250 million views. His account focusses on business, management, leadership and investment.",
      data: [
        { month: "Mar", views: 5500, followers: 2253, interactions: 840 },
        { month: "Apr", views: 4779726, followers: 14679, interactions: 294209 },
        { month: "Jun", views: 21365179, followers: 72955, interactions: 1215532 },
        { month: "Jul", views: 30939528, followers: 112591, interactions: 1777674 },
        { month: "Nov", views: 60280586, followers: 270903, interactions: 3510967 },
        { month: "Feb", views: 136764121, followers: 673444, interactions: 3510967 }
      ],
      totals: { views: 168427385 + 102432554, followers: 509736 + 397154, interactions: 7746523 }
    },
    {
      id: 2,
      name: "Charlotte Mair",
      avatar: "/assets/main/Clients-webp-300px/Charlotte_mair.webp",
      description: "Charlotte Mair is the Founder and Managing Director of award winning culture and communications agency, The Fitting Room, a cultural forecaster, speaker, and brand strategist.\nWe started working with Charlotte in October of 2024, and in just 6 months she's built 170k followers across her TikTok and YouTube, and amassed 28 million views. Her account focusses on all things marketing, pop culture and business.",
      data: [
        { month: "Oct", views: 30800, followers: 594, interactions: 347 },
        { month: "Nov", views: 2504982, followers: 6400 + 11390, interactions: 63745 },
        { month: "Dec", views: 17493045, followers: 69983 + 19796, interactions: 1267938 },
        { month: "Jan", views: 21878423, followers: 94881 + 28300, interactions: 1629321 },
        { month: "Feb", views: 26359144, followers: 109125 + 41105, interactions: 2077460 },
        { month: "Mar", views: 34698532, followers: 178638, interactions: 2906438 }
      ],
      totals: { views: 34698532, followers: 178638, interactions: 2906438 }
    },
    {
      id: 3,
      name: "James Watt",
      avatar: "/assets/main/Clients-webp-300px/James_Watt.webp",
      description: "James Watt is the co-founder and captain of BrewDog the biggest independent beer company on the planet. He's also a best-selling author, investor, North Atlantic captain and the founder of Social Tip, the platform that makes 'anyone an influencer'. \nWe started working with James at the end of 2024 and together grew an audience of 15k followers and 20 million views in just 2 months on TikTok alone. His account focusses on business, beer and lobster fishing (of course).",
      data: [
        { month: "Oct", views: 0, followers: 0, interactions: 0 },
        { month: "Nov", views: 7123640, followers: 7649, interactions: 232779 },
        { month: "Dec", views: 9456943, followers: 11265, interactions: 291559 },
        { month: "Jan", views: 9880702, followers: 11611, interactions: 304054 }
      ],
      totals: { views: 9880702, followers: 11611, interactions: 304054 }
    },
    {
      id: 4,
      name: "Ben Askins",
      avatar: "/assets/main/Clients-webp-300px/Ben_Askins.webp",
      description: "Ben Askins is the co-founder of Gaia, a green tech company that helps businesses hit environmental targets efficiently. He alsoo co-founded Verb Brands alongside Chris Donnelly.\nWe started working with Ben in 2022, and grew his audience to 1 million followers across TikTok and Instagram, hitting an insane 387 million views in under 7 months. His account focusses on business, management and genZ.",
      data: [
        { month: "Feb", views: 7263, followers: 104, interactions: 197 },
        { month: "Mar", views: 420099, followers: 1248, interactions: 42877 },
        { month: "Apr", views: 4669887, followers: 1913, interactions: 300616 },
        { month: "May", views: 19004595, followers: 52343, interactions: 1576752 },
        { month: "Jun", views: 40342874, followers: 167153, interactions: 3145698 },
        { month: "Jul", views: 57794777, followers: 264207, interactions: 4458406 },
        { month: "Aug", views: 68410279, followers: 287704, interactions: 5196815 },
        { month: "Sep", views: 83934226, followers: 346018, interactions: 6476592 },
        { month: "Nov", views: 124724682, followers: 450644, interactions: 9287518 },
        { month: "Jan", views: 209465478, followers: 655586, interactions: 14918792 }
      ],
      totals: { views: 387228032, followers: 1017913, interactions: 22529225 }
    },
    {
      id: 5,
      name: "Joden Clash",
      avatar: "/assets/main/Clients-webp-300px/Joden_Clash.webp",
      description: "Joden Newman is the Founder and Creative Director of Clash Creation. In early 2024 he decided to apply the vertical shortcut techniques to his own content, and grew himself 110 million views and 1 million followers across all platforms in just 3 months. His account focusses on current events, true crime and film.",
      data: [
        { month: "Feb", views: 90000, followers: 8322, interactions: 12678 },
        { month: "Mar", views: 8830000, followers: 69630, interactions: 725790 },
        { month: "Apr", views: 46300000, followers: 407360, interactions: 4950000 },
        { month: "May", views: 62080000, followers: 680950, interactions: 6450000 },
        { month: "Jun", views: 69720000, followers: 809000, interactions: 7510000 },
        { month: "Jul", views: 89630000, followers: 936760, interactions: 9360000 },
        { month: "Aug", views: 89630000, followers: 936760, interactions: 9360000 }
      ],
      totals: { views: 109630000, followers: 936760 + 126212, interactions: 9360000 }
    },
    {
      id: 6,
      name: "Jordan Schwarz",
      avatar: "/assets/main/Clients-webp-300px/Jordan_Schwarzenberger.webp",
      description: "Jordan Schwarzenberger is the co-founder Arcade Media, author, creative and the manager of The Sidemen: the UK's biggest creator empire. \nWe started working with Jordan towards the end of 2024 and together grew his TikTok and Instagram to 39 million views and 15k followers in just 3 months. His account focusses on GenZ, the creator economy, and pop culture.",
      data: [
        { month: "Oct", views: 0, followers: 14562+5344, interactions: 0 },
        { month: "Nov", views: 3348513, followers: 16896+16900, interactions: 231295 },
        { month: "Dec", views: 5518878, followers: 21057+18279, interactions: 323166 },
        { month: "Jan", views: 9215739+145782+1598500, followers: 22255+21710, interactions: 566426 }
      ],
      totals: { views: 9215739+145782+1598500, followers: 22255+21710, interactions: 566426 }
    }
  ];

// Process creator avatars to use our image mapping
creators.forEach(creator => {
  // Store the original avatar path if needed
  creator.avatarSrc = creator.avatar;
  
  // Try to get the avatar from our image map system
  try {
    // Extract filename without extension from the path
    const filenameMatch = creator.avatar.match(/([^/]+)(?:\.\w+)?$/);
    if (filenameMatch && filenameMatch[1]) {
      const filename = filenameMatch[1];
      
      // Try multiple methods to get the image:
      // 1. Try to get from our explicit imports first (most reliable)
      // 2. Then try the dynamic image map
      // 3. Fall back to original path if neither works
      const explicitImage = findImageByBasename(filename);
      const mappedImage = getImage(filename);
      
      if (explicitImage) {
        console.log(`Found explicit image for ${creator.name}:`, explicitImage);
        creator.avatar = explicitImage;
      } else if (mappedImage) {
        console.log(`Found mapped image for ${creator.name}:`, mappedImage);
        creator.avatar = mappedImage;
      } else {
        // If we can't find the image, load from its original path
        // This might not work unless the image is in the public directory
        console.warn(`No mapped image found for ${creator.name}, using original path`);
      }
    }
  } catch (error) {
    console.warn(`Could not map avatar for creator ${creator.name}`, error);
    // Keep the original avatar path if mapping fails
  }
});

// Define the CaseStudies component with forwardRef
const CaseStudies = React.forwardRef<HTMLElement, CaseStudiesProps>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Add inline styles to head to handle the scrollbar hiding
  useEffect(() => {
    // Create style element if it doesn't exist already
    const styleId = "scrollbar-hide-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .${SCROLLBAR_HIDE_CLASS} {
          overflow-x: auto;
          scroll-behavior: smooth;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .${SCROLLBAR_HIDE_CLASS}::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `;
      document.head.appendChild(style);
    }
    
    // Cleanup function
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  const [activeCreator, setActiveCreator] = useState(0);
  const [activeMetric, setActiveMetric] = useState("all");
  const [animateGraph, setAnimateGraph] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Function to scroll the carousel
  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (!container) return;
    
    const scrollAmount = container.offsetWidth * 0.7; // Scroll by 70% of visible width
    const newPosition = direction === 'right' 
      ? scrollPosition + scrollAmount 
      : scrollPosition - scrollAmount;
    
    // Clamp the scroll position between 0 and max scroll
    const maxScroll = container.scrollWidth - container.offsetWidth;
    const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll));
    
    container.scrollTo({
      left: clampedPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(clampedPosition);
    
    // Refresh ScrollTrigger to update positions after scrolling
    ScrollTrigger.refresh();
  };
  
  // Use the current creator data with a fallback empty object if not found
  const currentCreator = creators?.[activeCreator] || {
    name: 'Sample Creator',
    description: 'Example creator profile. No creators found in data.',
    avatar: '/assets/main/Main-Logo.png',
    data: [],
    totals: { views: 0, followers: 0, interactions: 0 },
    id: 0
  };

  // Format numbers with comma separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Format large numbers with abbreviations for top stats display
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };
  
  // Calculate growth duration in months for each creator
  const getGrowthDuration = (creator: Creator): number => {
    if (!creator?.data || creator?.data?.length < 2) return 0;
    
    // Find months with actual data (excluding zero values)
    const monthsWithData = creator?.data?.filter(item => 
      item?.views > 0 || item?.followers > 0 || item?.interactions > 0
    ) || [];
    
    return (monthsWithData?.length || 0) - 1;
  };

  // Reset animation when changing creators or metrics - faster animation transition
  useEffect(() => {
    setAnimateGraph(false);
    const timer = setTimeout(() => {
      setAnimateGraph(true);
    }, 25); // Reduced from 100ms to 25ms for faster transitions
    return () => clearTimeout(timer);
  }, [activeCreator, activeMetric]);
  
  // Refresh ScrollTrigger when active creator changes
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
    
    return () => clearTimeout(refreshTimer);
  }, [activeCreator]);
  
  // Calculate Y-axis domain based on active metric
  const getYAxisDomain = () => {
    if (activeMetric === "views") {
      const maxViews = Math.max(
        ...(currentCreator?.data?.map((item) => item?.views) || [])
      );
      return [0, Math.ceil(maxViews * 1.1)] as [number, number]; // Add 10% padding and type assertion
    } else if (activeMetric === "followers") {
      const maxFollowers = Math.max(
        ...(currentCreator?.data?.map((item) => item?.followers) || [])
      );
      return [0, Math.ceil(maxFollowers * 1.1)] as [number, number];
    } else if (activeMetric === "interactions") {
      const maxInteractions = Math.max(
        ...(currentCreator?.data?.map((item) => item?.interactions) || [])
      );
      return [0, Math.ceil(maxInteractions * 1.1)] as [number, number];
    }
    // For 'all', let Recharts handle it
    return undefined;
  };

  // GSAP animations with proper cleanup
  useGSAP(() => {
    // Store ScrollTrigger instances for explicit cleanup
    const scrollTriggers: ScrollTriggerInstance[] = [];
    
    const ctx = gsap.context(() => {
      // Create ScrollTrigger animation for main elements
      // Only create animation if there are elements to animate and section is available
      const caseStudyElements = document.querySelectorAll(".case-study-element");
      if (caseStudyElements.length > 0 && sectionRef.current) {
        const mainElementsAnimation = gsap.from(".case-study-element", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
            id: "case-study-elements" // Add ID for easier debugging
          }
        });
      
        // Store the ScrollTrigger instance for explicit cleanup
        if (mainElementsAnimation.scrollTrigger) {
          scrollTriggers.push(mainElementsAnimation.scrollTrigger);
        }
      }

      // Special animation for the stats row with staggered entry
      // Only create the animation if there are stats boxes to animate
      const statsBoxes = document.querySelectorAll(".stats-box");
      if (statsBoxes.length > 0 && statsRowRef.current) {
        const statsAnimation = gsap.from(".stats-box", {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRowRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          id: "stats-boxes" // Add ID for easier debugging
        }
        });
        
        // Store the ScrollTrigger instance for explicit cleanup
        if (statsAnimation.scrollTrigger) {
          scrollTriggers.push(statsAnimation.scrollTrigger);
        }
      }
    }, sectionRef);

    // Return comprehensive cleanup function
    return () => {
      // First kill all ScrollTrigger instances explicitly
      scrollTriggers.forEach(trigger => {
        trigger.kill();
      });
      
      // Then revert the GSAP context
      ctx.revert();
      
      // Log cleanup for debugging (remove in production)
      console.log('ScrollTrigger instances cleaned up:', scrollTriggers.length);
    };
  }, []); // Empty dependency array since animations should only initialize once
           // Using refs as triggers handles dynamic content

  // Custom tooltip component for the chart
  const CustomTooltip = ({ 
    active, 
    payload, 
    label 
  }: { 
    active?: boolean; 
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>; 
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-theme-gradient-card
                      p-2.5 rounded-md shadow-theme-sm
                      border border-theme-border-light">
          <p className="font-medium text-sm text-theme-primary mb-1.5">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex justify-between items-center my-0.5 text-xs">
              <span className="mr-4" style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>{formatNumber(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Section
      ref={mergeRefs([sectionRef, ref])}
      className="bg-theme-primary min-h-screen flex flex-col justify-center py-20 relative overflow-hidden border-t border-theme-border-light"
    >
    {/* Background patterns */}
    <div className="absolute inset-0 dot-bg opacity-[var(--theme-pattern-opacity)] pointer-events-none"></div>
    
    {/* Theme-aware floating elements */}
    <div className="absolute top-40 left-[10%] w-40 h-40 rounded-[40%] rotate-12 
                  opacity-[var(--theme-float-opacity)]
                  bg-[var(--theme-float-bg-primary)]
                  animate-float-slow hidden md:block"></div>
    <div className="absolute bottom-60 right-[15%] w-40 h-40 rounded-[30%] -rotate-6 
                  opacity-[var(--theme-float-opacity)]
                  bg-[var(--theme-float-bg-secondary)]
                  animate-float-medium hidden md:block"></div>

    <div className="container mx-auto px-4 relative z-10 flex flex-col">
      {/* Section header */}
      <div className="text-center mb-6 md:mb-8 case-study-element">
        <h2 className="text-theme-primary text-4xl md:text-5xl font-bold mb-4">
          Creator Case Studies
        </h2>
      </div>


      {/* Stats carousel showing 4 creators at once with navigation buttons */}
      <div ref={statsRowRef} className="mb-6 case-study-element">
        {/* Carousel container with navigation buttons */}
        <div className="relative">
          {/* Left scroll button */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-theme-gradient-primary p-3 rounded-full shadow-theme-md text-white hover:scale-110 transition-transform duration-300 border border-white/20"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          {/* Carousel content */}
          <div 
            ref={carouselRef} 
            className={`${SCROLLBAR_HIDE_CLASS} flex gap-2 px-8 py-2 snap-x`}
            style={{ scrollBehavior: 'smooth' }}
          >
            {creators.map((creator, index) => (
              <button
                key={creator.id}
                onClick={() => setActiveCreator(index)}
                className={`stats-box bg-theme-gradient-card 
                          rounded-lg p-2 md:p-3
                          border border-theme-border-light
                          shadow-theme-sm 
                          transition-all duration-300
                          flex-shrink-0 w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]
                          snap-start
                          ${activeCreator === index 
                            ? 'translate-y-[-4px] scale-[1.02] shadow-theme-md ring-2 ring-[var(--theme-primary)]/70' 
                            : 'hover:translate-y-[-3px] hover:shadow-theme-md'}
                          flex items-center text-left md:text-center`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden 
                            ring-2 ring-[var(--theme-primary)]/70
                            transition-all duration-300 flex-shrink-0 md:hidden">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col md:items-center">
                  <div className="hidden md:block w-11 h-11 rounded-full overflow-hidden 
                              ring-2 ring-[var(--theme-primary)]/70 mb-2
                              transition-all duration-300 mx-auto">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-theme-secondary/80 text-[10px] uppercase tracking-wider font-medium md:mt-0 md:mb-0">
                    Views
                  </div>
                  <div className="text-theme-accent-primary font-bold text-2xl md:text-3xl lg:text-4xl leading-none">
                    {formatLargeNumber(creator?.totals?.views || 0)}
                  </div>
                  <div className="text-theme-secondary/90 text-[8px] md:text-[10px] mt-0.5">
                    in {getGrowthDuration(creator)} months
                  </div>
                  <h4 className="text-theme-primary/60 font-normal text-[8px] md:text-[9px] truncate w-full opacity-60">
                    {creator.name}
                  </h4>
                </div>
              </button>
            ))}
          </div>
          
          {/* Right scroll button */}
          <button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-theme-gradient-primary p-3 rounded-full shadow-theme-md text-white hover:scale-110 transition-transform duration-300 border border-white/20"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>


      {/* Single column layout for main content - with narrower margins */}
      <div className="flex flex-col gap-5 mb-4 max-w-[98%] mx-auto">
        {/* Metric toggle buttons in their own row */}
        <div className="flex flex-wrap justify-start gap-1.5 mb-1 case-study-element">
          {[
            { id: "all", label: "All Metrics", color: "text-theme-primary" },
            { id: "views", label: "Views", color: "text-[var(--theme-primary)]" },
            { id: "followers", label: "Followers", color: "text-[var(--theme-accent-secondary)]" },
            { id: "interactions", label: "Interactions", color: "text-[var(--theme-accent-tertiary)]" },
          ].map((metric) => (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={`px-2.5 py-0.5 rounded-full text-xs transition-all
                        ${activeMetric === metric.id 
                          ? metric.id === "all"
                            ? "bg-theme-gradient-primary text-white shadow-theme-glow" 
                            : metric.id === "views"
                              ? "bg-[var(--theme-primary)] text-white shadow-theme-glow"
                              : metric.id === "followers"
                                ? "bg-[var(--theme-accent-secondary)] text-white shadow-theme-glow" 
                                : "bg-[var(--theme-accent-tertiary)] text-white shadow-theme-glow"
                          : "bg-theme-surface hover:bg-theme-surface-hover"}`}
            >
              {metric.label}
            </button>
          ))}
        </div>

        {/* Stats row for detailed metrics - moved above the graph */}
        <div className="grid grid-cols-3 gap-2 mb-3 case-study-element">
          {/* Views card */}
          <div className="bg-theme-gradient-card
                      rounded-md p-2.5
                      border border-theme-border-light shadow-theme-md
                      transition-all duration-200
                      hover:bg-theme-surface-hover
                      overflow-hidden">
            <div className="flex items-center">
              <div className="w-1 h-12 bg-[var(--theme-primary)]/70 rounded-full mr-2"></div>
              <div className="flex-1">
                <div className="text-theme-secondary text-[10px] uppercase tracking-wider font-medium">Total Views</div>
                <div className="text-[var(--theme-primary)] text-xl font-bold mt-1">
                  {formatNumber(currentCreator?.totals?.views || 0)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Followers card */}
          <div className="bg-theme-gradient-card
                      rounded-md p-2.5
                      border border-theme-border-light shadow-theme-md
                      transition-all duration-200
                      hover:bg-theme-surface-hover
                      overflow-hidden">
            <div className="flex items-center">
              <div className="w-1 h-12 bg-[var(--theme-accent-secondary)]/70 rounded-full mr-2"></div>
              <div className="flex-1">
                <div className="text-theme-secondary text-[10px] uppercase tracking-wider font-medium">Followers</div>
                <div className="text-[var(--theme-accent-secondary)] text-xl font-bold mt-1">
                  {formatNumber(currentCreator?.totals?.followers || 0)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactions card */}
          <div className="bg-theme-gradient-card
                      rounded-md p-2.5
                      border border-theme-border-light shadow-theme-md
                      transition-all duration-200
                      hover:bg-theme-surface-hover">
            <div className="flex items-center">
              <div className="w-1 h-12 bg-[var(--theme-accent-tertiary)]/70 rounded-full mr-2"></div>
              <div className="flex-1">
                <div className="text-theme-secondary text-[10px] uppercase tracking-wider font-medium">Interactions</div>
                <div className="text-[var(--theme-accent-tertiary)] text-xl font-bold mt-1">
                  {formatNumber(currentCreator?.totals?.interactions || 0)}
                </div>
              </div>
              <div className="bg-[var(--theme-accent-tertiary)]/10 p-1 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#DE6B59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      
        {/* Graph component - slightly narrower */}
        <div ref={chartRef} className="bg-theme-gradient-card
                    p-3 rounded-md
                    border border-theme-border-light shadow-theme-md case-study-element">
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentCreator?.data || []}
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--theme-border-light)" 
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="month" 
                  className="text-theme-secondary text-xs"
                  stroke="var(--theme-border-light)"
                />
                <YAxis
                  className="text-theme-secondary text-xs"
                  stroke="var(--theme-border-light)"
                  domain={getYAxisDomain()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {(activeMetric === "all" || activeMetric === "views") && (
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="var(--theme-primary)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, filter: "url(#glow)" }}
                    animationDuration={animateGraph ? 1000 : 0}
                  />
                )}
                {(activeMetric === "all" || activeMetric === "followers") && (
                  <Line
                    type="monotone"
                    dataKey="followers"
                    name="Followers"
                    stroke="var(--theme-accent-secondary)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, filter: "url(#glow)" }}
                    animationDuration={animateGraph ? 1000 : 0}
                  />
                )}
                {(activeMetric === "all" || activeMetric === "interactions") && (
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    name="Interactions"
                    stroke="var(--theme-accent-tertiary)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, filter: "url(#glow)" }}
                    animationDuration={animateGraph ? 1000 : 0}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Creator Profile */}
        <div className="flex flex-col md:flex-row items-center gap-3 p-3
                  bg-theme-gradient-card
                  rounded-md border border-theme-border-light shadow-theme-md case-study-element">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0
                      ring-2 ring-[var(--theme-primary)]/80">
            <img
              src={currentCreator?.avatar || '/assets/main/Main-Logo.png'}
              alt={currentCreator?.name || 'Creator'}
              className="w-full h-full object-cover"
            />
          </div>


          <div className="text-center md:text-left flex-1">
            <h3 className="text-theme-primary text-lg md:text-xl font-medium mb-0.5">
              {currentCreator?.name || 'Creator'}
            </h3>
            <p className="text-theme-secondary text-xs md:text-sm">
              {currentCreator?.description || 'No description available.'}
            </p>
          </div>
        </div>
        
        {/* CTA section - moved below the creator profile */}
        <div className="text-center py-8 mt-6 case-study-element">
          <p className="body-text-large font-bold text-theme-primary mb-6">
            Want to be next on this list?
          </p>
          <AnimatedButton 
            text="Start your Journey"
            variant="accent" 
            saturation="high"
            size="lg"
            onClick={props?.onCtaClick || (() => console.log('CTA clicked'))}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
    
    {/* Bottom decorative effects - theme aware */}
    <div className="absolute bottom-0 left-0 right-0 h-20 
                 bg-gradient-to-t from-[var(--theme-bg-secondary)]/10 to-transparent 
                 opacity-[var(--theme-overlay-opacity)] pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 right-0 h-40 
                 bg-gradient-to-t from-[var(--theme-primary)]/5 to-transparent 
                 opacity-[var(--theme-glow-opacity)] pointer-events-none"></div>
    </Section>
  );
});

// Add display name for debugging
CaseStudies.displayName = 'CaseStudies';

// Helper function to merge refs
function mergeRefs<T>(...refs: Array<React.RefObject<T> | React.MutableRefObject<T> | ((instance: T | null) => void) | null>) {
  return (value: T | null): void => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export default CaseStudies;