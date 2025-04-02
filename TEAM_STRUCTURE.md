# VS Project Team Structure

This document outlines how multiple Claude agents should collaborate when working on the Vertical Shortcut Landing Page.

## ⚠️ MANDATORY PROCEDURE FOR ALL CLAUDE AGENTS ⚠️

1. First, read and understand CLAUDE.md completely
2. Second, read and understand globals.css completely
3. Third, read and understand VS_STYLING_GUIDE.md completely
4. Fourth, read this TEAM_STRUCTURE.md completely
5. Determine which team you belong to by **ASKING THE USER**
6. Explicitly state: "I am assigned to Team [A/B], I have read all required documents, and will work only on components assigned to my team."
7. Only then proceed with any assistance

**NEVER assume which team you are on. ALWAYS ask the user to specify.**

---

## Team A: Core UI & Animation Components

**Focus Areas:** Main page structure, navigation, hero section, critical UI elements, animations

1. **Navigation & Structure:**
   - VSNavbar
   - Section (base layout component)
   - AnimationController
   - ThemeProvider

2. **Hero & CTAs:**
   - HeroSection
   - Button
   - Badge
   - Logo
   - Glow (visual effects)

3. **Core Content Components:**
   - CourseStats (needs special attention for color preservation)
   - ContentOverwhelmer
   - VSCarousel
   - TabsLeft
   - Alert components

4. **Animation Systems:**
   - GSAP implementation
   - ScrollTrigger setup
   - ScrollSmoother configuration
   - Transition effects

## Team B: Feature & Content Components

**Focus Areas:** Module-specific content, forms, testimonials, specialized sections

1. **Course Data Components:**
   - ModuleBreakdownSimplified
   - FeaturedModules
   - FounderTrack
   - VSBentoGrid

2. **Social & Testimonial:**
   - SocialProof
   - TestimonialCarousel
   - SocialProofItem
   - SafeVideoEmbed

3. **Forms & Conversion:**
   - VerticalShortcutApplicationForm
   - LeadCaptureForm
   - PricingSection
   - FAQUpdated

4. **Utility & Helper Components:**
   - Item components (ItemIcon/ItemTitle/ItemDescription)
   - courseUtils implementation
   - Icon components organization

## Team Collaboration Rules

1. **Critical First Tasks:**
   - Team A: Fix CourseStats component styling with preserved colors
   - Team B: Ensure all module components use proper course data

2. **Boundaries & Permissions:**
   - Stay STRICTLY within your team's assigned components
   - If a task requires crossing boundaries, STOP and ask the user for permission
   - NEVER modify components assigned to the other team without explicit approval

3. **Implementation Requirements:**
   - All components must implement the "VS Bubbly" animation style (20% more pronounced than typical corporate sites)
   - Preserve all original vibrant colors in applicable components (especially CourseStats)
   - Never change grid layouts without explicit permission
   - Never use hardcoded hex values except in specified exceptions
   - Follow VS_STYLING_GUIDE.md for animation and color usage guidelines

4. **Communication Protocol:**
   - Begin each session by confirming which team you belong to
   - When making changes, clearly document what was modified
   - For any shared dependencies, describe impact on other team's components

5. **Conflicts & Overlap:**
   - If you discover your task overlaps with the other team, STOP and inform the user
   - Consider file locking: Only one Claude agent should edit a file at a time
   - Document any component API changes that might affect the other team

## File Modification Protocol

When modifying files, follow this process:
1. State which team you are on
2. List the specific files you intend to modify
3. Outline your planned changes
4. Get user approval BEFORE making any changes
5. Make only the approved changes
6. Document what was changed

Remember: It is better to do nothing than to violate team boundaries or make unapproved changes.