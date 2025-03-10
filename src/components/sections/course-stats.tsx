import React, { useEffect, useRef } from 'react';
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import courseUtils from "../../lib/course-utils";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Book, Clock, FileText, FileCode, Layers, CheckSquare } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Stats items with their respective icons
const statItems = [
  { 
    key: 'totalModules', 
    label: 'Modules', 
    icon: Layers,
    color: '#FEA35D'
  },
  { 
    key: 'totalHours', 
    label: 'Hours of Content', 
    icon: Clock,
    color: '#FF3B30'
  },
  { 
    key: 'resources', 
    label: 'Resources', 
    icon: CheckSquare,
    color: '#4A90E2'
  },
  { 
    key: 'workshops', 
    label: 'Workshops', 
    icon: Book,
    color: '#34C759'
  },
  { 
    key: 'pdfs', 
    label: 'PDFs', 
    icon: FileText,
    color: '#AF52DE'
  },
  { 
    key: 'templates', 
    label: 'Templates', 
    icon: FileCode,
    color: '#387292'
  }
];

const CourseStats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!statsRef.current) return;
    
    // Animate the stat items when they come into view
    const statElements = statsRef.current.querySelectorAll('.stat-item');
    
    statElements.forEach((element) => {
      const counterElement = element.querySelector('.stat-counter');
      const targetValue = parseInt(counterElement?.getAttribute('data-value') || '0', 10);
      
      gsap.from(counterElement, {
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true,
        },
        onUpdate: function() {
          if (counterElement) {
            // Format with thousands separators
            counterElement.textContent = Math.floor(parseFloat(this.targets()[0].textContent))
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              
            // Add + to numbers above 100
            if (targetValue > 100) {
              counterElement.textContent += '+';
            }
          }
        }
      });
      
      // Animate the stat item itself
      gsap.from(element, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        }
      });
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
            const value = courseUtils.courseStats[item.key as keyof typeof courseUtils.courseStats];
            
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
                      data-value={value}
                      style={{ color: item.color }}
                    >
                      0
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
