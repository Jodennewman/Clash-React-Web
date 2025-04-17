import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from "../components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TiaModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  stage: string;
  children: React.ReactNode;
  showProgressBar?: boolean;
  progress?: number;
  stageIcon: React.ReactNode;
  stageTitle: string;
}

// This is a modified version of ModalContainer with smaller title styling
const TiaModalContainer: React.FC<TiaModalContainerProps> = ({
  isOpen,
  onClose,
  stage,
  children,
  showProgressBar = false,
  progress = 0,
  stageIcon,
  stageTitle
}) => {
  // Refs for GSAP animations
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  
  // Handle animation with GSAP
  useGSAP(() => {
    if (!isOpen || !modalRef.current || !overlayRef.current) return;

    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = parseFloat(styles.getPropertyValue('--theme-anim-distance') || '-4px');
    const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');

    const ctx = gsap.context(() => {
      // Initial modal animation
      if (!modalRef.current.style.opacity || modalRef.current.style.opacity === '0') {
        // Animate overlay
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        // Animate modal
        gsap.fromTo(modalRef.current,
          { opacity: 0, y: -animDistance * 5, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: animDuration + 0.05, ease: "back.out(1.2)" }
        );
      }

      // Floating elements animation
      gsap.to(".modal-floating-element", {
        y: animDistance * 2.5,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true, 
        stagger: 0.4
      });

      // Animate progress bar if shown
      if (showProgressBar && progressBarRef.current) {
        gsap.to(progressBarRef.current, { 
          width: `${progress}%`, 
          duration: 0.6, 
          ease: "power2.out" 
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen, progress, showProgressBar]);

  // Handle modal close animation
  const handleClose = () => {
    if (!modalRef.current || !overlayRef.current) {
      onClose();
      return;
    }

    // Animate overlay
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });

    // Animate modal
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: "power3.in",
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay backdrop */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Modal content - responsive sizing */}
      <div 
        ref={modalRef}
        className="relative z-10 w-[95%] md:w-[90%] lg:w-[85%] max-w-4xl
                   bg-theme-gradient-card
                   rounded-xl shadow-theme-md opacity-0 transition-all duration-300 
                   border border-theme-border-light overflow-hidden"
        style={{ maxHeight: 'min(90vh, 800px)' }}
      >
        {/* Visual elements */}
        <div className="modal-floating-element absolute top-10 right-10 -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>
        <div className="modal-floating-element absolute bottom-10 left-10 -z-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>
        
        {/* Theme-aware patterns */}
        <div className="absolute inset-0 dot-bg opacity-[var(--theme-pattern-opacity)] pointer-events-none rounded-xl overflow-hidden"></div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent opacity-[var(--theme-glow-opacity)] pointer-events-none rounded-t-xl"></div>
        
        {/* Modal header - Modified with smaller title and conditional border */}
        <div className={`flex items-center justify-between p-4 md:p-5 ${stage !== 'teamSize' && stage !== 'implementationSupport' && stage !== 'timeline' && stage !== 'contentVolume' && stage !== 'contact' && stage !== 'loading' && stage !== 'recommendation' ? 'border-b border-[var(--theme-border-light)]' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-theme-primary/10 text-theme-primary">
              {stageIcon}
            </div>
            {/* Custom styling for specific stage titles */}
            {stage === 'intro' || stage === 'teamSize' || stage === 'implementationSupport' || stage === 'timeline' || stage === 'contentVolume' || stage === 'contact' || stage === 'loading' || stage === 'recommendation' ? (
              <h3 className="text-sm font-medium text-theme-primary">
                {stageTitle}
              </h3>
            ) : (
              <h2 className="text-base sm:text-lg font-medium text-theme-primary">
                {stageTitle}
              </h2>
            )}
          </div>
          
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-theme-tertiary hover:text-theme-primary 
                     hover:bg-theme-primary/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Progress bar - only show when indicated */}
        {showProgressBar && (
          <div className="w-full h-2 bg-theme-bg-secondary relative">
            <div 
              className="h-full bg-theme-primary relative overflow-hidden"
              style={{ width: `${progress}%` }}
              ref={progressBarRef}
            >
              {/* Add decorative elements within the progress bar */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-1 bg-theme-primary-hover/30 rotate-45 blur-sm transform -translate-x-full animate-[progress-shimmer_3s_infinite]"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Modal content area */}
        <div className={`${
          stage === 'teamSize' || stage === 'implementationSupport' || stage === 'timeline' || stage === 'contentVolume' 
            ? 'overflow-visible' // No scrolling for quiz stages
            : 'overflow-y-auto'
        }`} style={{ 
          maxHeight: stage === 'teamSize' || stage === 'implementationSupport' || stage === 'timeline' || stage === 'contentVolume'
            ? 'none' // No height constraint for quiz stages
            : 'calc(90vh - 150px)'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TiaModalContainer;