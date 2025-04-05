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
 */
export function VSHeading({
  children,
  variant = 'h2',
  color = 'theme-primary',
  className = '',
  darkClassName = '', // No longer needed with theme-aware approach
  ...props
}: VSTextProps) {
  // Choose the element type based on the variant
  const Component = variant;
  
  return (
    <Component
      className={`text-${color} font-bold ${className}`}
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
  ...props
}: VSTextProps & {
  gradientType?: 'primary' | 'secondary' | 'accent';
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