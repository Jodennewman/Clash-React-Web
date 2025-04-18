import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IsometricGridBackground from '../hero/IsometricPattern';
import { useDeviceDetection } from '../../utils/animation-utils'; // Import device detection
import { VSHeading, VSText } from '../ui/vs-text'; // Import theme text components

// Register GSAP plugins (ensure it's done globally ideally, but safe here too)
gsap.registerPlugin(ScrollTrigger);

const VSPainPoints = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const floatingPathRef = useRef<SVGPathElement>(null);
  const { isMobile } = useDeviceDetection(); // Use the hook
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Don't set everything visible by default - we want animations
    
    // Set initial state for animated elements
    gsap.set(".pain-heading", { autoAlpha: 0, y: 30 }); // Increased y offset for more dramatic animation
    gsap.set(".pain-desc", { autoAlpha: 0, y: 25 }); // Increased y offset
    
    if (pathRef.current) {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      
      // Set up path for animation
      gsap.set(path, {
        strokeDasharray: `${pathLength} ${pathLength}`,
        strokeDashoffset: pathLength, // Start hidden
        autoAlpha: 1
      });
      
      // Path animation - made more prominent
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center", 
        scrub: 0.3, // Reduced for smoother animation
        id: 'vspainpoints-path-simple',
        onUpdate: (self) => {
          const progress = self.progress;
          const drawLength = pathLength * progress;
          gsap.set(path, { strokeDashoffset: pathLength - drawLength });
        }
      });
    }

    // Handle floating shapes animation
    if (floatingPathRef.current) {
      const floatingPath = floatingPathRef.current;
      const floatingPathLength = floatingPath.getTotalLength();
      
      // Make the path itself invisible
      gsap.set(floatingPath, { autoAlpha: 0 });
      
      // Animate the floating blobs along the path
      const floatingBlobs = section.querySelectorAll('.floating-blob');
      
      floatingBlobs.forEach((blob, index) => {
        // Position blobs at various points along the path with offsets
        const initialOffset = index * 0.25; // Distribute blobs along path
        
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          id: `floating-blob-${index}`,
          onUpdate: (self) => {
            // Calculate adjusted progress with offset
            let progress = self.progress + initialOffset;
            if (progress > 1) progress -= 1; // Loop back to beginning
            
            // Get position along the path
            const point = floatingPath.getPointAtLength(floatingPathLength * progress);
            
            // Apply position to blob
            gsap.set(blob, {
              x: point.x,
              y: point.y,
              opacity: 0.2 + (Math.sin(progress * Math.PI) * 0.15) // Subtle opacity variation
            });
          }
        });
        
        // Add subtle scale animation independent of scroll
        gsap.to(blob, {
          scale: "random(0.8, 1.2)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
      
      // Add subtle rotation to stars
      const stars = section.querySelectorAll('.floating-star');
      stars.forEach((star) => {
        gsap.to(star, {
          rotation: "random(-30, 30)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }

    const ctx = gsap.context(() => {
      // Heading animations - more prominent
      document.querySelectorAll(".pain-heading").forEach((element, index) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9, // Longer duration
          ease: "power3.out", // Stronger easing
          scrollTrigger: {
            trigger: element,
            start: "top 90%", // Start animation sooner
            once: true,
            id: `vspainpoints-heading-${index}`
          }
        });
      });
      
      // Description animations with slight delay after headings
      document.querySelectorAll(".pain-desc").forEach((element, index) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8, // Longer duration
          delay: 0.3, // Slightly longer delay
          ease: "power2.out", // Stronger easing
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
            id: `vspainpoints-desc-${index}`
          }
        });
      });
    }, sectionRef);
    
    return () => {
      ctx.revert(); // Proper cleanup
    };
  }, [isMobile]);
  
  return (
    <div ref={sectionRef} className="painPoints relative overflow-visible pt-4 pb-8 md:pt-8 md:pb-12 bg-theme-bg-primary z-10">
      <div className="container-mobile mx-auto relative z-20">
        
        <div className="absolute top-40 left-20 w-24 h-24 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow -z-10"></div>
        <div className="absolute bottom-60 right-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-secondary)] animate-float-medium -z-10"></div>
        
        {/* Centered floating shapes that follow an invisible path */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Invisible path for floating shapes to follow - centered vertically */}
          <svg viewBox="0 0 1000 1200" width="100%" height="100%" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
            <path 
              ref={floatingPathRef}
              d="M 500 50 
                 C 500 50 450 100 500 150 
                 C 550 200 500 250 450 300
                 C 400 350 500 400 550 450
                 C 600 500 500 550 450 600
                 C 400 650 500 700 550 750
                 C 600 800 500 850 450 900
                 C 400 950 500 1000 550 1050
                 C 600 1100 500 1150 500 1150"
              fill="none" 
              stroke="transparent"
              strokeWidth="0"/>
          </svg>
          
          {/* Floating blobs that will follow the path - larger and more visible */}
          <div className="floating-blob absolute rounded-full bg-theme-accent w-8 h-8 opacity-25"></div>
          <div className="floating-blob absolute rounded-full bg-theme-accent w-12 h-12 opacity-20"></div>
          <div className="floating-blob absolute rounded-full bg-theme-accent w-10 h-10 opacity-15"></div>
          <div className="floating-blob absolute rounded-full bg-theme-accent w-6 h-6 opacity-30"></div>
          
          {/* Fixed decorative elements - centered more */}
          <div className="floating-star absolute w-3 h-3 bg-theme-accent rotate-45 opacity-30" style={{top: '15%', left: '45%'}}></div>
          <div className="floating-star absolute w-3 h-3 bg-theme-accent rotate-45 opacity-30" style={{top: '35%', left: '55%'}}></div>
          <div className="floating-star absolute w-3 h-3 bg-theme-accent rotate-45 opacity-30" style={{top: '65%', left: '48%'}}></div>
          <div className="floating-star absolute w-3 h-3 bg-theme-accent rotate-45 opacity-30" style={{top: '80%', left: '52%'}}></div>
        </div>
        
        {/* Original path animation */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <svg viewBox="1345.446 -15.854 414.893 1193.282" width="100%" height="100%" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg">
             <path 
               ref={pathRef}
               className="stroke-theme-accent"
               strokeWidth="8" // Increased from 6 to make more prominent
               strokeLinecap="round"
               fill="none"
               d="M 1467.712 -4.174 C 1467.712 -4.174 1477.168 40.241 1528.79 70.654 C 1584.022 103.194 1597.939 107.628 1632.836 125.496 C 1681.091 150.204 1680.768 170.646 1679.884 200.006 C 1678.584 243.155 1654.521 254.445 1632.334 273.315 C 1596.099 304.132 1546.486 312.088 1501.697 330.741 C 1452.123 351.387 1392.137 379.289 1392.342 428.091 C 1392.641 499.442 1493.594 522.168 1493.594 522.168 C 1493.594 522.168 1583.556 544.658 1618.506 556.312 C 1656.359 568.934 1719.123 596.375 1719.605 640.99 C 1720.076 684.633 1654.42 710.914 1613.839 718.177 C 1558.072 728.157 1494.683 721.122 1447.32 752.209 C 1411.419 775.773 1361.004 795.789 1366.668 853.175 C 1373.681 924.225 1461.839 938.122 1502.568 947.526 C 1579.368 965.259 1639.148 964.298 1649.476 997.67 C 1662.115 1038.51 1582.648 1055.062 1567.258 1082.199 C 1540.529 1129.33 1549.306 1161.304 1549.306 1161.304"
             />
           </svg>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-theme-secondary to-transparent z-10"></div>
        
          
          <div className="component-spacing mb-60 mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-20 items-center">
              <div className="md:text-right order-1 md:order-1">
                <VSHeading size="xl" className="pain-heading text-white font-bold">
                  So. You're bored of failing content<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>

          
          <div className="component-spacing mb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-20 items-center">
              <div className="md:col-start-2 md:text-left order-1 md:order-1">
                <VSHeading size="xl" className="pain-heading text-white font-bold">
                  You're sick of inconsistent freelancers<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>

          <div className="component-spacing mb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-20 items-center">
              <div className="md:text-right order-1 md:order-1">
                <VSHeading size="xl" className="pain-heading text-white font-bold">
                  Your social team is stressed (and so are you)<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>
          
          <div className="component-spacing mb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-20 items-center">
              <div className="md:col-start-2 md:text-left order-1 md:order-1">
                <VSHeading size="xl" className="pain-heading text-white font-bold">
                  You're struggling to keep posting every. single. day<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>
          
          <div className="component-spacing mb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-20 items-center">
              <div className="md:text-right order-1 md:order-1">
                <VSHeading size="xl" className="pain-heading text-white font-bold">
                  You want more inbound leads<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>
          
          <div className="component-spacing mb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-20 items-center">
              <div className="md:col-start-2 md:text-left order-1 md:order-1">
                <VSHeading size="xl" className="pain-heading text-white font-bold">
                  And you want your content to represent YOU<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>
          
          <div className="component-spacing text-center mt-32 mb-16">
            <VSHeading size="xl" className="pain-heading text-theme-primary font-bold mb-24">
              If that sounds familiar, we've got the solution<span className="text-theme-accent text-5xl">.</span>
            </VSHeading>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-theme-secondary to-transparent z-10"></div>
      </div>
  );
};

export default VSPainPoints;