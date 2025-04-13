/**
 * Explicit Image Import Utility
 * 
 * This utility explicitly imports images from specific directories,
 * ensuring they're properly processed by Vite. Use this for avatar images
 * or other folders of images that need to be loaded dynamically.
 */

// Import Clash brand assets explicitly
import clashWordmarkLight from '../assets/Clash-Wordmark-Light-for-Dark.png';
import clashOneLineLight from '../assets/Clash-Logo-One-Line-Light-for-Dark.png';
import reactLogo from '../assets/react.svg';

// Import creator avatars explicitly from the paths in course-utils.tsx
// Note: These paths need to match exactly with those in course-utils.tsx
import chrisDonnelly from '../assets/main/Clients-webp-300px/Chris_Donnelly.webp';
import charlotteMair from '../assets/main/Clients-webp-300px/Charlotte_mair.webp';
import jamesWatt from '../assets/main/Clients-webp-300px/James_Watt.webp';
import benAskins from '../assets/main/Clients-webp-300px/Ben_Askins.webp';
import jodenClash from '../assets/main/Clients-webp-300px/Joden_Clash.webp';
import jordan2 from '../assets/main/Clients-webp-300px/Jordan2.webp'; // Fixed filename

// Create maps for each image category
export const brandImages = {
  'Clash-Wordmark-Light-for-Dark': clashWordmarkLight,
  'Clash-Logo-One-Line-Light-for-Dark': clashOneLineLight,
  'react': reactLogo
};

// Map creator avatars by both filename and full path
// This allows for lookups using either the filename or the full path
export const avatarImages = {
  // By filename
  'Chris_Donnelly': chrisDonnelly,
  'Charlotte_mair': charlotteMair,
  'James_Watt': jamesWatt,
  'Ben_Askins': benAskins,
  'Joden_Clash': jodenClash,
  'Jordan2': jordan2,
  'Jordan_Schwarzenberger': jordan2, // Map the missing file to Jordan2
  
  // By avatar path as used in course-utils.tsx
  'src/assets/main/Clients-webp-300px/Chris_Donnelly.webp': chrisDonnelly,
  '/assets/main/Clients-webp-300px/Charlotte_mair.webp': charlotteMair,
  'assets/main/Clients-webp-300px/James_Watt.webp': jamesWatt,
  '/assets/main/Clients-webp-300px/Ben_Askins.webp': benAskins,
  '/assets/main/Clients-webp-300px/Joden_Clash.webp': jodenClash,
  '/assets/main/Clients-webp-300px/Jordan_Schwarzenberger.webp': jordan2 // Map to the actual file
};

/**
 * Find an image by its basename (filename without extension)
 * @param {string} basename - The filename without extension
 * @returns {string|undefined} - The image URL or undefined if not found
 */
export function findImageByBasename(basename) {
  // Check if the basename is a full path first
  if (avatarImages[basename]) {
    return avatarImages[basename];
  }
  
  // Check in brand images
  if (brandImages[basename]) {
    return brandImages[basename];
  }
  
  // Try to extract just the filename if it's a path
  const filenameMatch = basename.match(/([^/]+)(?:\.\w+)?$/);
  if (filenameMatch && filenameMatch[1] && avatarImages[filenameMatch[1]]) {
    return avatarImages[filenameMatch[1]];
  }
  
  // Not found
  return undefined;
}

/**
 * Register these images with the image mapper
 * @param {Function} addPublicImage - The addPublicImage function from imageMap.js
 */
export function registerWithImageMapper(addPublicImage) {
  // Register brand images
  Object.entries(brandImages).forEach(([key, url]) => {
    addPublicImage(key, url);
  });
  
  // Register avatar images
  Object.entries(avatarImages).forEach(([key, url]) => {
    addPublicImage(key, url);
  });
  
  console.log('Explicitly imported images registered with image mapper');
}

export default {
  brandImages,
  avatarImages,
  findImageByBasename,
  registerWithImageMapper
}; 