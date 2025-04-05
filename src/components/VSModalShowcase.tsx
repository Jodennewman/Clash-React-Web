import React from 'react';
import ModalsImplementation from './modals/ModalsImplementation';

/**
 * VSModalShowcase - Component to showcase the VS modal system
 * 
 * This component is the entry point for the modal system showcase
 * and can be easily integrated into any page of the VS website.
 */
const VSModalShowcase: React.FC = () => {
  return (
    <div className="bg-theme-gradient screen">
      <div className="pt-20 pb-32">
        <ModalsImplementation />
      </div>
    </div>
  );
};

export default VSModalShowcase;