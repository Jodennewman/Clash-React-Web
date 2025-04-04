import React, { useState, useRef } from "react";
import { Section } from "../ui/section";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '../ui/card';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../ui/select";
import { TrendingUp } from "lucide-react";
import {
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from '../ui/chart';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function VSCharts() {
  const containerRef = useRef(null);
  
  // Chart data for student progress
  const chartData = [
    { month: "Week 1", engagement: 10, conversion: 0 },
    { month: "Week 2", engagement: 35, conversion: 5 },
    { month: "Week 4", engagement: 70, conversion: 15 },
    { month: "Week 6", engagement: 120, conversion: 35 },
    { month: "Week 8", engagement: 210, conversion: 75 },
    { month: "Week 10", engagement: 320, conversion: 140 },
  ];
  
  // Chart configuration with CSS variables
  const chartConfig = {
    engagement: {
      label: "Engagement",
      color: "var(--color-engagement)", 
    },
    conversion: {
      label: "Conversions",
      color: "var(--color-conversion)",
    },
  };

  // Success metrics data for pie chart
  const metricsData = [
    { metric: "views", value: 45, fill: "var(--color-views)" },
    { metric: "followers", value: 32, fill: "var(--color-followers)" },
    { metric: "engagement", value: 18, fill: "var(--color-engagement)" },
    { metric: "revenue", value: 25, fill: "var(--color-revenue)" },
  ];
  
  const metricsConfig = {
    metrics: {
      label: "Metrics",
    },
    views: {
      label: "Views (in millions)",
      color: "var(--color-views)",
    },
    followers: {
      label: "New Followers (in thousands)",
      color: "var(--color-followers)",
    },
    engagement: {
      label: "Engagement Rate (%)",
      color: "var(--color-engagement)",
    },
    revenue: {
      label: "Revenue Growth (%)",
      color: "var(--color-revenue)",
    },
  };

  const [activeMetric, setActiveMetric] = useState(metricsData[0].metric);
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
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[--bg-navy] p-3 rounded-md border border-[--text-navy]/5 dark:border-white/5 shadow-sm">
          <p className="text-[--text-navy] dark:text-white font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-[--text-navy]/80 dark:text-white/80 text-sm">
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
    <Section className="py-20 bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)] border-t border-[var(--text-navy)]/10 dark:border-white/5" ref={containerRef}>
      <div className="max-w-container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[--text-navy] dark:text-white text-3xl md:text-4xl font-medium mb-3">Case Studies</h2>
          <p className="text-[--text-navy]/70 dark:text-white/70 max-w-2xl mx-auto">
            Visualizing real-world impact and tracking growth metrics for content creators.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Area Chart Card */}
          <div className="chart-container">
            <div className="mb-4">
              <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-1">Student Progress Trajectory</h3>
              <p className="text-[--text-navy]/70 dark:text-white/70 text-sm">
                Average growth over the 10-week program
              </p>
            </div>
            
            <div className="bg-[--bg-cream-darker]/30 dark:bg-[--bg-navy-darker]/50 p-6 rounded-md border border-[--text-navy]/5 dark:border-white/5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-[--primary-orange]"></div>
                    <span className="text-[--text-navy] dark:text-white text-xs">Engagement</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-[--accent-red]"></div>
                    <span className="text-[--text-navy] dark:text-white text-xs">Conversions</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[--bg-cream-darker]/50 dark:bg-[--bg-navy]/70 px-2 py-0.5 rounded-full">
                  <span className="text-[--primary-orange] dark:text-[--primary-orange-light] text-xs font-medium">+320%</span>
                  <TrendingUp className="h-3 w-3 text-[--primary-orange] dark:text-[--primary-orange-light]" />
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
                  <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.03)" className="dark:stroke-white/5" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-[--text-navy]/40 dark:text-white/40 text-xs"
                    tick={{fontSize: 11}}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={5}
                    className="text-[--text-navy]/40 dark:text-white/40 text-xs"
                    tick={{fontSize: 11}}
                  />
                  <ChartTooltip 
                    cursor={{stroke: "rgba(0,0,0,0.05)", strokeDasharray: '3 3'}} 
                    content={<CustomTooltip />} 
                    wrapperStyle={{ outline: 'none' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="var(--primary-orange)"
                    strokeWidth={2}
                    fill="var(--primary-orange)"
                    fillOpacity={0.05}
                    activeDot={{ r: 4, fill: "var(--primary-orange)", stroke: "white", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversion"
                    name="Conversions"
                    stroke="var(--accent-red)"
                    strokeWidth={2}
                    fill="var(--accent-red)"
                    fillOpacity={0.05}
                    activeDot={{ r: 4, fill: "var(--accent-red)", stroke: "white", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="chart-container">
            <ChartStyle id="metrics-pie" config={metricsConfig} />
            <div className="mb-4">
              <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-1">Success Metrics</h3>
              <p className="text-[--text-navy]/70 dark:text-white/70 text-sm">
                Average student outcomes after completion
              </p>
            </div>
            
            <div className="bg-[--bg-cream-darker]/30 dark:bg-[--bg-navy-darker]/50 p-6 rounded-md border border-[--text-navy]/5 dark:border-white/5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <div className="flex flex-wrap gap-2 mb-4">
                {metricsData.map((item) => (
                  <button 
                    key={item.metric}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                      activeMetric === item.metric
                        ? `bg-[${item.fill}] text-white`
                        : 'bg-[--bg-cream-darker]/30 dark:bg-[--bg-navy]/50 text-[--text-navy] dark:text-white hover:bg-[--bg-cream-darker]/50 hover:dark:bg-[--bg-navy]/70'
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
                        activeShape={({
                          cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value,
                          ...rest
                        }) => (
                          <g>
                            <Sector
                              cx={cx}
                              cy={cy}
                              innerRadius={innerRadius}
                              outerRadius={outerRadius + 3}
                              startAngle={startAngle}
                              endAngle={endAngle}
                              fill={fill}
                              {...rest}
                            />
                          </g>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col items-start ml-4 mt-4">
                  <div className="text-5xl font-bold text-[--text-navy] dark:text-white mb-1">
                    {metricsData[activeIndex].value}
                  </div>
                  <div className="text-sm text-[--text-navy]/70 dark:text-white/70">
                    {metricsConfig[activeMetric].label}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[--text-navy]/5 dark:border-white/5 w-full">
                    <Select value={activeMetric} onValueChange={setActiveMetric}>
                      <SelectTrigger
                        className="h-8 w-full rounded-md bg-[--bg-cream-darker]/30 dark:bg-[--bg-navy]/50 border-none text-[--text-navy] dark:text-white text-xs"
                        aria-label="Select a metric"
                      >
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent align="end" className="rounded-md bg-[--bg-cream] dark:bg-[--bg-navy-darker] border-[--text-navy]/10 dark:border-white/10">
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
          <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-6">Creator Success Stories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`group relative overflow-hidden rounded-md border border-[--text-navy]/5 dark:border-white/5 bg-[--bg-cream-darker]/30 dark:bg-[--bg-navy-darker]/50 p-4 cursor-pointer transition-all hover:shadow-sm ${i === 1 ? 'ring-2 ring-[--primary-orange]/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[--bg-cream-darker] dark:bg-[--bg-navy]">
                    <div className="w-full h-full bg-[--primary-orange]/10 flex items-center justify-center">
                      <span className="text-[--primary-orange] text-xs font-bold">
                        {["JD", "TM", "KL", "AR"][i-1]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[--text-navy] dark:text-white text-sm font-medium mb-1">
                      {["Joden Newman", "Tia Meyers", "Kyle Loft", "Alex Roth"][i-1]}
                    </h4>
                    <p className="text-[--text-navy]/60 dark:text-white/60 text-xs">
                      {["Mentor", "Creator", "Student", "Coach"][i-1]}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-[--text-navy]/5 dark:border-white/5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[--text-navy]/50 dark:text-white/50">Views</div>
                    <div className="text-[--primary-orange] dark:text-[--primary-orange-light] font-medium">
                      {["3.2M", "1.8M", "950K", "4.6M"][i-1]}
                    </div>
                  </div>
                  <div>
                    <div className="text-[--text-navy]/50 dark:text-white/50">Growth</div>
                    <div className="text-[--accent-red] dark:text-[--accent-coral] font-medium">
                      {["+620%", "+340%", "+280%", "+410%"][i-1]}
                    </div>
                  </div>
                </div>
                
                {i === 1 && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-[--primary-orange] border-r-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};