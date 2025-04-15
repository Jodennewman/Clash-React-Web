import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import { AnimatedButton } from "../marble-buttons/AnimatedButton";
import courseUtils, { Module, Submodule, Track, tracks, courseStats } from "../../lib/course-utils";
import { BriefcaseBusiness, Clock, BookOpen, CheckCircle, ArrowRightCircle, Zap, Calendar, Users, Video } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Slide, SlideVisual, SlideButton, SlideContent, SlideDescription, SlideExpandedContent, SlideTitle } from "../ui/slide";

interface FounderTrackProps {
  onCtaClick?: () => void;
}

// Founder Module Card component
const FounderModuleCard: React.FC<{
  module: Module;
  onPreview?: () => void;
  founderColor?: string;
}> = ({ module, onPreview, founderColor = "#FF3B30" }) => {
  return (
    <div 
      className="transition-all duration-300 
                cursor-pointer
                hover:translate-y-[-2px] w-full h-full p-4 sm:p-5 md:p-6
                flex flex-col"
    >
      {/* Thumbnail */}
      <div className="rounded-lg overflow-hidden mb-3 md:mb-4">
        <img 
          src={courseUtils.getThumbnailPath(module.thumbnail)} 
          alt={module.title}
          className="w-full h-auto object-cover rounded-lg shadow-theme-sm"
        />
      </div>
      
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-theme-primary mb-1 md:mb-2">{module.title}</h3>
      <p className="text-theme-secondary mb-3 md:mb-4 text-xs sm:text-sm line-clamp-3">{module.subtitle}</p>
      
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <div className="flex items-center text-xs sm:text-sm text-theme-secondary">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-theme-accent-secondary" />
          <span>{module.duration || 0} min</span>
        </div>
        <div className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-theme-accent-secondary text-white">
          Founder Essential
        </div>
      </div>
      
      {/* Content area with flex-grow to push button to bottom */}
      <div className="flex-grow">
        <div className="mt-3 md:mt-4">
          <div className="text-xs sm:text-sm font-semibold text-theme-primary mb-1 md:mb-2">Key Points:</div>
          <ul className="space-y-1 md:space-y-2">
            {/* Show all points with responsive visibility instead of using window.innerWidth */}
            {(module.points || []).map((point, idx) => (
              <li key={idx} className={`flex items-start ${idx >= 3 ? 'hidden md:flex' : ''}`}>
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-theme-accent mt-0.5" />
                <span className="text-theme-secondary text-xs sm:text-sm">{point}</span>
              </li>
            ))}
            {/* Show "more points" indicator conditionally with CSS */}
            {(module.points?.length || 0) > 3 && (
              <li className="md:hidden text-[10px] sm:text-xs text-theme-accent pl-5">
                +{(module.points?.length || 0) - 3} more points
              </li>
            )}
          </ul>
        </div>
        
        {module.submodules && module.submodules.length > 0 && (
          <div className="mt-3 md:mt-4">
            <div className="text-xs sm:text-sm font-semibold text-theme-primary mb-1 md:mb-2">Includes:</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center text-theme-secondary text-xs sm:text-sm">
                <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-theme-accent" />
                <span>{module.submodules.length} lessons</span>
              </div>
              <div className="flex items-center text-theme-secondary text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-theme-accent" />
                <span>{Math.ceil(module.duration / 20)} sessions</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Button always at the bottom */}
      <div className="mt-4 sm:mt-5 md:mt-6">
        <AnimatedButton 
          text="Preview Module"
          variant="docs"
          saturation="normal"
          size="md"
          onClick={(e) => {
            if (onPreview) {
              e.stopPropagation();
              onPreview();
            }
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

const FounderTrack: React.FC<FounderTrackProps> = ({ onCtaClick }) => {
  // Get the founder modules from our data with null check
  const founderModules = courseUtils.getFounderModules() || [];
  
  // Get the founder track color with null check
  const founderTrack = tracks?.find(track => track.name === "Founders");
  const founderColor = founderTrack?.color || "#FF3B30";
  
  // Safe access to stats with null checks
  const totalModules = courseStats?.totalModules || 0;
  const founderSpecificModules = founderModules.length; // Use the founder modules array directly

  // Refs for animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const highlightsRef = useRef(null);
  const carouselRef = useRef(null);

  // Animations
  useGSAP(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const distance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const duration = styles.getPropertyValue('--theme-anim-duration') || '0.35s';
    
    const ctx = gsap.context(() => {
      // Staggered fade-in
      gsap.fromTo([titleRef.current, subtitleRef.current, contentRef.current, highlightsRef.current, carouselRef.current],
        {
          y: '20px',
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }
      );
      
      // Floating elements animation
      gsap.to(".floating-element", {
        y: "-=12",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }, containerRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);

  return (
    <Section className="py-24 bg-theme-gradient overflow-hidden relative" ref={containerRef}>
      {/* Floating decorative elements */}
      <div className="absolute -z-10 w-20 h-20 rounded-[40%] rotate-12 top-20 left-[10%] 
                     opacity-theme-float bg-theme-float-primary floating-element"></div>
      <div className="absolute -z-10 w-16 h-16 rounded-[40%] rotate-45 bottom-24 right-[15%]
                     opacity-theme-float bg-theme-float-secondary floating-element"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column - Overview */}
          <div className="lg:w-5/12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 mx-auto md:mx-0 max-w-[90%] md:max-w-none text-theme-primary" ref={titleRef}>
              The Founders Track
            </h2>
            <p className="body-text mb-6 mx-auto md:mx-0 max-w-[90%] md:max-w-none" ref={subtitleRef}>
              Built exactly for founders.
            </p>
            <p className="body-text mb-8 mx-auto md:mx-0 max-w-[90%] md:max-w-none" ref={contentRef}>
              I'm sure at this point you're mindful of your time and how much of it this course will take (especially if you've actually read all of this copy). Which is why we've built the Vertical Shortcut with the founders track in mind. 
              
              <br/><br/>
              
              Basically, the Founder's Track is an easy way to scan the course for the modules you actually <strong>have</strong> to watch, and the modules you can pass onto your team.
            </p>
            
            {/* Track Highlights - No featured module card */}
            <div className="bg-theme-surface shadow-theme-md rounded-xl p-6 mb-8" ref={highlightsRef}>
              <div className="text-xl font-bold text-theme-primary flex items-center mb-4">
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
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 text-theme-accent" />
                    <span className="text-theme-secondary">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton 
                text="Find Your Implementation"
                variant="start"
                saturation="high"
                size="lg"
                onClick={onCtaClick}
                className="w-auto"
              />
              <AnimatedButton 
                text="Schedule a Call"
                variant="docs"
                saturation="normal"
                size="lg"
                onClick={onCtaClick}
                className="w-auto"
              />
            </div>
          </div>
          
          {/* Right Column - Modules Carousel */}
          <div className="lg:w-7/12" ref={carouselRef}>
            <div className="bg-theme-surface shadow-theme-md rounded-xl p-6 mb-6 overflow-hidden bg-gradient-to-br from-[#F8F9FB] to-[#EDF0F5] dark:from-[#1A1F29] dark:to-[#111827]">
              <div className="text-xl font-bold text-theme-primary flex items-center mb-6">
                <Zap className="w-6 h-6 mr-3 text-theme-accent" />
                Must-Watch Modules for Founders
              </div>
              
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    startIndex: 0,
                  }}
                  className="w-full overflow-hidden"
                >
                  <CarouselContent className="-ml-4 overflow-visible px-6 sm:px-8 md:px-12">
                    {/* Make sure we have modules to display */}
                    {founderModules.length > 0 ? (
                      founderModules.map((module: Module, index: number) => (
                        <CarouselItem key={index} className="flex pl-4 basis-full sm:basis-full md:basis-3/4 lg:basis-2/3 p-3 md:p-4 pb-6 md:pb-8">
                          {/* Card wrapper with theme-aware background color */}
                          <div className="h-full min-h-[500px] bg-theme-surface rounded-xl shadow-theme-sm hover:shadow-theme-md transition-all duration-300 border border-theme-border/30">
                            <FounderModuleCard 
                              module={module}
                              onPreview={onCtaClick}
                              founderColor={founderColor}
                            />
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      // Display a placeholder message if no modules are found
                      <CarouselItem className="flex pl-4 basis-full sm:basis-full md:basis-3/4 lg:basis-2/3 p-3 md:p-4">
                        <div className="w-full h-full min-h-[300px] bg-theme-surface rounded-xl p-6 shadow-theme-sm flex flex-col items-center justify-center text-center text-theme-secondary">
                          <div className="mb-5">
                            <Zap className="w-12 h-12 md:w-16 md:h-16 mx-auto text-theme-accent-secondary opacity-50" />
                          </div>
                          <p className="text-xl md:text-2xl font-medium mb-3">No founder modules found</p>
                          <p className="text-sm md:text-base max-w-md mx-auto">Founder specific modules will appear here when available.</p>
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  <div className="mt-6 flex justify-center gap-4">
                    <CarouselPrevious className="vs-carousel-prev" />
                    <CarouselNext className="vs-carousel-next" />
                  </div>
                </Carousel>
                
                {/* Create custom navigation buttons that mimic the functionality - responsive for mobile */}
                <button 
                  className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 
                           bg-theme-gradient-primary 
                           p-2 sm:p-2.5 md:p-3 
                           rounded-full shadow-theme-md text-white 
                           hover:scale-110 transition-transform duration-300 
                           border border-white/20"
                  onClick={() => document.querySelector('.vs-carousel-prev')?.click()}
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       width="16" height="16" 
                       className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                
                <button 
                  className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 
                           bg-theme-gradient-primary 
                           p-2 sm:p-2.5 md:p-3
                           rounded-full shadow-theme-md text-white 
                           hover:scale-110 transition-transform duration-300 
                           border border-white/20"
                  onClick={() => document.querySelector('.vs-carousel-next')?.click()}
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       width="16" height="16"
                       className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="text-theme-tertiary text-sm text-center">
              Access all {totalModules} modules with full program enrollment, including {founderSpecificModules} founder-specific modules.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FounderTrack;