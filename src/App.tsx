// In your app.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerticalShortcutLanding from './VerticalShortcutLanding';
import ApplicationFormWrapper from './components/form/ApplicationFormWrapper';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerticalShortcutLanding />} />
        <Route path="/application-form" element={<ApplicationFormWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;