# VS Styling Guide

This document provides guidance for implementing VS's unique styling system that balances creative energy with professional polish.

## The VS Brand Personality

VS design uniquely balances creative energy with professional polish. Our aesthetic is:
- **Vibrant yet professional** - Uses bold colors in strategic ways
- **Playful yet focused** - Incorporates fun animations that never distract
- **Premium yet approachable** - Combines polish with warmth and personality

This vibrant, creative energy should be evident in every component while maintaining a professional, premium feel.

## ⚠️ Dark Mode Implementation ⚠️

For our vibrant design to work in both modes, follow these critical patterns:

**❌ NEVER USE THIS PATTERN - IT WILL BREAK DARK MODE:**
```jsx
<p className="text-[var(--text-navy)]">This will NOT work in dark mode</p>
```

**✅ ALWAYS USE THIS PATTERN INSTEAD:**
```jsx
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">This works correctly</p>
```

For backgrounds, this pattern works perfectly:
```jsx
<div className="bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">Content here</div>
```

## Color System

Our vibrant color system creates energy and warmth throughout the UI.

### Primary Palette
```css
--primary-orange: oklch(75% 0.13 57);        /* #FEA35D - Main CTA, highlights */
--primary-orange-hover: oklch(70% 0.16 52);  /* #F58A4F - Hover states */
--primary-orange-light: oklch(78% 0.12 60);  /* #FEAC6D - Secondary highlights */
```

### Secondary Palette
```css
--secondary-teal: oklch(48% 0.07 200);       /* #357380 - Secondary elements */
--secondary-teal-hover: oklch(45% 0.08 195); /* #2B6F7A - Hover states */
--secondary-teal-light: oklch(54% 0.07 195); /* #438796 - Soft accents */
```

### Color Application Strategy

1. **Strategic Vibrancy**
   - Use vibrant colors to draw attention to key elements
   - Create "moments of delight" with color accents
   - Balance warm (orange/coral) with cool (teal/blue)

2. **The 80/20 Rule**
   - 80% neutral, professional structure
   - 20% vibrant, playful energy
   - Apply vibrant colors to focal points, not everything

3. **Gradients for Depth**
   - Use subtle gradients to add richness and dimension
   - Gradients should flow from warmer to cooler tones
   - Dark mode gradients are more pronounced for visual interest

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
.vs-hover:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}
```

### Animation Best Practices

1. **Purposeful Motion with Personality**
   - Animations should feel slightly more "springy" and playful
   - Use cubic-bezier(0.34, 1.56, 0.64, 1) for key hover effects to add bounce
   - Combine multiple properties (scale + translateY) for richer interactions

2. **Enhanced Feedback (20% more pronounced)**
   - Hover: More pronounced elevation (translateY(-4px)) + slight scale (1.02)
   - Press: Slight depression (translateY(1px)) with slight scale down (0.98)
   - Focus: More visible glow effects (especially in dark mode)
   - Transitions: Slightly longer duration (300-350ms) for more noticeable effects

3. **Creative Card Interactions**
   - Cards should rise higher on hover than typical corporate sites (4-6px vs 2-3px)
   - Add subtle rotation (0.5-1deg) to important cards for extra dynamism
   - Use slight scale effects (1.02-1.04) to create a "pop" feeling

## Component Examples with Vibrant Design + Dark Mode

### Vibrant Button Component
```jsx
// Primary button with VS Bubbly animation
<button 
  className="bg-[var(--primary-orange)] dark:bg-gradient-to-r dark:from-[var(--primary-orange)] dark:to-[var(--primary-orange-hover)]
           text-white px-6 py-3 rounded-[var(--border-radius-full)] 
           shadow-[var(--shadow-btn)] 
           transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
           hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-lg
           active:translate-y-[1px] active:scale-[0.98] active:shadow-sm"
>
  Primary Action
</button>

// Secondary button with playful hover
<button 
  className="border border-[var(--secondary-teal)] dark:border-white 
           rounded-[var(--border-radius-full)] px-6 py-3
           transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
           hover:bg-[rgba(53,115,128,0.05)] hover:translate-y-[-2px] hover:scale-[1.02]
           dark:hover:bg-[rgba(255,255,255,0.05)]"
  style={{ color: 'var(--secondary-teal)' }} 
  className="dark:text-white"
>
  Secondary Action
</button>
```

### Vibrant Card with Animation
```jsx
<div className="bg-white dark:bg-gradient-to-br dark:from-[var(--card-bg-navy)] dark:to-[rgba(12,67,99,0.8)]
             rounded-[var(--border-radius-lg)] p-6 
             shadow-[var(--shadow-md)] dark:shadow-[var(--shadow-lg)]
             transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
             hover:shadow-[var(--shadow-lg)] hover:translate-y-[-4px] hover:scale-[1.02] hover:rotate-[0.5deg]">
  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-hover)]
                 flex items-center justify-center mb-4">
    <Icon className="text-white" />
  </div>
  
  <h3 style={{ color: 'var(--text-navy)' }} className="dark:text-white text-xl font-medium mb-2">
    Feature Title
  </h3>
  
  <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/70">
    Feature description with vibrant personality and proper dark mode support.
  </p>
</div>
```

### Special CourseStats Component
The CourseStats component maintains its unique vibrant color scheme while implementing proper dark mode:

```jsx
<div className="stat-item">
  <div className="relative bg-white dark:bg-[#09232F] rounded-[var(--border-radius-lg)] p-6 
                border border-[rgba(0,0,0,0.05)] dark:border-white/5 
                transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:translate-y-[-6px] hover:scale-[1.03] hover:rotate-[0.5deg]
                group">
    {/* Light mode gradient with vibrant accent */}
    <div className="absolute inset-0 rounded-[var(--border-radius-lg)] 
                   opacity-100 dark:opacity-0 transition-all duration-500" 
         style={{ background: `linear-gradient(to bottom, white 30%, ${statColor}15 100%)` }}>
    </div>
    
    {/* Dark mode gradient with enhanced glow */}
    <div className="absolute inset-0 rounded-[var(--border-radius-lg)] 
                   opacity-0 dark:opacity-100 transition-all duration-500" 
         style={{ background: `linear-gradient(135deg, #09232F 0%, ${statColor}30 100%)` }}>
    </div>
    
    {/* Hover glow effect for dark mode */}
    <div className="absolute inset-0 rounded-[var(--border-radius-lg)]
                  opacity-0 dark:group-hover:opacity-100 transition-all duration-500 pointer-events-none"
         style={{ boxShadow: `0 0 25px ${statColor}40` }}>
    </div>
    
    {/* Content */}
    <div className="relative z-10 flex flex-col items-center">
      {/* Icon with playful springy animation */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
                     transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     group-hover:scale-[1.15] group-hover:translate-y-[-2px]"
           style={{ 
             background: `linear-gradient(135deg, ${statColor} 0%, ${statColorHover} 100%)`,
             boxShadow: `0 6px 15px ${statColor}40`
           }}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Value with enhanced scale and glow effect */}
      <div className="text-3xl font-bold mb-2 
                     transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     group-hover:scale-[1.15]" 
           style={{ 
             color: statColor, 
             textShadow: `0 2px 8px ${statColor}30`,
           }}>
        {value}
        {/* Subtle animated glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 blur-[8px] -z-10"
             style={{ background: `${statColor}20`, borderRadius: '8px' }}></div>
      </div>
      
      {/* Label with subtle animation */}
      <div style={{ color: 'var(--text-navy)' }} 
           className="dark:text-white text-sm font-medium transition-all duration-300 group-hover:translate-y-[2px]">
        {label}
      </div>
    </div>
  </div>
</div>
```

## Achieving the Perfect Balance

The VS brand uniquely balances creative energy with professional polish. This balance is crucial for selling a high-ticket product that appeals to both creative professionals and business leaders.

### The 80/20 Rule for VS Styling

- **80% Professional Structure**
  - Clean grid layouts and consistent spacing
  - Professional typography with clear hierarchy
  - Consistent component patterns
  - Thoughtful color usage with proper contrast
  
- **20% Creative Energy**
  - Enhanced "bubbly" animations (more pronounced than corporate sites)
  - Vibrant accent colors used strategically
  - Playful interaction details
  - Subtle creative flourishes (slight rotations, gradient accents)

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

### Text Color Implementation

**❌ WRONG - Will break in dark mode:**
```jsx
<p className="text-[var(--text-navy)]">This will NOT work in dark mode</p>
```

**✅ CORRECT - Works in both modes:**
```jsx
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">This works correctly</p>
```

### Background Color Implementation

**✅ CORRECT - This pattern works for backgrounds:**
```jsx
<div className="bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">Content here</div>
```

### Always Test Both Modes

After making styling changes:
1. Test in light mode first
2. Test in dark mode by adding `dark` class to HTML element
3. Verify all text is visible in BOTH modes

## Examples of Perfect Balance

- **Cards**: Professional structure with clean layout + bubbly hover animations
- **Buttons**: Standard placement and sizing + playful hover effects
- **Stats**: Professional data presentation + vibrant colors and dynamic animations
- **Forms**: Clean, accessible inputs + subtle animated feedback that feels satisfying

Remember: The VS brand is 80% professional structure with 20% creative energy. Our unique balance creates an experience that's both fun and premium.