// fix-redundant-themes.js
// This script fixes redundant theme prefixes in your codebase
// Usage: node fix-redundant-themes.js ./src

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define patterns to fix
const patterns = [
  { 
    pattern: /--theme-theme-theme-/g, 
    replacement: '--theme-'
  },
  { 
    pattern: /--theme-theme-/g, 
    replacement: '--theme-'
  },
  { 
    pattern: /var\(--theme-theme-/g, 
    replacement: 'var(--theme-'
  }
];

// Fix for duplicate className attributes
const duplicateClassNamePattern = /className="([^"]*?)"\s+className="([^"]*?)"/g;
const duplicateClassNameReplacement = 'className="$1 $2"';

/**
 * Process a single file
 */
function processFile(filePath, options = {}) {
  const { dryRun = false, createBackup = true } = options;
  
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    
    // Apply each replacement pattern
    let changesMade = false;
    
    // Fix redundant theme prefixes
    for (const { pattern, replacement } of patterns) {
      const updated = updatedContent.replace(pattern, replacement);
      if (updated !== updatedContent) {
        changesMade = true;
        updatedContent = updated;
      }
    }
    
    // Fix duplicate className attributes
    const updatedWithClassNames = updatedContent.replace(duplicateClassNamePattern, duplicateClassNameReplacement);
    if (updatedWithClassNames !== updatedContent) {
      changesMade = true;
      updatedContent = updatedWithClassNames;
    }
    
    // Check if any changes were made
    if (changesMade) {
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
  
  console.log(`Fixing redundant theme prefixes in ${sourceDir}...`);
  
  // Process files
  const results = processDirectory(sourceDir, ['.js', '.jsx', '.ts', '.tsx', '.css'], options);
  
  // Print results
  const updated = results.filter(r => r.status === 'updated').length;
  const noChanges = results.filter(r => r.status === 'no_changes').length;
  const errors = results.filter(r => r.status === 'error').length;
  
  console.log(`\n=== Results ===`);
  console.log(`Files processed: ${results.length}`);
  console.log(`Files fixed: ${updated}${options.dryRun ? ' (dry-run)' : ''}`);
  console.log(`Files with no changes needed: ${noChanges}`);
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
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export {
  processFile,
  processDirectory
};
