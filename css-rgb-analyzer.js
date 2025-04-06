/**
 * CSS RGB Variable Analyzer
 * 
 * This script specifically analyzes CSS RGB variables in the format --var-name-rgb: 255, 234, 219;
 * and ensures they have corresponding base color variables for fallback purposes.
 * It also offers conversion functions to add fallbacks to existing code.
 * 
 * Usage: node css-rgb-analyzer.js [path/to/css/file]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default path to globals.css if not specified
const cssFilePath = process.argv[2] || path.join(__dirname, 'src/app/globals.css');

// Read the CSS file
try {
  const css = fs.readFileSync(cssFilePath, 'utf8');
  
  // Find all RGB variables (format: --name-rgb: r, g, b;)
  const rgbVarRegex = /--([a-zA-Z0-9-]+)-rgb:\s*(\d+),\s*(\d+),\s*(\d+);/g;
  
  // Track variables for analysis
  const rgbVars = [];
  const baseVars = new Set();
  
  // Extract all RGB variables
  let match;
  while ((match = rgbVarRegex.exec(css)) !== null) {
    const [fullMatch, baseName, r, g, b] = match;
    const baseVarName = `--${baseName}`;
    rgbVars.push({
      name: `--${baseName}-rgb`,
      baseName: baseVarName,
      rgb: [parseInt(r), parseInt(g), parseInt(b)],
      line: css.substring(0, match.index).split('\n').length
    });
  }
  
  // Find all base color variables
  const baseVarRegex = /--([a-zA-Z0-9-]+):\s*[^;]+;/g;
  while ((match = baseVarRegex.exec(css)) !== null) {
    if (!match[0].includes('-rgb:')) {
      baseVars.add(`--${match[1]}`);
    }
  }
  
  // Check for RGB variable usage in the CSS
  const rgbUsagePatterns = [
    // Match rgba(var(--name-rgb), alpha)
    /rgba\(\s*var\(\s*--([\w-]+)-rgb\)\s*,\s*([\d.]+)\s*\)/g,
    
    // Match rgb(var(--name-rgb))
    /rgb\(\s*var\(\s*--([\w-]+)-rgb\)\s*\)/g,
    
    // Match Tailwind classes with RGB vars
    /\[rgba\(var\(--[\w-]+-rgb\),\s*[\d.]+\)\]/g,
  ];
  
  const rgbUsage = [];
  rgbUsagePatterns.forEach(pattern => {
    let usageMatch;
    while ((usageMatch = pattern.exec(css)) !== null) {
      rgbUsage.push({
        match: usageMatch[0],
        line: css.substring(0, usageMatch.index).split('\n').length,
        hasFallback: usageMatch[0].includes(',') && usageMatch[0].includes('--') && usageMatch[0].includes('-rgb')
      });
    }
  });
  
  // Check for missing base variables
  console.log('\n===== RGB VARIABLE ANALYSIS =====');
  console.log(`Found ${rgbVars.length} RGB variables in ${cssFilePath}`);
  
  const missingBase = rgbVars.filter(v => !baseVars.has(v.baseName));
  if (missingBase.length > 0) {
    console.log('\n⚠️ The following RGB variables are missing their base color variables:');
    missingBase.forEach(v => {
      console.log(`   Line ${v.line}: ${v.name} missing ${v.baseName}`);
      
      // Convert RGB to hexadecimal for a suggestion
      const hexColor = '#' + v.rgb.map(c => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      console.log(`   Suggested fix: ${v.baseName}: ${hexColor}; /* Add base color */`);
    });
  } else {
    console.log('\n✅ All RGB variables have corresponding base color variables.');
  }
  
  // Report on RGB usage without fallbacks
  console.log('\n===== RGB USAGE ANALYSIS =====');
  console.log(`Found ${rgbUsage.length} instances of RGB variable usage`);
  
  const usageWithoutFallback = rgbUsage.filter(u => !u.hasFallback);
  if (usageWithoutFallback.length > 0) {
    console.log('\n⚠️ The following RGB variable usages could benefit from fallbacks:');
    usageWithoutFallback.forEach(u => {
      console.log(`   Line ${u.line}: ${u.match}`);
    });
  } else {
    console.log('\n✅ All RGB usages have proper fallbacks.');
  }
  
  // Generate fallback conversion functions
  console.log('\n===== FALLBACK USAGE EXAMPLES =====');
  console.log('CSS usage with fallback:');
  console.log('```css');
  console.log('/* Using RGB variables with fallback */');
  console.log('.element {');
  console.log('  /* Original: background-color: rgba(var(--primary-orange-rgb), 0.5); */');
  console.log('  background-color: rgba(var(--primary-orange-rgb, 255, 159, 81), 0.5);');
  console.log('  /* Original: border-color: rgb(var(--accent-coral-rgb)); */');
  console.log('  border-color: rgb(var(--accent-coral-rgb, 239, 98, 82));');
  console.log('}');
  console.log('```');
  
  console.log('\nJS usage with fallback (for inline styles):');
  console.log('```js');
  console.log('// Helper function to get RGB values with fallback');
  console.log('const getRgbValues = (variableName, fallback) => {');
  console.log('  const rawValue = getComputedStyle(document.documentElement)');
  console.log('    .getPropertyValue(variableName).trim();');
  console.log('  return rawValue || fallback;');
  console.log('};');
  console.log('');
  console.log('// Usage example');
  console.log('<div style={{');
  console.log('  backgroundColor: `rgba(${getRgbValues("--primary-orange-rgb", "255, 159, 81")}, 0.5)`');
  console.log('}}></div>');
  console.log('```');
  
  // Generate converter script
  console.log('\n===== RGB VARIABLE FALLBACK MAP =====');
  console.log('```js');
  console.log('// Map of RGB variables to their fallback values');
  console.log('const rgbFallbacks = {');
  rgbVars.forEach(v => {
    console.log(`  "${v.name}": "${v.rgb.join(', ')}",`);
  });
  console.log('};');
  console.log('```');
  
  // Generate a converter function to add fallbacks
  console.log('\n===== CONVERTER FUNCTIONS =====');
  console.log('```js');
  console.log('/**');
  console.log(' * Convert RGB variable references to use fallbacks');
  console.log(' */');
  console.log('function addRgbFallbacks(css) {');
  console.log('  // Add fallbacks to rgba() functions');
  console.log('  let result = css.replace(/rgba\\(\\s*var\\(\\s*(--(.*?)-rgb)\\s*\\)\\s*,\\s*([\\d.]+)\\s*\\)/g, (match, varName, baseName, alpha) => {');
  console.log('    const fallback = rgbFallbacks[varName] || "0, 0, 0";');
  console.log('    return `rgba(var(${varName}, ${fallback}), ${alpha})`;');
  console.log('  });');
  console.log('');
  console.log('  // Add fallbacks to rgb() functions');
  console.log('  result = result.replace(/rgb\\(\\s*var\\(\\s*(--(.*?)-rgb)\\s*\\)\\s*\\)/g, (match, varName, baseName) => {');
  console.log('    const fallback = rgbFallbacks[varName] || "0, 0, 0";');
  console.log('    return `rgb(var(${varName}, ${fallback}))`;');
  console.log('  });');
  console.log('');
  console.log('  // Add fallbacks to Tailwind classes with RGB vars');
  console.log('  result = result.replace(/\\[rgba\\(var\\((--(.*?)-rgb)\\),\\s*([\\d.]+)\\)\\]/g, (match, varName, baseName, alpha) => {');
  console.log('    const fallback = rgbFallbacks[varName] || "0, 0, 0";');
  console.log('    return `[rgba(var(${varName}, ${fallback}), ${alpha})]`;');
  console.log('  });');
  console.log('');
  console.log('  return result;');
  console.log('}');
  console.log('```');
  
  // Generate a potential fix script
  console.log('\n===== FIX SCRIPT =====');
  console.log('To automatically add fallbacks to all RGB variable usages, create a file `fix-rgb-fallbacks.js` with this content:');
  console.log('```js');
  console.log('/**');
  console.log(' * Fix RGB Variable Fallbacks');
  console.log(' * ');
  console.log(' * This script adds fallback values to all RGB variable usages in CSS files.');
  console.log(' */');
  console.log('');
  console.log('const fs = require("fs");');
  console.log('const path = require("path");');
  console.log('const glob = require("glob");');
  console.log('');
  console.log('// RGB variable fallbacks');
  console.log('const rgbFallbacks = {');
  rgbVars.forEach(v => {
    console.log(`  "${v.name}": "${v.rgb.join(', ')}",`);
  });
  console.log('};');
  console.log('');
  console.log('// Conversion function');
  console.log('function addRgbFallbacks(css) {');
  console.log('  // Add fallbacks to rgba() functions');
  console.log('  let result = css.replace(/rgba\\(\\s*var\\(\\s*(--(.*?)-rgb)\\s*\\)\\s*,\\s*([\\d.]+)\\s*\\)/g, (match, varName, baseName, alpha) => {');
  console.log('    const fallback = rgbFallbacks[varName] || "0, 0, 0";');
  console.log('    return `rgba(var(${varName}, ${fallback}), ${alpha})`;');
  console.log('  });');
  console.log('');
  console.log('  // Add fallbacks to rgb() functions');
  console.log('  result = result.replace(/rgb\\(\\s*var\\(\\s*(--(.*?)-rgb)\\s*\\)\\s*\\)/g, (match, varName, baseName) => {');
  console.log('    const fallback = rgbFallbacks[varName] || "0, 0, 0";');
  console.log('    return `rgb(var(${varName}, ${fallback}))`;');
  console.log('  });');
  console.log('');
  console.log('  // Add fallbacks to Tailwind classes with RGB vars');
  console.log('  result = result.replace(/\\[rgba\\(var\\((--(.*?)-rgb)\\),\\s*([\\d.]+)\\)\\]/g, (match, varName, baseName, alpha) => {');
  console.log('    const fallback = rgbFallbacks[varName] || "0, 0, 0";');
  console.log('    return `[rgba(var(${varName}, ${fallback}), ${alpha})]`;');
  console.log('  });');
  console.log('');
  console.log('  return result;');
  console.log('}');
  console.log('');
  console.log('// Process all CSS files');
  console.log('function processCssFiles() {');
  console.log('  const files = glob.sync("./src/**/*.{css,scss}");');
  console.log('  let totalChanges = 0;');
  console.log('');
  console.log('  files.forEach(file => {');
  console.log('    const css = fs.readFileSync(file, "utf8");');
  console.log('    const updatedCss = addRgbFallbacks(css);');
  console.log('    ');
  console.log('    if (css !== updatedCss) {');
  console.log('      fs.writeFileSync(file, updatedCss);');
  console.log('      const changes = (updatedCss.match(/var\\([^)]+, \\d+, \\d+, \\d+\\)/g) || []).length;');
  console.log('      totalChanges += changes;');
  console.log('      console.log(`Updated ${file} - Added ${changes} fallbacks`);');
  console.log('    }');
  console.log('  });');
  console.log('');
  console.log('  console.log(`Added fallbacks to ${totalChanges} RGB variable usages across ${files.length} files`);');
  console.log('}');
  console.log('');
  console.log('processCssFiles();');
  console.log('```');
  console.log('');
  console.log('Then run it with: `node fix-rgb-fallbacks.js`');
  
  // Conclusion
  console.log('\n===== CONCLUSION =====');
  if (missingBase.length > 0 || usageWithoutFallback.length > 0) {
    console.log('⚠️ Some issues were found with RGB variables in your CSS.');
    console.log('Consider addressing these issues to improve compatibility and reduce potential bugs.');
  } else {
    console.log('✅ Your RGB variables are properly defined and used with fallbacks!');
  }
  
  console.log('\nThe RGB notation like `--bg-cream-rgb: 255, 234, 219;` is valid and common.');
  console.log('This pattern allows you to use alpha values with CSS variables:');
  console.log('1. Define the RGB components: --color-rgb: 255, 234, 219;');
  console.log('2. Use with alpha: rgba(var(--color-rgb), 0.5)');
  console.log('\nHowever, adding fallbacks improves browser compatibility and makes your CSS more robust.');
  
} catch (error) {
  console.error(`Error reading CSS file: ${error.message}`);
  process.exit(1);
}