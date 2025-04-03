"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * A simplified theme controller that works directly with the HTML element
 * 
 * This replaces all other theme toggles and providers with a single component
 * that applies dark/light mode directly to the document.documentElement
 */
export function ThemeController({ className = "" }: { className?: string }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, check for system preference or stored preference
  useEffect(() => {
    // Check stored preference first
    const storedTheme = localStorage.getItem("clash-theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Fallback to system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Update HTML element
    document.documentElement.classList.toggle("dark", newMode);
    
    // Store preference
    localStorage.setItem("clash-theme", newMode ? "dark" : "light");
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