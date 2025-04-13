const fs = require('fs');
const path = require('path');

console.log('Starting CSS cleanup...');

// Read the CSS file
const cssPath = path.join(__dirname, '../src/app/globals.css');
let css;
try {
  css = fs.readFileSync(cssPath, 'utf8');
  console.log(`Read ${css.length} bytes from globals.css`);
} catch (error) {
  console.error(`Error reading CSS file: ${error.message}`);
  process.exit(1);
}

// First pass: Extract all sections
const sections = {
  variables: [],
  darkMode: [],
  baseElements: [],
  themeClasses: [],
  components: [],
  animations: [],
  utilities: []
};

// Extract root variables - capture both the selector and the full content including variables
const rootRegex = /(:root\s*\{)([^}]+)(\})/g;
let match;
while ((match = rootRegex.exec(css)) !== null) {
  // Extract the full declaration
  const fullDeclaration = match[0];
  sections.variables.push(fullDeclaration);
}

// Extract dark mode overrides
const darkModeRegex = /\.dark,\s*\[data-theme="dark"\]\s*\{([^}]+)\}/g;
while ((match = darkModeRegex.exec(css)) !== null) {
  sections.darkMode.push(match[0]);
}

// Extract animations
const animationRegex = /@keyframes\s+[^{]+\{[^}]+\}/g;
while ((match = animationRegex.exec(css)) !== null) {
  sections.animations.push(match[0]);
}

// Extract base HTML elements
const baseElementsRegex = /^(html|body|h1|h2|h3|h4|h5|h6|p|a|button|input|textarea|select|form)\s*\{[^}]+\}/gm;
while ((match = baseElementsRegex.exec(css)) !== null) {
  sections.baseElements.push(match[0]);
}

// Extract theme-aware classes - these have the highest priority
const themeClassPatterns = [
  /\.(text-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(bg-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(border-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(shadow-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(rounded-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(transition-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(glow-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(btn-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(grid-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(float-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(chart-theme-[^{]+)\s*\{([^}]+)\}/g,
  /\.(eyeball-theme-[^{]+)\s*\{([^}]+)\}/g
];

themeClassPatterns.forEach(pattern => {
  while ((match = pattern.exec(css)) !== null) {
    sections.themeClasses.push(match[0]);
  }
});

// Extract remaining components and patterns
const componentPatterns = [
  /\.(card|btn|nav|module|gradient-text|hover-bubbly|vs-[^{]+)\s*\{([^}]+)\}/g,
  /\.(vs-[^{]+)\s*\{([^}]+)\}/g,
  /\.(animate-[^{]+)\s*\{([^}]+)\}/g
];

componentPatterns.forEach(pattern => {
  while ((match = pattern.exec(css)) !== null) {
    sections.components.push(match[0]);
  }
});

// Everything else goes into utilities
const utilityRegex = /\.[a-zA-Z][a-zA-Z0-9_-]+\s*\{[^}]+\}/g;
while ((match = utilityRegex.exec(css)) !== null) {
  // Skip if already added to another section
  const declaration = match[0];
  const isAlreadyIncluded = Object.values(sections).some(sectionItems => 
    sectionItems.some(item => item === declaration)
  );
  
  if (!isAlreadyIncluded) {
    sections.utilities.push(declaration);
  }
}

// De-duplicate each section
console.log('Original section counts:');
Object.entries(sections).forEach(([section, items]) => {
  console.log(`- ${section}: ${items.length} items`);
});

// Create a hash function to identify duplicates properly
function hashCSSDeclaration(declaration) {
  // Normalize whitespace, remove comments
  return declaration
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ')             // Normalize whitespace
    .replace(/;\s+/g, ';')            // Remove whitespace after semicolons
    .replace(/:\s+/g, ':')            // Remove whitespace after colons
    .replace(/\s*{\s*/g, '{')         // Remove whitespace around braces
    .replace(/\s*}\s*/g, '}')         // Remove whitespace around braces
    .trim();
}

Object.keys(sections).forEach(section => {
  const uniqueEntries = new Map();
  sections[section].forEach(entry => {
    // Create a normalized version for comparison
    const key = hashCSSDeclaration(entry);
    
    // For theme classes, extract the actual class name to use as key
    if (section === 'themeClasses') {
      const classNameMatch = entry.match(/\.([a-zA-Z][a-zA-Z0-9_-]+)/);
      if (classNameMatch) {
        const className = classNameMatch[1];
        uniqueEntries.set(className, entry);
      } else {
        uniqueEntries.set(key, entry);
      }
    } else {
      uniqueEntries.set(key, entry);
    }
  });
  
  sections[section] = Array.from(uniqueEntries.values());
});

console.log('\nAfter de-duplication:');
Object.entries(sections).forEach(([section, items]) => {
  console.log(`- ${section}: ${items.length} items`);
});

// Remove unnecessary !important flags for theme variables
if (sections.variables.length > 0) {
  sections.variables = sections.variables.map(varSection => {
    return varSection.replace(/(!important)/g, '');
  });
  console.log('Removed unnecessary !important flags from theme variables');
}

// Generate new CSS file structure
const newCss = `/* 
 * THEME-AWARE STYLING SYSTEM - REFACTORED
 * Auto-generated on ${new Date().toISOString()}
 */

/* ==========================================
   VARIABLES
   ========================================== */
${sections.variables.join('\n\n')}

/* ==========================================
   DARK MODE OVERRIDES
   ========================================== */
${sections.darkMode.join('\n\n')}

/* ==========================================
   BASE HTML ELEMENTS
   ========================================== */
${sections.baseElements.join('\n\n')}

/* ==========================================
   ANIMATIONS
   ========================================== */
${sections.animations.join('\n\n')}

/* ==========================================
   THEME-AWARE UTILITY CLASSES
   ========================================== */
${sections.themeClasses.join('\n\n')}

/* ==========================================
   COMPONENT STYLES
   ========================================== */
${sections.components.join('\n\n')}

/* ==========================================
   UTILITY CLASSES
   ========================================== */
${sections.utilities.join('\n\n')}
`;

// Calculate size reduction
const originalSize = css.length;
const newSize = newCss.length;
const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

console.log(`\nSize reduction: ${originalSize} -> ${newSize} bytes (${reduction}% smaller)`);

// Save backup and new file
const backupPath = path.join(__dirname, '../src/app/globals.css.backup');
const newPath = path.join(__dirname, '../src/app/globals.css.new');

fs.writeFileSync(backupPath, css);
console.log(`Original CSS backed up to ${backupPath}`);

fs.writeFileSync(newPath, newCss);
console.log(`New CSS written to ${newPath}`);

console.log('\nInitial CSS cleanup complete. Review globals.css.new before replacing the original.');