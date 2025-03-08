import React from 'react';
import IsometricGrid from './components/isometricGrid';
import './IsometricCube.css';

function App() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-[#09232F] mb-8">
        Clash Creation Isometric Experience
      </h1>
      
      <div className="mb-8">
        <p className="text-lg text-[#09232F]/80 mb-4">
          Click on any cube to activate and see the glow effect.
        </p>
      </div>
      
      <IsometricGrid />
    </div>
  );
}

export default App;