'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect } from 'react'
import { getThumbnailPath, getAvatarPath, getSubmoduleThumbnail, getViewsThumbnail } from '../../lib/image-utils'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src?: string
  moduleId?: string
  creatorId?: string
  submoduleData?: {
    categoryId: string
    sectionId: string
    submoduleId: string
  }
  viewId?: string
  type: 'thumbnail' | 'avatar' | 'submodule' | 'view' | 'custom'
  fallbackSrc?: string
}

/**
 * OptimizedImage component that integrates with VS image mapping system
 * and uses Next.js Image component for optimization
 */
export function OptimizedImage({
  type,
  moduleId,
  creatorId,
  submoduleData,
  viewId,
  src,
  fallbackSrc = '/assets/main/DataBaseThumbnails/default.webp',
  alt,
  width = 480,
  height = 270,
  quality = 85,
  priority = false,
  className,
  style,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [error, setError] = useState(false)

  useEffect(() => {
    let source = ''
    
    switch (type) {
      case 'thumbnail':
        if (moduleId) {
          source = getThumbnailPath(moduleId)
        }
        break
      case 'avatar':
        if (creatorId) {
          source = getAvatarPath(creatorId)
        }
        break
      case 'submodule':
        if (submoduleData) {
          const { categoryId, sectionId, submoduleId } = submoduleData
          source = getSubmoduleThumbnail(categoryId, sectionId, submoduleId)
        }
        break
      case 'view':
        if (viewId) {
          source = getViewsThumbnail(viewId)
        }
        break
      case 'custom':
      default:
        source = src || fallbackSrc
    }
    
    setImgSrc(source || fallbackSrc)
  }, [type, moduleId, creatorId, submoduleData, viewId, src, fallbackSrc])

  return (
    <Image
      src={error ? fallbackSrc : imgSrc}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      className={className}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  )
}

/**
 * ModuleThumbnail - Specialized component for module thumbnails
 */
export function ModuleThumbnail({
  moduleId,
  alt,
  width = 480,
  height = 270,
  ...props
}: Omit<OptimizedImageProps, 'type'> & { moduleId: string }) {
  return (
    <OptimizedImage
      type="thumbnail"
      moduleId={moduleId}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}

/**
 * CreatorAvatar - Specialized component for creator avatars
 */
export function CreatorAvatar({
  creatorId,
  alt,
  width = 96,
  height = 96,
  ...props
}: Omit<OptimizedImageProps, 'type'> & { creatorId: string }) {
  return (
    <OptimizedImage
      type="avatar"
      creatorId={creatorId}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}

/**
 * SubmoduleThumbnail - Specialized component for submodule thumbnails
 */
export function SubmoduleThumbnail({
  categoryId,
  sectionId,
  submoduleId,
  alt,
  width = 320,
  height = 180,
  ...props
}: Omit<OptimizedImageProps, 'type' | 'submoduleData'> & {
  categoryId: string
  sectionId: string
  submoduleId: string
}) {
  return (
    <OptimizedImage
      type="submodule"
      submoduleData={{ categoryId, sectionId, submoduleId }}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}