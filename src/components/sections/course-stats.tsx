import React, { useLayoutEffect, useRef, useState } from 'react';
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Book, Clock, FileText, FileCode, Layers, CheckSquare } from 'lucide-react';
import courseUtils from "../../lib/course-utils";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Stats items with their respective icons, preserving their original vibrant colors
// as required in CLAUDE.md - converted to OKLCH format for better compatibility
const statItems = [
  { 
    key: 'totalModules', 
    label: 'Modules', 
    icon: Layers,
    color: 'var(--primary-orange)', // #FEA35D
    colorHover: 'var(--primary-orange-hover)'
  },
  { 
    key: 'totalHours', 
    label: 'Hours of Content', 
    icon: Clock,
    color: 'oklch(60% 0.19 25)', // #FF3B30
    colorHover: 'oklch(55% 0.21 25)'
  },
  { 
    key: 'resources', 
    label: 'Resources', 
    icon: CheckSquare,
    color: 'oklch(63% 0.13 250)', // #4A90E2
    colorHover: 'oklch(58% 0.15 250)'
  },
  { 
    key: 'workshops', 
    label: 'Workshops', 
    icon: Book,
    color: 'oklch(75% 0.18 140)', // #34C759
    colorHover: 'oklch(70% 0.20 140)'
  },
  { 
    key: 'pdfs', 
    label: 'PDFs', 
    icon: FileText,
    color: 'oklch(58% 0.21 305)', // #AF52DE
    colorHover: 'oklch(53% 0.23 305)'
  },
  { 
    key: 'templates', 
    label: 'Templates', 
    icon: FileCode,
    color: 'oklch(48% 0.07 230)', // #387292
    colorHover: 'oklch(43% 0.09 230)'
  }
];

const CourseStats = () => {
  const statsRef = useRef(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const animationsRef = useRef([]);
  const scrollTriggersRef = useRef([]);
  
  // Use courseUtils directly without try/catch and fallback
  // This will properly fail if data is missing (as specified in CLAUDE.md)
  const courseStats = courseUtils.courseStats;
  
  // Use layout effect to ensure DOM is ready for GSAP
  useLayoutEffect(() => {
    if (!statsRef.current) return;
    // Clean up any existing animations
    (animationsRef.current as gsap.core.Tween[]).forEach(anim => anim.kill());
    (scrollTriggersRef.current as ScrollTrigger[]).forEach(trigger => trigger.kill());
    animationsRef.current = [];
    scrollTriggersRef.current = [];
    // Simple animation on mount
    const initialAnimation = gsap.fromTo(
      statsRef.current ? (statsRef.current as HTMLElement).querySelectorAll('.stat-item') : [],
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "power2.out",
        onComplete: () => {
          // After items appear, animate the counters
          animateCounters();
          setAnimationCompleted(true);
        }
      }
    );
    
    // TypeScript is complaining because animationsRef.current is initialized as an empty array
    // with no type annotation, so TypeScript infers it as never[].
    // We need to properly type the animations array
    (animationsRef.current as gsap.core.Tween[]).push(initialAnimation);
    
    function animateCounters() {
      // Add null check to prevent TypeScript error
      if (!statsRef.current) return;
      
      // Use type assertion to fix querySelectorAll TypeScript error
      const counterElements = (statsRef.current as HTMLElement).querySelectorAll('.stat-counter');
      counterElements.forEach((element: gsap.TweenTarget, index: number) => {
        // Ensure index is treated as a number
        const key = statItems[index as number].key;
        // Use type assertion to fix index access
        const value = courseStats[key as keyof typeof courseStats] || 0;
        
        // Set initial and final values
        gsap.set(element, { innerText: '0' });
        
        const counterTween = gsap.to(element, {
          duration: 2,
          innerText: value,
          ease: "power2.out",
          roundProps: "innerText",
          onUpdate: function() {
            // Type guard to ensure element is not null
            if (!element) return;
            
            // Type assertion to access innerText property
            const el = element as HTMLElement;
            const currentValue = parseInt(el.innerText, 10);
            
            // Format with commas
            el.innerText = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // Add + for large numbers
            if (value > 100) {
              // Use the same el variable with proper typing that we used above
              el.innerText += '+';
            }
          }
        });
        // Use type assertion to fix the TypeScript error
        (animationsRef.current as gsap.core.Tween[]).push(counterTween);
      });
    }

    return () => {
      // Proper cleanup
      (animationsRef.current as gsap.core.Tween[]).forEach(anim => anim.kill());
      // Fix the TypeScript error by properly typing scrollTriggersRef
      (scrollTriggersRef.current as ScrollTrigger[]).forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <Section className="py-24 bg-[#09232F] border-t border-[#154D59]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
            Program Overview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">By The Numbers</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Vertical Shortcut isn't just another course. It's a comprehensive system built on real-world results and years of testing.
          </p>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {statItems.map((item) => {
            const Icon = item.icon;
            // Fix TypeScript error by using type assertion to safely access the key
            const value = courseStats[item.key as keyof typeof courseStats] || 0;
            
            return (
              <div key={item.key} className="stat-item text-center">
                <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  {/* Glowing background effect */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-20 blur-xl" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div 
                      className="stat-counter text-3xl font-bold mb-2" 
                      style={{ color: item.color }}
                    >
                      {animationCompleted ? value : '0'}
                    </div>
                    
                    <div className="text-sm text-white/70">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default CourseStats;