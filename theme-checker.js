#!/usr/bin/env node

/**
 * Theme Checker Utility
 * 
 * This script analyzes the codebase to find inconsistencies in theme implementation:
 * 1. CSS variables defined in light mode but missing in dark mode (and vice versa)
 * 2. Components using Tailwind's dark: modifier instead of theme variables
 * 3. Direct color values that should use theme variables
 * 4. Inline styles that won't update with theme changes
 * 5. Competing theme selectors ([data-theme="dark"] vs .dark)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const GLOBALS_CSS = path.join(SRC_DIR, 'app', 'globals.css');

// Colors to highlight output
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

console.log(`${colors.bold}${colors.cyan}==== VS Theme Checker Utility ====${colors.reset}\n`);

// Find all theme-related CSS variables
function getThemeVariables() {
  console.log(`${colors.bold}Analyzing theme variables in globals.css...${colors.reset}\n`);
  
  if (!fs.existsSync(GLOBALS_CSS)) {
    console.error(`${colors.red}Error: globals.css not found at ${GLOBALS_CSS}${colors.reset}`);
    return { lightMode: [], darkMode: [] };
  }
  
  const cssContent = fs.readFileSync(GLOBALS_CSS, 'utf8');
  
  // Extract variables from root (light mode)
  const lightModeVars = new Set();
  const rootRegex = /^  --theme-[a-zA-Z0-9_-]+:/gm;
  let match;
  while ((match = rootRegex.exec(cssContent)) !== null) {
    const varName = match[0].trim().replace(':', '');
    lightModeVars.add(varName);
  }
  
  // Extract variables from dark mode
  const darkModeVars = new Set();
  // Find the beginning of the dark mode section
  const darkModeStartMatch = cssContent.match(/@layer base\s*\{\s*\[data-theme="dark"\]/);
  
  if (darkModeStartMatch) {
    const darkModeStartIndex = darkModeStartMatch.index;
    // Find the end of the dark mode section (closing brace of [data-theme="dark"])
    let braceCount = 0;
    let darkModeEndIndex = darkModeStartIndex;
    
    for (let i = darkModeStartIndex; i < cssContent.length; i++) {
      if (cssContent[i] === '{') braceCount++;
      if (cssContent[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          darkModeEndIndex = i;
          break;
        }
      }
    }
    
    const darkModeContent = cssContent.substring(darkModeStartIndex, darkModeEndIndex);
    const darkModeRegex = /^    --theme-[a-zA-Z0-9_-]+:/gm;
    
    while ((match = darkModeRegex.exec(darkModeContent)) !== null) {
      const varName = match[0].trim().replace(':', '');
      darkModeVars.add(varName);
    }
  }
  
  return { 
    lightMode: Array.from(lightModeVars),
    darkMode: Array.from(darkModeVars)
  };
}

// Find files using Tailwind dark: modifiers
function findDarkModeModifiers() {
  console.log(`${colors.bold}Finding components using Tailwind dark: modifiers...${colors.reset}\n`);
  
  try {
    const files = getAllFilesWithExtension(SRC_DIR, ['.tsx', '.jsx', '.ts', '.js']);
    
    const results = [];
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Look for dark: class modifiers
      const darkModifierMatches = content.match(/dark:[a-zA-Z0-9_-]+/g);
      
      if (darkModifierMatches && darkModifierMatches.length > 0) {
        results.push({
          file: path.relative(ROOT_DIR, file),
          occurrences: darkModifierMatches.length,
          examples: darkModifierMatches.slice(0, 3) // Show first few examples
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`${colors.red}Error finding dark mode modifiers: ${error.message}${colors.reset}`);
    return [];
  }
}

// Find direct color values that should use theme variables
function findDirectColorValues() {
  console.log(`${colors.bold}Finding direct color values...${colors.reset}\n`);
  
  try {
    const files = getAllFilesWithExtension(SRC_DIR, ['.tsx', '.jsx']);
    
    const results = [];
    const directColorPatterns = [
      /className="[^"]*\b(bg|text|border|shadow)-(white|black|gray|blue|red|green|yellow|orange|purple|pink)\b[^"]*"/g,
      /className='[^']*\b(bg|text|border|shadow)-(white|black|gray|blue|red|green|yellow|orange|purple|pink)\b[^']*'/g
    ];
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      let directColors = [];
      
      // Check each pattern
      for (const pattern of directColorPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          directColors = directColors.concat(matches);
        }
      }
      
      if (directColors.length > 0) {
        results.push({
          file: path.relative(ROOT_DIR, file),
          occurrences: directColors.length,
          examples: directColors.slice(0, 3) // Show first few examples
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`${colors.red}Error finding direct color values: ${error.message}${colors.reset}`);
    return [];
  }
}

// Find inline styles that won't update with theme changes
function findInlineStyles() {
  console.log(`${colors.bold}Finding inline styles that might not update with theme...${colors.reset}\n`);
  
  try {
    const files = getAllFilesWithExtension(SRC_DIR, ['.tsx', '.jsx']);
    
    const results = [];
    // Look for style objects with color-related properties
    const stylePatterns = [
      /style=\{.*?(background|color|border|shadow).*?\}/g,
      /style=\{\{.*?(background|color|border|shadow).*?\}\}/g
    ];
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      let styleMatches = [];
      
      // Check each pattern
      for (const pattern of stylePatterns) {
        const matches = content.match(pattern);
        if (matches) {
          styleMatches = styleMatches.concat(matches);
        }
      }
      
      // Filter out styles that use theme variables
      const nonThemeStyles = styleMatches.filter(match => 
        !match.includes('var(--theme-') && 
        !match.includes('theme === ') &&
        !match.includes('isDarkTheme ?')
      );
      
      if (nonThemeStyles.length > 0) {
        results.push({
          file: path.relative(ROOT_DIR, file),
          occurrences: nonThemeStyles.length,
          examples: nonThemeStyles.slice(0, 3) // Show first few examples
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`${colors.red}Error finding inline styles: ${error.message}${colors.reset}`);
    return [];
  }
}

// Find competing theme selectors
function findCompetingSelectors() {
  console.log(`${colors.bold}Finding competing theme selectors...${colors.reset}\n`);
  
  try {
    const cssFiles = getAllFilesWithExtension(SRC_DIR, ['.css']);
    
    const results = [];
    
    for (const file of cssFiles) {
      const content = fs.readFileSync(file, 'utf8');
      
      const dataThemeSelectors = (content.match(/\[data-theme="dark"\]/g) || []).length;
      const darkClassSelectors = (content.match(/\.dark\s/g) || []).length;
      
      if (dataThemeSelectors > 0 && darkClassSelectors > 0) {
        // This file has both types of selectors
        results.push({
          file: path.relative(ROOT_DIR, file),
          dataThemeSelectors,
          darkClassSelectors
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`${colors.red}Error finding competing selectors: ${error.message}${colors.reset}`);
    return [];
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

// Main analysis function
function analyzeThemeIssues() {
  // 1. Check CSS variables
  const { lightMode, darkMode } = getThemeVariables();
  
  console.log(`${colors.green}Found ${lightMode.length} theme variables in light mode${colors.reset}`);
  console.log(`${colors.green}Found ${darkMode.length} theme variables in dark mode${colors.reset}\n`);
  
  const missingInDarkMode = lightMode.filter(variable => !darkMode.includes(variable));
  const missingInLightMode = darkMode.filter(variable => !lightMode.includes(variable));
  
  if (missingInDarkMode.length > 0) {
    console.log(`${colors.yellow}${colors.bold}Variables defined in light mode but missing in dark mode (${missingInDarkMode.length}):${colors.reset}`);
    missingInDarkMode.forEach(variable => {
      console.log(`  ${colors.yellow}${variable}${colors.reset}`);
    });
    console.log('');
  }
  
  if (missingInLightMode.length > 0) {
    console.log(`${colors.yellow}${colors.bold}Variables defined in dark mode but missing in light mode (${missingInLightMode.length}):${colors.reset}`);
    missingInLightMode.forEach(variable => {
      console.log(`  ${colors.yellow}${variable}${colors.reset}`);
    });
    console.log('');
  }
  
  // 2. Check Tailwind dark: modifiers
  const darkModifierResults = findDarkModeModifiers();
  
  if (darkModifierResults.length > 0) {
    console.log(`${colors.magenta}${colors.bold}Found ${darkModifierResults.length} files using Tailwind dark: modifiers:${colors.reset}`);
    darkModifierResults.forEach(result => {
      console.log(`  ${colors.magenta}${result.file}${colors.reset} (${result.occurrences} occurrences)`);
      if (result.examples.length > 0) {
        console.log(`    Examples: ${result.examples.join(', ')}`);
      }
    });
    console.log('');
  }
  
  // 3. Check direct color values
  const directColorResults = findDirectColorValues();
  
  if (directColorResults.length > 0) {
    console.log(`${colors.red}${colors.bold}Found ${directColorResults.length} files using direct color values:${colors.reset}`);
    directColorResults.forEach(result => {
      console.log(`  ${colors.red}${result.file}${colors.reset} (${result.occurrences} occurrences)`);
      if (result.examples.length > 0) {
        console.log(`    Examples: ${result.examples.map(ex => ex.slice(0, 50) + (ex.length > 50 ? '...' : '')).join('\n    ')}`);
      }
    });
    console.log('');
  }
  
  // 4. Check inline styles
  const inlineStyleResults = findInlineStyles();
  
  if (inlineStyleResults.length > 0) {
    console.log(`${colors.cyan}${colors.bold}Found ${inlineStyleResults.length} files with potentially non-theme-aware inline styles:${colors.reset}`);
    inlineStyleResults.forEach(result => {
      console.log(`  ${colors.cyan}${result.file}${colors.reset} (${result.occurrences} occurrences)`);
      if (result.examples.length > 0) {
        console.log(`    Examples: ${result.examples.map(ex => ex.slice(0, 50) + (ex.length > 50 ? '...' : '')).join('\n    ')}`);
      }
    });
    console.log('');
  }
  
  // 5. Check competing selectors
  const competingSelectorsResults = findCompetingSelectors();
  
  if (competingSelectorsResults.length > 0) {
    console.log(`${colors.blue}${colors.bold}Found ${competingSelectorsResults.length} CSS files with competing theme selectors:${colors.reset}`);
    competingSelectorsResults.forEach(result => {
      console.log(`  ${colors.blue}${result.file}${colors.reset}`);
      console.log(`    [data-theme="dark"]: ${result.dataThemeSelectors} occurrences`);
      console.log(`    .dark: ${result.darkClassSelectors} occurrences`);
    });
    console.log('');
  }
  
  console.log(`${colors.green}${colors.bold}Analysis complete!${colors.reset}`);
}

// Run the analysis
analyzeThemeIssues();