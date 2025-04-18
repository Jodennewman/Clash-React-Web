import React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      data-theme-toggle=""
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-theme-primary border border-theme-border shadow-theme-sm hover-bubbly-sm"
      onClick={() => {
        // Always toggle between light/dark mode while preserving system preference
        if (theme === "system") {
          // If currently using system preference, check resolved theme and switch to opposite
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        } else if (theme === "dark") {
          // If manually set to dark, switch to light
          setTheme("light");
        } else {
          // If manually set to light, switch to dark
          setTheme("dark");
        }
      }}
      aria-label="Toggle theme"
    >
      {/* Show different icons based on active theme */}
      {theme === "system" && <Laptop className="h-5 w-5 text-theme-primary" />}
      {theme === "dark" && (
        <Sun className="h-5 w-5 text-theme-primary" data-theme-dark />
      )}
      {theme === "light" && (
        <Moon className="h-5 w-5 text-theme-primary" data-theme-light />
      )}
    </button>
  );
}

export default ThemeToggle;
