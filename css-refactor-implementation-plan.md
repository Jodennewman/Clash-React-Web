# Implementation Plan: Class-Based Theme System Refactoring

## Phase 1: Analysis & Preparation (1-2 Days)

### 1.1 Create a CSS Analysis Script
```javascript
// analyze-css.js
const fs = require('fs');
const css = fs.readFileSync('./src/app/globals.css', 'utf8');

// Extract and catalog all theme variable definitions
const themeVars = {};
const varPattern = /--theme-[a-zA-Z0-9-]+\s*:\s*[^;]+;/g;
let match;
while ((match = varPattern.exec(css)) !== null) {
  const [fullDeclaration] = match;
  const [name, value] = fullDeclaration.split(':').map(s => s.trim());
  const cleanValue = value.replace(';', '').trim();
  
  if (!themeVars[name]) themeVars[name] = [];
  themeVars[name].push(cleanValue);
}

// Extract and catalog all theme-aware class definitions
const themeClasses = {};
const classPattern = /\.([\w-]+)\s*\{([^}]+)\}/g;
while ((match = classPattern.exec(css)) !== null) {
  const [_, className, declaration] = match;
  if (className.includes('theme-')) {
    if (!themeClasses[className]) themeClasses[className] = [];
    themeClasses[className].push(declaration.trim());
  }
}

// Find duplicates
Object.entries(themeClasses).forEach(([className, declarations]) => {
  if (declarations.length > 1) {
    console.log(`Duplicate class: ${className} (${declarations.length} occurrences)`);
  }
});

// Output detailed report
fs.writeFileSync('./theme-analysis.json', JSON.stringify({
  themeVars,
  themeClasses
}, null, 2));

console.log(`Analysis complete. Found ${Object.keys(themeVars).length} theme variables and ${Object.keys(themeClasses).length} theme-aware classes.`);
```

### 1.2 Create a CSS Usage Analysis Script
```javascript
// analyze-usage.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Load theme classes from analysis
const { themeClasses } = require('./theme-analysis.json');

// Find all component files
const componentFiles = glob.sync('./src/**/*.{jsx,tsx}');

// Track class usage
const usageCount = {};
Object.keys(themeClasses).forEach(cls => { usageCount[cls] = 0; });

// Analyze each file
componentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  Object.keys(themeClasses).forEach(className => {
    // Account for className= patterns and string inclusion
    const regex = new RegExp(`${className}[\\s"}']`, 'g');
    const matches = content.match(regex) || [];
    usageCount[className] += matches.length;
  });
});

// Sort by usage
const sortedUsage = Object.entries(usageCount)
  .sort((a, b) => b[1] - a[1])
  .filter(([_, count]) => count > 0);

fs.writeFileSync('./theme-usage.json', JSON.stringify(sortedUsage, null, 2));
console.log(`Usage analysis complete. Found ${sortedUsage.length} theme classes in use.`);
```

### 1.3 Visual Regression Test Setup
```javascript
// setup-visual-tests.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Create screenshots of key pages in both light and dark modes
async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const pages = [
    '/', '/courses', '/about', '/pricing'
  ];
  
  const modes = ['light', 'dark'];
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ];
  
  const screenshotsDir = path.join(__dirname, 'visual-regression', 'before');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  for (const pageUrl of pages) {
    for (const mode of modes) {
      for (const viewport of viewports) {
        await page.setViewport(viewport);
        await page.goto(`http://localhost:5173${pageUrl}`);
        
        // Set theme mode
        if (mode === 'dark') {
          await page.evaluate(() => {
            document.documentElement.classList.add('dark');
          });
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove('dark');
          });
        }
        
        // Wait for any animations/transitions
        await page.waitForTimeout(1000);
        
        const filename = `${pageUrl.replace(/\//g, '-') || 'home'}-${mode}-${viewport.name}.png`;
        await page.screenshot({
          path: path.join(screenshotsDir, filename),
          fullPage: true
        });
        
        console.log(`Captured: ${filename}`);
      }
    }
  }
  
  await browser.close();
  console.log('Visual regression baseline created.');
}

captureScreenshots();
```

## Phase 2: CSS Restructuring (2-3 Days)

### 2.1 Create a CSS Cleanup Script
```javascript
// cleanup-css.js
const fs = require('fs');
const css = fs.readFileSync('./src/app/globals.css', 'utf8');

// First pass: Extract all sections
const sections = {
  variables: [],
  darkMode: [],
  themeClasses: [],
  components: [],
  animations: [],
  utilities: []
};

// Extract root variables
const rootRegex = /:root\s*\{([^}]+)\}/g;
let match;
while ((match = rootRegex.exec(css)) !== null) {
  sections.variables.push(match[0]);
}

// Extract dark mode overrides
const darkModeRegex = /\.dark,\s*\[data-theme="dark"\]\s*\{([^}]+)\}/g;
while ((match = darkModeRegex.exec(css)) !== null) {
  sections.darkMode.push(match[0]);
}

// Extract theme-aware classes
const themeClassRegex = /\.(text-theme-|bg-theme-|border-theme-|shadow-theme-)[^{]+\{[^}]+\}/g;
while ((match = themeClassRegex.exec(css)) !== null) {
  sections.themeClasses.push(match[0]);
}

// Extract animations
const animationRegex = /@keyframes\s+[^{]+\{[^}]+\}/g;
while ((match = animationRegex.exec(css)) !== null) {
  sections.animations.push(match[0]);
}

// De-duplicate each section
Object.keys(sections).forEach(section => {
  const uniqueEntries = new Set();
  sections[section] = sections[section].filter(entry => {
    // Create a normalized version for comparison
    const normalized = entry.replace(/\s+/g, ' ').trim();
    if (uniqueEntries.has(normalized)) return false;
    uniqueEntries.add(normalized);
    return true;
  });
});

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
   GENERAL UTILITIES
   ========================================== */
${sections.utilities.join('\n\n')}
`;

// Save backup and new file
fs.writeFileSync('./src/app/globals.css.backup', css);
fs.writeFileSync('./src/app/globals.css.new', newCss);

console.log('Initial CSS cleanup complete. Review globals.css.new before replacing the original.');
```

### 2.2 Create a Theme Class Generator
```javascript
// generate-theme-classes.js
const fs = require('fs');
const { themeVars } = require('./theme-analysis.json');

// Define the format for theme utility classes
const utilities = [
  // Text colors
  { 
    prefix: 'text-theme',
    properties: ['color'],
    variants: ['primary', 'secondary', 'tertiary', 'subtle', 'accent', 'on-primary']
  },
  // Background colors
  {
    prefix: 'bg-theme',
    properties: ['background-color'],
    variants: ['primary', 'secondary', 'surface', 'card', 'accent']
  },
  // Border colors
  {
    prefix: 'border-theme',
    properties: ['border-color'],
    variants: ['primary', 'light', 'medium']
  },
  // Shadows
  {
    prefix: 'shadow-theme',
    properties: ['box-shadow'],
    variants: ['sm', 'md', 'lg', 'btn']
  },
  // Gradients
  {
    prefix: 'bg-theme-gradient',
    properties: ['background'],
    variants: ['', '-primary', '-secondary', '-accent']
  }
];

// Generate the theme utility classes
let classDefinitions = [];

utilities.forEach(utility => {
  utility.variants.forEach(variant => {
    const className = variant ? `${utility.prefix}-${variant}` : utility.prefix;
    const varNames = utility.properties.map(prop => {
      // Map property to likely variable name
      const baseName = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
      return `--theme-${baseName}${variant ? `-${variant}` : ''}`;
    });
    
    const declarations = utility.properties.map((prop, i) => {
      return `  ${prop}: var(${varNames[i]});`;
    }).join('\n');
    
    classDefinitions.push(`.${className} {\n${declarations}\n}`);
  });
});

fs.writeFileSync('./generated-theme-classes.css', classDefinitions.join('\n\n'));
console.log(`Generated ${classDefinitions.length} theme utility classes.`);
```

### 2.3 Create Gradient Standardization Script
```javascript
// standardize-gradients.js
const fs = require('fs');
const css = fs.readFileSync('./src/app/globals.css', 'utf8');

// Convert non-standard gradient syntax
let updatedCss = css
  // Fix oklch gradients
  .replace(/linear-gradient\(in\s+oklch\s+([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 
           'linear-gradient($1, $2, $3)')
  
  // Fix text gradients missing properties
  .replace(/\.([a-zA-Z0-9-]+)\s*\{\s*background:\s*linear-gradient\([^;]+;\s*\}/g, 
           '.$1 {\n  background: linear-gradient($2);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}');

// Find all gradient declarations and ensure they're complete
const gradientRegex = /\.([a-zA-Z0-9-]+gradient[a-zA-Z0-9-]*)\s*\{([^}]+)\}/g;
let match;
while ((match = gradientRegex.exec(css)) !== null) {
  const [full, className, declaration] = match;
  
  // If it's a text gradient, ensure it has all necessary properties
  if (className.includes('text-gradient') || className.includes('gradient-text')) {
    if (!declaration.includes('background-clip') || !declaration.includes('-webkit-background-clip')) {
      const fixed = declaration.trim() + `
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;`;
      
      updatedCss = updatedCss.replace(full, `.${className} {${fixed}}`);
    }
  }
}

fs.writeFileSync('./src/app/globals.css.gradient-fix', updatedCss);
console.log('Gradient standardization complete.');
```

## Phase 3: Modular Structure Implementation (2 Days)

### 3.1 Create Modular CSS Script
```javascript
// create-modular-css.js
const fs = require('fs');
const css = fs.readFileSync('./src/app/globals.css.new', 'utf8');

// Define the modules
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
    pattern: /\/\* =+\s*GENERAL UTILITIES\s*=+ \*\/[\s\S]+?(?=\/\* =+|$)/
  }
];

// Create the CSS modules directory
const modulesDir = './src/styles/modules';
if (!fs.existsSync(modulesDir)) {
  fs.mkdirSync(modulesDir, { recursive: true });
}

// Extract and save each module
modules.forEach(module => {
  const match = css.match(module.pattern);
  if (match) {
    const content = match[0];
    fs.writeFileSync(`${modulesDir}/${module.name}.css`, content);
    console.log(`Created module: ${module.name}.css`);
  }
});

// Create the main CSS file that imports all modules
const importStatements = modules.map(module => 
  `@import "./modules/${module.name}.css";`
).join('\n');

const mainCss = `/* 
 * THEME-AWARE STYLING SYSTEM - MODULAR VERSION
 * Auto-generated on ${new Date().toISOString()}
 */

${importStatements}
`;

fs.writeFileSync('./src/styles/index.css', mainCss);
console.log('Created modular CSS structure.');
```

### 3.2 Create App Entry Point Update Script
```javascript
// update-app-entry.js
const fs = require('fs');
const path = require('path');

// Find main entry files
const entryFiles = [
  './src/main.tsx',
  './src/main.jsx',
  './src/index.tsx',
  './src/index.jsx'
];

let entryFile;
for (const file of entryFiles) {
  if (fs.existsSync(file)) {
    entryFile = file;
    break;
  }
}

if (!entryFile) {
  console.error('Could not find entry file');
  process.exit(1);
}

// Read the file
let content = fs.readFileSync(entryFile, 'utf8');

// Update the import
content = content.replace(
  /import ['"]\.\/app\/globals\.css['"]/,
  'import "./styles/index.css"'
);

// If no import found, add it
if (!content.includes('./styles/index.css')) {
  // Find first import statement
  const firstImport = content.indexOf('import');
  if (firstImport !== -1) {
    // Insert after the first import block
    const importEnd = content.indexOf('\n\n', firstImport);
    if (importEnd !== -1) {
      content = content.substring(0, importEnd) + 
                '\nimport "./styles/index.css"' + 
                content.substring(importEnd);
    } else {
      content = 'import "./styles/index.css";\n' + content;
    }
  } else {
    content = 'import "./styles/index.css";\n' + content;
  }
}

// Save backup
fs.writeFileSync(`${entryFile}.backup`, fs.readFileSync(entryFile));

// Write the updated file
fs.writeFileSync(entryFile, content);
console.log(`Updated ${entryFile} to use new CSS modules.`);
```

## Phase 4: Testing & Verification (2 Days)

### 4.1 Visual Regression Test Script
```javascript
// compare-visual-tests.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

// Re-run the screenshots after CSS changes
exec('node setup-visual-tests.js --after', async (error, stdout) => {
  if (error) {
    console.error(`Error creating after screenshots: ${error}`);
    return;
  }
  
  console.log(stdout);
  
  // Now compare before and after
  const beforeDir = path.join(__dirname, 'visual-regression', 'before');
  const afterDir = path.join(__dirname, 'visual-regression', 'after');
  const diffDir = path.join(__dirname, 'visual-regression', 'diff');
  
  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }
  
  const beforeFiles = fs.readdirSync(beforeDir);
  
  let totalDiff = 0;
  let fileCount = 0;
  
  for (const file of beforeFiles) {
    if (!file.endsWith('.png')) continue;
    
    const beforeFile = path.join(beforeDir, file);
    const afterFile = path.join(afterDir, file);
    
    if (!fs.existsSync(afterFile)) {
      console.warn(`Missing after screenshot: ${file}`);
      continue;
    }
    
    // Compare the images
    const img1 = PNG.sync.read(fs.readFileSync(beforeFile));
    const img2 = PNG.sync.read(fs.readFileSync(afterFile));
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    
    const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    const diffPercentage = (pixelDiff / (width * height)) * 100;
    
    if (diffPercentage > 0.1) {
      fs.writeFileSync(path.join(diffDir, file), PNG.sync.write(diff));
      console.warn(`Visual diff of ${diffPercentage.toFixed(2)}% in ${file}`);
    }
    
    totalDiff += diffPercentage;
    fileCount++;
  }
  
  const avgDiff = totalDiff / fileCount;
  console.log(`Average visual difference: ${avgDiff.toFixed(2)}%`);
  
  if (avgDiff > 1.0) {
    console.error('WARNING: Significant visual differences detected. Review diffs in visual-regression/diff directory.');
  } else {
    console.log('Visual regression tests passed successfully.');
  }
});
```

### 4.2 Create Theme Integrity Test
```javascript
// test-theme-integrity.js
const fs = require('fs');
const path = require('path');

// Load all CSS modules
const modulesDir = './src/styles/modules';
const modules = fs.readdirSync(modulesDir).filter(file => file.endsWith('.css'));

// Check for basic integrity issues
const issues = [];

for (const moduleName of modules) {
  const modulePath = path.join(modulesDir, moduleName);
  const content = fs.readFileSync(modulePath, 'utf8');
  
  // Check for missing variable references
  const varRefs = content.match(/var\(--[^)]+\)/g) || [];
  varRefs.forEach(ref => {
    const varName = ref.match(/--[^),]+/)[0];
    
    // Look for variable definition in variables.css
    const varsContent = fs.readFileSync(path.join(modulesDir, 'variables.css'), 'utf8');
    if (!varsContent.includes(varName + ':')) {
      issues.push(`Missing variable: ${varName} referenced in ${moduleName}`);
    }
  });
  
  // Check for duplicate class definitions
  const classDefinitions = {};
  const classMatches = content.match(/\.[a-zA-Z][a-zA-Z0-9_-]+\s*\{/g) || [];
  
  classMatches.forEach(match => {
    const className = match.trim().slice(1, -1).trim();
    if (!classDefinitions[className]) {
      classDefinitions[className] = 0;
    }
    classDefinitions[className]++;
    
    if (classDefinitions[className] > 1) {
      issues.push(`Duplicate class: ${className} in ${moduleName}`);
    }
  });
}

if (issues.length > 0) {
  console.error('Theme integrity issues found:');
  issues.forEach(issue => console.error(` - ${issue}`));
} else {
  console.log('Theme integrity check passed.');
}
```

## Phase 5: Deployment & Monitoring (1 Day)

### 5.1 Create Deployment Script
```javascript
// deploy-css-changes.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to run each deployment step with error handling
function runStep(step, command) {
  console.log(`\n----- STEP ${step} -----`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error in step ${step}:`);
    console.error(error.message);
    return false;
  }
}

// Main deployment process
console.log('DEPLOYING CSS REFACTORING');
console.log('========================\n');

// Step 1: Create final backups
if (!runStep(1, 'mkdir -p ./backups && cp ./src/app/globals.css ./backups/globals.css.$(date +%Y%m%d%H%M%S)')) {
  console.error('Failed to create backups, aborting.');
  process.exit(1);
}

// Step 2: Run the CSS analysis
if (!runStep(2, 'node analyze-css.js')) {
  console.error('CSS analysis failed, aborting.');
  process.exit(1);
}

// Step 3: Run cleanup script
if (!runStep(3, 'node cleanup-css.js')) {
  console.error('CSS cleanup failed, aborting.');
  process.exit(1);
}

// Step 4: Fix gradients
if (!runStep(4, 'node standardize-gradients.js')) {
  console.error('Gradient standardization failed, aborting.');
  process.exit(1);
}

// Step 5: Create modular structure
if (!runStep(5, 'node create-modular-css.js')) {
  console.error('Modular CSS creation failed, aborting.');
  process.exit(1);
}

// Step 6: Update app entry point
if (!runStep(6, 'node update-app-entry.js')) {
  console.error('App entry point update failed, aborting.');
  process.exit(1);
}

// Step 7: Run visual regression tests
if (!runStep(7, 'node compare-visual-tests.js')) {
  console.warn('Visual regression tests show differences. Please review before proceeding.');
  const proceed = fs.readFileSync('/dev/stdin', 'utf8').trim().toLowerCase();
  if (proceed !== 'y' && proceed !== 'yes') {
    console.log('Deployment aborted.');
    process.exit(1);
  }
}

// Step 8: Run theme integrity tests
if (!runStep(8, 'node test-theme-integrity.js')) {
  console.warn('Theme integrity tests found issues. Please review before proceeding.');
  const proceed = fs.readFileSync('/dev/stdin', 'utf8').trim().toLowerCase();
  if (proceed !== 'y' && proceed !== 'yes') {
    console.log('Deployment aborted.');
    process.exit(1);
  }
}

console.log('\nCSS refactoring successfully deployed!');
```

### 5.2 Create Monitoring Script for Production
```javascript
// monitor-css-errors.js
const fs = require('fs');
const path = require('path');

// Create a simple error logging script for the browser
const monitorScript = `
// CSS Error Monitor
(function() {
  // Track CSS parsing errors
  const originalError = console.error;
  console.error = function(...args) {
    // Check if this is a CSS parsing error
    const errorString = args.join(' ');
    if (errorString.includes('CSS') && (
        errorString.includes('parse') || 
        errorString.includes('invalid') ||
        errorString.includes('unexpected'))) {
      // Log to server
      navigator.sendBeacon('/api/css-error', JSON.stringify({
        error: errorString,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }));
    }
    
    // Call original error handler
    return originalError.apply(this, args);
  };
  
  // Check for unsupported CSS properties
  window.addEventListener('load', function() {
    // Test key theme properties for support
    const testProps = [
      { prop: 'background-clip', value: 'text' },
      { prop: 'color', value: 'oklch(0.7 0.15 50)' }
    ];
    
    const testEl = document.createElement('div');
    testEl.style.display = 'none';
    document.body.appendChild(testEl);
    
    const unsupported = testProps.filter(({ prop, value }) => {
      testEl.style[prop] = value;
      return testEl.style[prop] === '';
    });
    
    if (unsupported.length > 0) {
      console.warn('Unsupported CSS properties:', unsupported.map(p => p.prop).join(', '));
    }
    
    document.body.removeChild(testEl);
  });
})();
`;

// Write the monitoring script
fs.writeFileSync('./public/js/css-monitor.js', monitorScript);

// Create a script to inject the monitor
const scriptInjector = `
// Add CSS Monitor to index.html
const fs = require('fs');

// Find index.html
const indexPath = './public/index.html';
if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in public directory');
  process.exit(1);
}

// Read the file
let html = fs.readFileSync(indexPath, 'utf8');

// Inject the script if not already present
if (!html.includes('css-monitor.js')) {
  // Find the closing head tag
  const headIndex = html.indexOf('</head>');
  if (headIndex !== -1) {
    // Insert the script before the head closing tag
    html = html.slice(0, headIndex) + 
           '\\n  <script src="/js/css-monitor.js"></script>\\n  ' + 
           html.slice(headIndex);
    
    // Write the updated HTML
    fs.writeFileSync(indexPath, html);
    console.log('CSS monitoring script injected into index.html');
  } else {
    console.error('Could not find </head> in index.html');
  }
} else {
  console.log('CSS monitoring script already present in index.html');
}
`;

fs.writeFileSync('./inject-css-monitor.js', scriptInjector);
console.log('CSS monitoring files created.');
```

## Implementation Risk Mitigation

1. **Staged Deployment**:
   - Apply changes to one module at a time
   - Test thoroughly after each module
   - Maintain the original global CSS file as a fallback

2. **Rollback Strategy**:
   - Keep pristine backups of the original files
   - Create a rollback script that can revert changes immediately:
   ```javascript
   // rollback.js
   const fs = require('fs');
   fs.copyFileSync('./backups/globals.css.[timestamp]', './src/app/globals.css');
   
   // Restore original import
   const entryFile = './src/main.tsx'; // adjust as needed
   let content = fs.readFileSync(entryFile, 'utf8');
   content = content.replace(
     /import ["']\.\/styles\/index\.css["']/,
     'import "./app/globals.css"'
   );
   fs.writeFileSync(entryFile, content);
   
   console.log('Rollback complete.');
   ```

3. **Granular Testing**:
   - Test each component in isolation
   - Create specific test cases for gradient displays
   - Test all interactive elements after CSS changes

## Implementation Timeline

1. **Day 1**: Analysis phase
   - Run analysis scripts
   - Create visual regression baseline
   - Develop detailed component inventory

2. **Day 2-3**: CSS restructuring
   - Run cleanup script
   - Fix gradient issues
   - Manual review of output

3. **Day 4-5**: Modular implementation
   - Create CSS modules
   - Update app entry points
   - Initial testing

4. **Day 6-7**: Testing & verification
   - Run visual regression tests
   - Manual testing of components
   - Fix any regression issues

5. **Day 8**: Deployment
   - Final verification
   - Production monitoring setup
   - Documentation update

This implementation plan minimizes risk while achieving a complete refactoring of the CSS architecture to a more efficient, class-based approach with significantly reduced file size and improved maintainability.