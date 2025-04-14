import React from 'react';
import { AnimatedButton } from './marble-buttons/AnimatedButton';

/**
 * Comprehensive Theme Style Guide Component
 * 
 * Shows all theme-aware utility classes organized by category.
 * Includes all available styling options: colors, gradients, shadows, glows, transitions, etc.
 */
const ThemeStyleGuide: React.FC = () => {
  return (
    <div className="p-6 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-theme-primary mb-6">Complete Theme Utility Classes</h1>
        
        {/* Typography - Font Sizes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Typography - Font Sizes</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md">
            <div className="text-xs text-theme-primary mb-3">text-xs: Extra Small (12px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-sm text-theme-primary mb-3">text-sm: Small (14px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-base text-theme-primary mb-3">text-base: Base (16px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-lg text-theme-primary mb-3">text-lg: Large (18px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-xl text-theme-primary mb-3">text-xl: Extra Large (20px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-2xl text-theme-primary mb-3">text-2xl: 2XL (24px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-3xl text-theme-primary mb-3">text-3xl: 3XL (30px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-4xl text-theme-primary mb-3">text-4xl: 4XL (36px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-5xl text-theme-primary mb-3">text-5xl: 5XL (48px) - The quick brown fox jumps over the lazy dog</div>
            <div className="text-6xl text-theme-primary mb-3">text-6xl: 6XL (60px) - The quick brown fox</div>
            <div className="text-7xl text-theme-primary mb-3">text-7xl: 7XL (72px) - The quick brown fox</div>
            <div className="text-8xl text-theme-primary mb-3">text-8xl: 8XL (96px) - Quick fox</div>
            <div className="text-9xl text-theme-primary">text-9xl: 9XL (128px) - Fox</div>
          </div>
        </section>

        {/* Typography - Font Weights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Typography - Font Weights</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md grid grid-cols-2">
            <div>
              <div className="font-thin text-lg text-theme-primary mb-3">font-thin (100) - The quick brown fox</div>
              <div className="font-extralight text-lg text-theme-primary mb-3">font-extralight (200) - The quick brown fox</div>
              <div className="font-light text-lg text-theme-primary mb-3">font-light (300) - The quick brown fox</div>
              <div className="font-normal text-lg text-theme-primary mb-3">font-normal (400) - The quick brown fox</div>
              <div className="font-medium text-lg text-theme-primary mb-3">font-medium (500) - The quick brown fox</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-theme-primary mb-3">font-semibold (600) - The quick brown fox</div>
              <div className="font-bold text-lg text-theme-primary mb-3">font-bold (700) - The quick brown fox</div>
              <div className="font-extrabold text-lg text-theme-primary mb-3">font-extrabold (800) - The quick brown fox</div>
              <div className="font-black text-lg text-theme-primary mb-3">font-black (900) - The quick brown fox</div>
            </div>
          </div>
        </section>

        {/* Typography - Letter Spacing */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Typography - Letter Spacing</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md">
            <div className="tracking-tighter text-lg text-theme-primary mb-3">tracking-tighter - The quick brown fox jumps over the lazy dog</div>
            <div className="tracking-tight text-lg text-theme-primary mb-3">tracking-tight - The quick brown fox jumps over the lazy dog</div>
            <div className="tracking-normal text-lg text-theme-primary mb-3">tracking-normal - The quick brown fox jumps over the lazy dog</div>
            <div className="tracking-wide text-lg text-theme-primary mb-3">tracking-wide - The quick brown fox jumps over the lazy dog</div>
            <div className="tracking-wider text-lg text-theme-primary mb-3">tracking-wider - The quick brown fox jumps over the lazy dog</div>
            <div className="tracking-widest text-lg text-theme-primary">tracking-widest - The quick brown fox jumps over the lazy dog</div>
          </div>
        </section>

        {/* Typography - Line Height */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Typography - Line Height</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md grid grid-cols-2 gap-4">
            <div>
              <div className="leading-none text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-none - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
              <div className="leading-tight text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-tight - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
              <div className="leading-snug text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-snug - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
              <div className="leading-normal text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-normal - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
            </div>
            <div>
              <div className="leading-relaxed text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-relaxed - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
              <div className="leading-loose text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-loose - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
              <div className="leading-[2.5] text-lg text-theme-primary mb-3 border border-theme-primary p-2">leading-[2.5] (custom) - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
              <div className="leading-[3] text-lg text-theme-primary border border-theme-primary p-2">leading-[3] (custom) - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.</div>
            </div>
          </div>
        </section>

        {/* Typography - Text Alignment & Decoration */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Typography - Text Alignment & Decoration</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md grid grid-cols-2 gap-4">
            <div>
              <div className="text-left text-lg text-theme-primary mb-3">text-left - The quick brown fox jumps over the lazy dog</div>
              <div className="text-center text-lg text-theme-primary mb-3">text-center - The quick brown fox jumps over the lazy dog</div>
              <div className="text-right text-lg text-theme-primary mb-3">text-right - The quick brown fox jumps over the lazy dog</div>
              <div className="text-justify text-lg text-theme-primary mb-3">text-justify - The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly. Pack my box with five dozen liquor jugs.</div>
            </div>
            <div>
              <div className="underline text-lg text-theme-primary mb-3">underline - The quick brown fox jumps over the lazy dog</div>
              <div className="line-through text-lg text-theme-primary mb-3">line-through - The quick brown fox jumps over the lazy dog</div>
              <div className="overline text-lg text-theme-primary mb-3">overline - The quick brown fox jumps over the lazy dog</div>
              <div className="no-underline text-lg text-theme-primary mb-3">no-underline - The quick brown fox jumps over the lazy dog</div>
              <div className="decoration-wavy underline decoration-theme-accent decoration-2 text-lg text-theme-primary mb-3">decoration-wavy underline decoration-theme-accent decoration-2</div>
              <div className="decoration-dotted underline decoration-theme-primary decoration-4 text-lg text-theme-primary">decoration-dotted underline decoration-theme-primary decoration-4</div>
            </div>
          </div>
        </section>

        {/* Typography - Text Transform */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Typography - Text Transform</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md">
            <div className="uppercase text-lg text-theme-primary mb-3">uppercase - The quick brown fox jumps over the lazy dog</div>
            <div className="lowercase text-lg text-theme-primary mb-3">lowercase - The Quick Brown Fox Jumps Over The Lazy Dog</div>
            <div className="capitalize text-lg text-theme-primary mb-3">capitalize - the quick brown fox jumps over the lazy dog</div>
            <div className="normal-case text-lg text-theme-primary">normal-case - THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</div>
          </div>
        </section>

        {/* Text Colors */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Text Colors</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">text-theme-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-secondary">text-theme-secondary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-tertiary">text-theme-tertiary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-subtle">text-theme-subtle</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-accent">text-theme-accent</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-error">text-theme-error</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-bg">text-theme-bg</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary-light">text-theme-primary-light</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">text-theme-on-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-accent-tertiary">text-theme-accent-tertiary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-accent-secondary">text-theme-accent-secondary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-accent-quaternary">text-theme-accent-quaternary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-accent">text-accent</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-accent-red">text-accent-red</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-primary">text-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-secondary">text-secondary</span>
            </div>
          </div>
        </section>
        
        {/* Coral and Red Color Palette */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Coral & Red Color Palette</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {/* Text Colors */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <div className="text-accent font-semibold mb-2">text-accent</div>
              <div className="text-accent-red font-semibold mb-2">text-accent-red</div>
              <div className="text-red-500 font-semibold mb-2">text-red-500</div>
              <div className="text-red-600 font-semibold mb-2">text-red-600</div>
              <div className="text-rose-500 font-semibold mb-2">text-rose-500</div>
              <div className="text-pink-500 font-semibold">text-pink-500</div>
            </div>
            
            {/* Background Colors */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm space-y-2">
              <div className="p-2 bg-accent rounded-theme-sm text-white">bg-accent</div>
              <div className="p-2 bg-accent-red rounded-theme-sm text-white">bg-accent-red</div>
              <div className="p-2 bg-red-500 rounded-theme-sm text-white">bg-red-500</div>
              <div className="p-2 bg-red-600 rounded-theme-sm text-white">bg-red-600</div>
              <div className="p-2 bg-rose-500 rounded-theme-sm text-white">bg-rose-500</div>
              <div className="p-2 bg-pink-500 rounded-theme-sm text-white">bg-pink-500</div>
            </div>
            
            {/* Gradient Background Colors */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm space-y-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-theme-sm text-white">from-red-500 to-orange-500</div>
              <div className="p-2 bg-gradient-to-r from-rose-400 to-red-500 rounded-theme-sm text-white">from-rose-400 to-red-500</div>
              <div className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-theme-sm text-white">from-pink-500 to-red-500</div>
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-theme-sm text-white">from-red-500 to-orange-500 (br)</div>
              <div className="p-2 bg-gradient-to-tr from-red-600 to-orange-400 rounded-theme-sm text-white">from-red-600 to-orange-400 (tr)</div>
              <div className="p-2 bg-gradient-to-r from-theme-accent to-red-500 rounded-theme-sm text-white">from-theme-accent to-red-500</div>
            </div>
            
            {/* Border Colors */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm grid grid-cols-2 gap-2">
              <div className="p-2 border-2 border-accent rounded-theme-sm">border-accent</div>
              <div className="p-2 border-2 border-accent-red rounded-theme-sm">border-accent-red</div>
              <div className="p-2 border-2 border-red-500 rounded-theme-sm">border-red-500</div>
              <div className="p-2 border-2 border-red-600 rounded-theme-sm">border-red-600</div>
              <div className="p-2 border-2 border-rose-500 rounded-theme-sm">border-rose-500</div>
              <div className="p-2 border-2 border-pink-500 rounded-theme-sm">border-pink-500</div>
            </div>
            
            {/* Opacity Variations */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm space-y-2">
              <div className="p-2 bg-accent rounded-theme-sm text-white">bg-accent</div>
              <div className="p-2 bg-accent/80 rounded-theme-sm text-white">bg-accent/80</div>
              <div className="p-2 bg-accent/60 rounded-theme-sm text-white">bg-accent/60</div>
              <div className="p-2 bg-accent/40 rounded-theme-sm text-white">bg-accent/40</div>
              <div className="p-2 bg-accent/20 rounded-theme-sm text-white">bg-accent/20</div>
              <div className="p-2 bg-accent/10 rounded-theme-sm text-theme-primary">bg-accent/10</div>
            </div>
            
            {/* Coral Buttons */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm flex flex-col gap-2">
              <button className="p-2 bg-accent hover:bg-accent/90 text-white rounded-theme-md shadow-sm transition-colors">
                Coral Button
              </button>
              <button className="p-2 bg-accent-red hover:bg-accent-red/90 text-white rounded-theme-md shadow-sm transition-colors">
                Red Button
              </button>
              <button className="p-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-theme-md shadow-sm transition-colors">
                Gradient Button
              </button>
              <button className="p-2 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-theme-md shadow-sm transition-colors">
                Outline Button
              </button>
              <button className="p-2 border border-accent text-accent bg-accent/10 hover:bg-accent/20 rounded-theme-md shadow-sm transition-colors">
                Ghost Button
              </button>
            </div>
            
            {/* Hover & Focus Styles */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm space-y-2">
              <div className="p-2 bg-theme-surface hover:bg-accent hover:text-white border border-accent text-accent rounded-theme-sm transition-colors cursor-pointer">
                hover:bg-accent
              </div>
              <div className="p-2 bg-theme-surface hover:text-accent rounded-theme-sm transition-colors cursor-pointer">
                hover:text-accent
              </div>
              <div className="p-2 bg-theme-surface hover:border-accent border rounded-theme-sm transition-colors cursor-pointer">
                hover:border-accent
              </div>
              <div className="group p-2 bg-theme-surface rounded-theme-sm cursor-pointer">
                <span className="text-theme-primary group-hover:text-accent transition-colors">group-hover:text-accent</span>
              </div>
              <div className="p-2 bg-theme-surface focus:bg-accent focus:text-white focus:outline-none border border-accent rounded-theme-sm transition-colors">
                focus:bg-accent (click me)
              </div>
            </div>
            
            {/* Coral Box Shadows */}
            <div className="p-4 bg-theme-surface rounded-theme-md shadow-theme-sm space-y-3">
              <div className="p-3 bg-white shadow-sm shadow-accent/20 rounded-theme-sm">
                shadow-accent/20
              </div>
              <div className="p-3 bg-white shadow-md shadow-accent/30 rounded-theme-sm">
                shadow-accent/30
              </div>
              <div className="p-3 bg-white shadow-lg shadow-accent/40 rounded-theme-sm">
                shadow-accent/40
              </div>
              <div className="p-3 bg-white shadow-xl shadow-red-500/30 rounded-theme-sm">
                shadow-red-500/30
              </div>
            </div>
          </div>
        </section>

        {/* Text Gradients */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Text Gradients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-gradient font-medium">text-theme-gradient</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="vs-text-gradient-orange font-medium">vs-text-gradient-orange</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="vs-text-gradient-teal font-medium">vs-text-gradient-teal</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="bg-theme-gradient-text font-medium">bg-theme-gradient-text</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="gradient-text font-medium">gradient-text</span>
            </div>
          </div>
        </section>
        
        {/* Background Colors */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Background Colors</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            <div className="p-3 bg-theme-primary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-primary</span>
            </div>
            <div className="p-3 bg-theme-secondary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-secondary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-surface</span>
            </div>
            <div className="p-3 bg-theme-card rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-card</span>
            </div>
            <div className="p-3 bg-theme-accent rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-accent</span>
            </div>
            <div className="p-3 bg-theme-error rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-error</span>
            </div>
            <div className="p-3 bg-theme-bg rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-bg</span>
            </div>
            <div className="p-3 bg-theme-border rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-border</span>
            </div>
            <div className="p-3 bg-theme-custom rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-custom</span>
            </div>
            <div className="p-3 bg-theme-glow rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-glow</span>
            </div>
            <div className="p-3 bg-theme-content rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-content</span>
            </div>
            <div className="p-3 bg-theme-on rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-on</span>
            </div>
            <div className="p-3 bg-theme-accent-secondary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-accent-secondary</span>
            </div>
            <div className="p-3 bg-theme-accent-tertiary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-accent-tertiary</span>
            </div>
            <div className="p-3 bg-theme-accent-quaternary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-accent-quaternary</span>
            </div>
            <div className="p-3 bg-theme-bg-primary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-bg-primary</span>
            </div>
            <div className="p-3 bg-theme-primary-light rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-primary-light</span>
            </div>
            <div className="p-3 bg-theme-accent-secondary-light rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-accent-secondary-light</span>
            </div>
            <div className="p-3 bg-theme-primary-hover rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-primary-hover</span>
            </div>
            <div className="p-3 bg-theme-bg-light rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-bg-light</span>
            </div>
            <div className="p-3 bg-theme-border-light rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">bg-theme-border-light</span>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Gradients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-theme-gradient rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient</span>
            </div>
            <div className="p-3 bg-theme-gradient-card rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-card</span>
            </div>
            <div className="p-3 bg-theme-gradient-primary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-primary</span>
            </div>
            <div className="p-3 bg-theme-gradient-secondary rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-secondary</span>
            </div>
            <div className="p-3 bg-theme-gradient-accent rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-accent</span>
            </div>
            <div className="p-3 bg-theme-gradient-overlay-light rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-overlay-light</span>
            </div>
            <div className="p-3 bg-theme-gradient-overlay-left rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-overlay-left</span>
            </div>
            <div className="p-3 bg-theme-gradient-overlay-right rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">bg-theme-gradient-overlay-right</span>
            </div>
          </div>
        </section>

        {/* Button Gradients */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Button Gradients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 vs-btn-primary-gradient rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-primary-gradient</span>
            </div>
            <div className="p-3 vs-btn-primary-gradient-hover rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-primary-gradient-hover</span>
            </div>
            <div className="p-3 vs-btn-secondary-gradient rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-secondary-gradient</span>
            </div>
            <div className="p-3 vs-btn-secondary-gradient-hover rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-secondary-gradient-hover</span>
            </div>
            <div className="p-3 vs-btn-vibrant-gradient rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-vibrant-gradient</span>
            </div>
            <div className="p-3 vs-btn-vibrant-gradient-hover rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-vibrant-gradient-hover</span>
            </div>
            <div className="p-3 vs-btn-destructive-gradient rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-destructive-gradient</span>
            </div>
            <div className="p-3 vs-btn-destructive-gradient-hover rounded-theme-md shadow-theme-sm">
              <span className="text-theme-on-primary">vs-btn-destructive-gradient-hover</span>
            </div>
          </div>
        </section>

        {/* Borders */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Borders</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-light">
              <span className="text-theme-primary">border-theme-light</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-primary">
              <span className="text-theme-primary">border-theme-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">border-theme-border</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-accent">
              <span className="text-theme-primary">border-theme-accent</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-destructive">
              <span className="text-theme-primary">border-theme-destructive</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-error">
              <span className="text-theme-primary">border-theme-error</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-on-primary">
              <span className="text-theme-primary">border-theme-on-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-accent-secondary">
              <span className="text-theme-primary">border-theme-accent-secondary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-border-medium">
              <span className="text-theme-primary">border-theme-border-medium</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-border-light">
              <span className="text-theme-primary">border-theme-border-light</span>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Border Radius</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-sm shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">rounded-theme-sm</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">rounded-theme-md</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-lg shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">rounded-theme-lg</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-full shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">rounded-theme-full</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-xl shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">rounded-theme-xl</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-2xl shadow-theme-sm border border-theme-border">
              <span className="text-theme-primary">rounded-theme-2xl</span>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Shadows</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary">shadow-theme-sm</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-md">
              <span className="text-theme-primary">shadow-theme-md</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-lg">
              <span className="text-theme-primary">shadow-theme-lg</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-card">
              <span className="text-theme-primary">shadow-theme-card</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-btn">
              <span className="text-theme-primary">shadow-theme-btn</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-input">
              <span className="text-theme-primary">shadow-theme-input</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-glow">
              <span className="text-theme-primary">shadow-theme-glow</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-primary">
              <span className="text-theme-primary">shadow-theme-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-secondary">
              <span className="text-theme-primary">shadow-theme-secondary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-tertiary">
              <span className="text-theme-primary">shadow-theme-tertiary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-accent">
              <span className="text-theme-primary">shadow-theme-accent</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-btn-primary">
              <span className="text-theme-primary">shadow-theme-btn-primary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-btn-secondary">
              <span className="text-theme-primary">shadow-theme-btn-secondary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-btn-tertiary">
              <span className="text-theme-primary">shadow-theme-btn-tertiary</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-btn-accent">
              <span className="text-theme-primary">shadow-theme-btn-accent</span>
            </div>
          </div>
        </section>

        {/* Text Shadows */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Text Shadows</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary text-shadow-sm">text-shadow-sm</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary text-shadow-md">text-shadow-md</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary text-shadow-lg">text-shadow-lg</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary text-over-image">text-over-image</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary text-over-image-light">text-over-image-light</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary text-over-image-secondary">text-over-image-secondary</span>
            </div>
          </div>
        </section>

        {/* Glows */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Glows</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8 bg-theme-bg-dark">
            <div className="p-6 rounded-theme-md glow-theme-primary h-24 flex items-center justify-center">
              <span className="text-theme-on-primary font-medium">glow-theme-primary</span>
            </div>
            <div className="p-6 rounded-theme-md glow-theme-secondary h-24 flex items-center justify-center">
              <span className="text-theme-on-primary font-medium">glow-theme-secondary</span>
            </div>
            <div className="p-6 rounded-theme-md glow-theme-tertiary h-24 flex items-center justify-center">
              <span className="text-theme-on-primary font-medium">glow-theme-tertiary</span>
            </div>
            <div className="p-6 rounded-theme-md glow-theme-accent h-24 flex items-center justify-center">
              <span className="text-theme-on-primary font-medium">glow-theme-accent</span>
            </div>
            <div className="p-6 rounded-theme-md glow-theme-blue h-24 flex items-center justify-center">
              <span className="text-theme-on-primary font-medium">glow-theme-blue</span>
            </div>
            <div className="p-6 bg-theme-accent rounded-theme-md shadow-theme-glow h-24 flex items-center justify-center">
              <span className="text-theme-on-primary font-medium">shadow-theme-glow</span>
            </div>
          </div>
        </section>

        {/* Transitions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Transitions (Hover Me)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <button className="p-4 bg-theme-gradient-primary rounded-theme-md shadow-theme-btn transition-theme-fast h-20 flex items-center justify-center cursor-pointer hover:scale-110">
              <span className="text-theme-on-primary font-medium">transition-theme-fast</span>
            </button>
            <button className="p-4 bg-theme-gradient-secondary rounded-theme-md shadow-theme-btn transition-theme-normal h-20 flex items-center justify-center cursor-pointer hover:scale-110">
              <span className="text-theme-on-primary font-medium">transition-theme-normal</span>
            </button>
            <button className="p-4 bg-theme-gradient-accent rounded-theme-md shadow-theme-btn transition-theme-bounce h-20 flex items-center justify-center cursor-pointer hover:scale-110">
              <span className="text-theme-on-primary font-medium">transition-theme-bounce</span>
            </button>
            <button className="p-4 bg-theme-primary rounded-theme-md shadow-theme-btn transition-theme-slow h-20 flex items-center justify-center cursor-pointer hover:scale-110">
              <span className="text-theme-on-primary font-medium">transition-theme-slow</span>
            </button>
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Interactive Effects (Hover Me)</h2>
          <div className="grid grid-cols-3 gap-6">
            <button className="p-4 bg-theme-primary rounded-theme-md shadow-theme-sm hover-bubbly h-20 flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-105">
              <span className="text-theme-on-primary font-medium">hover-bubbly</span>
            </button>
            <button className="p-4 bg-theme-accent rounded-theme-md shadow-theme-sm hover-bubbly-sm h-20 flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-105">
              <span className="text-theme-on-primary font-medium">hover-bubbly-sm</span>
            </button>
            <button className="p-4 bg-theme-accent-secondary rounded-theme-md shadow-theme-sm hover-bubbly-lg h-20 flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-105">
              <span className="text-theme-on-primary font-medium">hover-bubbly-lg</span>
            </button>
          </div>
        </section>

        {/* Grid and Patterns */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Grid and Patterns</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 h-32 bg-theme-surface rounded-theme-md shadow-theme-sm grid-theme-dot overflow-hidden">
              <span className="text-theme-primary z-10 relative">grid-theme-dot</span>
            </div>
            <div className="p-3 h-32 bg-theme-surface rounded-theme-md shadow-theme-sm grid-theme-line overflow-hidden">
              <span className="text-theme-primary z-10 relative">grid-theme-line</span>
            </div>
            <div className="p-3 h-32 bg-theme-surface rounded-theme-md shadow-theme-sm grid-bg overflow-hidden">
              <span className="text-theme-primary z-10 relative">grid-bg</span>
            </div>
            <div className="p-3 h-32 bg-theme-surface rounded-theme-md shadow-theme-sm dot-bg overflow-hidden">
              <span className="text-theme-primary z-10 relative">dot-bg</span>
            </div>
          </div>
        </section>

        {/* Floating Elements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Floating Elements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-theme-bg-dark">
            {/* Using the floating classes on the cards themselves */}
            <div className="float-theme-element-primary p-5 h-32 flex items-center justify-center bg-theme-primary rounded-theme-md shadow-theme-sm text-center">
              <span className="text-theme-on-primary font-medium">float-theme-element-primary</span>
            </div>
            
            <div className="float-theme-element-secondary p-5 h-32 flex items-center justify-center bg-theme-secondary rounded-theme-md shadow-theme-sm text-center">
              <span className="text-theme-on-primary font-medium">float-theme-element-secondary</span>
            </div>
            
            <div className="vs-float-element-light-1 p-5 h-32 flex items-center justify-center bg-theme-accent rounded-theme-md shadow-theme-sm text-center">
              <span className="text-theme-on-primary font-medium">vs-float-element-light-1</span>
            </div>
            
            <div className="vs-float-element-light-2 p-5 h-32 flex items-center justify-center bg-theme-accent-secondary rounded-theme-md shadow-theme-sm text-center">
              <span className="text-theme-on-primary font-medium">vs-float-element-light-2</span>
            </div>
            
            <div className="vs-float-element-dark-1 p-5 h-32 flex items-center justify-center bg-theme-gradient-primary rounded-theme-md shadow-theme-sm text-center">
              <span className="text-theme-on-primary font-medium">vs-float-element-dark-1</span>
            </div>
            
            <div className="vs-float-element-dark-2 p-5 h-32 flex items-center justify-center bg-theme-gradient-secondary rounded-theme-md shadow-theme-sm text-center">
              <span className="text-theme-on-primary font-medium">vs-float-element-dark-2</span>
            </div>
            
            <div className="animate-float-slow p-5 h-32 flex items-center justify-center bg-theme-gradient-accent rounded-theme-md shadow-theme-glow text-center">
              <span className="text-theme-on-primary font-medium">animate-float-slow</span>
            </div>
            
            <div className="animate-float-medium p-5 h-32 flex items-center justify-center bg-theme-accent-tertiary rounded-theme-md shadow-theme-glow text-center">
              <span className="text-theme-on-primary font-medium">animate-float-medium</span>
            </div>
          </div>
        </section>

        {/* Chart Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Chart Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-grid">chart-theme-grid</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-line-views">chart-theme-line-views</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-line-followers">chart-theme-line-followers</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-line-engagement">chart-theme-line-engagement</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-line-revenue">chart-theme-line-revenue</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-area-views">chart-theme-area-views</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-area-followers">chart-theme-area-followers</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-area-engagement">chart-theme-area-engagement</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-area-revenue">chart-theme-area-revenue</span>
            </div>
            <div className="p-3 bg-theme-surface rounded-theme-md shadow-theme-sm">
              <span className="text-theme-primary chart-theme-tooltip">chart-theme-tooltip</span>
            </div>
          </div>
        </section>

        {/* Button Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Button Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="btn p-3 rounded-theme-md">btn</button>
            <button className="btn-primary p-3 rounded-theme-md">btn-primary</button>
            <button className="btn-accent p-3 rounded-theme-md">btn-accent</button>
            <button className="btn-ghost p-3 rounded-theme-md">btn-ghost</button>
            <button className="btn-theme-primary p-3 rounded-theme-md">btn-theme-primary</button>
            <button className="btn-theme-secondary p-3 rounded-theme-md">btn-theme-secondary</button>
            <button className="vs-carousel-btn p-3 rounded-theme-md">vs-carousel-btn</button>
            <button className="vs-slide-btn p-3 rounded-theme-md">vs-slide-btn</button>
          </div>
        </section>
        
        {/* Animated Marble Buttons */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Animated Marble Buttons</h2>
          
          {/* Normal Saturation */}
          <div className="mb-6">
            <h3 className="text-lg text-theme-primary mb-4">Normal Saturation</h3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton text="START" variant="start" />
              <AnimatedButton text="GO PRO" variant="pro" />
              <AnimatedButton text="LEARN" variant="learn" />
              <AnimatedButton text="DOCS" variant="docs" />
              <AnimatedButton text="ACCENT" variant="accent" />
            </div>
          </div>
          
          {/* High Saturation */}
          <div className="mb-6">
            <h3 className="text-lg text-theme-primary mb-4">High Saturation</h3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton text="START" variant="start" saturation="high" />
              <AnimatedButton text="GO PRO" variant="pro" saturation="high" />
              <AnimatedButton text="LEARN" variant="learn" saturation="high" />
              <AnimatedButton text="DOCS" variant="docs" saturation="high" />
              <AnimatedButton text="ACCENT" variant="accent" saturation="high" />
            </div>
          </div>
          
          {/* Low Saturation */}
          <div className="mb-6">
            <h3 className="text-lg text-theme-primary mb-4">Low Saturation</h3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton text="START" variant="start" saturation="low" />
              <AnimatedButton text="GO PRO" variant="pro" saturation="low" />
              <AnimatedButton text="LEARN" variant="learn" saturation="low" />
              <AnimatedButton text="DOCS" variant="docs" saturation="low" />
              <AnimatedButton text="ACCENT" variant="accent" saturation="low" />
            </div>
          </div>
          
          {/* Subtle */}
          <div className="mb-6">
            <h3 className="text-lg text-theme-primary mb-4">Subtle</h3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton text="START" variant="start" saturation="subtle" />
              <AnimatedButton text="GO PRO" variant="pro" saturation="subtle" />
              <AnimatedButton text="LEARN" variant="learn" saturation="subtle" />
              <AnimatedButton text="DOCS" variant="docs" saturation="subtle" />
              <AnimatedButton text="ACCENT" variant="accent" saturation="subtle" />
            </div>
          </div>
          
          {/* Size Variations */}
          <div>
            <h3 className="text-lg text-theme-primary mb-4">Size Variations</h3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton text="SMALL" variant="start" size="sm" />
              <AnimatedButton text="MEDIUM" variant="pro" size="md" />
              <AnimatedButton text="LARGE" variant="learn" size="lg" />
              <AnimatedButton text="DISABLED" variant="docs" disabled={true} />
            </div>
          </div>
        </section>

        {/* Card Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Card Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="card p-3 rounded-theme-md">
              <div className="card-header p-2">card-header</div>
              <div className="card-body p-2">card-body</div>
              <div className="card-footer p-2">card-footer</div>
            </div>
            <div className="card-theme p-3 rounded-theme-md">
              <span className="text-theme-primary">card-theme</span>
            </div>
            <div className="vs-card-shadow p-3 rounded-theme-md">
              <span className="text-theme-primary">vs-card-shadow</span>
            </div>
          </div>
        </section>

        {/* Module Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Module Components</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="module p-3 rounded-theme-md">
              <span className="text-theme-primary">module</span>
            </div>
            <div className="module teal p-3 rounded-theme-md">
              <span className="text-theme-primary">module.teal</span>
            </div>
            <div className="module orange p-3 rounded-theme-md">
              <span className="text-theme-primary">module.orange</span>
            </div>
            <div className="module coral p-3 rounded-theme-md">
              <span className="text-theme-primary">module.coral</span>
            </div>
            <div className="p-3 module-grid bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">module-grid</span>
            </div>
          </div>
        </section>

        {/* Navigation Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Navigation Components</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 nav bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">nav</span>
              <div className="nav-logo">nav-logo</div>
              <div className="nav-links">
                <div className="nav-link">nav-link</div>
              </div>
            </div>
            <div className="p-3 vs-navbar bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">vs-navbar</span>
            </div>
            <div className="p-3 vs-navbar-glass bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">vs-navbar-glass</span>
            </div>
          </div>
        </section>

        {/* Overlay Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Overlay Components</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 vs-fade-overlay-light bg-theme-surface rounded-theme-md h-24 relative">
              <span className="text-theme-primary z-10 relative">vs-fade-overlay-light</span>
            </div>
            <div className="p-3 vs-fade-overlay-dark bg-theme-surface rounded-theme-md h-24 relative">
              <span className="text-theme-primary z-10 relative">vs-fade-overlay-dark</span>
            </div>
            <div className="p-3 vs-depth-bg-dark bg-theme-surface rounded-theme-md h-24 relative">
              <span className="text-theme-primary z-10 relative">vs-depth-bg-dark</span>
            </div>
            <div className="p-3 fade-bottom bg-theme-surface rounded-theme-md h-24 relative">
              <span className="text-theme-primary z-10 relative">fade-bottom</span>
            </div>
          </div>
        </section>

        {/* Carousel Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Carousel Components</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 vs-carousel-container bg-theme-surface rounded-theme-md">
              <div className="vs-carousel-slide">
                <span className="text-theme-primary">vs-carousel-slide</span>
              </div>
            </div>
          </div>
        </section>

        {/* Miscellaneous Components */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Miscellaneous Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 pro-tip bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">pro-tip</span>
            </div>
            <div className="p-3 pro-tip-theme bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">pro-tip-theme</span>
            </div>
            <div className="p-3 feature-item bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">feature-item</span>
            </div>
            <div className="p-3 vs-accent-badge bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">vs-accent-badge</span>
            </div>
            <div className="p-3 stats-badge bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary stats-badge-number">stats-badge-number</span>
              <span className="text-theme-primary stats-badge-label">stats-badge-label</span>
            </div>
            <div className="p-3 vs-testimonial-container bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">vs-testimonial-container</span>
              <div className="vs-testimonial-accent">vs-testimonial-accent</div>
              <div className="vs-testimonial-dot">vs-testimonial-dot</div>
              <div className="vs-testimonial-dot-active">vs-testimonial-dot-active</div>
            </div>
            <div className="p-3 container bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">container</span>
            </div>
            <div className="p-3 vs-logo bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">vs-logo</span>
            </div>
            <div className="p-3 vs-logo-primary bg-theme-surface rounded-theme-md">
              <span className="text-theme-primary">vs-logo-primary</span>
            </div>
          </div>
        </section>

        {/* Spacing - Padding */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Spacing - Padding</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md grid grid-cols-3 md:grid-cols-4 gap-4">
            <div className="p-0 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-0</span>
            </div>
            <div className="p-1 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-1 (0.25rem)</span>
            </div>
            <div className="p-2 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-2 (0.5rem)</span>
            </div>
            <div className="p-3 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-3 (0.75rem)</span>
            </div>
            <div className="p-4 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-4 (1rem)</span>
            </div>
            <div className="p-6 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-6 (1.5rem)</span>
            </div>
            <div className="p-8 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-8 (2rem)</span>
            </div>
            <div className="p-10 bg-theme-primary text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>p-10 (2.5rem)</span>
            </div>
            <div className="px-4 py-2 bg-theme-accent text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>px-4 py-2</span>
            </div>
            <div className="pt-4 pb-2 px-3 bg-theme-accent text-theme-on-primary flex items-center justify-center rounded-theme-md">
              <span>pt-4 pb-2 px-3</span>
            </div>
          </div>
        </section>

        {/* Spacing - Margin */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Spacing - Margin</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md">
            <div className="flex flex-wrap gap-4">
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="m-0 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">m-0</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="m-1 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">m-1</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="m-2 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">m-2</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="m-4 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">m-4</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="mx-4 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">mx-4</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="my-4 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">my-4</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="mt-4 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">mt-4</div>
              </div>
              <div className="bg-theme-surface p-4 border border-theme-border">
                <div className="mb-4 bg-theme-secondary text-theme-on-primary p-4 rounded-theme-md">mb-4</div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout - Flex */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Layout - Flex</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md space-y-4">
            <div>
              <p className="text-theme-primary mb-2">flex flex-row justify-start items-center gap-2</p>
              <div className="flex flex-row justify-start items-center gap-2 p-2 border border-theme-border rounded-theme-md">
                <div className="w-12 h-12 bg-theme-primary rounded-theme-md"></div>
                <div className="w-16 h-16 bg-theme-secondary rounded-theme-md"></div>
                <div className="w-12 h-12 bg-theme-accent rounded-theme-md"></div>
              </div>
            </div>
            
            <div>
              <p className="text-theme-primary mb-2">flex flex-row justify-between items-center</p>
              <div className="flex flex-row justify-between items-center p-2 border border-theme-border rounded-theme-md">
                <div className="w-12 h-12 bg-theme-primary rounded-theme-md"></div>
                <div className="w-16 h-16 bg-theme-secondary rounded-theme-md"></div>
                <div className="w-12 h-12 bg-theme-accent rounded-theme-md"></div>
              </div>
            </div>
            
            <div>
              <p className="text-theme-primary mb-2">flex flex-row justify-center items-center gap-4</p>
              <div className="flex flex-row justify-center items-center gap-4 p-2 border border-theme-border rounded-theme-md">
                <div className="w-12 h-12 bg-theme-primary rounded-theme-md"></div>
                <div className="w-16 h-16 bg-theme-secondary rounded-theme-md"></div>
                <div className="w-12 h-12 bg-theme-accent rounded-theme-md"></div>
              </div>
            </div>
            
            <div>
              <p className="text-theme-primary mb-2">flex flex-col items-center gap-2</p>
              <div className="flex flex-col items-center gap-2 p-2 border border-theme-border rounded-theme-md">
                <div className="w-12 h-12 bg-theme-primary rounded-theme-md"></div>
                <div className="w-16 h-16 bg-theme-secondary rounded-theme-md"></div>
                <div className="w-12 h-12 bg-theme-accent rounded-theme-md"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout - Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Layout - Grid</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md space-y-6">
            <div>
              <p className="text-theme-primary mb-2">grid grid-cols-3 gap-4</p>
              <div className="grid grid-cols-3 gap-4 p-2 border border-theme-border rounded-theme-md">
                <div className="h-16 bg-theme-primary rounded-theme-md flex items-center justify-center text-theme-on-primary">1</div>
                <div className="h-16 bg-theme-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">2</div>
                <div className="h-16 bg-theme-accent rounded-theme-md flex items-center justify-center text-theme-on-primary">3</div>
                <div className="h-16 bg-theme-accent-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">4</div>
                <div className="h-16 bg-theme-primary rounded-theme-md flex items-center justify-center text-theme-on-primary">5</div>
                <div className="h-16 bg-theme-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">6</div>
              </div>
            </div>
            
            <div>
              <p className="text-theme-primary mb-2">grid grid-cols-4 gap-4</p>
              <div className="grid grid-cols-4 gap-4 p-2 border border-theme-border rounded-theme-md">
                <div className="h-16 bg-theme-primary rounded-theme-md flex items-center justify-center text-theme-on-primary">1</div>
                <div className="h-16 bg-theme-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">2</div>
                <div className="h-16 bg-theme-accent rounded-theme-md flex items-center justify-center text-theme-on-primary">3</div>
                <div className="h-16 bg-theme-accent-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">4</div>
                <div className="col-span-2 h-16 bg-theme-primary rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-2</div>
                <div className="col-span-2 h-16 bg-theme-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-2</div>
              </div>
            </div>
            
            <div>
              <p className="text-theme-primary mb-2">grid grid-cols-12 gap-4 (with responsive spans)</p>
              <div className="grid grid-cols-12 gap-4 p-2 border border-theme-border rounded-theme-md">
                <div className="col-span-12 md:col-span-6 h-16 bg-theme-primary rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-12 md:col-span-6</div>
                <div className="col-span-12 md:col-span-6 h-16 bg-theme-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-12 md:col-span-6</div>
                <div className="col-span-6 md:col-span-4 h-16 bg-theme-accent rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-6 md:col-span-4</div>
                <div className="col-span-6 md:col-span-4 h-16 bg-theme-accent-secondary rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-6 md:col-span-4</div>
                <div className="col-span-12 md:col-span-4 h-16 bg-theme-primary rounded-theme-md flex items-center justify-center text-theme-on-primary">col-span-12 md:col-span-4</div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Utilities */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Responsive Utilities</h2>
          <div className="p-4 bg-theme-surface rounded-theme-md">
            <div className="space-y-4">
              <div className="p-3 bg-theme-primary text-theme-on-primary rounded-theme-md">
                <p className="hidden sm:block">sm:block - Only visible on small screens and larger</p>
                <p className="block sm:hidden">block sm:hidden - Only visible on xs screens</p>
              </div>
              
              <div className="p-3 bg-theme-secondary text-theme-on-primary rounded-theme-md">
                <p className="hidden md:block">md:block - Only visible on medium screens and larger</p>
                <p className="block md:hidden">block md:hidden - Only visible on small screens and smaller</p>
              </div>
              
              <div className="p-3 bg-theme-accent text-theme-on-primary rounded-theme-md">
                <p className="hidden lg:block">lg:block - Only visible on large screens and larger</p>
                <p className="block lg:hidden">block lg:hidden - Only visible on medium screens and smaller</p>
              </div>
              
              <div className="p-3 bg-theme-accent-secondary text-theme-on-primary rounded-theme-md">
                <p className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Responsive text: text-sm md:text-base lg:text-lg xl:text-xl
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 bg-theme-primary text-theme-on-primary rounded-theme-md flex items-center justify-center">
                  <p>Responsive grid item 1</p>
                </div>
                <div className="p-3 bg-theme-secondary text-theme-on-primary rounded-theme-md flex items-center justify-center">
                  <p>Responsive grid item 2</p>
                </div>
                <div className="p-3 bg-theme-accent text-theme-on-primary rounded-theme-md flex items-center justify-center">
                  <p>Responsive grid item 3</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eyeball Component */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-theme-primary mb-4 bg-theme-gradient-text">Eyeball Component</h2>
          <div className="flex gap-4 items-center justify-center p-6 bg-theme-surface rounded-theme-md shadow-theme-sm">
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