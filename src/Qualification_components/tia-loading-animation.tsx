import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TiaLoadingAnimationProps {
  message: string;
  duration: number;
  onComplete: () => void;
}

const TiaLoadingAnimation: React.FC<TiaLoadingAnimationProps> = ({
  message,
  duration,
  onComplete
}) => {
  // State for animation values
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [resultsCalculated, setResultsCalculated] = useState(false);
  const [componentOpacity, setComponentOpacity] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Refs for animation handling
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  
  // Run on component mount - with precise timing control
  useEffect(() => {
    // Animation duration constants
    const PROGRESS_DURATION_MS = 5000; // 5 seconds for progress animation
    const COMPLETION_MS = 6000; // Complete at exactly 6 seconds
    
    // Record start time with high precision
    startTimeRef.current = performance.now();
    
    // Gradually transition to results calculated at 80% of the animation
    const gradualTextChangeTimer = setTimeout(() => {
      setResultsCalculated(true);
    }, PROGRESS_DURATION_MS * 0.8); // Show "Results calculated" at 80% of the progress
    
    // Set up precise completion timer with fade effect
    const completionTimer = setTimeout(() => {
      // Start fade out effect 200ms before completion
      setComponentOpacity(0);
      
      // Cancel animation frame if still running
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Complete after fade effect
      setTimeout(() => {
        onComplete();
      }, 200); // Short fade out
    }, COMPLETION_MS - 200); // Adjusted to account for fade duration
    
    // Abstract animation updates
    const updateAnimation = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const animationDuration = 5000; // 5 seconds
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Update rotation continuously
      setRotation(progress * 360 * 2); // 2 full rotations
      
      // Pulse the scale with a sine wave
      setScale(1 + 0.15 * Math.sin(progress * Math.PI * 6));
      
      // Pulse the opacity with a sine wave
      setOpacity(0.6 + 0.4 * Math.sin(progress * Math.PI * 4));
      
      // Update progress percentage
      setProgress(progress * 100);
      
      // Continue animation until completion
      if (elapsed < animationDuration) {
        animationRef.current = requestAnimationFrame(updateAnimation);
      }
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(updateAnimation);
    
    // Generate floating particles
    const createParticles = () => {
      if (!containerRef.current) return;
      
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        
        // Random size (slightly larger)
        const size = Math.random() * 10 + 5;
        
        // Random position around the animation
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 80;
        const xPos = Math.cos(angle) * distance;
        const yPos = Math.sin(angle) * distance;
        
        // Apply theme-aware styling with CSS variables
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = `translate(-50%, -50%) translate(${xPos}px, ${yPos}px)`;
        
        // Detect dark mode for particle styling
        const isDarkMode = document.documentElement.classList.contains('dark');
        
        // Use theme variables for color with different opacity for dark mode
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          particle.style.background = 'var(--theme-primary)';
          particle.style.opacity = isDarkMode ? '0.8' : '0.6';
          if (isDarkMode) {
            particle.style.boxShadow = '0 0 10px var(--theme-accent-secondary)';
          }
        } else if (colorChoice < 0.66) {
          particle.style.background = 'var(--theme-accent-secondary)';
          particle.style.opacity = isDarkMode ? '0.7' : '0.5';
          if (isDarkMode) {
            particle.style.boxShadow = '0 0 8px var(--theme-accent-secondary)';
          }
        } else {
          particle.style.background = 'var(--theme-accent-tertiary)';
          particle.style.opacity = isDarkMode ? '0.75' : '0.4';
          if (isDarkMode) {
            particle.style.boxShadow = '0 0 12px var(--theme-accent-tertiary)';
          }
        }
        
        containerRef.current.appendChild(particle);
        
        // Animate the particle
        gsap.to(particle, {
          x: xPos + (Math.random() - 0.5) * 40,
          y: yPos + (Math.random() - 0.5) * 40,
          opacity: 0,
          duration: 1.5 + Math.random(),
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    };
    
    // Create particles periodically
    const particleInterval = setInterval(createParticles, 300);
    
    // Clean up all timers and animation frames
    return () => {
      clearTimeout(gradualTextChangeTimer);
      clearTimeout(completionTimer);
      clearInterval(particleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Only run once on mount
  
  // Use GSAP for additional animations and handle dark mode detection
  useGSAP(() => {
    if (containerRef.current) {
      // Detect dark mode
      const darkModeDetected = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkModeDetected);
      
      // Apply dark mode specific styling to the container
      if (darkModeDetected) {
        containerRef.current.style.setProperty('--is-dark-theme', '1');
        containerRef.current.style.setProperty('--is-light-theme', '0');
      } else {
        containerRef.current.style.setProperty('--is-dark-theme', '0');
        containerRef.current.style.setProperty('--is-light-theme', '1');
      }
      
      const ctx = gsap.context(() => {
        // Subtle background pulse animation
        gsap.to(".animation-bg", {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        // Add shimmer effect for dark mode
        if (isDarkMode) {
          gsap.to(".dark-mode-shimmer", {
            x: "200%",
            repeat: -1,
            duration: 2,
            ease: "power1.inOut",
            repeatDelay: 0.5
          });
        }
      }, containerRef);
      
      return () => ctx.revert();
    }
  }, []);
  
  return (
    <div 
      className="p-5 md:p-8 flex flex-col items-center justify-center min-h-[500px]"
      style={{ 
        opacity: componentOpacity,
        transition: 'opacity 200ms ease-out'
      }}
      ref={containerRef}
    >
      <div className="flex flex-col items-center space-y-8 max-w-md mx-auto">
        {/* Loading heading */}
        <h4 className="text-[var(--theme-text-primary)] text-2xl md:text-3xl font-medium text-center tracking-wide">
          Analysing your results
        </h4>
        
        {/* Abstract animation container */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
          {/* Background pulsing effect - different gradients for light/dark mode */}
          <div 
            className="animation-bg absolute inset-0 rounded-full"
            style={{
              background: isDarkMode ? 
                `radial-gradient(circle, var(--theme-accent-secondary-light) 0%, transparent 70%)` : 
                `radial-gradient(circle, var(--theme-primary-light) 0%, transparent 70%)`,
              opacity: 'var(--is-dark-theme, 0) * 0.4 + var(--is-light-theme, 0) * 0.2',
              boxShadow: 'var(--is-dark-theme, 0) * 0 0 50px var(--theme-accent-secondary)',
            }}
          />
          
          {/* Main animation container */}
          <div 
            className="relative z-10"
            style={{
              transform: `rotate(${rotation}deg) scale(${scale})`,
              transition: 'transform 100ms ease-out'
            }}
          >
            {/* Main circle - use theme variables for colors with dark mode support */}
            <div 
              className="w-44 h-44 rounded-full"
              style={{
                border: '6px solid var(--theme-primary)',
                opacity: 'calc(var(--is-dark-theme, 0) * 0.6 + var(--is-light-theme, 0) * 0.3)',
                boxShadow: 'var(--theme-shadow-primary), var(--is-dark-theme, 0) * 0 0 30px var(--theme-accent-secondary)'
              }}
            >
              {/* Dark mode shimmer effect */}
              <div className="dark-mode-shimmer absolute inset-0 w-full h-full rounded-full overflow-hidden">
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[var(--theme-accent-secondary-light)]/30 to-transparent -translate-x-full"></div>
              </div>
            </div>
            
            {/* Orbiting elements - use theme color variables with dark mode support */}
            <div 
              className="absolute w-12 h-12 rounded-full"
              style={{ 
                top: '0%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                opacity: 'calc(var(--is-dark-theme, 0) * 0.8 + var(--is-light-theme, 0) * ' + opacity + ')',
                background: 'var(--theme-primary)',
                boxShadow: 'var(--is-dark-theme, 0) * 0 0 25px var(--theme-accent-secondary) + var(--is-light-theme, 0) * 0 0 18px var(--theme-primary)'
              }}
            ></div>
            
            <div 
              className="absolute w-8 h-8 rounded-full"
              style={{ 
                top: '75%', 
                left: '25%', 
                transform: 'translate(-50%, -50%)',
                opacity: 'calc(var(--is-dark-theme, 0) * 0.7 + var(--is-light-theme, 0) * ' + (opacity * 0.8) + ')',
                background: 'var(--theme-accent-secondary)',
                boxShadow: 'var(--is-dark-theme, 0) * 0 0 20px var(--theme-accent-secondary) + var(--is-light-theme, 0) * 0 0 12px var(--theme-accent-secondary)'
              }}
            ></div>
            
            <div 
              className="absolute w-10 h-10 rounded-full"
              style={{ 
                top: '75%', 
                left: '75%', 
                transform: 'translate(-50%, -50%)',
                opacity: 'calc(var(--is-dark-theme, 0) * 0.75 + var(--is-light-theme, 0) * ' + (opacity * 0.9) + ')',
                background: 'var(--theme-accent-tertiary)',
                boxShadow: 'var(--is-dark-theme, 0) * 0 0 22px var(--theme-accent-tertiary) + var(--is-light-theme, 0) * 0 0 15px var(--theme-accent-tertiary)'
              }}
            ></div>
            
            {/* Inner rotating segment */}
            <div 
              className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full overflow-hidden"
              style={{ transform: 'translate(-50%, -50%) rotate(-60deg)' }}
            >
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  opacity: 'calc(var(--is-dark-theme, 0) * 0.7 + var(--is-light-theme, 0) * 0.4)',
                  transform: `rotate(${-rotation * 1.5}deg)`,
                  clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%)',
                  background: 'linear-gradient(to right, var(--theme-primary), var(--theme-primary-hover))',
                  boxShadow: 'var(--is-dark-theme, 0) * 0 0 20px var(--theme-accent-secondary)'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Progress indicator with dark mode enhancements */}
        <div className="w-full max-w-xs rounded-full h-2 overflow-hidden"
             style={{ 
               background: 'var(--is-dark-theme, 0) * var(--theme-bg-surface)/30 + var(--is-light-theme, 0) * var(--theme-bg-surface)/20',
               boxShadow: 'var(--is-dark-theme, 0) * inset 0 0 5px rgba(0,0,0,0.3)'
             }}>
          <div 
            className="h-full rounded-full relative"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, var(--theme-primary), var(--theme-primary-hover))',
              transition: 'width 100ms ease-out',
              boxShadow: 'var(--is-dark-theme, 0) * 0 0 8px var(--theme-accent-secondary)'
            }}
          >
            {/* Shimmer effect for progress bar */}
            <div className="dark-mode-shimmer absolute inset-0 w-full h-full">
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--theme-accent-secondary-light)]/40 to-transparent -translate-x-full"></div>
            </div>
          </div>
        </div>
        
        {/* Message changes with smooth fade effect */}
        <div className="h-8 flex items-center justify-center mt-2 relative overflow-hidden">
          <p 
            className="text-[var(--theme-text-secondary)] text-center absolute inset-0 flex items-center justify-center"
            style={{
              opacity: resultsCalculated ? 0 : 1,
              transform: `translateY(${resultsCalculated ? '-20px' : '0'})`,
              transition: 'opacity 800ms ease, transform 800ms ease'
            }}
          >
            Analyzing your responses to find the perfect match...
          </p>
          
          <p 
            className="text-[var(--theme-text-secondary)] text-center absolute inset-0 flex items-center justify-center"
            style={{
              opacity: resultsCalculated ? 1 : 0,
              transform: `translateY(${resultsCalculated ? '0' : '20px'})`,
              transition: 'opacity 800ms ease, transform 800ms ease'
            }}
          >
            Results calculated
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaLoadingAnimation;