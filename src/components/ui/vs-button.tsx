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
      bg-[var(--primary-orange)] dark:bg-gradient-to-r dark:from-[var(--primary-orange)] dark:to-[var(--primary-orange-hover)]
      text-white
      shadow-[var(--shadow-btn)] dark:shadow-[0_0_15px_rgba(254,163,93,0.15)]
      hover:bg-[var(--primary-orange-hover)] dark:hover:shadow-[0_0_20px_rgba(254,163,93,0.25)]
    `,
    secondary: `
      bg-[var(--secondary-teal)] dark:bg-gradient-to-r dark:from-[var(--secondary-teal)] dark:to-[var(--secondary-teal-hover)]
      text-white
      shadow-[var(--shadow-btn)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
      hover:bg-[var(--secondary-teal-hover)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.25)]
    `,
    outline: `
      bg-transparent
      border-2 border-[var(--secondary-teal)] dark:border-white/20
      hover:bg-[var(--secondary-teal)]/5 dark:hover:bg-white/5
    `,
    ghost: `
      bg-transparent
      hover:bg-black/5 dark:hover:bg-white/5
    `,
    vibrant: `
      bg-gradient-to-r from-[var(--accent-coral)] to-[var(--primary-orange)]
      dark:bg-gradient-to-r dark:from-[var(--accent-coral-dark)] dark:to-[var(--primary-orange)]
      text-white
      shadow-[var(--shadow-btn)] dark:shadow-[0_0_15px_rgba(222,107,89,0.15)]
      hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(222,107,89,0.25)]
    `
  };
  
  // Text color handling for outline and ghost variants that need specific text colors
  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return { color: 'var(--secondary-teal)' };
      case 'ghost':
        return { color: 'var(--text-navy)' };
      default:
        return {}; // No inline style needed for variants with text-white
    }
  };
  
  // Dark text classes for variants that need them
  const getDarkTextClass = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return 'dark:text-white';
      default:
        return ''; // No dark text class needed for variants with text-white
    }
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${getDarkTextClass()} ${className}`}
      style={getTextColor()}
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