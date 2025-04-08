import React from 'react';

export const DirectClassTest = () => {
  return (
    <div className="p-6 bg-theme-bg-surface rounded-lg">
      <h2 className="text-xl font-bold text-theme-primary mb-4">Direct CSS Classes Test</h2>
      
      <div className="space-y-4 mb-8">
        <div className="bg-primary-orange p-4 rounded-lg text-theme-on-primary">
          Primary Orange - Direct CSS Class
        </div>
        
        <div className="bg-secondary-teal p-4 rounded-lg text-theme-on-primary-medium">
          Secondary Teal - Direct CSS Class
        </div>
        
        <div className="bg-theme-bg-surface-4 rounded-lg text-navy font-medium border border-theme-border">
          Text Navy - Direct CSS Class
        </div>
        
        <div className="bg-theme-bg-surface-4 rounded-lg text-accent-coral font-medium border border-theme-border">
          Accent Coral - Direct CSS Class
        </div>
      </div>
      
      {/* Test gradient classes */}
      <div className="space-y-4 mb-8">
        <div className="bg-gradient-to-r from-primary-orange to-accent-coral p-4 rounded-lg text-white">
          Orange to Coral Gradient - Direct CSS
        </div>
        
        <div className="bg-gradient-to-r from-secondary-teal to-secondary-teal-light p-4 rounded-lg text-white">
          Teal Gradient - Direct CSS
        </div>
      </div>
      
      {/* Educational section */}
      <div className="mt-8 p-4 bg-theme-bg-surface-4/10 rounded-lg border border-theme-border">
        <h3 className="text-lg font-semibold text-theme-primary mb-2">⚠️ Using Direct CSS Variables</h3>
        <p className="text-theme-secondary mb-4">
          The classes above use direct color names from globals.css which won't adapt to theme changes.
          Instead, use theme-aware classes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-theme-secondary">
          <li>Use <code className="bg-theme-bg-primary-1 rounded">text-theme-primary</code> instead of <code className="bg-theme-bg-primary-1 rounded">text-navy</code></li>
          <li>Use <code className="bg-theme-bg-primary-1 rounded">bg-theme-primary</code> instead of <code className="bg-theme-bg-primary-1 rounded">bg-primary-orange</code></li>
          <li>Use <code className="bg-theme-bg-primary-1 rounded">bg-theme-gradient-primary</code> for gradients</li>
        </ul>
      </div>
    </div>
  );
}

export default DirectClassTest;