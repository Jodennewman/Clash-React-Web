import React from 'react';

export function DirectTest() {
  // Function to print the computed value of a CSS variable
  const printVarValue = (varName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  };
  
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Direct Style Test</h2>
      
      {/* Test elements with inline styles */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          className="bg-[var(--theme-primary)] text-white font-medium"
        >
          Primary Orange - Inline Style
        </div>
        
        <div 
          className="bg-[var(--theme-accent-secondary)] text-white font-medium"
        >
          Secondary Teal - Inline Style
        </div>
        
        <div 
          className="bg-[var(--theme-text-primary)] font-medium"
        >
          Text Navy - Inline Style
        </div>
        
        <div 
          className="bg-[var(--theme-accent-tertiary)] font-medium"
        >
          Accent Coral - Inline Style
        </div>
      </div>
      
      {/* View the actual values */}
      <div className="bg-gray-100 p-4 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-2">CSS Variable Values:</h3>
        <ul className="space-y-1 font-mono text-sm">
          <li>--primary-orange: {printVarValue('--primary-orange')}</li>
          <li>--secondary-teal: {printVarValue('--secondary-teal')}</li>
          <li>--text-navy: {printVarValue('--text-navy')}</li>
          <li>--accent-coral: {printVarValue('--accent-coral')}</li>
        </ul>
      </div>
      
      <button 
        onClick={() => alert(
          `--primary-orange: ${printVarValue('--primary-orange')}\n` +
          `--secondary-teal: ${printVarValue('--secondary-teal')}\n` +
          `--text-navy: ${printVarValue('--text-navy')}\n` +
          `--accent-coral: ${printVarValue('--accent-coral')}`
        )}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Show CSS Variables
      </button>
    </div>
  );
} 