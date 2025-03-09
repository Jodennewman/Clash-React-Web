// In your app.tsx

import PricingSection from './components/PricingTest';
import Modules from './components/Modules';
import ModuleDirectoryMap from './components/moduleDirectoryDropdown';
import './App.css';
import ContentOverwhelmer from './components/ContentOverwhelmer.tsx';
import React from 'react';
function App() {


  return (
    <div className="app">
      <ModuleDirectoryMap />
      <ContentOverwhelmer />
      <PricingSection />
      {/* Other components */}
    </div>
  );
}

export default App;