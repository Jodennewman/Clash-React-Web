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

// Import creator case study data from the database via course-utils
import courseUtils, { Creator } from "../../lib/course-utils";
import { avatarImages } from "@/utils/importImages";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Set ScrollTrigger defaults for better performance
ScrollTrigger.config({
  ignoreMobileResize: true, // Reduces updates during mobile resize events
});

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
const creators: EnhancedCreator[] =
  courseUtils.getCreators().length > 0
    ? courseUtils.getCreators().map((creator) => ({
        ...creator,
        // Ensure avatar paths are correct
        avatar: creator.avatar.startsWith("/")
          ? creator.avatar
          : `src/assets/main/Clients-webp-300px/${creator.avatar}`,
      }))
    : [
        {
          id: 1,
          name: "Chris Donnelly",
          avatar: "src/assets/main/Clients-webp-300px/Chris_Donnelly.webp",
          description:
            "Chris Donnelly is the founder of luxury digital marketing agency Verb, the cofounder of Lottie, a tech startup for social care, plus an investor, author, speaker and creator. He is now the founder of the creator accelerator, and host of the Wake Up podcast.\nWe started working with Chris in 2022, and grew his TikTok and Instagram accounts from 1k to 1m followers, in just under 2 years, amassing over 250 million views. His account focusses on business, management, leadership and investment.",
          data: [
            { month: "Mar", views: 5500, followers: 2253, interactions: 840 },
            {
              month: "Apr",
              views: 4779726,
              followers: 14679,
              interactions: 294209,
            },
            {
              month: "Jun",
              views: 21365179,
              followers: 72955,
              interactions: 1215532,
            },
            {
              month: "Jul",
              views: 30939528,
              followers: 112591,
              interactions: 1777674,
            },
            {
              month: "Nov",
              views: 60280586,
              followers: 270903,
              interactions: 3510967,
            },
            {
              month: "Feb",
              views: 136764121,
              followers: 673444,
              interactions: 3510967,
            },
          ],
          totals: {
            views: 168427385 + 102432554,
            followers: 509736 + 397154,
            interactions: 7746523,
          },
        },
        {
          id: 2,
          name: "Charlotte Mair",
          avatar: "src/assets/main/Clients-webp-300px/Charlotte_mair.webp",
          description:
            "Charlotte Mair is the Founder and Managing Director of award winning culture and communications agency, The Fitting Room, a cultural forecaster, speaker, and brand strategist.\nWe started working with Charlotte in October of 2024, and in just 6 months she's built 170k followers across her TikTok and YouTube, and amassed 28 million views. Her account focusses on all things marketing, pop culture and business.",
          data: [
            { month: "Oct", views: 30800, followers: 594, interactions: 347 },
            {
              month: "Nov",
              views: 2504982,
              followers: 6400 + 11390,
              interactions: 63745,
            },
            {
              month: "Dec",
              views: 17493045,
              followers: 69983 + 19796,
              interactions: 1267938,
            },
            {
              month: "Jan",
              views: 21878423,
              followers: 94881 + 28300,
              interactions: 1629321,
            },
            {
              month: "Feb",
              views: 26359144,
              followers: 109125 + 41105,
              interactions: 2077460,
            },
            {
              month: "Mar",
              views: 34698532,
              followers: 178638,
              interactions: 2906438,
            },
          ],
          totals: { views: 34698532, followers: 178638, interactions: 2906438 },
        },
        {
          id: 3,
          name: "James Watt",
          avatar: "src/assets/main/Clients-webp-300px/James_Watt.webp",
          description:
            "James Watt is the co-founder and captain of BrewDog the biggest independent beer company on the planet. He's also a best-selling author, investor, North Atlantic captain and the founder of Social Tip, the platform that makes 'anyone an influencer'. \nWe started working with James at the end of 2024 and together grew an audience of 15k followers and 20 million views in just 2 months on TikTok alone. His account focusses on business, beer and lobster fishing (of course).",
          data: [
            { month: "Oct", views: 0, followers: 0, interactions: 0 },
            {
              month: "Nov",
              views: 7123640,
              followers: 7649,
              interactions: 232779,
            },
            {
              month: "Dec",
              views: 9456943,
              followers: 11265,
              interactions: 291559,
            },
            {
              month: "Jan",
              views: 9880702,
              followers: 11611,
              interactions: 304054,
            },
          ],
          totals: { views: 9880702, followers: 11611, interactions: 304054 },
        },
        {
          id: 4,
          name: "Ben Askins",
          avatar: "src/assets/main/Clients-webp-300px/Ben_Askins.webp",
          description:
            "Ben Askins is the co-founder of Gaia, a green tech company that helps businesses hit environmental targets efficiently. He alsoo co-founded Verb Brands alongside Chris Donnelly.\nWe started working with Ben in 2022, and grew his audience to 1 million followers across TikTok and Instagram, hitting an insane 387 million views in under 7 months. His account focusses on business, management and genZ.",
          data: [
            { month: "Feb", views: 7263, followers: 104, interactions: 197 },
            {
              month: "Mar",
              views: 420099,
              followers: 1248,
              interactions: 42877,
            },
            {
              month: "Apr",
              views: 4669887,
              followers: 1913,
              interactions: 300616,
            },
            {
              month: "May",
              views: 19004595,
              followers: 52343,
              interactions: 1576752,
            },
            {
              month: "Jun",
              views: 40342874,
              followers: 167153,
              interactions: 3145698,
            },
            {
              month: "Jul",
              views: 57794777,
              followers: 264207,
              interactions: 4458406,
            },
            {
              month: "Aug",
              views: 68410279,
              followers: 287704,
              interactions: 5196815,
            },
            {
              month: "Sep",
              views: 83934226,
              followers: 346018,
              interactions: 6476592,
            },
            {
              month: "Nov",
              views: 124724682,
              followers: 450644,
              interactions: 9287518,
            },
            {
              month: "Jan",
              views: 209465478,
              followers: 655586,
              interactions: 14918792,
            },
          ],
          totals: {
            views: 387228032,
            followers: 1017913,
            interactions: 22529225,
          },
        },
        {
          id: 5,
          name: "Joden Clash",
          avatar: "src/assets/main/Clients-webp-300px/Joden_Clash.webp",
          description:
            "Joden Newman is the Founder and Creative Director of Clash Creation. In early 2024 he decided to apply the vertical shortcut techniques to his own content, and grew himself 110 million views and 1 million followers across all platforms in just 3 months. His account focusses on current events, true crime and film.",
          data: [
            {
              month: "Feb",
              views: 90000,
              followers: 8322,
              interactions: 12678,
            },
            {
              month: "Mar",
              views: 8830000,
              followers: 69630,
              interactions: 725790,
            },
            {
              month: "Apr",
              views: 46300000,
              followers: 407360,
              interactions: 4950000,
            },
            {
              month: "May",
              views: 62080000,
              followers: 680950,
              interactions: 6450000,
            },
            {
              month: "Jun",
              views: 69720000,
              followers: 809000,
              interactions: 7510000,
            },
            {
              month: "Jul",
              views: 89630000,
              followers: 936760,
              interactions: 9360000,
            },
            {
              month: "Aug",
              views: 89630000,
              followers: 936760,
              interactions: 9360000,
            },
          ],
          totals: {
            views: 109630000,
            followers: 936760 + 126212,
            interactions: 9360000,
          },
        },
        {
          id: 6,
          name: "Jordan Schwarz",
          avatar: "src/assets/main/Clients-webp-300px/Jordan2.webp",
          description:
            "Jordan Schwarzenberger is the co-founder Arcade Media, author, creative and the manager of The Sidemen: the UK's biggest creator empire. \nWe started working with Jordan towards the end of 2024 and together grew his TikTok and Instagram to 39 million views and 15k followers in just 3 months. His account focusses on GenZ, the creator economy, and pop culture.",
          data: [
            {
              month: "Oct",
              views: 0,
              followers: 14562 + 5344,
              interactions: 0,
            },
            {
              month: "Nov",
              views: 3348513,
              followers: 16896 + 16900,
              interactions: 231295,
            },
            {
              month: "Dec",
              views: 5518878,
              followers: 21057 + 18279,
              interactions: 323166,
            },
            {
              month: "Jan",
              views: 9215739 + 145782 + 1598500,
              followers: 22255 + 21710,
              interactions: 566426,
            },
          ],
          totals: {
            views: 9215739 + 145782 + 1598500,
            followers: 22255 + 21710,
            interactions: 566426,
          },
        },
      ];

// Remove the image mapping attempt since we're using direct public paths
creators.forEach((creator) => {
  creator.avatarSrc = creator.avatar;
});

// Define the CaseStudies component with forwardRef
const CaseStudies = React.forwardRef<HTMLElement, CaseStudiesProps>(
  (props, ref) => {
    const sectionRef = useRef<HTMLElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const statsRowRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Add inline styles to head to handle the scrollbar hiding
    // Also add component-level ScrollTrigger cleanup
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

      // Comprehensive cleanup function for component unmount
      return () => {
        // Clean up style element
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
          document.head.removeChild(styleElement);
        }

        // Ensure all ScrollTrigger instances associated with this component are killed
        try {
          // Get all ScrollTrigger instances
          const allTriggers = ScrollTrigger.getAll();

          // Kill any triggers related to this component
          allTriggers.forEach((trigger) => {
            if (
              trigger.vars.id === "case-study-elements" ||
              trigger.vars.id === "stats-boxes" ||
              (trigger.trigger &&
                sectionRef.current &&
                sectionRef.current.contains(trigger.trigger as HTMLElement))
            ) {
              trigger.kill();
            }
          });

          // Clear any pending refresh calls
          if (debouncedRefresh.current) {
            clearTimeout(debouncedRefresh.current);
          }
        } catch (error) {
          console.error("Error cleaning up ScrollTrigger on unmount:", error);
        }
      };
    }, []);
    const [activeCreator, setActiveCreator] = useState(0);
    const [activeMetric, setActiveMetric] = useState("all");
    const [animateGraph, setAnimateGraph] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Create a debounced version of ScrollTrigger.refresh
    const debouncedRefresh = useRef<NodeJS.Timeout | null>(null);

    const debounceScrollTriggerRefresh = () => {
      if (debouncedRefresh.current) {
        clearTimeout(debouncedRefresh.current);
      }

      debouncedRefresh.current = setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch (error) {
          console.error("Error refreshing ScrollTrigger:", error);
        }
      }, 200); // 200ms delay before refreshing
    };

    // Function to scroll the carousel
    const scrollCarousel = (direction: "left" | "right") => {
      const container = carouselRef.current;
      if (!container) return;

      const scrollAmount = container.offsetWidth * 0.7; // Scroll by 70% of visible width
      const newPosition =
        direction === "right"
          ? scrollPosition + scrollAmount
          : scrollPosition - scrollAmount;

      // Clamp the scroll position between 0 and max scroll
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll));

      container.scrollTo({
        left: clampedPosition,
        behavior: "smooth",
      });

      setScrollPosition(clampedPosition);

      // Use debounced refresh instead of immediate refresh
      debounceScrollTriggerRefresh();
    };

    // Use the current creator data with a fallback empty object if not found
    const currentCreator = creators?.[activeCreator] || {
      name: "Sample Creator",
      description: "Example creator profile. No creators found in data.",
      avatar: "src/assets/main/Logo@2x.webp",
      data: [],
      totals: { views: 0, followers: 0, interactions: 0 },
      id: 0,
    };

    // Format numbers with comma separators
    const formatNumber = (num: number) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Format large numbers with abbreviations for top stats display
    const formatLargeNumber = (num: number) => {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      }
      return num.toString();
    };

    // Calculate growth duration in months for each creator
    const getGrowthDuration = (creator: Creator): number => {
      if (!creator?.data || creator?.data?.length < 2) return 0;

      // Find months with actual data (excluding zero values)
      const monthsWithData =
        creator?.data?.filter(
          (item) =>
            item?.views > 0 || item?.followers > 0 || item?.interactions > 0,
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

    // Refresh ScrollTrigger when relevant state changes
    useEffect(() => {
      // Use the debounced refresh function for all state changes
      debounceScrollTriggerRefresh();

      // Cleanup on unmount
      return () => {
        if (debouncedRefresh.current) {
          clearTimeout(debouncedRefresh.current);
        }
      };
    }, [activeCreator, activeMetric, animateGraph]);

    // Calculate Y-axis domain based on active metric
    const getYAxisDomain = () => {
      if (activeMetric === "views") {
        const maxViews = Math.max(
          ...(currentCreator?.data?.map((item) => item?.views) || []),
        );
        return [0, Math.ceil(maxViews * 1.1)] as [number, number]; // Add 10% padding and type assertion
      } else if (activeMetric === "followers") {
        const maxFollowers = Math.max(
          ...(currentCreator?.data?.map((item) => item?.followers) || []),
        );
        return [0, Math.ceil(maxFollowers * 1.1)] as [number, number];
      } else if (activeMetric === "interactions") {
        const maxInteractions = Math.max(
          ...(currentCreator?.data?.map((item) => item?.interactions) || []),
        );
        return [0, Math.ceil(maxInteractions * 1.1)] as [number, number];
      }
      // For 'all', let Recharts handle it
      return undefined;
    };

    // GSAP animations with enhanced cleanup
    useGSAP(() => {
      // Store ScrollTrigger instances for explicit cleanup
      const scrollTriggers: ScrollTriggerInstance[] = [];

      const ctx = gsap.context(() => {
        try {
          // Direct DOM manipulation without requestAnimationFrame to avoid timing issues
          // Create ScrollTrigger animation for main elements
          const caseStudyElements = document.querySelectorAll(
            ".case-study-element",
          );
          if (caseStudyElements.length > 0 && sectionRef.current) {
            const mainElementsAnimation = gsap.from(caseStudyElements, {
              y: 20, // Reduced movement for smoother animation
              opacity: 0,
              stagger: 0.05, // Reduced stagger time for quicker animation
              duration: 0.6, // Shorter duration for better performance
              ease: "power2.out", // Simpler easing function
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom bottom",
                toggleActions: "play none none none", // Changed to avoid reverse animation issues
                once: false, // Don't keep the animation state in memory
                id: "case-study-elements",
              },
            });

            if (mainElementsAnimation.scrollTrigger) {
              scrollTriggers.push(mainElementsAnimation.scrollTrigger);
            }
          }

          // Special animation for the stats row with staggered entry
          const statsBoxes = document.querySelectorAll(".stats-box");
          if (statsBoxes.length > 0 && statsRowRef.current) {
            // Immediately set all statsBoxes to be visible first
            gsap.set(statsBoxes, { opacity: 1 });

            const statsAnimation = gsap.from(statsBoxes, {
              y: 5, // Minimal movement
              opacity: 0.7, // Start more visible
              stagger: 0.02, // Faster stagger
              duration: 0.3, // Shorter duration
              ease: "power1.out", // Simpler easing
              scrollTrigger: {
                trigger: statsRowRef.current,
                start: "top 85%",
                toggleActions: "play none none none", // Changed to avoid reverse issues
                once: false,
                id: "stats-boxes",
              },
            });

            if (statsAnimation.scrollTrigger) {
              scrollTriggers.push(statsAnimation.scrollTrigger);
            }
          }
        } catch (error) {
          console.error("Error setting up GSAP animations:", error);
        }
      }, sectionRef);

      // Return comprehensive cleanup function with enhanced error handling
      return () => {
        try {
          // First kill all ScrollTrigger instances explicitly
          scrollTriggers.forEach((trigger) => {
            if (trigger && typeof trigger.kill === "function") {
              trigger.kill();
            }
          });

          // Kill all ScrollTrigger instances to ensure thorough cleanup
          const allTriggers = ScrollTrigger.getAll();
          allTriggers.forEach((trigger) => {
            if (
              trigger.vars.id === "case-study-elements" ||
              trigger.vars.id === "stats-boxes"
            ) {
              trigger.kill();
            }
          });

          // Then revert the GSAP context
          ctx.revert();
        } catch (error) {
          console.error("Error cleaning up GSAP animations:", error);
        }
      };
    }, []);

    // Custom tooltip component for the chart
    const CustomTooltip = ({
      active,
      payload,
      label,
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
          <div
            className="bg-theme-gradient-card
                      p-2.5 rounded-md shadow-theme-sm
                      border border-theme-border-light"
          >
            <p className="font-medium text-sm text-theme-primary mb-1.5">
              {label}
            </p>
            {payload.map((entry, index) => (
              <div
                key={`item-${index}`}
                className="flex justify-between items-center my-0.5 text-xs"
              >
                <span className="mr-4" style={{ color: entry.color }}>
                  {entry.name}:
                </span>
                <span className="font-medium" style={{ color: entry.color }}>
                  {formatNumber(entry.value)}
                </span>
              </div>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
      <Section
        ref={(el) => mergeRefs(sectionRef, ref)(el)}
        className="bg-transparent flex flex-col justify-start pt-4 sm:pt-6 md:pt-0 pb-0 mb-0 relative overflow-visible"
      >
        {/* Background patterns */}
        <div className="absolute inset-0 dot-bg pointer-events-none"></div>

        {/* Theme-aware floating elements - hidden on mobile */}
        <div
          className="absolute top-40 left-[10%] w-40 h-40 rounded-[40%] rotate-12
                  opacity-[var(--theme-float-opacity)]
                  bg-[var(--theme-float-bg-primary)]
                  animate-float-slow hidden md:block"
        ></div>
        <div
          className="absolute bottom-60 right-[15%] w-40 h-40 rounded-[30%] -rotate-6
                  opacity-[var(--theme-float-opacity)]
                  bg-[var(--theme-float-bg-secondary)]
                  animate-float-medium hidden md:block"
        ></div>

        <div className="container-mobile mx-auto relative z-10 flex flex-col">
          {/* Section header - responsive and properly positioned */}
          <div className="text-center mb-4 md:mb-10 case-study-element mt-0 md:-mt-16">
            <h2 className="text-black dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              The numbers speak for themselves
            </h2>
          </div>

          {/* Stats carousel optimized for mobile with HUD-like appearance */}
          <div
            ref={statsRowRef}
            className="mb-6 case-study-element relative z-20"
          >
            {/* Mobile view: Creator grid with more prominent UI */}
            <div className="md:hidden">
              <h3 className="text-theme-secondary text-sm font-medium mb-2 px-1">
                Select Creator:
              </h3>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                {creators.map((creator, index) => (
                  <button
                    key={creator.id}
                    onClick={() => setActiveCreator(index)}
                    className={`stats-box 
                          rounded-lg p-2 xs:p-3
                          border border-gray-300/30 dark:border-gray-700/30
                          transition-all duration-200
                          ${
                            activeCreator === index
                              ? "ring-1 ring-blue-500/50 dark:ring-blue-400/50 bg-white/5 shadow-sm scale-[1.02]"
                              : "hover:bg-white/5 active:scale-[0.98]"
                          }
                          flex items-center relative`}
                    style={{ position: "relative", zIndex: 30 }}
                  >
                    <div
                      className="w-8 h-8 xs:w-10 xs:h-10 rounded-full overflow-hidden
                            border-2 border-white
                            flex-shrink-0 mr-1.5 xs:mr-2 relative z-50"
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full"
                        style={{ position: "relative", zIndex: 100 }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 dark:text-white font-medium text-xs xs:text-sm truncate">
                        {creator.name}
                      </h4>
                      <div className="flex items-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm xs:text-base">
                          {formatLargeNumber(creator?.totals?.views || 0)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 text-[10px] xs:text-xs ml-1">
                          views
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop view: Carousel with navigation */}
            <div className="hidden md:block">
              {/* Left scroll button */}
              <button
                onClick={() => scrollCarousel("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-theme-gradient-primary p-3 rounded-full shadow-theme-md text-white hover:scale-110 transition-transform duration-300 border border-white/20"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Carousel content */}
              <div
                ref={carouselRef}
                className={`${SCROLLBAR_HIDE_CLASS} flex gap-2 px-8 py-2 snap-x hidden md:flex`}
                style={{ scrollBehavior: "smooth" }}
              >
                {creators.map((creator, index) => (
                  <button
                    key={creator.id}
                    onClick={() => setActiveCreator(index)}
                    className={`stats-box bg-theme-gradient-card 
                          rounded-lg p-3
                          border border-theme-border-light
                          shadow-theme-sm 
                          transition-all duration-300
                          flex-shrink-0 w-[calc(25%-0.75rem)]
                          snap-start
                          ${
                            activeCreator === index
                              ? "translate-y-[-4px] scale-[1.02] shadow-theme-md ring-2 ring-[var(--theme-primary)]/70"
                              : "hover:translate-y-[-3px] hover:shadow-theme-md"
                          }
                          flex flex-col items-center text-center`}
                    style={{ position: "relative", zIndex: 0 }}
                  >
                    <div
                      className="w-11 h-11 rounded-full overflow-hidden
                            ring-2 ring-white mb-2
                            transition-all duration-300 mx-auto relative z-50"
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                        style={{ position: "relative", zIndex: 100 }}
                      />
                    </div>
                    <div className="text-theme-secondary/80 text-[10px] uppercase tracking-wider font-medium">
                      Views
                    </div>
                    <div className="text-theme-accent-primary font-bold text-3xl lg:text-4xl leading-none">
                      {formatLargeNumber(creator?.totals?.views || 0)}
                    </div>
                    <div className="text-theme-secondary/90 text-[10px] mt-0.5">
                      in {getGrowthDuration(creator)} months
                    </div>
                    <h4 className="text-theme-primary/60 font-normal text-[9px] truncate w-full opacity-60">
                      {creator.name}
                    </h4>
                  </button>
                ))}
              </div>

              {/* Right scroll button */}
              <button
                onClick={() => scrollCarousel("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-theme-gradient-primary p-3 rounded-full shadow-theme-md text-white hover:scale-110 transition-transform duration-300 border border-white/20 hidden md:block"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>


      {/* Creator Profile Hub - Prominent top section */}
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 w-full max-w-full sm:max-w-[98%] sm:mx-auto case-study-element">
        {/* Active Creator Dashboard - Always visible at top */}
        <div className="bg-theme-gradient-card rounded-xl border border-theme-border-light shadow-theme-lg overflow-hidden transition-all duration-300 transform">
          {/* Creator Header with Navigation */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between p-3 sm:p-4 border-b border-theme-border-light/50 bg-theme-surface relative">
            {/* Creator Info */}
            <div className="flex items-center w-full sm:w-auto">
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0
                        ring-2 ring-[var(--theme-primary)] mr-3 sm:mr-4 relative z-50 shadow-lg">
                <img
                  src={currentCreator?.avatar || '/src/assets/main/Logo@2x.webp'}
                  alt={currentCreator?.name || 'Creator'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-0.5">
                  <h2 className="text-theme-primary text-lg sm:text-2xl md:text-3xl font-semibold leading-tight truncate">
                    {currentCreator?.name || 'Creator'}
                  </h2>
                  <div className="bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                    Case Study
                  </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-theme-secondary">
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{getGrowthDuration(currentCreator)} month growth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{formatLargeNumber(currentCreator?.totals?.interactions || 0)} interactions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Pills */}
            <div className="hidden sm:flex items-center gap-2 mt-2 sm:mt-0">
              <div className="bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] px-3 py-1.5 rounded-lg text-sm font-semibold">
                {formatLargeNumber(currentCreator?.totals?.views || 0)} Views
              </div>
              <div className="bg-[var(--theme-accent-secondary)]/10 text-[var(--theme-accent-secondary)] px-3 py-1.5 rounded-lg text-sm font-semibold">
                {formatLargeNumber(currentCreator?.totals?.followers || 0)} Followers
              </div>
            </div>
          </div>

          {/* Bio and Quick Stats */}
          <div className="p-2 sm:p-4 md:p-5 grid md:grid-cols-[1fr_auto] gap-3 sm:gap-4">
            {/* Bio Section */}
            <div className="bg-theme-surface/30 rounded-lg p-2 sm:p-4 border border-theme-border-light/30">
              <h3 className="text-theme-primary text-sm font-medium mb-1 sm:mb-2">About</h3>
              <p className="text-theme-secondary text-xs leading-relaxed sm:text-sm sm:leading-relaxed line-clamp-4 sm:line-clamp-none">
                {currentCreator?.description || 'No description available.'}
              </p>
            </div>

            {/* Quick Stats Row - Mobile Only */}
            <div className="flex md:hidden gap-2">
              <div className="bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] flex-1 rounded-lg p-2 text-center text-xs sm:text-sm font-semibold">
                {formatLargeNumber(currentCreator?.totals?.views || 0)} Views
              </div>
              <div className="bg-[var(--theme-accent-secondary)]/10 text-[var(--theme-accent-secondary)] flex-1 rounded-lg p-2 text-center text-xs sm:text-sm font-semibold">
                {formatLargeNumber(currentCreator?.totals?.followers || 0)} Followers
              </div>
            </div>

            {/* Animated Growth Stats - Desktop Only */}
            <div className="hidden md:block bg-theme-surface/30 rounded-lg p-3 border border-theme-border-light/30">
              <h3 className="text-theme-primary text-sm font-medium mb-3">Growth Results</h3>
              <div className="flex flex-col gap-3">
                {/* Views Counter */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-12 bg-[var(--theme-primary)]/70 rounded-full"></div>
                  <div>
                    <div className="text-[var(--theme-primary)] text-2xl font-bold">
                      <span className="animate-count-up"
                            data-value={currentCreator?.totals?.views || 0}
                            data-duration="1500"
                            key={`views-${activeCreator}`} // Key changes force re-render when creator changes
                            ref={(el) => {
                              if (el) {
                                // Reset initialization state when creator changes
                                el.removeAttribute('data-initialized');

                                if (!el.getAttribute('data-initialized')) {
                                  el.setAttribute('data-initialized', 'true');
                                  const value = currentCreator?.totals?.views || 0;
                                  const duration = 1500;

                                  let startTimestamp: number | null = null;
                                  const step = (timestamp: number) => {
                                    if (!startTimestamp) startTimestamp = timestamp;
                                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                                    const currentValue = Math.floor(progress * value);
                                    el.textContent = formatLargeNumber(currentValue);

                                    if (progress < 1) {
                                      window.requestAnimationFrame(step);
                                    } else {
                                      // Final value with proper formatting
                                      el.textContent = formatLargeNumber(value);
                                    }
                                  };

                                  window.requestAnimationFrame(step);
                                }
                              }
                            }}>
                        0
                      </span> Views
                    </div>
                    <div className="text-theme-secondary text-sm mt-0.5">
                      in just <span className="font-semibold">{getGrowthDuration(currentCreator)}</span> months
                    </div>
                  </div>
                </div>

                {/* Followers Counter */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-12 bg-[var(--theme-accent-secondary)]/70 rounded-full"></div>
                  <div>
                    <div className="text-[var(--theme-accent-secondary)] text-2xl font-bold">
                      <span className="animate-count-up"
                            data-value={currentCreator?.totals?.followers || 0}
                            data-duration="1200"
                            key={`followers-${activeCreator}`} // Key changes force re-render when creator changes
                            ref={(el) => {
                              if (el) {
                                // Reset initialization state when creator changes
                                el.removeAttribute('data-initialized');

                                if (!el.getAttribute('data-initialized')) {
                                  el.setAttribute('data-initialized', 'true');
                                  const value = currentCreator?.totals?.followers || 0;
                                  const duration = 1200;

                                  let startTimestamp: number | null = null;
                                  const step = (timestamp: number) => {
                                    if (!startTimestamp) startTimestamp = timestamp;
                                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                                    const currentValue = Math.floor(progress * value);
                                    el.textContent = formatLargeNumber(currentValue);

                                    if (progress < 1) {
                                      window.requestAnimationFrame(step);
                                    } else {
                                      // Final value with proper formatting
                                      el.textContent = formatLargeNumber(value);
                                    }
                                  };

                                  window.requestAnimationFrame(step);
                                }
                              }
                            }}>
                        0
                      </span> Followers
                    </div>
                    <div className="text-theme-secondary text-sm mt-0.5">across all platforms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creator Tabs - Visible on All Devices */}
          <div className="bg-theme-surface/50 border-t border-theme-border-light/30 px-2 sm:px-4 pt-1 sm:pt-2">
            <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
              {[
                { id: "all", label: "All Metrics", mobileLabel: "All", color: "text-theme-primary", icon: "📊" },
                { id: "views", label: "Views", mobileLabel: "Views", color: "text-[var(--theme-primary)]", icon: "👁️" },
                { id: "followers", label: "Followers", mobileLabel: "Followers", color: "text-[var(--theme-accent-secondary)]", icon: "👥" },
                { id: "interactions", label: "Interactions", mobileLabel: "Engagements", color: "text-[var(--theme-accent-tertiary)]", icon: "💬" },
              ].map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setActiveMetric(metric.id)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-t-lg text-xs sm:text-sm transition-all flex items-center whitespace-nowrap
                            touch-target min-h-[44px] min-w-[44px]
                            ${activeMetric === metric.id 
                              ? metric.id === "all"
                                ? "bg-theme-gradient-primary text-white shadow-theme-sm border-b-2 border-white" 
                                : metric.id === "views"
                                  ? "bg-[var(--theme-primary)] text-white shadow-theme-sm border-b-2 border-white"
                                  : metric.id === "followers"
                                    ? "bg-[var(--theme-accent-secondary)] text-white shadow-theme-sm border-b-2 border-white" 
                                    : "bg-[var(--theme-accent-tertiary)] text-white shadow-theme-sm border-b-2 border-white"
                              : "bg-transparent hover:bg-theme-surface"}`}
                >
                  <span className="mr-1 sm:mr-1.5">{metric.icon}</span>
                  <span className="hidden xs:inline">{metric.label}</span>
                  <span className="xs:hidden">{metric.mobileLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Creator Growth Data */}
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4">

          {/* Detailed Stats Cards */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 case-study-element">
            {/* Views Stats Card */}
            <div className="bg-theme-gradient-card rounded-xl border border-theme-border-light shadow-theme-md p-3 overflow-hidden">
              <div className="flex items-center">
                <div className="w-1 h-12 bg-[var(--theme-primary)]/70 rounded-full mr-2"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--theme-primary)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                    </svg>
                    <div className="text-theme-secondary text-xs uppercase tracking-wider font-medium">Total Views</div>
                  </div>
                  <div className="text-[var(--theme-primary)] text-xl font-bold mt-1">
                    {formatNumber(currentCreator?.totals?.views || 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Followers Stats Card */}
            <div className="bg-theme-gradient-card rounded-xl border border-theme-border-light shadow-theme-md p-3 overflow-hidden">
              <div className="flex items-center">
                <div className="w-1 h-12 bg-[var(--theme-accent-secondary)]/70 rounded-full mr-2"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--theme-accent-secondary)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z" fill="currentColor"/>
                    </svg>
                    <div className="text-theme-secondary text-xs uppercase tracking-wider font-medium">Followers</div>
                  </div>
                  <div className="text-[var(--theme-accent-secondary)] text-xl font-bold mt-1">
                    {formatNumber(currentCreator?.totals?.followers || 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactions Stats Card */}
            <div className="bg-theme-gradient-card rounded-xl border border-theme-border-light shadow-theme-md p-3 overflow-hidden">
              <div className="flex items-center">
                <div className="w-1 h-12 bg-[var(--theme-accent-tertiary)]/70 rounded-full mr-2"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--theme-accent-tertiary)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    <div className="text-theme-secondary text-xs uppercase tracking-wider font-medium">Interactions</div>
                  </div>
                  <div className="text-[var(--theme-accent-tertiary)] text-xl font-bold mt-1">
                    {formatNumber(currentCreator?.totals?.interactions || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graph component */}
          <div ref={chartRef} className="col-span-3 bg-theme-gradient-card p-3 sm:p-4 rounded-xl
                    border border-theme-border-light shadow-theme-md case-study-element">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  activeMetric === "all" ? "bg-theme-gradient-primary" : 
                  activeMetric === "views" ? "bg-[var(--theme-primary)]" :
                  activeMetric === "followers" ? "bg-[var(--theme-accent-secondary)]" :
                  "bg-[var(--theme-accent-tertiary)]"
                }`}></div>
                <h3 className="text-theme-primary text-base sm:text-lg font-medium">
                  Growth Chart
                </h3>
              </div>

              <div className="hidden sm:block text-theme-secondary text-xs sm:text-sm">
                {activeMetric === "all" ? "All Metrics" : activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}
                {" • "}{getGrowthDuration(currentCreator)} Month Growth
              </div>
            </div>

            <div className="h-[240px] sm:h-[320px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentCreator?.data || []}
                  margin={{
                    top: 5,
                    right: typeof window !== 'undefined' && window.innerWidth < 480 ? 0 : window.innerWidth < 768 ? 5 : 20,
                    left: typeof window !== 'undefined' && window.innerWidth < 480 ? 0 : window.innerWidth < 768 ? 5 : 15,
                    bottom: 5
                  }}
                >
                  <defs>
                    {/* Simplified glow effect */}
                    <filter id="simpleGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Simplified grid for mobile */}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--theme-border-light)"
                    opacity={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.15 : 0.4}
                    vertical={false}
                    horizontal={typeof window !== 'undefined' && window.innerWidth < 480 ? false : true}
                  />

                  {/* More compact X-axis for mobile */}
                  <XAxis
                    dataKey="month"
                    className="text-theme-secondary"
                    stroke="var(--theme-border-light)"
                    tick={{
                      fontSize: typeof window !== 'undefined' && window.innerWidth < 480 ? 10 : window.innerWidth < 768 ? 10 : 12,
                      fill: 'var(--theme-text-primary)',
                      fontWeight: window.innerWidth < 480 ? 'bold' : 'normal'
                    }}
                    tickLine={false}
                    axisLine={true}
                    interval={typeof window !== 'undefined' && window.innerWidth < 480 ? 1 : window.innerWidth < 640 ? 0 : 0}
                  />

                  {/* Enhanced Y-axis for mobile readability */}
                  <YAxis
                    className="text-theme-secondary"
                    stroke="var(--theme-border-light)"
                    domain={getYAxisDomain()}
                    tick={{
                      fontSize: typeof window !== 'undefined' && window.innerWidth < 480 ? 11 : window.innerWidth < 768 ? 12 : 12,
                      fill: 'var(--theme-primary)',
                      fontWeight: 'bold'
                    }}
                    tickLine={true}
                    axisLine={true}
                    tickCount={typeof window !== 'undefined' && window.innerWidth < 480 ? 4 : window.innerWidth < 768 ? 4 : 5}
                    width={window.innerWidth < 480 ? 60 : undefined}
                    tickFormatter={(value) => {
                      // Format numbers to be more readable on mobile (e.g., 1M instead of 1000000)
                      if (value >= 1000000) {
                        return `${(value / 1000000).toFixed(0)}M`;
                      } else if (value >= 1000) {
                        return `${(value / 1000).toFixed(0)}K`;
                      }
                      return value;
                    }}
                  />

                  {/* Tooltip remains the same */}
                  <Tooltip content={<CustomTooltip />} />

                  {/* Hide legend on smallest screens, simplified on mobile */}
                  {typeof window !== 'undefined' && window.innerWidth > 480 && (
                    <Legend
                      iconSize={typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 8}
                      wrapperStyle={{
                        fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '10px',
                        paddingTop: '5px'
                      }}
                      verticalAlign={typeof window !== 'undefined' && window.innerWidth < 768 ? "top" : "bottom"}
                    />
                  )}

                  {/* Views line - better visibility for mobile */}
                  {(activeMetric === "all" || activeMetric === "views") && (
                    <Line
                      type="monotone"
                      dataKey="views"
                      name="Views"
                      stroke="var(--theme-primary)"
                      strokeWidth={window.innerWidth < 768 ? 2.5 : 2}
                      dot={window.innerWidth < 480 ? { r: 3, strokeWidth: 1, fill: "var(--theme-primary)" } : false}
                      activeDot={{
                        r: window.innerWidth < 768 ? 4 : 3,
                        strokeWidth: 2,
                        fill: "var(--theme-primary)",
                        filter: "url(#simpleGlow)"
                      }}
                      animationDuration={animateGraph ? 500 : 0}
                      isAnimationActive={animateGraph}
                    />
                  )}

                  {/* Followers line - better visibility for mobile */}
                  {(activeMetric === "all" || activeMetric === "followers") && (
                    <Line
                      type="monotone"
                      dataKey="followers"
                      name="Followers"
                      stroke="var(--theme-accent-secondary)"
                      strokeWidth={window.innerWidth < 768 ? 2 : 1.5}
                      dot={window.innerWidth < 480 ? { r: 2, strokeWidth: 1, fill: "var(--theme-accent-secondary)" } : false}
                      activeDot={{
                        r: window.innerWidth < 768 ? 4 : 3,
                        strokeWidth: 2,
                        fill: "var(--theme-accent-secondary)",
                        filter: "url(#simpleGlow)"
                      }}
                      animationDuration={animateGraph ? 500 : 0}
                      isAnimationActive={animateGraph}
                    />
                  )}

                  {/* Interactions line - better visibility for mobile */}
                  {(activeMetric === "all" || activeMetric === "interactions") && (
                    <Line
                      type="monotone"
                      dataKey="interactions"
                      name="Interactions"
                      stroke="var(--theme-accent-tertiary)"
                      strokeWidth={window.innerWidth < 768 ? 2 : 1.5}
                      dot={window.innerWidth < 480 ? { r: 2, strokeWidth: 1, fill: "var(--theme-accent-tertiary)" } : false}
                      activeDot={{
                        r: window.innerWidth < 768 ? 4 : 3,
                        strokeWidth: 2,
                        fill: "var(--theme-accent-tertiary)",
                        filter: "url(#simpleGlow)"
                      }}
                      animationDuration={animateGraph ? 500 : 0}
                      isAnimationActive={animateGraph}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* No bottom spacing or decorative effects */}
    </Section>
  );
});

// Add display name for debugging
CaseStudies.displayName = "CaseStudies";

// Helper function to merge refs
function mergeRefs<T>(
  ...refs: (
    | React.RefObject<T>
    | React.MutableRefObject<T>
    | React.ForwardedRef<T>
    | ((instance: T | null) => void)
    | null
  )[]
) {
  return (value: T | null): void => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export default CaseStudies;
