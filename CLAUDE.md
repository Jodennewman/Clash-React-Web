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
- **Layout** For layout use Tailwind v4 inline styles, be wary of components that modify text – it may be better to use <div> than <p> for body copy if the style seems in appropriate.
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
Optimising the website and all of it's components for mobile deployment WITHOUT affecting functionality of any of the core website – and making sure new implementations fit with and do not ruin mobile optimisation.
This should be done through inline tailwind styles first, then, if necessary, through a seperate 'mobile delivery' CSS breakpoint.
And finally, the nuclear option, developing seperate components that display after certain breakpoint conditions are met.

Any other implementation plans that may make more sense must be cleared for permission and then added to this lsit only AFTER proven effective.

Guidance for this provided here: MOBILE_OPTIMIZATION_PLAN.md

## Other Priorities
Component refactoring to match copy in Website-Copy-Guidance.md and ensure all components use course-utils.tsx for data and image mapping for images.

Making sure the landing page ALWAYS loads in from the top, currently it loads in and automatically scrolls down slightly – this cannot happen.
