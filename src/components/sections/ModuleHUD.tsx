import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import courseData from "../../data/course-data.json";

interface ModuleHUDProps {
  selectedSection?: string | null;
}

// Define module shape to avoid type issues
interface ModuleItem {
  id: string;
  title: string;
  color: string;
  founderMustWatch: boolean;
}

// Get the first three sections directly from the JSON data
const mainSections = [
  {
    id: "basic_theory",
    name: "Basic Theory",
    color: "#4A90E2"
  },
  {
    id: "theory_advanced",
    name: "Advanced Theory",
    color: "#DE6B59"
  },
  {
    id: "monetisation",
    name: "Monetisation",
    color: "#FEA35D"
  }
];

// Get modules for a section directly from the JSON
const getModulesForSection = (sectionId: string): ModuleItem[] => {
  const course = courseData as any;
  
  if (!course || !Array.isArray(course.categories)) {
    return [];
  }
  
  for (const category of course.categories) {
    if (!category || !Array.isArray(category.sections)) {
      continue;
    }
    
    for (const section of category.sections) {
      if (section.id === sectionId && Array.isArray(section.modules)) {
        return section.modules.slice(0, 3).map((module: any) => ({
          id: module.id || '',
          title: module.title || '',
          color: module.color || '#333',
          founderMustWatch: !!module.founderMustWatch
        }));
      }
    }
  }
  return [];
};

export const ModuleHUD: React.FC<ModuleHUDProps> = ({ selectedSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const moduleRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Get modules for the selected section
  const selectedSectionModules = selectedSection 
    ? getModulesForSection(selectedSection)
    : [];
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Initial animation for sections
      gsap.from(".section-module", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
      
      // Initial animation for modules (initially hidden)
      gsap.set(".module-container", {
        opacity: 0,
        scale: 0.6,
        display: "none"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  // Handle section expansion/collapse animation
  useEffect(() => {
    if (!selectedSection) {
      // Collapse all sections
      mainSections.forEach(section => {
        const container = document.getElementById(`${section.id}-modules`);
        if (container) {
          gsap.to(container, {
            opacity: 0,
            scale: 0.6,
            duration: 0.3,
            ease: "power3.out",
            onComplete: () => {
              container.style.display = "none";
            }
          });
        }
        
        // Reset section animation
        const sectionEl = sectionRefs.current[section.id];
        if (sectionEl) {
          gsap.to(sectionEl, {
            scale: 1,
            duration: 0.3,
            ease: "power3.out"
          });
        }
      });
    } else {
      // Expand selected section
      const container = document.getElementById(`${selectedSection}-modules`);
      if (container) {
        container.style.display = "flex";
        gsap.to(container, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.4)"
        });
        
        // Animate modules
        const moduleEls = container.querySelectorAll(".module-item");
        gsap.from(moduleEls, {
          scale: 0.7,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
        
        // Add bubbly animation to the section
        const sectionEl = sectionRefs.current[selectedSection];
        if (sectionEl) {
          gsap.to(sectionEl, {
            scale: 1.08,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        }
      }
      
      // Collapse other sections
      mainSections.forEach(section => {
        if (section.id !== selectedSection) {
          const container = document.getElementById(`${section.id}-modules`);
          if (container) {
            gsap.to(container, {
              opacity: 0,
              scale: 0.6,
              duration: 0.3,
              ease: "power3.out",
              onComplete: () => {
                container.style.display = "none";
              }
            });
          }
          
          // Reset section animation
          const sectionEl = sectionRefs.current[section.id];
          if (sectionEl) {
            gsap.to(sectionEl, {
              scale: 1,
              duration: 0.3,
              ease: "power3.out"
            });
          }
        }
      });
    }
  }, [selectedSection]);
  
  // Setup hover animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Setup hover animations for sections
      mainSections.forEach(section => {
        const el = sectionRefs.current[section.id];
        if (el) {
          el.addEventListener('mouseenter', () => {
            if (selectedSection !== section.id) {
              gsap.to(el, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)",
                boxShadow: "0 0 15px rgba(53,115,128,0.3)"
              });
            }
          });
          
          el.addEventListener('mouseleave', () => {
            if (selectedSection !== section.id) {
              gsap.to(el, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)"
              });
            }
          });
        }
      });
      
      // Setup hover animations for modules
      selectedSectionModules.forEach((module: ModuleItem) => {
        const el = moduleRefs.current[module.id];
        if (el) {
          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              scale: 1.1,
              duration: 0.3,
              ease: "back.out(1.7)",
              boxShadow: "0 0 15px rgba(53,115,128,0.3)"
            });
            
            // Show module name
            const nameEl = document.getElementById(`name-${module.id}`);
            if (nameEl) {
              gsap.to(nameEl, {
                opacity: 1,
                y: 0,
                duration: 0.3
              });
            }
          });
          
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)"
            });
            
            // Hide module name
            const nameEl = document.getElementById(`name-${module.id}`);
            if (nameEl) {
              gsap.to(nameEl, {
                opacity: 0,
                y: 10,
                duration: 0.2
              });
            }
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [selectedSection, selectedSectionModules]);
  
  // Fixed callback for ref
  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };
  
  // Fixed callback for ref
  const setModuleRef = (id: string) => (el: HTMLDivElement | null) => {
    moduleRefs.current[id] = el;
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-[min(90vw,550px)] h-[min(90vw,550px)] p-6" 
    >
      <div 
        style={{
          width: '100%', 
          height: '100%', 
          transform: 'rotate(-90deg)', 
          transformOrigin: 'center center',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className="flex-1 flex flex-col justify-center items-center gap-[10vw] sm:gap-[9vw] md:gap-[60px] lg:gap-[70px]">
          {mainSections.map((section, index) => (
            <div key={section.id} className="w-full flex items-center justify-center relative">
              <div 
                ref={setSectionRef(section.id)}
                data-id={section.id}
                className="section-module module-item w-[calc(7vw+40px)] h-[calc(7vw+40px)] sm:w-[85px] sm:h-[85px] rounded-xl shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] cursor-pointer relative transition-all duration-[--transition-bounce]"
                style={{ backgroundColor: section.color }}
              >
                <div 
                  id={`name-${section.id}`} 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-white font-medium text-base z-10"
                >
                  {section.name}
                </div>
                {index === 0 && (
                  <div className="absolute -bottom-2 -right-2 w-[15px] h-[15px] bg-[#FF3C54] rounded-full shadow-[var(--shadow-sm)] dark:shadow-[0_0_5px_rgba(255,60,84,0.5)]"></div>
                )}
              </div>
              
              {/* Section Modules */}
              <div 
                id={`${section.id}-modules`}
                className="module-container absolute top-1/2 left-full transform -translate-y-1/2 ml-[5vw] sm:ml-[4vw] md:ml-[25px] flex items-center gap-[5vw] sm:gap-[4vw] md:gap-[25px] lg:gap-[30px]"
              >
                {section.id === selectedSection && 
                  selectedSectionModules.map((module: ModuleItem) => (
                    <div 
                      key={module.id}
                      ref={(el) => setModuleRef(el, module.id)}
                      data-id={module.id}
                      className="module-item w-[calc(4vw+20px)] h-[calc(4vw+20px)] sm:w-[45px] sm:h-[45px] rounded-xl shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] cursor-pointer relative transition-all duration-[--transition-bounce]"
                      style={{ backgroundColor: module.color }}
                    >
                      <div 
                        id={`name-${module.id}`} 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap opacity-0 text-white font-medium text-sm z-10"
                      >
                        {module.title}
                      </div>
                      {module.founderMustWatch && (
                        <div className="absolute -bottom-1 -right-1 w-[10px] h-[10px] bg-[#FF3C54] rounded-full shadow-[var(--shadow-sm)] dark:shadow-[0_0_3px_rgba(255,60,84,0.5)]"></div>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};