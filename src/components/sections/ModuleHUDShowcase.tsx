import React, { useState } from 'react';
import { ModuleHUD } from './ModuleHUD';
import { Tab } from '@headlessui/react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { VSHeading } from "../ui/vs-text";

const ModuleHUDShowcase: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle module click
  const handleModuleClick = (moduleId: string) => {
    setSelectedSection(moduleId === selectedSection ? null : moduleId);
  };

  // GSAP animations for scroll-triggered animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set up Intersection Observer for scroll-triggered animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Run the animation sequence when the component enters the viewport
            const target = entry.target;
            
            // Animation for heading and text
            gsap.fromTo('.hud-heading', 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }
            );
            
            gsap.fromTo('.hud-text', 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
            );
            
            // Animation for floating elements
            gsap.from(target.querySelectorAll(".course-float-element"), {
              y: 30,
              opacity: 0,
              stagger: 0.2,
              delay: 0.6,
              duration: 0.8,
              ease: "power2.out"
            });
            
            // Stop observing after animation is triggered
            observer.unobserve(target);
          }
        });
      }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -100px 0px" // Adjust based on when you want the animation to trigger
      });
      
      // Observe the ModuleHUD container
      const hudComponents = document.querySelectorAll(".module-hud-container");
      hudComponents.forEach(component => {
        observer.observe(component);
      });
      
      return () => {
        // Clean up observer when component unmounts
        hudComponents.forEach(component => {
          observer.unobserve(component);
        });
      };
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen py-20 bg-theme-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <VSHeading 
            variant="h2" 
            className="hud-heading text-4xl md:text-5xl font-bold mb-6 text-theme-primary"
          >
            Is making actually good short form content really that complex?
          </VSHeading>
          
          <p className="hud-text body-text mb-6 mx-auto max-w-[90%] md:max-w-3xl">
            Well yes and no. It's simple, but there's a lot to it.
          </p>
          
          <h3 className="hud-text text-2xl md:text-3xl font-bold mb-10 text-theme-primary">
            The Course Curriculum
          </h3>
        </div>

        {/* ModuleHUD Component */}
        <div className="module-hud-container relative bg-theme-bg-secondary/5 p-8 rounded-2xl shadow-theme-md">
          {/* Theme-aware floating elements for background decoration */}
          <div className="course-float-element absolute -z-10 top-[5%] left-[8%] w-[10%] h-[10%] rounded-[40%] rotate-12 
               opacity-[var(--theme-float-opacity)] 
               bg-[var(--theme-float-bg-primary)]
               animate-float-slow"></div>
               
          <div className="course-float-element absolute -z-10 bottom-[10%] right-[5%] w-[12%] h-[12%] rounded-[30%] -rotate-6 
               opacity-[var(--theme-float-opacity-secondary)] 
               bg-[var(--theme-float-bg-secondary)]
               animate-float-medium"></div>
          
          {/* Additional floating elements */}
          <div className="course-float-element absolute -z-10 top-[30%] right-[15%] w-[8%] h-[8%] rounded-full rotate-0 
               opacity-[0.15] bg-theme-accent
               animate-float-slow"></div>
          
          <div className="course-float-element absolute -z-10 bottom-[25%] left-[25%] w-[6%] h-[6%] rounded-full rotate-0 
               opacity-[0.2] bg-theme-primary
               animate-float-medium"></div>

          {/* ModuleHUD component */}
          <ModuleHUD 
            selectedSection={selectedSection}
            onModuleClick={(moduleId) => {
              // Ensure system block IDs are handled properly
              if (moduleId.includes('-system-')) {
                // For system blocks, directly pass the ID
                setSelectedSection(moduleId === selectedSection ? null : moduleId);
              } else {
                // For other modules, use the standard handler
                handleModuleClick(moduleId);
              }
            }}
          />
        </div>

        {/* Animation utilities */}
        <style>{`
          @keyframes float-fast {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          .animate-float-fast {
            animation: float-fast 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ModuleHUDShowcase;