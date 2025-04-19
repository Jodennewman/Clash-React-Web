import React, { useRef, useEffect } from "react";
import {
  getTeamMemberHalftone,
  getTeamImageCollection,
} from "../../utils/imageMap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TeamParallaxSection() {
  // Main container ref
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger parallax - smooth and optimized
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Store all ScrollTrigger instances for cleanup
    const triggers: Array<ScrollTrigger | undefined> = [];

    // Create separate context for our animations to prevent conflicts
    const teamParallaxContext = gsap.context(() => {
      // Apply parallax to each team member section
      document
        .querySelectorAll(".team-member-section")
        .forEach((section, sectionIndex) => {
          // Create a timeline for this section
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom", // Start when top of section reaches bottom of viewport
              end: "bottom top", // End when bottom of section leaves top of viewport
              scrub: 0.5, // Smooth scrubbing effect (0.5 second lag)
              // markers: true,    // For debugging - remove in production
              id: `section-${sectionIndex}`,
              invalidateOnRefresh: true,
            },
          });

          // Store the trigger for cleanup
          triggers.push(ScrollTrigger.getById(`section-${sectionIndex}`));

          // Find all parallax elements in this section with data-speed
          const parallaxElements =
            section.querySelectorAll<HTMLElement>("[data-speed]");

          // Add each element to the timeline with its own speed
          parallaxElements.forEach((element) => {
            const speed = parseFloat(element.dataset.speed || "0.85");
            const direction = element.classList.contains("halftone-image")
              ? -1
              : 1;

            // If this is a floating team image, apply enhanced movement for falling effect
            if (element.classList.contains("floating-team-image")) {
              // Get custom speed and create more pronounced vertical movement
              // Higher speed = faster falling
              const verticalMovement = speed * 80 * direction; // Much more vertical movement
              const horizontalMovement = Math.random() * 20 - 10; // Small random horizontal drift

              // Add to timeline - animate based on scroll position
              tl.to(
                element,
                {
                  y: verticalMovement,
                  x: horizontalMovement,
                  ease: "none",
                },
                0,
              );
            } else {
              // Regular parallax for other elements (like halftone)
              const yPercent = (1 - speed) * 50 * direction;

              // Add to timeline - animate based on scroll position
              tl.to(
                element,
                {
                  yPercent: yPercent,
                  ease: "none",
                },
                0,
              ); // Start at the beginning of the timeline
            }
          });
        });

      // Additional animations can be re‑added here if needed
    }); // <-- close team-member-section forEach

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers we created
      triggers.forEach((trigger) => {
        if (trigger) trigger.kill(false);
      });

      // Clear the GSAP context
      teamParallaxContext.revert();
    };
  }, []);

  // Team members data with dynamic image loading
  const teamMembers = [
    {
      name: "Joden Newman",
      title: "Founder and CEO",
      bio: "Joden Clash Newman is the Founder and CEO at Clash Creation (yes Clash is literally his middle name). He started building content for founders over 3 years ago (and did very, very well). So decided to grow his own platform, reached millions of views and followers in only 3 months, and used that money to start his own company. This one.",
      beliefs:
        "He strongly believes that creativity, humour and intelligence is the core of all good content, and wants to use short form to educate and hire young creatives struggling in the UK's underfunded and frankly under-appreciated creative economy.",
      likes:
        "long boring films in a language that doesn't exist (french) grindset influencers, web design — he literally made this entire website himself",
      dislikes:
        "long walks on the beach, meal deals, people not buying the vertical shortcut",
      quote:
        '"his preferred order is 20 spicy wings and a strawberry miranda" - his local boss man',
      // Get halftone image for the main display
      halftoneImage:
        getTeamMemberHalftone("Joden") ||
        "/src/assets/main/Meet_The_Team-webp/Joden/Joden-Halftone.webp",
      // Get dynamic collection of team images
      teamImages: getTeamImageCollection("Joden", {
        limit: 4,
        includeShared: false,
        randomize: false,
      }),
    },
    {
      name: "Alex O'Connor",
      title: "Co-Founder and MD",
      bio: "Alex O'Connor is the Co-Founder and Managing Director at Clash Creation. He is the king of startups, with years of experience in organic marketing and management that he uses to keep us all getting paid. Plus he's got the gift of the gab which he uses to schmooz new clients and distract everyone in the office.",
      beliefs: "",
      likes: "Networking, Networthing, Gut health",
      dislikes:
        "ketchup, fizzy drinks and you (unless you buy the vertical shortcut)",
      quote: '"he\'s actually pretty sound" - his number one opp',
      halftoneImage:
        getTeamMemberHalftone("Alex") ||
        "/src/assets/main/Meet_The_Team-webp/Alex/Alex-Halftone.webp",
      teamImages: getTeamImageCollection("Alex", {
        limit: 4,
        includeShared: false,
        randomize: false,
      }),
    },
    {
      name: "Tia Warner",
      title: "Strategist, Writer and Researcher",
      bio: "Tia is the content strategist, writer and researcher at Clash Creation. She has a masters in AI, and uses it to criticise people who use it to write lazy copy. Her experience in newsletters make her a research and writing master. But her addiction to TikTok is probably what actually makes her good at writing short form.",
      beliefs: "",
      likes:
        "cooking 10/10 dinners, eating said 10/10 dinners and 'writing' her sci-fi book",
      dislikes:
        "people asking how the book is going, people who don't buy the vertical shortcut",
      quote: '"A veritable genius" - an anonymous source close to Tia',
      halftoneImage:
        getTeamMemberHalftone("Tia") ||
        "/src/assets/main/Meet_The_Team-webp/Tia/Tia-Halftone.webp",
      teamImages: getTeamImageCollection("Tia", {
        limit: 4,
        includeShared: false,
        randomize: false,
      }),
    },
    {
      name: "Aydan Banks",
      title: "Video Producer",
      bio: "Aydan Banks is the Video Producer at Clash Creation. His career as a writer and producer in TV made him an expert at producing 10/10 videos. It also taught him that TV is a dying industry, and that short form is the most exciting and innovative space for young creatives to work in. He has his own successful TikTok account that focusses on high-brow political critique and low-brow comedy.",
      beliefs: "",
      likes: "stand up (when it goes well), small hats, lime bikes",
      dislikes:
        "standup (when it goes badly), matt hancock, when people don't by the vertical short cut",
      quote:
        '"he knows all the secrets of the london underground" - a high level TV exec (did you know he used to work in TV)',
      halftoneImage:
        getTeamMemberHalftone("Aydan") ||
        "/src/assets/main/Meet_The_Team-webp/Aydan/Aydan-Halftone.webp",
      teamImages: getTeamImageCollection("Aydan", {
        limit: 4,
        includeShared: false,
        randomize: false,
      }),
    },
  ];

  return (
    <>
      <style jsx global>{`
        /* Custom styles for team section */
        .floating-element {
          animation: float 8s ease-in-out infinite;
        }

        .floating-team-image {
          transition:
            transform 0.3s ease-out,
            box-shadow 0.3s ease-out,
            opacity 0.3s ease-out,
            z-index 0s;
        }

        /* Enhanced hover effect - brings images into focus */
        .floating-team-image:hover {
          transform: scale(1.1) rotate(0deg) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
          z-index: 50 !important; /* Ensure hovered image is on top */
          opacity: 1 !important; /* Full opacity on hover */
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotation, 0deg));
          }
          100% {
            transform: translateY(0px) rotate(var(--rotation, 0deg));
          }
        }

        /* Add a subtle transition to parallax elements for smoother movement */
        .halftone-image,
        .floating-team-image {
          will-change: transform;
          transition:
            transform 0.2s ease-out,
            opacity 0.2s ease-out;
          filter: brightness(0.95); /* Slightly dimmed by default */
        }

        /* Brighten on hover */
        .floating-team-image:hover img {
          filter: brightness(1.1) contrast(1.05); /* Pop effect on hover */
        }
      `}</style>

      <div className="team-section-container relative" ref={containerRef}>
        {/* Header section */}
        <section className="team-section-heading text-center pt-0 pb-6 min-h-[50vh] flex flex-col justify-center bg-[var(--theme-bg-primary)]">
          {/* Floating background elements */}
          <div
            className="absolute top-20 left-1/4 w-20 h-20 rounded-[40%] rotate-12 opacity-5
                     bg-[var(--theme-float-bg-primary)] floating-element hidden md:block dark:hidden"
          ></div>
          <div
            className="absolute bottom-10 right-1/3 w-24 h-24 rounded-[30%] -rotate-6 opacity-8
                     bg-[var(--theme-float-bg-secondary)] floating-element hidden md:block dark:hidden"
          ></div>

          {/* Dark mode floating elements */}
          <div
            className="absolute top-20 left-1/4 w-20 h-20 rounded-[40%] rotate-12 opacity-10
                     bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)]
                     floating-element hidden md:dark:block"
          ></div>
          <div
            className="absolute bottom-10 right-1/3 w-24 h-24 rounded-[30%] -rotate-6 opacity-15
                     bg-gradient-to-r from-[var(--theme-accent-secondary)] to-[var(--theme-accent-secondary-hover)]
                     floating-element hidden md:dark:block"
          ></div>

          <h2 className="intro-heading text-[var(--theme-text-primary)] text-4xl md:text-5xl font-bold mb-4 relative z-10">
            So who are we?
          </h2>
          <div className="max-w-5xl mx-auto px-1">
            <h3 className="intro-heading text-[var(--theme-text-primary)] text-2xl md:text-3xl font-medium mb-4 relative z-10">
              Why trust us?
            </h3>
            <p className="intro-text text-[var(--theme-text-secondary)] text-lg md:text-xl lg:text-xl mb-6 relative z-10">
              We're not just a guy in a room. We're a team of creatives, who
              just happen to be f*cking great at making content. It's why we're
              the number one short form agency in the world, and luckily for you
              we specialise in getting founders like yourself, millions of
              views.
            </p>
          </div>
        </section>

        {/* Team member sections - each is a full viewport height */}
        {teamMembers.map((member, index) => (
          <section
            key={member.name}
            id={`team-member-${index}`}
            className={`team-member-section min-h-screen flex items-center py-10 relative overflow-hidden
                     ${index % 2 === 0 ? "bg-[var(--theme-bg-primary)]" : "bg-[var(--theme-bg-secondary)]"}`}
          >
            {/* Background floating elements */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`float-${i}`}
                className="absolute floating-element rounded-full opacity-5 dark:opacity-10"
                style={{
                  width: `${(i + 2) * 2}rem`,
                  height: `${(i + 2) * 2}rem`,
                  top: `${i * 10 + 15}%`,
                  left: i % 2 === 0 ? `${i * 10 + 15}%` : `${70 - i * 8}%`,
                  transform: `rotate(${i * 4}deg)`,
                  opacity: `${i * 0.2}`,
                  background:
                    i % 3 === 0
                      ? "theme-float-bg-primary"
                      : i % 3 === 1
                        ? "theme-float-bg-secondary"
                        : "theme-accent-secondary",
                }}
              />
            ))}

            {/* Floating team images - larger and with parallax data attributes */}
            <div className="team-images-wrapper absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
              {/* Render all dynamically loaded team images */}
              {member.teamImages.map((img, imgIndex) => (
                <div
                  key={`team-img-${imgIndex}`}
                  className="absolute floating-team-image shadow-[var(--theme-shadow-md)] overflow-hidden hover:z-20 pointer-events-auto"
                  style={{
                    width: `${180 + img.scale * 120}px`, // Varied sizes based on scale
                    // Let height be determined by aspect ratio
                    opacity: img.opacity, // Use strategic opacity from our imageMap adjustments
                    borderRadius: `${20 + Math.random() * 8}px`, // Slight variation in corners
                    top: `${img.position.top}%`,
                    left: `${img.position.left}%`,
                    transform: `rotate(${img.position.rotate / 50}deg)`, // Use full rotation for more dynamic feel
                    transition:
                      "transform 0.3s ease-out, box-shadow 0.3s ease-out, z-index 0s",
                    zIndex: img.zIndex,
                  }}
                  data-rotate={img.position.rotate} // Full rotation for dynamic effect
                  data-speed={img.speed} // Use calculated speed from imageMap for varying "falling" speeds
                  data-direction={img.direction}
                >
                  <img
                    src={img.url}
                    alt={`${member.name} team moment ${imgIndex + 1}`}
                    className="w-full object-contain" // Use object-contain to preserve aspect ratio
                    style={{ maxHeight: `${320 + img.scale * 80}px` }} // Control max height for aspect ratio
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Content container */}
            <div className="container mx-auto px-4">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image container */}
                <div
                  className={`member-image-container relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative min-h-[350px] lg:min-h-[450px] flex justify-center ">
                    {/* Halftone image that peeks from the bottom of the section */}
                    <div className="absolute bottom-[-25%] w-full h-[160%] flex items-end justify-center overflow-visible">
                      <img
                        src={member.halftoneImage}
                        alt={member.name}
                        className="halftone-image h-full w-auto max-w-none object-contain drop-shadow-2xl"
                        style={{
                          filter: "drop-shadow(0 20px 15px rgba(0, 0, 0, 0.3))",
                          zIndex: 5,
                          transform: "scale(1.2)",
                        }}
                        data-speed="0.9"
                      />
                    </div>

                    {/* Quote overlay with improved readability */}
                    <div
                      className={`member-quote absolute z-40 ${
                        index % 2 === 0
                          ? "bottom-10 right-6 lg:bottom-12 lg:right-8"
                          : "bottom-10 left-6 lg:bottom-12 lg:left-8"
                      } max-w-[85%] lg:max-w-[65%]`}
                    >
                      <div className="bg-[var(--theme-bg-card)] bg-opacity-95 backdrop-blur-lg p-5 md:p-6 rounded-xl shadow-[var(--theme-shadow-md)] border-2 border-[var(--theme-accent)]/20">
                        <p className="text-[var(--theme-text-primary)] italic text-base font-medium">
                          {member.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Gradient overlay for halftone transition */}

                {/* Content - with improved readability */}

              <div className={`member-content space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''} relative z-30`}>
                {/* Content card with background color matching the team member's halftone image */}
                <div className={`
                  ${index === 0 ? 'bg-gradient-to-br from-indigo-500/10 to-blue-500/10' : 
                    index === 1 ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10' : 
                    index === 2 ? 'bg-gradient-to-br from-rose-500/10 to-pink-500/10' : 
                    'bg-gradient-to-br from-emerald-500/10 to-teal-500/10'} 
                  bg-[var(--theme-bg-card)]/90 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-[var(--theme-shadow-md)] 
                  border-2 border-[var(--theme-border-light)]`}
                >
                  <h3 className="text-[var(--theme-text-primary)] text-4xl font-bold">{member.name}</h3>
                  <p className={`
                    ${index === 0 ? 'text-indigo-500 dark:text-indigo-400' : 
                      index === 1 ? 'text-amber-500 dark:text-amber-400' : 
                      index === 2 ? 'text-rose-500 dark:text-rose-400' : 
                      'text-emerald-500 dark:text-emerald-400'} 
                    text-xl font-medium mb-4`}
                  >
                    {member.title}
                  </p>
                  <div className="space-y-6">
                    <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed">{member.bio}</p>
                    {member.beliefs && (
                      <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed">{member.beliefs}</p>
                    )}

                    <div className="pt-4 space-y-5">
                      <div className="member-detail rounded-lg bg-[var(--theme-bg-surface)]/70 backdrop-blur-sm p-4 border border-[var(--theme-border-light)]">
                        <span className="text-[var(--theme-text-primary)] font-medium block mb-1">likes:</span>
                        <span className="text-[var(--theme-text-secondary)]">{member.likes}</span>
                      </div>
                      <div className="member-detail rounded-lg bg-[var(--theme-bg-surface)]/70 backdrop-blur-sm p-4 border border-[var(--theme-border-light)]">
                        <span className="text-[var(--theme-text-primary)] font-medium block mb-1">dislikes:</span>
                        <span className="text-[var(--theme-text-secondary)]">{member.dislikes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      </div>
    </>
  );
}
