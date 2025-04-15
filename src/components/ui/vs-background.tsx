import React, { forwardRef, useState, useEffect } from 'react';

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
 * Now with responsive padding for mobile optimization
 */
export const VSSection = forwardRef<HTMLElement, VSBackgroundProps & React.HTMLAttributes<HTMLElement>>(
  ({
    children,
    className = '',
    background = 'bg-theme-primary',
    ...props
  }, ref) => {
    // Get device type from data attribute (passed from AnimationController)
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkIfMobile();
      
      // Listen for resizes
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
    
    // Apply appropriate padding based on device size
    const sectionPadding = isMobile ? 'py-12 sm:py-16 md:py-20 lg:py-24' : 'py-24';
    
    return (
      <VSBackground
        as="section"
        ref={ref}
        background={background}
        className={`${sectionPadding} relative overflow-hidden border-t border-theme-border
                   ${className}`}
        {...props}
      >
        <div className="container-mobile mx-auto">
          {children}
        </div>
      </VSBackground>
    );
  }
);

export default VSBackground;