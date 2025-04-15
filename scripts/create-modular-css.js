const fs = require('fs');
const path = require('path');

console.log('Starting CSS modularization...');

// Read the gradient-fixed CSS file
const cssPath = path.join(__dirname, '../src/app/globals.css.gradient-fix');
let css;
try {
  css = fs.readFileSync(cssPath, 'utf8');
  console.log(`Read ${css.length} bytes from globals.css.gradient-fix`);
} catch (error) {
  console.error(`Error reading CSS file: ${error.message}`);
  process.exit(1);
}

// Define the modules and their identification patterns
const modules = [
  {
    name: 'variables',
    pattern: /\/\* =+\s*VARIABLES\s*=+ \*\/[\s\S]+?(?=\/\* =+)/
  },
  {
    name: 'dark-mode',
    pattern: /\/\* =+\s*DARK MODE OVERRIDES\s*=+ \*\/[\s\S]+?(?=\/\* =+)/
  },
  {
    name: 'base-elements',
    pattern: /\/\* =+\s*BASE HTML ELEMENTS\s*=+ \*\/[\s\S]+?(?=\/\* =+)/
  },
  {
    name: 'animations',
    pattern: /\/\* =+\s*ANIMATIONS\s*=+ \*\/[\s\S]+?(?=\/\* =+)/
  },
  {
    name: 'theme-utilities',
    pattern: /\/\* =+\s*THEME-AWARE UTILITY CLASSES\s*=+ \*\/[\s\S]+?(?=\/\* =+)/
  },
  {
    name: 'components',
    pattern: /\/\* =+\s*COMPONENT STYLES\s*=+ \*\/[\s\S]+?(?=\/\* =+)/
  },
  {
    name: 'utilities',
    pattern: /\/\* =+\s*UTILITY CLASSES\s*=+ \*\/[\s\S]+?(?=\/\* =+|$)/
  }
];

// Create the CSS modules directory
const modulesDir = path.join(__dirname, '../src/styles/modules');
if (!fs.existsSync(modulesDir)) {
  fs.mkdirSync(modulesDir, { recursive: true });
  console.log(`Created directory: ${modulesDir}`);
}

// Extract and save each module
let extractedModules = 0;
modules.forEach(module => {
  const match = css.match(module.pattern);
  if (match) {
    const content = match[0];
    const filePath = path.join(modulesDir, `${module.name}.css`);
    
    // Add module-specific header
    const moduleContent = `/*
 * ${module.name.toUpperCase()}
 * Part of the theme-aware styling system
 * Auto-generated on ${new Date().toISOString()}
 */

${content}`;
    
    fs.writeFileSync(filePath, moduleContent);
    console.log(`Created module: ${module.name}.css (${content.length} bytes)`);
    extractedModules++;
  } else {
    console.warn(`Warning: Could not extract module ${module.name}`);
  }
});

// Create the main CSS file that imports all modules
const stylesDir = path.join(__dirname, '../src/styles');
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

const importStatements = modules
  .filter(module => fs.existsSync(path.join(modulesDir, `${module.name}.css`)))
  .map(module => `@import "./modules/${module.name}.css";`)
  .join('\n');

const mainCss = `/* 
 * THEME-AWARE STYLING SYSTEM - MODULAR VERSION
 * Auto-generated on ${new Date().toISOString()}
 *
 * This file imports all modular CSS components in the correct order.
 * Do not modify this file manually.
 */

${importStatements}
`;

const indexPath = path.join(stylesDir, 'index.css');
fs.writeFileSync(indexPath, mainCss);
console.log(`Created main CSS entry point: ${indexPath}`);

// Create a README file to explain the modular structure
const readmePath = path.join(stylesDir, 'README.md');
const readme = `# Modular CSS Structure

This directory contains the modularized CSS for the Vertical Shortcut theme system.

## Directory Structure

- \`index.css\`: Main entry point that imports all modules
- \`modules/\`: Contains individual CSS modules

## Modules

${modules.map(m => `- \`${m.name}.css\`: ${m.name.replace(/-/g, ' ')} styles`).join('\n')}

## How to Use

Import the main CSS file in your application entry point:

\`\`\`javascript
import './styles/index.css';
\`\`\`

## Development

When making style changes:

1. Modify the appropriate module file in \`modules/\`
2. Test changes in both light and dark mode
3. Ensure theme-aware variables are used consistently

For large-scale changes, consult the CSS refactoring documentation first.

DO NOT edit the \`index.css\` file directly, as it's auto-generated.
`;

fs.writeFileSync(readmePath, readme);
console.log(`Created README at ${readmePath}`);

console.log(`\nSuccessfully created ${extractedModules} CSS modules!`);
console.log('CSS modularization complete.');