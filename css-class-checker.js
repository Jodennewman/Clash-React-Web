/**
 * CSS Class Checker Utility
 * 
 * This script scans component files for CSS classes and checks if they exist in globals.css.
 * It helps identify theme-aware classes that might be missing from the CSS implementation.
 * 
 * Usage: node css-class-checker.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, 'src/components');
const GLOBALS_CSS_PATH = path.join(__dirname, 'src/app/globals.css');
const THEME_AWARE_CLASS_PATTERN = /\b(text-theme-|bg-theme-|shadow-theme-|border-theme-)\w+/g;

// Read globals.css to extract defined theme-aware classes
function extractDefinedClasses() {
  const cssContent = fs.readFileSync(GLOBALS_CSS_PATH, 'utf8');
  const classDefinitions = cssContent.match(/\.(text-theme-\w+|bg-theme-\w+|shadow-theme-\w+|border-theme-\w+)\s*{/g) || [];
  
  return classDefinitions.map(def => {
    // Extract just the class name from the definition
    // Example: ".text-theme-primary {" -> "text-theme-primary"
    return def.replace(/^\.\s*/, '').replace(/\s*{$/, '');
  });
}

// Find all tsx files in the components directory recursively
function findComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findComponentFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') && !file.endsWith('.test.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Extract theme-aware class names from a file
function extractThemeAwareClasses(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(THEME_AWARE_CLASS_PATTERN) || [];
  
  // Remove duplicates by using Set
  return [...new Set(matches)];
}

// Main execution
function main() {
  console.log('🔍 CSS Class Checker - Checking theme-aware classes');
  console.log('==================================================');
  
  // Extract defined classes from globals.css
  const definedClasses = extractDefinedClasses();
  console.log(`📋 Found ${definedClasses.length} theme-aware classes defined in globals.css`);
  
  // Find all component files
  const componentFiles = findComponentFiles(COMPONENTS_DIR);
  console.log(`📂 Found ${componentFiles.length} component files to check`);
  
  let allUsedClasses = [];
  let missingClasses = [];
  
  // Process each component file
  componentFiles.forEach(filePath => {
    const relPath = path.relative(__dirname, filePath);
    const themeClasses = extractThemeAwareClasses(filePath);
    
    if (themeClasses.length > 0) {
      console.log(`\n📄 ${relPath} uses ${themeClasses.length} theme-aware classes`);
      
      // Check if each class is defined
      themeClasses.forEach(className => {
        if (!definedClasses.includes(className)) {
          console.log(`   ❌ Missing: ${className}`);
          missingClasses.push({ file: relPath, class: className });
        } else {
          console.log(`   ✅ Found: ${className}`);
        }
        
        // Add to all used classes
        allUsedClasses.push(className);
      });
    }
  });
  
  // Remove duplicates from all used classes
  allUsedClasses = [...new Set(allUsedClasses)];
  
  // Find unused defined classes
  const unusedClasses = definedClasses.filter(cls => !allUsedClasses.includes(cls));
  
  // Summary
  console.log('\n📊 Summary');
  console.log('==================================================');
  console.log(`Total defined theme-aware classes: ${definedClasses.length}`);
  console.log(`Total used theme-aware classes: ${allUsedClasses.length}`);
  console.log(`Missing classes (used but not defined): ${missingClasses.length}`);
  console.log(`Unused classes (defined but not used): ${unusedClasses.length}`);
  
  // Output missing classes
  if (missingClasses.length > 0) {
    console.log('\n❌ Missing Classes (add these to globals.css)');
    console.log('==================================================');
    
    const groupedByClass = {};
    missingClasses.forEach(item => {
      if (!groupedByClass[item.class]) {
        groupedByClass[item.class] = [];
      }
      groupedByClass[item.class].push(item.file);
    });
    
    Object.keys(groupedByClass).sort().forEach(className => {
      console.log(`${className}:`);
      groupedByClass[className].forEach(file => {
        console.log(`  - ${file}`);
      });
    });
    
    // Provide CSS snippets for easy addition
    console.log('\n📝 CSS Snippets to Add:');
    Object.keys(groupedByClass).sort().forEach(className => {
      console.log(`
.${className} {
  /* Add appropriate CSS properties */
}
      `);
    });
  }
  
  // Output unused classes
  if (unusedClasses.length > 0) {
    console.log('\n⚠️ Unused Classes (consider removing or using these)');
    console.log('==================================================');
    unusedClasses.sort().forEach(className => {
      console.log(`- ${className}`);
    });
  }
  
  // Suggest complete theme class pattern to check
  console.log('\n💡 Recommendation');
  console.log('==================================================');
  console.log('Ensure your theme-aware class naming is consistent:');
  console.log('- Text colors: text-theme-primary, text-theme-secondary, etc.');
  console.log('- Backgrounds: bg-theme-primary, bg-theme-secondary, etc.');
  console.log('- Shadows: shadow-theme-sm, shadow-theme-md, shadow-theme-lg');
  console.log('- Borders: border-theme-light, border-theme-primary, etc.');
  console.log('- Gradients: bg-theme-gradient, bg-theme-gradient-primary, etc.');
}

// Run the main function
main();