import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      data-theme-toggle
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-[var(--theme-bg-primary)]  border border-[var(--theme-text-primary)]/10 dark:border-white/10 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] hover-bubbly-sm"
      onClick={() => {
        // Always toggle between light/dark mode while preserving system preference
        if (theme === 'system') {
          // If currently using system preference, check resolved theme and switch to opposite
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        } else if (theme === 'dark') {
          // If manually set to dark, switch to light
          setTheme('light');
        } else {
          // If manually set to light, switch to dark
          setTheme('dark');
        }
      }}
      aria-label="Toggle theme"
    >
      {/* Show different icons based on active theme */}
      {theme === 'system' && (
        <Laptop className="h-5 w-5 text-[var(--theme-text-primary)] dark:text-white" />
      )}
      {theme === 'dark' && (
        <Sun className="h-5 w-5 text-white" data-theme-dark />
      )}
      {theme === 'light' && (
        <Moon className="h-5 w-5 text-[var(--theme-text-primary)]" data-theme-light />
      )}
    </button>
  );
}

export default ThemeToggle;