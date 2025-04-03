// In your app.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VerticalShortcutLanding from './VerticalShortcutLanding';
import ApplicationFormWrapper from './components/form/ApplicationFormWrapper';
import VSExampleComponent from './components/VSExampleComponent';
import AnimatedButtonsDemo from './components/marble-buttons/AnimatedButtonsDemo';

function App() {
  // Load theme toggle script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/theme-toggle.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerticalShortcutLanding />} />
        <Route path="/application-form" element={<ApplicationFormWrapper />} />
        <Route path="/example" element={<VSExampleComponent />} />
        <Route path="/marble-buttons" element={<AnimatedButtonsDemo />} />
      </Routes>
      
      {/* Simple theme toggle button using the data-theme-toggle attribute */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          data-theme-toggle
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[--bg-cream] dark:bg-[--bg-navy] border border-[--text-navy]/10 dark:border-white/10 shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Toggle theme"
        >
          <span data-theme-dark className="text-[--text-navy]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </span>
          <span data-theme-light className="hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </span>
        </button>
      </div>
      
      <div className="fixed bottom-4 left-4 z-50">
        <Link to="/marble-buttons" className="flex items-center justify-center w-10 h-10 rounded-full bg-[--primary-orange] dark:bg-[--primary-orange] shadow-lg hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </Link>
      </div>
    </Router>
  );
}

export default App;