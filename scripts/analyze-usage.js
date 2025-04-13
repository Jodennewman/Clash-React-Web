const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Starting CSS usage analysis...');

// Check if glob package is installed
try {
  require.resolve('glob');
} catch (e) {
  console.error('The "glob" package is not installed. Please run "npm install glob" and try again.');
  process.exit(1);
}

// Load theme classes from analysis
let themeReport;
try {
  themeReport = require('../theme-analysis.json');
  console.log(`Loaded theme analysis with ${Object.keys(themeReport.themeClasses).length} classes`);
} catch (error) {
  console.error(`Error loading theme analysis: ${error.message}`);
  console.error('Please run analyze-css.js first');
  process.exit(1);
}

const { themeClasses } = themeReport;

// Find all component files
const componentFilePatterns = ['./src/**/*.jsx', './src/**/*.tsx'];
let componentFiles = [];

componentFilePatterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: path.join(__dirname, '..') });
  componentFiles = componentFiles.concat(files);
});

console.log(`Found ${componentFiles.length} component files to analyze`);

// Track class usage
const usageCount = {};
Object.keys(themeClasses).forEach(cls => { usageCount[cls] = 0; });

// Analyze each file
let processedFiles = 0;
componentFiles.forEach(file => {
  try {
    const filePath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    Object.keys(themeClasses).forEach(className => {
      // Account for className= patterns and string inclusion
      const regex = new RegExp(`${className}[\\s"}']`, 'g');
      const matches = content.match(regex) || [];
      usageCount[className] += matches.length;
    });
    
    processedFiles++;
    if (processedFiles % 50 === 0) {
      console.log(`Processed ${processedFiles}/${componentFiles.length} files...`);
    }
  } catch (error) {
    console.error(`Error processing file ${file}: ${error.message}`);
  }
});

// Sort by usage
const sortedUsage = Object.entries(usageCount)
  .sort((a, b) => b[1] - a[1])
  .filter(([_, count]) => count > 0);

const unusedClasses = Object.entries(usageCount)
  .filter(([_, count]) => count === 0)
  .map(([className]) => className);

console.log(`\nUsage Statistics:`);
console.log(`- Found ${sortedUsage.length} theme classes in use`);
console.log(`- Found ${unusedClasses.length} unused theme classes`);

// Display top 10 most used classes
console.log('\nTop 10 most used classes:');
sortedUsage.slice(0, 10).forEach(([className, count]) => {
  console.log(`- ${className}: ${count}`);
});

// Output results
const outputReport = {
  stats: {
    totalClasses: Object.keys(themeClasses).length,
    usedClasses: sortedUsage.length,
    unusedClasses: unusedClasses.length,
    mostUsedClass: sortedUsage.length > 0 ? sortedUsage[0][0] : null,
    mostUsedCount: sortedUsage.length > 0 ? sortedUsage[0][1] : 0,
    analyzedFiles: processedFiles
  },
  usageByClass: Object.fromEntries(sortedUsage),
  unusedClasses
};

fs.writeFileSync(path.join(__dirname, '../theme-usage.json'), JSON.stringify(outputReport, null, 2));
console.log(`\nUsage analysis complete. Results saved to theme-usage.json`);