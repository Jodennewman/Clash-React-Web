// VideoEmbed.tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VideoEmbed = ({ videoUrl = "https://www.youtube.com/embed/your-video-id" }) => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  
  // Use useGSAP for proper animation cleanup
  useGSAP(() => {
    // Create a context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial state (out of view)
      gsap.set(videoContainerRef.current, {
        y: 80,
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
        }
      });
      
      // Animate in with VS Bubbly style - 20% more pronounced than typical
      tl.to(videoContainerRef.current, {
        y: 0,
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
      className="relative py-24 overflow-hidden bg-[var(--bg-cream-darker)] dark:bg-[var(--bg-navy-darker)]"
    >
      {/* Light mode decorative elements - left side */}
      <div className="absolute left-0 bottom-0 w-1/3 h-full pointer-events-none dark:hidden">
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-[var(--primary-orange)] opacity-10 rotate-45 rounded-md"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-[var(--primary-orange-light)] opacity-8 rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 bg-[var(--secondary-teal)] opacity-5 rotate-45 rounded-md"></div>
        <div className="absolute bottom-60 left-8 w-14 h-14 bg-[var(--accent-coral)] opacity-5 rotate-45 rounded-md"></div>
      </div>
      
      {/* Dark mode decorative elements - left side with gradients */}
      <div className="absolute left-0 bottom-0 w-1/3 h-full pointer-events-none hidden dark:block">
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] opacity-70 rotate-45 rounded-md"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-r from-[--primary-orange-light] to-[--primary-orange] opacity-60 rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-light] opacity-50 rotate-45 rounded-md"></div>
        <div className="absolute bottom-60 left-8 w-14 h-14 bg-gradient-to-r from-[--accent-coral] to-[--accent-red] opacity-30 rotate-45 rounded-md"></div>
      </div>
      
      {/* Light mode decorative elements - right side */}
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none dark:hidden">
        <div className="absolute top-20 right-20 w-16 h-16 bg-[--secondary-teal-light] opacity-5 rotate-45 rounded-md"></div>
        <div className="absolute top-60 right-40 w-20 h-20 bg-[--primary-orange-light] opacity-8 rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-[--primary-orange] opacity-10 rotate-45 rounded-md"></div>
      </div>
      
      {/* Dark mode decorative elements - right side with gradients */}
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none hidden dark:block">
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-light] opacity-50 rotate-45 rounded-md"></div>
        <div className="absolute top-60 right-40 w-20 h-20 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] opacity-60 rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-r from-[--primary-orange-hover] to-[--primary-orange] opacity-40 rotate-45 rounded-md"></div>
      </div>
      
      {/* Add subtle background patterns */}
      <div className="absolute inset-0 dot-bg opacity-5 dark:opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Video container with curved border radius using CSS variables for consistent styling */}
        <div 
          ref={videoContainerRef} 
          className="relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-gradient-to-br from-white to-[rgba(255,246,239,0.8)] dark:bg-black shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
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
            
            {/* Video title overlay with proper styling according to CLAUDE.md */}
            <div 
              className="absolute bottom-8 right-8 text-xl md:text-2xl font-light z-10 text-[--text-navy] dark:text-white"
            >
              the vertical shortcut.
            </div>
            
            {/* Optional title element overlay with proper styling according to CLAUDE.md */}
            <div 
              className="absolute top-8 right-8 opacity-70 text-sm md:text-base z-10 text-[--text-navy] dark:text-white/70"
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