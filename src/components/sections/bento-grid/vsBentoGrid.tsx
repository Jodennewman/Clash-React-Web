import React from 'react';
import { Section } from "../../ui/section";
import { Badge } from "../../ui/badge";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
// Import individual illustrations from their respective files
import TilesIllustration from "../../illustrations/tiles";
import MockupMobileIllustration from "../../illustrations/mockup-mobile";
import PipelineIllustration from "../../illustrations/pipeline";
import CodeEditorIllustration from "../../illustrations/code-editor";
import RadarSmallIllustration from "../../illustrations/radar-small";
import GlobeIllustration from "../../illustrations/globe";

// Create wrapper components that don't pass props to the illustrations
const TilesIcon = () => <div className="h-8 w-8 text-[#154D59]"><TilesIllustration /></div>;
const MockupMobileIcon = () => <div className="h-8 w-8"><MockupMobileIllustration /></div>;
const PipelineIcon = () => <div className="h-8 w-8"><PipelineIllustration /></div>;
const CodeEditorIcon = () => <div className="h-8 w-8"><CodeEditorIllustration /></div>;

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  span: string;
}

const bentoItems: BentoItem[] = [
  {
    title: "Creator Network",
    description: "Connect with 100+ top creators who've built 7+ figure businesses with short-form content.",
    icon: <GlobeIllustration className="h-8 w-8" />,
    color: "#FEA35D",
    span: "col-span-1 row-span-1"
  },
  {
    title: "AI-Powered Tools",
    description: "Exclusive access to our custom AI tools for content research, script generation, and trend prediction.",
    icon: <RadarSmallIllustration className="h-8 w-8" />,
    color: "#B92234",
    span: "col-span-1 row-span-1"
  },
  {
    title: "Platform Mastery",
    description: "Deep dives into TikTok, Instagram, YouTube Shorts, and LinkedIn algorithms with platform-specific strategies.",
    icon: <TilesIcon />,
    color: "#154D59",
    span: "col-span-2 row-span-1 md:col-span-1 md:row-span-2"
  },
  {
    title: "Viral Case Studies",
    description: "Detailed breakdowns of 45+ videos that reached millions of views across different niches and industries.",
    icon: <MockupMobileIcon />,
    color: "#DE6B59",
    span: "col-span-2 md:col-span-1 row-span-1"
  },
  {
    title: "Weekly Growth Labs",
    description: "Live weekly sessions where we review your content and provide actionable feedback for immediate improvement.",
    icon: <PipelineIcon />,
    color: "#FEAC6D",
    span: "col-span-2 row-span-1"
  },
  {
    title: "Content Library",
    description: "Over 200+ video templates, swipe files, and script formats for every type of business and creator niche.",
    icon: <CodeEditorIcon />,
    color: "#387292",
    span: "col-span-2 md:col-span-1 row-span-1"
  }
];

export default function VSBentoGrid() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const animationCtx = useRef<ReturnType<typeof gsap.context> | null>(null);
  
  useLayoutEffect(() => {
    if (animationCtx.current) {
      animationCtx.current.revert();
    }
    
    animationCtx.current = gsap.context(() => {
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 80%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all"
      });
    }, bentoRef);
    
    return () => {
      if (animationCtx.current) {
        animationCtx.current.revert();
      }
    };
  }, []);

  return (
    <Section className="bg-[#08141B] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
            Program Resources
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Vertical Shortcut gives you all the tools, resources, and support to succeed with short-form content.
          </p>
        </div>
        
        <div ref={bentoRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {bentoItems.map((item, index) => (
            <div 
              key={index} 
              className={`${item.span} bento-item bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[${item.color}]/40 transition-all duration-300 group`}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FEA35D] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}