import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // Always resolved to light/dark (for CSS needs)
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'clash-theme',
  ...props
}: ThemeProviderProps) {
  // Get the initial theme from localStorage or default
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  // Separate state to track the resolved theme (always 'light' or 'dark')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    () => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme as 'light' | 'dark';
    }
  );

  // Effect to handle theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove theme classes
    root.classList.remove('light', 'dark');
    
    let newResolvedTheme: 'light' | 'dark';
    
    // Determine the actual theme based on system preference if needed
    if (theme === 'system') {
      newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      newResolvedTheme = theme as 'light' | 'dark';
    }
    
    // Update the resolved theme state
    setResolvedTheme(newResolvedTheme);
    
    // Apply the theme class (this is for the old JavaScript method)
    root.classList.add(newResolvedTheme);
    
    // IMPORTANT: Also set the data-theme attribute for CSS variables (this is for the CSS selectors)
    root.setAttribute('data-theme', newResolvedTheme);
    
    // Dispatch an event for other parts of the app
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { theme: newResolvedTheme }
    }));
    
  }, [theme]);

  // Effect to listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Handler for system color scheme changes
    const handleChange = () => {
      if (theme === 'system') {
        const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(newResolvedTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newResolvedTheme);
        // IMPORTANT: Also update the data-theme attribute
        document.documentElement.setAttribute('data-theme', newResolvedTheme);
      }
    };
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Set theme function with localStorage persistence
  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  // Context value
  const value = {
    theme,
    setTheme,
    resolvedTheme
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook for accessing theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
};