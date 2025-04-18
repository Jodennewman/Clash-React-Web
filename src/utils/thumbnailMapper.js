/**
 * Thumbnail Mapper Utility
 * 
 * Companion to imageMap.js that specifically handles thumbnails
 * for course modules and submodules, integrating with course-utils.tsx
 */

import { getImage, addPublicImage } from './imageMap';

// Database thumbnail path mapping - used to convert relative paths in course-utils.tsx
// to proper Vite imports
const DB_THUMBNAIL_BASE = '/assets/main/DataBaseThumbnails/renamed/';
const VIEWS_THUMBNAIL_BASE = '/assets/main/thumbnails-with-views-webp/';

/**
 * Import specific thumbnails from the public directory for module thumbnails
 */
const theAlgorithm = DB_THUMBNAIL_BASE + 'the_algorithm.webp';
const bigPicture = DB_THUMBNAIL_BASE + 'big_picture.webp';
const repurposing = DB_THUMBNAIL_BASE + 'repurposing.webp';
const advancedMetricsAnalytics = DB_THUMBNAIL_BASE + 'advanced_metrics_analytics.webp';

// Import social proof thumbnails directly from the src directory 
import jwHiringSea from '../assets/main/thumbnails-with-views-webp/JW-Hiring-Sea.webp';
import cmBratSummer from '../assets/main/thumbnails-with-views-webp/CM-brat-summer.webp';
import jcInsaneCults from '../assets/main/thumbnails-with-views-webp/JC-insanecults.webp';
import cdToxic from '../assets/main/thumbnails-with-views-webp/CD-TOXICno55.webp';
import baSomething from '../assets/main/thumbnails-with-views-webp/BA-something.webp';
import jsDavidD from '../assets/main/thumbnails-with-views-webp/JS-David D.webp';
import jwSocialtip from '../assets/main/thumbnails-with-views-webp/JW-Socialtip-rorysutherland.webp';
import cmChappelle from '../assets/main/thumbnails-with-views-webp/CM-chappelle.webp';
import jcTaylorswift from '../assets/main/thumbnails-with-views-webp/JC-taylorswift.webp';
import cdCoffee from '../assets/main/thumbnails-with-views-webp/CD COFFEE.webp';
import baBoomers from '../assets/main/thumbnails-with-views-webp/BA-BOOMERSVGENZ.webp';
import jsSidemen from '../assets/main/thumbnails-with-views-webp/JS-sidemenenightclub.webp';
import jwJellycat from '../assets/main/thumbnails-with-views-webp/JW-jellycat.webp';
import cmFyou from '../assets/main/thumbnails-with-views-webp/CM-FYOU.webp';
import jcEvilcriminals from '../assets/main/thumbnails-with-views-webp/JC-evilcriminals.webp';
import cdRegret from '../assets/main/thumbnails-with-views-webp/CD-REGRET.webp';
import jwBrewBeers from '../assets/main/thumbnails-with-views-webp/JW-BrewBeers-1.webp';
import cmJlo from '../assets/main/thumbnails-with-views-webp/CM-JLO.webp';
import jcDeadly from '../assets/main/thumbnails-with-views-webp/JC-deadlyfilmaccidents.webp';
import cmMarketing from '../assets/main/thumbnails-with-views-webp/CM-Agency Predictions.webp';
import jcConspiracies from '../assets/main/thumbnails-with-views-webp/JC-conspiracies.webp';
import jcSlime from '../assets/main/thumbnails-with-views-webp/JC-Slime.webp';
import jcStupidDeaths from '../assets/main/thumbnails-with-views-webp/JC-Stupid-Deaths.webp';
import baWorstBoss from '../assets/main/thumbnails-with-views-webp/BA-worst boss.webp';

// Map explicitly imported thumbnails
export const thumbnails = {
  'the_algorithm': theAlgorithm,
  'big_picture': bigPicture,
  'repurposing': repurposing,
  'advanced_metrics_analytics': advancedMetricsAnalytics,
};

// Map social proof thumbnails
export const viewsThumbnails = {
  'JW-Hiring-Sea': jwHiringSea,
  'CM-brat-summer': cmBratSummer,
  'JC-insanecults': jcInsaneCults,
  'CD-TOXICno55': cdToxic,
  'BA-something': baSomething,
  'JS-David D': jsDavidD,
  'JW-Socialtip-rorysutherland': jwSocialtip,
  'CM-chappelle': cmChappelle,
  'JC-taylorswift': jcTaylorswift,
  'CD COFFEE': cdCoffee,
  'BA-BOOMERSVGENZ': baBoomers,
  'JS-sidemenenightclub': jsSidemen, 
  'JW-jellycat': jwJellycat,
  'CM-FYOU': cmFyou,
  'JC-evilcriminals': jcEvilcriminals,
  'CD-REGRET': cdRegret,
  'JW-BrewBeers-1': jwBrewBeers,
  'CM-JLO': cmJlo,
  'JC-deadlyfilmaccidents': jcDeadly,
  'CM-Agency Predictions': cmMarketing,
  'JC-conspiracies': jcConspiracies,
  'JC-Slime': jcSlime,
  'JC-Stupid-Deaths': jcStupidDeaths,
  'BA-worst boss': baWorstBoss
};

/**
 * Register thumbnails with the image mapper for consistent access
 */
export function registerThumbnails() {
  // Register course thumbnails
  Object.entries(thumbnails).forEach(([key, url]) => {
    addPublicImage(key, url);
    // Also register with the .webp extension
    addPublicImage(`${key}.webp`, url);
    // Register with the DB path
    addPublicImage(`${DB_THUMBNAIL_BASE}${key}.webp`, url);
  });
  
  // Register social proof thumbnails with full paths
  Object.entries(viewsThumbnails).forEach(([key, url]) => {
    addPublicImage(key, url);
    addPublicImage(`${key}.webp`, url);
    addPublicImage(`${VIEWS_THUMBNAIL_BASE}${key}.webp`, url);
  });
  
  console.log('Course thumbnails registered with image mapper');
}

/**
 * Get a thumbnail by name, integrating with course-utils.tsx
 * This is a drop-in replacement for getThumbnailPath in course-utils.tsx
 * 
 * @param {string} thumbnailName - The name of the thumbnail
 * @returns {string} - The URL of the thumbnail
 */
export function getThumbnail(thumbnailName) {
  if (!thumbnailName) {
    console.warn('Missing thumbnail name, using default');
    return thumbnails.the_algorithm; // Fallback to a default image
  }
  
  // If the thumbnail already has a full path starting with /src, /public, /assets, or http, return it
  if (thumbnailName.startsWith('/src/') || 
      thumbnailName.startsWith('/public/') ||
      thumbnailName.startsWith('/assets/') ||
      thumbnailName.startsWith('http')) {
    return thumbnailName;
  }
  
  // Check if it's a social proof thumbnail path
  if (thumbnailName.startsWith(VIEWS_THUMBNAIL_BASE)) {
    const filename = thumbnailName.replace(VIEWS_THUMBNAIL_BASE, '');
    const filenameWithoutExt = filename.split('.')[0]; // Remove extension
    
    if (viewsThumbnails[filenameWithoutExt]) {
      return viewsThumbnails[filenameWithoutExt];
    }
  }
  
  // If it includes assets/ path, extract just the filename
  if (thumbnailName.includes('assets/')) {
    const filenameMatch = thumbnailName.match(/([^/]+)(?:\.\w+)?$/);
    if (filenameMatch && filenameMatch[1]) {
      thumbnailName = filenameMatch[1];
    }
  }
  
  // Remove extension if present
  if (thumbnailName.endsWith('.webp') || 
      thumbnailName.endsWith('.jpg') || 
      thumbnailName.endsWith('.png') || 
      thumbnailName.endsWith('.jpeg')) {
    thumbnailName = thumbnailName.substring(0, thumbnailName.lastIndexOf('.'));
  }
  
  // Check if we have this thumbnail in our explicitly imported lists
  if (thumbnails[thumbnailName]) {
    return thumbnails[thumbnailName];
  }
  
  if (viewsThumbnails[thumbnailName]) {
    return viewsThumbnails[thumbnailName];
  }
  
  // Try to get it from the image map
  const mappedImage = getImage(thumbnailName);
  if (mappedImage) {
    return mappedImage;
  }
  
  // Enhanced thumbnail debugging information
  console.debug(`Thumbnail attempted: ${thumbnailName}, trying fallback strategies...`);
  
  // Check if it might be a social proof thumbnail
  if (thumbnailName.includes('-') && (
      thumbnailName.startsWith('JW-') || 
      thumbnailName.startsWith('CM-') || 
      thumbnailName.startsWith('JC-') || 
      thumbnailName.startsWith('CD-') || 
      thumbnailName.startsWith('BA-') || 
      thumbnailName.startsWith('JS-'))) {
    const fullPath = `${VIEWS_THUMBNAIL_BASE}${thumbnailName}.webp`;
    console.debug(`Using social proof thumbnail: ${fullPath}`);
    return fullPath;
  }
  
  // Special case for module mapping - convert hyphenated names to underscore format
  const underscoreName = thumbnailName.replace(/-/g, '_');
  if (underscoreName !== thumbnailName) {
    console.debug(`Converting hyphenated name "${thumbnailName}" to underscore format: "${underscoreName}"`);
    // Check if the underscore version exists in thumbnails map
    if (thumbnails[underscoreName]) {
      console.debug(`Found underscore match in thumbnails map: ${underscoreName}`);
      return thumbnails[underscoreName];
    }
  }
  
  // Use the same path construction logic as in course-utils.tsx
  const pathWithExtension = thumbnailName.endsWith('.webp') ||
    thumbnailName.endsWith('.jpg') || 
    thumbnailName.endsWith('.png') || 
    thumbnailName.endsWith('.jpeg') ? 
    thumbnailName : `${thumbnailName}.webp`;
    
  const fullPath = `${DB_THUMBNAIL_BASE}${pathWithExtension}`;
  console.debug(`Using generic thumbnail path: ${fullPath}`);
  return fullPath;
}

/**
 * Get a thumbnail for the social proof section
 * 
 * @param {string} thumbnailPath - The path from the views-thumbnails folder 
 * @returns {string} - The URL of the thumbnail
 */
export function getViewsThumbnail(thumbnailPath) {
  // Handle if the full path is provided
  if (thumbnailPath.startsWith(VIEWS_THUMBNAIL_BASE)) {
    const basename = thumbnailPath.replace(VIEWS_THUMBNAIL_BASE, '').split('.')[0];
    if (viewsThumbnails[basename]) {
      return viewsThumbnails[basename];
    }
  }
  
  // Try just the basename
  if (viewsThumbnails[thumbnailPath]) {
    return viewsThumbnails[thumbnailPath];
  }
  
  // Strip the extension if present
  const basenameWithoutExt = thumbnailPath.split('.')[0];
  if (viewsThumbnails[basenameWithoutExt]) {
    return viewsThumbnails[basenameWithoutExt];
  }
  
  // Check if it's a direct path to the public directory
  if (thumbnailPath.includes('/') && (
      thumbnailPath.startsWith('/') || 
      thumbnailPath.startsWith('./') || 
      thumbnailPath.startsWith('../'))) {
    // This is likely already a path, return it
    return thumbnailPath;
  }
  
  // Check in the general image map
  const mappedImage = getImage(thumbnailPath);
  if (mappedImage) {
    return mappedImage;
  }
  
  // If all else fails, construct a path for the views thumbnail
  console.warn(`Views thumbnail not found in map: ${thumbnailPath}, using direct path`);
  return `${VIEWS_THUMBNAIL_BASE}${thumbnailPath}${!thumbnailPath.endsWith('.webp') ? '.webp' : ''}`;
}

export default {
  getThumbnail,
  getViewsThumbnail,
  registerThumbnails,
  thumbnails,
  viewsThumbnails
}; 