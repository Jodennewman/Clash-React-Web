import React from 'react';
import { Button } from '../ui/button';

interface SimpleHeroProps {
  onCtaClick?: () => void;
}

const SimpleHero = React.forwardRef<HTMLDivElement, SimpleHeroProps>(
  ({ onCtaClick }, ref) => {
    return (
      <section ref={ref} className="relative min-h-screen w-full bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)] overflow-hidden pt-32 pb-24">
        {/* Background gradient */}
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[var(--primary-orange)]/20 to-transparent opacity-40 blur-3xl"></div>
        
        {/* Floating accent elements */}
        <div className="absolute top-1/4 right-[15%] w-24 h-24 rounded-full bg-[var(--accent-coral)]/10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-[10%] w-32 h-32 rounded-full bg-[var(--primary-orange)]/10 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="hero-badge inline-block mb-6 bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full max-w-max">
                <span style={{ color: 'var(--primary-orange)' }} className="dark:text-[var(--primary-orange-light)] font-semibold">10-Week Transformation Program</span>
              </div>
              
              <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span 
                  className="hero-accent bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-red)] bg-clip-text text-transparent"
                >
                  800 million views
                </span>,
                <br />
                zero spent on ads
              </h1>
              
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/80 text-xl mb-10 max-w-xl leading-relaxed">
                A proven turn-key system to survive, thrive, and monetise with short-form content. Stop posting into the void. Start creating content that converts.
              </p>
              
              <div className="hero-cta flex flex-wrap gap-4">
                <Button 
                  className="px-8 py-7 bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] text-white text-lg font-semibold transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:scale-[1.02]"
                  onClick={onCtaClick}
                >
                  Apply Now <span className="ml-2">&rarr;</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-7 border border-[var(--secondary-teal)]/20 dark:border-white/20 hover:bg-white/10 text-lg font-semibold transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:scale-[1.02]"
                  style={{ color: 'var(--text-navy)' }} 
                  className="dark:text-white"
                >
                  Book a Call
                </Button>
              </div>
            </div>
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-gradient-to-br from-[var(--primary-orange)]/10 to-[var(--accent-coral)]/5 dark:from-[var(--primary-orange)]/20 dark:to-[var(--accent-coral)]/10 rounded-2xl p-8 h-[450px] flex items-center justify-center overflow-hidden">
                {/* Logo/icon display */}
                <div className="w-48 h-48 bg-white dark:bg-[var(--bg-navy)] rounded-full shadow-xl flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary-orange)]/20 to-[var(--accent-coral)]/10 animate-pulse"></div>
                  <div className="text-8xl font-bold text-center bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-coral)] bg-clip-text text-transparent">
                    VS
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-[var(--primary-orange)]/20 dark:bg-[var(--primary-orange)]/30 backdrop-blur-sm"></div>
                <div className="absolute bottom-12 left-12 w-20 h-20 rounded-full bg-[var(--accent-coral)]/20 dark:bg-[var(--accent-coral)]/30 backdrop-blur-sm"></div>
                <div className="absolute -bottom-5 right-20 w-32 h-32 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;