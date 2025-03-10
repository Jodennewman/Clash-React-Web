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
  const [isVisible, setIsVisible] = useState(false);
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
        // Always hide at the top of the page
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 px-4 md:px-6 py-3 transition-all duration-300 ${
        isVisible 
          ? "transform-none" 
          : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-[1400px] bg-[#08141B]/90 border-white/10 relative mx-auto rounded-2xl border p-2 py-3 px-4 md:px-6 backdrop-blur-lg">
        <NavbarComponent className="py-1">
          <NavbarLeft>
            <img 
              src="/Clash-Logo-One-Line-Light-for-Dark.png" 
              alt="Clash Creation" 
              className="h-8 mr-3"
            />
            <div className="w-8 h-8 rounded-full bg-[#FEA35D] flex items-center justify-center">
              <span className="text-[#08141B] font-bold">VS</span>
            </div>
            <span className="text-white ml-2">Vertical Shortcut</span>
          
          </NavbarLeft>
          <nav className="hidden md:flex ml-8 gap-8">
            <a href="#benefits" className="text-white/70 hover:text-white text-sm">Benefits</a>
            <a href="#curriculum" className="text-white/70 hover:text-white text-sm">Curriculum</a>
            <a href="#testimonials" className="text-white/70 hover:text-white text-sm">Success Stories</a>
            <a href="#pricing" className="text-white/70 hover:text-white text-sm">Pricing</a>
          </nav>
          
          <NavbarRight>
            <a href="#" className="text-sm text-white/70 hover:text-white mr-4">
              Sign in
            </a>
            <Button 
              variant="default" 
              className="bg-[#FEA35D] hover:bg-[#F89A67] text-[#08141B] px-5"
              onClick={() => window.location.href = '/application-form'}
            >
              Apply Now
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden ml-2"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#09232F] border-[#154D59]/50">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xl font-bold text-white"
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
                    className="text-white/70 hover:text-white"
                  >
                    Benefits
                  </a>
                  <a
                    href="#curriculum"
                    className="text-white/70 hover:text-white"
                  >
                    Curriculum
                  </a>
                  <a
                    href="#testimonials"
                    className="text-white/70 hover:text-white"
                  >
                    Success Stories
                  </a>
                  <a
                    href="#pricing"
                    className="text-white/70 hover:text-white"
                  >
                    Pricing
                  </a>
                  <Button 
                    className="mt-4 bg-[#FEA35D] hover:bg-[#F89A67] text-[#08141B]"
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
