const fs = require('fs');
const path = require('path');

console.log('Starting theme integrity test...');

// Define paths
const modulesDir = path.join(__dirname, '../src/styles/modules');

// Check if modules directory exists
if (!fs.existsSync(modulesDir)) {
  console.error(`Modules directory not found: ${modulesDir}`);
  console.error('Please run the create-modular-css.js script first.');
  process.exit(1);
}

// Get all CSS modules
const modules = fs.readdirSync(modulesDir)
  .filter(file => file.endsWith('.css'))
  .map(file => ({
    name: file,
    path: path.join(modulesDir, file)
  }));

if (modules.length === 0) {
  console.error('No CSS modules found.');
  process.exit(1);
}

console.log(`Found ${modules.length} CSS modules to check.`);

// Find variables module (should be variables.css)
const varsModulePath = modules.find(m => m.name === 'variables.css')?.path;
if (!varsModulePath) {
  console.error('Variables module (variables.css) not found.');
  process.exit(1);
}

// Load variables module content
let varsContent;
try {
  varsContent = fs.readFileSync(varsModulePath, 'utf8');
  console.log(`Read variables module: ${varsContent.length} bytes`);
} catch (error) {
  console.error(`Error reading variables module: ${error.message}`);
  process.exit(1);
}

// Extract all variable definitions
const varDefinitions = new Set();
const varPattern = /--[\w-]+\s*:/g;
let match;
while ((match = varPattern.exec(varsContent)) !== null) {
  const varName = match[0].replace(':', '').trim();
  varDefinitions.add(varName);
}

console.log(`Found ${varDefinitions.size} variable definitions in variables module.`);

// Load dark mode module to check for variable overrides
const darkModeModulePath = modules.find(m => m.name === 'dark-mode.css')?.path;
let darkModeContent = '';
if (darkModeModulePath) {
  try {
    darkModeContent = fs.readFileSync(darkModeModulePath, 'utf8');
    console.log(`Read dark-mode module: ${darkModeContent.length} bytes`);
    
    // Extract dark mode variable overrides
    while ((match = varPattern.exec(darkModeContent)) !== null) {
      const varName = match[0].replace(':', '').trim();
      varDefinitions.add(varName);
    }
  } catch (error) {
    console.warn(`Warning: Could not read dark-mode module: ${error.message}`);
  }
}

// Check all modules for issues
const issues = [];
const varReferences = new Map(); // Track variable usage
const classDefinitions = new Map(); // Track class definitions
const classReferences = new Map(); // Track class usage

// Process each module
modules.forEach(module => {
  try {
    // Skip variables and dark-mode modules as we already processed them
    if (module.name === 'variables.css' || module.name === 'dark-mode.css') {
      return;
    }
    
    const content = fs.readFileSync(module.path, 'utf8');
    
    // Check for variable references
    const varRefPattern = /var\((--[\w-]+)(?:,\s*[^)]+)?\)/g;
    while ((match = varRefPattern.exec(content)) !== null) {
      const varName = match[1];
      
      // Track usage
      if (!varReferences.has(varName)) {
        varReferences.set(varName, new Set());
      }
      varReferences.get(varName).add(module.name);
      
      // Check if variable is defined
      if (!varDefinitions.has(varName)) {
        issues.push({
          type: 'missing-variable',
          name: varName,
          module: module.name,
          message: `Missing variable: ${varName} referenced in ${module.name}`
        });
      }
    }
    
    // Extract class definitions
    const classDefPattern = /\.([\w-]+)\s*\{/g;
    while ((match = classDefPattern.exec(content)) !== null) {
      const className = match[1];
      
      // Skip non-theme classes
      if (!className.includes('theme-')) {
        continue;
      }
      
      // Check for duplicate definitions
      if (!classDefinitions.has(className)) {
        classDefinitions.set(className, new Set());
      }
      
      classDefinitions.get(className).add(module.name);
      
      if (classDefinitions.get(className).size > 1) {
        issues.push({
          type: 'duplicate-class',
          name: className,
          module: module.name,
          modules: Array.from(classDefinitions.get(className)),
          message: `Duplicate class: ${className} defined in multiple modules: ${Array.from(classDefinitions.get(className)).join(', ')}`
        });
      }
    }
    
    // Check for class references (for nested selectors)
    const classRefPattern = /\.([\w-]+)(?:\s+|\s*[,>+~]\s*|\s*:)/g;
    while ((match = classRefPattern.exec(content)) !== null) {
      const className = match[1];
      
      // Skip non-theme classes and the class itself being defined
      if (!className.includes('theme-') || content.includes(`.${className} {`)) {
        continue;
      }
      
      // Track usage
      if (!classReferences.has(className)) {
        classReferences.set(className, new Set());
      }
      classReferences.get(className).add(module.name);
    }
    
  } catch (error) {
    console.error(`Error processing module ${module.name}: ${error.message}`);
  }
});

// Check for unused variables
varDefinitions.forEach(varName => {
  if (!varReferences.has(varName)) {
    issues.push({
      type: 'unused-variable',
      name: varName,
      message: `Unused variable: ${varName} is defined but never used`
    });
  }
});

// Check for undefined classes that are referenced
classReferences.forEach((modules, className) => {
  if (!classDefinitions.has(className)) {
    issues.push({
      type: 'undefined-class',
      name: className,
      modules: Array.from(modules),
      message: `Undefined class: ${className} is referenced in ${Array.from(modules).join(', ')} but never defined`
    });
  }
});

// Generate report
console.log('\n=== Theme Integrity Report ===');
console.log(`Total issues found: ${issues.length}`);

const issueTypes = {
  'missing-variable': issues.filter(i => i.type === 'missing-variable'),
  'duplicate-class': issues.filter(i => i.type === 'duplicate-class'),
  'unused-variable': issues.filter(i => i.type === 'unused-variable'),
  'undefined-class': issues.filter(i => i.type === 'undefined-class')
};

Object.entries(issueTypes).forEach(([type, typeIssues]) => {
  if (typeIssues.length > 0) {
    console.log(`\n${type} issues (${typeIssues.length}):`);
    typeIssues.slice(0, 10).forEach(issue => {
      console.log(`- ${issue.message}`);
    });
    
    if (typeIssues.length > 10) {
      console.log(`  ... and ${typeIssues.length - 10} more`);
    }
  }
});

// Print usage stats
console.log('\n=== Usage Statistics ===');
console.log(`Variables defined: ${varDefinitions.size}`);
console.log(`Variables used: ${varReferences.size}`);
console.log(`Theme classes defined: ${classDefinitions.size}`);
console.log(`Theme classes referenced: ${classReferences.size}`);

// Save the report
const reportPath = path.join(__dirname, '../theme-integrity-report.json');
const report = {
  timestamp: new Date().toISOString(),
  stats: {
    modules: modules.length,
    variablesDefined: varDefinitions.size,
    variablesUsed: varReferences.size,
    classesDefined: classDefinitions.size,
    classesReferenced: classReferences.size,
    totalIssues: issues.length
  },
  issues: {
    missingVariables: issueTypes['missing-variable'].length,
    duplicateClasses: issueTypes['duplicate-class'].length,
    unusedVariables: issueTypes['unused-variable'].length,
    undefinedClasses: issueTypes['undefined-class'].length
  },
  details: issues
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nIntegrity report saved to: ${reportPath}`);

// Determine overall status
const criticalIssues = issueTypes['missing-variable'].length + issueTypes['undefined-class'].length;
const warningIssues = issueTypes['duplicate-class'].length;
const infoIssues = issueTypes['unused-variable'].length;

if (criticalIssues > 0) {
  console.error('\n❌ FAIL: Critical theme integrity issues detected.');
  process.exit(1);
} else if (warningIssues > 0) {
  console.warn('\n⚠️ WARNING: Theme integrity issues detected.');
} else {
  console.log('\n✅ PASS: Theme integrity check passed!');
}