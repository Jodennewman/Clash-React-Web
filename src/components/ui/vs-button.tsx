import React from 'react';

interface VSButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'vibrant';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

/**
 * VS Button Component - Properly styled button with correct dark mode implementation
 * 
 * Uses the required background and text styling patterns for dark mode
 * 
 * @example
 * <VSButton>Default Button</VSButton>
 * <VSButton variant="vibrant" size="lg">Large Vibrant Button</VSButton>
 */
export function VSButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}: VSButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>) {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  // Base button classes that apply to all variants
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
    focus:outline-none 
    hover:translate-y-[-4px] hover:scale-[1.03]
    ${sizeClasses[size]}
  `;
  
  // Variant-specific classes with theme-aware styling
  const variantClasses = {
    primary: `
      bg-theme-gradient-primary
      text-white
      shadow-theme-btn
      hover:shadow-theme-md
    `,
    secondary: `
      bg-theme-gradient-secondary
      text-white
      shadow-theme-btn
      hover:shadow-theme-md
    `,
    outline: `
      bg-transparent
      border-2 border-theme-border
      hover:bg-theme-secondary/10
    `,
    ghost: `
      bg-transparent
      hover:bg-theme-secondary/10
    `,
    vibrant: `
      bg-theme-gradient-accent
      text-white
      shadow-theme-btn
      hover:shadow-theme-md
    `
  };
  
  // Text color handling for outline and ghost variants that need specific text colors
  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return {}; // Return empty object - we'll use Tailwind classes instead
      case 'ghost':
        return {}; // Return empty object - we'll use Tailwind classes instead
      default:
        return {}; // No inline style needed for variants with text-white
    }
  };
  
  // Text color classes for variants that need them
  const getTextColorClass = () => {
    switch (variant) {
      case 'outline':
        return 'text-theme-accent-secondary';
      case 'ghost':
        return 'text-theme-primary';
      default:
        return ''; // No text color class needed for variants with text-white
    }
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${getTextColorClass()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * VS Icon Button - Button with icon and text, properly styled for dark mode
 */
export function VSIconButton({
  children,
  icon,
  iconPosition = 'left',
  ...props
}: VSButtonProps & { 
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
}) {
  return (
    <VSButton {...props}>
      {iconPosition === 'left' && (
        <span className="mr-2 group-hover:translate-x-[-2px] transition-transform duration-300">
          {icon}
        </span>
      )}
      {children}
      {iconPosition === 'right' && (
        <span className="ml-2 group-hover:translate-x-[2px] transition-transform duration-300">
          {icon}
        </span>
      )}
    </VSButton>
  );
}

export default VSButton;