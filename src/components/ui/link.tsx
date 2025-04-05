import React from 'react';
import { cn } from "../../lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'subtle' | 'muted';
}

/**
 * Custom Link component that works as a drop-in replacement for Next.js Link
 * For Vite projects that don't use Next.js routing
 */
const Link: React.FC<LinkProps> = ({ 
  href, 
  className, 
  children,
  variant = 'default',
  ...props 
}) => {
  // Handle both internal and external links
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  // Theme-aware styles based on variant
  const variantStyles = {
    default: "text-theme-primary hover:underline focus:outline-none focus:ring-2 focus:ring-theme-primary/30",
    primary: "text-theme-primary font-medium hover:text-theme-primary-hover underline underline-offset-4",
    secondary: "text-theme-secondary hover:text-theme-secondary/80 hover:underline",
    subtle: "text-theme-secondary/80 hover:text-theme-secondary hover:underline",
    muted: "text-theme-secondary/60 hover:text-theme-secondary/80"
  };
  
  return (
    <a 
      href={href}
      className={cn(
        "transition-colors duration-[var(--theme-transition-normal)]",
        variantStyles[variant],
        className
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
};

export { Link }; 