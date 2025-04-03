import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-[var(--bg-cream)] dark:bg-[var(--card-bg-navy)] border border-[var(--text-navy)]/10 dark:border-[var(--text-cream)]/10 shadow-md"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" style={{ color: 'var(--text-cream)' }} />
      ) : (
        <Moon className="h-5 w-5" style={{ color: 'var(--text-navy)' }} />
      )}
    </button>
  );
}

export default ThemeToggle;