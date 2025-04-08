// simple-css-scanner.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Simple patterns to find CSS variables
const patterns = [
  /bg-\[var\(--([^)]+)\)\]/g,
  /text-\[var\(--([^)]+)\)\]/g,
  /border-\[var\(--([^)]+)\)\]/g,
  /bg-\[--([^)\]]+)\]/g,
  /text-\[--([^)\]]+)\]/g,
  /style={{[^}]*var\(--([^)]+)\)[^}]*}}/g,
];

// Scan a file for CSS variable usage
function scanFile(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${filePath}`);
      return [];
    }
    
    console.log(`Scanning file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        findings.push({
          variable: `--${match[1]}`,
          match: match[0],
          line: content.substring(0, match.index).split('\n').length
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error);
    return [];
  }
}

// Scan a directory
function scanDirectory(directory, filePattern = '**/*.{jsx,js,tsx,ts}') {
  // Check if directory exists
  if (!fs.existsSync(directory)) {
    console.error(`Directory does not exist: ${directory}`);
    return {};
  }
  
  console.log(`Scanning directory: ${directory}`);
  console.log(`Using pattern: ${filePattern}`);
  
  const files = glob.sync(path.join(directory, filePattern));
  console.log(`Found ${files.length} files matching pattern`);
  
  const results = {};
  files.forEach(file => {
    const relativeFile = path.relative(directory, file);
    const findings = scanFile(file);
    
    if (findings.length > 0) {
      results[relativeFile] = findings;
      console.log(`Found ${findings.length} variables in ${relativeFile}`);
    }
  });
  
  return results;
}

// Generate a report
function generateReport(results) {
  let report = '# CSS Variable Usage Report\n\n';
  
  // Count total occurrences
  let totalVars = 0;
  Object.values(results).forEach(findings => {
    totalVars += findings.length;
  });
  
  report += `Found ${totalVars} CSS variable usages across ${Object.keys(results).length} files.\n\n`;
  
  if (totalVars === 0) {
    report += "No CSS variables found matching the search patterns.\n";
    return report;
  }
  
  // List by file
  Object.entries(results).forEach(([file, findings]) => {
    report += `## ${file} (${findings.length} findings)\n\n`;
    
    findings.forEach(finding => {
      report += `- Line ${finding.line}: \`${finding.match}\`\n`;
      report += `  - Variable: ${finding.variable}\n\n`;
    });
  });
  
  return report;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const directory = args[0] || './src';
  const reportPath = args[1] || 'css-variables-report.md';
  
  console.log(`Starting CSS variable scanner`);
  console.log(`Target directory: ${directory}`);
  console.log(`Report will be saved to: ${reportPath}`);
  
  try {
    const results = scanDirectory(directory);
    const report = generateReport(results);
    
    // Display summary in console
    const totalFiles = Object.keys(results).length;
    const totalVars = Object.values(results).reduce((sum, findings) => sum + findings.length, 0);
    console.log(`\nSummary: Found ${totalVars} CSS variables in ${totalFiles} files`);
    
    // Write report to file
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`Report written to ${reportPath}`);
    
    // Also show the first few findings in console
    if (totalVars > 0) {
      console.log("\nSample findings:");
      let count = 0;
      outer: for (const [file, findings] of Object.entries(results)) {
        for (const finding of findings) {
          console.log(`- ${file} (Line ${finding.line}): ${finding.match}`);
          count++;
          if (count >= 5) break outer;
        }
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
