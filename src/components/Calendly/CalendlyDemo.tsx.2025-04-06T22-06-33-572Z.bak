import React from 'react';
import { CalendlyInlineWidget, CalendlyPopupWidget } from './index';
import { Button } from '../ui/button';

/**
 * Demonstration component that showcases both Calendly implementations
 * 
 * This component shows the popup widget button and how it can be used,
 * as well as a section showcasing the inline widget integration.
 */
const CalendlyDemo: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      {/* Hero section with call to action */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[radial-gradient(rgba(18,46,59,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>
        
        {/* Floating elements using helper classes */}
        <div className="absolute -z-10 top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
                     bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
        <div className="absolute -z-10 bottom-10 right-5 w-24 h-24 rounded-[30%] -rotate-6 opacity-8
                     bg-[--secondary-teal-light] animate-float-medium hidden dark:hidden"></div>
        
        {/* Dark mode floating elements */}
        <div className="absolute -z-10 top-20 left-5 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
                     bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                     animate-float-slow hidden dark:block"></div>
        <div className="absolute -z-10 bottom-10 right-5 w-24 h-24 rounded-[30%] -rotate-6 opacity-15
                     bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                     animate-float-medium hidden dark:block"></div>
                     
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] font-medium mb-3 uppercase tracking-wide text-sm">
              Book a consultation
            </div>
            
            <h1 className="text-[var(--theme-text-primary)] dark:text-white text-4xl md:text-5xl font-bold mb-6">
              Ready to accelerate your journey?
            </h1>
            
            <p className="text-[var(--theme-text-secondary)] dark:text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Schedule a personalized discovery call to discuss your goals and how we can help you achieve them faster with our proven strategies.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Calendly Popup Widget Button */}
              <CalendlyPopupWidget 
                text="Schedule a Free Call" 
                variant="vibrant"
                size="lg"
                hideGdprBanner={true}
              />
              
              {/* Regular button for contrast */}
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popup widget variations section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-8 text-center">
              Popup Widget Variations
            </h2>
            
            <div className="bg-gradient-to-br from-white to-[--bg-cream]/80
                     dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                     rounded-[--border-radius-lg] p-8
                     shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
                     dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
              
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">
                Button Variants
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Default" variant="default" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Default</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Secondary" variant="secondary" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Secondary</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Vibrant" variant="vibrant" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Vibrant</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Outline" variant="outline" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Outline</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Subtle" variant="subtle" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Subtle</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Destructive" variant="destructive" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Destructive</span>
                </div>
              </div>
              
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">
                Button Sizes
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="XS" variant="default" size="xs" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Extra Small</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Small" variant="default" size="sm" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Small</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Default" variant="default" size="default" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Default</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Large" variant="default" size="lg" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Large</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget text="Extra Large" variant="default" size="xl" className="mb-2" />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Extra Large</span>
                </div>
              </div>
              
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">
                Icon Positions
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget 
                    text="With Icon (Start)" 
                    variant="vibrant" 
                    size="default" 
                    iconPosition="start" 
                    showIcon={true} 
                    className="mb-2"
                  />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Icon at Start</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget 
                    text="No Icon" 
                    variant="vibrant" 
                    size="default" 
                    showIcon={false} 
                    className="mb-2"
                  />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">No Icon</span>
                </div>
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget 
                    text="With Icon (End)" 
                    variant="vibrant" 
                    size="default" 
                    iconPosition="end" 
                    showIcon={true} 
                    className="mb-2"
                  />
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Icon at End</span>
                </div>
              </div>
              
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">
                Custom Elements as Triggers
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget className="mb-2">
                    <div className="cursor-pointer flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] text-white rounded-lg hover:shadow-lg transition-shadow">
                      <span>Custom Button</span>
                    </div>
                  </CalendlyPopupWidget>
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Custom Button</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget className="mb-2">
                    <div className="cursor-pointer flex flex-col items-center bg-white dark:bg-[--bg-navy] p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                      <CalendarIcon className="w-8 h-8 text-[--primary-orange] mb-2" />
                      <span className="text-[var(--theme-text-primary)] dark:text-white font-medium">Book Appointment</span>
                    </div>
                  </CalendlyPopupWidget>
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Card Trigger</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <CalendlyPopupWidget className="mb-2">
                    <span className="cursor-pointer text-[--primary-orange] dark:text-[--primary-orange-light] underline hover:text-[--primary-orange-hover] dark:hover:text-[--primary-orange]">
                      Schedule your call here
                    </span>
                  </CalendlyPopupWidget>
                  <span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Text Link</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Inline widget variations */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-8 text-center">
            Inline Widget Variations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* First variation - Default styling */}
            <div>
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">
                Default Styling
              </h3>
              <CalendlyInlineWidget 
                title="Book Your Discovery Call"
                subtitle="Default gradient background with standard shadows"
                height={700}
                containerWidth="100%"
                backgroundStyle="gradient"
                cardStyle="default"
                minWidth={800}
              />
            </div>
            
            {/* Second variation - Elevated card */}
            <div>
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">
                Elevated Card Style
              </h3>
              <CalendlyInlineWidget 
                title="Elevated Calendar Widget"
                subtitle="Enhanced shadows and border effects"
                height={700}
                containerWidth="100%"
                backgroundStyle="gradient"
                cardStyle="elevated"
                primaryColor="FEA35D" // Orange VS primary color (without #)
                minWidth={800}
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Third variation - Pattern background */}
            <div>
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">
                Pattern Background
              </h3>
              <CalendlyInlineWidget 
                title="Pattern Background"
                subtitle="Subtle dot pattern with minimal card style"
                height={700}
                containerWidth="100%"
                backgroundStyle="pattern"
                cardStyle="minimal"
                hideGdprBanner={true}
                minWidth={800}
              />
            </div>
            
            {/* Fourth variation - Borderless */}
            <div>
              <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">
                Borderless Style
              </h3>
              <CalendlyInlineWidget 
                title="Borderless Calendar"
                subtitle="Clean design with no shadows or borders"
                height={700}
                containerWidth="100%"
                backgroundStyle="solid"
                cardStyle="borderless"
                primaryColor="DE6B59" // Coral accent color (without #)
                minWidth={800}
              />
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4 text-center">
              Full-Width Calendar
            </h3>
            <CalendlyInlineWidget 
              title="Full Featured Calendar"
              subtitle="The complete booking experience"
              height={750}
              containerWidth="100%"
              backgroundStyle="gradient"
              cardStyle="elevated"
              hideGdprBanner={true}
              primaryColor="357380" // VS teal color (without #)
              minWidth={1000}
            />
          </div>
        </div>
      </section>
      
      {/* Feature breakdown section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-[--bg-cream]/90
                dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-4">
                Complete Feature Breakdown
              </h2>
              <p className="text-[var(--theme-text-secondary)] dark:text-white/70">
                Both components offer extensive customization options to match your site's design.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Popup widget features */}
              <div className="bg-white/80 dark:bg-[--bg-navy]/60
                       backdrop-blur-sm
                       rounded-[--border-radius-lg] p-6
                       shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
                       dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                       border border-white/50 dark:border-white/5">
                <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[--primary-orange]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Popup Widget Features
                </h3>
                <ul className="text-[var(--theme-text-secondary)] dark:text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>All VS design system button variants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Multiple size options (xs to xl)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Optional calendar icon with position control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Widget position customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Custom color theming support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Custom element support (any JSX as trigger)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Dark/light mode compatible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Branding toggle options</span>
                  </li>
                </ul>
              </div>
              
              {/* Inline widget features */}
              <div className="bg-white/80 dark:bg-[--bg-navy]/60
                       backdrop-blur-sm
                       rounded-[--border-radius-lg] p-6
                       shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
                       dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                       border border-white/50 dark:border-white/5">
                <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[--primary-orange]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Inline Widget Features
                </h3>
                <ul className="text-[var(--theme-text-secondary)] dark:text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Four background style options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Four card style variations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Custom width and height control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Customizable title and subtitle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Theme-aware styling with floating elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Controls for GDPR banner and event details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Primary color customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />
                    <span>Responsive design for all screen sizes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Implementation notes */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl font-bold mb-4">
                Implementation Notes
              </h2>
              <p className="text-[var(--theme-text-secondary)] dark:text-white/70">
                How to use these components in your site
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-[--bg-cream]/80
                     dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                     rounded-[--border-radius-lg] p-6 md:p-8
                     shadow-[2px_2px_8px_rgba(0,0,0,0.05)]
                     dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
              
              <div className="prose dark:prose-invert max-w-none">
                <h3>Popup Widget Usage</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {`import { CalendlyPopupWidget } from './components/Calendly';

// In your component
<CalendlyPopupWidget 
  text="Book a Call" 
  variant="vibrant" 
  size="lg" 
  showIcon={true}
/>`}
                </pre>
                
                <h3 className="mt-6">Inline Widget Usage</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {`import { CalendlyInlineWidget } from './components/Calendly';

// In your contact section
<section className="py-16">
  <div className="container mx-auto">
    <CalendlyInlineWidget 
      title="Schedule Your Discovery Call"
      subtitle="Find a time that works for you"
      height={700}
      containerWidth="100%"
      backgroundStyle="gradient"
      cardStyle="elevated"
      primaryColor="FEA35D" // Without the #
      minWidth={900} // Ensures two-column layout
      hideGdprBanner={true} // Optional: hide GDPR banner
    />
  </div>
</section>`}
                </pre>
                
                <h3 className="mt-6">Custom Styling Options</h3>
                <p>
                  Both components support extensive customization to match your site's design. The popup widget integrates with VS design system button variants, while the inline widget offers background and card styling options.
                </p>
                
                <h3 className="mt-6">Calendly Configuration</h3>
                <p>
                  The integration supports all Calendly features including:
                </p>
                <ul>
                  <li>Custom event types</li>
                  <li>GDPR banner hiding</li>
                  <li>Event details hiding</li>
                  <li>Custom colors for the booking interface</li>
                  <li>Custom positioning for popup widget</li>
                </ul>
                
                <p className="mt-6">
                  These components handle all necessary script loading and cleanup, ensuring proper integration with your React application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple check icon component
const CheckIcon = ({ className = "" }) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Simple calendar icon component for reuse
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

export default CalendlyDemo;