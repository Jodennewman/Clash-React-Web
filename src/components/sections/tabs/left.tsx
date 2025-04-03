"use client";

import { Section } from "../../ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import { Badge } from "../../ui/badge";
import { ReactNode, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Users,
  BriefcaseBusiness,
  Video,
  LineChart,
  TrendingUp,
  Clock,
  Rocket,
  BarChart3,
  ArrowRightLeft
} from "lucide-react";

// Custom styled visualization for each audience
const AudienceVisual = ({ 
  audience, 
  metrics = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image = null,
  isActive = false
}: {
  audience: string;
  metrics: Array<{
    color: string | undefined;
    description: ReactNode;
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
  }>;
  image?: string | null;
  isActive?: boolean;
}) => {
  const ref = useRef(null);
  
  useGSAP(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      if (isActive && ref.current) {
        // Entrance animation when tab becomes active
        gsap.fromTo(
          '.metric-item',
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 0.4,
            ease: "power2.out",
            clearProps: "transform"
          }
        );
        
        // Subtle floating animation for the metrics
        const floatTl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          defaults: { duration: 2.5, ease: "sine.inOut" }
        });
        
        document.querySelectorAll('.metric-item').forEach((item: Element, index: number) => {
          const delay = index * 0.2;
          floatTl.to(
            item, 
            { 
              y: "-=8", 
              x: index % 2 === 0 ? "+=3" : "-=3" 
            }, 
            delay
          );
        });
        
        // Add subtle pulsing to highlight metrics
        gsap.to('.highlight-value', {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, ref); // Scope to container ref
    
    // The context will automatically clean up when the component unmounts or dependencies change
    return () => ctx.revert();
  }, [isActive]); // This runs whenever isActive changes

  return (
    <div ref={ref} className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10" 
             style={{ backgroundSize: '30px 30px', backgroundImage: 'linear-gradient(to right, #FEA35D 1px, transparent 1px), linear-gradient(to bottom, #FEA35D 1px, transparent 1px)' }}>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {audience === "creators" && "Content Creator Track"}
            {audience === "business" && "Business Owner Track"}
            {audience === "agency" && "Agency/Marketer Track"}
          </h3>
          <p className="text-[#FEA35D] text-lg font-medium">
            {audience === "creators" && "Rapid audience growth & monetization"}
            {audience === "business" && "Generate leads & sales on autopilot"}
            {audience === "agency" && "Scale client results & charge premium rates"}
          </p>
        </div>
        
        {/* Metrics visualization */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-item bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: metric.color }}>
                  {metric.icon}
                </div>
                <h4 className="font-semibold text-white/80">{metric.label}</h4>
              </div>
              <div className="highlight-value text-3xl font-bold" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <p className="text-white/60 text-sm mt-1">{metric.description}</p>
            </div>
          ))}
        </div>
        
        {/* Pathway visualization */}
        <div className="flex flex-col gap-4 mt-auto">
          <h4 className="text-lg font-semibold text-white">Sample Learning Path:</h4>
          <div className="relative flex items-center mb-2">
            {/* Path line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] transform -translate-y-1/2"></div>
            
            {/* Path steps */}
            <div className="relative z-10 grid grid-cols-3 w-full">
              {audience === "creators" && (
                <>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FEA35D] flex items-center justify-center mb-2">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Hook Mastery</span>
                  </div>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#B92234] flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Audience Growth</span>
                  </div>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#387292] flex items-center justify-center mb-2">
                      <LineChart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Monetization</span>
                  </div>
                </>
              )}
              
              {audience === "business" && (
                <>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FEA35D] flex items-center justify-center mb-2">
                      <BriefcaseBusiness className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Authority Building</span>
                  </div>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#B92234] flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Time Optimization</span>
                  </div>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#387292] flex items-center justify-center mb-2">
                      <ArrowRightLeft className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Lead Generation</span>
                  </div>
                </>
              )}
              
              {audience === "agency" && (
                <>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FEA35D] flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Client Acquisition</span>
                  </div>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#B92234] flex items-center justify-center mb-2">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">Content Scaling</span>
                  </div>
                  <div className="path-step flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#387292] flex items-center justify-center mb-2">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm text-center">ROI Reporting</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TabsLeft() {
  const [activeTab, setActiveTab] = useState("creators");
  const tabsContainerRef = useRef(null);
  
  // Define metrics for each audience type
  const creatorMetrics = [
    { 
      label: "Followers", 
      value: "10K+", 
      description: "Average growth in 90 days",
      icon: <Users className="w-4 h-4 text-white" />,
      color: "#FEA35D" 
    },
    { 
      label: "Engagement", 
      value: "300%", 
      description: "Increase in first 30 days", 
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      color: "#B92234" 
    },
    { 
      label: "Revenue", 
      value: "£5K+", 
      description: "Monthly after implementation", 
      icon: <LineChart className="w-4 h-4 text-white" />,
      color: "#387292" 
    }
  ];
  
  const businessMetrics = [
    { 
      label: "Time Saved", 
      value: "85%", 
      description: "Less time creating content", 
      icon: <Clock className="w-4 h-4 text-white" />,
      color: "#FEA35D" 
    },
    { 
      label: "Leads", 
      value: "3.5X", 
      description: "More leads per month", 
      icon: <Users className="w-4 h-4 text-white" />,
      color: "#B92234" 
    },
    { 
      label: "Sales", 
      value: "42%", 
      description: "Increase in conversion rate", 
      icon: <BarChart3 className="w-4 h-4 text-white" />,
      color: "#387292" 
    }
  ];
  
  const agencyMetrics = [
    { 
      label: "Client Results", 
      value: "4.8X", 
      description: "Better than industry average", 
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      color: "#FEA35D" 
    },
    { 
      label: "Pricing", 
      value: "75%", 
      description: "Higher rates for services", 
      icon: <LineChart className="w-4 h-4 text-white" />,
      color: "#B92234" 
    },
    { 
      label: "Retention", 
      value: "92%", 
      description: "Client retention rate", 
      icon: <Users className="w-4 h-4 text-white" />,
      color: "#387292" 
    }
  ];
  
  // Add GSAP animations for tab changes using useGSAP
  useGSAP(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tabs-content-wrapper",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }, tabsContainerRef); // Scope to tabs container
    
    // The context will automatically clean up when the component unmounts or dependencies change
    return () => ctx.revert();
  }, [activeTab]); // This runs whenever the activeTab changes
  
  return (
    <Section className="py-24 bg-[#09232F] border-t border-[#154D59]/30">
      <div className="container mx-auto px-4 flex flex-col gap-8 sm:gap-16">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
          <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-2 py-2 px-4">
            Tailored Learning
          </Badge>
          <h2 className="text-center text-4xl md:text-5xl font-bold text-white max-w-[800px]">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">One System, Three Paths to Mastery</span>
          </h2>
          <p className="text-xl text-white/70 max-w-[720px] text-center">
            Whether you're a creator, business owner, or agency marketer, Vertical Shortcut delivers specialized training for your specific goals and challenges.
          </p>
        </div>
        
        <div className="w-full" ref={tabsContainerRef}>
          <Tabs
            defaultValue="creators"
            className="flex flex-col items-start gap-4 lg:grid lg:grid-cols-3"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-1">
              <TabsTrigger
                value="creators"
                className="flex w-full flex-row gap-2 p-3 bg-[#08141B]/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FEA35D]/20 data-[state=active]:to-[#09232F]/40"
              >
                <div className="p-1 bg-[#FEA35D] rounded-full">
                  <Video className="size-4 shrink-0 stroke-1 md:h-5 md:w-5 text-white" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h3 className="font-semibold md:text-lg text-white">
                    Content Creators
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm">
                    Rapidly grow your audience and monetize with authentic content that converts.
                  </p>
                </div>
              </TabsTrigger>
              
              <TabsTrigger
                value="business"
                className="flex flex-row gap-2 p-3 bg-[#08141B]/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FEA35D]/20 data-[state=active]:to-[#09232F]/40"
              >
                <div className="p-1 bg-[#B92234] rounded-full">
                  <BriefcaseBusiness className="size-4 shrink-0 stroke-1 md:h-5 md:w-5 text-white" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h3 className="font-semibold md:text-lg text-white">Business Owners</h3>
                  <p className="text-white/70 text-xs md:text-sm">
                    Drive leads and sales with minimal time investment - the ultimate founder's solution.
                  </p>
                </div>
              </TabsTrigger>
              
              <TabsTrigger
                value="agency"
                className="flex flex-row gap-2 p-3 bg-[#08141B]/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FEA35D]/20 data-[state=active]:to-[#09232F]/40"
              >
                <div className="p-1 bg-[#387292] rounded-full">
                  <Users className="size-4 shrink-0 stroke-1 md:h-5 md:w-5 text-white" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h3 className="font-semibold md:text-lg text-white">Agencies & Marketers</h3>
                  <p className="text-white/70 text-xs md:text-sm">
                    Scale client results, charge premium rates, and build systems that deliver consistently.
                  </p>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="tabs-content-wrapper lg:col-span-2">
              <TabsContent
                value="creators"
                className="aspect-16/9 p-6 bg-[#08141B] rounded-xl border border-[#154D59]/30"
              >
                <MockupFrame size="small">
                  <AudienceVisual 
                    audience="creators" 
                    metrics={creatorMetrics}
                    isActive={activeTab === "creators"} 
                  />
                </MockupFrame>
                <Glow variant="center" />
              </TabsContent>
              
              <TabsContent
                value="business"
                className="aspect-16/9 p-6 bg-[#08141B] rounded-xl border border-[#154D59]/30"
              >
                <MockupFrame size="small">
                  <AudienceVisual 
                    audience="business" 
                    metrics={businessMetrics}
                    isActive={activeTab === "business"}
                  />
                </MockupFrame>
                <Glow variant="center" />
              </TabsContent>
              
              <TabsContent
                value="agency"
                className="aspect-16/9 p-6 bg-[#08141B] rounded-xl border border-[#154D59]/30"
              >
                <MockupFrame size="small">
                  <AudienceVisual 
                    audience="agency" 
                    metrics={agencyMetrics}
                    isActive={activeTab === "agency"}
                  />
                </MockupFrame>
                <Glow variant="center" />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Section>
  );
}
