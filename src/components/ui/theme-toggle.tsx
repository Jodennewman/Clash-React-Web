import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      data-theme-toggle
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-[--bg-cream] dark:bg-[--bg-navy] border border-[--text-navy]/10 dark:border-white/10 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] hover-bubbly-sm"
      onClick={() => {
        // Cycle through themes: light -> dark -> system -> light
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
      }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' && (
        <Sun className="h-5 w-5 text-white" data-theme-dark />
      )}
      {theme === 'light' && (
        <Moon className="h-5 w-5 text-[--text-navy]" data-theme-light />
      )}
      {theme === 'system' && (
        <Laptop className="h-5 w-5 text-[--text-navy] dark:text-white" />
      )}
    </button>
  );
}

export default ThemeToggle;