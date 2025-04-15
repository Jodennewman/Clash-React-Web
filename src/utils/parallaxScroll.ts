/**
 * Ultra-simple, pure CSS-based parallax scrolling effect
 * No JavaScript animation loops, just CSS transform calculations on scroll
 */

// Track scroll handler for proper cleanup
let scrollHandler: (() => void) | null = null;

// Initialize parallax effect
export function initParallax() {
  // Clean up any existing handler
  destroyParallax();
  
  // Create a throttled scroll handler
  scrollHandler = throttle(() => {
    // Get all parallax elements
    const elements = document.querySelectorAll('[data-team-parallax]');
    
    // Apply parallax to each element
    elements.forEach(element => {
      const el = element as HTMLElement;
      
      // Get scroll position relative to element's position
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = (rect.top / viewportHeight);
      
      // Get parallax settings
      const speed = parseFloat(el.dataset.speed || '0.85');
      const direction = el.dataset.direction || 'up';
      
      // Calculate offset (using inverse speed - closer to 1 = less movement)
      const factor = (1 - speed) * 100; // Convert to percentage points
      
      // Calculate translate values based on direction
      let x = 0;
      let y = 0;
      
      switch (direction) {
        case 'up':
          y = scrollProgress * factor;
          break;
        case 'down':
          y = -scrollProgress * factor;
          break;
        case 'left':
          x = scrollProgress * factor;
          break;
        case 'right':
          x = -scrollProgress * factor;
          break;
      }
      
      // Apply transform
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, 10);
  
  // Add scroll listener
  window.addEventListener('scroll', scrollHandler);
  
  // Initial calculation
  if (scrollHandler) scrollHandler();
  
  console.log("Simple CSS parallax initialized");
}

// Throttle helper to limit execution frequency
function throttle(callback: Function, delay: number) {
  let lastCall = 0;
  
  return function(...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

// Clean up parallax effects
export function destroyParallax() {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
  
  // Reset transforms
  document.querySelectorAll('[data-team-parallax]').forEach(el => {
    (el as HTMLElement).style.transform = '';
  });
  
  console.log("Parallax effect cleaned up");
}