// In your app.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VerticalShortcutLanding from './VerticalShortcutLanding';
import ApplicationFormWrapper from './components/form/ApplicationFormWrapper';
import VSExampleComponent from './components/VSExampleComponent';
import AnimatedButtonsDemo from './components/marble-buttons/AnimatedButtonsDemo';
import { ThemeToggle } from './components/ui/theme-toggle';
import { DirectTest } from './components/DirectTest';
import { DirectClassTest } from './components/DirectClassTest';
import VSModalShowcase from './components/VSModalShowcase';
import { VSPainPoints, VSCharts, ConnectEverything } from './components/sections';
import CalendlyDemo from './components/Calendly/CalendlyDemo';
import ScrollTextEffect from './components/scroll-effect-component';
import { WordRoller } from './components/Word-Rollers/WordRoller';
import { WordRollerWithPrefix } from './components/Word-Rollers/WordRollerWithPrefix';

import ThemeStyleGuide from './components/ThemeStyleGuide';

import ModalImplementation from './Qualification_components/modal-implementation';
import ModuleHUDShowcase from './components/sections/ModuleHUDShowcase';
import ThemeVisualizer from './components/Color-theme-display';


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
                <Link to="/scroll-effect" className="px-6 py-2 bg-theme-gradient-secondary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Scroll Text Effect
                </Link>
              </div>
              <div>
                <Link to="/modals" className="px-6 py-2 bg-theme-gradient-secondary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  VS Modal Showcase
                </Link>
              </div>
              <div>
                <Link to="/painpoints" className="px-6 py-2 bg-theme-accent-secondary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  VS Pain Points Section
                </Link>
              </div>
              <div>
                <Link to="/charts" className="px-6 py-2 bg-theme-accent-quaternary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  VS Charts Section
                </Link>
              </div>
              <div>
                <Link to="/modulehud" className="px-6 py-2 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent-secondary)] text-white rounded-lg">
                  Module HUD Showcase
                </Link>
              </div>
              <div>
                <Link to="/connect-everything" className="px-6 py-2 bg-gradient-to-r from-cyan-800 to-cyan-950 text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Connect Everything
                </Link>
              </div>
              <div>
                <Link to="/calendly" className="px-6 py-2 bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-coral)] text-white rounded-lg">
                  Calendly Scheduling Demo
                </Link>
              </div>
              <div>
                <Link to="/word-roller" className="px-6 py-2 bg-gradient-to-r from-[#FEA35D] to-[#F89A67] text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Word Roller Demo
                </Link>
              </div>
              <div>
                <Link to="/word-roller-prefix" className="px-6 py-2 bg-gradient-to-r from-[#154D59] to-[#387292] text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Word Roller with Prefix
                </Link>
              </div>
              <div>
                <Link to="/style-guide" className="px-6 py-2 bg-theme-primary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Theme Style Guide
                </Link>

                <Link to="/qualification" className="px-6 py-2 bg-theme-gradient-primary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Qualification Modal Demo
                </Link>
              </div>
              <div>
                <Link to="/theme-visualizer" className="px-6 py-2 bg-gradient-to-r from-[var(--theme-accent-tertiary)] to-[var(--theme-accent-quaternary)] text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
                  Theme Variables Visualizer

                </Link>
              </div>
            </div>
          </div>
        } />
        <Route path="/landing" element={<VerticalShortcutLanding />} />
        <Route path="/scroll-effect" element={<ScrollTextEffect />} />
        <Route path="/application-form" element={<ApplicationFormWrapper />} />
        <Route path="/example" element={<VSExampleComponent />} />
        <Route path="/marble-buttons" element={<AnimatedButtonsDemo />} />
        <Route path="/modals" element={<VSModalShowcase />} />
        <Route path="/painpoints" element={<VSPainPoints />} />
        <Route path="/charts" element={<VSCharts />} />
        <Route path="/calendly" element={<CalendlyDemo />} />
        <Route path="/word-roller" element={<WordRoller />} />
        <Route path="/word-roller-prefix" element={<WordRollerWithPrefix />} />

        <Route path="/style-guide" element={<ThemeStyleGuide />} />

        <Route path="/qualification" element={<ModalImplementation />} />
        <Route path="/modulehud" element={<ModuleHUDShowcase />} />
        <Route path="/theme-visualizer" element={<ThemeVisualizer />} />
        <Route path="/connect-everything" element={<ConnectEverything />} />

      </Routes>
      
      {/* Theme toggle and style guide buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
        <Link 
          to="/style-guide" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-theme-accent-secondary shadow-theme-sm hover-bubbly-sm"
          title="Theme Style Guide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 2l5.5 5.5-8 8L4 10z"></path>
            <path d="M18 2h4v4"></path>
            <path d="M4 22l4-4"></path>
            <path d="M2 12l10 10 5-5"></path>
          </svg>
        </Link>
        <ThemeToggle />
      </div>
      
      {/* Marble buttons navigation */}
      <div className="fixed bottom-4 left-4 z-50">
        <Link 
          to="/marble-buttons" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-theme-primary shadow-theme-sm hover-bubbly-sm"
          title="Marble Buttons"
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