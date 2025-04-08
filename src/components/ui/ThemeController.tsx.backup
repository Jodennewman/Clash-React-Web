"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * A simplified theme controller that works directly with the HTML element
 * 
 * This is now updated to support system preference and work with the main ThemeProvider
 * @deprecated - Use ThemeToggle instead - this component is kept for backward compatibility
 */
export function ThemeController({ className = "" }: { className?: string }) {
  // Track both theme preference and actual dark/light state
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, check for system preference or stored preference
  useEffect(() => {
    // Check stored preference first
    const storedTheme = localStorage.getItem("clash-theme");
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      setThemePreference(storedTheme as 'light' | 'dark' | 'system');
      
      // If it's system, check system preference
      if (storedTheme === 'system') {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(systemPrefersDark);
        document.documentElement.classList.toggle("dark", systemPrefersDark);
      } else {
        setIsDarkMode(storedTheme === "dark");
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      }
    } else {
      // No preference stored, default to system
      setThemePreference('system');
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle("dark", systemPrefersDark);
      localStorage.setItem("clash-theme", "system");
    }
    
    // Add listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themePreference === 'system') {
        setIsDarkMode(mediaQuery.matches);
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  const toggleTheme = () => {
    if (themePreference === 'system') {
      // If using system preference, switch to appropriate manual setting
      const newMode = !isDarkMode;
      setThemePreference(newMode ? 'dark' : 'light');
      setIsDarkMode(newMode);
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("clash-theme", newMode ? "dark" : "light");
    } else {
      // If using manual setting, toggle between dark and light
      const newMode = themePreference === 'light' ? 'dark' : 'light';
      setThemePreference(newMode);
      setIsDarkMode(newMode === 'dark');
      document.documentElement.classList.toggle("dark", newMode === 'dark');
      localStorage.setItem("clash-theme", newMode);
    }
  };

  return (
    <button
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full transition-all duration-300 
        ${isDarkMode 
          ? "bg-[var(--card-bg-navy)] border-[var(--text-cream)]/10 text-[var(--text-cream)]" 
          : "bg-[var(--bg-cream)] border-[var(--text-navy)]/10 text-[var(--text-navy)]"
        } 
        border shadow-md hover:shadow-lg hover:scale-110 ${className}`}
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
} 