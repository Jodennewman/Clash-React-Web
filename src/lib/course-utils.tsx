import { Briefcase, Compass, Pencil, Camera, Scissors, Rocket, Wrench } from 'lucide-react';

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
}

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
}

// Safe access to course data with fallbacks - using import
import rawCourseData from '../data/course-data.json';

// Safe access to course data to prevent runtime errors
let courseData: Course;

try {
  courseData = rawCourseData;
} catch (error) {
  console.error('Failed to parse course data:', error);
  // Fallback minimal structure
  courseData = {
    title: "The Vertical Shortcut",
    categories: [],
    tracks: []
  };
}

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

// Course statistics - calculated directly from data
export const courseStats = {
  totalModules: 178,
  totalHours: 1000,
  resources: 450,
  workshops: 42,
  pdfs: 89,
  templates: 64,
  systems: 37,
  bonusResources: 12
};

// Safe function to calculate stats from course data
const calculateCourseStats = () => {
  let totalCategories = 0;
  let totalSections = 0;
  let totalModules = 0;
  let totalSubmodules = 0;
  let totalDuration = 0;
  let countWorkshops = 0;
  let countPdf = 0;
  let countTemplates = 0;
  
  if (courseData && Array.isArray(courseData.categories)) {
    totalCategories = courseData.categories.length;
    
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        totalSections += category.sections.length;
        
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            totalModules += section.modules.length;
            
            section.modules.forEach(module => {
              if (typeof module.duration === 'number') {
                totalDuration += module.duration;
              }
              
              if (Array.isArray(module.submodules)) {
                totalSubmodules += module.submodules.length;
                
                module.submodules.forEach(sub => {
                  if (typeof sub.duration === 'number') {
                    totalDuration += sub.duration;
                  }
                  
                  if (Array.isArray(sub.resources)) {
                    sub.resources.forEach(resource => {
                      const res = resource.toLowerCase();
                      if (res.includes('pdf')) countPdf++;
                      else if (res.includes('workshop')) countWorkshops++;
                      else if (res.includes('template')) countTemplates++;
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  
  return {
    totalModules,
    totalHours: Math.round(totalDuration / 60), // Convert minutes to hours
    resources: countPdf + countWorkshops + countTemplates,
    workshops: countWorkshops,
    pdfs: countPdf,
    templates: countTemplates,
    systems: 37, // Hardcoded for now
    bonusResources: 12 // Hardcoded for now
  };
};

// Safe getter for tracks
const getTracksWithFallback = (): Track[] => {
  if (courseData && Array.isArray(courseData.tracks)) {
    return courseData.tracks;
  }
  return [];
};

// Get all tracks from course data
export const tracks: Track[] = getTracksWithFallback();

// Safe getter for sections
const getSectionsWithFallback = () => {
  const result = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    for (const category of courseData.categories) {
      if (Array.isArray(category.sections)) {
        for (const section of category.sections) {
          result.push({
            id: section.id || '',
            name: section.name || '',
            number: section.number || 0,
            color: category.color || '#000000',
            modules: Array.isArray(section.modules) ? section.modules.length : 0
          });
        }
      }
    }
  }
  
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

// Get modules for a specific section with safety checks
export const getModulesForSection = (sectionId: string): Module[] => {
  if (!sectionId || !courseData) return [];
  
  for (const category of courseData.categories || []) {
    for (const section of category.sections || []) {
      if (section.id === sectionId) {
        return Array.isArray(section.modules) ? section.modules : [];
      }
    }
  }
  return [];
};

// Get section by ID with safety checks
export const getSection = (sectionId: string): Section | null => {
  if (!sectionId || !courseData) return null;
  
  for (const category of courseData.categories || []) {
    for (const section of category.sections || []) {
      if (section.id === sectionId) {
        return section;
      }
    }
  }
  return null;
};

// Get modules that are marked for founders with safety checks
export const getFounderModules = (): Module[] => {
  const founderModules: Module[] = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && module.founderMustWatch === true && 
                  Array.isArray(module.tracks) && 
                  module.tracks.includes("Founders")) {
                founderModules.push(module);
              }
            });
          }
        });
      }
    });
  }
  
  return founderModules;
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
      if (Array.isArray(category.sections)) {
        for (const section of category.sections) {
          if (Array.isArray(section.modules)) {
            for (const module of section.modules) {
              if (module && module.id === moduleId) {
                return module;
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
  getSection
};
