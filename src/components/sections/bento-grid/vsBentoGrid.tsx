import {
  Tile,
  TileVisual,
  TileTitle,
  TileDescription,
  TileContent,
  TileLink,
} from "../../ui/tile";
import React from "react";
import { Section } from "../../ui/section";
import GlobeIllustration from "../../illustrations/globe";
import TilesIllustration from "../../illustrations/tiles";
import ChatIllustration from "../../illustrations/chat";
import MockupMobileIllustration from "../../illustrations/mockup-mobile";
import PipelineIllustration from "../../illustrations/pipeline";
import CodeEditorIllustration from "../../illustrations/code-editor";
import RadarSmallIllustration from "../../illustrations/radar-small";
import { Code, DollarSign, Rocket, Share2, TrendingUp, Users, Zap } from "lucide-react";

export default function VSBentoGrid() {
  const bentoItems = [
    {
      title: "Psychological Triggers",
      description: "Master proven psychological principles that instantly grab attention and make viewers stop scrolling. Turn passive viewers into engaged followers.",
      icon: <Users className="h-8 w-8" />,
      visual: "mockup-mobile"
    },
    {
      title: "Conversion Frameworks",
      description: "Transform views into sales with battle-tested conversion frameworks that guide viewers through a journey from curiosity to purchase.",
      icon: <TrendingUp className="h-8 w-8" />,
      visual: "pipeline"
    },
    {
      title: "Proven Scripts & Templates",
      description: "Never start from scratch again. Access our vault of ready-to-use scripts, hooks, and templates that have generated millions of views and six-figure sales.",
      icon: <Code className="h-8 w-8" />,
      visual: "code-editor"
    },
    {
      title: "Global Reach & Impact",
      description: "Break free from geographic limitations. Reach audiences worldwide and create content that resonates across cultures and markets.",
      icon: <Share2 className="h-8 w-8" />,
      visual: "globe"
    },
    {
      title: "AI-Powered Research",
      description: "Leverage cutting-edge AI tools for content research, trend prediction, and audience insights that keep you ahead of the curve.",
      icon: <Zap className="h-8 w-8" />,
      visual: "chat"
    },
    {
      title: "Scale Without Sacrifice",
      description: "Build systems that allow you to create more content with less effort. Maintain quality while dramatically increasing your output and reach.",
      icon: <Rocket className="h-8 w-8" />,
      visual: "radar"
    }
  ];

  // Helper function to render the appropriate illustration
  const getIllustration = (type) => {
    switch(type) {
      case "mockup-mobile":
        return <div className="w-full h-full flex items-center justify-center">
          <div className="w-48 h-80 rounded-3xl bg-[#154D59] border-4 border-[#FDEBDD]/20 flex flex-col overflow-hidden">
            <div className="h-1/2 bg-[#FEA35D]/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#FEA35D]"></div>
            </div>
            <div className="h-1/2 p-4 flex flex-col gap-2">
              <div className="h-3 w-3/4 rounded-full bg-white/20"></div>
              <div className="h-3 w-1/2 rounded-full bg-white/20"></div>
              <div className="h-3 w-2/3 rounded-full bg-white/20"></div>
              <div className="mt-auto h-8 w-full rounded-lg bg-[#FEA35D]"></div>
            </div>
          </div>
        </div>;
      case "pipeline":
        return <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-24 flex items-center justify-between gap-4 px-8">
            <div className="h-16 w-16 rounded-full bg-[#B92234] flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 h-2 bg-gradient-to-r from-[#B92234] to-[#FEA35D]"></div>
            <div className="h-16 w-16 rounded-full bg-[#FEA35D] flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>;
      case "code-editor":
        return <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-md h-48 rounded-lg bg-[#08141B] border border-[#154D59] overflow-hidden">
            <div className="h-8 bg-[#154D59]/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#B92234]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FEA35D]"></div>
              <div className="w-3 h-3 rounded-full bg-[#154D59]"></div>
            </div>
            <div className="p-4 font-mono text-xs text-[#FEA35D]">
              <div><span className="text-[#DE6B59]">function</span> <span className="text-[#FEAC6D]">createViralHook</span>() {`{`}</div>
              <div className="pl-4"><span className="text-white">return</span> {`{`}</div>
              <div className="pl-8">pattern: <span className="text-[#FDEBDD]">"curiosity-gap"</span>,</div>
              <div className="pl-8">engagement: <span className="text-[#FDEBDD]">100</span>,</div>
              <div className="pl-8">conversion: <span className="text-[#FDEBDD]">true</span></div>
              <div className="pl-4">{`}`};</div>
              <div>{`}`}</div>
            </div>
          </div>
        </div>;
      case "globe":
        return <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full bg-[#154D59]/30 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-[#154D59]/50"></div>
            <div className="absolute inset-8 rounded-full bg-[#08141B] border border-[#387292]/50 overflow-hidden">
              <div className="absolute w-full h-1 bg-[#FEA35D]/30 top-1/4 left-0"></div>
              <div className="absolute w-full h-1 bg-[#FEA35D]/30 top-2/4 left-0"></div>
              <div className="absolute w-full h-1 bg-[#FEA35D]/30 top-3/4 left-0"></div>
              <div className="absolute h-full w-1 bg-[#FEA35D]/30 left-1/4 top-0"></div>
              <div className="absolute h-full w-1 bg-[#FEA35D]/30 left-2/4 top-0"></div>
              <div className="absolute h-full w-1 bg-[#FEA35D]/30 left-3/4 top-0"></div>
              <div className="absolute w-6 h-6 rounded-full bg-[#FEA35D] top-1/4 left-1/4"></div>
              <div className="absolute w-4 h-4 rounded-full bg-[#B92234] top-2/3 right-1/4"></div>
            </div>
          </div>
        </div>;
      case "chat":
        return <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="self-start max-w-[80%] bg-[#154D59] p-3 rounded-2xl rounded-bl-none">
              <p className="text-white text-sm">What's the most effective hook for financial coaches?</p>
            </div>
            <div className="self-end max-w-[80%] bg-[#FEA35D] p-3 rounded-2xl rounded-br-none">
              <p className="text-[#08141B] text-sm">The "cost of inaction" hook works best for financial coaches, showing the real price of delaying financial decisions.</p>
            </div>
            <div className="self-start max-w-[80%] bg-[#154D59] p-3 rounded-2xl rounded-bl-none">
              <p className="text-white text-sm">Can you give me a template?</p>
            </div>
            <div className="self-end max-w-[80%] bg-[#FEA35D] p-3 rounded-2xl rounded-br-none">
              <p className="text-[#08141B] text-sm">Every day you don't [specific action], you're losing $X in [specific benefit]. Here's proof...</p>
            </div>
          </div>
        </div>;
      case "radar":
        return <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border-2 border-[#154D59]/30"></div>
            <div className="absolute inset-8 rounded-full border-2 border-[#154D59]/50"></div>
            <div className="absolute inset-16 rounded-full border-2 border-[#154D59]/70"></div>
            <div className="absolute inset-24 rounded-full border-2 border-[#FEA35D]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FEA35D]"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#FEA35D]/30"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#FEA35D]/30"></div>
            <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-[#B92234] animate-ping"></div>
          </div>
        </div>;
      default:
        return null;
    }
  };

  return (
    <Section id="benefits" className="py-24">
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
          From invisible to unforgettable in 10 weeks.
        </h2>
        <p className="text-md text-white/70 max-w-[720px] text-center font-medium text-balance sm:text-xl">
          Vertical Shortcut transforms passive creators into magnetic presences that capture attention, build influence, and drive real business results.
        </p>
        <div className="grid grid-cols-12 gap-4">
          {bentoItems.map((item, index) => (
            <Tile key={index} className={`col-span-12 ${index === 0 || index === 3 ? 'md:col-span-6 lg:col-span-5' : 'md:col-span-6 lg:col-span-7'}`}>
              <TileLink />
              <TileContent>
                <TileTitle>{item.title}</TileTitle>
                <TileDescription>
                  <p className="max-w-[520px]">
                    {item.description}
                  </p>
                </TileDescription>
              </TileContent>
              <TileVisual className={index === 3 ? "-mb-[96px] sm:-mb-[186px] md:-mx-32" : "min-h-[160px] grow items-center p-4"}>
                {getIllustration(item.visual)}
              </TileVisual>
            </Tile>
          ))}
        </div>
      </div>
    </Section>
  );
};