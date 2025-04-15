import { useEffect, useRef, useState } from 'react';

// Component with just rolling text, no fixed prefix
export const WordRoller = ({ 
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
  listClassName = "",
  itemClassName = "",
}) => {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const observer = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // When item is 60% visible
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setActiveIndex(index);
        }
      });
    }, options);

    // Observe all list items
    const listItems = listRef.current.querySelectorAll('li');
    listItems.forEach(item => observer.current.observe(item));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Calculate gradient colors for items
  const getItemColor = (index) => {
    // Total range divided by number of items
    const step = 360 / words.length;
    const hue = step * index;
    
    // Return OKLCH color
    // 65% lightness and 0.3 chroma are from the original CSS
    return `oklch(65% 0.3 ${hue})`;
  };

  // Special styling for active item
  const getItemStyle = (index) => {
    return {
      color: getItemColor(index),
      opacity: activeIndex === index ? '1' : '0.2',
      filter: activeIndex === index ? 'brightness(1.2)' : 'none',
      transition: 'opacity 0.3s, filter 0.3s',
    };
  };

  // Special styling for last item (based on original CSS)
  const getLastItemStyle = (index) => {
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
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="relative flex flex-col items-center">
        {/* Screen reader content */}
        <span className="sr-only">{words[activeIndex]}</span>
        
        <ul 
          ref={listRef}
          className={`p-0 m-0 list-none font-semibold scroll-smooth text-center ${listClassName}`}
          style={{ scrollSnapType: 'y proximity' }}
        >
          {words.map((word, i) => (
            <li
              key={i}
              data-index={i}
              className={`scroll-snap-align-center text-5xl sm:text-6xl md:text-7xl py-3 ${itemClassName}`}
              style={{
                ...getItemStyle(i),
                ...getLastItemStyle(i),
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