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
      className="bg-gradient-to-br from-white to-[--bg-cream]/80 
                dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] 
                py-24 relative overflow-hidden"
    >
      {/* Light mode floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                     bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 opacity-8
                     bg-[--secondary-teal-light] animate-float-medium hidden dark:hidden"></div>
      
      {/* Dark mode floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 opacity-10 
                     bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                     animate-float-slow hidden dark:block"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-[30%] -rotate-6 opacity-15
                     bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                     animate-float-medium hidden dark:block"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="bg-[--bg-cream-darker] dark:bg-[--text-cream]/5 
                       border border-[--primary-orange]/30 mb-4 py-2 px-4 
                       inline-block rounded-full">
            <span className="text-[--primary-orange] dark:text-white">
              Example Component
            </span>
          </div>
          
          <h2 className="text-[--text-navy] dark:text-white text-4xl md:text-5xl 
                       font-bold mb-6 example-heading">
            Tailwind v4 Styling Example
          </h2>
          
          <p className="text-[--text-navy] dark:text-white/70 text-xl mb-2 max-w-3xl mx-auto">
            This example demonstrates proper implementation of VS styling using Tailwind v4 patterns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="example-card relative bg-gradient-to-br from-white to-[--bg-cream]/80
                        dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                        rounded-[--border-radius-lg] p-6 
                        border border-white/40 dark:border-white/5
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                        hover-bubbly">
            <div className="w-12 h-12 rounded-full bg-[--primary-orange]
                         dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                         flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-2">
              Direct Variable References
            </h3>
            
            <p className="text-[--text-navy] dark:text-white/70 mb-4">
              Tailwind v4 allows direct CSS variable references with the format 
              <code className="text-[--accent-coral] dark:text-[--accent-coral] mx-1 px-1 bg-black/5 dark:bg-white/10 rounded">
                text-[--var-name]
              </code>
            </p>
            
            <button className="bg-[--primary-orange] hover:bg-[--primary-orange-hover]
                             dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover]
                             text-white px-4 py-2 rounded-full
                             shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                             dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
                             transition-all duration-[--transition-bounce]
                             hover:translate-y-[-3px] hover:scale-[1.03]">
              Learn More
            </button>
          </div>
          
          {/* Card 2 */}
          <div className="example-card relative bg-gradient-to-br from-white to-[--bg-cream]/80
                        dark:bg-gradient-to-br dark:from-[--card-bg-navy] dark:to-[rgba(12,67,99,0.8)]
                        rounded-[--border-radius-lg] p-6 
                        border border-white/40 dark:border-white/5
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                        hover-bubbly">
            <div className="w-12 h-12 rounded-full bg-[--secondary-teal]
                         dark:bg-gradient-to-r dark:from-[--secondary-teal] dark:to-[--secondary-teal-hover]
                         flex items-center justify-center mb-4">
              <ArrowRightCircle className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-2">
              Helper Utilities
            </h3>
            
            <p className="text-[--text-navy] dark:text-white/70 mb-4">
              Use utility classes like 
              <code className="text-[--accent-coral] dark:text-[--accent-coral] mx-1 px-1 bg-black/5 dark:bg-white/10 rounded">
                hover-bubbly
              </code>
              to implement VS animation patterns easily.
            </p>
            
            <button className="bg-[--secondary-teal] hover:bg-[--secondary-teal-hover]
                             dark:bg-gradient-to-r dark:from-[--secondary-teal] dark:to-[--secondary-teal-hover]
                             text-white px-4 py-2 rounded-full
                             shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                             dark:shadow-[0_0_8px_rgba(53,115,128,0.15)]
                             transition-all duration-[--transition-bounce]
                             hover:translate-y-[-3px] hover:scale-[1.03]">
              Explore Utilities
            </button>
          </div>
          
          {/* Card 3 */}
          <div className="example-card relative bg-gradient-to-br from-white to-[--bg-cream]/80
                        dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]
                        rounded-[--border-radius-lg] p-6 
                        border border-white/40 dark:border-white/5
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]
                        hover-bubbly">
            <div className="w-12 h-12 rounded-full bg-[--accent-coral]
                         dark:bg-gradient-to-r dark:from-[--accent-coral] dark:to-[--accent-red]
                         flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-[--text-navy] dark:text-white text-xl font-medium mb-2">
              Professional Animation
            </h3>
            
            <p className="text-[--text-navy] dark:text-white/70 mb-4">
              Always use useGSAP with proper context for animations, ensuring correct component lifecycle management.
            </p>
            
            <button className="bg-gradient-to-r from-[--accent-coral] to-[--accent-red]
                             dark:bg-gradient-to-r dark:from-[--accent-coral] dark:to-[--accent-red]
                             text-white px-4 py-2 rounded-full
                             shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                             dark:shadow-[0_0_8px_rgba(222,107,89,0.2)]
                             transition-all duration-[--transition-bounce]
                             hover:translate-y-[-3px] hover:scale-[1.03]">
              See Animation Guide
            </button>
          </div>
        </div>
        
        {/* Additional feature table */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-[--text-navy] dark:text-white text-2xl font-medium mb-6 text-center">
            Key Implementation Features
          </h3>
          
          <div className="overflow-hidden rounded-[--border-radius-lg] 
                        shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                        dark:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
            <table className="w-full">
              <thead>
                <tr className="bg-[--secondary-teal]/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                  <th className="p-4 text-left text-[--text-navy] dark:text-white">Feature</th>
                  <th className="p-4 text-left text-[--text-navy] dark:text-white">Old Approach</th>
                  <th className="p-4 text-left text-[--text-navy] dark:text-white">New Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5 dark:border-white/5">
                  <td className="p-4 text-[--text-navy] dark:text-white">Text Colors</td>
                  <td className="p-4 text-[--text-navy] dark:text-white/70">
                    <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-sm">
                      style=&#123;&#123; color: 'var(--text-navy)' &#125;&#125;
                    </code>
                  </td>
                  <td className="p-4 text-[--text-navy] dark:text-white/70">
                    <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-sm">
                      className="text-[--text-navy]"
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-black/5 dark:border-white/5">
                  <td className="p-4 text-[--text-navy] dark:text-white">Backgrounds</td>
                  <td className="p-4 text-[--text-navy] dark:text-white/70">
                    <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-sm">
                      className="bg-[var(--bg-cream)]"
                    </code>
                  </td>
                  <td className="p-4 text-[--text-navy] dark:text-white/70">
                    <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-sm">
                      className="bg-[--bg-cream]"
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-[--text-navy] dark:text-white">Transitions</td>
                  <td className="p-4 text-[--text-navy] dark:text-white/70">
                    <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-sm">
                      duration-[350ms] ease-cubic...
                    </code>
                  </td>
                  <td className="p-4 text-[--text-navy] dark:text-white/70">
                    <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-sm">
                      duration-[--transition-bounce]
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pro tip */}
        <div className="mt-12 bg-[--accent-coral] dark:bg-gradient-to-r dark:from-[--accent-coral] dark:to-[--accent-red]
                     text-white p-6 rounded-[--border-radius-lg] 
                     shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                     dark:shadow-[0_0_15px_rgba(222,107,89,0.15)]
                     max-w-4xl mx-auto">
          <div className="flex">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-[--accent-coral] font-bold">!</span>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-2">Pro Tip</h4>
              <p className="text-white/90">
                Always test your components in both light and dark mode. The most common issue is 
                forgetting to provide dark mode styles or using the old var() wrapper pattern 
                which doesn't work correctly with Tailwind v4.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VSExampleComponent;