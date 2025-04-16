import React, { useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface TiaBookingPageProps {
  recommendationTitle: string;
  price: string;
  responses: Record<string, string>;
  responseKeys: string[];
  selectedExtras: string[];
  extras: {
    name: string;
    price: string;
  }[];
  onBack: () => void;
}

// Add Calendly type definition
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: any;
        utm?: any;
      }) => void;
      initBadgeWidget: (options: { 
        url: string; 
        text: string; 
        color: string; 
        textColor: string; 
        branding: boolean; 
        position?: "center" | "bottom-right" | "bottom-left" | "top-right" | "top-left" | undefined; 
      }) => void;
      initPopupWidget: (options: any) => void;
    };
    calendlyScriptPromise?: Promise<any>;
  }
}

const TiaBookingPage: React.FC<TiaBookingPageProps> = ({
  recommendationTitle,
  price,
  responses,
  responseKeys,
  selectedExtras,
  extras,
  onBack
}) => {
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate total price including extras
  const calculateTotalPrice = (): string => {
    // Extract numeric value from base price
    const basePriceMatch = price.match(/£([0-9,]+)/);
    let basePrice = 0;
    
    if (basePriceMatch && basePriceMatch[1]) {
      basePrice = parseInt(basePriceMatch[1].replace(/,/g, ''), 10);
    }
    
    // Add prices of selected extras
    let totalExtrasPrice = 0;
    selectedExtras.forEach(extraName => {
      const extra = extras.find(e => e.name === extraName);
      if (extra) {
        const extraPriceMatch = extra.price.match(/£([0-9,]+)/);
        if (extraPriceMatch && extraPriceMatch[1]) {
          totalExtrasPrice += parseInt(extraPriceMatch[1].replace(/,/g, ''), 10);
        }
      }
    });
    
    // If base price contains "from", keep that wording
    if (price.includes("from")) {
      return `From £${basePrice + totalExtrasPrice}`;
    }
    
    return `£${basePrice + totalExtrasPrice}`;
  };
  
  // Load and initialize Calendly
  useEffect(() => {
    if (!calendlyContainerRef.current) return;
    
    // Use a single global script loading promise to prevent duplicate loading
    if (!window.calendlyScriptPromise) {
      window.calendlyScriptPromise = new Promise((resolve, reject) => {
        // Check if script already exists
        if (window.Calendly) {
          resolve(window.Calendly);
          return;
        }
        
        // Check if script is already in the DOM
        let script = document.getElementById('calendly-script') as HTMLScriptElement;
        if (!script) {
          // If not, create and add the script
          script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          script.id = 'calendly-script';
          
          // Set up load handlers
          script.onload = () => resolve(window.Calendly);
          script.onerror = (error) => reject(new Error(`Failed to load Calendly script: ${error}`));
          
          // Add to document
          document.head.appendChild(script);
        } else {
          // If script tag exists but Calendly isn't loaded yet, wait for it
          const checkCalendly = setInterval(() => {
            if (window.Calendly) {
              clearInterval(checkCalendly);
              resolve(window.Calendly);
            }
          }, 100);
          
          // Set a timeout to avoid infinite checking
          setTimeout(() => {
            clearInterval(checkCalendly);
            if (!window.Calendly) {
              reject(new Error('Calendly failed to initialize after timeout'));
            }
          }, 5000);
        }
      });
    }
    
    // Initialize Calendly
    const initCalendly = async () => {
      try {
        // Wait for Calendly to be available
        await window.calendlyScriptPromise;
        
        // Use the appropriate meeting URL
        const meetingUrl = 'https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call';
        
        // Initialize with details about the selected package
        if (window.Calendly && window.Calendly.initInlineWidget) {
          window.Calendly.initInlineWidget({
            url: meetingUrl,
            parentElement: calendlyContainerRef.current,
            prefill: {
              name: '',
              email: '',
              customAnswers: {
                a1: recommendationTitle,
                a2: selectedExtras.join(', ') || 'None',
                a3: calculateTotalPrice()
              }
            }
          });
        }
      } catch (error) {
        console.error('Error initializing Calendly:', error);
      }
    };
    
    // Start initialization
    initCalendly();
  }, [recommendationTitle, selectedExtras, extras, price]);
  
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-6">
        {/* Back button */}
        <button 
          onClick={onBack}
          className="self-start flex items-center text-theme-primary hover:text-theme-primary-hover transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to your recommendation
        </button>
        
        {/* Page title */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">Book Your Strategy Call</h2>
          <p className="text-theme-secondary mt-1">Schedule a time to discuss your personalised implementation plan — no payment necessary, no purchase obligation — just a chat. </p>
        </div>
        
        {/* Main content grid: Package on left, Calendly on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Package Summary (wider on desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Package summary section */}
            <div className="bg-theme-bg-surface rounded-lg p-5 border border-theme-border-light">
              <h3 className="text-xl font-bold text-theme-primary mb-4">Your Package Summary</h3>
              
              {/* Selected package */}
              <div className="mb-5">
                <h4 className="text-base font-medium text-theme-primary mb-2">Selected Package:</h4>
                <div className="bg-orange-500/10 dark:bg-amber-400/15 p-4 rounded-lg">
                  <div className="font-bold text-theme-primary">{recommendationTitle}</div>
                  <div className="text-lg font-medium text-theme-primary">{price}</div>
                </div>
              </div>
              
              {/* Two column layout for extras and total price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* Selected extras (if any) */}
                <div>
                  <h4 className="text-base font-medium text-theme-primary mb-2">Selected Extras:</h4>
                  {selectedExtras.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedExtras.map((extraName, i) => {
                        const extra = extras.find(e => e.name === extraName);
                        return extra ? (
                          <li key={i} className="flex justify-between items-center p-3 border border-theme-border-light rounded-lg">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-theme-primary mr-2" />
                              <span className="text-theme-secondary text-sm">{extra.name}</span>
                            </div>
                            <span className="text-theme-primary">{extra.price}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  ) : (
                    <div className="p-3 border border-theme-border-light rounded-lg text-theme-secondary text-sm">
                      No extras selected
                    </div>
                  )}
                </div>
                
                {/* Total price */}
                <div>
                  <h4 className="text-base font-medium text-theme-primary mb-2">Total:</h4>
                  <div className="bg-theme-primary/5 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-theme-primary">Total</span>
                    <span className="text-xl font-bold text-theme-primary">{calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>
              
              {/* About your match section */}
              <div className="pt-4 border-t border-theme-border-light">
                <h4 className="text-base font-medium text-theme-primary mb-2">Your Match Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {responseKeys.map(key => (
                    <div key={key} className="bg-theme-bg-primary/10 p-3 rounded-lg">
                      <p className="text-theme-secondary text-sm">{responses[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Calendly (narrower on desktop) */}
          <div className="lg:col-span-5">
            <div className="h-full border border-theme-border-light rounded-lg overflow-hidden shadow-theme-sm">
              {/* Calendly header */}
              <div className="p-3 border-b border-theme-border-light flex justify-between items-center bg-theme-bg-surface">
                <h3 className="text-base font-medium text-theme-primary">Select a date and time</h3>
                <div className="text-sm text-theme-tertiary">30 min • No obligation</div>
              </div>
              
              {/* Calendly widget */}
              <div 
                ref={calendlyContainerRef} 
                className="calendly-inline-widget w-full"
                style={{ height: '550px', minHeight: '500px' }}
              >
                {/* Loading indicator */}
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-theme-tertiary">Loading calendar...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiaBookingPage;