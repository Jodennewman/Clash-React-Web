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

## ⚠️⚠️⚠️ CRITICAL: THEME-AWARE CSS VARIABLES ⚠️⚠️⚠️

### TEXT COLORS - THEME-AWARE APPROACH

**❌ PROBLEMATIC APPROACHES WITH COMPETING STYLES:**
```jsx
<p className="bg-[var(--secondary-teal)] dark:bg-[var(--secondary-teal-light)]">Competing variables cause conflicts</p>
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't update in dark mode without logic</div>
<div className="text-[var(--text-navy)]">Using outdated var() syntax</div>
```

**✅ CORRECT APPROACH - THEME-AWARE VARIABLES:**
```jsx
<!-- Option 1: Use theme-aware variables (PREFERRED) -->
<p className="bg-[var(--theme-accent-secondary)]">Uses variables that update with theme</p>
<h2 className="text-[var(--theme-text-primary)]">Text color updates with theme</h2>

<!-- Option 2: Use utility classes for common patterns -->
<div className="bg-theme-secondary">Using utility class that updates with theme</div>
<div className="text-theme-primary">Text uses theme-aware utility class</div>

<!-- Option 3: When component is outside theme context -->
<div style={{ 
  backgroundColor: isDarkTheme ? 'var(--bg-navy)' : 'var(--bg-cream)' 
}}>Uses conditional for isolated components</div>
```

## GRADIENT IMPLEMENTATION - THEME-AWARE APPROACH

**❌ PROBLEMATIC GRADIENT APPROACHES:**
```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">Competing gradient styles can cause conflicts</div>
<div style={{ background: 'linear-gradient(to bottom right, white, var(--bg-cream))' }}>Won't update in dark mode</div>
```

**✅ CORRECT APPROACH - THEME-AWARE GRADIENTS:**
```jsx
<!-- Option 1: Use theme-aware gradient utility classes (PREFERRED) -->
<div className="bg-theme-gradient">Gradient changes automatically with theme</div>
<div className="bg-theme-gradient-primary">Component-specific gradient that's theme-aware</div>

<!-- Option 2: CSS variables that update with theme -->
<div className="bg-[var(--theme-gradient)]">
  Uses CSS variables that update with theme
</div>

<!-- Option 3: For advanced cases, use conditional styles -->
<div style={{ 
  background: isDarkTheme 
    ? 'linear-gradient(to bottom right, var(--bg-navy), var(--bg-navy-darker))' 
    : 'linear-gradient(to bottom right, white, var(--bg-cream))'
}}>
  Conditional styling for special cases
</div>
```

## SINGLE-SOURCE-OF-TRUTH THEME VARIABLES

**❌ PROBLEMATIC DUAL-MODE APPROACH:**
```jsx
<div className="text-[--text-navy] dark:text-white">Using competing styles for each mode</div>
<p className="vs-text-navy dark:text-white">Helper class + dark override creates maintenance issues</p>
```

**✅ THEME-AWARE IMPLEMENTATION:**
```jsx
<!-- Option 1: Theme-aware variables (PREFERRED) -->
<div className="text-[var(--theme-text-primary)]">
  Text color automatically changes with theme
</div>

<!-- Option 2: Theme utility classes -->
<p className="text-theme-primary">
  Utility class controls color in both modes
</p>

<!-- Option 3: Using component-specific theme classes -->
<div className="heading-primary">
  Component-specific class handles both modes
</div>

<!-- Option 4: For isolated components -->
<div style={{ color: isDarkTheme ? 'var(--text-light)' : 'var(--text-navy)' }}>
  Conditional logic for isolated components
</div>
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

### Shadow Implementation
**Light Mode:**
```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80
             shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
             rounded-lg p-6">
  Light mode content with proper styling
</div>
```

**Dark Mode:**
```jsx
<div className="dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
             dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
             rounded-lg p-6">
  Dark mode content with proper styling
</div>
```

### Floating Elements Implementation
```jsx
<div className="relative">
  {/* Floating element - light mode */}
  <div className="absolute -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-5 bg-[--primary-orange] 
                top-10 right-5 animate-float-slow hidden dark:hidden"></div>
  
  {/* Floating element - dark mode */}
  <div className="absolute -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-10 
                bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
                top-10 right-5 animate-float-slow hidden dark:block"></div>
  
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

## Critical Do's and Don'ts - ⚠️⚠️⚠️ UPDATED FOR THEME-AWARE APPROACH ⚠️⚠️⚠️

### DO NOT:
- ❌ NEVER use competing light/dark mode styles that target same property
- ❌ NEVER use static color values without theme awareness
- ❌ NEVER use plain white backgrounds - ALWAYS use subtle gradients
- ❌ NEVER create animations without proper cleanup via useGSAP and gsap.context
- ❌ NEVER change grid layouts (grid-cols-*) under any circumstances
- ❌ NEVER implement quick fixes - identify and fix root causes

### DO:
- ✅ ALWAYS use theme-aware variables: `className="text-[var(--theme-text-primary)]"`
- ✅ ALWAYS use theme utility classes when available: `className="text-theme-primary"`
- ✅ ALWAYS use theme-aware gradients: `className="bg-theme-gradient-primary"`
- ✅ ALWAYS verify components look correct in both light and dark modes
- ✅ ALWAYS add subtle floating elements for visual interest
- ✅ ALWAYS use appropriate shadows for each mode (down-left for light, glow for dark)
- ✅ ALWAYS create a written plan and get approval before proceeding
- ✅ ALWAYS test in both light and dark mode

## Tailwind v4 CSS Variables Structure

### Global CSS Structure
Our CSS variables use Tailwind v4's `@custom-variant` and `@variant` system:
```css
/* Define dark mode variant */
@custom-variant dark (&:where(.dark, .dark *));

/* Root variables in light mode */
:root {
  /* CSS variables here */
  --primary-orange: oklch(75% 0.13 57);
  --text-navy: oklch(30% 0.03 230);
  /* etc... */
}

/* Dark mode overrides using variant */
@variant(dark) {
  :root {
    /* Dark mode values */
    --primary-orange: oklch(80% 0.14 57);
    --text-navy: oklch(96% 0.01 90);
    /* etc... */
  }
}
```

### Theme-Aware CSS Variables - CRITICAL APPROACH
- In CSS stylesheets: Define theme variables that automatically update with theme context ✅
  ```css
  :root {
    --theme-text-primary: var(--text-navy);
    --theme-bg-primary: var(--bg-cream);
  }
  
  @variant(dark) {
    :root {
      --theme-text-primary: white;
      --theme-bg-primary: var(--bg-navy);
    }
  }
  ```
- In Tailwind classes: Use theme-aware variables ✅
  ```jsx
  <p className="text-[var(--theme-text-primary)]">Text updates with theme</p>
  ```
- Use utility classes for common patterns ✅
  ```jsx
  <div className="text-theme-primary bg-theme-surface">Using utility classes</div>
  ```
- In isolated components: Use conditional logic ✅
  ```jsx
  <div style={{ color: isDarkMode ? 'white' : 'var(--text-navy)' }}>
    Works outside theme context
  </div>
  ```

### Theme-Aware Gradient Patterns
- ✅ Use theme-aware gradient CSS classes:
  ```css
  .bg-theme-gradient {
    background: linear-gradient(to right, var(--theme-gradient-start), var(--theme-gradient-end));
  }
  ```
- ✅ Apply with simple class names:
  ```jsx
  <div className="bg-theme-gradient">Theme-aware gradient that updates automatically</div>
  ```
- ✅ Define component-specific themed gradients:
  ```css
  .card-gradient {
    background: linear-gradient(to bottom right, var(--theme-card-gradient-start), var(--theme-card-gradient-end));
  }
  ```

### Adding Plugins
Add plugins to tailwind.config.js, not in CSS:
```js
// tailwind.config.js
export default {
  // other config...
  plugins: [
    require('tailwindcss-animate')
  ],
}
```

### Animations
- Use Tailwind's built-in animation utilities directly
- For custom animations, add them to the animation object in tailwind.config.js:
```js
theme: {
  extend: {
    animation: {
      'float-slow': 'float 8s ease-in-out infinite',
      'float-medium': 'float 6s ease-in-out infinite',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      }
    }
  }
}
```

### Utility Classes
Use our helper utility classes for common patterns:
- `hover-bubbly` - Standard VS hover animation
- `hover-bubbly-sm` - Subtle hover
- `hover-bubbly-lg` - More pronounced hover

## CSS Variable Scoping and Isolated Components

### Dark Mode Implementation
CSS variables now properly toggle between light and dark modes. The `.dark` class must be applied to the `<html>` element (not the body), and is handled by our theme toggle script.

**Theme toggle usage:**
```html
<button data-theme-toggle>Toggle Theme</button>
```

Or with custom elements:
```html
<button data-theme-toggle>
  <span data-theme-dark>Dark Mode</span>
  <span data-theme-light className="hidden">Light Mode</span>
</button>
```

The theme-toggle.js script will automatically handle the icons/text change and local storage persistence.

## Current Priority Issues
1. Update all components to use direct CSS variable references `text-[--variable-name]` with the new Tailwind v4 approach
2. Review components to leverage the automatic dark mode via `@variant(dark)` in globals.css
3. Convert any remaining inline style attributes for colors to Tailwind classes
4. Verify all components render correctly in both light and dark mode with our new implementation

## Remaining CSS Variable Conversion Tasks
1. **Remaining landing page components**: Some landing page components still have `var(--variable)` references that need to be updated to the direct `--variable` format.
2. **Animations & transitions**: Need to verify all animations work properly with CSS variables, especially those using `duration-[--transition-*]`.
3. **Helper components**: Many VS* helper components still need updates or should be phased out when refactoring is complete.
4. **Interactive elements**: Validate hover/active states in both light and dark mode across interactive elements.
5. **Error states & validation**: Forms and input components need to be tested with the new variable system.
6. **Background patterns**: Some components use `bg-[linear-gradient(to_right,var(--grid-line)_1px,...)]` syntax which needs careful refactoring.
7. **Animation components**: Components using GSAP often use `var(--variable)` in inline styles which need special handling.
8. **Border radius standardization**: Standardize to use direct utility classes like `rounded-xl` rather than CSS variables.
9. **UI consistency check**: After conversion, review all components for visual consistency in light and dark modes.

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
1. Always implement both light and dark mode for every component
2. Use direct CSS variable references with the pattern `text-[--variable-name]`
3. Add appropriate floating elements and gradients to each section
4. Test all changes in both light and dark modes
5. Include team prefix in all commit messages: `A:` or `B:`

## Component Example with Theme-Aware Implementation

```jsx
function ExampleCard() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating elements using theme-aware approach */}
      <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 
                    opacity-[var(--theme-float-opacity)] 
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow"></div>
      <div className="absolute bottom-10 right-5 w-24 h-24 rounded-[30%] -rotate-6 
                    opacity-[var(--theme-float-opacity-secondary)]
                    bg-[var(--theme-float-bg-secondary)]
                    animate-float-medium"></div>
                    
      {/* Card with theme-aware styling */}
      <div className="relative z-10 
                    bg-theme-card-gradient
                    rounded-lg p-6 
                    shadow-[var(--theme-shadow-card)]
                    transition-all duration-300
                    hover:shadow-[var(--theme-shadow-card-hover)]
                    hover-bubbly">
        {/* Content */}
        <h3 className="text-[var(--theme-text-primary)] text-xl mb-2">
          Card Title
        </h3>
        
        <p className="text-[var(--theme-text-secondary)] mb-4">
          This card uses theme-aware variables for consistent styling in any theme.
        </p>
        
        <button className="btn-primary hover-bubbly-sm">
          Learn More
        </button>
      </div>
    </div>
  )
}

// Define these utility classes in globals.css:
/*
.bg-theme-card-gradient {
  background: linear-gradient(to bottom right, var(--theme-card-gradient-start), var(--theme-card-gradient-end));
}

.btn-primary {
  background: linear-gradient(to right, var(--theme-btn-primary-start), var(--theme-btn-primary-end));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  box-shadow: var(--theme-shadow-sm);
  transition: all 300ms var(--theme-transition-bounce);
}

.btn-primary:hover {
  box-shadow: var(--theme-shadow-md);
}

.hover-bubbly:hover {
  transform: translateY(-4px) scale(1.02);
}

.hover-bubbly-sm:hover {
  transform: translateY(-3px) scale(1.03);
}
*/
```

## Common Pitfalls to Avoid

### Competing Styles Problem
❌ **PROBLEMATIC APPROACHES**:
```jsx
<div className="text-[--text-navy] dark:text-white">Competing styles can cause conflicts</div>
<p className="bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">Using different variables for each mode</p>
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy]">Gradient with competing declarations</div>
```

✅ **THEME-AWARE SOLUTIONS**:
```jsx
<!-- Option 1: Theme-aware CSS variables -->
<div className="text-[var(--theme-text-primary)]">
  Single variable automatically updates with theme
</div>

<!-- Option 2: Theme utility classes -->
<div className="bg-theme-surface">
  Utility class handles theme changes automatically
</div>

<!-- Option 3: Component-specific theme classes -->
<div className="card-gradient">
  Component class with theme-aware styles
</div>
```

### Theme-Aware Gradient Implementation
❌ **PROBLEMATIC APPROACHES**:
```jsx
<div className="bg-white">Plain white background without theme support</div>
<div style={{ background: 'linear-gradient(to right, var(--primary-orange), var(--accent-coral))' }}>
  Doesn't update with theme
</div>
```

✅ **THEME-AWARE SOLUTIONS**:
```jsx
<!-- Option 1: Theme-aware gradient class -->
<div className="bg-theme-gradient">
  Gradient that updates automatically with theme
</div>

<!-- Option 2: Component-specific gradient with theme awareness -->
<div className="card-gradient">
  Component-specific gradient with theme support
</div>

<!-- Option 3: For isolated components -->
<div style={{ 
  background: isDarkMode
    ? 'linear-gradient(to right, var(--primary-orange-dark), var(--accent-coral-dark))'
    : 'linear-gradient(to right, var(--primary-orange), var(--accent-coral))'
}}>
  Conditional gradient for isolated components
</div>
```

### Animation Implementation with Theme Awareness
❌ **PROBLEMATIC APPROACHES**:
```jsx
// Problem 1: No cleanup
useEffect(() => {
  gsap.to(".element", { y: -10 });
  // No cleanup
}, []);

// Problem 2: No theme awareness
useGSAP(() => {
  const ctx = gsap.context(() => {
    gsap.to(".element", { 
      y: -10,
      duration: 0.5
    });
  }, containerRef);
  
  return () => ctx.revert();
}, []);
```

✅ **THEME-AWARE ANIMATION**:
```jsx
// Using theme-aware variables for animation properties
useGSAP(() => {
  const ctx = gsap.context(() => {
    // Get computed values from theme-aware CSS variables
    const element = containerRef.current.querySelector(".element");
    const styles = window.getComputedStyle(element);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-10px';
    const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.5';
    
    gsap.to(".element", { 
      y: animDistance,
      duration: parseFloat(animDuration),
      ease: "power2.out"
    });
  }, containerRef);
  
  return () => ctx.revert();
}, []);
```

## Debugging Theme Implementation Issues

If styling looks wrong in either theme mode, check for:

1. Missing theme-aware variable definitions in your CSS (check `:root` and `@variant(dark)` sections)
2. Using competing light/dark mode styles instead of theme-aware variables
3. Using static values instead of theme variables (e.g., `text-white` instead of `text-[var(--theme-text-primary)]`)
4. Missing or inappropriate shadows for each mode (verify theme shadow variables are defined)
5. Animation issues (verify theme animation variables and useGSAP implementation)

**How to test theme-aware variables:**
1. Inspect the element in browser dev tools
2. Check the computed CSS values in both light and dark modes
3. Verify theme variables are updating correctly when theme changes

REMEMBER: ALWAYS TEST IN BOTH LIGHT AND DARK MODE!

**Quick fix for common issues:**
```css
/* Add these to globals.css */
:root {
  /* Theme text colors */
  --theme-text-primary: var(--text-navy);
  --theme-text-secondary: var(--text-navy);
  
  /* Theme background colors */
  --theme-bg-primary: var(--bg-cream);
  --theme-bg-secondary: var(--bg-cream-darker);
  
  /* Theme gradients */
  --theme-gradient-start: white;
  --theme-gradient-end: var(--bg-cream);
  
  /* Theme shadows */
  --theme-shadow-card: 2px 2px 8px rgba(0,0,0,0.05);
}

@variant(dark) {
  :root {
    /* Theme text colors in dark mode */
    --theme-text-primary: white;
    --theme-text-secondary: rgba(255,255,255,0.7);
    
    /* Theme background colors in dark mode */
    --theme-bg-primary: var(--bg-navy);
    --theme-bg-secondary: var(--bg-navy-darker);
    
    /* Theme gradients in dark mode */
    --theme-gradient-start: var(--bg-navy);
    --theme-gradient-end: var(--bg-navy-darker);
    
    /* Theme shadows in dark mode */
    --theme-shadow-card: 0 0 15px rgba(53,115,128,0.15);
  }
}
```

## Theme-Aware Utility Classes

Use these theme-aware utility classes for common styling patterns:

```jsx
// Theme-aware text colors
<div className="text-theme-primary">
  Primary text color that updates with theme
</div>

<div className="text-theme-secondary">
  Secondary text color that updates with theme
</div>

// Theme-aware backgrounds
<div className="bg-theme-surface">
  Surface background that updates with theme
</div>

<div className="bg-theme-card">
  Card background that updates with theme
</div>

// Theme-aware gradients
<div className="bg-theme-gradient">
  Gradient that updates with theme
</div>

<div className="bg-theme-gradient-primary">
  Primary accent gradient that updates with theme
</div>

// VS Bubbly animations (theme-aware)
<div className="hover-bubbly">
  Hover with standard VS Bubbly effect
</div>

<div className="hover-bubbly-lg">
  Hover with larger VS Bubbly effect
</div>

// Theme-aware shadows
<div className="shadow-theme-card">
  Card shadow that updates with theme
</div>

// Complete component styling
<div className="card-primary">
  Card with complete theme-aware styling
</div>
```

Example implementation of these classes in globals.css:

```css
/* Text utilities */
.text-theme-primary {
  color: var(--theme-text-primary);
}

.text-theme-secondary {
  color: var(--theme-text-secondary);
}

/* Background utilities */
.bg-theme-surface {
  background-color: var(--theme-bg-primary);
}

.bg-theme-card {
  background-color: var(--theme-bg-card);
}

/* Gradient utilities */
.bg-theme-gradient {
  background: linear-gradient(to bottom right, var(--theme-gradient-start), var(--theme-gradient-end));
}

.bg-theme-gradient-primary {
  background: linear-gradient(to right, var(--theme-primary-gradient-start), var(--theme-primary-gradient-end));
}

/* Shadow utilities */
.shadow-theme-card {
  box-shadow: var(--theme-shadow-card);
}

/* Complete component styling */
.card-primary {
  background: linear-gradient(to bottom right, var(--theme-card-gradient-start), var(--theme-card-gradient-end));
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--theme-shadow-card);
  transition: all 300ms var(--theme-transition-bounce);
}

.card-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--theme-shadow-card-hover);
}
```

## CSS Variables Reference: Light & Dark Mode

### Main Brand Colors

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--primary-orange` | oklch(75% 0.13 57) | oklch(80% 0.14 57) |
| `--primary-orange-hover` | oklch(70% 0.16 52) | oklch(85% 0.15 55) |
| `--primary-orange-light` | oklch(78% 0.12 60) | oklch(85% 0.12 60) |
| `--secondary-teal` | oklch(48% 0.07 200) | oklch(55% 0.08 200) |
| `--secondary-teal-hover` | oklch(45% 0.08 195) | oklch(60% 0.09 195) |
| `--secondary-teal-light` | oklch(54% 0.07 195) | oklch(65% 0.07 195) |
| `--accent-coral` | oklch(62% 0.15 27) | oklch(65% 0.18 27) |
| `--accent-red` | oklch(48% 0.21 25) | oklch(55% 0.23 25) |

### Background Colors

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--bg-cream` | oklch(96% 0.02 85) | oklch(12% 0.03 240) |
| `--bg-cream-gradient` | linear-gradient(213deg, oklch(96% 0.02 85) 0%, oklch(95% 0.03 83) 100%) | linear-gradient(135deg, oklch(14% 0.04 235) 0%, oklch(10% 0.04 240) 100%) |
| `--bg-cream-darker` | oklch(94% 0.03 80) | oklch(12% 0.02 235) |
| `--bg-navy` | oklch(16% 0.03 235) | oklch(12% 0.03 240) |
| `--bg-navy-gradient` | linear-gradient(213deg, oklch(16% 0.03 235) 0%, oklch(12% 0.02 235) 100%) | linear-gradient(135deg, oklch(14% 0.04 235) 0%, oklch(10% 0.04 240) 100%) |

### Text Colors

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--text-navy` | oklch(30% 0.03 230) | oklch(96% 0.01 90) |
| `--text-cream` | oklch(96% 0.01 90) | oklch(99% 0.001 90) |

### Card & UI Colors

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--card-bg-light` | oklch(93% 0.04 65) | oklch(28% 0.05 227) |
| `--card-bg-navy` | oklch(31% 0.05 227) | linear-gradient(145deg, oklch(28% 0.05 227) 0%, oklch(22% 0.05 225) 100%) |

### Shadow & Glow Effects

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--shadow-sm` | 0 2px 8px rgba(0, 0, 0, 0.05) | 0 2px 8px rgba(0, 0, 0, 0.25) |
| `--shadow-md` | 0 4px 12px rgba(0, 0, 0, 0.08) | 0 4px 16px rgba(0, 0, 0, 0.3) |
| `--shadow-lg` | 0 8px 24px rgba(0, 0, 0, 0.12) | 0 8px 28px rgba(0, 0, 0, 0.4) |
| `--shadow-btn` | 0 2px 6px rgba(0, 0, 0, 0.15) | 0 2px 6px rgba(0, 0, 0, 0.25) |
| `--glow-accent` | n/a | 0 0 20px rgba(222, 107, 89, 0.15) |
| `--glow-primary` | n/a | 0 0 20px rgba(254, 172, 109, 0.15) |
| `--glow-blue` | n/a | 0 0 20px rgba(56, 114, 146, 0.15) |

### HUD & Module Colors

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--hud-teal` | oklch(49% 0.05 220) | oklch(55% 0.07 220) |
| `--hud-coral` | oklch(62% 0.15 27) | oklch(70% 0.16 27) |
| `--hud-navy` | oklch(25% 0.04 225) | oklch(22% 0.04 225) |
| `--hud-red` | oklch(48% 0.21 25) | oklch(55% 0.23 25) |
| `--hud-pink` | oklch(75% 0.12 350) | oklch(75% 0.15 350) |
| `--hud-orange` | oklch(75% 0.13 57) | oklch(80% 0.14 57) |
| `--hud-accent-red` | oklch(65% 0.25 25) | oklch(70% 0.25 25) |
| `--hud-orange-light` | oklch(85% 0.07 60) | oklch(85% 0.08 60) |
| `--hud-orange-lighter` | oklch(85% 0.08 65) | oklch(87% 0.09 65) |

### Grid & Patterns

| Variable Name | Light Mode Value | Dark Mode Value |
|---------------|------------------|-----------------|
| `--grid-line` | rgba(18, 46, 59, 0.05) | rgba(255, 255, 255, 0.05) |
| `--grid-dot` | rgba(18, 46, 59, 0.08) | rgba(255, 255, 255, 0.08) |

### Usage Example: Text Color - CORRECT APPROACHES

```jsx
<!-- PREFERRED: Using helper class with dark mode variant -->
<p className="vs-text-navy dark:text-white">
  This text is navy in light mode and white in dark mode
</p>

<!-- ACCEPTABLE: Using style attribute with var() -->
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">
  This text uses proper var() syntax
</p>

<!-- ACCEPTABLE: Using Tailwind with var() wrapper -->
<p className="text-[var(--text-navy)] dark:text-white">
  This text uses proper var() wrapper in Tailwind
</p>
```

### Usage Example: Background Color with Gradient - CORRECT APPROACHES

```jsx
<!-- PREFERRED: Using predefined helper classes -->
<div className="vs-gradient-light dark:vs-gradient-dark">
  Content with gradient background that adapts to theme using helper classes
</div>

<!-- ACCEPTABLE: Using inline styles with var() -->
<div style={{ 
  background: 'linear-gradient(to bottom right, white, var(--bg-cream))'
}} className="dark:vs-gradient-dark">
  Content with inline gradient styles for light mode and helper class for dark
</div>
```

### Usage Example: Button with Theme-Specific Styling - CORRECT APPROACHES

```jsx
<!-- PREFERRED: Using component-specific helper classes -->
<button className="vs-btn-primary dark:vs-btn-primary-gradient text-white">
  Primary Action using helper classes
</button>

<!-- ACCEPTABLE: Using style with conditional -->
<button
  style={{ 
    backgroundColor: 'var(--primary-orange)',
    boxShadow: isDarkMode ? '0 0 12px rgba(254,163,93,0.2)' : 'var(--shadow-sm)'
  }}
  className="text-white rounded-full py-2 px-4"
>
  Primary Action with proper styles
</button>
```

## ⚠️⚠️⚠️ CRITICAL: THEME-AWARE VARIABLE APPROACH ⚠️⚠️⚠️

**The theme-aware variable approach avoids competing light/dark styles and simplifies maintenance**

- ❌ Do NOT use competing style declarations (e.g., `text-[--color] dark:text-white`)
- ❌ Do NOT use direct color values without theme awareness
- ❌ Do NOT use inline styles that don't adapt to theme changes
- ✅ Instead, create theme-aware variables in CSS with proper naming
- ✅ Use single theme-aware classes: `text-[var(--theme-text-primary)]`
- ✅ Prefer theme utility classes: `text-theme-primary`, `bg-theme-surface`

## CRITICAL MISSION: Implement Theme-Aware Approach Throughout Codebase

1. **Add Theme-Aware Variables to globals.css:**
   ```css
   :root {
     /* Text theme */
     --theme-text-primary: var(--text-navy);
     --theme-text-secondary: var(--text-navy);
     
     /* Background theme */
     --theme-bg-primary: var(--bg-cream);
     --theme-bg-surface: var(--bg-cream-darker);
     
     /* Gradient theme */
     --theme-gradient-start: white;
     --theme-gradient-end: var(--bg-cream);
     
     /* Shadow theme */
     --theme-shadow-card: 2px 2px 8px rgba(0,0,0,0.05);
   }
   
   @variant(dark) {
     :root {
       /* Dark theme values */
       --theme-text-primary: white;
       --theme-text-secondary: rgba(255,255,255,0.7);
       
       --theme-bg-primary: var(--bg-navy);
       --theme-bg-surface: var(--bg-navy-darker);
       
       --theme-gradient-start: var(--bg-navy);
       --theme-gradient-end: var(--bg-navy-darker);
       
       --theme-shadow-card: 0 0 15px rgba(53,115,128,0.15);
     }
   }
   ```

2. **Create Utility Classes for Common Patterns:**
   ```css
   /* Theme-aware utility classes */
   .text-theme-primary { color: var(--theme-text-primary); }
   .bg-theme-surface { background-color: var(--theme-bg-surface); }
   .bg-theme-gradient { background: linear-gradient(to bottom right, var(--theme-gradient-start), var(--theme-gradient-end)); }
   .shadow-theme-card { box-shadow: var(--theme-shadow-card); }
   ```

3. **Refactor Components to Use Theme-Aware Approach:**
   - ✅ Replace competing styles with theme-aware variables
   - ✅ Use utility classes for common styling patterns
   - ✅ Create component-specific classes for complex components

4. **IMPLEMENTATION CHECKLIST:**
   - [ ] Add theme-aware variables to globals.css
   - [ ] Create utility classes for common patterns
   - [ ] Update component styles to use theme-aware approach
   - [ ] Test components in both light and dark mode
   - [ ] Verify theme changes are properly applied

5. **SEARCH TIPS:**
   - Search for `dark:` to find competing style declarations
   - Search for `text-white` to find hardcoded text colors
   - Look for components that use both light and dark mode styles for the same property
