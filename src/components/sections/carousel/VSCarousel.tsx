import { useTheme } from "next-themes";
import React, { useState } from "react";
import { Section } from "../../ui/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import { Slide, SlideVisual, SlideButton, SlideContent, SlideDescription, SlideExpandedContent, SlideTitle } from "../../ui/slide";
//import * as THUMBNAIL from "assets/main/Course_Teaching_images";
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
  const { resolvedTheme } = useTheme();
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

  return (
    <Section id="curriculum" className="w-full overflow-hidden py-24 bg-[#08141B]">
      <div className="mx-auto flex max-w-container flex-col items-start gap-6 sm:gap-12">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-balance text-3xl font-semibold sm:text-5xl">
            Master every aspect of short-form
          </h2>
          <p className="text-md max-w-[720px] text-balance font-medium text-white/70 sm:text-xl">
            Vertical Shortcut gives you comprehensive mastery over every element that makes short-form content convert, from psychological triggers to monetization strategies. With {courseStats.totalModules}+ modules and {courseStats.resources}+ resources.
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
                  className="grow cursor-pointer bg-[#09232F]/50 border border-white/10"
                  isExpanded={expandedSlides[index]}
                  onClick={() => toggleSlide(index)}
                >
                  <SlideVisual
                    className="fade-bottom-lg min-h-[300px] md:min-h-[400px] items-end overflow-hidden"
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
                      className="h-full min-h-[300px] md:min-h-[400px] w-full origin-top-left object-cover transition-transform duration-300 group-hover:scale-[1.1]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-radial from-[#FEA35D]/20 to-transparent scale-[2.5] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                      aria-hidden="true"
                    />
                  </SlideVisual>
                  <SlideButton
                    isExpanded={expandedSlides[index]}
                    onClick={() => toggleSlide(index)}
                  />
                  <SlideContent isExpanded={expandedSlides[index]}>
                    <SlideDescription className="text-[#FEA35D]">{slide.tagline}</SlideDescription>
                    <SlideTitle className="text-balance">
                      {slide.title}
                    </SlideTitle>
                  </SlideContent>
                  <SlideExpandedContent isExpanded={expandedSlides[index]}>
                    {slide.description}
                    
                    {/* Add related module info if expanded */}
                    {expandedSlides[index] && slide.relatedModule && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-white/70">
                          Learn this in our 
                          <span className="text-[#FEA35D] font-medium"> {
                            featuredModules.find(m => m.id === slide.relatedModule)?.title || 
                            getModulesForSection('theory_basics').find(m => m.id === slide.relatedModule)?.title || 
                            'related'
                          } </span> 
                          module.
                        </p>
                      </div>
                    )}
                  </SlideExpandedContent>
                </Slide>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-12 flex justify-start gap-4">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
      </div>
    </Section>
  );
}