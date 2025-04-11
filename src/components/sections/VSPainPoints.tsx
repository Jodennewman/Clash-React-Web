import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IsometricGridBackground from '../hero/IsometricPattern';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const VSPainPoints = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  // GSAP animations with scroll
  useGSAP(() => {
    if (!pathRef.current || !sectionRef.current) return;
    
    const path = pathRef.current;
    const section = sectionRef.current;
    const pathLength = path.getTotalLength();
    
    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
    
    // Initial setup
    gsap.set(path, {
      strokeDasharray: `${pathLength} ${pathLength}`,
      strokeDashoffset: pathLength
    });
    
    // Create animation that progresses with scroll
    const ctx = gsap.context(() => {
      // Path animation that follows scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center", 
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const drawLength = pathLength * progress;
          
          // Update the stroke dash offset
          gsap.set(path, {
            strokeDashoffset: pathLength - drawLength
          });
          
          // Remove dasharray when fully drawn
          if (progress >= 0.99) {
            gsap.set(path, { strokeDasharray: "none" });
          } else {
            gsap.set(path, { strokeDasharray: `${pathLength} ${pathLength}` });
          }
        }
      });
      
      // Text animations for each pain point heading
      document.querySelectorAll(".pain-heading").forEach((element) => {
        // Create a timeline for each heading
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
        
        // Animate the heading with theme-aware values
        tl.from(element, {
          y: parseFloat(animDistance) * -15, // Amplify the effect
          opacity: 0,
          duration: parseFloat(animDuration) * 2, // Slower for emphasis
          ease: "power3.out"
        });
      });
      
      // Text animations for each pain point description
      document.querySelectorAll(".pain-desc").forEach((element) => {
        // Create a timeline for each description
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
        
        // Animate the description with theme-aware values
        tl.from(element, {
          y: parseFloat(animDistance) * -7.5, // Half the heading movement
          opacity: 0,
          duration: parseFloat(animDuration) * 1.5, // Slightly slower
          delay: 0.2,
          ease: "power2.out"
        });
      });
      
    }, sectionRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);
  
  return (
    <div ref={sectionRef} className="painPoints relative overflow-hidden py-24 bg-theme-secondary">
      <IsometricGridBackground />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-theme-primary text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
          You're bored of failing content.
        </h1>
      </div>
      
      {/* Theme-aware floating elements */}
      <div className="absolute top-40 left-20 w-24 h-24 rounded-[40%] rotate-12 
                    opacity-[var(--theme-float-opacity)] 
                    bg-[var(--theme-float-bg-primary)]
                    animate-float-slow"></div>
      <div className="absolute bottom-60 right-10 w-32 h-32 rounded-[30%] -rotate-6 
                    opacity-[var(--theme-float-opacity)] 
                    bg-[var(--theme-float-bg-secondary)]
                    animate-float-medium"></div>
      
      {/* SVG Line Animation Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg viewBox="1345.446 -15.854 414.893 1193.282" width="100%" height="100%" 
             preserveAspectRatio="none"
             xmlns="http://www.w3.org/2000/svg">
          <path 
            ref={pathRef}
            className="stroke-theme-accent"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            d="M 1467.712 -4.174 C 1467.712 -4.174 1477.168 40.241 1528.79 70.654 C 1584.022 103.194 1597.939 107.628 1632.836 125.496 C 1681.091 150.204 1680.768 170.646 1679.884 200.006 C 1678.584 243.155 1654.521 254.445 1632.334 273.315 C 1596.099 304.132 1546.486 312.088 1501.697 330.741 C 1452.123 351.387 1392.137 379.289 1392.342 428.091 C 1392.641 499.442 1493.594 522.168 1493.594 522.168 C 1493.594 522.168 1583.556 544.658 1618.506 556.312 C 1656.359 568.934 1719.123 596.375 1719.605 640.99 C 1720.076 684.633 1654.42 710.914 1613.839 718.177 C 1558.072 728.157 1494.683 721.122 1447.32 752.209 C 1411.419 775.773 1361.004 795.789 1366.668 853.175 C 1373.681 924.225 1461.839 938.122 1502.568 947.526 C 1579.368 965.259 1639.148 964.298 1649.476 997.67 C 1662.115 1038.51 1582.648 1055.062 1567.258 1082.199 C 1540.529 1129.33 1549.306 1161.304 1549.306 1161.304"
          />
        </svg>
      </div>
      
      {/* Top fade effect - theme-aware */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-theme-primary to-transparent z-10"></div>
      
      {/* Pain Point Sections */}
      <div className="relative z-20 container mx-auto max-w-5xl px-4">
        <div className="body-text mb-20 mx-auto max-w-[90%] md:max-w-4xl text-center">
          At this point you've sunk years of your life, millions of pounds and an army of creative freelancers into the dream of working out the "algorithm". And all it's done is reward your optimism and naivety with a slew of 200 view videos, and comments from russian bots.
        </div>
        
        {/* Pain Point 1 - Money Pit */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div className="md:text-right order-2 md:order-1">
              <h2 className="pain-heading text-theme-primary text-3xl md:text-4xl lg:text-5xl font-bold">
                You're bleeding money into Meta's money-pit<span className="text-theme-accent text-5xl">.</span>
              </h2>
            </div>
            <div className="order-1 md:order-2">
              <p className="pain-desc body-text">
                Without an organic strategy that works, you're relying entirely on paid ads which get marginal views on instagram (because genZ HATE feeling like they're being sold to) or pretty decent views on facebook — but that's completely useless unless boomers are your dream clientele.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pain Point 2 - Stressed Team */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div>
              <p className="pain-desc body-text">
                Whether your team are top level marketers or graduates with a point to prove, nailing short form content is a very niche skill and there isn't much education on how to do it right. You're frustrated at the results and your team has no idea what to do.
              </p>
            </div>
            <div>
              <h2 className="pain-heading text-theme-primary text-3xl md:text-4xl lg:text-5xl font-bold">
                Your social team is stressed (and so are you)<span className="text-theme-accent text-5xl">.</span>
              </h2>
            </div>
          </div>
        </div>
        
        {/* Pain Point 3 - Inbound Leads */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div className="md:text-right order-2 md:order-1">
              <h2 className="pain-heading text-theme-primary text-3xl md:text-4xl lg:text-5xl font-bold">
                You want more inbound leads<span className="text-theme-accent text-5xl">.</span>
              </h2>
            </div>
            <div className="order-1 md:order-2">
              <p className="pain-desc body-text">
                You've got the product, the business, the vision. But your dream clients don't even know you exist. You're craving inbound leads, and a full inbox of DMs from people who <strong>already</strong> see you as the authority in your space.
              </p>
            </div>
          </div>
        </div>
        
        {/* Conclusion */}
        <div className="my-40 text-center">
          <h2 className="pain-heading text-theme-primary text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            If that's you, we've got the solution<span className="text-theme-accent text-5xl">.</span>
          </h2>
        </div>
      </div>
      
      {/* Bottom fade effect - theme-aware */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-theme-primary to-transparent z-10"></div>
    </div>
  );
};

export default VSPainPoints;