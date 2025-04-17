import React, { ElementType, HTMLAttributes } from 'react';

// Define common props for text components
export interface VSTextProps {
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // Added more size options
  color?: string; // Allow passing Tailwind color class like 'text-theme-primary'
  className?: string;
  as?: ElementType; // Allow changing the root element type (e.g., p, span, h1, h2)
}

// Base component for theme-aware text
export const VSText = ({
  children,
  size = 'md',
  color = 'text-theme-secondary', // Default text color
  className = '',
  as: Component = 'p', // Default to <p> tag
  ...props
}: VSTextProps & HTMLAttributes<HTMLElement>) => {
  
  // Map abstract sizes to Tailwind classes (Mobile-first approach)
  const sizeClasses = {
    xs: 'text-xs sm:text-sm', // Extra small
    sm: 'text-sm sm:text-base', // Small
    md: 'text-base sm:text-lg', // Medium (default)
    lg: 'text-lg sm:text-xl', // Large
    xl: 'text-xl sm:text-2xl', // Extra large
    '2xl': 'text-2xl sm:text-3xl', // Double extra large
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <Component 
      className={`${color} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading component using VSText styling but defaulting to <h2>
export const VSHeading = ({
  children,
  size = 'lg', // Default heading size
  color = 'text-theme-primary', // Default heading color
  className = '',
  as: Component = 'h2', // Default to <h2> tag
  ...props
}: VSTextProps & HTMLAttributes<HTMLElement>) => {

  // Map abstract sizes to responsive Tailwind classes for headings (Mobile-first)
  // As specified in MOBILE_OPTIMIZATION_PLAN.md Phase 2, Step 2
  const sizeClasses = {
    xs: 'text-base sm:text-lg md:text-xl', // Added missing xs key (adjust values if needed)
    sm: 'text-lg sm:text-xl md:text-2xl', 
    md: 'text-xl sm:text-2xl md:text-3xl', 
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl', // Default 
    xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    '2xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.lg;

  return (
    <Component 
      className={`${color} ${sizeClass} font-bold ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// Optional: Specific component for gradient text if needed frequently
export const VSGradientText = ({
  children,
  size = 'lg',
  className = '',
  as: Component = 'span', // Default to <span>
  ...props
}: VSTextProps & HTMLAttributes<HTMLElement>) => {
  
  // Mirroring heading sizes for gradient text
  const sizeClasses = {
    xs: 'text-base sm:text-lg md:text-xl', // Added missing xs key
    sm: 'text-lg sm:text-xl md:text-2xl', 
    md: 'text-xl sm:text-2xl md:text-3xl', 
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl', 
    xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    '2xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.lg;

  return (
    <Component 
      className={`gradient-text ${sizeClass} font-bold ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

VSText.displayName = 'VSText';
VSHeading.displayName = 'VSHeading';
VSGradientText.displayName = 'VSGradientText';