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
import { Sun, Moon } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Creator case study data
const creators = [
  {
    id: 1,
    name: "Chris Donnelly",
    avatar: "/assets/main/DataBaseThumbnails/JodenExplain0.webp",
    description:
      "Founder of Verb Brands. We helped Chris grow his thought leadership content from March to August 2024, focusing on luxury branding insights.",
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
    avatar: "/assets/main/DataBaseThumbnails/TiaExplainng0.webp",
    description:
      "Founder of The Fitting Room. Charlotte partnered with us from January to July 2024 to expand her fashion tech influence.",
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
    ],
    totals: {
      views: 28377845,
      followers: 153258,
      interactions: 2304322,
    },
  },
  {
    id: 3,
    name: "James Watt",
    avatar: "/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp",
    description:
      "Co-founder of BrewDog. We collaborated with James from April to October 2024 to build an authentic personal brand separate from his company identity.",
    data: [
      { month: "Oct", views: 0, followers: 0, interactions: 0 },
      { month: "Nov", views: 7123640, followers: 7649, interactions: 232779 },
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
    totals: {
      views: 9880702,
      followers: 11611,
      interactions: 304054,
    },
  },
  {
    id: 4,
    name: "Ben Askins",
    avatar: "/assets/main/DataBaseThumbnails/data-led0.webp",
    description:
      "Managing Director of Verb. Ben worked with us from February to August 2024 to position himself as a digital marketing thought leader.",
    data: [
      { month: "Feb", views: 7263, followers: 104, interactions: 197 },
      { month: "Mar", views: 420099, followers: 1248, interactions: 42877 },
      { month: "Apr", views: 4669887, followers: 1913, interactions: 300616 },
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
    name: "Joden Newman",
    avatar: "/assets/main/DataBaseThumbnails/Joden React0.webp",
    description: "Founder of Vertical Shortcut.",
    data: [
      { month: "Feb", views: 90000, followers: 8322, interactions: 12678 },
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
];

const CaseStudies = () => {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const [activeCreator, setActiveCreator] = useState(0);
  const [activeMetric, setActiveMetric] = useState("all");
  const [animateGraph, setAnimateGraph] = useState(false);
  
  // Use the current creator data
  const currentCreator = creators[activeCreator];

  // Format numbers with comma separators
  const formatNumber = (num) => {
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
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] relative overflow-hidden border-t border-[--text-navy]/10 dark:border-[--text-cream]/10"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 dot-bg opacity-30 dark:opacity-10 pointer-events-none"></div>
      
      {/* Light mode floating elements */}
      <div className="absolute top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-5 
                    bg-[--primary-orange] animate-float-slow hidden md:block dark:hidden"></div>
      <div className="absolute bottom-60 right-[15%] w-36 h-36 rounded-[30%] -rotate-6 opacity-8 
                    bg-[--primary-orange-hover] animate-float-medium hidden md:block dark:hidden"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-10 
                    bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                    animate-float-slow hidden md:dark:block"></div>
      <div className="absolute bottom-60 right-[15%] w-36 h-36 rounded-[30%] -rotate-6 opacity-15
                    bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                    animate-float-medium hidden md:dark:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 case-study-element">
          <Badge variant="section" size="xl" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-[--text-navy] dark:text-white text-4xl md:text-5xl font-bold mb-6">
            Creator Case Studies
          </h2>
          <p className="text-[--text-navy] dark:text-white/70 text-xl mb-2 max-w-3xl mx-auto">
            See how we've helped creators grow their audience and engagement through our proven strategies.
          </p>
        </div>

        {/* Creator Profile */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 case-study-element">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0
                        shadow-[0_0_0_3px_rgba(255,255,255,0.6),0_0_0_6px_#FEA35D,0_0_20px_rgba(254,163,93,0.2)]
                        dark:shadow-[0_0_0_3px_rgba(12,67,99,0.8),0_0_0_6px_#FEA35D,0_0_20px_rgba(254,163,93,0.3)]">
            <img
              src={currentCreator.avatar}
              alt={currentCreator.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-[--text-navy] dark:text-white text-2xl md:text-3xl font-bold mb-2">
              {currentCreator.name}
            </h3>
            <p className="text-[--text-navy]/80 dark:text-white/70 max-w-2xl">
              {currentCreator.description}
            </p>
          </div>
        </div>

        {/* Metric toggle buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 case-study-element">
          {[
            { id: "all", label: "All Metrics", color: "text-[--text-navy] dark:text-white" },
            { id: "views", label: "Views", color: "text-[--primary-orange]" },
            { id: "followers", label: "Followers", color: "text-[--secondary-teal]" },
            { id: "interactions", label: "Interactions", color: "text-[--accent-coral]" },
          ].map((metric) => (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={`px-5 py-2 rounded-full border-2 transition-all duration-[--transition-bounce]
                        ${activeMetric === metric.id 
                          ? `border-[--primary-orange] dark:border-[--primary-orange-light] 
                             bg-white/50 dark:bg-[--bg-navy-darker]/50
                             shadow-[0_4px_12px_rgba(254,163,93,0.15)] dark:shadow-[0_4px_12px_rgba(254,163,93,0.2)]` 
                          : `border-transparent bg-white/20 dark:bg-white/5`}
                        hover:translate-y-[-2px]`}
            >
              <span className={metric.color}>
                {metric.label}
              </span>
            </button>
          ))}
        </div>

        {/* Graph component */}
        <div ref={chartRef} className="case-study-element bg-gradient-to-br from-white to-[--bg-cream]/90
                      dark:bg-gradient-to-br dark:from-[--card-bg-navy] dark:to-[rgba(12,67,99,0.7)]
                      p-6 rounded-[--border-radius-lg] mb-10
                      border border-white/40 dark:border-white/5
                      shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                      dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentCreator.data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FEA35D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FEA35D" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="followersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#357380" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#357380" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="interactionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DE6B59" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#DE6B59" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(18, 46, 59, 0.1)" 
                  className="dark:stroke-white/10" 
                />
                <XAxis 
                  dataKey="month" 
                  className="text-[--text-navy]/70 dark:text-white/50"
                />
                <YAxis 
                  className="text-[--text-navy]/70 dark:text-white/50"
                  domain={getYAxisDomain()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  formatter={(value) => (
                    <span className="text-[--text-navy] dark:text-white font-medium">{value}</span>
                  )}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                {(activeMetric === "all" || activeMetric === "views") && (
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#FEA35D"
                    strokeWidth={3}
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
                    strokeWidth={3}
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
                    strokeWidth={3}
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

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 case-study-element">
          {/* Views card */}
          <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/80 
                        dark:bg-gradient-to-br dark:from-[--card-bg-navy] dark:to-[rgba(12,67,99,0.8)]
                        rounded-[--border-radius-lg] p-6 
                        border border-white/40 dark:border-white/5 
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                        transition-all duration-[--transition-bounce]
                        hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                        hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] 
                        dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[--primary-orange]/10 dark:bg-[--primary-orange]/20 
                          rounded-full -translate-x-1/4 -translate-y-1/4 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-[--text-navy]/60 dark:text-white/60 mb-2">Total Views</div>
              <div className="text-[--primary-orange] dark:text-[--primary-orange-light] text-4xl font-bold 
                            dark:text-shadow-md">
                {formatNumber(currentCreator.totals.views)}
              </div>
            </div>
          </div>
          
          {/* Followers card */}
          <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/80 
                        dark:bg-gradient-to-br dark:from-[--card-bg-navy] dark:to-[rgba(12,67,99,0.8)]
                        rounded-[--border-radius-lg] p-6 
                        border border-white/40 dark:border-white/5 
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                        transition-all duration-[--transition-bounce]
                        hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                        hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] 
                        dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[--secondary-teal]/10 dark:bg-[--secondary-teal]/20 
                          rounded-full -translate-x-1/4 -translate-y-1/4 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-[--text-navy]/60 dark:text-white/60 mb-2">Total Followers</div>
              <div className="text-[--secondary-teal] dark:text-[--secondary-teal-light] text-4xl font-bold 
                            dark:text-shadow-md">
                {formatNumber(currentCreator.totals.followers)}
              </div>
            </div>
          </div>
          
          {/* Interactions card */}
          <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/80 
                        dark:bg-gradient-to-br dark:from-[--card-bg-navy] dark:to-[rgba(12,67,99,0.8)]
                        rounded-[--border-radius-lg] p-6 
                        border border-white/40 dark:border-white/5 
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                        transition-all duration-[--transition-bounce]
                        hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                        hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] 
                        dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[--accent-coral]/10 dark:bg-[--accent-coral]/20 
                          rounded-full -translate-x-1/4 -translate-y-1/4 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-[--text-navy]/60 dark:text-white/60 mb-2">Total Interactions</div>
              <div className="text-[--accent-coral] dark:text-[--accent-coral] text-4xl font-bold 
                            dark:text-shadow-md">
                {formatNumber(currentCreator.totals.interactions)}
              </div>
            </div>
          </div>
        </div>

        {/* Case study selector */}
        <div className="case-study-element">
          <h3 className="text-[--text-navy] dark:text-white text-xl font-bold mb-6">
            Browse Case Studies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {creators.map((creator, index) => (
              <button
                key={creator.id}
                onClick={() => setActiveCreator(index)}
                className={`relative bg-gradient-to-br from-white to-[--bg-cream]/80 
                          dark:bg-gradient-to-br dark:from-[--card-bg-navy] dark:to-[rgba(12,67,99,0.8)]
                          rounded-[--border-radius-lg] p-4
                          border ${activeCreator === index 
                            ? 'border-[--primary-orange] dark:border-[--primary-orange]' 
                            : 'border-white/40 dark:border-white/5'}
                          shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                          dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                          transition-all duration-[--transition-bounce]
                          hover:translate-y-[-4px] hover:scale-[1.02]
                          hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] 
                          dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]
                          flex flex-col items-center text-center cursor-pointer
                          ${activeCreator === index 
                            ? 'ring-2 ring-[--primary-orange]/30 dark:ring-[--primary-orange]/40' 
                            : ''}`}
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden mb-3 
                              border-2 ${activeCreator === index 
                                ? 'border-[--primary-orange]' 
                                : 'border-[--text-navy]/10 dark:border-white/20'}`}>
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-[--text-navy] dark:text-white font-semibold mb-1">
                  {creator.name}
                </h4>
                <p className="text-[--text-navy]/60 dark:text-white/60 text-sm line-clamp-2">
                  {creator.description.split(".")[0]}
                </p>
              </button>
            ))}
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
};

export default CaseStudies;
