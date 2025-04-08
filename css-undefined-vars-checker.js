#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

/**
 * CSS Undefined Variables Checker
 * 
 * This tool finds CSS variables that are referenced in code but not defined anywhere:
 * 1. Scans all CSS, SCSS, LESS files for CSS variable definitions
 * 2. Scans all JS, JSX, TS, TSX files for CSS variable references
 * 3. Reports variables that are referenced but not defined anywhere
 */

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_PATHS = [
  './src/**/*.{css,scss,less,js,jsx,ts,tsx}',
  './public/**/*.{css,scss,less,js,jsx,ts,tsx}',
  './styles/**/*.{css,scss,less,js,jsx,ts,tsx}'
];

// Find all files
const allFiles = [];
SOURCE_PATHS.forEach(pattern => {
  allFiles.push(...glob.sync(pattern));
});

console.log('🔍 CSS Undefined Variables Checker');
console.log('==================================================');
console.log(`📂 Found ${allFiles.length} files to scan\n`);

// Extract all CSS variable definitions from all files
function extractCssVariableDefinitions() {
  const definitions = new Set();
  let fileCount = 0;

  allFiles.forEach(file => {
    // Only process CSS, SCSS and LESS files for definitions
    if (!['.css', '.scss', '.less'].includes(path.extname(file))) {
      return;
    }

    fileCount++;
    const content = fs.readFileSync(file, 'utf8');
    
    // Regex for CSS variable definitions (--variable-name: value;)
    const cssVarRegex = /--([a-zA-Z0-9_-]+)\s*:/g;
    let match;
    
    while ((match = cssVarRegex.exec(content)) !== null) {
      definitions.add(match[1]);
    }
  });

  return { definitions: [...definitions], fileCount };
}

// Extract all CSS variable references from all files
function extractCssVariableReferences() {
  const references = new Map(); // variable name -> set of files
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Regex patterns to find CSS variables references
    const patterns = [
      // var(--variable-name)
      /var\s*\(\s*--([a-zA-Z0-9_-]+)[^)]*?\)/g,

      // className="*[var(--variable-name)]*"
      /className\s*=\s*(?:"[^"]*?|'[^']*?|\{[^{}]*?)\[var\s*\(\s*--([a-zA-Z0-9_-]+)[^)]*?\)[^\]]*?\]/g,
      
      // style={{ property: 'var(--variable-name)' }}
      /style\s*=\s*\{\s*\{[^{}]*?['"]var\s*\(\s*--([a-zA-Z0-9_-]+)[^)]*?\)['"][^{}]*?\}\s*\}/g,
      
      // style={{ property: `var(--variable-name)` }}
      /style\s*=\s*\{\s*\{[^{}]*?`[^`]*?var\s*\(\s*--([a-zA-Z0-9_-]+)[^)]*?\)[^`]*?`[^{}]*?\}\s*\}/g,
      
      // CSS-in-JS: `var(--variable-name)`
      /`[^`]*?var\s*\(\s*--([a-zA-Z0-9_-]+)[^)]*?\)[^`]*?`/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1] && !match[1].includes('${')) {
          if (!references.has(match[1])) {
            references.set(match[1], new Set());
          }
          references.get(match[1]).add(file);
        }
      }
    });
  });
  
  return references;
}

// Get all defined and referenced variables
const { definitions, fileCount: cssFileCount } = extractCssVariableDefinitions();
const references = extractCssVariableReferences();

console.log(`📋 Found ${definitions.length} CSS variable definitions in ${cssFileCount} CSS files`);
console.log(`📋 Found ${references.size} unique CSS variable references\n`);

// Find undefined variables (referenced but not defined)
const undefinedVariables = new Map();

references.forEach((files, varName) => {
  if (!definitions.includes(varName)) {
    undefinedVariables.set(varName, files);
  }
});

// Report results
console.log('📊 Results');
console.log('==================================================');
console.log(`Total CSS variable definitions: ${definitions.length}`);
console.log(`Total CSS variable references: ${references.size}`);
console.log(`Undefined variables: ${undefinedVariables.size}\n`);

if (undefinedVariables.size > 0) {
  console.log('❌ Undefined CSS Variables');
  console.log('==================================================');
  console.log('These CSS variables are referenced in code but not defined anywhere:');
  console.log('');
  
  const sortedUndefined = [...undefinedVariables.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  
  sortedUndefined.forEach(([varName, files]) => {
    console.log(`--${varName}:`);
    [...files].sort().forEach(file => {
      console.log(`  - ${path.relative('.', file)}`);
    });
    console.log('');
  });
  
  console.log('\n📝 CSS Snippets to Add:\n');
  console.log(':root {');
  sortedUndefined.forEach(([varName]) => {
    console.log(`  --${varName}: /* Add value */;`);
  });
  console.log('}');
  console.log('');
}

// Suggestions
console.log('💡 Recommendations');
console.log('==================================================');
console.log('For undefined CSS variables, you should:');
console.log('1. Add missing definitions to your CSS/SCSS files');
console.log('2. Check for typos in variable names');
console.log('3. Consider using TypeScript for CSS variables to catch errors');
console.log('4. Group related variables in :root blocks for better organization');
console.log('5. Use a "theme-" prefix for theme-related variables');
console.log('6. Use a "component-" prefix for component-specific variables\n');

// List all defined variables for reference
console.log('📚 All Defined CSS Variables (for reference)');
console.log('==================================================');
const sortedDefinitions = [...definitions].sort();
for (let i = 0; i < sortedDefinitions.length; i += 3) {
  const row = sortedDefinitions.slice(i, i + 3).map(name => `--${name}`).join('  ');
  console.log(row);
}