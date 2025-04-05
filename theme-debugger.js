// Copy this entire code into your browser console when viewing your app
// This will help diagnose exactly what's happening with the CSS variables

(function() {
  console.clear();
  console.log('==== VS Theme Variable Debugger ====');
  
  // Get current theme state
  const isDarkTheme = document.documentElement.classList.contains('dark') || 
                     document.documentElement.getAttribute('data-theme') === 'dark';
  console.log(`Current theme: ${isDarkTheme ? 'Dark' : 'Light'}`);
  console.log(`DOM classes: ${document.documentElement.className}`);
  console.log(`data-theme: ${document.documentElement.getAttribute('data-theme')}`);
  
  // Check core background and text variables
  const computedStyle = getComputedStyle(document.documentElement);
  
  const coreVars = [
    '--bg-cream',
    '--bg-navy',
    '--text-navy',
    '--text-cream',
    '--primary-orange',
    '--secondary-teal'
  ];
  
  console.log('\n==== Core CSS Variables ====');
  coreVars.forEach(variable => {
    const value = computedStyle.getPropertyValue(variable).trim();
    console.log(`${variable}: ${value || '(empty)'}`);
  });
  
  // Check theme-aware variables
  const themeVars = [
    '--theme-bg-primary',
    '--theme-bg-secondary',
    '--theme-bg-surface',
    '--theme-text-primary',
    '--theme-text-secondary',
    '--theme-primary',
    '--theme-accent-secondary',
    '--theme-shadow-sm',
    '--theme-shadow-md'
  ];
  
  console.log('\n==== Theme-aware Variables ====');
  themeVars.forEach(variable => {
    const value = computedStyle.getPropertyValue(variable).trim();
    console.log(`${variable}: ${value || '(empty)'}`);
  });
  
  // Analyze variable resolution
  console.log('\n==== Variable Resolution Analysis ====');
  
  function resolveVariable(variable) {
    let value = computedStyle.getPropertyValue(variable).trim();
    const isReference = value.includes('var(--');
    
    if (isReference) {
      console.log(`${variable} → ${value}`);
      
      // Extract referenced variable
      const match = value.match(/var\(--([a-zA-Z0-9-]+)\)/);
      if (match) {
        const referencedVar = '--' + match[1];
        resolveVariable(referencedVar);
      }
    } else {
      console.log(`${variable} = ${value}`);
    }
    
    return value;
  }
  
  // Check resolution path for key theme variables
  console.log('\nResolution path for --theme-bg-primary:');
  resolveVariable('--theme-bg-primary');
  
  console.log('\nResolution path for --theme-bg-secondary:');
  resolveVariable('--theme-bg-secondary');
  
  console.log('\nResolution path for --theme-text-primary:');
  resolveVariable('--theme-text-primary');
  
  // Toggle function for testing
  window.toggleThemeAndDebug = function() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log(`\n==== Toggling theme from ${currentTheme} to ${newTheme} ====`);
    
    // Toggle class and data-attribute
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Wait for CSS to update
    setTimeout(() => {
      console.log('\n==== After Toggle ====');
      const computedStyle = getComputedStyle(document.documentElement);
      
      console.log('\nCore CSS Variables:');
      coreVars.forEach(variable => {
        const value = computedStyle.getPropertyValue(variable).trim();
        console.log(`${variable}: ${value || '(empty)'}`);
      });
      
      console.log('\nTheme-aware Variables:');
      themeVars.forEach(variable => {
        const value = computedStyle.getPropertyValue(variable).trim();
        console.log(`${variable}: ${value || '(empty)'}`);
      });
    }, 100);
  };
  
  console.log('\nTo test theme toggle, call: toggleThemeAndDebug()');
})();