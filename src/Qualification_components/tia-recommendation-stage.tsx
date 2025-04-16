import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Check, Calendar } from 'lucide-react';

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
    };
  }
}

interface TiaRecommendationStageProps {
  title: string;
  recommendationTitle: string;
  tagline: string;
  price: string;
  description: string[];
  supportingText: string;
  responses: Record<string, string>;
  responseKeys: string[];
  benefits: string[];
  extras: {
    name: string;
    price: string;
  }[];
  testimonial: string;
  ctaText: string;
  onCTA: () => void;
  ctaAction?: 'direct_purchase' | 'book_session'; // Type of CTA action
}

const TiaRecommendationStage: React.FC<TiaRecommendationStageProps> = ({
  title,
  recommendationTitle,
  tagline,
  price,
  description,
  supportingText,
  responses,
  responseKeys,
  benefits,
  extras,
  testimonial,
  ctaText,
  onCTA,
  ctaAction = 'direct_purchase' // Default to direct purchase if not specified
}) => {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [showCalendly, setShowCalendly] = useState(false);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  
  const toggleExtra = (name: string) => {
    if (selectedExtras.includes(name)) {
      setSelectedExtras(prev => prev.filter(item => item !== name));
    } else {
      setSelectedExtras(prev => [...prev, name]);
    }
  };
  
  // Initialize Calendly if booking session is selected
  useEffect(() => {
    // Only load Calendly if it's a booking action and the button has been clicked
    if (ctaAction === 'book_session' && showCalendly && calendlyContainerRef.current) {
      // Make sure Calendly is loaded
      if (typeof window.Calendly !== 'undefined') {
        // Initialize Calendly inline widget
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/clash-academy/qualifier-session',
          parentElement: calendlyContainerRef.current,
          prefill: {},
          utm: {}
        });
      } else {
        console.error('Calendly script not loaded yet');
      }
    }
  }, [ctaAction, showCalendly]);
  
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-4">
        {/* Empty header - removed title completely */}
        <div className="mb-2">
          <h4 className="text-theme-primary text-base font-medium"></h4>
        </div>
        <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                       transition-all duration-300 rounded-lg p-5 border border-theme-border-light">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-theme-primary">{recommendationTitle}</h3>
              <p className="text-theme-secondary">{tagline}</p>
            </div>
            <div className="text-xl font-bold text-theme-primary md:text-right mt-2 md:mt-0">{price}</div>
          </div>
          
          <div className="mb-6">
            {description.map((paragraph, i) => (
              <p key={i} className="text-theme-secondary mb-2">{paragraph}</p>
            ))}
          </div>
          
          {/* About your match section */}
          <div className="mb-5">
            <h4 className="text-base font-medium text-theme-primary mb-2">About your match:</h4>
            <p className="text-theme-secondary mb-2">
              Designed just for you to achieve your goals based on your unique responses:
            </p>
            <ul className="space-y-2 ml-1">
              {responseKeys.map(key => (
                <li key={key} className="flex items-start gap-2">
                  <div className="mt-1 text-theme-accent-secondary">•</div>
                  <p className="text-theme-secondary">{responses[key]}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* What you get section */}
          <div className="mb-6">
            <h4 className="text-base font-medium text-theme-primary mb-2">What You Get:</h4>
            <ul className="space-y-2 ml-1">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Optional extras */}
          <div className="mb-6">
            <h4 className="text-base font-medium text-theme-primary mb-2">Optional Extras:</h4>
            <div className="space-y-2">
              {extras.map((extra, i) => (
                <div 
                  key={i} 
                  className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedExtras.includes(extra.name)
                      ? 'border-theme-primary bg-theme-primary/10'
                      : 'border-theme-border-light hover:border-theme-primary/30 hover:bg-theme-primary/5'
                  }`}
                  onClick={() => toggleExtra(extra.name)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                      selectedExtras.includes(extra.name)
                        ? 'border-theme-primary bg-theme-primary'
                        : 'border-theme-border-light'
                    }`}>
                      {selectedExtras.includes(extra.name) && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-theme-secondary">{extra.name}</span>
                  </div>
                  <span className="text-theme-primary font-medium">{extra.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonial quote */}
          <div className="bg-theme-bg-primary/30 p-4 rounded-lg mb-6">
            <p className="text-theme-tertiary italic">{testimonial}</p>
          </div>
          
          {/* CTA Button - different behavior based on action type */}
          {!showCalendly ? (
            <button
              onClick={() => {
                onCTA(); // Call the parent handler
                if (ctaAction === 'book_session') {
                  setShowCalendly(true); // Show Calendly if it's a booking action
                }
              }}
              className="w-full py-3 px-4 bg-theme-primary hover:bg-theme-primary-hover text-white 
                      rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {ctaAction === 'book_session' && <Calendar className="h-5 w-5" />}
              {ctaText}
            </button>
          ) : (
            <div className="mt-4">
              <p className="text-theme-primary font-medium mb-2 text-center">Choose a time that works for you:</p>
            </div>
          )}
          
          {/* Calendly container - Only shown after clicking the CTA button */}
          {showCalendly && (
            <div 
              ref={calendlyContainerRef} 
              className="mt-4 border border-theme-border-light rounded-lg" 
              style={{ height: '630px', width: '100%' }}
            />
          )}
        </div>
        
        {/* Support text with tracking */}
        <div className="p-2">
          <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
            {supportingText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaRecommendationStage;