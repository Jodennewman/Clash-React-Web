/**
 * Component Theme Inspector
 * 
 * This tool analyzes React components to show their theme variable usage patterns,
 * providing visual previews in both light and dark modes, and suggesting best practices.
 * 
 * Usage:
 * node component-theme-inspector.js [component-file-path]
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// Configuration
const CONFIG = {
  cssFilePath: './src/app/globals.css', // Path to main CSS file
  outputDir: './theme-inspector-output',
  screenshotWidth: 1200,
  screenshotHeight: 800,
  thumbnailWidth: 600,
  thumbnailHeight: 400,
  previewBothModes: true,
  generateHtmlReport: true,
  debugMode: false
};

// Theme mappings for visualization
const themeVariableMappings = {
  // Text colors
  '--theme-text-primary': { category: 'Text', description: 'Main text color' },
  '--theme-text-secondary': { category: 'Text', description: 'Secondary text color' },
  '--theme-text-tertiary': { category: 'Text', description: 'Tertiary text color' },
  '--theme-text-subtle': { category: 'Text', description: 'Subtle text color' },
  '--theme-text-on-primary': { category: 'Text', description: 'Text on primary background' },
  
  // Background colors
  '--theme-bg-primary': { category: 'Background', description: 'Primary background color' },
  '--theme-bg-secondary': { category: 'Background', description: 'Secondary background color' },
  '--theme-bg-surface': { category: 'Background', description: 'Surface background color' },
  '--theme-bg-card': { category: 'Background', description: 'Card background color' },
  
  // Accent colors
  '--theme-primary': { category: 'Accent', description: 'Primary accent color' },
  '--theme-primary-hover': { category: 'Accent', description: 'Primary hover color' },
  '--theme-primary-light': { category: 'Accent', description: 'Light primary color' },
  '--theme-accent-secondary': { category: 'Accent', description: 'Secondary accent color' },
  '--theme-accent-secondary-hover': { category: 'Accent', description: 'Secondary hover color' },
  '--theme-accent-tertiary': { category: 'Accent', description: 'Tertiary accent color' },
  '--theme-accent-quaternary': { category: 'Accent', description: 'Quaternary accent color' },
  
  // Gradients
  '--theme-gradient-start': { category: 'Gradient', description: 'Gradient start color' },
  '--theme-gradient-end': { category: 'Gradient', description: 'Gradient end color' },
  '--theme-primary-gradient-start': { category: 'Gradient', description: 'Primary gradient start' },
  '--theme-primary-gradient-end': { category: 'Gradient', description: 'Primary gradient end' },
  
  // Shadows
  '--theme-shadow-sm': { category: 'Shadow', description: 'Small shadow' },
  '--theme-shadow-md': { category: 'Shadow', description: 'Medium shadow' },
  '--theme-shadow-lg': { category: 'Shadow', description: 'Large shadow' },
  '--theme-shadow-card': { category: 'Shadow', description: 'Card shadow' },
  '--theme-shadow-btn': { category: 'Shadow', description: 'Button shadow' },
  
  // Transitions
  '--theme-transition-normal': { category: 'Animation', description: 'Normal transition' },
  '--theme-transition-fast': { category: 'Animation', description: 'Fast transition' },
  '--theme-transition-bounce': { category: 'Animation', description: 'Bounce transition' },
  
  // Animation
  '--theme-anim-distance': { category: 'Animation', description: 'Animation distance' },
  '--theme-anim-scale': { category: 'Animation', description: 'Animation scale' },
  '--theme-anim-duration': { category: 'Animation', description: 'Animation duration' },
};

// Theme-aware utility classes for visualization
const themeUtilityClasses = {
  // Text utilities
  'text-theme-primary': { variable: '--theme-text-primary', description: 'Main text color' },
  'text-theme-secondary': { variable: '--theme-text-secondary', description: 'Secondary text color' },
  'text-theme-tertiary': { variable: '--theme-text-tertiary', description: 'Tertiary text color' },
  'text-theme-on-primary': { variable: '--theme-text-on-primary', description: 'Text on primary bg' },
  
  // Background utilities
  'bg-theme-primary': { variable: '--theme-bg-primary', description: 'Primary background' },
  'bg-theme-secondary': { variable: '--theme-bg-secondary', description: 'Secondary background' },
  'bg-theme-surface': { variable: '--theme-bg-surface', description: 'Surface background' },
  'bg-theme-card': { variable: '--theme-bg-card', description: 'Card background' },
  
  // Gradient utilities
  'bg-theme-gradient': { variable: 'gradient', description: 'Theme gradient background' },
  'bg-theme-gradient-primary': { variable: 'gradient', description: 'Primary gradient' },
  'bg-theme-gradient-secondary': { variable: 'gradient', description: 'Secondary gradient' },
  
  // Shadow utilities
  'shadow-theme-sm': { variable: '--theme-shadow-sm', description: 'Small shadow' },
  'shadow-theme-md': { variable: '--theme-shadow-md', description: 'Medium shadow' },
  'shadow-theme-lg': { variable: '--theme-shadow-lg', description: 'Large shadow' },
  'shadow-theme-card': { variable: '--theme-shadow-card', description: 'Card shadow' },
  'shadow-theme-btn': { variable: '--theme-shadow-btn', description: 'Button shadow' },
  
  // Border utilities
  'border-theme-light': { variable: '--theme-border-light', description: 'Light border' },
  'border-theme-medium': { variable: '--theme-border', description: 'Medium border' },
  'border-theme-primary': { variable: '--theme-border-primary', description: 'Primary border' },
  
  // Animation utilities
  'hover-bubbly': { variable: 'animation', description: 'Standard hover animation' },
  'hover-bubbly-sm': { variable: 'animation', description: 'Small hover animation' },
  'hover-bubbly-lg': { variable: 'animation', description: 'Large hover animation' },
};

// Non-theme-aware patterns to identify
const nonThemeAwarePatterns = [
  // Direct color values
  { pattern: /bg-white|text-white|border-white/g, suggestion: 'Use text-theme-on-primary or bg-theme-surface instead of white' },
  { pattern: /bg-black|text-black|border-black/g, suggestion: 'Use text-theme-primary instead of black' },
  
  // Competing light/dark styles
  { pattern: /(bg|text|border|shadow)-\[[^\]]+\]\s+dark:\1-\[[^\]]+\]/g, suggestion: 'Use theme-aware utility classes like text-theme-primary' },
  
  // Direct Tailwind color classes
  { pattern: /bg-(slate|gray|zinc|neutral|stone)-(100|200|300|400|500|600|700|800|900)/g, suggestion: 'Use bg-theme-primary or bg-theme-secondary instead' },
  { pattern: /text-(slate|gray|zinc|neutral|stone)-(100|200|300|400|500|600|700|800|900)/g, suggestion: 'Use text-theme-primary or text-theme-secondary instead' },
  
  // Raw CSS variables
  { pattern: /var\(--(?!theme)[^)]+\)/g, suggestion: 'Use theme-aware variables with --theme prefix' },
  
  // Tailwind gradients
  { pattern: /bg-gradient-to-\w+\s+from-[^\s]+\s+to-[^\s]+(?!\s+theme)/g, suggestion: 'Use bg-theme-gradient or bg-theme-gradient-primary' },
];

// Analysis results
const analysisResults = {
  componentName: '',
  filePath: '',
  fileContent: '',
  fileSize: 0,
  variablesUsed: {
    themeAware: [],
    nonThemeAware: []
  },
  classesUsed: {
    themeAware: [],
    nonThemeAware: []
  },
  themeCompatibility: {
    score: 0,
    issues: [],
    strengths: []
  },
  visualPreview: {
    lightMode: '',
    darkMode: ''
  }
};

/**
 * Parse CSS variable definitions from a CSS file
 * @param {string} cssFilePath Path to CSS file
 * @returns {Object} Object containing light and dark mode variables
 */
function parseCSS(cssFilePath) {
  try {
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    const lightVariables = {};
    const darkVariables = {};
    
    // Extract root variables (light mode)
    const rootMatch = cssContent.match(/:root\s*{([^}]*)}/);
    if (rootMatch && rootMatch[1]) {
      const rootContent = rootMatch[1];
      extractVariables(rootContent, lightVariables);
    }
    
    // Extract dark mode variables
    const darkMatch = cssContent.match(/\.dark\s*{([^}]*)}/);
    if (darkMatch && darkMatch[1]) {
      const darkContent = darkMatch[1];
      extractVariables(darkContent, darkVariables);
    }
    
    return { light: lightVariables, dark: darkVariables };
  } catch (error) {
    console.error(chalk.red(`Error parsing CSS file: ${error.message}`));
    return { light: {}, dark: {} };
  }
}

/**
 * Extract CSS variables from a CSS block
 * @param {string} content CSS content block
 * @param {Object} target Object to store variables
 */
function extractVariables(content, target) {
  const variableRegex = /--[\w-]+\s*:\s*([^;]+);/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const name = match[0].split(':')[0].trim();
    const value = match[1].trim();
    target[name] = value;
  }
}

/**
 * Analyze a component file for theme usage
 * @param {string} filePath Path to component file
 */
function analyzeComponent(filePath) {
  console.log(chalk.blue(`Analyzing component: ${filePath}`));
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Basic file info
    analysisResults.filePath = filePath;
    analysisResults.componentName = path.basename(filePath, path.extname(filePath));
    analysisResults.fileContent = content;
    analysisResults.fileSize = fs.statSync(filePath).size;
    
    // Extract theme variable usage
    extractThemeVariableUsage(content);
    
    // Extract class usage
    extractThemeClassUsage(content);
    
    // Find non-theme-aware patterns
    findNonThemeAwarePatterns(content);
    
    // Calculate theme compatibility score
    calculateThemeCompatibilityScore();
    
    // Generate visual preview if configured
    if (CONFIG.previewBothModes) {
      generateVisualPreviews(filePath);
    }
    
    // Generate HTML report
    if (CONFIG.generateHtmlReport) {
      generateHTMLReport();
    }
    
    // Print results
    printResults();
    
  } catch (error) {
    console.error(chalk.red(`Error analyzing component: ${error.message}`));
  }
}

/**
 * Extract theme variable usage from component content
 * @param {string} content Component file content
 */
function extractThemeVariableUsage(content) {
  // Look for theme-aware variables
  Object.keys(themeVariableMappings).forEach(variable => {
    const pattern = new RegExp(`var\\(${variable}\\)`, 'g');
    const matches = content.match(pattern);
    
    if (matches) {
      analysisResults.variablesUsed.themeAware.push({
        variable,
        count: matches.length,
        category: themeVariableMappings[variable].category,
        description: themeVariableMappings[variable].description
      });
    }
  });
  
  // Look for non-theme-aware variables
  const nonThemeVarPattern = /var\(--(?!theme)[a-zA-Z0-9_-]+\)/g;
  const nonThemeMatches = content.match(nonThemeVarPattern);
  
  if (nonThemeMatches) {
    // Group by variable
    const nonThemeVars = {};
    nonThemeMatches.forEach(match => {
      const variable = match.match(/--[a-zA-Z0-9_-]+/)[0];
      if (!nonThemeVars[variable]) {
        nonThemeVars[variable] = 0;
      }
      nonThemeVars[variable]++;
    });
    
    // Add to results
    Object.entries(nonThemeVars).forEach(([variable, count]) => {
      analysisResults.variablesUsed.nonThemeAware.push({
        variable,
        count,
        suggestion: `Consider using a theme-aware variable instead`
      });
    });
  }
}

/**
 * Extract theme class usage from component content
 * @param {string} content Component file content
 */
function extractThemeClassUsage(content) {
  // Look for theme-aware utility classes
  Object.keys(themeUtilityClasses).forEach(className => {
    // Look for the class name in className="" attributes
    const pattern = new RegExp(`(className|class)=["'][^"']*${className}[^"']*["']`, 'g');
    const matches = content.match(pattern);
    
    if (matches) {
      analysisResults.classesUsed.themeAware.push({
        className,
        count: matches.length,
        variable: themeUtilityClasses[className].variable,
        description: themeUtilityClasses[className].description
      });
    }
  });
  
  // Look for Tailwind classes that should be theme-aware
  const tailwindColorClasses = [
    { pattern: /bg-(white|black|gray-[0-9]+)/g, suggestion: 'Use bg-theme-primary or bg-theme-secondary' },
    { pattern: /text-(white|black|gray-[0-9]+)/g, suggestion: 'Use text-theme-primary or text-theme-secondary' },
    { pattern: /border-(white|black|gray-[0-9]+)/g, suggestion: 'Use border-theme-primary or border-theme-light' },
    { pattern: /shadow-(sm|md|lg|xl|2xl)/g, suggestion: 'Use shadow-theme-sm, shadow-theme-md, or shadow-theme-lg' },
  ];
  
  tailwindColorClasses.forEach(({ pattern, suggestion }) => {
    const matches = content.match(pattern);
    
    if (matches) {
      // Group by class
      const classes = {};
      matches.forEach(match => {
        if (!classes[match]) {
          classes[match] = 0;
        }
        classes[match]++;
      });
      
      // Add to results
      Object.entries(classes).forEach(([className, count]) => {
        analysisResults.classesUsed.nonThemeAware.push({
          className,
          count,
          suggestion
        });
      });
    }
  });
}

/**
 * Find non-theme-aware patterns in the component
 * @param {string} content Component file content
 */
function findNonThemeAwarePatterns(content) {
  nonThemeAwarePatterns.forEach(({ pattern, suggestion }) => {
    const matches = content.match(pattern);
    
    if (matches) {
      analysisResults.themeCompatibility.issues.push({
        pattern: pattern.toString().replace(/^\/(.*)\/(g|i|m)?$/, '$1'),
        matches: matches.slice(0, 3), // Show max 3 examples
        count: matches.length,
        suggestion
      });
    }
  });
}

/**
 * Calculate theme compatibility score
 */
function calculateThemeCompatibilityScore() {
  // Count theme-aware variables and classes
  const themeAwareCount = 
    analysisResults.variablesUsed.themeAware.reduce((sum, item) => sum + item.count, 0) +
    analysisResults.classesUsed.themeAware.reduce((sum, item) => sum + item.count, 0);
  
  // Count non-theme-aware variables and classes
  const nonThemeAwareCount = 
    analysisResults.variablesUsed.nonThemeAware.reduce((sum, item) => sum + item.count, 0) +
    analysisResults.classesUsed.nonThemeAware.reduce((sum, item) => sum + item.count, 0) +
    analysisResults.themeCompatibility.issues.reduce((sum, issue) => sum + issue.count, 0);
  
  // Calculate total
  const total = themeAwareCount + nonThemeAwareCount;
  
  if (total === 0) {
    // No theme variables or classes used at all
    analysisResults.themeCompatibility.score = 0;
    analysisResults.themeCompatibility.issues.push({
      pattern: 'No theme variables or classes',
      matches: [],
      count: 1,
      suggestion: 'Component does not use any theme variables or classes'
    });
  } else {
    // Calculate percentage of theme-aware usage
    analysisResults.themeCompatibility.score = Math.round((themeAwareCount / total) * 100);
    
    // Add strengths based on theme-aware usage
    if (analysisResults.variablesUsed.themeAware.length > 0) {
      analysisResults.themeCompatibility.strengths.push({
        description: `Uses ${analysisResults.variablesUsed.themeAware.length} theme-aware variables`,
        details: analysisResults.variablesUsed.themeAware.map(item => item.variable).join(', ')
      });
    }
    
    if (analysisResults.classesUsed.themeAware.length > 0) {
      analysisResults.themeCompatibility.strengths.push({
        description: `Uses ${analysisResults.classesUsed.themeAware.length} theme-aware utility classes`,
        details: analysisResults.classesUsed.themeAware.map(item => item.className).join(', ')
      });
    }
    
    // Score evaluation
    if (analysisResults.themeCompatibility.score >= 90) {
      analysisResults.themeCompatibility.strengths.push({
        description: `Excellent theme compatibility score: ${analysisResults.themeCompatibility.score}%`,
        details: 'Component uses theme-aware styling extensively'
      });
    } else if (analysisResults.themeCompatibility.score >= 50) {
      analysisResults.themeCompatibility.strengths.push({
        description: `Good theme compatibility score: ${analysisResults.themeCompatibility.score}%`,
        details: 'Component uses theme-aware styling but could be improved'
      });
    }
  }
}

/**
 * Generate visual previews of the component in light and dark modes
 * @param {string} filePath Component file path
 */
async function generateVisualPreviews(filePath) {
  console.log(chalk.blue('Generating visual previews...'));
  
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    
    // Create temporary HTML file with component rendered in both modes
    const tempHtmlPath = path.join(CONFIG.outputDir, `${analysisResults.componentName}-preview.html`);
    
    // Generate HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${analysisResults.componentName} Preview</title>
    <style>
        /* Include CSS variables from main CSS file */
        ${fs.readFileSync(CONFIG.cssFilePath, 'utf8')}
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .preview-container {
            padding: 2rem;
            min-height: 600px;
        }
        
        .light-mode {
            background: var(--theme-bg-primary);
            color: var(--theme-text-primary);
        }
        
        .dark-mode {
            background: var(--theme-bg-primary);
            color: var(--theme-text-primary);
        }
        
        h1 {
            margin-top: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--theme-border);
            color: var(--theme-text-primary);
        }
    </style>
</head>
<body>
    <div class="preview-container light-mode">
        <h1>${analysisResults.componentName} - Light Mode</h1>
        <div id="component-preview-light">
            <!-- Component content would be rendered here -->
            <div style="padding: 2rem; border: 1px dashed var(--theme-border); border-radius: 8px; text-align: center;">
                <p>Component Preview - Light Mode</p>
            </div>
        </div>
    </div>
    
    <div class="preview-container dark-mode" data-theme="dark">
        <h1>${analysisResults.componentName} - Dark Mode</h1>
        <div id="component-preview-dark">
            <!-- Component content would be rendered here -->
            <div style="padding: 2rem; border: 1px dashed var(--theme-border); border-radius: 8px; text-align: center;">
                <p>Component Preview - Dark Mode</p>
            </div>
        </div>
    </div>
    
    <script>
        // This would be replaced with actual component rendering code
        console.log('Component previews rendered');
    </script>
</body>
</html>
    `;
    
    fs.writeFileSync(tempHtmlPath, htmlContent);
    
    // Use puppeteer to capture screenshots
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: CONFIG.screenshotWidth, height: CONFIG.screenshotHeight });
    
    // Load the HTML file
    await page.goto(`file://${tempHtmlPath}`);
    await page.waitForTimeout(1000); // Wait for styles to load
    
    // Capture light mode screenshot
    const lightModePreview = path.join(CONFIG.outputDir, `${analysisResults.componentName}-light.png`);
    await page.screenshot({ 
      path: lightModePreview,
      clip: {
        x: 0,
        y: 0,
        width: CONFIG.screenshotWidth,
        height: CONFIG.screenshotHeight / 2
      }
    });
    
    // Capture dark mode screenshot
    const darkModePreview = path.join(CONFIG.outputDir, `${analysisResults.componentName}-dark.png`);
    await page.screenshot({ 
      path: darkModePreview,
      clip: {
        x: 0,
        y: CONFIG.screenshotHeight / 2,
        width: CONFIG.screenshotWidth,
        height: CONFIG.screenshotHeight / 2
      }
    });
    
    await browser.close();
    
    // Store screenshot paths
    analysisResults.visualPreview.lightMode = lightModePreview;
    analysisResults.visualPreview.darkMode = darkModePreview;
    
    console.log(chalk.green('Visual previews generated'));
    
  } catch (error) {
    console.error(chalk.red(`Error generating visual previews: ${error.message}`));
  }
}

/**
 * Generate HTML report for the component analysis
 */
function generateHTMLReport() {
  console.log(chalk.blue('Generating HTML report...'));
  
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    
    const reportPath = path.join(CONFIG.outputDir, `${analysisResults.componentName}-report.html`);
    
    // Get relative paths for screenshots
    const lightModeImg = analysisResults.visualPreview.lightMode ? 
      path.basename(analysisResults.visualPreview.lightMode) : '';
    const darkModeImg = analysisResults.visualPreview.darkMode ? 
      path.basename(analysisResults.visualPreview.darkMode) : '';
    
    // Generate HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${analysisResults.componentName} Theme Analysis</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        h1 {
            background-color: #4a6ee0;
            color: white;
            padding: 15px;
            border-radius: 5px;
            font-size: 24px;
        }
        
        h2 {
            border-bottom: 2px solid #4a6ee0;
            padding-bottom: 5px;
            margin-top: 30px;
            color: #2c3e50;
        }
        
        .overview {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 20px 0;
            gap: 20px;
        }
        
        .stat-card {
            background-color: #f8f9fa;
            border-radius: 5px;
            padding: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            flex: 1 1 calc(33.333% - 20px);
            min-width: 250px;
        }
        
        .stat-value {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .good { color: #28a745; }
        .warning { color: #ffc107; }
        .danger { color: #dc3545; }
        
        .stat-label {
            font-size: 14px;
            text-transform: uppercase;
            color: #6c757d;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        tr:hover {
            background-color: #f8f9fa;
        }
        
        .code {
            font-family: monospace;
            background-color: #f8f9fa;
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 14px;
        }
        
        .previews {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin: 20px 0;
        }
        
        .preview-card {
            flex: 1 1 calc(50% - 20px);
            min-width: 300px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .preview-header {
            background-color: #f8f9fa;
            padding: 10px 15px;
            font-weight: 600;
            border-bottom: 1px solid #ddd;
        }
        
        .preview-image {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .issue-card {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px 15px;
            margin: 10px 0;
        }
        
        .strength-card {
            background-color: #d4edda;
            border-left: 4px solid #28a745;
            padding: 10px 15px;
            margin: 10px 0;
        }
        
        pre {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 14px;
            margin: 10px 0;
        }
        
        .component-code {
            max-height: 300px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <h1>${analysisResults.componentName} Theme Analysis</h1>
    
    <div class="overview">
        <div class="stat-card">
            <div class="stat-label">Theme Compatibility Score</div>
            <div class="stat-value ${analysisResults.themeCompatibility.score >= 90 ? 'good' : analysisResults.themeCompatibility.score >= 50 ? 'warning' : 'danger'}">
                ${analysisResults.themeCompatibility.score}%
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Theme-Aware Variables</div>
            <div class="stat-value good">${analysisResults.variablesUsed.themeAware.length}</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Theme-Aware Classes</div>
            <div class="stat-value good">${analysisResults.classesUsed.themeAware.length}</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Non-Theme-Aware Variables</div>
            <div class="stat-value ${analysisResults.variablesUsed.nonThemeAware.length > 0 ? 'danger' : 'good'}">
                ${analysisResults.variablesUsed.nonThemeAware.length}
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Non-Theme-Aware Classes</div>
            <div class="stat-value ${analysisResults.classesUsed.nonThemeAware.length > 0 ? 'danger' : 'good'}">
                ${analysisResults.classesUsed.nonThemeAware.length}
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Issues Found</div>
            <div class="stat-value ${analysisResults.themeCompatibility.issues.length > 0 ? 'danger' : 'good'}">
                ${analysisResults.themeCompatibility.issues.length}
            </div>
        </div>
    </div>
    
    ${analysisResults.visualPreview.lightMode ? `
    <h2>Visual Previews</h2>
    <div class="previews">
        <div class="preview-card">
            <div class="preview-header">Light Mode</div>
            <img src="${lightModeImg}" alt="Light Mode Preview" class="preview-image">
        </div>
        
        <div class="preview-card">
            <div class="preview-header">Dark Mode</div>
            <img src="${darkModeImg}" alt="Dark Mode Preview" class="preview-image">
        </div>
    </div>
    ` : ''}
    
    <h2>Theme Compatibility</h2>
    
    ${analysisResults.themeCompatibility.strengths.length > 0 ? `
    <h3>Strengths</h3>
    ${analysisResults.themeCompatibility.strengths.map(strength => `
        <div class="strength-card">
            <strong>${strength.description}</strong>
            <p>${strength.details}</p>
        </div>
    `).join('')}
    ` : ''}
    
    ${analysisResults.themeCompatibility.issues.length > 0 ? `
    <h3>Issues</h3>
    ${analysisResults.themeCompatibility.issues.map(issue => `
        <div class="issue-card">
            <strong>Found ${issue.count} instances of: <span class="code">${issue.pattern}</span></strong>
            <p>Suggestion: ${issue.suggestion}</p>
            ${issue.matches.length > 0 ? `
            <p>Examples:</p>
            <pre>${issue.matches.join('\n')}</pre>
            ` : ''}
        </div>
    `).join('')}
    ` : '<p>No theme compatibility issues found!</p>'}
    
    <h2>Theme-Aware Variables Used</h2>
    ${analysisResults.variablesUsed.themeAware.length > 0 ? `
    <table>
        <thead>
            <tr>
                <th>Variable</th>
                <th>Category</th>
                <th>Description</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody>
            ${analysisResults.variablesUsed.themeAware.map(item => `
            <tr>
                <td><span class="code">${item.variable}</span></td>
                <td>${item.category}</td>
                <td>${item.description}</td>
                <td>${item.count}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : '<p>No theme-aware variables used in this component.</p>'}
    
    <h2>Theme-Aware Classes Used</h2>
    ${analysisResults.classesUsed.themeAware.length > 0 ? `
    <table>
        <thead>
            <tr>
                <th>Class</th>
                <th>Description</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody>
            ${analysisResults.classesUsed.themeAware.map(item => `
            <tr>
                <td><span class="code">${item.className}</span></td>
                <td>${item.description}</td>
                <td>${item.count}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : '<p>No theme-aware classes used in this component.</p>'}
    
    ${analysisResults.variablesUsed.nonThemeAware.length > 0 ? `
    <h2>Non-Theme-Aware Variables Used</h2>
    <table>
        <thead>
            <tr>
                <th>Variable</th>
                <th>Count</th>
                <th>Suggestion</th>
            </tr>
        </thead>
        <tbody>
            ${analysisResults.variablesUsed.nonThemeAware.map(item => `
            <tr>
                <td><span class="code">${item.variable}</span></td>
                <td>${item.count}</td>
                <td>${item.suggestion}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : ''}
    
    ${analysisResults.classesUsed.nonThemeAware.length > 0 ? `
    <h2>Non-Theme-Aware Classes Used</h2>
    <table>
        <thead>
            <tr>
                <th>Class</th>
                <th>Count</th>
                <th>Suggestion</th>
            </tr>
        </thead>
        <tbody>
            ${analysisResults.classesUsed.nonThemeAware.map(item => `
            <tr>
                <td><span class="code">${item.className}</span></td>
                <td>${item.count}</td>
                <td>${item.suggestion}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : ''}
    
    <h2>Component Code</h2>
    <pre class="component-code"><code>${escapeHtml(analysisResults.fileContent)}</code></pre>
</body>
</html>
    `;
    
    fs.writeFileSync(reportPath, htmlContent);
    console.log(chalk.green(`HTML report generated: ${reportPath}`));
    
  } catch (error) {
    console.error(chalk.red(`Error generating HTML report: ${error.message}`));
  }
}

/**
 * Escape HTML special characters
 * @param {string} text Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Print analysis results to console
 */
function printResults() {
  console.log('\n' + chalk.bgBlue.white(' COMPONENT THEME ANALYSIS '));
  console.log(chalk.cyan(`Component: ${analysisResults.componentName}`));
  console.log(chalk.cyan(`File: ${analysisResults.filePath}`));
  console.log(chalk.cyan(`Size: ${(analysisResults.fileSize / 1024).toFixed(2)}KB`));
  
  console.log('\n' + chalk.cyan('Theme Compatibility:'));
  const scoreColor = 
    analysisResults.themeCompatibility.score >= 90 ? 'green' :
    analysisResults.themeCompatibility.score >= 50 ? 'yellow' :
    'red';
  console.log(`Score: ${chalk[scoreColor](analysisResults.themeCompatibility.score + '%')}`);
  
  console.log('\n' + chalk.cyan('Theme-Aware Variables:'));
  if (analysisResults.variablesUsed.themeAware.length > 0) {
    analysisResults.variablesUsed.themeAware.forEach(item => {
      console.log(`${chalk.green(item.variable)} (${item.category}) - ${item.count} usages`);
    });
  } else {
    console.log(chalk.yellow('No theme-aware variables used'));
  }
  
  console.log('\n' + chalk.cyan('Theme-Aware Classes:'));
  if (analysisResults.classesUsed.themeAware.length > 0) {
    analysisResults.classesUsed.themeAware.forEach(item => {
      console.log(`${chalk.green(item.className)} - ${item.count} usages`);
    });
  } else {
    console.log(chalk.yellow('No theme-aware classes used'));
  }
  
  if (analysisResults.variablesUsed.nonThemeAware.length > 0) {
    console.log('\n' + chalk.cyan('Non-Theme-Aware Variables:'));
    analysisResults.variablesUsed.nonThemeAware.forEach(item => {
      console.log(`${chalk.red(item.variable)} - ${item.count} usages`);
      console.log(`  ${chalk.yellow('Suggestion:')} ${item.suggestion}`);
    });
  }
  
  if (analysisResults.classesUsed.nonThemeAware.length > 0) {
    console.log('\n' + chalk.cyan('Non-Theme-Aware Classes:'));
    analysisResults.classesUsed.nonThemeAware.forEach(item => {
      console.log(`${chalk.red(item.className)} - ${item.count} usages`);
      console.log(`  ${chalk.yellow('Suggestion:')} ${item.suggestion}`);
    });
  }
  
  if (analysisResults.themeCompatibility.issues.length > 0) {
    console.log('\n' + chalk.cyan('Issues:'));
    analysisResults.themeCompatibility.issues.forEach(issue => {
      console.log(`${chalk.red(issue.pattern)} - ${issue.count} instances`);
      console.log(`  ${chalk.yellow('Suggestion:')} ${issue.suggestion}`);
      if (issue.matches.length > 0) {
        console.log(`  ${chalk.yellow('Examples:')}`);
        issue.matches.forEach(example => {
          console.log(`    ${chalk.gray(example)}`);
        });
      }
    });
  }
  
  if (analysisResults.themeCompatibility.strengths.length > 0) {
    console.log('\n' + chalk.cyan('Strengths:'));
    analysisResults.themeCompatibility.strengths.forEach(strength => {
      console.log(`${chalk.green('✓')} ${strength.description}`);
      console.log(`  ${chalk.gray(strength.details)}`);
    });
  }
  
  if (analysisResults.visualPreview.lightMode) {
    console.log('\n' + chalk.cyan('Visual Previews:'));
    console.log(`Light Mode: ${chalk.green(analysisResults.visualPreview.lightMode)}`);
    console.log(`Dark Mode: ${chalk.green(analysisResults.visualPreview.darkMode)}`);
  }
  
  if (CONFIG.generateHtmlReport) {
    console.log('\n' + chalk.cyan('HTML Report:'));
    console.log(chalk.green(path.join(CONFIG.outputDir, `${analysisResults.componentName}-report.html`)));
  }
}

/**
 * Main function
 */
function main() {
  // Get file path from command line
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.log(chalk.red('Please provide a component file path'));
    console.log(chalk.yellow('Usage: node component-theme-inspector.js [component-file-path]'));
    return;
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`File not found: ${filePath}`));
    return;
  }
  
  // Check if CSS file exists
  if (!fs.existsSync(CONFIG.cssFilePath)) {
    console.log(chalk.yellow(`Warning: CSS file not found at ${CONFIG.cssFilePath}`));
    console.log(chalk.yellow('Some functionality may be limited'));
  }
  
  // Analyze component
  analyzeComponent(filePath);
}

// Run the script
main();