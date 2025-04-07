import React, { useEffect, useState, useMemo } from 'react';

interface IsometricGridBackgroundProps {
  className?: string;
}

const IsometricGridBackground: React.FC<IsometricGridBackgroundProps> = ({ className = '' }) => {
  const [gridColor, setGridColor] = useState('var(--theme-text-primary)');
  // Generate a unique ID for this component instance
  const patternId = useMemo(() => `isometricGrid-${Math.random().toString(36).substr(2, 9)}`, []);
  
  // Get the theme-aware color from CSS variables
  useEffect(() => {
    const updateGridColor = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const textPrimaryColor = computedStyle.getPropertyValue('--theme-text-primary').trim();
      // Use theme-text-primary with reduced opacity for subtle grid
      setGridColor(textPrimaryColor || 'rgba(18, 46, 59, 0.2)');
    };
    
    // Initial color update
    updateGridColor();
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateGridColor();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={`absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${className}`}
      style={{ 
        opacity: 0.25,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        style={{ minWidth: '100%', minHeight: '100%' }} 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <pattern 
            id={patternId}
            patternUnits="userSpaceOnUse" 
            width="141.47" 
            height="85.12" 
            patternTransform="scale(0.5) rotate(0)"
          >
            {/* Path elements for isometric grid */}
            <path d="M70.99,84.98l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM64.27,81.22l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM83.71,77.28l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM51.54,73.52l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM96.44,69.58l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM38.81,65.82l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM109.17,61.88l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM26.08,58.12l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM121.9,54.17l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM13.36,50.41l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM134.63,46.47l-.35-.21,6.31-3.82.13.08.18-.11.23.14-6.49,3.93ZM.63,42.71l-.28-.17,6.54-3.96.35.21-6.36,3.85-.08-.05-.18.11ZM134.17,38.77l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM13.61,34.95l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM121.45,31.07l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM26.34,27.25l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM108.72,23.37l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM39.07,19.55l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM95.99,15.66l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM51.8,11.84l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM83.26,7.96l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM64.52,4.14l-.35-.21L70.53.08l.35.21-6.36,3.85Z" style={{fill: gridColor, opacity: 0.5}}/>
            <path d="M47.57,70.9l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM60.3,63.2l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM73.03,55.5l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM85.75,47.8l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM98.48,40.09l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM111.21,32.39l-.35-.21,6.36-3.85.35.21-6.36,3.85Z" style={{fill: gridColor, opacity: 0.5}}/>
            <path d="M24.23,56.78l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM36.95,49.08l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM49.68,41.37l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM62.41,33.67l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM75.14,25.97l-.35-.21,6.36-3.85.35.21-6.36,3.85ZM87.87,18.27l-.35-.21,6.36-3.85.35.21-6.36,3.85Z" style={{fill: gridColor, opacity: 0.5}}/>
            <path d="M117.22,56.76l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM104.49,49.06l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM91.76,41.36l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM79.04,33.66l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM66.31,25.95l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM53.58,18.25l-6.36-3.85.35-.21,6.36,3.85-.35.21Z" style={{fill: gridColor, opacity: 0.5}}/>
            <path d="M93.88,70.89l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM81.15,63.19l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM68.42,55.48l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM55.69,47.78l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM42.96,40.08l-6.36-3.85.35-.21,6.36,3.85-.35.21ZM30.24,32.38l-6.36-3.85.35-.21,6.36,3.85-.35.21Z" style={{fill: gridColor, opacity: 0.5}}/>
            <path d="M71.11,85.12l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM64.04,81.3l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM83.84,77.42l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM51.31,73.6l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM96.57,69.72l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM38.59,65.89l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM109.3,62.01l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM25.86,58.19l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM122.03,54.31l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM13.13,50.49l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM134.75,46.61l-.71-.43,6.36-3.85.25.15.35-.21.45.27-6.72,4.07ZM.4,42.79l-.4-.24,6.67-4.03.71.43-6.31,3.82-.33-.2-.33.23ZM133.95,38.85l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM13.74,35.09l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM121.22,31.15l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM26.47,27.38l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM108.49,23.44l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM39.19,19.68l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM95.76,15.74l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM51.92,11.98l-.71-.43,6.36-3.85.71.43-6.36,3.85ZM83.04,8.04l-6.36-3.85.71-.43,6.36,3.85-.71.43ZM64.65,4.28l-.71-.43,6.36-3.85.71.43-6.36,3.85Z" style={{fill: gridColor, opacity: 0.5}}/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default IsometricGridBackground;