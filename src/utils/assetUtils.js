/**
 * Asset Utilities
 * 
 * This utility provides glob-like pattern matching for assets,
 * making it easy to reference images and other assets consistently.
 */

// Base path to assets directory
const ASSETS_BASE_PATH = '/src/assets/';

// Main logo assets
const LOGOS = {
  wordmark: {
    light: `${ASSETS_BASE_PATH}Clash-Wordmark-Light-for-Dark.png`,
    // Add dark version if available
  },
  oneLine: {
    light: `${ASSETS_BASE_PATH}Clash-Logo-One-Line-Light-for-Dark.png`,
    // Add dark version if available
  },
  react: `${ASSETS_BASE_PATH}react.svg`
};

/**
 * Maps all assets in a given directory
 * @param {string} directory - Subdirectory within assets
 * @returns {object} Mapped assets
 */
const mapAssetsInDirectory = (directory) => {
  // In a real implementation, this would dynamically import
  // all files from the directory using Vite's import.meta.glob
  
  // Example stub implementation 
  const directoryPath = `${ASSETS_BASE_PATH}${directory}/`;
  
  // This is where we'd use import.meta.glob in Vite to get all files
  // const files = import.meta.glob('/src/assets/main/*');
  
  // For now, return a placeholder
  return {
    getPath: (filename) => `${directoryPath}${filename}`
  };
};

/**
 * Get asset path by glob-like pattern
 * @param {string} pattern - Pattern to match (e.g., "main/*.png")
 * @returns {string[]} Array of matching asset paths
 */
const getAssetsByPattern = (pattern) => {
  // Parse pattern into directory and file pattern
  const [directory, filePattern] = pattern.split('/');
  
  // In a real implementation with Vite, we could do:
  // const files = import.meta.glob(`/src/assets/${pattern}`);
  // return Object.keys(files);
  
  // For now, this is a placeholder
  console.log(`Looking for assets matching: ${pattern}`);
  return [`${ASSETS_BASE_PATH}${pattern}`];
};

/**
 * Get a single asset path
 * @param {string} path - Path relative to assets directory
 * @returns {string} Full asset path
 */
const getAssetPath = (path) => {
  return `${ASSETS_BASE_PATH}${path}`;
};

/**
 * Get logo by type and variant
 * @param {string} type - Logo type (wordmark, oneLine, react)
 * @param {string} variant - Variant (light, dark)
 * @returns {string} Logo path
 */
const getLogo = (type = 'wordmark', variant = 'light') => {
  if (type === 'react') return LOGOS.react;
  return LOGOS[type]?.[variant] || LOGOS.wordmark.light;
};

// Map main directory assets
const mainAssets = mapAssetsInDirectory('main');

export {
  getAssetPath,
  getAssetsByPattern,
  getLogo,
  mainAssets,
  LOGOS,
  ASSETS_BASE_PATH
}; 