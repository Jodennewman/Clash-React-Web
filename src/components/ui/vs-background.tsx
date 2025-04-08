import React, { forwardRef } from 'react';

interface VSBackgroundProps {
  children: React.ReactNode;
  background?: string; // Theme-aware background
  className?: string;
  as?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
}

/**
 * VS Background Component - Implements theme-aware styling for background elements
 * 
 * Uses single theme-aware variables instead of competing light/dark variants
 * 
 * @example
 * <VSBackground>Content with proper background</VSBackground>
 * <VSBackground background="bg-theme-secondary">Card with theme-aware bg</VSBackground>
 */
export const VSBackground = forwardRef<HTMLElement, VSBackgroundProps & React.HTMLAttributes<HTMLElement>>(
  ({
    children,
    background = 'bg-theme-primary',
    className = '',
    as = 'div',
    ...props
  }, ref) => {
    const Component = as;
    
    // Filter out non-DOM props before passing to the component
    const { lightBg, darkBg, ...domProps } = props;
    
    return (
      <Component
        ref={ref}
        className={`${background} ${className}`}
        {...domProps}>
        {children}
      </Component>
    );
  }
);

/**
 * VS Card Component - Theme-aware card with consistent styling across light/dark modes
 */
export const VSCard = forwardRef<HTMLElement, VSBackgroundProps & React.HTMLAttributes<HTMLElement>>(
  ({
    children,
    className = '',
    background = 'bg-theme-gradient',
    ...props
  }, ref) => {
    return (
      <VSBackground
        ref={ref}
        background={background}
        className={`rounded-[var(--theme-border-radius-lg)] p-6 
                   border border-theme-border
                   shadow-theme-md
                   transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                   hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-theme-lg
                   ${className}`}
        {...props}
      >
        {children}
      </VSBackground>
    );
  }
);

/**
 * VS Section Component - Creates a full section with theme-aware background styling
 */
export const VSSection = forwardRef<HTMLElement, VSBackgroundProps & React.HTMLAttributes<HTMLElement>>(
  ({
    children,
    className = '',
    background = 'bg-theme-primary',
    ...props
  }, ref) => {
    return (
      <VSBackground
        as="section"
        ref={ref}
        background={background}
        className={`py-24 relative overflow-hidden border-t border-theme-border
                   ${className}`}
        {...props}
      >
        {children}
      </VSBackground>
    );
  }
);

export default VSBackground;