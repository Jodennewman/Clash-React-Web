"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./button";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      onClick={toggleTheme} 
      className="bg-theme-gradient-primary text-theme-on-primary-4 py-2 rounded-full shadow-theme-sm hover-bubbly transition-all transition-theme-bounce"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
}
