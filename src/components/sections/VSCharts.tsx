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
    <Section className="py-20 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] border-t border-[--text-navy]/10 dark:border-white/5" ref={containerRef}>
      <div className="max-w-container mx-auto grid md:grid-cols-2 gap-8">
        {/* Area Chart Card */}
        <div className="chart-container">
          <div className="mb-6">
            <h3 className="text-[--text-navy] dark:text-white text-2xl font-medium mb-2">Student Progress Trajectory</h3>
            <p className="text-[--text-navy]/70 dark:text-white/70">
              Average growth in engagement and conversions during the 10-week program
            </p>
          </div>
          
          <div className="bg-white dark:bg-[--bg-navy] p-5 rounded-lg shadow-[2px_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(53,115,128,0.1)]">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="engagementFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-engagement)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-engagement)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="conversionFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-conversion)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-conversion)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" className="dark:stroke-white/5" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-[--text-navy]/60 dark:text-white/60"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={5}
                  className="text-[--text-navy]/60 dark:text-white/60"
                />
                <ChartTooltip 
                  cursor={{stroke: "rgba(0,0,0,0.1)", strokeDasharray: '3 3'}} 
                  content={<CustomTooltip />} 
                  wrapperStyle={{ outline: 'none' }}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  name="Engagement"
                  stroke="var(--color-engagement)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#engagementFill)"
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="conversion"
                  name="Conversions"
                  stroke="var(--color-conversion)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#conversionFill)"
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-[--color-engagement]"></div>
                <span className="text-[--text-navy]/80 dark:text-white/80 text-sm">Engagement</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-[--color-conversion]"></div>
                <span className="text-[--text-navy]/80 dark:text-white/80 text-sm">Conversions</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[--text-navy] dark:text-white text-sm">
              <span>320% increase</span>
              <TrendingUp className="h-3 w-3 text-[--primary-orange]" />
            </div>
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="chart-container">
          <ChartStyle id="metrics-pie" config={metricsConfig} />
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[--text-navy] dark:text-white text-2xl font-medium mb-2">Success Metrics</h3>
              <p className="text-[--text-navy]/70 dark:text-white/70">
                Average student outcomes after completion
              </p>
            </div>
            <Select value={activeMetric} onValueChange={setActiveMetric}>
              <SelectTrigger
                className="h-8 w-[140px] rounded-md bg-white/60 dark:bg-[--bg-navy-darker]/60 border-[--text-navy]/10 dark:border-white/10 text-[--text-navy] dark:text-white"
                aria-label="Select a metric"
              >
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-md bg-white dark:bg-[--bg-navy] border-[--text-navy]/10 dark:border-white/10">
                {metrics.map((key) => {
                  const config = metricsConfig[key];
                  if (!config) {
                    return null;
                  }
                  return (
                    <SelectItem
                      key={key}
                      value={key}
                      className="rounded-sm [&_span]:flex"
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
          
          <div className="bg-white dark:bg-[--bg-navy] p-5 rounded-lg shadow-[2px_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(53,115,128,0.1)]">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <ChartTooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ outline: 'none' }}
                />
                <Pie
                  data={metricsData}
                  dataKey="value"
                  nameKey="metric"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  strokeWidth={1}
                  stroke="rgba(255,255,255,0.1)"
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
                        outerRadius={outerRadius + 5}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                        {...rest}
                      />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy - 8}
                              className="fill-[--text-navy] dark:fill-white text-3xl font-bold"
                            >
                              {metricsData[activeIndex].value}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 12}
                              className="fill-[--text-navy]/70 dark:fill-white/60 text-xs"
                            >
                              {metricsConfig[activeMetric].label}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-3 mt-4">
            {metricsData.map((item) => (
              <button 
                key={item.metric}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                  activeMetric === item.metric
                    ? 'bg-white/70 dark:bg-[--bg-navy-darker]/70 border border-[--text-navy]/10 dark:border-white/10'
                    : 'text-[--text-navy]/60 dark:text-white/60 hover:bg-white/30 hover:dark:bg-white/5'
                }`}
                onClick={() => setActiveMetric(item.metric)}
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: metricsConfig[item.metric].color }}
                ></div>
                <span>{item.metric}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};