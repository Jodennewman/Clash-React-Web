import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// @ts-expect-error -- Vite's import.meta.glob typing issue
const thumbnailContext = import.meta.glob('/src/assets/main/BestThumbnails-webp/*.webp', { eager: true });

interface ThumbnailSplayProps {
  className?: string;
  sizeMultiplier?: number; // Default will be 1
}

const ThumbnailSplay = ({ className = '', sizeMultiplier = 1 }: ThumbnailSplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Base dimensions that will be multiplied by sizeMultiplier
  const baseWidth = 192; // 48 * 4 = 192px (w-48 in Tailwind)
  const baseHeight = 128; // 32 * 4 = 128px (h-32 in Tailwind)

  useEffect(() => {
    // Load all thumbnail paths
    const paths = Object.values(thumbnailContext).map(module => (module as { default: string }).default);
    // Filter out any system files (like ._Boulder10.webp)
    const filteredThumbnails = paths.filter(path => !path.includes('/._'));
    setThumbnails(filteredThumbnails);
  }, []);

  useEffect(() => {
    if (!containerRef.current || thumbnails.length === 0) return;

    const thumbnailElements = containerRef.current.children;
    
    // Initial random arrangement with VS-style starting positions
    gsap.set(thumbnailElements, {
      x: 'random(-120, 120)',
      y: 'random(-60, 60)',
      rotation: 'random(-20, 20)',
      scale: 0.95,
      opacity: 0,
    });

    // Fade in animation with VS-style bubbly effect
    gsap.to(thumbnailElements, {
      opacity: 0.7,
      scale: 1,
      duration: 0.6,
      stagger: 0.12,
      ease: "back.out(1.2)",
    });
  }, [thumbnails]);

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
    if (!containerRef.current) return;

    const thumbnailElements = containerRef.current.children;
    
    // VS-style hover animation
    gsap.to(thumbnailElements[index], {
      scale: 1.2,
      rotation: 0,
      opacity: 1,
      zIndex: 10,
      duration: 0.4,
      ease: "back.out(1.7)",
    });

    // Slightly push away other thumbnails with VS-style effect
    gsap.to(
      Array.from(thumbnailElements)
        .filter((_, i) => i !== index),
      {
        scale: 0.7,
        opacity: 0.5,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = (_index: number) => {
    setSelectedIndex(null);
    if (!containerRef.current) return;

    const thumbnailElements = containerRef.current.children;
    
    // Reset all thumbnails to original state with VS-style animation
    gsap.to(thumbnailElements, {
      scale: 1,
      rotation: (_i) => `random(-20, 20)`,
      opacity: 0.7,
      zIndex: 1,
      duration: 0.4,
      ease: "back.out(1.2)",
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: `${400 * sizeMultiplier}px`
      }}
    >
      {thumbnails.map((thumbnail, index) => (
        <div
          key={thumbnail}
          className={`
            absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
            rounded-lg overflow-hidden cursor-pointer
            transition-shadow duration-300
            ${selectedIndex === index ? 'shadow-xl' : 'shadow-md'}
          `}
          style={{
            width: `${baseWidth * sizeMultiplier}px`,
            height: `${baseHeight * sizeMultiplier}px`
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <img
            src={thumbnail}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ThumbnailSplay;
