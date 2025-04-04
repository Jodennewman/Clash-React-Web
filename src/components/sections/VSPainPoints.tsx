import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        
        // Animate the heading
        tl.from(element, {
          y: 60,
          opacity: 0,
          duration: 0.8,
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
        
        // Animate the description with a slight delay after the heading
        tl.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out"
        });
      });
      
    }, sectionRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);
  
  return (
    <div ref={sectionRef} className="relative overflow-hidden py-24 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-[--text-navy] dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
          For Founders Feeling Fed Up
        </h1>
      </div>
      
      {/* Floating elements - light mode */}
      <div className="absolute top-40 left-20 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                    bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute bottom-60 right-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-8
                    bg-[--primary-orange-hover] animate-float-medium hidden dark:hidden"></div>
                    
      {/* Dark mode floating elements */}
      <div className="absolute top-40 left-20 w-24 h-24 rounded-[40%] rotate-12 opacity-10 
                    bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                    animate-float-slow hidden dark:block"></div>
      <div className="absolute bottom-60 right-10 w-32 h-32 rounded-[30%] -rotate-6 opacity-15
                    bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                    animate-float-medium hidden dark:block"></div>
      
      {/* SVG Line Animation Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg viewBox="1345.446 -15.854 414.893 1193.282" width="100%" height="100%" 
             preserveAspectRatio="none"
             xmlns="http://www.w3.org/2000/svg">
          <path 
            ref={pathRef}
            className="stroke-[--secondary-teal] dark:stroke-[--secondary-teal-hover]"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            d="M 1467.712 -4.174 C 1467.712 -4.174 1477.168 40.241 1528.79 70.654 C 1584.022 103.194 1597.939 107.628 1632.836 125.496 C 1681.091 150.204 1680.768 170.646 1679.884 200.006 C 1678.584 243.155 1654.521 254.445 1632.334 273.315 C 1596.099 304.132 1546.486 312.088 1501.697 330.741 C 1452.123 351.387 1392.137 379.289 1392.342 428.091 C 1392.641 499.442 1493.594 522.168 1493.594 522.168 C 1493.594 522.168 1583.556 544.658 1618.506 556.312 C 1656.359 568.934 1719.123 596.375 1719.605 640.99 C 1720.076 684.633 1654.42 710.914 1613.839 718.177 C 1558.072 728.157 1494.683 721.122 1447.32 752.209 C 1411.419 775.773 1361.004 795.789 1366.668 853.175 C 1373.681 924.225 1461.839 938.122 1502.568 947.526 C 1579.368 965.259 1639.148 964.298 1649.476 997.67 C 1662.115 1038.51 1582.648 1055.062 1567.258 1082.199 C 1540.529 1129.33 1549.306 1161.304 1549.306 1161.304"
          />
        </svg>
      </div>
      
      {/* Top fade effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[--bg-cream] to-transparent dark:from-[--bg-navy] dark:to-transparent z-10"></div>
      
      {/* Pain Point Sections */}
      <div className="relative z-20 container mx-auto max-w-5xl px-4">
        <div className="text-[--text-navy] dark:text-white/80 text-lg mb-20 mx-auto max-w-4xl text-center">
          Founders complain a lot. And despite what certain, less hard working people think of them, sometimes they actually have a point. Being a founder is hard. Making content that actually gets views on top of that is impossible. We've worked with people just like you if you are:
        </div>
        
        {/* Pain Point 1 */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div className="md:text-right order-2 md:order-1">
              <h2 className="pain-heading text-[--text-navy] dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                Bored of <br />Failing Content<span className="text-[--primary-orange] dark:text-[--primary-orange-hover] text-5xl">.</span>
              </h2>
            </div>
            <div className="order-1 md:order-2">
              <p className="pain-desc text-[--text-navy] dark:text-white/80">
                Ploughing time, money and personnel into the dream of working out the "algorithm" and going from optimism to plain confusion every time your content tanks.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pain Point 2 */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div>
              <p className="pain-desc text-[--text-navy] dark:text-white/80">
                Without organic content that works, you're forced to push unimaginable funds into paid ads just to generate leads.
              </p>
            </div>
            <div>
              <h2 className="pain-heading text-[--text-navy] dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                Fighting Meta's <br />Money Pit<span className="text-[--primary-orange] dark:text-[--primary-orange-hover] text-5xl">.</span>
              </h2>
            </div>
          </div>
        </div>
        
        {/* Pain Point 3 */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div className="md:text-right order-2 md:order-1">
              <h2 className="pain-heading text-[--text-navy] dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                Struggling With <br />Your Socials Team<span className="text-[--primary-orange] dark:text-[--primary-orange-hover] text-5xl">.</span>
              </h2>
            </div>
            <div className="order-1 md:order-2">
              <p className="pain-desc text-[--text-navy] dark:text-white/80">
                Whether your team are top level marketers or just starting out, nailing social media video is a niche, high value skill that has only been around since 2020.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pain Point 4 */}
        <div className="my-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-center">
            <div>
              <p className="pain-desc text-[--text-navy] dark:text-white/80">
                Your audience doesn't even know that you exist, and you dream of the advantages that come from being the best known in your category.
              </p>
            </div>
            <div>
              <h2 className="pain-heading text-[--text-navy] dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                A Life <br />Without Leads<span className="text-[--primary-orange] dark:text-[--primary-orange-hover] text-5xl">.</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[--bg-cream] to-transparent dark:from-[--bg-navy] dark:to-transparent z-10"></div>
    </div>
  );
};

export default VSPainPoints;