#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const CSS_FILE = path.join(ROOT_DIR, 'src/app/globals.css');

console.log('Implementing comprehensive theme fix...');

try {
  let cssContent = fs.readFileSync(CSS_FILE, 'utf8');
  
  // PART 1: Fix CSS architecture issues
  
  // 1. Make theme variables use explicit colors rather than references to other variables
  // 2. Use theme variables consistently across the stylesheet
  // 3. Add !important to theme variables to ensure they override competing styles
  
  // First, extract direct color values for light and dark mode
  const lightBgColor = cssContent.match(/--bg-cream:\s*([^;]+);/)?.[1]?.trim() || 'oklch(0.96 0.02 85)';
  const lightBgDarkerColor = cssContent.match(/--bg-cream-darker:\s*([^;]+);/)?.[1]?.trim() || 'oklch(0.94 0.03 80)';
  const lightTextColor = cssContent.match(/--text-navy:\s*([^;]+);/)?.[1]?.trim() || 'oklch(0.30 0.03 230)';
  
  const darkBgColor = cssContent.match(/--bg-navy:\s*([^;]+);/)?.[1]?.trim() || 'oklch(0.16 0.03 235)';
  const darkBgDarkerColor = cssContent.match(/--bg-navy-darker:\s*([^;]+);/)?.[1]?.trim() || 'oklch(0.12 0.02 235)';
  const darkTextColor = 'white';
  
  // Create root section with direct color assignments
  const rootThemeVars = `
  /* Theme-aware variables - LIGHT MODE */
  --theme-bg-primary: ${lightBgColor} !important;
  --theme-bg-secondary: ${lightBgDarkerColor} !important;
  --theme-bg-surface: white !important;
  --theme-text-primary: ${lightTextColor} !important;
  --theme-text-secondary: rgba(18, 46, 59, 0.8) !important;
  --theme-text-tertiary: rgba(18, 46, 59, 0.6) !important;
  --theme-gradient-start: white !important;
  --theme-gradient-end: ${lightBgColor} !important;
  --theme-border: rgba(0, 0, 0, 0.1) !important;
  `;
  
  // Create dark mode section with direct color assignments
  const darkThemeVars = `
    /* Theme-aware variables - DARK MODE */
    --theme-bg-primary: ${darkBgColor} !important;
    --theme-bg-secondary: ${darkBgDarkerColor} !important;
    --theme-bg-surface: ${darkBgColor} !important;
    --theme-text-primary: ${darkTextColor} !important;
    --theme-text-secondary: rgba(255, 255, 255, 0.8) !important;
    --theme-text-tertiary: rgba(255, 255, 255, 0.6) !important;
    --theme-gradient-start: ${darkBgColor} !important;
    --theme-gradient-end: ${darkBgDarkerColor} !important;
    --theme-border: rgba(255, 255, 255, 0.1) !important;
  `;
  
  // Replace or insert the root theme variables
  const rootSectionRegex = /:root\s*{([^}]*)}/s;
  const darkModeSectionRegex = /\.dark,\s*\[data-theme="dark"\]\s*{([^}]*)}/s;
  
  if (rootSectionRegex.test(cssContent)) {
    const rootMatch = cssContent.match(rootSectionRegex);
    const updatedRootContent = rootMatch[1] + rootThemeVars;
    cssContent = cssContent.replace(rootSectionRegex, `:root {\n${updatedRootContent}\n}`);
  } else {
    console.error('Could not find root section in CSS');
  }
  
  if (darkModeSectionRegex.test(cssContent)) {
    const darkMatch = cssContent.match(darkModeSectionRegex);
    const updatedDarkContent = darkMatch[1] + darkThemeVars;
    cssContent = cssContent.replace(darkModeSectionRegex, `.dark, [data-theme="dark"] {\n${updatedDarkContent}\n}`);
  } else {
    console.error('Could not find dark mode section in CSS');
  }
  
  // PART 2: Create utility classes for backgrounds and gradients
  
  // Background utility classes
  const bgUtilityClasses = `
/* Theme-aware background utility classes */
.bg-theme-primary {
  background-color: var(--theme-bg-primary) !important;
}

.bg-theme-secondary {
  background-color: var(--theme-bg-secondary) !important;
}

.bg-theme-surface {
  background-color: var(--theme-bg-surface) !important;
}

/* Theme-aware gradient utility classes */
.bg-theme-gradient {
  background: linear-gradient(to bottom right, var(--theme-gradient-start), var(--theme-gradient-end)) !important;
}

.bg-theme-gradient-primary {
  background: linear-gradient(to right, var(--theme-primary, var(--primary-orange)), var(--theme-primary-hover, var(--primary-orange-hover))) !important;
}

.bg-theme-gradient-secondary {
  background: linear-gradient(to right, var(--theme-accent-secondary, var(--secondary-teal)), var(--theme-accent-secondary-hover, var(--secondary-teal-hover))) !important;
}

/* Theme-aware text utility classes */
.text-theme-primary {
  color: var(--theme-text-primary) !important;
}

.text-theme-secondary {
  color: var(--theme-text-secondary) !important;
}

.text-theme-tertiary {
  color: var(--theme-text-tertiary) !important;
}

/* Theme-aware border utility classes */
.border-theme-border {
  border-color: var(--theme-border) !important;
}
`;
  
  // Append utility classes
  cssContent += bgUtilityClasses;
  
  // Write updated CSS
  fs.writeFileSync(CSS_FILE, cssContent, 'utf8');
  console.log('Theme fix successfully applied!');
  
  // PART 3: Fix components with prop warnings
  const VS_BG_PATH = path.join(ROOT_DIR, 'src/components/ui/vs-background.tsx');
  const VS_TEXT_PATH = path.join(ROOT_DIR, 'src/components/ui/vs-text.tsx');
  
  if (fs.existsSync(VS_BG_PATH)) {
    try {
      let bgContent = fs.readFileSync(VS_BG_PATH, 'utf8');
      
      // Fix VSBackground to properly filter out custom props
      bgContent = bgContent.replace(
        /return \(\s*<Component\s*ref={ref}\s*className={`\${background} \${className}`}\s*{...props}\s*>/s,
        `// Filter out non-DOM props before passing to the component
    const { lightBg, darkBg, ...domProps } = props;
    
    return (
      <Component
        ref={ref}
        className={\`\${background} \${className}\`}
        {...domProps}>`
      );
      
      fs.writeFileSync(VS_BG_PATH, bgContent, 'utf8');
      console.log('Fixed vs-background.tsx component');
    } catch (error) {
      console.error('Error fixing vs-background.tsx:', error);
    }
  }
  
  if (fs.existsSync(VS_TEXT_PATH)) {
    try {
      let textContent = fs.readFileSync(VS_TEXT_PATH, 'utf8');
      
      // Fix VSGradientText to properly filter out custom props
      textContent = textContent.replace(
        /const Component = as \|\| variant;/,
        `const Component = as || variant;
  
  // Filter out non-DOM props
  const { fromColor, toColor, darkFromColor, darkToColor, gradientType, ...domProps } = props;`
      );
      
      // Also update the return statement to use the filtered props
      textContent = textContent.replace(
        /{...props}/g,
        '{...domProps}'
      );
      
      fs.writeFileSync(VS_TEXT_PATH, textContent, 'utf8');
      console.log('Fixed vs-text.tsx component');
    } catch (error) {
      console.error('Error fixing vs-text.tsx:', error);
    }
  }
  
  console.log('All fixes applied successfully!');
} catch (error) {
  console.error('Error applying theme fixes:', error);
}