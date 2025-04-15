import React, { useEffect, useRef, useState } from 'react';

interface WordRollerProps {
  words?: string[];
  className?: string;
  onComplete?: () => void;
}

// Component with just rolling text, no fixed prefix
export const WordRoller: React.FC<WordRollerProps> = ({ 
  words = [
    "design.",
    "prototype.",
    "solve.",
    "build.",
    "develop.",
    "debug.",
    "learn.",
    "cook.",
    "ship.",
    "prompt.",
    "collaborate.",
    "create.",
    "inspire.",
    "follow.",
    "innovate.",
    "test.",
    "optimize.",
    "teach.",
    "visualize.",
    "transform.",
    "scale.",
    "do it."
  ],
  className = "",
  onComplete
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!listRef.current) return;
    
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9, // When item is 60% visible
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const index = parseInt(entry.target.dataset.index || '0');
          setActiveIndex(index);
          
          // Check if this is the last word
          if (index === words.length - 1 && !isComplete) {
            setIsComplete(true);
            onComplete?.();
          }
        }
      });
    }, options);

    // Observe all list items
    const listItems = listRef.current.querySelectorAll('li');
    listItems.forEach(item => observer.current?.observe(item));

    return () => {
      observer.current?.disconnect();
    };
  }, [words.length, isComplete, onComplete]);

  // Calculate gradient colors for items
  const getItemColor = (index: number): string => {
    // Total range divided by number of items
    const step = 40 / words.length;
    const hue = step * index;
    
    // Return OKLCH color
    // 65% lightness and 0.3 chroma are from the original CSS
    return `oklch(65% 0.5 ${hue})`;
  };

  // Special styling for active item
  const getItemStyle = (index: number): React.CSSProperties => {
    return {
      color: getItemColor(index),
      opacity: activeIndex === index ? '1' : '0.2',
      filter: activeIndex === index ? 'brightness(1.2)' : 'none',
      transition: 'opacity 0.3s, filter 0.3s',
    };
  };

  // Special styling for last item (based on original CSS)
  const getLastItemStyle = (index: number): React.CSSProperties => {
    if (index === words.length - 1) {
      return {
        background: 'linear-gradient(currentColor 50%, color-mix(in oklch, Canvas, CurrentColor 25%))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
    }
    return {};
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${className}`}>
      <div className="relative flex flex-col items-center w-full">
        {/* Screen reader content */}
        <span className="sr-only">{words[activeIndex]}</span>
        
        <ul 
          ref={listRef}
          className={`p-0 m-0 list-none font-semibold scroll-smooth text-center hide-scrollbar w-full ${className}`}
          style={{ 
            scrollSnapType: 'y proximity',
            maxHeight: '100vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {words.map((word, i) => (
            <li
              key={i}
              data-index={i}
              className={`scroll-snap-align-center w-full ${className}`}
              style={{
                ...getItemStyle(i),
                ...getLastItemStyle(i),
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(5rem, 15vw, 25rem)',
                lineHeight: '1',
                padding: '0'
              }}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordRoller; 