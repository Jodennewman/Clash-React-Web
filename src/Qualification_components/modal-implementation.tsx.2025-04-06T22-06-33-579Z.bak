import React, { useState, useEffect } from 'react';
import VSQualificationModal from './qualification-modal';

/**
 * Example implementation of the VSQualificationModal component
 * This shows how to integrate the qualification modal into your landing page
 */
const ModalImplementation = () => {
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
            <div className="text-2xl font-bold">Your Brand</div>
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
              Apply Now
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero section with CTA button */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-theme-primary">
              800 million views, zero spent on ads
            </h1>
            <p className="text-xl text-theme-secondary mb-10">
              A proven turn-key system to survive, thrive, and monetise with short-form content.
            </p>
            <button
              onClick={openModal}
              className="bg-theme-gradient-primary text-white font-medium py-3 px-8 rounded-lg shadow-theme-btn hover:shadow-theme-lg hover-bubbly"
            >
              Find Your Implementation Strategy
            </button>
          </div>
        </div>
      </section>
      
      {/* Example section with another CTA */}
      <section className="py-20 bg-theme-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-theme-primary text-center">
              Choose the Implementation That's Right for You
            </h2>
            <p className="text-lg text-theme-secondary mb-12 text-center">
              We understand that every team is different. That's why we've developed a flexible 
              implementation approach that adapts to your specific needs, team structure, and timeline.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 */}
              <div className="bg-theme-bg-surface p-6 rounded-lg shadow-theme-card hover:shadow-theme-card-hover transition-all hover-bubbly">
                <div className="absolute top-5 right-5 -z-10 w-16 h-16 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-theme-primary">Self-Directed</h3>
                  <p className="text-theme-secondary mb-6">
                    Perfect for hands-on teams who want to implement at their own pace with documentation and resources.
                  </p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-theme-bg-surface p-6 rounded-lg shadow-theme-card hover:shadow-theme-card-hover transition-all hover-bubbly">
                <div className="absolute top-5 right-5 -z-10 w-16 h-16 rounded-[40%] rotate-6 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-theme-primary">Guided Implementation</h3>
                  <p className="text-theme-secondary mb-6">
                    Ideal for teams who want regular coaching and guidance during their implementation journey.
                  </p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-theme-bg-surface p-6 rounded-lg shadow-theme-card hover:shadow-theme-card-hover transition-all hover-bubbly">
                <div className="absolute top-5 right-5 -z-10 w-16 h-16 rounded-[40%] -rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-theme-primary">Full-Service</h3>
                  <p className="text-theme-secondary mb-6">
                    Best for teams who want dedicated support and done-for-you implementation assistance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={openModal}
                className="bg-theme-primary hover:bg-theme-primary-hover text-white font-medium py-3 px-8 rounded-lg shadow-theme-btn hover:shadow-theme-md transition-all hover-bubbly"
              >
                Find Your Best Implementation Path
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal component with test mode (press Ctrl+Shift+T to toggle test mode) */}
      <VSQualificationModal 
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

export default ModalImplementation;