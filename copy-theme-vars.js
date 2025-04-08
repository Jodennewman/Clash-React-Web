#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const CSS_FILE = path.join(ROOT_DIR, 'src/app/globals.css');

console.log('Copying missing theme variables from dark mode to root section...');

try {
  const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
  
  // Extract all theme variables from dark mode section
  const darkThemeRegex = /\[data-theme="dark"\][^{]*{([^}]*)}/s;
  const darkThemeMatch = cssContent.match(darkThemeRegex);
  
  if (!darkThemeMatch) {
    console.error('Could not find dark theme section');
    process.exit(1);
  }
  
  const darkThemeContent = darkThemeMatch[1];
  
  // Extract all theme variable definitions
  const themeVariableRegex = /--theme-[a-zA-Z0-9-]+:\s*[^;]+;/g;
  const darkThemeVariables = darkThemeContent.match(themeVariableRegex) || [];
  
  console.log(`Found ${darkThemeVariables.length} theme variables in dark mode section`);
  
  // Extract existing theme variables from root section
  const rootRegex = /:root\s*{([^}]*)}/s;
  const rootMatch = cssContent.match(rootRegex);
  
  if (!rootMatch) {
    console.error('Could not find root section');
    process.exit(1);
  }
  
  const rootContent = rootMatch[1];
  const existingThemeVars = rootContent.match(themeVariableRegex) || [];
  const existingThemeVarNames = existingThemeVars.map(v => v.split(':')[0].trim());
  
  console.log(`Found ${existingThemeVars.length} existing theme variables in root section`);
  
  // Find missing variables in root section
  const missingVariables = darkThemeVariables.filter(varDef => {
    const varName = varDef.split(':')[0].trim();
    return !existingThemeVarNames.includes(varName);
  });
  
  console.log(`Found ${missingVariables.length} variables missing in root section`);
  
  if (missingVariables.length > 0) {
    // Create light mode equivalents of the dark mode variables
    const lightModeVariables = missingVariables.map(varDef => {
      const [varName, varValue] = varDef.split(':').map(part => part.trim());
      const varValueClean = varValue.replace(';', '');
      
      // For colors, map dark mode colors to light mode equivalents
      let lightValue = varValueClean;
      
      // Check if it's a color value and make a light mode equivalent
      if (varValueClean.includes('white')) {
        lightValue = lightValue.replace('white', 'var(--text-navy)');
      } else if (varValueClean.includes('rgba(255, 255, 255,')) {
        // Replace white rgba with text-navy rgba
        lightValue = lightValue.replace(/rgba\(255,\s*255,\s*255,\s*([0-9.]+)\)/g, 'rgba(18, 46, 59, $1)');
      } else if (varValueClean.includes('--bg-navy')) {
        // Replace navy references with cream references
        lightValue = lightValue.replace('--bg-navy', '--bg-cream')
                            .replace('--bg-navy-darker', '--bg-cream-darker');
      } else if (varValueClean.includes('var(--primary-orange)')) {
        // Keep primary colors the same
        lightValue = varValueClean;
      }
      
      return `${varName}: ${lightValue};`;
    });
    
    // Insert the missing variables into the root section
    const updatedRootContent = rootContent + '\n\n  /* Additional theme variables */\n  ' + 
      lightModeVariables.join('\n  ');
    
    const updatedCssContent = cssContent.replace(rootRegex, `:root {\n${updatedRootContent}\n}`);
    
    fs.writeFileSync(CSS_FILE, updatedCssContent, 'utf8');
    console.log('Successfully copied missing theme variables to root section!');
  } else {
    console.log('All theme variables already exist in root section, no changes needed.');
  }
} catch (error) {
  console.error('Error copying theme variables:', error);
}