// VideoEmbed.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VideoEmbed = ({ videoUrl = "https://www.youtube.com/embed/your-video-id" }) => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;
    
    // Set initial state (out of view)
    gsap.set(videoContainer, {
      y: 80,
      scale: 0.95,
      opacity: 0,
    });
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%", // Trigger when top of section hits 70% down viewport
        end: "center center",
        toggleActions: "play none none reverse",
        // markers: true, // Uncomment for debugging
      }
    });
    
    // Animate in
    tl.to(videoContainer, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    });
    
    // Cleanup
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 bg-[#09232F] overflow-hidden"
    >
      {/* Decorative elements - left side */}
      <div className="absolute left-0 bottom-0 w-1/3 h-full pointer-events-none">
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-[#F89A67] opacity-70 rotate-45 rounded-md"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-[#FEAC6D] opacity-60 rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 bg-[#387292] opacity-50 rotate-45 rounded-md"></div>
        <div className="absolute bottom-60 left-8 w-14 h-14 bg-[#B92234] opacity-30 rotate-45 rounded-md"></div>
      </div>
      
      {/* Decorative elements - right side */}
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-16 h-16 bg-[#387292] opacity-50 rotate-45 rounded-md"></div>
        <div className="absolute top-60 right-40 w-20 h-20 bg-[#FEAC6D] opacity-60 rotate-45 rounded-md"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-[#FEA35D] opacity-40 rotate-45 rounded-md"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Video container with curved border radius */}
        <div 
          ref={videoContainerRef} 
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] shadow-2xl bg-[#081820]"
        >
          {/* Video aspect ratio container */}
          <div className="aspect-[16/9] relative">
            <iframe 
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              title="Clash Creation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            
            {/* Video title overlay - matching reference design */}
            <div className="absolute bottom-8 right-8 text-white text-xl md:text-2xl font-light z-10">
              the vertical shortcut.
            </div>
            
            {/* Optional title element overlay */}
            <div className="absolute top-8 right-8 text-white/70 text-sm md:text-base z-10">
              Title Elements
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoEmbed;