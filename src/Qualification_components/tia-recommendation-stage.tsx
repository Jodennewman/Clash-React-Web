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
  // Always show Calendly by default
  const [showCalendly, setShowCalendly] = useState(true);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  
  const toggleExtra = (name: string) => {
    if (selectedExtras.includes(name)) {
      setSelectedExtras(prev => prev.filter(item => item !== name));
    } else {
      setSelectedExtras(prev => [...prev, name]);
    }
  };
  
  // Load Calendly script and initialize widget
  useEffect(() => {
    // Early return if we shouldn't show Calendly
    if (!showCalendly || !calendlyContainerRef.current) return;
    
    // Load the Calendly script if it doesn't exist
    let script = document.getElementById('calendly-script') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.id = 'calendly-script';
      document.head.appendChild(script);
    }
    
    // Initialize Calendly widget once the script is loaded
    const initCalendly = () => {
      if (typeof window.Calendly !== 'undefined' && calendlyContainerRef.current) {
        // Determine which meeting type to use based on recommendation tier
        let meetingUrl = 'https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call';
        
        // For different recommendation tiers, we can use different meeting types/URLs
        if (recommendationTitle.toLowerCase().includes('executive')) {
          meetingUrl = 'https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call';
        } else if (recommendationTitle.toLowerCase().includes('foundation')) {
          meetingUrl = 'https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call';
        }
        
        // Initialize Calendly inline widget with appropriate meeting type
        window.Calendly.initInlineWidget({
          url: meetingUrl,
          parentElement: calendlyContainerRef.current,
          prefill: {
            name: '',
            email: '',
            customAnswers: {
              a1: selectedExtras.join(', ') || 'None',
              a2: recommendationTitle || 'Standard'
            }
          },
          utm: {}
        });
        
        console.log('Calendly widget initialized with URL:', meetingUrl);
      } else {
        console.log('Waiting for Calendly script to load...');
      }
    };
    
    // If script is already loaded, initialize immediately
    if (window.Calendly) {
      initCalendly();
    } else {
      // Otherwise, wait for script to load
      script.onload = initCalendly;
    }
    
    // Cleanup function
    return () => {
      // No need to remove script - it can be reused
    };
  }, [showCalendly, selectedExtras, recommendationTitle]);
  
  return (
    <div className="p-2">
      <div className="flex flex-col space-y-6">
        {/* Header title - "Your Personalised Plan" replaced with "Your Match:" */}
        
        {/* Hero section - full width recommendation panel */}
        <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                     transition-all duration-300 rounded-lg p-6 border -mt-6 border-theme-border-light w-full">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="flex-grow">
              <h2 className="text-sm md:text-3xl font-bold text-theme-primary">{recommendationTitle}</h2>
              <p className="text-theme-secondary text-lg mt-1">{tagline}</p>
            </div>
            <div className="text-xl font-bold text-theme-primary md:text-right mt-2 md:mt-0">{price}</div>
          </div>
          
          <div className="mb-6 max-w-4xl">
            {description.map((paragraph, i) => (
              <p key={i} className="text-theme-secondary mb-2 text-base">{paragraph}</p>
            ))}
          </div>
          
          {/* CTA Button - Always displayed in hero section */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => {
                onCTA(); // Call the parent handler
              }}
              className="sm:max-w-xs py-3 px-6 bg-orange-500/30 dark:bg-amber-400/40 hover:bg-orange-500/40 
                      dark:hover:bg-amber-400/50 text-theme-primary border border-theme-primary 
                      rounded-lg font-medium shadow-theme-sm hover:shadow-theme-md transition-all 
                      flex items-center justify-center gap-2 duration-300"
            >
              {ctaText}
            </button>
          </div>
        </div>
        
        {/* Secondary content - Two column layout with details on left and Calendly on right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left column - Match details and features */}
          <div className="lg:col-span-2">
            <div className="bg-theme-bg-surface rounded-lg p-5 border border-theme-border-light h-full">
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
              
              {/* Testimonial quote */}
              <div className="bg-theme-bg-primary/30 p-4 rounded-lg mb-6">
                <p className="text-theme-tertiary italic">{testimonial}</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Calendly */}
          <div className="lg:col-span-3 h-full">
            <div className="h-full border border-theme-border-light rounded-lg overflow-hidden shadow-theme-sm">
              {/* Calendly header */}
              <div className="p-3 border-b border-theme-border-light flex justify-between items-center bg-theme-bg-surface">
                <h3 className="text-base font-medium text-theme-primary">Book Your Free Strategy Call</h3>
                <div className="text-sm text-theme-tertiary">30 min • No obligation</div>
              </div>
              
              {/* Calendly widget */}
              <div 
                ref={calendlyContainerRef} 
                className="calendly-inline-widget w-full"
                style={{ height: 'calc(100% - 54px)', minHeight: '630px' }}
              />
            </div>
          </div>
        </div>
        
        {/* Optional extras at the bottom - full width */}
        <div className="bg-theme-bg-surface rounded-lg p-5 border border-theme-border-light w-full">
          <h4 className="text-base font-medium text-theme-primary mb-4">Optional Extras:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((extra, i) => (
              <div 
                key={i} 
                className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedExtras.includes(extra.name)
                    ? 'border-theme-primary bg-orange-500/30 dark:bg-amber-400/40'
                    : 'border-theme-border-light bg-transparent hover:border-theme-primary/30 hover:bg-theme-primary/5'
                }`}
                onClick={() => toggleExtra(extra.name)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                    selectedExtras.includes(extra.name)
                      ? 'border-theme-primary bg-orange-500/80 dark:bg-amber-400'
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
        
        {/* Support text with tracking - always at the bottom */}
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