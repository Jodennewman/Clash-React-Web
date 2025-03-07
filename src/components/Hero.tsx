import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  title = "Attention builds influence", 
  subtitle = "We make f*cking great videos that convert",
  ctaText = "Let's talk",
  onCtaClick
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Animation for hero entrance
    const heroElement = heroRef.current;
    const titleElement = titleRef.current;
    const follower = cursorFollowerRef.current;
    
    if (heroElement && titleElement && follower) {
      // Initial animations
      const tl = gsap.timeline();
      
      tl.from(heroElement, {
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(titleElement.children, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Setup mouse follower animation
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Animate the follower with some lag for a more natural feel
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Clean up event listeners
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Split the title text into spans for individual letter animations
  const renderSplitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="inline-block transition-transform duration-200 hover:text-[#FEA35D] hover:-translate-y-1"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center bg-[#09232F] overflow-hidden"
    >
      {/* Gradient background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#FEA35D]/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#154D59]/20 to-transparent blur-3xl"></div>
      </div>

      {/* Cursor follower effect */}
      <div 
        ref={cursorFollowerRef} 
        className="fixed pointer-events-none w-32 h-32 rounded-full bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] opacity-20 blur-xl"
        style={{ 
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
        }}
      ></div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            {renderSplitText(title)}
          </h1>
          
          <p className="text-xl md:text-2xl text-[#FDEBDD] mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <button 
            onClick={onCtaClick}
            className="px-8 py-4 bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] text-white font-bold rounded-lg text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {ctaText}
          </button>
          
          <div className="mt-20 flex justify-center space-x-10 text-white/50">
            <div className="text-center">
              <span className="block text-4xl font-bold text-[#FEA35D]">800M+</span>
              <span className="text-sm uppercase tracking-wider">Views</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-[#FEA35D]">4.5M+</span>
              <span className="text-sm uppercase tracking-wider">Followers</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-[#FEA35D]">86M+</span>
              <span className="text-sm uppercase tracking-wider">Interactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;