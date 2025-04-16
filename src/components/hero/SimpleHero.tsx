import React, { forwardRef, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { VSText, VSHeading } from '../ui/vs-text';
import { PlayCircle } from 'lucide-react';
import { useDeviceDetection } from '../../utils/animation-utils';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SimpleHeroProps {
  onCtaClick: () => void;
  videoUrl: string;
  videoRef: React.RefObject<HTMLDivElement | null>;
  title?: string;
  subtitle?: string;
  badges?: string[];
}

const MobileHero = ({ 
  title = "Default Mobile Title",
  subtitle = "Default mobile subtitle explaining the value proposition.", 
  badges = ["Badge 1", "Badge 2"],
  onCtaClick
}: Partial<SimpleHeroProps> & { onCtaClick: () => void }) => {
  const heroRef = useRef(null);
  
  useGSAP(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 20, 
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all",
      });
      
      gsap.from(".hero-badge", {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.6,
        ease: "power1.out",
        clearProps: "all",
      });

      gsap.from(".hero-cta-button", {
          y: 15,
          opacity: 0,
          duration: 0.5,
          delay: 0.8,
          ease: "power1.out",
          clearProps: "all",
      });

    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={heroRef} className="relative pt-36 pb-16 px-4 text-center overflow-hidden bg-gradient-to-b from-white to-[var(--theme-bg-cream-gradient)] dark:bg-gradient-to-b dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]">
      <div className="max-w-screen-md mx-auto relative z-10">
        <VSHeading size="xl" className="hero-text mb-4">
          {title}
        </VSHeading>
        <VSText size="lg" color="text-theme-secondary" className="hero-text mb-8">
          {subtitle}
        </VSText>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {badges.map((badge, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="hero-badge bg-theme-accent/10 border-theme-accent/30 text-theme-accent font-medium"
            >
              {badge}
            </Badge>
          ))}
        </div>
         <AnimatedButton
            text="Apply Now & Get Your Plan"
            variant="start" 
            saturation="high"
            size="lg"
            onClick={onCtaClick}
            className="hero-cta-button"
         />
      </div>
       <div className="absolute -z-0 top-10 left-[-10%] w-32 h-32 rounded-[50%] opacity-10 dark:opacity-20 bg-theme-accent blur-2xl animate-float-slow"></div>
       <div className="absolute -z-0 bottom-10 right-[-15%] w-40 h-40 rounded-[50%] opacity-10 dark:opacity-20 bg-theme-accent-secondary blur-2xl animate-float-medium"></div>
    </div>
  );
};

const DesktopHero = forwardRef<HTMLDivElement, Omit<SimpleHeroProps, 'ref'>>(
  ({ onCtaClick, videoRef, title, subtitle, badges }, ref) => {
    const heroContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      if (!videoRef.current) return;
      
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: -20, opacity: 0, stagger: 0.1, duration: 0.5 })
        .from(".hero-title", { y: -30, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-subtitle", { y: -30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-cta-button", { y: -20, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".hero-video-button", { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(videoRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.inOut" }, "-=0.8");

    }, { dependencies: [videoRef.current] });

    return (
      <div ref={ref ?? heroContainerRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-64 overflow-hidden bg-gradient-to-b from-white to-[var(--theme-bg-cream-gradient)] dark:bg-gradient-to-b dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]">
        <div className="absolute -z-10 top-20 left-[10%] w-48 h-48 rounded-[40%] rotate-12 opacity-theme-float bg-theme-float-primary animate-float-slow blur-lg"></div>
        <div className="absolute -z-10 bottom-20 right-[15%] w-56 h-56 rounded-[35%] -rotate-6 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium blur-lg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {(badges || ["Viral Strategy", "Content Systems", "Team Delegation"]).map((badge, index) => (
                 <Badge 
                    key={index} 
                    variant="outline"
                    className="hero-badge bg-theme-accent/10 border-theme-accent/30 text-theme-accent font-medium py-1 px-3" 
                  >
                  {badge}
                </Badge>
              ))}
            </div>

            <VSHeading size="2xl" className="hero-title mb-6">
              {title || "Master Short-Form Content That Converts"}
            </VSHeading>
            <VSText size="xl" color="text-theme-secondary" className="hero-subtitle mb-10">
              {subtitle || "The premium 10-week program for founders & creators to generate consistent leads and revenue using viral short-form video strategies."}
            </VSText>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <AnimatedButton
                  text="Apply Now & Get Your Plan"
                  variant="start" 
                  saturation="high"
                  size="lg"
                  onClick={onCtaClick}
                  className="hero-cta-button" 
               />
               <Button variant="outline" size="lg" className="hero-video-button bg-transparent hover:bg-theme-accent/10 border-theme-accent text-theme-accent hover:text-theme-accent group">
                 <PlayCircle className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" /> Watch Trailer
              </Button>
            </div>
          </div>
        </div>
        
        <div 
           ref={videoRef}
           className="video-container absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white/10 dark:border-[var(--theme-border)] z-20 bg-black"
           style={{ perspective: '1000px' }}
         >
           <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white/50" />
           </div>
        </div>
      </div>
    );
  }
);
DesktopHero.displayName = 'DesktopHero';

const SimpleHero = forwardRef<HTMLDivElement, SimpleHeroProps>(
   (props, ref) => {
     const { isMobile } = useDeviceDetection();
  
     return isMobile ? (
       <MobileHero {...props} />
     ) : (
       <DesktopHero {...props} ref={ref} />
     );
   }
);
SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;