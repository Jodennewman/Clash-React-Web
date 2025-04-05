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
  
  // Success metrics data for pie chart
  const metricsData: MetricDataPoint[] = [
    { metric: "views", value: 45, fill: "var(--theme-color-views)" },
    { metric: "followers", value: 32, fill: "var(--theme-color-followers)" },
    { metric: "engagement", value: 18, fill: "var(--theme-color-engagement)" },
    { metric: "revenue", value: 25, fill: "var(--theme-color-revenue)" },
  ];
  
  const metricsConfig: ChartConfig = {
    metrics: {
      label: "Metrics",
    },
    views: {
      label: "Views (in millions)",
      color: "var(--theme-color-views)",
    },
    followers: {
      label: "New Followers (in thousands)",
      color: "var(--theme-color-followers)",
    },
    engagement: {
      label: "Engagement Rate (%)",
      color: "var(--theme-color-engagement)",
    },
    revenue: {
      label: "Revenue Growth (%)",
      color: "var(--theme-color-revenue)",
    },
  };

  const [activeMetric, setActiveMetric] = useState<string>(metricsData[0].metric);
  const activeIndex = metricsData.findIndex((item) => item.metric === activeMetric);
  const metrics = metricsData.map((item) => item.metric);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate charts on load with staggered timing
      gsap.fromTo(".chart-container", 
        { 
          opacity: 0, 
          y: 30 
        }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
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
        <div className="bg-theme-primary p-3 rounded-md border border-theme-border shadow-theme-sm">
          <p className="text-theme-primary font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full bg-theme-accent" 
                style={entry.color ? { backgroundColor: entry.color } : {}}
              />
              <p className="text-theme-secondary text-sm">
                {entry.name}: {entry.value}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Section className="py-20 bg-theme-primary border-t border-theme-border" ref={containerRef}>
      <div className="max-w-container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-theme-primary text-3xl md:text-4xl font-medium mb-3">Case Studies</h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Visualizing real-world impact and tracking growth metrics for content creators.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Area Chart Card */}
          <div className="chart-container">
            <div className="mb-4">
              <h3 className="text-theme-primary text-xl font-medium mb-1">Student Progress Trajectory</h3>
              <p className="text-theme-secondary text-sm">
                Average growth over the 10-week program
              </p>
            </div>
            
            <div className="bg-theme-secondary/30 p-6 rounded-md border border-theme-border shadow-theme-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-theme-primary"></div>
                    <span className="text-theme-primary text-xs">Engagement</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-theme-accent-quaternary"></div>
                    <span className="text-theme-primary text-xs">Conversions</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-theme-secondary/50 px-2 py-0.5 rounded-full">
                  <span className="text-theme-primary text-xs font-medium">+320%</span>
                  <TrendingUp className="h-3 w-3 text-theme-primary" />
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={240}>
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
                    className="text-theme-tertiary text-xs"
                    tick={{fontSize: 11}}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={5}
                    className="text-theme-tertiary text-xs"
                    tick={{fontSize: 11}}
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
                    strokeWidth={2}
                    fill="var(--theme-primary)"
                    fillOpacity={0.05}
                    activeDot={{ r: 4, fill: "var(--theme-primary)", stroke: "white", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversion"
                    name="Conversions"
                    stroke="var(--theme-accent-quaternary)"
                    strokeWidth={2}
                    fill="var(--theme-accent-quaternary)"
                    fillOpacity={0.05}
                    activeDot={{ r: 4, fill: "var(--theme-accent-quaternary)", stroke: "white", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="chart-container">
            <ChartStyle id="metrics-pie" config={metricsConfig} />
            <div className="mb-4">
              <h3 className="text-theme-primary text-xl font-medium mb-1">Success Metrics</h3>
              <p className="text-theme-secondary text-sm">
                Average student outcomes after completion
              </p>
            </div>
            
            <div className="bg-theme-secondary/30 p-6 rounded-md border border-theme-border shadow-theme-sm">
              <div className="flex flex-wrap gap-2 mb-4">
                {metricsData.map((item) => (
                  <button 
                    key={item.metric}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                      activeMetric === item.metric
                        ? `bg-theme-accent text-white`
                        : 'bg-theme-secondary/30 text-theme-primary hover:bg-theme-secondary/50'
                    }`}
                    style={
                      activeMetric === item.metric 
                        ? { backgroundColor: item.fill } 
                        : {}
                    }
                    onClick={() => setActiveMetric(item.metric)}
                  >
                    {item.metric}
                  </button>
                ))}
              </div>
              
              <div className="flex items-start">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <ChartTooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ outline: 'none' }}
                      />
                      <Pie
                        data={metricsData}
                        dataKey="value"
                        nameKey="metric"
                        innerRadius={40}
                        outerRadius={70}
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
                
                <div className="flex flex-col items-start ml-4 mt-4">
                  <div className="text-5xl font-bold text-theme-primary mb-1">
                    {metricsData[activeIndex].value}
                  </div>
                  <div className="text-sm text-theme-secondary">
                    {metricsConfig[activeMetric]?.label}
                  </div>
                  <div className="mt-4 pt-4 border-t border-theme-border w-full">
                    <Select value={activeMetric} onValueChange={setActiveMetric}>
                      <SelectTrigger
                        className="h-8 w-full rounded-md bg-theme-secondary/30 border-none text-theme-primary text-xs"
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
                              className="rounded-sm [&_span]:flex text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="flex h-2 w-2 shrink-0 rounded-full"
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
        <div className="mt-12">
          <h3 className="text-theme-primary text-xl font-medium mb-6">Creator Success Stories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`group relative overflow-hidden rounded-md border border-theme-border bg-theme-secondary/30 p-4 cursor-pointer transition-all hover:shadow-theme-sm ${i === 1 ? 'ring-2 ring-theme-primary/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-theme-secondary">
                    <div className="w-full h-full bg-theme-primary/10 flex items-center justify-center">
                      <span className="text-theme-primary text-xs font-bold">
                        {["JD", "TM", "KL", "AR"][i-1]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-theme-primary text-sm font-medium mb-1">
                      {["Joden Newman", "Tia Meyers", "Kyle Loft", "Alex Roth"][i-1]}
                    </h4>
                    <p className="text-theme-tertiary text-xs">
                      {["Mentor", "Creator", "Student", "Coach"][i-1]}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-theme-border grid grid-cols-2 gap-2 text-xs">
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
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-[--theme-primary] border-r-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};