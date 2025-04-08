/**
 * Corrected CSS Variable Replacement Tool
 * 
 * This utility helps migrate inline CSS variable references to the ACTUAL 
 * CSS classes defined in globals.css.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// CORRECTED Variable to class mapping based on the ACTUAL classes in globals.css
const variableToClassMap = {
  // Background colors
  '--bg-cream': 'bg-[#FFF5EE] dark:bg-[#002531]', // No direct utility class, using arbitrary value
  '--bg-cream-darker': 'bg-[#FFEADB] dark:bg-[#042F3C]', // No direct utility class, using arbitrary value
  '--bg-navy': 'bg-[#002531]', 
  '--bg-navy-darker': 'bg-[#042F3C]',
  
  // Text colors
  '--text-dark': 'text-[#002F3E] dark:text-[#FFF5E6]', // Using arbitrary value with dark mode
  '--text-white': 'text-[#FFF5E6]',
  
  // Brand colors as text
  '--primary-orange': 'text-primary', // We do have .text-primary in globals.css
  '--primary-orange-light': 'text-[#FFA24F]', // No direct class, using arbitrary value
  '--primary-orange-hover': 'text-[#FF8E1F]', // No direct class, using arbitrary value
  '--secondary-teal': 'text-secondary', // We do have .text-secondary in globals.css
  '--secondary-teal-light': 'text-[#00869A]', // No direct class, using arbitrary value
  '--secondary-teal-hover': 'text-[#006D77]', // No direct class, using arbitrary value
  '--accent-coral': 'text-accent', // We do have .text-accent in globals.css
  '--accent-red': 'text-accent-red', // We do have .text-accent-red in globals.css
  
  // Brand colors as backgrounds
  '--primary-orange-bg': 'bg-[#FF9833] dark:bg-[#FFA24F]', // Using bg- prefix for background colors
  '--primary-orange-light-bg': 'bg-[#FFA24F]',
  '--primary-orange-hover-bg': 'bg-[#FF8E1F]',
  '--secondary-teal-bg': 'bg-[#007784] dark:bg-[#007698]',
  '--secondary-teal-light-bg': 'bg-[#00869A]',
  '--secondary-teal-hover-bg': 'bg-[#006D77]',
  '--accent-coral-bg': 'bg-[#FF5549]',
  '--accent-red-bg': 'bg-[#DD0025]',
  
  // Other common references to theme variables
  '--theme-primary': 'text-primary',
  '--theme-bg-primary': 'bg-[#FFF5EE] dark:bg-[#002531]',
  '--theme-bg-secondary': 'bg-[#FFEADB] dark:bg-[#042F3C]',
  '--theme-text-primary': 'text-[#002F3E] dark:text-[#FFF5E6]',
  '--theme-text-secondary': 'text-[rgba(0,47,62,0.75)] dark:text-[rgba(255,245,230,0.8)]',
  '--theme-accent-secondary': 'text-secondary',
  '--theme-accent-tertiary': 'text-accent',
  '--theme-accent-quaternary': 'text-accent-red',
};

// Additional component-based mappings for more complex replacements
const componentMappings = {
  // Card components
  'card': 'card',
  'card-header': 'card-header',
  'card-body': 'card-body',
  'card-footer': 'card-footer',
  
  // Button components
  'btn': 'btn',
  'btn-primary': 'btn-primary',
  'btn-ghost': 'btn-ghost',
  
  // Module components
  'module': 'module',
  'module-teal': 'module teal',
  'module-orange': 'module orange',
  'module-coral': 'module coral',
  
  // Navigation components
  'nav': 'nav',
  'nav-link': 'nav-link',
  'nav-links': 'nav-links',
  
  // Badge and feature components
  'pro-tip': 'pro-tip',
  'feature-item': 'feature-item',
  'stats-badge': 'stats-badge',
  
  // Background patterns
  'grid-bg': 'grid-bg',
  'dot-bg': 'dot-bg',
};

// Regex patterns for finding inline CSS variable references
const patterns = [
  // Tailwind arbitrary values with var
  { pattern: /bg-\[var\(--([^)]+)\)\]/g, type: 'background', prefix: 'bg-' },
  { pattern: /text-\[var\(--([^)]+)\)\]/g, type: 'text', prefix: 'text-' },
  { pattern: /border-\[var\(--([^)]+)\)\]/g, type: 'border', prefix: 'border-' },
  { pattern: /fill-\[var\(--([^)]+)\)\]/g, type: 'fill', prefix: 'fill-' },
  { pattern: /stroke-\[var\(--([^)]+)\)\]/g, type: 'stroke', prefix: 'stroke-' },
  
  // Direct CSS variables in arbitrary values
  { pattern: /bg-\[--([^)\]]+)\]/g, type: 'background', prefix: 'bg-' },
  { pattern: /text-\[--([^)\]]+)\]/g, type: 'text', prefix: 'text-' },
  { pattern: /border-\[--([^)\]]+)\]/g, type: 'border', prefix: 'border-' },
  { pattern: /fill-\[--([^)\]]+)\]/g, type: 'fill', prefix: 'fill-' },
  { pattern: /stroke-\[--([^)\]]+)\]/g, type: 'stroke', prefix: 'stroke-' },
  
  // Style attribute with CSS variables
  { pattern: /style={{[^}]*backgroundColor: ['"]var\(--([^)]+)\)['"][^}]*}}/g, type: 'background', prefix: 'style-bg' },
  { pattern: /style={{[^}]*color: ['"]var\(--([^)]+)\)['"][^}]*}}/g, type: 'text', prefix: 'style-color' },
  { pattern: /style={{[^}]*borderColor: ['"]var\(--([^)]+)\)['"][^}]*}}/g, type: 'border', prefix: 'style-border' },
];

/**
 * Create a backup of a file before modifying it
 * @param {string} filePath - Path to the file to backup
 * @returns {string} - Path to the backup file
 */
function backupFile(filePath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${filePath}.${timestamp}.bak`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Get a suggested replacement for a CSS variable
 * @param {string} variable - CSS variable name
 * @param {string} type - Type of usage (background, text, etc.)
 * @returns {string} - Suggested replacement
 */
function getSuggestedReplacement(variable, type, fullMatch) {
  // First check if we have a direct mapping
  if (variableToClassMap[variable]) {
    return variableToClassMap[variable];
  }
  
  // For style attributes, suggest a class-based approach using inline styles as fallback
  if (type === 'background' && fullMatch.includes('style=')) {
    // Check if we have a bg- mapping
    const bgVar = `${variable}-bg`;
    if (variableToClassMap[bgVar]) {
      return `className="${variableToClassMap[bgVar]}"`;
    }
    // Fallback: keep the style but note it
    return `${fullMatch} {/* TODO: Replace with appropriate class */}`;
  }
  
  if (type === 'text' && fullMatch.includes('style=')) {
    if (variableToClassMap[variable]) {
      return `className="${variableToClassMap[variable]}"`;
    }
    return `${fullMatch} {/* TODO: Replace with appropriate class */}`;
  }
  
  // For background when we don't have a mapping, use arbitrary value
  if (type === 'background') {
    return `bg-[var(${variable})]`;
  }
  
  // For text when we don't have a mapping, use arbitrary value
  if (type === 'text') {
    return `text-[var(${variable})]`;
  }
  
  // Keep original as fallback with a comment
  return `${fullMatch} {/* TODO: Replace with appropriate class */}`;
}

/**
 * Scan a source file for CSS variable usage
 * @param {string} filePath - Path to the file to scan
 * @returns {Array} - Array of findings
 */
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  
  patterns.forEach(({ pattern, type, prefix }) => {
    let match;
    const regex = new RegExp(pattern);
    
    while ((match = regex.exec(content)) !== null) {
      const fullMatch = match[0];
      const variableName = match[1];
      let variableWithPrefix = `--${variableName}`;
      let suggestedReplacement = getSuggestedReplacement(variableWithPrefix, type, fullMatch);
      
      findings.push({
        line: content.substring(0, match.index).split('\n').length,
        lineContent: content.split('\n')[content.substring(0, match.index).split('\n').length - 1],
        type,
        prefix,
        variable: variableWithPrefix,
        match: fullMatch,
        suggestedReplacement,
        startIndex: match.index,
        endIndex: match.index + fullMatch.length
      });
    }
  });
  
  return findings;
}

/**
 * Scan a directory for all React components and find CSS variable usage
 * @param {string} directory - Directory to scan
 * @param {string} filePattern - Glob pattern for files to scan
 * @returns {Object} - Results by file
 */
function scanDirectory(directory, filePattern = '**/*.{jsx,js,tsx,ts}') {
  const files = glob.sync(path.join(directory, filePattern));
  const results = {};
  
  files.forEach(file => {
    const relativeFile = path.relative(directory, file);
    const findings = scanFile(file);
    
    if (findings.length > 0) {
      results[relativeFile] = findings;
    }
  });
  
  return results;
}

/**
 * Generate a report of all CSS variable usage
 * @param {Object} results - Results from scanDirectory
 * @returns {string} - Formatted report
 */
function generateReport(results) {
  let report = '# CSS Variable Usage Report\n\n';
  
  // Count total occurrences
  let totalVars = 0;
  Object.values(results).forEach(findings => {
    totalVars += findings.length;
  });
  
  report += `Found ${totalVars} CSS variable usages across ${Object.keys(results).length} files.\n\n`;
  
  // List by file
  Object.entries(results).forEach(([file, findings]) => {
    report += `## ${file} (${findings.length} findings)\n\n`;
    
    findings.forEach(finding => {
      report += `- Line ${finding.line}: \`${finding.match}\`\n`;
      report += `  - Line content: \`${finding.lineContent.trim()}\`\n`;
      report += `  - Variable: ${finding.variable} (${finding.type})\n`;
      report += `  - Suggested replacement: \`${finding.suggestedReplacement}\`\n\n`;
    });
  });
  
  return report;
}

/**
 * Replace CSS variables in a file with Tailwind utility classes
 * @param {string} filePath - Path to the file to modify
 * @param {Object} options - Options for the replacement
 * @returns {Object} - Details of changes made
 */
function replaceInFile(filePath, options = {}) {
  const defaultOptions = {
    dryRun: true, // Default to dry run for safety
    createBackup: true,
    verbose: true
  };
  
  const opts = { ...defaultOptions, ...options };
  const { dryRun, createBackup, verbose } = opts;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const findings = scanFile(filePath);
  const changes = [];
  let backupPath = null;
  
  // Create a backup if requested and not in dry-run mode
  if (createBackup && !dryRun && findings.length > 0) {
    backupPath = backupFile(filePath);
    if (verbose) {
      console.log(`Created backup of ${filePath} at ${backupPath}`);
    }
  }
  
  // Sort findings by start index in reverse order to avoid index shifting
  const sortedFindings = [...findings].sort((a, b) => b.startIndex - a.startIndex);
  
  // Make changes from end to beginning to avoid index shifting
  sortedFindings.forEach(finding => {
    const before = content.substring(0, finding.startIndex);
    const after = content.substring(finding.endIndex);
    const replacement = finding.suggestedReplacement;
    
    changes.push({
      line: finding.line,
      old: finding.match,
      new: replacement,
      variable: finding.variable,
      type: finding.type
    });
    
    if (!dryRun) {
      content = before + replacement + after;
    }
  });
  
  // Only write the file if it's not a dry run and there were changes
  if (!dryRun && changes.length > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    if (verbose) {
      console.log(`Applied ${changes.length} changes to ${filePath}`);
    }
  }
  
  return {
    filePath,
    changes,
    backupPath,
    dryRun
  };
}

/**
 * Process a directory of files, replacing CSS variables with Tailwind classes
 * @param {string} directory - Directory to process
 * @param {Object} options - Options for the replacement
 * @returns {Object} - Summary of changes
 */
function processDirectory(directory, options = {}) {
  const defaultOptions = {
    filePattern: '**/*.{jsx,js,tsx,ts}',
    dryRun: true, // Default to dry run for safety
    createBackup: true,
    verbose: true
  };
  
  const opts = { ...defaultOptions, ...options };
  const { filePattern, dryRun, verbose } = opts;
  
  if (verbose) {
    console.log(`Scanning directory: ${directory}`);
    console.log(`Mode: ${dryRun ? 'Dry run (no changes will be made)' : 'Live run (files will be modified)'}`);
  }
  
  const results = scanDirectory(directory, filePattern);
  const summary = {
    totalFiles: Object.keys(results).length,
    totalChanges: 0,
    changedFiles: [],
    backupFiles: [],
    dryRun
  };
  
  Object.entries(results).forEach(([relativeFile, findings]) => {
    const fullPath = path.join(directory, relativeFile);
    const result = replaceInFile(fullPath, opts);
    
    summary.totalChanges += result.changes.length;
    
    if (result.changes.length > 0) {
      summary.changedFiles.push({
        path: relativeFile,
        changes: result.changes.length
      });
      
      if (result.backupPath) {
        summary.backupFiles.push({
          path: relativeFile,
          backupPath: result.backupPath
        });
      }
    }
  });
  
  if (verbose) {
    console.log(`\nSummary:`);
    console.log(`- Mode: ${dryRun ? 'Dry run (no changes were made)' : 'Live run (files were modified)'}`);
    console.log(`- Scanned ${summary.totalFiles} files`);
    console.log(`- Found ${summary.totalChanges} potential changes`);
    console.log(`- Would modify ${summary.changedFiles.length} files`);
    
    if (!dryRun && summary.backupFiles.length > 0) {
      console.log(`- Created ${summary.backupFiles.length} backup files`);
    }
  }
  
  return summary;
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const directory = args[0] || './src';
  const dryRun = args.includes('--dry-run') || args.includes('-d') || !args.includes('--live');
  const noBackup = args.includes('--no-backup') || args.includes('-n');
  const quiet = args.includes('--quiet') || args.includes('-q');
  const reportPath = args.includes('--report') ? args[args.indexOf('--report') + 1] : null;
  
  const options = {
    dryRun,
    createBackup: !noBackup,
    verbose: !quiet
  };
  
  const results = scanDirectory(directory);
  
  if (reportPath) {
    const report = generateReport(results);
    fs.writeFileSync(reportPath, report, 'utf8');
    if (!quiet) {
      console.log(`Report written to ${reportPath}`);
    }
  } else if (!quiet) {
    console.log(generateReport(results));
  }
  
  processDirectory(directory, options);
}

module.exports = {
  scanFile,
  scanDirectory,
  generateReport,
  replaceInFile,
  processDirectory,
  backupFile
};
