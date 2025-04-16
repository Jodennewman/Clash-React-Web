import React, { useState, useEffect } from 'react';
import TiaQualificationModal from './tia-qualification-modal';

/**
 * Example implementation of the TiaQualificationModal component
 * This shows how to integrate the simplified qualification modal into your landing page
 */
const TiaModalImplementation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testMode, setTestMode] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
    // Disable scroll on body when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scroll on body when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  // Enable test mode with keyboard shortcut (Ctrl+Shift+T)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        setTestMode(prev => !prev);
        console.log('Test mode:', !testMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testMode]);
  
  // Listen for ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isModalOpen]);
  
  return (
    <div className="bg-theme-bg-primary text-theme-primary min-h-screen">
      {/* Example usage in your landing page */}
      <header className="border-b border-[var(--theme-border-light)] py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Clash Creation</div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-theme-primary hover:text-theme-accent-secondary transition-colors">Features</a>
              <a href="#" className="text-theme-primary hover:text-theme-accent-secondary transition-colors">Pricing</a>
              <a href="#" className="text-theme-primary hover:text-theme-accent-secondary transition-colors">Case Studies</a>
              <a href="#" className="text-theme-primary hover:text-theme-accent-secondary transition-colors">FAQ</a>
            </nav>
            <button
              onClick={openModal}
              className="bg-theme-primary hover:bg-theme-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-theme-sm hover-bubbly-sm"
            >
              Find Your Path
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero section with CTA button */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-theme-primary">
              Billions of Views. Built for You.
            </h1>
            <p className="text-xl text-theme-secondary mb-10">
              Find the perfect plan for you to scale your content - fast
            </p>
            <button
              onClick={openModal}
              className="bg-theme-gradient-primary text-white font-medium py-4 px-10 rounded-lg shadow-theme-btn hover:shadow-theme-lg hover-bubbly text-lg"
            >
              Get my personalised plan
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer section */}
      <section className="py-16 bg-theme-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center text-theme-tertiary text-sm">
            <p>© 2025 Clash Creation. All rights reserved.</p>
          </div>
        </div>
      </section>
      
      {/* Modal component with test mode (press Ctrl+Shift+T to toggle test mode) */}
      <TiaQualificationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        testMode={testMode}
      />
      
      {/* Test mode indicator */}
      {testMode && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white text-xs font-medium py-1 px-2 rounded-full">
          Test Mode
        </div>
      )}
    </div>
  );
};

export default TiaModalImplementation;