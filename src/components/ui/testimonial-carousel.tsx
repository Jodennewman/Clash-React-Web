import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { VSBackground, VSCard } from './vs-background'; // Use theme-aware components
import { VSText, VSHeading } from './vs-text';
import { useDeviceDetection } from '../../utils/animation-utils'; // Import device detection

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetection(); // Use hook
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // For auto-play

  // Function to go to next slide
  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
       // Reset timeout if it exists
       if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
       }
       // Set new timeout only on desktop
       if (!isMobile) { 
         timeoutRef.current = setTimeout(goToNext, 5000); // Change slide every 5 seconds
       }
    };

    startAutoPlay();

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, testimonials.length, goToNext, isMobile]); // Add isMobile dependency

  // GSAP Animation for slide transitions
  useGSAP(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
       const slides = carouselRef.current?.querySelectorAll('.testimonial-slide');
       if (!slides) return;

       // Hide all slides initially
       gsap.set(slides, { opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%' });

       // Animate the active slide
       const activeSlide = slides[activeIndex];
       if (activeSlide) {
         if (isMobile) {
           // Simple fade transition for mobile (as per plan)
           gsap.fromTo(
             activeSlide,
             { opacity: 0, y: 10 }, // Start slightly lower
             { 
               opacity: 1, 
               y: 0,
               duration: 0.6, // Slightly faster
               ease: "power2.out",
               position: 'relative', // Make active slide relative to take space
             }
           );
         } else {
           // Desktop animation (example: fade and slight scale)
           gsap.fromTo(
             activeSlide,
             { opacity: 0, scale: 0.98 },
             { 
               opacity: 1, 
               scale: 1,
               duration: 0.7,
               ease: "power3.out",
               position: 'relative',
             }
           );
         }
       }
    }, carouselRef);

    return () => ctx.revert();
  }, [activeIndex, isMobile]); // Add isMobile dependency

  return (
    <VSBackground 
      as="section" 
      className="py-16 md:py-24 bg-gradient-to-b from-[var(--theme-bg-alt)] to-[var(--theme-bg-primary)] dark:from-[var(--theme-bg-secondary)] dark:to-[var(--theme-bg-primary)]"
    >
      <div className="container-mobile mx-auto text-center">
        <VSHeading size="xl" className="mb-4 text-theme-primary">
          Don't Just Take Our Word For It
        </VSHeading>
        <VSText size="lg" color="text-theme-secondary" className="mb-12 max-w-3xl mx-auto">
          Hear directly from founders and creators who transformed their content and business with Vertical Shortcut.
        </VSText>
      </div>

      {/* Apply conditional padding and adjusted mobile height */}
      <div 
        ref={carouselRef} 
        className={`relative ${isMobile ? 'px-4' : 'px-12'} max-w-4xl mx-auto overflow-hidden ${isMobile ? 'h-80' : 'h-64'}`} // Adjusted height for mobile
      >
        {/* Carousel slides container - position relative */}
        <div className="relative w-full h-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-index={index}
              className={`testimonial-slide absolute inset-0 w-full h-full`} // Removed transition/opacity classes, handled by GSAP
            >
              {/* Use VSCard for consistent styling */}
              <VSCard className={`flex flex-col justify-center text-left w-full h-full ${isMobile ? 'p-6' : 'p-8'} shadow-theme-lg`}> {/* Adjusted padding */}
                <VSText size={isMobile ? 'md' : 'lg'} color="text-theme-primary" className="mb-6 italic">
                  "{testimonial.quote}"
                </VSText>
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-theme-accent"
                  />
                  <div>
                    <VSText size="md" color="text-theme-primary" className="font-semibold">{testimonial.name}</VSText>
                    <VSText size="sm" color="text-theme-secondary">{testimonial.role}</VSText>
                  </div>
                </div>
              </VSCard>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile-optimized controls */}
      {/* Apply conditional margin-top */}
      <div className={`flex justify-center ${isMobile ? 'mt-4' : 'mt-8'}`}> 
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)} // Go to specific slide on click
            // Apply conditional size
            className={`mx-1.5 ${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} rounded-full transition-colors duration-300 ${ 
              index === activeIndex 
                ? 'bg-theme-accent' 
                : 'bg-theme-text-subtle hover:bg-theme-text-secondary'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </VSBackground>
  );
};

export default TestimonialCarousel;
