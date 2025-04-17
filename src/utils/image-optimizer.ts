/// <reference types="vite/client" />

export function optimizeImages(): void {
  window.addEventListener('load', () => {
    // Select all img elements on the page
    const images = document.querySelectorAll<HTMLImageElement>('img');

    images.forEach(img => {
      // Skip images that are already optimised or explicitly excluded
      if (img.loading === 'lazy' || img.hasAttribute('data-optimized')) {
        return;
      }

      // Apply lazy loading to defer off‑screen image loading
      img.loading = 'lazy';

      // Async decode for faster rendering
      img.decoding = 'async';

      // Mark image so we don't process it again on route changes
      img.setAttribute('data-optimized', 'true');

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log('[Image Optimizer] Optimised image:', img.currentSrc || img.src);
      }
    });
  });
} 