/**
 * Type definitions for parallax scrolling utility
 */

// Extend HTMLElement to include data attributes used for parallax scrolling
interface HTMLElementWithParallax extends HTMLElement {
  dataset: {
    teamParallax?: string;
    speed?: string;
    lag?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    originalTransform?: string;
  }
}

// Extend the global JSX namespace to include additional attributes
declare namespace JSX {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    'data-team-parallax'?: boolean | string;
    'data-speed'?: string | number;
    'data-lag'?: string | number;
    'data-direction'?: 'up' | 'down' | 'left' | 'right';
    'data-original-transform'?: string;
  }
}