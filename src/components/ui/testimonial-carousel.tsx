import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialProps[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    testimonialsRef.current = testimonialsRef.current.slice(0, testimonials.length);
  }, [testimonials.length]);

  // Handle animation when active index changes using useGSAP
  useGSAP(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      if (!carouselRef.current) return;

      // Animate out current testimonials
      gsap.to(testimonialsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
        onComplete: () => {
          // Animate in new testimonials
          gsap.fromTo(
            testimonialsRef.current[activeIndex],
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              ease: "power2.out"
            }
          );
        }
      });
    }, carouselRef); // Scope to carousel container
    
    // The context will automatically clean up when the component unmounts or dependencies change
    return () => ctx.revert();
  }, [activeIndex]); // This runs whenever activeIndex changes

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div ref={carouselRef} className="relative vs-testimonial-container p-8 md:p-12">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--theme-primary)]/5 to-transparent opacity-[var(--theme-float-opacity)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[var(--theme-accent-quaternary)]/10 to-transparent opacity-[var(--theme-float-opacity-secondary)] blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={el => {
              testimonialsRef.current[index] = el;
            }}
            className={`transition-opacity duration-300 ${index === activeIndex ? 'block' : 'hidden'}`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-theme-primary shadow-theme-sm transition-all transition-theme-normal">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-theme-gradient-primary flex items-center justify-center rounded-full text-theme-on-primary-theme-sm">
                    "
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <blockquote className="text-xl md:text-2xl font-medium text-theme-primary mb-6 min-h-[150px] md:min-h-[200px] transition-colors transition-theme-normal">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-bold text-theme-primary transition-colors transition-theme-normal">{testimonial.name}</div>
                    <div className="text-theme-secondary transition-colors transition-theme-normal">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
        <Button 
          onClick={prevTestimonial} 
          variant="ghost" 
          size="icon" 
          className="rounded-full border border-theme-border hover:bg-theme-accent/10 hover:border-theme-accent hover-bubbly-sm transition-all transition-theme-normal"
        >
          <ChevronLeft className="h-5 w-5 text-theme-primary" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        
        <div className="flex gap-2 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-[var(--theme-transition-normal)] ${
                index === activeIndex 
                  ? 'bg-theme-accent-secondary w-4' 
                  : 'bg-theme-border w-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <Button 
          onClick={nextTestimonial} 
          variant="ghost" 
          size="icon" 
          className="rounded-full border border-theme-border hover:bg-theme-accent/10 hover:border-theme-accent hover-bubbly-sm transition-all transition-theme-normal"
        >
          <ChevronRight className="h-5 w-5 text-theme-primary" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  );
}
