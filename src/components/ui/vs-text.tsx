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
 * VS Text Component - Implements the required styling pattern for text elements
 * 
 * Uses the mandatory pattern of direct CSS variable references for light mode + dark: classes for dark mode
 * 
 * @example
 * <VSText>Regular text with navy color</VSText>
 * <VSText color="--primary-orange">Orange text</VSText>
 * <VSText variant="h2">Heading with correct styling</VSText>
 */
export function VSText({
  children,
  variant = 'p',
  color = '--text-navy',
  className = '',
  darkClassName = 'dark:text-white',
  as,
  style = {},
  ...props
}: VSTextProps & React.HTMLAttributes<HTMLElement>) {
  // Choose the element type based on the variant or the 'as' prop
  const Component = as || variant;
  
  return (
    <Component
      className={`text-[${color}] ${darkClassName} ${className}`} // Apply light mode and dark mode styling
      style={{
        ...style, // Support additional styles
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * VS Heading Component - Wrapper for heading elements with correct styling
 */
export function VSHeading({
  children,
  variant = 'h2',
  color = '--text-navy',
  className = '',
  darkClassName = 'dark:text-white',
  ...props
}: VSTextProps) {
  // Choose the element type based on the variant
  const Component = variant;
  
  return (
    <Component
      className={`text-[${color}] ${darkClassName} font-bold ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * VS Gradient Text - Creates a gradient text effect with proper dark mode support
 */
export function VSGradientText({
  children,
  variant = 'span',
  className = '',
  fromColor = '--primary-orange',
  toColor = '--accent-coral',
  darkFromColor = '--primary-orange-light',
  darkToColor = '--accent-coral-dark',
  as,
  style = {},
  ...props
}: VSTextProps & {
  fromColor?: string;
  toColor?: string;
  darkFromColor?: string;
  darkToColor?: string;
}) {
  const Component = as || variant;
  
  return (
    <Component
      className={`inline-block bg-gradient-to-r from-[${fromColor}] to-[${toColor}] bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-white dark:to-white/70 dark:bg-clip-text dark:text-transparent ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

export default VSText;