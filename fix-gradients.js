const fs = require('fs');
const path = require('path');

// Regex patterns to find and replace
const patterns = [
  // Find competing light/dark mode text colors
  {
    find: /text-\[(?:var\()?(--text-navy)(?:\))?\]\s+dark:text-white/g,
    replace: 'text-[var(--theme-text-primary)]'
  },
  // Find competing light/dark mode backgrounds
  {
    find: /bg-\[(?:var\()?(--bg-cream)(?:\))?\]\s+dark:bg-\[(?:var\()?(--bg-navy)(?:\))?\]/g,
    replace: 'bg-[var(--theme-bg-primary)]'
  },
  // Find competing light/dark mode gradients
  {
    find: /bg-gradient-to-br from-white to-\[(?:var\()?(--bg-cream)(?:\))?\]\/80\s+dark:bg-gradient-to-br dark:from-\[(?:var\()?(--bg-navy)(?:\))?\] dark:to-\[(?:var\()?(--bg-navy-darker)(?:\))?\]/g,
    replace: 'bg-theme-gradient'
  },
  // Find inline styles with CSS variables
  {
    find: /style=\{\{\s*(?:backgroundColor|background):\s*['"]var\((--bg-cream)\)['"](?:,|\s*\}\})/g,
    replace: 'className="bg-[var(--theme-bg-primary)]"'
  },
  // Find standard text colors
  {
    find: /text-\[(?:var\()?(--text-navy)(?:\))?\]/g,
    replace: 'text-[var(--theme-text-primary)]'
  },
  // Find standard background colors
  {
    find: /bg-\[(?:var\()?(--bg-cream)(?:\))?\]/g,
    replace: 'bg-[var(--theme-bg-primary)]'
  },
  // Find primary orange colors
  {
    find: /text-\[(?:var\()?(--primary-orange)(?:\))?\]/g,
    replace: 'text-[var(--theme-primary)]'
  },
  // Find floating elements - light mode
  {
    find: /absolute -z-10 w-\d+ h-\d+ rounded-\[\d+%\] rotate-\d+ opacity-\d+ bg-\[(?:var\()?(--primary-orange)(?:\))?\]/g,
    replace: 'absolute -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]'
  },
  // Find competing shadows
  {
    find: /shadow-\[(?:[^\]]+)\]\s+dark:shadow-\[(?:[^\]]+)\]/g,
    replace: 'shadow-theme-card'
  }
];

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let changes = [];

    // Apply each regex pattern
    patterns.forEach(pattern => {
      const matches = content.match(pattern.find);
      if (matches) {
        changes.push({
          pattern: pattern.find.toString(),
          count: matches.length,
          oldValue: matches[0],
          newValue: pattern.replace
        });
        updatedContent = updatedContent.replace(pattern.find, pattern.replace);
      }
    });

    // If changes were made, save the updated file
    if (changes.length > 0) {
      // Create a backup
      fs.writeFileSync(`${filePath}.theme-backup`, content);
      // Write the updated content
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated ${filePath}`);
      console.log('Changes:');
      changes.forEach(change => {
        console.log(`  - Replaced ${change.count} occurrences of ${change.pattern}`);
        console.log(`    Example: "${change.oldValue}" -> "${change.newValue}"`);
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Function to recursively process files in a directory
function processDirectory(dir, extensions = ['.tsx', '.jsx', '.js']) {
  let totalFiles = 0;
  let updatedFiles = 0;

  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory() && 
          !item.startsWith('.') && 
          item !== 'node_modules' && 
          item !== 'dist' &&
          item !== 'public') {
        // Recursively process directories
        const { total, updated } = processDirectory(itemPath, extensions);
        totalFiles += total;
        updatedFiles += updated;
      } else if (stats.isFile() && extensions.includes(path.extname(itemPath))) {
        // Process files with matching extensions
        totalFiles++;
        if (processFile(itemPath)) {
          updatedFiles++;
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}: ${error.message}`);
  }
  
  return { total: totalFiles, updated: updatedFiles };
}

// Main execution
const targetDir = process.argv[2] || './src';
console.log(`Processing files in ${targetDir}...`);

const { total, updated } = processDirectory(targetDir);
console.log(`\nProcessing complete!`);
console.log(`Total files: ${total}`);
console.log(`Updated files: ${updated}`);