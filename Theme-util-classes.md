# Theme Utility Classes Reference Guide

This document provides a comprehensive list of all theme-aware utility classes available in the codebase. These classes automatically adapt to light and dark themes, maintaining a consistent design with a single source of truth for styling.

## Text Colors
- **text-theme-primary** - Main text color (navy in light mode, white in dark mode)
- **text-theme-secondary** - Secondary text with 80% opacity
- **text-theme-tertiary** - Tertiary text with 60% opacity
- **text-theme-subtle** - Subtle text with 40% opacity
- **text-theme-accent** - Text in teal accent color
- **text-theme-error** - Error text in red
- **text-theme-on-primary** - White text for content on colored backgrounds
- **text-theme-gradient** - Text with orange-to-red gradient fill
- **text-theme-accent-tertiary** - Coral accent text color
- **text-theme-accent-secondary** - Teal accent text color
- **text-theme-accent-quaternary** - Red accent text color
- **text-theme-primary-light** - Lighter variant of primary text color
- **text-theme-bg** - Text color matching background color (for special effects)

## Background Colors
- **bg-theme-primary** - Main background (cream in light mode, navy in dark mode)
- **bg-theme-secondary** - Secondary background (darker cream/navy)
- **bg-theme-surface** - Surface background (white in light, navy in dark)
- **bg-theme-card** - Card background color
- **bg-theme-accent** - Background in teal accent color
- **bg-theme-error** - Error background in red
- **bg-theme-glow** - Radial gradient glow effect
- **bg-theme-content** - Content background with high opacity
- **bg-theme-accent-secondary** - Teal accent background
- **bg-theme-accent-tertiary** - Coral accent background
- **bg-theme-accent-quaternary** - Red accent background
- **bg-theme-bg-primary** - Explicit primary background 
- **bg-theme-primary-light** - Lighter variant of primary background
- **bg-theme-accent-secondary-light** - Lighter teal background
- **bg-theme-primary-hover** - Hover state background for primary elements
- **bg-theme-bg-light** - Light surface background
- **bg-theme-border-light** - Border color as background
- **bg-theme-on** - Background that stands out on the primary background

## Pattern Colors
- **bg-theme-pattern** - Background with theme-aware pattern color and opacity
- **bg-theme-pattern-light** - Lighter version of pattern color (50% opacity)
- **bg-theme-pattern-dense** - Denser version of pattern color (150% opacity) 

## Gradient Backgrounds
- **bg-theme-gradient** - Main gradient background (cream to white in light, navy gradients in dark)
- **bg-theme-gradient-card** - Card gradient background
- **bg-theme-gradient-primary** - Orange gradient (horizontal in light, diagonal in dark)
- **bg-theme-gradient-secondary** - Teal gradient (horizontal in light, diagonal in dark)
- **bg-theme-gradient-accent** - Coral-to-red gradient
- **bg-theme-gradient-overlay-light** - Fade-to-background overlay
- **bg-theme-gradient-text** - Text gradient effect (for use with background-clip)

## Borders
- **border-theme-light** - Light border (5% opacity)
- **border-theme-primary** - Primary color border
- **border-theme-border** - Standard border
- **border-theme-accent** - Teal accent border
- **border-theme-destructive** - Red error border
- **border-theme-error** - Red error border
- **border-theme-on-primary** - Border using primary color
- **border-theme-accent-secondary** - Teal border
- **border-theme-border-medium** - Medium opacity border (10%)
- **border-theme-border-light** - Light opacity border (5%)

## Border Radius
- **rounded-theme-sm** - Small border radius (8px)
- **rounded-theme-md** - Medium border radius (12px)
- **rounded-theme-lg** - Large border radius (16px)
- **rounded-theme-xl** - Extra large border radius (24px)
- **rounded-theme-2xl** - Double extra large border radius (32px)
- **rounded-theme-full** - Full circular border radius (9999px)

## Shadows
- **shadow-theme-sm** - Small shadow (with glow in dark mode)
- **shadow-theme-md** - Medium shadow (with glow in dark mode)
- **shadow-theme-lg** - Large shadow (with glow in dark mode)
- **shadow-theme-card** - Card shadow
- **shadow-theme-btn** - Button shadow
- **shadow-theme-input** - Focus ring for inputs
- **shadow-theme-glow** - Orange glow effect
- **shadow-theme-primary** - Primary accent shadow + glow
- **shadow-theme-secondary** - Secondary accent shadow + glow
- **shadow-theme-tertiary** - Tertiary accent shadow + glow
- **shadow-theme-accent** - Accent shadow + glow
- **shadow-theme-btn-primary** - Primary button shadow + glow
- **shadow-theme-btn-secondary** - Secondary button shadow + glow
- **shadow-theme-btn-tertiary** - Tertiary button shadow + glow

## Transitions
- **transition-theme-fast** - Fast transition (150ms cubic-bezier)
- **transition-theme-normal** - Normal transition (300ms cubic-bezier)
- **transition-theme-bounce** - Bouncy transition (350ms spring-like cubic-bezier)
- **transition-theme-slow** - Slow transition (500ms cubic-bezier)

## Glow Effects (Dark Mode)
- **glow-theme-primary** - Orange primary glow
- **glow-theme-secondary** - Teal secondary glow
- **glow-theme-tertiary** - Coral tertiary glow
- **glow-theme-accent** - Accent color glow
- **glow-theme-blue** - Blue accent glow

## Components
- **card-theme** - Styled card with gradient background
- **btn-theme-primary** - Orange gradient button
- **btn-theme-secondary** - Teal gradient button
- **pro-tip-theme** - Accent background callout component

## Grid & Patterns
- **grid-theme-dot** - Dot pattern background
- **grid-theme-line** - Line grid background

## Floating Elements
- **float-theme-element-primary** - Orange floating shape with animation
- **float-theme-element-secondary** - Teal floating shape with animation

## Interactive Animations
- **hover-bubbly** - Standard "springy" hover animation with scale and translate
- **hover-bubbly-sm** - Subtle hover animation
- **hover-bubbly-lg** - More pronounced hover animation with rotation

## Eyeball Component
- **eyeball-theme** - Eyeball container with theme-aware colors
- **eyeball-theme-iris** - Iris part of eyeball with theme-aware color
- **eyeball-theme-pupil** - Pupil part of eyeball with theme-aware color
- **eyeball-theme-highlight** - Highlight reflection in eyeball

## Chart Components
- **chart-theme-grid** - Grid lines for charts (lighter in dark mode)
- **chart-theme-line-views** - Line for views metric with theme color
- **chart-theme-line-followers** - Line for followers metric with theme color
- **chart-theme-line-engagement** - Line for engagement metric with theme color
- **chart-theme-line-revenue** - Line for revenue metric with theme color
- **chart-theme-area-views** - Area fill for views with theme color
- **chart-theme-area-followers** - Area fill for followers with theme color
- **chart-theme-area-engagement** - Area fill for engagement with theme color
- **chart-theme-area-revenue** - Area fill for revenue with theme color
- **chart-theme-tooltip** - Tooltip with theme-aware styling

## VS-Specific Components
- **vs-btn-primary-gradient** - Orange gradient button
- **vs-btn-secondary-gradient** - Teal gradient button
- **vs-btn-vibrant-gradient** - Coral-to-orange gradient button
- **vs-btn-destructive-gradient** - Red destructive action button
- **vs-carousel-container** - Gradient carousel container
- **vs-carousel-slide** - Styled carousel slide with hover effects
- **vs-fade-overlay-light/dark** - Fade overlay for images
- **vs-accent-badge** - Orange badge with rounded corners
- **vs-carousel-btn** - Carousel navigation button
- **vs-section-light/dark** - Section background styles
- **vs-testimonial-container** - Testimonial component styling
- **vs-card-shadow** - Card with theme-aware shadow
- **vs-float-element-light/dark** - Floating decorative elements
- **vs-card-gradient-light/dark** - Card with gradient background
- **vs-module-gradient-light/dark** - Module with gradient background
- **vs-gradient-*varieties*** - Various gradient combinations (orange, teal, coral, etc.)
- **vs-text-gradient-orange/teal** - Text with gradient fill

## Animation Utilities
- **animate-float-slow** - 8-second floating animation
- **animate-float-medium** - 6-second floating animation

## Text Styles
- **gradient-text** - Orange-to-coral gradient text
- **text-shadow-sm/md/lg** - Text shadow effects
- **text-over-image** - White text with shadow for overlay on images
- **text-over-image-light** - Lighter version for image overlays
- **text-over-image-secondary** - Secondary text style for image overlays

## Basic Utilities (For Reference)
- **container** - Main container with responsive padding
- **grid-bg** - Background with grid lines
- **dot-bg** - Background with dot pattern
- **text-accent/primary/secondary** - Direct color text utilities
- **vs-depth-bg-dark** - Rich background with inset shadow (dark mode)

## Base Components (For Reference)
- **btn** - Base button style (teal)
- **btn-primary** - Orange primary button
- **btn-accent** - Coral-to-red gradient button
- **btn-ghost** - Outlined button style
- **card** - Base card with shadow and hover effect
- **module** - Aspect ratio 1:1 module with hover animation
- **pro-tip** - Coral callout box