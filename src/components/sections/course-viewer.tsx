import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModuleHUD } from "./ModuleHUD";
import { VSSection } from "../ui/vs-background";
import { VSGradientText, VSHeading } from "../ui/vs-text";
import { PlayCircle, Check, Star } from "lucide-react";
// VSSubmoduleModal is now handled by ModuleHUD

interface ModuleDetails {
  id: string;
  title: string;
  subtitle: string;
  points: string[];
  thumbnail: string;
}

export const CourseViewer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleDetails | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Get computed theme variables for animation
  const getThemeVariables = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      animDuration: parseFloat(
        styles.getPropertyValue("--theme-anim-duration") || "0.35",
      ),
      animScale: parseFloat(
        styles.getPropertyValue("--theme-anim-scale") || "1.02",
      ),
      bgHover:
        styles.getPropertyValue("--theme-bg-hover") || "rgba(0,0,0,0.05)",
    };
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Background floating animation
      gsap.to(".course-float-element", {
        y: -15,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Subtle rotation for decorative elements
      gsap.to(".course-float-element", {
        rotation: "+=2",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1,
      });

      // Add subtle pulse to the call-to-action button
      gsap.to(".cta-button", {
        boxShadow: "0 6px 20px rgba(254, 163, 93, 0.25)",
        scale: 1.01,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Set up Intersection Observer for scroll-triggered animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Run the animation sequence when the component enters the viewport
              const target = entry.target;

              // Animation sequence disabled - handled in ModuleHUD component
              // We'll only animate floating elements in container

              // Animation for floating elements
              gsap.from(target.querySelectorAll(".course-float-element"), {
                y: 30,
                opacity: 0,
                stagger: 0.2,
                delay: 0.6,
                duration: 0.8,
                ease: "power2.out",
              });

              // Stop observing after animation is triggered
              observer.unobserve(target);
            }
          });
        },
        {
          threshold: 0.2, // Trigger when 20% of the element is visible
          rootMargin: "0px 0px -100px 0px", // Adjust based on when you want the animation to trigger
        },
      );

      // Observe the ModuleHUD container
      const hudContainers = document.querySelectorAll(".module-hud-container");
      hudContainers.forEach((container) => {
        observer.observe(container);
      });

      return () => {
        // Clean up observer when component unmounts
        hudContainers.forEach((container) => {
          observer.unobserve(container);
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Function to handle section click in the HUD
  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
  };

  // Function to handle module click within an expanded section
  const handleModuleClick = (moduleId: string) => {
    console.log("CourseViewer handleModuleClick called with:", moduleId);

    // Check if it's a section ID or a module ID
    const mainSectionIds = [
      "basic_theory",
      "advanced_theory",
      "upskiller_authentic_research_writer",
      "upskiller_shorts_ready_videographer",
      "upskiller_vertical_video_editors",
      "pr_authority",
      "delegation",
      "monetisation",
      "conversion",
    ];

    // If it's a section ID or contains system, handle it locally
    if (
      mainSectionIds.includes(moduleId) ||
      moduleId.includes("section") ||
      moduleId.includes("system") ||
      moduleId.includes("-col")
    ) {
      console.log("Handling section click for:", moduleId);
      setSelectedSection(moduleId === selectedSection ? null : moduleId);
    }

    // For regular modules, we don't need to do anything here
    // ModuleHUD will handle showing its own modal
  };

  // Modal handling is now done by ModuleHUD

  return (
    <VSSection
      className="bg-theme-gradient py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Theme-aware floating elements with proper animation classes */}
      <div
        className="course-float-element absolute -z-10 top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
           opacity-[var(--theme-float-opacity)] 
           bg-[var(--theme-float-bg-primary)]"
      ></div>
      <div
        className="course-float-element absolute -z-10 bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 
           opacity-[var(--theme-float-opacity-secondary)] 
           bg-[var(--theme-float-bg-secondary)]"
      ></div>
      <div
        className="course-float-element absolute -z-10 bottom-[20%] left-[15%] w-36 h-36 rounded-[35%] rotate-[18deg] 
           opacity-[var(--theme-float-opacity)] 
           bg-[var(--theme-accent-tertiary)]"
      ></div>

      {/* Grid background pattern for subtle texture */}
      <div className="absolute inset-0 -z-20 opacity-[0.07] grid-bg"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <VSHeading
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-6 text-theme-primary"
          >
            Is making actually good short form content really that complex?
          </VSHeading>

          <p className="body-text mb-6 mx-auto max-w-[90%] md:max-w-3xl">
            Well yes and no. It's simple, but there's a lot to it.
          </p>

          <VSGradientText
            variant="h3"
            fromColor="var(--theme-primary)"
            toColor="var(--theme-accent-secondary)"
            className="text-2xl md:text-3xl font-bold mb-12"
          >
            The Course Curriculum
          </VSGradientText>
        </div>

        {/* ModuleHUD container with theme-aware styling and proper centering */}
        <div className="flex justify-center items-center w-full my-16 md:my-24 relative">
          {/* Theme-aware floating elements for visual interest */}
          <div
            className="course-float-element absolute -z-10 top-20 left-[15%] w-32 h-32 rounded-[40%] rotate-12 
               opacity-[var(--theme-float-opacity)] 
               bg-[var(--theme-float-bg-primary)]"
          ></div>
          <div
            className="course-float-element absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
               opacity-[var(--theme-float-opacity-secondary)] 
               bg-[var(--theme-float-bg-secondary)]"
          ></div>

          <div className="module-hud-container relative flex items-center justify-center h-full min-h-[700px] w-full max-w-5xl mx-auto bg-gradient-to-br from-transparent to-theme-primary/10 dark:from-transparent dark:to-theme-accent/15 p-6 rounded-2xl">
            <ModuleHUD
              selectedSection={selectedSection}
              onModuleClick={(moduleId) => {
                console.log("CourseViewer received module click:", moduleId);

                // Handle different click types based on moduleId format

                // 1. Handle system blocks (-system- in id)
                if (moduleId.includes("-system-")) {
                  console.log("System block clicked:", moduleId);
                  // This is a system block with special animation handlers
                  if (selectedSection !== moduleId) {
                    setSelectedSection(moduleId);
                  } else {
                    setSelectedSection(null);
                  }
                  return;
                }

                // 2. Handle sections with display keys (-col or -systems in id)
                if (
                  moduleId.includes("-col") ||
                  moduleId.includes("-systems")
                ) {
                  console.log("Section with display key clicked:", moduleId);
                  // This is a displayKey - extract the base section ID
                  const baseSectionId = moduleId.split("-")[0];
                  handleSectionClick(baseSectionId);
                  return;
                }

                // 3. Handle main section blocks
                const mainSectionIds = [
                  "basic_theory",
                  "advanced_theory",
                  "upskiller_authentic_research_writer",
                  "upskiller_shorts_ready_videographer",
                  "upskiller_vertical_video_editors",
                  "pr_authority",
                  "delegation",
                  "monetisation",
                  "conversion",
                ];

                if (
                  moduleId.includes("section") ||
                  mainSectionIds.includes(moduleId)
                ) {
                  console.log("Main section clicked:", moduleId);
                  // This is a section - toggle selection
                  handleSectionClick(moduleId);
                  return;
                }

                // 4. If we reach here, this is a regular module - show modal
                console.log("Module clicked, showing modal for:", moduleId);
                handleModuleClick(moduleId);
              }}
            />
          </div>
        </div>

        <div className="text-center mt-16 md:mt-24 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-theme-gradient-card rounded-[var(--border-radius-lg)] p-6 shadow-theme-sm flex flex-col items-center hover-bubbly">
              <div className="w-12 h-12 rounded-full bg-theme-gradient-primary flex items-center justify-center mb-4 shadow-theme-sm">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-theme-primary text-xl font-medium mb-2">
                178+ Modules
              </h3>
              <p className="text-theme-secondary text-sm">
                Everything you need to master short-form content
              </p>
            </div>

            <div className="bg-theme-gradient-card rounded-[var(--border-radius-lg)] p-6 shadow-theme-sm flex flex-col items-center hover-bubbly">
              <div className="w-12 h-12 rounded-full bg-theme-gradient-secondary flex items-center justify-center mb-4 shadow-theme-sm">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-theme-primary text-xl font-medium mb-2">
                Proven System
              </h3>
              <p className="text-theme-secondary text-sm">
                The same techniques used by top creators
              </p>
            </div>

            <div className="bg-theme-gradient-card rounded-[var(--border-radius-lg)] p-6 shadow-theme-sm flex flex-col items-center hover-bubbly">
              <div className="w-12 h-12 rounded-full bg-theme-gradient-accent flex items-center justify-center mb-4 shadow-theme-sm">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-theme-primary text-xl font-medium mb-2">
                Lifetime Access
              </h3>
              <p className="text-theme-secondary text-sm">
                Including all future updates and expansions
              </p>
            </div>
          </div>

          <button
            className="cta-button bg-theme-gradient-primary
                     text-white px-8 py-4 rounded-[var(--border-radius-full)]
                     shadow-theme-sm
                     transition-all duration-[var(--theme-transition-bounce)]
                     hover-bubbly-lg
                     hover:shadow-theme-md
                     text-lg font-medium"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>

      {/* Submodule modal is now handled by ModuleHUD */}
    </VSSection>
  );
};
