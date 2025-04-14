import React, { useEffect, useRef, useState } from 'react';

interface WordRollerWithPrefixProps {
  prefix?: string;
  words?: string[];
  className?: string;
  prefixClassName?: string;
  listClassName?: string;
  itemClassName?: string;
}

// Component where a prefix stays in place while words roll
export const WordRollerWithPrefix: React.FC<WordRollerWithPrefixProps> = ({ 
  prefix = "you can", 
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
  prefixClassName = "",
  listClassName = "",
  itemClassName = "",
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // When item is 60% visible
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const index = parseInt(entry.target.dataset.index || '0');
          setActiveIndex(index);
        }
      });
    }, options);

    // Observe all list items
    const listItems = listRef.current.querySelectorAll('li');
    listItems.forEach(item => observer.current?.observe(item));

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  // Calculate gradient colors for items
  const getItemColor = (index: number): string => {
    // Total range divided by number of items
    const step = 360 / words.length;
    const hue = step * index;
    
    // Return OKLCH color
    // 65% lightness and 0.3 chroma are from the original CSS
    return `oklch(65% 0.3 ${hue})`;
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

  return (
    <div className={`flex items-center ${className}`}>
      <h2 className={`sticky top-[calc(50%-0.5lh)] text-4xl sm:text-5xl md:text-6xl font-semibold m-0 ${prefixClassName}`}>
        <span aria-hidden="true" className="mr-1">{prefix}&nbsp;</span>
        <span className="sr-only">{prefix} {words[activeIndex]}</span>
      </h2>
      
      <ul 
        ref={listRef}
        className={`p-0 m-0 list-none font-semibold scroll-smooth ${listClassName}`}
        style={{ scrollSnapType: 'y proximity' }}
      >
        {words.map((word, i) => (
          <li
            key={i}
            data-index={i}
            className={`scroll-snap-align-center text-4xl sm:text-5xl md:text-6xl ${itemClassName}`}
            style={getItemStyle(i)}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordRollerWithPrefix; 