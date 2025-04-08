import React, { useState } from 'react';
import { useTheme } from './ui/theme-provider';
import { VSThemeWrapper } from './ui/VSThemeWrapper';
import { ThemeToggle } from './ui/theme-toggle';

/**
 * A demo component showcasing the VS theme system implementation
 */
export function ThemeDemo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with proper light/dark mode styling */}
      <div className="absolute inset-0 bg-theme-gradient dark:from-[var(--theme-bg-primary)] -z-10"></div>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,46,59,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,46,59,0.05)_1px,transparent_1px)] 
                    dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
                    bg-[size:20px_20px] -z-10"></div>
      
      {/* Floating elements - light mode */}
      <div className="absolute -z-10 top-20 left-10 w-32 h-32 rounded-[40%] rotate-12 opacity-5 
                    bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute -z-10 bottom-40 right-20 w-48 h-48 rounded-[35%] -rotate-6 opacity-5
                    bg-[var(--theme-accent-secondary-light)] animate-float-medium hidden dark:hidden"></div>
      
      {/* Floating elements - dark mode */}
      <div className="absolute -z-10 top-20 left-10 w-32 h-32 rounded-[40%] rotate-12 opacity-10 
                    vs-btn-primary-gradient 
                    animate-float-slow hidden dark:block"></div>
      <div className="absolute -z-10 bottom-40 right-20 w-48 h-48 rounded-[35%] -rotate-6 opacity-10
                    vs-btn-secondary-gradient 
                    animate-float-medium hidden dark:block"></div>
      
      {/* Theme toggle in top corner */}
      <ThemeToggle />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-medium mb-6 text-theme-primary dark:text-theme-on-primary">
              VS Theme System
            </h1>
            <p className="text-xl text-theme-primary dark:text-theme-on-primary/80 mb-2">
              Current theme: <span className="font-medium">{theme}</span> (resolved to: <span className="font-medium">{resolvedTheme}</span>)
            </p>
            <p className="text-theme-primary dark:text-theme-on-primary/70 mb-4">
              Click the theme toggle in the corner to switch between light, dark, and system modes.
            </p>
            
            {/* Theme controls */}
            <div className="flex justify-center gap-4 mb-4">
              <button 
                onClick={() => setTheme('light')}
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'light' 
                    ? 'bg-[var(--theme-primary)] text-white font-medium' 
                    : 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'
                }`}
              >
                Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' 
                    ? 'bg-[var(--theme-primary)] text-white font-medium' 
                    : 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'
                }`}
              >
                Dark
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'system' 
                    ? 'bg-[var(--theme-primary)] text-white font-medium' 
                    : 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'
                }`}
              >
                System (Default)
              </button>
            </div>
          </div>
          
          {/* Demo cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card demonstrating direct CSS variable references */}
            <div className="bg-theme-gradient dark:from-[var(--theme-bg-primary)]
                         rounded-xl p-6 
                         shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                         shadow-theme-
                         transition-all duration-[--transition-bounce]
                         hover-bubbly">
              <h2 className="text-xl font-medium mb-4 text-theme-primary dark:text-theme-on-primary">
                Direct CSS Variable References
              </h2>
              <div className="mb-4 p-3 bg-theme-custom/50 /5 rounded-md">
                <code className="text-sm text-theme-primary dark:text-theme-on-primary/90 font-mono">
                  className="text-theme-primary dark:text-theme-on-primary"
                </code>
              </div>
              <p className="text-theme-primary dark:text-theme-on-primary/80 mb-4">
                This pattern uses direct CSS variable references with dark mode variants.
                It ensures proper theming in both light and dark modes.
              </p>
            </div>
            
            {/* Card demonstrating VSThemeWrapper */}
            <VSThemeWrapper
              lightClassName="bg-gradient-to-br from-white to-[var(--theme-bg-primary)]/80 shadow-[2px_2px_8px_rgba(0,0,0,0.05)]"
              darkClassName="vs-btn-primary-gradient shadow-[0_0_15px_rgba(53,115,128,0.15)]"
              defaultClassName="rounded-xl p-6 transition-all duration-[--transition-bounce] hover-bubbly"
            >
              <div>
                <h2 className="text-xl font-medium mb-4 text-theme-primary dark:text-theme-on-primary">
                  Using VSThemeWrapper
                </h2>
                <div className="mb-4 p-3 bg-theme-custom/50 /5 rounded-md">
                  <code className="text-sm text-theme-primary dark:text-theme-on-primary/90 font-mono">
                    {'<VSThemeWrapper lightClassName="..." darkClassName="...">'}
                  </code>
                </div>
                <p className="text-theme-primary dark:text-theme-on-primary/80 mb-4">
                  VSThemeWrapper makes it easy to apply different styles based on the current theme.
                </p>
              </div>
            </VSThemeWrapper>
          </div>
          
          {/* Color palette demo */}
          <div className="bg-theme-gradient dark:from-[var(--theme-bg-primary)]
                       rounded-xl p-6 mb-12
                       shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                       shadow-theme-">
            <h2 className="text-xl font-medium mb-6 text-theme-primary dark:text-theme-on-primary">
              Color Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch name="primary-orange" />
              <ColorSwatch name="secondary-teal" />
              <ColorSwatch name="accent-coral" />
              <ColorSwatch name="accent-red" />
            </div>
          </div>
          
          {/* Button examples */}
          <div className="bg-theme-gradient dark:from-[var(--theme-bg-primary)]
                       rounded-xl p-6
                       shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                       shadow-theme-">
            <h2 className="text-xl font-medium mb-6 text-theme-primary dark:text-theme-on-primary">
              Button Styling
            </h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[var(--theme-primary)]
                               bg-theme-gradient dark:from-[var(--theme-primary)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                               shadow-theme-
                               transition-all duration-[--transition-bounce]
                               hover:translate-y-[-3px] hover:scale-[1.03]
                               hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                               dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]">
                Primary Button
              </button>
              
              <button className="bg-[var(--theme-accent-secondary)]
                               bg-theme-gradient dark:from-[var(--theme-accent-secondary)]
                               text-theme-on-primary-4 py-2 rounded-full
                               shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                               shadow-theme-
                               transition-all duration-[--transition-bounce]
                               hover:translate-y-[-3px] hover:scale-[1.03]
                               hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                               dark:hover:shadow-[0_0_15px_rgba(53,115,128,0.3)]">
                Secondary Button
              </button>
              
              <button className="vs-gradient-coral-diagonal
                               bg-theme-gradient dark:from-[var(--theme-accent-tertiary)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                               shadow-theme-
                               transition-all duration-[--transition-bounce]
                               hover:translate-y-[-3px] hover:scale-[1.03]
                               hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                               dark:hover:shadow-[0_0_15px_rgba(222,107,89,0.3)]">
                Accent Button
              </button>
              
              <button className="bg-transparent 
                               border text-theme-primary/20 dark:border-theme-text-theme-primary dark:text-theme-on-primary-4 py-2 rounded-full
                               transition-all duration-[--transition-bounce]
                               hover:translate-y-[-3px] hover:scale-[1.03]
                               hover:bg-[var(--theme-text-primary)]/5 dark:hover:bg-theme-bg-surface/5">
                Ghost Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper component to display a color swatch
 */
function ColorSwatch({ name }: { name: string }) {
  // Map specific color variables to their inline styles
  const getColorStyle = (colorName: string) => {
    const colorMap: Record<string, string> = {
      'primary-orange': '#FEA35D',
      'secondary-teal': '#357380',
      'accent-coral': '#DE6B59',
      'accent-red': '#B92234',
      'primary-orange-hover': '#F89A67',
      'secondary-teal-hover': '#154D59'
    };
    
    return colorMap[colorName] || '#FEA35D';
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-16 h-16 rounded-full shadow-md`}
        style={{ backgroundColor: getColorStyle(name) }}
      ></div>
      <p className="mt-2 text-sm text-theme-primary dark:text-theme-on-primary/80">
        {name}
      </p>
    </div>
  );
}

export default ThemeDemo;