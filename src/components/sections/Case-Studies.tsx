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
import styled from "styled-components";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import creator case study data from the database via course-utils
import courseUtils, { Creator } from "../../lib/course-utils";

// Styled component for the carousel with hidden scrollbar
const ScrollbarHiddenContainer = styled.div`
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;

// Define component props interface
interface CaseStudiesProps {
  onCtaClick?: () => void;
}

// Get creators data from the database
const creators: Creator[] = courseUtils.getCreators();

// Define the CaseStudies component with forwardRef
const CaseStudies: React.ForwardRefExoticComponent<CaseStudiesProps & React.RefAttributes<HTMLElement>> = 
  React.forwardRef((props, ref) => {
    const sectionRef = useRef<HTMLElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const statsRowRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
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
    };
    
    // Use the current creator data
    const currentCreator = creators[activeCreator];

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
      if (!creator.data || creator.data.length < 2) return 0;
      
      // Find months with actual data (excluding zero values)
      const monthsWithData = creator.data.filter(item => 
        item.views > 0 || item.followers > 0 || item.interactions > 0
      );
      
      return monthsWithData.length;
    };

    // Reset animation when changing creators or metrics - faster animation transition
    useEffect(() => {
      setAnimateGraph(false);
      const timer = setTimeout(() => {
        setAnimateGraph(true);
      }, 25); // Reduced from 100ms to 25ms for faster transitions
      return () => clearTimeout(timer);
    }, [activeCreator, activeMetric]);
    
    // Calculate Y-axis domain based on active metric
    const getYAxisDomain = () => {
      if (activeMetric === "views") {
        const maxViews = Math.max(
          ...currentCreator.data.map((item) => item.views)
        );
        return [0, Math.ceil(maxViews * 1.1)]; // Add 10% padding
      } else if (activeMetric === "followers") {
        const maxFollowers = Math.max(
          ...currentCreator.data.map((item) => item.followers)
        );
        return [0, Math.ceil(maxFollowers * 1.1)];
      } else if (activeMetric === "interactions") {
        const maxInteractions = Math.max(
          ...currentCreator.data.map((item) => item.interactions)
        );
        return [0, Math.ceil(maxInteractions * 1.1)];
      }
      // For 'all', let Recharts handle it
      return "auto";
    };

    // GSAP animations
    useGSAP(() => {
      const ctx = gsap.context(() => {
        // Create ScrollTrigger animation for main elements
        gsap.from(".case-study-element", {
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
          }
        });

        // Special animation for the stats row with staggered entry
        gsap.from(".stats-box", {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      }, sectionRef);

      return () => ctx.revert(); // Cleanup
    }, []);

    // Custom tooltip component for the chart
    const CustomTooltip = ({ 
      active, 
      payload, 
      label 
    }: { 
      active?: boolean; 
      payload?: any[]; 
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
          <p className="body-text mb-6 mx-auto max-w-[90%] md:max-w-3xl">
            {/* This copy is parsed from the data inside of the components, as mentioned in the guidance */}
            {creators.map((creator, index) => (
              <span key={creator.id} className="inline-block mx-1">
                {creator.name}: {formatLargeNumber(creator.totals.views)} views, {formatLargeNumber(creator.totals.followers)} followers - in just {getGrowthDuration(creator)} months
                {index < creators.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </p>
        </div>


        {/* Stats carousel showing 4 creators at once with navigation buttons */}
        <div ref={statsRowRef} className="mb-6 case-study-element">
          {/* Carousel container with navigation buttons */}
          <div className="relative">
            {/* Left scroll button */}
            <button 
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-theme-gradient p-2 rounded-full shadow-theme-sm text-white"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {/* Carousel content */}
            <ScrollbarHiddenContainer 
              ref={carouselRef} 
              className="flex gap-2 px-8 py-2 snap-x"
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
                      {formatLargeNumber(creator.totals.views)}
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-theme-gradient p-2 rounded-full shadow-theme-sm text-white"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    {formatNumber(currentCreator.totals.views)}
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
                    {formatNumber(currentCreator.totals.followers)}
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
                    {formatNumber(currentCreator.totals.interactions)}
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
                  data={currentCreator.data}
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
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    className="text-theme-secondary text-xs"
                    domain={getYAxisDomain()}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    formatter={(value) => (
                      <span className="text-theme-primary text-xs font-medium">{value}</span>
                    )}
                    iconSize={10}
                    wrapperStyle={{ fontSize: '12px', paddingTop: "10px" }}
                  />
                  {(activeMetric === "all" || activeMetric === "views") && (
                    <Line
                      type="monotone"
                      dataKey="views"
                      name="Views"
                      stroke="#FEA35D"
                      strokeWidth={4}
                      dot={false}
                      className="filter-glow-theme"
                      activeDot={{
                        r: 7,
                        fill: "#FEA35D",
                        stroke: "white",
                        strokeWidth: 2.5
                      }}
                      isAnimationActive={animateGraph}
                      animationDuration={500}
                      animationEasing="linear"
                      pathLength={1} // Use path length for stroke-dasharray animation
                    />
                  )}
                  {(activeMetric === "all" || activeMetric === "followers") && (
                    <Line
                      type="monotone"
                      dataKey="followers"
                      name="Followers"
                      stroke="#387292"
                      strokeWidth={4}
                      dot={false}
                      className="filter-glow-theme"
                      activeDot={{
                        r: 7,
                        fill: "#387292",
                        stroke: "white",
                        strokeWidth: 2.5
                      }}
                      isAnimationActive={animateGraph}
                      animationDuration={500}
                      animationEasing="linear"
                      animationBegin={100}
                      pathLength={1} // Use path length for stroke-dasharray animation
                    />
                  )}
                  {(activeMetric === "all" || activeMetric === "interactions") && (
                    <Line
                      type="monotone"
                      dataKey="interactions"
                      name="Interactions"
                      stroke="#DE6B59"
                      strokeWidth={4}
                      dot={false}
                      className="filter-glow-theme"
                      activeDot={{
                        r: 7,
                        fill: "#DE6B59",
                        stroke: "white",
                        strokeWidth: 2.5
                      }}
                      isAnimationActive={animateGraph}
                      animationDuration={500}
                      animationEasing="linear"
                      animationBegin={200}
                      pathLength={1} // Use path length for stroke-dasharray animation
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* CTA section - moved directly after the graph */}
          <div className="text-center py-8 case-study-element">
            <p className="body-text-large font-bold text-theme-primary mb-6">
              Want to be next on this list?
            </p>
            <button 
              onClick={props?.onCtaClick || (() => console.log('CTA clicked'))} 
              className="bg-theme-gradient-primary text-white px-8 py-3 rounded-full shadow-theme-md hover-bubbly-sm mx-auto inline-block"
            >
              Start your Journey
            </button>
          </div>
          
          {/* Creator Profile - moved below the CTA */}
          <div className="flex flex-col md:flex-row items-center gap-3 p-3
                    bg-theme-gradient-card
                    rounded-md border border-theme-border-light shadow-theme-md case-study-element">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0
                        ring-2 ring-[var(--theme-primary)]/80">
              <img
                src={currentCreator.avatar}
                alt={currentCreator.name}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="text-center md:text-left flex-1">
              <h3 className="text-theme-primary text-lg md:text-xl font-medium mb-0.5">
                {currentCreator.name}
              </h3>
              <p className="text-theme-secondary text-xs md:text-sm">
                {currentCreator.description}
              </p>
            </div>
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

// Helper function to merge refs
function mergeRefs(refs: React.Ref<any>[]) {
  return (value: any) => {
    refs.forEach(ref => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<any>).current = value;
      }
    });
  };
}

export default CaseStudies;