# Team Structure

This document outlines team responsibilities when working on the Vertical Shortcut Landing Page.

## Tailwind v4 Refactoring Team Assignments

### Team A: UI Core & Visitor Experience
- **Theme System:** ThemeProvider, ModeToggle, theme utility functions
- **Base Components:** Button, Badge, Logo, Input, Card, Icon components
- **Layout Components:** Section, Container, VSNavbar, Footer
- **Animation Core:** AnimationController, GSAP integration, ScrollTrigger
- **User Interaction:** CourseStats, HeroSection, CTAs, Glow effects

### Team B: Content & Conversion Elements
- **Course Elements:** ModuleBreakdownSimplified, FeaturedModules, FounderTrack
- **Social Content:** SocialProof, TestimonialCarousel, SocialProofItem
- **Grid Components:** VSBentoGrid, VSCarousel, ContentOverwhelmer
- **Forms & Conversion:** VerticalShortcutApplicationForm, LeadCaptureForm, PricingSection
- **Dynamic Content:** courseUtils implementation, data loaders

## Refactoring Workflow Rules

1. **Zero Overlap:**
   - Each component belongs to ONLY ONE team
   - Teams must complete their assigned components before helping with others

2. **Refactoring Approach:**
   - Update all styling to Tailwind v4 syntax (refer to CLAUDE.md)
   - Migrate from `text-[var(--color)]` to `text-[--color]`
   - Ensure all components have proper dark mode implementation
   - Maintain VS Bubbly animation style throughout

3. **Git Commit Process:**
   - Always use `git add .` to stage ALL modified files
   - Never commit partial changes
   - Use team prefix: `A:` or `B:` in commit messages 
   - Include "RefactorTW4" in commit messages for refactoring work
   - Example: `A: RefactorTW4 - Updated Button component styling`

4. **Refactoring Priority:**
   - Update theme system components first (highest priority)
   - Update shared UI components second
   - Update page-specific components last
   - Ensure each component passes both light and dark mode testing

5. **Development Rules:**
   - DO NOT use `npm run dev` - causes freezing!
   - Use `npm run build` for building
   - Use `npm run typecheck` for testing
   - Test all changes in both light and dark mode

## Helper Component Elimination

### Components to Remove/Refactor
- **VSText** - Replace with direct Tailwind classes: `className="text-[--text-navy] dark:text-white"`
- **VSHeading** - Replace with HTML elements and Tailwind classes: `<h2 className="text-3xl font-medium text-[--text-navy] dark:text-white">`
- **VSParagraph** - Replace with `<p>` and Tailwind classes
- **VSColoredText** - Replace with direct color classes: `className="text-[--accent-coral]"`
- **VSContainer** - Replace with Tailwind's container utilities or direct classes
- **VSGradientText** - Replace with custom gradient-text utility class

### Refactoring Pattern
```jsx
// ❌ BEFORE (with helper components)
<VSText color="navy" darkColor="white">Hello world</VSText>

// ✅ AFTER (direct Tailwind v4)
<span className="text-[--text-navy] dark:text-white">Hello world</span>
```

### Helper Benefits to Preserve
When replacing helper components:
- Preserve proper dark mode styling
- Maintain animation style
- Ensure consistent typography
- Keep the same spacing patterns