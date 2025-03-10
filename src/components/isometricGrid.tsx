import React, { useState, useEffect, useRef } from 'react';
// Include the file extension in the import statement
import IsometricCube from '@/components/isometricCube.tsx';
import { gsap } from 'gsap';

/**
 * Defines a custom position for a specific cube in the grid
 */
interface CustomCubePosition {
  row: number;
  col: number;
  isGlowing?: boolean;
  color?: string;
  // We no longer need x and y here since they'll be calculated from row and col
}

/**
 * IsometricGridProps defines all configurable aspects of the isometric grid
 */
interface IsometricGridProps {
  // Grid dimensions
  rows?: number;
  cols?: number;
  // Cube size
  cubeSize?: number;
  // Spacing between cubes
  horizontalSpacing?: number;
  verticalSpacing?: number;
  // Container dimensions
  containerWidth?: number;
  containerHeight?: number;
  // Custom positions for specific cubes
  customCubes?: CustomCubePosition[];
  // Show gap pattern (creates visual holes in the grid if true)
  showGapPattern?: boolean;
  // Grid offset for positioning
  offsetX?: number;
  offsetY?: number;
}

// Define a type for the color keys (excluding the nested objects)
type ColorKey = 'DEFAULT' | 'WHITE' | 'ORANGE' | 'BLUE' | 'TEAL_DARK' | 'TEAL_LIGHT' | 'RED' | 'MAROON';

const COLORS = {
  // Original sRGB colors for fallback
    DEFAULT: '#001C24',  // Dark teal
    WHITE: '#888888',
    ORANGE: '#CF5614',   // Brand orange
    BLUE: '#387292',     // Secondary teal
    TEAL_DARK: '#0F3641', // Darker teal
    TEAL_LIGHT: '#175A65', // Light teal
    RED: '#D30F0A', // Red
    MAROON: '#A9323F', // Maroon
    
  // P3 and HDR versions using OKLCH
  P3: {
    DEFAULT: 'oklch(0.209 0.038 219.5deg)',  // #001C24
    WHITE: 'oklch(68.09% 0.1996 43.46)',  // #888888
    ORANGE: 'oklch(0.683 0.25 47.5deg)',  // #A1552B
    BLUE: 'oklch(0.527 0.079 235.1deg)',  // #387292
    TEAL_DARK: 'oklch(0.311 0.047 220.1deg)',  // #0F3641
    TEAL_LIGHT: 'oklch(0.432 0.066 210.9deg)',  // #175A65
    RED: 'oklch(0.548 0.219 29.1deg)',  // #D30F0A
    MAROON: 'oklch(0.6 0.116 16.2deg)',  // #87323C
  },
  
  // Enhanced HDR versions for XDR display
  HDR: {
    DEFAULT: 'oklch(0.188 0.046 219.5deg)',
    WHITE: 'oklch(0.850 0.001 89.9deg)',
    ORANGE: 'oklch(0.613 0.259 47.5deg)',
    BLUE: 'oklch(0.606 0.178 235.1deg)',
    TEAL_DARK: 'oklch(0.295 0.066 220.1deg)',
    TEAL_LIGHT: 'oklch(0.410 0.092 210.9deg)',
    RED: 'oklch(0.630 0.400 29.1deg)',
    MAROON: 'oklch(0.419 0.244 16.2deg)'
  }
} as const;

/**
 * Gets the appropriate color value based on browser support
 * @param colorKey The key of the color in the COLORS object
 * @param useHDR Whether to use HDR enhanced colors
 */
const getColor = (colorKey: ColorKey, useHDR = false) => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return COLORS[colorKey];
  
  // Check for P3/OKLCH support
  const hasP3Support = window.CSS && 
    CSS.supports && 
    (CSS.supports('color', 'color(display-p3 0 0 0)') || 
     CSS.supports('color', 'oklch(0% 0 0)'));
     
  // Check for HDR support
  const hasHDRSupport = useHDR && 
    window.matchMedia && 
    window.matchMedia('(dynamic-range: high)').matches;
  
  // Choose the appropriate color format
  if (hasHDRSupport && colorKey in COLORS.HDR) {
    return COLORS.HDR[colorKey as keyof typeof COLORS.HDR];
  } else if (hasP3Support && colorKey in COLORS.P3) {
    return COLORS.P3[colorKey as keyof typeof COLORS.P3];
  }
  
  // Fallback to standard sRGB
  return COLORS[colorKey];
};

/**
 * IsometricGrid creates a grid of isometric cubes with configurable dimensions and spacing.
 * 
 * The grid follows a true isometric layout with:
 * - Even rows having cubes in columns 0, 2, 4, etc.
 * - Odd rows having cubes in columns 1, 3, 5, etc.
 * 
 * This creates the diamond pattern characteristic of isometric projections.
 */
const IsometricGrid: React.FC<IsometricGridProps> = ({
  rows = 9,
  cols = 7,
  cubeSize = 75,
  horizontalSpacing = 50, 
  verticalSpacing = 50,
  containerWidth = 550,
  containerHeight = 550,
  customCubes,
  showGapPattern = false,
  offsetX = 0,
  offsetY = 0
}) => {
  const [activeCubes, setActiveCubes] = useState<{row: number, col: number}[]>([]);
  const [hoveredCube, setHoveredCube] = useState<{row: number, col: number} | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const wiggleAnimationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  
  // Initialize with specific active cubes for visual interest
  useEffect(() => {
    // Only set initial active cubes if not using custom cubes
    if (!customCubes) {
      const initialActive = [
        { row: 2, col: 3 },
        { row: 4, col: 3 },
        { row: 5, col: 2 },
        { row: 6, col: 5 },
        { row: 8, col: 3 }
      ];
      setActiveCubes(initialActive);
    }
  }, [customCubes]);

  // Add subtle wiggle animation to the entire grid
  useEffect(() => {
    if (!gridContainerRef.current) return;

    // Clean up any existing animation
    if (wiggleAnimationRef.current) {
      wiggleAnimationRef.current.kill();
    }

    // Create a very subtle, slow wiggle animation for the entire grid
    // Using very small values to maintain orthographic appearance
    wiggleAnimationRef.current = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: isInteracting, // Pause animation when user is interacting
    })
    .to(gridContainerRef.current, {
      // Use translateX/Y instead of skew to maintain true isometric look
      translateX: "2px", 
      translateY: "1px",
      scale: 1.002, // Extremely subtle scale up
      duration: 12, // Very slow animation (12 seconds)
      ease: "sine.inOut"
    })
    .to(gridContainerRef.current, {
      translateX: "-2px", 
      translateY: "-1px",
      scale: 0.998, // Extremely subtle scale down
      duration: 12,
      ease: "sine.inOut"
    });

    return () => {
      if (wiggleAnimationRef.current) {
        wiggleAnimationRef.current.kill();
      }
    };
  }, [isInteracting]);
  
  // Effect to handle pausing/resuming the animation based on interaction state
  useEffect(() => {
    if (!wiggleAnimationRef.current || !gridContainerRef.current) return;
    
    if (isInteracting) {
      // Smoothly transition to neutral position when pausing
      gsap.to(gridContainerRef.current, {
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (wiggleAnimationRef.current) {
            wiggleAnimationRef.current.pause();
          }
        }
      });
    } else {
      // Resume the animation
      wiggleAnimationRef.current.play();
    }
  }, [isInteracting]);
  
  const handleCubeClick = (row: number, col: number) => {
    setIsInteracting(true); // Set interacting state
    
    const isActive = activeCubes.some(cube => cube.row === row && cube.col === col);
    
    if (isActive) {
      setActiveCubes(prev => prev.filter(cube => !(cube.row === row && cube.col === col)));
    } else {
      setActiveCubes(prev => [...prev, { row, col }]);
    }
    
    // Reset interaction state after a short delay
    setTimeout(() => setIsInteracting(false), 1000);
  };
  
  const handleCubeHover = (row: number, col: number) => {
    setIsInteracting(true);
    setHoveredCube({ row, col });
  };
  
  const handleCubeLeave = () => {
    setIsInteracting(false);
    setHoveredCube(null);
  };
  
  /**
   * Convert row and column to isometric x,y position
   */
  const calculateIsometricPosition = (row: number, col: number) => {
    // Calculate center offsets to position the grid in the container
    const gridWidth = cols * horizontalSpacing;
    const gridHeight = rows * verticalSpacing;
    const centerOffsetX = (containerWidth - gridWidth) / 2;
    const centerOffsetY = (containerHeight - gridHeight) / 2;

    // In a true isometric grid, we need to calculate the diamond pattern
    // where every other row is offset by half a cube
    const x = centerOffsetX + col * horizontalSpacing + (row % 2 === 1 ? horizontalSpacing / 2 : 0) + offsetX;
    const y = centerOffsetY + row * verticalSpacing + offsetY;
    
    return { x, y };
  };
  
  // Calculate all grid positions based on isometric projection
  const calculateAllGridPositions = () => {
    const positions: CustomCubePosition[] = [];
    
    for (let row = 0; row < rows; row++) {
      const maxCol = cols - 1;
      for (let col = 0; col <= maxCol; col++) {
        // Apply gap pattern if requested (skips some positions to create a visual pattern)
        if (showGapPattern && ((row + col) % 3 === 0)) {
          continue;
        }
        
        positions.push({
          row,
          col,
          isGlowing: false,
          color: COLORS.DEFAULT
        });
      }
    }
    
    return positions;
  };
  
  const renderGrid = () => {
    // Use custom cube positions if provided, otherwise calculate based on grid parameters
    const cubePositions = customCubes || calculateAllGridPositions();
    
    return cubePositions.map((pos, index) => {
      // Calculate the actual x,y position from row,col coordinates
      const { x, y } = calculateIsometricPosition(pos.row, pos.col);
      
      // Determine if this cube should be glowing
      const isActive = pos.isGlowing || activeCubes.some(cube => cube.row === pos.row && cube.col === pos.col);
      const isHovered = hoveredCube?.row === pos.row && hoveredCube?.col === pos.col;
      
      // Determine cube color
      let cubeColor = pos.color || COLORS.DEFAULT;
      
      // Active cubes are orange (if no custom color specified)
      if (isActive && !pos.color) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cubeColor = COLORS.ORANGE;
      } 
      
      return (
        <IsometricCube
          key={`cube-${pos.row}-${pos.col}-${index}`}
          size={cubeSize}
          position={{ x, y }}
          color={!isActive ? getColor('DEFAULT') :pos.color || getColor(isActive ? 'ORANGE' : 'DEFAULT', isActive)}
          isGlowing={isActive}
          glowColor={pos.color || getColor(isActive ? 'DEFAULT' : 'DEFAULT', isActive)} // Use HDR version for glow if supported
          onClick={() => handleCubeClick(pos.row, pos.col)}
          onMouseEnter={() => handleCubeHover(pos.row, pos.col)}
          onMouseLeave={handleCubeLeave}
          rotationDirection={isHovered ? (Math.random() > 0.5 ? 1 : -1) : 0}
          zIndex={pos.row + pos.col}
          useP3Colors={true}
        />
      );
    });
  };
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        ref={gridContainerRef}
        className="relative" 
        style={{ 
          width: `${containerWidth}px`, 
          height: `${containerHeight}px`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        {renderGrid()}
      </div>
    </div>
  );
};

export default IsometricGrid
export { COLORS }