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

export default function VSNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  
  // GSAP animation for the navbar
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (isVisible) {
        gsap.to(navbarRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
      } else {
        gsap.to(navbarRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    }, navbarRef);
    
    return () => ctx.revert();
  }, [isVisible]);

  // Improved scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // More graceful transition behavior with debounce-like concept
      // Make navbar visible after scrolling down a bit (300px)
      if (currentScrollY > 300) {
        // Show on scroll up, hide on scroll down - with threshold to prevent jitter
        if (currentScrollY < lastScrollY - 30) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY + 30) {
          setIsVisible(false);
        }
      } else {
        // When at the top of the page, keep the navbar visible
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  // Smooth scroll function for nav links
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string): void => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Use GSAP for smooth scrolling
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: 100
        },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <header 
      ref={navbarRef}
      className="fixed top-0 w-full z-50 px-4 md:px-6 py-3"
    >
      <div className="max-w-[1400px] bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)] backdrop-blur-md border border-[var(--bg-cream-darker)]/20 dark:border-white/10 relative mx-auto rounded-2xl p-2 py-3 px-4 md:px-6 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] transition-all duration-300 overflow-hidden">
        <NavbarComponent className="py-1">
          <NavbarLeft>
            <img 
              src="/Clash-Logo-One-Line-Light-for-Dark.png" 
              alt="Clash Creation" 
              className="h-8 mr-3"
            />
            <div className="w-8 h-8 rounded-full bg-[var(--primary-orange)] flex items-center justify-center shadow-[1px_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_rgba(254,163,93,0.3)]">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <span className="text-[var(--text-navy)] dark:text-white ml-2 font-medium">Vertical Shortcut</span>
          </NavbarLeft>
          
          <nav className="hidden md:flex ml-8 gap-6">
            <button 
              onClick={(e) => handleNavLinkClick(e, "benefits")}
              className="px-3 py-1.5 rounded-md text-[var(--text-navy)] hover:bg-[var(--bg-cream-darker)]/30 dark:text-white dark:hover:bg-white/10 text-sm font-medium transition-all duration-300"
            >
              Benefits
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "curriculum")}
              className="px-3 py-1.5 rounded-md text-[var(--text-navy)] hover:bg-[var(--bg-cream-darker)]/30 dark:text-white dark:hover:bg-white/10 text-sm font-medium transition-all duration-300"
            >
              Curriculum
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "testimonials")}
              className="px-3 py-1.5 rounded-md text-[--text-navy] hover:bg-[--bg-cream-darker]/30 dark:text-white dark:hover:bg-white/10 text-sm font-medium transition-all duration-[--transition-bounce]"
            >
              Success Stories
            </button>
            <button 
              onClick={(e) => handleNavLinkClick(e, "pricing")}
              className="px-3 py-1.5 rounded-md text-[--text-navy] hover:bg-[--bg-cream-darker]/30 dark:text-white dark:hover:bg-white/10 text-sm font-medium transition-all duration-[--transition-bounce]"
            >
              Pricing
            </button>
          </nav>
          
          <NavbarRight>
            <Button 
              variant="default" 
              className="bg-[--primary-orange] hover:bg-[--primary-orange-hover] dark:bg-[--primary-orange] dark:hover:bg-[--primary-orange-hover] text-white px-5 py-2 shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
              onClick={() => {
                const applicationForm = document.getElementById("application-form");
                if (applicationForm) {
                  gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                      y: applicationForm,
                      offsetY: 80
                    },
                    ease: "power3.inOut"
                  });
                } else {
                  window.location.href = '/application-form';
                }
              }}
            >
              Apply Now
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden ml-2 text-[--text-navy] dark:text-white hover:bg-[--bg-cream-darker]/20 dark:hover:bg-white/10 transition-all duration-[--transition-bounce]"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[--bg-cream] dark:bg-[--bg-navy] border-[--bg-cream-darker]/20 dark:border-[--secondary-teal]/50">
                <nav className="grid gap-6 text-lg">
                  <div
                    className="flex items-center gap-2 text-xl font-bold text-[--text-navy] dark:text-white dark:text-shadow-sm"
                  >
                    <img 
                      src="/Clash-Logo-One-Line-Light-for-Dark.png" 
                      alt="Clash Creation" 
                      className="h-6 mr-2"
                    />
                    <span>Vertical Shortcut</span>
                  </div>
                  
                  <button
                    className="text-left px-3 py-2 rounded-md text-[--text-navy] hover:bg-[--bg-cream-darker]/30 dark:text-white dark:hover:bg-white/10 font-medium transition-all duration-[--transition-bounce]"
                    onClick={(e) => {
                      handleNavLinkClick(e, "benefits");
                      const sheet = document.querySelector('[data-state="open"]');
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[aria-label="Close"]');
                        if (closeButton && closeButton instanceof HTMLElement) closeButton.click();
                      }
                    }}
                  >
                    Benefits
                  </button>
                  
                  <button
                    className="text-left px-3 py-2 rounded-md text-[--text-navy] hover:bg-[--bg-cream-darker]/30 dark:text-white dark:hover:bg-white/10 font-medium transition-all duration-[--transition-bounce]"
                    onClick={(e) => {
                      handleNavLinkClick(e, "curriculum");
                      const sheet = document.querySelector('[data-state="open"]');
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[aria-label="Close"]');
                        if (closeButton && closeButton instanceof HTMLElement) closeButton.click();
                      }
                    }}
                  >
                    Curriculum
                  </button>
                  
                  <button
                    className="text-left px-3 py-2 rounded-md text-[--text-navy] hover:bg-[--bg-cream-darker]/30 dark:text-white dark:hover:bg-white/10 font-medium transition-all duration-[--transition-bounce]"
                    onClick={(e) => {
                      handleNavLinkClick(e, "testimonials");
                      const sheet = document.querySelector('[data-state="open"]');
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[aria-label="Close"]');
                        if (closeButton && closeButton instanceof HTMLElement) closeButton.click();
                      }
                    }}
                  >
                    Success Stories
                  </button>
                  
                  <button
                    className="text-left px-3 py-2 rounded-md text-[--text-navy] hover:bg-[--bg-cream-darker]/30 dark:text-white dark:hover:bg-white/10 font-medium transition-all duration-[--transition-bounce]"
                    onClick={(e) => {
                      handleNavLinkClick(e, "pricing");
                      const sheet = document.querySelector('[data-state="open"]');
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[aria-label="Close"]');
                        if (closeButton && closeButton instanceof HTMLElement) closeButton.click();
                      }
                    }}
                  >
                    Pricing
                  </button>
                  <Button 
                    className="mt-4 bg-[--primary-orange] hover:bg-[--primary-orange-hover] dark:bg-[--primary-orange] dark:hover:bg-[--primary-orange-hover] text-white shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
                    onClick={() => {
                      const applicationForm = document.getElementById("application-form");
                      const sheet = document.querySelector('[data-state="open"]');
                      
                      if (sheet) {
                        const closeButton = sheet.querySelector('button[aria-label="Close"]');
                        if (closeButton && closeButton instanceof HTMLElement) closeButton.click();
                      }
                      
                      if (applicationForm) {
                        setTimeout(() => {
                          gsap.to(window, {
                            duration: 1.2,
                            scrollTo: {
                              y: applicationForm,
                              offsetY: 80
                            },
                            ease: "power3.inOut"
                          });
                        }, 300);
                      } else {
                        window.location.href = '/application-form';
                      }
                    }}
                  >
                    Apply Now
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
