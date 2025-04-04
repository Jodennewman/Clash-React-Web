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
      className="bg-[--primary-orange] dark:bg-[--primary-orange] text-white hover:bg-[--primary-orange-hover] dark:hover:bg-[--primary-orange-hover] px-4 py-2 rounded-full shadow-md"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
}
