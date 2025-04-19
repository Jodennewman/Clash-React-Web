import { StaticImageData } from 'next/image'

// Map to store preloaded images
const imageCache = new Map<string, StaticImageData>()

/**
 * Register an image in the cache
 * @param key The key to store the image under
 * @param image The image data to store
 */
export function registerImage(key: string, image: StaticImageData) {
  imageCache.set(key, image)
}

/**
 * Get an image from the cache
 * @param key The key of the image to retrieve
 * @returns The image data or undefined if not found
 */
export function getImage(key: string): StaticImageData | undefined {
  return imageCache.get(key)
}

/**
 * Get the path for an image
 * @param key The key of the image
 * @returns The path to the image, either from cache or fallback path
 */
export function getImagePath(key: string): string {
  const image = imageCache.get(key)
  return image ? image.src : `/images/${key}`
}

/**
 * Get a thumbnail path for a module
 * Integrates with the existing getThumbnailPath functionality
 * @param moduleId The ID of the module
 * @returns The path to the thumbnail
 */
export function getThumbnailPath(moduleId: string): string {
  const cachedImage = imageCache.get(`thumbnail-${moduleId}`)
  if (cachedImage) return cachedImage.src
  
  // Fallback to the default location
  return `/assets/main/DataBaseThumbnails/${moduleId}.webp`
}

/**
 * Get an avatar path for a creator/instructor
 * Integrates with the existing getAvatarPath functionality
 * @param creatorId The ID of the creator
 * @returns The path to the avatar
 */
export function getAvatarPath(creatorId: string): string {
  const cachedImage = imageCache.get(`avatar-${creatorId}`)
  if (cachedImage) return cachedImage.src
  
  // Fallback to the default location
  return `/assets/main/Meet_The_Team-webp/${creatorId}.webp`
}

/**
 * Get a submodule thumbnail path
 * Integrates with the existing getSubmoduleThumbnail functionality
 * @param categoryId The category ID
 * @param sectionId The section ID
 * @param submoduleId The submodule ID
 * @returns The path to the submodule thumbnail
 */
export function getSubmoduleThumbnail(
  categoryId: string,
  sectionId: string,
  submoduleId: string
): string {
  const key = `submodule-${categoryId}-${sectionId}-${submoduleId}`
  const cachedImage = imageCache.get(key)
  if (cachedImage) return cachedImage.src
  
  // Fallback to the default location
  return `/assets/main/DataBaseThumbnails/${categoryId}/${sectionId}/${sectionId}-${submoduleId}.webp`
}

/**
 * Get a views thumbnail path for testimonials
 * @param viewId The ID of the view/testimonial
 * @returns The path to the views thumbnail
 */
export function getViewsThumbnail(viewId: string): string {
  const cachedImage = imageCache.get(`views-${viewId}`)
  if (cachedImage) return cachedImage.src
  
  // Fallback to the default location
  return `/assets/main/thumbnails-with-views-webp/${viewId}.webp`
}