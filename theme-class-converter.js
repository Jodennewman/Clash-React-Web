#!/usr/bin/env node
/**
 * Theme Class Converter
 * 
 * This tool scans the codebase for inline CSS variables and replaces them with 
 * appropriate theme utility classes from globals.css.
 * 
 * Features:
 * - Creates backups of files before modifying them
 * - Identifies common patterns of inline CSS variable usage
 * - Maps CSS variables to their corresponding utility classes
 * - Handles both style objects and className strings
 * - Provides detailed reporting of changes made
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const DIRECTORIES_TO_SCAN = [
  'src/components',
  'src/app',
  'src'
];
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];
const BACKUP_EXTENSION = '.theme-backup';
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// Mapping of CSS variables to theme utility classes
const variableToClassMap = {
  // Text colors
  '--theme-text-primary': 'text-theme-primary',
  '--text-navy': 'text-theme-primary',
  '--theme-text-secondary': 'text-theme-secondary',
  '--theme-text-tertiary': 'text-theme-tertiary',
  '--theme-text-subtle': 'text-theme-subtle',
  '--theme-accent-secondary': 'text-theme-accent',
  '--secondary-teal': 'text-theme-accent',
  '--accent-red': 'text-theme-error',
  '--theme-primary': 'text-theme-primary-light',
  '--primary-orange': 'text-theme-primary-light',
  '--theme-primary-light': 'text-theme-primary-light',
  '--theme-accent-tertiary': 'text-theme-accent-tertiary',
  '--accent-coral': 'text-theme-accent-tertiary',
  '--theme-accent-coral': 'text-theme-accent-tertiary',
  '--theme-accent-coral-dark': 'text-theme-accent-quaternary',
  '--theme-accent-quaternary': 'text-theme-accent-quaternary',
  
  // Background colors
  '--theme-bg-primary': 'bg-theme-primary',
  '--bg-cream': 'bg-theme-primary',
  '--bg-navy': 'bg-theme-primary', // In dark mode
  '--theme-bg-secondary': 'bg-theme-secondary',
  '--bg-cream-darker': 'bg-theme-secondary',
  '--bg-navy-darker': 'bg-theme-secondary', // In dark mode
  '--theme-bg-surface': 'bg-theme-surface',
  '--theme-bg-card': 'bg-theme-card',
  '--theme-card-bg-navy': 'bg-theme-card',
  '--card-bg-navy': 'bg-theme-card',
  '--secondary-teal-bg': 'bg-theme-accent',
  '--secondary-teal-light': 'bg-theme-accent-secondary-light',
  '--primary-orange-bg': 'bg-theme-primary-light',
  '--primary-orange-light': 'bg-theme-primary-light',
  '--theme-primary-hover': 'bg-theme-primary-hover',
  '--primary-orange-hover': 'bg-theme-primary-hover',
  
  // Gradients
  '--theme-gradient-start': ['bg-theme-gradient', 'gradient start'],
  '--theme-gradient-end': ['bg-theme-gradient', 'gradient end'],
  '--theme-primary-gradient-start': ['bg-theme-gradient-primary', 'primary gradient start'],
  '--theme-primary-gradient-end': ['bg-theme-gradient-primary', 'primary gradient end'],
  '--theme-secondary-gradient-start': ['bg-theme-gradient-secondary', 'secondary gradient start'],
  '--theme-secondary-gradient-end': ['bg-theme-gradient-secondary', 'secondary gradient end'],
  '--theme-accent-gradient-start': ['bg-theme-gradient-accent', 'accent gradient start'],
  '--theme-accent-gradient-end': ['bg-theme-gradient-accent', 'accent gradient end'],
  
  // Borders
  '--theme-border': 'border-theme-border',
  '--theme-border-light': 'border-theme-light',
  '--theme-border-medium': 'border-theme-border-medium',
  '--theme-border-primary': 'border-theme-primary',
  
  // Shadows
  '--theme-shadow-sm': 'shadow-theme-sm',
  '--theme-shadow-md': 'shadow-theme-md',
  '--theme-shadow-lg': 'shadow-theme-lg',
  '--theme-shadow-card': 'shadow-theme-card',
  '--theme-shadow-btn': 'shadow-theme-btn',
  '--shadow-sm': 'shadow-theme-sm',
  '--shadow-md': 'shadow-theme-md',
  '--shadow-lg': 'shadow-theme-lg',
  '--shadow-btn': 'shadow-theme-btn',
  
  // Border radius
  '--theme-border-radius-md': 'rounded-theme-md',
  '--theme-border-radius-lg': 'rounded-theme-lg',
  '--border-radius-sm': 'rounded-theme-sm',
  '--border-radius-md': 'rounded-theme-md',
  '--border-radius-lg': 'rounded-theme-lg',
  '--border-radius-xl': 'rounded-theme-xl',
  '--border-radius-2xl': 'rounded-theme-2xl',
  '--border-radius-full': 'rounded-theme-full',
  
  // Transitions
  '--theme-transition-fast': 'transition-theme-fast',
  '--theme-transition-normal': 'transition-theme-normal',
  '--theme-transition-bounce': 'transition-theme-bounce',
  '--transition-fast': 'transition-theme-fast',
  '--transition-normal': 'transition-theme-normal',
  '--transition-bounce': 'transition-theme-bounce',
  '--transition-slow': 'transition-theme-slow',
  
  // Chart colors
  '--theme-color-views': 'chart-theme-line-views',
  '--theme-color-followers': 'chart-theme-line-followers',
  '--theme-color-engagement': 'chart-theme-line-engagement',
  '--theme-color-revenue': 'chart-theme-line-revenue',
  
  // Pattern colors
  '--theme-pattern-color': 'bg-theme-pattern',
  '--theme-pattern-opacity': ['bg-theme-pattern', 'pattern opacity'],
};

// Patterns to match inline CSS variables
const patterns = [
  // style={{ color: 'var(--theme-text-primary)' }}
  { 
    regex: /style=\{\{[^}]*?color:\s*['"]var\(([^)]+)\)['"][^}]*?\}\}/g,
    extractVar: (match) => {
      const varMatch = /color:\s*['"]var\(([^)]+)\)['"]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      // Remove the color property from the style object
      const newStyle = match.replace(/color:\s*['"]var\([^)]+\)['"],?\s*/, '');
      
      // If the style object is now empty (or just has whitespace and braces), remove it entirely
      if (newStyle.match(/style=\{\{\s*\}\}/)) {
        return `className="${className}"`;
      }
      
      // Check if className already exists
      if (match.includes('className=')) {
        // Append to existing className
        return newStyle.replace(/className=["']([^"']*)["']/, `className="$1 ${className}"`);
      } else {
        // Add new className attribute
        return newStyle.replace(/style=\{\{/, `className="${className}" style={{`);
      }
    }
  },
  
  // style={{ backgroundColor: 'var(--theme-bg-primary)' }}
  { 
    regex: /style=\{\{[^}]*?backgroundColor:\s*['"]var\(([^)]+)\)['"][^}]*?\}\}/g,
    extractVar: (match) => {
      const varMatch = /backgroundColor:\s*['"]var\(([^)]+)\)['"]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      // Remove the backgroundColor property from the style object
      const newStyle = match.replace(/backgroundColor:\s*['"]var\([^)]+\)['"],?\s*/, '');
      
      // If the style object is now empty (or just has whitespace and braces), remove it entirely
      if (newStyle.match(/style=\{\{\s*\}\}/)) {
        return `className="${className}"`;
      }
      
      // Check if className already exists
      if (match.includes('className=')) {
        // Append to existing className
        return newStyle.replace(/className=["']([^"']*)["']/, `className="$1 ${className}"`);
      } else {
        // Add new className attribute
        return newStyle.replace(/style=\{\{/, `className="${className}" style={{`);
      }
    }
  },
  
  // className="... text-[var(--theme-text-primary)] ..."
  {
    regex: /className=["']([^"']*text-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /text-\[var\(([^)]+)\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      return match.replace(/text-\[var\([^)]+\)\]/, className);
    }
  },
  
  // className="... bg-[var(--theme-bg-primary)] ..."
  {
    regex: /className=["']([^"']*bg-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /bg-\[var\([^)]+\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      return match.replace(/bg-\[var\([^)]+\)\]/, className);
    }
  },
  
  // className="... border-[var(--theme-border)] ..."
  {
    regex: /className=["']([^"']*border(?:-[a-z]+)?-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /border(?:-[a-z]+)?-\[var\(([^)]+)\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      return match.replace(/border(?:-[a-z]+)?-\[var\([^)]+\)\]/, className);
    }
  },
  
  // className="... shadow-[var(--theme-shadow-sm)] ..."
  {
    regex: /className=["']([^"']*shadow-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /shadow-\[var\(([^)]+)\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      return match.replace(/shadow-\[var\([^)]+\)\]/, className);
    }
  },
  
  // className="... rounded-[var(--theme-border-radius-md)] ..."
  {
    regex: /className=["']([^"']*rounded(?:-[a-z]+)?-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /rounded(?:-[a-z]+)?-\[var\(([^)]+)\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      return match.replace(/rounded(?:-[a-z]+)?-\[var\([^)]+\)\]/, className);
    }
  },
  
  // For gradient patterns in Tailwind className
  {
    regex: /className=["']([^"']*(?:from|to|via)-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /(?:from|to|via)-\[var\(([^)]+)\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      // For gradients, we want to replace the entire gradient pattern
      // Check if this is a "from" or "to" part
      if (match.includes('from-[var(') && match.includes('to-[var(')) {
        return match.replace(/bg-gradient-to-[a-z]+ from-\[var\([^)]+\)\] to-\[var\([^)]+\)\]/, className);
      } else {
        // Just notify for partial gradient matches as they need manual review
        console.log(`Partial gradient match found. Consider manually replacing with ${className}: ${match}`);
        return match;
      }
    }
  },
  
  // For transition durations/easings in Tailwind className
  {
    regex: /className=["']([^"']*(?:transition|duration|ease)-\[var\([^)]+\)\][^"']*)["']/g,
    extractVar: (match) => {
      const varMatch = /(?:transition|duration|ease)-\[var\(([^)]+)\)\]/.exec(match);
      return varMatch ? varMatch[1] : null;
    },
    replacement: (match, varName, className) => {
      return match.replace(/(?:transition|duration|ease)-\[var\([^)]+\)\]/, className);
    }
  },
];

// Statistics
const stats = {
  filesScanned: 0,
  filesModified: 0,
  replacementsPerFile: {},
  totalReplacements: 0,
  unmappedVariables: new Set()
};

// Function to check if a file should be processed
function shouldProcessFile(filePath) {
  const extension = path.extname(filePath);
  return FILE_EXTENSIONS.includes(extension);
}

// Function to create a backup of a file
async function backupFile(filePath) {
  const backupPath = `${filePath}${BACKUP_EXTENSION}`;
  try {
    await fs.promises.writeFile(backupPath, await fs.promises.readFile(filePath, 'utf8'));
    if (VERBOSE) console.log(`Created backup: ${backupPath}`);
    return true;
  } catch (error) {
    console.error(`Error creating backup for ${filePath}:`, error);
    return false;
  }
}

// Function to process a single file
async function processFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    let modifiedContent = content;
    let fileModified = false;
    let replacements = 0;
    
    // Apply each pattern
    for (const pattern of patterns) {
      const matches = [...modifiedContent.matchAll(pattern.regex)];
      
      for (const match of matches) {
        const fullMatch = match[0];
        const varName = pattern.extractVar(fullMatch);
        
        if (!varName) continue;
        
        // Get the mapped class
        let mappedClass = variableToClassMap[varName];
        
        // Skip if no mapping exists
        if (!mappedClass) {
          stats.unmappedVariables.add(varName);
          if (VERBOSE) console.log(`No mapping for variable: ${varName} in ${filePath}`);
          continue;
        }
        
        // If mapping is an array (for compound patterns like gradients), use just the class name
        if (Array.isArray(mappedClass)) {
          if (VERBOSE) console.log(`Found compound variable: ${varName} → ${mappedClass[0]} (${mappedClass[1]})`);
          mappedClass = mappedClass[0];
        }
        
        // Apply the replacement
        const newContent = pattern.replacement(fullMatch, varName, mappedClass);
        if (newContent !== fullMatch) {
          modifiedContent = modifiedContent.replace(fullMatch, newContent);
          replacements++;
          if (VERBOSE) console.log(`Replaced: ${varName} → ${mappedClass} in ${filePath}`);
        }
      }
    }
    
    // If modifications were made, update the file
    if (modifiedContent !== content) {
      if (!DRY_RUN) {
        await backupFile(filePath);
        await fs.promises.writeFile(filePath, modifiedContent, 'utf8');
      }
      fileModified = true;
      stats.replacementsPerFile[filePath] = replacements;
      stats.totalReplacements += replacements;
      stats.filesModified++;
    }
    
    stats.filesScanned++;
    return fileModified;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Function to recursively scan directories
async function scanDirectory(dirPath) {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .git directories
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        await scanDirectory(entryPath);
      } else if (entry.isFile() && shouldProcessFile(entryPath)) {
        await processFile(entryPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
}

// Main function
async function main() {
  console.log(`
  ================================================
   Theme Class Converter ${DRY_RUN ? '(DRY RUN)' : ''}
  ================================================
  
  This tool will scan your codebase for inline CSS variables
  and replace them with appropriate theme utility classes.
  
  Directories to scan: ${DIRECTORIES_TO_SCAN.join(', ')}
  File extensions: ${FILE_EXTENSIONS.join(', ')}
  ${DRY_RUN ? 'DRY RUN: No files will be modified.' : 'Files will be modified, backups will be created.'}
  `);

  const startTime = Date.now();
  
  // Scan the specified directories
  for (const directory of DIRECTORIES_TO_SCAN) {
    const dirPath = path.resolve(process.cwd(), directory);
    try {
      const dirStat = await fs.promises.stat(dirPath);
      if (dirStat.isDirectory()) {
        await scanDirectory(dirPath);
      } else {
        console.error(`${dirPath} is not a directory.`);
      }
    } catch (error) {
      console.error(`Error accessing directory ${dirPath}:`, error);
    }
  }
  
  // Print statistics
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log(`
  ================================================
   Conversion Complete
  ================================================
  
  Statistics:
  - Files scanned: ${stats.filesScanned}
  - Files modified: ${stats.filesModified}
  - Total replacements: ${stats.totalReplacements}
  - Time taken: ${duration.toFixed(2)} seconds
  `);
  
  // Details of files modified
  if (stats.filesModified > 0) {
    console.log('Files modified:');
    Object.entries(stats.replacementsPerFile)
      .sort((a, b) => b[1] - a[1]) // Sort by number of replacements (descending)
      .forEach(([file, count]) => {
        console.log(`- ${file}: ${count} replacements`);
      });
  }
  
  // Unmapped variables
  if (stats.unmappedVariables.size > 0) {
    console.log('\nUnmapped CSS variables found:');
    Array.from(stats.unmappedVariables).sort().forEach(variable => {
      console.log(`- ${variable}`);
    });
    console.log('\nConsider adding these to the variableToClassMap in the script.');
  }
  
  if (DRY_RUN) {
    console.log('\nThis was a dry run. No files were modified. Remove the --dry-run flag to apply changes.');
  } else {
    console.log('\nBackups of modified files were created with the extension .theme-backup');
  }
}

// Run the script
main().catch(error => {
  console.error('Error running theme class converter:', error);
  process.exit(1);
});