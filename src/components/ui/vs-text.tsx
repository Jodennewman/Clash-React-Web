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
 * Uses the mandatory pattern of inline styles for light mode + dark: classes for dark mode
 * 
 * @example
 * <VSText>Regular text with navy color</VSText>
 * <VSText color="var(--primary-orange)">Orange text</VSText>
 * <VSText variant="h2">Heading with correct styling</VSText>
 */
export function VSText({
  children,
  variant = 'p',
  color = 'var(--text-navy)',
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
      style={{
        color, // Use the correct pattern for light mode
        ...style, // Support additional styles
      }}
      className={`${darkClassName} ${className}`} // Apply dark mode styling
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
  color = 'var(--text-navy)',
  className = '',
  darkClassName = 'dark:text-white',
  ...props
}: VSTextProps) {
  // Choose the element type based on the variant
  const Component = variant;
  
  return (
    <Component
      style={{ color, ...props.style }}
      className={`${darkClassName} font-bold ${className}`}
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
  fromColor = 'var(--primary-orange)',
  toColor = 'var(--accent-coral)',
  darkFromColor = 'var(--primary-orange-light)',
  darkToColor = 'var(--accent-coral-dark)',
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
  
  // For light mode, use inline style with CSS variables
  const lightModeStyle = {
    backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    ...style
  };
  
  return (
    <Component
      className={`inline-block dark:bg-gradient-to-r dark:from-white dark:to-white/70 dark:bg-clip-text dark:text-transparent ${className}`}
      style={lightModeStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

export default VSText;