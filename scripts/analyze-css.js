const fs = require('fs');
const path = require('path');

console.log('Starting CSS analysis...');

// Read the CSS file
const cssPath = path.join(__dirname, '../src/app/globals.css');
let css;
try {
  css = fs.readFileSync(cssPath, 'utf8');
  console.log(`Read ${css.length} bytes from globals.css`);
} catch (error) {
  console.error(`Error reading CSS file: ${error.message}`);
  process.exit(1);
}

// Extract and catalog all theme variable definitions
const themeVars = {};
const varPattern = /--theme-[a-zA-Z0-9-]+\s*:\s*[^;]+;/g;
let match;
let count = 0;
while ((match = varPattern.exec(css)) !== null) {
  count++;
  const [fullDeclaration] = match;
  const [name, value] = fullDeclaration.split(':').map(s => s.trim());
  const cleanValue = value.replace(';', '').trim();
  
  if (!themeVars[name]) themeVars[name] = [];
  themeVars[name].push(cleanValue);
}

console.log(`Found ${count} theme variable declarations for ${Object.keys(themeVars).length} unique variables`);

// Extract and catalog all theme-aware class definitions
const themeClasses = {};
const classPattern = /\.([\w-]+)\s*\{([^}]+)\}/g;
count = 0;
while ((match = classPattern.exec(css)) !== null) {
  const [_, className, declaration] = match;
  if (className.includes('theme-')) {
    count++;
    if (!themeClasses[className]) themeClasses[className] = [];
    themeClasses[className].push(declaration.trim());
  }
}

console.log(`Found ${count} theme-aware class declarations for ${Object.keys(themeClasses).length} unique classes`);

// Find duplicates
let duplicateCount = 0;
Object.entries(themeClasses).forEach(([className, declarations]) => {
  if (declarations.length > 1) {
    duplicateCount++;
    console.log(`Duplicate class: ${className} (${declarations.length} occurrences)`);
  }
});

console.log(`Found ${duplicateCount} classes with duplicate declarations`);

// Count important usage
const importantCount = (css.match(/!important/g) || []).length;
console.log(`Found ${importantCount} uses of !important`);

// Count gradient declarations
const gradientCount = (css.match(/linear-gradient/g) || []).length;
console.log(`Found ${gradientCount} gradient declarations`);

// Count oklch gradient syntax issues
const oklchGradientCount = (css.match(/linear-gradient\(in\s+oklch/g) || []).length;
console.log(`Found ${oklchGradientCount} oklch gradient syntax issues`);

// Find text gradient issues (missing properties)
let textGradientIssues = 0;
const gradientTextPattern = /\.([\w-]*(text-gradient|gradient-text)[\w-]*)\s*\{([^}]+)\}/g;
while ((match = gradientTextPattern.exec(css)) !== null) {
  const [_, className, __, declaration] = match;
  if (declaration.includes('linear-gradient') && 
     (!declaration.includes('background-clip') || !declaration.includes('-webkit-background-clip'))) {
    textGradientIssues++;
    console.log(`Text gradient issue: ${className} missing background-clip properties`);
  }
}

console.log(`Found ${textGradientIssues} text gradient issues (missing properties)`);

// Output detailed report
const report = {
  stats: {
    totalVariables: Object.keys(themeVars).length,
    totalClasses: Object.keys(themeClasses).length,
    duplicateClasses: duplicateCount,
    importantUsage: importantCount,
    gradientDeclarations: gradientCount,
    oklchGradientIssues: oklchGradientCount,
    textGradientIssues: textGradientIssues,
    fileSize: css.length
  },
  themeVars,
  themeClasses
};

fs.writeFileSync(path.join(__dirname, '../theme-analysis.json'), JSON.stringify(report, null, 2));
console.log(`Analysis complete. Results saved to theme-analysis.json`);