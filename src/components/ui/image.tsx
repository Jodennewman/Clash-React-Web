import React from 'react';
import { cn } from "../../lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Custom Image component that works as a drop-in replacement for Next.js Image
 * For Vite projects that don't use Next.js Image optimization
 */
const Image: React.FC<ImageProps> = ({ 
  src, 
  alt,
  width,
  height,
  className,
  fill,
  priority,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quality,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sizes,
  loading = priority ? 'eager' : 'lazy',
  ...props 
}) => {
  const imgStyle: React.CSSProperties = fill 
    ? { 
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: 0,
        objectFit: 'cover',
      } 
    : {};
  
  return (
    <img 
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={cn("transition-opacity duration-[var(--theme-transition-normal)]", className)}
      style={{
        ...imgStyle,
        ...props.style,
      }}
      {...props}
    />
  );
};

export { Image }; 