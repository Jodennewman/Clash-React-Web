/// <reference types="vite/client" />

declare global {
  interface Window {
    va?: (event: string, data: { name: string; data: { name: string; value: number } }) => void;
  }
}

import { onCLS, onFID, onLCP, onTTFB } from 'web-vitals';

/**
 * Monitors Core Web Vitals and logs/reports metrics
 * @see https://web.dev/vitals/
 */
export function monitorWebVitals(): void {
  // Measure Core Web Vitals
  onCLS(metric => logMetric('CLS', metric.value));
  onFID(metric => logMetric('FID', metric.value));
  onLCP(metric => logMetric('LCP', metric.value));
  onTTFB(metric => logMetric('TTFB', metric.value));

  function logMetric(name: string, value: number): void {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`Web Vital: ${name} = ${value}`);
    }
    
    // Send to analytics in production
    if (import.meta.env.PROD) {
      // Vercel Analytics integration
      if (window.va) {
        window.va('event', {
          name: 'web-vital',
          data: { name, value }
        });
      }
    }
  }
}

// This export makes TypeScript treat this file as a module
export {};