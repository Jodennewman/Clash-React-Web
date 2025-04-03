import React from 'react';
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import { AnimatedButton } from "../marble-buttons/AnimatedButton";
import courseUtils, { Module, Submodule, Track, tracks, courseStats } from "../../lib/course-utils";
import { BriefcaseBusiness, Clock, BookOpen, CheckCircle, ArrowRightCircle } from "lucide-react";

const FounderTrack = () => {
  // Get the founder modules from our data with null check
  const modules = courseUtils.getFounderModules() || [];
  
  // Get the founder track color with null check
  const founderTrack = tracks?.find(track => track.name === "Founders");
  const founderColor = founderTrack?.color || "#FF3B30";
  
  // Safe access to stats with null checks
  const totalModules = courseStats?.totalModules || 0;
  const founderSpecificModules = courseUtils.getModulesByTrack("Founders")?.length || 0;

  return (
    <Section className="py-24 bg-gradient-to-b from-[#08141B] to-[#09232F]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column - Overview */}
          <div className="lg:w-5/12">
            <Badge variant="section" size="xl" className="mb-4">
              For Busy Entrepreneurs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">The Founders Track</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Specifically designed for time-starved entrepreneurs who need to build personal brands and create content that converts—without sacrificing their core business focus.
            </p>
            
            <div className="bg-[#09232F]/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
              <div className="text-xl font-bold text-white mb-4 flex items-center">
                <BriefcaseBusiness className="w-6 h-6 mr-3" style={{ color: founderColor }} />
                Track Highlights
              </div>
              
              <ul className="space-y-4">
                {[
                  "Balance professional credibility with platform-native authenticity",
                  "Strategic batching techniques that save 70% of your time",
                  "Delegate content creation without losing your unique voice",
                  "Convert viewers into clients and partners without appearing salesy",
                  "Build a personal brand that drives business growth"
                ].map((point, idx) => (
                  <li key={idx} className="flex">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: founderColor }} />
                    <span className="text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-4">
              <AnimatedButton 
                text="Apply for Founders Track"
                variant="start"
                saturation="high"
                size="lg"
                onClick={() => window.location.href = '/application-form'}
                className="w-auto"
              />
              <AnimatedButton 
                text="Schedule a Call"
                variant="docs"
                saturation="normal"
                size="lg"
                onClick={() => window.open('https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call', '_blank')}
                className="w-auto"
              />
            </div>
          </div>
          
          {/* Right Column - Modules */}
          <div className="lg:w-7/12">
            <div className="bg-[#09232F]/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
              <div className="text-xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" style={{ color: founderColor }} />
                Must-Watch Modules for Founders
              </div>
              
              <div className="space-y-4">
                {modules.map((module: Module, index: number) => (
                  <div 
                    key={index}
                    className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-white group-hover:text-[#FEA35D] transition-colors duration-300">
                        {module.title || 'Module'}
                      </h3>
                      <div className="flex items-center text-white/60 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {module.duration || 0} min
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-3">{module.subtitle || ''}</p>
                    
                    {/* Submodules preview - just show first 2 with null check */}
                    <div className="pl-3 border-l-2 mb-3" style={{ borderColor: module.color || '#FEA35D' }}>
                      {(module.submodules || []).slice(0, 2).map((submodule: Submodule, idx: number) => (
                        <div key={idx} className="mb-2">
                          <div className="text-sm font-medium text-white/90">{submodule.title || 'Submodule'}</div>
                          <div className="text-xs text-white/60">{submodule.subtitle || ''}</div>
                        </div>
                      ))}
                      {module.submodules && module.submodules.length > 2 && (
                        <div className="text-sm text-[#FEA35D] flex items-center">
                          +{module.submodules.length - 2} more sections
                          <ArrowRightCircle className="w-3 h-3 ml-1" />
                        </div>
                      )}
                    </div>
                    
                    {/* Resources with null check */}
                    <div className="flex flex-wrap gap-2">
                      {module.submodules && [...new Set((module.submodules || []).flatMap((sm: Submodule) => sm.resources || []))].map((resource: string, i: number) => (
                        <span 
                          key={i}
                          className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-white/60 text-sm text-center">
              Access all {totalModules} modules with full program enrollment, including {founderSpecificModules} founder-specific modules.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FounderTrack;