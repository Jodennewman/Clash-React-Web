import React from 'react';

/**
 * Compact Theme Style Guide Component
 * 
 * Shows all theme-aware utility classes in a more compact layout.
 */
const ThemeStyleGuide: React.FC = () => {
  return (
    <div className="p-4 bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-theme-primary mb-2">Theme Utility Classes</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            {/* Text Colors */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Text Colors</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-primary">text-theme-primary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-secondary">text-theme-secondary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-tertiary">text-theme-tertiary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-subtle">text-theme-subtle</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-accent">text-theme-accent</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-error">text-theme-error</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="text-theme-gradient font-medium">text-theme-gradient</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="vs-text-gradient-orange font-medium">vs-text-gradient-orange</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="vs-text-gradient-teal font-medium">vs-text-gradient-teal</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm text-xs">
                  <span className="bg-theme-gradient-text font-medium">bg-theme-gradient-text</span>
                </div>
              </div>
            </section>

            {/* Background Colors */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Background Colors</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-primary rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-primary</span>
                </div>
                <div className="p-2 bg-theme-secondary rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-secondary</span>
                </div>
                <div className="p-2 bg-theme-surface rounded-theme-sm text-xs">
                  <span className="text-theme-primary">bg-theme-surface</span>
                </div>
                <div className="p-2 bg-theme-card rounded-theme-sm text-xs">
                  <span className="text-theme-primary">bg-theme-card</span>
                </div>
                <div className="p-2 bg-theme-accent rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-accent</span>
                </div>
                <div className="p-2 bg-theme-accent-secondary rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-accent-secondary</span>
                </div>
              </div>
            </section>

            {/* Gradients */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Gradients</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-gradient rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-gradient</span>
                </div>
                <div className="p-2 bg-theme-gradient-card rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-gradient-card</span>
                </div>
                <div className="p-2 bg-theme-gradient-primary rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-gradient-primary</span>
                </div>
                <div className="p-2 bg-theme-gradient-secondary rounded-theme-sm text-xs">
                  <span className="text-theme-on-primary">bg-theme-gradient-secondary</span>
                </div>
              </div>
            </section>

            {/* Borders */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Borders</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm border-theme-light text-xs">
                  <span className="text-theme-primary">border-theme-light</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm border-theme-border text-xs">
                  <span className="text-theme-primary">border-theme-border</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm border-theme-primary text-xs">
                  <span className="text-theme-primary">border-theme-primary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm border-theme-accent text-xs">
                  <span className="text-theme-primary">border-theme-accent</span>
                </div>
              </div>
            </section>

            {/* Border Radius */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Border Radius</h2>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm border-theme-border text-xs">
                  <span className="text-theme-primary">rounded-theme-sm</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-md border-theme-border text-xs">
                  <span className="text-theme-primary">rounded-theme-md</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-lg border-theme-border text-xs">
                  <span className="text-theme-primary">rounded-theme-lg</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            {/* Shadows */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Shadows</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm text-xs">
                  <span className="text-theme-primary">shadow-theme-sm</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-md text-xs">
                  <span className="text-theme-primary">shadow-theme-md</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-lg text-xs">
                  <span className="text-theme-primary">shadow-theme-lg</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-btn text-xs">
                  <span className="text-theme-primary">shadow-theme-btn</span>
                </div>
              </div>
            </section>

            {/* Glow Effects */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Glow Effects</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm glow-theme-primary text-xs">
                  <span className="text-theme-primary">glow-theme-primary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm glow-theme-secondary text-xs">
                  <span className="text-theme-primary">glow-theme-secondary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm glow-theme-tertiary text-xs">
                  <span className="text-theme-primary">glow-theme-tertiary</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm glow-theme-accent text-xs">
                  <span className="text-theme-primary">glow-theme-accent</span>
                </div>
              </div>
            </section>

            {/* Transitions */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Transitions</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm transition-theme-fast hover:scale-105 text-xs">
                  <span className="text-theme-primary">transition-theme-fast</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm transition-theme-normal hover:scale-105 text-xs">
                  <span className="text-theme-primary">transition-theme-normal</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm transition-theme-bounce hover:scale-105 text-xs">
                  <span className="text-theme-primary">transition-theme-bounce</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm transition-theme-slow hover:scale-105 text-xs">
                  <span className="text-theme-primary">transition-theme-slow</span>
                </div>
              </div>
            </section>

            {/* Component Examples */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Components</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 card-theme text-xs">
                  <span className="text-theme-primary">card-theme</span>
                </div>
                <button className="btn-theme-primary p-2 rounded-theme-full text-xs">btn-theme-primary</button>
                <button className="btn-theme-secondary p-2 rounded-theme-full text-xs">btn-theme-secondary</button>
                <div className="p-2 pro-tip-theme text-xs">
                  <span>pro-tip-theme</span>
                </div>
              </div>
            </section>

            {/* Interactive Elements */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Interactive</h2>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm hover-bubbly text-xs">
                  <span className="text-theme-primary">hover-bubbly</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm hover-bubbly-sm text-xs">
                  <span className="text-theme-primary">hover-bubbly-sm</span>
                </div>
                <div className="p-2 bg-theme-bg-surface rounded-theme-sm shadow-theme-sm hover-bubbly-lg text-xs">
                  <span className="text-theme-primary">hover-bubbly-lg</span>
                </div>
              </div>
            </section>

            {/* Patterns & Floating Elements */}
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-theme-primary mb-2">Patterns & Floating</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 h-16 bg-theme-bg-surface rounded-theme-sm grid-theme-dot text-xs overflow-hidden">
                  <span className="text-theme-primary">grid-theme-dot</span>
                </div>
                <div className="p-2 h-16 bg-theme-bg-surface rounded-theme-sm grid-theme-line text-xs overflow-hidden">
                  <span className="text-theme-primary">grid-theme-line</span>
                </div>
                <div className="relative p-2 h-16 bg-theme-bg-surface rounded-theme-sm text-xs overflow-hidden">
                  <div className="float-theme-element-primary top-2 left-2"></div>
                  <span className="text-theme-primary relative z-10">float-theme-element-primary</span>
                </div>
                <div className="relative p-2 h-16 bg-theme-bg-surface rounded-theme-sm text-xs overflow-hidden">
                  <div className="float-theme-element-secondary bottom-2 right-2"></div>
                  <span className="text-theme-primary relative z-10">float-theme-element-secondary</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Eyeball Component - Single Row */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-theme-primary mb-2">Eyeball Component</h2>
          <div className="flex gap-4 items-center justify-center">
            <div className="eyeball-theme w-8 h-8">
              <div className="eyeball-theme-iris">
                <div className="eyeball-theme-pupil"></div>
              </div>
              <div className="eyeball-theme-highlight"></div>
            </div>
            <div className="eyeball-theme w-12 h-12">
              <div className="eyeball-theme-iris">
                <div className="eyeball-theme-pupil"></div>
              </div>
              <div className="eyeball-theme-highlight"></div>
            </div>
            <div className="eyeball-theme w-16 h-16">
              <div className="eyeball-theme-iris">
                <div className="eyeball-theme-pupil"></div>
              </div>
              <div className="eyeball-theme-highlight"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemeStyleGuide;