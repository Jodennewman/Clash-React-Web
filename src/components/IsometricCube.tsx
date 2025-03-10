// isometricCube.tsx
// Ensuring this file is included in the Git commit for Vercel deployment
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './isometricCube.css';

interface CubeCustomProperties extends React.CSSProperties {
  '--cube-size'?: string;
  '--glow-color'?: string;
  '--cube-color'?: string;
}

interface IsometricCubeProps {
  size?: number;
  position: { x: number; y: number };
  color: string;
  isGlowing?: boolean;
  glowColor?: string;
  rotationDirection?: number;
  useP3Colors?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  zIndex: number;
}

const IsometricCube = ({ 
  size = 100, 
  position, 
  isGlowing = false,
  glowColor = '#FFFFFF',
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  color,
  zIndex,
  rotationDirection = 0,
}: IsometricCubeProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const wiggleAnimationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const idleAnimationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  // Effect to handle the idle animation (very subtle rotation)
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    // Clean up any existing idle animation
    if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;
    }
    
    // Only create idle animation if not hovered
    if (!isHovered) {
      // Create a very subtle rotation animation
      // The rotation amount is based on the rotationDirection prop
      const rotationAmount = rotationDirection * 0.1; // Very subtle rotation
      
      // Create a slow, subtle rotation animation
      idleAnimationRef.current = gsap.timeline({
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      
      // Add the animation steps with very subtle movements
      idleAnimationRef.current
        .to(wrapperRef.current, {
          rotateX: `${rotationAmount * 0.3}deg`, // Even more subtle on X axis
          rotateY: `${rotationAmount}deg`,       // Main rotation on Y axis
          rotateZ: `${rotationAmount * 0.2}deg`, // Very subtle on Z axis
          duration: 12 + Math.abs(rotationDirection), // Longer duration for slower movement
          ease: "sine.inOut"
        });
    }
    
    return () => {
      if (idleAnimationRef.current) {
        idleAnimationRef.current.kill();
        idleAnimationRef.current = null;
        
        // Reset transforms when cleaning up
        if (wrapperRef.current && !isHovered) {
          gsap.set(wrapperRef.current, { 
            clearProps: "rotateX,rotateY,rotateZ" 
          });
        }
      }
    };
  }, [isHovered, rotationDirection]);

  // Effect to handle the wiggle animation when hover state changes
  useEffect(() => {
    if (!wrapperRef.current) return;

    // Kill any existing animation
    if (wiggleAnimationRef.current) {
      wiggleAnimationRef.current.kill();
      wiggleAnimationRef.current = null;
      
      // Reset position when animation stops
      gsap.set(wrapperRef.current, { 
        clearProps: "transform,rotateY,rotateX,scale" 
      });
    }
    
    // Kill idle animation when hovering
    if (idleAnimationRef.current && isHovered) {
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;
    }

    // If hovered, start the wiggle animation
    if (isHovered) {
      // Set initial position to center
      gsap.set(wrapperRef.current, { rotateY: 0, rotateX: 0 });
      
      // Create a smooth wiggle animation
      wiggleAnimationRef.current = gsap.timeline({ 
        repeat: -1,  // Infinite repeat while hovered
        yoyo: true,  // Smooth back-and-forth
        paused: false,
        onComplete: () => {
          // Ensure we reset when complete (though with infinite repeat, this won't trigger)
          gsap.set(wrapperRef.current, { clearProps: "rotateY,rotateX" });
        }
      });
      
      // Add the animation steps
      wiggleAnimationRef.current
        .to(wrapperRef.current, {
          rotateY: -4,  // Less extreme rotation to reduce jitter
          duration: 0.4, // Slower for smoother motion
          ease: "sine.inOut"
        })
        .to(wrapperRef.current, {
          rotateY: 4,
          duration: 0.4,
          ease: "sine.inOut"
        });
    }
    
    return () => {
      // Cleanup animation on component unmount or when effect reruns
      if (wiggleAnimationRef.current) {
        wiggleAnimationRef.current.kill();
        wiggleAnimationRef.current = null;
        
        // Important: Reset the transform to prevent stuck animations
        if (wrapperRef.current) {
          gsap.set(wrapperRef.current, { 
            clearProps: "transform,rotateY,rotateX,scale" 
          });
        }
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    // Smoothly transition from idle to hover state
    if (idleAnimationRef.current) {
      // Kill the idle animation
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;
      
      // Smoothly transition to neutral position before starting hover animation
      gsap.to(wrapperRef.current, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Now we're ready for the hover state
          setIsHovered(true);
          onMouseEnter();
        }
      });
    } else {
      // If no idle animation, just set hover state directly
      setIsHovered(true);
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    // Smoothly transition from hover to idle state
    if (wiggleAnimationRef.current) {
      // Kill the hover animation
      wiggleAnimationRef.current.kill();
      wiggleAnimationRef.current = null;
      
      // Reset to neutral position
      gsap.to(wrapperRef.current, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Now we're ready for the idle state
          setIsHovered(false);
          onMouseLeave();
        }
      });
    } else {
      // If no hover animation, just set idle state directly
      setIsHovered(false);
      onMouseLeave();
    }
  };

  // Height is slightly adjusted to enhance the 3D effect
  const heightAdjust = size * 1;

  // Modern browsers will use the OKLCH values directly
  // while others will fall back to the CSS custom property value
    
  const getCubeStyles = (): CubeCustomProperties => {
    return {
      '--cube-size': `${size}px`,
      '--glow-color': glowColor,
      '--cube-color': color,
    };
  };

  return (
    <div 
      ref={wrapperRef}
      className="isometric-cube-wrapper"
      style={{
        left: position.x,
        top: position.y,
        width: `${size}px`,
        height: `${heightAdjust}px`,
        zIndex: zIndex,
        transformStyle: 'preserve-3d',
        overflow: 'visible' // Ensure the glow isn't clipped
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Simplified glow effect - only shown when isGlowing is true */}
      {isGlowing && (
        <div 
          className="cube-glow-effect"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${size * 1.2}px`, // Reduced from 1.5x to 1.2x
            height: `${size * 1.2}px`,
            transform: 'translate(-50%, -50%) rotateX(45deg) rotateZ(-45deg)',
            zIndex: 0, // Position behind the cube but not -1
            filter: 'blur(8px)', // Reduced blur from 15px to 8px
            opacity: 0.6, // Reduced opacity from 0.8 to 0.6
            pointerEvents: 'none',
            backgroundColor: glowColor,
            borderRadius: '30%',
          }}
        />
      )}
      
      <div 
        ref={cubeRef}
        className={`isometric-cube ${isGlowing ? 'isometric-cube--glowing' : ''}`}
        style={getCubeStyles()}
      >
        <div className="cube-face cube-face--top"></div>
        <div className="cube-face cube-face--left"></div>
        <div className="cube-face cube-face--right"></div>
      </div>
    </div>
  );
};

export default IsometricCube;


