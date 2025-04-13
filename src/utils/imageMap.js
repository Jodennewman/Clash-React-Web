/**
 * Image Map Utility for Vite/React projects
 * 
 * This utility leverages Vite's import.meta.glob feature to dynamically
 * import and manage all images in the assets directory.
 */

// Import all images from assets directory with an explicit pattern
// The 'eager: true' option ensures they're included in the bundle immediately
const allImages = import.meta.glob([
  '/src/assets/*.{png,jpg,jpeg,svg,gif,webp}',
  '/src/assets/**/*.{png,jpg,jpeg,svg,gif,webp}'
], { eager: true });

// Log all available images for debugging
console.log('Available images:', Object.keys(allImages));

// Create a more friendly object structure from the imported images
const imageMap = {};

// Process all imported images and organize them by path segments
Object.entries(allImages).forEach(([path, module]) => {
  // Extract the filename without extension
  const fileName = path.split('/').pop().split('.')[0];
  
  // Extract the directory path after /assets/
  const pathSegments = path.replace('/src/assets/', '').split('/');
  // Remove the filename from the segments
  if (pathSegments.length > 0) {
    // If the last segment contains a dot, it's a filename
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment.includes('.')) {
      pathSegments.pop();
    }
  }

  // The full URL of the processed image
  const imageUrl = module.default;
  
  // Create a flat map for direct filename access
  imageMap[fileName] = imageUrl;
  
  // If there are directory segments, create a nested structure
  if (pathSegments.length > 0 && !pathSegments[0].includes('.')) {
    let current = imageMap;
    
    // Create nested objects for each directory
    pathSegments.forEach(segment => {
      if (!current[segment]) {
        current[segment] = {};
      }
      current = current[segment];
    });
    
    // Store the image URL at the final level
    current[fileName] = imageUrl;
  }
});

// Debug: log the structured image map
console.log('Structured image map:', imageMap);

/**
 * Get image by direct filename or path segments
 * @param {...string} pathSegments - Path segments or filename
 * @returns {string|null} Image URL or null if not found
 */
const getImage = (...pathSegments) => {
  // Special case: if only one argument and it's directly in the root map
  if (pathSegments.length === 1 && imageMap[pathSegments[0]]) {
    return imageMap[pathSegments[0]];
  }
  
  // Navigate through the nested structure
  let current = imageMap;
  for (const segment of pathSegments) {
    if (!current[segment]) {
      console.warn(`Image segment not found: ${segment} in path ${pathSegments.join('/')}`);
      return null;
    }
    current = current[segment];
  }
  
  // If it's a string URL, return it
  if (typeof current === 'string') {
    return current;
  }
  
  console.warn(`No image found at path: ${pathSegments.join('/')}`);
  return null;
};

/**
 * Get all Clash logos
 * @returns {Object} Object with all Clash logos
 */
const getClashLogos = () => {
  return {
    wordmark: {
      light: getImage('Clash-Wordmark-Light-for-Dark') || imageMap['Clash-Wordmark-Light-for-Dark']
    },
    oneLine: {
      light: getImage('Clash-Logo-One-Line-Light-for-Dark') || imageMap['Clash-Logo-One-Line-Light-for-Dark']
    }
  };
};

/**
 * Add a public URL image that's not in the assets directory
 * @param {string} id - Identifier for the image
 * @param {string} url - Public URL to the image
 */
const addPublicImage = (id, url) => {
  imageMap[id] = url;
};

/**
 * Get a list of all available image keys at the root level
 * @returns {string[]} Array of image keys
 */
const getAllImageKeys = () => {
  return Object.keys(imageMap).filter(key => typeof imageMap[key] === 'string');
};

/**
 * Get all images in a specific directory
 * @param {string} directory - Directory name
 * @returns {Object} Object containing all images in that directory
 */
const getAllInDirectory = (directory) => {
  return imageMap[directory] || {};
};

// Export utility functions and maps
export {
  getImage,
  getClashLogos,
  addPublicImage,
  getAllImageKeys,
  getAllInDirectory,
  imageMap
}; 