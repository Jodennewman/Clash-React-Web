# Course Utils Refactoring Implementation Plan

## Overview
This plan outlines the steps to refactor the course utilities module to ensure:
- All data is dynamically calculated from actual course data
- Zero fallbacks or deprecated code
- Maximum performance with proper caching
- Retention of all current functionality including image mapping
- Clean, well-organized codebase with clear responsibilities

## Phase 1: Analysis & Preparation
- [x] Identify current functionality in course-utils.tsx
- [x] Map all dependencies and import relationships
- [x] Review image mapping functions and their usage
- [x] Document the current API that components expect
- [x] Determine the optimal file structure

## Phase 2: Create Optimized Implementation
1. [ ] Rename course-utils.tsx to course-utils.ts (remove .tsx extension if not needed)
2. [ ] Restructure the file with the following organization:
   - Import statements and types
   - Data initialization with proper typing
   - Memoization utilities and caches
   - Core data access functions
   - Image mapping functions
   - Complex calculations
   - API exports and default export

3. [ ] Implement efficient data processing:
   - Use Maps for O(1) lookups
   - Implement memoization for expensive calculations
   - Build efficient cache invalidation

4. [ ] Enhance courseStats implementation:
   - Replace hardcoded values with dynamic calculations
   - Implement all stats as getters that calculate from actual data:
     - totalModules: Count of all modules
     - totalHours: Duration calculated from module lengths
     - resources: Count of all resources across submodules
     - workshops: Count of workshop modules 
     - pdfs: Count of PDF resources
     - templates: Count of template resources
     - systems: Count of system modules

5. [ ] Ensure image mapping functions are optimized:
   - Preserve getThumbnailPath functionality
   - Maintain getAvatarPath with proper caching
   - Optimize getSubmoduleThumbnail
   - Keep getModuleThumbnail functionality

6. [ ] Ensure all functions work with proper error handling:
   - Add null checks throughout
   - Provide appropriate type assertions
   - Handle edge cases gracefully

## Phase 3: Testing & Validation
1. [ ] Test all exported functions with various inputs
2. [ ] Verify that all components using these utilities continue to work
3. [ ] Confirm that the ModuleHUD component renders correctly
4. [ ] Validate image mapping functionality
5. [ ] Check performance of memoized calculations
6. [ ] Ensure no console errors related to course utils

## Phase 4: Integration & Cleanup
1. [ ] Update any component imports if needed
2. [ ] Remove any deprecated or unused files/functions
3. [ ] Add comprehensive comments for future maintainers
4. [ ] Create final git commit with detailed message
5. [ ] Document the changes in implementation log

## Implementation Log
- Initial plan created: 2025-04-13
- Phase 1 completed: 2025-04-13 - Analysis & preparation
- Phase 2 started: 2025-04-13
  - Created a copy of course-utils.tsx as course-utils.ts
  - Implemented dynamic courseStats with getters for all properties
  - Removed fallback modules from getFounderModules
  - Removed fallback creators from getCreators
  - Updated getSectionDescription to remove hardcoded fallbacks
  - Renamed getTracksWithFallback to getTracks and eliminated fallbacks
  - Renamed getSectionsWithFallback to getAllSections with better comments
  - Clarified system section handling in getModulesForSection

## Current API Surface (Must Preserve)
The following functions and properties must be preserved to maintain compatibility:

### Core Data Access
- courseData: Course object
- courseStats: Statistics object with dynamic calculations
- tracks: Available tracks
- sections: Simplified sections for navigation
- featuredModules: List of featured modules

### Utility Functions
- getModulesForSection(sectionId, displayKey?): Get modules for a section
- getFounderModules(): Get modules targeted for founders
- getModulesByTrack(trackName): Get modules by track name
- getAllInstructors(): Get list of all instructors
- calculateTotalDuration(): Calculate total duration of all modules
- getModuleById(moduleId): Get a specific module by ID
- getCategories(): Get all categories
- getSection(sectionId, displayKey?): Get a section by ID
- getSubmodule(sectionId, moduleId, submoduleId): Get a specific submodule
- getSubmodulesForModule(moduleId): Get all submodules for a module
- getContentHierarchy(): Get content hierarchy for navigation
- filterModules(filters): Filter modules by criteria
- searchModules(searchTerm): Search modules by text content
- getCreators(): Get case study creators data
- getModuleTitle(moduleId): Get module title by ID
- mapSectionId(sectionId, displayKey?): Map UI section ID to data section ID

### Image Mapping Functions
- getThumbnailPath(thumbnailName): Get full path for a thumbnail
- getAvatarPath(avatarPath): Get avatar path properly
- getSubmoduleThumbnail(submoduleId, moduleId?): Get submodule thumbnail with caching
- getModuleThumbnail(moduleId): Get module thumbnail by ID

### System Data
- getSystemData(systemId): Get system data for ModuleHUD
- systemDataMap: Mapping for system data