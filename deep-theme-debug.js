#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const CSS_FILE = path.join(ROOT_DIR, 'src/app/globals.css');

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

console.log(`${colors.bold}${colors.cyan}==== VS Deep Theme Debug Utility ====${colors.reset}\n`);

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

// Check CSS implementation
function checkCSSImplementation() {
  console.log(`${colors.bold}Analyzing CSS theme implementation...${colors.reset}\n`);
  
  try {
    const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
    
    // Check for theme variants
    const hasCustomVariant = cssContent.includes('@custom-variant dark');
    const hasLayerBase = cssContent.includes('@layer base');
    const hasDataThemeSelector = cssContent.includes('[data-theme="dark"]');
    const hasDarkClassSelector = cssContent.includes('.dark');
    
    console.log(`Theme selectors found in CSS:
  - @custom-variant dark: ${hasCustomVariant ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - @layer base: ${hasLayerBase ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - [data-theme="dark"]: ${hasDataThemeSelector ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - .dark class: ${hasDarkClassSelector ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
`);
    
    // Check for theme variables
    const lightVariables = new Set();
    const darkVariables = new Set();
    
    // Match all CSS variables in root
    const rootMatch = cssContent.match(/:root\s*{([^}]*)}/s);
    if (rootMatch) {
      const rootContent = rootMatch[1];
      const variableMatches = rootContent.match(/--theme-[a-zA-Z0-9-]+:/g);
      
      if (variableMatches) {
        variableMatches.forEach(variable => {
          const cleanVariable = variable.replace(':', '');
          lightVariables.add(cleanVariable);
        });
      }
    }
    
    // Match all CSS variables in dark theme
    const darkMatch = cssContent.match(/\[data-theme="dark"\]\s*{([^}]*)}/s);
    if (darkMatch) {
      const darkContent = darkMatch[1];
      const variableMatches = darkContent.match(/--theme-[a-zA-Z0-9-]+:/g);
      
      if (variableMatches) {
        variableMatches.forEach(variable => {
          const cleanVariable = variable.replace(':', '');
          darkVariables.add(cleanVariable);
        });
      }
    }
    
    // Find variables defined in light but missing in dark
    const missingInDark = [...lightVariables].filter(variable => !darkVariables.has(variable));
    
    // Find variables defined in dark but missing in light
    const missingInLight = [...darkVariables].filter(variable => !lightVariables.has(variable));
    
    console.log(`Theme variables analysis:
  - Total light mode theme variables: ${lightVariables.size}
  - Total dark mode theme variables: ${darkVariables.size}
  - Variables in light but missing in dark: ${missingInDark.length}
  - Variables in dark but missing in light: ${missingInLight.length}
`);
    
    if (missingInDark.length > 0) {
      console.log(`${colors.yellow}Variables missing in dark mode:${colors.reset}`);
      missingInDark.forEach(variable => {
        console.log(`  - ${variable}`);
      });
      console.log();
    }
    
    if (missingInLight.length > 0) {
      console.log(`${colors.yellow}Variables missing in light mode:${colors.reset}`);
      missingInLight.forEach(variable => {
        console.log(`  - ${variable}`);
      });
      console.log();
    }
    
  } catch (error) {
    console.error(`${colors.red}Error analyzing CSS: ${error.message}${colors.reset}`);
  }
}

// Check theme toggle implementations
function checkThemeToggleImplementation() {
  console.log(`${colors.bold}Analyzing theme toggle implementation...${colors.reset}\n`);
  
  try {
    // Check ThemeProvider implementation
    const themeProviderPath = path.join(SRC_DIR, 'components/ui/theme-provider.tsx');
    const themeTogglePath = path.join(SRC_DIR, 'components/ui/theme-toggle.tsx');
    const themeScriptPath = path.join(SRC_DIR, 'components/ui/ThemeScript.tsx');
    const externalTogglePath = path.join(ROOT_DIR, 'public/js/theme-toggle.js');
    
    if (fs.existsSync(themeProviderPath)) {
      const themeProviderContent = fs.readFileSync(themeProviderPath, 'utf8');
      
      // Check if it sets both class and data-theme
      const setsClass = themeProviderContent.includes('classList.add(');
      const setsDataTheme = themeProviderContent.includes('setAttribute(\'data-theme\'');
      
      console.log(`ThemeProvider.tsx:
  - Sets .dark class: ${setsClass ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - Sets data-theme attribute: ${setsDataTheme ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
`);
    }
    
    if (fs.existsSync(themeScriptPath)) {
      const themeScriptContent = fs.readFileSync(themeScriptPath, 'utf8');
      
      // Check if initial script sets both class and data-theme
      const setsClass = themeScriptContent.includes('classList.add(');
      const setsDataTheme = themeScriptContent.includes('setAttribute(\'data-theme\'');
      
      console.log(`ThemeScript.tsx:
  - Sets .dark class: ${setsClass ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - Sets data-theme attribute: ${setsDataTheme ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
`);
    }
    
    if (fs.existsSync(externalTogglePath)) {
      const externalToggleContent = fs.readFileSync(externalTogglePath, 'utf8');
      
      // Check if external toggle script sets both class and data-theme
      const setsClass = externalToggleContent.includes('classList.add(');
      const setsDataTheme = externalToggleContent.includes('setAttribute(\'data-theme\'');
      
      console.log(`External theme-toggle.js:
  - Sets .dark class: ${setsClass ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - Sets data-theme attribute: ${setsDataTheme ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
`);
    }
    
  } catch (error) {
    console.error(`${colors.red}Error analyzing theme toggles: ${error.message}${colors.reset}`);
  }
}

// Check tailwind.config.js
function checkTailwindConfig() {
  console.log(`${colors.bold}Analyzing Tailwind configuration...${colors.reset}\n`);
  
  try {
    const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
    
    if (fs.existsSync(tailwindConfigPath)) {
      const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf8');
      
      // Check dark mode configuration
      const hasDarkMode = tailwindConfigContent.includes('darkMode:');
      const darkModeClass = tailwindConfigContent.includes('darkMode: \'class\'');
      const darkModeMedia = tailwindConfigContent.includes('darkMode: \'media\'');
      
      console.log(`Tailwind Config (tailwind.config.js):
  - Has darkMode setting: ${hasDarkMode ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - Uses class strategy: ${darkModeClass ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}
  - Uses media strategy: ${darkModeMedia ? colors.yellow + 'Yes (This can conflict with manual theme toggle!)' + colors.reset : colors.green + 'No' + colors.reset}
`);
    } else {
      console.log(`${colors.yellow}tailwind.config.js not found${colors.reset}\n`);
    }
    
  } catch (error) {
    console.error(`${colors.red}Error analyzing Tailwind config: ${error.message}${colors.reset}`);
  }
}

// Run all checks
function runDeepThemeDebug() {
  checkCSSImplementation();
  checkThemeToggleImplementation();
  checkTailwindConfig();
  
  console.log(`\n${colors.bold}${colors.cyan}Debug complete! Check the results above to identify theme implementation issues.${colors.reset}`);
}

runDeepThemeDebug();