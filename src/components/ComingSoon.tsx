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
    // Add the ConvertKit form script
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleWaitlistClick = () => {
    // Find any existing form and remove it
    const existingForm = document.querySelector('.formkit-form');
    if (existingForm) {
      existingForm.remove();
    }

    // Create and inject the ConvertKit form
    const form = document.createElement('form');
    form.action = 'https://app.convertkit.com/forms/7770876/subscriptions';
    form.className = 'seva-form formkit-form';
    form.method = 'post';
    form.setAttribute('data-sv-form', '7770876');
    form.setAttribute('data-uid', 'b8e4ad5fd9');
    form.setAttribute('data-format', 'modal');
    form.setAttribute('data-version', '5');
    form.setAttribute('min-width', '400 500 600 700 800');
    form.style.backgroundColor = '#09232F';
    form.style.borderRadius = '16px';
    form.style.padding = '2.5rem';
    form.style.maxWidth = '550px';
    form.style.width = '90%';

    form.innerHTML = `
      <div class="formkit-background" style="opacity: 0.2;"></div>
      <div data-style="minimal">
        <div class="formkit-header" data-element="header" style="color: rgb(255, 255, 255); font-size: 24px; font-weight: 800; margin-bottom: 1.5rem;">
          <h2 style="text-align:center">The Vertical Shortcut:</h2>
        </div>
        <div class="formkit-subheader" data-element="subheader" style="color: rgb(255, 255, 255); font-size: 18px; line-height: 1.6; margin-bottom: 2rem;">
          <h2 style="text-align:center">A Proven System to Survive, Thrive, and Monetise<br>with Short Form Video.</h2>
          <p style="margin-top: 1rem; opacity: 0.9; font-size: 16px;">Join the Waiting List to Stay Updated and Secure a Spot.</p>
        </div>
        <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
        <div data-element="fields" data-stacked="true" class="seva-fields formkit-fields" style="gap: 1rem;">
          <div class="formkit-field">
            <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1rem 1.5rem; font-size: 1rem; width: 100%; margin-bottom: 1rem;">
          </div>
          <div class="formkit-field">
            <input class="formkit-input" aria-label="First Name" name="fields[first_name]" required="" placeholder="First Name" type="text" style="color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1rem 1.5rem; font-size: 1rem; width: 100%; margin-bottom: 1rem;">
          </div>
          <div class="formkit-field">
            <input class="formkit-input" aria-label="Surname" name="fields[surname]" placeholder="Surname" type="text" style="color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1rem 1.5rem; font-size: 1rem; width: 100%; margin-bottom: 1.5rem;">
          </div>
          <button data-element="submit" class="formkit-submit formkit-submit" className="vs-gradient-coral-orange" style="color: rgb(255, 255, 255);  border-radius: 12px; padding: 1rem; font-size: 1rem; font-weight: 600; width: 100%; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s ease">
            <div class="formkit-spinner"><div></div><div></div><div></div></div>
            <span class="">Join Waitlist</span>
          </button>
        </div>
        <div class="formkit-guarantee" data-element="guarantee" style="color: rgba(255, 255, 255, 0.6); font-size: 14px; margin-top: 1rem; text-align: center;">
          <p>We won't send you spam. Unsubscribe at any time.</p>
        </div>
      </div>
    `;

    // Create a modal container
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(3, 10, 16, 0.95)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    modal.style.backdropFilter = 'blur(10px)';

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.fontSize = '32px';
    closeButton.style.color = 'white';
    closeButton.style.background = 'rgba(255, 255, 255, 0.1)';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '48px';
    closeButton.style.height = '48px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.transition = 'all 0.3s ease';
    closeButton.onmouseover = () => closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
    closeButton.onmouseout = () => closeButton.style.background = 'rgba(255, 255, 255, 0.1)';
    closeButton.onclick = () => modal.remove();

    // Add form to modal
    modal.appendChild(closeButton);
    modal.appendChild(form);
    document.body.appendChild(modal);

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  return (
    <div className="vertical-shortcut-container">
      <div className="gradient-bg"></div>
      <div className="noise-overlay"></div>
      
      {/* Mobile wrapper for better control */}
      <div className="mobile-wrapper" style={{ width: '100%', maxWidth: '100%' }}>
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
              
              <h1 className="logo-text" style={{ textAlign: 'center' }}>
                The <span className="highlight">Vertical</span> Shortcut
              </h1>
            </div>
          </div>
          
          <div className={`details ${showDetails ? 'visible' : ''}`}>
            <div className="coming-soon">Coming Soon</div>
            <p className="tagline">
              A Reliable System to Thrive and Scale<br />
              through Short Form Video,<br />
              for Founders.
            </p>
            <div className="cta-container">
              <button 
                className="preview-button" 
                onClick={() => setShowDirectory(true)}
                style={{ width: '100%' }}
              >
                <span className="peek-text">Sneak Peek</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button 
                className="waitlist-button-main" 
                onClick={handleWaitlistClick}
                style={{ width: '100%' }}
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
        
        <div className="footer-text">Clash Creation Ltd</div>
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
            <button className="waitlist-button" onClick={handleWaitlistClick}>
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
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .vertical-shortcut-container {
          width: 100%;
          max-width: 100vw;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow-x: hidden;
        }
        
        .gradient-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #09232F 0%, #081825 50%, #0A2535 100%);
          z-index: 0;
        }
        
        .noise-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3C/rect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.1;
          z-index: 0;
        }
        
        .content-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          overflow: visible;
        }
        
        .interactive-area {
          width: 100%;
          max-width: 800px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          padding: 0;
          position: relative;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0 0 3rem;
          flex-wrap: nowrap;
          justify-content: center;
          position: relative;
          width: auto;
          max-width: 100%;
        }
        
        .eye-container {
          width: 80px;
          height: 80px;
          position: relative;
          flex-shrink: 0;
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
          flex-shrink: 1;
          min-width: 0;
        }
        
        .highlight {
          display: inline;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 20px rgba(254, 175, 82, 0.4);
        }
        
        .details {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
          pointer-events: none;
          visibility: hidden;
        }
        
        .details.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
          visibility: visible;
        }
        
        .cta-container {
          display: flex;
          gap: 2rem;
          margin: 0 auto 4rem;
          justify-content: center;
          width: 100%;
          max-width: 600px;
          padding: 0 1rem;
        }
        
        .waitlist-button-main {
          background: linear-gradient(90deg, #E76662, #FEAF52);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 8px 20px rgba(231, 102, 98, 0.3);
        }
        
        .preview-button {
          background: rgba(254, 175, 82, 0.1);
          border: 1px solid #FEAF52;
          color: #FEAF52;
          border-radius: 12px;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 0 20px rgba(254, 175, 82, 0.15);
        }
        
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 5rem;
          margin-bottom: 2rem;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .stat-value {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(90deg, #E76662, #FEAF52);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(254, 175, 82, 0.3);
        }
        
        .stat-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .coming-soon {
          font-size: 1.75rem;
          font-weight: 700;
          color: #FEAF52;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-shadow: 0 0 15px rgba(254, 175, 82, 0.5);
          animation: pulseGlow 3s infinite;
        }
        
        .tagline {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 700px;
          line-height: 1.6;
          margin: 0 auto 3rem;
          font-weight: 500;
        }
        
        .preview-button::before {
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
        
        .preview-button:hover {
          transform: translateY(-2px);
        }
        
        .preview-button:hover::before {
          opacity: 0.7;
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
          background: linear-gradient(90deg, transparent, #FEAF52, transparent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .preview-button:hover .peek-text::after {
          transform: scaleX(1);
        }
        
        .preview-button:hover .arrow-icon {
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px rgba(254, 175, 82, 0.6));
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
          color: #FEAF52;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(254, 175, 82, 0.3);
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
          border-color: rgba(254, 175, 82, 0.3);
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
        
        /* Mobile specific fixes */
        @media (max-width: 768px) {
          /* Critical body fixes */
          body {
            overflow-x: hidden !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            position: relative !important;
          }
          
          .vertical-shortcut-container {
            min-height: 100vh;
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
          }
        
          .content-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-top: 2rem;
            padding-bottom: 2rem;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center !important;
            justify-content: flex-start;
            text-align: center !important;
            overflow-x: hidden;
          }
        
          .interactive-area {
            width: 100% !important;
            max-width: 90% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 2rem;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center !important;
            text-align: center !important;
          }
        
          .logo-container {
            flex-direction: column;
            gap: 1.5rem;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 2rem;
            width: 100% !important;
            max-width: 90% !important;
            display: flex;
            align-items: center !important;
            justify-content: center;
            text-align: center !important;
          }
        
          .eye-container {
            width: 60px;
            height: 60px;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        
          .logo-text {
            font-size: 2.75rem;
            text-align: center !important;
            white-space: normal;
            width: 100% !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            word-wrap: break-word;
          }
        
          .details {
            width: 100% !important;
            max-width: 90% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center !important;
          }
        
          .coming-soon {
            width: 100% !important;
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 1.5rem;
          }
        
          .tagline {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 2rem;
            padding: 0;
            word-wrap: break-word;
          }
        
          .cta-container {
            flex-direction: column;
            width: 100% !important;
            max-width: 90% !important;
            gap: 1rem;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 3rem;
            padding: 0 !important;
            display: flex;
            align-items: center !important;
            justify-content: center;
          }
        
          .preview-button,
          .waitlist-button-main {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            justify-content: center;
            display: flex;
            align-items: center;
            text-align: center !important;
          }
        
          .stats-row {
            width: 100% !important;
            max-width: 90% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            gap: 1rem;
            padding: 0 !important;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .stat {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center !important;
            justify-content: center;
            text-align: center !important;
          }
          
          .footer-text {
            width: 100% !important;
            text-align: center !important;
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            margin: 2rem auto 0 !important;
          }
          
          /* Fix for the directory modal */
          .module-directory .directory-content {
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        
        /* Specific fixes for extra small screens */
        @media (max-width: 480px) {
          .content-wrapper {
            padding: 1.5rem 0;
          }

          .logo-text {
            font-size: 2.5rem;
          }

          .cta-container {
            max-width: 90%;
          }

          .stats-row {
            gap: 1.5rem;
            max-width: 90%;
            margin: 0 auto;
          }

          .stat-value {
            font-size: 1.75rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }

          .tagline {
            font-size: 1.1rem;
            max-width: 90%;
            margin: 0 auto 2rem;
          }

          .tagline br {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}