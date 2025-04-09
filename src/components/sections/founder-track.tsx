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

const FounderTrack: React.FC<FounderTrackProps> = ({ onCtaClick }) => {
  // Get the founder modules from our data with null check
  const founderModules = courseUtils.getFounderModules() || [];
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  
  // Get the founder track color with null check
  const founderTrack = tracks?.find(track => track.name === "Founders");
  const founderColor = founderTrack?.color || "#FF3B30";
  
  // Safe access to stats with null checks
  const totalModules = courseStats?.totalModules || 0;
  const founderSpecificModules = courseUtils.getModulesByTrack("Founders")?.length || 0;
  
  // For featured module we'll use the first module by default but can be expanded
  useEffect(() => {
    if (founderModules.length > 0) {
      setSelectedModule(founderModules[0]);
    }
  }, [founderModules]);

  // For expandable carousel items
  const [expandedSlides, setExpandedSlides] = useState(new Array(founderModules.length).fill(false));
  
  const toggleSlide = (index: number) => {
    setExpandedSlides((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

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
            <div ref={titleRef}>
              <Badge variant="section" size="xl" className="mb-4">
                For Busy Entrepreneurs
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 mx-auto md:mx-0 max-w-[90%] md:max-w-none" ref={subtitleRef}>
              <span className="text-theme-gradient">The Founders Track</span>
            </h2>
            <p className="text-lg md:text-xl text-theme-secondary mb-8 mx-auto md:mx-0 max-w-[90%] md:max-w-none" ref={contentRef}>
              Built exactly for founders.
            </p>
            <p className="text-lg text-theme-secondary mb-8 mx-auto md:mx-0 max-w-[90%] md:max-w-none">
              I'm sure at this point you're mindful of your time and how much of it this course will take (especially if you've actually read all of this copy). Which is why we've built the Vertical Shortcut with the founders track in mind. 
              
              <br/><br/>
              
              Basically, the Founder's Track is an easy way to scan the course for the modules you actually <strong>have</strong> to watch, and the modules you can pass onto your team.
            </p>
            
            {/* Featured Founder Module Display with rich details */}
            <div className="bg-theme-surface shadow-theme-md rounded-xl p-6 mb-8" ref={highlightsRef}>
              {selectedModule ? (
                <div>
                  <div className="text-xl font-bold text-theme-primary flex items-center mb-4">
                    <Zap className="w-6 h-6 mr-3" style={{ color: founderColor }} />
                    Featured Founder Module
                  </div>
                  
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={courseUtils.getThumbnailPath(selectedModule.thumbnail)} 
                      alt={selectedModule.title}
                      className="w-full h-auto object-cover rounded-lg shadow-theme-sm"
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold text-theme-primary mb-2">{selectedModule.title}</h3>
                  <p className="text-theme-secondary mb-4 text-sm">{selectedModule.subtitle}</p>
                  
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center text-sm text-theme-secondary">
                      <Clock className="w-4 h-4 mr-1 text-theme-accent-secondary" />
                      <span>{selectedModule.duration || 0} minutes</span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs bg-theme-accent-secondary text-white">
                      Founder Essential
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-theme-primary mb-2">Key Points:</div>
                    <ul className="space-y-2">
                      {(selectedModule.points || []).map((point, idx) => (
                        <li key={idx} className="flex">
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-theme-accent" />
                          <span className="text-theme-secondary text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedModule.submodules && selectedModule.submodules.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-semibold text-theme-primary mb-2">Includes:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center text-theme-secondary text-sm">
                          <Video className="w-4 h-4 mr-1 text-theme-accent" />
                          <span>{selectedModule.submodules.length} lessons</span>
                        </div>
                        <div className="flex items-center text-theme-secondary text-sm">
                          <Calendar className="w-4 h-4 mr-1 text-theme-accent" />
                          <span>{Math.ceil(selectedModule.duration / 20)} sessions</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <AnimatedButton 
                      text="Preview Module"
                      variant="docs"
                      saturation="normal"
                      size="md"
                      onClick={onCtaClick}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div>
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
              )}
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
            <div className="bg-theme-surface shadow-theme-md rounded-xl p-6 mb-6">
              <div className="text-xl font-bold text-theme-primary flex items-center mb-6">
                <Zap className="w-6 h-6 mr-3 text-theme-accent" />
                Must-Watch Modules for Founders
              </div>
              
              <Carousel
                opts={{
                  align: "start",
                  startIndex: 0,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {founderModules.map((module: Module, index: number) => (
                    <CarouselItem key={index} className="flex pl-4 md:basis-1/2 lg:basis-3/4">
                      <Slide
                        className={`grow cursor-pointer group bg-theme-gradient shadow-theme-sm hover:shadow-theme-md transition-all duration-300 ${selectedModule?.id === module.id ? 'ring-2 ring-theme-accent-secondary' : ''}`}
                        isExpanded={expandedSlides[index]}
                        onClick={(e) => {
                          // Toggle slide expansion
                          toggleSlide(index);
                          
                          // Set as selected module to display in the left panel
                          setSelectedModule(module);
                          
                          // Prevent event bubbling
                          e.stopPropagation();
                        }}
                      >
                        <SlideVisual
                          className="items-start overflow-hidden rounded-t-xl p-4 h-[120px]"
                          isExpanded={expandedSlides[index]}
                        >
                          <div 
                            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs bg-theme-accent-secondary text-white flex items-center"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {module.duration || 0} min
                          </div>
                          
                          <div className="relative z-10">
                            <div className="text-xs uppercase tracking-wider font-medium text-theme-accent mb-1">
                              Founder Essential
                            </div>
                            <h3 className="font-bold text-xl text-theme-primary">
                              {module.title || 'Module'}
                            </h3>
                          </div>

                          {/* Selected indicator */}
                          {selectedModule?.id === module.id && (
                            <div className="absolute top-3 left-3 w-3 h-3 bg-theme-accent-secondary rounded-full"></div>
                          )}

                          {/* Hover effect overlay */}
                          <div
                            className="absolute inset-0 bg-theme-accent/10 scale-[2.5] opacity-0 transition-all duration-500 group-hover:opacity-40"
                            aria-hidden="true"
                          />
                        </SlideVisual>
                        
                        <SlideButton
                          isExpanded={expandedSlides[index]}
                          onClick={(e) => {
                            toggleSlide(index);
                            e.stopPropagation();
                          }}
                          className="bg-theme-accent text-white"
                        />
                        
                        <SlideContent isExpanded={expandedSlides[index]} className="p-6">
                          <SlideDescription className="text-theme-secondary text-sm">
                            {module.subtitle || ''}
                          </SlideDescription>
                        </SlideContent>
                        
                        <SlideExpandedContent isExpanded={expandedSlides[index]} className="px-6 pb-6">
                          <div className="text-theme-secondary mb-4">
                            {module.subtitle || ''}
                          </div>
                          
                          {/* Submodules preview with null check */}
                          <div className="pl-3 border-l-2 mb-3 border-theme-accent">
                            <div className="text-sm uppercase tracking-wider font-medium text-theme-accent mb-2">Key Topics</div>
                            {(module.submodules || []).slice(0, 3).map((submodule: Submodule, idx: number) => (
                              <div key={idx} className="mb-2">
                                <div className="text-sm font-medium text-theme-primary">{submodule.title || 'Submodule'}</div>
                                <div className="text-xs text-theme-secondary">{submodule.subtitle || ''}</div>
                              </div>
                            ))}
                            {module.submodules && module.submodules.length > 3 && (
                              <div className="text-sm text-theme-accent flex items-center mt-2">
                                +{module.submodules.length - 3} more sections
                                <ArrowRightCircle className="w-3 h-3 ml-1" />
                              </div>
                            )}
                          </div>
                          
                          {/* Resources with null check */}
                          <div className="mt-4">
                            <div className="text-sm uppercase tracking-wider font-medium text-theme-accent mb-2">Included Resources</div>
                            <div className="flex flex-wrap gap-2">
                              {module.submodules && [...new Set((module.submodules || []).flatMap((sm: Submodule) => sm.resources || []))].map((resource: string, i: number) => (
                                <span 
                                  key={i}
                                  className="text-xs bg-theme-surface/80 px-2 py-1 rounded-full text-theme-secondary border border-theme-border"
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          </div>
                        </SlideExpandedContent>
                      </Slide>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="mt-8 flex justify-start gap-4">
                  <CarouselPrevious className="static vs-carousel-btn" />
                  <CarouselNext className="static vs-carousel-btn" />
                </div>
              </Carousel>
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