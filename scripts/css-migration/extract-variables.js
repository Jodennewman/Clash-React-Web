/**
 * Extract CSS Variables from globals.css to modular CSS Structure
 * 
 * This script helps migrate CSS variables from the original globals.css
 * to the new modular CSS structure by:
 * 1. Scanning globals.css for CSS variables
 * 2. Comparing with existing variables in variables.css
 * 3. Identifying missing variables
 * 4. Providing options to add them to the modular system
 */

const fs = require('fs');
const path = require('path');

// Configuration
const GLOBALS_CSS_PATH = path.join(__dirname, '..', '..', 'src', 'app', 'globals.css');
const VARIABLES_CSS_PATH = path.join(__dirname, '..', '..', 'src', 'styles', 'modules', 'variables.css');
const DARK_MODE_CSS_PATH = path.join(__dirname, '..', '..', 'src', 'styles', 'modules', 'dark-mode.css');

// Helper function to extract CSS variables from a file
function extractCssVariables(cssContent) {
  const variables = {};
  // Match all CSS variable declarations
  const matches = cssContent.match(/--[\w-]+:\s*[^;]+;/g) || [];
  
  matches.forEach(match => {
    const [variable, value] = match.split(':').map(part => part.trim());
    // Remove trailing semicolon from value
    const cleanValue = value.endsWith(';') ? value.slice(0, -1) : value;
    variables[variable] = cleanValue;
  });
  
  return variables;
}

// Helper function to identify variables in dark mode
function extractDarkModeVariables(cssContent) {
  const darkModeVariables = {};
  
  // Match dark mode blocks (both .dark and [data-theme="dark"])
  const darkModeBlocks = cssContent.match(/\.dark\s*{[^}]+}|data-theme=["']dark["']\s*{[^}]+}/g) || [];
  
  darkModeBlocks.forEach(block => {
    const matches = block.match(/--[\w-]+:\s*[^;]+;/g) || [];
    
    matches.forEach(match => {
      const [variable, value] = match.split(':').map(part => part.trim());
      // Remove trailing semicolon from value
      const cleanValue = value.endsWith(';') ? value.slice(0, -1) : value;
      darkModeVariables[variable] = cleanValue;
    });
  });
  
  return darkModeVariables;
}

// Main function
async function main() {
  console.log('Scanning for CSS variables...');
  
  // Read the files
  const globalsCss = fs.readFileSync(GLOBALS_CSS_PATH, 'utf8');
  const variablesCss = fs.readFileSync(VARIABLES_CSS_PATH, 'utf8');
  const darkModeCss = fs.readFileSync(DARK_MODE_CSS_PATH, 'utf8');
  
  // Extract variables
  const globalsVariables = extractCssVariables(globalsCss);
  const moduleVariables = extractCssVariables(variablesCss);
  const darkModeVariables = extractDarkModeVariables(globalsCss);
  const existingDarkModeVariables = extractCssVariables(darkModeCss);
  
  // Find missing variables in light mode
  const missingVariables = {};
  for (const [variable, value] of Object.entries(globalsVariables)) {
    if (!moduleVariables[variable]) {
      missingVariables[variable] = value;
    }
  }
  
  // Find missing variables in dark mode
  const missingDarkModeVariables = {};
  for (const [variable, value] of Object.entries(darkModeVariables)) {
    if (!existingDarkModeVariables[variable]) {
      missingDarkModeVariables[variable] = value;
    }
  }
  
  // Generate report
  console.log('\n📊 CSS Variables Migration Report:');
  console.log('============================================');
  console.log(`Total variables in globals.css: ${Object.keys(globalsVariables).length}`);
  console.log(`Total variables in variables.css: ${Object.keys(moduleVariables).length}`);
  console.log(`Missing variables (not in modular system): ${Object.keys(missingVariables).length}`);
  console.log(`Missing dark mode variables: ${Object.keys(missingDarkModeVariables).length}`);
  
  // Log missing variables
  if (Object.keys(missingVariables).length > 0) {
    console.log('\n📝 Missing variables to add to variables.css:');
    console.log('--------------------------------------------');
    
    // Generate code to add to variables.css
    let variablesToAdd = '/* Added variables from globals.css */\n';
    for (const [variable, value] of Object.entries(missingVariables)) {
      variablesToAdd += `  ${variable}: ${value};\n`;
    }
    
    console.log(variablesToAdd);
    
    // Option to save this automatically
    console.log('\nTo add these variables to your variables.css file, copy the above code');
    console.log('into the :root section of src/styles/modules/variables.css');
  }
  
  // Log missing dark mode variables
  if (Object.keys(missingDarkModeVariables).length > 0) {
    console.log('\n🌙 Missing dark mode variables to add to dark-mode.css:');
    console.log('-----------------------------------------------------');
    
    // Generate code to add to dark-mode.css
    let darkModeVariablesToAdd = '/* Added dark mode variables from globals.css */\n';
    for (const [variable, value] of Object.entries(missingDarkModeVariables)) {
      darkModeVariablesToAdd += `  ${variable}: ${value};\n`;
    }
    
    console.log(darkModeVariablesToAdd);
    
    // Option to save this automatically
    console.log('\nTo add these variables to your dark-mode.css file, copy the above code');
    console.log('into the .dark, [data-theme="dark"] section of src/styles/modules/dark-mode.css');
  }
  
  console.log('\n✅ Variable extraction complete!');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
});