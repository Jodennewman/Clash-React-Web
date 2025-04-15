import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook for detecting device type based on viewport width
 * @returns {Object} Device information including isMobile flag
 */
export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkDevice();
    
    // Listen for resizes
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile };
};

/**
 * Creates animations with different configurations for mobile and desktop
 * @param {Element} element - Target element for animation
 * @param {Object} animationConfig - Configuration object with mobile/desktop variants
 * @returns {gsap.core.Tween} The created GSAP animation
 */
export const createResponsiveAnimation = (element, animationConfig) => {
  const { isMobile } = useDeviceDetection();
  
  const { desktop, mobile, common = {} } = animationConfig;
  
  // Apply device-specific settings
  const config = {
    ...common,
    ...(isMobile ? mobile : desktop),
  };
  
  // Create and return animation
  return gsap.to(element, config);
};

/**
 * Creates ScrollTrigger with different configurations for mobile and desktop
 * @param {Object} config - Configuration object with mobile/desktop variants
 * @returns {ScrollTrigger} The created ScrollTrigger instance
 */
export const createResponsiveScrollTrigger = (config) => {
  const { isMobile } = useDeviceDetection();
  
  const { desktop, mobile, common = {} } = config;
  
  // Apply device-specific settings
  const finalConfig = {
    ...common,
    ...(isMobile ? mobile : desktop),
  };
  
  // Create and return ScrollTrigger
  return ScrollTrigger.create(finalConfig);
};

/**
 * Optimizes animations for mobile by reducing complexity
 * @param {Element} element - Element to animate
 * @param {Object} options - Animation options
 * @returns {Object} - Mobile-optimized animation configuration
 */
export const optimizeForMobile = (element, options = {}) => {
  const { isMobile } = useDeviceDetection();
  
  if (!isMobile) {
    return options;
  }
  
  // Default optimization settings
  const mobileOptimizations = {
    duration: options.duration ? options.duration * 0.8 : 0.5, // Faster animations
    ease: "power2.out", // Simpler easing function
    stagger: options.stagger ? options.stagger * 0.7 : 0.1, // Reduced stagger
    clearProps: "all", // Clear props to free memory
  };
  
  return {
    ...options,
    ...mobileOptimizations
  };
};