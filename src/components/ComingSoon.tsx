import React, { useState, useEffect, useRef } from 'react';

interface KitPopup {
  open: () => void;
}

declare global {
  interface Window {
    KitPopup?: KitPopup;
  }
}

export default function VerticalShortcutComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const eyeRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  
  // Show details by default on mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowDetails(true);
      setHasInteracted(true);
    }
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDetails(true);
    setHasInteracted(true);
  };

  const handleMouseLeave = () => {
    if (!hasInteracted) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setShowDetails(false);
      }, 400);
    }
  };

  // Eye following cursor effect
  useEffect(() => {
    const eye = eyeRef.current;
    if (!eye) return;
    
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    const pupil = eye.querySelector('.pupil') as HTMLElement;
    if (!pupil) return;
    
    // Calculate distance between eye center and mouse
    const distX = mousePosition.x - eyeCenterX;
    const distY = mousePosition.y - eyeCenterY;
    
    // Max movement radius
    const maxMovement = 8;
    
    // Calculate normalized movement
    const distance = Math.sqrt(distX * distX + distY * distY);
    const normalizedX = distance > 0 ? (distX / distance) * Math.min(distance, maxMovement) : 0;
    const normalizedY = distance > 0 ? (distY / distance) * Math.min(distance, maxMovement) : 0;
    
    // Apply movement
    pupil.style.transform = `translate(${normalizedX}px, ${normalizedY}px)`;
  }, [mousePosition]);

  // Close modules directory on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && showDirectory) {
        setShowDirectory(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showDirectory]);

  // Module data from repository
  const moduleCategories: { [key: string]: string[] } = {
    "Theory Basics": ["Starting an account", "Naming your account", "Creating a bio", "Managing highlights", "Developing your Linkspace", "Using Pinned Videos", "The Frame", "Safe Zones & Clutter", "Visual Hierarchy", "Movement & Contrast"],
    "Cardinal Principles": ["Cardinal Sins", "Cardinal Virtues", "Algorithmic Reality", "How Videos Actually Grow", "Good Vs Bad in Short Form", "Nailing What Actually Counts", "Applying it Across Platforms"],
    "Hook Mastery": ["Using Clarity and Intrigue", "Developing Authority", "Nailing Delivery", "The Text Hook", "The Visual Hook", "Nuanced Hooks", "BIG vs small", "False Assumptions", "The Impossible Question", "A Contrarian Statement", "This Just Happened!!?!", "PR: Who Are You?"],
    "Scripting": ["Rule 1: Simplicity", "Rule 2: Being Concise", "Rule 3: Rehooking", "Rule 4: Authenticity", "Rule 5: Storytelling", "Rule 6: Would I watch this?", "Bonus: Boulder Theory", "Script Mastery", "Getting it wrong (on purpose)", "The FOMO comment section", "Using Controversy"],
    "Metrics & Analysis": ["Likes", "Saves", "Shares", "Retention", "Comments", "Advanced Metrics", "Follower Conversion", "Completed Watchtime", "Demographics", "Traffic Sources"],
    "Platform Strategy": ["TikTok", "Instagram", "YouTube", "The Rest!", "Pillar Content Strategy", "Topics", "Buckets", "Data-Led Iteration"],
    "Authority Building": ["Scripting for Authority", "The 6 Rules of Authority", "Brand Wholism", "Complex formats", "Remixing formats", "Breaking Expectations", "The Unexpected Pivot"],
    "Content Management": ["What to do when it goes wrong", "How to save your page", "Handling Comments", "Reframing Anger", "Managing Debate", "The Best Kind of Comment", "Optimising for Conversion", "Optimising for Watch Time"]
  };

  type CategoryColorType = {
    [key: string]: { bg: string; text: string; accent: string; }
  };
  
  // Define colors for each category
  const categoryColors: CategoryColorType = {
    "Theory Basics": { bg: "#0A1B24", text: "#FDF7E4", accent: "#E76662" },
    "Cardinal Principles": { bg: "#071520", text: "#FDF7E4", accent: "#F37947" },
    "Hook Mastery": { bg: "#051320", text: "#FDF7E4", accent: "#F49272" },
    "Scripting": { bg: "#091D2A", text: "#FDF7E4", accent: "#FA9644" },
    "Metrics & Analysis": { bg: "#081825", text: "#FDF7E4", accent: "#FEAF52" },
    "Platform Strategy": { bg: "#071218", text: "#FDF7E4", accent: "#FFC590" },
    "Authority Building": { bg: "#061015", text: "#FDF7E4", accent: "#E76662" },
    "Content Management": { bg: "#040B10", text: "#FDF7E4", accent: "#F37947" }
  };

  useEffect(() => {
    // Remove any existing script to avoid duplicates
    const existingScript = document.querySelector('script[data-uid="b8e4ad5fd9"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and add the ConvertKit script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://f.convertkit.com/b8e4ad5fd9/index.js';
    script.setAttribute('data-uid', 'b8e4ad5fd9');
    script.setAttribute('data-version', '5');
    
    // Add load event listener to ensure script is loaded
    script.addEventListener('load', () => {
      console.log('ConvertKit script loaded');
      // Refresh the KitPopup instance
      if (window.KitPopup) {
        console.log('KitPopup found, refreshing...');
        window.KitPopup = undefined;
        const event = new Event('ckjs:refresh');
        window.dispatchEvent(event);
      } else {
        console.log('KitPopup not found after script load');
      }
    });

    // Add error listener
    script.addEventListener('error', (error) => {
      console.error('Error loading ConvertKit script:', error);
    });

    document.body.appendChild(script);

    // Cleanup
    return () => {
      const script = document.querySelector('script[data-uid="b8e4ad5fd9"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleWaitlistClick = () => {
    console.log('Waitlist button clicked');
    if (window.KitPopup) {
      console.log('Opening KitPopup...');
      window.KitPopup.open();
    } else {
      console.log('KitPopup not found');
    }
  };

  return (
    <div className="vertical-shortcut-container">
      <div className="gradient-bg"></div>
      <div className="noise-overlay"></div>
      
      <div className="content-wrapper">
        <div 
          className="interactive-area"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="logo-container">
            <div className="eye-container" ref={eyeRef}>
              <div className="eye">
                <div className="iris">
                  <div className="pupil"></div>
                </div>
              </div>
            </div>
            
            <h1 className="logo-text">The <span className="highlight">Vertical</span> Shortcut</h1>
          </div>
        </div>
        
        <div className={`details ${showDetails ? 'visible' : ''}`}>
          <div className="coming-soon">Coming Soon</div>
          <p className="tagline">A Reliable System to Thrive and Scale<br />through Short Form Video,<br />for Founders.</p>
          <div className="cta-container">
            <button className="preview-button" onClick={() => setShowDirectory(true)}>
              <span className="peek-text">Sneak Peek</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button 
              className="waitlist-button-main" 
              onClick={handleWaitlistClick}
            >
              <span>Join Waitlist</span>
            </button>
          </div>
          <div className="stats-row">
            <div className="stat">
              <span className="stat-value">800M+</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat">
              <span className="stat-value">£0</span>
              <span className="stat-label">Ad Spend</span>
            </div>
            <div className="stat">
              <span className="stat-value">24</span>
              <span className="stat-label">Months</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Module Directory Modal */}
      <div className={`module-directory ${showDirectory ? 'visible' : ''}`}>
        <div className="directory-content">
          <button className="close-button" onClick={() => setShowDirectory(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="directory-header">
            <h2>Course Curriculum</h2>
            <p>Preview of our comprehensive framework with <span className="module-count">132 lessons</span></p>
          </div>
          
          <div className="categories-container">
            {Object.keys(moduleCategories).map((category, index) => (
              <div className="category-card" key={index}>
                <div 
                  className="category-header" 
                  style={{ 
                    backgroundColor: categoryColors[category]?.bg || '#030A10',
                    color: categoryColors[category]?.text || '#FDF7E4',
                    borderLeft: `3px solid ${categoryColors[category]?.accent || '#E76662'}`
                  }}
                >
                  <h3>{category}</h3>
                  <span className="module-count">{moduleCategories[category].length}</span>
                </div>
                <div className="module-list">
                  {moduleCategories[category].slice(0, 5).map((module, mIndex) => (
                    <div className="module-item" key={mIndex}>
                      <div className="module-bullet"></div>
                      <span>{module}</span>
                    </div>
                  ))}
                  {moduleCategories[category].length > 5 && (
                    <div className="more-modules">+{moduleCategories[category].length - 5} more modules</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="directory-footer">
            <p>Be among the first to access our complete system</p>
            <button className="waitlist-button" onClick={() => window.KitPopup && window.KitPopup.open()}>
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
        }
        
        .vertical-shortcut-container {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #050A0F 0%, #081825 40%, #0A2535 80%);
          z-index: -2;
        }
        
        .noise-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3C/rect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.1;
          z-index: -1;
        }
        
        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .interactive-area {
          padding: 2rem;
          margin: -2rem;
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.3s ease;
        }
        
        .interactive-area:hover .logo-container {
          transform: translateY(-3px);
        }
        
        .eye-container {
          width: 60px;
          height: 60px;
          position: relative;
        }
        
        .eye {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #FDF7E4;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .iris {
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #378596 0%, #186080 50%, #123C55 80%, #08141B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 20px rgba(49, 150, 173, 0.4);
        }
        
        .iris::after {
          content: '';
          position: absolute;
          top: 15%;
          left: 12%;
          width: 22%;
          height: 22%;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          filter: blur(2px);
        }
        
        .iris::before {
          content: '';
          position: absolute;
          inset: -5%;
          background: radial-gradient(circle at 40% 40%, rgba(231, 102, 98, 0.3) 0%, rgba(254, 175, 82, 0.2) 100%);
          border-radius: 50%;
          opacity: 0.7;
          filter: blur(8px);
          z-index: -1;
        }
        
        .pupil {
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: linear-gradient(135deg, #030A10 30%, #050F18 100%);
          transition: transform 0.1s ease;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
        }
        
        .logo-text {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.03em;
          text-align: left;
          white-space: nowrap;
          line-height: 0.9;
        }
        
        .highlight {
          display: inline;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(254, 175, 82, 0.4);
        }
        
        .details {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          text-align: center;
          pointer-events: none;
          position: absolute;
          width: 100%;
          visibility: hidden;
          max-width: 600px;
          margin: 0 auto;
          margin-top: 3rem;
        }
        
        .details.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
          position: relative;
          visibility: visible;
        }
        
        .cta-container {
          display: flex;
          gap: 1.5rem;
          margin: 1.5rem 0 2rem;
          justify-content: center;
        }
        
        .waitlist-button-main {
          background: linear-gradient(90deg, #E76662, #FEAF52);
          color: white;
          border: none;
          padding: 0.75rem 1.75rem;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 6px 15px rgba(231, 102, 98, 0.3);
          white-space: nowrap;
        }
        
        .waitlist-button-main::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          border-radius: 9px;
          z-index: -1;
          opacity: 0;
          filter: blur(8px);
          transition: opacity 0.3s ease;
        }
        
        .waitlist-button-main:hover {
          transform: translateY(-3px);
        }
        
        .waitlist-button-main:hover::before {
          opacity: 0.7;
        }
        
        .coming-soon {
          font-size: 1.5rem;
          font-weight: 700;
          color: #F49272;
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-shadow: 0 0 12px rgba(244, 146, 114, 0.5);
          animation: pulseGlow 3s infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            text-shadow: 0 0 12px rgba(244, 146, 114, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(244, 146, 114, 0.8);
          }
        }
        
        .tagline {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 500px;
          line-height: 1.5;
          margin: 0 auto 2rem;
        }
        
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 2rem;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(90deg, #E76662, #F49272);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 10px rgba(244, 146, 114, 0.3);
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 0.25rem;
        }
        
        .preview-button {
          background: rgba(244, 146, 114, 0.1);
          border: 1px solid #F49272;
          color: #F49272;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(244, 146, 114, 0.2);
        }
        
        .preview-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          background: linear-gradient(90deg, #E76662, #FEAF52);
          z-index: -1;
          border-radius: 9px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .preview-button:hover {
          background: rgba(244, 146, 114, 0.15);
          transform: translateY(-2px);
        }
        
        .preview-button:hover::before {
          opacity: 0.4;
        }
        
        .arrow-icon {
          transition: all 0.3s ease;
          color: #F49272;
        }
        
        .peek-text {
          position: relative;
        }
        
        .peek-text::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #F49272, transparent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .preview-button:hover .peek-text::after {
          transform: scaleX(1);
        }
        
        .preview-button:hover .arrow-icon {
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px rgba(244, 146, 114, 0.6));
        }
        
        /* Module Directory Styles */
        .module-directory {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(3, 10, 16, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease;
          backdrop-filter: blur(10px);
        }
        
        .module-directory.visible {
          opacity: 1;
          visibility: visible;
        }
        
        .directory-content {
          background: linear-gradient(135deg, #030A10 0%, #051320 50%, #081825 100%);
          border-radius: 1rem;
          width: 90%;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          transform: translateY(30px);
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
          border: 1px solid rgba(20, 60, 85, 0.3);
        }
        
        .module-directory.visible .directory-content {
          transform: translateY(0);
          opacity: 1;
        }
        
        .close-button {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
          z-index: 2;
        }
        
        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .directory-header {
          text-align: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .directory-header h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.75rem;
        }
        
        .directory-header p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
        }
        
        .module-count {
          color: #F49272;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(244, 146, 114, 0.3);
        }
        
        .categories-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .category-card {
          background: rgba(10, 28, 40, 0.7);
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(20, 60, 85, 0.6);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        
        .category-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          border-color: rgba(244, 146, 114, 0.3);
        }
        
        .category-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .category-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
        }
        
        .category-header .module-count {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(0, 0, 0, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 50px;
        }
        
        .module-list {
          padding: 1.25rem;
        }
        
        .module-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        
        .module-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          margin-right: 0.75rem;
          margin-top: 0.5rem;
          flex-shrink: 0;
          position: relative;
        }
        
        .module-bullet::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          border-radius: 50%;
          opacity: 0.4;
          filter: blur(3px);
          z-index: -1;
        }
        
        .module-item span {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }
        
        .more-modules {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
          margin-top: 1rem;
          text-align: center;
        }
        
        .directory-footer {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .directory-footer p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.25rem;
        }
        
        .waitlist-button {
          background: linear-gradient(90deg, #E76662, #FEAF52);
          color: white;
          border: none;
          padding: 0.85rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 6px 15px rgba(231, 102, 98, 0.3);
        }
        
        .waitlist-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          border-radius: 8px;
          opacity: 0;
          z-index: -1;
          filter: blur(15px);
          transition: opacity 0.3s ease;
        }
        
        .waitlist-button:hover {
          transform: translateY(-2px);
        }
        
        .waitlist-button:hover::before {
          opacity: 0.7;
        }
        
        /* Custom scrollbar for directory */
        .directory-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .directory-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .directory-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .directory-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1.5rem;
            min-height: 100vh;
            justify-content: center;
          }

          .logo-container {
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .logo-text {
            font-size: 2.5rem;
            text-align: center;
            line-height: 1.2;
            width: 100%;
            white-space: normal;
          }

          .logo-text .highlight {
            display: block;
            font-size: 3.25rem;
            margin: 0.3em 0;
          }

          .details {
            max-width: 100%;
            padding: 0 1rem;
            margin-top: 2rem;
          }

          .coming-soon {
            font-size: 1.1rem;
            margin-top: 0;
          }
          
          .tagline {
            font-size: 1rem;
            line-height: 1.4;
            max-width: 100%;
            margin: 1rem auto 1.5rem;
          }

          .eye-container {
            width: 50px;
            height: 50px;
          }
        }
        
        @media (max-width: 480px) {
          .logo-text {
            font-size: 1.75rem;
          }

          .logo-text .highlight {
            font-size: 2.75rem;
            margin: 0.2em 0;
          }

          .content-wrapper {
            padding: 1rem;
          }
          
          .details {
            padding: 0;
            margin-top: 1.5rem;
          }

          .cta-container {
            flex-direction: column;
            gap: 1rem;
          }

          .preview-button, .waitlist-button-main {
            width: 100%;
            justify-content: center;
          }

          .stats-row {
            gap: 2rem;
            margin: 1.5rem 0;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .stat-label {
            font-size: 0.8rem;
          }
        }

        .footer-text {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.05em;
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .footer-text {
            position: relative;
            bottom: auto;
            margin-top: 2rem;
          }
        }
      `}</style>
      <div className="footer-text">Clash Creation Ltd</div>
    </div>
  );
}