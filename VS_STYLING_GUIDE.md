# VS Styling Guide

This document provides comprehensive guidance for implementing VS's unique styling system in both light and dark modes.

## The VS Brand Vision

Our design system creates a **vibrant premium experience** that balances creative energy with professional polish. The VS aesthetic is distinguished by:

- **Strategic vibrancy** - Bold colors used thoughtfully, not overwhelming
- **Depth through subtle details** - Gradients, shadows, and floating elements
- **Playful motion** - More pronounced animations than typical corporate sites
- **Professional foundation** - Clean layouts with clear hierarchy

## ⚠️ CRITICAL: TAILWIND V4 DARK MODE IMPLEMENTATION ⚠️

### FUNDAMENTAL CLARIFICATION
The CSS files now use the Tailwind v4 `@custom-variant dark` approach with `@variant(dark)` blocks for theme toggling. This lets us define CSS variables just once and swap their values in dark mode.

### Using the New Tailwind V4 Approach

Our globals.css defines dark mode with:
```css
@custom-variant dark (&:where(.dark, .dark *));
```

And then updates CSS variables in dark mode with:
```css
@variant(dark) {
  :root {
    --bg-cream: oklch(0.12 0.03 240);
    --text-navy: oklch(0.96 0.01 90);
    /* other variables */
  }
}
```

### Theme-Aware Variables for Components

**❌ PROBLEMATIC APPROACH - COMPETING STYLES:**
```jsx
<p className="text-[--text-navy] dark:text-white">Competing styles cause maintenance issues</p>
<div className="bg-[--bg-cream] dark:bg-[--bg-navy]">Competing background styles</div>
```

**✅ RECOMMENDED APPROACH - THEME-AWARE VARIABLES:**
```jsx
<p className="text-[var(--theme-text-primary)]">Uses a variable that updates with theme</p>
<div className="bg-[var(--theme-bg-primary)]">Uses theme-aware background</div>
```

Or even better, use theme utility classes:
```jsx
<p className="text-theme-primary">Uses theme utility class</p>
<div className="bg-theme-surface">Uses theme background utility</div>
```

These theme-aware variables are defined in globals.css:
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

## Complete Vision for Light Mode

Light mode is NOT just "default styling" - it requires specific implementation:

### Light Mode Core Elements

1. **NO PLAIN WHITE** - Always use subtle gradients instead of flat white
   ```jsx
   {/* CORRECT - Subtle gradient background */}
   <div className="bg-gradient-to-br from-white to-[--bg-cream]/80">Content</div>
   
   {/* WRONG - Plain white */}
   <div className="bg-white">Content</div>
   ```

2. **Subtle, Directional Shadows** - A few pixels down and to the left, very low opacity
   ```jsx
   <div className="shadow-[2px_2px_8px_rgba(0,0,0,0.05)]">
     Content with proper light mode shadow
   </div>
   ```

3. **Low-Opacity Floating Elements** - To create visual interest and depth
   ```jsx
   <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
                 bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
   ```

4. **Texture Patterns** - Subtle background textures at very low opacity
   ```jsx
   <div className="bg-[radial-gradient(rgba(18,46,59,0.08)_1px,transparent_1px)] bg-size-[20px_20px]">
     Content with dot pattern background
   </div>
   ```

5. **Warm Color Palette** - Cream backgrounds with orange and teal accents
   ```jsx
   <div className="bg-[--bg-cream] border-[--primary-orange-light]">
     Content with proper light mode colors
   </div>
   ```

## Complete Vision for Dark Mode

Dark mode requires rich, vibrant implementation with depth and interest:

### Dark Mode Core Elements

1. **Rich Gradients** - Deep, layered backgrounds with subtle color shifts
   ```jsx
   <div className="dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
     Content with rich dark mode gradient
   </div>
   ```

2. **Elevated Glow Effects** - Soft, colorful glows that create depth
   ```jsx
   <div className="dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
     Content with proper dark mode glow
   </div>
   ```

3. **Vibrant Floating Elements** - Same elements but with higher opacity and glow
   ```jsx
   <div className="absolute top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
                 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                 animate-float-slow hidden dark:block"></div>
   ```

4. **Enhanced Texture Patterns** - More visible in dark mode
   ```jsx
   <div className="dark:bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-size-[20px_20px]">
     Content with enhanced dark mode pattern
   </div>
   ```

5. **Vibrant Accent Colors** - Slightly brighter and more pronounced accents
   ```jsx
   <button className="dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                     dark:shadow-[0_0_15px_rgba(254,163,93,0.2)]">
     Button with proper dark mode styling
   </button>
   ```

## Floating Elements Implementation

Floating elements add subtle visual interest and depth without distracting. They should be:
- Almost imperceptible in light mode (opacity 0.05-0.1)
- Slightly more visible in dark mode (opacity 0.1-0.15)
- Different between light and dark modes
- Simple geometric shapes with high border-radius
- Set to subtle, slow animations

```jsx
function ComponentWithFloatingElements() {
  return (
    <div className="relative overflow-hidden">
      {/* Light mode floating elements */}
      <div className="absolute top-10 right-5 w-20 h-20 rounded-[40%] rotate-12 opacity-5 
                    bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-8
                    bg-[--secondary-teal-light] animate-float-medium hidden dark:hidden"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-10 right-5 w-20 h-20 rounded-[40%] rotate-12 opacity-10 
                    bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                    animate-float-slow hidden dark:block"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-15
                    bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                    animate-float-medium hidden dark:block"></div>
      
      {/* Actual content */}
      <div className="relative z-10">
        Content goes here
      </div>
    </div>
  );
}
```

The animations are defined in our globals.css file:
```css
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 12deg)); }
  50% { transform: translateY(-10px) rotate(var(--tw-rotate, 12deg)); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, -6deg)); }
  50% { transform: translateY(-8px) rotate(var(--tw-rotate, -6deg)); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}
```

## "VS Bubbly" Animation Style

Our animations are approximately 20% more pronounced than typical corporate sites - creating a playful, creative feel without sacrificing professionalism.

### Enhanced Hover Effects

```css
/* Standard corporate hover */
.standard-hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* VS "bubbly" hover - 20% more pronounced */
.hover-bubbly:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}
```

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

## Component Examples with Complete Implementation

### Card with Both Light and Dark Styling

```jsx
<div className="relative overflow-hidden">
  {/* Floating elements - light and dark mode versions */}
  <div className="absolute -z-10 top-20 right-0 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
               bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
  <div className="absolute -z-10 top-20 right-0 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
               bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
               animate-float-slow hidden dark:block"></div>
  
  {/* Card with proper styling for BOTH modes */}
  <div className="relative z-10 bg-gradient-to-br from-white to-[--bg-cream]/80
               dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
               rounded-[--border-radius-lg] p-6 
               shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
               dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
               transition-all duration-[--transition-bounce]
               hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]
               hover:translate-y-[-4px] hover:scale-[1.02]">
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
                  flex items-center justify-center mb-4">
      <Icon className="text-white" />
    </div>
    
    <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-2">
      Feature Title
    </h3>
    
    <p className="text-[--text-navy] dark:text-white/70">
      Feature description with proper implementation for both light and dark mode.
    </p>
  </div>
</div>
```

### Button with Complete Implementation

```jsx
<button 
  className="bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]
           dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
           text-white px-6 py-3 rounded-[--border-radius-full] 
           shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
           dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
           transition-all duration-[--transition-bounce]
           hover:translate-y-[-3px] hover:scale-[1.03] 
           hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
           dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]">
  Primary Action
</button>
```

### CourseStats Component

This component maintains its unique vibrant color scheme with proper implementation for both modes:

```jsx
<div className="stat-item">
  <div className="relative bg-gradient-to-br from-white to-[--bg-cream]/90
                dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                rounded-[--border-radius-lg] p-6 
                border border-white/40 dark:border-white/5 
                shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
                dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                transition-all duration-[--transition-bounce]
                hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)]
                dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]
                group">
    
    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      {/* Icon with playful springy animation */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4
                    bg-[--primary-orange] 
                    dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                    transform transition-all duration-[--transition-bounce]
                    group-hover:scale-[1.15] group-hover:translate-y-[-2px]">
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      {/* Value with enhanced scale effect */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2
                    text-[--primary-orange] dark:text-white
                    transition-all duration-[--transition-bounce]
                    group-hover:scale-[1.15]">
        {value}
      </div>
      
      {/* Label */}
      <div className="text-[--text-navy] dark:text-white/80 text-sm md:text-base font-medium">
        {label}
      </div>
    </div>
  </div>
</div>
```

## Achieving the Perfect Balance

The VS brand uniquely balances creative energy with professional polish through the 80/20 rule:

- **80% Professional Structure**
  - Clean grid layouts and consistent spacing
  - Professional typography with clear hierarchy
  - Consistent component patterns
  - Thoughtful color usage with proper contrast
  
- **20% Creative Energy**
  - Enhanced "bubbly" animations (more pronounced than corporate sites)
  - Vibrant accent colors used strategically
  - Playful interaction details (subtle rotations, floating elements)
  - Subtle floating elements and texture patterns

### Creating the VS Balance

1. **Start with Structure**
   - Begin with a solid, professional foundation
   - Establish clear information hierarchy
   - Use the grid system for alignment
   - Ensure all content is readable and accessible

2. **Add Creative Energy Selectively**
   - Enhance key interactions with "VS Bubbly" animations
   - Apply vibrant colors to focal points
   - Add subtle creative details that reward attention
   - Use subtle rotations, gradients, and shadows for depth

3. **Apply the "One Step Beyond" Rule**
   - Take typical corporate styling and go one step beyond (not three)
   - Animations: 20% more pronounced than standard corporate sites
   - Colors: 20% more vibrant in key areas
   - Interactions: 20% more playful and responsive

4. **Maintain Professional Guardrails**
   - Never sacrifice readability for style
   - Ensure all animations have purpose
   - Keep color usage focused and intentional
   - Maintain consistent spacing and alignment

## Critical Technical Guidelines

### Theme-Aware Variables in Tailwind v4

**❌ PROBLEMATIC - Competing Styles:**
```jsx
<p className="text-[--text-navy] dark:text-white">Competing styles cause maintenance issues</p>
```

**✅ RECOMMENDED - Theme-Aware Variables:**
```jsx
<p className="text-[var(--theme-text-primary)]">Uses a variable that updates with theme</p>
<p className="text-theme-primary">Uses a utility class that handles theming</p>
```

### Theme-Aware Alternative to Style Attributes

**❌ PROBLEMATIC - Non-Responsive Styling:**
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't update with theme changes</div>
```

**✅ RECOMMENDED - Theme-Aware Approach:**
```jsx
<div className="bg-[var(--theme-bg-primary)]">Uses theme-aware variable</div>
<div className="bg-theme-surface">Uses theme utility class</div>
```

### Plain White Elimination

**❌ WRONG - Plain white is not allowed:**
```jsx
<div className="bg-white p-6">Plain white content</div>
```

**✅ CORRECT - Always use subtle gradients:**
```jsx
<div className="bg-gradient-to-br from-white to-[--bg-cream]/80 p-6">
  Subtle gradient content
</div>
```

### Animation Implementation

**❌ WRONG - No cleanup, potential memory leaks:**
```jsx
useEffect(() => {
  gsap.to(".element", { y: -10 });
  // No cleanup
}, []);
```

**✅ CORRECT - Proper GSAP usage with cleanup:**
```jsx
useGSAP(() => {
  const ctx = gsap.context(() => {
    gsap.to(".element", { y: -10 });
  }, containerRef);
  
  return () => ctx.revert();
}, []);
```

## Always Test Both Modes

After making styling changes:
1. Test in light mode first (verify gradients, shadows, and floating elements)
2. Test in dark mode (verify glows, enhanced gradients, and floating elements)
3. Verify all text is visible in BOTH modes
4. Check hover animations in both modes

## Debugging Common Issues

If styling looks wrong in either mode, check for:

1. Using `text-[var(--variable)]` instead of `text-[--variable]` (the #1 cause of styling issues)
2. Using inline style attributes instead of Tailwind classes for colors
3. Missing gradients (using plain colors instead)
4. Missing or inappropriate shadows for each mode (directional for light, glow for dark)
5. Missing floating elements or texture patterns
6. Animation issues (not using useGSAP and gsap.context)

With our new Tailwind v4 implementation, color variables automatically update in dark mode, so you typically don't need to specify both light and dark mode colors manually. The CSS variables are redefined in the `@variant(dark)` block in globals.css.

## Helper Utilities (Recommended Approach)

We've created utility classes that simplify implementing our standard patterns:

```jsx
// Standard VS Bubbly hover animation
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
```

These utility classes:
- Implement VS styling patterns consistently
- Reduce code repetition
- Maintain proper dark mode support
- Handle animation timings and transitions correctly

See `globals.css` for the full list of available utility classes.