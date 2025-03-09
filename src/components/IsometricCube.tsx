// IsometricCube.tsx
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
}: IsometricCubeProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const wiggleAnimationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

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

    // If hovered, start the wiggle animation
    if (isHovered) {
      // Set initial position to center
      gsap.set(wrapperRef.current, { rotateY: 0, rotateX: 0 });
      
      // Super simple oscillation
      wiggleAnimationRef.current = gsap.fromTo(
        wrapperRef.current, 
        { rotateY: -6 }, // Start from left position
        {
          rotateY: 6,  
          scale: 1,  // End at right position
          duration: 0.4, // Fast
          ease: "sine.inOut", 
          repeat: -1,    // Infinite
          yoyo: true,    // Go back and forth
          immediateRender: true, // Force render at start value
          onMouseEnter: () => {
            gsap.to(wrapperRef.current, {
              rotateX: 5,
              duration: 0.5,
              ease: "elastic.out(1, 0.8)"
            });
          },
          onMouseLeave: () => {
            gsap.to(wrapperRef.current, {
              rotateX: -5,
              duration: 0.5,
              ease: "elastic.out(1, 0.8)"
            });
          }
        }
      );
    }
    
    return () => {
      // Cleanup animation on component unmount
      if (wiggleAnimationRef.current) {
        wiggleAnimationRef.current.kill();
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave();
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
        zIndex: zIndex      
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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


