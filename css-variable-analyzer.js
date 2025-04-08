/**
 * CSS Variable Analyzer
 * 
 * This script analyzes a codebase to:
 * 1. Find all CSS variables defined in CSS files
 * 2. Find CSS variable usage across all files
 * 3. Identify which components use which variables
 * 4. Find non-theme-aware variable usage
 * 5. Generate a comprehensive report
 * 
 * Usage:
 * node css-variable-analyzer.js [path-to-project]
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk'; // For colorful console output

// Configuration
const CONFIG = {
  fileTypes: ['css', 'scss', 'js', 'jsx', 'tsx', 'ts'],
  excludeDirs: ['node_modules', 'dist', 'build', '.git'],
  rootCSSFile: 'globals.css', // Adjust this to your main CSS file
  themeAwarePrefix: '--theme-',
};

// Storage for results
const results = {
  variables: {
    defined: new Map(), // variable name -> array of files where it's defined
    used: new Map(),    // variable name -> array of files where it's used
  },
  components: new Map(), // component name -> array of variables used
  nonThemeAware: new Map(), // component -> array of non-theme-aware variables used
  potentialReplacements: new Map(), // non-theme-aware var -> potential theme-aware replacement
  report: {
    totalFiles: 0,
    totalVariables: 0,
    totalThemeAware: 0,
    totalNonThemeAware: 0,
    totalComponents: 0,
    componentsNeedingRefactoring: 0,
    topUsedVariables: [],
    topComponentsByVariableCount: [],
  }
};

// Variable mappings (potential replacements)
const variableMappings = {
  '--text-navy': '--theme-text-primary',
  '--text-cream': '--theme-text-on-primary',
  '--bg-cream': '--theme-bg-primary',
  '--bg-cream-darker': '--theme-bg-secondary',
  '--bg-navy': '--theme-bg-primary',
  '--bg-navy-darker': '--theme-bg-secondary',
  '--primary-orange': '--theme-primary',
  '--primary-orange-hover': '--theme-primary-hover',
  '--primary-orange-light': '--theme-primary-light',
  '--secondary-teal': '--theme-accent-secondary',
  '--secondary-teal-hover': '--theme-accent-secondary-hover',
  '--secondary-teal-light': '--theme-accent-secondary-light',
  '--accent-coral': '--theme-accent-tertiary',
  '--accent-red': '--theme-accent-quaternary',
  '--card-bg-light': '--theme-bg-card',
  '--card-bg-navy': '--theme-bg-card',
  '--card-bg-dark': '--theme-bg-card',
  '--shadow-sm': '--theme-shadow-sm',
  '--shadow-md': '--theme-shadow-md',
  '--shadow-lg': '--theme-shadow-lg',
  '--shadow-btn': '--theme-shadow-btn',
};

// Helper: Add to a map of arrays
function addToMapArray(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }
  if (!map.get(key).includes(value)) {
    map.get(key).push(value);
  }
}

// Extract component name from file path
function getComponentName(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  return basename;
}

// Find all CSS variable definitions in CSS files
function findCSSVariableDefinitions(projectPath) {
  console.log(chalk.blue('Finding CSS variable definitions...'));
  
  const cssFiles = glob.sync(`${projectPath}/**/*.{css,scss}`, {
    ignore: CONFIG.excludeDirs.map(dir => `${projectPath}/**/${dir}/**`)
  });
  
  let variableDefinitions = [];
  
  cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Look for variable definitions like --variable-name: value;
    const variableRegex = /--[a-zA-Z0-9_-]+\s*:/g;
    let match;
    
    while ((match = variableRegex.exec(content)) !== null) {
      const variable = match[0].replace(':', '').trim();
      addToMapArray(results.variables.defined, variable, file);
      variableDefinitions.push(variable);
    }
  });
  
  console.log(chalk.green(`Found ${variableDefinitions.length} variable definitions in ${cssFiles.length} CSS files`));
  return variableDefinitions;
}

// Find variable usage across all files
function findCSSVariableUsage(projectPath, variables) {
  console.log(chalk.blue('Finding CSS variable usage...'));
  
  const filePattern = `${projectPath}/**/*.{${CONFIG.fileTypes.join(',')}}`;
  const files = glob.sync(filePattern, {
    ignore: CONFIG.excludeDirs.map(dir => `${projectPath}/**/${dir}/**`)
  });
  
  results.report.totalFiles = files.length;
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const componentName = getComponentName(file);
    
    variables.forEach(variable => {
      // Look for var(--variable-name) or --variable-name in strings/templates
      const varRegex = new RegExp(`var\\(${variable}\\)|${variable}`, 'g');
      let match;
      let found = false;
      
      while ((match = varRegex.exec(content)) !== null) {
        found = true;
        addToMapArray(results.variables.used, variable, file);
        addToMapArray(results.components, componentName, variable);
        
        // Check if this is a non-theme-aware variable
        if (!variable.startsWith(CONFIG.themeAwarePrefix)) {
          addToMapArray(results.nonThemeAware, componentName, variable);
          
          // Check for potential replacement
          if (variableMappings[variable]) {
            results.potentialReplacements.set(variable, variableMappings[variable]);
          }
        }
      }
      
      if (found) {
        // Also check for Tailwind-style usage like bg-[--variable-name]
        const tailwindRegex = new RegExp(`\\[${variable}\\]`, 'g');
        if (tailwindRegex.test(content)) {
          addToMapArray(results.variables.used, variable, file);
          addToMapArray(results.components, componentName, variable);
          
          // Check if this is a non-theme-aware variable
          if (!variable.startsWith(CONFIG.themeAwarePrefix)) {
            addToMapArray(results.nonThemeAware, componentName, variable);
            
            // Check for potential replacement
            if (variableMappings[variable]) {
              results.potentialReplacements.set(variable, variableMappings[variable]);
            }
          }
        }
      }
    });
  });
  
  // Prepare report data
  results.report.totalVariables = results.variables.used.size;
  results.report.totalThemeAware = [...results.variables.used.keys()].filter(
    v => v.startsWith(CONFIG.themeAwarePrefix)
  ).length;
  results.report.totalNonThemeAware = results.report.totalVariables - results.report.totalThemeAware;
  results.report.totalComponents = results.components.size;
  results.report.componentsNeedingRefactoring = results.nonThemeAware.size;
  
  // Get top used variables
  results.report.topUsedVariables = [...results.variables.used.entries()]
    .map(([variable, files]) => ({ variable, count: files.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
  
  // Get components using most variables
  results.report.topComponentsByVariableCount = [...results.components.entries()]
    .map(([component, variables]) => ({ component, count: variables.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
  
  console.log(chalk.green(`Analyzed variable usage across ${files.length} files`));
}

// Look for competing light/dark mode styles
function findCompetingStyles(projectPath) {
  console.log(chalk.blue('Finding competing light/dark mode styles...'));
  
  const filePattern = `${projectPath}/**/*.{jsx,tsx}`;
  const files = glob.sync(filePattern, {
    ignore: CONFIG.excludeDirs.map(dir => `${projectPath}/**/${dir}/**`)
  });
  
  const competingStyles = new Map();
  
  const patterns = [
    // Common dark mode pattern with same property
    /(className="[^"]*)(bg|text|border|shadow)-\[[^\]]+\]\s+dark:\2-\[[^\]]+\]/g,
    
    // Tailwind gradients with dark mode variants
    /(className="[^"]*)bg-gradient-to-\w+\s+from-[^\s]+\s+to-[^\s]+\s+dark:bg-gradient/g,
  ];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const componentName = getComponentName(file);
    
    patterns.forEach(pattern => {
      const matches = [...content.matchAll(pattern)];
      if (matches.length > 0) {
        addToMapArray(competingStyles, componentName, {
          file,
          count: matches.length,
          examples: matches.slice(0, 3).map(m => m[0])
        });
      }
    });
  });
  
  return competingStyles;
}

// Generate a comprehensive report
function generateReport(competingStyles) {
  console.log(chalk.blue('Generating report...'));
  
  // Basic stats
  console.log('\n' + chalk.bgBlue.white(' CSS VARIABLE ANALYSIS REPORT '));
  console.log(chalk.cyan('Basic Statistics:'));
  console.log(`Total files analyzed: ${results.report.totalFiles}`);
  console.log(`Total CSS variables used: ${results.report.totalVariables}`);
  console.log(`Theme-aware variables: ${results.report.totalThemeAware}`);
  console.log(`Non-theme-aware variables: ${results.report.totalNonThemeAware}`);
  console.log(`Total components: ${results.report.totalComponents}`);
  console.log(`Components needing refactoring: ${results.report.componentsNeedingRefactoring}`);
  
  // Top used variables
  console.log('\n' + chalk.cyan('Top Used Variables:'));
  results.report.topUsedVariables.forEach(({ variable, count }, i) => {
    const isThemeAware = variable.startsWith(CONFIG.themeAwarePrefix);
    const varDisplay = isThemeAware 
      ? chalk.green(variable) 
      : chalk.yellow(variable);
    
    console.log(`${i+1}. ${varDisplay} - Used in ${count} locations`);
  });
  
  // Components using most variables
  console.log('\n' + chalk.cyan('Components Using Most Variables:'));
  results.report.topComponentsByVariableCount.forEach(({ component, count }, i) => {
    console.log(`${i+1}. ${component} - Uses ${count} variables`);
  });
  
  // Non-theme-aware variable usage by component
  console.log('\n' + chalk.cyan('Components Using Non-Theme-Aware Variables:'));
  [...results.nonThemeAware.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([component, variables]) => {
    console.log(`${chalk.yellow(component)} - ${variables.length} non-theme-aware variables:`);
    variables.forEach(variable => {
      const replacement = results.potentialReplacements.get(variable);
      if (replacement) {
        console.log(`  ${chalk.red(variable)} → ${chalk.green(replacement)}`);
      } else {
        console.log(`  ${chalk.red(variable)} (no direct replacement found)`);
      }
    });
  });
  
  // Competing styles
  console.log('\n' + chalk.cyan('Components With Competing Light/Dark Mode Styles:'));
  if (competingStyles.size === 0) {
    console.log('No competing styles found.');
  } else {
    [...competingStyles.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([component, details]) => {
      console.log(`${chalk.yellow(component)} - ${details.length} instances of competing styles`);
      details.forEach(detail => {
        console.log(`  In file: ${detail.file}`);
        console.log(`  Count: ${detail.count}`);
        console.log('  Examples:');
        detail.examples.forEach(example => {
          console.log(`    ${chalk.gray(example)}`);
        });
      });
    });
  }
  
  // Save HTML report
  const htmlReport = generateHTMLReport(competingStyles);
  const reportPath = 'css-variable-report.html';
  fs.writeFileSync(reportPath, htmlReport);
  
  console.log('\n' + chalk.green(`Report saved to ${reportPath}`));
}

// Generate an HTML version of the report
function generateHTMLReport(competingStyles) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Variable Analysis Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      background-color: #4a6ee0;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 24px;
    }
    h2 {
      border-bottom: 2px solid #4a6ee0;
      padding-bottom: 5px;
      margin-top: 30px;
      color: #2c3e50;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .stat-card {
      background-color: #f8f9fa;
      border-radius: 5px;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      margin: 10px 0;
      color: #4a6ee0;
    }
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
    .theme-aware {
      color: #28a745;
    }
    .non-theme-aware {
      color: #dc3545;
    }
    .component-card {
      background-color: #fff;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .component-name {
      font-weight: 600;
      margin-bottom: 10px;
      font-size: 18px;
    }
    .variable-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .variable-item {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
    }
    .replacement {
      color: #28a745;
      margin-left: 10px;
    }
    .toggle-details {
      background-color: #f8f9fa;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      margin-left: 10px;
      font-size: 12px;
    }
    .details {
      display: none;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 5px;
      margin: 10px 0;
      font-family: monospace;
      white-space: pre-wrap;
    }
    .chart-container {
      height: 300px;
      margin: 20px 0;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>CSS Variable Analysis Report</h1>
  
  <div class="stats">
    <div class="stat-card">
      <div class="stat-label">Files Analyzed</div>
      <div class="stat-value">${results.report.totalFiles}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">CSS Variables Used</div>
      <div class="stat-value">${results.report.totalVariables}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Theme-Aware Variables</div>
      <div class="stat-value">${results.report.totalThemeAware}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Non-Theme-Aware Variables</div>
      <div class="stat-value">${results.report.totalNonThemeAware}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Components</div>
      <div class="stat-value">${results.report.totalComponents}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Components Needing Refactoring</div>
      <div class="stat-value">${results.report.componentsNeedingRefactoring}</div>
    </div>
  </div>
  
  <div class="chart-container">
    <canvas id="variablesChart"></canvas>
  </div>
  
  <h2>Top Used Variables</h2>
  <table>
    <thead>
      <tr>
        <th>Variable</th>
        <th>Usage Count</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      ${results.report.topUsedVariables.map(({ variable, count }) => `
        <tr>
          <td>${variable}</td>
          <td>${count}</td>
          <td class="${variable.startsWith(CONFIG.themeAwarePrefix) ? 'theme-aware' : 'non-theme-aware'}">
            ${variable.startsWith(CONFIG.themeAwarePrefix) ? 'Theme-aware' : 'Non-theme-aware'}
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <h2>Components Using Most Variables</h2>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Variable Count</th>
      </tr>
    </thead>
    <tbody>
      ${results.report.topComponentsByVariableCount.map(({ component, count }) => `
        <tr>
          <td>${component}</td>
          <td>${count}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <h2>Components Using Non-Theme-Aware Variables</h2>
  <div>
    ${[...results.nonThemeAware.entries()].sort((a, b) => b[1].length - a[1].length).map(([component, variables]) => `
      <div class="component-card">
        <div class="component-name">${component} <span class="non-theme-aware">(${variables.length} non-theme variables)</span></div>
        <ul class="variable-list">
          ${variables.map(variable => {
            const replacement = results.potentialReplacements.get(variable);
            return `
              <li class="variable-item">
                <span class="non-theme-aware">${variable}</span>
                ${replacement ? `<span class="replacement">→ ${replacement}</span>` : ''}
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `).join('')}
  </div>
  
  <h2>Components With Competing Light/Dark Mode Styles</h2>
  <div>
    ${competingStyles.size === 0 ? 
      '<p>No competing styles found.</p>' : 
      [...competingStyles.entries()].sort((a, b) => b[1].length - a[1].length).map(([component, details]) => `
        <div class="component-card">
          <div class="component-name">${component} <span class="non-theme-aware">(${details.length} instances)</span></div>
          ${details.map(detail => `
            <p>
              File: ${detail.file}
              <button class="toggle-details" onclick="toggleDetails(this)">Show Examples</button>
            </p>
            <div class="details">
${detail.examples.join('\n')}
            </div>
          `).join('')}
        </div>
      `).join('')
    }
  </div>

  <script>
    // Initialize charts
    document.addEventListener('DOMContentLoaded', function() {
      // Variables Type Chart
      const ctx = document.getElementById('variablesChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Theme-aware Variables', 'Non-theme-aware Variables'],
          datasets: [{
            data: [${results.report.totalThemeAware}, ${results.report.totalNonThemeAware}],
            backgroundColor: ['#28a745', '#dc3545'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'CSS Variable Usage Distribution'
            }
          }
        }
      });
    });

    // Toggle details visibility
    function toggleDetails(button) {
      const details = button.parentNode.nextElementSibling;
      if (details.style.display === 'block') {
        details.style.display = 'none';
        button.textContent = 'Show Examples';
      } else {
        details.style.display = 'block';
        button.textContent = 'Hide Examples';
      }
    }
  </script>
</body>
</html>
  `;
  
  return htmlContent;
}

// Main function
function main() {
  const projectPath = process.argv[2] || '.';
  console.log(chalk.bold(`Analyzing CSS variables in: ${projectPath}`));
  
  // 1. Find all CSS variable definitions
  const variableDefinitions = findCSSVariableDefinitions(projectPath);
  
  // 2. Find CSS variable usage
  findCSSVariableUsage(projectPath, variableDefinitions);
  
  // 3. Find competing styles
  const competingStyles = findCompetingStyles(projectPath);
  
  // 4. Generate report
  generateReport(competingStyles);
}

// Run the script
main();