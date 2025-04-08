// Variable Search and Replace Tool
// This script helps you find and replace all instances of CSS variables in your codebase

const fs = require('fs');
const path = require('path');

// Variable mapping from old variables to theme-aware variables
const variableMapping = {
  // Text colors
  '--text-navy': '--theme-text-primary',
  '--text-cream': '--theme-text-secondary',
  
  // Background colors
  '--bg-cream': '--theme-bg-primary',
  '--bg-cream-darker': '--theme-bg-secondary',
  '--bg-navy': '--theme-bg-primary',
  '--bg-navy-darker': '--theme-bg-secondary',
  
  // Primary colors
  '--primary-orange': '--theme-primary',
  '--primary-orange-hover': '--theme-primary-hover',
  '--primary-orange-light': '--theme-primary-light',
  
  // Secondary colors
  '--secondary-teal': '--theme-accent-secondary',
  '--secondary-teal-hover': '--theme-accent-secondary-hover',
  '--secondary-teal-light': '--theme-accent-secondary-light',
  
  // Accent colors
  '--accent-coral': '--theme-accent-tertiary',
  '--accent-red': '--theme-accent-quaternary',
  
  // Shadows
  '--shadow-sm': '--theme-shadow-sm',
  '--shadow-md': '--theme-shadow-md',
  '--shadow-lg': '--theme-shadow-lg',
  '--shadow-btn': '--theme-shadow-btn',
};

// Formats for variable usage in code
const variablePatterns = [
  // Tailwind arbitrary value syntax
  { 
    pattern: /(\w+)-\[var\(--([^)]+)\)\]/g,
    replacement: (match, property, variable) => {
      const themeVar = variableMapping[`--${variable}`] || `--theme-${variable}`;
      return `${property}-[var(${themeVar})]`;
    }
  },
  
  // Inline style syntax
  {
    pattern: /(["'])var\(--([^)]+)\)\1/g,
    replacement: (match, quotes, variable) => {
      const themeVar = variableMapping[`--${variable}`] || `--theme-${variable}`;
      return `${quotes}var(${themeVar})${quotes}`;
    }
  },
  
  // Template literal syntax
  {
    pattern: /`var\(--([^)]+)\)`/g,
    replacement: (match, variable) => {
      const themeVar = variableMapping[`--${variable}`] || `--theme-${variable}`;
      return `\`var(${themeVar})\``;
    }
  },
  
  // JavaScript object property syntax
  {
    pattern: /(['"])var\(--([^)]+)\)\1/g,
    replacement: (match, quotes, variable) => {
      const themeVar = variableMapping[`--${variable}`] || `--theme-${variable}`;
      return `${quotes}var(${themeVar})${quotes}`;
    }
  }
];

/**
 * Search for variable usage patterns and replace with theme-aware variables
 * @param {string} content - File content to search
 * @returns {string} - Updated content with replacements
 */
function searchAndReplace(content) {
  let updatedContent = content;
  
  // Apply each replacement pattern
  for (const { pattern, replacement } of variablePatterns) {
    updatedContent = updatedContent.replace(pattern, replacement);
  }
  
  return updatedContent;
}

/**
 * Process a single file
 * @param {string} filePath - Path to the file
 * @param {object} options - Processing options
 * @returns {object} - Result of processing
 */
function processFile(filePath, options = {}) {
  const { dryRun = false, createBackup = true } = options;
  
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Apply search and replace
    const updatedContent = searchAndReplace(content);
    
    // Check if any changes were made
    if (content !== updatedContent) {
      if (!dryRun) {
        // Create backup if needed
        if (createBackup) {
          fs.writeFileSync(`${filePath}.backup`, content);
        }
        
        // Write updated content
        fs.writeFileSync(filePath, updatedContent);
      }
      
      return {
        file: filePath,
        status: 'updated',
        dryRun
      };
    }
    
    return {
      file: filePath,
      status: 'no_changes'
    };
  } catch (error) {
    return {
      file: filePath,
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Recursively process files in a directory
 * @param {string} directory - Directory to process
 * @param {Array<string>} extensions - File extensions to process
 * @param {object} options - Processing options
 * @returns {Array<object>} - Results of processing
 */
function processDirectory(directory, extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'], options = {}) {
  const results = [];
  
  try {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
        results.push(...processDirectory(filePath, extensions, options));
      } else if (stats.isFile() && extensions.includes(path.extname(filePath))) {
        results.push(processFile(filePath, options));
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
  
  return results;
}

/**
 * Main function to run the script
 */
function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const sourceDir = args[0] || './src';
  const options = {
    dryRun: args.includes('--dry-run'),
    createBackup: !args.includes('--no-backup')
  };
  
  // Log mode
  if (options.dryRun) {
    console.log(`Running in dry-run mode. No files will be modified.`);
  } else {
    console.log(`Running in live mode. Files will be modified.`);
    if (options.createBackup) {
      console.log(`Backups will be created for modified files.`);
    } else {
      console.log(`No backups will be created. Be careful!`);
    }
  }
  
  console.log(`Searching for variable usages in ${sourceDir}...`);
  
  // Process files
  const results = processDirectory(sourceDir, ['.js', '.jsx', '.ts', '.tsx', '.css'], options);
  
  // Print results
  const updated = results.filter(r => r.status === 'updated').length;
  const noChanges = results.filter(r => r.status === 'no_changes').length;
  const errors = results.filter(r => r.status === 'error').length;
  
  console.log(`\n=== Results ===`);
  console.log(`Files processed: ${results.length}`);
  console.log(`Files with replacements: ${updated}${options.dryRun ? ' (dry-run)' : ''}`);
  console.log(`Files with no changes: ${noChanges}`);
  console.log(`Errors: ${errors}`);
  
  if (errors > 0) {
    console.log(`\n=== Errors ===`);
    results
      .filter(r => r.status === 'error')
      .forEach(r => console.log(`${r.file}: ${r.error}`));
  }
  
  if (updated > 0 && options.dryRun) {
    console.log(`\n=== Files that would be updated ===`);
    results
      .filter(r => r.status === 'updated')
      .forEach(r => console.log(`- ${r.file}`));
    
    console.log(`\nTo apply these changes, run without the --dry-run flag.`);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

// Export functions for testing
module.exports = {
  searchAndReplace,
  processFile,
  processDirectory
};
