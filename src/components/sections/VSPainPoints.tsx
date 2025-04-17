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
  const { isMobile } = useDeviceDetection(); // Use the hook
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile-optimized animations (as per plan)
        console.log("Applying mobile animations for VSPainPoints");

        // Simple fade for SVG path (only if pathRef exists)
        if (pathRef.current) {
          gsap.from(pathRef.current, {
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true, 
              id: 'vspainpoints-path-mobile' // Unique ID
            }
          });
        }
        
        // Simpler fade-in animations for headings
        document.querySelectorAll(".pain-heading").forEach((element) => {
          gsap.from(element, {
            y: 15, // Reduced distance
            opacity: 0,
            duration: 0.6, // Slightly faster
            scrollTrigger: {
              trigger: element,
              start: "top 85%", 
              once: true, // Only animate once
              id: `vspainpoints-heading-mobile-${element.textContent?.substring(0,10)}`
            }
          });
        });
        
        // Simpler fade-in for descriptions
        document.querySelectorAll(".pain-desc").forEach((element) => {
          gsap.from(element, {
            y: 10, // Reduced distance
            opacity: 0,
            duration: 0.6,
            delay: 0.1, // Slightly reduced delay
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
              id: `vspainpoints-desc-mobile-${element.textContent?.substring(0,10)}`
            }
          });
        });

      } else {
        // Desktop animations (Original logic)
        console.log("Applying desktop animations for VSPainPoints");

        if (!pathRef.current) return;
        const path = pathRef.current;
        const pathLength = path.getTotalLength();
        
        // Get computed theme variables for animation
        const styles = getComputedStyle(document.documentElement);
        const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
        const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';
        
        // Initial setup for path
        gsap.set(path, {
          strokeDasharray: `${pathLength} ${pathLength}`,
          strokeDashoffset: pathLength
        });

        // Path animation that follows scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center", 
          scrub: 0.5,
          id: 'vspainpoints-path-desktop',
          onUpdate: (self) => {
            const progress = self.progress;
            const drawLength = pathLength * progress;
            gsap.set(path, { strokeDashoffset: pathLength - drawLength });
            if (progress >= 0.99) {
              gsap.set(path, { strokeDasharray: "none" });
            } else {
              gsap.set(path, { strokeDasharray: `${pathLength} ${pathLength}` });
            }
          }
        });
        
        // Text animations for headings
        document.querySelectorAll(".pain-heading").forEach((element) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 70%",
              toggleActions: "play none none reverse",
              id: `vspainpoints-heading-desktop-${element.textContent?.substring(0,10)}`
            }
          });
          tl.from(element, {
            y: parseFloat(animDistance) * -15, 
            opacity: 0,
            duration: parseFloat(animDuration) * 2, 
            ease: "power3.out"
          });
        });
        
        // Text animations for descriptions
        document.querySelectorAll(".pain-desc").forEach((element) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
              id: `vspainpoints-desc-desktop-${element.textContent?.substring(0,10)}`
            }
          });
          tl.from(element, {
            y: parseFloat(animDistance) * -7.5, 
            opacity: 0,
            duration: parseFloat(animDuration) * 1.5, 
            delay: 0.2,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);
    
    return () => {
      console.log("Cleaning up VSPainPoints animations");
      ctx.revert(); // Proper cleanup
      // Optionally kill specific triggers if needed, though ctx.revert should handle scoped ones
      // ScrollTrigger.getAll().forEach(st => {
      //   if (st.vars.id?.startsWith('vspainpoints-')) {
      //     st.kill();
      //   }
      // });
    };
  }, [isMobile]); // Add isMobile dependency to re-run animations if device type changes
  
  return (
    // Use VSSection for consistent padding and container usage
    <div ref={sectionRef} className="painPoints relative overflow-hidden py-16 md:py-24 bg-theme-secondary">
      <IsometricGridBackground />
      <div className="container-mobile mx-auto relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          <VSHeading size="xl" className="mb-16">
            You're bored of failing content.
          </VSHeading>
        </div>
        
        <div className="absolute top-40 left-20 w-24 h-24 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow -z-10"></div>
        <div className="absolute bottom-60 right-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-secondary)] animate-float-medium -z-10"></div>
        
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
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-theme-secondary to-transparent z-10"></div>
        
        <div className="max-w-5xl mx-auto">
          <VSText size="lg" color="text-theme-primary" className="component-spacing text-center max-w-4xl mx-auto">
            At this point you've sunk years of your life, millions of pounds and an army of creative freelancers into the dream of working out the "algorithm". And all it's done is reward your optimism and naivety with a slew of 200 view videos, and comments from russian bots.
          </VSText>
          
          <div className="component-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
              <div className="md:text-right order-2 md:order-1">
                <VSHeading size="xl" className="pain-heading">
                  You're bleeding money into Meta's money-pit<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
              <div className="order-1 md:order-2">
                <VSText size="md" className="pain-desc">
                  Without an organic strategy that works, you're relying entirely on paid ads which get marginal views on instagram (because genZ HATE feeling like they're being sold to) or pretty decent views on facebook — but that's completely useless unless boomers are your dream clientele.
                </VSText>
              </div>
            </div>
          </div>
          
          <div className="component-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
              <div>
                <VSText size="md" className="pain-desc">
                  Whether your team are top level marketers or graduates with a point to prove, nailing short form content is a very niche skill and there isn't much education on how to do it right. You're frustrated at the results and your team has no idea what to do.
                </VSText>
              </div>
              <div>
                <VSHeading size="xl" className="pain-heading">
                  Your social team is stressed (and so are you)<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
            </div>
          </div>
          
          <div className="component-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
              <div className="md:text-right order-2 md:order-1">
                <VSHeading size="xl" className="pain-heading">
                  You want more inbound leads<span className="text-theme-accent text-5xl">.</span>
                </VSHeading>
              </div>
              <div className="order-1 md:order-2">
                <VSText size="md" className="pain-desc">
                  You've got the product, the business, the vision. But your dream clients don't even know you exist. You're craving inbound leads, and a full inbox of DMs from people who <strong>already</strong> see you as the authority in your space.
                </VSText>
              </div>
            </div>
          </div>
          
          <div className="component-spacing text-center">
            <VSHeading size="xl" className="pain-heading mb-8">
              If that's you, we've got the solution<span className="text-theme-accent text-5xl">.</span>
            </VSHeading>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-theme-secondary to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default VSPainPoints;