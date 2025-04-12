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
  id: string;        // Base ID for the section
  uniqueId?: string; // Combination of id + displayKey for unique identification
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

// Get sections from course utils to generate section data
const generateMainSections = (): SectionData[] => {
  // Get all sections from courseUtils
  const courseUtilsSections = courseUtils.sections;
  
  // Map course data sections to UI section data structure
  let sectionsData: SectionData[] = [];
  
  // Helper function to create uniqueId from id and displayKey
  const createUniqueId = (id: string, displayKey?: string): string => {
    return displayKey ? `${id}-${displayKey}` : id;
  };
  
  // First BigSquare - Basic Theory/Core Concepts
  sectionsData.push({
    id: "basic_theory",
    uniqueId: "basic_theory",
    name: "Basic Theory",
    color: "var(--hud-teal)",
    type: 'bigSquare',
    size: 'double',
    featured: true
  });
  
  // First Column - Upskillers
  sectionsData.push({
    id: "upskiller_authentic_research_writer",
    uniqueId: "upskiller_authentic_research_writer",
    name: "Research & Writing",
    color: "var(--secondary-teal)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  sectionsData.push({
    id: "upskiller_shorts_ready_videographer",
    uniqueId: "upskiller_shorts_ready_videographer",
    name: "Shooting",
    color: "var(--hud-pink)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  sectionsData.push({
    id: "upskiller_vertical_video_editors",
    uniqueId: "upskiller_vertical_video_editors",
    name: "Editing",
    color: "var(--accent-coral)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  // Second Column - PR/Authority & Delegation
  sectionsData.push({
    id: "pr_authority",
    uniqueId: "pr_authority",
    name: "PR & Authority",
    color: "var(--hud-coral)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  // First delegation section - with unique ID
  const delegationCol2Key = 'delegation-col2';
  sectionsData.push({
    id: "delegation",
    uniqueId: createUniqueId("delegation", delegationCol2Key),
    name: "Delegation",
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    displayKey: delegationCol2Key
  });
  
  // Second BigSquare - Advanced Theory
  sectionsData.push({
    id: "advanced_theory",
    uniqueId: "advanced_theory",
    name: "Advanced Theory",
    color: "var(--hud-coral)",
    type: 'bigSquare',
    size: 'double'
  });
  
  // Second delegation section (Team Building) - with unique ID
  const delegationCol3Key = 'delegation-col3';
  sectionsData.push({
    id: "delegation",
    uniqueId: createUniqueId("delegation", delegationCol3Key),
    name: "Team Building", 
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    displayKey: delegationCol3Key
  });
  
  sectionsData.push({
    id: "monetisation",
    uniqueId: "monetisation",
    name: "Monetisation",
    color: "var(--hud-orange)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  sectionsData.push({
    id: "conversion",
    uniqueId: "conversion",
    name: "Conversion",
    color: "var(--secondary-teal)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  // Use courseUtils.systemDataMap to get proper system identifiers
  const systemDataMap = courseUtils.systemDataMap;
  
  // Create system sections with data from courseUtils
  // First System: Content Management Framework (Notion)
  const notionSystemKey = 'system-notion';
  const notionSystemData = courseUtils.getSystemData(systemDataMap['notion']);
  sectionsData.push({
    id: "notion_system",
    uniqueId: createUniqueId("notion_system", notionSystemKey),
    name: notionSystemData?.title ? `${notionSystemData.title} 💾` : "Content Management Framework 💾",
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: notionSystemKey
  });
  
  // Second System: Production Automation Suite (Engine Room)
  const engineSystemKey = 'system-engine';
  const engineSystemData = courseUtils.getSystemData(systemDataMap['engine']);
  sectionsData.push({
    id: "engine_room",
    uniqueId: createUniqueId("engine_room", engineSystemKey),
    name: engineSystemData?.title ? `${engineSystemData.title} 🏭` : "Production Automation Suite 🏭",
    color: "var(--primary-orange)",
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: engineSystemKey
  });
  
  // Third System: Video Editing Ecosystem (Viral OS)
  const viralSystemKey = 'system-viral';
  const viralSystemData = courseUtils.getSystemData(systemDataMap['viral']);
  sectionsData.push({
    id: "viral_os",
    uniqueId: createUniqueId("viral_os", viralSystemKey),
    name: viralSystemData?.title ? `${viralSystemData.title} 🖥️` : "Video Editing Ecosystem 🖥️",
    color: "var(--accent-coral)", 
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: viralSystemKey
  });
  
  return sectionsData;
};

// Initialize main sections with data from courseUtils
const mainSections: SectionData[] = generateMainSections();

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
          key={square.uniqueId || square.id}
          section={square}
          isSelected={selectedSection === (square.uniqueId || square.id)}
          ref={(el) => { 
            if (el) sectionRefs.current[square.uniqueId || square.id] = el;
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
      data-id={section.uniqueId || section.id}
      data-base-id={section.id}
      data-display-key={section.displayKey}
      className="section-module module-item dark-glow-overlay w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(53,115,128,0.3),_0_0_15px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_25px_rgba(53,115,128,0.5),_0_0_20px_rgba(0,0,0,0.3)] cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] tooltip-trigger"
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
      data-id={section.uniqueId || section.id}
      data-base-id={section.id}
      data-display-key={section.displayKey}
      className="section-module module-item dark-glow-overlay w-[var(--normal-square-width)] h-[var(--normal-square-width)] rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(53,115,128,0.3),_0_0_15px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_25px_rgba(53,115,128,0.5),_0_0_20px_rgba(0,0,0,0.3)] cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] tooltip-trigger"
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
  
  // Calculate square dimensions for the layout - increased for better visibility
  const normalSquareWidth = 48; // Base width in px (increased from 40)
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
    
    // Find the section element using the unique ID
    const sectionEl = document.querySelector(`[data-id="${selectedSection}"]`);
    
    // Get both the base ID and the display key
    const baseId = sectionEl?.getAttribute('data-base-id') || selectedSection;
    const displayKey = sectionEl?.getAttribute('data-display-key') || undefined;
    
    console.log(`Getting modules for section with uniqueId: ${selectedSection}`);
    console.log(`Base ID: ${baseId}, displayKey: ${displayKey || 'none'}`);
    
    // Use the base ID and displayKey to get modules
    // This ensures proper handling of sections with the same base ID but different display contexts
    return courseUtils.getModulesForSection(baseId, displayKey).map(module => ({
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
      
      // Create power cord connecting lines between systems
      // First, get the system blocks
      const systemBlocks = document.querySelectorAll('[data-display-key^="system-"]');
      
      // Create a container for the power lines
      const powerLinesContainer = document.createElement('div');
      powerLinesContainer.className = 'absolute inset-0 pointer-events-none';
      powerLinesContainer.style.zIndex = '-5';
      
      if (systemBlocks.length > 0 && systemBlocks[0].parentElement) {
        // Add the container to the parent of the first system block
        systemBlocks[0].parentElement.appendChild(powerLinesContainer);
        
        // Create power lines between systems
        if (systemBlocks.length >= 2) {
          for (let i = 0; i < systemBlocks.length - 1; i++) {
            const block1 = systemBlocks[i];
            const block2 = systemBlocks[i + 1];
            
            if (block1 && block2) {
              // Create power line element
              const powerLine = document.createElement('div');
              powerLine.className = 'power-line absolute rounded-full h-[3px] bg-theme-bg-secondary/30';
              
              // Calculate positions
              const rect1 = block1.getBoundingClientRect();
              const rect2 = block2.getBoundingClientRect();
              const parentRect = powerLinesContainer.getBoundingClientRect();
              
              // Calculate midpoints of the elements
              const start = {
                x: rect1.left + rect1.width / 2 - parentRect.left,
                y: rect1.top + rect1.height - parentRect.top,
              };
              
              const end = {
                x: rect2.left + rect2.width / 2 - parentRect.left,
                y: rect2.top - parentRect.top,
              };
              
              // Position the line
              powerLine.style.top = `${start.y}px`;
              powerLine.style.left = `${start.x}px`;
              powerLine.style.width = '3px';
              powerLine.style.height = `${end.y - start.y}px`;
              powerLine.style.transformOrigin = 'top';
              
              // Removed power balls for cleaner design
              
              // Add power line to DOM
              powerLinesContainer.appendChild(powerLine);
              
              // Removed power ball animation for cleaner design
            }
          }
        }
      }
      
      // Enhanced system animations - add subtle hover/float to blocks
      gsap.to('[data-display-key^="system-"]', {
        y: -5,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3
      });
      
      // System connector points subtle pulse animation
      gsap.to('.system-connector', {
        scale: 1.2,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });
      
      // Animated power lines between system blocks
      // Create connecting lines between connector points
      document.querySelectorAll('.system-connector').forEach((el, index, array) => {
        if (index < array.length - 1) {
          const el1 = el;
          const el2 = array[index + 1];
          
          if (el1 && el2) {
            // Create power line element
            const powerLine = document.createElement('div');
            powerLine.className = 'power-line absolute bg-theme-bg-secondary/30';
            
            // Get positions
            const rect1 = el1.getBoundingClientRect();
            const rect2 = el2.getBoundingClientRect();
            
            // Only draw vertical lines (by finding connectors that are above/below each other)
            if (Math.abs(rect1.left - rect2.left) < 50) {
              // Find the DOM container
              const container = document.querySelector('.grid.grid-cols-1.gap-\\[calc\\(var\\(--square-gap-y\\)\\*1\\.2\\)\\]');
              
              if (container) {
                // Create coordinates relative to container
                const containerRect = container.getBoundingClientRect();
                
                // Allow for either direction (top to bottom or bottom to top)
                const startY = rect1.top < rect2.top ? rect1.bottom : rect2.bottom;
                const endY = rect1.top < rect2.top ? rect2.top : rect1.top;
                
                // Position the power line
                powerLine.style.top = `${startY - containerRect.top}px`;
                powerLine.style.left = `${rect1.left + rect1.width/2 - containerRect.left}px`;
                powerLine.style.width = '2px';
                powerLine.style.height = `${endY - startY}px`;
                
                // Removed power ball elements for cleaner design
                
                // Add the power line to the container
                container.appendChild(powerLine);
              }
            }
          }
        }
      });
      
      // Animate notion system data pulse - more subtle
      gsap.to('.notion-pulse', {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Animate video pulse - more subtle
      gsap.to('.video-pulse', {
        scale: 2,
        opacity: 0.6,
        duration: 0.8,
        repeat: -1,
        repeatDelay: 0.5,
        ease: "power2.inOut"
      });
      
      // Notion system animation - pulsing dots and sliding rows
      const notionTimeline = gsap.timeline({ repeat: -1 });
      notionTimeline.to(".notion-dot", { 
        opacity: 0.7, 
        scale: 1.2,
        duration: 0.8, 
        stagger: 0.2,
        ease: "sine.inOut" 
      })
      .to(".notion-dot", { 
        opacity: 0.2, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.2,
        ease: "sine.inOut" 
      });
      
      // Animate notion rows with improved animation
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
      
      // Conveyor belt animation with improved speed
      gsap.to(".conveyor-item", {
        x: "-100%",
        duration: 2.5,
        ease: "none",
        repeat: -1,
        stagger: 0.8
      });
      
      // Video editor playhead animation with improved timing
      gsap.to(".editor-playhead", {
        x: "200%",
        duration: 3,
        ease: "none",
        repeat: -1
      });
      
      // Clip animation with more vibrant effect
      gsap.to(".editor-clips", {
        opacity: 0.8,
        boxShadow: "0 0 5px rgba(255,255,255,0.3)",
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
    
    // Reset scale properties on all sections first - this prevents scale jumping
    const allSections = document.querySelectorAll('.section-module');
    gsap.set(allSections, {
      scale: 1,
      transformOrigin: "center",
      overwrite: true
    });
    
    // If we have a previous section that's different from current, animate it down first
    if (previousSection && previousSection !== selectedSection) {
      const prevSectionEl = sectionRefs.current[previousSection];
      if (prevSectionEl) {
        // Find previous section data by uniqueId first, then fall back to other methods
        const prevSectionData = mainSections.find(s => 
          s.uniqueId === previousSection || 
          s.id === previousSection
        );
        
        if (prevSectionData) {
          // Scale down the previous section first with proper overwrite
          tl.to(prevSectionEl, {
            width: prevSectionData.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            height: prevSectionData.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: true
          });
        }
      }
    }
    
    // Add a tiny pause to let things settle (helps prevent jumping)
    tl.to({}, { duration: 0.05 });
    
    // Reset all sections to their normal sizes
    mainSections.forEach(section => {
      // For system sections we need to handle the displayKey
      if (section.displayKey?.startsWith('system-')) {
        const systemSectionId = section.id + '-' + section.displayKey;
        const sectionEl = sectionRefs.current[systemSectionId];
        
        if (sectionEl && (!selectedSection || systemSectionId !== selectedSection)) {
          tl.set(sectionEl, {
            width: 'calc(var(--normal-square-width)*2)', // System sections are all double width
            height: 'calc(var(--normal-square-width)*2)', // System sections are all double height
            clearProps: "transform,transformOrigin",
            scale: 1,
            overwrite: true
          }, "<");
        }
      } else {
        // Regular section handling
        const sectionEl = sectionRefs.current[section.id];
        if (sectionEl && (!selectedSection || section.id !== selectedSection)) {
          tl.set(sectionEl, {
            width: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            height: section.size === 'double' ? 'calc(var(--normal-square-width)*2)' : 'var(--normal-square-width)',
            clearProps: "transform,transformOrigin",
            scale: 1,
            overwrite: true
          }, "<");
        }
      }
    });
    
    // If a section is selected, expand it after previous collapses
    if (selectedSection) {
      // Find the section element directly using the uniqueId stored in sectionRefs
      let sectionEl = sectionRefs.current[selectedSection];
      
      if (!sectionEl) return;
      
      // Find the section data using uniqueId first
      let sectionData = mainSections.find(s => s.uniqueId === selectedSection || s.id === selectedSection);
      
      // If we still can't find the section data, handle special cases (like system sections)
      if (!sectionData) {
        const sectionDOMEl = document.querySelector(`[data-id="${selectedSection}"]`);
        const baseId = sectionDOMEl?.getAttribute('data-base-id');
        const displayKey = sectionDOMEl?.getAttribute('data-display-key');
        
        if (baseId && displayKey) {
          // Try to find by baseId and displayKey
          sectionData = mainSections.find(s => 
            s.id === baseId && s.displayKey === displayKey
          );
        }
      }
        
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
        tl.to({}, { duration: 0.1 }); // Small pause for better transition feel
      }
      
      // Expand the selected section with a nice elastic effect
      tl.to(sectionEl, {
        width: `${expandedSize}px`,
        height: `${expandedSize}px`,
        duration: 0.35,
        ease: "back.out(1.1)",
        overwrite: true,
        onComplete: () => {
          // Only create modules container if it doesn't already exist
          if (!sectionEl.querySelector('.modules-container')) {
            createModulesGrid(sectionEl, gridSize);
          }
        }
      });
      
      // Only add section title for non-system sections since system sections already have their own titles
      const isSystemSection = selectedSection ? selectedSection.includes('-system-') : false;
      const sectionTitleEl = document.createElement('div');
      sectionTitleEl.id = `section-title-${selectedSection}`;
      sectionTitleEl.className = 'section-title absolute -top-12 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-4 py-2 rounded-lg shadow-theme-md text-lg font-medium z-20 whitespace-nowrap opacity-0';
      sectionTitleEl.innerHTML = isSystemSection ? "" : sectionData.name;
      
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
    setPreviousSection(selectedSection || null);
  }, [selectedSection, selectedSectionModules, previousSection]);
    
    // Function to create modules grid
    function createModulesGrid(sectionEl: HTMLDivElement, gridSize: number) {
      // Create modules container
      const modulesContainer = document.createElement('div');
      modulesContainer.className = 'modules-container absolute inset-0 z-10 p-4 bg-gradient-to-br from-transparent to-theme-primary/15 dark:from-transparent dark:to-theme-accent/30 rounded-xl';
      
      // Get section ID from sectionEl to check if it's a system section
      const sectionId = sectionEl.getAttribute('data-id');
      const baseId = sectionEl.getAttribute('data-base-id');
      const displayKey = sectionEl.getAttribute('data-display-key');
      const isSystemSection = displayKey && displayKey.startsWith('system-');
      
      // Find the section data for color information
      const sectionData = mainSections.find(s => 
        s.uniqueId === sectionId || 
        s.id === sectionId || 
        (s.id === baseId && s.displayKey === displayKey)
      );
      
      // If this is a system section, we want to show a different layout with specific details
      if (isSystemSection) {
        // Ensure the DOM exists
        if (!document.body) return;
        
        // Special layout for system sections - more detailed description
        modulesContainer.style.display = 'flex';
        modulesContainer.style.flexDirection = 'column';
        modulesContainer.style.justifyContent = 'flex-start';
        modulesContainer.style.gap = '12px';
        
        // Create content container for the specific visualization
        const contentEl = document.createElement('div');
        contentEl.className = 'flex-1 flex flex-col gap-4 items-center justify-center';
        
        // Create info button that will trigger a modal
        const infoButton = document.createElement('button');
        infoButton.className = 'bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/30 transition-all duration-300 mt-4 shadow-[0_0_10px_rgba(255,255,255,0.2)]';
        infoButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        
        // Store system information for the modal
        let systemTitle = '';
        let systemDescription = '';
        let systemFeatures: string[] = [];
        
        // Create illustration container
        const illustrationContainer = document.createElement('div');
        illustrationContainer.className = 'mt-2 mb-4 w-full flex justify-center';
        
        // Use the systemDataMap from course-utils to ensure consistency
        const systemDataMap = courseUtils.systemDataMap;
        
        // Determine which system we're showing and set appropriate content
        if (displayKey === 'system-notion') {
          // Get system data from course-utils with correct mapping
          const systemData = courseUtils.getSystemData(systemDataMap['notion']);
          systemTitle = systemData?.title || 'Notion System';
          systemDescription = systemData?.description || 'Our comprehensive content organization system powered by a custom Notion database with advanced integrations.';
          systemFeatures = systemData?.features || [
            'Content planning with linked databases',
            'Ready-to-use templates for scripts',
            'Database analytics for performance tracking',
            'Automated content scheduling and workflows'
          ];
          
          // Notion database illustration - larger and more prominent
          const notionIllustration = document.createElement('div');
          notionIllustration.className = 'w-full max-w-[90%] h-40 bg-white/10 rounded-lg p-4 flex flex-col justify-between';
          
          // Create database rows
          for (let i = 0; i < 3; i++) {
            const rowEl = document.createElement('div');
            rowEl.className = 'flex items-center space-x-3 mb-3';
            
            // Create dot indicator
            const dotEl = document.createElement('div');
            dotEl.className = 'notion-dot w-3 h-3 rounded-full bg-white/50';
            
            // Create row line
            const lineEl = document.createElement('div');
            lineEl.className = 'notion-row h-3 bg-white/30 rounded-full flex-grow';
            
            rowEl.appendChild(dotEl);
            rowEl.appendChild(lineEl);
            notionIllustration.appendChild(rowEl);
          }
          
          // Add a table header to make it more database-like
          const tableHeader = document.createElement('div');
          tableHeader.className = 'w-full flex justify-between text-white/70 text-xs mb-3 px-1';
          tableHeader.innerHTML = '<span>ID</span><span>CONTENT</span><span>STATUS</span>';
          notionIllustration.prepend(tableHeader);
          
          // Add illustration
          illustrationContainer.appendChild(notionIllustration);
          
        } else if (displayKey === 'system-engine') {
          // Get system data from course-utils with correct mapping using the system map
          const systemData = courseUtils.getSystemData(systemDataMap['engine']);
          systemTitle = systemData?.title || 'Engine Room';
          systemDescription = systemData?.description || 'Our streamlined content production system that turns raw footage into professional-quality videos.';
          systemFeatures = systemData?.features || [
            'AI-powered video transcription',
            'Content optimization suggestions',
            'Automated editing workflows',
            'Quality control checkpoints'
          ];
          
          // Engine room illustration - conveyor belt - larger and more detailed
          const engineIllustration = document.createElement('div');
          engineIllustration.className = 'relative w-full max-w-[90%] h-40 mb-4 flex flex-col justify-center';
          
          // Add factory name/title
          const factoryTitle = document.createElement('div');
          factoryTitle.className = 'absolute top-0 left-0 right-0 text-center text-white/70 text-xs mb-1';
          factoryTitle.textContent = 'PRODUCTION LINE';
          engineIllustration.appendChild(factoryTitle);
          
          // Create main conveyor belt
          const conveyor = document.createElement('div');
          conveyor.className = 'h-20 bg-black/20 rounded-lg overflow-hidden mb-4 relative';
          
          // Add machinery above conveyor
          const machinery = document.createElement('div');
          machinery.className = 'absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white/10 rounded-md border border-white/20';
          
          // Add smoke stacks to machinery
          for (let i = 0; i < 2; i++) {
            const smokeStack = document.createElement('div');
            smokeStack.className = 'absolute -top-3 left-' + (i === 0 ? '3' : '8') + ' w-2 h-5 bg-white/20 rounded-t-sm';
            
            // Add smoke particles
            const smoke = document.createElement('div');
            smoke.className = 'factory-smoke absolute -top-2 left-0 w-2 h-2 rounded-full bg-white/40';
            smokeStack.appendChild(smoke);
            
            machinery.appendChild(smokeStack);
          }
          
          conveyor.appendChild(machinery);
          
          const conveyorItems = document.createElement('div');
          conveyorItems.className = 'absolute bottom-3 left-0 right-0 flex items-center';
          
          // Create conveyor items - more items and varied sizes
          for (let i = 0; i < 4; i++) {
            const itemEl = document.createElement('div');
            itemEl.className = `conveyor-item w-${10 + i*2} h-8 mx-${i % 2 ? '2' : '3'} bg-white/${20 + i*5} rounded`;
            conveyorItems.appendChild(itemEl);
          }
          
          conveyor.appendChild(conveyorItems);
          engineIllustration.appendChild(conveyor);
          
          // Add control panel below
          const controlPanel = document.createElement('div');
          controlPanel.className = 'h-8 bg-white/10 rounded-md w-3/4 mx-auto flex items-center justify-around px-2';
          
          // Add control buttons
          for (let i = 0; i < 3; i++) {
            const button = document.createElement('div');
            button.className = `w-4 h-4 rounded-full bg-${i === 0 ? '[var(--hud-accent-red)]' : 'white/30'}`;
            controlPanel.appendChild(button);
          }
          
          engineIllustration.appendChild(controlPanel);
          
          // Add illustration
          illustrationContainer.appendChild(engineIllustration);
          
        } else if (displayKey === 'system-viral') {
          // Get system data from course-utils with correct mapping using the system map
          const systemData = courseUtils.getSystemData(systemDataMap['viral']);
          systemTitle = systemData?.title || 'Video OS';
          systemDescription = systemData?.description || 'A powerful editing system with specialized templates and editing presets for high-conversion videos.';
          systemFeatures = systemData?.features || [
            'Custom transitions and effects library',
            'Proven hook templates for maximum retention',
            'Auto-captioning with style presets',
            'Analytics integration for performance tracking'
          ];
          
          // Video OS illustration - timeline - larger and more detailed
          const videoOSIllustration = document.createElement('div');
          videoOSIllustration.className = 'w-full max-w-[90%] bg-black/20 h-40 rounded-lg p-4 relative flex flex-col justify-between';
          
          // Add editor title
          const editorTitle = document.createElement('div');
          editorTitle.className = 'text-white/70 text-xs mb-2';
          editorTitle.textContent = 'TIMELINE EDITOR';
          videoOSIllustration.appendChild(editorTitle);
          
          // Video track
          const videoTrack = document.createElement('div');
          videoTrack.className = 'h-5 mb-4 bg-black/30 rounded-full relative overflow-hidden';
          
          // Track label
          const videoLabel = document.createElement('div');
          videoLabel.className = 'absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-full text-white/60 text-[10px]';
          videoLabel.textContent = 'VIDEO';
          videoTrack.appendChild(videoLabel);
          
          // Video clips
          const clip1 = document.createElement('div');
          clip1.className = 'editor-clips absolute left-2 w-12 h-full rounded-sm bg-[var(--hud-teal)]/70';
          
          const clip2 = document.createElement('div');
          clip2.className = 'editor-clips absolute left-16 w-14 h-full rounded-sm bg-[var(--hud-coral)]/70';
          
          const clip3 = document.createElement('div');
          clip3.className = 'editor-clips absolute left-32 w-10 h-full rounded-sm bg-[var(--hud-teal)]/50';
          
          const playhead = document.createElement('div');
          playhead.className = 'editor-playhead absolute top-0 bottom-0 left-12 w-0.5 bg-white/90';
          
          videoTrack.appendChild(clip1);
          videoTrack.appendChild(clip2);
          videoTrack.appendChild(clip3);
          videoTrack.appendChild(playhead);
          videoOSIllustration.appendChild(videoTrack);
          
          // Audio track
          const audioTrack = document.createElement('div');
          audioTrack.className = 'h-5 mb-4 bg-black/30 rounded-full relative overflow-hidden';
          
          // Track label
          const audioLabel = document.createElement('div');
          audioLabel.className = 'absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-full text-white/60 text-[10px]';
          audioLabel.textContent = 'AUDIO';
          audioTrack.appendChild(audioLabel);
          
          // Audio clips
          const audioClip1 = document.createElement('div');
          audioClip1.className = 'editor-clips absolute left-4 w-8 h-full rounded-sm bg-white/30';
          
          const audioClip2 = document.createElement('div');
          audioClip2.className = 'editor-clips absolute left-14 w-16 h-full rounded-sm bg-white/30';
          
          const audioClip3 = document.createElement('div');
          audioClip3.className = 'editor-clips absolute left-32 w-8 h-full rounded-sm bg-white/30';
          
          audioTrack.appendChild(audioClip1);
          audioTrack.appendChild(audioClip2);
          audioTrack.appendChild(audioClip3);
          videoOSIllustration.appendChild(audioTrack);
          
          // Effects track
          const effectsTrack = document.createElement('div');
          effectsTrack.className = 'h-5 bg-black/30 rounded-full relative overflow-hidden';
          
          // Track label
          const effectsLabel = document.createElement('div');
          effectsLabel.className = 'absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-full text-white/60 text-[10px]';
          effectsLabel.textContent = 'FX';
          effectsTrack.appendChild(effectsLabel);
          
          // Effects marker
          const effectMarker = document.createElement('div');
          effectMarker.className = 'absolute left-12 top-0 bottom-0 w-4 h-full bg-white/40 rounded-sm';
          
          const effectMarker2 = document.createElement('div');
          effectMarker2.className = 'absolute left-30 top-0 bottom-0 w-4 h-full bg-white/40 rounded-sm';
          
          effectsTrack.appendChild(effectMarker);
          effectsTrack.appendChild(effectMarker2);
          videoOSIllustration.appendChild(effectsTrack);
          
          // Add data processing pulse
          const dataPulse = document.createElement('div');
          dataPulse.className = 'video-pulse absolute top-2 right-2 w-2 h-2 bg-[var(--hud-teal)]/80 rounded-full';
          videoOSIllustration.appendChild(dataPulse);
          
          // Add illustration
          illustrationContainer.appendChild(videoOSIllustration);
        }
        
        // Add the elements to the container
        modulesContainer.appendChild(illustrationContainer);
        modulesContainer.appendChild(contentEl);
        
        // Create modal for system info when button is clicked
        // Check if modal already exists, if so, remove it first
        const existingModal = document.getElementById('system-modal-' + displayKey);
        if (existingModal) {
          document.body.removeChild(existingModal);
        }
        
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300';
        modalContainer.id = 'system-modal-' + displayKey;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-theme-bg-primary p-6 rounded-xl shadow-theme-lg max-w-md w-full max-h-[90vh] overflow-auto transform scale-95 transition-transform duration-300';
        
        // Modal title
        const modalTitle = document.createElement('div');
        modalTitle.className = 'text-2xl font-bold text-theme-primary mb-2 flex justify-between items-center';
        modalTitle.innerHTML = systemTitle + '<button class="modal-close text-theme-secondary hover:text-theme-primary transition-colors p-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>';
        
        // Modal description
        const modalDescription = document.createElement('p');
        modalDescription.className = 'text-theme-secondary mb-4';
        modalDescription.textContent = systemDescription;
        
        // Modal features list
        const modalFeatureList = document.createElement('div');
        modalFeatureList.className = 'bg-theme-bg-secondary/10 rounded-lg p-4 mb-4';
        
        // Features title
        const featuresTitle = document.createElement('h3');
        featuresTitle.className = 'text-theme-primary font-medium mb-3';
        featuresTitle.textContent = 'Key Features';
        modalFeatureList.appendChild(featuresTitle);
        
        // Features list
        const featuresList = document.createElement('ul');
        featuresList.className = 'space-y-2';
        
        systemFeatures.forEach(feature => {
          const listItem = document.createElement('li');
          listItem.className = 'flex items-center text-theme-secondary';
          
          // Create checkmark icon
          const checkIcon = document.createElement('div');
          checkIcon.className = 'w-5 h-5 mr-3 flex items-center justify-center text-theme-accent';
          checkIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          
          listItem.appendChild(checkIcon);
          listItem.appendChild(document.createTextNode(feature));
          featuresList.appendChild(listItem);
        });
        
        modalFeatureList.appendChild(featuresList);
        
        // Add everything to modal
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalDescription);
        modalContent.appendChild(modalFeatureList);
        
        // Action button
        const modalAction = document.createElement('button');
        modalAction.className = 'w-full py-3 px-6 bg-theme-gradient-primary text-white rounded-lg hover-bubbly-sm shadow-theme-sm font-medium';
        modalAction.textContent = 'Coming Soon';
        modalContent.appendChild(modalAction);
        
        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);
        
        // Add info button that shows the modal
        infoButton.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent section click
          const modal = document.getElementById('system-modal-' + displayKey);
          if (modal) {
            // Make sure modal is attached to the document body
            if (!document.body.contains(modal)) {
              document.body.appendChild(modal);
            }
            
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
            
            // Animate modal in
            const modalContentEl = modal.querySelector('div');
            if (modalContentEl) {
              gsap.to(modalContentEl, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
              });
            }
          }
        });
        
        // Add close modal functionality
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = (e.target as HTMLElement).closest('[id^="system-modal-"]');
            if (modal) {
              // Animate modal out
              const modalContentEl = modal.querySelector('div');
              if (modalContentEl) {
                gsap.to(modalContentEl, {
                  scale: 0.95,
                  duration: 0.2,
                  ease: "power3.in",
                  onComplete: () => {
                    modal.style.opacity = '0';
                    modal.style.pointerEvents = 'none';
                  }
                });
              } else {
                modal.style.opacity = '0';
                modal.style.pointerEvents = 'none';
              }
            }
          });
        });
        
        // Add button to container
        contentEl.appendChild(infoButton);
        
        // Add container to section
        sectionEl.appendChild(modulesContainer);
        
        // Animate system content with a nice fade-in sequence
        gsap.from([illustrationContainer, infoButton], { 
          opacity: 0, 
          y: 15, 
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        });
        
      } else {
        // Standard modules grid for normal sections
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
          moduleEl.className = 'module-item dark-glow-overlay rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_0_15px_rgba(53,115,128,0.3),_0_0_10px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.5),_0_0_15px_rgba(0,0,0,0.3)] cursor-pointer relative overflow-hidden tooltip-trigger';
          
          // Get section color for overlay
          const sectionColor = sectionData?.color || module.color || 'var(--theme-accent)';
          
          // Get module thumbnail URL - handle different data structures
          const thumbnailPath = module.thumbnail || courseUtils.getModuleThumbnail(module.id);
          const thumbnailUrl = courseUtils.getThumbnailPath(thumbnailPath);
          
          // Set background with section color overlay on thumbnail
          moduleEl.style.backgroundColor = sectionColor; // Fallback if image fails
          moduleEl.style.background = `linear-gradient(135deg, ${sectionColor}99, ${sectionColor}cc), url('${thumbnailUrl}')`;
          moduleEl.style.backgroundSize = 'cover';
          moduleEl.style.backgroundPosition = 'center';
          
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
    }
  
  // Handle click events
  const handleModuleClick = (e: React.MouseEvent) => {
    const moduleItem = (e.target as HTMLElement).closest('.module-item');
    if (!moduleItem) return;
    
    // Get module/section data attributes
    const moduleId = moduleItem.getAttribute('data-id');
    const baseId = moduleItem.getAttribute('data-base-id');
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
      // We're clicking on a section square - use the uniqueId (data-id) which already 
      // incorporates both the baseId and displayKey when needed
      
      // The uniqueId should already be properly formatted in the data-id attribute
      // This ensures proper identification of sections with the same base ID but different display contexts
      if (onModuleClick) {
        onModuleClick(moduleId);
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
        
        .section-module, .module-item {
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .section-module:hover, .module-item:hover {
          transform: translateY(-3px) scale(1.03);
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="w-full max-w-[1100px] h-full min-h-[700px] max-h-[900px] p-6 relative overflow-visible flex items-center justify-center"
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
        <div className="absolute inset-0 -z-20 opacity-[0.25] grid-bg bg-gradient-to-br from-theme-primary/10 to-theme-accent/10 dark:from-theme-primary/20 dark:to-theme-accent/20"></div>
        
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
                {/* SYSTEM BLOCKS with enhanced visuals and interactivity */}
                {/* Power connection points for system modules */}
                <div className="absolute top-[45%] left-[50%] w-[85%] h-0 z-[-1]">
                  {/* This will be populated by GSAP with power lines */}
                </div>

                {/* Notion System - Quality & Quantity */}
                <div 
                  key={systemsColumn[0].displayKey}
                  ref={(el) => { 
                    if (el) sectionRefs.current[systemsColumn[0].uniqueId || (systemsColumn[0].id + '-' + systemsColumn[0].displayKey)] = el;
                    return undefined;
                  }}
                  data-id={systemsColumn[0].uniqueId || (systemsColumn[0].id + '-' + systemsColumn[0].displayKey)}
                  data-base-id={systemsColumn[0].id}
                  data-display-key={systemsColumn[0].displayKey}
                  className="section-module module-item dark-glow-overlay w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-[0_5px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_25px_rgba(53,115,128,0.4),_0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_30px_rgba(53,115,128,0.6),_0_0_20px_rgba(0,0,0,0.4)] cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden tooltip-trigger"
                  style={{ 
                    background: "linear-gradient(135deg, rgb(0, 36, 48), rgb(8, 29, 39))"
                  }}
                >
                  {/* Power connection point */}
                  <div className="absolute bottom-[5px] left-[50%] w-2 h-2 bg-theme-bg-secondary/60 rounded-full transform translate-x-[-50%] z-10 system-connector"></div>
                  
                  {/* Tooltip */}
                  <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
                    {systemsColumn[0].name}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-white font-bold text-lg mb-2">
                      {courseUtils.getSystemData('notion_system')?.title?.toUpperCase() || "NOTION SYSTEM"}
                    </div>
                    <div className="w-12 h-1 bg-white/30 rounded-full mb-4"></div>
                    <div className="text-white/80 text-sm mb-3">
                      {courseUtils.getSystemData('notion_system')?.subtitle || "Content Organization"}
                    </div>
                    
                    {/* Enhanced database representation with animation */}
                    <div className="w-full max-w-[80%] h-20 bg-white/10 rounded-lg p-2 flex flex-col justify-between system-notion-container relative">
                      {/* Animated data pulse effect - more subtle */}
                      <div className="absolute top-[10%] right-[10%] w-1 h-1 bg-theme-bg-secondary/80 rounded-full notion-pulse"></div>
                      
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex space-x-2 items-center">
                          <div className="notion-dot w-2 h-2 rounded-full bg-white/50"></div>
                          <div className="notion-row h-2 bg-white/30 rounded-full flex-grow"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Featured indicator with glow */}
                  {systemsColumn[0].featured && (
                    <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-[0_0_5px_rgba(255,0,0,0.3)]"></div>
                  )}
                </div>
                
                {/* Engine Room System */}
                <div 
                  key={systemsColumn[1].displayKey}
                  ref={(el) => { 
                    if (el) sectionRefs.current[systemsColumn[1].uniqueId || (systemsColumn[1].id + '-' + systemsColumn[1].displayKey)] = el;
                    return undefined;
                  }}
                  data-id={systemsColumn[1].uniqueId || (systemsColumn[1].id + '-' + systemsColumn[1].displayKey)}
                  data-base-id={systemsColumn[1].id}
                  data-display-key={systemsColumn[1].displayKey}
                  className="section-module module-item dark-glow-overlay w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-[0_5px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_25px_rgba(53,115,128,0.4),_0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_30px_rgba(53,115,128,0.6),_0_0_20px_rgba(0,0,0,0.4)] cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden tooltip-trigger"
                  style={{ 
                    background: "linear-gradient(135deg, var(--primary-orange), var(--hud-coral))"
                  }}
                >
                  {/* Power connection points */}
                  <div className="absolute top-[5px] left-[50%] w-2 h-2 bg-theme-bg-secondary/60 rounded-full transform translate-x-[-50%] z-10 system-connector"></div>
                  <div className="absolute bottom-[5px] left-[50%] w-2 h-2 bg-theme-bg-secondary/60 rounded-full transform translate-x-[-50%] z-10 system-connector"></div>
                  
                  {/* Tooltip */}
                  <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
                    {systemsColumn[1].name}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-white font-bold text-lg mb-2">
                      {courseUtils.getSystemData('engine_room')?.title?.toUpperCase() || "ENGINE ROOM"}
                    </div>
                    <div className="w-12 h-1 bg-white/30 rounded-full mb-4"></div>
                    <div className="text-white/80 text-sm mb-4">
                      {courseUtils.getSystemData('engine_room')?.subtitle || "Content Production"}
                    </div>
                    
                    {/* Enhanced conveyor belt with moving items */}
                    <div className="relative w-full max-w-[80%] system-engine-container">
                      {/* Factory smoke effects */}
                      <div className="absolute -top-2 right-4 w-1 h-1 bg-white/50 rounded-full factory-smoke"></div>
                      <div className="absolute -top-2 right-6 w-1 h-1 bg-white/50 rounded-full factory-smoke"></div>
                      
                      <div className="h-10 bg-black/20 rounded-lg overflow-hidden">
                        <div className="absolute inset-y-0 left-4 right-4 flex items-center">
                          <div className="conveyor-item w-8 h-6 mx-2 bg-white/20 rounded"></div>
                          <div className="conveyor-item w-8 h-6 mx-2 bg-white/30 rounded"></div>
                          <div className="conveyor-item w-8 h-6 mx-2 bg-white/25 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Featured indicator with glow */}
                  {systemsColumn[1].featured && (
                    <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-[0_0_5px_rgba(255,0,0,0.3)]"></div>
                  )}
                </div>
                
                {/* Viral Video OS */}
                <div 
                  key={systemsColumn[2].displayKey}
                  ref={(el) => { 
                    if (el) sectionRefs.current[systemsColumn[2].uniqueId || (systemsColumn[2].id + '-' + systemsColumn[2].displayKey)] = el;
                    return undefined;
                  }}
                  data-id={systemsColumn[2].uniqueId || (systemsColumn[2].id + '-' + systemsColumn[2].displayKey)}
                  data-base-id={systemsColumn[2].id}
                  data-display-key={systemsColumn[2].displayKey}
                  className="section-module module-item dark-glow-overlay w-[calc(var(--normal-square-width)*2)] h-[calc(var(--normal-square-width)*2)] rounded-xl shadow-[0_5px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_25px_rgba(53,115,128,0.4),_0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_30px_rgba(53,115,128,0.6),_0_0_20px_rgba(0,0,0,0.4)] cursor-pointer relative transition-all duration-[var(--theme-transition-bounce)] overflow-hidden tooltip-trigger"
                  style={{ 
                    background: "linear-gradient(145deg, var(--hud-teal), #2A7590)"
                  }}
                >
                  {/* Power connection point */}
                  <div className="absolute top-[5px] left-[50%] w-2 h-2 bg-theme-bg-secondary/60 rounded-full transform translate-x-[-50%] z-10 system-connector"></div>
                  
                  {/* Tooltip */}
                  <div className="tooltip-content absolute -top-10 left-1/2 transform -translate-x-1/2 bg-theme-bg-primary text-theme-primary px-2 py-1 rounded shadow-theme-md text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none z-20">
                    {systemsColumn[2].name}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-theme-bg-primary rotate-45"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-white font-bold text-lg mb-2">
                      {courseUtils.getSystemData('viral_os')?.title?.toUpperCase() || "VIDEO OS"}
                    </div>
                    <div className="w-12 h-1 bg-white/30 rounded-full mb-4"></div>
                    <div className="text-white/80 text-sm mb-3">
                      {courseUtils.getSystemData('viral_os')?.subtitle || "Editing Tools"}
                    </div>
                    
                    {/* Enhanced timeline with playhead animation */}
                    <div className="w-full max-w-[80%] bg-black/20 h-16 rounded-lg p-2 relative system-video-container">
                      {/* Data processing pulse effect - more subtle */}
                      <div className="absolute top-1 right-2 w-1 h-1 bg-theme-bg-secondary/80 rounded-full video-pulse"></div>
                      
                      {/* Video track */}
                      <div className="h-3 mb-2 bg-black/30 rounded-full relative overflow-hidden">
                        <div className="editor-clips absolute left-2 w-8 h-full rounded-sm bg-[var(--hud-teal)]/70"></div>
                        <div className="editor-clips absolute left-12 w-10 h-full rounded-sm bg-[var(--hud-coral)]/70"></div>
                        <div className="editor-playhead absolute top-0 bottom-0 left-8 w-0.5 bg-white/80"></div>
                      </div>
                      
                      {/* Audio track */}
                      <div className="h-3 bg-black/30 rounded-full relative overflow-hidden">
                        <div className="editor-clips absolute left-2 w-5 h-full rounded-sm bg-white/30"></div>
                        <div className="editor-clips absolute left-9 w-12 h-full rounded-sm bg-white/30"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Featured indicator with glow */}
                  {systemsColumn[2].featured && (
                    <div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-[0_0_5px_rgba(255,0,0,0.3)]"></div>
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