import React from 'react';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';
import { Badge } from "../ui/badge";

interface SimpleHeroProps {
  onCtaClick?: () => void;
}

const SimpleHero = React.forwardRef<HTMLDivElement, SimpleHeroProps>(
  ({ onCtaClick }, ref) => {
    return (
      <section ref={ref} className="relative min-h-screen w-full bg-[var(--bg-cream)] dark:bg-[var(--bg-navy-gradient)] overflow-hidden pt-32 pb-24">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[var(--primary-orange)]/30 to-transparent opacity-40 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-[var(--accent-coral)]/20 to-transparent opacity-30 blur-3xl"></div>
        </div>
        
        {/* Animated floating accent elements with VS Bubbly motion */}
        <div className="absolute top-1/4 right-[15%] w-24 h-24 rounded-full bg-[var(--accent-coral)]/15 blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-[10%] w-32 h-32 rounded-full bg-[var(--primary-orange)]/15 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-[20%] w-20 h-20 rounded-full bg-[var(--secondary-teal)]/15 blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-grid opacity-5 dark:opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <Badge variant="outline" size="xl" className="mb-6">
                10-Week Transformation Program
              </Badge>
              
              <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                <div className="overflow-hidden">
                  <span 
                    className="hero-accent bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-coral)] bg-clip-text text-transparent inline-block hover:scale-[1.02] hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  >
                    800 million views
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span 
                    className="dark:text-white inline-block hover:scale-[1.02] hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{ color: 'var(--text-navy)' }}
                  >
                    zero spent on ads
                  </span>
                </div>
              </h1>
              
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/80 text-xl mb-10 max-w-xl leading-relaxed">
                A proven turn-key system to survive, thrive, and monetise with short-form content. Stop posting into the void. Start creating content that converts.
              </p>
              
              <div className="hero-cta flex flex-wrap gap-6">
                <AnimatedButton 
                  text="Apply Now"
                  variant="start" 
                  saturation="high"
                  size="lg"
                  onClick={onCtaClick}
                  className="w-auto"
                />
                <AnimatedButton 
                  text="Book a Call"
                  variant="docs"
                  saturation="normal"
                  size="lg"
                  className="w-auto"
                />
              </div>
            </div>
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-gradient-to-br from-[var(--primary-orange)]/15 to-[var(--accent-coral)]/10 dark:from-[var(--primary-orange)]/25 dark:to-[var(--accent-coral)]/15 rounded-2xl p-8 h-[500px] flex items-center justify-center overflow-hidden border border-white/10 shadow-lg dark:shadow-[0_10px_50px_rgba(254,163,93,0.15)] transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-xl hover:translate-y-[-10px] hover:rotate-[1deg] hover:scale-[1.02] hover:border-white/20">
                {/* Logo/icon display with enhanced VS Bubbly animations */}
                <div className="w-56 h-56 bg-white dark:bg-[var(--bg-navy)] rounded-full shadow-2xl flex items-center justify-center relative transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:shadow-[0_10px_50px_rgba(254,163,93,0.3)]">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary-orange)] via-[var(--accent-coral)] to-[var(--primary-orange)] bg-[length:400%_400%] animate-borderFlow"></div>
                  {/* Inner white/navy circle with slight padding */}
                  <div className="absolute inset-[3px] rounded-full bg-white dark:bg-[var(--bg-navy)]"></div>
                  
                  {/* Pulsing glow behind text */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary-orange)]/30 to-[var(--accent-coral)]/20 animate-pulse blur-md"></div>
                  
                  {/* VS logo */}
                  <div className="text-8xl font-bold text-center relative z-10 bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-coral)] bg-clip-text text-transparent transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.1] hover:rotate-[3deg]">
                    VS
                  </div>
                </div>
                
                {/* Enhanced decorative elements with VS Bubbly animations */}
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-[var(--primary-orange)]/30 dark:bg-[var(--primary-orange)]/40 backdrop-blur-sm transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.2] hover:translate-y-[-5px]"></div>
                <div className="absolute bottom-12 left-12 w-24 h-24 rounded-full bg-[var(--accent-coral)]/25 dark:bg-[var(--accent-coral)]/35 backdrop-blur-sm transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.2] hover:translate-y-[5px]"></div>
                <div className="absolute -bottom-8 right-20 w-40 h-40 rounded-full bg-[var(--secondary-teal)]/15 dark:bg-[var(--secondary-teal)]/25 backdrop-blur-sm transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.1]"></div>
                
                {/* Small accent shapes */}
                <div className="absolute top-1/4 left-6 w-6 h-6 rounded-sm rotate-45 bg-[var(--primary-orange)] opacity-40 dark:opacity-60 transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:rotate-[135deg] hover:scale-[1.3]"></div>
                <div className="absolute bottom-1/3 right-8 w-8 h-8 rounded-full bg-[var(--accent-coral)] opacity-40 dark:opacity-60 transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.3]"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add custom keyframes for the gradient border animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes borderFlow {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          .animate-borderFlow {
            animation: borderFlow 8s ease infinite;
          }
          
          .bg-grid {
            background-image: 
              linear-gradient(to right, rgba(18, 46, 59, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(18, 46, 59, 0.05) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .dark .bg-grid {
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          }
        `}} />
      </section>
    );
  }
);

SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;