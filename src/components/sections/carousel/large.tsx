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
  SlideButton,
  SlideExpandedContent,
} from "../../ui/slide";
import { Image } from "../../ui/image";
import { useTheme } from "../../ui/theme-provider";
import Glow from "../../ui/glow";

const slides = [
  {
    tagline: "Hero sections",
    title: "Start with the right impression",
    description:
      "These shadcn hero sections are designed to make a strong first impression. They are optimized for maximum performance and deliver smooth animations and responsive interactions without compromising on functionality or design.",
    imageLight: "/app-light.png",
    imageDark: "/app-dark.png",
  },
  {
    tagline: "Bento grids",
    title: "Showcase your features",
    description:
      "These shadcn bento grids are designed to showcase your features in a way that is both functional and visually appealing. They are optimized for maximum performance and deliver smooth animations and responsive interactions without compromising on functionality or design.",
    imageLight: "/app-mail-light.png",
    imageDark: "/app-mail-dark.png",
  },
  {
    tagline: "Navbars",
    title: "Guide your users like a pro",
    description:
      "These shadcn navbars are designed to help you stay organized. They are optimized for maximum performance and deliver smooth animations and responsive interactions without compromising on functionality or design.",
    imageLight: "/app-settings-light.png",
    imageDark: "/app-settings-dark.png",
  },
  {
    tagline: "Testimonials",
    title: "Prove your success",
    description:
      "These shadcn testimonials, quotes, and reviews are designed to showcase your success. They are optimized for maximum performance and deliver smooth animations and responsive interactions without compromising on functionality or design.",
    imageLight: "/app-tasks-light.png",
    imageDark: "/app-tasks-dark.png",
  },
];

export default function CarouselLarge() {
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
      <div className="mx-auto flex max-w-container flex-col items-start gap-6 sm:gap-12">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-balance text-center text-3xl font-semibold sm:text-5xl">
            All the components you need
          </h2>
          <p className="text-md max-w-[720px] text-balance font-medium text-muted-foreground sm:text-xl">
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
              <CarouselItem key={index} className="flex basis-2/3 pl-4">
                <Slide
                  className="grow cursor-pointer"
                  isExpanded={expandedSlides[index]}
                  onClick={() => toggleSlide(index)}
                >
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
                      className="h-full max-h-[300px] w-full origin-top-left object-cover transition-transform duration-300 group-hover:scale-[1.1]"
                    />
                    <Glow
                      variant="center"
                      className="scale-[2.5] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                    />
                  </SlideVisual>
                  <SlideButton
                    isExpanded={expandedSlides[index]}
                    onClick={() => toggleSlide(index)}
                  />
                  <SlideContent isExpanded={expandedSlides[index]}>
                    <SlideDescription>{slide.tagline}</SlideDescription>
                    <SlideTitle className="text-balance">
                      {slide.title}
                    </SlideTitle>
                  </SlideContent>
                  <SlideExpandedContent isExpanded={expandedSlides[index]}>
                    {slide.description}
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
