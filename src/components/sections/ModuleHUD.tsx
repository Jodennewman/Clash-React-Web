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
  // Infrastructure Products (Systems) - These will be displayed as 3 individual systems
  // First System: Quantity and Quality Notion System 💾
  {
    id: "notion_system",
    name: "Notion System 💾",
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: 'system-notion'
  },
  // Second System: Home-Delivered Engine Room 🏭
  {
    id: "engine_room",
    name: "Engine Room 🏭",
    color: "var(--primary-orange)",
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: 'system-engine'
  },
  // Third System: Viral Video OS 🖥️
  {
    id: "viral_os",
    name: "Viral Video OS 🖥️",
    color: "var(--accent-coral)", 
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: 'system-viral'
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
      className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-sm cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] tooltip-trigger"
      style={{ 
        backgroundColor: section.color,
        opacity: 1 
      }}
    >
      {/* Tooltip for section name */}
      <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
        {section.name}
        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
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
      className="section-module module-item w-[var(--normal-square-width)] h-[var(--normal-square-width)] rounded-xl shadow-theme-sm cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] tooltip-trigger"
      style={{ 
        backgroundColor: section.color,
        opacity: 1
      }}
    >
      {/* Tooltip for section name */}
      <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
        {section.name}
        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
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
  const systemsColumn = useMemo(() => [mainSections[10], mainSections[11], mainSections[12]], []); // Systems column - 3 products
  
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
  
  // Initial animation to show all sections and set up system animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set all sections to be visible
      gsap.set(".section-module", {
        scale: 1,
        opacity: 1,
        visibility: "visible"
      });
      
      // Notion system animation - pulsing dots and sliding rows
      const notionTimeline = gsap.timeline({ repeat: -1 });
      notionTimeline.to(".notion-dot", { 
        opacity: 0.6, 
        duration: 1, 
        stagger: 0.2,
        ease: "sine.inOut" 
      })
      .to(".notion-dot", { 
        opacity: 0.2, 
        duration: 1, 
        stagger: 0.2,
        ease: "sine.inOut" 
      });
      
      // Animate notion rows
      gsap.to(".notion-row", {
        width: "70%",
        duration: 1.5,
        ease: "sine.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true
      });
      
      // Factory smoke animation
      gsap.to(".factory-smoke", {
        y: -20,
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        repeat: -1,
        ease: "power1.out"
      });
      
      // Conveyor belt animation
      gsap.to(".conveyor-item", {
        x: "-100%",
        duration: 3,
        ease: "none",
        repeat: -1,
        stagger: 1
      });
      
      // Video editor playhead animation
      gsap.to(".editor-playhead", {
        x: "200%",
        duration: 4,
        ease: "none",
        repeat: -1
      });
      
      // Clip animation
      gsap.to(".editor-clips", {
        opacity: 0.6,
        duration: 1,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  // Track previous selection for smoother transitions
  const [previousSection, setPreviousSection] = useState<string | null>(null);
  
  // Smoother animation for section expansion/collapse with sequenced transitions
  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline();
    
    // Clean up all modals and titles
    document.querySelectorAll('[id^="section-title-"]').forEach(el => el.remove());
    document.querySelectorAll('.modules-container').forEach(el => el.remove());
    
    // If we have a previous section that's different from current, animate it down first
    if (previousSection && previousSection !== selectedSection) {
      const prevSectionEl = sectionRefs.current[previousSection];
      if (prevSectionEl) {
        // Find previous section data
        const prevSectionData = mainSections.find(s => 
          s.id === previousSection || 
          (s.id === previousSection.split('-')[0] && s.displayKey === previousSection.split('-')[1])
        );
        
        if (prevSectionData) {
          // Scale down the previous section first
          tl.to(prevSectionEl, {
            width: prevSectionData.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            height: prevSectionData.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            duration: 0.25,
            ease: "power2.inOut"
          });
        }
      }
    }
    
    // Set all sections to normal size
    mainSections.forEach(section => {
      const sectionEl = sectionRefs.current[section.id];
      if (!sectionEl) return;
      
      // Only reset sections that aren't the currently selected one
      if (!selectedSection || section.id !== selectedSection) {
        tl.set(sectionEl, {
          width: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
          height: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
          scale: 1,
          clearProps: "transform,transformOrigin"
        }, "<");
      }
    });
    
    // If a section is selected, expand it after previous collapses
    if (selectedSection) {
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
      
      // Calculate expanded size - make it at least 5x normal size for more space
      const normalWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--normal-square-width'));
      const expandedSize = normalWidth * Math.max(5, gridSize * 1.5);
      
      // Add slight delay before expanding if we had a previous selection
      if (previousSection && previousSection !== selectedSection) {
        tl.to({}, { duration: 0.05 }); // Small pause for better transition feel
      }
      
      // Expand the selected section with a nice elastic effect
      tl.to(sectionEl, {
        width: `${expandedSize}px`,
        height: `${expandedSize}px`,
        duration: 0.35,
        ease: "back.out(1.1)",
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
      sectionTitleEl.className = 'section-title absolute -top-12 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-4 py-2 rounded-lg shadow-theme-md text-lg font-medium z-20 whitespace-nowrap opacity-0';
      sectionTitleEl.innerHTML = sectionData.name;
      
      // Add arrow to title
      const arrowEl = document.createElement('div');
      arrowEl.className = 'absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-theme-bg-primary rotate-45';
      sectionTitleEl.appendChild(arrowEl);
      
      // Add title to DOM
      sectionEl.parentNode?.insertBefore(sectionTitleEl, sectionEl);
      
      // Fade in the section title after expansion
      tl.to(sectionTitleEl, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power1.out"
      }, "-=0.2");
    }
    
    // Update the previous section for the next transition
    setPreviousSection(selectedSection);
  }, [selectedSection, selectedSectionModules, previousSection]);
    
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
        moduleEl.dataset.title = module.title; // Store full title for tooltip
        moduleEl.className = 'module-item rounded-lg shadow-theme-sm cursor-pointer relative overflow-hidden tooltip-trigger';
        
        // Apply gradient background
        const moduleColor = module.color || 'var(--theme-accent)';
        moduleEl.style.background = `linear-gradient(135deg, ${moduleColor}, ${moduleColor}dd)`;
        
        // Make it square
        moduleEl.style.aspectRatio = '1/1';
        
        // Add small indicator dot instead of text
        if (module.featured || module.founderMustWatch) {
          const indicatorEl = document.createElement('div');
          indicatorEl.className = 'absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--hud-accent-red)]';
          moduleEl.appendChild(indicatorEl);
        }
        
        // Create tooltip element
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20';
        tooltipEl.textContent = module.title;
        
        // Add arrow to tooltip
        const arrowEl = document.createElement('div');
        arrowEl.className = 'absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45';
        tooltipEl.appendChild(arrowEl);
        
        moduleEl.appendChild(tooltipEl);
        
        // Add event listeners for tooltip
        moduleEl.addEventListener('mouseenter', () => {
          tooltipEl.style.opacity = '1';
        });
        
        moduleEl.addEventListener('mouseleave', () => {
          tooltipEl.style.opacity = '0';
        });
        
        // Add to container
        modulesContainer.appendChild(moduleEl);
      });
      
      // Fade in the modules with a more dynamic animation
      gsap.fromTo(
        modulesContainer.querySelectorAll('.module-item'),
        { 
          opacity: 0, 
          scale: 0.8,
          y: 10
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.4, 
          stagger: { 
            amount: 0.4, // total stagger time
            from: "center", 
            grid: "auto" 
          },
          ease: "back.out(1.7)" 
        }
      );
    }
  
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
    <div>
      {/* CSS for tooltips */}
      <style>{`
        .tooltip-trigger:hover .tooltip-content {
          opacity: 1;
        }
      `}</style>
      
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
            
            {/* Systems Column - 3 distinctive system products */}
            <div className="flex flex-col gap-[var(--square-gap-y)] min-w-[calc(var(--normal-square-width)*2)]">
              {/* Container for the three systems */}
              <div className="grid grid-cols-1 gap-[calc(var(--square-gap-y)*1.2)]">
                {/* The Quantity and Quality Notion System */}
                <div 
                  key={systemsColumn[0].displayKey}
                  ref={(el) => { 
                    if (el) sectionRefs.current[systemsColumn[0].id + '-' + systemsColumn[0].displayKey] = el;
                    return undefined;
                  }}
                  data-id={systemsColumn[0].id}
                  data-display-key={systemsColumn[0].displayKey}
                  className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-md cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden tooltip-trigger"
                  style={{ 
                    backgroundColor: "var(--hud-navy)",
                    backgroundImage: "radial-gradient(circle at 70% 20%, rgba(67, 134, 160, 0.2) 0%, rgba(33, 55, 91, 0) 40%)"
                  }}
                >
                  {/* Tooltip for system name */}
                  <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
                    {systemsColumn[0].name}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
                  </div>
                  
                  {/* Simple database UI */}
                  <div className="absolute inset-3 flex flex-col">
                    {/* Logo/identifier */}
                    <div className="flex items-center mb-5">
                      <div className="w-10 h-10 rounded-md bg-white/15 flex items-center justify-center">
                        <span className="text-white text-lg">💾</span>
                      </div>
                      <div className="h-px flex-1 bg-white/15 ml-4"></div>
                    </div>
                    
                    {/* Animated rows */}
                    <div className="space-y-4 flex-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className={`notion-dot w-3 h-3 rounded-full bg-white/30 opacity-${i % 2 === 0 ? '20' : '40'}`}></div>
                          <div className={`notion-row h-3 bg-white/20 rounded-full`} style={{width: `${30 + i * 10}%`}}></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Database columns */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-full h-8 mb-2 bg-white/15 rounded-md"></div>
                          <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Featured indicator */}
                  {systemsColumn[0].featured && (
                    <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
                  )}
                </div>
                
                {/* The Home-Delivered Engine Room */}
                <div 
                  key={systemsColumn[1].displayKey}
                  ref={(el) => { 
                    if (el) sectionRefs.current[systemsColumn[1].id + '-' + systemsColumn[1].displayKey] = el;
                    return undefined;
                  }}
                  data-id={systemsColumn[1].id}
                  data-display-key={systemsColumn[1].displayKey}
                  className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-md cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden tooltip-trigger"
                  style={{ 
                    background: "linear-gradient(135deg, var(--primary-orange), var(--hud-coral))"
                  }}
                >
                  {/* Tooltip for system name */}
                  <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
                    {systemsColumn[1].name}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
                  </div>
                  
                  {/* Factory UI - Simplified */}
                  <div className="absolute inset-3">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-md bg-white/15 absolute top-0 left-0 flex items-center justify-center">
                      <span className="text-white text-xl">🏭</span>
                    </div>
                    
                    {/* Factory with smoke */}
                    <div className="absolute top-4 right-4 flex flex-col items-center">
                      {/* Smoke particles */}
                      <div className="factory-smoke w-4 h-4 rounded-full bg-white/30 absolute -top-8 opacity-30"></div>
                      <div className="factory-smoke w-3 h-3 rounded-full bg-white/20 absolute -top-4 left-2 opacity-20"></div>
                      <div className="factory-smoke w-3 h-3 rounded-full bg-white/25 absolute -top-6 right-1 opacity-25"></div>
                      
                      {/* Factory building - just a silhouette */}
                      <div className="w-16 h-16 bg-black/20 rounded-t-lg mt-7"></div>
                    </div>
                    
                    {/* Conveyor belt - simple animated version */}
                    <div className="absolute bottom-2 inset-x-3 h-14 bg-white/15 rounded-md overflow-hidden flex items-center">
                      {/* Belt items */}
                      <div className="conveyor-item w-10 h-8 mx-4 bg-white/30 rounded-md flex items-center justify-center">
                        <div className="w-6 h-4 bg-white/30 rounded"></div>
                      </div>
                      
                      <div className="conveyor-item w-8 h-6 mx-4 bg-white/20 rounded-md flex items-center justify-center">
                        <div className="w-4 h-3 bg-white/30 rounded"></div>
                      </div>
                      
                      <div className="conveyor-item w-7 h-5 mx-4 bg-white/25 rounded-md flex items-center justify-center">
                        <div className="w-3 h-2 bg-white/30 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Simple status indicators */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-white/40 opacity-70"></div>
                      <div className="w-3 h-3 rounded-full bg-white/30 opacity-40"></div>
                      <div className="w-3 h-3 rounded-full bg-white/20 opacity-50"></div>
                    </div>
                  </div>
                  
                  {/* Featured indicator */}
                  {systemsColumn[1].featured && (
                    <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
                  )}
                </div>
                
                {/* The Viral Video OS */}
                <div 
                  key={systemsColumn[2].displayKey}
                  ref={(el) => { 
                    if (el) sectionRefs.current[systemsColumn[2].id + '-' + systemsColumn[2].displayKey] = el;
                    return undefined;
                  }}
                  data-id={systemsColumn[2].id}
                  data-display-key={systemsColumn[2].displayKey}
                  className="section-module module-item w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-theme-md cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden tooltip-trigger"
                  style={{ 
                    background: "linear-gradient(145deg, var(--hud-teal), #2A7590)"
                  }}
                >
                  {/* Tooltip for system name */}
                  <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
                    {systemsColumn[2].name}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
                  </div>
                  
                  {/* Simple editor interface */}
                  <div className="absolute inset-3">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-md bg-white/15 absolute top-0 left-0 flex items-center justify-center">
                      <span className="text-white text-xl">🖥️</span>
                    </div>
                    
                    {/* Video preview */}
                    <div className="absolute top-6 right-4 w-16 h-24 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                      {/* Phone frame */}
                      <div className="w-8 h-16 bg-black rounded-lg overflow-hidden flex items-center justify-center border border-white/20">
                        {/* Video content */}
                        <div className="w-6 h-12 bg-gradient-to-b from-[var(--hud-coral)]/30 to-[var(--hud-teal)]/40 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Timeline */}
                    <div className="absolute bottom-2 left-3 right-3 h-16 bg-black/25 rounded-lg overflow-hidden p-2">
                      {/* Tracks */}
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center h-3">
                            {/* Track label */}
                            <div className="w-3 h-3 rounded-full bg-white/20 mr-2"></div>
                            
                            {/* Track clips */}
                            <div className="flex-1 relative h-full">
                              <div className="editor-clips absolute left-0 w-8 h-full rounded-sm bg-[var(--hud-coral)]/60 opacity-70"></div>
                              <div className="editor-clips absolute left-10 w-12 h-full rounded-sm bg-[var(--hud-teal)]/60 opacity-70"></div>
                              <div className="editor-clips absolute left-24 w-6 h-full rounded-sm bg-[var(--hud-pink)]/60 opacity-70"></div>
                              
                              {/* Playhead */}
                              <div className="editor-playhead absolute top-0 bottom-0 left-2 w-0.5 bg-white"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="absolute top-16 left-3 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white/40 rounded-sm"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white/40"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Featured indicator */}
                  {systemsColumn[2].featured && (
                    <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>
                  )}
                </div>
              </div>
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
      </div>
      
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