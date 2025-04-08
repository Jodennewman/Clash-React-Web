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
} from "../../ui/slide";
import { Image } from "../../ui/image";
import Glow from "../../ui/glow";
import { Link } from "../../ui/link";

const slides = [
  {
    tagline: "www.brine.co",
    title: "Brine",
    image: "/brine.png",
    href: "https://www.brine.co/",
  },
  {
    tagline: "www.persite.com",
    title: "Persite",
    image: "/persite.png",
    href: "https://mzaremski.com/persite",
  },
  {
    tagline: "www.smigli.com",
    title: "Smigli",
    image: "/smigli.png",
    href: "https://landing.smigli.com/",
  },
  {
    tagline: "www.gramsite.com",
    title: "Gramsite",
    image: "/gramsite.png",
    href: "https://www.gramsite.com/",
  },
];

export default function CarouselExternal() {
  return (
    <Section className="w-full overflow-hidden">
      <div className="mx-auto flex max-w-container flex-col items-start gap-6 sm:gap-12">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-balance text-center text-3xl font-semibold sm:text-5xl">
            Recently built with Launch UI
          </h2>
          <p className="text-md text-balance font-medium text-muted-foreground sm:text-xl">
            Dozens of designers and developers have already built their websites
            with Launch UI.
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
                <Slide className="grow bg-background/100">
                  <Link href={slide.href} target="_blank">
                    <SlideVisual className="fade-bottom-lg min-h-[250px] items-end overflow-hidden md:min-h-[500px]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={900}
                        height={600}
                        className="h-full max-h-[250px] w-full object-cover object-top opacity-50 grayscale invert transition-transform duration-300 group-hover:scale-[1.1] group-hover:opacity-100 md:max-h-[500px] opacity- dark:invert-0"
                      />
                      <Glow
                        variant="center"
                        className="scale-[2.5] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                      />
                    </SlideVisual>
                    <SlideButton icon="link" />
                    <SlideContent>
                      <SlideDescription>{slide.tagline}</SlideDescription>
                      <SlideTitle className="text-balance">
                        {slide.title}
                      </SlideTitle>
                    </SlideContent>
                  </Link>
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
