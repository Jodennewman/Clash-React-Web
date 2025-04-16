import React, { useEffect, useState, useRef } from 'react';

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
  // Smooth progress animation from 0-100%
  const [progress, setProgress] = useState(0);
  const [resultsCalculated, setResultsCalculated] = useState(false);
  const [componentOpacity, setComponentOpacity] = useState(1);
  
  // Refs for animation handling
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  
  // Run on component mount - with precise timing control
  useEffect(() => {
    // Animation duration constants
    const PROGRESS_DURATION_MS = 5000; // 5 seconds for progress bar
    const COMPLETION_MS = 6000; // Complete at exactly 6 seconds
    
    // Record start time with high precision
    startTimeRef.current = performance.now();
    console.log("Animation started at:", new Date().toISOString());
    
    // Gradually transition to results calculated at 80% of the animation
    const gradualTextChangeTimer = setTimeout(() => {
      const elapsed = performance.now() - startTimeRef.current;
      console.log(`Beginning text fade to "Results calculated" at ${elapsed.toFixed(2)}ms`);
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
        const elapsed = performance.now() - startTimeRef.current;
        console.log(`Component completed at ${elapsed.toFixed(2)}ms`);
        onComplete();
      }, 200); // Short fade out
    }, COMPLETION_MS - 200); // Adjusted to account for fade duration
    
    // Smooth animation function using requestAnimationFrame with easing
    const animateProgress = (timestamp: number) => {
      // Calculate elapsed time precisely
      const elapsed = timestamp - startTimeRef.current;
      
      // Calculate exact progress percentage (0-100) with slight easing
      // This creates a more natural loading feel - starting faster and slowing slightly toward the end
      const ratio = elapsed / PROGRESS_DURATION_MS;
      // Ease-out cubic formula: creates a slightly more natural feeling progression
      const easedProgress = Math.min(100 * (1 - Math.pow(1 - ratio, 3)), 100);
      setProgress(easedProgress);
      
      // Continue animation until we reach 100%
      if (elapsed < PROGRESS_DURATION_MS) {
        animationRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Ensure we're at exactly 100% at the end
        setProgress(100);
      }
    };
    
    // Start the animation loop
    animationRef.current = requestAnimationFrame(animateProgress);
    
    // Clean up all timers and animation frames
    return () => {
      clearTimeout(gradualTextChangeTimer);
      clearTimeout(completionTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      console.log("Cleaning up animation timers and frames");
    };
  }, []); // Only run once on mount
  
  return (
    <div 
      className="p-5 md:p-6 flex flex-col items-center justify-center min-h-[300px]"
      style={{ 
        opacity: componentOpacity,
        transition: 'opacity 200ms ease-out'
      }}
    >
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
        {/* Loading message */}
        <h3 className="text-theme-primary text-xl font-medium text-center">
          {message}
        </h3>
        
        {/* Enhanced circular loading animation with particle effects */}
        <div className="relative h-32 w-32">
          {/* Pulsing background effect - subtle engagement */}
          <div 
            className="absolute inset-0 rounded-full" 
            style={{
              background: `radial-gradient(circle, rgba(0,102,204,0.15) ${progress/3}%, transparent ${progress/2 + 50}%)`,
              opacity: progress / 300 + 0.5,
              transition: 'all 300ms ease-out'
            }}
          />
          
          {/* Smooth blue progress circle */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            {/* Background track circle - always visible */}
            <circle 
              strokeWidth="5"
              stroke="rgba(224,224,224,0.6)" /* Light gray track with transparency */
              strokeLinecap="round"
              fill="transparent"
              r="47"
              cx="50"
              cy="50"
            />
            
            {/* Foreground progress circle with gradient */}
            <circle 
              strokeWidth="6"
              stroke="url(#blueGradient)" /* Use gradient for more visual interest */
              strokeLinecap="round"
              fill="transparent"
              r="47"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: 2 * Math.PI * 47,
                strokeDashoffset: 2 * Math.PI * 47 * (1 - progress / 100),
                transformOrigin: '50% 50%',
                transform: 'rotate(-90deg)',
                transition: 'stroke-dashoffset 100ms cubic-bezier(0.4, 0.0, 0.2, 1)' // Smoother easing
              }}
            />
            
            {/* Define gradient for progress circle */}
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0080FF" />
                <stop offset="100%" stopColor="#0055CC" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Progress percentage in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-theme-primary font-medium"
              style={{
                fontSize: '1.1rem',
                opacity: progress > 10 ? 1 : 0,
                transition: 'opacity 300ms ease'
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        
        {/* Message changes with smooth fade effect */}
        <div className="h-14 flex items-center justify-center mt-4 relative overflow-hidden">
          <p 
            className="text-theme-secondary text-center opacity-90 text-lg font-medium absolute inset-0 flex items-center justify-center"
            style={{
              opacity: resultsCalculated ? 0 : 1,
              transform: `translateY(${resultsCalculated ? '-20px' : '0'})`,
              transition: 'opacity 800ms ease, transform 800ms ease'
            }}
          >
            Analyzing your responses to find the perfect match...
          </p>
          
          <p 
            className="text-theme-secondary text-center opacity-90 text-lg font-medium absolute inset-0 flex items-center justify-center"
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