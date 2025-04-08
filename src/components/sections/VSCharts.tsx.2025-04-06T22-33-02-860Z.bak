import React, { useState, useRef, ReactElement } from "react";
import { Section } from "../ui/section";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../ui/select";
import { TrendingUp } from "lucide-react";
import {
    ChartStyle,
    ChartTooltip,
} from '../ui/chart';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Pie, PieChart, Sector } from 'recharts';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Define types for chart data
interface ChartDataPoint {
  month: string;
  engagement: number;
  conversion: number;
}

// Define types for metrics data
interface MetricDataPoint {
  metric: string;
  value: number;
  fill: string;
}

// Define the type for chart configuration
interface ChartConfigItem {
  label: string;
  color?: string;
}

interface ChartConfig {
  [key: string]: ChartConfigItem;
}

// Type for recharts tooltip payload item
interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  payload?: MetricDataPoint;
  dataKey?: string;
  color?: string;
}

// Type for recharts tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export default function VSCharts(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Chart data for student progress
  const chartData: ChartDataPoint[] = [
    { month: "Week 1", engagement: 10, conversion: 0 },
    { month: "Week 2", engagement: 35, conversion: 5 },
    { month: "Week 4", engagement: 70, conversion: 15 },
    { month: "Week 6", engagement: 120, conversion: 35 },
    { month: "Week 8", engagement: 210, conversion: 75 },
    { month: "Week 10", engagement: 320, conversion: 140 },
  ];
  
  // Theme-aware chart colors for metrics
  const chartColors = {
    views: "var(--theme-color-views)",
    followers: "var(--theme-color-followers)",
    engagement: "var(--theme-color-engagement)",
    revenue: "var(--theme-color-revenue)"
  };
  
  // Success metrics data for pie chart
  const metricsData: MetricDataPoint[] = [
    { metric: "views", value: 45, fill: chartColors.views },
    { metric: "followers", value: 32, fill: chartColors.followers },
    { metric: "engagement", value: 18, fill: chartColors.engagement },
    { metric: "revenue", value: 25, fill: chartColors.revenue },
  ];
  
  const metricsConfig: ChartConfig = {
    metrics: {
      label: "Metrics",
    },
    views: {
      label: "Views (in millions)",
      color: chartColors.views,
    },
    followers: {
      label: "New Followers (in thousands)",
      color: chartColors.followers,
    },
    engagement: {
      label: "Engagement Rate (%)",
      color: chartColors.engagement,
    },
    revenue: {
      label: "Revenue Growth (%)",
      color: chartColors.revenue,
    },
  };

  const [activeMetric, setActiveMetric] = useState<string>(metricsData[0].metric);
  const activeIndex = metricsData.findIndex((item) => item.metric === activeMetric);
  const metrics = metricsData.map((item) => item.metric);

  useGSAP(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const distance = styles.getPropertyValue('--theme-anim-distance-md') || '-7px';
    const duration = styles.getPropertyValue('--theme-anim-duration-med') || '0.45';
    
    const ctx = gsap.context(() => {
      // Animate charts on load with staggered timing using theme variables
      gsap.fromTo(".chart-container", 
        { 
          opacity: 0, 
          y: Math.abs(parseInt(distance)) * 4 // Use theme distance but make it positive and larger for initial state
        }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: parseFloat(duration), 
          stagger: 0.2, 
          ease: "power2.out" 
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps): ReactElement | null => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-theme-primary p-2 sm:p-3 rounded-md border border-theme-border shadow-theme-sm text-xs sm:text-sm">
          <p className="text-theme-primary font-medium mb-1">{label}</p>
          {payload.map((entry, index) => {
            // Determine color class based on data key or use theme accent as fallback
            const colorKey = entry.dataKey as string || "";
            const tooltipColorClass = colorKey.includes("engagement") ? "bg-theme-accent-quaternary" : 
                                      colorKey.includes("conversion") ? "bg-theme-accent-tertiary" :
                                      colorKey.includes("views") ? "bg-theme-primary" :
                                      colorKey.includes("followers") ? "bg-theme-accent-secondary" :
                                      colorKey.includes("revenue") ? "bg-theme-accent-secondary" :
                                      "bg-theme-accent";
            
            return (
              <div key={`tooltip-${index}`} className="flex items-center gap-1.5 sm:gap-2">
                <div 
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${tooltipColorClass}`} 
                  style={entry.color && !colorKey ? { backgroundColor: entry.color } : {}}
                />
                <p className="text-theme-secondary text-xs sm:text-sm">
                  {entry.name}: {entry.value}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Section className="py-12 sm:py-16 md:py-20 bg-theme-primary border-t border-theme-border relative overflow-hidden" ref={containerRef}>
      {/* Theme-aware floating elements for visual interest - hidden on smallest screens */}
      <div className="hidden sm:block absolute -z-10 top-20 right-10 w-16 sm:w-20 h-16 sm:h-20 rounded-[40%] rotate-12 
                   opacity-[var(--theme-float-opacity)]
                   bg-[var(--theme-float-bg-primary)]
                   animate-float-slow"></div>
      <div className="hidden sm:block absolute -z-10 bottom-40 left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-[30%] -rotate-6 
                   opacity-[var(--theme-float-opacity-secondary)]
                   bg-[var(--theme-float-bg-secondary)]
                   animate-float-medium"></div>
                   
      <div className="max-w-container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-theme-primary text-2xl sm:text-3xl md:text-4xl font-medium mb-2 sm:mb-3">Case Studies</h2>
          <p className="text-theme-secondary text-sm sm:text-base max-w-2xl mx-auto">
            Visualizing real-world impact and tracking growth metrics for content creators.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Area Chart Card */}
          <div className="chart-container">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-theme-primary text-lg sm:text-xl font-medium mb-1">Student Progress Trajectory</h3>
              <p className="text-theme-secondary text-xs sm:text-sm">
                Average growth over the 10-week program
              </p>
            </div>
            
            <div className="bg-theme-secondary/30 p-3 sm:p-4 md:p-6 rounded-md border border-theme-border shadow-theme-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 sm:gap-4 text-xs">
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-theme-primary"></div>
                    <span className="text-theme-primary text-xs">Engagement</span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-theme-accent-quaternary"></div>
                    <span className="text-theme-primary text-xs">Conversions</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-theme-secondary/50 px-1.5 sm:px-2 py-0.5 rounded-full">
                  <span className="text-theme-primary text-xs font-medium">+320%</span>
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-theme-primary" />
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200} className="mt-2 sm:mt-0 sm:h-[240px]">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} stroke="var(--theme-grid-line)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-theme-tertiary text-[10px] sm:text-xs"
                    tick={{fontSize: 9, width: 30}}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={5}
                    className="text-theme-tertiary text-[10px] sm:text-xs"
                    tick={{fontSize: 9}}
                  />
                  <ChartTooltip 
                    cursor={{stroke: "var(--theme-grid-dot)", strokeDasharray: '3 3'}} 
                    content={<CustomTooltip />} 
                    wrapperStyle={{ outline: 'none' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="var(--theme-primary)"
                    strokeWidth={1.5}
                    fill="var(--theme-primary)"
                    fillOpacity={0.05}
                    activeDot={{ 
                      r: 3, 
                      fill: "var(--theme-primary)", 
                      stroke: "var(--theme-text-on-primary)", 
                      strokeWidth: 1.5 
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversion"
                    name="Conversions"
                    stroke="var(--theme-accent-quaternary)"
                    strokeWidth={1.5}
                    fill="var(--theme-accent-quaternary)"
                    fillOpacity={0.05}
                    activeDot={{ 
                      r: 3, 
                      fill: "var(--theme-accent-quaternary)", 
                      stroke: "var(--theme-text-on-primary)", 
                      strokeWidth: 1.5 
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="chart-container">
            <ChartStyle id="metrics-pie" config={metricsConfig} />
            <div className="mb-3 sm:mb-4">
              <h3 className="text-theme-primary text-lg sm:text-xl font-medium mb-1">Success Metrics</h3>
              <p className="text-theme-secondary text-xs sm:text-sm">
                Average student outcomes after completion
              </p>
            </div>
            
            <div className="bg-theme-secondary/30 p-3 sm:p-4 md:p-6 rounded-md border border-theme-border shadow-theme-sm">
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {metricsData.map((item) => (
                  <button 
                    key={item.metric}
                    className={`text-[0.65rem] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all duration-[var(--theme-transition-normal)] ${
                      activeMetric === item.metric
                        ? `text-theme-on-primary`
                        : 'bg-theme-secondary/30 text-theme-primary hover:bg-theme-secondary/50'
                    }`}
                    style={
                      activeMetric === item.metric 
                        ? { 
                            backgroundColor: item.fill,
                            boxShadow: 'var(--theme-shadow-btn)'
                          } 
                        : {}
                    }
                    onClick={() => setActiveMetric(item.metric)}
                  >
                    {item.metric}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="flex-1 mx-auto sm:mx-0 mb-4 sm:mb-0" style={{ height: '150px', width: '100%', maxWidth: '180px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <ChartTooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ outline: 'none' }}
                      />
                      <Pie
                        data={metricsData}
                        dataKey="value"
                        nameKey="metric"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={2}
                        strokeWidth={0}
                        activeIndex={activeIndex}
                        activeShape={(props: { cx: number; cy: number; innerRadius: number; outerRadius: number; startAngle: number; endAngle: number; fill: string; }) => (
                          <g>
                            <Sector
                              cx={props.cx}
                              cy={props.cy}
                              innerRadius={props.innerRadius}
                              outerRadius={props.outerRadius + 3}
                              startAngle={props.startAngle}
                              endAngle={props.endAngle}
                              fill={props.fill}
                            />
                          </g>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col items-center sm:items-start sm:ml-4 sm:mt-4">
                  <div className="text-4xl sm:text-5xl font-bold text-theme-primary mb-1 text-center sm:text-left">
                    {metricsData[activeIndex].value}
                  </div>
                  <div className="text-xs sm:text-sm text-theme-secondary text-center sm:text-left">
                    {metricsConfig[activeMetric]?.label}
                  </div>
                  <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-theme-border w-full max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                    <Select value={activeMetric} onValueChange={setActiveMetric}>
                      <SelectTrigger
                        className="h-7 sm:h-8 w-full rounded-md bg-theme-secondary/30 border-none text-theme-primary text-[0.65rem] sm:text-xs"
                        aria-label="Select a metric"
                      >
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent align="end" className="rounded-md bg-theme-primary border-theme-border">
                        {metrics.map((key) => {
                          const config = metricsConfig[key];
                          if (!config) {
                            return null;
                          }
                          return (
                            <SelectItem
                              key={key}
                              value={key}
                              className="rounded-sm [&_span]:flex text-[0.65rem] sm:text-xs"
                            >
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <span
                                  className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full"
                                  style={{
                                    backgroundColor: config.color,
                                  }}
                                />
                                {config?.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Case Studies Selector */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <h3 className="text-theme-primary text-lg sm:text-xl font-medium mb-4 sm:mb-6">Creator Success Stories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`group relative overflow-hidden rounded-md border border-theme-border bg-theme-secondary/30 p-3 sm:p-4 cursor-pointer transition-all hover:shadow-theme-sm ${i === 1 ? 'ring-2 ring-theme-primary/50' : ''}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-theme-secondary">
                    <div className="w-full h-full bg-theme-primary/10 flex items-center justify-center">
                      <span className="text-theme-primary text-[0.65rem] sm:text-xs font-bold">
                        {["JD", "TM", "KL", "AR"][i-1]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-theme-primary text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
                      {["Joden Newman", "Tia Meyers", "Kyle Loft", "Alex Roth"][i-1]}
                    </h4>
                    <p className="text-theme-tertiary text-[0.65rem] sm:text-xs">
                      {["Mentor", "Creator", "Student", "Coach"][i-1]}
                    </p>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-theme-border grid grid-cols-2 gap-2 text-[0.65rem] sm:text-xs">
                  <div>
                    <div className="text-theme-tertiary">Views</div>
                    <div className="text-theme-primary font-medium">
                      {["3.2M", "1.8M", "950K", "4.6M"][i-1]}
                    </div>
                  </div>
                  <div>
                    <div className="text-theme-tertiary">Growth</div>
                    <div className="text-theme-accent-quaternary font-medium">
                      {["+620%", "+340%", "+280%", "+410%"][i-1]}
                    </div>
                  </div>
                </div>
                
                {i === 1 && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-6 sm:border-t-8 border-r-6 sm:border-r-8 border-t-theme-primary border-r-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};