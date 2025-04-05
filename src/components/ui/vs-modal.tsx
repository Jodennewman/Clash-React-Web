import React, { useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { XCircle } from 'lucide-react';

interface VSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

/**
 * VSModal - Base modal component following VS styling guidelines
 * 
 * Features:
 * - Theme-aware styling that works in both light and dark modes
 * - Animated entrance/exit using GSAP with theme-aware variables
 * - Floating elements for visual interest
 * - Proper theme-aware gradient backgrounds
 * - Close on ESC key press and overlay click (configurable)
 */
const VSModal: React.FC<VSModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Width classes mapping
  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  };

  // Handle animation with GSAP
  useGSAP(() => {
    if (!isOpen || !modalRef.current || !overlayRef.current) return;

    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const animDuration = styles.getPropertyValue('--theme-anim-duration') || '0.35';

    const ctx = gsap.context(() => {
      // Animate overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate modal
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );

      // Floating elements animation
      gsap.to(".modal-floating-element", {
        y: parseFloat(animDistance),
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true, 
        stagger: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

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

  // Close on ESC key
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, closeOnEsc]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop/Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 transition-opacity"
        onClick={closeOnOverlayClick ? handleClose : undefined}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`w-full ${widthClasses[width]} relative bg-theme-gradient rounded-[var(--theme-border-radius-lg)] shadow-theme-md overflow-hidden opacity-0`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating elements using theme-aware classes */}
          <div className="modal-floating-element absolute top-10 right-10 w-20 h-20 rounded-[40%] rotate-12 
                        opacity-[var(--theme-float-opacity)] 
                        bg-[var(--theme-float-bg-primary)]"></div>
          <div className="modal-floating-element absolute bottom-10 left-10 w-16 h-16 rounded-[40%] -rotate-12 
                        opacity-[var(--theme-float-opacity)] 
                        bg-[var(--theme-float-bg-secondary)]"></div>
          
          {/* Modal Content */}
          <div className="relative z-10">
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="p-5 md:p-6 border-b border-theme-border flex items-center justify-between">
                {title && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-theme-primary">{title}</h2>
                    {description && (
                      <p className="mt-1 text-theme-secondary text-sm">{description}</p>
                    )}
                  </div>
                )}
                
                {showCloseButton && (
                  <button
                    onClick={handleClose}
                    className="text-theme-secondary hover:text-theme-primary transition-colors hover-bubbly-sm p-1"
                    aria-label="Close modal"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                )}
              </div>
            )}
            
            {/* Body */}
            <div className="p-5 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VSModal };