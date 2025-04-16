import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ScrollSmootherTest = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    // Log initialization start
    console.log('Attempting to initialize ScrollSmoother...');
    
    try {
      // Only create ScrollSmoother if the wrapper and content exist
      if (wrapperRef.current && contentRef.current) {
        console.log('Required elements found, creating ScrollSmoother');
        
        // Create ScrollSmoother with minimal settings
        const smoother = ScrollSmoother.create({
          smooth: 0.5,
          effects: false,
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          normalizeScroll: false
        });
        
        console.log('ScrollSmoother created successfully:', smoother);
        
        // Return cleanup function
        return () => {
          console.log('Cleaning up ScrollSmoother');
          if (smoother) smoother.kill();
        };
      } else {
        console.error('Missing required elements for ScrollSmoother');
      }
    } catch (error) {
      console.error('Error initializing ScrollSmoother:', error);
    }
  }, []);
  
  return (
    <div className="app-container">
      <h1 className="header-text text-4xl p-4 bg-blue-500 text-white fixed top-0 left-0 right-0 z-50">
        ScrollSmoother Test
      </h1>
      
      <div id="smooth-wrapper" ref={wrapperRef} className="wrapper overflow-hidden">
        <div id="smooth-content" ref={contentRef} className="content bg-gray-100">
          {/* Basic content with clear visual elements */}
          <div className="pt-24 px-4">
            <h2 className="text-2xl font-bold mb-4">Scroll Test Content</h2>
            <p className="mb-4">If you can see this, basic rendering is working...</p>
          </div>
          
          {/* Add lots of content to enable scrolling */}
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index} 
              className="section p-4 my-4 mx-auto max-w-2xl rounded-lg shadow-md"
              style={{ 
                backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef',
                minHeight: '300px'
              }}
            >
              <h3 className="text-xl font-semibold mb-2">Section {index + 1}</h3>
              <p>This is test content for ScrollSmoother.</p>
              <div className="w-16 h-16 mt-4 rounded-full bg-blue-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSmootherTest;