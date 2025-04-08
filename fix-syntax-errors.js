#!/usr/bin/env node

/**
 * Syntax Error Fix Utility
 * 
 * This script fixes the syntax errors introduced by our theme converters
 * by correcting issues with quotation marks in className attributes.
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

console.log(`${colors.bold}${colors.cyan}==== VS Syntax Error Fix Utility ====${colors.reset}\n`);

// Helper function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changes = 0;
    
    // Fix className="..."' syntax errors (ending with extra quote)
    const brokenClassNameRegex = /className="([^"]*)"['"`]+>/g;
    content = content.replace(brokenClassNameRegex, (match, classNames) => {
      changes++;
      return `className="${classNames}">`;
    });
    
    // Fix className="..."'' standalone pattern (extra quotes at the end)
    const brokenClassNameRegex2 = /className="([^"]*)"['"`]+/g;
    content = content.replace(brokenClassNameRegex2, (match, classNames) => {
      changes++;
      return `className="${classNames}"`;
    });
    
    // Fix broken className with escaped quotes
    const brokenClassNameRegex3 = /className="([^"]*)\\"/g;
    content = content.replace(brokenClassNameRegex3, (match, classNames) => {
      changes++;
      return `className="${classNames}"`;
    });
    
    // Fix issues with dark: selectors that have incomplete brackets
    content = content.replace(/dark:from-\[var\(--[^\)]+\)\]\s+[a-z-]+\)]/g, (match) => {
      changes++;
      const cleanedMatch = match.replace(/\s+[a-z-]+\)]$/, '');
      return cleanedMatch;
    });
    
    // Fix issues with text-theme-on-primary-lg
    content = content.replace(/text-theme-on-primary-lg/g, (match) => {
      changes++;
      return 'text-theme-on-primary';
    });
    
    // Fix incomplete exports at end of file
    const exportConstMatch = content.match(/export\s+const\s+(\w+)/);
    if (exportConstMatch && !content.includes('export default') && content.trim().endsWith('}')) {
      const componentName = exportConstMatch[1];
      content = content.trim() + `\n\nexport default ${componentName};\n`;
      changes++;
    }
    
    // Remove stray characters at end of file
    if (content.match(/}[\s'"]+$/)) {
      content = content.replace(/}[\s'"]+$/, '}\n');
      changes++;
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
function fixSyntaxErrors() {
  console.log(`${colors.bold}Scanning for syntax errors...${colors.reset}\n`);
  
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
    console.log(`${colors.green}${colors.bold}Fixed ${modifiedFiles.length} files with ${totalChanges} syntax errors:${colors.reset}\n`);
    
    modifiedFiles.forEach(({ file, changes }) => {
      console.log(`  ${colors.green}${file}${colors.reset} (${changes} changes)`);
    });
  } else {
    console.log(`${colors.yellow}No syntax errors found that could be automatically fixed.${colors.reset}`);
  }
  
  console.log(`\n${colors.bold}${colors.cyan}Fixes complete!${colors.reset}`);
}

// Run the utility
fixSyntaxErrors();