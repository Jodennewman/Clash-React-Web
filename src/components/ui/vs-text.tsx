import React from 'react';

type TextVariant = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';

interface VSTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: string;
  className?: string;
  darkClassName?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

/**
 * VS Text Component - Implements theme-aware styling for text elements
 * 
 * Uses theme-aware variables that automatically update based on the current theme
 * 
 * @example
 * <VSText>Regular text with theme-aware styling</VSText>
 * <VSText color="theme-primary">Primary colored text</VSText>
 * <VSText variant="h2">Heading with correct styling</VSText>
 */
export function VSText({
  children,
  variant = 'p',
  color = 'theme-primary',
  className = '',
  darkClassName = '', // No longer needed with theme-aware approach
  as,
  style = {},
  ...props
}: VSTextProps & React.HTMLAttributes<HTMLElement>) {
  // Choose the element type based on the variant or the 'as' prop
  const Component = as || variant;
  
  // Filter out non-DOM props
  const { fromColor, toColor, darkFromColor, darkToColor, gradientType, ...domProps } = props;
  
  return (
    <Component
      className={`text-${color} ${className}`} // Use theme-aware utility class
      style={{
        ...style, // Support additional styles
      }}
      {...domProps}
    >
      {children}
    </Component>
  );
}

/**
 * VS Heading Component - Wrapper for heading elements with theme-aware styling
 * Now with responsive sizing for mobile optimization
 */
export function VSHeading({
  children,
  variant = 'h2',
  color = 'theme-primary',
  className = '',
  darkClassName = '', // No longer needed with theme-aware approach
  size = 'lg', // Added size prop for responsive sizing
  ...props
}: VSTextProps & { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }) {
  // Choose the element type based on the variant
  const Component = variant;
  
  // Filter out non-DOM props
  const { fromColor, toColor, darkFromColor, darkToColor, gradientType, ...domProps } = props;
  
  // Map sizes to responsive Tailwind classes
  const sizeClasses = {
    sm: 'text-lg sm:text-xl md:text-2xl',
    md: 'text-xl sm:text-2xl md:text-3xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    '2xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
  };
  
  // Get appropriate size class
  const sizeClass = sizeClasses[size] || sizeClasses.lg;
  
  return (
    <Component
      className={`text-${color} font-bold ${sizeClass} ${className}`}
      {...domProps}
    >
      {children}
    </Component>
  );
}

/**
 * VS Gradient Text - Creates a gradient text effect with theme-aware styling
 */
export function VSGradientText({
  children,
  variant = 'span',
  className = '',
  gradientType = 'primary',
  as,
  style = {},
  fromColor,
  toColor,
  darkFromColor,
  darkToColor,
  ...domProps
}: VSTextProps & {
  gradientType?: 'primary' | 'secondary' | 'accent';
  fromColor?: string;
  toColor?: string;
  darkFromColor?: string;
  darkToColor?: string;
}) {
  const Component = as || variant;
  
  // Use predefined theme-aware gradient classes
  const gradientClasses = {
    primary: 'text-theme-gradient-primary',
    secondary: 'text-theme-gradient-secondary', 
    accent: 'text-theme-gradient-accent'
  };
  
  return (
    <Component
      className={`inline-block bg-clip-text text-transparent ${gradientClasses[gradientType]} ${className}`}
      style={style}
      {...domProps}
    >
      {children}
    </Component>
  );
}

export default VSText;