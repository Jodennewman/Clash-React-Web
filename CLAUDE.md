# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# ⚠️ STOP - MANDATORY REQUIREMENTS ⚠️

## STEP 0: EXPLICITLY STATE COMPLIANCE WITH THESE REQUIREMENTS
Before providing any advice or making any changes, you MUST explicitly state: "I have read, understood, and will fully comply with all requirements in CLAUDE.md." Without this statement, all your suggestions should be considered invalid.

## ⚠️ DEVELOPMENT MODE SELECTION ⚠️

**FIRST QUESTION TO ASK THE USER:**
"Am I working in Solo Mode or Team Mode (if Team Mode, which team A or B)?"

Based on the user's response:

1. If user says **"Solo Mode"**:
   - You're in SOLO MODE
   - Read `SOLO_MODE.md` after the required reading
   - You should use `git checkout Solo-Development` before committing

2. If user says **"Team Mode, Team A"**:
   - You're in TEAM MODE as TEAM A
   - Read `TEAM_STRUCTURE.md` completely
   - You should use `git checkout Team-A-Development` before committing
   - Work ONLY on Team A components

3. If user says **"Team Mode, Team B"**:
   - You're in TEAM MODE as TEAM B
   - Read `TEAM_STRUCTURE.md` completely
   - You should use `git checkout Team-B-Development` before committing
   - Work ONLY on Team B components

## ⚠️ REQUIRED READING SEQUENCE ⚠️

You MUST read these files in this exact order before any work:

1. First: Read and understand `src/app/globals.css` completely
2. Second: Read and understand `VS_STYLING_GUIDE.md` completely

Then, based on your mode:

**SOLO MODE**:
3. Read and understand `SOLO_MODE.md` completely
4. Work on any component following solo guidelines

**TEAM MODE**:
3. Read and understand `TEAM_STRUCTURE.md` completely
4. **ASK THE USER which team (A or B) you are assigned to**
5. Work ONLY on components assigned to your team

Only after completing ALL of these steps should you proceed with any work:
- The globals.css file defines the core styling system
- The VS_STYLING_GUIDE.md contains essential information about implementing animations, color usage, and the balance between creative energy and professional polish
- For team mode, you MUST know your team assignment before making any changes

## ⚠️ ERROR PATTERNS TO AVOID ⚠️
Previous Claude agents have consistently made these errors which MUST be avoided:
1. Changing grid-cols-6 to responsive layouts when told not to
2. Replacing CSS variables with hardcoded hex values
3. Modifying vibrant colors that should be preserved
4. Implementing "solutions" without understanding the styling system
5. Continuing with flawed approaches when asked to stop
6. Deviating from stated plans without explanation
7. Making multiple changes at once instead of targeted fixes
8. Not implementing the "VS Bubbly" animation style (20% more pronounced than typical corporate sites)

## MANDATORY CHECKLIST - COMPLETE BEFORE ANY WORK

### ALL MODES
- [ ] I have read and understood src/app/globals.css completely
- [ ] I have read and understood VS_STYLING_GUIDE.md completely
- [ ] I understand all CSS variables and theme implementation
- [ ] I accept that original vibrant colors in course-stats must be preserved exactly
- [ ] I will never change grid layouts without explicit permission
- [ ] I will never use hardcoded hex values except in specified exceptions
- [ ] I will maintain all responsive layouts as they are
- [ ] I will clearly state my plan and NEVER deviate from it
- [ ] I will NEVER run `npm run dev` directly (causes freezing!)
- [ ] If I need to run the dev server, I will use: 
  ```bash
  npm run build
  ```

### TEAM MODE ONLY
- [ ] I have read and understood TEAM_STRUCTURE.md completely
- [ ] I have confirmed with the user which team I am assigned to (A or B)
- [ ] I will ONLY work on components assigned to my team
- [ ] I will use the correct team branch (Team-A-Development or Team-B-Development)
- [ ] I will prefix all commits with "A:" or "B:" according to my team

### SOLO MODE ONLY
- [ ] I have read and understood SOLO_MODE.md completely
- [ ] I am working on the Solo-Development branch
- [ ] I will prefix all commits with "Solo:"

## CRITICAL CONSTRAINTS - VIOLATIONS WILL REQUIRE COMPLETE REWORK
1. DO NOT modify grid layouts (grid-cols-*) under any circumstances
2. DO NOT replace CSS variables with hardcoded values except where explicitly allowed
3. DO NOT implement "quick fixes" - identify and fix the root cause instead
4. DO NOT change any responsive behavior
5. DO NOT make assumptions about the codebase - verify before changing
6. DO NOT EVER deviate from your stated plan - if you need to change approach, STOP and explain why

## REQUIRED WORKFLOW FOR ALL COMPONENT CHANGES
1. First examine the component structure without making changes
2. Create a written plan and get approval before proceeding
3. Make minimal, targeted changes that address only the specific issue
4. Test in both light and dark mode before submitting
5. Verify your changes did not affect layout, responsiveness, or color scheme

## STYLING ISSUE DECISION TREE
1. Is the issue with text visibility? 
   → Check the application of CSS variables, not the variables themselves
2. Is the issue with dark mode? 
   → Check the class application, not the variables
3. Is the issue with layout? 
   → Never modify grid-cols-* values

## MOST IMPORTANT RULE
**AFTER STATING YOUR PLAN, NEVER DEVIATE FROM IT WITHOUT EXPLICIT PERMISSION**
- If you discover a better approach, STOP and explain
- If you encounter an issue, STOP and explain
- If you're uncertain, STOP and ask for clarification
- Better to do nothing than to do something contrary to your stated plan

## THE PRINCIPLE OF LEAST SURPRISE
- Make the smallest possible change that resolves the issue
- Preserve existing behavior in all other aspects
- Never introduce changes that weren't explicitly requested
- When in doubt, follow existing patterns in the codebase

## STRICT ADHERENCE TO DESIGN SYSTEM

- Once you understand globals.css, use ONLY those styling patterns and variables
- All styling changes MUST conform to the design system in globals.css and CLAUDE.md
- Never introduce new colors or styling approaches not already present in the system
- If a component has a specific color scheme that doesn't fit the global variables:
  1. DO NOT change the colors to match global variables without explicit permission
  2. DO NOT use hardcoded hex values - convert to OKLCH format for compatibility
  3. ADD a well-named class with the specific color using OKLCH
  4. DOCUMENT the exception in code comments

- Example of preserving a specific color correctly:
  ```css
  /* Special case: Preserving original course-stats orange while making compatible */
  .course-stats-orange {
    color: oklch(75% 0.13 57); /* #FEA35D converted to OKLCH */
  }
  ```

- COLOR CHANGE PERMISSION:
  - NEVER drastically change a color without explicit permission
  - If a color seems out of place with the design system, STOP and ask
  - Always explain the current color and the proposed change before making it
  - Include OKLCH and hex values in your explanation

## Current Issues

- The horrible mess made in previous chats has completely broken components
- Original vibrant colors in course-stats must be preserved exactly as they were
- Text is currently unreadable in both light and dark modes
- Gradients are not implemented correctly
- Many components don't switch properly between light and dark mode

## Next Steps

1. Fix course-stats.tsx component first as highest priority
2. Fix all components that don't work properly in both light and dark mode
3. Make sure to use CORRECT variables from globals.css
4. Test all components in both modes to ensure they work properly

# Immediate Priorities

## 1. Fix Course Stats Component Styling
- ⚠️ **URGENT**: The course-stats.tsx component requires specific styling that maintains its unique color scheme
- **DO NOT** replace the unique vibrant colors in the stat cards with theme colors
- The stat cards should keep their original colors (orange, red, teal, darker teal, etc.)
- **ONLY** update surrounding elements (section background, headings, text) to use theme variables
- Improve hover animations instead of relying on glow effects in light mode
- Add subtle linear gradients from icon color to white/transparent on cards
- Add subtle drop shadows for better depth, especially in light mode
- Ensure the component looks equally great in both light and dark mode

## 2. Review Dark Mode Implementation
- ⚠️ **CRITICAL**: Many already-migrated components may not be correctly responding to theme changes
- Review all previously updated components to verify proper dark mode support
- Check for any remaining hardcoded color values that should be using CSS variables
- Ensure all components transition smoothly between themes
- Test all interactive elements in both modes for visual consistency and proper contrast
- Verify that components use the `.dark:` class modifiers correctly for theme-specific styling

## 3. Complete Remaining Component Migrations
- Continue converting any remaining hardcoded hex values to CSS variables
- Follow the established pattern of `.bg-[var(--primary-light-300)]` for Tailwind
- Focus on high-visibility components first
- Maintain component-specific exceptions where appropriate (like course-stats)

# ⚠️ CLAUDE FAILURES LOG ⚠️

## Course-Stats Component Dark Mode Failure (04-02-2025)
A prior Claude agent failed to properly implement dark mode for the CourseStats component. Critical errors included:

1. Used hardcoded color values (#FFF5E9, #09232F) instead of CSS variables
2. Misunderstood how to correctly implement CSS variables with Tailwind's dark mode
3. Failed to follow project conventions despite clear documentation 
4. Tried quick fixes rather than finding root cause of dark mode issues
5. Did not test solution in both light and dark mode properly

These failures directly violated multiple requirements in CLAUDE.md including:
- "DO NOT replace CSS variables with hardcoded values except in specified exceptions"
- "DO NOT implement 'quick fixes' - identify and fix the root cause instead"

Future Claude agents must carefully study the CSS variable implementation in this codebase before attempting any styling work. Pay particular attention to how CSS variables work with Tailwind and dark mode.

# VS Color System Reference

## Primary Colors
- `--primary-light-100`: Light orange (`#ffecd4`, `oklch(0.92 0.09 82.58)`) 
- `--primary-light-200`: Medium-light orange (`#ffcfa0`, `oklch(0.87 0.16 76.76)`)
- `--primary-light-300`: Core orange (`#fea35d`, `oklch(0.77 0.21 65.3)`)
- `--primary-light-400`: Darker orange (`#f89a67`, `oklch(0.76 0.2 67.71)`)
- `--primary-light-500`: Red (`#e76662`, `oklch(0.7 0.25 38.45)`)

## Secondary Colors
- `--secondary-light-100`: Lightest teal (`#daeaef`, `oklch(0.88 0.04 217.71)`)
- `--secondary-light-200`: Light teal (`#96c5d3`, `oklch(0.8 0.07 220.44)`)
- `--secondary-light-300`: Medium teal (`#4e9bb2`, `oklch(0.71 0.12 219.17)`)
- `--secondary-light-400`: Darker teal (`#216b85`, `oklch(0.53 0.15 217.3)`)
- `--secondary-light-500`: Darkest teal (`#154d59`, `oklch(0.42 0.14 217.38)`)

## Surface Colors
- `--surface-dark-1`: Almost black (`#030a10`, `oklch(0.04 0.01 257.15)`)
- `--surface-dark-2`: Very dark blue (`#051320`, `oklch(0.05 0.01 257.15)`)
- `--surface-dark-3`: Dark blue (`#09232f`, `oklch(0.16 0.03 257.38)`)

## Text Colors
- `--text-dark-primary`: White (`#ffffff`, `oklch(1 0 0)`)
- `--text-dark-secondary`: Off-white (`#fff5e9`, `oklch(0.97 0.02 83.17)`)
- `--text-dark-muted`: Light blue (`#a8cfe4`, `oklch(0.75 0.09 220.21)`)

## Development Commands
- `npm run dev` - Start development server 
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Type check without emitting files

## Common Color Mappings
- Orange accent buttons → `--primary-light-300` 
- Red accent buttons → `--primary-light-500`
- Dark backgrounds → `--surface-dark-3`
- Hover states → `--primary-light-400`
- Teal accents → `--secondary-light-300`

## Migration Notes
- Replace hardcoded hex values with CSS variables
- Use `.bg-[var(--primary-light-300)]` syntax for Tailwind background classes ONLY
- Use `var(--primary-light-300)` for inline styles: `style={{ color: 'var(--primary-light-300)' }}`
- For gradients: `from-[var(--primary-light-300)] to-[var(--primary-light-500)]`

## ⚠️ CRITICAL: Text Color Implementation Warning ⚠️
- **NEVER use** `text-[var(--text-dark)]` or similar for text colors - this WILL NOT WORK!
- CSS variables in Tailwind bracket notation DO NOT WORK for text colors
- Instead use either:
  1. Direct inline styles: `style={{ color: 'var(--text-dark)' }}`
  2. Or apply the color directly to the element: `className="..." style={{ color: 'var(--text-dark)' }}`
- This is a common mistake that breaks text visibility

## Course Data Architecture
- `src/data/course-data.json` is the single source of truth for course content
- `src/lib/course-utils.tsx` provides API access to course data
- Use `courseUtils` functions to access course data, never hardcode it

## Completed Updates
- ✅ Updated `VerticalShortcutLanding.tsx` to use CSS variables
- ✅ Updated `isometricGrid.tsx` COLORS constant to use CSS variables
- ✅ Replaced all hex colors with appropriate CSS variables
- ✅ Updated all social links hover states 
- ✅ Ensured gradient definitions use CSS variables
- ✅ Refactored form components (input, select, checkbox, textarea, form)
- ✅ Updated lead-capture-form with CSS variables
- ✅ Enhanced Hero section components with dark mode support
- ✅ Refactored Modules.css with CSS variables
- ✅ Updated module components (module-breakdown, featured-modules)
- ✅ Enhanced course-stats with consistent styling
- ✅ Updated pricing-quiz-modal component
- ✅ Refactored accordion and accordion-raised components
- ✅ Enhanced alert component with proper styling and additional variants
- ✅ Updated avatar component with CSS variables and dark mode support
- ✅ Refactored badge component with new styling and additional variants
- ✅ Enhanced dialog component with proper transitions and dark mode styling
- ✅ Refactored `course-utils.tsx` to use course-data.json as source of truth
- ✅ Updated `pricing.ts` to derive module categories from course-data.json
- ✅ Implemented new CSS design system by replacing globals.css
- ✅ Refactored button component to use new variables and styles
- ✅ Updated card component with new styling and hover effects
- ✅ Modernized navbar with consistent styling and transitions
- ✅ Added quiz component to CSS refactoring plan
- ✅ Refactored input component with proper CSS variables and dark mode support
- ✅ Updated select component with consistent styling and enhanced hover states
- ✅ Modernized checkbox component with proper colors and transitions
- ✅ Refined textarea component with consistent styling
- ✅ Enhanced form component labels and error states
- ✅ Updated lead-capture-form with proper variable usage
- ✅ Upgraded HeroSection with proper CSS variables and dark mode enhancements
- ✅ Updated HeroSection2 with consistent color variables for animations
- ✅ Refactored Modules.css with complete CSS variable implementation and dark mode support
- ✅ Updated module-breakdown-simplified.tsx with consistent styling and enhanced hover effects
- ✅ Modernized featured-modules.tsx component with proper CSS variables and animations
- ✅ Updated course-stats.tsx with new variables and enhanced hover effects
- ✅ Refactored pricing-quiz-modal.tsx with consistent styling and animations

## Files That Can Be Safely Deleted
These files are no longer needed since their functionality has been consolidated:

1. **Data Conversion and Legacy Files**:
   - `src/data/modules-all.xml` - XML data now converted to course-data.json
   - `src/data/html-xml-json-converter.html` - One-time conversion utility
   - `src/data/course-editor-integration.html` - Legacy editor integration
   - `src/data/fixed-course-editor.html` - Legacy editor file
   - `src/data/course-data.ts` - Duplicate data source replaced by course-data.json

2. **Duplicate/Obsolete Component Files**:
   - `src/components/Area-chart-shad.tsx.ts` - Duplicate file with wrong extension
   - `src/components/module-breakdown.tsx` - Replaced by simplified version
   - `src/components/Modules.tsx` - Unused component with hardcoded module data
   - `src/components/sections/module-breakdown.tsx` - Should be removed after refactoring module-breakdown-simplified.tsx

## Components Successfully Refactored to Use course-data.json
The following components have been successfully refactored to use course-utils as the single source of truth:

1. **Completed Refactoring**:
   - ✅ `src/components/sections/course-stats.tsx` - Now uses proper courseUtils import with defensive programming
   - ✅ `src/components/ContentOverwhelmer.tsx` - Now properly uses courseUtils with comprehensive error handling
   - ✅ `src/components/sections/carousel/VSCarousel.tsx` - Now uses dynamic module lookup instead of hardcoded mappings
   - ✅ `src/components/sections/module-breakdown-simplified.tsx` - Now has proper fallbacks for section data
   - ✅ `src/components/sections/founder-track.tsx` - Now dynamically uses track data from courseUtils
   - ✅ `src/components/sections/featured-modules.tsx` - Now correctly imports and uses the Module interface

## Components Still Requiring Refactoring
These components still contain hardcoded module data that should be updated to use the central source of truth:

1. **Components with Hardcoded Data** (ALL fallbacks must be removed):
   - `src/components/moduleDirectoryDropdown.tsx` - Contains hardcoded module categories in `modulesByCategory`
   - `src/components/PricingTest.tsx` - Contains hardcoded pricing tiers with module references
   - `src/components/ComingSoon.tsx` - Contains hardcoded module categories in `moduleCategories`

2. **Recommended Approach to Refactoring**:
   - Use the module system's ability to keep imports cached
   - Utilize helper functions from course-utils.tsx
   - Remove redundant data definitions and calculations
   - NEVER use fallback data; instead use proper error states
   - Implement visible error boundaries to show when data fails to load
   - Add proper error handling when loading course data that makes issues apparent
   - Use conditional rendering to handle potential null/undefined data
   - Maintain same component API to avoid breaking existing code

3. **Refactoring Priorities**:
   - High Priority: `moduleDirectoryDropdown.tsx` - Directly impacts the curriculum display
   - Medium Priority: `ComingSoon.tsx` - Landing page with module categories
   - Low Priority: `PricingTest.tsx` - Pricing-specific data that may need manual curation

## Benefits
- Centralized color management in globals.css 
- Enhanced dark/light mode theming capabilities
- Proper OKLCH color format with fallbacks for older browsers
- More maintainable codebase with semantic color names
- Easy global color adjustments by changing only the root variables

## Special Cases and Exceptions
- CourseStats component maintains its original vibrant color scheme that differs from the main color system
- Some marketing/landing page sections may keep unique color treatments for visual impact
- Animation-heavy components may have custom color schemes for special effects

## Single Source of Truth for Course Data

### Implementation Requirements
- **CRITICAL**: All components MUST dynamically access course data from course-utils.tsx
- **NO HARDCODING**: Never hardcode module IDs, section names, or other data directly from course-data.json
- **DYNAMIC LOOKUPS**: Components should perform dynamic lookups to find the correct data
- **DEFENSIVE CODING**: All components must handle cases where data might be missing or changed
- **FLEXIBLE MAPPING**: Any mappings or transformations should be dynamic and resilient to data changes

### Correct Implementation Examples
- Use functions like `getModulesForSection()` for dynamic access
- Iterate through all sections instead of referencing specific ones by hardcoded IDs
- Map data dynamically instead of using hardcoded indexes or properties
- Use fallbacks when data might be missing
- Check for null/undefined values before accessing properties

### Incorrect Implementation Examples
- Hardcoding specific module IDs like `"crafting_compelling_hooks"` or section IDs like `"The_Fundamentals"`
- Creating static mappings that won't update when course data changes
- Assuming specific data structure without checking
- Hardcoding section counts, module counts, or other statistics

## Important Data Integrity Guidelines

**REMOVE ALL FALLBACK DATA SYSTEMS**
- All fallback data (like STATS_FALLBACK in course-stats.tsx) must be removed immediately
- No hardcoded fallback values should exist anywhere in the codebase
- Components should fail visibly if data is missing or incorrect
- This ensures we can properly debug data loading issues without being misled by fallback data
- Components should handle missing data by showing appropriate error states instead of using fallbacks

## Next Steps: Refactoring Roadmap

### Completed Tasks
- ✅ Deleted unnecessary components (isometricGrid, isometricCube, etc.)
- ✅ Created a new simplified HeroSection component
- ✅ Updated VerticalShortcutLanding.tsx to use the new HeroSection
- ✅ Cleaned up AppIsometric.tsx
- ✅ Updated VSCarousel.tsx to use dynamic module lookup instead of hardcoded IDs
- ✅ Updated ContentOverwhelmer.tsx to properly use courseUtils with error handling
- ✅ Refactored course-stats.tsx to use courseUtils instead of dynamic require
- ✅ Updated module-breakdown-simplified.tsx with robust error handling
- ✅ Fixed all components to properly use module and section data
- ✅ Improved founder-track.tsx to use dynamic course data
- ✅ Fixed featured-modules.tsx to use proper Module interface from course-utils

### Recent Single Source of Truth Implementation Achievements:
- ✅ **ELIMINATED ALL FALLBACKS**: Removed all statistical data fallbacks throughout the codebase
- ✅ **STRICT ERROR HANDLING**: Replaced fallbacks with proper error throwing and validation
- ✅ **ROBUST DATA VALIDATION**: Added comprehensive validation for course data structure
- ✅ **TYPE SAFETY**: Fixed all TypeScript errors and improved type definitions
- ✅ **STREAMLINED DATA ACCESS**: Ensured all components access data exclusively through courseUtils
- ✅ **TRANSPARENT ERROR PROPAGATION**: Made data integrity issues immediately visible
- ✅ **ELIMINATED HARDCODED VALUES**: Removed all hardcoded module/track data and fallback statistics
- ✅ **IMPROVED DEFENSIVE CODING**: Added validation for all required properties
- ✅ **FAIL-FAST APPROACH**: Components now properly fail with descriptive errors when data is missing

### IMPORTANT: No Fallbacks Policy
- ⚠️ **NEVER ADD FALLBACKS**: Under no circumstances should fallback data be added to the codebase
- ⚠️ **NO SILENT FAILURES**: Never silently fall back to hardcoded data when the real data is missing
- ⚠️ **USE ERROR THROWING**: Always throw descriptive errors when required data is missing or invalid
- ⚠️ **NO STAT ESTIMATIONS**: Never estimate statistics based on hardcoded values (e.g. module counts)
- ⚠️ **SINGLE SOURCE OF TRUTH**: All data must come from course-data.json via course-utils.tsx
- ⚠️ **VISIBLE FAILURES**: Data problems should be immediately visible, not hidden behind fallbacks

# Website Design & CSS Guidelines

## Website Look & Feel

The new design system defines a warm, professional aesthetic with the following key characteristics:

- **Personality**: Fun and approachable yet professional and polished
- **Color Palette**: Warm cream backgrounds with vibrant orange and coral accents, balanced by deep teals
- **Typography**: Clean, modern sans-serif (Neue Haas Grotesk Display Pro) with generous spacing
- **Visual Language**: Subtle gradients, soft shadows, and rounded corners create depth and warmth
- **Responsiveness**: Fluid layouts with carefully defined breakpoints for consistent experiences
- **Dark Mode**: Rich navy backgrounds with enhanced gradients and subtle glow effects
- **Interactive Elements**: Smooth transitions, hover effects, and feedback mechanisms
- **Spacing**: Consistent rhythm using a standardized spacing scale

The overall impression is of a premium educational product that feels inviting and accessible while maintaining visual sophistication. The design balances playful elements (animations, gradient accents) with structured layouts and clear typography to create a focused learning environment.

## CSS Global Refactoring Plan

### Phase 1: Foundation Setup (Priority: Critical)

1. **CSS File Reorganization**
   - Create backup of current globals.css
   - Replace globals.css with contents of new-guidelines-globals.css
   - Update import order in main.tsx to ensure globals.css loads before other CSS files
   - Keep utils.css for now, but review for potential conflicts
   - Document all changes in CLAUDE.md

2. **Typography Implementation**
   - Ensure Neue Haas Grotesk Display Pro font is properly loaded
   - Verify font-family inheritance in component hierarchy
   - Apply new typography scales to all text elements
   - Update heading styles across all components

3. **Color Variable Testing**
   - Create a simple color palette test page
   - Verify all color variables render correctly in light/dark modes
   - Test color variable accessibility against WCAG standards
   - Ensure proper fallbacks for older browsers

### Phase 2: Component-by-Component Migration (Priority: High)

#### Core UI Components (Start here):

1. **Button Components**
   - Update all button styles to use new variables
   - Implement proper hover/active states
   - Ensure consistent padding and border-radius
   - Test in light and dark modes

2. **Card Components**
   - Update backgrounds to use --card-bg-light/--card-bg-dark
   - Apply consistent shadow variables
   - Standardize padding and border-radius
   - Implement proper hover transitions

3. **Navigation Components**
   - Update navbar styling
   - Standardize nav links and active states
   - Implement mobile menu styling
   - Ensure consistent spacing

4. **Form Elements**
   - Style inputs, selects, checkboxes
   - Update focus states
   - Standardize error states
   - Ensure proper dark mode support

#### Page Sections (Second priority):

5. **Hero Sections**
   - Update background gradients
   - Standardize typography
   - Adjust spacing according to guidelines
   - Ensure responsive behavior

6. **Feature Sections**
   - Update grid layouts
   - Standardize feature cards
   - Apply consistent icon styling
   - Test responsive breakpoints

7. **Content Sections**
   - Update text colors and spacing
   - Standardize list styling
   - Apply consistent section padding
   - Ensure proper hierarchy

8. **Course Module Components**
   - Update module card styling
   - Apply consistent tag/badge styling
   - Standardize module grids
   - Ensure proper dark mode support

#### Special Components (Third priority):

9. **Charts and Data Visualization**
   - Update chart colors
   - Standardize tooltip styling
   - Apply consistent legends
   - Ensure accessible color contrasts

10. **Modal and Dialog Components**
    - Update backgrounds and overlays
    - Standardize animation effects
    - Apply consistent padding and spacing
    - Ensure proper focus management

11. **Carousels and Sliders**
    - Update navigation controls
    - Standardize slide styling
    - Apply consistent pagination
    - Test responsive behavior

### Phase 3: Specialized Elements (Priority: Medium)

12. **Course Stats Component**
    - This component can keep its unique glow colors
    - Update backgrounds and typography
    - Standardize card styling
    - Ensure accessible contrast ratios

13. **Animation Effects**
    - Review and update transition variables
    - Standardize hover effects
    - Apply consistent animation durations
    - Ensure reduced-motion support

14. **Grid and Layout Systems**
    - Update grid background patterns
    - Standardize container widths
    - Apply consistent spacing scale
    - Test responsive breakpoints

15. **Dark Mode Enhancements**
    - Implement enhanced gradient backgrounds
    - Apply subtle glow effects
    - Test card and module styling
    - Verify text contrast and readability

### Phase 4: Final Refinement (Priority: Normal)

16. **Cross-Component Consistency**
    - Audit all components for consistent styling
    - Check for any remaining hardcoded values
    - Standardize similar UI patterns
    - Create a visual consistency report

17. **Performance Optimization**
    - Audit CSS size and specificity
    - Remove any unused variables
    - Test rendering performance
    - Ensure efficient CSS loading

18. **Documentation Updates**
    - Update CLAUDE.md with completed changes
    - Document any component-specific overrides
    - Create a visual style guide reference
    - Document dark mode implementation

19. **User Testing and Feedback**
    - Test in multiple browsers
    - Verify mobile and tablet experiences
    - Check accessibility compliance
    - Address any visual issues

### Implementation Guidelines

- **Complete One Component at a Time**: Never leave a component partially migrated
- **Test Each Component in Both Modes**: Always verify light and dark mode appearance
- **Maintain Visual Hierarchy**: Ensure typography and spacing create clear hierarchy
- **Keep Accessibility in Mind**: Maintain proper contrast ratios and focus states
- **Use Tailwind Classes When Possible**: Use utility classes rather than custom CSS
- **Format for Variables**: Use `bg-[var(--primary-orange)]` for Tailwind and `var(--primary-orange)` for inline styles
- **Comment on Exceptions**: Document any deliberate deviations from the standard system
- **Responsive Testing**: Test each component at multiple viewport sizes

This comprehensive plan ensures a methodical, thorough migration to the new design system while maintaining consistency and quality throughout the process.

## Immediate Implementation: Core Components

### 1. Button Component Refactoring

**File**: `/src/components/ui/button.tsx`

**Current Issues**:
- Uses legacy color variables (primary, secondary)
- Relies on custom utility classes (glass-4, glass-5)
- Missing proper hover effects as defined in new guidelines
- Doesn't use the new border-radius variables

**Changes Required**:
- Update default variant to use `--primary-orange` and `--primary-orange-hover`
- Replace secondary variant with proper `--secondary-teal` variables
- Update destructive variant to use `--accent-red`
- Implement proper border-radius using `--border-radius-full`
- Update shadow styling to use new shadow variables
- Adjust font weight and sizing to match typography guidelines
- Ensure proper dark mode styling

**Implementation Approach**:
```tsx
// Example updated buttonVariants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--border-radius-full)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-orange)] text-white hover:bg-[var(--primary-orange-hover)] shadow-[var(--shadow-btn)]",
        destructive:
          "bg-[var(--accent-red)] text-white hover:bg-[var(--accent-red)] shadow-sm",
        outline:
          "border border-[var(--border-light-default)] bg-transparent hover:bg-[rgba(53,115,128,0.05)] text-[var(--secondary-teal)]",
        // etc.
      },
      // ...rest of the variants
    }
  }
)
```

### 2. Card Component Refactoring

**File**: `/src/components/ui/card.tsx`

**Current Issues**:
- Uses generic card/card-foreground variables
- Inconsistent border-radius with new design system
- Missing hover transitions defined in new guidelines
- Shadow styling not aligned with design system

**Changes Required**:
- Update to use `--card-bg-light` and `--card-bg-dark` for backgrounds
- Implement proper border-radius using `--border-radius-lg`
- Add hover transform and shadow effects from guidelines
- Ensure proper dark mode styling with transitions
- Update padding and spacing to match design system

**Implementation Approach**:
```tsx
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white dark:bg-[var(--card-bg-dark)] text-[var(--text-dark)] dark:text-[var(--text-white)] rounded-[var(--border-radius-lg)] border shadow-[var(--shadow-md)] transition-all hover:shadow-[var(--shadow-lg)] hover:translate-y-[-2px]",
        className,
      )}
      {...props}
    />
  );
}
```

### 3. Navigation Component Refactoring 

**File**: `/src/components/sections/navbar/vs-navbar.tsx`

**Current Issues**:
- Hardcoded color values (#08141B, #FEA35D, etc.)
- Inconsistent styling with new design system
- Missing proper hover transitions
- Mobile menu styling not aligned with guidelines

**Changes Required**:
- Replace all hardcoded colors with CSS variables
- Update background to use proper gradients
- Implement standardized spacing from guidelines
- Update mobile menu styling
- Ensure proper dark mode support

**Implementation Approach**:
```tsx
// Example updated navbar background
<div className="max-w-[1400px] bg-[var(--bg-navy)]/90 border-white/10 relative mx-auto rounded-[var(--border-radius-xl)] border p-2 py-3 px-4 md:px-6 backdrop-blur-lg">

// Example updated button
<Button 
  variant="default" 
  className="bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] text-white px-5"
  onClick={() => window.location.href = '/application-form'}
>
  Apply Now
</Button>

// Example updated links
<a href="#benefits" className="text-white/70 hover:text-[var(--primary-orange-light)] transition-colors duration-[var(--transition-fast)] text-sm">Benefits</a>
```

## Next Components to Update

After successfully refactoring the core UI components (buttons, cards, and navigation), the following components should be updated next:

### 4. Form Elements

**Files to Update**:
- `/src/components/ui/input.tsx`
- `/src/components/ui/select.tsx`
- `/src/components/ui/checkbox.tsx`
- `/src/components/ui/textarea.tsx`
- `/src/components/ui/form.tsx`
- `/src/components/ui/lead-capture-form.tsx`

**Implementation Tasks**:
- Update form fields to use new border-radius variables
- Implement proper focus states with new color system
- Ensure consistent input padding and sizing
- Update error states to use accent-red
- Standardize label styling and positioning
- Apply proper dark mode styling to all form elements

### 5. Hero Sections

**Files to Update**:
- `/src/components/hero/HeroSection.tsx`
- `/src/components/hero/HeroSection2.tsx`

**Implementation Tasks**:
- Replace hardcoded background colors with variables
- Update text styling using new typography guidelines
- Implement proper gradient backgrounds
- Ensure responsive spacing using new variables
- Update CTA buttons to use new button styles
- Optimize for both light and dark modes

### 6. Course-specific Components

**Files to Update**:
- `/src/components/Modules.css` (needs full refactoring)
- `/src/components/sections/module-breakdown-simplified.tsx`
- `/src/components/sections/featured-modules.tsx`
- `/src/components/sections/course-stats.tsx`
- `/src/components/sections/pricing-quiz-modal.tsx` (quiz component)

**Implementation Tasks**:
- Update module cards with new styling
- Standardize heading and text styling
- Implement consistent spacing pattern
- Update progress indicators and status badges
- Refactor Modules.css to use CSS variables instead of hardcoded colors
- Update quiz modal with proper variable styling (even though component is not currently active)

Once these components are updated, we'll have established a solid foundation for the design system across all major UI elements, making the remaining component updates more straightforward.

# Style Implementation Guidelines for Clash Creation Branding

## ⚠️ CRITICAL: Light/Dark Mode Implementation

When implementing CSS variables, ensure they correctly respond to theme changes:

1. **Media Queries**: Always implement proper media queries for prefers-color-scheme or use the .dark class selector
2. **CSS Variable Scoping**: Define light theme variables at :root level and dark theme overrides in .dark selector 
3. **Fallback Values**: Provide fallbacks for all color variables to support older browsers
4. **Theme Transitions**: Apply transition effects to color properties using var(--transition-normal)
5. **System Color Detection**: Test with OS-level theme changes to ensure proper switching

## Core Aesthetic Principles

### Balanced Vibrancy

**CORRECT**: Colorful elements against neutral backgrounds  
**AVOID**: Completely monochromatic sections OR overly busy color combinations  
**RULE**: For any content section, use at most 3 accent colors plus a neutral base

### Strategic Depth

**CORRECT**: Gradients and shadows to create meaningful hierarchy  
**AVOID**: Flat designs OR excessive 3D effects/shadows everywhere  
**RULE**: The more important an element, the more depth it should have

### Rhythmic Minimalism

**CORRECT**: Organized, symmetrical layouts with purposeful asymmetric focal points  
**AVOID**: Chaotic layouts OR completely uniform grids  
**RULE**: Establish visual patterns, then create moments of controlled interruption

## Style Distribution Map

**PAGE LEVEL**:
- Background: Light cream/navy with subtle texture (grid/dots)
- Accent areas: 20% of page max should use vibrant colors

**SECTION LEVEL**:
- Cards: White/gradient blue with subtle shadows in light/dark mode
- Features: Use variation between solid, gradient, and outlined styles
- Text: 70% neutral, 30% accent colors for emphasis

**COMPONENT LEVEL**:
- Primary buttons: Always gradient with hover effect
- Secondary elements: Solid colors with subtle interaction effects
- Icons/small accents: Use brand colors consistently

## Visual Variety Checklist

When refactoring any page section, ensure it includes:

- At least one gradient element (button, card, or background)
- Clear visual hierarchy through size, color, and depth
- Mix of rounded corners (buttons, cards) and straight edges (dividers, grid)
- Strategic white space (more around important elements)
- Subtle background texture (dots or grid pattern)

## Color Application Rules

### Primary Orange/Coral Usage

**PRIMARY PURPOSE**: Call-to-action buttons, key statistics, and primary headings  
**FREQUENCY**: Should appear at least once in every major section but never more than 3 times  
**PAIRING**: Always balance with teal elements or neutral space

### Secondary Teal Usage

**PRIMARY PURPOSE**: Secondary buttons, supporting UI elements, icons  
**FREQUENCY**: Should complement orange elements without competing  
**PAIRING**: Works well with both orange and neutral backgrounds

### Dark Mode Enhancement

**TECHNIQUE**: Add gradient overlays to cards (never flat navy)  
**EMPHASIS**: Increase glow effects on interactive elements only  
**CONTRAST**: Ensure text remains highly legible against all backgrounds

## Implementation Decision Tree

For each UI element, follow this decision path:

**IS IT FOCAL?** (Main heading, CTA button, featured stat)
 ├─ YES → Use gradient + subtle glow in dark mode
 │        Use primary brand color
 │        Add hover/interaction effect
 │
 └─ NO → **IS IT SUPPORTIVE?** (Cards, secondary buttons)
      ├─ YES → Use solid color with subtle depth
      │        Consider secondary brand color
      │
      └─ NO → **IS IT STRUCTURAL?** (Container, background)
           ├─ YES → Use neutral color with texture
           │        Add very subtle gradient if large area
           │
           └─ NO → Use minimal styling (white/transparent)

## Component-Specific Guidelines

### Cards

**CORRECT**: White cards with subtle shadows in light mode; gradient blue cards with subtle glow in dark mode  
**MINIMUM STYLING**: Border radius + shadow  
**OPTIMAL STYLING**: Border radius + shadow + subtle border + hover effect  
**MAXIMUM STYLING**: All the above + internal gradient background for featured cards only

### Buttons

**PRIMARY**: Full gradient background + hover transform  
**SECONDARY**: Solid color + hover effect  
**GHOST**: Transparent with border + hover background  
**SIZING**: Maintain sufficient padding (min 0.75rem vertical, 1.5rem horizontal)

### Module Grids

**CORRECT**: Symmetrical arrangement with occasional highlight tiles  
**PATTERN**: Alternate between solid colors and gradients  
**MAXIMUM**: 30% of tiles should use accent colors  
**MINIMUM**: 10% of tiles should use accent colors

### Implementation Notes
- When refactoring components, remove ALL fallback data systems and implement proper error handling
- Always use course-utils as the intermediary for course-data.json, never access JSON directly
- Show visible error states instead of silent fallbacks when data fails to load
- Maintain component APIs to prevent breaking existing functionality
- Use conditional rendering for null/undefined data