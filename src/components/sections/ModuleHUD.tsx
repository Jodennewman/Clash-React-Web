import React, { useRef, useEffect, useMemo, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import courseUtils from "../../lib/course-utils";
import { VSSubmoduleModal } from "../modals/VSSubmoduleModal";

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
      {/* Display section name directly on the section for better UX */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium">
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
      {/* Display section name directly on the section for better UX */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-xs">
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
              background: gradientBg 
              // No animation-related inline styles that could interfere with CSS
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
    const ctx = gsap.context(() => {
      // First make sure all sections are initially invisible
      gsap.set(".section-module", {
        opacity: 0,
        scale: 0.85
      });
      
      // Then animate them in with a staggered effect - reduced delay for better responsiveness
      gsap.to(".section-module", {
        opacity: 1,
        scale: 1,
        stagger: 0.04, // Faster staggering
        duration: 0.4,  // Faster animation
        ease: "back.out(1.7)",
        delay: 0.05,    // Minimal delay
        onComplete: () => {
          // Clean up GSAP inline styles after animation completes
          gsap.set(".section-module", {
            clearProps: "opacity,scale"
          });
        }
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
      // Create a timeline for smoother coordination of animations
      const tl = gsap.timeline({
        onComplete: () => {
          // This helps avoid flickering and ensures cleanup
          requestAnimationFrame(() => {
            // Final cleanup of any remaining inline styles
            mainSections.forEach(section => {
              const sectionEl = sectionRefs.current[section.id];
              if (sectionEl) {
                // Ensure all props are properly cleaned up
                gsap.set(sectionEl, {
                  clearProps: "width,height,scale,transform,x,y"
                });
              }
            });
          });
        }
      });
      
      // First, immediately capture and freeze the current state of all sections
      // to prevent any visual jumps before animations start
      mainSections.forEach(section => {
        const sectionEl = sectionRefs.current[section.id];
        if (sectionEl) {
          // Capture current computed transforms before starting animations
          const currentRect = sectionEl.getBoundingClientRect();
          const currentStyles = window.getComputedStyle(sectionEl);
          
          // Convert to appropriate units for transform
          const currentScale = gsap.getProperty(sectionEl, "scale") || 1;
          
          // Freeze at current position to prevent jumps
          gsap.set(sectionEl, {
            width: `${currentRect.width}px`,
            height: `${currentRect.height}px`,
            scale: currentScale 
          });
        }
      });
      
      // Second, animate all sections
      mainSections.forEach(section => {
        // Reset section animation with subtle bounce
        const sectionEl = sectionRefs.current[section.id];
        if (sectionEl) {
          // Remove section title if it exists
          const sectionTitleEl = document.getElementById(`section-title-${section.id}`);
          if (sectionTitleEl) {
            // Fade out section title
            tl.to(sectionTitleEl, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                sectionTitleEl.remove();
              }
            }, 0); // Start at the beginning of the timeline
          }
          
          // Remove modules if they exist inside the section
          const existingModules = sectionEl.querySelector('.modules-container');
          if (existingModules) {
            // Fade out modules first
            tl.to(existingModules.querySelectorAll('.module-item'), {
              opacity: 0,
              scale: 0.95, // More subtle
              stagger: 0.01, 
              duration: 0.15,
              ease: "power2.in",
              onComplete: () => {
                // Then remove the modules container
                existingModules.remove();
              }
            }, 0); // Start at beginning
            
            // Animate section back to original size - two-stage animation to avoid jumps
            // First, reduce scale slightly to provide visual feedback
            tl.to(sectionEl, {
              scale: 0.98, // Slight scale down for visual feedback
              duration: 0.15,
              ease: "power2.out"
            }, 0.1); // Slight delay
            
            // Then animate to final size
            tl.to(sectionEl, {
              width: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
              height: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
              scale: 1,
              duration: 0.2,
              ease: "power3.out",
              onComplete: () => {
                // Clean up inline styles to let CSS take over
                gsap.set(sectionEl, {
                  clearProps: "width,height,scale,transform"
                });
              }
            }, 0.2); // Start after scale down 
            
          } else {
            // If no modules, just reset the section with the same 2-stage animation
            tl.to(sectionEl, {
              scale: 0.98, // Slight scale down
              duration: 0.15,
              ease: "power2.out"
            }, 0.1);
            
            tl.to(sectionEl, {
              scale: 1,
              duration: 0.2,
              ease: "power3.out",
              onComplete: () => {
                // Clean up inline styles
                gsap.set(sectionEl, {
                  clearProps: "scale,transform"
                });
              }
            }, 0.2);
          }
        }
      });
      
      // Remove any standalone module containers
      mainSections.forEach(section => {
        const container = document.getElementById(`${section.id}-modules`);
        if (container) {
          gsap.to(container, {
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
            transform: 'translateX(-50%) scale(0.6)',
            onComplete: () => {
              container.remove();
            }
          });
        }
      });
      
      // Reset content margin if needed
      if (contentBelow) {
        gsap.to(contentBelow, {
          marginTop: '4rem', // Return to original margin
          duration: 0.5,
          ease: "power3.out"
        });
      }
    } else {
      // Expand selected section with enhanced transitions
      const sectionEl = sectionRefs.current[selectedSection];
      
      if (sectionEl) {
        // Determine size based on module count
        const moduleCount = selectedSectionModules.length;
        let gridSize = 2; // 2x2 grid default
        
        // Set grid size based on module count as per spec
        if (moduleCount <= 4) gridSize = 2; // 2x2 grid
        else if (moduleCount <= 9) gridSize = 3; // 3x3 grid
        else if (moduleCount <= 16) gridSize = 4; // 4x4 grid
        else if (moduleCount <= 25) gridSize = 5; // 5x5 grid
        else gridSize = 6; // 6x6 grid for very large module sets
        
        // Calculate new width/height for expanded section
        const normalSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--normal-square-width'));
        const newSize = normalSize * gridSize;
        const expandedSectionSize = `${newSize}px`;
        
        // Find the section data for the selected section
        const sectionData = mainSections.find(s => s.id === selectedSection);
        if (!sectionData) return;
        
        // Create section title element that will appear above the expanded section
        let sectionTitleEl = document.getElementById(`section-title-${selectedSection}`);
        if (!sectionTitleEl) {
          sectionTitleEl = document.createElement('div');
          sectionTitleEl.id = `section-title-${selectedSection}`;
          sectionTitleEl.className = 'section-title absolute -top-12 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-4 py-2 rounded-lg shadow-theme-md text-lg font-medium z-20 whitespace-nowrap';
          sectionTitleEl.innerHTML = sectionData.name;
          sectionTitleEl.style.opacity = '0';
          sectionTitleEl.style.y = '-10px';
          
          // Create a decorative arrow pointing down
          const arrowEl = document.createElement('div');
          arrowEl.className = 'absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-theme-bg-primary rotate-45';
          sectionTitleEl.appendChild(arrowEl);
          
          // Insert it before the section element
          sectionEl.parentNode?.insertBefore(sectionTitleEl, sectionEl);
        }

        // Create a single timeline for better animation control and less input lag
        const expandTl = gsap.timeline({
          defaults: {
            ease: "power3.out" // More consistent easing
          }
        });
        
        // Immediate visual feedback - apply a quick scale first
        expandTl.to(sectionEl, {
          scale: 1.03, // Small immediate scale for visual feedback
          duration: 0.05 // Very quick
        });
        
        // Animate the section title to appear in parallel
        expandTl.to(sectionTitleEl, {
          opacity: 1,
          y: 0,
          duration: 0.15
        }, 0); // Start at the same time
        
        // Then smoothly expand the section to accommodate modules
        expandTl.to(sectionEl, {
          width: expandedSectionSize,
          height: expandedSectionSize,
          scale: 1, // Return to normal scale
          boxShadow: "var(--theme-shadow-md)",
          duration: 0.25,
          ease: "power2.out", // Smoother and more predictable
          onComplete: () => {
            // Create modules container and add it to the section
            if (!sectionEl.querySelector('.modules-container')) {
              const modulesContainer = document.createElement('div');
              modulesContainer.className = 'modules-container absolute inset-0 z-10 p-4 flex flex-wrap items-center content-center justify-center gap-2';
              
              // Create a proper module container with overflow handling
              modulesContainer.style.display = 'grid';
              modulesContainer.style.width = '100%';
              modulesContainer.style.height = '100%';
              modulesContainer.style.overflowY = 'auto'; // Enable scrolling for many modules
              modulesContainer.style.overflowX = 'hidden';
              modulesContainer.style.padding = '12px';
              modulesContainer.style.boxSizing = 'border-box';
              
              // Add scrollbar styling
              modulesContainer.style.scrollbarWidth = 'thin';
              modulesContainer.style.scrollbarColor = 'rgba(255,255,255,0.3) transparent';
              
              // Calculate the best grid layout based on module count
              const totalModules = selectedSectionModules.length;
              let gridCols = 4; // Default for most cases
              let cellSize = '40px'; // Default size
              
              // Adjust grid columns based on expanded section size and module count
              const containerSize = parseFloat(expandedSectionSize); // From the parent calculation
              const availableSpace = containerSize - 24; // Accounting for padding
              
              // Calculate optimal cell size based on number of modules
              // More modules = smaller cells
              if (totalModules <= 4) {
                gridCols = 2;
                cellSize = `${Math.floor(availableSpace / 2) - 8}px`; // 2x2 grid
              } else if (totalModules <= 9) {
                gridCols = 3;
                cellSize = `${Math.floor(availableSpace / 3) - 8}px`; // 3x3 grid
              } else if (totalModules <= 16) {
                gridCols = 4;
                cellSize = `${Math.floor(availableSpace / 4) - 6}px`; // 4x4 grid
              } else if (totalModules <= 25) {
                gridCols = 5;
                cellSize = `${Math.floor(availableSpace / 5) - 5}px`; // 5x5 grid
              } else {
                gridCols = 6;
                cellSize = `${Math.floor(availableSpace / 6) - 4}px`; // 6x6 grid
              }
              
              // Set the grid template
              modulesContainer.style.gridTemplateColumns = `repeat(${gridCols}, ${cellSize})`;
              modulesContainer.style.gridAutoRows = cellSize; // Ensure square cells
              modulesContainer.style.gap = '8px';
              modulesContainer.style.justifyContent = 'center'; // Center the grid
              
              // Add modules to the container
              selectedSectionModules.forEach((module, index) => {
                // Create module element
                const moduleEl = document.createElement('div');
                
                // Determine module size - featured modules span 2 cells
                const isLarge = module.featured || module.founderMustWatch || (module.duration || 0) > 30;
                
                moduleEl.className = `module-item rounded-lg shadow-theme-sm cursor-pointer relative transition-all
                                     duration-[var(--theme-transition-bounce)] overflow-hidden`;
                
                // Create gradient background for module
                const moduleColor = module.color || 'var(--theme-accent-secondary)';
                const gradientBg = `linear-gradient(135deg, ${moduleColor}, ${moduleColor}dd)`;
                moduleEl.style.background = gradientBg;
                
                // Enforce square aspect ratio
                moduleEl.style.aspectRatio = '1/1';
                moduleEl.style.width = '100%';
                moduleEl.style.height = '100%';
                
                // Apply grid span for larger modules, but be careful not to overflow grid
                if (isLarge && gridCols > 2 && totalModules < gridCols * gridCols / 2) {
                  moduleEl.style.gridColumn = 'span 2';
                  moduleEl.style.gridRow = 'span 2';
                }
                
                // Add module data attributes
                moduleEl.dataset.id = module.id;
                
                // Add module title with better visibility
                const titleEl = document.createElement('div');
                titleEl.className = 'absolute inset-0 flex items-center justify-center text-white text-xs font-medium text-center p-1';
                // Add text shadow for better visibility against any background
                titleEl.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
                
                // Truncate long titles
                const shortTitle = module.title.length > 25 ? module.title.slice(0, 22) + '...' : module.title;
                titleEl.textContent = shortTitle;
                moduleEl.appendChild(titleEl);
                
                // Add subtle background gradient overlay for text readability
                const overlayEl = document.createElement('div');
                overlayEl.className = 'absolute inset-0 bg-gradient-to-b from-transparent to-black/40';
                overlayEl.style.pointerEvents = 'none';
                moduleEl.appendChild(overlayEl);
                
                // Add visual indicators for featured/founder modules
                if (module.featured) {
                  const indicator = document.createElement('div');
                  indicator.className = 'absolute -top-1 -right-1 w-2 h-2 bg-[var(--hud-accent-red)] rounded-full';
                  moduleEl.appendChild(indicator);
                }
                
                // Add to container
                modulesContainer.appendChild(moduleEl);
              });
              
              // Add container to section
              sectionEl.appendChild(modulesContainer);
              
              // Make sure all modules are visible first
              gsap.set(modulesContainer.querySelectorAll('.module-item'), {
                opacity: 0,
                scale: 0.9 // Start closer to final size for faster perceived animation
              });
              
              // Then animate modules in with stagger - faster animation for better responsiveness
              gsap.to(modulesContainer.querySelectorAll('.module-item'), {
                opacity: 1,
                scale: 1,
                stagger: 0.02, // Faster staggering
                duration: 0.25, // Faster animation
                ease: "back.out(1.5)", // Slightly less bounce for snappier feel
                onComplete: () => {
                  // Clean up GSAP inline styles after animation completes
                  gsap.set(modulesContainer.querySelectorAll('.module-item'), {
                    clearProps: "opacity,scale"
                  });
                }
              });
            }
          }
        });
        
        // Collapse other sections with subtle transitions
        mainSections.forEach(section => {
          if (section.id !== selectedSection) {
            // Remove section title if it exists
            const sectionTitleEl = document.getElementById(`section-title-${section.id}`);
            if (sectionTitleEl) {
              // Fade out section title
              gsap.to(sectionTitleEl, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                  sectionTitleEl.remove();
                }
              });
            }
            
            const otherSectionEl = sectionRefs.current[section.id];
            if (otherSectionEl) {
              // Remove modules if they exist
              const existingModules = otherSectionEl.querySelector('.modules-container');
              if (existingModules) {
                // First capture current dimensions to avoid jumping
                const currentWidth = otherSectionEl.offsetWidth;
                const currentHeight = otherSectionEl.offsetHeight;
                
                // Set exact dimensions to prevent jumps
                otherSectionEl.style.width = `${currentWidth}px`;
                otherSectionEl.style.height = `${currentHeight}px`;
                
                // Fade out modules first
                gsap.to(existingModules.querySelectorAll('.module-item'), {
                  opacity: 0,
                  scale: 0.9, // Less shrinking for smoother transition
                  stagger: 0.01, // Faster stagger
                  duration: 0.15, // Faster fade out
                  ease: "power2.in",
                  onComplete: () => {
                    // Then remove the modules container
                    existingModules.remove();
                    
                    // Animate section back to original size
                    gsap.to(otherSectionEl, {
                      width: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
                      height: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
                      scale: 1,
                      boxShadow: "var(--theme-shadow-sm)",
                      duration: 0.3, // Slightly faster return
                      ease: "power2.out",
                      onComplete: () => {
                        // Clean up inline styles to let CSS take over
                        gsap.set(otherSectionEl, {
                          clearProps: "width,height,scale"
                        });
                      }
                    });
                  }
                });
              } else {
                // If no modules, just reset the section
                gsap.to(otherSectionEl, {
                  scale: 1,
                  y: 0,
                  boxShadow: "var(--theme-shadow-sm)",
                  duration: 0.3, // Faster animation
                  ease: "power2.out",
                  onComplete: () => {
                    // Clean up inline styles
                    gsap.set(otherSectionEl, {
                      clearProps: "scale,y"
                    });
                  }
                });
              }
            }
            
            // Remove any standalone module containers
            const container = document.getElementById(`${section.id}-modules`);
            if (container) {
              gsap.to(container, {
                opacity: 0,
                transform: 'translateX(-50%) scale(0.6)',
                duration: 0.3,
                ease: "power3.out",
                onComplete: () => {
                  container.remove();
                }
              });
            }
          }
        });
      }
    }
  }, [selectedSection, selectedSectionModules]);
  
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
  
  // Handle module click with immediate visual feedback to reduce perceived input delay
  const handleModuleClick = (e: React.MouseEvent) => {
    const moduleItem = (e.target as HTMLElement).closest('.module-item');
    if (moduleItem) {
      // Immediately provide visual feedback on click
      // This significantly reduces perceived input lag
      gsap.to(moduleItem, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          // Restore scale immediately after visual feedback
          gsap.to(moduleItem, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.5)"
          });
        }
      });
      
      // Extract module information
      const moduleId = moduleItem.getAttribute('data-id');
      const displayKey = moduleItem.getAttribute('data-display-key');
      
      if (moduleId) {
        // Use requestAnimationFrame to break from the event loop
        // This reduces input lag by separating click response from animation start
        requestAnimationFrame(() => {
          // If the clicked element is a module inside an expanded section
          const isInsideModulesContainer = moduleItem.closest('.modules-container');
          if (isInsideModulesContainer) {
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
        });
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
      className="w-full max-w-[900px] h-full min-h-[600px] max-h-[800px] p-6 relative overflow-visible flex items-center justify-center"
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
        <div className="flex flex-col md:flex-row h-max items-center justify-center content-center md:items-center gap-[var(--square-gap-y)] md:gap-[var(--square-gap-x)]">
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
          {(() => {
            const [showTooltip, setShowTooltip] = useState(false);
            
            return (
              <div 
                ref={(el) => { 
                  if (el) sectionRefs.current[mainSections[10].id + '-' + mainSections[10].displayKey] = el;
                  return undefined;
                }}
                data-id={mainSections[10].id}
                data-display-key={mainSections[10].displayKey}
                className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-sm cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden"
                style={{ backgroundColor: mainSections[10].color }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {/* Tooltip that appears on hover */}
                {showTooltip && (
                  <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-4 py-2 rounded-lg shadow-theme-md text-base font-medium z-20 whitespace-nowrap">
                    {mainSections[10].name}
                    <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-theme-bg-primary rotate-45"></div>
                  </div>
                )}
                
                {/* Three parts/subsections to represent the turn key system */}
                {/* Subtle sections to indicate products/systems */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-[var(--theme-float-bg-primary)] opacity-10"></div>
                <div className="absolute top-1/3 left-0 w-full h-1/3 bg-[var(--theme-float-bg-secondary)] opacity-15"></div>
                <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[var(--theme-float-bg-tertiary)] opacity-10"></div>
                
                {/* Decorative elements to suggest a system */}
                <div className="absolute inset-4 border-2 border-dashed border-white/10 rounded-lg pointer-events-none"></div>
                
                {/* Featured indicator */}
                {mainSections[10].featured && (
                  <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
                )}
              </div>
            );
          })()}
        </div>
        
        {/* No more separate module grids - modules are now displayed within expanded sections */}
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
      
      {/* Module modal using VSSubmoduleModal */}
      {selectedModuleId && (
        <VSSubmoduleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          moduleId={selectedModuleId}
          moduleTitle={selectedModuleId ? courseUtils.getModuleTitle(selectedModuleId) || "Module Details" : "Module Details"}
          submodules={[
            { id: "sub1", title: "Introduction to the Concept", duration: "5:30" },
            { id: "sub2", title: "Core Principles", duration: "12:45", isCompleted: true },
            { id: "sub3", title: "Advanced Techniques", duration: "18:20" },
            { id: "sub4", title: "Practical Applications", duration: "15:10" },
            { id: "sub5", title: "Case Studies & Examples", duration: "22:05", isLocked: true }
          ]}
          thumbnailUrl={selectedModuleId ? courseUtils.getThumbnailPath(courseUtils.getModuleThumbnail(selectedModuleId)) : ""}
        />
      )}
    </div>
  );
};