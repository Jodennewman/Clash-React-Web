import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const SimpleHero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);

  const [currentHeadingIndex, setCurrentHeadingIndex] = useState<number>(0);

  useEffect(() => {
    if (logoRef.current) {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      });
    }
    
    const headingInterval = setInterval(() => {
      if (headingRef.current) {
        rotateHeading();
      }
    }, 5000);
    
    return () => clearInterval(headingInterval);
  }, []);

  const rotateHeading = (): void => {
    if (!headingRef.current) return;
    
    const timeline = gsap.timeline();
    
    timeline.to(headingRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        setCurrentHeadingIndex(prev => (prev + 1) % yourHeadingsArray.length);
      }
    }).to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.1,
      ease: "power3.out"
    });
  };

  return (
    <div className="your-existing-classes">
      <div ref={logoRef}>
        {/* Your logo content */}
      </div>
      <h1 ref={headingRef} className="your-existing-classes">
        {yourHeadingsArray[currentHeadingIndex]}
      </h1>
    </div>
  );
};

export default SimpleHero; 