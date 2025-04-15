# VS THEME SYSTEM REFERENCE

## Core Theme Colors
- **text-theme-primary**: Main text color (navy/white)
- **text-theme-secondary**: Secondary text color
- **text-theme-tertiary**: Tertiary text color
- **text-theme-subtle**: Subtle text with lower opacity
- **text-theme-accent**: Teal accent text
- **text-theme-error**: Error text in red
- **text-theme-on-primary**: White text for dark backgrounds

## Background Colors
- **bg-theme-primary**: Main background color
- **bg-theme-secondary**: Secondary background color
- **bg-theme-surface**: Surface/card background
- **bg-theme-card**: Card background
- **bg-theme-accent**: Teal accent background
- **bg-theme-error**: Error background
- **bg-theme-bg**: Page background

## Accent Colors (Red Focus)
- **text-accent-red**: Red accent text
- **bg-accent-red**: Red accent background
- **border-accent-red**: Red accent border

## Gradients
- **bg-theme-gradient**: Main gradient background
- **bg-theme-gradient-card**: Card gradient
- **bg-theme-gradient-primary**: Primary accent gradient
- **bg-theme-gradient-secondary**: Secondary accent gradient
- **bg-theme-gradient-accent**: Accent gradient
- **bg-theme-gradient-text**: Text gradient effect

## Creating New Gradients
1. Use oklch colors for all gradients (Tailwind 4 compatible)
2. Keep colors within gamut (chroma < 0.3)
3. Create with CSS: `from-[oklch(70%_0.15_30deg)] to-[oklch(80%_0.20_60deg)]`
4. For enhanced vibrancy, increase chroma slightly but stay under 0.3
5. Use `bg-gradient-to-r` (horizontal) or `bg-gradient-to-br` (diagonal)
6. For text gradients, add `text-transparent bg-clip-text`

## Shadows & Effects
- **shadow-theme-sm/md/lg**: Theme-aware shadows
- **shadow-theme-card/btn**: Component shadows
- **shadow-theme-glow**: Glow effect
- **glow-theme-primary/secondary/accent**: Colored glows

## Interactive Elements
- **hover-bubbly**: Standard "springy" hover animation
- **hover-bubbly-sm/lg**: Smaller/larger hover effects
- **transition-theme-fast/normal/bounce/slow**: Animation timing

## VS-Specific Button Gradients
- **vs-btn-primary-gradient**: Orange gradient button
- **vs-btn-secondary-gradient**: Teal gradient button
- **vs-btn-vibrant-gradient**: Coral gradient button
- **vs-btn-destructive-gradient**: Red gradient button

## Borders & Radius
- **border-theme-light/primary/accent**: Theme-aware borders
- **rounded-theme-sm/md/lg/xl/2xl/full**: Border radius sizes

## When to Use
- Use theme utilities for consistent light/dark mode support
- Use red accents for critical actions, errors, or focus points
- Use gradients for buttons, cards, and surface backgrounds
- Apply hover animations on interactive elements

## Best Practices
- Always use theme-aware classes instead of direct color classes
- Avoid hard-coded colors; use Tailwind 4 colors when needed
- For custom colors, use oklch format for better HDR support
- Balance vibrant accents with neutral backgrounds
- Maintain accessible contrast in both light and dark modes