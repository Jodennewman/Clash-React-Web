import React, { useState } from "react";
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

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Label, Pie, PieChart, Sector } from 'recharts';

export default function VSCharts() {
  const chartData = [
    { month: "Week 1", engagement: 10, conversion: 0 },
    { month: "Week 2", engagement: 35, conversion: 5 },
    { month: "Week 4", engagement: 70, conversion: 15 },
    { month: "Week 6", engagement: 120, conversion: 35 },
    { month: "Week 8", engagement: 210, conversion: 75 },
    { month: "Week 10", engagement: 320, conversion: 140 },
  ];
  
  const chartConfig = {
    engagement: {
      label: "Engagement",
      color: "hsl(27, 98%, 67%)", // FEA35D
    },
    conversion: {
      label: "Conversions",
      color: "hsl(359, 72%, 43%)", // B92234
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
      color: "hsl(27, 98%, 67%)", // FEA35D
    },
    followers: {
      label: "New Followers (in thousands)",
      color: "hsl(204, 42%, 40%)", // 387292
    },
    engagement: {
      label: "Engagement Rate (%)",
      color: "hsl(359, 72%, 43%)", // B92234
    },
    revenue: {
      label: "Revenue Growth (%)",
      color: "hsl(186, 61%, 22%)", // 154D59
    },
  };

  const [activeMetric, setActiveMetric] = useState(metricsData[0].metric);
  const activeIndex = metricsData.findIndex((item) => item.metric === activeMetric);
  const metrics = metricsData.map((item) => item.metric);

  return (
    <Section className="py-24 bg-[#09232F] border-t border-[#154D59]/30">
      <div className="max-w-container mx-auto grid md:grid-cols-2 gap-8">
        <Card className="bg-[#0F1A22] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Student Progress Trajectory</CardTitle>
            <CardDescription className="text-white/70">
              Average growth in engagement and conversions during the 10-week program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -20,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} stroke="#154D59" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="#FFFFFF50"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={5}
                  stroke="#FFFFFF50"
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area
                  dataKey="engagement"
                  type="monotone"
                  fill="var(--color-engagement)"
                  fillOpacity={0.4}
                  stroke="var(--color-engagement)"
                  strokeWidth={2}
                />
                <Area
                  dataKey="conversion"
                  type="monotone"
                  fill="var(--color-conversion)"
                  fillOpacity={0.4}
                  stroke="var(--color-conversion)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none text-white">
                  320% increase in engagement <TrendingUp className="h-4 w-4 text-[#FEA35D]" />
                </div>
                <div className="flex items-center gap-2 leading-none text-white/60">
                  Average across all Vertical Shortcut students
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card data-chart="metrics-pie" className="flex flex-col bg-[#0F1A22] border-white/10">
          <ChartStyle id="metrics-pie" config={metricsConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle className="text-white">Success Metrics</CardTitle>
              <CardDescription className="text-white/70">Average student outcomes after completion</CardDescription>
            </div>
            <Select value={activeMetric} onValueChange={setActiveMetric}>
              <SelectTrigger
                className="ml-auto h-7 w-[160px] rounded-lg pl-2.5 bg-[#154D59]/50 border-white/10"
                aria-label="Select a metric"
              >
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl bg-[#0F1A22] border-white/10">
                {metrics.map((key) => {
                  const config = metricsConfig[key];
                  if (!config) {
                    return null;
                  }
                  return (
                    <SelectItem
                      key={key}
                      value={key}
                      className="rounded-lg [&_span]:flex"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: `var(--color-${key})`,
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
          <CardContent className="flex flex-1 justify-center pb-0">
            <ChartContainer
              id="metrics-pie"
              config={metricsConfig}
              className="mx-auto aspect-square w-full max-w-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={metricsData}
                  dataKey="value"
                  nameKey="metric"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector
                        {...props}
                        outerRadius={outerRadius + 25}
                        innerRadius={outerRadius + 12}
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
                              y={viewBox.cy}
                              className="fill-white text-3xl font-bold"
                            >
                              {metricsData[activeIndex].value}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-white/60"
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
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};