# CLAUDE.md

This file guides Claude Code when working with this repository. Follow these instructions PRECISELY.

## Initial Requirements

- Before providing advice or making changes, state: "I have read and will fully comply with CLAUDE.md."
- First question: "Am I working in Solo Mode or Team Mode (if Team Mode, which team A or B)?"
- Based on response, work ONLY on components assigned to your mode/team

## Mandatory Reading Sequence
1. Read this CLAUDE.md completely
2. Read `src/app/globals.css` completely 
3. Read `VS_STYLING_GUIDE.md` completely
4. Read `VS_COLOR_IMPLEMENTATION.md` completely
5. Read `THEME_SYSTEM.md` completely
6. Read `THEME_IMPLEMENTATION_SUMMARY.md` completely
7. Read `MODULE–HUD.md` completely - Essential for Module HUD component work
8. If in Team Mode, read `TEAM_STRUCTURE.md` completely

## ⚠️⚠️⚠️ CRITICAL: PROJECT DOCUMENTATION ⚠️⚠️⚠️

### Essential Documentation Files

**Theme System:**
1. **VS_COLOR_IMPLEMENTATION.md** - Complete color implementation strategy
2. **THEME_SYSTEM.md** - Quick reference guide for using the theme system
3. **THEME_IMPLEMENTATION_SUMMARY.md** - Implementation plan and next steps

**Style Guides:**
4. **VS_STYLING_GUIDE.md** - Core design system and styling standards
5. **TAILWIND-V4-DOCS.txt** - Reference for Tailwind v4 specifics

**Component Specifications:**
6. **MODULE–HUD.md** - Complete specifications for the Module HUD component implementation

**Team Organization:**
7. **TEAM_STRUCTURE.md** - Team assignments and top-down/bottom-up approach
8. **SOLO_MODE.md** - Guidelines for solo development

**Quick Reference:**
9. **QUICK_COMMANDS.md** - Essential development commands

Refer to these files for comprehensive guidance on implementation standards and team coordination.

## ⚠️⚠️⚠️ CRITICAL: NEW THEME-AWARE CSS APPROACH ⚠️⚠️⚠️

We have implemented a new theme-aware approach that significantly changes how styles are written. This section outlines the new approach and provides clear examples of correct and incorrect implementations.

### The Core Principle: Single Source of Truth

The theme-aware approach uses single CSS variables that automatically change value based on the current theme. This eliminates competing styles and simplifies maintenance.

### IMPORTANT: UTILITY CLASSES ARE NOW REQUIRED

**⚠️ MAJOR UPDATE:** Moving forward, ALL styling should use theme utility classes defined in globals.css instead of direct CSS variable references. This ensures consistent styling that works correctly with light and dark themes.

### TEXT COLORS - THEME-AWARE APPROACH

**❌ OUTDATED APPROACHES (DO NOT USE):**
```jsx
<p className="bg-[var(--secondary-teal)] dark:bg-[var(--secondary-teal-light)]">Competing variables cause conflicts</p>
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't update in dark mode without logic</div>
<div className="text-[var(--text-navy)]">Using outdated var() syntax</div>
<div className="text-[var(--theme-text-primary)]">Even using theme variables directly is discouraged</div>
```

**✅ CORRECT APPROACH - THEME UTILITY CLASSES ONLY:**
```jsx
<!-- ONLY APPROVED APPROACH: Theme utility classes from globals.css -->
<p className="bg-theme-accent-secondary">Using theme utility class</p>
<h2 className="text-theme-primary">Text uses theme utility class</h2>
<div className="bg-theme-gradient">Background uses theme gradient class</div>
<div className="shadow-theme-md">Uses theme shadow class</div>

<!-- DISCOURAGED: Direct variable references, even with theme variables -->
<p className="bg-[var(--theme-accent-secondary)]">Avoid direct variable references</p>
<h2 className="text-[var(--theme-text-primary)]">Use utility classes instead</h2>

<!-- Only for components outside theme context -->
<div style={{ 
  backgroundColor: isDarkTheme ? 'var(--bg-navy)' : 'var(--bg-cream)' 
}}>Only use conditionals when absolutely necessary</div>
```

### TAILWIND GRADIENT IMPLEMENTATIONS

**❌ PROBLEMATIC TAILWIND GRADIENT APPROACHES:**
```jsx
<!-- DO NOT use Tailwind's from/to syntax with dark mode variants -->
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 
                dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
  This creates competing styles
</div>

<!-- DO NOT use inline gradient styles without theme awareness -->
<div style={{ background: 'linear-gradient(to bottom right, white, var(--bg-cream))' }}>
  This won't update in dark mode
</div>
```

**✅ CORRECT TAILWIND GRADIENT APPROACHES:**
```jsx
<!-- PREFERRED: Use theme-aware utility classes -->
<div className="bg-theme-gradient">
  This gradient automatically updates with theme changes
</div>

<div className="bg-theme-gradient-primary">
  This accent gradient updates with theme changes
</div>

<!-- ACCEPTABLE: For complex gradients, use theme-aware variables -->
<div className="bg-gradient-to-br from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]">
  Complex gradients using theme-aware variables
</div>

<!-- ACCEPTABLE: For advanced cases with JS, use conditional styles -->
<div style={{ 
  background: isDarkTheme 
    ? 'linear-gradient(to bottom right, var(--bg-navy), var(--bg-navy-darker))' 
    : 'linear-gradient(to bottom right, white, var(--bg-cream))'
}}>
  JS-enhanced conditional gradients
</div>
```

### THEME-AWARE IMPLEMENTATION FOR ALL PROPERTIES

**❌ PROBLEMATIC DUAL-MODE APPROACH:**
```jsx
<div className="text-[--text-navy] dark:text-white">Using competing color styles</div>
<div className="shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
  Competing shadow styles
</div>
<div className="border-[--primary-orange] dark:border-[--primary-orange-light]">
  Competing border styles
</div>
```

**✅ THEME-AWARE IMPLEMENTATION:**
```jsx
<!-- Option 1: Theme utility classes (PREFERRED) -->
<div className="text-theme-primary">Text uses theme utility class</div>
<div className="shadow-theme-md">Shadow uses theme utility class</div>
<div className="border border-theme-primary">Border uses theme utility class</div>

<!-- Option 2: Theme-aware variables -->
<div className="text-[var(--theme-text-primary)]">Text color automatically changes with theme</div>
<div className="shadow-[var(--theme-shadow-md)]">Shadow automatically changes with theme</div>
<div className="border border-[var(--theme-primary)]">Border color automatically changes with theme</div>
```

## Complete Visual Design for BOTH Modes

### Light Mode Vision
- **NO PLAIN WHITE** - Always use subtle gradients instead of flat white
- **Subtle Shadows** - Low opacity (0.05-0.1), a few pixels down and to the left
- **Background Textures** - Use dot or grid patterns with very low opacity
- **Floating Elements** - Add subtle, non-distracting squares with high border-radius
- **Color Palette** - Warm creams, oranges with teal accents
- **Subtle Motion** - Gentle animations that enhance without distracting

### Dark Mode Vision
- **Rich Gradients** - Deep navy gradients, never flat dark colors
- **Elevated Glow Effects** - Soft glows with accent colors (0.15-0.2 opacity)
- **Enhanced Depth** - More pronounced shadows and gradients
- **Floating Elements** - Same elements but with dark mode styling and subtle glow
- **Color Accent Shifts** - Slightly brighter and more vibrant accent colors
- **Enhanced Animation** - Slightly more pronounced animation effects

### Floating Elements Implementation (Theme-Aware)
```jsx
<div className="relative">
  {/* Theme-aware floating element that works in both modes */}
  <div className="absolute -z-10 w-20 h-20 rounded-[40%] rotate-12 
                opacity-[var(--theme-float-opacity)] 
                bg-[var(--theme-float-bg-primary)]
                animate-float-slow"></div>
  
  <div className="relative z-10">
    Actual content here
  </div>
</div>
```

### Professional Animation Implementation
All animations MUST use `useGSAP` and `gsap.context` for proper cleanup and performance:

```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AnimatedComponent() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const distance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const duration = styles.getPropertyValue('--theme-anim-duration') || '0.35s';
    
    const ctx = gsap.context(() => {
      // Animations using theme variables
      gsap.to(".element", {
        y: distance,
        opacity: 1,
        duration: parseFloat(duration),
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

## Critical Do's and Don'ts - ⚠️⚠️⚠️ THEME-AWARE STYLING ⚠️⚠️⚠️

### DO NOT:
- ❌ NEVER use competing light/dark mode styles that target the same property
- ❌ NEVER use raw Tailwind color classes without theme awareness (e.g., `text-white`, `bg-black`)
- ❌ NEVER use standard Tailwind gradients (`from-color to-color`) - use theme-aware gradients
- ❌ NEVER use plain white backgrounds - ALWAYS use theme-aware gradients
- ❌ NEVER create animations without theme-aware variables and proper cleanup
- ❌ NEVER change grid layouts (grid-cols-*) under any circumstances
- ❌ NEVER use inline styles that don't adapt to theme changes

### DO:
- ✅ ALWAYS use theme utility classes when available: `text-theme-primary`, `bg-theme-accent`
- ✅ ALWAYS use theme-aware gradient classes: `bg-theme-gradient`, `bg-theme-gradient-primary`
- ✅ ALWAYS use theme-aware shadow classes: `shadow-theme-sm`, `shadow-theme-md`, `shadow-theme-lg`
- ✅ ALWAYS use theme-aware variables for animation values in GSAP
- ✅ ALWAYS verify components in both light and dark modes before committing
- ✅ ALWAYS add subtle floating elements using theme-aware opacity and colors
- ✅ ALWAYS create a written plan and get approval before proceeding

## Theme-Aware CSS Structure

Our CSS variables use Tailwind v4's `@custom-variant` and `@variant` system:
```css
/* Define dark mode variant */
@custom-variant dark (&:where(.dark, .dark *));

/* Root variables in light mode */
:root {
  /* Core CSS variables here */
  --primary-orange: oklch(75% 0.13 57);
  --text-navy: oklch(30% 0.03 230);
  
  /* Theme-aware variables - single source of truth */
  --theme-text-primary: var(--text-navy);
  --theme-bg-primary: var(--bg-cream);
  /* etc... */
}

/* Dark mode overrides using variant */
@variant(dark) {
  :root {
    /* Dark mode values */
    --primary-orange: oklch(80% 0.14 57);
    --text-navy: oklch(96% 0.01 90);
    
    /* Theme-aware variables automatically update */
    --theme-text-primary: white;
    --theme-bg-primary: var(--bg-navy);
    /* etc... */
  }
}
```

## Handling Tailwind Gradient Syntax

When you encounter Tailwind gradient syntax like this:

```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 
             dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
  Competing gradient styles
</div>
```

ALWAYS convert it to one of these theme-aware approaches:

```jsx
<!-- PREFERRED: Use the theme gradient utility class -->
<div className="bg-theme-gradient">
  Theme-aware gradient
</div>

<!-- ALTERNATIVE: Use theme-aware variables with Tailwind syntax -->
<div className="bg-gradient-to-br from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]">
  Theme-aware gradient with Tailwind syntax
</div>
```

The theme gradient utility classes are defined in globals.css:

```css
.bg-theme-gradient {
  background: linear-gradient(to bottom right, var(--theme-gradient-start), var(--theme-gradient-end));
}

.bg-theme-gradient-primary {
  background: linear-gradient(to right, var(--theme-primary-gradient-start), var(--theme-primary-gradient-end));
}
```

## Component Example with Theme-Aware Implementation

```jsx
function ExampleCard() {
  return (
    <div className="relative overflow-hidden">
      {/* Theme-aware floating element */}
      <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 
                    opacity-[var(--theme-float-opacity)]
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow"></div>
                    
      {/* Card with theme-aware styling */}
      <div className="relative z-10 
                    bg-theme-gradient
                    rounded-lg p-6 
                    shadow-theme-md
                    transition-all duration-300
                    hover-bubbly">
        {/* Content */}
        <h3 className="text-theme-primary text-xl mb-2">
          Card Title
        </h3>
        
        <p className="text-theme-secondary mb-4">
          This card uses theme-aware variables for consistent styling in any theme.
        </p>
        
        <button className="bg-theme-gradient-primary text-white px-4 py-2 rounded-full shadow-theme-sm hover-bubbly-sm">
          Learn More
        </button>
      </div>
    </div>
  )
}
```

## Required Git Workflow

### Commit ALL Changes
– COMMIT TO A BRANCH CALLED "team-section" ONLY and ALWAYS
- ALWAYS use `git add .` to stage ALL modified files
- NEVER selectively commit only some changes
- Files modified together should be committed together

### Commit Procedure
1. Run `git status` to check modified files
2. Add ALL changes: `git add .`
3. Verify all changes are staged: `git status`
4. Commit with prefix and description:
   - Solo Mode: `git commit -m "Solo: [description]"`
   - Team A: `git commit -m "A: [description]"`
   - Team B: `git commit -m "B: [description]"`
   - Team Section: `git commit -m "TeamSection: [description]"`

### Commit Frequency
- After each significant component change
- At least once per hour of work
- Immediately after fixing bugs

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

## Development Commands
- Don't bother with npm run dev – it will just freeze code, try typechecking and npm run build to check if implementation is likely working
- Use `npm run build` for building
- Use `npm run typecheck` for testing components

## Most Important Rule
After stating your plan, NEVER deviate from it without permission. It's better to do nothing than to implement something contrary to your stated plan.

## Stacked Full-Screen Team Section Design

The TeamSection has been implemented with the following z-stacked layout:

1. **Layout Structure:**
   - Four full-screen sections stacked on top of each other in z-space (z-index)
   - Each section represents one team member and occupies the full viewport
   - Sections are arranged in layers with visual indicators for hover areas

2. **Window Effect:**
   - Each section is clipped using CSS clip-path to show only 25% of its width
   - This creates the effect of looking through four vertical "windows" into each section
   - The clipping is positioned so each team member's section is visible through its respective window
   - The full content exists in each layer but is mostly cropped/hidden initially

3. **Hover Behavior:**
   - When hovering over a section's visible portion, the clip-path is removed
   - The hovered section becomes fully visible and moves to the top z-index
   - Other sections remain in their clipped state but are still partially visible
   - Moving away from any section returns all sections to their equal 25% width view

4. **Visual Implementation:**
   - Each section has a slightly different gradient background for visual distinction
   - Content is centered within each full section
   - Z-index management ensures the active section is always on top
   - Visual guide overlays help indicate the hover targets

### Technical Details

1. **Clip-Path Implementation**
   ```javascript
   const getClipPath = () => {
     // Calculate 25% wide section for each member
     const startPercent = (index * 25);
     const endPercent = startPercent + 25;
     
     if (isActive) {
       // When active, remove clipping entirely
       return 'none';
     } else {
       // When inactive, clip to show only a 25% vertical slice
       return `inset(0 ${100 - endPercent}% 0 ${startPercent}%)`;
     }
   };
   ```

2. **Section Positioning**
   ```jsx
   <div 
     className="absolute inset-0 transition-all duration-500 ease-in-out"
     style={{ 
       clipPath: getClipPath(),
       zIndex: isActive ? 20 : 10 - index
     }}
     onMouseEnter={onMouseEnter}
     onMouseLeave={onMouseLeave}
   >
     {/* Full content section */}
     <div className="w-full h-full">
       {/* Content centered inside full section */}
     </div>
   </div>
   ```

### Implementation Checklist

1. **Initial Setup**
   - [x] Delete the current TeamSection.tsx
   - [x] Update import in VerticalShortcutLanding.tsx
   - [x] Create new implementation with full-screen z-stacked sections
   
2. **Z-Stacked Layout**
   - [x] Create full-screen sections for each team member
   - [x] Position sections in z-space with proper z-index management
   - [x] Implement clip-path for the window-like cropping effect
   - [x] Add visual indicators for hover targets
   
3. **Content Layout**
   - [x] Create full team member layouts that look good in both cropped and full views
   - [x] Add proper content hierarchy with name, title, images, bio, etc.
   - [x] Ensure content is centered and well-positioned in both states
   
4. **Interactive Behavior**
   - [x] Implement state management for tracking active section
   - [x] Create smooth transitions for clip-path changes
   - [x] Ensure proper z-index handling for active/inactive states
   - [x] Add hover guides to indicate interactive areas
   
5. **Theme-Aware Styling**
   - [x] Use theme-aware gradients for section backgrounds
   - [x] Use shadow-theme-* utility classes for all shadows
   - [x] Ensure all text uses text-theme-* utility classes
   - [x] Add theme-aware borders and visual details

6. **Responsive Design**
   - [x] Maintain z-stacked layout on desktop and tablet
   - [x] Create alternate card-based layout for mobile
   - [x] Ensure smooth transitions on all device sizes

7. **Visual Polish**
   - [x] Add distinct background gradients for each section
   - [x] Implement proper shadows and borders
   - [x] Create smooth transitions for all interactive elements
   - [x] Verify visual consistency in both light and dark themes

## ModuleHUD Improvement Checklist

1. **Vertical Alignment Fix**
   - [x] Fix section blocks vertical alignment at larger breakpoints
   - [x] Add h-max and items-center classes to container divs

2. **Text Display Enhancement**
   - [x] Convert direct text overlay to tooltip functionality
   - [x] Implement hover-based tooltips for better visual design

3. **Section Expansion Behavior**
   - [x] Rewrite section expansion to expand the block itself instead of showing content below
   - [x] Modify GSAP animations to scale the section and reveal modules within
   - [x] Update layout logic for proper expansion behavior

4. **Module Loading**
   - [x] Debug course-data integration
   - [x] Ensure section IDs match expected values in course-data
   - [x] Add proper fallbacks and error handling

5. **Modal Implementation**
   - [x] Integrate VSSubmoduleModal.tsx for module details
   - [x] Connect module click handlers to modal
   - [x] Ensure proper data flow and display

6. **Scroll-Triggered Animations**
   - [x] Implement Intersection Observer for viewport detection
   - [x] Convert page load animations to scroll-triggered animations
   - [x] Add progressive reveal for better UX

## Landing Page Implementation Strategy

We follow a **"Meet in the Middle"** approach for the landing page:

### Team A: Top-Down
- Starts at the top of the page (navigation, hero section)
- Works downward through course stats, value proposition
- Implements top portion of module overviews and bento grid

### Team B: Bottom-Up
- Starts at the bottom of the page (footer, final CTAs)
- Works upward through pricing, testimonials, FAQs
- Implements bottom portion of feature details and bento grid

### Excluded Components
The Module Viewer component should NOT be modified in the current sprint.

### Implementation Guidelines
1. Always implement both light and dark mode for every component using theme-aware approach
2. Use theme utility classes for consistent styling: `text-theme-primary`, `bg-theme-gradient`
3. Add appropriate floating elements and gradients to each section using theme-aware variables
4. Test all changes in both light and dark modes
5. Include team prefix in all commit messages: `A:` or `B:`

## Common Conversion Patterns for Theme-Aware Styling

### Converting Competing Light/Dark Mode Classes

**FROM THIS:**
```jsx
<div className="bg-[var(--secondary-teal)] dark:bg-[var(--secondary-teal-light)]">
  Content
</div>
```

**TO THIS:**
```jsx
<div className="bg-theme-accent-secondary">
  Content
</div>
```

### Converting Tailwind Gradients

**FROM THIS:**
```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 
             dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
  Content
</div>
```

**TO THIS:**
```jsx
<div className="bg-theme-gradient">
  Content
</div>
```

### Converting Inline Styles

**FROM THIS:**
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>
  Content
</div>
```

**TO THIS:**
```jsx
<div className="bg-theme-primary">
  Content
</div>
```

### Converting Shadows

**FROM THIS:**
```jsx
<div className="shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
             dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
  Content
</div>
```

**TO THIS:**
```jsx
<div className="shadow-theme-md">
  Content
</div>
```

## Debugging Theme Implementation Issues

If you encounter styling issues, check for:

1. Missing theme-aware variables in your CSS (check `:root` and `@variant(dark)` sections)
2. Using competing light/dark mode styles instead of theme-aware variables
3. Using static color values instead of theme variables (e.g., `text-white` instead of `text-theme-primary`)
4. Missing or inappropriate shadows for each mode (verify theme shadow variables are defined)
5. Animation issues (verify theme animation variables and useGSAP implementation)

**How to test theme-aware variables:**
1. Inspect the element in browser dev tools
2. Check the computed CSS values in both light and dark modes
3. Verify theme variables are updating correctly when theme changes

REMEMBER: ALWAYS TEST IN BOTH LIGHT AND DARK MODE!

## Theme-Aware Utility Classes Reference

Use these theme-aware utility classes for consistent styling:

### Text Colors
- `text-theme-primary` - Main text color
- `text-theme-secondary` - Secondary text color

### Background Colors
- `bg-theme-primary` - Main background color
- `bg-theme-secondary` - Secondary background color
- `bg-theme-accent` - Accent background color

### Gradients
- `bg-theme-gradient` - Main gradient background 
- `bg-theme-gradient-primary` - Primary accent gradient
- `bg-theme-gradient-secondary` - Secondary accent gradient

### Shadows
- `shadow-theme-sm` - Small shadow
- `shadow-theme-md` - Medium shadow
- `shadow-theme-lg` - Large shadow
- `shadow-theme-btn` - Button shadow

### Animations
- `hover-bubbly` - Standard "VS Bubbly" hover animation
- `hover-bubbly-sm` - Subtle hover animation
- `hover-bubbly-lg` - More pronounced hover animation

## Implementation Checklist for Theme-Aware Styling

When working on a component:

1. ✅ Replace all competing light/dark styles with theme-aware utility classes
2. ✅ Convert all Tailwind gradients to use theme-aware gradient classes
3. ✅ Replace all inline styles with theme-aware Tailwind classes
4. ✅ Update all shadows to use theme-aware shadow classes
5. ✅ Make all animations use theme-aware variables
6. ✅ Add appropriate theme-aware floating elements for visual interest
7. ✅ Test the component in both light and dark modes
8. ✅ Verify all interactions in both theme modes
