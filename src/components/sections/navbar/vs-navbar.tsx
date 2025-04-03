import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";

export default function VSNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Make navbar visible after scrolling down a bit (300px)
      if (currentScrollY > 300) {
        // Show on scroll up, hide on scroll down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else {
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

  return (
    <header 
      className={`fixed top-0 w-full z-50 px-4 md:px-6 py-3 transition-all duration-[--transition-bounce] bg-gradient-to-br from-white to-[--bg-cream] dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] ${
        isVisible 
          ? "transform-none" 
          : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-[1400px] bg-gradient-to-br from-white to-[--bg-cream] dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] border border-[--bg-cream-darker]/20 dark:border-white/10 relative mx-auto rounded-2xl p-2 py-3 px-4 md:px-6 backdrop-blur-lg shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(53,115,128,0.15)] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_25px_rgba(53,115,128,0.2)] transition-all duration-[--transition-bounce]">
        <NavbarComponent className="py-1">
          <NavbarLeft>
            <img 
              src="/Clash-Logo-One-Line-Light-for-Dark.png" 
              alt="Clash Creation" 
              className="h-8 mr-3"
            />
            <div className="w-8 h-8 rounded-full bg-[--primary-orange] dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover] flex items-center justify-center transition-all duration-[--transition-bounce] hover:scale-110 hover:rotate-[3deg] hover:shadow-md dark:hover:shadow-[0_0_8px_rgba(254,163,93,0.3)]">
              <span className="text-white font-bold">VS</span>
            </div>
            <span className="text-[--text-navy] dark:text-white ml-2 font-medium">Vertical Shortcut</span>
          </NavbarLeft>
          
          <nav className="hidden md:flex ml-8 gap-8">
            <a href="#benefits" className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white text-sm relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[--primary-orange] dark:after:bg-[--primary-orange-light] hover:after:w-full after:transition-all after:duration-[--transition-bounce]">Benefits</a>
            <a href="#curriculum" className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white text-sm relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[--primary-orange] dark:after:bg-[--primary-orange-light] hover:after:w-full after:transition-all after:duration-[--transition-bounce]">Curriculum</a>
            <a href="#testimonials" className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white text-sm relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[--primary-orange] dark:after:bg-[--primary-orange-light] hover:after:w-full after:transition-all after:duration-[--transition-bounce]">Success Stories</a>
            <a href="#pricing" className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white text-sm relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[--primary-orange] dark:after:bg-[--primary-orange-light] hover:after:w-full after:transition-all after:duration-[--transition-bounce]">Pricing</a>
          </nav>
          
          <NavbarRight>
            <a href="#" className="text-sm text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white mr-4 transition-all duration-[--transition-bounce] hover:translate-y-[-2px] dark:text-shadow-sm dark:hover:text-shadow-md">
              Sign in
            </a>
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] hover:from-[--primary-orange-light] hover:to-[--primary-orange] dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover] dark:hover:from-[--primary-orange-light] dark:hover:to-[--primary-orange] text-white px-5 py-2 shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-4px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
              onClick={() => window.location.href = '/application-form'}
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
              <SheetContent side="right" className="bg-gradient-to-br from-white to-[--bg-cream]/90 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] border-[--bg-cream-darker]/20 dark:border-[--secondary-teal]/50">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xl font-bold text-[--text-navy] dark:text-white dark:text-shadow-sm"
                  >
                    <img 
                      src="/Clash-Logo-One-Line-Light-for-Dark.png" 
                      alt="Clash Creation" 
                      className="h-6 mr-2"
                    />
                    <span>Vertical Shortcut</span>
                  </a>
                  <a
                    href="#benefits"
                    className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white transition-all duration-[--transition-bounce] hover:translate-x-[4px]"
                  >
                    Benefits
                  </a>
                  <a
                    href="#curriculum"
                    className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white transition-all duration-[--transition-bounce] hover:translate-x-[4px]"
                  >
                    Curriculum
                  </a>
                  <a
                    href="#testimonials"
                    className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white transition-all duration-[--transition-bounce] hover:translate-x-[4px]"
                  >
                    Success Stories
                  </a>
                  <a
                    href="#pricing"
                    className="text-[--text-navy]/70 hover:text-[--text-navy] dark:text-white/70 dark:hover:text-white transition-all duration-[--transition-bounce] hover:translate-x-[4px]"
                  >
                    Pricing
                  </a>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] hover:from-[--primary-orange-light] hover:to-[--primary-orange] dark:bg-gradient-to-r dark:from-[--primary-orange] dark:to-[--primary-orange-hover] dark:hover:from-[--primary-orange-light] dark:hover:to-[--primary-orange] text-white shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-4px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
                    onClick={() => window.location.href = '/application-form'}
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
