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
    50% { transform: translateY(var(--theme-anim-distance-md, -10px)) rotate(var(--tw-rotate, 12deg)); }
  }
  
  @keyframes float-medium {
    0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, -6deg)); }
    50% { transform: translateY(var(--theme-anim-distance-sm, -8px)) rotate(var(--tw-rotate, -6deg)); }
  }
  
  .animate-float-slow {
    animation: float-slow var(--theme-anim-duration-slow, 8s) ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium var(--theme-anim-duration-med, 6s) ease-in-out infinite;
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
  
  // Use useGSAP hook for proper animation lifecycle management
  useGSAP(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const duration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.6');
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      if (!statsRef.current) return;
      
      // Enhanced VS Bubbly animation on mount - more pronounced (20% more)
      gsap.fromTo(
        ".stat-item",
        { 
          y: 40, 
          opacity: 0, 
          scale: 0.95 
        }, 
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.12, 
          duration: duration,  
          ease: "back.out(1.2)", 
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
      className="bg-theme-primary py-24 border-t border-theme-border-light relative overflow-hidden"
    >
      {/* Apply float animations via style tag */}
      <style dangerouslySetInnerHTML={{ __html: floatingAnimationsStyle }} />
      
      {/* Add subtle background pattern for visual interest */}
      <div className="absolute inset-0 dot-bg opacity-[var(--theme-pattern-opacity)] pointer-events-none"></div>
      
      {/* Theme-aware floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 
                    opacity-[var(--theme-float-opacity)]
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow hidden md:block"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 
                    opacity-[var(--theme-float-opacity)]
                    bg-[var(--theme-float-bg-secondary)]
                    animate-float-medium hidden md:block"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-theme-primary text-4xl md:text-5xl font-bold mb-6">
            So what's actually in it?
          </h2>
          <p className="body-text mb-6 mx-auto max-w-[90%] md:max-w-3xl">
            The Vertical Shortcut is packed full of content - and don't worry its not just videos.
          </p>
          <p className="body-text-large font-bold text-theme-primary mb-6">
            You'll get lifetime access to:
          </p>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {statItems.map((item) => {
            const Icon = item.icon;
            // Fix TypeScript error by using type assertion to safely access the key
            const value = courseStats[item.key as keyof typeof courseStats] || 0;
            
            return (
              <div key={item.key} className="stat-item">
                <div className="relative bg-theme-gradient-card
                               rounded-xl p-5 
                               border border-theme-border-light
                               shadow-theme-md
                               transition-all transition-theme-bounce
                               hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                               hover:shadow-theme-lg
                               group min-h-[160px] md:min-h-[200px] text-center overflow-hidden">
                 
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div 
                      className="flex items-center justify-center w-12 h-12 mb-4 rounded-full"
                      style={{ 
                        backgroundColor: item.color,
                      }}
                    >
                      <Icon className="h-6 w-6 text-theme-on-primary" />
                    </div>
                    <div 
                      className="stat-counter text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-theme-primary"
                    >
                      {animatedCounters ? value : '0'}
                    </div>
                    <div 
                      className="text-theme-secondary text-sm md:text-base font-medium"
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
      
      {/* Theme-aware decorative elements at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 
                    bg-theme-gradient-overlay-light
                    opacity-[var(--theme-overlay-opacity)] pointer-events-none"></div>
      
      {/* Subtle glow at bottom - theme-aware */}
      <div className="absolute bottom-0 left-0 right-0 h-40 
                    bg-theme-primary/5
                    opacity-[var(--theme-glow-opacity)] pointer-events-none"></div>
    </Section>
  );
};

export default CourseStats;