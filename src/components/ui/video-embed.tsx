// VideoEmbed.tsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface VideoEmbedProps {
  videoUrl?: string;
  priority?: boolean;
}

const VideoEmbed = ({ 
  videoUrl = "https://www.youtube.com/embed/your-video-id",
  priority = false
}: VideoEmbedProps) => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  
  // Use useGSAP for proper animation cleanup - only used for the section animation
  // The "peek" effect is controlled by the parent component
  useGSAP(() => {
    // Create a context for proper cleanup
    const ctx = gsap.context(() => {
      // Only set initial scale and opacity - don't set Y position as it will conflict with the peek effect
      gsap.set(videoContainerRef.current, {
        scale: 0.95,
        opacity: 0,
      });
      
      // Create animation timeline with VS Bubbly animation style
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Trigger when top of section hits 70% down viewport
          end: "center center",
          toggleActions: "play none none reverse",
          // Don't animate position here, only opacity and scale
        }
      });
      
      // Animate in with VS Bubbly style - only handling scale and opacity
      tl.to(videoContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.2)" // More springy easing for VS Bubbly style
      });
    }, sectionRef); // Scope to section ref
    
    // useGSAP automatically handles cleanup
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="bg-transparent relative py-8 overflow-hidden"
    >
      {/* Theme-aware floating elements - left side */}
      <div className="absolute left-0 bottom-0 w-1/3 h-full pointer-events-none">
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-theme-primary opacity-[var(--theme-float-opacity)] rotate-45 rounded-md"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-theme-primary-hover opacity-[var(--theme-float-opacity-secondary)] rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 bg-theme-accent-secondary opacity-[var(--theme-float-opacity)] rotate-45 rounded-md"></div>
        <div className="absolute bottom-60 left-8 w-14 h-14 bg-theme-accent-tertiary opacity-[var(--theme-float-opacity-secondary)] rotate-45 rounded-md"></div>
      </div>
      
      {/* Theme-aware floating elements - right side */}
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-16 h-16 bg-theme-accent-secondary-light opacity-[var(--theme-float-opacity-secondary)] rotate-45 rounded-md"></div>
        <div className="absolute top-60 right-40 w-20 h-20 bg-theme-primary-light opacity-[var(--theme-float-opacity)] rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-theme-primary opacity-[var(--theme-float-opacity-secondary)] rotate-45 rounded-md"></div>
      </div>
      
      {/* Add subtle background patterns with theme-aware opacity */}
      <div className="absolute inset-0 dot-bg opacity-[var(--theme-grid-dot-opacity)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Video container with curved border radius using CSS variables for consistent styling */}
        <div 
          ref={videoContainerRef} 
          className={`relative mx-auto max-w-full overflow-hidden rounded-xl bg-theme-bg-primary shadow-theme-md border border-theme-border transition-all transition-theme-normal will-change-transform transform-gpu ${priority ? 'priority-video' : ''}`}
        >
          {/* Video aspect ratio container */}
          <div className="aspect-[16/9] relative">
            <iframe 
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              title="Vertical Shortcut Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            
            {/* Video title overlay with theme-aware styling */}
            <div 
              className="absolute bottom-8 right-8 text-xl md:text-2xl font-light z-10 text-theme-primary transition-colors transition-theme-normal"
            >
              the vertical shortcut.
            </div>
            
            {/* Optional title element overlay with theme-aware styling */}
            <div 
              className="absolute top-8 right-8 opacity-70 text-sm md:text-base z-10 text-theme-secondary transition-colors transition-theme-normal"
            >
              Title Elements
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoEmbed;