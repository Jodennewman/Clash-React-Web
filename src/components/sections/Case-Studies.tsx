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
        <div className="bg-gradient-to-br from-white to-[--bg-cream]/80
                      dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                      p-3 rounded-md shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
                      dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                      border border-white/40 dark:border-white/5">
          <p className="font-semibold text-[--text-navy] dark:text-white border-b border-[--text-navy]/10 dark:border-white/10 pb-1 mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex justify-between items-center my-1 font-medium">
              <span className="mr-6" style={{ color: entry.color }}>{entry.name}:</span>
              <span style={{ color: entry.color }}>{formatNumber(entry.value)}</span>
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
      className="min-h-screen flex flex-col justify-center py-12 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] relative overflow-hidden border-t border-[--text-navy]/10 dark:border-[--text-cream]/10"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 dot-bg opacity-30 dark:opacity-10 pointer-events-none"></div>
      
      {/* Light mode floating elements */}
      <div className="absolute top-40 left-[10%] w-40 h-40 rounded-[40%] rotate-12 opacity-5 
                    bg-[--primary-orange] animate-float-slow hidden md:block dark:hidden"></div>
      <div className="absolute bottom-60 right-[15%] w-40 h-40 rounded-[30%] -rotate-6 opacity-8 
                    bg-[--primary-orange-hover] animate-float-medium hidden md:block dark:hidden"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-40 left-[10%] w-40 h-40 rounded-[40%] rotate-12 opacity-10 
                    bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                    animate-float-slow hidden md:dark:block"></div>
      <div className="absolute bottom-60 right-[15%] w-40 h-40 rounded-[30%] -rotate-6 opacity-15
                    bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                    animate-float-medium hidden md:dark:block"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-8 case-study-element">
          <Badge variant="section" size="xl" className="mb-2">
            Success Stories
          </Badge>
          <h2 className="text-[--text-navy] dark:text-white text-4xl md:text-5xl font-bold mb-4">
            Creator Case Studies
          </h2>
          <p className="text-[--text-navy] dark:text-white/70 text-lg md:text-xl mb-2 max-w-3xl mx-auto">
            See how we've helped creators grow their audience and engagement through our proven strategies.
          </p>
        </div>

        {/* Two column layout for main content */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Left column - Creator Profile + Graph */}
          <div className="lg:w-2/3 flex flex-col case-study-element">
            {/* Creator Profile - moved to top left */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-5 p-5
                      bg-gradient-to-br from-white to-[--bg-cream]/90 
                      dark:bg-gradient-to-br dark:from-[--bg-navy-darker] dark:to-[rgba(12,67,99,0.95)]
                      rounded-2xl border border-white/40 dark:border-white/15
                      shadow-[3px_3px_10px_rgba(0,0,0,0.03)] 
                      dark:shadow-[0_0_20px_rgba(53,115,128,0.15)]">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0
                          shadow-[0_0_0_3px_rgba(255,255,255,0.6),0_0_0_5px_#FEA35D,0_0_20px_rgba(254,163,93,0.2)]
                          dark:shadow-[0_0_0_3px_rgba(12,67,99,0.8),0_0_0_5px_#FEA35D,0_0_20px_rgba(254,163,93,0.3)]">
                <img
                  src={currentCreator.avatar}
                  alt={currentCreator.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 className="text-[--text-navy] dark:text-white text-xl md:text-3xl font-bold mb-2">
                  {currentCreator.name}
                </h3>
                <p className="text-[--text-navy]/80 dark:text-white/70 md:text-base max-w-2xl">
                  {currentCreator.description}
                </p>
              </div>
            </div>
          
            {/* Graph component */}
            <div ref={chartRef} className="flex-1 bg-gradient-to-br from-white to-[--bg-cream]/95
                        dark:bg-gradient-to-br dark:from-[--bg-navy-darker] dark:to-[rgba(12,67,99,0.95)]
                        p-5 rounded-2xl
                        border border-white/40 dark:border-white/15
                        shadow-[3px_3px_10px_rgba(0,0,0,0.03)] 
                        dark:shadow-[0_0_20px_rgba(53,115,128,0.15)]">
              {/* Metric toggle buttons - moved inside graph */}
              <div className="flex flex-wrap justify-end gap-2 mb-2">
                {[
                  { id: "all", label: "All Metrics", color: "text-[--text-navy] dark:text-white" },
                  { id: "views", label: "Views", color: "text-[--primary-orange]" },
                  { id: "followers", label: "Followers", color: "text-[--secondary-teal]" },
                  { id: "interactions", label: "Interactions", color: "text-[--accent-coral]" },
                ].map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setActiveMetric(metric.id)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-[--transition-bounce]
                              ${activeMetric === metric.id 
                                ? `border-[--primary-orange] dark:border-[--primary-orange-light] 
                                   bg-white/50 dark:bg-[--bg-navy-darker]/50
                                   shadow-[0_4px_8px_rgba(254,163,93,0.15)] dark:shadow-[0_4px_8px_rgba(254,163,93,0.2)]` 
                                : `border-transparent bg-white/20 dark:bg-white/5`}
                              hover:translate-y-[-2px]`}
                  >
                    <span className={metric.color}>
                      {metric.label}
                    </span>
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
                      stroke="rgba(18, 46, 59, 0.15)" 
                      className="dark:stroke-white/15" 
                    />
                    <XAxis 
                      dataKey="month" 
                      className="text-[--text-navy]/70 dark:text-white/50 font-medium"
                      stroke="#357380"
                      strokeWidth={1.5}
                    />
                    <YAxis 
                      className="text-[--text-navy]/70 dark:text-white/50 font-medium"
                      domain={getYAxisDomain()}
                      stroke="#357380"
                      strokeWidth={1.5}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      formatter={(value) => (
                        <span className="text-[--text-navy] dark:text-white font-medium">{value}</span>
                      )}
                      wrapperStyle={{ paddingTop: "5px" }}
                    />
                    {(activeMetric === "all" || activeMetric === "views") && (
                      <Line
                        type="monotone"
                        dataKey="views"
                        name="Views"
                        stroke="#FEA35D"
                        strokeWidth={4}
                        dot={false}
                        activeDot={{
                          r: 8,
                          fill: "#FEA35D",
                          filter: "url(#glow)",
                        }}
                        isAnimationActive={animateGraph}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        filter="url(#glow)"
                      />
                    )}
                    {(activeMetric === "all" || activeMetric === "followers") && (
                      <Line
                        type="monotone"
                        dataKey="followers"
                        name="Followers"
                        stroke="#357380"
                        strokeWidth={4}
                        dot={false}
                        activeDot={{
                          r: 8,
                          fill: "#357380",
                          filter: "url(#glow)",
                        }}
                        isAnimationActive={animateGraph}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={300}
                        filter="url(#glow)"
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
                        activeDot={{
                          r: 8,
                          fill: "#DE6B59",
                          filter: "url(#glow)",
                        }}
                        isAnimationActive={animateGraph}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={600}
                        filter="url(#glow)"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right column - Stats + Case Studies */}
          <div className="lg:w-1/3 flex flex-col justify-between case-study-element">
            {/* Stats cards */}
            <div className="space-y-4 mb-6">
              {/* Views card */}
              <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/95
                          dark:bg-gradient-to-br dark:from-[--bg-navy-darker] dark:to-[rgba(12,67,99,0.95)]
                          rounded-2xl p-5 flex items-center
                          border border-white/40 dark:border-white/15 
                          shadow-[3px_3px_10px_rgba(0,0,0,0.03)] 
                          dark:shadow-[0_0_20px_rgba(53,115,128,0.15)]
                          transition-all duration-[--transition-bounce]
                          hover:translate-y-[-5px] hover:scale-[1.03] hover:rotate-[0.5deg]
                          hover:shadow-[3px_3px_15px_rgba(0,0,0,0.08)] 
                          dark:hover:shadow-[0_0_25px_rgba(53,115,128,0.2)] overflow-hidden
                          h-[110px] md:h-[120px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[--primary-orange]/10 dark:bg-[--primary-orange]/20 
                            rounded-full -translate-x-1/3 -translate-y-1/3 opacity-60"></div>
                <div className="relative z-10 w-full">
                  <div className="text-[--text-navy]/60 dark:text-white/70 mb-2 text-lg font-semibold">Total Views</div>
                  <div className="text-[--primary-orange] dark:text-[--primary-orange-light] text-4xl md:text-5xl lg:text-6xl font-extrabold 
                              drop-shadow-sm dark:drop-shadow-[0_2px_4px_rgba(254,163,93,0.3)]">
                    {formatNumber(currentCreator.totals.views)}
                  </div>
                </div>
              </div>
              
              {/* Followers card */}
              <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/95
                          dark:bg-gradient-to-br dark:from-[--bg-navy-darker] dark:to-[rgba(12,67,99,0.95)]
                          rounded-2xl p-5 flex items-center
                          border border-white/40 dark:border-white/15 
                          shadow-[3px_3px_10px_rgba(0,0,0,0.03)] 
                          dark:shadow-[0_0_20px_rgba(53,115,128,0.15)]
                          transition-all duration-[--transition-bounce]
                          hover:translate-y-[-5px] hover:scale-[1.03] hover:rotate-[0.5deg]
                          hover:shadow-[3px_3px_15px_rgba(0,0,0,0.08)] 
                          dark:hover:shadow-[0_0_25px_rgba(53,115,128,0.2)] overflow-hidden
                          h-[110px] md:h-[120px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[--secondary-teal]/10 dark:bg-[--secondary-teal]/20 
                            rounded-full -translate-x-1/3 -translate-y-1/3 opacity-60"></div>
                <div className="relative z-10 w-full">
                  <div className="text-[--text-navy]/60 dark:text-white/70 mb-2 text-lg font-semibold">Total Followers</div>
                  <div className="text-[--secondary-teal] dark:text-[--secondary-teal-light] text-4xl md:text-5xl lg:text-6xl font-extrabold 
                              drop-shadow-sm dark:drop-shadow-[0_2px_4px_rgba(53,115,128,0.3)]">
                    {formatNumber(currentCreator.totals.followers)}
                  </div>
                </div>
              </div>
              
              {/* Interactions card */}
              <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/95
                          dark:bg-gradient-to-br dark:from-[--bg-navy-darker] dark:to-[rgba(12,67,99,0.95)]
                          rounded-2xl p-5 flex items-center
                          border border-white/40 dark:border-white/15
                          shadow-[3px_3px_10px_rgba(0,0,0,0.03)] 
                          dark:shadow-[0_0_20px_rgba(53,115,128,0.15)]
                          transition-all duration-[--transition-bounce]
                          hover:translate-y-[-5px] hover:scale-[1.03] hover:rotate-[0.5deg]
                          hover:shadow-[3px_3px_15px_rgba(0,0,0,0.08)] 
                          dark:hover:shadow-[0_0_25px_rgba(53,115,128,0.2)] overflow-hidden
                          h-[110px] md:h-[120px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[--accent-coral]/10 dark:bg-[--accent-coral]/20 
                            rounded-full -translate-x-1/3 -translate-y-1/3 opacity-60"></div>
                <div className="relative z-10 w-full">
                  <div className="text-[--text-navy]/60 dark:text-white/70 mb-2 text-lg font-semibold">Total Interactions</div>
                  <div className="text-[--accent-coral] dark:text-[--accent-coral] text-4xl md:text-5xl lg:text-6xl font-extrabold 
                              drop-shadow-sm dark:drop-shadow-[0_2px_4px_rgba(222,107,89,0.3)]">
                    {formatNumber(currentCreator.totals.interactions)}
                  </div>
                </div>
              </div>
            </div>

            {/* Case study selector */}
            <div className="bg-gradient-to-br from-white to-[--bg-cream]/95
                        dark:bg-gradient-to-br dark:from-[--bg-navy-darker] dark:to-[rgba(12,67,99,0.95)]
                        p-5 rounded-2xl
                        border border-white/40 dark:border-white/15
                        shadow-[3px_3px_10px_rgba(0,0,0,0.03)] 
                        dark:shadow-[0_0_20px_rgba(53,115,128,0.15)]">
              <h3 className="text-[--text-navy] dark:text-white text-lg font-bold mb-3">
                More Success Stories
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {creators.map((creator, index) => (
                  <button
                    key={creator.id}
                    onClick={() => setActiveCreator(index)}
                    className={`relative 
                              bg-gradient-to-r from-white/40 to-transparent dark:from-white/5 dark:to-transparent
                              rounded-xl py-2 px-3
                              border-l-4 ${activeCreator === index 
                                ? 'border-[--primary-orange] dark:border-[--primary-orange]' 
                                : 'border-transparent'}
                              transition-all duration-[--transition-bounce]
                              hover:translate-x-[3px] hover:bg-white/60 dark:hover:bg-white/10
                              flex items-center gap-3 text-left cursor-pointer
                              ${activeCreator === index 
                                ? 'bg-white/60 dark:bg-white/10' 
                                : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 
                                  border-2 ${activeCreator === index 
                                    ? 'border-[--primary-orange]' 
                                    : 'border-[--text-navy]/10 dark:border-white/20'}`}>
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[--text-navy] dark:text-white font-semibold text-base truncate">
                        {creator.name}
                      </h4>
                      <p className="text-[--text-navy]/60 dark:text-white/60 text-sm truncate">
                        {creator.description.split(".")[0].substring(0, 30)}...
                      </p>
                    </div>
                    {activeCreator === index && (
                      <div className="w-2 h-2 bg-[--primary-orange] dark:bg-[--primary-orange] rounded-full"></div>
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
                   bg-gradient-to-t from-[--bg-cream-darker]/10 to-transparent 
                   opacity-20 dark:opacity-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 
                   bg-gradient-to-t from-[--primary-orange]/5 to-transparent 
                   opacity-0 dark:opacity-30 pointer-events-none"></div>
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
