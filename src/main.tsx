import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './app/globals.css'  // This is our single source of truth for styles
import App from './App'
import { ThemeProvider } from './components/ui/theme-provider'
import ThemeScript from './components/ui/ThemeScript'

// Add theme initialization script to head to prevent flash of wrong theme
// This creates a script tag that runs immediately
document.head.appendChild(
  Object.assign(document.createElement('script'), {
    innerHTML: `
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
      })();
    `
  })
);

// Create root and render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="clash-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);