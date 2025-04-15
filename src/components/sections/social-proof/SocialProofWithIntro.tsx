import React, { useEffect, useRef, useState } from 'react';
// Note: GSAP and ScrollTrigger need to be imported in your project
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

const WordRoller = ({ 
  words = [
    "you've",
    "probably",
    "seen",
    "our",
    "content",
    "before."
  ],
  className = "",
  onComplete = () => {},
  duration = 1, // Duration in viewport heights (e.g., 1 = 1 full viewport)
}) => {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef(null);
  
  // Calculate gradient colors for items
  const getItemColor = (index) => {
    // Gradient from oklch(64.5% 0.246 16.439) to oklch(82.8% 0.189 84.429)
    const totalItems = words.length;
    const lerp = (start, end, t) => start + (end - start) * t;
    const t = totalItems > 1 ? index / (totalItems - 1) : 0;
    
    const lightness = lerp(64.5, 82.8, t);
    const chroma = lerp(0.246, 0.189, t);
    const hue = lerp(16.439, 84.429, t);
    
    return `oklch(${lightness}% ${chroma} ${hue})`;
  };
  
  useEffect(() => {
    // Early return if component isn't mounted or GSAP isn't available
    if (!sectionRef.current || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Reset refs
    wordsRef.current = wordsRef.current.slice(0, words.length);
    
    // Set up GSAP ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center", // Start when top of section hits center of viewport
      end: `+=${duration * 100}vh`, // End after scrolling X viewport heights
      pin: true, // Pin the section during the animation
      anticipatePin: 1, // Improves performance
      scrub: 0.5, // Smooth scrubbing - adjust value as needed (0 = no smoothing)
      onUpdate: (self) => {
        // Calculate which word to show based on scroll progress
        const progress = self.progress;
        const newIndex = Math.min(
          words.length - 1,
          Math.floor(progress * words.length)
        );
        
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
        
        // If we're at the end, trigger completion
        if (Math.abs(self.progress - 1) < 0.01 && newIndex === words.length - 1) {
          onComplete();
        }
      }
    });
    
    // Return cleanup function
    return () => {
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, [words.length, duration, onComplete]);
  
  return (
    <div 
      ref={sectionRef}
      className={`h-screen w-full flex items-center justify-center ${className}`}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* Screen reader content */}
        <span className="sr-only">{words[activeIndex]}</span>
        
        {words.map((word, i) => (
          <div
            key={i}
            ref={el => wordsRef.current[i] = el}
            className={`absolute inset-0 flex items-center justify-center ${className}`}
            style={{
              color: getItemColor(i),
              opacity: activeIndex === i ? 1 : 0,
              filter: activeIndex === i ? 'brightness(1.2)' : 'none',
              transition: 'opacity 0.4s ease, filter 0.4s ease',
              fontSize: 'clamp(5rem, 15vw, 25rem)',
              lineHeight: '1',
              pointerEvents: 'none'
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordRoller;