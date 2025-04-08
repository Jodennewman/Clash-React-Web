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
      style={{ 
        backgroundColor: section.color,
        opacity: 1 
      }}
    >
      {/* Display section name directly on the section for better UX */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-center">
        {section.name}
      </div>
      
      {/* Small red circle indicator for featured modules */}
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
      style={{ 
        backgroundColor: section.color,
        opacity: 1
      }}
    >
      {/* Display section name directly on the section for better UX */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-xs text-center">
        {section.name}
      </div>
      
      {/* Small red circle indicator for featured modules */}
      {section.featured && (
        <div className="absolute -top-2 -right-2 w-[12px] h-[12px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
      )}
    </div>
  );
});

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
  
  // Group sections into columns as per the layout spec from MODULE-HUD.md
  const column1 = useMemo(() => [mainSections[1], mainSections[2], mainSections[3]], []); // First column - Three Upskillers
  const column2 = useMemo(() => [mainSections[4], mainSections[5]], []); // Second column - PR/Authority & Delegation
  const column3 = useMemo(() => [mainSections[7], mainSections[8], mainSections[9]], []); // Third column - Business Scaling
  
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
  
  // Initial animation to show all sections
  useGSAP(() => {
    // Set all sections to be visible
    gsap.set(".section-module", {
      scale: 1,
      opacity: 1,
      visibility: "visible"
    });
  }, []);
  
  // Very simple animation for section expansion/collapse
  useEffect(() => {
    // Clear any previous animations
    gsap.killTweensOf(".section-module");
    gsap.killTweensOf(".modules-container");
    
    // Clean up all modals and titles
    document.querySelectorAll('[id^="section-title-"]').forEach(el => el.remove());
    document.querySelectorAll('.modules-container').forEach(el => el.remove());
    
    // If no section is selected, make sure all are at normal size
    if (!selectedSection) {
      mainSections.forEach(section => {
        const sectionEl = sectionRefs.current[section.id];
        if (!sectionEl) return;
        
        // Reset to normal size immediately
        gsap.set(sectionEl, {
          width: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
          height: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
          scale: 1,
          clearProps: "transform,transformOrigin"
        });
      });
    } 
    // If a section is selected, expand it
    else {
      const sectionEl = sectionRefs.current[selectedSection];
      if (!sectionEl) return;
      
      // Get section data
      const sectionData = mainSections.find(s => s.id === selectedSection);
      if (!sectionData) return;
      
      // Calculate module grid size
      const moduleCount = selectedSectionModules.length;
      let gridSize = 2;
      if (moduleCount <= 4) gridSize = 2;
      else if (moduleCount <= 9) gridSize = 3;
      else if (moduleCount <= 16) gridSize = 4;
      else gridSize = 5;
      
      // Calculate expanded size - make it at least 3x normal size
      const normalWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--normal-square-width'));
      const expandedSize = normalWidth * Math.max(3, gridSize);
      
      // Simply expand the section directly - no animations to cause jumps
      gsap.to(sectionEl, {
        width: `${expandedSize}px`,
        height: `${expandedSize}px`,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Only create modules container if it doesn't already exist
          if (!sectionEl.querySelector('.modules-container')) {
            createModulesGrid(sectionEl, gridSize);
          }
        }
      });
      
      // Create section title
      const sectionTitleEl = document.createElement('div');
      sectionTitleEl.id = `section-title-${selectedSection}`;
      sectionTitleEl.className = 'section-title absolute -top-12 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-4 py-2 rounded-lg shadow-theme-md text-lg font-medium z-20 whitespace-nowrap';
      sectionTitleEl.innerHTML = sectionData.name;
      
      // Add arrow to title
      const arrowEl = document.createElement('div');
      arrowEl.className = 'absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-theme-bg-primary rotate-45';
      sectionTitleEl.appendChild(arrowEl);
      
      // Add title to DOM
      sectionEl.parentNode?.insertBefore(sectionTitleEl, sectionEl);
      
      // Set all other sections to normal size
      mainSections.forEach(section => {
        if (section.id !== selectedSection) {
          const otherSectionEl = sectionRefs.current[section.id];
          if (!otherSectionEl) return;
          
          // Reset to normal size immediately
          gsap.set(otherSectionEl, {
            width: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            height: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            scale: 1,
            clearProps: "transform,transformOrigin"
          });
        }
      });
    }
    
    // Function to create modules grid
    function createModulesGrid(sectionEl: HTMLDivElement, gridSize: number) {
      // Create modules container
      const modulesContainer = document.createElement('div');
      modulesContainer.className = 'modules-container absolute inset-0 z-10 p-4';
      
      // Setup grid display
      modulesContainer.style.display = 'grid';
      modulesContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
      modulesContainer.style.gap = '8px';
      
      // Add container to section
      sectionEl.appendChild(modulesContainer);
      
      // Create modules
      selectedSectionModules.forEach(module => {
        const moduleEl = document.createElement('div');
        moduleEl.dataset.id = module.id;
        moduleEl.className = 'module-item rounded-lg shadow-theme-sm cursor-pointer relative overflow-hidden';
        
        // Apply gradient background
        const moduleColor = module.color || 'var(--theme-accent)';
        moduleEl.style.background = `linear-gradient(135deg, ${moduleColor}, ${moduleColor}dd)`;
        
        // Make it square
        moduleEl.style.aspectRatio = '1/1';
        
        // Add module title
        const titleEl = document.createElement('div');
        titleEl.className = 'absolute inset-0 flex items-center justify-center text-white font-medium text-xs text-center p-2';
        titleEl.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
        
        // Truncate long titles
        const shortTitle = module.title.length > 18 ? module.title.slice(0, 15) + '...' : module.title;
        titleEl.textContent = shortTitle;
        moduleEl.appendChild(titleEl);
        
        // Add to container
        modulesContainer.appendChild(moduleEl);
      });
      
      // Fade in the modules
      gsap.fromTo(
        modulesContainer.querySelectorAll('.module-item'),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.03, ease: "back.out(1.2)" }
      );
    }
    
  }, [selectedSection, selectedSectionModules]);
  
  // Handle click events
  const handleModuleClick = (e: React.MouseEvent) => {
    const moduleItem = (e.target as HTMLElement).closest('.module-item');
    if (!moduleItem) return;
    
    // Get module ID and display key
    const moduleId = moduleItem.getAttribute('data-id');
    const displayKey = moduleItem.getAttribute('data-display-key');
    
    if (!moduleId) return;
    
    // Check if it's a module or section
    const isInsideModulesContainer = moduleItem.closest('.modules-container');
    
    if (isInsideModulesContainer) {
      // Handle module click - open modal
      setSelectedModuleId(moduleId);
      setIsModalOpen(true);
      
      if (onModuleClick) {
        onModuleClick(moduleId);
      }
    } else {
      // Handle section click
      const sectionIdentifier = displayKey || moduleId;
      
      if (onModuleClick) {
        onModuleClick(sectionIdentifier);
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
            {/* Display section name */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-center">
              {mainSections[10].name}
            </div>
            
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
        </div>
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