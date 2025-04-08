import React, { useState } from 'react';
import { ModuleHUD } from './ModuleHUD';
import { Tab } from '@headlessui/react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Define different styling variants
interface StyleVariant {
  id: string;
  name: string;
  description: string;
  customStyles?: React.CSSProperties;
  customClasses?: string;
}

const styleVariants: StyleVariant[] = [
  {
    id: 'default',
    name: 'Default Style',
    description: 'The current implementation with theme-aware styling',
    customStyles: {},
    customClasses: ''
  },
  {
    id: 'enhanced-floating',
    name: 'Enhanced Floating Elements',
    description: 'More pronounced floating elements with additional animation effects',
    customStyles: {},
    customClasses: 'enhanced-floating'
  },
  {
    id: 'rich-gradients',
    name: 'Rich Gradients',
    description: 'Enhanced gradient backgrounds for sections with more vibrant colors',
    customStyles: {},
    customClasses: 'rich-gradients'
  },
  {
    id: 'elevated-glow',
    name: 'Elevated Glow Effects',
    description: 'Add subtle glow effects to elements for more depth and visual interest',
    customStyles: {},
    customClasses: 'elevated-glow'
  },
  {
    id: 'subtle-patterns',
    name: 'Subtle Background Patterns',
    description: 'Add light grid or dot patterns to background for texture',
    customStyles: {},
    customClasses: 'subtle-patterns'
  }
];

const ModuleHUDShowcase: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('default');
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle module click
  const handleModuleClick = (moduleId: string) => {
    setSelectedSection(moduleId === selectedSection ? null : moduleId);
  };

  // Find the current style variant
  const currentVariant = styleVariants.find(variant => variant.id === selectedVariant) || styleVariants[0];

  // GSAP animations for tab transitions and scroll-triggered animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animation for tab panels
      gsap.fromTo('.tab-panel-content', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );
      
      // Set up Intersection Observer for scroll-triggered animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Run the animation sequence when the component enters the viewport
            const target = entry.target;
            
            // Animation sequence disabled - handled in ModuleHUD component
            // We'll only animate floating elements in container
            
            // Animation for floating elements
            gsap.from(target.querySelectorAll(".course-float-element"), {
              y: 30,
              opacity: 0,
              stagger: 0.2,
              delay: 0.6,
              duration: 0.8,
              ease: "power2.out"
            });
            
            // Stop observing after animation is triggered
            observer.unobserve(target);
          }
        });
      }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -100px 0px" // Adjust based on when you want the animation to trigger
      });
      
      // Observe the ModuleHUD container
      const hudComponents = document.querySelectorAll(".module-hud-container");
      hudComponents.forEach(component => {
        observer.observe(component);
      });
      
      return () => {
        // Clean up observer when component unmounts
        hudComponents.forEach(component => {
          observer.unobserve(component);
        });
      };
    }, containerRef);
    
    return () => ctx.revert();
  }, [selectedVariant]);

  return (
    <div ref={containerRef} className="min-h-screen bg-theme-gradient">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-theme-primary mb-2 text-center">
            Module HUD Showcase
          </h1>
          <p className="text-center text-theme-secondary mb-8">
            Explore different styling variations for the ModuleHUD component
          </p>

          {/* Style Variant Selection Tabs */}
          <div className="mb-12">
            <Tab.Group onChange={(index) => setSelectedVariant(styleVariants[index].id)}>
              <Tab.List className="flex p-1 space-x-1 bg-theme-bg-secondary/10 backdrop-blur-sm rounded-xl shadow-theme-sm mb-4">
                {styleVariants.map((variant) => (
                  <Tab
                    key={variant.id}
                    className={({ selected }) =>
                      `flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300
                      ${selected 
                        ? 'bg-theme-gradient-primary text-white shadow-theme-sm' 
                        : 'text-theme-secondary hover:bg-theme-bg-secondary/20'}`
                    }
                  >
                    {variant.name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {styleVariants.map((variant) => (
                  <Tab.Panel key={variant.id} className="tab-panel-content">
                    <div className="p-5 bg-theme-bg-secondary/10 rounded-xl shadow-theme-sm backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-theme-primary mb-2">
                        {variant.name}
                      </h3>
                      <p className="text-theme-secondary mb-4">
                        {variant.description}
                      </p>
                      
                      {/* Custom styling notes based on variant */}
                      <div className="bg-theme-bg-secondary/20 p-4 rounded-lg mb-6">
                        <h4 className="text-sm font-semibold text-theme-primary mb-2">
                          Implementation Notes:
                        </h4>
                        <ul className="text-sm text-theme-secondary space-y-1 list-disc pl-4">
                          {variant.id === 'enhanced-floating' && (
                            <>
                              <li>Added more floating elements with varied sizes and colors</li>
                              <li>Enhanced animation paths with subtle rotation</li>
                              <li>Increased opacity for more visual presence</li>
                            </>
                          )}
                          {variant.id === 'rich-gradients' && (
                            <>
                              <li>Applied richer gradient backgrounds to each section</li>
                              <li>Added subtle color transitions on hover</li>
                              <li>Enhanced contrast between light and dark mode gradients</li>
                            </>
                          )}
                          {variant.id === 'elevated-glow' && (
                            <>
                              <li>Added subtle glow effects to interactive elements</li>
                              <li>Enhanced shadows with color tinting</li>
                              <li>Added pulsing animation to indicators</li>
                            </>
                          )}
                          {variant.id === 'subtle-patterns' && (
                            <>
                              <li>Applied subtle grid pattern to background</li>
                              <li>Added dot patterns with low opacity</li>
                              <li>Enhanced texture contrast in dark mode</li>
                            </>
                          )}
                          {variant.id === 'default' && (
                            <>
                              <li>Current implementation with theme-aware styling</li>
                              <li>Uses CSS variables for consistent theming</li>
                              <li>Balanced visual elements for clean interface</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>

          {/* ModuleHUD Component with Selected Style Variant */}
          <div 
            className={`module-hud-container relative bg-theme-bg-secondary/5 p-8 rounded-2xl shadow-theme-md ${currentVariant.customClasses}`}
            style={currentVariant.customStyles}
          >
            {/* Theme-aware floating elements for background decoration */}
            <div className="absolute -z-10 top-[5%] left-[8%] w-[10%] h-[10%] rounded-[40%] rotate-12 
                 opacity-[var(--theme-float-opacity)] 
                 bg-[var(--theme-float-bg-primary)]
                 animate-float-slow"></div>
                 
            <div className="absolute -z-10 bottom-[10%] right-[5%] w-[12%] h-[12%] rounded-[30%] -rotate-6 
                 opacity-[var(--theme-float-opacity-secondary)] 
                 bg-[var(--theme-float-bg-secondary)]
                 animate-float-medium"></div>
            
            {/* Enhanced floating elements for rich-gradients variant */}
            {currentVariant.id === 'rich-gradients' && (
              <>
                <div className="absolute -z-10 top-[15%] right-[15%] w-[15%] h-[15%] rounded-[35%] rotate-45 
                     opacity-30 bg-gradient-to-br from-[var(--theme-accent)] to-[var(--theme-accent-secondary)]
                     animate-float-slow"></div>
                <div className="absolute -z-10 bottom-[20%] left-[20%] w-[18%] h-[18%] rounded-[40%] -rotate-12 
                     opacity-25 bg-gradient-to-tr from-[var(--theme-primary)] to-[var(--theme-accent)]
                     animate-float-medium"></div>
              </>
            )}
            
            {/* Enhanced floating elements for enhanced-floating variant */}
            {currentVariant.id === 'enhanced-floating' && (
              <>
                <div className="absolute -z-10 top-[30%] left-[15%] w-[8%] h-[8%] rounded-full rotate-0 
                     opacity-40 bg-[var(--theme-accent)]
                     animate-float-fast"></div>
                <div className="absolute -z-10 top-[50%] right-[20%] w-[5%] h-[5%] rounded-full rotate-0 
                     opacity-30 bg-[var(--theme-primary)]
                     animate-float-medium"></div>
                <div className="absolute -z-10 bottom-[15%] left-[40%] w-[6%] h-[6%] rounded-full rotate-0 
                     opacity-35 bg-[var(--theme-accent-secondary)]
                     animate-float-slow"></div>
              </>
            )}
            
            {/* Glow elements for elevated-glow variant */}
            {currentVariant.id === 'elevated-glow' && (
              <>
                <div className="absolute -z-10 top-[20%] left-[20%] w-[30%] h-[30%] rounded-full 
                     opacity-20 bg-transparent
                     shadow-[0_0_100px_60px_var(--theme-accent-secondary)]"></div>
                <div className="absolute -z-10 bottom-[10%] right-[25%] w-[25%] h-[25%] rounded-full 
                     opacity-15 bg-transparent
                     shadow-[0_0_80px_50px_var(--theme-primary)]"></div>
              </>
            )}
            
            {/* Pattern background for subtle-patterns variant */}
            {currentVariant.id === 'subtle-patterns' && (
              <div className="absolute inset-0 -z-20 opacity-[0.1]" 
                   style={{
                     backgroundImage: 'radial-gradient(circle, var(--theme-text-secondary) 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }}>
              </div>
            )}

            {/* ModuleHUD component */}
            <ModuleHUD 
              selectedSection={selectedSection}
              onModuleClick={handleModuleClick}
            />
          </div>

          {/* CSS for styling variants */}
          <style>{`
            /* Enhanced Floating Elements */
            .enhanced-floating .module-item {
              transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .enhanced-floating .module-item:hover {
              transform: translateY(-6px) scale(1.03);
              box-shadow: var(--theme-shadow-lg);
            }
            
            /* Rich Gradients */
            .rich-gradients .section-module {
              background: linear-gradient(135deg, var(--theme-primary), var(--theme-accent));
            }
            .rich-gradients .section-module:nth-child(2n) {
              background: linear-gradient(135deg, var(--theme-accent), var(--theme-accent-secondary));
            }
            .rich-gradients .section-module:nth-child(3n) {
              background: linear-gradient(135deg, var(--theme-accent-secondary), var(--theme-primary));
            }
            
            /* Elevated Glow */
            .elevated-glow .section-module {
              box-shadow: 0 4px 20px rgba(var(--theme-primary-rgb), 0.15);
            }
            .elevated-glow .section-module:hover {
              box-shadow: 0 8px 30px rgba(var(--theme-accent-rgb), 0.25);
            }
            
            /* Subtle Patterns */
            .subtle-patterns .section-module {
              background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
              background-size: 20px 20px;
            }
            
            /* Animation utilities */
            @keyframes float-fast {
              0%, 100% { transform: translateY(0) rotate(0); }
              50% { transform: translateY(-10px) rotate(5deg); }
            }
            .animate-float-fast {
              animation: float-fast 3s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ModuleHUDShowcase;