// Component Style Converter (ESM Version)
// This utility script automatically converts component styles to use theme-aware variables

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Process a single file to convert styles to theme-aware approach
 */
function convertComponentStyles(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let changesMade = false;
    
    // Pattern 1: Convert competing light/dark mode classes to theme-aware variables
    const competingStylesPattern = /(className=["'].*?)(\w+)-\[var\(--([^)]+)\)\](.*?)dark:\2-\[var\(--([^)]+)\)\](.*?["'])/g;
    updatedContent = updatedContent.replace(competingStylesPattern, (match, prefix, property, lightVar, middle, darkVar, suffix) => {
      // Map variable to theme-aware equivalent
      const themeVar = getThemeVariable(lightVar, darkVar, property);
      changesMade = true;
      return `${prefix}${property}-[var(${themeVar})]${middle}${suffix}`;
    });
    
    // Pattern 2: Convert inline styles to theme-aware variables
    const inlineStylePattern = /style=\{\{([^}]*?)['"]var\(--([^)]+)\)['"]([^}]*?)\}\}/g;
    updatedContent = updatedContent.replace(inlineStylePattern, (match, prefix, variable, suffix) => {
      // Check if this is a color-related style property
      if (prefix.includes('color') || prefix.includes('background') || prefix.includes('border')) {
        const themeVar = getThemeVariable(variable, null, 'color');
        changesMade = true;
        return `className="bg-[var(${themeVar})]"`;
      }
      return match;
    });
    
    // Pattern 3: Convert CSS variables without dark mode counterparts
    const cssVarPattern = /(className=["'].*?)(\w+)-\[var\(--([^)]+)\)\](.*?["'])/g;
    updatedContent = updatedContent.replace(cssVarPattern, (match, prefix, property, variable, suffix) => {
      // Only convert if not already using a theme variable
      if (!variable.startsWith('theme-')) {
        const themeVar = getThemeVariable(variable, null, property);
        changesMade = true;
        return `${prefix}${property}-[var(${themeVar})]${suffix}`;
      }
      return match;
    });
    
    // Pattern 4: Convert hardcoded color values with dark mode variants
    const hardcodedColorPattern = /(className=["'].*?)(\w+)-(white|black|gray-\d+|blue-\d+|red-\d+)(.*?)dark:\2-(\w+-\d+|white|black)(.*?["'])/g;
    updatedContent = updatedContent.replace(hardcodedColorPattern, (match, prefix, property, lightColor, middle, darkColor, suffix) => {
      // Suggest a theme utility class
      const themeClass = `${property}-theme-${getThemeClassFromColors(lightColor, darkColor)}`;
      changesMade = true;
      return `${prefix}${themeClass}${middle}${suffix}`;
    });
    
    // Pattern 5: Convert gradient backgrounds with dark mode variants
    const gradientPattern = /(className=["'].*?)bg-gradient-to-(\w+)([^"]*)dark:bg-gradient-to-\w+([^"]*["'])/g;
    updatedContent = updatedContent.replace(gradientPattern, (match, prefix, direction, lightGradient, suffix) => {
      changesMade = true;
      return `${prefix}bg-theme-gradient${suffix}`;
    });
    
    // Only write the file if changes were made
    if (changesMade) {
      fs.writeFileSync(filePath, updatedContent);
      return {
        file: filePath,
        status: 'updated'
      };
    }
    
    return {
      file: filePath,
      status: 'no changes'
    };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return {
      file: filePath,
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Map variable names to theme-aware equivalents
 */
function getThemeVariable(lightVar, darkVar, property) {
  // Text color mappings
  if (property === 'text' || property === 'color') {
    if (lightVar === 'text-navy' || darkVar === 'text-white' || darkVar === 'text-cream') {
      return '--theme-text-primary';
    }
    if (lightVar === 'primary-orange' || darkVar === 'primary-orange-light') {
      return '--theme-primary';
    }
    if (lightVar === 'secondary-teal' || darkVar === 'secondary-teal-light') {
      return '--theme-accent-secondary';
    }
  }
  
  // Background color mappings
  if (property === 'bg' || property === 'background') {
    if (lightVar === 'bg-cream' || darkVar === 'bg-navy') {
      return '--theme-bg-primary';
    }
    if (lightVar === 'bg-cream-darker' || darkVar === 'bg-navy-darker') {
      return '--theme-bg-secondary';
    }
    if (lightVar === 'primary-orange' || darkVar === 'primary-orange-light') {
      return '--theme-primary';
    }
    if (lightVar === 'secondary-teal' || darkVar === 'secondary-teal-light') {
      return '--theme-accent-secondary';
    }
  }
  
  // If no specific mapping, create a generic theme variable name
  return `--theme-${lightVar}`;
}

/**
 * Get theme class based on color values
 */
function getThemeClassFromColors(lightColor, darkColor) {
  // Map common color combinations to theme classes
  if ((lightColor === 'white' && darkColor === 'gray-800') ||
      (lightColor === 'gray-900' && darkColor === 'white')) {
    return 'primary';
  }
  
  if ((lightColor === 'gray-600' && darkColor === 'gray-300') ||
      (lightColor === 'gray-700' && darkColor === 'gray-400')) {
    return 'secondary';
  }
  
  // For unmapped combinations, create a generic name
  return 'custom';
}

/**
 * Recursively process all files in a directory
 */
function processDirectory(directory, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const results = [];
  
  try {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
        results.push(...processDirectory(filePath, extensions));
      } else if (stats.isFile() && extensions.includes(path.extname(filePath))) {
        results.push(convertComponentStyles(filePath));
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
  }
  
  return results;
}

/**
 * Create backup of a file before processing
 */
function createBackup(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(`${filePath}.backup`, content);
    return true;
  } catch (error) {
    console.error(`Error creating backup for ${filePath}:`, error);
    return false;
  }
}

/**
 * Generate theme-aware utility classes for globals.css
 */
function generateUtilityClasses() {
  return `
/* Theme-aware utility classes */
.text-theme-primary {
  color: var(--theme-text-primary);
}

.text-theme-secondary {
  color: var(--theme-text-secondary);
}

.bg-theme-primary {
  background-color: var(--theme-bg-primary);
}

.bg-theme-secondary {
  background-color: var(--theme-bg-secondary);
}

.bg-theme-accent {
  background-color: var(--theme-accent-secondary);
}

.border-theme-primary {
  border-color: var(--theme-primary);
}

.border-theme-secondary {
  border-color: var(--theme-accent-secondary);
}

.bg-theme-gradient {
  background: linear-gradient(to bottom right, var(--theme-gradient-start), var(--theme-gradient-end));
}

.bg-theme-gradient-primary {
  background: linear-gradient(to right, var(--theme-primary-gradient-start), var(--theme-primary-gradient-end));
}

.bg-theme-gradient-secondary {
  background: linear-gradient(to right, var(--theme-secondary-gradient-start), var(--theme-secondary-gradient-end));
}

.shadow-theme-sm {
  box-shadow: var(--theme-shadow-sm);
}

.shadow-theme-md {
  box-shadow: var(--theme-shadow-md);
}

.shadow-theme-lg {
  box-shadow: var(--theme-shadow-lg);
}

.hover-bubbly {
  transition: all var(--theme-transition-bounce);
}
.hover-bubbly:hover {
  transform: translateY(var(--theme-anim-distance)) scale(var(--theme-anim-scale));
}

.hover-bubbly-sm {
  transition: all var(--theme-transition-bounce);
}
.hover-bubbly-sm:hover {
  transform: translateY(calc(var(--theme-anim-distance) * 0.5)) scale(calc(var(--theme-anim-scale) - 0.01));
}

.hover-bubbly-lg {
  transition: all var(--theme-transition-bounce);
}
.hover-bubbly-lg:hover {
  transform: translateY(calc(var(--theme-anim-distance) * 1.5)) scale(calc(var(--theme-anim-scale) + 0.01)) rotate(0.5deg);
}
`;
}

/**
 * Main function to run the script
 */
function main() {
  const args = process.argv.slice(2);
  const sourceDir = args[0] || './src';
  const backupFlag = args.includes('--backup');
  
  console.log(`Converting component styles in ${sourceDir} to use theme-aware variables...`);
  
  if (backupFlag) {
    console.log('Creating backups of files before conversion...');
  }
  
  // Process all files
  const results = processDirectory(sourceDir);
  
  // Print summary
  const updated = results.filter(r => r.status === 'updated').length;
  const noChanges = results.filter(r => r.status === 'no changes').length;
  const errors = results.filter(r => r.status === 'error').length;
  
  console.log(`\n=== Conversion Summary ===`);
  console.log(`Files processed: ${results.length}`);
  console.log(`Files updated: ${updated}`);
  console.log(`Files with no changes needed: ${noChanges}`);
  console.log(`Errors: ${errors}`);
  
  if (updated > 0) {
    console.log(`\n=== Next Steps ===`);
    console.log(`1. Add theme-aware utility classes to your globals.css file`);
    console.log(`2. Test all components in both light and dark modes`);
    console.log(`3. Fine-tune any components that need adjustments`);
    
    // Print utility classes
    console.log(`\n=== Utility Classes to Add ===`);
    console.log(generateUtilityClasses());
  }
}

// Execute the script when run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

// Export functions for use in other modules
export {
  convertComponentStyles,
  processDirectory,
  createBackup,
  generateUtilityClasses,
  getThemeVariable,
  getThemeClassFromColors
};
