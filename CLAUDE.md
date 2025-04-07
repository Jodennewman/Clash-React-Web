# CLAUDE.md

This file guides Claude Code when working with this repository. Follow these instructions PRECISELY.

## Current Mission: Enhance VS-Interactive-Features

**Primary Goal**: Create a new interactive features component that complements the VS-BigReveal section with engaging, interactive elements to showcase program benefits.

**Approach**:
1. Create a new VS-Interactive-Features.tsx component in the sections directory
2. Implement interactive card elements that respond to hover and click interactions
3. Create revealing animation sequences using GSAP that properly clean up
4. Design an eye-catching background effect with multiple theme-aware floating elements
5. Add animated icons or micro-interactions to engage users with the content
6. Position this component to follow the VS-BigReveal section
7. Ensure all styling follows theme-aware implementation with brand utility classes
8. Use GSAP timelines for coordinated, complex animations with proper cleanup
9. Implement a highlight feature that draws attention to specific benefits
10. Ensure responsive design works well on all screen sizes

**Previous Mission Completed**:
✅ VS-BigReveal component created and enhanced with theme-aware styling and animations
✅ Replaced inline style variables with brand utility classes
✅ Added coordinated GSAP animations with proper cleanup
✅ Enhanced visual interest with theme-aware floating elements
✅ Created VS_BIG_REVEAL_COPY.md to store component content
✅ Positioned component after VSPainPoints section
✅ Implemented logo with spotlight effect using theme-aware styling

**Success Criteria**: An engaging, interactive features component that complements the VS-BigReveal section with responsive, animated elements that showcase program benefits effectively in both light and dark modes.

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
7. If in Team Mode, read `TEAM_STRUCTURE.md` completely

## ⚠️⚠️⚠️ CRITICAL: PROJECT DOCUMENTATION ⚠️⚠️⚠️

### Essential Documentation Files

**Theme System:**
1. **VS_COLOR_IMPLEMENTATION.md** - Complete color implementation strategy
2. **THEME_SYSTEM.md** - Quick reference guide for using the theme system
3. **THEME_IMPLEMENTATION_SUMMARY.md** - Implementation plan and next steps

**Style Guides:**
4. **VS_STYLING_GUIDE.md** - Core design system and styling standards
5. **TAILWIND-V4-DOCS.txt** - Reference for Tailwind v4 specifics

**Team Organization:**
6. **TEAM_STRUCTURE.md** - Team assignments and top-down/bottom-up approach
7. **SOLO_MODE.md** - Guidelines for solo development

**Quick Reference:**
8. **QUICK_COMMANDS.md** - Essential development commands

Refer to these files for comprehensive guidance on implementation standards and team coordination.

## ⚠️⚠️⚠️ CRITICAL: NEW THEME-AWARE CSS APPROACH ⚠️⚠️⚠️

We have implemented a new theme-aware approach that significantly changes how styles are written. This section outlines the new approach and provides clear examples of correct and incorrect implementations.

### The Core Principle: Single Source of Truth

The theme-aware approach uses single CSS variables that automatically change value based on the current theme. This eliminates competing styles and simplifies maintenance.

### TEXT COLORS - THEME-AWARE APPROACH

**❌ OUTDATED APPROACHES (DO NOT USE):**
```jsx
<p className="bg-[var(--secondary-teal)] dark:bg-[var(--secondary-teal-light)]">Competing variables cause conflicts</p>
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't update in dark mode without logic</div>
<div className="text-[var(--text-navy)]">Using outdated var() syntax</div>
<p className="bg-[var(--theme-accent-secondary)]">Uses inline theme variables - not recommended</p>
<h2 className="text-[var(--theme-text-primary)]">Inline theme variables - not recommended</h2>
```

**✅ CORRECT APPROACH - BRAND UTILITY CLASSES:**
```jsx
<!-- ALWAYS USE: Brand utility classes (REQUIRED) -->
<p className="bg-theme-accent-secondary">Using brand utility class</p>
<h2 className="text-theme-primary">Text uses brand utility class</h2>
<button className="bg-theme-gradient-primary shadow-theme-sm text-white">Uses multiple brand utilities</button>

<!-- ONLY when absolutely necessary and component is outside theme context -->
<div style={{ 
  backgroundColor: isDarkTheme ? 'var(--bg-navy)' : 'var(--bg-cream)' 
}}>Conditional for isolated components - use only when needed</div>
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
<!-- REQUIRED: Use brand utility classes for gradients -->
<div className="bg-theme-gradient">
  This gradient automatically updates with theme changes
</div>

<div className="bg-theme-gradient-primary">
  This accent gradient updates with theme changes
</div>

<!-- NOT RECOMMENDED: Avoid using inline theme variables -->
<!-- <div className="bg-gradient-to-br from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]">
  Don't use this approach - use utility classes instead
</div> -->

<!-- ONLY when absolutely necessary: For advanced cases with JS -->
<div style={{ 
  background: isDarkTheme 
    ? 'linear-gradient(to bottom right, var(--bg-navy), var(--bg-navy-darker))' 
    : 'linear-gradient(to bottom right, white, var(--bg-cream))'
}}>
  Use conditional approaches only when brand utility classes aren't available
</div>
```

### THEME-AWARE IMPLEMENTATION FOR ALL PROPERTIES

**❌ PROBLEMATIC APPROACHES:**
```jsx
<!-- DO NOT use competing styles -->
<div className="text-[--text-navy] dark:text-white">Using competing color styles</div>
<div className="shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
  Competing shadow styles
</div>
<div className="border-[--primary-orange] dark:border-[--primary-orange-light]">
  Competing border styles
</div>

<!-- DO NOT use inline theme variables -->
<div className="text-[var(--theme-text-primary)]">Using inline theme variables - not recommended</div>
<div className="shadow-[var(--theme-shadow-md)]">Using inline theme variables - not recommended</div>
<div className="border border-[var(--theme-primary)]">Using inline theme variables - not recommended</div>
```

**✅ CORRECT APPROACH - BRAND UTILITY CLASSES:**
```jsx
<!-- ALWAYS USE: Brand utility classes (REQUIRED) -->
<div className="text-theme-primary">Text uses brand utility class</div>
<div className="shadow-theme-md">Shadow uses brand utility class</div>
<div className="border border-theme-primary">Border uses brand utility class</div>
<div className="bg-theme-surface shadow-theme-sm hover:shadow-theme-md text-theme-primary">
  Multiple brand utility classes for complete theme awareness
</div>
```

### THEME-AWARE TEXT GRADIENTS

**❌ PROBLEMATIC GRADIENT TEXT APPROACHES:**
```jsx
<!-- DO NOT use competing gradient text styles -->
<span className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 
                 bg-clip-text text-transparent">
  Text with competing gradient styles
</span>

<!-- DO NOT use fixed colors for gradient text -->
<span style={{ 
  background: 'linear-gradient(to right, #ff9f51, #ef6252)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent' 
}}>
  Static gradient that won't adapt to theme
</span>

<!-- DO NOT use inline theme variables -->
<span className="bg-gradient-to-r from-[var(--theme-gradient-orange-start)] to-[var(--theme-gradient-orange-end)] 
                 bg-clip-text text-transparent">
  Using inline theme variables - not recommended
</span>
```

**✅ CORRECT GRADIENT TEXT IMPLEMENTATION:**
```jsx
<!-- REQUIRED: Use brand utility classes for gradient text -->
<span className="text-theme-gradient">
  Theme-aware gradient text (primary gradient)
</span>

<span className="vs-text-gradient-orange">
  Orange to coral theme-aware gradient
</span>

<span className="vs-text-gradient-teal">
  Teal theme-aware gradient
</span>

<!-- ALSO CORRECT: Use official brand gradient classes -->
<span className="bg-theme-gradient-text">
  Alternative theme-aware gradient text class
</span>
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
  {/* Theme-aware floating element using brand utility classes */}
  <div className="absolute -z-10 w-20 h-20 rounded-[40%] rotate-12 
                opacity-theme-float
                bg-theme-float-primary
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
- ❌ NEVER use inline theme variables like `text-[var(--theme-text-primary)]` - use utility classes instead

### DO:
- ✅ ALWAYS use brand utility classes defined in globals.css: `text-theme-primary`, `bg-theme-accent`
- ✅ ALWAYS use brand gradient classes: `bg-theme-gradient`, `bg-theme-gradient-primary`
- ✅ ALWAYS use brand shadow classes: `shadow-theme-sm`, `shadow-theme-md`, `shadow-theme-lg`
- ✅ ALWAYS use theme-aware variables for animation values in GSAP
- ✅ ALWAYS verify components in both light and dark modes before committing
- ✅ ALWAYS add subtle floating elements using theme-aware utility classes
- ✅ ALWAYS create a written plan and get approval before proceeding
- ✅ ALWAYS COMMIT AND PUSH CHANGES TO THE 'the-reveal' BRANCH
- ✅ ALWAYS prioritize brand utility classes over any other styling approach

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
      {/* Theme-aware floating element using brand utility classes */}
      <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 
                    opacity-theme-float
                    bg-theme-float-primary
                    animate-float-slow"></div>
                    
      {/* Card with theme-aware styling using brand utility classes */}
      <div className="relative z-10 
                    bg-theme-gradient
                    rounded-lg p-6 
                    shadow-theme-md
                    transition-all duration-300
                    hover-bubbly">
        {/* Content using brand utility classes */}
        <h3 className="text-theme-primary text-xl mb-2">
          Card Title
        </h3>
        
        <p className="text-theme-secondary mb-4">
          This card uses brand utility classes for consistent styling in any theme.
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
5. Push to the correct branch: `git push origin the-reveal`

### IMPORTANT: Branch Management
- ALWAYS work in and push to the 'the-reveal' branch
- If the branch doesn't exist: `git checkout -b the-reveal`
- If already on another branch: `git checkout the-reveal`
- NEVER work directly in the main/master branch

### Commit Frequency
- After each significant component change
- At least once per hour of work
- Immediately after fixing bugs
- Always push immediately after committing

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
- Use `npm run dev` to start the development server (on port 5173, 5174, or 5175)
- Use `npm run build` for building
- Use `npm run typecheck` for testing components

## Most Important Rule
After stating your plan, NEVER deviate from it without permission. It's better to do nothing than to implement something contrary to your stated plan.

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

### Converting Inline Theme Variables

**FROM THIS:**
```jsx
<div className="text-[var(--theme-text-primary)]">
  Content
</div>
```

**TO THIS:**
```jsx
<div className="text-theme-primary">
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
- `text-theme-tertiary` - Tertiary text color (60% opacity)
- `text-theme-subtle` - Subtle text color (40% opacity)
- `text-theme-accent` - Accent text color
- `text-theme-error` - Error text color

### Text Gradients
- `text-theme-gradient` - Primary gradient text (orange to coral)
- `vs-text-gradient-orange` - Orange to coral gradient text
- `vs-text-gradient-teal` - Teal gradient text
- `bg-theme-gradient-text` - Alternative gradient text implementation

### Background Colors
- `bg-theme-primary` - Main background color
- `bg-theme-secondary` - Secondary background color
- `bg-theme-accent` - Accent background color
- `bg-theme-surface` - Surface background
- `bg-theme-card` - Card background

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

