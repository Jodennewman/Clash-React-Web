import React from 'react';
import { ThemeProvider } from './theme-provider';

/**
 * Higher-Order Component (HOC) that wraps a component with the ThemeProvider
 * Use this for isolated components that need theme access
 */
export function WithTheme<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WithThemeWrapper(props: P) {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    );
  };
}

/**
 * Component wrapper for direct use in JSX
 * Useful for isolated routes or testing environments
 */
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default WithTheme;