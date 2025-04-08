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
import { Badge } from "../ui/badge";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import creator case study data from the database via course-utils
import courseUtils, { Creator } from "../../lib/course-utils";

// Get creators data from the database
const creators: Creator[] = courseUtils.getCreators();

const CaseStudies = React.forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const [activeCreator, setActiveCreator] = useState(0);
  const [activeMetric, setActiveMetric] = useState("all");
  const [animateGraph, setAnimateGraph] = useState(false);
  
  // Use the current creator data
  const currentCreator = creators[activeCreator];

  // Format numbers with comma separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Reset animation when changing creators or metrics
  useEffect(() => {
    setAnimateGraph(false);
    const timer = setTimeout(() => {
      setAnimateGraph(true);
    }, 100);
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
      // Create ScrollTrigger animation
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
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--theme-bg-secondary)]/80 dark:bg-[var(--theme-bg-secondary)]/90
                      p-2.5 rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.02)]
                      shadow-theme-
                      border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light">
          <p className="font-medium text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary-b border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-1 mb-1.5">
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
      className="bg-[var(--theme-bg-primary)] min-h-screen flex flex-col justify-center py-20 dark:bg-[var(--theme-bg-primary)] relative overflow-hidden border-t border-[var(--theme-text-primary)]/10 dark:border-theme-border-light"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 dot-bg opacity-30 opacity- pointer-events-none"></div>
      
      {/* Light mode floating elements */}
      <div className="absolute top-40 left-[10%] w-40 h-40 rounded-[40%] rotate-12 opacity-5 
                    bg-[var(--theme-primary)] animate-float-slow hidden md:block dark:hidden"></div>
      <div className="absolute bottom-60 right-[15%] w-40 h-40 rounded-[30%] -rotate-6 opacity-8 
                    bg-[var(--theme-primary-hover)] animate-float-medium hidden md:block dark:hidden"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-40 left-[10%] w-40 h-40 rounded-[40%] rotate-12 opacity-10 
                    vs-btn-primary-gradient 
                    animate-float-slow hidden md:dark:block"></div>
      <div className="absolute bottom-60 right-[15%] w-40 h-40 rounded-[30%] -rotate-6 opacity-15
                    vs-btn-secondary-gradient 
                    animate-float-medium hidden md:dark:block"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-8 case-study-element">
          <Badge variant="section" size="xl" className="mb-2">
            Success Stories
          </Badge>
          <h2 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-4xl md:text-5xl font-bold mb-4">
            Creator Case Studies
          </h2>
          <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70 text-lg md:text-xl mb-2 max-w-3xl mx-auto">
            See how we've helped creators grow their audience and engagement through our proven strategies.
          </p>
        </div>

        {/* Two column layout for main content */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Left column - Creator Profile + Graph */}
          <div className="lg:w-2/3 flex flex-col case-study-element">
            {/* Creator Profile - cleaner and flatter */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-4 p-4
                      bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40
                      rounded-md border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_3px_rgba(0,0,0,0.01)] shadow-theme-">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0
                          ring-2 ring-[--primary-orange]/80 dark:ring-[--primary-orange]/80">
                <img
                  src={currentCreator.avatar}
                  alt={currentCreator.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary md:text-xl font-medium mb-0.5">
                  {currentCreator.name}
                </h3>
                <p className="text-[var(--theme-text-primary)]/70 dark:text-theme-on-primary/70 text-xs md:text-sm">
                  {currentCreator.description}
                </p>
              </div>
            </div>
          
            {/* Graph component */}
            <div ref={chartRef} className="flex-1 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40
                        p-4 rounded-md
                        border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_3px_rgba(0,0,0,0.01)] shadow-theme-">
              {/* Metric toggle buttons - moved inside graph */}
              <div className="flex flex-wrap justify-end gap-1.5 mb-3">
                {[
                  { id: "all", label: "All Metrics", color: "text-[var(--theme-text-primary)] dark:text-white" },
                  { id: "views", label: "Views", color: "text-[var(--theme-primary)] dark:text-[var(--theme-primary-light)]" },
                  { id: "followers", label: "Followers", color: "text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)]" },
                  { id: "interactions", label: "Interactions", color: "text-[var(--theme-accent-tertiary)]" },
                ].map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setActiveMetric(metric.id)}
                    className={`px-2 py-0.5 rounded-full text-xs transition-all
                              ${activeMetric === metric.id 
                                ? metric.id === "all"
                                  ? "bg-[var(--theme-bg-secondary)]/60 dark:bg-[var(--theme-bg-primary)]/80 text-[var(--theme-text-primary)] dark:text-white" 
                                  : metric.id === "views"
                                    ? "bg-[var(--theme-primary)] text-white"
                                    : metric.id === "followers"
                                      ? "bg-[var(--theme-accent-secondary)] text-white"
                                      : "bg-[var(--theme-accent-tertiary)] text-white"
                                : "bg-[var(--theme-bg-secondary)]/30 dark:bg-[var(--theme-bg-primary)]/50 hover:bg-[var(--theme-bg-secondary)]/40 hover:dark:bg-[var(--theme-bg-primary)]/70"}`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>

              <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={currentCreator.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(0,0,0,0.03)" 
                      className="dark:stroke-white/5" 
                    />
                    <XAxis 
                      dataKey="month" 
                      className="text-[var(--theme-text-primary)]/40 dark:text-theme-on-primary/40 text-xs"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      className="text-[var(--theme-text-primary)]/40 dark:text-theme-on-primary/40 text-xs"
                      domain={getYAxisDomain()}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      formatter={(value) => (
                        <span className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-xs">{value}</span>
                      )}
                      iconSize={8}
                      wrapperStyle={{ fontSize: '12px', paddingTop: "8px" }}
                    />
                    {(activeMetric === "all" || activeMetric === "views") && (
                      <Line
                        type="monotone"
                        dataKey="views"
                        name="Views"
                        stroke="#FEA35D"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                          r: 6,
                          fill: "#FEA35D",
                          stroke: "white",
                          strokeWidth: 2
                        }}
                        isAnimationActive={animateGraph}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    )}
                    {(activeMetric === "all" || activeMetric === "followers") && (
                      <Line
                        type="monotone"
                        dataKey="followers"
                        name="Followers"
                        stroke="#387292"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                          r: 6,
                          fill: "#387292",
                          stroke: "white",
                          strokeWidth: 2
                        }}
                        isAnimationActive={animateGraph}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={300}
                      />
                    )}
                    {(activeMetric === "all" || activeMetric === "interactions") && (
                      <Line
                        type="monotone"
                        dataKey="interactions"
                        name="Interactions"
                        stroke="#DE6B59"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                          r: 6,
                          fill: "#DE6B59",
                          stroke: "white",
                          strokeWidth: 2
                        }}
                        isAnimationActive={animateGraph}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={600}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right column - Stats + Case Studies */}
          <div className="lg:w-1/3 flex flex-col justify-between case-study-element">
            {/* Stats cards - flatter design */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Views card */}
              <div className="bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40 
                          rounded-md p-3
                          border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_2px_rgba(0,0,0,0.01)] shadow-theme-
                          transition-all duration-200
                          hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60
                          overflow-hidden">
                <div className="flex items-center">
                  <div className="w-1.5 h-12 bg-[var(--theme-primary)]/70  rounded-full mr-2.5"></div>
                  <div className="flex-1">
                    <div className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs">Views</div>
                    <div className="text-[var(--theme-primary)]  text-lg font-semibold">
                      {formatNumber(currentCreator.totals.views)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Followers card */}
              <div className="bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40 
                          rounded-md p-3
                          border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_2px_rgba(0,0,0,0.01)] shadow-theme-
                          transition-all duration-200
                          hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60
                          overflow-hidden">
                <div className="flex items-center">
                  <div className="w-1.5 h-12 bg-[var(--theme-accent-secondary)]/70  rounded-full mr-2.5"></div>
                  <div className="flex-1">
                    <div className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs">Followers</div>
                    <div className="text-[var(--theme-accent-secondary)]  text-lg font-semibold">
                      {formatNumber(currentCreator.totals.followers)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interactions card - full width */}
              <div className="col-span-2 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40 
                          rounded-md p-3
                          border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_2px_rgba(0,0,0,0.01)] shadow-theme-
                          transition-all duration-200
                          hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60">
                <div className="flex items-center">
                  <div className="w-1.5 h-12 bg-[var(--theme-accent-tertiary)]/70  rounded-full mr-2.5"></div>
                  <div className="flex-1">
                    <div className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs">Interactions</div>
                    <div className="text-[var(--theme-accent-tertiary)]  text-lg font-semibold">
                      {formatNumber(currentCreator.totals.interactions)}
                    </div>
                  </div>
                  <div className="bg-[var(--theme-accent-tertiary)]/10 /20 p-1.5 rounded-full">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#DE6B59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Case study selector - flatter, more subtle */}
            <div className="flex-1 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40 
                      p-4 rounded-md 
                      border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_3px_rgba(0,0,0,0.01)] shadow-theme-">
              <h3 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-sm font-medium mb-3 flex items-center">
                <span className="inline-block w-1 h-4 bg-[var(--theme-primary)]/70  mr-2 rounded-full"></span>
                Success Stories
              </h3>

              <div className="grid grid-cols-1 gap-1.5">
                {creators.map((creator, index) => (
                  <button
                    key={creator.id}
                    onClick={() => setActiveCreator(index)}
                    className={`relative 
                              bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-primary)]/50
                              rounded-md py-1.5 px-2.5
                              border-l-2 ${activeCreator === index 
                                ? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary)]' 
                                : 'border-transparent'}
                              transition-all duration-300
                              hover:translate-x-[2px] hover:bg-[var(--theme-bg-secondary)]/40 dark:hover:bg-[var(--theme-bg-primary)]/70
                              flex items-center gap-2 text-left
                              ${activeCreator === index 
                                ? 'bg-[var(--theme-bg-secondary)]/40 dark:bg-[var(--theme-bg-primary)]/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)]' 
                                : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 
                                  ${activeCreator === index 
                                    ? 'ring-1 ring-[--primary-orange] dark:ring-[--primary-orange]' 
                                    : 'ring-1 ring-[--text-navy]/5 dark:ring-white/10'}`}>
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-medium text-sm truncate">
                        {creator.name}
                      </h4>
                      <p className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs truncate">
                        {creator.description.split(".")[0].substring(0, 30)}...
                      </p>
                    </div>
                    {activeCreator === index && (
                      <div className="h-4 w-1 bg-[var(--theme-primary)]  rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative effects */}
      <div className="absolute bottom-0 left-0 right-0 h-20 
                   bg-gradient-to-t from-[var(--theme-bg-secondary)]/10 to-transparent 
                   opacity-20 opacity- pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 
                   bg-gradient-to-t from-[var(--theme-primary)]/5 to-transparent 
                   opacity-0 opacity- pointer-events-none"></div>
    </Section>
  );
});

// Helper function to merge refs
function mergeRefs(refs) {
  return (value) => {
    refs.forEach(ref => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(value);
      } else {
        ref.current = value;
      }
    });
  };
}

export default CaseStudies;
