import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckCircle, ArrowRightCircle, Zap } from 'lucide-react';

/**
 * VSExampleComponent - Demonstrates the proper Tailwind v4 styling patterns
 * for light and dark mode following the VS brand guidelines.
 */
const VSExampleComponent = () => {
  const containerRef = useRef(null);
  
  // Professional animation implementation with GSAP
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate the card entries
      gsap.fromTo(
        ".example-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "back.out(1.2)",
        }
      );
      
      // Animate the heading
      gsap.fromTo(
        ".example-heading",
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.5,
        }
      );
    }, containerRef);
    
    // Proper cleanup
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={containerRef}
      className="bg-theme-gradient py-24 relative overflow-hidden"
    >
      {/* Theme-aware floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 
                     opacity-[var(--theme-float-opacity)]
                     bg-[var(--theme-float-bg-primary)]
                     animate-float-slow"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 
                     opacity-[var(--theme-float-opacity-secondary)]
                     bg-[var(--theme-float-bg-secondary)]
                     animate-float-medium"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="bg-[var(--theme-bg-secondary)]/10 
                       border border-[var(--theme-border-primary)] mb-4 py-2 px-4 
                       inline-block rounded-full">
            <span className="text-theme-primary">
              Example Component
            </span>
          </div>
          
          <h2 className="text-theme-primary text-4xl md:text-5xl 
                       font-bold mb-6 example-heading">
            Tailwind v4 Styling Example
          </h2>
          
          <p className="text-theme-secondary text-xl mb-2 max-w-3xl mx-auto">
            This example demonstrates proper implementation of VS styling using Tailwind v4 patterns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="example-card relative bg-theme-gradient-card
                        rounded-lg p-6 
                        border border-theme-border-light
                        shadow-theme-md
                        hover-bubbly">
            <div className="w-12 h-12 rounded-full bg-theme-gradient-primary
                         flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-theme-primary text-xl font-medium mb-2">
              Direct Variable References
            </h3>
            
            <p className="text-theme-secondary mb-4">
              Tailwind v4 allows direct CSS variable references with the format 
              <code className="text-[var(--theme-accent-tertiary)] mx-1 px-1 bg-[var(--theme-bg-secondary)]/10 rounded">
                text-[var(--theme-var-name)]
              </code>
            </p>
            
            <button className="bg-theme-gradient-primary
                             text-white px-4 py-2 rounded-full
                             shadow-theme-sm
                             transition-all duration-[var(--theme-transition-bounce)]
                             hover-bubbly-sm">
              Learn More
            </button>
          </div>
          
          {/* Card 2 */}
          <div className="example-card relative bg-theme-gradient-card
                        rounded-lg p-6 
                        border border-theme-border-light
                        shadow-theme-md
                        hover-bubbly">
            <div className="w-12 h-12 rounded-full bg-theme-gradient-secondary
                         flex items-center justify-center mb-4">
              <ArrowRightCircle className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-theme-primary text-xl font-medium mb-2">
              Helper Utilities
            </h3>
            
            <p className="text-theme-secondary mb-4">
              Use utility classes like 
              <code className="text-[var(--theme-accent-tertiary)] mx-1 px-1 bg-[var(--theme-bg-secondary)]/10 rounded">
                hover-bubbly
              </code>
              to implement VS animation patterns easily.
            </p>
            
            <button className="bg-theme-gradient-secondary
                             text-white px-4 py-2 rounded-full
                             shadow-theme-sm
                             transition-all duration-[var(--theme-transition-bounce)]
                             hover-bubbly-sm">
              Explore Utilities
            </button>
          </div>
          
          {/* Card 3 */}
          <div className="example-card relative bg-theme-gradient-card
                        rounded-lg p-6 
                        border border-theme-border-light
                        shadow-theme-md
                        hover-bubbly">
            <div className="w-12 h-12 rounded-full bg-theme-gradient-accent
                         flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-theme-primary text-xl font-medium mb-2">
              Professional Animation
            </h3>
            
            <p className="text-theme-secondary mb-4">
              Always use useGSAP with proper context for animations, ensuring correct component lifecycle management.
            </p>
            
            <button className="bg-theme-gradient-accent
                             text-white px-4 py-2 rounded-full
                             shadow-theme-sm
                             transition-all duration-[var(--theme-transition-bounce)]
                             hover-bubbly-sm">
              See Animation Guide
            </button>
          </div>
        </div>
        
        {/* Additional feature table */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-theme-primary text-2xl font-medium mb-6 text-center">
            Key Implementation Features
          </h3>
          
          <div className="overflow-hidden rounded-lg 
                        shadow-theme-md">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--theme-accent-secondary)]/5 border-b border-theme-border-light">
                  <th className="p-4 text-left text-theme-primary">Feature</th>
                  <th className="p-4 text-left text-theme-primary">Old Approach</th>
                  <th className="p-4 text-left text-theme-primary">New Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-theme-border-light">
                  <td className="p-4 text-theme-primary">Text Colors</td>
                  <td className="p-4 text-theme-secondary">
                    <code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">
                      style=&#123;&#123; color: 'var(--theme-text-primary)' &#125;&#125;
                    </code>
                  </td>
                  <td className="p-4 text-theme-secondary">
                    <code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">
                      className="text-[var(--theme-text-primary)]"
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-theme-border-light">
                  <td className="p-4 text-theme-primary">Backgrounds</td>
                  <td className="p-4 text-theme-secondary">
                    <code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">
                      className="bg-[var(--theme-bg-primary)]"
                    </code>
                  </td>
                  <td className="p-4 text-theme-secondary">
                    <code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">
                      className="bg-theme-primary"
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-theme-primary">Transitions</td>
                  <td className="p-4 text-theme-secondary">
                    <code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">
                      duration-[350ms] ease-cubic...
                    </code>
                  </td>
                  <td className="p-4 text-theme-secondary">
                    <code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">
                      duration-[var(--theme-transition-bounce)]
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pro tip */}
        <div className="mt-12 bg-theme-gradient-accent
                     text-white p-6 rounded-lg
                     shadow-theme-md
                     max-w-4xl mx-auto">
          <div className="flex">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-[var(--theme-accent-tertiary)] font-bold">!</span>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-2">Pro Tip</h4>
              <p className="text-white/90">
                Always test your components in both light and dark mode. The most common issue is 
                forgetting to provide theme-aware variables or using competing light/dark mode styles
                instead of a single source of truth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VSExampleComponent;