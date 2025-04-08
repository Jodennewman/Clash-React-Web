#!/usr/bin/env node

/**
 * Dark Mode Selector Fix Utility
 * 
 * This script converts Tailwind dark: modifiers to theme-aware alternatives
 * to ensure consistent theme switching functionality.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.cyan}==== VS Dark Mode Selector Fix Utility ====${colors.reset}\n`);

// Mapping of dark: modifiers to theme-aware alternatives
const darkModeReplacements = {
  // Text colors
  'dark:text-white': 'text-theme-primary',
  'dark:text-gray-': 'text-theme-secondary',
  'dark:text-black': 'text-theme-primary',
  
  // Background colors
  'dark:bg-black': 'bg-theme-bg-primary',
  'dark:bg-gray-': 'bg-theme-bg-secondary',
  'dark:bg-white': 'bg-theme-bg-surface',
  
  // Border colors
  'dark:border-white': 'border-theme-border-light',
  'dark:border-gray-': 'border-theme-border',
  'dark:border-black': 'border-theme-border',
  
  // Shadow styles
  'dark:shadow-': 'shadow-theme-',
  
  // Gradient backgrounds
  'dark:bg-gradient-to-': 'bg-theme-gradient',
  'dark:from-': '',  // These will be removed as they're handled by bg-theme-gradient
  'dark:to-': '',    // These will be removed as they're handled by bg-theme-gradient
  
  // Opacity variants
  'dark:opacity-': 'opacity-',
};

// Helper function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changes = 0;
    
    // First pass: Replace competing light/dark styles with theme-aware variables
    // Look for patterns like "text-black dark:text-white"
    const competingStylesRegex = /(className=["'][^"']*)(text|bg|border|shadow)-[a-zA-Z0-9-]+\s+(dark:(text|bg|border|shadow)-[a-zA-Z0-9-]+)([^"']*)["']/g;
    content = content.replace(competingStylesRegex, (match, prefix, lightType, darkSelector, darkType, suffix) => {
      changes++;
      // Map to appropriate theme-aware class
      let themeClass = '';
      
      if (lightType === 'text') {
        themeClass = 'text-theme-primary';
      } else if (lightType === 'bg') {
        themeClass = 'bg-theme-bg-primary';
      } else if (lightType === 'border') {
        themeClass = 'border-theme-border';
      } else if (lightType === 'shadow') {
        themeClass = 'shadow-theme-md';
      }
      
      return `${prefix}${themeClass}${suffix}"'`;
    });
    
    // Second pass: Replace individual dark: modifiers
    for (const [darkModifier, themeAware] of Object.entries(darkModeReplacements)) {
      // Skip empty replacements (like dark:from- and dark:to-)
      if (!themeAware) continue;
      
      const regex = new RegExp(`(className=["'][^"']*)(${darkModifier}[^\\s"']*)([^"']*)["']`, 'g');
      const tempContent = content;
      content = content.replace(regex, `$1${themeAware}$3"'`);
      
      if (content !== tempContent) {
        changes += (tempContent.match(new RegExp(darkModifier, 'g')) || []).length;
      }
    }
    
    // Third pass: Handle gradient modifiers (these need special handling)
    // Look for patterns like "bg-gradient-to-r dark:bg-gradient-to-r dark:from-X dark:to-Y"
    const gradientRegex = /(className=["'][^"']*)(bg-gradient-to-[a-z]+)([^"']*)(dark:bg-gradient-to-[a-z]+)([^"']*)(dark:from-[^\\s"']+)([^"']*)(dark:to-[^\\s"']+)([^"']*)["']/g;
    content = content.replace(gradientRegex, (match, prefix, lightGradient, middle1, darkGradient, middle2, darkFrom, middle3, darkTo, suffix) => {
      changes++;
      return `${prefix}bg-theme-gradient${suffix}"'`;
    });
    
    // Simplified gradient patterns
    const simpleGradientRegex = /(className=["'][^"']*)(dark:bg-gradient-to-[a-z]+)([^"']*)["']/g;
    content = content.replace(simpleGradientRegex, (match, prefix, darkGradient, suffix) => {
      changes++;
      // Only replace if we're not removing an existing bg-theme-gradient
      if (!suffix.includes('bg-theme-gradient')) {
        return `${prefix}bg-theme-gradient${suffix}"'`;
      }
      return match;
    });
    
    // Clean up any remaining dark:from- and dark:to- modifiers
    const cleanupRegex = /(className=["'][^"']*)(dark:from-[^\\s"']+|dark:to-[^\\s"']+)([^"']*)["']/g;
    content = content.replace(cleanupRegex, (match, prefix, toRemove, suffix) => {
      changes++;
      return `${prefix}${suffix}"'`;
    });
    
    // Only write to file if changes were made
    if (changes > 0 && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return changes;
    }
    
    return 0;
  } catch (error) {
    console.error(`${colors.red}Error processing ${filePath}: ${error.message}${colors.reset}`);
    return 0;
  }
}

// Helper function to get all files with specific extensions
function getAllFilesWithExtension(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(getAllFilesWithExtension(filePath, extensions));
    } else {
      // Check if file has one of the specified extensions
      if (extensions.some(ext => filePath.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  
  return results;
}

// Main execution function
function fixDarkModeSelectors() {
  console.log(`${colors.bold}Scanning for dark mode modifiers...${colors.reset}\n`);
  
  // Get React component files
  const componentFiles = getAllFilesWithExtension(SRC_DIR, ['.tsx', '.jsx']);
  
  // Process files and track changes
  let totalChanges = 0;
  const modifiedFiles = [];
  
  for (const file of componentFiles) {
    const changes = processFile(file);
    
    if (changes > 0) {
      totalChanges += changes;
      modifiedFiles.push({
        file: path.relative(ROOT_DIR, file),
        changes
      });
    }
  }
  
  // Output results
  if (modifiedFiles.length > 0) {
    console.log(`${colors.green}${colors.bold}Modified ${modifiedFiles.length} files with ${totalChanges} dark mode selectors:${colors.reset}\n`);
    
    modifiedFiles.forEach(({ file, changes }) => {
      console.log(`  ${colors.green}${file}${colors.reset} (${changes} changes)`);
    });
  } else {
    console.log(`${colors.yellow}No dark mode selectors found that could be automatically converted.${colors.reset}`);
  }
  
  console.log(`\n${colors.bold}${colors.cyan}Conversion complete!${colors.reset}`);
}

// Run the utility
fixDarkModeSelectors();