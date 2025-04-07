import React from 'react';

/**
 * Theme Style Guide Component
 * 
 * This component showcases all the available theme-aware utility classes
 * for consistent styling across the application.
 */
const ThemeStyleGuide: React.FC = () => {
  return (
    <div className="p-8 bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-theme-primary mb-8">Theme Utility Classes Style Guide</h1>
        <p className="text-theme-secondary mb-12">
          This guide showcases all the available theme-aware utility classes for consistent styling across the application.
          All these classes automatically adapt to light and dark themes.
        </p>

        {/* Text Color Utilities */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Text Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-primary mb-2">text-theme-primary</p>
              <p className="text-xs text-theme-tertiary">Main text color</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-secondary mb-2">text-theme-secondary</p>
              <p className="text-xs text-theme-tertiary">Secondary text (80% opacity)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-tertiary mb-2">text-theme-tertiary</p>
              <p className="text-xs text-theme-tertiary">Tertiary text (60% opacity)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-subtle mb-2">text-theme-subtle</p>
              <p className="text-xs text-theme-tertiary">Subtle text (40% opacity)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-accent mb-2">text-theme-accent</p>
              <p className="text-xs text-theme-tertiary">Accent text (teal)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-error mb-2">text-theme-error</p>
              <p className="text-xs text-theme-tertiary">Error text (red)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-accent-tertiary mb-2">text-theme-accent-tertiary</p>
              <p className="text-xs text-theme-tertiary">Tertiary accent (coral)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-accent-quaternary mb-2">text-theme-accent-quaternary</p>
              <p className="text-xs text-theme-tertiary">Quaternary accent (red)</p>
            </div>
            <div className="p-4 bg-theme-accent-secondary text-white rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary mb-2">text-theme-on-primary</p>
              <p className="text-xs text-white/80">Text on colored backgrounds</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm overflow-hidden">
              <p className="text-theme-gradient mb-2">text-theme-gradient</p>
              <p className="text-xs text-theme-tertiary">Gradient text fill</p>
            </div>
          </div>
        </section>

        {/* Background Colors */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Background Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-theme-primary rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-primary</p>
              <p className="text-xs text-theme-on-primary/80">Main background</p>
            </div>
            <div className="p-4 bg-theme-secondary rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-secondary</p>
              <p className="text-xs text-theme-on-primary/80">Secondary background</p>
            </div>
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">bg-theme-surface</p>
              <p className="text-xs text-theme-tertiary">Surface background</p>
            </div>
            <div className="p-4 bg-theme-card rounded-theme-md shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">bg-theme-card</p>
              <p className="text-xs text-theme-tertiary">Card background</p>
            </div>
            <div className="p-4 bg-theme-accent rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-accent</p>
              <p className="text-xs text-theme-on-primary/80">Accent background</p>
            </div>
            <div className="p-4 bg-theme-error rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-error</p>
              <p className="text-xs text-theme-on-primary/80">Error background</p>
            </div>
            <div className="p-4 bg-theme-accent-secondary rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-accent-secondary</p>
              <p className="text-xs text-theme-on-primary/80">Secondary accent</p>
            </div>
            <div className="p-4 bg-theme-accent-tertiary rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-accent-tertiary</p>
              <p className="text-xs text-theme-on-primary/80">Tertiary accent</p>
            </div>
            <div className="p-4 relative rounded-theme-md shadow-theme-sm overflow-hidden">
              <div className="absolute inset-0 bg-theme-glow -z-10"></div>
              <p className="text-theme-primary font-medium mb-2">bg-theme-glow</p>
              <p className="text-xs text-theme-tertiary">Radial gradient glow</p>
            </div>
            <div className="p-4 bg-theme-pattern rounded-theme-md shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">bg-theme-pattern</p>
              <p className="text-xs text-theme-tertiary">Pattern background</p>
            </div>
          </div>
        </section>

        {/* Gradient Backgrounds */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Gradient Backgrounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-theme-gradient rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-gradient</p>
              <p className="text-xs text-theme-on-primary/80">Main gradient background</p>
            </div>
            <div className="p-4 bg-theme-gradient-card rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-gradient-card</p>
              <p className="text-xs text-theme-on-primary/80">Card gradient background</p>
            </div>
            <div className="p-4 bg-theme-gradient-primary rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-gradient-primary</p>
              <p className="text-xs text-theme-on-primary/80">Primary accent gradient</p>
            </div>
            <div className="p-4 bg-theme-gradient-secondary rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-gradient-secondary</p>
              <p className="text-xs text-theme-on-primary/80">Secondary accent gradient</p>
            </div>
            <div className="p-4 bg-theme-gradient-accent rounded-theme-md shadow-theme-sm">
              <p className="text-theme-on-primary font-medium mb-2">bg-theme-gradient-accent</p>
              <p className="text-xs text-theme-on-primary/80">Coral-to-red gradient</p>
            </div>
            <div className="p-6 relative rounded-theme-md shadow-theme-sm overflow-hidden bg-theme-bg-surface">
              <div className="absolute inset-x-0 bottom-0 h-16 bg-theme-gradient-overlay-light"></div>
              <p className="text-theme-primary font-medium mb-2">bg-theme-gradient-overlay-light</p>
              <p className="text-xs text-theme-tertiary">Fade-to-background overlay</p>
            </div>
          </div>
        </section>

        {/* Borders */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Borders</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-light shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">border-theme-light</p>
              <p className="text-xs text-theme-tertiary">Light border (5% opacity)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">border-theme-border</p>
              <p className="text-xs text-theme-tertiary">Standard border</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-primary shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">border-theme-primary</p>
              <p className="text-xs text-theme-tertiary">Primary color border</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-accent shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">border-theme-accent</p>
              <p className="text-xs text-theme-tertiary">Accent border</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-destructive shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">border-theme-destructive</p>
              <p className="text-xs text-theme-tertiary">Destructive border</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-border-medium shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">border-theme-border-medium</p>
              <p className="text-xs text-theme-tertiary">Medium opacity border</p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-theme-bg-surface rounded-theme-sm border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">rounded-theme-sm</p>
              <p className="text-xs text-theme-tertiary">Small radius (8px)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">rounded-theme-md</p>
              <p className="text-xs text-theme-tertiary">Medium radius (12px)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-lg border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">rounded-theme-lg</p>
              <p className="text-xs text-theme-tertiary">Large radius (16px)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-xl border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">rounded-theme-xl</p>
              <p className="text-xs text-theme-tertiary">Extra large (24px)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-2xl border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">rounded-theme-2xl</p>
              <p className="text-xs text-theme-tertiary">Double XL (32px)</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-full border-theme-border shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">rounded-theme-full</p>
              <p className="text-xs text-theme-tertiary">Circular (9999px)</p>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Shadows</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm">
              <p className="text-theme-primary font-medium mb-2">shadow-theme-sm</p>
              <p className="text-xs text-theme-tertiary">Small shadow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-md">
              <p className="text-theme-primary font-medium mb-2">shadow-theme-md</p>
              <p className="text-xs text-theme-tertiary">Medium shadow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-lg">
              <p className="text-theme-primary font-medium mb-2">shadow-theme-lg</p>
              <p className="text-xs text-theme-tertiary">Large shadow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-card">
              <p className="text-theme-primary font-medium mb-2">shadow-theme-card</p>
              <p className="text-xs text-theme-tertiary">Card shadow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-btn">
              <p className="text-theme-primary font-medium mb-2">shadow-theme-btn</p>
              <p className="text-xs text-theme-tertiary">Button shadow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-primary">
              <p className="text-theme-primary font-medium mb-2">shadow-theme-primary</p>
              <p className="text-xs text-theme-tertiary">Primary accent shadow + glow</p>
            </div>
          </div>
        </section>

        {/* Glow Effects (Dark Mode) */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Glow Effects (Dark Mode)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-theme-bg-surface rounded-theme-md glow-theme-primary">
              <p className="text-theme-primary font-medium mb-2">glow-theme-primary</p>
              <p className="text-xs text-theme-tertiary">Orange primary glow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md glow-theme-secondary">
              <p className="text-theme-primary font-medium mb-2">glow-theme-secondary</p>
              <p className="text-xs text-theme-tertiary">Teal secondary glow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md glow-theme-tertiary">
              <p className="text-theme-primary font-medium mb-2">glow-theme-tertiary</p>
              <p className="text-xs text-theme-tertiary">Coral tertiary glow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md glow-theme-accent">
              <p className="text-theme-primary font-medium mb-2">glow-theme-accent</p>
              <p className="text-xs text-theme-tertiary">Accent color glow</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md glow-theme-blue">
              <p className="text-theme-primary font-medium mb-2">glow-theme-blue</p>
              <p className="text-xs text-theme-tertiary">Blue accent glow</p>
            </div>
          </div>
        </section>

        {/* Transitions */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Transitions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm transition-theme-fast hover:scale-105">
              <p className="text-theme-primary font-medium mb-2">transition-theme-fast</p>
              <p className="text-xs text-theme-tertiary">Fast (150ms) - Hover me!</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm transition-theme-normal hover:scale-105">
              <p className="text-theme-primary font-medium mb-2">transition-theme-normal</p>
              <p className="text-xs text-theme-tertiary">Normal (300ms) - Hover me!</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm transition-theme-bounce hover:scale-105">
              <p className="text-theme-primary font-medium mb-2">transition-theme-bounce</p>
              <p className="text-xs text-theme-tertiary">Bouncy (350ms) - Hover me!</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-md shadow-theme-sm transition-theme-slow hover:scale-105">
              <p className="text-theme-primary font-medium mb-2">transition-theme-slow</p>
              <p className="text-xs text-theme-tertiary">Slow (500ms) - Hover me!</p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Component Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-theme">
              <p className="text-theme-primary font-medium mb-2">card-theme</p>
              <p className="text-xs text-theme-tertiary">Card with theme-aware styling</p>
            </div>
            <div className="relative">
              <button className="btn-theme-primary px-4 py-2 rounded-theme-full w-full">btn-theme-primary</button>
            </div>
            <div className="relative">
              <button className="btn-theme-secondary px-4 py-2 rounded-theme-full w-full">btn-theme-secondary</button>
            </div>
            <div className="pro-tip-theme">
              <p className="font-medium mb-2">pro-tip-theme</p>
              <p className="text-xs opacity-80">Accent background callout component</p>
            </div>
            <div className="relative h-32 bg-theme-bg-surface rounded-theme-lg p-4 overflow-hidden">
              <div className="float-theme-element-primary top-4 left-4"></div>
              <p className="text-theme-primary font-medium mb-2 relative z-10">float-theme-element-primary</p>
              <p className="text-xs text-theme-tertiary relative z-10">Floating element with animation</p>
            </div>
            <div className="relative h-32 bg-theme-bg-surface rounded-theme-lg p-4 overflow-hidden">
              <div className="float-theme-element-secondary bottom-4 right-4"></div>
              <p className="text-theme-primary font-medium mb-2 relative z-10">float-theme-element-secondary</p>
              <p className="text-xs text-theme-tertiary relative z-10">Secondary floating element</p>
            </div>
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Interactive Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 bg-theme-bg-surface rounded-theme-lg shadow-theme-sm hover-bubbly">
              <p className="text-theme-primary font-medium mb-2">hover-bubbly</p>
              <p className="text-xs text-theme-tertiary">Springy hover effect</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-lg shadow-theme-sm hover-bubbly-sm">
              <p className="text-theme-primary font-medium mb-2">hover-bubbly-sm</p>
              <p className="text-xs text-theme-tertiary">Subtle hover effect</p>
            </div>
            <div className="p-4 bg-theme-bg-surface rounded-theme-lg shadow-theme-sm hover-bubbly-lg">
              <p className="text-theme-primary font-medium mb-2">hover-bubbly-lg</p>
              <p className="text-xs text-theme-tertiary">Pronounced hover effect</p>
            </div>
          </div>
        </section>

        {/* Eyeball Component (Just for Fun) */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Eyeball Component</h2>
          <div className="flex gap-8 items-center justify-center">
            <div className="eyeball-theme w-16 h-16">
              <div className="eyeball-theme-iris">
                <div className="eyeball-theme-pupil"></div>
              </div>
              <div className="eyeball-theme-highlight"></div>
            </div>
            <div className="eyeball-theme w-24 h-24">
              <div className="eyeball-theme-iris">
                <div className="eyeball-theme-pupil"></div>
              </div>
              <div className="eyeball-theme-highlight"></div>
            </div>
            <div className="eyeball-theme w-32 h-32">
              <div className="eyeball-theme-iris">
                <div className="eyeball-theme-pupil"></div>
              </div>
              <div className="eyeball-theme-highlight"></div>
            </div>
          </div>
        </section>

        {/* Grid Patterns */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">Grid & Pattern Backgrounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-32 bg-theme-bg-surface rounded-theme-lg p-4 grid-theme-dot">
              <p className="text-theme-primary font-medium mb-2">grid-theme-dot</p>
              <p className="text-xs text-theme-tertiary">Dot pattern background</p>
            </div>
            <div className="h-32 bg-theme-bg-surface rounded-theme-lg p-4 grid-theme-line">
              <p className="text-theme-primary font-medium mb-2">grid-theme-line</p>
              <p className="text-xs text-theme-tertiary">Line grid background</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ThemeStyleGuide;