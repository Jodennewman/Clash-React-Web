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
      
      // Floating elements animation
      gsap.to(".float-element", {
        y: -15, 
        duration: 3, 
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut",
        stagger: 0.8
      });
      
      // Subtle pulse animation for chart backgrounds
      gsap.to(".chart-pulse", {
        boxShadow: "0 0 20px rgba(53,115,128,0.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="vs-chart-tooltip-light dark:vs-chart-tooltip-dark">
          <p className="text-[--text-navy] dark:text-white font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
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
    <Section className="py-24 bg-[--bg-navy] dark:bg-[--bg-navy-darker] border-t border-[--secondary-teal]/10 dark:border-white/5 relative overflow-hidden" ref={containerRef}>
      {/* Floating elements - light mode */}
      <div className="absolute top-20 right-[15%] w-32 h-32 rounded-[40%] rotate-12 opacity-5 bg-[--primary-orange] animate-float-slow hidden dark:hidden float-element"></div>
      <div className="absolute bottom-40 left-[10%] w-40 h-40 rounded-[35%] rotate-6 opacity-5 bg-[--primary-orange-light] animate-float-medium hidden dark:hidden float-element"></div>
      <div className="absolute top-[60%] left-[30%] w-24 h-24 rounded-[45%] -rotate-12 opacity-8 bg-[--secondary-teal-light] animate-float-slow hidden dark:hidden float-element"></div>
      
      {/* Floating elements - dark mode */}
      <div className="absolute top-20 right-[15%] w-32 h-32 rounded-[40%] rotate-12 opacity-10 vs-float-orange animate-float-slow hidden dark:block float-element"></div>
      <div className="absolute bottom-40 left-[10%] w-40 h-40 rounded-[35%] rotate-6 opacity-8 vs-float-orange animate-float-medium hidden dark:block float-element"></div>
      <div className="absolute top-[60%] left-[30%] w-24 h-24 rounded-[45%] -rotate-12 opacity-15 vs-float-teal animate-float-slow hidden dark:block float-element"></div>
      
      <div className="max-w-container mx-auto grid md:grid-cols-2 gap-12">
        {/* Area Chart Card */}
        <div className="relative chart-container">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="bg-transparent px-0">
              <CardTitle className="text-white text-shadow-sm dark:text-shadow-md text-2xl">Student Progress Trajectory</CardTitle>
              <CardDescription className="text-white/70">
                Average growth in engagement and conversions during the 10-week program
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="vs-chart-bg-light dark:vs-chart-bg-dark p-6 rounded-[--border-radius-lg] chart-pulse">
                <ResponsiveContainer width="100%" height={300}>
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
                        <stop offset="5%" stopColor="var(--color-engagement)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-engagement)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="conversionFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-conversion)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-conversion)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="5 5" className="vs-chart-grid-light dark:vs-chart-grid-dark" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="vs-chart-axis-light dark:vs-chart-axis-dark"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickCount={5}
                      className="vs-chart-axis-light dark:vs-chart-axis-dark"
                    />
                    <ChartTooltip 
                      cursor={{strokeDasharray: '3 3'}} 
                      content={<CustomTooltip />} 
                      wrapperStyle={{ outline: 'none' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      name="Engagement"
                      stroke="var(--color-engagement)"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#engagementFill)"
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="conversion"
                      name="Conversions"
                      stroke="var(--color-conversion)"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#conversionFill)"
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="bg-transparent flex justify-between items-center mt-4 px-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-[--color-engagement]"></div>
                  <span className="text-white/90 text-sm">Engagement</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-[--color-conversion]"></div>
                  <span className="text-white/90 text-sm">Conversions</span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium text-white">
                <span>320% increase</span>
                <TrendingUp className="h-4 w-4 text-[--primary-orange]" />
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Pie Chart Card */}
        <div className="relative chart-container">
          <Card data-chart="metrics-pie" className="flex flex-col border-0 bg-transparent shadow-none">
            <ChartStyle id="metrics-pie" config={metricsConfig} />
            <CardHeader className="flex-row items-start space-y-0 px-0 pb-4 bg-transparent">
              <div className="grid gap-1">
                <CardTitle className="text-white text-shadow-sm dark:text-shadow-md text-2xl">Success Metrics</CardTitle>
                <CardDescription className="text-white/70">Average student outcomes after completion</CardDescription>
              </div>
              <Select value={activeMetric} onValueChange={setActiveMetric}>
                <SelectTrigger
                  className="ml-auto h-9 w-[160px] rounded-[--border-radius-md] bg-[--secondary-teal]/20 dark:bg-[--secondary-teal]/30 border-white/10 text-white"
                  aria-label="Select a metric"
                >
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-[--border-radius-md] bg-white/95 dark:bg-[--bg-navy] border-[--secondary-teal]/20 dark:border-white/10">
                  {metrics.map((key) => {
                    const config = metricsConfig[key];
                    if (!config) {
                      return null;
                    }
                    return (
                      <SelectItem
                        key={key}
                        value={key}
                        className="rounded-[--border-radius-sm] [&_span]:flex"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-3 w-3 shrink-0 rounded-full"
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
            </CardHeader>
            <CardContent className="flex flex-1 justify-center p-0">
              <div className="vs-chart-bg-light dark:vs-chart-bg-dark p-6 rounded-[--border-radius-lg] w-full chart-pulse">
                <ResponsiveContainer width="100%" height={300}>
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
                      outerRadius={100}
                      paddingAngle={2}
                      strokeWidth={1}
                      stroke="#ffffff10"
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
                            outerRadius={outerRadius + 8}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            fill={fill}
                            {...rest}
                          />
                          <Sector
                            cx={cx}
                            cy={cy}
                            innerRadius={outerRadius + 10}
                            outerRadius={outerRadius + 14}
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
                                  y={viewBox.cy - 15}
                                  className="fill-[--text-navy] dark:fill-white text-4xl font-bold"
                                >
                                  {metricsData[activeIndex].value}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 15}
                                  className="fill-[--text-navy]/70 dark:fill-white/60 text-sm"
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
            </CardContent>
            <CardFooter className="flex justify-center gap-4 mt-4 px-0 flex-wrap">
              {metricsData.map((item) => (
                <div 
                  key={item.metric}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 ${activeMetric === item.metric ? 'bg-white/10' : 'bg-transparent'}`}
                  onClick={() => setActiveMetric(item.metric)}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: metricsConfig[item.metric].color }}
                  ></div>
                  <span className="text-white/90 text-sm">{metricsConfig[item.metric].label.split(' ')[0]}</span>
                </div>
              ))}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Section>
  );
};