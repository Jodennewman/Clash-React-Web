# ModuleHUD and CourseViewer Implementation Plan

## Executive Summary

This implementation plan addresses critical issues with the ModuleHUD and CourseViewer components:

1. **`mapSectionId` Function Error**: The function is defined in course-utils.tsx but not exported in the default object
2. **Color Inconsistency**: ModuleHUD uses a monotonous color scheme instead of the original visually-appealing variety
3. **Hardcoded Data**: CourseViewer uses hardcoded module data instead of retrieving it from courseUtils
4. **Inconsistent Data Handling**: Inconsistent approach to section IDs and data retrieval

The plan provides step-by-step instructions for implementing immediate fixes and long-term improvements.

## 1. Analysis of Current Issues

### 1.1. ModuleHUD Component Issues

- **Error**: "courseUtils.mapSectionId is not a function" when trying to access a function that exists but isn't exported
- **Color Variables**: Current implementation uses a limited set of color variables (`--hud-teal`, `--hud-navy`, `--primary-orange`, `--hud-coral`), missing the original colorful variety that included pink, yellow, and other colors
- **Data Integration**: While the component attempts to use courseUtils data, the implementation is incomplete and error-prone
- **Section ID Handling**: Inconsistent handling of section IDs and related data attributes

### 1.2. CourseViewer Component Issues

- **Hardcoded Data**: Uses a large hardcoded `moduleData` object (lines 118-218) instead of pulling data from courseUtils
- **Integration with ModuleHUD**: The communication between components relies on IDs that might not match actual data
- **Performance Issues**: Inefficient data fetching and unnecessary re-renders

## 2. Implementation Plan

### 2.1. Step 1: Fix the courseUtils.mapSectionId Function Export

```typescript
// In course-utils.tsx at the end of the file (around line 1633)

export default {
  tracks,
  sections,
  featuredModules,
  getModulesForSection,
  getFounderModules,
  courseStats,
  getSectionDescription,
  getModulesByTrack,
  getTrackIcon,
  getAllInstructors,
  calculateTotalDuration,
  getModuleById,
  getCategories,
  getSection,
  getThumbnailPath,
  getSubmodule,
  getSubmodulesForModule,
  getContentHierarchy,
  filterModules,
  searchModules,
  getCreators,
  getModuleTitle,
  getModuleThumbnail,
  getSubmoduleThumbnail,
  getSystemData,
  systemDataMap,
  mapSectionId  // Add this line to export the mapSectionId function
};
```

### 2.2. Step 2: Restore Original Color Scheme in ModuleHUD

Update the `generateMainSections` function in ModuleHUD.tsx to use the proper HUD color variables:

```typescript
// Function to generate main sections with proper color variables
const generateMainSections = (): SectionData[] => {
  // Get all sections from courseUtils
  const courseUtilsSections = courseUtils.sections;
  
  // Map course data sections to UI section data structure
  let sectionsData: SectionData[] = [];
  
  // Helper function to create uniqueId from id and displayKey
  const createUniqueId = (id: string, displayKey?: string): string => {
    return displayKey ? `${id}-${displayKey}` : id;
  };
  
  // Function to get section name from courseUtils
  const getSectionName = (id: string): string => {
    const section = courseUtilsSections.find(s => s.id === id);
    return section?.name || id;
  };
  
  // First BigSquare - Basic Theory/Core Concepts
  sectionsData.push({
    id: "basic_theory",
    uniqueId: "basic_theory",
    name: getSectionName("theory_basics") || "Basic Theory",
    color: "var(--hud-teal)",
    type: 'bigSquare',
    size: 'double',
    featured: true
  });
  
  // First Column - Upskillers - Using course data
  sectionsData.push({
    id: "upskiller_authentic_research_writer",
    uniqueId: "upskiller_authentic_research_writer",
    name: getSectionName("research") || "Research & Writing",
    color: "var(--secondary-teal)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  sectionsData.push({
    id: "upskiller_shorts_ready_videographer",
    uniqueId: "upskiller_shorts_ready_videographer",
    name: getSectionName("shooting") || "Shooting",
    color: "var(--hud-pink)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  sectionsData.push({
    id: "upskiller_vertical_video_editors",
    uniqueId: "upskiller_vertical_video_editors",
    name: getSectionName("editing") || "Editing",
    color: "var(--accent-coral)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  // Second Column - PR/Authority & Delegation
  sectionsData.push({
    id: "pr_authority",
    uniqueId: "pr_authority",
    name: getSectionName("authority_brand") || "PR & Authority",
    color: "var(--hud-coral)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  // First delegation section - with unique ID
  const delegationCol2Key = 'delegation-col2';
  sectionsData.push({
    id: "delegation",
    uniqueId: createUniqueId("delegation", delegationCol2Key),
    name: getSectionName("business_delegation") || "Delegation",
    color: "var(--hud-navy)",
    type: 'normalSquare',
    size: 'normal',
    displayKey: delegationCol2Key
  });
  
  // Second BigSquare - Advanced Theory
  sectionsData.push({
    id: "advanced_theory",
    uniqueId: "advanced_theory",
    name: getSectionName("theory_advanced") || "Advanced Theory",
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
    name: getSectionName("monetisation") || "Monetisation",
    color: "var(--hud-orange)",
    type: 'normalSquare',
    size: 'normal'
  });
  
  sectionsData.push({
    id: "conversion",
    uniqueId: "conversion",
    name: getSectionName("conversions") || "Conversion",
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
    name: notionSystemData?.title ? `${notionSystemData.title} ${notionSystemData.emoji || "💾"}` : "Content Management Framework 💾",
    color: "var(--hud-teal)",
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
    name: engineSystemData?.title ? `${engineSystemData.title} ${engineSystemData.emoji || "🏭"}` : "Production Automation Suite 🏭",
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
    name: viralSystemData?.title ? `${viralSystemData.title} ${viralSystemData.emoji || "🖥️"}` : "Video Editing Ecosystem 🖥️",
    color: "var(--hud-navy)", 
    type: 'normalSquare',
    size: 'normal',
    featured: true,
    displayKey: viralSystemKey
  });
  
  return sectionsData;
};
```

### 2.3. Step 3: Fix CourseViewer to Use courseUtils

Replace the hardcoded moduleData object and update the handleModuleClick function:

```typescript
// Remove the hardcoded moduleData object (lines 118-218)
// Replace with dynamic data retrieval

// Function to handle module click within an expanded section
const handleModuleClick = (moduleId: string) => {
  // Get the section element to access its data attributes
  const sectionEl = document.querySelector(`[data-id="${selectedSection}"]`);
  
  // Get baseId and displayKey from the section element
  const baseId = sectionEl?.getAttribute('data-base-id') || moduleId;
  const displayKey = sectionEl?.getAttribute('data-display-key');
  
  // Get modules for this section using courseUtils
  const modules = courseUtils.getModulesForSection(baseId, displayKey);
  
  // Find the specific module by ID
  const module = modules.find(m => m.id === moduleId);
  
  if (module) {
    // Convert module to ModuleDetails format
    const moduleDetails: ModuleDetails = {
      id: module.id,
      title: module.title,
      subtitle: module.subtitle || '',
      points: Array.isArray(module.points) ? module.points : [],
      thumbnail: courseUtils.getThumbnailPath(module.thumbnail || 'default.webp')
    };
    
    setSelectedModule(moduleDetails);
    setShowModal(true);
  } else {
    console.warn(`Module with ID ${moduleId} not found in section ${baseId}`);
  }
};
```

### 2.4. Step 4: Ensure Proper Unique IDs and Data Attributes

Make sure data attributes are consistent in the ModuleHUD component:

```typescript
// In BigSquare component
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
  {/* Content here */}
</div>

// In NormalSquare component
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
  {/* Content here */}
</div>
```

## 3. Comprehensive Refactoring Plan

For a more thorough improvement beyond the immediate fixes:

### 3.1. Create ModuleData Context

```typescript
// Create ModuleDataContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import courseUtils from '../lib/course-utils';

interface ModuleDataContextType {
  sections: any[];
  loading: boolean;
  error: string | null;
  getSection: (id: string, displayKey?: string) => any;
  getModulesForSection: (id: string, displayKey?: string) => any[];
  getSectionName: (id: string) => string;
  getModuleById: (id: string) => any;
  getThumbnailPath: (thumbnailName: string) => string;
}

const ModuleDataContext = createContext<ModuleDataContextType | null>(null);

export const ModuleDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const allSections = courseUtils.sections;
      setSections(allSections);
      setLoading(false);
    } catch (err) {
      setError('Error loading course data');
      setLoading(false);
      console.error('Error loading course data:', err);
    }
  }, []);

  const getSectionName = (id: string): string => {
    const section = sections.find(s => s.id === id);
    return section?.name || id;
  };

  const value = {
    sections,
    loading,
    error,
    getSection: courseUtils.getSection,
    getModulesForSection: courseUtils.getModulesForSection,
    getSectionName,
    getModuleById: courseUtils.getModuleById,
    getThumbnailPath: courseUtils.getThumbnailPath
  };

  return (
    <ModuleDataContext.Provider value={value}>
      {children}
    </ModuleDataContext.Provider>
  );
};

export const useModuleData = () => {
  const context = useContext(ModuleDataContext);
  if (!context) {
    throw new Error('useModuleData must be used within a ModuleDataProvider');
  }
  return context;
};
```

### 3.2. Refactor ModuleHUD to Use ModuleData Context

```typescript
// In ModuleHUD.tsx

import { useModuleData } from '../context/ModuleDataContext';

export const ModuleHUD: React.FC<ModuleHUDProps> = ({ selectedSection, onModuleClick }) => {
  // Use the ModuleData context
  const { sections, getSectionName, getThumbnailPath } = useModuleData();
  
  // Rest of the component...
}
```

### 3.3. Refactor CourseViewer to Use ModuleData Context

```typescript
// In CourseViewer.tsx

import { useModuleData } from '../context/ModuleDataContext';

export const CourseViewer: React.FC = () => {
  // Use the ModuleData context
  const { getModulesForSection, getModuleById, getThumbnailPath } = useModuleData();
  
  // Function to handle module click with context data
  const handleModuleClick = (moduleId: string) => {
    // Get the section element to access its data attributes
    const sectionEl = document.querySelector(`[data-id="${selectedSection}"]`);
    
    // Get baseId and displayKey from the section element
    const baseId = sectionEl?.getAttribute('data-base-id') || moduleId;
    const displayKey = sectionEl?.getAttribute('data-display-key');
    
    // Get the module using context functions
    const module = getModuleById(moduleId);
    
    if (module) {
      // Convert module to ModuleDetails format
      const moduleDetails: ModuleDetails = {
        id: module.id,
        title: module.title,
        subtitle: module.subtitle || '',
        points: Array.isArray(module.points) ? module.points : [],
        thumbnail: getThumbnailPath(module.thumbnail || 'default.webp')
      };
      
      setSelectedModule(moduleDetails);
      setShowModal(true);
    }
  };
  
  // Rest of the component...
}
```

## 4. Implementation Considerations

### 4.1. Backward Compatibility Checks

1. **Verify Section IDs**: Ensure all section IDs used in the UI match what's in the course data or can be properly mapped
2. **Thumbnail Validation**: Add error handling for missing thumbnails to prevent broken images
3. **Default Values**: Provide sensible defaults for all data to handle inconsistencies

### 4.2. Testing Strategy

1. **Verify Color Scheme**: Check that all sections now display with their intended colors
2. **Check Section Expansion**: Ensure sections expand and show proper modules when clicked
3. **Validate Module Details**: Verify module details display correctly when modules are clicked
4. **Test in Both Themes**: Ensure everything works in both light and dark themes
5. **Test Edge Cases**:
   - Missing section data
   - Missing module data
   - Sections with duplicate IDs but different display keys

### 4.3. Performance Optimizations

1. **Memoize Component Values**: Use useMemo for expensive calculations and to prevent unnecessary rerenders
2. **Optimize Section Lookup**: Create lookup maps instead of using Array.find in loops
3. **Lazy Load Module Data**: Only fetch module details when a section is expanded

## 5. Long-term Improvement Recommendations

1. **Type Safety**: Add comprehensive TypeScript interfaces for all data structures
2. **Error Boundaries**: Implement error boundaries around critical components
3. **Data Caching**: Implement proper data caching for repeated data access
4. **Analytics Integration**: Add tracking for section and module interactions
5. **Accessibility Improvements**: Ensure keyboard navigation and screen reader support

## 6. Known Edge Cases

1. **Section IDs with Special Characters**: Ensure proper escaping when used in DOM selectors
2. **Missing or Malformed Data**: Handle gaps in course data gracefully with defaults
3. **Multiple Instance Handling**: Support multiple ModuleHUD instances on the same page
4. **Deep Linking**: Support direct links to specific sections or modules

## Conclusion

This implementation plan provides a comprehensive approach to fixing the current issues with ModuleHUD and CourseViewer components while setting up a solid foundation for future improvements. Following these steps will ensure that the components work correctly, maintain visual appeal, and provide a consistent user experience.