import React from 'react';

/**
 * Theme initialization script component to be included in the HTML head
 * This ensures theme is set before the page renders to prevent flash of wrong theme
 */
export function ThemeScript() {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Get stored theme or use system preference
            const storageKey = 'clash-theme';
            const storedTheme = localStorage.getItem(storageKey);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Determine theme: stored, system, or default
            let theme;
            if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
              theme = storedTheme;
            } else {
              theme = 'system';
            }
            
            // Resolve system to light/dark
            const resolvedTheme = theme === 'system' 
              ? (prefersDark ? 'dark' : 'light')
              : theme;
            
            // Apply theme immediately to prevent flash  
            document.documentElement.classList.add(resolvedTheme);
            // IMPORTANT: Also set the data-theme attribute for CSS variables
            document.documentElement.setAttribute('data-theme', resolvedTheme);
            
            // Set up system preference change listener if needed
            if (theme === 'system') {
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(newTheme);
                // Also update data-theme attribute
                document.documentElement.setAttribute('data-theme', newTheme);
              });
            }
          })();
        `,
      }}
    />
  );
}

export default ThemeScript;