/* Updated return block of the WordRoller component */
return (
  <div className={`min-h-screen w-full flex items-center justify-center overflow-hidden ${className}`}> 
    <div className="relative flex flex-col items-center w-full">
      {/* Screen reader content */}
      <span className="sr-only">{words[activeIndex]}</span>
      
      <ul 
        ref={listRef}
        className={`p-0 m-0 list-none font-extrabold scroll-smooth text-center hide-scrollbar w-full ${className}`}
        style={{ 
          scrollSnapType: 'y mandatory', // More dramatic snapping
          height: '100vh',               // Fixed height to fill screen
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
              height: '100vh',               // Fill viewport height
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: 'clamp(8rem, 20vw, 30rem)', // Dramatically larger text
              lineHeight: '0.9',                     // Tighter line height
              padding: '0',
              fontWeight: '900'                      // Extra bold for impact
            }}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  </div>
); 