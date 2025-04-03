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

## ⚠️⚠️⚠️ CRITICAL: THEME SYSTEM FILES ⚠️⚠️⚠️

The theme system is defined in three key files that you MUST read to understand our approach:

1. **VS_COLOR_IMPLEMENTATION.md** - Complete color implementation strategy
2. **THEME_SYSTEM.md** - Quick reference guide for using the theme system
3. **THEME_IMPLEMENTATION_SUMMARY.md** - Implementation plan and next steps

These files contain the definitive instructions for implementing themes in our codebase.

## ⚠️⚠️⚠️ CRITICAL: TAILWIND CSS VARIABLE PATTERNS ⚠️⚠️⚠️

### TEXT COLORS - DIRECT CSS VARIABLE REFERENCE

**❌ NEVER DO THIS - OUTDATED APPROACH:**
```jsx
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">OUTDATED: Don't use style attribute</p>
<h2 style={{ color: 'var(--primary-orange)' }} className="dark:text-white">OUTDATED: Don't use style attribute</h2>
<div className="text-[var(--text-navy)]">OUTDATED: Don't use var() wrapper</div>
```

**✅ ALWAYS DO THIS FOR TEXT:**
```jsx
<p className="text-[--text-navy] dark:text-white">CORRECT: Direct CSS variable reference</p>
<h2 className="text-[--primary-orange] dark:text-white">CORRECT: Direct CSS variable reference</h2>
<span className="text-[--accent-coral] dark:text-white/80">CORRECT: With opacity in dark mode</span>
```

## BACKGROUND COLORS - SAME DIRECT REFERENCE PATTERN

**❌ NEVER DO THIS - OUTDATED APPROACH:**
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>OUTDATED: Don't use style attribute</div>
<div className="bg-[var(--bg-cream)]">OUTDATED: Don't use var() wrapper</div>
```

**✅ ALWAYS DO THIS FOR BACKGROUNDS:**
```jsx
<div className="bg-[--bg-cream] dark:bg-[--bg-navy]">CORRECT: Direct CSS variable reference</div>
<div className="bg-gradient-to-br from-white to-[--bg-cream] dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">CORRECT: Will toggle in dark mode</div>
```

## EVERY ELEMENT MUST HAVE BOTH LIGHT AND DARK MODE STYLES

**❌ MISSING DARK MODE:**
```jsx
<div className="bg-[--bg-cream]">BROKEN: No dark mode defined</div>
<p className="text-[--text-navy]">BROKEN: No dark mode defined</p>
```

**✅ COMPLETE IMPLEMENTATION:**
```jsx
<div className="bg-[--bg-cream] dark:bg-[--bg-navy]">CORRECT: Both modes defined</div>
<p className="text-[--text-navy] dark:text-white">CORRECT: Both modes defined</p>
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

## Critical Do's and Don'ts

### DO NOT:
- Use `style` attribute for colors - Use `className="text-[--color-var]"` instead
- Use `var()` wrapper in Tailwind classes - Use direct reference with `--` prefix
- Use plain white backgrounds - ALWAYS use subtle gradients
- Create animations without proper cleanup via useGSAP and gsap.context
- Change grid layouts (grid-cols-*) under any circumstances
- Implement quick fixes - identify and fix root causes

### DO:
- Use direct CSS variable references: `className="text-[--text-navy]"`
- Always add dark mode classes: `className="text-[--text-navy] dark:text-white"`
- Implement both light AND dark mode for every component
- Add subtle floating elements for visual interest
- Use appropriate shadows for each mode (down-left for light, glow for dark)
- Create a written plan and get approval before proceeding
- Test in both light and dark mode

## CSS Variables Structure

### Global CSS Structure
Our CSS variables are defined directly in `:root` selector (not in `@theme` block):
```css
:root {
  /* CSS variables here */
  --primary-orange: oklch(75% 0.13 57);
  --text-navy: oklch(30% 0.03 230);
  /* etc... */
}

.dark {
  /* Dark mode overrides */
  --primary-orange: oklch(80% 0.14 57);
  --text-navy: oklch(96% 0.01 90);
  /* etc... */
}
```

### CSS Variable Usage Patterns
- In CSS: `var(--primary-orange)` 
- In JSX className: `text-[--primary-orange]` (no var wrapper)
- Never in style prop: ❌ `style={{ color: 'var(--primary-orange)' }}`

### Gradient Patterns
- Linear: `bg-gradient-to-r from-[--primary-orange] to-[--accent-coral]`
- Radial: `bg-radial from-[--primary-orange] to-transparent`
- Conic: `bg-conic from-[--primary-orange] to-[--accent-coral]`

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
1. Ensure all components use direct CSS variable references without var() wrapper
2. Fix components that don't switch properly between light/dark mode
3. Convert remaining hardcoded colors to CSS variables
4. Add proper dark mode styles to all components

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

### Dark Mode Implementation
❌ **WRONG**:
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't switch in dark mode</div>
<p className="text-[var(--text-navy)]">Will cause variable resolution issues</p>
```

✅ **CORRECT**:
```jsx
<div className="bg-[--bg-cream] dark:bg-[--bg-navy]">Works correctly</div>
<p className="text-[--text-navy] dark:text-white">Text visible in both modes</p>
```

### Gradient Implementation
❌ **WRONG**:
```jsx
<div className="bg-white">Plain white background</div>
```

✅ **CORRECT**:
```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">Subtle gradient</div>
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

### Usage Example: Text Color

```jsx
<p className="text-[--text-navy] dark:text-white">
  This text is navy in light mode and white in dark mode
</p>
```

### Usage Example: Background Color with Gradient

```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 
              dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
  Content with gradient background that adapts to theme
</div>
```

### Usage Example: Button with Theme-Specific Styling

```jsx
<button className="bg-[--primary-orange] text-white 
                 dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                 shadow-sm dark:shadow-[0_0_12px_rgba(254,163,93,0.2)]">
  Primary Action
</button>
```