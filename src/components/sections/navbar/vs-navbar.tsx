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
import {getClashLogos} from "@/utils/imageMap";
// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface VSNavbarProps {
  onApplyClick?: () => void;
}

export default function VSNavbar({ onApplyClick }: VSNavbarProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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
  
  // Check for hash in URL on mount - only scroll if hash exists
  useEffect(() => {
    // Get the hash from the URL (e.g., #benefits, #pricing)
    const hash = window.location.hash.substring(1);
    
    if (hash) {
      // If hash exists, handle scrolling to the section after a delay
      const timer = setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          console.log(`Found target section from URL hash: ${hash}`);
          setActiveSection(hash);
          
          // Scroll to the section
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
      }, 500);
      // Cleanup timer if component unmounts before timeout
      return () => clearTimeout(timer);
    }
    // Only handle hash-based scrolling, don't force scroll to top
    // This allows the SimpleHero to remain visible when loading the page
  }, [isMobile]); 
  
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

  // Improved scroll handling for immediate response with section detection
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
      
      // Check which section is currently in view
      const sections = ['benefits', 'curriculum', 'testimonials', 'pricing'];
      
      // Determine the current active section based on scroll position
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const offset = isMobile ? 150 : 200; // Adjust offset based on device
          
          // If the section is in the viewport (with offset)
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);
  
  // Smooth scroll function for nav links
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, targetId: string): void => {
    e.preventDefault();
    console.log(`Navigating to section: ${targetId}`);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      console.log(`Found target element with id: ${targetId}`);
      // Set active section for styling
      setActiveSection(targetId);
      
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
    } else {
      console.error(`Target element with id "${targetId}" not found. Check that the section has the correct ID.`);
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
      <div className="max-w-[1400px] bg-theme-primary sm:bg-theme-primary backdrop-blur-sm sm:backdrop-blur-md border border-theme-accent sm:border-theme-accent relative mx-auto rounded-theme-xl sm:rounded-theme-2xl p-1.5 sm:p-2 py-1.5 sm:py-2.5 px-3 sm:px-4 md:px-6 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-x-4">
        <NavbarComponent className="py-1 sm:py-1">
          <NavbarLeft className="gap-2 sm:gap-3">
            <img 
              src="/Clash-Logo-One-Line-Light-for-Dark.png" 
              alt="Clash Creation" 
              className="h-6 hidden sm:h-7 md:h-8"
            />
            <div className="w-70 h-15 sm:w-70 sm:h-10 md:w-70 md:h-10 sm:bg-theme-primary flex items-center justify-center @max-[420px]:ml-0 @max-[420px]:w-50 ">
              <span className="text-theme-secondary vs-text-gradient-nav-title text-theme-shadow-md text-3xl font-[350] sm:text-3xl ml-5 @max-[420px]:ml-1 @max-[420px]:text-[1.4rem] @max-[420px]:w-50 @max-[420px]:-translate-x-5">the vertical shortcut.</span>
            </div>
            <span className="text-theme-primary ml-1 sm:ml-2 font-medium text-sm sm:text-base hidden xs:inline-block">
              <span className="hidden sm:inline">Vertical</span>
              <span className="inline sm:hidden">V.</span> Shortcut
            </span>
          </NavbarLeft>
          
          <nav className="hidden md:flex ml-4 lg:ml-8 gap-4 lg:gap-6">
            <button 
              onClick={(e) => handleNavLinkClick(e, "benefits")}
              className={`px-3 lg:px-6 py-2 lg:py-3 rounded-theme-lg text-theme-primary border border-theme-accent hover:bg-theme-secondary text-sm lg:text-md font-medium transition-theme-bounce duration-300 ${activeSection === "benefits" ? "bg-theme-secondary shadow-theme-btn" : ""}`}
            >
              Benefits
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "curriculum")}
              className={`px-3 lg:px-6 py-2 lg:py-3 rounded-theme-lg text-theme-primary border border-theme-accent hover:bg-theme-secondary/30 text-xs lg:text-sm font-medium transition-all duration-300 ${activeSection === "curriculum" ? "bg-theme-secondary shadow-theme-btn" : ""}`}
            >
              Curriculum
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "testimonials")}
              className={`px-3 lg:px-6 py-2 lg:py-3 rounded-theme-lg text-theme-primary border border-theme-accent hover:bg-theme-secondary/30 text-xs lg:text-sm font-medium transition-all duration-[--transition-bounce] ${activeSection === "testimonials" ? "bg-theme-secondary shadow-theme-btn" : ""}`}
            >
              Success Stories
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "pricing")}
              className={`px-3 lg:px-6 py-2 lg:py-3 rounded-theme-lg text-theme-primary border border-theme-accent hover:bg-theme-secondary text-xs lg:text-sm font-medium transition-all hover:shadow-theme-btn ${activeSection === "pricing" ? "bg-theme-secondary shadow-theme-btn" : ""}`}
            >
              Pricing
            </button>
          </nav>
          
          <NavbarRight className="gap-1 sm:gap-2">
            <Button 
              variant="default" 
              className=" vs-btn-secondary-gradient py-2 sm:py-2.5 md:py-3 px-3.5 sm:px-3 md:px-4 text-md sm:text-md shadow-theme-sm glow-theme-secondary transition-theme-bounce @max-[420px]:align-right @max-[420px]:-translate-x-12 hover:shadow-theme-md "
              onClick={handleApplyClick}
            >
              Get Your Plan
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 md:hidden text-theme-primary hover:bg-theme-secondary transition-theme-bounce duration-300 shrink-0"
                >
                  <Menu className="size-5" />
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
                    <span className={"text-theme-primary"}>the vertical shortcut.</span>
                  </div>
                  
                  <button
                    className={`touch-target text-left px-3 py-3 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base ${activeSection === "benefits" ? "bg-theme-secondary/30" : ""}`}
                    onClick={(e) => {
                      handleNavLinkClick(e, "benefits");
                      closeMobileMenu();
                    }}
                  >
                    Benefits
                  </button>
                  
                  <button
                    className={`touch-target text-left px-3 py-3 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base ${activeSection === "curriculum" ? "bg-theme-secondary/30" : ""}`}
                    onClick={(e) => {
                      handleNavLinkClick(e, "curriculum");
                      closeMobileMenu();
                    }}
                  >
                    Curriculum
                  </button>
                  
                  <button
                    className={`touch-target text-left px-3 py-3 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base ${activeSection === "testimonials" ? "bg-theme-secondary/30" : ""}`}
                    onClick={(e) => {
                      handleNavLinkClick(e, "testimonials");
                      closeMobileMenu();
                    }}
                  >
                    Success Stories
                  </button>
                  
                  <button
                    className={`touch-target text-left px-3 py-3 rounded-md text-theme-primary hover:bg-theme-secondary/30 font-medium transition-all duration-[--transition-bounce] text-sm sm:text-base ${activeSection === "pricing" ? "bg-theme-secondary/30" : ""}`}
                    onClick={(e) => {
                      handleNavLinkClick(e, "pricing");
                      closeMobileMenu();
                    }}
                  >
                    Pricing
                  </button>
                  <Button 
                    className="touch-target mt-4 btn-theme-secondary hover:bg-theme-primary-hover text-theme-on-primary text-sm sm:text-base py-3 shadow-theme-sm transition-all duration-[--transition-bounce] hover:translate-y-[-2px] hover:scale-[1.02] hover:shadow-theme-md"
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