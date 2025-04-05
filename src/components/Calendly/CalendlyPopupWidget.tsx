import React, { useEffect } from 'react';
import { Button } from '../ui/button';

interface CalendlyPopupWidgetProps {
  /**
   * URL to your Calendly scheduling page
   */
  url?: string;
  /**
   * Text to display on the button
   */
  text?: string;
  /**
   * Button color - defaults to primary
   */
  color?: string;
  /**
   * Button text color
   */
  textColor?: string;
  /**
   * Shows Calendly branding
   */
  branding?: boolean;
  /**
   * Button variant from VS design system
   */
  variant?: 'default' | 'secondary' | 'vibrant' | 'outline' | 'subtle' | 'ghost' | 'destructive';
  /**
   * Button size from VS design system
   */
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'xs';
  /**
   * Widget primary color for embedded form (hex code without #)
   */
  primaryColor?: string;
  /**
   * Popup widget position
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  /**
   * Custom CSS classes for the button container
   */
  className?: string;
  /**
   * Hide GDPR banner
   */
  hideGdprBanner?: boolean;
  /**
   * Hide event type details
   */
  hideEventTypeDetails?: boolean;
  /**
   * Pass a React node to render as a button instead of the default
   */
  children?: React.ReactNode;
  /**
   * Show with icon
   */
  showIcon?: boolean;
  /**
   * Icon position (start or end of button)
   */
  iconPosition?: 'start' | 'end';
}

/**
 * Popup widget that displays a floating button that opens a Calendly scheduling popup
 * 
 * Customize the appearance with `variant` and `size` props using VS design system styles
 */
const CalendlyPopupWidget: React.FC<CalendlyPopupWidgetProps> = ({
  url = 'https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call',
  text = 'Schedule a Call',
  color = '#0069ff',
  textColor = '#ffffff',
  branding = true,
  variant = 'vibrant',
  size = 'lg',
  primaryColor = '',
  position = 'bottom-right',
  className = '',
  hideGdprBanner = false,
  hideEventTypeDetails = false,
  children,
  showIcon = true,
  iconPosition = 'start'
}) => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Create link for CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Initialize the widget when script is loaded
    script.onload = () => {
      if (window.Calendly) {
        // Only init the badge widget if we're not using a custom button
        if (!children) {
          window.Calendly.initBadgeWidget({
            url: buildCalendlyUrl(),
            text,
            color,
            textColor,
            branding,
            position
          });
        }
      }
    };

    // Cleanup function
    return () => {
      // Remove the widget
      const badge = document.querySelector('.calendly-badge-widget');
      if (badge) badge.remove();
      
      // Optionally remove the script and link
      if (script.parentNode) script.parentNode.removeChild(script);
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, [url, text, color, textColor, branding, position, hideGdprBanner, hideEventTypeDetails, children]);

  // Build URL with parameters
  const buildCalendlyUrl = () => {
    const baseUrl = url;
    const params = new URLSearchParams();
    
    if (hideGdprBanner) params.append('hide_gdpr_banner', '1');
    if (hideEventTypeDetails) params.append('hide_event_type_details', '1');
    if (primaryColor) params.append('primary_color', primaryColor.replace('#', ''));
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // This adds a button that can be placed anywhere in your layout
  // It will open the same Calendly popup as the floating button
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: buildCalendlyUrl(),
        text,
        color,
        textColor,
        branding
      });
      return false;
    }
  };

  // If children are provided, use them as the button content
  if (children) {
    return (
      <div className={`relative z-10 ${className}`} onClick={openCalendly}>
        {children}
      </div>
    );
  }

  // Render a standard button with optional icon
  return (
    <div className={`relative z-10 ${className}`}>
      <Button 
        variant={variant} 
        size={size} 
        onClick={openCalendly}
        className="hover-bubbly flex items-center gap-2"
      >
        {showIcon && iconPosition === 'start' && <CalendarIcon className="w-5 h-5" />}
        {text}
        {showIcon && iconPosition === 'end' && <CalendarIcon className="w-5 h-5" />}
      </Button>
    </div>
  );
};

// Simple calendar icon component
const CalendarIcon = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default CalendlyPopupWidget;

// Add TypeScript definition for the Calendly object
declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
        position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
      }) => void;
      initPopupWidget: (options: {
        url: string;
        text?: string;
        color?: string;
        textColor?: string;
        branding?: boolean;
        primaryColor?: string;
      }) => void;
    };
  }
}