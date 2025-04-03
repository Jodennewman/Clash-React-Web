# Team Structure

This document outlines team responsibilities when working on the Vertical Shortcut Landing Page.

## Team Assignments

### Team A: Core UI & Animation Components
- **Navigation & Structure:** VSNavbar, Section, AnimationController, ThemeProvider
- **Hero & CTAs:** HeroSection, Button, Badge, Logo, Glow 
- **Core Content:** CourseStats (preserve vibrant colors), ContentOverwhelmer, VSCarousel
- **Animation:** GSAP implementation, ScrollTrigger, ScrollSmoother

### Team B: Feature & Content Components
- **Course Data:** ModuleBreakdownSimplified, FeaturedModules, FounderTrack, VSBentoGrid
- **Social & Testimonial:** SocialProof, TestimonialCarousel, SocialProofItem
- **Forms & Conversion:** VerticalShortcutApplicationForm, LeadCaptureForm, PricingSection
- **Utility:** Item components, courseUtils implementation, Icon components

## Team Workflow Rules

1. **Boundaries:**
   - Work ONLY on your team's assigned components
   - Ask permission before modifying other team's components

2. **Implementation Requirements:**
   - Use "VS Bubbly" animation style (20% more pronounced than typical)
   - Preserve vibrant colors in CourseStats
   - Never change grid layouts without permission
   - Follow VS_STYLING_GUIDE.md for consistent styling

3. **Git Commit Process:**
   - Always use `git add .` to stage ALL modified files
   - Never commit partial changes
   - Use team prefix: `A:` or `B:` in commit messages 
   - Commit after each component change

4. **Development Rules:**
   - DO NOT use `npm run dev` - causes freezing
   - Use `npm run build` for building
   - Use `npm run typecheck` for testing