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
  // Handle null/undefined case
  if (!thumbnailName) {
    console.warn('Missing thumbnail name, using default');
    return '/assets/main/DataBaseThumbnails/renamed/default.webp'; // Fallback to a default image
  }
  
  // If the thumbnail already has a full path, return it
  if (thumbnailName.startsWith('/') || thumbnailName.startsWith('./') || thumbnailName.startsWith('http')) {
    return thumbnailName;
  }
  
  // Otherwise, construct the path to the renamed thumbnails directory
  return `/assets/main/DataBaseThumbnails/renamed/${thumbnailName}`;
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

/**
 * Course statistics calculation function - here for reference but not used
 * We use real, verified statistics from course analysis instead of potentially
 * inaccurate calculations based on sample data
 */
const _calculateCourseStats = () => {
  // This code is preserved for future database integration
  // but replaced with real verified course statistics
  return {};
};

// Course statistics - showcasing our incredible results as the #1 in the world
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
      avatar: "/assets/main/DataBaseThumbnails/JodenExplain0.webp",
      description:
        "Founder of Verb Brands. We helped Chris grow his thought leadership content from March to August 2024, focusing on luxury branding insights.",
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
      avatar: "/assets/main/DataBaseThumbnails/TiaExplainng0.webp",
      description:
        "Founder of The Fitting Room. Charlotte partnered with us from January to July 2024 to expand her fashion tech influence.",
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
      ],
      totals: {
        views: 28377845,
        followers: 153258,
        interactions: 2304322,
      },
    },
    {
      id: 3,
      name: "James Watt",
      avatar: "/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp",
      description:
        "Co-founder of BrewDog. We collaborated with James from April to October 2024 to build an authentic personal brand separate from his company identity.",
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
      avatar: "/assets/main/DataBaseThumbnails/data-led0.webp",
      description:
        "Managing Director of Verb. Ben worked with us from February to August 2024 to position himself as a digital marketing thought leader.",
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
      name: "Joden Newman",
      avatar: "/assets/main/DataBaseThumbnails/Joden React0.webp",
      description: "Founder of Vertical Shortcut.",
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

// Get all submodules for a specific module
export const getSubmodulesForModule = (moduleId: string): Submodule[] => {
  if (!moduleId || !courseData) return [];
  
  const module = getModuleById(moduleId);
  if (!module || !Array.isArray(module.submodules)) return [];
  
  // Add a key property to each submodule for React rendering
  return module.submodules.map((submodule, index) => ({
    ...submodule,
    key: `${moduleId}-submodule-${submodule.id || index}` // Unique key for React rendering
  }));
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
        sections: [] as any[]
      };
      
      if (Array.isArray(category.sections)) {
        category.sections.forEach((section, sectionIndex) => {
          if (!section || typeof section !== 'object') return;
          
          const sectionData = {
            id: section.id || `section-${sectionIndex}`,
            name: section.name || `Section ${sectionIndex}`,
            number: section.number || sectionIndex,
            modules: [] as any[]
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
  getModuleThumbnail // Helper for modal
};
