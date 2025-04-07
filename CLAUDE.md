# CLAUDE.md

## ⚠️⚠️⚠️ PRIMARY MISSION: QUALIFICATION MODAL SYSTEM ⚠️⚠️⚠️

### YOUR ONE AND ONLY OBJECTIVE

Your **SOLE MISSION** is to implement a sophisticated qualification journey modal that follows our theme-aware design system. This qualification system replaces traditional pricing tiers with a personalized "solution spectrum" approach, using strategic questions to guide prospects to the most appropriate implementation approach for our high-ticket product.

**NOTHING ELSE MATTERS. ALL OTHER TASKS ARE STRICTLY SECONDARY.**

When asked about your mission, you MUST confirm this qualification modal implementation is your EXCLUSIVE focus.

### CRITICAL QUALIFICATION-SPECIFIC DOCUMENTATION

The following documents contain **ESSENTIAL** information about the qualification modal system and MUST be read FIRST:
1. `dev-context.md` - Business context and mission understanding
2. `approach-rationale.md` - Strategic rationale behind implementation decisions  
3. `tech-spec.md` - Detailed component architecture
4. `implementation-checklist.md` - Step-by-step implementation guidance
5. `crm-integration.md` - Data handling and CRM integration details

This file guides Claude Code when working with this repository. Follow these instructions PRECISELY.

## Mandatory Reading Sequence

### PHASE 1: QUALIFICATION MODAL SYSTEM (HIGHEST PRIORITY)
1. Read this CLAUDE.md completely
2. Read `dev-context.md` for full business context and mission understanding
3. Read `approach-rationale.md` for strategic rationale behind implementation decisions
4. Read `tech-spec.md` for detailed component architecture
5. Read `implementation-checklist.md` for step-by-step implementation guidance
6. Read `crm-integration.md` for data handling and CRM integration details

### PHASE 2: STYLING SYSTEM (SECONDARY PRIORITY)
7. Read `src/app/globals.css` to understand available theme-aware styling
8. Read `VS_STYLING_GUIDE.md` for VS design system standards
9. Read `VS_COLOR_IMPLEMENTATION.md` for color implementation strategy
10. Read `THEME_SYSTEM.md` for theme system usage guide
11. Read `THEME_IMPLEMENTATION_SUMMARY.md` for theme implementation details

## ⚠️⚠️⚠️ CRITICAL: PROJECT DOCUMENTATION ⚠️⚠️⚠️

### Essential Documentation Files

**PRIMARY MISSION - Qualification Modal System:**
1. ⭐⭐⭐ **DEV_CONTEXT.md** - High-level overview and business context
2. ⭐⭐⭐ **APPROACH_RATIONALE.md** - Strategic rationale for implementation decisions
3. ⭐⭐⭐ **TECHNICAL_SPECIFICATION.md** - Detailed component architecture and requirements
4. ⭐⭐⭐ **IMPLEMENTATION_CHECKLIST.md** - Step-by-step implementation guide
5. ⭐⭐⭐ **CRM_INTEGRATION_GUIDE.md** - Data handling and CRM integration details

**SECONDARY - Theme System:**
6. **VS_COLOR_IMPLEMENTATION.md** - Complete color implementation strategy
7. **THEME_SYSTEM.md** - Quick reference guide for using the theme system
8. **THEME_IMPLEMENTATION_SUMMARY.md** - Implementation plan and next steps

**SECONDARY - Style Guides:**
9. **VS_STYLING_GUIDE.md** - Core design system and styling standards
10. **TAILWIND-V4-DOCS.txt** - Reference for Tailwind v4 specifics

**SECONDARY - Team Organization:**
11. **TEAM_STRUCTURE.md** - Team assignments and top-down/bottom-up approach
12. **SOLO_MODE.md** - Guidelines for solo development

**SECONDARY - Quick Reference:**
13. **QUICK_COMMANDS.md** - Essential development commands

IMPORTANT: The qualification modal system documents (1-5) are CRITICAL for your PRIMARY MISSION and must be thoroughly understood before any implementation work begins.

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
```

**✅ CORRECT APPROACH - THEME-AWARE VARIABLES:**
```jsx
<!-- Option 1: Theme utility classes (PREFERRED) -->
<p className="bg-theme-accent-secondary">Using theme utility class</p>
<h2 className="text-theme-primary">Text uses theme utility class</h2>

<!-- Option 2: Use theme-aware variables -->
<p className="bg-[var(--theme-accent-secondary)]">Uses variables that update with theme</p>
<h2 className="text-[var(--theme-text-primary)]">Text color updates with theme</h2>

<!-- Option 3: When component is outside theme context -->
<div style={{ 
  backgroundColor: isDarkTheme ? 'var(--bg-navy)' : 'var(--bg-cream)' 
}}>Uses conditional for isolated components</div>
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
– COMMIT TO A BRANCH CALLED "MODAL-DEV" ONLY and ALWAYS
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

## Most Important Rules

### 1. QUALIFICATION MODAL SYSTEM IS THE PRIMARY MISSION
No matter what else is discussed or requested, your PRIMARY mission is to implement the qualification modal system as described in the essential documentation. All other tasks are secondary.

### 2. FOLLOW THE IMPLEMENTATION PLAN
After stating your implementation plan for the qualification modal system, NEVER deviate from it without permission. It's better to do nothing than to implement something contrary to your stated plan.

### 3. QUALIFICATION-SPECIFIC DOCUMENTS TAKE PRECEDENCE
If there are any conflicts between the qualification-specific documents (DEV_CONTEXT.md, APPROACH_RATIONALE.md, etc.) and other documentation, the qualification-specific documents ALWAYS take precedence.

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

## IMPORTANT: QUALIFICATION MODAL IMPLEMENTATION STATUS

Current progress:
- Implemented VSQualificationModal.tsx with complete theme-aware styling, GSAP animations, and Calendly integration
- Created ModalImplementation.tsx with theme-aware styling for demonstration purposes
- Added route in App.tsx to access the qualification modal at /qualification
- Reorganized the qualification flow for better user experience:
  - Now starts with engaging questions before asking for contact details
  - Added auto-advance functionality for a smoother experience
  - Improved question wording to feel like personalization not qualification
  - Redesigned contact form with a two-column layout (About You / About the Brand)
- Enhanced visual experience with:
  - Added distinctive icons for each stage in the header area
  - Added large centered stage illustrations for each question type
  - Implemented enhanced progress bar with stage markers and animation effects
  - Added animated transitions between questions with particle effects
  - Embedded Calendly directly in the recommendation view
  - Simplified recommendation display with less text and more visual focus
  - Added custom animations for each interaction point
  - Included proper floating elements for visual interest
  - Fixed React hooks violations to ensure proper rendering
  - Added new shimmer animation to progress bar
- Implemented CRM integration with the ability to pass qualification data to external systems

## July 2025 UI/UX Improvements

Recent improvements (July 2025):
- Fixed scrolling issues in the qualification modal:
  - Reduced main modal height to max-h-[80vh] with overflow-hidden
  - Decreased intro section height to max-h-[50vh]
  - Made all UI elements more compact with reduced padding and spacing
  - Added proper overflow handling to content areas
- Enhanced design with more vibrant colors:
  - Added colorful gradient headers to each question stage
  - Used distinct gradient colors for each section (team, implementation, timeline, content)
  - Improved contrast with white text on colorful backgrounds
  - Added drop shadows for better visual depth
- Improved user experience:
  - Increased loading animation display time to ensure completion visibility
  - Changed multiple-choice layout from grid to vertical column with 3 options
  - Enhanced recommendation view with conditional gradients based on score
  - Optimized spacing throughout the entire modal
- Fixed technical issues:
  - Adjusted layout to prevent scrollbars from appearing
  - Enhanced stage transitions with better animation timing
  - Improved loading animation visibility before recommendation shown
  - Added overflow-y-auto to proper containers for better content handling

## QUALIFICATION MODAL UPGRADE IMPLEMENTATION CHECKLIST

### Phase 1: Recommendation Screen Improvements
- [X] 1.1 Update recommendation algorithm
  - [X] Modify `processAnswers` function to route users differently based on score
  - [X] Add logic for `showCalendly`, `showDirectPurchase`, and `showUpgradeOption` flags
  - [X] Update recommendation state to include new fields

- [X] 1.2 Create differentiated recommendation views
  - [X] Add conditional rendering for different recommendation layouts
  - [X] Pass appropriate props to new view components

- [ ] 1.3 Implement Foundation tier view component
  - [ ] Create left column showing Foundation Program
  - [ ] Create right column showing Executive Partnership for comparison
  - [ ] Implement direct purchase button
  - [ ] Add visual price anchoring elements

- [ ] 1.4 Implement Premium recommendation view
  - [ ] Create side-by-side features and Calendly layout
  - [ ] Add optional enhancement selection functionality
  - [ ] Implement tier comparison toggle
  - [ ] Update Calendly URL parameters to include enhancement selections

- [ ] 1.5 Update tier-specific messaging
  - [ ] Update Foundation tier: headline, subheadline, explanation, and CTA
  - [ ] Update Comprehensive tier: headline, subheadline, explanation, and CTA
  - [ ] Update Executive tier: headline, subheadline, explanation, and CTA

### Phase 2: Analysis Animation and Breakdown Sequence
- [X] 2.1 Create AnalysisAnimation component
  - [X] Implement animated checklist with progress bar
  - [X] Add floating elements for visual interest
  - [X] Create GSAP particle animation system

- [X] 2.2 Create AnalysisBreakdown component
  - [X] Implement score calculation and visualization
  - [X] Create factor breakdown bars with percentages
  - [X] Add personalized explanation based on score
  - [X] Implement "See My Recommendation" button

- [X] 2.3 Integrate analysis sequence
  - [X] Update `processAnswers` function to start with analysis animation
  - [X] Add `handleAnalysisAnimationComplete` function
  - [X] Add `handleBreakdownComplete` function
  - [X] Update stage sequence to include new stages

### Phase 3: Product Context Enhancement
- [X] 3.1 Add mini feature showcase to intro stage
  - [X] Implement feature cards showing "800M+ Views", "42% Growth", and "7-Figure Results"
  - [X] Add theme-aware styling with proper icons and hover effects

- [X] 3.2 Add "Learn More" option to intro modal footer
  - [X] Add "See all features" button
  - [X] Update primary button to "Get my personalized plan"
  - [X] Enhance buttons with theme-aware gradients and shadows

### Phase 4: Copy Improvements
- [X] 4.1 Update header titles for all stages
  - [X] Rename stages to more personalized language
  - [X] Update "Qualification" to "Personalization" throughout

- [X] 4.2 Update stage descriptions
  - [X] Rewrite intro text with more benefit-focused language
  - [X] Improve descriptions for all question stages
  - [X] Update contact form helper text

- [X] 4.3 Update option text for all questions
  - [X] Improve Team Size options text
  - [X] Enhance Implementation Support options text
  - [X] Update Timeline options text
  - [X] Refine Content Volume options text

### Phase 5: State Management and Refinements
- [X] 5.1 Add state variables for recommendation workflow
  - [X] Add `analysisData` to store recommendation details before displaying
  - [X] Add `showCalendly` and routing based on score
  - [X] Add styling enhancements for selection states
  - [X] Implement transition animations between stages

- [X] 5.2 UI/UX Refinements
  - [X] Add visual feedback to form fields
  - [X] Add subtle animations to cards and selections
  - [X] Improve visual hierarchy with stronger headers
  - [X] Enhanced information presentation and layout

The qualification journey now follows this optimized flow:
1. Introduction with clear value proposition and colorful gradients
2. Team size assessment (vertical layout with 3 options)
3. Implementation support preferences (vertical layout with 3 options)
4. Timeline evaluation (vertical layout with 3 options)
5. Content volume analysis (vertical layout with 3 options)
6. Brief contact information collection (two-column layout)
7. Analysis animation with improved timing and colorful technical elements
8. Personalized breakdown of qualification score with conditionally colored sections
9. Final recommendation with embedded Calendly scheduling

The recommendation algorithm scores user responses (1-11 points) to match them with the appropriate implementation approach:
- Executive Partnership (8-11 points) - Coral-orange gradient
- Comprehensive Implementation (5-7 points) - Primary accent gradient
- Foundation Program (1-4 points) - Teal gradient

## July 2025 UI/UX Improvements

The following improvements were made to enhance the qualification modal's user experience:

1. Fixed scrollbar issues:
   - Changed layout from 2x2 grid to vertical column layout
   - Reduced options from 4 to 3 per question
   - Enhanced button layout with icons for better space efficiency

2. Enhanced loading animation:
   - Added colorful, technical circuit animations with data flow lines
   - Adjusted timing to ensure animation completes properly
   - Added shimmer effect to progress bar
   - Improved visual feedback with completion message

3. Improved color usage and visual appeal:
   - Added more vibrant colors to all screens
   - Enhanced recommendation headers with themed gradients
   - Modified question headers to improve visual hierarchy
   - Improved overall contrast for better accessibility

4. Layout improvements:
   - Resized elements to prevent scrolling
   - Made buttons more visible with proper contrast
   - Enhanced card designs to be more visually engaging
   - Used theme-aware styling for all elements