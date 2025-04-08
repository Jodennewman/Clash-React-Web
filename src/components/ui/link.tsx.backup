import React from 'react';
import { cn } from "../../lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Custom Link component that works as a drop-in replacement for Next.js Link
 * For Vite projects that don't use Next.js routing
 */
const Link: React.FC<LinkProps> = ({ 
  href, 
  className, 
  children,
  ...props 
}) => {
  // Handle both internal and external links
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  return (
    <a 
      href={href}
      className={cn("transition-colors", className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
};

export { Link }; 