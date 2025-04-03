import React, { useState, useEffect } from "react";
import "./styles/globals.css"; // or './globals.css'
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
import { Sun, Moon } from "lucide-react";

// Global design configuration - easy to adjust
const designConfig = {
  // Layout
  maxWidth: "1200px",
  contentPadding: "2.5rem",
  sectionSpacing: "2.5rem",
  cardSpacing: "1.5rem",
  buttonSpacing: "1rem",

  // Scale
  scale: 1, // Adjust this to scale the entire UI

  // Border radius
  borderRadiusLarge: "1.5rem",
  borderRadiusMedium: "1rem",
  borderRadiusSmall: "0.75rem",
  borderRadiusRound: "2rem",

  // Shadows
  shadowLight: "0 8px 20px rgba(0, 0, 0, 0.08)",
  shadowMedium: "0 10px 25px rgba(0, 0, 0, 0.12)",
  shadowGlow: (color) => `0 8px 20px ${color}`,

  // Animation
  transitionSpeed: "0.3s",
  animationDuration: 1500,
};

const CreatorDashboard = () => {
  const [activeCreator, setActiveCreator] = useState(0);
  const [activeMetric, setActiveMetric] = useState("all");
  const [animateGraph, setAnimateGraph] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Get CSS variables based on the mode
  const getColorVars = (mode) => {
    const theme = mode ? "dark" : "light";
    return {
      primary: {
        100: `var(--primary-${theme}-100)`,
        200: `var(--primary-${theme}-200)`,
        300: `var(--primary-${theme}-300)`,
        400: `var(--primary-${theme}-400)`,
        500: `var(--primary-${theme}-500)`,
      },
      secondary: {
        100: `var(--secondary-${theme}-100)`,
        200: `var(--secondary-${theme}-200)`,
        300: `var(--secondary-${theme}-300)`,
        400: `var(--secondary-${theme}-400)`,
        500: `var(--secondary-${theme}-500)`,
      },
      text: {
        primary: `var(--text-${theme}-primary)`,
        secondary: `var(--text-${theme}-secondary)`,
        muted: `var(--text-${theme}-muted)`,
      },
      surface: {
        1: `var(--surface-${theme}-1)`,
        2: `var(--surface-${theme}-2)`,
        3: `var(--surface-${theme}-3)`,
      },
      border: {
        default: `var(--border-${theme}-default)`,
        light: `var(--border-${theme}-light)`,
      },
      special: {
        glowPrimary: `var(--special-${theme}-glowPrimary)`,
        glowAccent: `var(--special-${theme}-glowAccent)`,
      },
    };
  };

  // Select current theme colors based on mode
  const colors = getColorVars(darkMode);

  // Creator case study data
  const creators = [
    {
      id: 1,
      name: "Chris Donnelly",
      avatar: "/api/placeholder/100/100", // Placeholder for profile image
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
      avatar: "/api/placeholder/100/100", // Placeholder for profile image
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
      avatar: "/api/placeholder/100/100", // Placeholder for profile image
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
      avatar: "/api/placeholder/100/100", // Placeholder for profile image
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
      name: "Joden Clash",
      avatar: "/api/placeholder/100/100", // Placeholder for profile image
      description: "Founder of Clash Creation.",
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

  const currentCreator = creators[activeCreator];

  // Determine Y-axis domain based on active metric
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
    // For 'all', calculate separate domains for each metric
    return "auto"; // Let Recharts handle it
  };

  // Reset animation when changing creators or metrics
  useEffect(() => {
    setAnimateGraph(false);
    const timer = setTimeout(() => {
      setAnimateGraph(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCreator, activeMetric]);

  // Format numbers to include comma separators
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: darkMode
              ? "var(--tooltip-dark-bg)"
              : "var(--tooltip-light-bg)",
            padding: "12px",
            borderRadius: designConfig.borderRadiusSmall,
            boxShadow: designConfig.shadowMedium,
            border: `1px solid ${
              darkMode ? colors.border.default : "var(--tooltip-light-border)"
            }`,
            backdropFilter: "blur(5px)",
          }}
        >
          <p
            style={{
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: "8px",
              borderBottom: `1px solid ${colors.border.light}`,
              paddingBottom: "4px",
            }}
          >
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{
                color: entry.color,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "500",
                margin: "4px 0",
              }}
            >
              <span style={{ marginRight: "24px" }}>{entry.name}:</span>
              <span>{formatNumber(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom DataPoint component to show specific points on the graph
  const DataPoint = ({ cx, cy, dataKey, name, value, fill }) => {
    // Only render specific points (you can customize this logic)
    const shouldRender =
      (dataKey === "views" && value % 30000 < 10000) ||
      (dataKey === "followers" && value % 1000 < 200) ||
      (dataKey === "interactions" && value % 5000 < 1000);

    if (!shouldRender) return null;

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={fill}
          stroke={darkMode ? "var(--surface-dark-2)" : "var(--surface-light-1)"}
          strokeWidth={2}
          filter="url(#glow)"
        />
        <text
          x={cx}
          y={cy - 15}
          textAnchor="middle"
          fill={colors.text.primary}
          fontSize={12}
          fontWeight="bold"
          filter="url(#textGlow)"
        >
          {formatNumber(value)}
        </text>
      </g>
    );
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "var(--bg-dark)" : "var(--bg-light)",
        padding: designConfig.contentPadding,
        borderRadius: designConfig.borderRadiusLarge,
        boxShadow: designConfig.shadowLight,
        maxWidth: designConfig.maxWidth,
        margin: "0 auto",
        backdropFilter: "blur(10px)",
        border: `1px solid ${
          darkMode
            ? "var(--border-dark-transparent)"
            : "var(--border-light-transparent)"
        }`,
        transform: `scale(${designConfig.scale})`,
        transition: `background-color ${designConfig.transitionSpeed} ease, border-color ${designConfig.transitionSpeed} ease`,
        fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
      }}
    >
      {/* Header with mode toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: colors.text.primary,
            margin: 0,
          }}
        >
          Creator Growth Dashboard
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            backgroundColor: darkMode
              ? colors.secondary[500]
              : colors.primary[100],
            color: darkMode ? colors.text.primary : colors.primary[500],
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: darkMode
              ? `0 0 10px ${colors.special.glowAccent}`
              : `0 0 10px ${colors.special.glowPrimary}`,
            transition: `all ${designConfig.transitionSpeed} ease`,
          }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Creator Profile Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          marginBottom: designConfig.sectionSpacing,
          padding: "0 1rem", // Add padding for graph alignment
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0, // Prevent distortion
            boxShadow: `0 0 0 3px ${
              darkMode ? colors.surface[3] : "var(--surface-light-1)"
            }, 0 0 0 6px ${colors.primary[300]}, 0 0 20px ${
              colors.special.glowPrimary
            }`,
          }}
        >
          <img
            src={currentCreator.avatar}
            alt={currentCreator.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "0.25rem",
              color: "transparent",
              backgroundImage: `linear-gradient(to right, ${
                darkMode ? colors.primary[300] : colors.text.primary
              }, ${colors.secondary[400]})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: darkMode
                ? "var(--text-shadow-dark)"
                : "var(--text-shadow-light)",
              display: "inline-block",
            }}
          >
            {currentCreator.name}
          </h2>

          <p
            style={{
              color: colors.text.secondary,
              fontSize: "1rem",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {currentCreator.description}
          </p>
        </div>
      </div>

      {/* Metric Selectors */}
      <div
        style={{
          display: "flex",
          gap: designConfig.buttonSpacing,
          marginBottom: "1.5rem",
          padding: "0 1rem", // Add padding for graph alignment
        }}
      >
        {[
          { id: "all", label: "All Metrics", color: colors.text.primary },
          { id: "views", label: "Views", color: colors.primary[300] },
          { id: "followers", label: "Followers", color: colors.secondary[200] },
          {
            id: "interactions",
            label: "Interactions",
            color: colors.secondary[300],
          },
        ].map((metric) => (
          <button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id)}
            style={{
              backgroundColor:
                activeMetric === metric.id
                  ? darkMode
                    ? "var(--btn-active-dark-bg)"
                    : "var(--btn-active-light-bg)"
                  : darkMode
                  ? "var(--btn-inactive-dark-bg)"
                  : "var(--btn-inactive-light-bg)",
              color: metric.color,
              border: `2px solid ${
                activeMetric === metric.id ? metric.color : "transparent"
              }`,
              borderRadius: designConfig.borderRadiusRound,
              padding: "0.5rem 1.25rem",
              fontWeight: activeMetric === metric.id ? "bold" : "normal",
              cursor: "pointer",
              transition: `all ${designConfig.transitionSpeed} ease`,
              boxShadow:
                activeMetric === metric.id
                  ? designConfig.shadowGlow(
                      metric.id === "views"
                        ? `var(--${
                            darkMode
                              ? "primary-dark-300-alpha"
                              : "primary-light-300-alpha"
                          })`
                        : `var(--secondary-alpha)`
                    )
                  : "none",
            }}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* The Graph Component */}
      <div
        style={{
          backgroundColor: darkMode
            ? "var(--graph-bg-dark)"
            : "var(--graph-bg-light)",
          padding: "1.5rem",
          borderRadius: designConfig.borderRadiusMedium,
          marginBottom: designConfig.sectionSpacing,
          boxShadow: `inset 0 2px 8px rgba(0, 0, 0, ${
            darkMode ? "0.2" : "0.05"
          })`,
          border: darkMode
            ? "var(--graph-border-dark)"
            : "var(--graph-border-light)",
        }}
      >
        <div style={{ height: "400px" }}>
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
                <filter
                  id="textGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feFlood
                    floodColor={
                      darkMode
                        ? "var(--surface-dark-2)"
                        : "var(--surface-light-1)"
                    }
                    result="glow"
                  />
                  <feComposite
                    in="glow"
                    in2="blur"
                    operator="in"
                    result="softGlow"
                  />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colors.primary[300]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.primary[300]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient
                  id="followersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors.secondary[200]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.secondary[200]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient
                  id="interactionsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors.secondary[300]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.secondary[300]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "var(--grid-dark)" : "var(--grid-light)"}
              />
              <XAxis
                dataKey="month"
                stroke={colors.text.muted}
                tick={{ fill: colors.text.secondary }}
                tickLine={{ stroke: colors.border.light }}
              />
              <YAxis
                stroke={colors.text.muted}
                tick={{ fill: colors.text.secondary }}
                tickLine={{ stroke: colors.border.light }}
                domain={getYAxisDomain()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span style={{ color: colors.text.primary, fontWeight: 500 }}>
                    {value}
                  </span>
                )}
                wrapperStyle={{ paddingTop: "10px" }}
              />
              {(activeMetric === "all" || activeMetric === "views") && (
                <Line
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke={colors.primary[300]}
                  strokeWidth={4}
                  dot={false}
                  activeDot={{
                    r: 8,
                    fill: colors.primary[300],
                    filter: "url(#glow)",
                  }}
                  isAnimationActive={animateGraph}
                  animationDuration={designConfig.animationDuration}
                  animationEasing="ease-out"
                  filter="url(#glow)"
                />
              )}
              {(activeMetric === "all" || activeMetric === "followers") && (
                <Line
                  type="monotone"
                  dataKey="followers"
                  name="Followers"
                  stroke={colors.secondary[200]}
                  strokeWidth={4}
                  dot={false}
                  activeDot={{
                    r: 8,
                    fill: colors.secondary[200],
                    filter: "url(#glow)",
                  }}
                  isAnimationActive={animateGraph}
                  animationDuration={designConfig.animationDuration}
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
                  stroke={colors.secondary[300]}
                  strokeWidth={4}
                  dot={false}
                  activeDot={{
                    r: 8,
                    fill: colors.secondary[300],
                    filter: "url(#glow)",
                  }}
                  isAnimationActive={animateGraph}
                  animationDuration={designConfig.animationDuration}
                  animationEasing="ease-out"
                  animationBegin={600}
                  filter="url(#glow)"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Totals Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: designConfig.cardSpacing,
          marginBottom: designConfig.sectionSpacing,
          padding: "0 1rem", // Add padding for graph alignment
        }}
      >
        <div
          style={{
            backgroundColor: darkMode
              ? "var(--card-views-dark-bg)"
              : "var(--card-views-light-bg)",
            padding: "1.5rem",
            borderRadius: designConfig.borderRadiusMedium,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: designConfig.shadowGlow(colors.special.glowPrimary),
            border: `2px solid ${
              darkMode ? colors.primary[400] : colors.primary[200]
            }`,
            position: "relative",
            overflow: "hidden",
            transition: `all ${designConfig.transitionSpeed} ease`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
              background: `radial-gradient(circle at top right, ${colors.primary[300]}33, transparent 70%)`,
              zIndex: 0,
            }}
          />

          <span
            style={{
              color: colors.text.muted,
              fontSize: "1rem",
              marginBottom: "0.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Total Views
          </span>
          <span
            style={{
              color: colors.primary[400],
              fontSize: "2.25rem",
              fontWeight: "bold",
              position: "relative",
              zIndex: 1,
              textShadow: `0 0 15px ${colors.special.glowPrimary}`,
            }}
          >
            {formatNumber(currentCreator.totals.views)}
          </span>
        </div>

        <div
          style={{
            backgroundColor: darkMode
              ? "var(--card-followers-dark-bg)"
              : "var(--card-followers-light-bg)",
            padding: "1.5rem",
            borderRadius: designConfig.borderRadiusMedium,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 8px 20px var(--secondary-alpha)",
            border: `2px solid ${
              darkMode ? colors.secondary[300] : colors.secondary[100]
            }`,
            position: "relative",
            overflow: "hidden",
            transition: `all ${designConfig.transitionSpeed} ease`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
              background: `radial-gradient(circle at top right, ${colors.secondary[200]}33, transparent 70%)`,
              zIndex: 0,
            }}
          />

          <span
            style={{
              color: colors.text.muted,
              fontSize: "1rem",
              marginBottom: "0.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Total Followers
          </span>
          <span
            style={{
              color: colors.secondary[300],
              fontSize: "2.25rem",
              fontWeight: "bold",
              position: "relative",
              zIndex: 1,
              textShadow: "0 0 15px var(--secondary-glow)",
            }}
          >
            {formatNumber(currentCreator.totals.followers)}
          </span>
        </div>

        <div
          style={{
            backgroundColor: darkMode
              ? "var(--card-interactions-dark-bg)"
              : "var(--card-interactions-light-bg)",
            padding: "1.5rem",
            borderRadius: designConfig.borderRadiusMedium,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 8px 20px var(--secondary-strong-alpha)",
            border: `2px solid ${
              darkMode ? colors.secondary[400] : colors.secondary[200]
            }`,
            position: "relative",
            overflow: "hidden",
            transition: `all ${designConfig.transitionSpeed} ease`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
              background: `radial-gradient(circle at top right, ${colors.secondary[300]}33, transparent 70%)`,
              zIndex: 0,
            }}
          />

          <span
            style={{
              color: colors.text.muted,
              fontSize: "1rem",
              marginBottom: "0.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Total Interactions
          </span>
          <span
            style={{
              color: colors.secondary[400],
              fontSize: "2.25rem",
              fontWeight: "bold",
              position: "relative",
              zIndex: 1,
              textShadow: "0 0 15px rgba(33, 107, 133, 0.3)",
            }}
          >
            {formatNumber(currentCreator.totals.interactions)}
          </span>
        </div>
      </div>

      {/* Creator Selector */}
      <div
        style={{
          marginBottom: designConfig.sectionSpacing,
          padding: "0 1rem", // Add padding for alignment
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: colors.text.primary,
            marginBottom: "1rem",
          }}
        >
          Select Case Study
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: designConfig.cardSpacing,
          }}
        >
          {creators.map((creator, index) => (
            <button
              key={creator.id}
              onClick={() => setActiveCreator(index)}
              style={{
                backgroundColor:
                  activeCreator === index
                    ? darkMode
                      ? "rgba(9, 35, 47, 0.8)"
                      : "rgba(255, 245, 233, 0.8)"
                    : darkMode
                    ? "rgba(5, 19, 32, 0.5)"
                    : "rgba(255, 255, 255, 0.6)",
                padding: "1rem",
                borderRadius: designConfig.borderRadiusSmall,
                border: `2px solid ${
                  activeCreator === index
                    ? darkMode
                      ? colors.primary[300]
                      : colors.primary[200]
                    : "transparent"
                }`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                textAlign: "left",
                boxShadow:
                  activeCreator === index
                    ? designConfig.shadowGlow(colors.special.glowPrimary)
                    : "none",
                transition: `all ${designConfig.transitionSpeed} ease`,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: `2px solid ${
                    activeCreator === index
                      ? colors.primary[300]
                      : darkMode
                      ? colors.border.light
                      : colors.secondary[100]
                  }`,
                }}
              >
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div>
                <p
                  style={{
                    fontWeight: "600",
                    color: colors.text.primary,
                    margin: 0,
                    marginBottom: "0.25rem",
                  }}
                >
                  {creator.name}
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: colors.text.muted,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {creator.description.split(".")[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "1rem 1rem 0",
          borderTop: `1px solid ${
            darkMode ? "rgba(21, 77, 89, 0.3)" : "rgba(150, 197, 211, 0.3)"
          }`,
          color: colors.text.muted,
          fontSize: "0.85rem",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>
          Data represents case studies from March to October 2024
        </p>
      </div>
    </div>
  );
};

export default CreatorDashboard;
