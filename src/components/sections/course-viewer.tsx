import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModuleHUD } from './ModuleHUD';
import { Badge } from '../ui/badge';
import { VSSection } from '../ui/vs-background';
import { VSGradientText, VSHeading } from '../ui/vs-text';
import courseUtils from '../../lib/course-utils';
import { PlayCircle, Check, Star, ChevronDown, X } from 'lucide-react';

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
  const [selectedSubmodule, setSelectedSubmodule] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);
  
  // Get computed theme variables for animation
  const getThemeVariables = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      animDuration: parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35'),
      animScale: parseFloat(styles.getPropertyValue('--theme-anim-scale') || '1.02'),
      bgHover: styles.getPropertyValue('--theme-bg-hover') || 'rgba(0,0,0,0.05)'
    };
  };
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Background floating animation
      gsap.to(".course-float-element", {
        y: -15,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      });
      
      // Subtle rotation for decorative elements
      gsap.to(".course-float-element", {
        rotation: "+=2",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1
      });
      
      // Add subtle pulse to the call-to-action button
      gsap.to(".cta-button", {
        boxShadow: "0 6px 20px rgba(254, 163, 93, 0.25)",
        scale: 1.01,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  // Real module data based on course utils
  const moduleData: {[key: string]: ModuleDetails} = {
    "basic_theory": {
      id: "basic_theory",
      title: "Basic Theory",
      subtitle: "Master the fundamentals of short-form content with our comprehensive theory module. This foundation will set you up for success across all platforms.",
      points: [
        "Understand how the algorithm works to maximize your content visibility",
        "Learn the core principles of storytelling that keeps viewers engaged",
        "Develop a structured approach to content planning and strategy"
      ],
      thumbnail: "big_picture.webp"
    },
    "advanced_theory": {
      id: "advanced_theory",
      title: "Advanced Theory",
      subtitle: "Take your content to the next level with advanced theoretical frameworks and data-driven approaches to growth.",
      points: [
        "Master advanced psychological triggers that drive engagement",
        "Learn complex content formats that maximize retention and sharing",
        "Develop a data-led approach to content optimization"
      ],
      thumbnail: "advanced_metrics_analytics.webp"
    },
    "upskiller_shorts_ready_videographer": {
      id: "upskiller_shorts_ready_videographer",
      title: "Camera Confidence",
      subtitle: "Transform your on-camera presence with professional techniques that make you look and feel confident.",
      points: [
        "Master framing and composition for maximum impact",
        "Develop a natural, confident on-camera presence",
        "Learn pro lighting techniques using simple equipment"
      ],
      thumbnail: "camera_confidence.webp"
    },
    "upskiller_authentic_research_writer": {
      id: "upskiller_authentic_research_writer",
      title: "Research & Writing",
      subtitle: "Create compelling, authentic content backed by solid research and professional writing techniques.",
      points: [
        "Find viral-worthy topics with our research framework",
        "Structure scripts that hook viewers in the first 3 seconds",
        "Develop your authentic voice while maintaining authority"
      ],
      thumbnail: "research.webp"
    },
    "upskiller_vertical_video_editors": {
      id: "upskiller_vertical_video_editors",
      title: "Vertical Video Editing",
      subtitle: "Master the art of vertical video editing with techniques specifically designed for maximum engagement.",
      points: [
        "Learn the core editing techniques that drive retention",
        "Master visual pacing that keeps viewers watching to the end",
        "Develop a professional editing workflow that saves hours"
      ],
      thumbnail: "editing.webp"
    },
    "pr_authority": {
      id: "pr_authority",
      title: "PR & Authority",
      subtitle: "Build a powerful personal brand that positions you as the go-to authority in your niche.",
      points: [
        "Develop your unique voice that stands out in a crowded space",
        "Build a content strategy that attracts press and media attention",
        "Master the art of strategic positioning through content"
      ],
      thumbnail: "pr_who_are_you.webp"
    },
    "delegation": {
      id: "delegation",
      title: "Team Building & Delegation",
      subtitle: "Scale your content operation with effective team building and delegation strategies.",
      points: [
        "Develop systems that make delegation seamless and efficient",
        "Learn how to hire and train the perfect content team",
        "Create workflows that maintain quality while scaling quantity"
      ],
      thumbnail: "team_building_delegation.webp"
    },
    "monetisation": {
      id: "monetisation",
      title: "Monetisation",
      subtitle: "Transform your audience into a thriving business with multiple revenue streams.",
      points: [
        "Develop multiple monetization streams from your content",
        "Learn high-conversion pricing strategies for digital products",
        "Master the art of seamless selling that feels authentic"
      ],
      thumbnail: "monetisation_evolving.webp"
    },
    "conversion": {
      id: "conversion",
      title: "Conversion",
      subtitle: "Turn viewers into customers with powerful conversion strategies built into your content.",
      points: [
        "Create an irresistible content funnel that naturally leads to sales",
        "Develop lead magnets that perfectly match your audience needs",
        "Master the art of calls-to-action that drive real results"
      ],
      thumbnail: "building_your_funnel.webp"
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
    } else if (moduleId.includes('delegation')) {
      // Handle the delegation sections with different displayKeys
      setSelectedModule(moduleData['delegation']);
      setShowModal(true);
    }
  };
  
  // Modal event handlers
  const openModal = () => {
    setShowModal(true);
    setSelectedSubmodule(-1);
    
    if (modalRef.current && modalOverlayRef.current) {
      // Animate overlay with proper theme-aware approach
      gsap.to(modalOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Animate modal with VS Bubbly style
      gsap.fromTo(modalRef.current, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
      
      // Animate content elements with staggered timing
      if (thumbnailRef.current) {
        gsap.from(thumbnailRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1
        });
      }
      
      gsap.from(".modal-content-item", {
        opacity: 0,
        y: 15,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.2)",
        delay: 0.2
      });
      
      // Animate floating elements
      gsap.to(".modal-float-element", {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4
      });
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
      
      // Animate modal with proper VS Bubbly style
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
  
  // Handle submodule selection
  const handleSubmoduleClick = (index: number) => {
    setSelectedSubmodule(index === selectedSubmodule ? -1 : index);
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
  
  // Effect to handle modal opening
  useEffect(() => {
    if (showModal && selectedModule) {
      openModal();
    }
  }, [showModal, selectedModule]);
  
  return (
    <VSSection 
      className="bg-theme-gradient py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Theme-aware floating elements with proper animation classes */}
      <div className="course-float-element absolute -z-10 top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
           opacity-[var(--theme-float-opacity)] 
           bg-[var(--theme-float-bg-primary)]"></div>
      <div className="course-float-element absolute -z-10 bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 
           opacity-[var(--theme-float-opacity-secondary)] 
           bg-[var(--theme-float-bg-secondary)]"></div>
      <div className="course-float-element absolute -z-10 bottom-[20%] left-[15%] w-36 h-36 rounded-[35%] rotate-[18deg] 
           opacity-[var(--theme-float-opacity)] 
           bg-[var(--theme-accent-tertiary)]"></div>
      
      {/* Grid background pattern for subtle texture */}
      <div className="absolute inset-0 -z-20 opacity-[0.07] grid-bg"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge 
            variant="outline" 
            className="bg-theme-surface/5 text-theme-primary border-theme-primary/30 mb-4 py-2 px-4 mx-auto shadow-theme-sm"
          >
            Course Navigator
          </Badge>
          <VSGradientText
            variant="h2"
            fromColor="var(--theme-primary)"
            toColor="var(--theme-accent-secondary)"
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Master Your Content Journey
          </VSGradientText>
          <VSHeading 
            variant="h2" 
            className="text-2xl md:text-3xl text-theme-primary max-w-3xl mx-auto"
          >
            A complete roadmap to <span className="text-theme-accent-secondary font-medium">short-form mastery</span>
          </VSHeading>
          <p className="text-theme-secondary text-lg mt-4 max-w-2xl mx-auto">
            Navigate our comprehensive curriculum designed to transform you from beginner to expert. Every skill, every strategy, all in one place.
          </p>
        </div>
        
        {/* ModuleHUD container with theme-aware styling and proper centering */}
        <div className="flex justify-center items-center w-full my-16 md:my-24 relative">
          {/* Theme-aware floating elements for visual interest */}
          <div className="course-float-element absolute -z-10 top-20 left-[15%] w-32 h-32 rounded-[40%] rotate-12 
               opacity-[var(--theme-float-opacity)] 
               bg-[var(--theme-float-bg-primary)]"></div>
          <div className="course-float-element absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
               opacity-[var(--theme-float-opacity-secondary)] 
               bg-[var(--theme-float-bg-secondary)]"></div>
          
          <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
            <ModuleHUD 
              selectedSection={selectedSection}
              onModuleClick={(moduleId) => {
                // Check if it's a section ID or a displayKey
                if (moduleId.includes('-col') || moduleId.includes('-systems')) {
                  // This is a displayKey - extract the base section ID
                  const baseSectionId = moduleId.split('-')[0];
                  handleSectionClick(baseSectionId);
                } else if (moduleId.includes('section') || 
                           moduleId === 'basic_theory' || 
                           moduleId === 'advanced_theory' ||
                           moduleId === 'upskiller_authentic_research_writer' ||
                           moduleId === 'upskiller_shorts_ready_videographer' ||
                           moduleId === 'upskiller_vertical_video_editors' ||
                           moduleId === 'pr_authority' ||
                           moduleId === 'delegation' ||
                           moduleId === 'monetisation' ||
                           moduleId === 'conversion') {
                  // This is a section - toggle selection
                  handleSectionClick(moduleId);
                } else {
                  // This is a module - show modal
                  handleModuleClick(moduleId);
                }
              }} 
            />
          </div>
        </div>
        
        <div className="text-center mt-16 md:mt-24 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-theme-gradient-card rounded-[var(--border-radius-lg)] p-6 shadow-theme-sm flex flex-col items-center hover-bubbly">
              <div className="w-12 h-12 rounded-full bg-theme-gradient-primary flex items-center justify-center mb-4 shadow-theme-sm">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-theme-primary text-xl font-medium mb-2">178+ Modules</h3>
              <p className="text-theme-secondary text-sm">Everything you need to master short-form content</p>
            </div>
            
            <div className="bg-theme-gradient-card rounded-[var(--border-radius-lg)] p-6 shadow-theme-sm flex flex-col items-center hover-bubbly">
              <div className="w-12 h-12 rounded-full bg-theme-gradient-secondary flex items-center justify-center mb-4 shadow-theme-sm">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-theme-primary text-xl font-medium mb-2">Proven System</h3>
              <p className="text-theme-secondary text-sm">The same techniques used by top creators</p>
            </div>
            
            <div className="bg-theme-gradient-card rounded-[var(--border-radius-lg)] p-6 shadow-theme-sm flex flex-col items-center hover-bubbly">
              <div className="w-12 h-12 rounded-full bg-theme-gradient-accent flex items-center justify-center mb-4 shadow-theme-sm">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-theme-primary text-xl font-medium mb-2">Lifetime Access</h3>
              <p className="text-theme-secondary text-sm">Including all future updates and expansions</p>
            </div>
          </div>
          
          <button 
            className="cta-button bg-theme-gradient-primary
                     text-white px-8 py-4 rounded-[var(--border-radius-full)]
                     shadow-theme-sm
                     transition-all duration-[var(--theme-transition-bounce)]
                     hover-bubbly-lg
                     hover:shadow-theme-md
                     text-lg font-medium"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
      
      {/* Module Details Modal with enhanced styling and animations */}
      {showModal && selectedModule && (
        <div 
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[var(--bg-navy)]/40"
          onClick={(e) => {
            if (e.target === modalOverlayRef.current) {
              closeModal();
            }
          }}
        >
          <div 
            ref={modalRef}
            className="w-full max-w-4xl bg-theme-gradient-card rounded-[var(--border-radius-lg)] shadow-theme-lg overflow-hidden border border-theme-border-light"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Theme-aware floating elements inside modal */}
            <div className="modal-float-element absolute -z-10 top-10 right-10 w-20 h-20 rounded-[40%] rotate-12 
                 opacity-[var(--theme-float-opacity)] 
                 bg-[var(--theme-float-bg-primary)]"></div>
            <div className="modal-float-element absolute -z-10 bottom-10 left-10 w-28 h-28 rounded-[30%] -rotate-6 
                 opacity-[var(--theme-float-opacity-secondary)] 
                 bg-[var(--theme-float-bg-secondary)]"></div>
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 relative">
              {/* Sidebar */}
              <div className="w-full md:w-2/5">
                <div className="rounded-[var(--border-radius-lg)] overflow-hidden mb-4 shadow-theme-md relative">
                  <img 
                    ref={thumbnailRef}
                    src={courseUtils.getThumbnailPath(selectedModule.thumbnail)} 
                    alt={selectedModule.title}
                    className="w-full h-full object-cover aspect-video" 
                  />
                  {/* Gradient overlay at the bottom of thumbnail */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Module title on thumbnail */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h2 className="font-bold text-xl md:text-2xl modal-content-item">{selectedModule.title}</h2>
                  </div>
                </div>
                
                <h3 className="text-theme-primary text-lg font-medium mb-3 modal-content-item">Submodules</h3>
                
                <ul className="space-y-2 modal-content-item">
                  {[
                    { id: 1, title: "Core Concepts & Overview", duration: 15, advanced: false, essential: true },
                    { id: 2, title: "Key Principles in Practice", duration: 12, advanced: false, essential: false },
                    { id: 3, title: "Advanced Applications", duration: 18, advanced: true, essential: false },
                    { id: 4, title: "Implementation Framework", duration: 22, advanced: true, essential: true }
                  ].map((submodule, index) => (
                    <li 
                      key={submodule.id}
                      className="p-3 bg-theme-surface/10 rounded-[var(--border-radius-md)] text-theme-primary cursor-pointer hover:bg-theme-surface/30 
                                 transition-all duration-300 hover:translate-y-[-2px] shadow-theme-sm hover:shadow-theme-md
                                 border border-theme-border-light"
                      onClick={() => handleSubmoduleClick(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <PlayCircle className="h-4 w-4 mr-2 text-theme-primary-light" />
                          <span className="text-sm font-medium">{submodule.title}</span>
                        </div>
                        <div className="flex items-center">
                          {submodule.essential && (
                            <span className="mr-2 text-xs px-1.5 py-0.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full">
                              Must Watch
                            </span>
                          )}
                          <span className="text-xs text-theme-secondary">{submodule.duration} min</span>
                          <ChevronDown 
                            className={`h-4 w-4 ml-1 transition-transform duration-300 ${selectedSubmodule === index ? 'rotate-180' : ''}`} 
                          />
                        </div>
                      </div>
                      
                      {/* Expandable details */}
                      {selectedSubmodule === index && (
                        <div className="mt-3 p-3 bg-theme-bg-surface/20 rounded-[var(--border-radius-sm)] text-theme-secondary text-xs">
                          <p className="mb-2">
                            {submodule.advanced 
                              ? "This advanced module covers in-depth strategies and techniques that build on the foundational principles." 
                              : "This core module establishes the fundamental concepts and principles needed for mastery."}
                          </p>
                          <div className="flex items-center text-theme-primary">
                            <div className="h-1 w-1 rounded-full bg-theme-primary mr-2"></div>
                            <span>Available in HD and 4K resolution</span>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Main Content */}
              <div className="w-full md:w-3/5">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-theme-primary modal-content-item">About This Module</h2>
                  
                  <button 
                    onClick={closeModal}
                    className="text-theme-secondary hover:text-theme-primary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-theme-surface/10"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-theme-secondary mb-6 modal-content-item">{selectedModule.subtitle}</p>
                
                <div className="mb-6 modal-content-item">
                  <h3 className="text-theme-primary text-lg font-medium mb-4">What You'll Learn</h3>
                  
                  <ul className="space-y-4">
                    {selectedModule.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-gradient-primary flex items-center justify-center text-white font-medium mt-0.5 mr-3 shadow-theme-sm">
                          {idx + 1}
                        </div>
                        <p className="text-theme-primary text-base">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Additional module metadata */}
                <div className="grid grid-cols-2 gap-4 mb-6 modal-content-item">
                  <div className="bg-theme-surface/10 rounded-[var(--border-radius-md)] p-3 border border-theme-border-light">
                    <div className="text-theme-secondary text-sm mb-1">Total Duration</div>
                    <div className="text-theme-primary font-medium flex items-center">
                      <PlayCircle className="h-4 w-4 mr-2 text-theme-primary-light" />
                      67 minutes
                    </div>
                  </div>
                  
                  <div className="bg-theme-surface/10 rounded-[var(--border-radius-md)] p-3 border border-theme-border-light">
                    <div className="text-theme-secondary text-sm mb-1">Difficulty Level</div>
                    <div className="text-theme-primary font-medium flex items-center">
                      <Star className="h-4 w-4 mr-2 text-theme-accent-secondary" />
                      Intermediate
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 modal-content-item">
                  <button 
                    className="bg-theme-gradient-primary
                           text-white px-6 py-3 rounded-[var(--border-radius-full)] 
                           shadow-theme-sm
                           transition-all duration-[var(--theme-transition-bounce)]
                           hover:translate-y-[-4px] hover:scale-[1.02]
                           hover:shadow-theme-md
                           w-full md:w-auto
                           group"
                  >
                    <PlayCircle className="h-5 w-5 mr-2 inline-block group-hover:animate-pulse" />
                    <span>Start Learning</span>
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