import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Book, Clock, FileText, FileCode, Layers, CheckSquare } from 'lucide-react';
import courseUtils from "../../lib/course-utils";

// Define CSS animations for floating elements - VS Bubbly style
const floatingAnimationsStyle = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 12deg)); }
    50% { transform: translateY(-10px) rotate(var(--tw-rotate, 12deg)); }
  }
  
  @keyframes float-medium {
    0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, -6deg)); }
    50% { transform: translateY(-8px) rotate(var(--tw-rotate, -6deg)); }
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }
`;

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
    label: 'Hours', 
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
    <Section 
      className="py-24 bg-[var(--bg-cream-gradient)] dark:bg-[var(--bg-navy-gradient)] border-t border-[var(--text-navy)]/10 dark:border-[var(--text-cream)]/10 relative overflow-hidden"
    >
      {/* Apply float animations via style tag */}
      <style dangerouslySetInnerHTML={{ __html: floatingAnimationsStyle }} />
      
      {/* Add subtle background pattern for visual interest */}
      <div className="absolute inset-0 dot-bg opacity-30 dark:opacity-10 pointer-events-none"></div>
      
      {/* Light mode floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                     bg-[var(--primary-orange)] animate-float-slow dark:opacity-0"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 opacity-8
                    bg-[var(--secondary-teal-light)] animate-float-medium dark:opacity-0"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 opacity-0
                     bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-hover)] 
                     animate-float-slow dark:opacity-10"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 opacity-0
                     bg-gradient-to-r from-[var(--secondary-teal)] to-[var(--secondary-teal-light)] 
                     animate-float-medium dark:opacity-15"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-[var(--bg-cream-darker)] dark:bg-[var(--text-cream)]/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
            <span style={{ color: 'var(--primary-orange)' }} className="dark:text-white">
              Program Overview
            </span>
          </Badge>
          <h2 style={{ color: 'var(--text-navy)' }} className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
            By The Numbers
          </h2>
          <p style={{ color: 'var(--text-navy)' }} className="text-xl mb-2 max-w-3xl mx-auto dark:text-white/70">
            Vertical Shortcut isn't just another course. It's a comprehensive system built on real-world results and years of testing.
          </p>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-6 gap-4 max-w-6xl mx-auto">
          {statItems.map((item) => {
            const Icon = item.icon;
            // Fix TypeScript error by using type assertion to safely access the key
            const value = courseStats[item.key as keyof typeof courseStats] || 0;
            
            return (
              <div key={item.key} className="stat-item">
                <div className="relative bg-gradient-to-br from-white to-[var(--card-bg-light)] dark:bg-[var(--card-bg-navy)] rounded-[var(--border-radius-lg)] p-5 
                               border border-white/40 dark:border-white/5 
                               shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[var(--shadow-lg)]
                               transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                               hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[var(--shadow-lg),0_0_20px_rgba(53,115,128,0.2)]
                               group min-h-[160px] text-center overflow-hidden">
                  {/* Light mode subtle gradient background */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] dot-bg opacity-5 
                              dark:opacity-0 transition-all duration-500" 
                  ></div>
                  
                  {/* Light mode subtle colored gradient background */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] 
                              opacity-100 dark:opacity-0 transition-all duration-500" 
                    style={{ background: `linear-gradient(145deg, rgba(255,255,255,0.8) 0%, ${item.color}15 100%)` }}
                  ></div>
                  
                  {/* Dark mode gradient with enhanced glow */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] 
                              opacity-0 dark:opacity-100 transition-all duration-500" 
                    style={{ background: `linear-gradient(135deg, var(--card-bg-navy) 0%, ${item.color}30 100%)` }}
                  ></div>
                  
                  {/* Floating element for light mode */}
                  <div 
                    className="absolute -bottom-3 -right-3 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[40%] rotate-12 opacity-5 
                              animate-float-slow dark:opacity-0"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${item.color}, rgba(255,255,255,0.7))`
                    }}
                  ></div>
                  
                  {/* Floating element for dark mode */}
                  <div 
                    className="absolute -bottom-3 -right-3 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[40%] rotate-12 opacity-0 
                              animate-float-slow dark:opacity-10"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${item.color}, ${item.colorHover})`
                    }}
                  ></div>
                  
                  {/* Light mode hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)]
                              opacity-0 group-hover:opacity-30 dark:opacity-0 transition-all duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 15px ${item.color}30` }}
                  ></div>
                  
                  {/* Dark mode hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)]
                              opacity-0 dark:group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 25px ${item.color}40` }}
                  ></div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-between h-full">
                    {/* Icon with playful springy animation */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 
                               transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               group-hover:scale-[1.15] group-hover:translate-y-[-2px]"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.colorHover} 100%)`,
                        boxShadow: `0 6px 15px ${item.color}40`
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex flex-col">
                      {/* Value with enhanced scale and glow effect with proper dark mode */}
                      <div className="relative">
                        <div 
                          className="stat-counter text-4xl font-extrabold mb-2 
                                   transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                   group-hover:scale-[1.15] group-hover:translate-y-[-2px] dark:text-white" 
                          style={{ color: item.color, fontFamily: 'var(--font-sans)' }}
                        >
                          {animationCompleted ? value : '0'}
                        </div>
                        
                        {/* Light mode glow effect on hover */}
                        <div 
                          className="absolute -inset-2 opacity-0 group-hover:opacity-40 
                                    transition-all duration-300 blur-md -z-10 dark:opacity-0"
                          style={{ background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)` }}
                        ></div>
                        
                        {/* Dark mode glow effect on hover */}
                        <div 
                          className="absolute -inset-2 opacity-0 group-hover:opacity-60 
                                    transition-all duration-300 blur-md -z-10 hidden dark:block dark:group-hover:opacity-60"
                          style={{ background: `radial-gradient(circle, ${item.color}60 0%, transparent 70%)` }}
                        ></div>
                      </div>
                      
                      {/* Label with subtle animation - fixed with proper dark mode pattern */}
                      <div 
                        style={{ color: 'var(--text-navy)', fontFamily: 'var(--font-sans)' }}
                        className="text-lg font-medium transition-all duration-300 
                                   group-hover:translate-y-[2px] dark:text-white/70"
                      >
                        {item.label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Add textured light mode decorative elements at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 
                    bg-gradient-to-t from-[var(--bg-cream-darker)]/10 to-transparent 
                    opacity-20 dark:opacity-0 pointer-events-none"></div>
      
      {/* Add subtle dark mode glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 
                    bg-gradient-to-t from-[var(--primary-orange)]/5 to-transparent 
                    opacity-0 dark:opacity-30 pointer-events-none"></div>
    </Section>
  );
};

export default CourseStats;