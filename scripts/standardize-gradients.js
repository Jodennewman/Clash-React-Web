const fs = require('fs');
const path = require('path');

console.log('Starting gradient standardization...');

// Read the new CSS file (already cleaned up)
const cssPath = path.join(__dirname, '../src/app/globals.css.new');
let css;
try {
  css = fs.readFileSync(cssPath, 'utf8');
  console.log(`Read ${css.length} bytes from globals.css.new`);
} catch (error) {
  console.error(`Error reading CSS file: ${error.message}`);
  process.exit(1);
}

// Count gradients before changes
const originalGradientCount = (css.match(/linear-gradient/g) || []).length;
console.log(`Original gradient count: ${originalGradientCount}`);

// Convert non-standard gradient syntax
let updatedCss = css;

// 1. Fix oklch gradients (using 'in oklch' syntax)
const oklchBefore = (css.match(/linear-gradient\(in\s+oklch/g) || []).length;
updatedCss = updatedCss.replace(/linear-gradient\(in\s+oklch\s+([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 
                            'linear-gradient($1, $2, $3)');
const oklchAfter = (updatedCss.match(/linear-gradient\(in\s+oklch/g) || []).length;
console.log(`Fixed oklch gradient syntax: ${oklchBefore} -> ${oklchAfter} occurrences`);

// 2. Fix text gradients missing properties
const textGradientPattern = /\.([\w-]*(text-gradient|gradient-text|text-theme-gradient)[\w-]*)\s*\{([^}]*background:\s*linear-gradient[^;]*;)([^}]*)\}/g;
let textGradientFixed = 0;

updatedCss = updatedCss.replace(textGradientPattern, (match, className, _, gradientDecl, otherProps) => {
  // Check if the necessary background-clip properties are missing
  if (!match.includes('-webkit-background-clip') || !match.includes('background-clip')) {
    textGradientFixed++;
    return `.${className} {${gradientDecl}${otherProps}
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}`;
  }
  return match;
});

console.log(`Fixed text gradient issues: ${textGradientFixed} occurrences`);

// 3. Standardize gradient directions for better theme switching
// This helps to ensure consistent gradients in light/dark modes

// For light mode, prefer "to bottom right" or "to right" directions
// For dark mode overrides, prefer angle-based directions (135deg, etc.)

// Find theme gradient classes and standardize directions
const themeGradientPattern = /\.(bg-theme-gradient[^{]*)\s*\{([^}]+)\}/g;
let match;
while ((match = themeGradientPattern.exec(updatedCss)) !== null) {
  const [fullDeclaration, className, props] = match;

  // Check if this is using a non-standard direction
  if (props.includes('linear-gradient') && 
      !props.includes('to bottom right') && 
      !props.includes('to right') && 
      !props.includes('135deg') && 
      !props.includes('90deg')) {
    
    // Replace with standard direction
    const updatedProps = props.replace(
      /linear-gradient\(([^,]+),/g, 
      'linear-gradient(to bottom right,'
    );
    
    if (updatedProps !== props) {
      updatedCss = updatedCss.replace(fullDeclaration, `.${className} {${updatedProps}}`);
      console.log(`Standardized direction for ${className}`);
    }
  }
}

// 4. Ensure dark mode gradient overrides use angle-based directions for consistency
const darkModeGradientPattern = /\.dark\s+\.(bg-theme-gradient[^{]*),\s*\[data-theme="dark"\]\s+\.(bg-theme-gradient[^{]*)\s*\{([^}]+)\}/g;
while ((match = darkModeGradientPattern.exec(updatedCss)) !== null) {
  const [fullDeclaration, className1, className2, props] = match;

  // Convert to use angle-based direction if using "to" syntax
  if (props.includes('linear-gradient') && 
      (props.includes('to bottom right') || props.includes('to right'))) {
    
    const updatedProps = props
      .replace(/linear-gradient\(to bottom right,/g, 'linear-gradient(135deg,')
      .replace(/linear-gradient\(to right,/g, 'linear-gradient(90deg,');
    
    if (updatedProps !== props) {
      updatedCss = updatedCss.replace(
        fullDeclaration, 
        `.dark .${className1}, [data-theme="dark"] .${className2} {${updatedProps}}`
      );
      console.log(`Standardized dark mode gradient direction for ${className1}`);
    }
  }
}

// Count gradients after changes
const updatedGradientCount = (updatedCss.match(/linear-gradient/g) || []).length;
console.log(`Updated gradient count: ${updatedGradientCount}`);

// Save the updated CSS
const gradientFixPath = path.join(__dirname, '../src/app/globals.css.gradient-fix');
fs.writeFileSync(gradientFixPath, updatedCss);
console.log(`Gradient-fixed CSS written to ${gradientFixPath}`);

console.log('Gradient standardization complete.');