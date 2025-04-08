import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface VSNavbarProps {
  onApplyClick?: () => void;
}

export default function VSNavbar({ onApplyClick }: VSNavbarProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef(null);
  
  // Check viewport size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // GSAP animation for the navbar
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (isVisible) {
        gsap.to(navbarRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(navbarRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          ease: "power1.in"
        });
      }
    }, navbarRef);
    
    return () => ctx.revert();
  }, [isVisible]);

  // Improved scroll handling for immediate response
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show navbar at the very top of the page (0-10px)
      if (currentScrollY <= 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Immediately hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide immediately
        setIsVisible(false);
      } else {
        // Scrolling up - show immediately
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);
  
  // Smooth scroll function for nav links
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, targetId: string): void => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Use GSAP for smooth scrolling with adaptive offset based on screen size
      const offset = isMobile ? 70 : 100;
      
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: offset
        },
        ease: "power3.inOut"
      });
    }
  };

  // Close mobile menu helper
  const closeMobileMenu = () => {
    const sheet = document.querySelector('[data-state="open"]');
    if (sheet) {
      const closeButton = sheet.querySelector('button[aria-label="Close"]');
      if (closeButton && closeButton instanceof HTMLElement) closeButton.click();
    }
  };

  // Handle "Get Your Plan" button click with qualification modal
  const handleApplyClick = () => {
    // Close mobile menu if open
    closeMobileMenu();
    
    // Dispatch a custom event to open the qualification modal
    // This will be caught by the VerticalShortcutLanding component
    const event = new CustomEvent('openQualificationModal');
    window.dispatchEvent(event);
  };

  return (
    <header 
      ref={navbarRef}
      className="fixed top-0 w-full z-50 px-2 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300"
    >
      <div className="max-w-[1400px] bg-theme-primary sm:bg-theme-primary/95 backdrop-blur-sm sm:backdrop-blur-md border border-theme-border/80 sm:border-theme-border relative mx-auto rounded-xl sm:rounded-2xl p-1.5 sm:p-2 py-1.5 sm:py-2.5 px-3 sm:px-4 md:px-6 shadow-md dark:shadow-lg hover:shadow-lg transition-all duration-300 overflow-hidden">
        <NavbarComponent className="py-0.5 sm:py-1">
          <NavbarLeft className="gap-2 sm:gap-3">
            <img 
              src="/Clash-Logo-One-Line-Light-for-Dark.png" 
              alt="Clash Creation" 
              className="h-6 sm:h-7 md:h-8"
            />
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-theme-primary-hover sm:bg-theme-primary flex items-center justify-center shadow-sm">
              <span className="text-theme-on-primary-bold text-xs sm:text-sm">VS</span>
            </div>
            <span className="text-theme-primary ml-1 sm:ml-2 font-medium text-sm sm:text-base hidden xs:inline-block">
              <span className="hidden sm:inline">Vertical</span>
              <span className="inline sm:hidden">V.</span> Shortcut
            </span>
          </NavbarLeft>
          
          <nav className="hidden md:flex ml-4 lg:ml-8 gap-4 lg:gap-6">
            <button 
              onClick={(e) => handleNavLinkClick(e, "benefits")}
              className="px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 text-xs lg:text-sm font-medium transition-all duration-300"
            >
              Benefits
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "curriculum")}
              className="px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 text-xs lg:text-sm font-medium transition-all duration-300"
            >
              Curriculum
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "testimonials")}
              className="px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 text-xs lg:text-sm font-medium transition-all duration-[--transition-bounce]"
            >
              Success Stories
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "pricing")}
              className="px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 text-xs lg:text-sm font-medium transition-all duration-[--transition-bounce]"
            >
              Pricing
            </button>
          </nav>
          
          <NavbarRight className="gap-1 sm:gap-2">
            <Button 
              variant="default" 

              className="bg-theme-primary hover:bg-theme-primary-hover text-theme-on-primary-5 py-1 sm:py-1.5 md:py-2 px-2.5 sm:px-3 md:px-4 text-xs sm:text-sm shadow-theme-sm transition-all duration-[--transition-bounce] hover:translate-y-[-2px] hover:scale-[1.02] md:hover:translate-y-[-3px] md:hover:scale-[1.03] hover:shadow-theme-md"
              onClick={handleApplyClick}
            >
              Get Your Plan
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 md:hidden text-theme-primary hover:bg-theme-secondary/20 transition-all duration-[--transition-bounce]"
                >
                  <Menu className="size-4 sm:size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-theme-primary border-theme-border w-[75vw] sm:max-w-sm p-4 sm:p-6">
                <nav className="grid gap-5 sm:gap-6 mt-2 sm:mt-4">
                  <div
                    className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-bold text-theme-primary"
                  >
                    <img 
                      src="/Clash-Logo-One-Line-Light-for-Dark.png" 
                      alt="Clash Creation" 
                      className="h-5 sm:h-6 mr-1.5 sm:mr-2"
                    />
                    <span>Vertical Shortcut</span>
                  </div>
                  
                  <button
                    className="text-left px-3 py-2.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base"
                    onClick={(e) => {
                      handleNavLinkClick(e, "benefits");
                      closeMobileMenu();
                    }}
                  >
                    Benefits
                  </button>
                  
                  <button
                    className="text-left px-3 py-2.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base"
                    onClick={(e) => {
                      handleNavLinkClick(e, "curriculum");
                      closeMobileMenu();
                    }}
                  >
                    Curriculum
                  </button>
                  
                  <button
                    className="text-left px-3 py-2.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base"
                    onClick={(e) => {
                      handleNavLinkClick(e, "testimonials");
                      closeMobileMenu();
                    }}
                  >
                    Success Stories
                  </button>
                  
                  <button
                    className="text-left px-3 py-2.5 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base"
                    onClick={(e) => {
                      handleNavLinkClick(e, "pricing");
                      closeMobileMenu();
                    }}
                  >
                    Pricing
                  </button>
                  <Button 

                    className="mt-4 bg-theme-primary hover:bg-theme-primary-hover text-theme-on-primary text-sm sm:text-base py-2 sm:py-2.5 shadow-theme-sm transition-all duration-[--transition-bounce] hover:translate-y-[-2px] hover:scale-[1.02] hover:shadow-theme-md"
                    onClick={handleApplyClick}
                  >
                    Get Your Plan
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
};