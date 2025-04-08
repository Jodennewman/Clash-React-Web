#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

/**
 * Advanced CSS Variable Checker
 * 
 * This tool analyzes your React codebase to find:
 * 1. Theme-aware CSS classes used in components (e.g., text-theme-primary)
 * 2. CSS variables used in inline styles (e.g., var(--theme-primary))
 * 3. Direct CSS variable references in any context
 * 
 * It compares these against variables defined in your globals.css file
 * to identify any missing or unused variables.
 */

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSS_FILE_PATH = './src/app/globals.css';
const COMPONENT_PATHS = [
  './src/components/**/*.tsx',
  './src/components/**/*.jsx',
  './src/*.tsx',
  './src/*.jsx',
];

// Load the CSS file
try {
  var cssContent = fs.readFileSync(CSS_FILE_PATH, 'utf8');
} catch (error) {
  console.error(`Error reading CSS file at ${CSS_FILE_PATH}: ${error.message}`);
  process.exit(1);
}

// Function to extract theme-aware classes defined in CSS
function extractThemeAwareClasses(cssContent) {
  // Regex to match theme-aware class definitions like .text-theme-primary, .bg-theme-gradient, etc.
  const themeClassRegex = /\.((?:text|bg|border|shadow)-theme-[a-zA-Z0-9-]+)\s*\{/g;
  const classes = new Set();
  let match;
  
  while ((match = themeClassRegex.exec(cssContent)) !== null) {
    classes.add(match[1]);
  }
  
  return [...classes];
}

// Function to extract CSS variables defined in CSS
function extractCssVariables(cssContent) {
  // Regex to match CSS variable definitions like --theme-primary: value;
  const cssVarRegex = /--([a-zA-Z0-9-]+)\s*:/g;
  const variables = new Set();
  let match;
  
  while ((match = cssVarRegex.exec(cssContent)) !== null) {
    variables.add(match[1]);
  }
  
  return [...variables];
}

// Function to extract theme-aware classes used in components
function extractUsedThemeClasses(componentContent) {
  // Regex to match class names in className="..." or className={...} that include theme-
  const classNameRegex = /className\s*=\s*(?:"|'|{(?:[^{}]|`[^`]*`)*?})[^"']*?((?:text|bg|border|shadow)-theme-[a-zA-Z0-9-]+)/g;
  const classes = new Set();
  let match;
  
  while ((match = classNameRegex.exec(componentContent)) !== null) {
    classes.add(match[1]);
  }
  
  return [...classes];
}

// Function to extract CSS variables used in inline styles
function extractInlineStyleVariables(componentContent) {
  // Regex patterns to find CSS variables in inline styles
  // This targets patterns like style={{ color: 'var(--theme-primary)' }} or style={{ color: `var(--${dynamicTheme})` }}
  const patterns = [
    // Regular inline style with var(--variable)
    /style\s*=\s*\{\s*\{[^{}]*?var\s*\(\s*--([a-zA-Z0-9-]+)[^)]*?\)[^{}]*?\}\s*\}/g,
    
    // Template literals in style={{ prop: `...var(--variable)...` }}
    /style\s*=\s*\{\s*\{[^{}]*?`[^`]*?var\s*\(\s*--([a-zA-Z0-9-]+)[^)]*?\)[^`]*?`[^{}]*?\}\s*\}/g,
    
    // Dynamic variables in style={{ prop: `var(--${dynamic})` }}
    /style\s*=\s*\{\s*\{[^{}]*?`[^`]*?var\s*\(\s*--\$\{([^{}]+?)\}[^)]*?\)[^`]*?`[^{}]*?\}\s*\}/g
  ];
  
  const variables = new Set();
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(componentContent)) !== null) {
      if (match[1] && !match[1].includes('${')) {
        variables.add(match[1]);
      } else if (match[1] && match[1].includes('theme')) {
        // For dynamic variables, add a note about dynamic usage
        variables.add(`DYNAMIC: ${match[1].trim()}`);
      }
    }
  });
  
  return [...variables];
}

// Function to extract direct CSS variable references in any context
function extractDirectVariableReferences(componentContent) {
  // This regex looks for any var(--variable) pattern in the code
  const varRegex = /var\s*\(\s*--([a-zA-Z0-9-]+)[^)]*?\)/g;
  const variables = new Set();
  let match;
  
  while ((match = varRegex.exec(componentContent)) !== null) {
    variables.add(match[1]);
  }
  
  return [...variables];
}

// Process the CSS file to get defined classes and variables
const definedThemeClasses = extractThemeAwareClasses(cssContent);
const definedCssVariables = extractCssVariables(cssContent);

console.log('🔍 Advanced CSS Variable Checker');
console.log('==================================================');
console.log(`📋 Found ${definedThemeClasses.length} theme-aware classes defined in ${CSS_FILE_PATH}`);
console.log(`📋 Found ${definedCssVariables.length} CSS variables defined in ${CSS_FILE_PATH}`);

// Get all component files
const componentFiles = [];
COMPONENT_PATHS.forEach(pattern => {
  componentFiles.push(...glob.sync(pattern));
});

console.log(`📂 Found ${componentFiles.length} component files to check\n`);

// Collect used classes and variables across all files
const usedThemeClasses = new Set();
const usedCssVariables = new Set();
const dynamicVariables = new Set();
const filesUsingClasses = {};
const filesUsingVariables = {};

// Map to track which files use each class/variable
const classUsageMap = {};
const variableUsageMap = {};

componentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract theme classes
  const classesInFile = extractUsedThemeClasses(content);
  if (classesInFile.length > 0) {
    filesUsingClasses[file] = classesInFile;
    
    classesInFile.forEach(cls => {
      usedThemeClasses.add(cls);
      
      // Track which files use this class
      if (!classUsageMap[cls]) {
        classUsageMap[cls] = [];
      }
      classUsageMap[cls].push(file);
    });
  }
  
  // Extract inline style variables
  const inlineVars = extractInlineStyleVariables(content);
  const directVars = extractDirectVariableReferences(content);
  const allVars = [...new Set([...inlineVars, ...directVars])];
  
  if (allVars.length > 0) {
    filesUsingVariables[file] = allVars;
    
    allVars.forEach(variable => {
      if (variable.startsWith('DYNAMIC:')) {
        // Handle dynamic variable patterns
        dynamicVariables.add(variable);
      } else {
        usedCssVariables.add(variable);
        
        // Track which files use this variable
        if (!variableUsageMap[variable]) {
          variableUsageMap[variable] = [];
        }
        variableUsageMap[variable].push(file);
      }
    });
  }
});

// Find missing and unused classes and variables
const missingClasses = [...usedThemeClasses].filter(cls => !definedThemeClasses.includes(cls));
const unusedClasses = definedThemeClasses.filter(cls => !usedThemeClasses.has(cls));
const missingVariables = [...usedCssVariables].filter(variable => !definedCssVariables.includes(variable));
const unusedVariables = definedCssVariables.filter(variable => !usedCssVariables.has(variable));

// Report on theme-aware classes usage
console.log('📊 Theme-Aware Classes Usage');
console.log('==================================================');

Object.entries(filesUsingClasses).forEach(([file, classes]) => {
  const shortFile = path.relative('.', file);
  console.log(`📄 ${shortFile} uses ${classes.length} theme-aware classes`);
  
  classes.forEach(cls => {
    if (definedThemeClasses.includes(cls)) {
      console.log(`   ✅ Found: ${cls}`);
    } else {
      console.log(`   ❌ Missing: ${cls}`);
    }
  });
  console.log('');
});

// Report on CSS variables usage
console.log('📊 CSS Variables Usage');
console.log('==================================================');

Object.entries(filesUsingVariables).forEach(([file, variables]) => {
  const shortFile = path.relative('.', file);
  const standardVars = variables.filter(v => !v.startsWith('DYNAMIC:'));
  const dynamicVars = variables.filter(v => v.startsWith('DYNAMIC:'));
  
  console.log(`📄 ${shortFile} uses ${standardVars.length} CSS variables ${dynamicVars.length > 0 ? `and ${dynamicVars.length} dynamic patterns` : ''}`);
  
  standardVars.forEach(variable => {
    if (definedCssVariables.includes(variable)) {
      console.log(`   ✅ Found: --${variable}`);
    } else {
      console.log(`   ❌ Missing: --${variable}`);
    }
  });
  
  dynamicVars.forEach(variable => {
    const dynamicPattern = variable.replace('DYNAMIC: ', '');
    console.log(`   🔍 Dynamic: --\${${dynamicPattern}}`);
  });
  
  if (variables.length > 0) console.log('');
});

// Summary section
console.log('📊 Summary');
console.log('==================================================');
console.log(`Total defined theme-aware classes: ${definedThemeClasses.length}`);
console.log(`Total used theme-aware classes: ${usedThemeClasses.size}`);
console.log(`Missing classes (used but not defined): ${missingClasses.length}`);
console.log(`Unused classes (defined but not used): ${unusedClasses.length}`);
console.log('');
console.log(`Total defined CSS variables: ${definedCssVariables.length}`);
console.log(`Total used CSS variables: ${usedCssVariables.size}`);
console.log(`Missing variables (used but not defined): ${missingVariables.length}`);
console.log(`Unused variables (defined but not used): ${unusedVariables.length}`);
console.log(`Dynamic variable patterns detected: ${dynamicVariables.size}`);
console.log('');

// Report missing classes
if (missingClasses.length > 0) {
  console.log('❌ Missing Classes (add these to globals.css)');
  console.log('==================================================');
  
  missingClasses.forEach(cls => {
    console.log(`${cls}:`);
    classUsageMap[cls].forEach(file => {
      console.log(`  - ${path.relative('.', file)}`);
    });
  });
  
  console.log('\n📝 CSS Snippets to Add:\n');
  missingClasses.forEach(cls => {
    console.log(`.${cls} {
  /* Add appropriate CSS properties */
}
      \n`);
  });
}

// Report missing variables
if (missingVariables.length > 0) {
  console.log('❌ Missing CSS Variables (add these to globals.css)');
  console.log('==================================================');
  
  missingVariables.forEach(variable => {
    console.log(`--${variable}:`);
    variableUsageMap[variable].forEach(file => {
      console.log(`  - ${path.relative('.', file)}`);
    });
  });
  
  console.log('\n📝 CSS Snippets to Add:\n');
  console.log(':root {');
  missingVariables.forEach(variable => {
    console.log(`  --${variable}: /* Add value */;`);
  });
  console.log('}');
  console.log('');
}

// Report dynamic patterns
if (dynamicVariables.size > 0) {
  console.log('🔍 Dynamic CSS Variable Patterns');
  console.log('==================================================');
  console.log('These patterns use dynamic variable construction like `var(--${theme}-color)`');
  console.log('Check if all possible variations are defined in your CSS:');
  console.log('');
  
  [...dynamicVariables].forEach(variable => {
    console.log(`  - ${variable.replace('DYNAMIC: ', '')}`);
  });
  console.log('');
}

// Recommendations
console.log('💡 Recommendations');
console.log('==================================================');
console.log('Ensure your CSS variable naming is consistent:');
console.log('- Theme variables: --theme-* (for variables that change with theme)');
console.log('- Component variables: --component-* (for component-specific variables)');
console.log('- Consider using CSS custom properties with fallbacks for better browser support');
console.log('- For dynamic theme variables, define all possible variations in your CSS');
console.log('');
console.log('Theme-aware classes should follow a consistent pattern:');
console.log('- Text colors: text-theme-primary, text-theme-secondary, etc.');
console.log('- Backgrounds: bg-theme-primary, bg-theme-secondary, etc.');
console.log('- Shadows: shadow-theme-sm, shadow-theme-md, shadow-theme-lg');
console.log('- Borders: border-theme-light, border-theme-primary, etc.');
console.log('- Gradients: bg-theme-gradient, bg-theme-gradient-primary, etc.');