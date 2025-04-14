import React, { useRef, useEffect } from 'react';
import { getTeamMemberHalftone, getTeamImageCollection } from "../../utils/imageMap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TeamParallaxSection() {
  // Main container ref
  const containerRef = useRef<HTMLDivElement>(null);
  
  // GSAP ScrollTrigger for team photos and section tracking
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Store all ScrollTrigger instances for cleanup
    const triggers = [];
    
    // Create separate context for our animations to prevent conflicts
    const teamParallaxContext = gsap.context(() => {
      // Apply parallax to each team member section to track which section is active
      document.querySelectorAll('.team-member-section').forEach((section, sectionIndex) => {
        // Get the corresponding team photo layer
        const photoLayer = document.getElementById(`member-photos-${sectionIndex}`);
        if (!photoLayer) return;
        
        // Set up a ScrollTrigger to control the visibility of team photos
        // based on which team member section is in view
        const sectionTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top 60%", // When section is 60% in view
          end: "bottom 40%", // Until section is 40% out of view
          id: `section-visibility-${sectionIndex}`,
          onEnter: () => {
            // Show this member's photos, hide others
            document.querySelectorAll('.team-photos-layer').forEach(layer => {
              layer.style.opacity = layer.dataset.memberIndex === sectionIndex.toString() ? '1' : '0';
            });
          },
          onEnterBack: () => {
            // When scrolling back up into this section
            document.querySelectorAll('.team-photos-layer').forEach(layer => {
              layer.style.opacity = layer.dataset.memberIndex === sectionIndex.toString() ? '1' : '0';
            });
          }
        });
        
        triggers.push(sectionTrigger);
        
        // Create a timeline for halftone image parallax only
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom", // Start when top of section reaches bottom of viewport
            end: "bottom top",   // End when bottom of section leaves top of viewport
            scrub: 0.5,          // Smooth scrubbing effect (0.5 second lag)
            id: `section-parallax-${sectionIndex}`,
            invalidateOnRefresh: true,
          }
        });
        
        // Store this trigger for cleanup
        triggers.push(ScrollTrigger.getById(`section-parallax-${sectionIndex}`));
        
        // Animate halftone images with basic parallax
        section.querySelectorAll('.halftone-image').forEach(element => {
          const speed = parseFloat(element.dataset.speed || '0.85');
          const direction = -1; // Halftone images always move opposite direction
          
          // Regular parallax for halftone elements
          const yPercent = (1 - speed) * 50 * direction;
          
          // Add to timeline - animate based on scroll position
          tl.to(element, {
            yPercent: yPercent,
            ease: "none",
          }, 0); // Start at the beginning of the timeline
        });
      });
      
      // Create a separate global timeline for all floating team images
      // This works because they're now fixed position relative to the viewport
      const photosTl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top", 
          end: "bottom bottom",
          scrub: 0.7,
          id: "floating-images-timeline",
          invalidateOnRefresh: true,
        }
      });
      
      // Store this trigger for cleanup
      triggers.push(ScrollTrigger.getById("floating-images-timeline"));
      
      // Get all floating team images across all team members
      document.querySelectorAll('.floating-team-image').forEach((img, index) => {
        // Extract data for animation
        const speed = parseFloat(img.dataset.speed || '0.9');
        const rotation = parseFloat(img.dataset.rotate || '0');
        
        // Calculate movement based on speed
        // Higher speeds (closer to 1.0) create more dramatic falling effect
        const verticalMovement = speed * 300; // Much more pronounced vertical movement
        const horizontalMovement = ((index % 3) - 1) * 20; // Some horizontal drift
        
        // Add to the global timeline
        photosTl.to(img, {
          y: verticalMovement,
          x: horizontalMovement, 
          rotation: rotation,
          ease: "none",
        }, 0); // All start at the beginning of the timeline
      });
    });
    
    // Cleanup function
    return () => {
      // Kill all ScrollTriggers we created
      triggers.forEach(trigger => {
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
      beliefs: "He strongly believes that creativity, humour and intelligence is the core of all good content, and wants to use short form to educate and hire young creatives struggling in the UK's underfunded and frankly under-appreciated creative economy.",
      likes: "long boring films in a language that doesn't exist (french) grindset influencers, web design — he literally made this entire website himself",
      dislikes: "long walks on the beach, meal deals, people not buying the vertical shortcut",
      quote: "\"his preferred order is 20 spicy wings and a strawberry miranda\" - his local boss man",
      // Get halftone image for the main display
      halftoneImage: getTeamMemberHalftone('Joden') || "/src/assets/main/Meet_The_Team-webp/Joden/Joden-Halftone.webp",
      // Get dynamic collection of team images
      teamImages: getTeamImageCollection('Joden', { limit: 15 })
    },
    {
      name: "Alex O'Connor",
      title: "Co-Founder and MD",
      bio: "Alex O'Connor is the Co-Founder and Managing Director at Clash Creation. He is the king of startups, with years of experience in organic marketing and management that he uses to keep us all getting paid. Plus he's got the gift of the gab which he uses to schmooz new clients and distract everyone in the office.",
      beliefs: "",
      likes: "networking, networthing, gut health",
      dislikes: "ketchup, fizzy drinks and you (unless you buy the vertical shortcut)",
      quote: "\"he's actually pretty sound\" - his number one opp",
      halftoneImage: getTeamMemberHalftone('Alex') || "/src/assets/main/Meet_The_Team-webp/Alex/Alex-Halftone.webp",
      teamImages: getTeamImageCollection('Alex', { limit: 15 })
    },
    {
      name: "Tia Warner",
      title: "Strategist, Writer and Researcher",
      bio: "Tia is the content strategist, writer and researcher at Clash Creation. She has a masters in AI, and uses it to criticise people who use it to write lazy copy. Her experience in newsletters make her a research and writing master. But her addiction to TikTok is probably what actually makes her good at writing short form.",
      beliefs: "",
      likes: "cooking 10/10 dinners, eating said 10/10 dinners and 'writing' her sci-fi book",
      dislikes: "people asking how the book is going, people who don't buy the vertical shortcut",
      quote: "\"A veritable genius\" - an anonymous source close to Tia",
      halftoneImage: getTeamMemberHalftone('Tia') || "/src/assets/main/Meet_The_Team-webp/Tia/Tia-Halftone.webp",
      teamImages: getTeamImageCollection('Tia', { limit: 15 })
    },
    {
      name: "Aydan Banks",
      title: "Video Producer",
      bio: "Aydan Banks is the Video Producer at Clash Creation. His career as a writer and producer in TV made him an expert at producing 10/10 videos. It also taught him that TV is a dying industry, and that short form is the most exciting and innovative space for young creatives to work in. He has his own successful TikTok account that focusses on high-brow political critique and low-brow comedy.",
      beliefs: "",
      likes: "stand up (when it goes well), small hats, lime bikes",
      dislikes: "standup (when it goes badly), matt hancock, when people don't by the vertical short cut",
      quote: "\"he knows all the secrets of the london underground\" - a high level TV exec (did you know he used to work in TV)",
      halftoneImage: getTeamMemberHalftone('Aydan') || "/src/assets/main/Meet_The_Team-webp/Aydan/Aydan-Halftone.webp",
      teamImages: getTeamImageCollection('Aydan', { limit: 15 })
    }
  ];

  return (
    <>
      <style jsx global>{`
        /* Custom styles for team section */
        .floating-element {
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-team-image {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, opacity 0.3s ease-out, z-index 0s;
        }
        
        /* Enhanced hover effect - brings images into focus */
        .floating-team-image:hover {
          transform: scale(1.1) rotate(0deg) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
          z-index: 50 !important; /* Ensure hovered image is on top */
          opacity: 1 !important; /* Full opacity on hover */
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-15px) rotate(var(--rotation, 0deg)); }
          100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
        }
        
        /* Add a subtle transition to parallax elements for smoother movement */
        .halftone-image, .floating-team-image {
          will-change: transform;
          transition: transform 0.2s ease-out, opacity 0.2s ease-out;
          filter: brightness(0.95); /* Slightly dimmed by default */
        }
        
        /* Brighten on hover */
        .floating-team-image:hover img {
          filter: brightness(1.1) contrast(1.05); /* Pop effect on hover */
        }
      `}</style>
      
      {/* Non-section container for all team photos to ensure they're not constrained */}
      <div className="team-photos-container fixed inset-0 w-screen h-screen overflow-visible pointer-events-none z-5">
        {/* Container for each team member's photos */}
        {teamMembers.map((member, memberIndex) => (
          <div 
            key={`member-photos-${memberIndex}`}
            id={`member-photos-${memberIndex}`}
            className={`team-photos-layer absolute inset-0 w-full h-full overflow-visible ${
              memberIndex === 0 ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}
            data-member-index={memberIndex}
          >
            {/* Render all dynamically loaded team images for this member */}
            {member.teamImages.map((img, imgIndex) => (
              <div
                key={`team-img-${memberIndex}-${imgIndex}`}
                className="fixed floating-team-image shadow-[var(--theme-shadow-md)] overflow-hidden hover:z-50 pointer-events-auto"
                style={{
                  width: `${180 + (img.scale * 120)}px`, // Varied sizes based on scale
                  // Let height be determined by aspect ratio
                  opacity: img.opacity * 0.9, // Slightly reduced base opacity  
                  borderRadius: `${8 + (Math.random() * 8)}px`, // Slight variation in corners
                  top: `${img.position.top}vh`, // Use vh units for viewport-based positioning
                  left: `${img.position.left}vw`, // Use vw units for viewport-based positioning
                  transform: `rotate(${img.position.rotate}deg)`, // Use full rotation for more dynamic feel
                  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out, z-index 0s, opacity 0.5s ease',
                  zIndex: img.zIndex,
                }}
                data-rotate={img.position.rotate} // Full rotation for dynamic effect
                data-speed={img.speed} // Use calculated speed from imageMap for varying "falling" speeds
                data-direction={img.direction}
                data-member-index={memberIndex}
              >
                <img 
                  src={img.url} 
                  alt={`${member.name} team moment ${imgIndex + 1}`}
                  className="w-full object-contain" // Use object-contain to preserve aspect ratio
                  style={{ maxHeight: `${320 + (img.scale * 80)}px` }} // Control max height for aspect ratio
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="team-section-container relative" ref={containerRef}>
      
      {/* Header section */}
      <section className="team-section-heading text-center py-16 min-h-screen flex flex-col justify-center bg-[var(--theme-bg-primary)]">
        {/* Floating background elements */}
        <div className="absolute top-20 left-1/4 w-20 h-20 rounded-[40%] rotate-12 opacity-5 
                     bg-[var(--theme-float-bg-primary)] floating-element hidden md:block dark:hidden"></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 rounded-[30%] -rotate-6 opacity-8 
                     bg-[var(--theme-float-bg-secondary)] floating-element hidden md:block dark:hidden"></div>
        
        {/* Dark mode floating elements */}
        <div className="absolute top-20 left-1/4 w-20 h-20 rounded-[40%] rotate-12 opacity-10
                     bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)]
                     floating-element hidden md:dark:block"></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 rounded-[30%] -rotate-6 opacity-15
                     bg-gradient-to-r from-[var(--theme-accent-secondary)] to-[var(--theme-accent-secondary-hover)]
                     floating-element hidden md:dark:block"></div>
                 
        <h2 className="intro-heading text-[var(--theme-text-primary)] text-4xl md:text-5xl font-bold mb-4 relative z-20">
          So who are we?
        </h2>
        <div className="max-w-3xl mx-auto">
          <h3 className="intro-heading text-[var(--theme-text-primary)] text-2xl md:text-3xl font-medium mb-4 relative z-20">
            Why trust us?
          </h3>
          <p className="intro-text text-[var(--theme-text-secondary)] text-lg md:text-xl mb-6 relative z-20">
            We're not just a guy in a room. We're a team of creatives, who just happen to be f*cking great at making content. 
            It's why we're the number one short form agency in the world, and luckily for you we specialise in getting founders like yourself, millions of views.
          </p>
          <h3 className="intro-heading text-[var(--theme-text-primary)] text-2xl md:text-3xl font-bold mt-6 mb-4 relative z-20">
            Meet the team
          </h3>
        </div>
      </section>
      
      {/* Team member sections - each is a full viewport height - NO FLOATING IMAGES HERE ANYMORE */}
      {teamMembers.map((member, index) => (
        <section 
          key={member.name}
          id={`team-member-${index}`}
          className={`team-member-section min-h-screen flex items-center py-10 relative
                     ${index % 2 === 0 ? 'bg-[var(--theme-bg-primary)]' : 'bg-[var(--theme-bg-secondary)]'}`}
          data-member-section-index={index}
        >
          {/* Background floating elements */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={`float-${i}`}
              className="absolute floating-element rounded-full opacity-5 dark:opacity-10"
              style={{
                width: `${(i + 2) * 2}rem`,
                height: `${(i + 2) * 2}rem`,
                top: `${(i * 10) + 15}%`,
                left: i % 2 === 0 ? `${(i * 10) + 15}%` : `${70 - (i * 8)}%`,
                transform: `rotate(${i * 4}deg)`,
                background: i % 3 === 0 
                  ? 'var(--theme-float-bg-primary)' 
                  : i % 3 === 1 
                    ? 'var(--theme-float-bg-secondary)' 
                    : 'var(--theme-accent-secondary)'
              }}
            />
          ))}
          
          {/* Content container */}
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Image container */}
              <div className={`member-image-container relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative min-h-[400px] lg:min-h-[500px] flex justify-center">
                  {/* Halftone image that peeks from the bottom of the section */}
                  <div className="absolute bottom-[-20%] w-full h-[150%] flex items-end justify-center overflow-visible">
                    <img 
                      src={member.halftoneImage} 
                      alt={member.name} 
                      className="halftone-image h-full w-auto max-w-none object-contain drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 20px 15px rgba(0, 0, 0, 0.3))',
                        zIndex: 5
                      }}
                      data-speed="0.85"
                    />
                  </div>
                  
                  {/* Quote overlay */}
                  <div 
                    className={`member-quote absolute z-30 ${
                      index % 2 === 0 
                        ? 'bottom-10 right-6 lg:bottom-12 lg:right-8' 
                        : 'bottom-10 left-6 lg:bottom-12 lg:left-8'
                    } max-w-[85%] lg:max-w-[65%]`}
                  >
                    <div className="bg-[var(--theme-bg-card)] bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-[var(--theme-shadow-md)] border border-[var(--theme-border-light)]">
                      <p className="text-[var(--theme-text-primary)] italic text-base">{member.quote}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content - has z-index of 100, much higher than all images with backdrop for readability */}
              <div className={`member-content space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''} relative z-100 p-6 rounded-lg backdrop-blur-sm bg-theme-bg-surface/20 shadow-theme-md`}>
                <h3 className="text-[var(--theme-text-primary)] text-4xl font-bold">{member.name}</h3>
                <p className="text-[var(--theme-primary)] text-xl font-medium">{member.title}</p>
                <div className="space-y-6">
                  <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed">{member.bio}</p>
                  {member.beliefs && (
                    <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed">{member.beliefs}</p>
                  )}
                  
                  <div className="pt-4 space-y-5">
                    <div className="member-detail rounded-lg bg-[var(--theme-bg-surface)]/30 backdrop-blur-sm p-4 border border-[var(--theme-border-light)]">
                      <span className="text-[var(--theme-text-primary)] font-medium block mb-1">likes:</span> 
                      <span className="text-[var(--theme-text-secondary)]">{member.likes}</span>
                    </div>
                    <div className="member-detail rounded-lg bg-[var(--theme-bg-surface)]/30 backdrop-blur-sm p-4 border border-[var(--theme-border-light)]">
                      <span className="text-[var(--theme-text-primary)] font-medium block mb-1">dislikes:</span> 
                      <span className="text-[var(--theme-text-secondary)]">{member.dislikes}</span>
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