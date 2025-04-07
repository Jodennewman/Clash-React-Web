import React, { useEffect, useRef } from 'react';

interface CalendlyInlineWidgetProps {
  /**
   * URL to your Calendly scheduling page
   */
  url?: string;
  /**
   * Minimum width of the embedded widget (in px)
   */
  minWidth?: number | string;
  /**
   * Height of the embedded widget (in px)
   */
  height?: number | string;
  /**
   * Optional CSS classes to apply to container
   */
  className?: string;
  /**
   * Optional title for the scheduling section
   */
  title?: string;
  /**
   * Optional subtitle for the scheduling section
   */
  subtitle?: string;
  /**
   * Background style for the container
   */
  backgroundStyle?: 'gradient' | 'solid' | 'pattern' | 'none';
  /**
   * Widget theme color (primary color) - applied to the Calendly widget when supported
   */
  primaryColor?: string;
  /**
   * Widget text color - applied to the Calendly widget when supported
   */
  textColor?: string;
  /**
   * Container width (CSS value, e.g., '100%', '800px')
   */
  containerWidth?: string;
  /**
   * Hide Calendly branding
   */
  hideEventTypeDetails?: boolean;
  /**
   * Hide GDPR banner
   */
  hideGdprBanner?: boolean;
  /**
   * Card style - controls shadow, border, etc.
   */
  cardStyle?: 'default' | 'elevated' | 'minimal' | 'borderless';
}

/**
 * Inline Calendly scheduling widget that integrates with VS design system
 * 
 * This component embeds a Calendly widget directly into a page using VS theme-aware styling
 */
const CalendlyInlineWidget: React.FC<CalendlyInlineWidgetProps> = ({
  url = 'https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call',
  minWidth = 320,
  height = 700,
  className = '',
  title = 'Schedule a Discovery Call',
  subtitle = 'Choose a time that works for you',
  backgroundStyle = 'gradient',
  primaryColor = '',
  textColor = '',
  containerWidth = '100%',
  hideEventTypeDetails = false,
  hideGdprBanner = false,
  cardStyle = 'default'
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Build URL with parameters
  const buildCalendlyUrl = () => {
    const baseUrl = url;
    const params = new URLSearchParams();
    
    if (hideGdprBanner) params.append('hide_gdpr_banner', '1');
    if (hideEventTypeDetails) params.append('hide_event_type_details', '1');
    if (primaryColor) params.append('primary_color', primaryColor.replace('#', ''));
    if (textColor) params.append('text_color', textColor.replace('#', ''));
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Get background style based on prop
  const getBackgroundClass = () => {
    switch (backgroundStyle) {
      case 'solid':
        return 'bg-[var(--theme-bg-primary)]';
      case 'pattern':
        return backgroundPatternClass;
      case 'none':
        return 'bg-transparent';
      case 'gradient':
      default:
        return gradientClass;
    }
  };
  
  // Define complex background patterns as variables
  const backgroundPatternClass = "bg-[radial-gradient(var(--theme-grid-dot)_1px,transparent_1px)] bg-[size:20px_20px]";
  const gradientClass = "bg-gradient-to-br from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]";

  return (
    <div 
      className={`relative overflow-hidden rounded-[var(--border-radius-lg)] ${className}`}
      style={{ width: containerWidth }}
    >
      {/* Floating elements */}
      <div className="absolute -z-10 top-20 right-10 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                  bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute -z-10 bottom-20 left-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-8
                  bg-[--secondary-teal-light] animate-float-medium hidden dark:hidden"></div>
      
      {/* Floating elements - dark mode versions */}
      <div className="absolute -z-10 top-20 right-10 w-24 h-24 rounded-[40%] rotate-12 opacity-10 
                  bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                  animate-float-slow hidden dark:block"></div>
      <div className="absolute -z-10 bottom-20 left-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-15
                  bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                  animate-float-medium hidden dark:block"></div>

      {/* Card with proper styling for BOTH modes */}
      <div className={`relative z-10 
                 ${getBackgroundClass()}
                 rounded-[--border-radius-lg] p-6 md:p-8
                 ${cardStyle === 'elevated' ? 'shadow-theme-lg' : cardStyle === 'minimal' ? 'shadow-theme-sm' : 'shadow-theme-card'}
                 ${cardStyle !== 'borderless' ? 'border border-[var(--theme-border-light)]' : ''}
                 transition-all duration-[--transition-bounce]`}>
        {/* Header section */}
        <div className="mb-6 text-center">
          {subtitle && (
            <div className="text-theme-secondary text-sm mb-2 uppercase tracking-wide font-medium">
              {subtitle}
            </div>
          )}
          {title && (
            <h2 className="text-theme-primary text-2xl md:text-3xl font-bold mb-4">
              {title}
            </h2>
          )}
        </div>

        {/* Calendly widget */}
        <div 
          ref={calendarRef} 
          className="calendly-inline-widget rounded-[--border-radius-md] overflow-hidden w-full" 
          data-url={buildCalendlyUrl()}
          style={{ minWidth: "100%", width: "100%", height: height }}
        />
      </div>
    </div>
  );
};

export default CalendlyInlineWidget;