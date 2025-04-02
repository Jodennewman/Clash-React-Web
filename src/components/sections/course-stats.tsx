import React, { useLayoutEffect, useRef, useState } from 'react';
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Book, Clock, FileText, FileCode, Layers, CheckSquare } from 'lucide-react';
import courseUtils from '../../lib/course-utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Stats items with their respective icons - PRESERVE THE ORIGINAL VIBRANT COLORS
// These colors are intentionally kept as hex values and not converted to CSS variables
// This is an exception to the general pattern as specified in CLAUDE.md
const statItems = [
  { 
    key: 'totalModules', 
    label: 'Modules', 
    icon: Layers,
    color: '#FEA35D', // Original orange - preserved
    hoverColor: '#FF8A38', // Slightly darker for hover
    darkGlow: 'rgba(254, 163, 93, 0.2)' // Glow for dark mode
  },
  { 
    key: 'totalHours', 
    label: 'Hours of Content', 
    icon: Clock,
    color: '#FF3B30', // Original red - preserved
    hoverColor: '#E42A20', // Slightly darker for hover
    darkGlow: 'rgba(255, 59, 48, 0.2)' // Glow for dark mode
  },
  { 
    key: 'resources', 
    label: 'Resources', 
    icon: CheckSquare,
    color: '#4A90E2', // Original blue - preserved
    hoverColor: '#3A80D2', // Slightly darker for hover
    darkGlow: 'rgba(74, 144, 226, 0.2)' // Glow for dark mode
  },
  { 
    key: 'workshops', 
    label: 'Workshops', 
    icon: Book,
    color: '#34C759', // Original green - preserved
    hoverColor: '#28B749', // Slightly darker for hover
    darkGlow: 'rgba(52, 199, 89, 0.2)' // Glow for dark mode
  },
  { 
    key: 'pdfs', 
    label: 'PDFs', 
    icon: FileText,
    color: '#AF52DE', // Original purple - preserved
    hoverColor: '#9F42CE', // Slightly darker for hover
    darkGlow: 'rgba(175, 82, 222, 0.2)' // Glow for dark mode
  },
  { 
    key: 'templates', 
    label: 'Templates', 
    icon: FileCode,
    color: '#387292', // Original teal - preserved
    hoverColor: '#286282', // Slightly darker for hover
    darkGlow: 'rgba(56, 114, 146, 0.2)' // Glow for dark mode
  }
];

const CourseStats = () => {
  const statsRef = useRef(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  
  // Use courseUtils with defensive programming - accessing the central data source
  // If courseStats is undefined, the component should throw an error to make the issue visible
  // This is in line with the "no fallbacks" policy from CLAUDE.md
  if (!courseUtils.courseStats) {
    throw new Error('Course statistics are not available from course-utils');
  }
  
  const courseStats = courseUtils.courseStats;
  
  // Use layout effect to ensure DOM is ready for GSAP
  useLayoutEffect(() => {
    if (!statsRef.current) return;
    
    // Clean up any existing animations
    animationsRef.current.forEach(anim => anim.kill());
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    animationsRef.current = [];
    scrollTriggersRef.current = [];
    
    // Simple animation on mount
    const initialAnimation = gsap.fromTo(
      (statsRef.current as HTMLElement).querySelectorAll('.stat-item'),
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
    
    animationsRef.current.push(initialAnimation);
    
    function animateCounters() {
      if (!statsRef.current) return;
      
      const counterElements = (statsRef.current as HTMLElement).querySelectorAll('.stat-counter');
      counterElements.forEach((element: Element, index: number) => {
        const key = statItems[index].key;
        const value = courseStats[key as keyof typeof courseStats] || 0;
        
        // Set initial value
        gsap.set(element, { innerText: '0' });
        
        const counterTween = gsap.to(element, {
          duration: 2,
          innerText: value,
          ease: "power2.out",
          roundProps: "innerText",
          onUpdate: function() {
            if (!element) return;
            
            const el = element as HTMLElement;
            const currentValue = parseInt(el.innerText, 10);
            
            // Format with commas
            el.innerText = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            // Add + for large numbers
            if (value > 100) {
              el.innerText += '+';
            }
          }
        });
        
        animationsRef.current.push(counterTween);
      });
    }

    return () => {
      // Proper cleanup
      animationsRef.current.forEach(anim => anim.kill());
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <Section className="py-24 bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)] transition-colors duration-[var(--transition-normal)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-[rgba(254,163,93,0.05)] border-[rgba(254,163,93,0.3)] mb-4 py-2 px-4" style={{color: 'var(--primary-light-300)'}}>
            Program Overview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white" style={{color: 'var(--text-dark)'}}>
            By The Numbers
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-10 dark:text-gray-300" style={{color: 'var(--text-dark)', opacity: 0.8}}>
            A comprehensive course ecosystem built for real-world results
          </p>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-6 gap-4 max-w-6xl mx-auto">
          {statItems.map((item) => {
            const Icon = item.icon;
            const value = courseStats[item.key as keyof typeof courseStats] || 0;
            
            return (
              <div key={item.key} className="stat-item text-center">
                <div 
                  className="relative bg-white dark:bg-[var(--card-bg-dark)] rounded-[var(--border-radius-lg)] p-6 border border-[rgba(0,0,0,0.05)] dark:border-white/5 transition-all duration-[var(--transition-normal)] h-full group hover:translate-y-[-6px] hover:scale-[1.02] hover:rotate-[0.5deg]"
                  style={{
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all 350ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Light mode gradient background */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] opacity-100 dark:opacity-0 transition-opacity duration-300" 
                    style={{ 
                      background: `linear-gradient(to bottom, white 30%, ${item.color}15 100%)`
                    }}
                  ></div>
                  
                  {/* Dark mode gradient background with enhanced effects */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] opacity-0 dark:opacity-100 transition-opacity duration-300" 
                    style={{ 
                      background: `linear-gradient(135deg, var(--bg-navy) 0%, ${item.color}30 100%)`
                    }}
                  ></div>
                  
                  {/* Content container */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icon circle with enhanced VS Bubbly hover effect */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transform transition-all group-hover:scale-[1.15] group-hover:translate-y-[-2px]"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.hoverColor} 100%)`,
                        boxShadow: `0 6px 15px ${item.color}40`,
                        transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Counter number with enhanced VS Bubbly hover effects */}
                    <div 
                      className="stat-counter text-3xl font-bold mb-2 relative group-hover:scale-[1.15]" 
                      style={{ 
                        color: item.color,
                        textShadow: `0 2px 8px ${item.color}30`,
                        transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      {animationCompleted ? value : '0'}
                      {/* Subtle glow effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[8px] -z-10"
                        style={{ background: `${item.color}20`, borderRadius: '8px' }}
                      ></div>
                    </div>
                    
                    {/* Label with proper color handling for both modes and subtle animation */}
                    <div 
                      className="text-sm font-medium transition-all duration-300 group-hover:translate-y-[2px] dark:text-white" 
                      style={{color: 'var(--text-dark)'}}
                    >
                      {item.label}
                    </div>
                  </div>
                  
                  {/* Dark mode enhanced glow effect overlay */}
                  <div 
                    className="absolute inset-0 rounded-[var(--border-radius-lg)] opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                    style={{ 
                      boxShadow: `0 0 25px ${item.darkGlow}`,
                    }}
                  ></div>
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