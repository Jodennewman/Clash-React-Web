import React, { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from 'lucide-react';

interface AnalysisAnimationProps {
  onComplete: () => void;
}

const AnalysisAnimation: React.FC<AnalysisAnimationProps> = ({ onComplete }) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  useGSAP(() => {
    let timeout: NodeJS.Timeout;
    
    // GSAP animation sequence
    if (animationRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimationComplete(true);
            // Delay the completion callback to ensure loading bar is seen completing
            timeout = setTimeout(onComplete, 1500);
          }
        });
        
        // Animation for analysis steps
        tl.from(".analysis-step", {
          y: 20,
          opacity: 0,
          stagger: 0.5,
          duration: 0.4
        });
        
        // Progress bar animation - faster to ensure it completes
        tl.to(".progress-bar", {
          width: "100%",
          duration: 2.5,
          ease: "power1.inOut"
        }, 0);
        
        // Loading bar shimmer effect
        gsap.to(".progress-bar-shimmer", {
          x: "150%",
          repeat: -1,
          duration: 1.5,
          ease: "power1.inOut"
        });
        
        // Animate data connection lines
        gsap.fromTo(".data-line-1", 
          { width: 0 },
          { width: "300px", duration: 1.5, ease: "power2.out", delay: 0.3 }
        );
        gsap.fromTo(".data-line-2", 
          { width: 0 },
          { width: "250px", duration: 1.3, ease: "power2.out", delay: 0.8 }
        );
        gsap.fromTo(".data-line-3", 
          { width: 0 },
          { width: "200px", duration: 1.2, ease: "power2.out", delay: 1.3 }
        );
        gsap.fromTo(".data-line-4", 
          { width: 0 },
          { width: "280px", duration: 1.4, ease: "power2.out", delay: 1.8 }
        );
        
        // Particle/dot animations with more varied colors
        const createParticles = () => {
          // Array of theme-aware colors for particles
          const particleColors = [
            "bg-theme-primary/70",
            "bg-theme-accent-secondary/70",
            "bg-theme-accent-tertiary/70",
            "bg-vs-gradient-coral-orange/70",
            "bg-vs-gradient-primary-accent/70"
          ];
          
          for (let i = 0; i < 25; i++) {
            const dot = document.createElement("div");
            // Randomly select a color from the array
            const colorClass = particleColors[Math.floor(Math.random() * particleColors.length)];
            dot.className = `absolute w-${Math.random() > 0.7 ? '3' : '2'} h-${Math.random() > 0.7 ? '3' : '2'} rounded-full ${colorClass}`;
            
            // Random position
            dot.style.left = `${gsap.utils.random(10, 90)}%`;
            dot.style.top = `${gsap.utils.random(20, 80)}%`;
            
            animationRef.current?.appendChild(dot);
            
            // Animate dot
            gsap.to(dot, {
              y: gsap.utils.random(-70, 70),
              x: gsap.utils.random(-70, 70),
              opacity: 0,
              scale: gsap.utils.random(0, 0.8),
              duration: gsap.utils.random(1.2, 2.5),
              ease: "power2.out",
              onComplete: () => {
                if (dot.parentNode) {
                  dot.parentNode.removeChild(dot);
                }
              }
            });
          }
        };
        
        // Trigger particles multiple times
        const particleInterval = setInterval(createParticles, 500);
        
        return () => {
          clearInterval(particleInterval);
        };
      }, animationRef);
      
      return () => {
        ctx.revert();
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [onComplete]);
  
  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden bg-vs-gradient-navy-deep min-h-[320px] p-6" ref={animationRef}>
      {/* Colorful background gradient overlay */}
      <div className="absolute inset-0 bg-opacity-30 vs-gradient-coral-orange opacity-20"></div>
      
      {/* Tech pattern overlay */}
      <div className="absolute inset-0 dot-bg opacity-30"></div>
      
      {/* Technical circuit-like animation elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-theme-primary"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-theme-accent-secondary"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-theme-accent-tertiary"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-vs-gradient-coral-orange"></div>
        
        {/* Animated "data" connections */}
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[2px] bg-gradient-to-r from-theme-primary to-transparent data-line-1"></div>
        <div className="absolute top-1/3 right-1/4 w-[150px] h-[2px] bg-gradient-to-l from-theme-accent-secondary to-transparent data-line-2"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[120px] h-[2px] bg-gradient-to-r from-theme-accent-tertiary to-transparent data-line-3"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[180px] h-[2px] bg-gradient-to-l from-theme-primary to-transparent data-line-4"></div>
      </div>
      
      <div className="text-center z-10 max-w-md mx-auto bg-theme-bg-surface/10 p-5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
        <h3 className="text-xl font-bold vs-text-gradient-orange mb-4">Finding Your Perfect Solution</h3>
        
        <div className="space-y-3 mb-6">
          <div className="analysis-step flex items-center opacity-0 bg-theme-bg-surface/20 p-3 rounded-lg shadow-theme-sm backdrop-blur-sm border border-theme-primary/20">
            <div className="min-w-[28px] h-7 rounded-full bg-theme-primary/30 flex items-center justify-center mr-3">
              <Check className="h-4 w-4 text-theme-primary" />
            </div>
            <span className="text-white/90 text-base">Analyzing response patterns</span>
          </div>
          
          <div className="analysis-step flex items-center opacity-0 bg-theme-bg-surface/20 p-3 rounded-lg shadow-theme-sm backdrop-blur-sm border border-theme-accent-secondary/20">
            <div className="min-w-[28px] h-7 rounded-full bg-theme-accent-secondary/30 flex items-center justify-center mr-3">
              <Check className="h-4 w-4 text-theme-accent-secondary" />
            </div>
            <span className="text-white/90 text-base">Matching implementation frameworks</span>
          </div>
          
          <div className="analysis-step flex items-center opacity-0 bg-theme-bg-surface/20 p-3 rounded-lg shadow-theme-sm backdrop-blur-sm border border-theme-accent-tertiary/20">
            <div className="min-w-[28px] h-7 rounded-full bg-theme-accent-tertiary/30 flex items-center justify-center mr-3">
              <Check className="h-4 w-4 text-theme-accent-tertiary" />
            </div>
            <span className="text-white/90 text-base">Calculating resource requirements</span>
          </div>
          
          <div className="analysis-step flex items-center opacity-0 bg-theme-bg-surface/20 p-3 rounded-lg shadow-theme-sm backdrop-blur-sm border border-theme-primary/20">
            <div className="min-w-[28px] h-7 rounded-full bg-vs-gradient-coral-orange/30 flex items-center justify-center mr-3">
              <Check className="h-4 w-4 text-vs-gradient-coral-orange" />
            </div>
            <span className="text-white/90 text-base">Generating personalized recommendation</span>
          </div>
        </div>
        
        {/* Centered, wider progress bar with shimmer effect */}
        <div className="relative w-full max-w-[280px] h-3 bg-theme-bg-surface/40 rounded-full overflow-hidden mx-auto border border-white/10">
          <div className="progress-bar h-full w-0 vs-gradient-primary-accent rounded-full relative">
            {/* Shimmer effect */}
            <div className="progress-bar-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"></div>
          </div>
        </div>
        
        {/* Completion message that appears when the bar is full */}
        <div className={`mt-4 transition-opacity duration-300 ${isAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-white text-sm font-medium px-4 py-2 bg-theme-primary/20 rounded-full">
            Analysis complete! Preparing recommendation...
          </span>
        </div>
      </div>
      
      {/* Minimized floating elements */}
      <div className="absolute top-8 right-8 -z-0 w-20 h-20 rounded-[40%] rotate-12 opacity-30 bg-theme-primary animate-float-slow blur-lg"></div>
      <div className="absolute bottom-8 left-8 -z-0 w-24 h-24 rounded-[30%] -rotate-12 opacity-25 bg-theme-accent-secondary animate-float-medium blur-lg"></div>
    </div>
  );
};

export default AnalysisAnimation;