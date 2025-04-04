import { useTheme } from "../../ui/theme-provider";
import React, { useState } from "react";
import { Section } from "../../ui/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import { Slide, SlideVisual, SlideButton, SlideContent, SlideDescription, SlideExpandedContent, SlideTitle } from "../../ui/slide";
import { 
  featuredModules, 
  getModulesForSection, 
  courseStats
} from "../../../lib/course-utils";

// Map between module icons/themes and slide topics
const moduleToSlideMapping = {
  "hook": {
    tagline: "Hook Engineering",
    title: "Stop viewers in their tracks",
    description: "Master the psychological art of creating hooks that capture attention in the first 3 seconds. Our students report an average 300% increase in watch time after implementing our hook frameworks.",
    imageLight: "/hook-engineering-light.jpg",
    imageDark: "/hook-engineering-dark.jpg",
    relatedModule: "hooking_fundamentals"
  },
  "strategy": {
    tagline: "Content Systems",
    title: "Create a content machine",
    description: "Build scalable systems that turn you from a one-person show into a content powerhouse. Produce 5x more content with half the effort while maintaining authenticity and quality that resonates with your audience.",
    imageLight: "/content-systems-light.jpg",
    imageDark: "/content-systems-dark.jpg",
    relatedModule: "strategy_pillars"
  },
  "money-pro": {
    tagline: "Monetization Mastery",
    title: "Convert views into revenue",
    description: "Transform passive viewers into paying customers with our proven monetization frameworks. Our students have generated over £12 million in revenue directly attributable to short-form content strategies.",
    imageLight: "/monetization-light.jpg",
    imageDark: "/monetization-dark.jpg",
    relatedModule: "monetisation_pro"
  },
  "algorithm": {
    tagline: "Platform Optimization",
    title: "Crack the algorithm code",
    description: "Decode exactly what each platform's algorithm rewards and how to optimize your content specifically for TikTok, Instagram, YouTube Shorts, and LinkedIn. Stop guessing what works and start knowing.",
    imageLight: "/platform-light.jpg",
    imageDark: "/platform-dark.jpg",
    relatedModule: "algorithmic_reality"
  }
};

export default function VSCarousel() {
  const { theme } = useTheme();
  const resolvedTheme = theme === 'system' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme;
  const [expandedSlides, setExpandedSlides] = useState(new Array(4).fill(false));

  const toggleSlide = (index: number) => {
    setExpandedSlides((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Create slides based on featured modules
  const slides = Object.values(moduleToSlideMapping);
  
  // Safe access to course stats with defaults
  const totalModules = courseStats?.totalModules || 0;
  const totalResources = courseStats?.resources || 0;

  // Function to find module title with proper null checks
  const findModuleTitle = (moduleId: string): string => {
    // First try to find in featured modules
    const featuredModule = featuredModules?.find(m => m.id === moduleId);
    if (featuredModule?.title) return featuredModule.title;
    
    // Then try to find in theory basics section
    const theoryBasicsModules = getModulesForSection('theory_basics') || [];
    const basicModule = theoryBasicsModules.find(m => m.id === moduleId);
    if (basicModule?.title) return basicModule.title;
    
    // Default fallback
    return 'module';
  };

  return (
    <Section id="curriculum" className="w-full overflow-hidden py-24 bg-[--bg-navy-gradient] dark:bg-[--bg-navy-gradient]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-6 sm:gap-12 mb-12">
          {/* Accent badge */}
          <div className="inline-block mb-2 bg-[--primary-orange]/10 backdrop-blur-sm px-4 py-2 rounded-full max-w-max border border-[--primary-orange]/20">
            <span className="text-[--primary-orange] dark:text-[--primary-orange-light] font-semibold">Comprehensive Curriculum</span>
          </div>
          
          <h2 className="text-balance text-4xl md:text-5xl font-bold relative group">
            <span className="text-[--text-cream] dark:text-white">
              Master every aspect of <span className="relative inline-block">
                short-form
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[--primary-orange] to-[--accent-coral] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></span>
              </span>
            </span>
          </h2>
          
          <p className="text-xl max-w-[720px] text-balance text-[--text-cream]/80 dark:text-white/80">
            Vertical Shortcut gives you comprehensive mastery over every element that makes short-form content convert, from psychological triggers to monetization strategies. With {totalModules}+ modules and {totalResources}+ resources.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            startIndex: 0,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="flex pl-4 md:basis-1/2 lg:basis-2/5">
                <Slide
                  className="grow cursor-pointer bg-[--card-bg-navy] border border-white/10 rounded-xl shadow-lg transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-xl hover:translate-y-[-6px] hover:scale-[1.02] hover:rotate-[0.5deg] group"
                  isExpanded={expandedSlides[index]}
                  onClick={() => toggleSlide(index)}
                >
                  <SlideVisual
                    className="fade-bottom-lg min-h-[300px] md:min-h-[400px] items-end overflow-hidden rounded-t-xl"
                    isExpanded={expandedSlides[index]}
                  >
                    <img
                      src={
                        resolvedTheme === "light"
                          ? slide.imageLight
                          : slide.imageDark
                      }
                      alt={slide.title}
                      width={900}
                      height={600}
                      className="h-full min-h-[300px] md:min-h-[400px] w-full origin-center object-cover transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08]"
                    />
                    {/* Gradient overlay with pulsing animation */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[--bg-navy]/90 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-radial from-[--primary-orange]/20 to-transparent scale-[2.5] opacity-0 transition-all duration-500 group-hover:opacity-40 animate-pulse"
                      aria-hidden="true"
                    />
                  </SlideVisual>
                  
                  <SlideButton
                    isExpanded={expandedSlides[index]}
                    onClick={() => toggleSlide(index)}
                    className="transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:bg-[--primary-orange]"
                  />
                  
                  <SlideContent isExpanded={expandedSlides[index]} className="p-6">
                    <SlideDescription className="text-[--primary-orange] dark:text-[--primary-orange-light] text-sm font-medium uppercase tracking-wider mb-2">
                      {slide.tagline || ''}
                    </SlideDescription>
                    
                    <SlideTitle className="text-balance text-2xl font-bold mb-2 text-[--text-navy] dark:text-white">
                      {slide.title || ''}
                    </SlideTitle>
                  </SlideContent>
                  
                  <SlideExpandedContent isExpanded={expandedSlides[index]} className="px-6 pb-6">
                    <div className="text-[--text-navy]/80 dark:text-white/80">
                      {slide.description || ''}
                    </div>
                    
                    {/* Add related module info if expanded */}
                    {expandedSlides[index] && slide.relatedModule && (
                      <div className="mt-4 pt-4 border-t border-[--text-navy]/10 dark:border-white/10">
                        <div className="text-sm text-[--text-navy]/70 dark:text-white/70">
                          Learn this in our 
                          <span className="text-[--primary-orange] dark:text-[--primary-orange-light] font-medium"> {
                            findModuleTitle(slide.relatedModule)
                          } </span> 
                          module.
                        </div>
                      </div>
                    )}
                  </SlideExpandedContent>
                </Slide>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="mt-12 flex justify-start gap-4">
            <CarouselPrevious className="static bg-[--primary-orange]/10 border-[--primary-orange]/20 transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[--primary-orange]/20 hover:scale-110 hover:translate-y-[-3px]" />
            <CarouselNext className="static bg-[--primary-orange]/10 border-[--primary-orange]/20 transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[--primary-orange]/20 hover:scale-110 hover:translate-y-[-3px]" />
          </div>
        </Carousel>
      </div>
    </Section>
  );
}