import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { Book, Clock, FileText, FileCode, Layers, CheckSquare } from 'lucide-react';
import courseUtils from "../../lib/course-utils";
import { courseStats as courseStatsData } from "../../data/course-data"; // Backup import
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";

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
    color: 'oklch(75% 0.13 57)', // #FEA35D - Direct OKLCH color instead of CSS var
    colorHover: 'oklch(70% 0.16 52)' // Direct OKLCH color instead of CSS var
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
  const [animatedCounters, setAnimatedCounters] = useState(false);
  
  // Get stats from courseUtils, with backup from direct import if needed
  const courseStats = courseUtils.courseStats || courseStatsData;
  
  // Debug logging to check if courseStats is available
  console.log("CourseStats Component - Stats Data:", courseStats);
  
  // Use useGSAP hook for proper animation lifecycle management
  useGSAP(() => {
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      if (!statsRef.current) return;
      
      // Enhanced VS Bubbly animation on mount - more pronounced (20% more)
      gsap.fromTo(
        ".stat-item",
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
            setAnimatedCounters(true);
          }
        }
      );
    }, statsRef); // Scope animations to statsRef
    
    function animateCounters() {
      if (!statsRef.current) return;
      
      const counterElements = document.querySelectorAll('.stat-counter');
      
      if (!counterElements || counterElements.length === 0) return;
      
      counterElements.forEach((element: Element, index: number) => {
        // Make sure index is valid and statItems[index] exists
        if (index >= statItems.length || !statItems[index]) return;
        
        const key = statItems[index].key;
        // Make sure courseStats and key exist
        if (!courseStats || !key || !(key in courseStats)) return;
        
        const value = courseStats[key as keyof typeof courseStats] || 0;
        
        // Set initial value
        gsap.set(element, { innerText: '0' });
        
        // Animate counter
        gsap.to(element, {
          duration: 2,
          innerText: value,
          ease: "power2.out",
          roundProps: "innerText",
          onUpdate: function() {
            const el = element as HTMLElement;
            if (!el) return; // Safety check
            
            const currentValue = parseInt(el.innerText || '0', 10);
            
            // Format with commas
            el.innerText = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // Add + for large numbers
            if (value > 100) {
              el.innerText += '+';
            }
          }
        });
      });
    }
    
    // The context will automatically clean up when the component unmounts
    return () => ctx.revert();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Section 
      className="bg-[var(--theme-bg-primary)] py-24 dark:bg-[var(--theme-bg-primary)] border-t border-[var(--theme-text-primary)]/10 /10 relative overflow-hidden"
    >
      {/* Apply float animations via style tag */}
      <style dangerouslySetInnerHTML={{ __html: floatingAnimationsStyle }} />
      
      {/* Add subtle background pattern for visual interest */}
      <div className="absolute inset-0 dot-bg opacity-30 dark:opacity-10 pointer-events-none"></div>
      
      {/* Light mode floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                     bg-[var(--theme-primary)] animate-float-slow hidden md:block dark:hidden"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 opacity-8
                    bg-[var(--theme-accent-secondary-light)] animate-float-medium hidden md:block dark:hidden"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 opacity-10 
                     vs-float-orange animate-float-slow hidden dark:block"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 opacity-15
                     vs-float-teal animate-float-medium hidden dark:block"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="section" size="xl" className="mb-4">
            Program Overview
          </Badge>
          <h2 className="text-[var(--theme-text-primary)] dark:text-white text-4xl md:text-5xl font-bold mb-6">
            By The Numbers
          </h2>
          <p className="text-[var(--theme-text-primary)] dark:text-white/70 text-xl mb-2 max-w-3xl mx-auto">
            Vertical Shortcut isn't just another course. It's a comprehensive system built on real-world results and years of testing.
          </p>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {statItems.map((item) => {
            const Icon = item.icon;
            // Fix TypeScript error by using type assertion to safely access the key
            const value = courseStats[item.key as keyof typeof courseStats] || 0;
            
            return (
              <div key={item.key} className="stat-item">
                <div className="relative bg-[var(--theme-bg-primary)] dark:bg-[var(--theme-bg-primary)]
                               rounded-xl p-5 
                               border border-white/40 dark:border-white/5 
                               shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                               dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                               transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                               hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] 
                               dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]
                               group min-h-[160px] md:min-h-[200px] text-center overflow-hidden">
                 
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div 
                      className="flex items-center justify-center w-12 h-12 mb-4 rounded-full"
                      style={{ 
                        backgroundColor: item.color,
                      }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div 
                      className="stat-counter text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-[oklch(75%_0.13_57)] dark:text-white"
                    >
                      {animatedCounters ? value : '0'}
                    </div>
                    <div 
                      className="text-[var(--theme-text-primary)] dark:text-white/80 text-sm md:text-base font-medium"
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
      
      {/* Add textured light mode decorative elements at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 
                    vs-fade-overlay-light
                    opacity-20 dark:opacity-0 pointer-events-none"></div>
      
      {/* Add subtle dark mode glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 
                    bg-[var(--theme-primary)]/5
                    opacity-0 dark:opacity-30 pointer-events-none"></div>
    </Section>
  );
};

export default CourseStats;