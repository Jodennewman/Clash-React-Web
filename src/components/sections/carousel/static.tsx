"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Section } from "../../ui/section";
import {
  Slide,
  SlideContent,
  SlideTitle,
  SlideDescription,
  SlideVisual,
} from "../../ui/slide";
import { Image } from "../../ui/image";
import { useTheme } from "../../ui/theme-provider";
import Glow from "../../ui/glow";

const slides = [
  {
    tagline: "Hero sections",
    title: "Start with the right impression",
    imageLight: "/app-light.png",
    imageDark: "/app-dark.png",
  },
  {
    tagline: "Bento grids",
    title: "Showcase your features",
    imageLight: "/app-mail-light.png",
    imageDark: "/app-mail-dark.png",
  },
  {
    tagline: "Navbars",
    title: "Guide your users like a pro",
    imageLight: "/app-settings-light.png",
    imageDark: "/app-settings-dark.png",
  },
  {
    tagline: "Testimonials",
    title: "Prove your success",
    imageLight: "/app-tasks-light.png",
    imageDark: "/app-tasks-dark.png",
  },
  {
    tagline: "Illustrations",
    title: "Showcase your product",
    imageLight: "/mobile-light.png",
    imageDark: "/mobile-dark.png",
  },
];

export default function CarouselStatic() {
  const { resolvedTheme } = useTheme();
  const [expandedSlides, setExpandedSlides] = React.useState<boolean[]>(
    new Array(slides.length).fill(false),
  );

  const toggleSlide = (index: number) => {
    setExpandedSlides((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Section className="w-full overflow-hidden">
      <div className="max-w-container mx-auto flex flex-col items-start gap-6 sm:gap-12">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
            All the components you need
          </h2>
          <p className="text-md text-muted-foreground max-w-[720px] font-medium text-balance sm:text-xl">
            Launch UI provides a comprehensive set of components that includes
            everything you might need to build an effective, modern landing
            page.
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
              <CarouselItem
                key={index}
                className="flex basis-4/5 pl-4 sm:basis-2/3 lg:basis-5/12 xl:basis-1/3"
              >
                <Slide className="grow" isExpanded={expandedSlides[index]}>
                  <SlideVisual
                    className="fade-bottom-lg min-h-[300px] items-end overflow-hidden"
                    isExpanded={expandedSlides[index]}
                  >
                    <Image
                      src={
                        resolvedTheme === "light"
                          ? slide.imageLight
                          : slide.imageDark
                      }
                      alt={slide.title}
                      width={900}
                      height={600}
                      className="h-full max-h-[300px] w-full origin-top-left scale-200 object-cover transition-transform duration-300 group-hover:scale-[2.1]"
                    />
                    <Glow
                      variant="center"
                      className="scale-[2.5] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                    />
                  </SlideVisual>
                  <SlideContent isExpanded={expandedSlides[index]}>
                    <SlideDescription>{slide.tagline}</SlideDescription>
                    <SlideTitle className="text-balance">
                      {slide.title}
                    </SlideTitle>
                  </SlideContent>
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
