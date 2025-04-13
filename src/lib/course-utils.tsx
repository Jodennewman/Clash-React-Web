import { Briefcase, Compass, Pencil, Camera, Scissors, Rocket, Wrench } from 'lucide-react';

// Import the thumbnail mapper to use instead of direct path construction
import { getThumbnail } from '../utils/thumbnailMapper';
import { findImageByBasename } from '../utils/importImages';

// Types for course data structure matching the JSON format
export interface Submodule {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  difficulty: number;
  resources: string[];
  highValue: boolean;
  week: number;
  instructor: string;
  thumbnail?: string; // Added thumbnail property for submodules
  key?: string; // Optional key for React rendering
}

// Types for creator/case study data
export interface CreatorDataPoint {
  month: string;
  views: number;
  followers: number;
  interactions: number;
}

export interface CreatorTotals {
  views: number;
  followers: number;
  interactions: number;
}

export interface Creator {
  id: number;
  name: string;
  avatar: string;
  description: string;
  data: CreatorDataPoint[];
  totals: CreatorTotals;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  thumbnail: string;
  points: string[];
  tracks: string[];
  duration: number;
  founderMustWatch: boolean;
  entrepreneurSpecific: boolean;
  popular: boolean;
  featured: boolean;
  submodules: Submodule[];
  key?: string; // Optional key for React rendering
}

// Helper function to get the full path for a thumbnail
export const getThumbnailPath = (thumbnailName: string): string => {
  // Use the thumbnailMapper's getThumbnail function which handles
  // Vite imports properly and integrates with imageMap.js
  return getThumbnail(thumbnailName);
};

// Helper function to get avatar path properly
export const getAvatarPath = (avatarPath: string): string => {
  // Try to find the avatar in the explicitly imported images
  const foundAvatar = findImageByBasename(avatarPath);
  if (foundAvatar) {
    return foundAvatar;
  }
  
  // If not found, return the original path (warning will be shown in console)
  console.warn(`Avatar not found in imported images: ${avatarPath}, using direct path`);
  return avatarPath;
};

// Helper function to get submodule thumbnail path with caching
const submoduleThumbnailCache = new Map<string, string>();

export const getSubmoduleThumbnail = (submoduleId: string, moduleId?: string): string => {
  // Create a cache key that combines submoduleId and moduleId (if provided)
  const cacheKey = moduleId ? `${submoduleId}-${moduleId}` : submoduleId;
  
  // Check if we have a cached result
  if (submoduleThumbnailCache.has(cacheKey)) {
    return submoduleThumbnailCache.get(cacheKey) || '';
  }
  
  // Try to find the submodule to get its explicit thumbnail
  let thumbnail = '';
  
  if (moduleId) {
    const module = getModuleById(moduleId);
    if (module && Array.isArray(module.submodules)) {
      const submodule = module.submodules.find(sub => sub.id === submoduleId);
      if (submodule && submodule.thumbnail) {
        thumbnail = submodule.thumbnail;
      }
    }
  } else {
    // If no moduleId is provided, search through all modules - use more efficient indexing
    if (courseData && Array.isArray(courseData.categories)) {
      // Use a flat map approach to reduce nesting
      const foundThumbnail = courseData.categories
        .flatMap(category => category.sections || [])
        .flatMap(section => section.modules || [])
        .find(module => {
          if (Array.isArray(module.submodules)) {
            const submodule = module.submodules.find(sub => sub.id === submoduleId);
            if (submodule && submodule.thumbnail) {
              thumbnail = submodule.thumbnail;
              return true;
            }
          }
          return false;
        });
    }
  }
  
  // If no explicit thumbnail found, derive from submodule ID or use parent module's
  if (!thumbnail && moduleId) {
    // Try the parent module's thumbnail
    const moduleThumbnail = getModuleThumbnail(moduleId);
    if (moduleThumbnail) {
      const result = getThumbnailPath(moduleThumbnail);
      // Cache the result
      submoduleThumbnailCache.set(cacheKey, result);
      return result;
    }
  }
  
  // If we found a thumbnail or we're falling back to a default
  const result = getThumbnailPath(thumbnail || 'the_algorithm');
  
  // Cache the result
  submoduleThumbnailCache.set(cacheKey, result);
  
  return result;
};

export interface Section {
  id: string;
  name: string;
  number: number;
  modules: Module[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  sections: Section[];
}

export interface Track {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Course {
  title: string;
  categories: Category[];
  tracks: Track[];
  creators?: Creator[]; // Add creators/case studies to the course data structure
}

// Import course data from TypeScript file with proper typing
import { courseData as typedCourseData } from '../data/course-data';

// Use the typed course data directly
const courseData: Course = typedCourseData;

// Log for debugging
console.log("Course data loaded:", courseData.title, 
  `Categories: ${courseData.categories.length}`, 
  `Tracks: ${courseData.tracks.length}`
);

// Helper function to get icon component by name
export const getTrackIcon = (iconName: string) => {
  switch (iconName) {
    case 'rocket':
      return Rocket;
    case 'briefcase':
      return Briefcase;
    case 'pencil':
      return Pencil;
    case 'scissors':
      return Scissors;
    case 'camera':
      return Camera;
    case 'compass':
      return Compass;
    case 'wrench':
      return Wrench;
    default:
      return Rocket;
  }
};

/**
 * Course statistics - imported from course-data.ts source of truth
 */
import { courseStats as courseStatsData } from '../data/course-data';
export const courseStats = courseStatsData;

// Safe getter for tracks
const getTracksWithFallback = (): Track[] => {
  if (courseData && Array.isArray(courseData.tracks)) {
    return courseData.tracks;
  }
  return [];
};

// Get all tracks from course data
export const tracks: Track[] = getTracksWithFallback();

// Safe getter for sections with additional debugging
const getSectionsWithFallback = () => {
  const result = [];
  console.log("Building sections list from course data...");
  
  // Add system sections first
  const systemSections = [
    {
      id: 'notion_system',
      name: 'Content Management Framework',
      number: 97,
      color: 'var(--hud-navy)',
      modules: 1,
      displayKey: 'system-notion'
    },
    {
      id: 'engine_room',
      name: 'Production Automation Suite',
      number: 98,
      color: 'var(--primary-orange)',
      modules: 1,
      displayKey: 'system-engine'
    },
    {
      id: 'viral_os',
      name: 'Video Editing Ecosystem',
      number: 99,
      color: 'var(--accent-coral)',
      modules: 1,
      displayKey: 'system-viral'
    }
  ];
  
  // Add system sections to result
  result.push(...systemSections);
  
  // Add regular sections from course data
  if (courseData && Array.isArray(courseData.categories)) {
    for (const category of courseData.categories) {
      if (Array.isArray(category.sections)) {
        for (const section of category.sections) {
          // Create a section entry with basic properties
          const sectionEntry = {
            id: section.id || '',
            name: section.name || '',
            number: section.number || 0,
            color: category.color || '#000000',
            modules: Array.isArray(section.modules) ? section.modules.length : 0
          };
          
          // Log for debugging
          console.log(`Found section: ${sectionEntry.name} (ID: ${sectionEntry.id}) with ${sectionEntry.modules} modules`);
          
          result.push(sectionEntry);
        }
      }
    }
  }
  
  // Sort by section number
  result.sort((a, b) => a.number - b.number);
  
  return result;
};

// Get simplified sections for navigation
export const sections = getSectionsWithFallback();

// Get all featured modules across all sections with safety checks
export const getFeaturedModules = (): Module[] => {
  const featuredModules: Module[] = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && module.featured === true) {
                featuredModules.push(module);
              }
            });
          }
        });
      }
    });
  }
  
  return featuredModules;
};

export const featuredModules = getFeaturedModules();

// Mapping from ModuleHUD section IDs to course data section IDs
const sectionIdMap: Record<string, string> = {
  // Map UI section IDs to actual data section IDs
  "basic_theory": "theory_basics",
  "advanced_theory": "theory_advanced",
  "upskiller_authentic_research_writer": "research",
  "upskiller_shorts_ready_videographer": "shooting",
  "upskiller_vertical_video_editors": "editing",
  "pr_authority": "authority_brand", // This maps to the Authority and Brand Holism section
  "delegation": "business_delegation", // This would map to a delegation section if it exists
  "monetisation": "monetisation",
  "conversion": "conversions",
  // Systems are handled separately
  "notion_system": "system_notion",
  "engine_room": "system_engine",
  "viral_os": "system_viral"
};

// Helper function to map UI section ID to actual data section ID
export const mapSectionId = (sectionId: string, displayKey?: string): string => {
  // For handling systems and compound IDs
  if (displayKey?.startsWith('system-')) {
    const systemId = displayKey.replace('system-', '');
    console.log(`Mapping system section: ${sectionId} with displayKey ${displayKey}`);
    
    // Return a special identifier for system sections
    return `system_${systemId}`;
  }
  
  // Handle duplicate section IDs with display keys
  if (sectionId === "delegation" && displayKey) {
    console.log(`Using compound ID for delegation: ${sectionId}-${displayKey}`);
    return "business_delegation"; // Use a consistent ID for all delegation sections
  }
  
  // Map the section ID if it exists in the map
  if (sectionIdMap[sectionId]) {
    const mappedId = sectionIdMap[sectionId];
    console.log(`Mapping section ID: ${sectionId} -> ${mappedId}`);
    return mappedId;
  }
  
  // For debugging
  console.log(`No mapping found for section ID: ${sectionId}, using as is`);
  
  // Return as is if no mapping exists
  return sectionId;
};

// Section ID to modules mapping cache
const sectionModulesCache = new Map<string, Module[]>();

// Get modules for a specific section with improved section ID mapping
export const getModulesForSection = (sectionId: string, displayKey?: string): Module[] => {
  if (!sectionId || !courseData) {
    console.log(`No section ID or course data for: ${sectionId}`);
    return [];
  }
  
  // Create a cache key that combines sectionId and displayKey (if provided)
  const cacheKey = displayKey ? `${sectionId}-${displayKey}` : sectionId;
  
  // Check if we have a cached result
  if (sectionModulesCache.has(cacheKey)) {
    return sectionModulesCache.get(cacheKey) || [];
  }
  
  // Handle system sections separately
  if (displayKey?.startsWith('system-')) {
    console.log(`Getting system modules for: ${sectionId} with displayKey ${displayKey}`);
    
    // For system sections, we would normally return modules from the corresponding section
    // Since this appears to be handled outside the normal course data, we'll use the system data
    const systemData = getSystemData(sectionId);
    if (systemData) {
      // Create mock modules for system sections if not in course data
      console.log(`Creating modules for system: ${systemData.title}`);
      const modules = [{
        id: `${sectionId}_module`,
        title: systemData.title,
        subtitle: systemData.description,
        icon: "system",
        color: "#4A90E2",
        thumbnail: "system.webp",
        points: systemData.features,
        tracks: ["Technical Skills"],
        duration: 30,
        founderMustWatch: true, 
        entrepreneurSpecific: true,
        popular: true,
        featured: true,
        submodules: []
      }];
      
      // Cache the result
      sectionModulesCache.set(cacheKey, modules);
      return modules;
    }
    
    // Cache empty array for not found
    sectionModulesCache.set(cacheKey, []);
    return [];
  }
  
  // Map the section ID to the actual ID in the data
  const mappedSectionId = mapSectionId(sectionId, displayKey);
  
  console.log(`Looking for section with mapped ID: ${mappedSectionId}`);
  
  // Use a more efficient flat-map approach to find the section
  const foundSection = courseData.categories
    ?.flatMap(category => 
      (category.sections || []).map(section => ({
        section,
        category
      }))
    )
    .find(({ section }) => section.id === mappedSectionId);
  
  if (foundSection) {
    const modules = Array.isArray(foundSection.section.modules) 
      ? foundSection.section.modules 
      : [];
    
    console.log(`✅ Found ${modules.length} modules for section: ${mappedSectionId}`);
    
    // Cache the result
    sectionModulesCache.set(cacheKey, modules);
    return modules;
  }
  
  // If not found, provide fallback modules for specific sections
  if (mappedSectionId.startsWith('system_')) {
    console.log(`Providing fallback modules for system section: ${mappedSectionId}`);
    const systemType = mappedSectionId.replace('system_', '');
    
    // Use the global systemDataMap for consistency
    
    // Get the correct system data ID
    const systemDataId = systemDataMap[systemType] || '';
    console.log(`Mapped system type ${systemType} to system data ID: ${systemDataId}`);
    
    const systemData = getSystemData(systemDataId);
    
    if (systemData) {
      console.log(`Found system data for: ${systemDataId}`);
      const modules = [{
        id: `${mappedSectionId}_module`,
        title: systemData.title,
        subtitle: systemData.description,
        icon: "system",
        color: "#4A90E2",
        thumbnail: "system.webp",
        points: systemData.features,
        tracks: ["Technical Skills"],
        duration: 30,
        founderMustWatch: true,
        entrepreneurSpecific: true,
        popular: true,
        featured: true,
        submodules: []
      }];
      
      // Cache the result
      sectionModulesCache.set(cacheKey, modules);
      return modules;
    } else {
      console.log(`No system data found for: ${systemDataId}`);
    }
  }
  
  // Log for debugging when section not found
  console.log(`⚠️ Section not found: ${mappedSectionId} (original ID: ${sectionId})`);
  
  // Cache empty array for not found
  sectionModulesCache.set(cacheKey, []);
  return [];
};

// Cache for sections by ID
const sectionCache = new Map<string, Section | null>();

// Get section by ID with safety checks and ID mapping
export const getSection = (sectionId: string, displayKey?: string): Section | null => {
  if (!sectionId || !courseData) {
    console.log(`No section ID or course data for getSection: ${sectionId}`);
    return null;
  }
  
  // Create a cache key that combines sectionId and displayKey (if provided)
  const cacheKey = displayKey ? `${sectionId}-${displayKey}` : sectionId;
  
  // Check if we have a cached result
  if (sectionCache.has(cacheKey)) {
    return sectionCache.get(cacheKey);
  }
  
  // Handle system sections separately
  if (displayKey?.startsWith('system-')) {
    console.log(`Getting system section: ${sectionId} with displayKey ${displayKey}`);
    
    // For system sections, create a mock section using system data
    const systemId = displayKey.replace('system-', '');
    
    // Use the global systemDataMap for consistency
    
    // Get the correct system data ID
    const systemDataId = systemDataMap[systemId] || '';
    console.log(`Mapped system ID ${systemId} to system data ID: ${systemDataId}`);
    
    const systemData = getSystemData(systemDataId);
                     
    if (systemData) {
      console.log(`Creating section for system: ${systemData.title}`);
      
      // Create a mock section with a module from the system data
      const mockSection: Section = {
        id: `system_${systemId}`,
        name: systemData.title,
        number: 99, // High number for systems
        modules: [{
          id: `system_${systemId}_module`,
          title: systemData.title,
          subtitle: systemData.description,
          icon: "system",
          color: "#4A90E2",
          thumbnail: "system.webp",
          points: systemData.features,
          tracks: ["Technical Skills"],
          duration: 30,
          founderMustWatch: true,
          entrepreneurSpecific: true,
          popular: true,
          featured: true,
          submodules: []
        }]
      };
      
      // Cache the mock section
      sectionCache.set(cacheKey, mockSection);
      return mockSection;
    }
    
    // Cache the null result for not found
    sectionCache.set(cacheKey, null);
    return null;
  }
  
  // Map the section ID to the actual ID in the data
  const mappedSectionId = mapSectionId(sectionId, displayKey);
  console.log(`Looking for section with mapped ID: ${mappedSectionId}`);
  
  // Use a more efficient flat-map approach to find the section
  const section = courseData.categories
    ?.flatMap(category => category.sections || [])
    .find(section => section.id === mappedSectionId);
  
  if (section) {
    console.log(`✅ Found section: ${section.name} (ID: ${mappedSectionId})`);
    
    // Cache the found section
    sectionCache.set(cacheKey, section);
    return section;
  }
  
  // Log for debugging when section not found
  console.log(`⚠️ Section not found in getSection: ${mappedSectionId} (original ID: ${sectionId})`);
  
  // Cache the null result for not found
  sectionCache.set(cacheKey, null);
  return null;
};

// Get modules that are marked for founders with safety checks
// Only checking for founderMustWatch property as per user clarification
export const getFounderModules = (): Module[] => {
  let repurposingLinkedInModule: Module | null = null;
  let authorityBrandModule: Module | null = null;
  const otherFounderModules: Module[] = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              console.log('Checking module for founder criteria:', module.title, {
                founderMustWatch: module.founderMustWatch
              });
              
              // Check for specific priority modules first
              if (module && module.title) {
                const title = module.title.toLowerCase();
                if (title.includes("repurposing linkedin") || title.includes("repurposing")) {
                  repurposingLinkedInModule = module;
                  repurposingLinkedInModule.founderMustWatch = true;
                  console.log('✅ Found repurposing LinkedIn module:', module.title);
                } else if (title.includes("authority") || title.includes("brand wholism") || title.includes("authority and brand")) {
                  authorityBrandModule = module;
                  authorityBrandModule.founderMustWatch = true;
                  console.log('✅ Found authority and brand module:', module.title);
                } else if (module.founderMustWatch === true) {
                  otherFounderModules.push(module);
                  console.log('✅ Found other founder module:', module.title);
                }
              }
            });
          }
        });
      }
    });
  }
  
  // Prioritize the specified modules
  const prioritizedModules: Module[] = [];
  
  // Add priority modules first if found
  if (repurposingLinkedInModule) prioritizedModules.push(repurposingLinkedInModule);
  if (authorityBrandModule) prioritizedModules.push(authorityBrandModule);
  
  // Add other founder modules
  prioritizedModules.push(...otherFounderModules);
  
  console.log(`Total founder modules found: ${prioritizedModules.length}`);
  
  // If no founder modules found, create some fallback modules with example data
  if (prioritizedModules.length === 0) {
    console.log('No founder modules found, creating fallback modules');
    
    // Get some featured modules to use as fallbacks if available
    let fallbackModules = getFeaturedModules().slice(0, 5);
    
    // If still no modules, create placeholder modules
    if (fallbackModules.length === 0) {
      console.log('Creating placeholder modules');
      
      // Add priority placeholder modules
      fallbackModules.push({
        id: 'repurposing-linkedin',
        title: 'Repurposing LinkedIn',
        subtitle: 'Transform your LinkedIn content into engaging short-form videos across platforms.',
        icon: "rocket",
        color: "#FF3B30",
        thumbnail: "repurposing.webp",
        points: [
          "Convert LinkedIn posts to social media videos",
          "Maintain professional positioning while creating viral content",
          "Leverage existing content to save time and effort",
          "Use LinkedIn insights to inform content strategy"
        ],
        tracks: ["Content Strategy", "Advanced"],
        duration: 45,
        founderMustWatch: true,
        entrepreneurSpecific: true,
        popular: true,
        featured: true,
        submodules: [
          {
            id: 'repurposing-linkedin-sub-1',
            title: 'LinkedIn Content Audit',
            subtitle: "Analyzing your best performing LinkedIn content",
            duration: 15,
            difficulty: 3,
            resources: ["Audit Template", "Performance Tracker"],
            highValue: true,
            week: 1,
            instructor: "Joden Newman"
          },
          {
            id: 'repurposing-linkedin-sub-2',
            title: 'Video Repurposing Workflow',
            subtitle: "Step-by-step system for transforming text to video",
            duration: 20,
            difficulty: 3,
            resources: ["Production Template", "Content Calendar"],
            highValue: true,
            week: 1,
            instructor: "Joden Newman"
          }
        ]
      });
      
      fallbackModules.push({
        id: 'authority-brand-wholism',
        title: 'Authority and Brand Wholism',
        subtitle: 'Create a cohesive brand presence that positions you as a thought leader.',
        icon: "briefcase",
        color: "#FF3B30",
        thumbnail: "big_picture.webp",
        points: [
          "Establish yourself as the authority in your industry",
          "Develop a consistent voice across all platforms",
          "Balance authenticity with professional positioning",
          "Create a content strategy that enhances your brand"
        ],
        tracks: ["Content Strategy", "Advanced"],
        duration: 50,
        founderMustWatch: true,
        entrepreneurSpecific: true,
        popular: true,
        featured: true,
        submodules: [
          {
            id: 'authority-brand-wholism-sub-1',
            title: 'Authority Positioning Framework',
            subtitle: "Define your unique expertise and positioning",
            duration: 18,
            difficulty: 4,
            resources: ["Positioning Worksheet", "Brand Voice Guide"],
            highValue: true,
            week: 2,
            instructor: "Joden Newman"
          },
          {
            id: 'authority-brand-wholism-sub-2',
            title: 'Creating a Cohesive Brand Strategy',
            subtitle: "Maintaining brand consistency across platforms",
            duration: 22,
            difficulty: 3,
            resources: ["Brand Strategy Template", "Content Style Guide"],
            highValue: true,
            week: 2,
            instructor: "Joden Newman"
          }
        ]
      });
      
      // Create additional sample founder modules
      for (let i = 1; i <= 3; i++) {
        fallbackModules.push({
          id: `founder-sample-${i}`,
          title: `Founder Essential ${i}`,
          subtitle: `Essential knowledge for founders to scale their content strategy efficiently.`,
          icon: "rocket",
          color: "#FF3B30",
          thumbnail: "advanced_metrics_analytics.webp", // Using existing thumbnails
          points: [
            "Strategic content planning for leadership visibility",
            "Delegating content creation while maintaining voice",
            "ROI-focused approach to social media",
            "Time-efficient production systems"
          ],
          tracks: ["Content Strategy", "Advanced"],
          duration: 45,
          founderMustWatch: true,
          entrepreneurSpecific: true,
          popular: true,
          featured: true,
          submodules: [
            {
              id: `founder-sample-${i}-sub-1`,
              title: `Leadership Positioning Strategy`,
              subtitle: "How to position yourself as a thought leader",
              duration: 15,
              difficulty: 3,
              resources: ["Template", "Worksheet"],
              highValue: true,
              week: 1,
              instructor: "Joden Newman"
            },
            {
              id: `founder-sample-${i}-sub-2`,
              title: `Delegation Framework`,
              subtitle: "Systems for delegating content without losing control",
              duration: 20,
              difficulty: 3,
              resources: ["SOP Template", "Team Structure Guide"],
              highValue: true,
              week: 1,
              instructor: "Joden Newman"
            },
            {
              id: `founder-sample-${i}-sub-3`,
              title: `Time Management for Busy Founders`,
              subtitle: "Creating content while running your business",
              duration: 10,
              difficulty: 2,
              resources: ["Schedule Template"],
              highValue: true,
              week: 2,
              instructor: "Joden Newman"
            }
          ]
        });
      }
    } else {
      // Mark the fallback modules as founder modules
      fallbackModules = fallbackModules.map(module => ({
        ...module,
        founderMustWatch: true,
        entrepreneurSpecific: true
      }));
    }
    
    return fallbackModules;
  }
  
  return prioritizedModules;
};

// Get modules by track name with safety checks
export const getModulesByTrack = (trackName: string): Module[] => {
  const modulesByTrack: Module[] = [];
  
  if (!trackName || !courseData) return modulesByTrack;
  
  if (Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && Array.isArray(module.tracks) && 
                  module.tracks.includes(trackName)) {
                modulesByTrack.push(module);
              }
            });
          }
        });
      }
    });
  }
  
  return modulesByTrack;
};

// Get all unique instructors from submodules with safety checks
export const getAllInstructors = (): string[] => {
  const instructors = new Set<string>();
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && Array.isArray(module.submodules)) {
                module.submodules.forEach(submodule => {
                  if (submodule && submodule.instructor) {
                    instructors.add(submodule.instructor);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  
  return Array.from(instructors);
};

// Get case study creators data with safety check
export const getCreators = (): Creator[] => {
  if (courseData && Array.isArray(courseData.creators)) {
    return courseData.creators;
  }
  
  // Fallback data with our incredible #1 results if creators are not in the database
  return [
    {
      id: 1,
      name: "Chris Donnelly",
      avatar: getAvatarPath("src/assets/main/Clients-webp-300px/Chris_Donnelly.webp"),
      description:
        "Chris Donnelly is the founder of luxury digital marketing agency Verb, the cofounder of Lottie, a tech startup for social care, plus an investor, author, speaker and creator. He is now the founder of the creator accelerator, and host of the Wake Up podcast.\nWe started working with Chris in 2022, and grew his TikTok and Instagram accounts from 1k to 1m followers, in just under 2 years, amassing over 250 million views. His account focusses on business, management, leadership and investment.",
      data: [
        { month: "Mar", views: 5500, followers: 2253, interactions: 840 },
        {
          month: "Apr",
          views: 4779726,
          followers: 14679,
          interactions: 294209,
        },
        {
          month: "Jun",
          views: 21365179,
          followers: 72955,
          interactions: 1215532,
        },
        {
          month: "Jul",
          views: 30939528,
          followers: 112591,
          interactions: 1777674,
        },
        {
          month: "Nov",
          views: 60280586,
          followers: 270903,
          interactions: 3510967,
        },
        {
          month: "Feb",
          views: 136764121,
          followers: 673444,
          interactions: 3510967,
        },
      ],
      totals: {
        views: 168427385 + 102432554,
        followers: 509736 + 397154,
        interactions: 7746523,
      },
    },
    {
      id: 2,
      name: "Charlotte Mair",
      avatar: getAvatarPath("/assets/main/Clients-webp-300px/Charlotte_mair.webp"),
      description:
        "Charlotte Mair is the Founder and Managing Director of award winning culture and communications agency, The Fitting Room, a cultural forecaster, speaker, and brand strategist.\nWe started working with Charlotte in October of 2024, and in just 6 months she's built 170k followers across her TikTok and YouTube, and amassed 28 million views. Her account focusses on all things marketing, pop culture and business.",
      data: [
        { month: "Oct", views: 30800, followers: 594, interactions: 347 },
        {
          month: "Nov",
          views: 2504982,
          followers: 6400 + 11390,
          interactions: 63745,
        },
        {
          month: "Dec",
          views: 17493045,
          followers: 69983 + 19796,
          interactions: 1267938,
        },
        {
          month: "Jan",
          views: 21878423,
          followers: 94881 + 28300,
          interactions: 1629321,
        },
        {
          month: "Feb",
          views: 26359144,
          followers: 109125 + 41105,
          interactions: 2077460,
        },
        {
        month: "Mar",
        views: 34698532,
        followers: 178638,
        interactions: 2906438,
        },
      ],
      totals: {
        views: 34698532,
        followers: 178638,
        interactions: 2906438,
      },
    },
    {
      id: 3,
      name: "James Watt",
      avatar: getAvatarPath("assets/main/Clients-webp-300px/James_Watt.webp"),
      description:
        "James Watt is the co-founder and captain of BrewDog the biggest independent beer company on the planet. He's also a best-selling author, investor, North Atlantic captain and the founder of Social Tip, the platform that makes 'anyone an influencer'. \nWe started working with James at the end of 2024 and together grew an audience of 15k followers and 20 million views in just 2 months on TikTok alone. His account focusses on business, beer and lobster fishing (of course).",
      data: [
        { month: "Oct", views: 0, followers: 0, interactions: 0 },
        { month: "Nov", views: 7123640, followers: 7649, interactions: 232779 },
        {
          month: "Dec",
          views: 9456943,
          followers: 11265,
          interactions: 291559,
        },
        {
          month: "Jan",
          views: 9880702,
          followers: 11611,
          interactions: 304054,
        },
      ],
      totals: {
        views: 9880702,
        followers: 11611,
        interactions: 304054,
      },
    },
    {
      id: 4,
      name: "Ben Askins",
      avatar: getAvatarPath("/assets/main/Clients-webp-300px/Ben_Askins.webp"),
      description:
        "Ben Askins is the co-founder of Gaia, a green tech company that helps businesses hit environmental targets efficiently. He alsoo co-founded Verb Brands alongside Chris Donnelly.\nWe started working with Ben in 2022, and grew his audience to 1 million followers across TikTok and Instagram, hitting an insane 387 million views in under 7 months. His account focusses on business, management and genZ.",
      data: [
        { month: "Feb", views: 7263, followers: 104, interactions: 197 },
        { month: "Mar", views: 420099, followers: 1248, interactions: 42877 },
        { month: "Apr", views: 4669887, followers: 1913, interactions: 300616 },
        {
          month: "May",
          views: 19004595,
          followers: 52343,
          interactions: 1576752,
        },
        {
          month: "Jun",
          views: 40342874,
          followers: 167153,
          interactions: 3145698,
        },
        {
          month: "Jul",
          views: 57794777,
          followers: 264207,
          interactions: 4458406,
        },
        {
          month: "Aug",
          views: 68410279,
          followers: 287704,
          interactions: 5196815,
        },
        {
          month: "Sep",
          views: 83934226,
          followers: 346018,
          interactions: 6476592,
        },
        {
          month: "Nov",
          views: 124724682,
          followers: 450644,
          interactions: 9287518,
        },
        {
          month: "Jan",
          views: 209465478,
          followers: 655586,
          interactions: 14918792,
        },
      ],
      totals: {
        views: 387228032,
        followers: 1017913,
        interactions: 22529225,
      },
    },
    {
      id: 5,
      name: "Joden Clash",
      avatar: getAvatarPath("/assets/main/Clients-webp-300px/Joden_Clash.webp"),
      description: "Joden Newman is the Founder and Creative Director of Clash Creation. In early 2024 he decided to apply the vertical shortcut techniques to his own content, and grew himself 110 million views and 1 million followers across all platforms in just 3 months. His account focusses on current events, true crime and film. ",
      data: [
        { month: "Feb", views: 90000, followers: 8322, interactions: 12678 },
        {
          month: "Mar",
          views: 8830000,
          followers: 69630,
          interactions: 725790,
        },
        {
          month: "Apr",
          views: 46300000,
          followers: 407360,
          interactions: 4950000,
        },
        {
          month: "May",
          views: 62080000,
          followers: 680950,
          interactions: 6450000,
        },
        {
          month: "Jun",
          views: 69720000,
          followers: 809000,
          interactions: 7510000,
        },
        {
          month: "Jul",
          views: 89630000,
          followers: 936760,
          interactions: 9360000,
        },
        {
          month: "Aug",
          views: 89630000,
          followers: 936760,
          interactions: 9360000,
        },
      ],
      totals: {
        views: 109630000,
        followers: 936760 + 126212,
        interactions: 9360000,
      },
    },
      {
        id: 6,
        name: "Jordan Schwarz",
        avatar: getAvatarPath("/assets/main/Clients-webp-300px/Jordan_Schwarzenberger.webp"),
        description: "Jordan Schwarzenberger is the co-founder Arcade Media, author, creative and the manager of The Sidemen: the UK's biggest creator empire. \nWe started working with Jordan towards the end of 2024 and together grew his TikTok and Instagram to 39 million views and 15k followers in just 3 months. His account focusses on GenZ, the creator economy, and pop culture.",
        data: [
          {
            month: "Oct",
            views: 0,
            followers: 14562+5344,
            interactions: 0,
          },
          {
            month: "Nov",
            views: 3348513,
            followers: 16896+16900,
            interactions: 231295,
          },
          {
            month: "Dec",
            views: 5518878,
            followers: 21057+18279,
            interactions: 323166,
          },
          {
            month: "Jan",
            views: 9215739+145782+1598500,
            followers: 22255+21710,
            interactions: 566426,
          },
        ],
        totals: {
          views: 9215739+145782+1598500,
          followers: 936760 + 126212,
          interactions: 9360000,
        },
    }
  ];
};

// Calculate total duration of all modules with safety checks
export const calculateTotalDuration = (): number => {
  let totalMinutes = 0;
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && typeof module.duration === 'number') {
                totalMinutes += module.duration;
              }
            });
          }
        });
      }
    });
  }
  
  return totalMinutes;
};

// Section descriptions for ModuleBreakdown with safety checks
export const getSectionDescription = (sectionId: string): string => {
  // Try to find the section in the data with safety checks
  const section = getSection(sectionId);
  if (section && Array.isArray(section.modules) && section.modules.length > 0 && section.modules[0].subtitle) {
    return section.modules[0].subtitle;
  }
  
  // Fallback descriptions if not found
  switch(sectionId) {
    case 'theory_basics':
    case 'basic_theory':
      return 'Foundational concepts to understand short-form content strategy';
    case 'theory_advanced':
      return 'Advanced techniques for maximum engagement and growth';
    case 'research':
      return 'Discover and adapt top-performing content ideas';
    case 'repurposing':
      return 'Transform existing content into viral short-form videos';
    case 'shooting':
      return 'Camera work, setup, and filming techniques';
    case 'editing':
      return 'Post-production methods to enhance your content';
    case 'monetisation':
      return 'Strategies to generate revenue from your content';
    case 'conversions':
      return 'Turn viewers into customers and build your business';
    default:
      return 'Master the essential skills for short-form video success';
  }
};

// Get a specific module by ID with safety checks
export const getModuleById = (moduleId: string): Module | null => {
  if (!moduleId || !courseData) return null;
  
  if (Array.isArray(courseData.categories)) {
    for (const category of courseData.categories) {
      if (category && Array.isArray(category.sections)) {
        for (const section of category.sections) {
          if (section && Array.isArray(section.modules)) {
            for (const module of section.modules) {
              if (module && module.id === moduleId) {
                // Return the module with a key for React rendering
                return {
                  ...module,
                  key: `module-${moduleId}` // Add a key for React
                };
              }
            }
          }
        }
      }
    }
  }
  return null;
};

// Get all categories with safety check
export const getCategories = (): Category[] => {
  return Array.isArray(courseData.categories) ? courseData.categories : [];
};

// Get a specific submodule by IDs
export const getSubmodule = (sectionId: string, moduleId: string, submoduleId: string): Submodule | null => {
  if (!sectionId || !moduleId || !submoduleId || !courseData) return null;
  
  const section = getSection(sectionId);
  if (!section) return null;
  
  const module = section.modules?.find(m => m.id === moduleId);
  if (!module || !module.submodules) return null;
  
  const submodule = module.submodules.find(s => s.id === submoduleId);
  return submodule || null;
};

// Get all submodules for a specific module with enhanced data
export const getSubmodulesForModule = (moduleId: string): Submodule[] => {
  if (!moduleId || !courseData) return [];
  
  const module = getModuleById(moduleId);
  if (!module || !Array.isArray(module.submodules)) {
    console.warn(`No submodules found for module: ${moduleId}`);
    return [];
  }
  
  // Add a key property to each submodule for React rendering
  // and ensure thumbnail paths are properly set
  return module.submodules.map((submodule, index) => {
    // Convert duration from minutes to "MM:SS" format if it's a number
    let formattedDuration = submodule.duration.toString();
    if (typeof submodule.duration === 'number') {
      const minutes = Math.floor(submodule.duration);
      const seconds = Math.round((submodule.duration - minutes) * 60);
      formattedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
    
    // Get thumbnail for this submodule
    const thumbnailPath = submodule.thumbnail ? 
      getThumbnailPath(submodule.thumbnail) : 
      getSubmoduleThumbnail(submodule.id, moduleId);
    
    return {
      ...submodule,
      key: `${moduleId}-submodule-${submodule.id || index}`, // Unique key for React rendering
      formattedDuration, // Add formatted duration for display
      thumbnailUrl: thumbnailPath, // Add processed thumbnail URL
    };
  });
};

// Get content hierarchy for navigation and course viewer
export const getContentHierarchy = () => {
  const hierarchy: {
    categories: Array<{
      id: string;
      name: string;
      color: string;
      sections: Array<{
        id: string;
        name: string;
        number: number;
        modules: Array<{
          id: string;
          title: string;
          thumbnail: string;
          duration: number;
          submoduleCount: number;
          key: string; // Added key for React rendering
        }>;
      }>;
    }>;
  } = { categories: [] };
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach((category, catIndex) => {
      if (!category || typeof category !== 'object') return;
      
      const categoryData = {
        id: category.id || `category-${catIndex}`,
        name: category.name || `Category ${catIndex}`,
        color: category.color || '#000000',
        sections: [] as Array<{
          id: string;
          name: string;
          number: number;
          modules: Array<{
            id: string;
            title: string;
            thumbnail: string;
            duration: number;
            submoduleCount: number;
            key: string;
          }>;
        }>
      };
      
      if (Array.isArray(category.sections)) {
        category.sections.forEach((section, sectionIndex) => {
          if (!section || typeof section !== 'object') return;
          
          const sectionData = {
            id: section.id || `section-${sectionIndex}`,
            name: section.name || `Section ${sectionIndex}`,
            number: section.number || sectionIndex,
            modules: [] as Array<{
              id: string;
              title: string;
              thumbnail: string;
              duration: number;
              submoduleCount: number;
              key: string;
            }>
          };
          
          if (Array.isArray(section.modules)) {
            section.modules.forEach((module, moduleIndex) => {
              if (!module || typeof module !== 'object') return;
              
              sectionData.modules.push({
                id: module.id || `module-${moduleIndex}`,
                title: module.title || `Module ${moduleIndex}`,
                thumbnail: getThumbnailPath(module.thumbnail || ''),
                duration: typeof module.duration === 'number' ? module.duration : 0,
                submoduleCount: Array.isArray(module.submodules) ? module.submodules.length : 0,
                key: `${category.id}-${section.id}-${module.id || moduleIndex}` // Unique key for React
              });
            });
          }
          
          categoryData.sections.push(sectionData);
        });
      }
      
      hierarchy.categories.push(categoryData);
    });
  }
  
  return hierarchy;
};

// Filter modules by various criteria
export const filterModules = (filters: {
  difficulty?: number,
  instructor?: string,
  highValue?: boolean,
  featured?: boolean,
  track?: string
}): Module[] => {
  const allModules: Module[] = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              // Apply filters
              let matches = true;
              
              if (filters.featured !== undefined && module.featured !== filters.featured) {
                matches = false;
              }
              
              if (filters.track && (!Array.isArray(module.tracks) || !module.tracks.includes(filters.track))) {
                matches = false;
              }
              
              if (filters.instructor && 
                  (!Array.isArray(module.submodules) || 
                   !module.submodules.some(sub => sub.instructor === filters.instructor))) {
                matches = false;
              }
              
              if (filters.highValue && 
                  (!Array.isArray(module.submodules) || 
                   !module.submodules.some(sub => sub.highValue === true))) {
                matches = false;
              }
              
              if (filters.difficulty !== undefined && 
                  (!Array.isArray(module.submodules) || 
                   !module.submodules.some(sub => sub.difficulty === filters.difficulty))) {
                matches = false;
              }
              
              if (matches) {
                allModules.push(module);
              }
            });
          }
        });
      }
    });
  }
  
  return allModules;
};

// Search modules by text content
export const searchModules = (searchTerm: string): Module[] => {
  if (!searchTerm || typeof searchTerm !== 'string' || !courseData) return [];
  
  const term = searchTerm.toLowerCase().trim();
  const results: Module[] = [];
  
  if (Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              // Search in title, subtitle, and points
              if (
                module.title.toLowerCase().includes(term) ||
                module.subtitle.toLowerCase().includes(term) ||
                (Array.isArray(module.points) && module.points.some(point => 
                  typeof point === 'string' && point.toLowerCase().includes(term)
                )) ||
                (Array.isArray(module.submodules) && module.submodules.some(submodule => 
                  submodule.title.toLowerCase().includes(term) || 
                  submodule.subtitle.toLowerCase().includes(term)
                ))
              ) {
                results.push(module);
              }
            });
          }
        });
      }
    });
  }
  
  return results;
};

// Note: The original getThumbnailPath is declared above, this is just a comment
// to explain that the function has been enhanced with better error handling

// Get module title by ID with safety check
export const getModuleTitle = (moduleId: string): string => {
  const module = getModuleById(moduleId);
  return module ? module.title : 'Module';
};

// Get module thumbnail by ID with safety check
export const getModuleThumbnail = (moduleId: string): string => {
  const module = getModuleById(moduleId);
  return module && module.thumbnail ? module.thumbnail : 'default.webp';
};

// System information for ModuleHUD
interface SystemData {
  id: string;
  title: string;
  description: string;
  features: string[];
  subtitle?: string; // Short description for small block display
  emoji?: string; // Emoji for the system
  tagline?: string; // Tagline for the system
  hasCustomCode?: boolean;
  hasTemplates?: boolean;
  hasAutomation?: boolean;
  implementationTime?: string;
  complexityLevel?: string;
}

// Get system data for the Systems blocks in ModuleHUD
export const getSystemData = (systemId: string): SystemData | null => {
  // This data would ideally come from the course-data.json file
  // For now, we'll define it here but it could be moved to the JSON later
  const systemsData: SystemData[] = [
    {
      "id": "content-management-framework",
      "title": "Content Management Framework",
      "emoji": "💾",
      "tagline": "The Quantity and Quality Notion system",
      "description": "**Never stare at a blank content calendar again.** Our Notion-based command center lets a 3-person team have the power of 20, managing hundreds of videos monthly with military precision and creative freedom. Say goodbye to missed deadlines and chaotic workflows forever.",
      "features": [
        "Manage hundreds of scripts and videos a month",
        "Have a super slick team workflow",
        "With Custom Code",
        "Complete delegation and tracking solution"
      ],
      "hasCustomCode": true,
      "hasTemplates": true,
      "hasAutomation": true,
      "implementationTime": "medium",
      "complexityLevel": "moderate"
    },
    {
      "id": "production-automation-suite",
      "title": "Production Automation Suite",
      "emoji": "🏭",
      "tagline": "The Home-Delivered Engine Room",
      "description": "**Transform 8 hours of production work into 90 minutes flat.** Stop drowning in file management and tedious setup. This automation powerhouse connects your planning directly to production, automatically ingesting footage and laying out projects so you can focus exclusively on what humans do best—creating.",
      "features": [
        "Video Ingester app that speaks to notion scripts & camera log",
        "Premiere Pro extension that lays out footage",
        "Automated file management and organization",
        "Production pipeline acceleration tools"
      ],
      "hasCustomCode": true,
      "hasTemplates": true,
      "hasAutomation": true,
      "implementationTime": "medium",
      "complexityLevel": "moderate"
    },
    {
      "id": "video-editing-ecosystem",
      "title": "Video Editing Ecosystem",
      "emoji": "🖥️",
      "tagline": "The Viral Video OS",
      "description": "**Cut your editing time in half while doubling video quality.** Never waste hours on repetitive edits or struggle with amateur-looking content again. This complete editing arsenal gives you Hollywood-level production values with push-button simplicity, including AI-powered smart cutting that intuitively knows exactly where to make the perfect edit.",
      "features": [
        "Premiere Pro assets and templates library",
        "Time saving plugins for editors",
        "Presets, think less!",
        "Auto-cutter with semantic detection and 'flow' recognition"
      ],
      "hasCustomCode": true,
      "hasTemplates": true,
      "hasAutomation": true,
      "implementationTime": "short",
      "complexityLevel": "moderate"
    },
    {
      "id": "content-operations-protocol",
      "title": "Content Operations Protocol",
      "emoji": "📋",
      "tagline": "The exact day-to-day content review, delegation, and checking structure",
      "description": "**Never let another video fall through the cracks again.** Turn content chaos into a precision operation that runs like clockwork—even when you're not in the room. This bulletproof system ensures every piece of content meets your standards before hitting publish, with crystal-clear accountability that prevents the 'I thought someone else was handling that' syndrome forever.",
      "features": [
        "Comprehensive review and approval workflow",
        "Clear delegation framework with accountability",
        "Quality control checkpoints and metrics",
        "Team coordination and communication structure"
      ],
      "hasCustomCode": true,
      "hasTemplates": true,
      "hasAutomation": true,
      "implementationTime": "medium",
      "complexityLevel": "moderate"
    },
    {
      "id": "lifetime-updates",
      "title": "Lifetime Infrastructure Updates",
      "emoji": "🔄",
      "tagline": "Continuous Evolution, One-Time Investment",
      "description": "**Future-proof your content operation forever.** By joining the legacy cohort, you receive permanent access to all future updates of these infrastructure systems at no added cost. As we enhance and expand these tools based on evolving platforms and technologies, you'll automatically get every upgrade, refinement, and new feature without ever paying another penny.",
      "features": [
        "Permanent access to all infrastructure updates",
        "First access to new tools and features",
        "Grandfathered benefits for legacy members",
        "No additional costs for future versions"
      ],
      "hasCustomCode": true,
      "hasTemplates": true,
      "hasAutomation": true,
      "implementationTime": "ongoing",
      "complexityLevel": "variable"
    }
  ]
  
  return systemsData.find(system => system.id === systemId) || null;
};

// Export the system data mapping for consistent use across components
export const systemDataMap: Record<string, string> = {
  'notion': 'content-management-framework',
  'engine': 'production-automation-suite',
  'viral': 'video-editing-ecosystem'
};

// Export default object with all utils
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
  getCreators, // Add the new case study/creators function
  getModuleTitle, // Helper for modal
  getModuleThumbnail, // Helper for modal
  getSubmoduleThumbnail, // Helper for submodule thumbnails
  getSystemData, // System data for ModuleHUD
  systemDataMap, // Exported system data mapping
  mapSectionId // Add this line to export the mapSectionId function
};
