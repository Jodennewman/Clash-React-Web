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
    
    // Enhanced VS Bubbly animation on mount - more pronounced (20% more)
    const initialAnimation = gsap.fromTo(
      statsRef.current ? (statsRef.current as HTMLElement).querySelectorAll('.stat-item') : [],
      { y: 40, opacity: 0, scale: 0.95 }, // More pronounced starting position
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        stagger: 0.12, // Slightly longer stagger
        duration: 0.6,  // Slightly longer duration 
        ease: "back.out(1.2)", // More springy easing
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
    <Section className="py-24 bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)] border-t border-[var(--text-navy)]/10 dark:border-[var(--text-cream)]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-[var(--bg-cream-darker)] dark:bg-[var(--text-cream)]/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
            <span style={{ color: 'var(--primary-orange)' }} className="dark:text-[var(--primary-orange-light)]">
              Program Overview
            </span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span style={{ color: 'var(--text-navy)' }} className="dark:text-white">By The Numbers</span>
          </h2>
          <p className="text-xl mb-2 max-w-3xl mx-auto dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
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
                <div className="relative bg-white dark:bg-[#09232F] rounded-[var(--border-radius-lg)] p-6 
                               border border-[rgba(0,0,0,0.05)] dark:border-white/5 
                               shadow-[var(--shadow-md)] dark:shadow-[var(--shadow-lg)]
                               transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                               hover:shadow-[var(--shadow-lg)] dark:hover:shadow-[var(--shadow-lg)]
                               group h-full">
                  {/* Light mode subtle gradient background */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] 
                              opacity-100 dark:opacity-0 transition-all duration-500" 
                    style={{ background: `linear-gradient(to bottom, white 30%, ${item.color}15 100%)` }}
                  ></div>
                  
                  {/* Dark mode gradient with enhanced glow */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] 
                              opacity-0 dark:opacity-100 transition-all duration-500" 
                    style={{ background: `linear-gradient(135deg, #09232F 0%, ${item.color}30 100%)` }}
                  ></div>
                  
                  {/* Hover glow effect for dark mode */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)]
                              opacity-0 dark:group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 25px ${item.color}40` }}
                  ></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icon with playful springy animation */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
                               transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               group-hover:scale-[1.15] group-hover:translate-y-[-2px]"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.colorHover} 100%)`,
                        boxShadow: `0 6px 15px ${item.color}40`
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Value with enhanced scale and glow effect */}
                    <div 
                      className="stat-counter text-3xl font-bold mb-2 
                               transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               group-hover:scale-[1.15]" 
                      style={{ 
                        color: item.color, 
                        textShadow: `0 2px 8px ${item.color}30`,
                      }}
                    >
                      {animationCompleted ? value : '0'}
                      {/* Subtle animated glow effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 blur-[8px] -z-10"
                        style={{ background: `${item.color}20`, borderRadius: '8px' }}
                      ></div>
                    </div>
                    
                    {/* Label with subtle animation - fixed dark mode implementation */}
                    <div 
                      style={{ color: 'var(--text-navy)' }}
                      className="dark:text-white/70 text-sm font-medium transition-all duration-300 group-hover:translate-y-[2px]"
                    >
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