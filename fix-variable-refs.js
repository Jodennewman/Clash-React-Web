#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const CSS_FILE = path.join(ROOT_DIR, 'src/app/globals.css');

console.log('Fixing CSS variable references...');

try {
  const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
  
  // The core issue is that the dark mode section defines theme-bg-primary = var(--bg-navy),
  // but in some places we directly reference var(--bg-navy) instead of var(--theme-bg-primary)
  
  // First, fix the variables to ensure they reference the root CSS variables directly
  // (This creates a single point of change for theme toggle)
  
  let updatedCss = cssContent;
  
  // Fix direct references to bg-navy and bg-navy-darker - convert to theme-bg-primary
  updatedCss = updatedCss.replace(/var\(--bg-navy\)/g, 'var(--theme-bg-primary)');
  updatedCss = updatedCss.replace(/var\(--bg-navy-darker\)/g, 'var(--theme-bg-secondary)');
  
  // Also fix direct references to bg-cream and bg-cream-darker
  updatedCss = updatedCss.replace(/var\(--bg-cream\)/g, 'var(--theme-bg-primary)');
  updatedCss = updatedCss.replace(/var\(--bg-cream-darker\)/g, 'var(--theme-bg-secondary)');
  
  // Fix the theme variable definitions to use explicit colors rather than referencing other variables
  
  // Extract the light mode colors
  const creamMatch = cssContent.match(/--bg-cream:\s*([^;]+);/);
  const creamDarkerMatch = cssContent.match(/--bg-cream-darker:\s*([^;]+);/);
  const textNavyMatch = cssContent.match(/--text-navy:\s*([^;]+);/);
  
  // Extract the dark mode colors
  const navyMatch = cssContent.match(/--bg-navy:\s*([^;]+);/);
  const navyDarkerMatch = cssContent.match(/--bg-navy-darker:\s*([^;]+);/);
  const textCreamMatch = cssContent.match(/--text-cream:\s*([^;]+);/);
  
  if (creamMatch && creamDarkerMatch && navyMatch && navyDarkerMatch) {
    // Get the direct color values
    const creamColor = creamMatch[1].trim();
    const creamDarkerColor = creamDarkerMatch[1].trim();
    const navyColor = navyMatch[1].trim();
    const navyDarkerColor = navyDarkerMatch[1].trim();
    const textNavyColor = textNavyMatch ? textNavyMatch[1].trim() : 'oklch(0.30 0.03 230)';
    const textCreamColor = textCreamMatch ? textCreamMatch[1].trim() : 'white';
    
    // Replace theme variables with explicit colors in light mode
    const lightThemeBgPattern = /--theme-bg-primary:\s*var\(--bg-cream\);/;
    const lightThemeBgSecondaryPattern = /--theme-bg-secondary:\s*var\(--bg-cream-darker\);/;
    const lightThemeTextPattern = /--theme-text-primary:\s*var\(--text-navy\);/;
    
    updatedCss = updatedCss.replace(lightThemeBgPattern, `--theme-bg-primary: ${creamColor};`);
    updatedCss = updatedCss.replace(lightThemeBgSecondaryPattern, `--theme-bg-secondary: ${creamDarkerColor};`);
    updatedCss = updatedCss.replace(lightThemeTextPattern, `--theme-text-primary: ${textNavyColor};`);
    
    // Replace theme variables with explicit colors in dark mode
    const darkThemeBgPattern = /--theme-bg-primary:\s*var\(--bg-navy\);/;
    const darkThemeBgSecondaryPattern = /--theme-bg-secondary:\s*var\(--bg-navy-darker\);/;
    const darkThemeTextPattern = /--theme-text-primary:\s*white;/;
    
    updatedCss = updatedCss.replace(darkThemeBgPattern, `--theme-bg-primary: ${navyColor};`);
    updatedCss = updatedCss.replace(darkThemeBgSecondaryPattern, `--theme-bg-secondary: ${navyDarkerColor};`);
    updatedCss = updatedCss.replace(darkThemeTextPattern, `--theme-text-primary: ${textCreamColor};`);
  }
  
  // Write the updated CSS
  fs.writeFileSync(CSS_FILE, updatedCss, 'utf8');
  console.log('Successfully fixed CSS variable references!');
} catch (error) {
  console.error('Error fixing CSS variable references:', error);
}