// Theme-Aware Variable Converter (ESM Version)
// This utility script scans your codebase for competing light/dark mode styles
// and converts them to use theme-aware variables

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define mapping from old variables to theme-aware variables
const variableMapping = {
  // Text colors
  '--text-navy': '--theme-text-primary',
  '--text-cream': '--theme-text-secondary',
  
  // Background colors
  '--bg-cream': '--theme-bg-primary',
  '--bg-cream-darker': '--theme-bg-secondary',
  '--bg-navy': '--theme-bg-primary', // In dark mode, this maps to the same theme variable
  '--bg-navy-darker': '--theme-bg-secondary',
  
  // Primary colors
  '--primary-orange': '--theme-primary',
  '--primary-orange-hover': '--theme-primary-hover',
  '--primary-orange-light': '--theme-primary-light',
  
  // Secondary colors
  '--secondary-teal': '--theme-accent-secondary',
  '--secondary-teal-hover': '--theme-accent-secondary-hover',
  '--secondary-teal-light': '--theme-accent-secondary-light',
  
  // Accent colors
  '--accent-coral': '--theme-accent-tertiary',
  '--accent-red': '--theme-accent-quaternary',
  
  // Shadow effects
  '--shadow-sm': '--theme-shadow-sm',
  '--shadow-md': '--theme-shadow-md',
  '--shadow-lg': '--theme-shadow-lg',
  
  // Add more mappings as needed
};

// Patterns to find in code
const patterns = {
  // Pattern 1: Competing dark mode classes for the same property
  competingDarkMode: /className="([^"]*?)bg-\[var\(--([^)]+)\)\]([^"]*?)dark:bg-\[var\(--([^)]+)\)\]/g,
  
  // Pattern 2: Inline styles with CSS variables
  inlineStyles: /style=\{\{([^}]*?)['"]var\(--([^)]+)\)['"]([^}]*?)\}\}/g,
  
  // Pattern 3: CSS variables in className without dark mode counterpart
  cssVarsInClass: /className="([^"]*?)(\w+)-\[var\(--([^)]+)\)\]([^"]*?)"/g,
  
  // Pattern 4: Direct Tailwind color classes with dark mode counterparts
  tailwindColors: /className="([^"]*?)(text|bg|border)-(\w+)([^"]*?)dark:\2-(\w+)([^"]*?)"/g
};

/**
 * Function to scan file content and identify patterns to replace
 */
function scanFileContent(content) {
  const issues = [];
  
  // Check for competing dark mode classes
  let match;
  while ((match = patterns.competingDarkMode.exec(content)) !== null) {
    issues.push({
      type: 'competingDarkMode',
      match: match[0],
      property: match[1].trim(),
      lightVar: match[2],
      darkVar: match[4],
      lineContext: getLineContext(content, match.index)
    });
  }
  
  // Check for inline styles with CSS variables
  while ((match = patterns.inlineStyles.exec(content)) !== null) {
    issues.push({
      type: 'inlineStyles',
      match: match[0],
      styleContent: match[1] + match[3],
      variable: match[2],
      lineContext: getLineContext(content, match.index)
    });
  }
  
  // Check for CSS variables in className without dark mode counterpart
  while ((match = patterns.cssVarsInClass.exec(content)) !== null) {
    issues.push({
      type: 'cssVarsInClass',
      match: match[0],
      property: match[2],
      variable: match[3],
      lineContext: getLineContext(content, match.index)
    });
  }
  
  // Check for direct Tailwind color classes with dark mode counterparts
  while ((match = patterns.tailwindColors.exec(content)) !== null) {
    issues.push({
      type: 'tailwindColors',
      match: match[0],
      property: match[2],
      lightColor: match[3],
      darkColor: match[5],
      lineContext: getLineContext(content, match.index)
    });
  }
  
  return issues;
}

/**
 * Get surrounding line context for better debugging
 */
function getLineContext(content, index) {
  const lines = content.substring(0, index).split('\n');
  const line = lines.length;
  const startLine = Math.max(1, line - 2);
  const endLine = line + 2;
  
  return `Lines ${startLine}-${endLine}`;
}

/**
 * Generates the recommended theme-aware replacement
 */
function generateReplacement(issue) {
  switch (issue.type) {
    case 'competingDarkMode':
      // For competing bg/text classes, replace with theme-aware variable
      const themeVar = variableMapping[`--${issue.lightVar}`] || `--theme-${issue.lightVar}`;
      return issue.match.replace(
        /bg-\[var\(--([^)]+)\)\]([^"]*?)dark:bg-\[var\(--([^)]+)\)\]/,
        `bg-[var(${themeVar})]`
      );
      
    case 'inlineStyles':
      // For inline styles, replace with theme-aware approach
      const styleThemeVar = variableMapping[`--${issue.variable}`] || `--theme-${issue.variable}`;
      return `className="bg-[var(${styleThemeVar})]"`;
      
    case 'cssVarsInClass':
      // For CSS vars in className, replace with theme-aware variable
      const cssThemeVar = variableMapping[`--${issue.variable}`] || `--theme-${issue.variable}`;
      return issue.match.replace(
        /(\w+)-\[var\(--([^)]+)\)\]/,
        `$1-[var(${cssThemeVar})]`
      );
      
    case 'tailwindColors':
      // For direct Tailwind colors, create a theme utility class suggestion
      const property = issue.property; // bg, text, border, etc.
      return `className="Add '${property}-theme-primary' utility class to globals.css"`;
      
    default:
      return "No replacement suggestion available";
  }
}

/**
 * Process a single file and generate replacement suggestions
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = scanFileContent(content);
    
    if (issues.length > 0) {
      console.log(`\n== Issues found in ${filePath} ==`);
      
      issues.forEach((issue, index) => {
        console.log(`\n[${index + 1}] ${issue.type} (${issue.lineContext}):`);
        console.log(`  Original: ${issue.match}`);
        console.log(`  Suggested: ${generateReplacement(issue)}`);
      });
    }
    
    return issues;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return [];
  }
}

/**
 * Recursively process all files in a directory
 */
function processDirectory(directory, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const issues = [];
  
  try {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
        issues.push(...processDirectory(filePath, extensions));
      } else if (stats.isFile() && extensions.includes(path.extname(filePath))) {
        issues.push(...processFile(filePath));
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
  }
  
  return issues;
}

/**
 * Add theme-aware CSS variables to globals.css
 */
function addThemeAwareVariablesToCSS(cssFilePath) {
  try {
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    
    // Check if theme variables already exist
    if (cssContent.includes('--theme-text-primary')) {
      console.log('\n✅ Theme-aware variables already exist in your CSS.');
      return;
    }
    
    // Create theme-aware variables
    const themeVariables = `
/* Theme-aware CSS variables */
:root {
  /* Text theme variables */
  --theme-text-primary: var(--text-navy);
  --theme-text-secondary: var(--text-navy);
  
  /* Background theme variables */
  --theme-bg-primary: var(--bg-cream);
  --theme-bg-secondary: var(--bg-cream-darker);
  
  /* Primary theme variables */
  --theme-primary: var(--primary-orange);
  --theme-primary-hover: var(--primary-orange-hover);
  --theme-primary-light: var(--primary-orange-light);
  
  /* Secondary theme variables */
  --theme-accent-secondary: var(--secondary-teal);
  --theme-accent-secondary-hover: var(--secondary-teal-hover);
  --theme-accent-secondary-light: var(--secondary-teal-light);
  
  /* Accent theme variables */
  --theme-accent-tertiary: var(--accent-coral);
  --theme-accent-quaternary: var(--accent-red);
  
  /* Gradient theme variables */
  --theme-gradient-start: white;
  --theme-gradient-end: var(--bg-cream);
  
  /* Shadow theme variables */
  --theme-shadow-sm: var(--shadow-sm);
  --theme-shadow-md: var(--shadow-md);
  --theme-shadow-lg: var(--shadow-lg);
  
  /* Floating element theme variables */
  --theme-float-opacity: 0.05;
  --theme-float-opacity-secondary: 0.08;
  --theme-float-bg-primary: var(--primary-orange);
  --theme-float-bg-secondary: var(--secondary-teal-light);
}

/* Dark mode theme variable overrides */
@variant(dark) {
  :root {
    /* Text theme variables - dark mode */
    --theme-text-primary: white;
    --theme-text-secondary: rgba(255, 255, 255, 0.7);
    
    /* Background theme variables - dark mode */
    --theme-bg-primary: var(--bg-navy);
    --theme-bg-secondary: var(--bg-navy-darker);
    
    /* Primary theme variables - dark mode */
    --theme-primary: var(--primary-orange);
    --theme-primary-hover: var(--primary-orange-hover);
    --theme-primary-light: var(--primary-orange-light);
    
    /* Secondary theme variables - dark mode */
    --theme-accent-secondary: var(--secondary-teal);
    --theme-accent-secondary-hover: var(--secondary-teal-hover);
    --theme-accent-secondary-light: var(--secondary-teal-light);
    
    /* Gradient theme variables - dark mode */
    --theme-gradient-start: var(--bg-navy);
    --theme-gradient-end: var(--bg-navy-darker);
    
    /* Shadow theme variables - dark mode */
    --theme-shadow-sm: 0 0 15px rgba(53, 115, 128, 0.15);
    --theme-shadow-md: 0 0 20px rgba(53, 115, 128, 0.2);
    --theme-shadow-lg: 0 0 30px rgba(53, 115, 128, 0.25);
    
    /* Floating element theme variables - dark mode */
    --theme-float-opacity: 0.1;
    --theme-float-opacity-secondary: 0.15;
    --theme-float-bg-primary: linear-gradient(to right, var(--primary-orange), var(--primary-orange-hover));
    --theme-float-bg-secondary: linear-gradient(to right, var(--secondary-teal), var(--secondary-teal-hover));
  }
}
`;
    
    // Append theme variables to CSS file
    fs.writeFileSync(cssFilePath, cssContent + themeVariables);
    console.log(`\n✅ Theme-aware variables added to ${cssFilePath}`);
  } catch (error) {
    console.error(`Error adding theme variables to CSS:`, error);
  }
}

/**
 * Main function to run the script
 */
function main() {
  const sourceDir = process.argv[2] || './src';
  console.log(`Scanning files in ${sourceDir} for theme-related issues...`);
  
  const issues = processDirectory(sourceDir);
  
  console.log(`\n=== Summary ===`);
  console.log(`Total issues found: ${issues.length}`);
  
  const issuesByType = issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {});
  
  for (const [type, count] of Object.entries(issuesByType)) {
    console.log(`- ${type}: ${count}`);
  }
  
  if (issues.length > 0) {
    console.log(`\n=== Next Steps ===`);
    console.log(`1. Add theme-aware variables to your globals.css file (run with --add-vars option)`);
    console.log(`2. Update components to use theme-aware variables`);
    console.log(`3. Test in both light and dark modes`);
  }
}

// If run with the --add-vars option, add theme variables to globals.css
if (process.argv.includes('--add-vars')) {
  const cssFilePath = process.argv[process.argv.indexOf('--add-vars') + 1] || './src/app/globals.css';
  addThemeAwareVariablesToCSS(cssFilePath);
} else {
  main();
}

// Run the script if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

// Export functions for importing in other modules
export {
  scanFileContent,
  generateReplacement,
  processFile,
  processDirectory,
  addThemeAwareVariablesToCSS
};