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
  
  // Variant-specific classes with proper dark mode support
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover]/90 dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
      text-white
      shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(254,163,93,0.15)]
      hover:bg-gradient-to-r hover:from-[--primary-orange-hover]/90 hover:to-[--primary-orange] dark:hover:shadow-[0_0_20px_rgba(254,163,93,0.25)]
    `,
    secondary: `
      bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-light] dark:bg-gradient-to-r dark:from-[--secondary-teal] dark:to-[--secondary-teal-hover]
      text-white
      shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
      hover:bg-gradient-to-r hover:from-[--secondary-teal-light] hover:to-[--secondary-teal] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.25)]
    `,
    outline: `
      bg-transparent
      border-2 border-[--secondary-teal] dark:border-white/20
      hover:bg-[--secondary-teal]/5 dark:hover:bg-white/5
    `,
    ghost: `
      bg-transparent
      hover:bg-black/5 dark:hover:bg-white/5
    `,
    vibrant: `
      bg-gradient-to-r from-[--accent-coral] to-[--primary-orange]
      dark:bg-gradient-to-r dark:from-[--accent-coral] dark:to-[--primary-orange]
      text-white
      shadow-[1px_1px_6px_rgba(222,107,89,0.15)] dark:shadow-[0_0_15px_rgba(222,107,89,0.15)]
      hover:shadow-[1px_1px_12px_rgba(222,107,89,0.2)] dark:hover:shadow-[0_0_20px_rgba(222,107,89,0.25)]
      hover:from-[--primary-orange] hover:to-[--accent-coral]
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
        return 'text-[--secondary-teal] dark:text-white';
      case 'ghost':
        return 'text-[--text-navy] dark:text-white';
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