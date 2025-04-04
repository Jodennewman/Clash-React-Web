# Course Utilities Improvements

The current course-utils.tsx implementation is quite robust with good safety checks, but here are several improvements that could be made:

## 1. Improve Thumbnail Handling

```typescript
// Enhanced version of getThumbnailPath
export const getThumbnailPath = (thumbnailName: string): string => {
  // Handle null/undefined case
  if (!thumbnailName) {
    return '/assets/main/DataBaseThumbnails/renamed/default.webp'; // Fallback to a default image
  }
  
  // If the thumbnail already has a full path, return it
  if (thumbnailName.startsWith('/') || thumbnailName.startsWith('./') || thumbnailName.startsWith('http')) {
    return thumbnailName;
  }
  
  // Check if it already has an extension
  if (thumbnailName.endsWith('.webp') || thumbnailName.endsWith('.jpg') || 
      thumbnailName.endsWith('.png') || thumbnailName.endsWith('.jpeg')) {
    return `/assets/main/DataBaseThumbnails/renamed/${thumbnailName}`;
  }
  
  // Otherwise, add .webp extension
  return `/assets/main/DataBaseThumbnails/renamed/${thumbnailName}.webp`;
}
```

## 2. Dynamic Course Stats Instead of Hardcoded Values

Right now you have:

```typescript
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
```

But you've also defined a `calculateCourseStats()` function that's never used. Use the calculated stats instead:

```typescript
// Use calculated stats rather than hardcoded values
export const courseStats = calculateCourseStats();
```

## 3. Add Module Filtering and Sorting Functions

```typescript
// Filter modules by various criteria 
export const filterModules = (filters: {
  difficulty?: number,
  instructor?: string,
  highValue?: boolean,
  featured?: boolean
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
              
              if (filters.instructor && module.submodules?.some(sub => sub.instructor === filters.instructor) !== true) {
                matches = false;
              }
              
              if (filters.highValue && module.submodules?.some(sub => sub.highValue === true) !== true) {
                matches = false;
              }
              
              if (filters.difficulty && module.submodules?.some(sub => sub.difficulty === filters.difficulty) !== true) {
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

// Sort modules by criteria
export const sortModules = (modules: Module[], sortBy: 'popular' | 'duration' | 'title'): Module[] => {
  return [...modules].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.popular === true ? 1 : 0) - (a.popular === true ? 1 : 0);
      case 'duration':
        return (b.duration || 0) - (a.duration || 0);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });
};
```

## 4. Add Module Search Function

```typescript
// Search modules by text content
export const searchModules = (searchTerm: string): Module[] => {
  if (!searchTerm || typeof searchTerm !== 'string') return [];
  
  const term = searchTerm.toLowerCase().trim();
  const results: Module[] = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              // Search in title, subtitle, and points
              if (
                module.title.toLowerCase().includes(term) ||
                module.subtitle.toLowerCase().includes(term) ||
                module.points.some(point => point.toLowerCase().includes(term)) ||
                module.submodules?.some(submodule => 
                  submodule.title.toLowerCase().includes(term) || 
                  submodule.subtitle.toLowerCase().includes(term)
                )
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
```

## 5. Add Data Caching

For heavy operations that might be called multiple times:

```typescript
// Cache for expensive operations
const memoizeResults = new Map<string, any>();

// Example of a memoized function
export const getModulesByTrackMemoized = (trackName: string): Module[] => {
  const cacheKey = `track_${trackName}`;
  
  if (memoizeResults.has(cacheKey)) {
    return memoizeResults.get(cacheKey);
  }
  
  const result = getModulesByTrack(trackName);
  memoizeResults.set(cacheKey, result);
  return result;
};
```

## 6. Add Error Handling and Metrics

```typescript
// Error handling wrapper
export const safeOperation = <T>(operation: () => T, fallback: T): T => {
  try {
    return operation();
  } catch (error) {
    console.error('Course utils error:', error);
    return fallback;
  }
};

// Track usage metrics
let utilsCallCount = {
  getThumbnailPath: 0,
  getModuleById: 0,
  // other functions...
};

export const getUtilsMetrics = () => ({ ...utilsCallCount });

// Wrap a function to track usage
const trackUsage = <T>(fn: (...args: any[]) => T, name: string): ((...args: any[]) => T) => {
  return (...args: any[]) => {
    utilsCallCount[name as keyof typeof utilsCallCount] += 1;
    return fn(...args);
  };
};

// Example usage:
const trackedGetThumbnailPath = trackUsage(getThumbnailPath, 'getThumbnailPath');
```

## 7. Add Type Guards for Better Type Safety

```typescript
// Type guard for Module
export const isModule = (obj: any): obj is Module => {
  return obj && 
    typeof obj === 'object' && 
    typeof obj.id === 'string' && 
    typeof obj.title === 'string' &&
    typeof obj.thumbnail === 'string';
};

// Improved getModuleById with type guard
export const getModuleByIdSafe = (moduleId: string): Module | null => {
  const module = getModuleById(moduleId);
  return isModule(module) ? module : null;
};
```

## 8. Add Proper Module Path Construction

```typescript
// Get the full path to a module (category/section/module)
export const getModulePath = (moduleId: string): string | null => {
  if (!moduleId || !courseData) return null;
  
  for (const category of courseData.categories || []) {
    for (const section of category.sections || []) {
      for (const module of section.modules || []) {
        if (module && module.id === moduleId) {
          return `${category.id}/${section.id}/${module.id}`;
        }
      }
    }
  }
  
  return null;
};
```

These improvements would make the course utilities more robust, efficient, and feature-rich while maintaining the safety checks already in place.