import React, { useEffect } from 'react';
import { getTeamImageCollection } from '../../utils/imageMap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface TeamPhotoDecorationProps {
  memberName?: 'Joden' | 'Alex' | 'Tia' | 'Aydan' | 'random';
  count?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'random';
  parentSelector?: string;
  maxWidth?: number;
  opacity?: number;
}

/**
 * Team Photo Decoration Component
 * 
 * A utility component that adds team photos as decorative elements to sections
 * with subtle parallax effects.
 */
export default function TeamPhotoDecoration({
  memberName = 'random',
  count = 1,
  position = 'random',
  parentSelector,
  maxWidth = 140,
  opacity = 0.6,
}: TeamPhotoDecorationProps) {
  // Get images from all team members if random, or specific member
  const randomizeMember = memberName === 'random';
  const teamName = randomizeMember 
    ? ['Joden', 'Alex', 'Tia', 'Aydan'][Math.floor(Math.random() * 4)] 
    : memberName;
  
  // Get images with a low limit to keep it subtle
  const images = getTeamImageCollection(teamName, {
    limit: randomizeMember ? count * 4 : count * 2,
    includeShared: true,
    randomize: true
  });
  
  // Select a subset of the returned images
  const selectedImages = images.slice(0, count);
  
  // Position based on prop or random
  const getPosition = (index: number) => {
    if (position === 'random') {
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      return positions[Math.floor(Math.random() * positions.length)];
    }
    return position;
  };
  
  // Calculate position values based on location
  const getPositionStyles = (positionType: string, index: number) => {
    const baseStyles = {
      top: '10%',
      left: '10%',
      right: 'auto',
      bottom: 'auto',
    };
    
    switch (positionType) {
      case 'top-left':
        return {
          ...baseStyles,
          top: `${5 + (index * 3)}%`,
          left: `${5 + (index * 4)}%`,
        };
      case 'top-right':
        return {
          ...baseStyles,
          top: `${5 + (index * 3)}%`,
          left: 'auto',
          right: `${5 + (index * 4)}%`,
        };
      case 'bottom-left':
        return {
          ...baseStyles,
          top: 'auto',
          bottom: `${5 + (index * 3)}%`,
          left: `${5 + (index * 4)}%`,
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          top: 'auto',
          bottom: `${5 + (index * 3)}%`,
          left: 'auto',
          right: `${5 + (index * 4)}%`,
        };
      default:
        return baseStyles;
    }
  };
  
  // Add parallax effects to the decoration images
  useEffect(() => {
    // Set up context for animations
    const ctx = gsap.context(() => {
      // Get parent element for trigger
      const triggerElement = parentSelector 
        ? document.querySelector(parentSelector) 
        : document.querySelector('.team-photo-decoration')?.parentElement;
      
      if (!triggerElement) return;
      
      // Find all decoration images
      const decorationImages = document.querySelectorAll('.team-photo-decoration img');
      
      // Create a timeline for the animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        }
      });
      
      // Add each image to the timeline
      decorationImages.forEach((img, index) => {
        // Different effect for each image
        const yPercent = ((index % 3) - 1) * 10;
        const xPercent = ((index % 2) * 2 - 1) * 5;
        
        tl.to(img, {
          yPercent,
          xPercent,
          rotate: (index % 2 === 0 ? 2 : -2),
          ease: "none",
        }, 0);
      });
    });
    
    return () => ctx.revert();
  }, [parentSelector, selectedImages]);
  
  // Don't render anything if no images
  if (selectedImages.length === 0) return null;
  
  return (
    <div className="team-photo-decoration">
      {selectedImages.map((img, index) => {
        const pos = getPosition(index);
        const posStyles = getPositionStyles(pos, index);
        
        // Calculate width based on image and index
        const width = maxWidth - (index * 10);
        
        return (
          <div
            key={`decoration-${index}`}
            className="absolute z-1 overflow-hidden pointer-events-none"
            style={{
              ...posStyles,
              width: `${width}px`,
              height: `${width}px`,
              opacity,
              borderRadius: '45%',
              transform: `rotate(${index % 2 === 0 ? 5 : -5}deg)`,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img 
              src={img.url}
              alt="Team decoration"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}