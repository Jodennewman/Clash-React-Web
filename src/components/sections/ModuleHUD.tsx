import React, { useRef, useEffect, useMemo, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import courseUtils from "../../lib/course-utils";
import { ModuleModal } from "../modals/TimelineModal";

interface ModuleHUDProps {
  selectedSection?: string | null;
  onModuleClick?: (moduleId: string) => void;
}

// Section data structure for our section types
interface SectionData {
  id: string;
  name: string;
  color: string;
  type: 'bigSquare' | 'normalSquare'; // Type to determine rendering
  size: 'normal' | 'double'; // Size: normal or double scale
  featured?: boolean; // For showing red circle notification
  displayKey?: string; // Optional key to differentiate sections with same ID but different display contexts
}

// Module data structure
interface ModuleData {
  id: string;
  title: string;
  color?: string;
  founderMustWatch?: boolean;
  featured?: boolean;
  duration?: number; // Add duration property for module sizing
}

// Configure our main sections based on the spec in MODULE-HUD.md and matching course-data.json
const mainSections: SectionData[] = [
  // First BigSquare - Basic Theory/Core Concepts
  {
    id: "basic_theory",
    name: "Basic Theory",
    color: "var(--hud-teal)",
    type: 'bigSquare',
    size: 'double',
    featured: true
  },
  // First Column - Upskillers
  {
    id: "upskiller_authentic_research_writer",
    name: "Research & Writing",
    color: "var(--secondary-teal)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "upskiller_shorts_ready_videographer",
    name: "Shooting",
    color: "var(--hud-pink)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "upskiller_vertical_video_editors",
    name: "Editing",
    color: "var(--accent-coral)",
    type: 'normalSquare',
    size: 'normal'
  },
  // Second Column - PR/Authority & Delegation
  {
    id: "pr_authority",
    name: "PR & Authority",
    color: "var(--hud-coral)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "delegation",
    name: "Delegation",
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    displayKey: 'delegation-col2' // Add a display key to differentiate
  },
  // Second BigSquare - Advanced Theory
  {
    id: "advanced_theory",
    name: "Advanced Theory",
    color: "var(--hud-coral)",
    type: 'bigSquare',
    size: 'double'
  },
  // Third Column - Business Scaling
  {
    id: "delegation",
    name: "Team Building",
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    displayKey: 'delegation-col3' // Add a display key to differentiate 
  },
  {
    id: "monetisation",
    name: "Monetisation",
    color: "var(--hud-orange)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "conversion",
    name: "Conversion",
    color: "var(--secondary-teal)",
    type: 'normalSquare',
    size: 'normal'
  },
  // Third BigSquare - System & Products
  {
    id: "delegation", // Reused for Systems representation
    name: "Systems & Products",
    color: "var(--hud-navy)",
    type: 'bigSquare',
    size: 'double',
    featured: true,
    displayKey: 'delegation-systems' // Add a display key to differentiate
  }
];

// Square Column Component - takes an array of squares to display in a column
interface SquareColumnProps {
  squares: SectionData[];
  selectedSection?: string | null;
  sectionRefs: React.MutableRefObject<{[key: string]: HTMLDivElement | null}>;
}

const SquareColumn: React.FC<SquareColumnProps> = ({ squares, selectedSection, sectionRefs }) => {
  return (
    // On mobile, columns become rows
    <div className="flex flex-row md:flex-col gap-[var(--square-gap-x)] md:gap-[var(--square-gap-y)]">
      {squares.map((square) => (
        <NormalSquare 
          key={square.id}
          section={square}
          isSelected={selectedSection === square.id}
          ref={(el) => { 
            if (el) sectionRefs.current[square.id] = el;
            return undefined;
          }}
        />
      ))}
    </div>
  );
};

// BigSquare Component - for double-sized squares
interface BigSquareProps {
  section: SectionData;
  isSelected: boolean;
}

const BigSquare = React.forwardRef<HTMLDivElement, BigSquareProps>(({ section, isSelected }, ref) => {
  return (
    <div 
      ref={ref}
      data-id={section.id}
      data-display-key={section.displayKey}
      className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-sm cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)]"
      style={{ backgroundColor: section.color }}
    >
      <div 
        id={`name-${section.id}`} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white font-medium text-lg z-10"
      >
        {section.name}
      </div>
      {/* Small red circle indicator for featured modules, centered on top right corner as per spec */}
      {section.featured && (
        <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
      )}
    </div>
  );
});

// NormalSquare Component - for regular-sized squares
interface NormalSquareProps {
  section: SectionData;
  isSelected: boolean;
}

const NormalSquare = React.forwardRef<HTMLDivElement, NormalSquareProps>(({ section, isSelected }, ref) => {
  return (
    <div 
      ref={ref}
      data-id={section.id}
      data-display-key={section.displayKey}
      className="section-module module-item w-[var(--normal-square-width)] h-[var(--normal-square-width)] rounded-xl shadow-theme-sm cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)]"
      style={{ backgroundColor: section.color }}
    >
      <div 
        id={`name-${section.id}`} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white font-medium text-base z-10"
      >
        {section.name}
      </div>
      {/* Small red circle indicator for featured modules, centered on top right corner as per spec */}
      {section.featured && (
        <div className="absolute -top-2 -right-2 w-[12px] h-[12px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
      )}
    </div>
  );
});

// ModuleGrid Component - for displaying expanded module grid
interface ModuleGridProps {
  sectionId: string;
  modules: ModuleData[];
  moduleRefs: React.MutableRefObject<{[key: string]: HTMLDivElement | null}>;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ sectionId, modules, moduleRefs }) => {
  // Determine grid size based on module count as per spec in MODULE-HUD.md:
  // "if it has 7 modules, then it will expand to the size of a 9x9 grid of squares – 
  // if it has 11 modules it will expand to the size of 4x4 squares"
  const gridSize = useMemo(() => {
    const count = modules.length;
    if (count <= 4) return 2; // 2x2 grid
    if (count <= 9) return 3; // 3x3 grid (9 cells) as per spec
    if (count <= 16) return 4; // 4x4 grid (16 cells) as per spec
    if (count <= 25) return 5; // 5x5 grid
    return 6; // 6x6 grid for very large module sets
  }, [modules.length]);
  
  // Reference to grid container for animations
  const gridRef = React.useRef<HTMLDivElement>(null);
  
  // GSAP animations for module grid
  useGSAP(() => {
    if (!gridRef.current) return;
    
    const ctx = gsap.context(() => {
      // Subtle background pulse effect
      gsap.to(gridRef.current, {
        backgroundColor: 'var(--theme-bg-secondary-subtle)',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Floating elements animation
      gsap.to(".grid-float-element", {
        y: "-=15",
        duration: 4,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Subtle rotation of indicators
      gsap.to(".duration-indicator", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }, gridRef);
    
    return () => ctx.revert();
  }, [modules]);

  return (
    <div 
      ref={gridRef}
      className="grid gap-2 p-4 bg-theme-surface/10 rounded-xl shadow-theme-md border border-theme-border-light 
                 backdrop-blur-[2px] transition-all duration-500"
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
      }}
    >
      {/* Floating decorative elements for visual interest */}
      <div className="grid-float-element absolute -z-10 top-5 right-5 w-10 h-10 rounded-[40%] rotate-12 
          opacity-[var(--theme-float-opacity)] 
          bg-[var(--theme-float-bg-primary)]"></div>
          
      <div className="grid-float-element absolute -z-10 bottom-5 left-8 w-12 h-12 rounded-[35%] -rotate-6 
          opacity-[var(--theme-float-opacity-secondary)] 
          bg-[var(--theme-float-bg-secondary)]"></div>
      
      <div className="grid-float-element absolute -z-10 top-1/2 right-1/4 w-8 h-8 rounded-[45%] rotate-45 
          opacity-[var(--theme-float-opacity-tertiary)] 
          bg-[var(--theme-float-bg-tertiary)]"></div>
          
      {modules.map((module, index) => {
        // Determine if this module should be featured (larger) based on duration or featured flags
        const isFeatured = module.featured || module.founderMustWatch;
        // Duration is also a factor in sizing as per spec
        const hasLongDuration = (module.duration || 0) > 30;
        const shouldExpand = isFeatured || hasLongDuration;
        
        // Determine span classes and position
        const spanClasses = shouldExpand ? 
          'col-span-2 row-span-2' : 
          'col-span-1 row-span-1';
        
        // Create a gradient background based on the module's color
        const moduleColor = module.color || 'var(--theme-accent-secondary)';
        const gradientBg = `linear-gradient(135deg, ${moduleColor}, ${moduleColor}CC)`;
        
        // Stagger animation delay based on index
        const animDelay = index * 0.05;
        
        return (
          <div 
            key={module.id}
            ref={el => { 
              if (el) moduleRefs.current[module.id] = el;
              return undefined;
            }}
            data-id={module.id}
            className={`module-item rounded-lg shadow-theme-sm cursor-pointer relative 
                       transition-all duration-[var(--theme-transition-bounce)] 
                       overflow-hidden ${spanClasses}
                       hover:shadow-theme-md hover:translate-y-[-4px] hover:scale-[1.02]`}
            style={{ 
              background: gradientBg,
              animationDelay: `${animDelay}s`,
              opacity: 0, // Will be animated by GSAP
              transform: 'scale(0.85)' // Will be animated by GSAP
            }}
          >
            {/* Module title - visible on hover */}
            <div 
              id={`name-${module.id}`} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        text-center whitespace-normal opacity-0 text-white font-medium text-sm z-10 px-2
                        transition-all duration-300 ease-out"
            >
              {module.title}
            </div>
            
            {/* Red circle indicator for featured modules as per MODULE-HUD.md */}
            {module.featured && (
              <div className="absolute -top-1.5 -right-1.5 w-[12px] h-[12px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
            )}
            
            {/* Additional indicator for founder-specific content */}
            {module.founderMustWatch && (
              <div className="absolute -bottom-1.5 -right-1.5 w-[10px] h-[10px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
            )}
            
            {/* Duration indicator - subtle visual cue with animation */}
            <div className="duration-indicator absolute bottom-2 left-2 flex items-center space-x-1 opacity-70">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              {hasLongDuration && (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ModuleHUD: React.FC<ModuleHUDProps> = ({ selectedSection, onModuleClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const moduleRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // State for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  
  // Calculate square dimensions for the layout
  const normalSquareWidth = 40; // Base width in px
  const squareGapX = normalSquareWidth * 1.5; // Horizontal gap (1.5x width)
  const squareGapY = normalSquareWidth * 1; // Vertical gap (1x width)
  
  // Group sections into columns as per the layout spec from MODULE-HUD.md:
  // Bigsquare ||| column of 3 squares ||| column of 2 squares ||| Bigsquare ||| column of 3 squares ||| BigSquare
  const column1 = useMemo(() => [mainSections[1], mainSections[2], mainSections[3]], []); // First column - Three Upskillers
  const column2 = useMemo(() => [mainSections[4], mainSections[5]], []); // Second column - PR/Authority & Delegation
  const column3 = useMemo(() => [mainSections[7], mainSections[8], mainSections[9]], []); // Third column - Business Scaling
  
  // Find the selected section object based on ID and optional displayKey
  const getSelectedSectionObject = useMemo(() => {
    if (!selectedSection) return null;
    
    // First, check if any section has this ID and a displayKey
    const sectionWithDisplayKey = mainSections.find(
      section => section.id === selectedSection && section.displayKey === selectedSection
    );
    
    if (sectionWithDisplayKey) return sectionWithDisplayKey;
    
    // If not found with displayKey, just find by ID
    return mainSections.find(section => section.id === selectedSection);
  }, [selectedSection]);
  
  // Get modules for the selected section
  const selectedSectionModules = useMemo(() => {
    if (!selectedSection) return [];
    return courseUtils.getModulesForSection(selectedSection).map(module => ({
      id: module.id,
      title: module.title,
      color: module.color,
      founderMustWatch: module.founderMustWatch,
      featured: module.featured,
      duration: module.duration // Include duration for module sizing
    }));
  }, [selectedSection]);
  
  useGSAP(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');
    
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
      gsap.set(".module-grid-container", {
        opacity: 0,
        scale: 0.6,
        display: "none"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  // Handle section expansion/collapse animation with enhanced transitions
  useEffect(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animScale = parseFloat(styles.getPropertyValue('--theme-anim-scale') || '1.02');
    const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');
    
    // Reference to content below HUD that needs to be pushed away
    const contentBelow = document.querySelector('.mt-16.md\\:mt-24');
    
    if (!selectedSection) {
      // Collapse all sections with improved transitions
      mainSections.forEach(section => {
        const container = document.getElementById(`${section.id}-modules`);
        if (container) {
          // First fade out the modules with staggered effect
          const moduleEls = container.querySelectorAll(".module-item");
          gsap.to(moduleEls, {
            opacity: 0,
            scale: 0.85,
            stagger: 0.02,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              // Then collapse the container with smooth animation
              gsap.to(container, {
                opacity: 0,
                duration: 0.3,
                ease: "power3.out",
                transform: 'translateX(-50%) scale(0.6)',
                onComplete: () => {
                  container.style.display = "none";
                  
                  // Animate content back to original position after container collapse
                  if (contentBelow) {
                    gsap.to(contentBelow, {
                      marginTop: '4rem', // Return to original margin
                      duration: 0.5,
                      ease: "power3.out"
                    });
                  }
                }
              });
            }
          });
        }
        
        // Reset section animation with subtle bounce
        const sectionEl = sectionRefs.current[section.id];
        if (sectionEl) {
          gsap.to(sectionEl, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.2)"
          });
        }
      });
    } else {
      // Expand selected section with enhanced transitions
      const container = document.getElementById(`${selectedSection}-modules`);
      if (container) {
        // First make container visible but transparent
        container.style.display = "block";
        container.style.opacity = "0";
        container.style.transform = "translateX(-50%) scale(0.8)";
        
        // Get the grid size to determine how much space we need
        const moduleCount = container.querySelectorAll(".module-item").length;
        let pushDistance = 180; // Base distance
        
        // Adjust push distance based on module count
        if (moduleCount > 4) pushDistance = 220;
        if (moduleCount > 7) pushDistance = 280;
        if (moduleCount > 11) pushDistance = 320;
        
        // Add bubbly animation to the selected section first
        const sectionEl = sectionRefs.current[selectedSection];
        if (sectionEl) {
          gsap.to(sectionEl, {
            scale: 1.08,
            y: -4,
            boxShadow: "var(--theme-shadow-md)",
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
        
        // Add small delay to make the animation sequence more natural
        gsap.delayedCall(0.15, () => {
          // Push content below to make room for the expanded section
          if (contentBelow) {
            gsap.to(contentBelow, {
              marginTop: `${pushDistance}px`, // Push content down based on module count
              duration: 0.6,
              ease: "power2.out"
            });
          }
          
          // Animate container with bouncy effect
          gsap.to(container, {
            opacity: 1,
            transform: 'translateX(-50%) scale(1)',
            duration: 0.5,
            ease: "back.out(1.4)",
            onComplete: () => {
              // Then animate modules with a staggered effect
              const moduleEls = container.querySelectorAll(".module-item");
              gsap.to(moduleEls, {
                opacity: 1,
                scale: 1,
                stagger: 0.05,
                duration: 0.4,
                ease: "back.out(1.7)"
              });
              
              // Add subtle pulse to the indicators inside modules
              gsap.to(container.querySelectorAll(".duration-indicator"), {
                scale: 1.2,
                duration: 0.3,
                stagger: 0.05,
                repeat: 1,
                yoyo: true,
                ease: "power2.inOut"
              });
            }
          });
        });
        
        // Create connection line animation
        const connectionLine = container.querySelector(".connection-line");
        if (connectionLine) {
          gsap.fromTo(connectionLine, 
            { height: 0 },
            { height: 8, duration: 0.3, ease: "power2.out", delay: 0.2 }
          );
        }
      }
      
      // Collapse other sections with subtle transitions
      mainSections.forEach(section => {
        if (section.id !== selectedSection) {
          const container = document.getElementById(`${section.id}-modules`);
          if (container) {
            // Fade out modules first
            const moduleEls = container.querySelectorAll(".module-item");
            gsap.to(moduleEls, {
              opacity: 0,
              scale: 0.85,
              stagger: 0.02,
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => {
                // Then collapse the container
                gsap.to(container, {
                  opacity: 0,
                  transform: 'translateX(-50%) scale(0.6)',
                  duration: 0.3,
                  ease: "power3.out",
                  onComplete: () => {
                    container.style.display = "none";
                  }
                });
              }
            });
          }
          
          // Reset section animation with subtle transition
          const sectionEl = sectionRefs.current[section.id];
          if (sectionEl) {
            gsap.to(sectionEl, {
              scale: 1,
              y: 0,
              boxShadow: "var(--theme-shadow-sm)",
              duration: 0.4,
              ease: "power2.out"
            });
          }
        }
      });
    }
  }, [selectedSection]);
  
  // Setup hover animations
  useGSAP(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const shadowMd = styles.getPropertyValue('--theme-shadow-md');
    const shadowSm = styles.getPropertyValue('--theme-shadow-sm');
    const themeAnimDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');
    const themeAnimScale = parseFloat(styles.getPropertyValue('--theme-anim-scale') || '1.02');
    
    const ctx = gsap.context(() => {
      // Setup hover animations for sections
      mainSections.forEach(section => {
        const el = sectionRefs.current[section.id];
        if (el) {
          el.addEventListener('mouseenter', () => {
            if (selectedSection !== section.id) {
              // VS Bubbly hover animation
              gsap.to(el, {
                scale: themeAnimScale, 
                y: -4,
                duration: themeAnimDuration,
                ease: "back.out(1.7)",
                boxShadow: "var(--theme-shadow-md)",
                // Add subtle rotation for more dynamic feel
                rotation: section.id.charCodeAt(0) % 2 === 0 ? 0.5 : -0.5
              });
            }
          });
          
          el.addEventListener('mouseleave', () => {
            if (selectedSection !== section.id) {
              gsap.to(el, {
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "var(--theme-shadow-sm)"
              });
            }
          });
        }
      });
      
      // Setup hover animations for modules
      selectedSectionModules.forEach(module => {
        const el = moduleRefs.current[module.id];
        if (el) {
          // Create glow effect element if it doesn't exist
          let glowEl = document.getElementById(`glow-${module.id}`);
          if (!glowEl && el) {
            glowEl = document.createElement('div');
            glowEl.id = `glow-${module.id}`;
            glowEl.className = 'absolute inset-0 opacity-0 rounded-lg';
            glowEl.style.boxShadow = '0 0 20px var(--theme-primary)';
            glowEl.style.pointerEvents = 'none';
            el.appendChild(glowEl);
          }
          
          el.addEventListener('mouseenter', () => {
            // Apply VS Bubbly hover animation
            gsap.to(el, {
              scale: 1.05,
              y: -3,
              duration: themeAnimDuration,
              ease: "back.out(1.7)",
              boxShadow: "var(--theme-shadow-md)"
            });
            
            // Show module name with a fade-up animation
            const nameEl = document.getElementById(`name-${module.id}`);
            if (nameEl) {
              gsap.fromTo(nameEl, 
                { opacity: 0, y: 5 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
              );
            }
            
            // Animate glow effect
            if (glowEl) {
              gsap.to(glowEl, {
                opacity: 0.2,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
          
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "var(--theme-shadow-sm)"
            });
            
            // Hide module name with slight fade-down
            const nameEl = document.getElementById(`name-${module.id}`);
            if (nameEl) {
              gsap.to(nameEl, {
                opacity: 0,
                y: 3,
                duration: 0.2,
                ease: "power2.in"
              });
            }
            
            // Fade out glow effect
            if (glowEl) {
              gsap.to(glowEl, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in"
              });
            }
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [selectedSection, selectedSectionModules]);
  
  // Handle module click
  const handleModuleClick = (e: React.MouseEvent) => {
    const moduleItem = (e.target as HTMLElement).closest('.module-item');
    if (moduleItem) {
      const moduleId = moduleItem.getAttribute('data-id');
      const displayKey = moduleItem.getAttribute('data-display-key');
      
      if (moduleId) {
        // For submodule clicks, use moduleId directly
        if (moduleItem.classList.contains('submodule-item')) {
          // Set the selected module ID and open the modal
          setSelectedModuleId(moduleId);
          setIsModalOpen(true);
          
          // Also call the external callback if provided
          if (onModuleClick) {
            onModuleClick(moduleId);
          }
        } else {
          // For section clicks, use the moduleId and respect displayKey if available
          const sectionIdentifier = displayKey || moduleId;
          
          // Also call the external callback if provided
          if (onModuleClick) {
            onModuleClick(sectionIdentifier);
          }
        }
      }
    }
  };
  
  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-full max-w-[900px] h-full max-h-[800px] p-6 relative overflow-visible"
      onClick={handleModuleClick}
    >
      {/* Theme-aware floating elements for background decoration */}
      <div className="absolute -z-10 top-[5%] left-[8%] w-[20%] h-[20%] max-w-[100px] max-h-[100px] rounded-[40%] rotate-12 
           opacity-[var(--theme-float-opacity)] 
           bg-[var(--theme-float-bg-primary)]
           animate-float-slow"></div>
           
      <div className="absolute -z-10 bottom-[10%] right-[5%] w-[22%] h-[22%] max-w-[120px] max-h-[120px] rounded-[30%] -rotate-6 
           opacity-[var(--theme-float-opacity-secondary)] 
           bg-[var(--theme-float-bg-secondary)]
           animate-float-medium"></div>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-20 opacity-[0.15] grid-bg"></div>
      
      {/* Main HUD Layout */}
      <div 
        className="w-full h-full relative"
        style={{
          '--normal-square-width': `${normalSquareWidth}px`,
          '--square-gap-x': `${squareGapX}px`,
          '--square-gap-y': `${squareGapY}px`,
        } as React.CSSProperties}
      >
        {/* 
          For tablet and mobile breakpoints, the layout rotates 90 degrees as per spec:
          "For tablet and mobile breakpoints this should be having the layout rotate 90 degrees 
          – although to avoid rotation complications, this would be better expressed through 
          flex direction changes (the outer l-r row becomes a t-b column && the tinner t-b column 
          becomes a l-r row)" 
        */}
        <div className="flex flex-col md:flex-row h-max items-center justify-center content-center md:items-start gap-[var(--square-gap-y)] md:gap-[var(--square-gap-x)]">
          {/* First big square (Basic Theory) */}
          <BigSquare 
            section={mainSections[0]} 
            isSelected={selectedSection === mainSections[0].id}
            ref={(el) => { 
              if (el) sectionRefs.current[mainSections[0].id] = el;
              return undefined;
            }}
          />
          
          {/* First column of squares (3 Upskillers) */}
          <SquareColumn 
            squares={column1}
            selectedSection={selectedSection}
            sectionRefs={sectionRefs}
          />
          
          {/* Second column of squares (PR/Authority & Delegation) */}
          <SquareColumn 
            squares={column2}
            selectedSection={selectedSection}
            sectionRefs={sectionRefs}
          />
          
          {/* Second big square (Advanced Theory) */}
          <BigSquare 
            section={mainSections[6]} 
            isSelected={selectedSection === mainSections[6].id}
            ref={(el) => { 
              if (el) sectionRefs.current[mainSections[6].id] = el;
              return undefined;
            }}
          />
          
          {/* Third column of squares (Business Scaling) */}
          <SquareColumn 
            squares={column3}
            selectedSection={selectedSection}
            sectionRefs={sectionRefs}
          />
          
          {/* System big square (Final special square) - Special design to connote the 3 parts of product/turn key system */}
          <div 
            ref={(el) => { 
              if (el) sectionRefs.current[mainSections[10].id + '-' + mainSections[10].displayKey] = el;
              return undefined;
            }}
            data-id={mainSections[10].id}
            data-display-key={mainSections[10].displayKey}
            className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-sm cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden"
            style={{ backgroundColor: mainSections[10].color }}
          >
            {/* Three parts/subsections to represent the turn key system */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-[var(--theme-float-bg-primary)] opacity-20"></div>
            <div className="absolute top-1/3 left-0 w-full h-1/3 bg-[var(--theme-float-bg-secondary)] opacity-30"></div>
            <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[var(--theme-float-bg-tertiary)] opacity-20"></div>
            
            {/* Decorative elements to suggest a system */}
            <div className="absolute inset-4 border-2 border-dashed border-white/15 rounded-lg pointer-events-none"></div>
            <div className="absolute top-[18%] left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
            <div className="absolute top-[50%] left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
            <div className="absolute top-[82%] left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
            
            <div 
              id={`name-${mainSections[6].id}`} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white font-medium text-lg z-10"
            >
              {mainSections[6].name}
            </div>
            
            {/* Featured indicator */}
            {mainSections[6].featured && (
              <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
            )}
          </div>
        </div>
        
        {/* Module Grids - One per section */}
        {mainSections.map(section => (
          <div 
            key={`${section.id}-modules`}
            id={`${section.id}-modules`}
            className="module-grid-container absolute top-full left-1/2 transform -translate-x-1/2 mt-8 z-20 w-[clamp(300px,80vw,800px)]"
            style={{
              // Will be set by JS animation
              display: 'none',
              opacity: 0,
              transform: 'translateX(-50%) scale(0.6)'
            }}
          >
            <div className="relative">
              {/* Connection line from section to module grid with enhanced animation */}
              <div className="connection-line absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-8 
                  bg-gradient-to-b from-[var(--theme-accent-secondary)] to-[var(--theme-border-primary)] 
                  rounded-t-full opacity-60"></div>
              
              {/* Module grid content */}
              <ModuleGrid 
                sectionId={section.id}
                modules={section.id === selectedSection ? selectedSectionModules : []}
                moduleRefs={moduleRefs}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Theme-aware floating elements for visual interest */}
      <div className="absolute -z-10 top-20 left-[15%] w-32 h-32 rounded-[40%] rotate-12 
           opacity-[var(--theme-float-opacity)] 
           bg-[var(--theme-float-bg-primary)]
           animate-float-slow"></div>
      <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
           opacity-[var(--theme-float-opacity-secondary)] 
           bg-[var(--theme-float-bg-secondary)]
           animate-float-medium"></div>
      
      {/* Module modal */}
      <ModuleModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        moduleId={selectedModuleId}
      />
    </div>
  );
};