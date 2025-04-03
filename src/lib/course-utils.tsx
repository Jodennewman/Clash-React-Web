import { Briefcase, Compass, Pencil, Camera, Scissors, Rocket, Wrench } from 'lucide-react';
import courseData from '../data/course-data.json';

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

// Access the course data from JSON
const typedCourseData = courseData as Course;

// Course statistics for presentations - now from JSON
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

// Get all tracks from course data
export const tracks: Track[] = typedCourseData.tracks;

// Get simplified sections for navigation
export const sections = typedCourseData.categories.flatMap(category => 
  category.sections.map(section => ({
    id: section.id,
    name: section.name,
    number: section.number,
    color: category.color,
    modules: section.modules.length
  }))
);

// Get all featured modules across all sections
export const getFeaturedModules = (): Module[] => {
  const featuredModules: Module[] = [];
  
  typedCourseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        if (module.featured) {
          featuredModules.push(module);
        }
      });
    });
  });
  
  return featuredModules;
};

export const featuredModules = getFeaturedModules();

// Get modules for a specific section
export const getModulesForSection = (sectionId: string): Module[] => {
  for (const category of typedCourseData.categories) {
    for (const section of category.sections) {
      if (section.id === sectionId) {
        return section.modules;
      }
    }
  }
  return [];
};

// Get section by ID
export const getSection = (sectionId: string): Section | null => {
  for (const category of typedCourseData.categories) {
    for (const section of category.sections) {
      if (section.id === sectionId) {
        return section;
      }
    }
  }
  return null;
};

// Get modules that are marked for founders
export const getFounderModules = (): Module[] => {
  const founderModules: Module[] = [];
  
  typedCourseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        if (module.founderMustWatch && module.tracks.includes("Founders")) {
          founderModules.push(module);
        }
      });
    });
  });
  
  return founderModules;
};

// Get modules by track name
export const getModulesByTrack = (trackName: string): Module[] => {
  const modulesByTrack: Module[] = [];
  
  typedCourseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        if (module.tracks.includes(trackName)) {
          modulesByTrack.push(module);
        }
      });
    });
  });
  
  return modulesByTrack;
};

// Get all unique instructors from submodules
export const getAllInstructors = (): string[] => {
  const instructors = new Set<string>();
  
  typedCourseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        module.submodules.forEach(submodule => {
          instructors.add(submodule.instructor);
        });
      });
    });
  });
  
  return Array.from(instructors);
};

// Calculate total duration of all modules
export const calculateTotalDuration = (): number => {
  let totalMinutes = 0;
  
  typedCourseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        totalMinutes += module.duration;
      });
    });
  });
  
  return totalMinutes;
};

// Section descriptions for ModuleBreakdown
export const getSectionDescription = (sectionId: string): string => {
  // Try to find the section in the data
  const section = getSection(sectionId);
  if (section && section.modules.length > 0) {
    // Use first module's subtitle as fallback description
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

// Get a specific module by ID
export const getModuleById = (moduleId: string): Module | null => {
  for (const category of typedCourseData.categories) {
    for (const section of category.sections) {
      for (const module of section.modules) {
        if (module.id === moduleId) {
          return module;
        }
      }
    }
  }
  return null;
};

// Get all categories
export const getCategories = (): Category[] => {
  return typedCourseData.categories;
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
