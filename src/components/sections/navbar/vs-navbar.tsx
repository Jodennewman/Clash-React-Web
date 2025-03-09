import React from "react";
import Navigation from "../../ui/navigation";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";
import Logo from "../../logos/Hero/index";

export default function vsNavbar() {
  return (
    <header className="sticky top-0 z-50 p-2 pb-0">
    <div className="max-w-container bg-[#08141B]/80 border-white/10 relative mx-auto rounded-2xl border p-2 pl-3 backdrop-blur-lg">
      <NavbarComponent className="py-0">
        <NavbarLeft>
          <Logo type="Logo-solo-4x" className="flex items-center gap-2 text-xl font-bold" />
            <div className="w-8 h-8 rounded-full bg-[#FEA35D] flex items-center justify-center">
              <span className="text-[#08141B] font-bold">VS</span>
            </div>
            <span className="text-white">Vertical Shortcut</span>
          </Logo>
          </NavbarLeft>
          <NavbarCenter>
          <nav className="hidden md:flex ml-6 gap-6">
            <a href="#benefits" className="text-white/70 hover:text-white text-sm">Benefits</a>
            <a href="#curriculum" className="text-white/70 hover:text-white text-sm">Curriculum</a>
            <a href="#testimonials" className="text-white/70 hover:text-white text-sm">Success Stories</a>
            <a href="#pricing" className="text-white/70 hover:text-white text-sm">Pricing</a>
          </nav>
          </NavbarCenter>
          <NavbarRight>
          <a href="#" className="text-sm text-white/70 hover:text-white">
            Sign in
          </a>
          <Button variant="default" className="bg-[#FEA35D] hover:bg-[#F89A67] text-[#08141B]">Apply Now</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden"
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
                  <div className="w-8 h-8 rounded-full bg-[#FEA35D] flex items-center justify-center">
                    <span className="text-[#08141B] font-bold">VS</span>
                  </div>
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
                <Button className="mt-4 bg-[#FEA35D] hover:bg-[#F89A67] text-[#08141B]">
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
