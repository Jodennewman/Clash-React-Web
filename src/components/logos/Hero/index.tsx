// src/components/logos/Hero/index.tsx

import React from 'react';

// Define the available logo types
export type LogoType = 
  | 'logo-bg-overlay'
  | 'logo-bg-overlay@3x'
  | 'Logo-whole-4x'
  | 'Logo-elements-4x'
  | 'Logo-whole-3x'
  | 'Logo-elements-3x'
  | 'logo-bg-overlay@2x'
  | 'Hero-solo-4x'
  | 'Logo-elements-2x'
  | 'Logo-solo-3x'
  | 'Logo-elements-1x'
  | 'Logo-bg-border'
  | 'Logo-elements'
  | 'Logo-whole'
  | 'Logo-bg-border-1'
  | 'logo-bg-overlay-svg';

// Define the available file formats
export type FileFormat = 'png' | 'svg';

// Define the resolution multipliers
export type Resolution = '1x' | '2x' | '3x' | '4x';

// Interface for logo assets
export interface LogoAsset {
  path: string;
  format: FileFormat;
  resolution?: Resolution;
  description: string;
}

// Map of all available logo assets
export const logoAssets: Record<LogoType, LogoAsset> = {
  'logo-bg-overlay': {
    path: 'src/components/logos/Hero/logo-bg-overlay.png',
    format: 'png',
    description: 'Logo background overlay'
  },
  'logo-bg-overlay@3x': {
    path: 'src/components/logos/Hero/logo-bg-overlay@3x.png',
    format: 'png',
    resolution: '3x',
    description: 'Logo background overlay at 3x resolution'
  },
  'Logo-whole-4x': {
    path: 'src/components/logos/Hero/Logo-whole-4x.png',
    format: 'png',
    resolution: '4x',
    description: 'Complete logo at 4x resolution'
  },
  'Logo-elements-4x': {
    path: 'src/components/logos/Hero/Logo-elements-4x.png',
    format: 'png',
    resolution: '4x',
    description: 'Logo elements at 4x resolution'
  },
  'Logo-whole-3x': {
    path: 'src/components/logos/Hero/Logo-whole-3x.png',
    format: 'png',
    resolution: '3x',
    description: 'Complete logo at 3x resolution'
  },
  'Logo-elements-3x': {
    path: 'src/components/logos/Hero/Logo-elements-3x.png',
    format: 'png',
    resolution: '3x',
    description: 'Logo elements at 3x resolution'
  },
  'logo-bg-overlay@2x': {
    path: 'src/components/logos/Hero/logo-bg-overlay@2x.png',
    format: 'png',
    resolution: '2x',
    description: 'Logo background overlay at 2x resolution'
  },
  'Hero-solo-4x': {
    path: 'src/components/logos/Hero/Hero-solo-4x.png',
    format: 'png',
    resolution: '4x',
    description: 'Hero solo at 4x resolution'
  },
  'Logo-elements-2x': {
    path: 'src/components/logos/Hero/Logo-elements-2x.png',
    format: 'png',
    resolution: '2x',
    description: 'Logo elements at 2x resolution'
  },
  'Logo-solo-3x': {
    path: 'src/components/logos/Hero/Logo-solo-3x.png',
    format: 'png',
    resolution: '3x',
    description: 'Logo solo at 3x resolution'
  },
  'Logo-elements-1x': {
    path: 'src/components/logos/Hero/Logo-elements-1x.png',
    format: 'png',
    resolution: '1x',
    description: 'Logo elements at 1x resolution'
  },
  'Logo-bg-border': {
    path: 'src/components/logos/Hero/Logo-bg-border.png',
    format: 'png',
    description: 'Logo background with border'
  },
  'Logo-elements': {
    path: 'src/components/logos/Hero/Logo-elements.svg',
    format: 'svg',
    description: 'Logo elements in SVG format'
  },
  'Logo-whole': {
    path: 'src/components/logos/Hero/Logo-whole.svg',
    format: 'svg',
    description: 'Complete logo in SVG format'
  },
  'Logo-bg-border-1': {
    path: 'src/components/logos/Hero/Logo-bg-border-1.png',
    format: 'png',
    description: 'Logo background with border, variant 1'
  },
  'logo-bg-overlay-svg': {
    path: 'src/components/logos/Hero/logo-bg-overlay.svg',
    format: 'svg',
    description: 'Logo background overlay in SVG format'
  }
};

// Helper function to get logo by resolution
export const getLogoByResolution = (
  baseName: string, 
  format: FileFormat, 
  resolution?: Resolution
): LogoAsset | undefined => {
  const key = resolution 
    ? `${baseName}-${resolution}` as LogoType
    : baseName as LogoType;
  
  return logoAssets[key];
};

// Helper function to get the best available resolution based on device pixel ratio
export const getBestResolution = (baseName: string, format: FileFormat): LogoAsset => {
  // Default to 1x if no window object (SSR)
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  
  // Determine which resolution to use based on pixel ratio
  let resolution: Resolution = '1x';
  if (pixelRatio >= 4) {
    resolution = '4x';
  } else if (pixelRatio >= 3) {
    resolution = '3x';
  } else if (pixelRatio >= 2) {
    resolution = '2x';
  }
  
  // Try to get the logo at the desired resolution
  const logo = getLogoByResolution(baseName, format, resolution);
  
  // Fallback logic if the specific resolution isn't available
  if (!logo) {
    // Try lower resolutions if higher one not available
    if (resolution === '4x') {
      const fallback = getLogoByResolution(baseName, format, '3x') || 
                      getLogoByResolution(baseName, format, '2x') ||
                      getLogoByResolution(baseName, format, '1x');
      if (fallback) return fallback;
    } else if (resolution === '3x') {
      const fallback = getLogoByResolution(baseName, format, '2x') || 
                      getLogoByResolution(baseName, format, '1x');
      if (fallback) return fallback;
    } else if (resolution === '2x') {
      const fallback = getLogoByResolution(baseName, format, '1x');
      if (fallback) return fallback;
    }
    
    // If all else fails, try to get the base version without resolution
    const baseVersion = logoAssets[baseName as LogoType];
    if (baseVersion) return baseVersion;
    
    // Last resort - return the first logo we find
    return Object.values(logoAssets)[0];
  }
  
  return logo;
};

// Props for the Logo component
interface LogoProps {
  type: LogoType;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

// The Logo component that uses the asset data
const Logo: React.FC<LogoProps> = ({ 
  type, 
  alt,
  className = '',
  width,
  height
}) => {
  const asset = logoAssets[type];
  
  // Set default alt text if none provided
  const altText = alt || asset.description;
  
  return (
    <img
      src={asset.path}
      alt={altText}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default Logo;