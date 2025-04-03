// Simple Theme Toggle Functionality
// This script handles dark/light mode toggling system-wide

(function() {
  // Function to set the theme
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store the preference
    localStorage.setItem('clash-theme', theme);
    
    // Update any theme toggle buttons
    updateToggleButtons(theme);
  }
  
  // Function to update all toggle buttons
  function updateToggleButtons(theme) {
    // Find all toggle buttons
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    
    toggleButtons.forEach(button => {
      // Update icon or text if needed
      const darkIcons = button.querySelectorAll('[data-theme-dark]');
      const lightIcons = button.querySelectorAll('[data-theme-light]');
      
      darkIcons.forEach(icon => {
        icon.style.display = theme === 'dark' ? 'block' : 'none';
      });
      
      lightIcons.forEach(icon => {
        icon.style.display = theme === 'dark' ? 'none' : 'block';
      });
    });
  }
  
  // Toggle the theme when any button with data-theme-toggle is clicked
  function setupToggleListeners() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
      });
    });
  }
  
  // Initialize theme based on stored preference or system setting
  function initializeTheme() {
    const storedTheme = localStorage.getItem('clash-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  
  // Setup theme change detection from system preferences
  function setupSystemPreferenceListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', e => {
      // Only apply system preference if no stored preference exists
      if (!localStorage.getItem('clash-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupToggleListeners();
    setupSystemPreferenceListener();
  });
  
  // Run initialization immediately if the DOM is already loaded
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeTheme();
    setupToggleListeners();
    setupSystemPreferenceListener();
  }
})();