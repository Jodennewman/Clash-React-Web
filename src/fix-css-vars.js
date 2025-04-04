// Save this as fix-css-vars.js in your project root

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Directories to process, relative to the script
  includeDirs: ['src'],
  // File extensions to process
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  // Files or directories to exclude
  exclude: ['node_modules', 'dist', 'build', '.git'],
  // Whether to create backup files
  createBackups: true,
  // Whether to actually make changes (false for dry run)
  makeChanges: true,
  // Log level: 1 = minimal, 2 = normal, 3 = verbose
  logLevel: 2
};

// Patterns to replace
const replacements = [
  // Background colors
  { pattern: /bg-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'bg-[var(--$1)]' },
  
  // Text colors
  { pattern: /text-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'text-[var(--$1)]' },
  
  // Border colors
  { pattern: /border-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'border-[var(--$1)]' },
  
  // Dark mode variations
  { pattern: /dark:bg-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'dark:bg-[var(--$1)]' },
  { pattern: /dark:text-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'dark:text-[var(--$1)]' },
  { pattern: /dark:border-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'dark:border-[var(--$1)]' },
  
  // Other color properties
  { pattern: /from-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'from-[var(--$1)]' },
  { pattern: /to-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'to-[var(--$1)]' },
  { pattern: /via-\[--([a-zA-Z0-9-]+)\]/g, replacement: 'via-[var(--$1)]' },
  
  // Other properties that might use CSS variables but be careful with this one
  // Add only if you're sure you need it
  // { pattern: /\[--([a-zA-Z0-9-]+)\]/g, replacement: '[var(--$1)]' }
];

// Inline gradient patterns to identify for manual review
const inlineGradientPatterns = [
  /background:\s*linear-gradient\([^)]+\)/g,
  /background-image:\s*linear-gradient\([^)]+\)/g,
  /style=\{[^}]*background:\s*['"]?linear-gradient\([^)]+\)[^}]*\}/g,
  /style=\{[^}]*background-image:\s*['"]?linear-gradient\([^)]+\)[^}]*\}/g
];

// Tailwind gradient patterns
// Captures the direction and color variables
const tailwindGradientPattern = /(bg-gradient-to-[rltrb]+)\s+(from-\[(?:var\()?--([a-zA-Z0-9-]+)(?:\))?\])\s+(to-\[(?:var\()?--([a-zA-Z0-9-]+)(?:\))?\])/g;
const tailwindThreeColorGradientPattern = /(bg-gradient-to-[rltrb]+)\s+(from-\[(?:var\()?--([a-zA-Z0-9-]+)(?:\))?\])\s+(via-\[(?:var\()?--([a-zA-Z0-9-]+)(?:\))?\])\s+(to-\[(?:var\()?--([a-zA-Z0-9-]+)(?:\))?\])/g;

// Mapping of color variable combinations to CSS classes
const gradientClassMappings = [
  {
    from: 'primary-orange',
    to: 'primary-orange-hover',
    class: 'vs-btn-primary-gradient',
    direction: 'r'
  },
  {
    from: 'secondary-teal',
    to: 'secondary-teal-hover',
    class: 'vs-btn-secondary-gradient',
    direction: 'r'
  },
  {
    from: 'accent-coral',
    to: 'primary-orange',
    class: 'vs-btn-vibrant-gradient',
    direction: 'r'
  },
  {
    from: 'accent-red',
    to: 'accent-coral',
    class: 'vs-btn-destructive-gradient',
    direction: 'r'
  },
  {
    from: 'primary-orange',
    to: 'accent-coral',
    class: 'vs-gradient-primary-accent',
    direction: 'r'
  },
  {
    from: 'primary-orange',
    to: 'primary-orange-hover',
    class: 'vs-gradient-orange-diagonal',
    direction: 'br'
  },
  {
    from: 'secondary-teal',
    to: 'secondary-teal-hover',
    class: 'vs-gradient-teal-diagonal',
    direction: 'br'
  },
  {
    from: 'accent-coral',
    to: 'accent-red',
    class: 'vs-gradient-coral-diagonal',
    direction: 'br'
  }
];

// Color groups for similarity matching
const colorGroups = {
  orange: ['primary-orange', 'primary-orange-hover', 'primary-orange-light'],
  teal: ['secondary-teal', 'secondary-teal-hover', 'secondary-teal-light'],
  red: ['accent-red', 'accent-red-dark'],
  coral: ['accent-coral']
};

// Statistics
const stats = {
  filesProcessed: 0,
  filesChanged: 0,
  replacementsCount: 0,
  gradientMatches: 0,
  tailwindGradientsReplaced: 0,
  gradientsFound: [],
  unmatchedGradients: []
};

// Helper function to determine color group
function getColorGroup(colorVar) {
  for (const [group, colors] of Object.entries(colorGroups)) {
    if (colors.includes(colorVar)) {
      return group;
    }
  }
  return null;
}

// Helper function to find the most similar gradient class
function findSimilarGradient(fromColor, toColor, direction) {
  // Try for exact match first
  const exactMatch = gradientClassMappings.find(
    m => m.from === fromColor && m.to === toColor && (direction.includes(m.direction) || m.direction.includes(direction))
  );
  if (exactMatch) return exactMatch.class;
  
  // Look for similar colors in the same groups
  const fromGroup = getColorGroup(fromColor);
  const toGroup = getColorGroup(toColor);
  
  if (fromGroup && toGroup) {
    // Find a mapping with the same color groups
    const similarMatch = gradientClassMappings.find(
      m => getColorGroup(m.from) === fromGroup && getColorGroup(m.to) === toGroup
    );
    if (similarMatch) return similarMatch.class;
    
    // If we have orange to teal, try finding a teal to orange and just note the direction
    const reversedMatch = gradientClassMappings.find(
      m => getColorGroup(m.from) === toGroup && getColorGroup(m.to) === fromGroup
    );
    if (reversedMatch) return reversedMatch.class; // Note: ideally would add a comment about direction
  }
  
  // Default fallbacks based on color groups
  if (fromGroup === 'orange' && toGroup === 'orange') return 'vs-gradient-orange';
  if (fromGroup === 'teal' && toGroup === 'teal') return 'vs-gradient-teal';
  if ((fromGroup === 'coral' && toGroup === 'red') || 
      (fromGroup === 'red' && toGroup === 'coral')) return 'vs-gradient-coral-red';
  
  // If all else fails, return a default gradient
  return 'vs-btn-primary-gradient'; // A reasonable default
}

// Helper function to determine if a path should be excluded
function shouldExclude(filePath) {
  return config.exclude.some(excludePattern => 
    filePath.includes(path.sep + excludePattern + path.sep) || 
    filePath.endsWith(path.sep + excludePattern));
}

// Helper function to process tailwind gradients
function processTailwindGradients(content) {
  let newContent = content;
  let replacedCount = 0;
  let unmatched = [];
  
  // Process three-color gradients first
  newContent = newContent.replace(tailwindThreeColorGradientPattern, (match, direction, fromClass, fromColor, viaClass, viaColor, toClass, toColor) => {
    // Three-color gradients are more complex, so we'll save them for manual review
    unmatched.push({
      gradient: match,
      components: [fromColor, viaColor, toColor]
    });
    return match; // Keep original for now
  });
  
  // Then process two-color gradients
  newContent = newContent.replace(tailwindGradientPattern, (match, direction, fromClass, fromColor, toClass, toColor) => {
    // Extract direction component from bg-gradient-to-xxx
    const dir = direction.replace('bg-gradient-to-', '');
    
    // Find suitable replacement class
    const replacementClass = findSimilarGradient(fromColor, toColor, dir);
    if (replacementClass) {
      replacedCount++;
      return replacementClass;
    } else {
      unmatched.push({
        gradient: match,
        components: [fromColor, toColor]
      });
      return match; // Keep original if no match
    }
  });
  
  return { 
    content: newContent, 
    replacedCount, 
    unmatched 
  };
}

// Helper function to process a file
function processFile(filePath) {
  if (shouldExclude(filePath)) return;

  const ext = path.extname(filePath);
  if (!config.extensions.includes(ext)) return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    stats.filesProcessed++;

    // Check for replacements
    let newContent = content;
    let fileChanged = false;
    let replacementsInFile = 0;

    // Process regular replacements
    replacements.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        fileChanged = true;
        replacementsInFile += matches.length;
        newContent = newContent.replace(pattern, replacement);
      }
    });
    
    // Process Tailwind gradients
    const { content: gradientProcessedContent, replacedCount, unmatched } = processTailwindGradients(newContent);
    if (replacedCount > 0) {
      fileChanged = true;
      replacementsInFile += replacedCount;
      stats.tailwindGradientsReplaced += replacedCount;
      newContent = gradientProcessedContent;
    }
    
    // Add unmatched gradients to our list
    if (unmatched.length > 0) {
      stats.unmatchedGradients.push(...unmatched.map(u => ({ file: filePath, ...u })));
    }

    // Look for inline gradient patterns that need manual review
    inlineGradientPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          stats.gradientMatches++;
          stats.gradientsFound.push({
            file: filePath,
            gradient: match
          });
        });
      }
    });

    // Update stats
    if (fileChanged) {
      stats.filesChanged++;
      stats.replacementsCount += replacementsInFile;

      // Log changes
      if (config.logLevel >= 2) {
        console.log(`🔄 Changed: ${filePath} (${replacementsInFile} replacements)`);
      }

      // Make actual changes if specified
      if (config.makeChanges) {
        // Create backup if configured
        if (config.createBackups) {
          fs.writeFileSync(`${filePath}.backup`, content);
        }
        
        // Write changes
        fs.writeFileSync(filePath, newContent);
      }
    } else if (config.logLevel >= 3) {
      console.log(`✓ Checked: ${filePath} (no changes)`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err);
  }
}

// Recursive function to process directories
function processDirectory(dirPath) {
  if (shouldExclude(dirPath)) return;
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else {
        processFile(fullPath);
      }
    }
  } catch (err) {
    console.error(`❌ Error processing directory ${dirPath}:`, err);
  }
}

// Main function
function main() {
  console.log('🔍 Starting CSS variable replacement...');
  console.log(`👉 Mode: ${config.makeChanges ? 'LIVE' : 'DRY RUN'}\n`);
  
  const startTime = Date.now();
  
  // Process each included directory
  config.includeDirs.forEach(dir => {
    const dirPath = path.resolve(dir);
    if (fs.existsSync(dirPath)) {
      processDirectory(dirPath);
    } else {
      console.warn(`⚠️ Directory not found: ${dirPath}`);
    }
  });
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // Print summary
  console.log('\n📊 Summary:');
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files changed: ${stats.filesChanged}`);
  console.log(`CSS variable replacements: ${stats.replacementsCount - stats.tailwindGradientsReplaced}`);
  console.log(`Tailwind gradients replaced: ${stats.tailwindGradientsReplaced}`);
  console.log(`Inline gradients found: ${stats.gradientMatches}`);
  console.log(`Time taken: ${duration} seconds`);
  
  // Print tailwind gradients that couldn't be automatically matched
  if (stats.unmatchedGradients.length > 0) {
    console.log('\n⚠️ Tailwind gradients requiring manual review:');
    
    // Group by file for cleaner output
    const fileGroups = {};
    stats.unmatchedGradients.forEach(({ file, gradient, components }) => {
      if (!fileGroups[file]) fileGroups[file] = [];
      fileGroups[file].push({ gradient, components });
    });
    
    Object.entries(fileGroups).forEach(([file, gradients]) => {
      console.log(`\nFile: ${file}`);
      gradients.forEach((item, i) => {
        console.log(`  ${i+1}. ${item.gradient}`);
        console.log(`     Colors: ${item.components.join(', ')}`);
        console.log(`     Suggested: Replace with an appropriate gradient class from your CSS`);
      });
    });
  }
  
  // Print inline gradient findings
  if (stats.gradientsFound.length > 0) {
    console.log('\n🎨 Inline gradients requiring manual review:');
    
    // Group by file for cleaner output
    const fileGroups = {};
    stats.gradientsFound.forEach(({ file, gradient }) => {
      if (!fileGroups[file]) fileGroups[file] = [];
      fileGroups[file].push(gradient);
    });
    
    Object.entries(fileGroups).forEach(([file, gradients]) => {
      console.log(`\nFile: ${file}`);
      gradients.forEach((gradient, i) => {
        console.log(`  ${i+1}. ${gradient.slice(0, 100)}${gradient.length > 100 ? '...' : ''}`);
      });
    });
    
    console.log('\n💡 Suggestion: Replace these gradients with appropriate CSS classes');
  }
  
  console.log('\n✅ Process completed!');
}

// Run the script
main();