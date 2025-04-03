import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModuleHUD } from './ModuleHUD';
import { Badge } from '../ui/badge';
import { VSSection } from '../ui/vs-background';
import { VSGradientText, VSHeading } from '../ui/vs-text';

interface ModuleDetails {
  id: string;
  title: string;
  subtitle: string;
  points: string[];
  thumbnail: string;
}

export const CourseViewer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Background floating animation
      gsap.to(".floating-element", {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  // Example module data
  const moduleData: {[key: string]: ModuleDetails} = {
    "section1": {
      id: "section1",
      title: "Theory Basics",
      subtitle: "Foundational concepts to understand short-form content strategy",
      points: [
        "Master the fundamentals of what makes content perform on the algorithm",
        "Learn how to structure your content for maximum engagement",
        "Understand the critical patterns that drive viral growth"
      ],
      thumbnail: "/assets/main/DataBaseThumbnails/AdvancedMetrics0.webp"
    },
    "section2": {
      id: "section2",
      title: "Theory Advanced",
      subtitle: "Take your content strategy to the next level with advanced techniques",
      points: [
        "Learn advanced hook techniques that generate massive engagement",
        "Master emotional positioning to make your content more shareable",
        "Discover complex formats that keep viewers watching to the end"
      ],
      thumbnail: "/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp"
    },
    "section6": {
      id: "section6",
      title: "Monetisation",
      subtitle: "Turn your audience into a thriving business",
      points: [
        "Build sustainable revenue streams from your content",
        "Create products your audience actually wants to buy",
        "Master the funnel that turns viewers into customers"
      ],
      thumbnail: "/assets/main/DataBaseThumbnails/Monetisation.webp"
    },
    "product1": {
      id: "product1",
      title: "The Quantity and Quality Notion System",
      subtitle: "Manage hundreds of scripts and videos a month",
      points: [
        "Custom Notion workspace designed for content creators",
        "Automated systems for tracking content performance",
        "Template library for scaling your content creation"
      ],
      thumbnail: "/assets/main/DataBaseThumbnails/Grid0.webp"
    }
  };

  // Function to handle section click in the HUD
  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
  };
  
  // Function to handle module click within an expanded section
  const handleModuleClick = (moduleId: string) => {
    if (moduleData[moduleId]) {
      setSelectedModule(moduleData[moduleId]);
      setShowModal(true);
    }
  };
  
  // Modal event handlers
  const openModal = () => {
    setShowModal(true);
    
    if (modalRef.current && modalOverlayRef.current) {
      // Animate overlay
      gsap.to(modalOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Animate modal
      gsap.fromTo(modalRef.current, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    }
  };
  
  const closeModal = () => {
    if (modalRef.current && modalOverlayRef.current) {
      // Animate overlay
      gsap.to(modalOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      
      // Animate modal
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setShowModal(false)
      });
    } else {
      setShowModal(false);
    }
  };
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);
  
  return (
    <VSSection 
      lightBg="bg-gradient-to-br from-white to-[--bg-cream]/80" 
      darkBg="dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Floating elements - light mode */}
      <div className="floating-element absolute -z-10 top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-5 bg-[--primary-orange] hidden dark:hidden"></div>
      <div className="floating-element absolute -z-10 bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 opacity-8 bg-[--primary-orange-hover] hidden dark:hidden"></div>
      <div className="floating-element absolute -z-10 bottom-[20%] left-[15%] w-36 h-36 rounded-[35%] rotate-[18deg] opacity-7 bg-[--secondary-teal-light] hidden dark:hidden"></div>
      
      {/* Floating elements - dark mode */}
      <div className="floating-element absolute -z-10 top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-10 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] hidden dark:block"></div>
      <div className="floating-element absolute -z-10 bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 opacity-15 bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] hidden dark:block"></div>
      <div className="floating-element absolute -z-10 bottom-[20%] left-[15%] w-36 h-36 rounded-[35%] rotate-[18deg] opacity-12 bg-gradient-to-r from-[--accent-coral] to-[--accent-red] hidden dark:block"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-white/5 text-[--primary-orange] dark:text-[--primary-orange-light] border-[--primary-orange]/30 mb-4 py-2 px-4 mx-auto">
            Course Navigator
          </Badge>
          <VSGradientText
            variant="h2"
            fromColor="var(--text-navy)"
            toColor="var(--text-navy)"
            darkFromColor="white"
            darkToColor="rgba(255,255,255,0.8)"
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Course Content
          </VSGradientText>
          <VSHeading variant="h2" className="text-2xl md:text-3xl text-[--text-navy] dark:text-white/70 max-w-3xl mx-auto">
            And we mean <u>everything.</u>
          </VSHeading>
        </div>
        
        {/* ModuleHUD container with proper centering */}
        <div className="flex justify-center items-center w-full my-16 md:my-24">
          <div 
            className="relative flex items-center justify-center"
            onClick={(e) => {
              // Get data-id from closest module-item parent
              const moduleItem = (e.target as HTMLElement).closest('.module-item');
              if (moduleItem) {
                const moduleId = moduleItem.getAttribute('data-id');
                if (moduleId) {
                  // Check if it's a section
                  if (moduleId.includes('section') && !moduleId.includes('.')) {
                    handleSectionClick(moduleId);
                  } else {
                    handleModuleClick(moduleId);
                  }
                }
              }
            }}
          >
            <ModuleHUD selectedSection={selectedSection} />
          </div>
        </div>
        
        <div className="text-center mt-16 md:mt-24 max-w-4xl mx-auto">
          <p className="text-[--text-navy]/80 dark:text-white/60 text-lg mb-6">
            Access our complete library of courses, tools, and systems to transform your content creation process. Everything you need to create, grow, and monetize.
          </p>
          <button 
            className="bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
                     dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                     text-white px-6 py-3 rounded-[--border-radius-full] 
                     shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                     dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
                     transition-all duration-[--transition-bounce]
                     hover:translate-y-[-3px] hover:scale-[1.03] 
                     hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                     dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
          >
            Start Learning Today
          </button>
        </div>
      </div>
      
      {/* Module Details Modal */}
      {showModal && selectedModule && (
        <div 
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={(e) => {
            if (e.target === modalOverlayRef.current) {
              closeModal();
            }
          }}
        >
          <div 
            ref={modalRef}
            className="w-full max-w-4xl bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] rounded-[--border-radius-lg] shadow-[2px_2px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(53,115,128,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating elements inside modal - light mode */}
            <div className="absolute -z-10 top-10 right-10 w-20 h-20 rounded-[40%] rotate-12 opacity-5 bg-[--primary-orange] hidden dark:hidden"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-28 h-28 rounded-[30%] -rotate-6 opacity-8 bg-[--primary-orange-hover] hidden dark:hidden"></div>
            
            {/* Floating elements inside modal - dark mode */}
            <div className="absolute -z-10 top-10 right-10 w-20 h-20 rounded-[40%] rotate-12 opacity-10 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] hidden dark:block"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-28 h-28 rounded-[30%] -rotate-6 opacity-15 bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] hidden dark:block"></div>
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 relative">
              {/* Sidebar */}
              <div className="w-full md:w-1/3">
                <div className="aspect-video rounded-[--border-radius-md] overflow-hidden mb-4 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
                  <img 
                    src={selectedModule.thumbnail} 
                    alt={selectedModule.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-[--text-navy] dark:text-white text-lg font-medium mb-3">Submodules</h3>
                
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map(num => (
                    <li 
                      key={num}
                      className="p-2 bg-white/40 dark:bg-white/5 rounded-[--border-radius-sm] text-[--text-navy] dark:text-white/80 cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 hover:translate-y-[-2px] shadow-[1px_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_0_5px_rgba(53,115,128,0.05)]"
                    >
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{num}.</span>
                        <span className="text-sm">Example Submodule {num}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Main Content */}
              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-[--text-navy] dark:text-white">{selectedModule.title}</h2>
                  
                  <button 
                    onClick={closeModal}
                    className="text-[--text-navy]/60 dark:text-white/60 hover:text-[--text-navy] dark:hover:text-white transition-colors hover:scale-110 p-1"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <p className="text-[--text-navy]/80 dark:text-white/60 mb-6">{selectedModule.subtitle}</p>
                
                <div className="mb-6">
                  <h3 className="text-[--text-navy] dark:text-white text-lg font-medium mb-4">What You'll Learn</h3>
                  
                  <ul className="space-y-4">
                    {selectedModule.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] dark:from-[--primary-orange] dark:to-[--primary-orange-hover] flex items-center justify-center text-white font-medium shrink-0 mt-0.5 mr-3 shadow-[1px_1px_3px_rgba(0,0,0,0.1)] dark:shadow-[0_0_6px_rgba(254,163,93,0.2)]">
                          {idx + 1}
                        </div>
                        <p className="text-[--text-navy]/90 dark:text-white/80">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-4">
                  <button 
                    className="bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
                           dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                           text-white px-6 py-3 rounded-[--border-radius-full] 
                           shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                           dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
                           transition-all duration-[--transition-bounce]
                           hover:translate-y-[-3px] hover:scale-[1.03] 
                           hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                           dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]
                           w-full md:w-auto"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </VSSection>
  );
};