#!/usr/bin/env node

/**
 * Direct Color Fix Utility
 * 
 * This script replaces direct color references like 'text-white' with theme-aware
 * alternatives like 'text-theme-on-primary' in component files.
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

console.log(`${colors.bold}${colors.cyan}==== VS Direct Color Fix Utility ====${colors.reset}\n`);

// Mapping of direct color references to theme-aware replacements
const colorReplacements = {
  // Text colors
  'text-white': 'text-theme-on-primary',
  'text-black': 'text-theme-primary',
  'text-gray-': 'text-theme-secondary',
  
  // Background colors
  'bg-white': 'bg-theme-bg-surface',
  'bg-black': 'bg-theme-bg-secondary',
  'bg-gray-': 'bg-theme-bg-primary',
  
  // Border colors
  'border-white': 'border-theme-border-light',
  'border-black': 'border-theme-border',
  'border-gray-': 'border-theme-border',
  
  // Shadow colors
  'shadow-white': 'shadow-theme-sm',
  'shadow-black': 'shadow-theme-md',
  'shadow-gray-': 'shadow-theme-sm',
};

// Special replacement for white/black 100 variants
const specialReplacements = {
  'text-white/': 'text-theme-on-primary/',
  'text-black/': 'text-theme-primary/',
  'bg-white/': 'bg-theme-bg-surface/',
  'bg-black/': 'bg-theme-bg-secondary/',
};

// Helper function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changes = 0;
    
    // First, handle special replacements for opacity variants
    for (const [directColor, themeAware] of Object.entries(specialReplacements)) {
      const regex = new RegExp(`${directColor}\\d+`, 'g');
      const matches = content.match(regex);
      
      if (matches) {
        for (const match of matches) {
          const opacity = match.split('/')[1];
          const replacement = `${themeAware}${opacity}`;
          
          // Replace while preserving the remaining classNames
          const classRegex = new RegExp(`(className=["'])([^"']*)(${match})([^"']*)["']`, 'g');
          content = content.replace(classRegex, `$1$2${replacement}$4"'`);
          changes++;
        }
      }
    }
    
    // Regular replacements
    for (const [directColor, themeAware] of Object.entries(colorReplacements)) {
      const regex = new RegExp(`(className=["'][^"']*)(${directColor}[^-"']*)([^"']*)["']`, 'g');
      const tempContent = content;
      content = content.replace(regex, `$1${themeAware}$3"'`);
      
      if (content !== tempContent) {
        changes += (tempContent.match(new RegExp(directColor, 'g')) || []).length;
      }
    }
    
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
function fixDirectColors() {
  console.log(`${colors.bold}Scanning for direct color references...${colors.reset}\n`);
  
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
    console.log(`${colors.green}${colors.bold}Modified ${modifiedFiles.length} files with ${totalChanges} direct color references:${colors.reset}\n`);
    
    modifiedFiles.forEach(({ file, changes }) => {
      console.log(`  ${colors.green}${file}${colors.reset} (${changes} changes)`);
    });
  } else {
    console.log(`${colors.yellow}No direct color references found that could be automatically converted.${colors.reset}`);
  }
  
  console.log(`\n${colors.bold}${colors.cyan}Conversion complete!${colors.reset}`);
}

// Run the utility
fixDirectColors();