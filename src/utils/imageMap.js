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

/**
 * Get team member images with rich metadata for dynamic display
 * @param {string} memberName - Name of team member (Joden, Alex, Tia, Aydan)
 * @param {Object} options - Options for image filtering/sorting
 * @param {number} options.limit - Maximum number of images to return
 * @param {boolean} options.includeShared - Include images with multiple people
 * @param {boolean} options.randomize - Randomize the order of images
 * @returns {Array} Array of image objects with metadata
 */
const getTeamImageCollection = (memberName, options = {}) => {
  const {
    limit = 20,
    includeShared = true,
    randomize = true
  } = options;
  
  // Standardize member name for matching
  const memberNameLower = memberName.toLowerCase();
  
  // Get all team images from the All-Team-Images directory
  const allTeamImagesDir = getAllInDirectory('main')?.['Meet_The_Team-webp']?.['All-Team-Images'] || {};
  
  // Convert to array for filtering - filter out entries with problematic filenames like question marks
  const allImages = Object.entries(allTeamImagesDir)
    .filter(([key]) => {
      // Filter out problematic filenames with characters that might cause issues
      return !key.includes('?') && !key.includes('#');
    })
    .map(([key, url]) => ({
      key,
      url,
    // Check if this image belongs primarily to this team member
    isPrimary: key.toLowerCase().includes(memberNameLower),
    // Check if this image includes this team member at all
    includes: key.toLowerCase().includes(memberNameLower),
    // Check if image includes multiple team members
    isShared: ['joden', 'alex', 'tia', 'aydan'].filter(name => 
      name !== memberNameLower && key.toLowerCase().includes(name)
    ).length > 0,
    // Estimate size category based on image name hints
    sizeHint: key.includes('crop') ? 'small' : 
              key.includes('full') ? 'large' : 'medium'
  }));
  
  // Filter based on team member and options
  let filteredImages = allImages.filter(img => {
    // Always include primary images of this team member
    if (img.isPrimary) return true;
    
    // Include shared images if option is enabled
    if (includeShared && img.includes) return true;
    
    return false;
  });
  
  // Sort by relevance (primary images first, then shared)
  filteredImages.sort((a, b) => {
    // Primary images come first
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    
    // Non-shared images come before shared
    if (!a.isShared && b.isShared) return -1;
    if (a.isShared && !b.isShared) return 1;
    
    return 0;
  });
  
  // Randomize if requested
  if (randomize) {
    // Keep first 3 most relevant images at the top
    const topImages = filteredImages.slice(0, 3);
    const restImages = filteredImages.slice(3);
    
    // Shuffle the rest
    for (let i = restImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restImages[i], restImages[j]] = [restImages[j], restImages[i]];
    }
    
    filteredImages = [...topImages, ...restImages];
  }
  
  // Apply limit
  if (limit > 0 && filteredImages.length > limit) {
    filteredImages = filteredImages.slice(0, limit);
  }
  
  // Format result with metadata for UI presentation
  return filteredImages.map((img, index) => {
    // Calculate suggested display properties based on image characteristics
    // Higher values for more visible and larger images
    let speed = img.isPrimary ? 0.95 : 0.88 + (Math.random() * 0.1); // Less variation (was 0.15)
    let opacity = img.isPrimary ? 1 : 0.85 + (Math.random() * 0.15); // Much higher base opacity (was 0.6)
    let scale = img.isPrimary ? 1.2 : 0.9 + (Math.random() * 0.3); // Larger overall scaling (was 0.7)
    let zIndex = img.isPrimary ? 5 : 2 + Math.floor(Math.random() * 3);
    
    // Adjust based on size hint
    if (img.sizeHint === 'small') {
      scale *= 0.8;
      speed = Math.min(1.1, speed * 1.2);
    } else if (img.sizeHint === 'large') {
      scale *= 1.2;
      speed = Math.max(0.8, speed * 0.9);
      zIndex = Math.max(1, zIndex - 1);
    }
    
    // Create a more dynamic "falling" effect with strategic placement
    // Keep images away from the center content area
    
    // Determine "lane" - keep images primarily on the sides
    const lane = Math.floor(Math.random() * 10); // 0-9
    let horizontalPosition;
    let horizontalVariation = Math.random() * 10; // 0-10% variation
    let opacityFactor = 1.0; // Default full opacity multiplier
    
    if (lane < 4) {
      // Left side - 30% chance
      horizontalPosition = horizontalVariation + 5; // 5-15% from left
      opacityFactor = 1.0; // Full opacity for side images
    } else if (lane >= 6) {
      // Right side - 30% chance
      horizontalPosition = 85 - horizontalVariation; // 75-85% from left (i.e., 15-25% from right)
      opacityFactor = 1.0; // Full opacity for side images
    } else {
      // Middle areas - 40% chance, but with strategic placement
      if (lane === 3 || lane === 4) {
        // Left-center - 20% chance
        horizontalPosition = 20 + (horizontalVariation * 1.5); // 20-35% from left
        opacityFactor = 0.85; // Slightly reduced opacity
      } else if (lane === 5 || lane === 6) {
        // Right-center - 20% chance
        horizontalPosition = 65 - (horizontalVariation * 1.5); // 50-65% from left
        opacityFactor = 0.85; // Slightly reduced opacity
      } else {
        // True center (should be rare due to lane distribution) - excluded from lanes
        horizontalPosition = 40 + (Math.random() * 20); // 40-60% (center)
        opacityFactor = 0.7; // Much lower opacity for center images
      }
    }
    
    // Create vertical "falling" effect with different speeds
    // Images higher in the view (lower top %) will move faster when scrolling
    const verticalPosition = Math.random() * 80 + 10; // 10-90% from top
    
    // Calculate speed based on vertical position
    // Higher images (smaller top %) move faster
    const speedMultiplier = 1 - (verticalPosition / 100); // 0.1 to 0.9
    
    const position = {
      top: verticalPosition,
      left: horizontalPosition,
      rotate: (index % 2 === 0 ? 1 : -1) * (Math.random() * 5 + 2), // More rotation for dynamic feel
      speedMultiplier: 0.8 + (speedMultiplier * 0.4), // Speed between 0.8-1.2
      opacityFactor: opacityFactor // Apply strategic opacity
    };
    
    return {
      url: img.url,
      key: img.key,
      isPrimary: img.isPrimary,
      isShared: img.isShared,
      // Apply speed based on vertical position for "falling" effect
      speed: speed * position.speedMultiplier,
      // Apply strategic opacity based on image position
      opacity: opacity * position.opacityFactor,
      scale,
      zIndex,
      position,
      // Direction alternates between team members for visual variety
      direction: index % 2 === 0 ? "up" : "down"
    };
  });
};

// Get halftone image for a team member
const getTeamMemberHalftone = (memberName) => {
  // Try direct match in the member's specific folder
  const directPath = getImage('main', 'Meet_The_Team-webp', memberName, `${memberName}-Halftone`);
  if (directPath) return directPath;
  
  // Try at the root of Meet_The_Team-webp
  const rootPath = getImage('main', 'Meet_The_Team-webp', `${memberName}-Halftone`);
  if (rootPath) return rootPath;
  
  // Fallback
  return null;
};

// Export utility functions and maps
export {
  getImage,
  getClashLogos,
  addPublicImage,
  getAllImageKeys,
  getAllInDirectory,
  getTeamImageCollection,
  getTeamMemberHalftone,
  imageMap
}; 