// In your app.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VerticalShortcutLanding from './VerticalShortcutLanding';
import ApplicationFormWrapper from './components/form/ApplicationFormWrapper';
import VSExampleComponent from './components/VSExampleComponent';
import AnimatedButtonsDemo from './components/marble-buttons/AnimatedButtonsDemo';
import { ThemeToggle } from './components/ui/theme-toggle';
import { DirectTest } from './components/DirectTest';
import { DirectClassTest } from './components/DirectClassTest';
import VSModalShowcase from './components/VSModalShowcase';
import { VSPainPoints, VSCharts } from './components/sections';
import CalendlyDemo from './components/Calendly/CalendlyDemo';

function App() {
  // Load theme toggle script
  // Note: Theme is now handled by the dark class on the html element
  // The theme-toggle.js script and ThemeProvider add this class
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="bg-theme-gradient min-h-screen">
            <h1 className="text-3xl font-bold text-theme-primary text-center py-6">Style Debugging</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
              <div className="border border-theme-border rounded-lg shadow-theme-sm">
                <DirectTest />
              </div>
              <div className="border border-theme-border rounded-lg shadow-theme-sm">
                <DirectClassTest />
              </div>
            </div>
            <div className="mt-8 text-center space-y-4">
              <div>
                <Link to="/landing" className="px-6 py-2 bg-theme-gradient-primary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Go to Landing Page
                </Link>
              </div>
              <div>
                <Link to="/modals" className="px-6 py-2 bg-theme-gradient-secondary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  VS Modal Showcase
                </Link>
              </div>
              <div>
                <Link to="/painpoints" className="px-6 py-2 bg-[var(--theme-accent-secondary)] text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  VS Pain Points Section
                </Link>
              </div>
              <div>
                <Link to="/charts" className="px-6 py-2 bg-theme-accent-quaternary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  VS Charts Section
                </Link>
              </div>
              <div>
                <Link to="/calendly" className="px-6 py-2 bg-theme-gradient-accent text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Calendly Scheduling Demo
                </Link>
              </div>
            </div>
          </div>
        } />
        <Route path="/landing" element={<VerticalShortcutLanding />} />
        <Route path="/application-form" element={<ApplicationFormWrapper />} />
        <Route path="/example" element={<VSExampleComponent />} />
        <Route path="/marble-buttons" element={<AnimatedButtonsDemo />} />
        <Route path="/modals" element={<VSModalShowcase />} />
        <Route path="/painpoints" element={<VSPainPoints />} />
        <Route path="/charts" element={<VSCharts />} />
        <Route path="/calendly" element={<CalendlyDemo />} />
      </Routes>
      
      {/* Theme toggle button */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Marble buttons navigation */}
      <div className="fixed bottom-4 left-4 z-50">
        <Link 
          to="/marble-buttons" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-theme-primary shadow-theme-sm hover-bubbly-sm"
        >
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