import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, Check, Calendar, ArrowLeft, 
  Users, Compass, Clock, BarChart4, 
  CreditCard, Mail
} from 'lucide-react';

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
  // Add state for the pages (purchase and calendly booking)
  const [showPurchasePage, setShowPurchasePage] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  
  // Utility function to calculate total price including extras
  const calculateTotalPrice = (): string => {
    try {
      // Extract numeric value from base price
      const basePriceMatch = price?.match(/£([0-9,]+(?:\.[0-9]+)?)/);
      let basePrice = 0;
      
      if (basePriceMatch && basePriceMatch[1]) {
        basePrice = parseFloat(basePriceMatch[1].replace(/,/g, ''));
      } else {
        console.log('No valid price match found for:', price);
      }
      
      // Add prices of selected extras
      let totalExtrasPrice = 0;
      selectedExtras.forEach(extraName => {
        const extra = extras.find(e => e.name === extraName);
        if (extra?.price) {
          const extraPriceMatch = extra.price.match(/£([0-9,]+(?:\.[0-9]+)?)/);
          if (extraPriceMatch && extraPriceMatch[1]) {
            totalExtrasPrice += parseFloat(extraPriceMatch[1].replace(/,/g, ''));
          } else {
            console.log('No valid price match found for extra:', extra.name, extra.price);
          }
        }
      });
      
      // Format total price with commas for thousands
      const totalPrice = Math.round((basePrice + totalExtrasPrice) * 100) / 100; // Round to 2 decimal places
      const formattedTotalPrice = totalPrice.toLocaleString('en-GB');
      
      // If base price contains "from", keep that wording
      if (price?.includes("from")) {
        return `Starting from £${formattedTotalPrice}`;
      }
      
      return `£${formattedTotalPrice}`;
    } catch (error) {
      console.error("Error calculating price:", error);
      return price || "Price unavailable";
    }
  };
  
  // Check if this is an upgraded recommendation with history
  let hasRecommendationHistory = false;
  
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const historyStr = window.sessionStorage.getItem('recommendationHistory');
      if (historyStr) {
        const history = JSON.parse(historyStr);
        console.log('Current recommendation history:', historyStr);
        
        // We should show back button if we have more than one entry in history
        hasRecommendationHistory = history.length > 1;
        
        // Add additional debug for back button visibility
        console.log('Current recommendation title:', recommendationTitle);
        console.log('History entries:', history.length);
        console.log('Should show back button:', hasRecommendationHistory);
        
        if (history.length > 1) {
          console.log('Previous recommendation in history:', history[history.length - 2].type);
          console.log('Current recommendation in history:', history[history.length - 1].type);
        }
      } else {
        console.log('No recommendation history found in session storage');
      }
    } catch (e) {
      console.error('Error checking recommendation history', e);
    }
  }
  
  const toggleExtra = (name: string, price: string) => {
    // Check if this is an upgrade option
    if (name.includes('Upgrade to Executive')) {
      console.log('Upgrade to Executive selected');
      
      // Scroll to top of the page before changing recommendations
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Signal to parent component that we want to upgrade to Executive
      if (window.sessionStorage) {
        window.sessionStorage.setItem('upgradeToRecommendation', 'executive');
        console.log('Set upgradeToRecommendation to executive');
      }
      
      // Call parent's onCTA to trigger recommendation recalculation
      // Slight delay to ensure smooth scrolling starts first
      setTimeout(() => {
        console.log('Calling onCTA for upgrade to Executive');
        onCTA();
      }, 100);
      return;
    } else if (name.includes('Upgrade to Comprehensive')) {
      console.log('Upgrade to Comprehensive selected');
      
      // Scroll to top of the page before changing recommendations
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Signal to parent component that we want to upgrade to Comprehensive
      if (window.sessionStorage) {
        window.sessionStorage.setItem('upgradeToRecommendation', 'comprehensive');
        console.log('Set upgradeToRecommendation to comprehensive');
      }
      
      // Call parent's onCTA to trigger recommendation recalculation
      setTimeout(() => {
        console.log('Calling onCTA for upgrade to Comprehensive');
        onCTA();
      }, 100);
      return;
    }
    
    // Normal extra toggle
    if (selectedExtras.includes(name)) {
      setSelectedExtras(prev => prev.filter(item => item !== name));
    } else {
      setSelectedExtras(prev => [...prev, name]);
    }
  };
  
  const handleBackToPreviousRecommendation = () => {
    if (window.sessionStorage) {
      // Log the state before making changes
      try {
        const historyStr = window.sessionStorage.getItem('recommendationHistory');
        console.log('BACK BUTTON PRESSED - Current history before revert:', historyStr);
        
        // Make sure we have history and it contains at least two entries
        if (historyStr) {
          const history = JSON.parse(historyStr);
          
          if (history.length > 1) {
            console.log('Found history with multiple entries:');
            console.log('Current recommendation:', recommendationTitle);
            console.log('Current recommendation type:', history[history.length - 1].type);
            console.log('Previous recommendation type:', history[history.length - 2].type);
          }
        }
      } catch (e) {
        console.error('Error reading history when back button pressed', e);
      }
      
      // Scroll to top of the page before changing recommendations
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Set flag to revert to the original recommendation
      window.sessionStorage.setItem('revertToOriginalRecommendation', 'true');
      
      console.log('Setting revertToOriginalRecommendation to true');
      
      // Clear any pending upgrade requests to avoid conflicts
      window.sessionStorage.removeItem('upgradeToRecommendation');
      
      // Trigger the parent's onCTA to reprocess after a slight delay
      setTimeout(() => {
        console.log('Triggering parent onCTA for revert');
        onCTA();
      }, 100);
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
              a2: recommendationTitle || 'Standard',
              a3: selectedExtras.length > 0 ? `Total Price: ${calculateTotalPrice()}` : price
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
  
  // Now render the appropriate view
  
  // Render the booking page for Comprehensive and Executive tiers
  if (showCalendly && !recommendationTitle.includes('Foundation')) {
    return (
      <div className="p-5 md:p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with back button only - no title */}
          <div className="mb-4">
            <button
              onClick={() => setShowCalendly(false)}
              className="flex items-center text-[var(--theme-primary)] hover:text-[var(--theme-primary-hover)] transition-colors duration-[var(--theme-transition-fast)]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to recommendation
            </button>
          </div>
          
          {/* Booking page layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column - Package details */}
            <div className="lg:col-span-5 flex flex-col space-y-5">
              <div className="bg-transparent backdrop-blur-sm hover:backdrop-blur-md
                       hover:border-[var(--theme-primary)]/30
                       transition-all duration-[var(--theme-transition-normal)]
                       rounded-[var(--theme-border-radius-lg)] p-6
                       border border-[var(--theme-border-light)]/30
                       shadow-[var(--theme-shadow-sm)]
                       hover:shadow-[var(--theme-shadow-md)]">
                {/* Package details with separate price and title */}
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold text-theme-primary">{recommendationTitle}</h4>
                  <span className="text-theme-primary font-medium">{price}</span>
                </div>
                
                <p className="text-theme-secondary mb-4">{tagline}</p>
                
                {/* Selected extras with remove option - no border */}
                {selectedExtras.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-theme-primary mb-2">Selected extras:</h5>
                    {selectedExtras.map((extraName, index) => {
                      const extra = extras.find(e => e.name === extraName);
                      return extra ? (
                        <div className="flex justify-between items-center mb-2" key={index}>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleExtra(extraName, extra.price)}
                              className="text-theme-tertiary hover:text-theme-primary text-xs"
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                            <span className="text-theme-secondary text-sm">{extra.name}</span>
                          </div>
                          <span className="text-theme-primary text-sm">{extra.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                
                {/* Price information - always show total */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-theme-primary">Total</span>
                    <span className="text-lg font-bold text-theme-primary">
                      {selectedExtras.length > 0 ? calculateTotalPrice() : price}
                    </span>
                  </div>
                </div>
                
                <div className="bg-[var(--theme-bg-primary)]/30 p-4 rounded-lg mb-4">
                  <p className="text-[var(--theme-text-tertiary)] italic text-sm">{testimonial}</p>
                </div>
                
                {/* No-payment notice at the bottom in bold */}
                <p className="text-theme-primary text-sm font-bold">
                  No payment required for this discovery call. We'll discuss your match and explore the best options for your needs.
                </p>
              </div>
              
              <div className="mb-5">
                <h5 className="text-base font-medium text-theme-primary mb-3">What to expect on this call:</h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-1" />
                    <p className="text-theme-secondary text-sm">Discuss your specific goals and challenges</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-1" />
                    <p className="text-theme-secondary text-sm">Get clarity on your implementation plan</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-1" />
                    <p className="text-theme-secondary text-sm">Ask any questions about {recommendationTitle}</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-1" />
                    <p className="text-theme-secondary text-sm">No pressure, just helpful guidance</p>
                  </li>
                </ul>
              </div>
              
              {/* Help option - without box */}
              <div className="mb-4">
                <p className="text-theme-secondary text-sm mb-2">
                  Need to contact the team now?
                </p>
                <a 
                  href="mailto:info@clashnewman.com" 
                  className="inline-flex items-center text-theme-primary hover:text-theme-primary-hover transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" /> Contact our team
                </a>
              </div>
            </div>
            
            {/* Right column - Calendly */}
            <div className="lg:col-span-7">
              <div className="border border-theme-border-light rounded-lg overflow-hidden shadow-theme-sm h-full">
                {/* Calendly widget */}
                <div 
                  ref={calendlyContainerRef} 
                  className="calendly-inline-widget w-full"
                  style={{ height: '100%', minHeight: '650px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render the purchase page for Foundation Implementation
  if (showPurchasePage && recommendationTitle.includes('Foundation')) {
    return (
      <div className="p-5 md:p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with back button only - no title */}
          <div className="mb-4">
            <button
              onClick={() => setShowPurchasePage(false)}
              className="flex items-center text-[var(--theme-primary)] hover:text-[var(--theme-primary-hover)] transition-colors duration-[var(--theme-transition-fast)]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to recommendation
            </button>
          </div>
          
          {/* Cleaner layout with description/what's included on left, order summary on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column - Description and What's Included */}
            <div className="lg:col-span-7">
              {/* Brief description of Foundation Implementation */}
              <div className="bg-transparent backdrop-blur-sm
                       rounded-[var(--theme-border-radius-lg)] p-6
                       border border-[var(--theme-border-light)]/30
                       shadow-[var(--theme-shadow-sm)] mb-5">
                <h4 className="text-xl font-bold text-theme-primary mb-3">{recommendationTitle}</h4>
                <p className="text-theme-secondary mb-4">
                  The Foundation Implementation is your complete self-paced toolkit for building a professional content system. 
                  Perfect for solo creators and small teams who want complete clarity and a proper framework to launch with confidence.
                </p>
                
                {/* What's included section */}
                <h5 className="text-base font-medium text-theme-primary mb-3">What's Included:</h5>
                <ul className="space-y-2 mb-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-[var(--theme-bg-primary)]/30 p-4 rounded-lg">
                  <p className="text-[var(--theme-text-tertiary)] italic">{testimonial}</p>
                </div>
              </div>
              
              {/* Help and support section */}
              <div className="bg-transparent backdrop-blur-sm rounded-[var(--theme-border-radius-lg)] p-5
                         border border-[var(--theme-border-light)]/30 shadow-[var(--theme-shadow-sm)]">
                <h5 className="text-base font-medium text-[var(--theme-text-primary)] mb-3">Not sure if this is right for you?</h5>
                <p className="text-theme-secondary mb-4">
                  If you'd like to discuss your specific needs or explore other options, our team is here to help.
                </p>
                <a 
                  href="mailto:info@clashnewman.com" 
                  className="inline-flex items-center text-theme-primary hover:text-theme-primary-hover transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" /> Email us at info@clashnewman.com
                </a>
              </div>
            </div>
            
            {/* Right column - Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-transparent backdrop-blur-sm hover:backdrop-blur-md
                       transition-all duration-[var(--theme-transition-normal)]
                       rounded-[var(--theme-border-radius-lg)] p-6
                       border border-[var(--theme-border-light)]/30
                       shadow-[var(--theme-shadow-sm)]
                       hover:shadow-[var(--theme-shadow-md)] sticky top-5">
                <h4 className="text-lg font-medium text-theme-primary mb-4">Order Summary</h4>
                
                {/* Package details - no border */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-theme-secondary">Foundation Implementation</span>
                    <span className="text-theme-primary font-medium">{price}</span>
                  </div>
                </div>
                
                {/* Selected extras with remove option - no border */}
                {selectedExtras.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-theme-primary mb-2">Selected extras:</h5>
                    {selectedExtras.map((extraName, index) => {
                      const extra = extras.find(e => e.name === extraName);
                      return extra ? (
                        <div className="flex justify-between items-center mb-2" key={index}>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleExtra(extraName, extra.price)}
                              className="text-theme-tertiary hover:text-theme-primary text-xs"
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                            <span className="text-theme-secondary text-sm">{extra.name}</span>
                          </div>
                          <span className="text-theme-primary text-sm">{extra.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                
                {/* Running total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-theme-primary">Total</span>
                  <span className="text-xl font-bold text-theme-primary">
                    {calculateTotalPrice()}
                  </span>
                </div>
                
                {/* Payment button */}
                <button 
                  className="w-full py-4 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)] 
                           text-white rounded-lg font-medium hover:shadow-[var(--theme-shadow-btn-primary)] 
                           transition-all duration-300 hover:translate-y-[-3px] mb-4"
                  onClick={() => {
                    // In production, this would redirect to Stripe checkout
                    alert('Redirecting to payment gateway...');
                  }}
                >
                  Proceed to Payment
                </button>
                
                <p className="text-theme-tertiary text-xs text-center">
                  Secure payment processing. No obligation until purchase is complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-6">
        {/* Header - Only back button if we have history */}
        <div className="mb-2">
          {hasRecommendationHistory && (
            <button
              onClick={handleBackToPreviousRecommendation}
              className="flex items-center text-[var(--theme-primary)] hover:text-[var(--theme-primary-hover)] transition-colors duration-[var(--theme-transition-fast)]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to previous recommendation
            </button>
          )}
        </div>
        
        {/* Hero section - full width recommendation panel */}
        <div className="bg-transparent backdrop-blur-sm
                     hover:backdrop-blur-md 
                     hover:border-[var(--theme-primary)]/30 
                     transition-all duration-[var(--theme-transition-normal)] 
                     rounded-[var(--theme-border-radius-lg)] p-6 
                     border border-[var(--theme-border-light)]/30 w-full 
                     shadow-[var(--theme-shadow-sm)] 
                     hover:shadow-[var(--theme-shadow-md)]">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="flex-grow">
              <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">{recommendationTitle}</h2>
              <p className="text-theme-secondary text-lg mt-1">{tagline}</p>
            </div>
            <div className="text-xl font-bold text-theme-primary md:text-right mt-2 md:mt-0">{price}</div>
          </div>
          
          <div className="mb-6 max-w-4xl">
            {description.map((paragraph, i) => (
              <p key={i} className="text-theme-secondary mb-2 text-base">{paragraph}</p>
            ))}
          </div>
          
          {/* CTA Button - Only for non-Foundation tiers with non-empty ctaText */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {!recommendationTitle.includes('Foundation') && ctaText && (
              <button
                onClick={() => {
                  onCTA(); // Call the parent handler
                }}
                className="sm:max-w-xs py-3 px-6 bg-gradient-to-r from-[var(--theme-primary)]/30 to-[var(--theme-primary-hover)]/30
                        hover:from-[var(--theme-primary)]/40 hover:to-[var(--theme-primary-hover)]/40
                        text-[var(--theme-text-primary)] border border-[var(--theme-primary)]
                        rounded-[var(--theme-border-radius-lg)] font-medium 
                        shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] 
                        transition-all duration-[var(--theme-transition-normal)]
                        hover:translate-y-[var(--theme-anim-distance-sm)]
                        flex items-center justify-center gap-2"
              >
                {ctaText}
              </button>
            )}
          </div>
        </div>
        
        {/* Main content - grid layout based on tier */}
        {/* Use the same layout for all tier types - no Calendly */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-transparent backdrop-blur-sm rounded-[var(--theme-border-radius-lg)] p-5 
                       border border-[var(--theme-border-light)]/30 shadow-[var(--theme-shadow-sm)] w-full">
            {/* Side-by-side layout for About and What you get */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* About your match section - ALWAYS ON THE LEFT */}
              <div>
                <h4 className="text-base font-medium text-theme-primary mb-3">About your match:</h4>
                <ul className="space-y-2">
                  {responseKeys.map(key => {
                    // Select appropriate icon based on the response key
                    let IconComponent;
                    switch(key) {
                      case 'teamSize':
                        IconComponent = Users;
                        break;
                      case 'implementationSupport':
                        IconComponent = Compass;
                        break;
                      case 'timeline':
                        IconComponent = Clock;
                        break;
                      case 'contentVolume':
                        IconComponent = BarChart4;
                        break;
                      default:
                        IconComponent = CheckCircle;
                    }
                    
                    return (
                      <li key={key} className="flex items-start gap-2">
                        <IconComponent className="h-4 w-4 text-theme-primary shrink-0 mt-1" />
                        <p className="text-theme-secondary">{responses[key]}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              {/* What you get section - ALWAYS ON THE RIGHT */}
              <div>
                <h4 className="text-base font-medium text-theme-primary mb-3">What You Get:</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <p className="text-theme-secondary">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Testimonial quote */}
            <div className="bg-[var(--theme-bg-primary)]/30 p-4 rounded-lg mb-6">
              <p className="text-[var(--theme-text-tertiary)] italic">{testimonial}</p>
            </div>
          </div>
        </div>
        
        {/* Optional extras at the bottom - full width, filter out Comprehensive upgrade for Foundation */}
        <div className="bg-transparent backdrop-blur-sm rounded-[var(--theme-border-radius-lg)] p-5 
                       border border-[var(--theme-border-light)]/30 shadow-[var(--theme-shadow-sm)] w-full">
          <h4 className="text-base font-medium text-[var(--theme-text-primary)] mb-4">Optional Extras:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras
              .filter(extra => !(recommendationTitle.includes('Foundation') && 
                               extra.name.includes('Upgrade to Comprehensive')))
              .map((extra, i) => (
                <div 
                  key={i} 
                  className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-all duration-[var(--theme-transition-normal)] ${
                    selectedExtras.includes(extra.name)
                      ? 'border-[var(--theme-primary)] bg-gradient-to-r from-[var(--theme-primary)]/20 to-[var(--theme-primary-hover)]/20'
                      : 'border-[var(--theme-border-light)] bg-transparent hover:border-[var(--theme-primary)]/30 hover:bg-[var(--theme-primary)]/5'
                  }`}
                  onClick={() => toggleExtra(extra.name, extra.price)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                      selectedExtras.includes(extra.name)
                        ? 'border-[var(--theme-primary)] bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)]'
                        : 'border-[var(--theme-border-light)]'
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
        
        {/* Tier-specific CTA Button */}
        <div className="flex justify-center w-full">
          {recommendationTitle.includes('Foundation') ? (
            <button
              onClick={() => setShowPurchasePage(true)}
              className="py-4 px-8 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)]
                       text-white rounded-lg font-medium shadow-[var(--shadow-btn)]
                       hover:shadow-[var(--theme-shadow-btn-primary)]
                       transition-all duration-[var(--theme-anim-duration)]
                       hover:translate-y-[-4px] hover:scale-[var(--theme-anim-scale-sm)]
                       flex items-center justify-center gap-2 text-lg"
            >
              Start Your Foundation Implementation Now
            </button>
          ) : (
            <button
              onClick={() => setShowCalendly(true)}
              className="py-4 px-8 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)]
                       text-white rounded-lg font-medium shadow-[var(--shadow-btn)]
                       hover:shadow-[var(--theme-shadow-btn-primary)]
                       transition-all duration-[var(--theme-anim-duration)]
                       hover:translate-y-[-4px] hover:scale-[var(--theme-anim-scale-sm)]
                       flex items-center justify-center gap-2 text-lg"
            >
              <Calendar className="h-5 w-5" /> Book Your Free Strategy Call
            </button>
          )}
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