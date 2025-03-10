# Vertical Shortcut Course Data Architecture

This document explains the data architecture and integration approach for the Vertical Shortcut course platform.

## Overview

We've implemented a "single source of truth" approach for course data with two main components:

1. **Full Course Data**: A comprehensive TypeScript module (`courseData.ts`) that contains all course information structured in a hierarchical format.

2. **Course Utils**: A lighter utility module (`course-utils.ts`) that provides simplified data access patterns and helper functions for components.

## File Structure

```
src/
├── data/
│   └── courseData.ts       # Complete course data with all modules, sections, etc.
├── lib/
│   └── course-utils.ts      # Utility functions and simplified data access
├── components/
│   └── sections/
│       ├── module-breakdown-simplified.tsx   # Example component using courseUtils
│       ├── featured-modules.tsx               # Featured modules component
│       ├── course-stats.tsx                   # Course statistics component
│       ├── founder-track.tsx                  # Founder-specific track component
│       └── faq-updated.tsx                   # FAQ component using course data
└── VerticalShortcutLanding-Integration.tsx   # Integration example
```

## Key Components

### 1. Course Data Structure

The `courseData.ts` file contains a complete hierarchical structure:

- **Course**: Top-level container
  - **Categories**: Major course groupings (Theory, Production, Business Growth)
    - **Sections**: Sub-groupings within categories (Theory Basics, Theory Advanced)
      - **Modules**: Individual learning units
        - **Submodules**: Individual lessons within modules

The file also includes TypeScript interfaces for all data structures.

### 2. Course Utils

The `course-utils.ts` file provides simplified access to common data needs:

- **Track information**: Colors, icons, and descriptions
- **Featured modules**: Pre-filtered list of featured modules
- **Section data**: Section names, colors, and module counts
- **Helper functions**: 
  - `getModulesForSection(sectionId)`: Get modules for a specific section
  - `getModulesByTrack(trackName)`: Get modules for a specific track
  - `getSectionDescription(sectionId)`: Get descriptive text for a section
  - `getTrackIcon(iconName)`: Get the appropriate icon component for a track

### 3. UI Components

Example components that use the course data:

- **ModuleBreakdown**: Interactive section explorer showing modules by section
- **FeaturedModules**: Showcases featured/most popular modules
- **CourseStats**: Animated statistics display with course metrics
- **FounderTrack**: Specialized component for the Founders track
- **FAQ**: Dynamic FAQ with course data references

## Implementation Guide

### 1. Using Course Data in a Component

```typescript
import courseUtils from "../../utils/course-utils";

const MyComponent = () => {
  // Access course stats
  const totalModules = courseUtils.courseStats.totalModules;
  
  // Access sections
  const sections = courseUtils.sections;
  
  // Get modules for a specific section
  const theoryModules = courseUtils.getModulesForSection('theory_basics');
  
  // Get modules filtered by track
  const founderModules = courseUtils.getModulesByTrack('Founders');
  
  // ... component implementation ...
}
```

### 2. Rendering Dynamic Content

```tsx
<div>
  <h2>Featured Modules</h2>
  <div className="grid">
    {courseUtils.featuredModules.map((module, idx) => (
      <div key={idx}>
        <h3>{module.title}</h3>
        <p>{module.subtitle}</p>
        {/* Additional module properties */}
      </div>  
    ))}
  </div>
</div>
```

### 3. Dynamic References

You can reference specific modules, tracks, or metrics throughout your site:

```tsx
<p>
  Our most popular module is "{courseUtils.featuredModules[0].title}" 
  with over {courseUtils.courseStats.totalHours} hours of content 
  across {courseUtils.courseStats.totalModules} modules.
</p>
```

## Extending the System

### Adding New Modules

To add new modules, update the `courseData.ts` file with the new module information following the existing structure. The utility functions will automatically pick up the new data.

### Adding New Components

To create a new component that uses course data:

1. Import the courseUtils: `import courseUtils from "../../utils/courseUtils";`
2. Use the appropriate utility functions and data structures
3. Reference specific course elements as needed

## Best Practices

1. **Use utility functions over direct data access** when possible
2. **Keep UI components focused** on display logic, not data transformation
3. **Use TypeScript typing** to ensure data integrity
4. **Reference consistent statistics** across the site
5. **Update courseData.ts** when making curriculum changes, not individual components

This approach ensures that all components consistently represent course information, and updating the curriculum only requires changes to the central data files.
