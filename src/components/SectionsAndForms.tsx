import React, { useState } from 'react';

// Import all sections from the index file
import { FAQ, Pricing3ColsSubscription } from './sections';

// Import the form wrapper
import ApplicationFormWrapper from './form/ApplicationFormWrapper';

const SectionsAndForms = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'faq':
        return <FAQ />;
      case 'pricing':
        return <Pricing3ColsSubscription />;
      case 'applicationForm':
        return <ApplicationFormWrapper />;
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Please select a component to view</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Sections and Forms</h1>
        
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveComponent('faq')}
            className={`px-4 py-2 rounded ${activeComponent === 'faq' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            FAQ Section
          </button>
          <button
            onClick={() => setActiveComponent('pricing')}
            className={`px-4 py-2 rounded ${activeComponent === 'pricing' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Pricing Section
          </button>
          <button
            onClick={() => setActiveComponent('applicationForm')}
            className={`px-4 py-2 rounded ${activeComponent === 'applicationForm' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Application Form
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default SectionsAndForms; 