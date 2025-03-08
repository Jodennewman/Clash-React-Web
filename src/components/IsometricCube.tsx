


// IsometricCube.tsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './IsometricCube.css';

interface IsometricCubeProps {
  size?: number;
  position: { x: number; y: number };
  isGlowing?: boolean;
  glowColor?: string;
  rotationDirection?: number; // -1: left, 0: none, 1: right
  onClick?: () => void;
}

const IsometricCube = ({ 
  size = 100, 
  position, 
  isGlowing = false,
  glowColor = '#FEA35D',
  rotationDirection = 0,
  onClick = () => {},
}: IsometricCubeProps) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!cubeRef.current || rotationDirection === 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });
    
    const skewAmount = rotationDirection < 0 ? '-5deg' : '5deg';
    
    tl.to(cubeRef.current, {
      duration: 0.5,
      skewY: skewAmount,
      scaleX: 0.95,
      ease: 'power2.inOut',
    }).to(cubeRef.current, {
      duration: 0.5,
      skewY: '0deg',
      scaleX: 1,
      ease: 'power2.inOut',
    });
  }, [rotationDirection, isAnimating]);

  return (
    <div 
      className="absolute transition-transform cursor-pointer hover:scale-105"
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={onClick}
    >
      <div 
        ref={cubeRef}
        className={`isometric-cube ${isGlowing ? 'glowing' : ''}`}
        style={{
          '--cube-size': `${size}px`,
          '--glow-color': glowColor,
        } as React.CSSProperties}
      >
        <div className="cube-face cube-face-top"></div>
        <div className="cube-face cube-face-left"></div>
        <div className="cube-face cube-face-right"></div>
      </div>
    </div>
  );
};

export default IsometricCube;


