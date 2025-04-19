'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { getImagePath } from '../../lib/image-utils'

interface NextImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
  imageKey?: string
  priority?: boolean
}

/**
 * NextImage component that wraps Next.js Image component with additional features
 * - Handles image loading and errors
 * - Supports image cache via imageKey
 * - Provides fallback images
 */
export function NextImage({
  src,
  fallbackSrc,
  imageKey,
  alt,
  width,
  height,
  priority = false,
  className,
  style,
  ...props
}: NextImageProps) {
  const [error, setError] = useState(false)
  
  // If imageKey is provided, try to get the image from cache
  const actualSrc = imageKey ? getImagePath(imageKey) : src
  const imageSrc = error && fallbackSrc ? fallbackSrc : actualSrc
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
      onError={() => {
        if (!error && fallbackSrc) {
          setError(true)
        }
      }}
      {...props}
    />
  )
}

/**
 * NextThumbnail component specifically for course thumbnails
 */
export function NextThumbnail({
  moduleId,
  alt,
  width = 480,
  height = 270,
  ...props
}: {
  moduleId: string
  alt: string
  width?: number
  height?: number
} & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <NextImage
      imageKey={`thumbnail-${moduleId}`}
      src={`/assets/main/DataBaseThumbnails/${moduleId}.webp`}
      fallbackSrc="/assets/main/DataBaseThumbnails/default.webp"
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}

/**
 * NextAvatar component specifically for team member avatars
 */
export function NextAvatar({
  creatorId,
  alt,
  width = 96,
  height = 96,
  ...props
}: {
  creatorId: string
  alt: string
  width?: number
  height?: number
} & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <NextImage
      imageKey={`avatar-${creatorId}`}
      src={`/assets/main/Meet_The_Team-webp/${creatorId}.webp`}
      fallbackSrc="/assets/main/Meet_The_Team-webp/default.webp"
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}