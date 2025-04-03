import React, { useEffect, useState } from 'react';
import { useTheme } from './theme-provider';

interface VSThemeWrapperProps {
  children: React.ReactNode;
  lightClassName?: string;
  darkClassName?: string;
  defaultClassName?: string;
}

/**
 * A component that makes it easy to apply different classes based on theme
 * This wraps any child element and applies appropriate theme classes
 */
export function VSThemeWrapper({
  children,
  lightClassName = '',
  darkClassName = '',
  defaultClassName = '',
}: VSThemeWrapperProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // During SSR or before hydration, return with default class only
    return <div className={defaultClassName}>{children}</div>;
  }

  const themeClass = resolvedTheme === 'dark' ? darkClassName : lightClassName;
  const className = `${defaultClassName} ${themeClass}`.trim();

  if (React.isValidElement(children)) {
    // If child is a React element, clone it and add the classes
    return React.cloneElement(children, {
      className: `${children.props.className || ''} ${className}`.trim(),
    });
  }

  // Otherwise wrap in a div
  return <div className={className}>{children}</div>;
}

/**
 * A simpler version that just ensures correct theme classes are applied
 * This is useful for quickly adding dark mode to any component
 */
export function VSThemedElement({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default VSThemeWrapper;