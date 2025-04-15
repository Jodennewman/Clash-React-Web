import React from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { VSSection } from '../ui/vs-background';
import { VSHeading, VSText } from '../ui/vs-text';
import { ArrowRight, TrendingUp } from 'lucide-react';

// Define the data structure for before/after examples
interface BeforeAfterExample {
  title: string;
  beforeViews: number;
  afterViews: number;
  beforeDate: string;
  afterDate: string;
  imageBefore?: string;
  imageAfter?: string;
}

interface BeforeAfterStatsProps {
  examples: BeforeAfterExample[];
  onCtaClick?: () => void;
}

// Format large numbers with comma separation
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const BeforeAfterStats: React.FC<BeforeAfterStatsProps> = ({ examples, onCtaClick }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // GSAP animations with theme-aware parameters
  useGSAP(() => {
    // Get computed theme variables
    const styles = getComputedStyle(document.documentElement);
    const distance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const duration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
    
    const ctx = gsap.context(() => {
      // Animate cards when they come into view
      gsap.fromTo('.before-after-card', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: parseFloat(duration),
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.before-after-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
      
      // Animate arrows when they come into view
      gsap.fromTo('.arrow-icon', {
        x: -10,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: parseFloat(duration),
        delay: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.before-after-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }, containerRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);

  return (
    <VSSection 
      ref={containerRef}
      lightBg="bg-theme-gradient"
      darkBg="dark:bg-theme-gradient"
      className="py-24 relative overflow-hidden"
    >
      {/* Theme-aware floating elements */}
      <div className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
                opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
      <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
                opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"></div>
      
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <VSHeading 
            variant="h2" 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary mb-6"
          >
            Still not convinced?
          </VSHeading>
          <VSText className="text-xl text-theme-secondary">
            This could be you.
          </VSText>
        </div>
        
        <div className="before-after-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <div 
              key={index} 
              className="before-after-card relative overflow-hidden rounded-xl shadow-theme-md bg-theme-surface p-6"
            >
              <div className="mb-6">
                <VSHeading variant="h3" className="text-xl font-bold text-theme-primary mb-2">
                  {example.title}
                </VSHeading>
              </div>
              
              <div className="flex flex-col space-y-8">
                {/* Before stats */}
                <div className="flex flex-col space-y-2">
                  <VSText className="text-sm uppercase tracking-wider text-theme-tertiary">
                    Before
                  </VSText>
                  <div className="flex items-center">
                    <div className="aspect-[4/3] bg-theme-bg-secondary/40 rounded-lg w-24 h-18 flex items-center justify-center">
                      {example.imageBefore ? (
                        <img 
                          src={example.imageBefore} 
                          alt={`Before: ${example.title}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <VSText className="text-xs text-theme-tertiary">No thumbnail</VSText>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center bg-theme-bg-secondary/30 px-3 py-1 rounded-full">
                        <VSText className="text-sm text-theme-secondary">
                          {formatNumber(example.beforeViews)} views
                        </VSText>
                      </div>
                      <VSText className="text-xs text-theme-tertiary mt-1">
                        {example.beforeDate}
                      </VSText>
                    </div>
                  </div>
                </div>
                
                {/* Arrow between */}
                <div className="flex justify-center arrow-icon">
                  <div className="bg-theme-accent/10 rounded-full p-2">
                    <ArrowRight className="h-5 w-5 text-theme-accent transform rotate-90" />
                  </div>
                </div>
                
                {/* After stats */}
                <div className="flex flex-col space-y-2">
                  <VSText className="text-sm uppercase tracking-wider font-semibold text-theme-accent">
                    After Vertical Shortcut
                  </VSText>
                  <div className="flex items-center">
                    <div className="aspect-[4/3] bg-theme-accent/10 rounded-lg w-24 h-18 flex items-center justify-center relative">
                      {example.imageAfter ? (
                        <img 
                          src={example.imageAfter} 
                          alt={`After: ${example.title}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <VSText className="text-xs text-theme-tertiary">No thumbnail</VSText>
                      )}
                      <div className="absolute bottom-1 right-1 bg-theme-accent/20 rounded-full p-1">
                        <TrendingUp className="h-3 w-3 text-theme-accent" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center bg-theme-accent/10 px-3 py-1 rounded-full">
                        <VSText className="text-sm font-bold text-theme-accent">
                          {formatNumber(example.afterViews)} views
                        </VSText>
                      </div>
                      <VSText className="text-xs text-theme-tertiary mt-1">
                        {example.afterDate}
                      </VSText>
                    </div>
                  </div>
                </div>
                
                {/* Growth percentage */}
                <div className="flex justify-center">
                  <div className="bg-theme-accent/10 px-4 py-2 rounded-full">
                    <VSText className="text-sm font-bold text-theme-accent flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {Math.round((example.afterViews / example.beforeViews - 1) * 100)}% Growth
                    </VSText>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional CTA button */}
        {onCtaClick && (
          <div className="flex justify-center mt-16">
            <button
              onClick={onCtaClick}
              className="bg-theme-gradient-primary text-white font-medium px-8 py-3 rounded-full shadow-theme-md hover-bubbly"
            >
              Get Your Plan Now
            </button>
          </div>
        )}
      </div>
    </VSSection>
  );
};

// Default examples in case none are provided
BeforeAfterStats.defaultProps = {
  examples: [
    {
      title: "Content Creator",
      beforeViews: 246,
      afterViews: 1200000,
      beforeDate: "Jan 2025",
      afterDate: "Mar 2025"
    },
    {
      title: "Business Coach",
      beforeViews: 532,
      afterViews: 4700000,
      beforeDate: "Dec 2024",
      afterDate: "Feb 2025"
    },
    {
      title: "Agency Founder",
      beforeViews: 189,
      afterViews: 867000,
      beforeDate: "Feb 2025",
      afterDate: "Apr 2025"
    }
  ]
};

export default BeforeAfterStats;