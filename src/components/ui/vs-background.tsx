import React, { forwardRef, ElementType, HTMLAttributes, useEffect, useState } from 'react';

// Define the props for VSBackground component
export interface VSBackgroundProps {
  as?: ElementType; // Allow changing the root element type (e.g., div, section, footer)
  children?: React.ReactNode;
  className?: string;
  // background prop is illustrative; specific background classes should be passed via className
  // background?: string; 
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
export const VSBackground = forwardRef<
  HTMLElement, 
  VSBackgroundProps & HTMLAttributes<HTMLElement>
>(({ 
  as: Component = 'div', 
  children,
  className = '',
  ...props 
}, ref) => {
  return (
    <Component
      ref={ref}
      className={`${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

/**
 * VS Section Component - Creates a full section with theme-aware background styling
 * Now with responsive padding for mobile optimization
 */
export const VSSection = forwardRef<
  HTMLElement, 
  VSBackgroundProps & HTMLAttributes<HTMLElement>
>(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return (
    <VSBackground
      as="section"
      ref={ref}
      className={`${isMobile ? 'py-12' : 'py-24'} relative overflow-hidden border-t border-[var(--theme-border)] ${className}`}
      {...props}
    >
      <div className="container-mobile mx-auto">
        {children}
      </div>
    </VSBackground>
  );
});

/**
 * VS Card Component - Theme-aware card with consistent styling across light/dark modes
 */
export const VSCard = forwardRef<
  HTMLElement, 
  VSBackgroundProps & HTMLAttributes<HTMLElement>
>(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <VSBackground
      ref={ref}
      className={`${className}`}
      {...props}
    >
      {children}
    </VSBackground>
  );
});

VSCard.displayName = 'VSCard';
VSSection.displayName = 'VSSection';
VSBackground.displayName = 'VSBackground';

// Note: Typically only the base component or all components would be exported as default.
// Exporting individual components is more common.
// export default VSBackground; // Consider removing if not needed