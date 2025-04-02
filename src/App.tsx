// In your app.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app/globals.css';  // Import the globals.css with all our color variables
import VerticalShortcutLanding from './VerticalShortcutLanding';
import ApplicationFormWrapper from './components/form/ApplicationFormWrapper';
import { ModeToggle } from './components/ui/mode-toggle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerticalShortcutLanding />} />
        <Route path="/application-form" element={<ApplicationFormWrapper />} />
      </Routes>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </Router>
  );
}

export default App;