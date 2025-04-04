// Inline Style Converter
// This utility helps you convert competing light/dark mode styles and inline styles to the theme-aware approach

/**
 * Function to convert specific inline style declarations to theme-aware variables
 * @param {string} styleString - The style attribute string to convert
 * @returns {object} Object with theme-aware className and remaining styles
 */
function convertInlineStyles(styleString) {
  // Extract style properties from the string
  const styleProperties = parseStyleString(styleString);
  const themeClassNames = [];
  const remainingStyles = {};
  
  // Process each style property
  for (const [property, value] of Object.entries(styleProperties)) {
    // Check if this property contains a CSS variable
    if (typeof value === 'string' && value.includes('var(--')) {
      const varMatch = value.match(/var\(--([^)]+)\)/);
      if (varMatch) {
        const cssVariable = varMatch[1];
        
        // Convert common properties to theme-aware classes
        if (property === 'backgroundColor' || property === 'background') {
          themeClassNames.push(`bg-[var(--theme-${cssVariable})]`);
        }
        else if (property === 'color') {
          themeClassNames.push(`text-[var(--theme-${cssVariable})]`);
        }
        else if (property === 'borderColor') {
          themeClassNames.push(`border-[var(--theme-${cssVariable})]`);
        }
        else if (property === 'boxShadow') {
          themeClassNames.push(`shadow-theme-${getShadowSize(cssVariable)}`);
        }
        else {
          // For other properties, keep them as inline styles but update to theme variable
          remainingStyles[property] = `var(--theme-${cssVariable})`;
        }
      } else {
        // Keep non-variable styles as is
        remainingStyles[property] = value;
      }
    } else {
      // Keep non-variable styles as is
      remainingStyles[property] = value;
    }
  }
  
  return {
    themeClassNames,
    remainingStyles
  };
}

/**
 * Helper function to parse a style string into an object
 * @param {string} styleString - The style string to parse (from style={{ ... }})
 * @returns {object} Object with style properties
 */
function parseStyleString(styleString) {
  const styleProperties = {};
  
  // Remove curly braces and split by commas and colons
  const cleanedString = styleString.replace(/[{}]/g, '').trim();
  const propertyPairs = cleanedString.split(',');
  
  for (const pair of propertyPairs) {
    const [key, value] = pair.split(':').map(part => part.trim());
    if (key && value) {
      // Convert camelCase property names
      const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      // Remove quotes from string values
      const cleanValue = value.replace(/['"]/g, '');
      styleProperties[camelCaseKey] = cleanValue;
    }
  }
  
  return styleProperties;
}

/**
 * Helper function to determine shadow size from variable name
 * @param {string} shadowVariable - The shadow CSS variable
 * @returns {string} Shadow size (sm, md, lg)
 */
function getShadowSize(shadowVariable) {
  if (shadowVariable.includes('sm')) return 'sm';
  if (shadowVariable.includes('lg')) return 'lg';
  return 'md';
}

/**
 * Convert competing light/dark mode classes to theme-aware approach
 * @param {string} classNameString - The className attribute content
 * @returns {string} Updated className using theme-aware variables
 */
function convertCompetingClasses(classNameString) {
  let updatedClassName = classNameString;
  
  // Pattern for replacing bg-[var(--X)] dark:bg-[var(--Y)]
  const bgPattern = /bg-\[var\(--([^)]+)\)\](?:\s+|\S+)dark:bg-\[var\(--([^)]+)\)\]/g;
  updatedClassName = updatedClassName.replace(bgPattern, (match, lightVar, darkVar) => {
    return `bg-[var(--theme-${getPropertyName(lightVar, darkVar)})]`;
  });
  
  // Pattern for replacing text-[var(--X)] dark:text-[var(--Y)]
  const textPattern = /text-\[var\(--([^)]+)\)\](?:\s+|\S+)dark:text-\[var\(--([^)]+)\)\]/g;
  updatedClassName = updatedClassName.replace(textPattern, (match, lightVar, darkVar) => {
    return `text-[var(--theme-${getPropertyName(lightVar, darkVar)})]`;
  });
  
  // Pattern for replacing border-[var(--X)] dark:border-[var(--Y)]
  const borderPattern = /border-\[var\(--([^)]+)\)\](?:\s+|\S+)dark:border-\[var\(--([^)]+)\)\]/g;
  updatedClassName = updatedClassName.replace(borderPattern, (match, lightVar, darkVar) => {
    return `border-[var(--theme-${getPropertyName(lightVar, darkVar)})]`;
  });
  
  // Pattern for replacing shadow-[...] dark:shadow-[...]
  const shadowPattern = /shadow-\[([^[\]]+)\](?:\s+|\S+)dark:shadow-\[([^[\]]+)\]/g;
  updatedClassName = updatedClassName.replace(shadowPattern, (match, lightShadow, darkShadow) => {
    // Use the shadow utility class instead
    return `shadow-theme-md`;
  });
  
  return updatedClassName;
}

/**
 * Helper function to determine the theme property name from light and dark variables
 * @param {string} lightVar - The light mode variable
 * @param {string} darkVar - The dark mode variable
 * @returns {string} Theme property name
 */
function getPropertyName(lightVar, darkVar) {
  // Common mappings for variable pairs
  const commonMappings = {
    // Background mappings
    'bg-cream:bg-navy': 'bg-primary',
    'bg-cream-darker:bg-navy-darker': 'bg-secondary',
    
    // Text mappings
    'text-navy:text-white': 'text-primary',
    'text-navy:text-cream': 'text-primary',
    
    // Color mappings
    'primary-orange:primary-orange-light': 'primary',
    'secondary-teal:secondary-teal-light': 'accent-secondary',
    'accent-coral:accent-coral-dark': 'accent-tertiary'
  };
  
  const key = `${lightVar}:${darkVar}`;
  
  if (commonMappings[key]) {
    return commonMappings[key];
  }
  
  // If no specific mapping, use a generic approach
  if (lightVar.includes('bg')) return 'bg-primary';
  if (lightVar.includes('text')) return 'text-primary';
  if (lightVar.includes('primary')) return 'primary';
  if (lightVar.includes('secondary')) return 'accent-secondary';
  if (lightVar.includes('accent')) return 'accent-tertiary';
  
  // Default fallback
  return lightVar;
}

/**
 * Process a React component file to convert styles to theme-aware approach
 * @param {string} fileContent - The file content to process
 * @returns {string} Updated file content
 */
function processComponentFile(fileContent) {
  let updatedContent = fileContent;
  
  // Replace inline styles with CSS variables
  const inlineStylePattern = /style=\{\{([^{}]+)\}\}/g;
  updatedContent = updatedContent.replace(inlineStylePattern, (match, styleContent) => {
    // Convert inline styles
    const { themeClassNames, remainingStyles } = convertInlineStyles(styleContent);
    
    // If no theme-aware classes were found, keep the original inline styles
    if (themeClassNames.length === 0) {
      return match;
    }
    
    // Check if there are remaining styles to keep as inline
    const hasRemainingStyles = Object.keys(remainingStyles).length > 0;
    
    // Create className string with theme-aware classes
    const classNameStr = themeClassNames.join(' ');
    
    // Build the result
    if (hasRemainingStyles) {
      // Format remaining styles
      const remainingStylesStr = Object.entries(remainingStyles)
        .map(([key, value]) => `${key}: '${value}'`)
        .join(', ');
      
      // Create both style and className attributes
      return `className="${classNameStr}" style={{${remainingStylesStr}}}`;
    } else {
      // Only return className if no remaining styles
      return `className="${classNameStr}"`;
    }
  });
  
  // Replace competing light/dark mode classes with theme-aware approach
  const classNamePattern = /className="([^"]+)"/g;
  updatedContent = updatedContent.replace(classNamePattern, (match, classContent) => {
    // Skip if this doesn't look like it has competing dark mode classes
    if (!classContent.includes('dark:')) {
      return match;
    }
    
    // Convert competing classes
    const updatedClassName = convertCompetingClasses(classContent);
    return `className="${updatedClassName}"`;
  });
  
  return updatedContent;
}

module.exports = {
  convertInlineStyles,
  convertCompetingClasses,
  processComponentFile
};