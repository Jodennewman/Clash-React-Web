# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- `npm run dev`: Start development server (port 5173, 5174, or 5175)
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run typecheck`: Run TypeScript type checking
- `npm run lint`: Run ESLint checks
- `npm run format`: Format code with Prettier
- `npm test`: Run Vitest tests
- `npm test -- src/components/path/to/Component.test.tsx`: Run a single test file

## Code Style Guidelines
- **Imports**: Group imports by type (React, libraries, components, styles)
- **Naming**: Use PascalCase for components, camelCase for variables/functions
- **Formatting**: Project uses Prettier with 2-space indentation
- **Types**: Always use proper TypeScript types, avoid `any`
- **Theme Styling**: Always use theme-aware utility classes and variables (never raw colors) unless explicity told to do so.
- **CSS**: Use theme utility classes like `text-theme-primary`, `bg-theme-gradient`
- **Layout** For layout use Tailwind v4 inline styles, be wary of components that modify text – it may be better to use <div> than <p> for body copy if the style seems in appropriate.
- **Components**: Follow theme-aware design principles for all components

## Required Git Workflow

### Commit ALL Changes
- ALWAYS use `git add .` to stage ALL modified files
- NEVER selectively commit only some changes
- Files modified together should be committed together
- commit to a branch called 0415, and push to a remote with the same name

### Commit Procedure
1. Run `git status` to check modified files
2. Add ALL changes: `git add .`
3. Verify all changes are staged: `git status`
4. Commit with prefix and description:
   - [one word name of main task]: `git commit -m "Solo: [description]"`

### Commit Frequency
- After each significant component change
- At least once per hour of work
- Immediately after fixing bugs

For detailed styling guidance, refer to VS-THEMES-REFERENCE.md for all brand utility classes and guidance.

## "VS Bubbly" Animation Style
- Animations should be 20% more pronounced than typical corporate sites
- Use cubic-bezier(0.34, 1.56, 0.64, 1) for springy hover effects
- Combine transform properties (translateY + scale) for richer interactions
- Example hover: `hover:translate-y-[-4px] hover:scale-[1.02]`
- ALWAYS use useGSAP and gsap.context for proper lifecycle management
- ALWAYS use theme-aware animation variables:

```jsx
// Theme-aware animations
useGSAP(() => {
  const styles = getComputedStyle(document.documentElement);
  const distance = styles.getPropertyValue('--theme-anim-distance');
  
  const ctx = gsap.context(() => {
    gsap.to(".element", { y: distance });
  }, containerRef);
  
  return () => ctx.revert();
}, []);
```

an exaustive list of useable styles can be found in the VS

### Professional GSAP Implementation

All complex animations MUST use `useGSAP` and `gsap.context` for proper lifecycle management:

```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AnimatedComponent() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Create context for proper cleanup
    const ctx = gsap.context(() => {
      // Animations here
      gsap.to(".element", {
        y: -10,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      });
    }, containerRef); // Scope to container
    
    return () => ctx.revert(); // Proper cleanup
  }, []);
  
  return (
    <div ref={containerRef}>
      <div className="element">Animated element</div>
    </div>
  );
}
```

## Most Important Rule
After stating your plan, NEVER deviate from it without permission. It's better to do nothing than to implement something contrary to your stated plan.

##Top Priority
Optimising the website and all of it's components for mobile deployment WITHOUT affecting functionality of any of the core website – and making sure new implementations fit with and do not ruin mobile optimisation.
This should be done through inline tailwind styles first, then, if necessary, through a seperate 'mobile delivery' CSS breakpoint.
And finally, the nuclear option, developing seperate components that display after certain breakpoint conditions are met.

Any other implementation plans that may make more sense must be cleared for permission and then added to this lsit only AFTER proven effective.

Guidance for this provided here: MOBILE_OPTIMIZATION_PLAN.md

## Other Priorities
Component refactoring to match copy in Website-Copy-Guidance.md and ensure all components use course-utils.tsx for data and image mapping for images.

Making sure the landing page ALWAYS loads in from the top, currently it loads in and automatically scrolls down slightly – this cannot happen.

# Next.js Migration Project - Team Coordination

## Project Overview

We're migrating this project from Vite to Next.js. The migration has been divided into two parallel workstreams to maximize efficiency while preventing conflicts. Some foundation work has already been completed:

- Updated package.json (removed Vitest, updated project name)
- Created basic Next.js project structure (app directory)
- Created root layout.tsx with metadata 
- Created page.tsx with client component wrapper
- Updated tsconfig.json for Next.js
- Created next.config.js
- Updated vercel.json

## Team Structure

The remaining migration work is split between two models:

### Model A: Structure & Organization
- Static files management (moving to /public)
- API routes conversion
- Vite cleanup
- Environment configuration
- Directory structure setup
- Deployment configuration

### Model B: Components & Routing
- GSAP initialization component
- Image utilities for Next.js
- Page components creation
- Navigation updates
- GSAP animation fixes
- Image component optimization
- Client-side code fixes

## Important Rules

1. **Stay in your lane**: Only work on tasks assigned to your model
2. **Do not modify files** that the other model is responsible for
3. **Document any issues** or conflicts you encounter
4. **Ask for clarification** if you're unsure about a task or file ownership
5. **Check in regularly** with progress updates

## Getting Started

Please identify which model you are (A or B):

If you're **Model A**:
- Review MIGRATION_PLAN_MODEL_A.md for detailed task instructions
- Start with moving static files to /public
- Focus on infrastructure and server-side aspects

If you're **Model B**:
- Review MIGRATION_PLAN_MODEL_B.md for detailed task instructions
- Start with creating the GSAP initialization component
- Focus on client components and routing

## Key Files to Check

For **Model A**:
- vite.config.ts (to understand what needs to be removed)
- src/api/* (to understand API routes to convert)
- .env (to understand environment variables to migrate)
- vercel.json (already updated, but may need further changes)

For **Model B**:
- src/router.tsx (to understand routes to convert)
- src components using GSAP (to update animations)
- src components using images (to convert to Next.js Image)
- components with client-side code (to add 'use client' directives)

## Coordination

For a full overview of the migration strategy, please review:
- MIGRATION_SUMMARY.md (overview of the parallel approach)
- NEXT_MIGRATION_PLAN_DETAILED.md (comprehensive migration plan)

Are you Model A or Model B? Please confirm so I can provide more specific guidance.
