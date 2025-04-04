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

## ⚠️⚠️⚠️ CRITICAL: TAILWIND CSS VARIABLE PATTERNS ⚠️⚠️⚠️

### TEXT COLORS - DIRECT CSS VARIABLE REFERENCE

**❌ INCORRECT APPROACH - DO NOT USE:**
```jsx
<p className="text-[--text-navy] dark:text-white">WRONG: Missing var() wrapper</p>
<h2 className="text-[--primary-orange] dark:text-white">WRONG: Missing var() wrapper</h2>
<div className="bg-[--bg-cream]">WRONG: Missing var() wrapper</div>
<div className="bg-gradient-to-br from-[--bg-cream] to-white">WRONG: Don't use from/to with variables</div>
```

**✅ CORRECT APPROACH - ALWAYS USE:**
```jsx
<!-- Option 1: Use style attribute with var() syntax (PREFERRED) -->
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">CORRECT: Using style with var()</p>
<h2 style={{ color: 'var(--primary-orange)' }} className="dark:text-white">CORRECT: Using style with var()</h2>

<!-- Option 2: Use helper classes defined in globals.css (BEST PRACTICE) -->
<div className="vs-text-navy dark:text-white">CORRECT: Using helper class</div>
<div className="vs-bg-cream dark:vs-bg-navy">CORRECT: Using helper class</div>

<!-- Option 3: Use Tailwind with var() wrapper (IF NECESSARY) -->
<span className="text-[var(--accent-coral)] dark:text-white/80">CORRECT: Using var() wrapper in class</span>
<div className="bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">CORRECT: Using var() wrapper in class</div>
```

## GRADIENT IMPLEMENTATION - NEVER USE TAILWIND GRADIENTS WITH VARIABLES

**❌ INCORRECT APPROACH - DO NOT USE:**
```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]">WRONG: Using Tailwind gradient with variable</div>
<div className="bg-gradient-to-r from-[--primary-orange] to-[--accent-coral]">WRONG: Using from/to with variables</div>
```

**✅ CORRECT APPROACH - ALWAYS USE:**
```jsx
<!-- Option 1: Use helper classes defined in globals.css (PREFERRED) -->
<div className="vs-gradient-light dark:vs-gradient-dark">CORRECT: Using predefined gradient class</div>
<div className="vs-btn-primary-gradient">CORRECT: Using component-specific gradient</div>

<!-- Option 2: Use inline style with CSS variables (IF NECESSARY) -->
<div style={{ 
  background: 'linear-gradient(to bottom right, white, var(--bg-cream))' 
}} className="dark:vs-gradient-dark">
  CORRECT: Using style with proper gradient and var()
</div>
```

## EVERY ELEMENT MUST HAVE BOTH LIGHT AND DARK MODE STYLES

**❌ MISSING DARK MODE:**
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>BROKEN: No dark mode style</div>
<p className="vs-text-navy">BROKEN: No dark mode class</p>
```

**✅ COMPLETE IMPLEMENTATION:**
```jsx
<!-- Option 1: Using style attribute with media query -->
<div 
  style={{ 
    backgroundColor: 'var(--bg-cream)', 
    '@media (prefers-color-scheme: dark)': {
      backgroundColor: 'var(--bg-navy)'
    }
  }}
>CORRECT: Both modes defined in style</div>

<!-- Option 2: Using helper classes with dark variant -->
<p className="vs-text-navy dark:text-white">CORRECT: Both modes defined with classes</p>

<!-- Option 3: Using conditional styling with theme context -->
<div style={{ backgroundColor: isDarkTheme ? 'var(--bg-navy)' : 'var(--bg-cream)' }}>
  CORRECT: Both modes handled in logic
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

## Critical Do's and Don'ts - ⚠️⚠️⚠️ UPDATED & CLARIFIED ⚠️⚠️⚠️

### DO NOT:
- ❌ NEVER use `className="text-[--color-var]"` without var() wrapper
- ❌ NEVER use Tailwind gradient classes with CSS variables
- ❌ NEVER use plain white backgrounds - ALWAYS use subtle gradients
- ❌ NEVER create animations without proper cleanup via useGSAP and gsap.context
- ❌ NEVER change grid layouts (grid-cols-*) under any circumstances
- ❌ NEVER implement quick fixes - identify and fix root causes

### DO:
- ✅ ALWAYS use style attributes with var(): `style={{ color: 'var(--text-navy)' }}`
- ✅ ALWAYS use var() wrapper in Tailwind: `className="text-[var(--text-navy)]"`
- ✅ ALWAYS use pre-defined helper classes for gradients: `className="vs-gradient-primary"` 
- ✅ ALWAYS implement both light AND dark mode for every component
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

### CSS Variable Usage Patterns - CRITICAL CLARIFICATION
- In CSS stylesheets: `var(--primary-orange)` ✅
- In JSX style attributes: `style={{ color: 'var(--primary-orange)' }}` ✅
- In Tailwind classes: NEVER use `text-[--primary-orange]` directly ❌
- In Tailwind classes: ALWAYS use `text-[var(--primary-orange)]` with var() wrapper ✅
- When possible, use helper classes defined in globals.css instead of inline styles

### Gradient Patterns - DO NOT USE DIRECTLY
- ❌ NEVER use Tailwind gradients like: `bg-gradient-to-r from-[--primary-orange] to-[--accent-coral]`
- ❌ NEVER use `from-[--variable]` syntax directly
- ✅ ALWAYS use predefined CSS classes in globals.css like:
  ```css
  .vs-gradient-primary {
    background: linear-gradient(to right, var(--primary-orange), var(--primary-orange-hover));
  }
  ```
- ✅ Or use inline styles with proper variable references:
  ```jsx
  style={{ 
    background: 'linear-gradient(to right, var(--primary-orange), var(--primary-orange-hover))' 
  }}
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

## Component Example with Complete Implementation

```jsx
function ExampleCard() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating elements - different for each mode */}
      <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
                    bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute bottom-10 right-5 w-24 h-24 rounded-[30%] -rotate-6 opacity-8
                    bg-[--primary-orange-hover] animate-float-medium hidden dark:hidden"></div>
                    
      {/* Dark mode floating elements */}
      <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
                    bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                    animate-float-slow hidden dark:block"></div>
      <div className="absolute bottom-10 right-5 w-24 h-24 rounded-[30%] -rotate-6 opacity-15
                    bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                    animate-float-medium hidden dark:block"></div>
                    
      {/* Card with proper styling for BOTH modes */}
      <div className="relative z-10 bg-gradient-to-br from-white to-[--bg-cream]/80
                    dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                    rounded-[--border-radius-lg] p-6 
                    shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                    dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                    transition-all duration-[--transition-bounce]
                    hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] 
                    dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]
                    hover:translate-y-[-4px] hover:scale-[1.02]">
        <h3 className="text-[--text-navy] dark:text-white text-xl mb-2">
          Card Title
        </h3>
        
        <p className="text-[--text-navy] dark:text-white/70 mb-4">
          This card has proper implementation for both light and dark mode.
        </p>
        
        <button 
          className="bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
                   dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                   text-white px-4 py-2 rounded-full 
                   shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                   dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
                   transition-all duration-[--transition-bounce]
                   hover:translate-y-[-3px] hover:scale-[1.03] 
                   hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                   dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]">
          Learn More
        </button>
      </div>
    </div>
  )
}
```

## Common Pitfalls to Avoid

### Dark Mode Implementation - UPDATED CRITICAL INFO
❌ **WRONG**:
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't switch in dark mode without logic</div>
<p className="text-[--text-navy]">WRONG - Missing var() wrapper</p>
<div className="bg-gradient-to-r from-[--primary-orange]">WRONG - Don't use Tailwind gradients with variables</div>
```

✅ **CORRECT**:
```jsx
<!-- Option 1: Style with theme context or class conditionals -->
<div 
  className="dark-mode-container" 
  style={{ backgroundColor: isDarkMode ? 'var(--bg-navy)' : 'var(--bg-cream)' }}
>Works correctly with conditionals</div>

<!-- Option 2: Helper classes (PREFERRED) -->
<div className="vs-bg-cream dark:vs-bg-navy">
  Works correctly with helper classes
</div>
<p className="vs-text-navy dark:text-white">
  Text with helper class and dark mode
</p>

<!-- Option 3: When necessary, use Tailwind with var() wrapper -->
<span className="text-[var(--primary-orange)] dark:text-white">
  ONLY when helper classes unavailable
</span>
```

### Gradient Implementation - UPDATED CRITICAL INFO
❌ **WRONG**:
```jsx
<div className="bg-white">Plain white background</div>
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80">WRONG - Don't use CSS variables in Tailwind gradients</div>
```

✅ **CORRECT**:
```jsx
<!-- Option 1: Use predefined helper classes (PREFERRED) -->
<div className="vs-gradient-light dark:vs-gradient-dark">
  Proper gradient with helper class for both modes
</div>

<!-- Option 2: Use inline style with CSS variables -->
<div style={{ 
  background: 'linear-gradient(to bottom right, white, var(--bg-cream))' 
}} className="dark:vs-gradient-dark">
  Proper gradient with inline styles
</div>

<!-- Option 3: Create component-specific gradient classes -->
<div className="hero-gradient">
  Proper gradient with custom class
</div>
```

### Animation Implementation
❌ **WRONG**:
```jsx
useEffect(() => {
  gsap.to(".element", { y: -10 });
  // No cleanup
}, []);
```

✅ **CORRECT**:
```jsx
useGSAP(() => {
  const ctx = gsap.context(() => {
    gsap.to(".element", { y: -10 });
  }, containerRef);
  
  return () => ctx.revert();
}, []);
```

## Debugging Light/Dark Mode Issues

If styling looks wrong in either mode, check for:

1. Using `text-[var(--variable)]` instead of `text-[--variable]` (This is the #1 cause of issues)
2. Missing `dark:text-[color]` class for text elements
3. Missing gradients (using plain colors instead)
4. Missing or inappropriate shadows for each mode
5. Animation issues (not using useGSAP and gsap.context)

REMEMBER: ALWAYS TEST IN BOTH LIGHT AND DARK MODE!

## Common Utility Classes

Use these utility classes for common styling patterns:

```jsx
// Spacing hover effect using VS Bubbly animation
<div className="hover-bubbly">
  Hovers with standard VS Bubbly animation
</div>

// More pronounced hover
<div className="hover-bubbly-lg">
  Hovers with larger VS Bubbly animation
</div>

// Subtle hover
<div className="hover-bubbly-sm">
  Hovers with subtle VS Bubbly animation
</div>

// Text shadow for dark mode
<div className="dark:text-shadow-md">
  Text with medium shadow in dark mode
</div>

// Rich gradient card
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 
              dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
              shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
              dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
  Card with proper gradients and shadows
</div>
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

## ⚠️⚠️⚠️ CRITICAL: AVOID TAILWIND GRADIENT SYNTAX ⚠️⚠️⚠️

**Tailwind gradient syntax (bg-gradient-to-*) is NOT WORKING properly in this project with CSS variables**

- ❌ Do NOT use `bg-gradient-to-b`, `bg-gradient-to-r`, etc. with CSS variables
- ❌ Do NOT use `from-[--variable-name]` or `to-[--variable-name]` syntax
- ❌ Do NOT use direct CSS variables in Tailwind classes without var() wrapper: `bg-[--var-name]` 
- ✅ Instead, create and use explicit CSS classes for gradients with proper naming
- ✅ Use inline styles with proper var() syntax: `style={{ background: 'linear-gradient(...)' }}`
- ✅ Prefer predefined helper classes: `vs-gradient-light`, `vs-btn-primary-gradient`, etc.

## CRITICAL MISSION: Fix Color Variable Syntax Throughout Codebase

1. **Colors & Backgrounds:**
   - ❌ Change all instances of `text-[--color-var]` to `style={{ color: 'var(--color-var)' }}` or helper class
   - ❌ Change all instances of `bg-[--color-var]` to `style={{ backgroundColor: 'var(--color-var)' }}` or helper class
   - ❌ Remove all `bg-gradient-to-*` that use CSS variables, replace with helper classes
   - ✅ Ensure all components have proper light/dark mode styling

2. **Floating Elements:**
   - ✅ Use predefined `vs-float-element-light-1`, `vs-float-element-dark-1` helper classes
   - ✅ Ensure all dark mode floating elements have `dark:block` class

3. **Shadows & Effects:**
   - ✅ Replace hardcoded shadow values with CSS variables or helper classes
   - ✅ Use `vs-card-shadow` helper class for consistent shadows

4. **IMPORTANT SEARCH TIPS:**
   - Search for `text-[--` or `bg-[--` to find incorrect variable usage
   - Search for `from-[--` to find incorrect gradient implementation
   - Look for components that don't have dark mode alternatives
