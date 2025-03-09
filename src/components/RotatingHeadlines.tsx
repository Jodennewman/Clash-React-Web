import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register SplitText plugin
gsap.registerPlugin(SplitText);

// The headlines that will rotate
const headlines = [
  "800 Million Views,<br>Zero Spend on Ads.",
  "The Textbook to Building<br>a Real, Engaged Community."
];

const HeroSection = () => {
  const headlineRef = useRef(null);
  const splitTextRefs = useRef([]);
  const currentHeadline = useRef(0);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Create a container for each headline
    const headlineContainer = headlineRef.current;
    headlineContainer.innerHTML = ''; // Clear any existing content
    
    // Create elements for each headline
    headlines.forEach((headline, index) => {
      const element = document.createElement('h1');
      element.className = `hero-title hero-headline ${index === 0 ? 'active' : ''}`;
      element.setAttribute('data-headline', index + 1);
      element.innerHTML = headline;
      headlineContainer.appendChild(element);
      
      // Store reference for animation
      splitTextRefs.current[index] = new SplitText(element, { type: "words,chars" });
    });
    
    // Initial animation for the first headline
    const chars = splitTextRefs.current[0].chars;
    gsap.from(chars, {
      opacity: 0,
      y: 20,
      ease: "back.out(1.7)",
      stagger: 0.03,
      duration: 0.7
    });
    
    // Set up the rotation
    setupHeadlineRotation();
    
    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      splitTextRefs.current.forEach(split => {
        if (split && split.revert) {
          split.revert();
        }
      });
    };
  }, []);
  
  // Function to set up the headline rotation
  const setupHeadlineRotation = () => {
    const rotationInterval = 5000; // 5 seconds between rotations
    
    const rotateHeadline = () => {
      const currentIndex = currentHeadline.current;
      const nextIndex = (currentIndex + 1) % headlines.length;
      
      const currentElement = headlineRef.current.querySelector(`[data-headline="${currentIndex + 1}"]`);
      const nextElement = headlineRef.current.querySelector(`[data-headline="${nextIndex + 1}"]`);
      
      // Create timeline for the transition
      const tl = gsap.timeline();
      
      // Fade out current headline
      tl.to(splitTextRefs.current[currentIndex].chars, {
        opacity: 0,
        y: -20,
        stagger: 0.02,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Toggle active class
          currentElement.classList.remove('active');
          nextElement.classList.add('active');
        }
      });
      
      // Fade in next headline
      tl.from(splitTextRefs.current[nextIndex].chars, {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "+=0.1");
      
      // Update current headline index
      currentHeadline.current = nextIndex;
    };
    
    // Set up the interval
    const intervalId = setInterval(rotateHeadline, rotationInterval);
    
    // Store the interval ID for cleanup
    timelineRef.current = {
      kill: () => clearInterval(intervalId)
    };
  };
  
  // Animated eyeball SVGs
  const renderEyeballs = () => {
    return (
      <>
        <svg className="hero-eyeball hero-eyeball-1" viewBox="0 0 796.8 792" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="eyeball1" cx="420.8" cy="611.1" fx="327.2" fy="791.9" gradientTransform="translate(0 -207.1)" gradientUnits="userSpaceOnUse" r="652.8">
              <stop offset=".2" stopColor="#350013"></stop>
              <stop offset=".3" stopColor="#84c2d4"></stop>
              <stop offset=".4" stopColor="#2f6587"></stop>
              <stop offset=".9" stopColor="#edc49c"></stop>
            </radialGradient>
          </defs>
          <ellipse cx="398.4" cy="396" rx="398.4" ry="396" fill="url(#eyeball1)"></ellipse>
        </svg>
        
        <svg className="hero-eyeball hero-eyeball-2" viewBox="0 0 796 792.8" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="eyeball2" cx="565.6" cy="1134.2" fx="565.6" fy="1482.2" gradientTransform="translate(-636.6 285.7) rotate(64) scale(1 -.8) skewX(.2)" gradientUnits="userSpaceOnUse" r="643.2">
              <stop offset=".2" stopColor="#350013"></stop>
              <stop offset=".3" stopColor="#84c2d4"></stop>
              <stop offset=".4" stopColor="#2f6587"></stop>
              <stop offset=".9" stopColor="#edc49c"></stop>
            </radialGradient>
          </defs>
          <ellipse cx="398" cy="396.3" rx="398.4" ry="396" fill="url(#eyeball2)"></ellipse>
        </svg>
        
        <svg className="hero-eyeball hero-eyeball-3" viewBox="0 0 796.8 792" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="eyeball3" cx="420.8" cy="611.9" fx="308.8" fy="456.7" gradientTransform="translate(0 -207.1)" gradientUnits="userSpaceOnUse" r="652.8">
              <stop offset=".2" stopColor="#57001c"></stop>
              <stop offset=".4" stopColor="#faa51c"></stop>
              <stop offset=".8" stopColor="#d98f48"></stop>
            </radialGradient>
          </defs>
          <ellipse cx="398.4" cy="396" rx="398.4" ry="396" fill="url(#eyeball3)"></ellipse>
        </svg>
      </>
    );
  };
  
  // Results graph visualization
  const renderResultsGraph = () => {
    return (
      <div className="results-graph">
        <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="graph-svg">
          {/* Grid lines */}
          <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.1)"></line>
          <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.05)"></line>
          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)"></line>
          
          {/* Results curve */}
          <path d="M0,150 C50,140 100,110 150,80 S250,15 300,10" fill="none" stroke="url(#graphGradient)" strokeWidth="3" className="results-path"></path>
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEAF52"></stop>
              <stop offset="50%" stopColor="#E76662"></stop>
              <stop offset="100%" stopColor="#3196AD"></stop>
            </linearGradient>
          </defs>
          
          {/* Data points */}
          <circle cx="0" cy="150" r="4" fill="#FEAF52" className="data-point"></circle>
          <circle cx="75" cy="120" r="4" fill="#FEAF52" className="data-point"></circle>
          <circle cx="150" cy="80" r="4" fill="#E76662" className="data-point"></circle>
          <circle cx="225" cy="30" r="4" fill="#3196AD" className="data-point"></circle>
          <circle cx="300" cy="10" r="4" fill="#3196AD" className="data-point"></circle>
        </svg>
      </div>
    );
  };
  
  return (
    <section className="hero-section">
      {renderEyeballs()}
      {renderResultsGraph()}
      
      <div className="container hero-container">
        <div className="hero-headline-container" ref={headlineRef}>
          {/* Headlines will be inserted here dynamically */}
        </div>
        <p className="hero-subtitle">
          The proven system behind the UK's #1 short-form agency—driving 800M+ views in just 24 months for founder-led brands.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary hero-cta">Enroll Now</a>
          <button id="open-quiz" className="btn btn-secondary quiz-trigger">Take the Quiz</button>
        </div>
      </div>
      
      <img src="/api/placeholder/50/50" alt="Vertical Shortcut Overview" className="hero-image small-eyeball" />
    </section>
  );
};

export default HeroSection;