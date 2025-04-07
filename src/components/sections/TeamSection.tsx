import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Team section with horizontal panels, each initially showing 25% width
const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Simple animation for section heading
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  // Team member data
  const teamData = [
    {
      name: "Joden Newman",
      title: "Founder and CEO",
      bio: "Joden Clash Newman is the Founder and CEO at Clash Creation (yes Clash is literally his middle name). He started building content for founders over 3 years ago (and did very, very well). So decided to grow his own platform, reached millions of views and followers in only 3 months, and used that money to start his own company. This one. He strongly believes that creativity, humour and intelligence is the core of all good content, and wants to use short form to educate and hire young creatives struggling in the UK's underfunded and frankly under-appreciated creative economy.",
      likes: ["long boring films in a language that doesn't exist (french)", "grindset influencers", "web design — he literally made this entire website himself"],
      dislikes: ["long walks on the beach", "meal deals", "people not buying the vertical shortcut"],
      quote: "his preferred order is 20 spicy wings and a strawberry miranda",
      quoteAuthor: "his local boss man",
      images: {
        main: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Joden/Joden-main1-nobg.webp"
        },
        secondary: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Joden/Joden-curt-nobg.webp"
        }
      },
      bgColor: "bg-[var(--theme-team-joden)]",
      accentColor: "text-[var(--theme-team-joden-accent)]"
    },
    {
      name: "Alex O'Connor",
      title: "Co-Founder and MD",
      bio: "Alex O'Connor is the Co-Founder and Managing Director at Clash Creation. He is the king of startups, with years of experience in organic marketing and management that he uses to keep us all getting paid. Plus he's got the gift of the gab which he uses to schmooz new clients and distract everyone in the office.",
      likes: ["networking", "networthing", "gut health"],
      dislikes: ["ketchup", "fizzy drinks", "you (unless you buy the vertical shortcut)"],
      quote: "he's actually pretty sound",
      quoteAuthor: "his number one opp",
      images: {
        main: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Alex/Alex-main-nobg.webp"
        },
        secondary: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Alex/Alex-laugh-nobg.webp"
        }
      },
      bgColor: "bg-[var(--theme-team-alex)]",
      accentColor: "text-[var(--theme-team-alex-accent)]"
    },
    {
      name: "Tia Warner",
      title: "Strategist, Writer and Researcher",
      bio: "Tia is the content strategist, writer and researcher at Clash Creation. She has a masters in AI, and uses it to criticise people who use it to write lazy copy. Her experience in newsletters make her a research and writing master. But her addiction to TikTok is probably what actually makes her good at writing short form.",
      likes: ["cooking 10/10 dinners", "eating said 10/10 dinners", "'writing' her sci-fi book"],
      dislikes: ["people asking how the book is going", "people who don't buy the vertical shortcut"],
      quote: "A veritable genius",
      quoteAuthor: "an anonymous source close to Tia",
      images: {
        main: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Tia/Tia-main-nobg.webp"
        },
        secondary: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Tia/Tia-Boat-nobg.webp"
        }
      },
      bgColor: "bg-[var(--theme-team-tia)]",
      accentColor: "text-[var(--theme-team-tia-accent)]"
    },
    {
      name: "Aydan Banks",
      title: "Video Producer",
      bio: "Aydan Banks is the Video Producer at Clash Creation. His career as a writer and producer in TV made him an expert at producing 10/10 videos. It also taught him that TV is a dying industry, and that short form is the most exciting and innovative space for young creatives to work in. He has his own successful TikTok account that focusses on high-brow political critique and low-brow comedy.",
      likes: ["stand up (when it goes well)", "small hats", "lime bikes"],
      dislikes: ["standup (when it goes badly)", "matt hancock", "when people don't buy the vertical shortcut"],
      quote: "he knows all the secrets of the london underground",
      quoteAuthor: "a high level TV exec (did you know he used to work in TV)",
      images: {
        main: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Aydan/Aydan-main-nobg.webp"
        },
        secondary: {
          cutout: "../../../assets/main/Meet_The_Team-webp/Aydan/Aydan-puppet-nobg.webp"
        }
      },
      bgColor: "bg-[var(--theme-team-aydan)]",
      accentColor: "text-[var(--theme-team-aydan-accent)]"
    }
  ];

  // Expand section on hover or click
  const handleSectionInteraction = (index: number) => {
    setActiveIndex(index);
  };

  // Reset on mouse leave
  const handleSectionLeave = () => {
    setActiveIndex(null);
  };

  // Animation for expanding/collapsing sections
  useEffect(() => {
    if (sectionRef.current) {
      const sections = Array.from(sectionRef.current.querySelectorAll('.team-section-panel'));
      
      sections.forEach((section, index) => {
        gsap.to(section, {
          width: activeIndex === index ? '100%' : '25%',
          duration: 0.7,
          ease: 'power2.out'
        });
      });

      // Fade in content for active section
      if (activeIndex !== null && contentRefs.current[activeIndex]) {
        gsap.fromTo(
          contentRefs.current[activeIndex],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.3 }
        );
      }
    }
  }, [activeIndex]);

  return (
    <div ref={sectionRef} className="team-section bg-theme-bg-primary py-16">
      {/* Section heading */}
      <div className="container mx-auto mb-16 px-4">
        <div ref={headingRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-6">
            Meet the Team
          </h2>
          
          <div className="max-w-3xl">
            <p className="text-xl text-theme-text-secondary mb-4">
              So who are we? Why trust us? We're not just a guy in a room. We're a team of creatives, who just happen to be f*cking great at making content.
            </p>
            
            <p className="text-xl text-theme-text-secondary">
              It's why we're the number one short form agency in the world, and luckily for you we specialise in getting founders like yourself, millions of views.
            </p>
          </div>
        </div>
      </div>
      
      {/* Desktop team panels - side by side with 25% width each */}
      <div className="hidden md:flex h-[680px] relative overflow-hidden">
        {teamData.map((member, index) => (
          <div
            key={`panel-${member.name}`}
            className={`team-section-panel ${member.bgColor} transition-all duration-700 ease-in-out overflow-hidden`}
            style={{
              width: activeIndex === index ? '100%' : '25%',
              zIndex: activeIndex === index ? 10 : 1,
              position: 'relative'
            }}
            onMouseEnter={() => handleSectionInteraction(index)}
            onMouseLeave={handleSectionLeave}
          >
            {/* Decorative floating elements */}
            <div className="absolute top-[10%] left-[15%] w-16 h-16 rounded-[40%] opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] rotate-12 animate-float-slow"></div>
            <div className="absolute bottom-[15%] right-[10%] w-24 h-24 rounded-[40%] opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)] rotate-[-8deg] animate-float-medium"></div>
            
            {/* Content container - fixed width to ensure proper layout across all states */}
            <div className="w-full h-full flex flex-col">
              {/* Always visible header */}
              <div className="px-8 py-6 flex items-center">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                    <img 
                      src={member.images.main.cutout} 
                      alt={member.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-theme-text-primary">{member.name}</h3>
                    <p className={`${member.accentColor}`}>{member.title}</p>
                  </div>
                </div>
              </div>
              
              {/* Expanded content */}
              <div 
                ref={el => contentRefs.current[index] = el}
                className={`flex-1 px-8 py-4 transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="container mx-auto">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column with image */}
                    <div className="lg:w-1/3 flex-shrink-0">
                      <div className="relative">
                        <img
                          src={member.images.main.cutout}
                          alt={member.name}
                          className="w-[280px] mx-auto object-contain"
                        />
                        {member.images.secondary && (
                          <img
                            src={member.images.secondary.cutout}
                            alt={`${member.name} secondary`}
                            className="absolute -bottom-10 -right-5 w-[160px] opacity-80"
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Right column with content */}
                    <div className="lg:w-2/3">
                      <div className="bg-[var(--theme-bg-surface)]/90 backdrop-blur-md p-6 rounded-md shadow-[var(--theme-shadow-md)] mb-6">
                        <p className="text-[var(--theme-text-primary)] text-lg leading-relaxed">{member.bio}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Quote */}
                        <div className="bg-[var(--theme-bg-surface)]/80 backdrop-blur-md p-6 rounded-md shadow-[var(--theme-shadow-sm)]" 
                             style={{ borderLeft: `4px solid var(--theme-team-${member.name.split(' ')[0].toLowerCase()}-accent)` }}>
                          <p className="italic text-[var(--theme-text-primary)]">&ldquo;{member.quote}&rdquo;</p>
                          <p className="text-[var(--theme-text-tertiary)] text-right mt-2">- {member.quoteAuthor}</p>
                        </div>
                        
                        {/* Likes/Dislikes */}
                        <div className="bg-[var(--theme-bg-surface)]/80 backdrop-blur-md p-6 rounded-md shadow-[var(--theme-shadow-sm)]">
                          <div className="mb-4">
                            <h4 className={`text-lg font-medium mb-2 ${member.accentColor}`}>Likes:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {member.likes.map((item, i) => (
                                <li key={i} className="text-[var(--theme-text-primary)]">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium mb-2 text-[var(--theme-accent-tertiary)]">Dislikes:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {member.dislikes.map((item, i) => (
                                <li key={i} className="text-[var(--theme-text-primary)]">{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsed state overlay - only visible when not active */}
              {activeIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[var(--theme-text-tertiary)] text-sm mt-2">
                      Hover to expand
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile version - stacked cards */}
      <div className="md:hidden space-y-8 px-4 pb-16">
        {teamData.map((member, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={member.name}
              className={`p-6 rounded-lg shadow-[var(--theme-shadow-md)] relative overflow-hidden transition-all duration-500 ease-in-out ${!isActive ? 'hover:translate-y-[-5px] hover:scale-[1.02]' : ''}`}
              style={{ 
                background: `var(--theme-team-${member.name.split(' ')[0].toLowerCase()})`,
                transform: isActive ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isActive ? 
                          `0 15px 30px rgba(0, 0, 0, 0.12), 0 0 20px var(--theme-team-${member.name.split(' ')[0].toLowerCase()}-accent)` : 
                          'var(--theme-shadow-md)'
              }}
              onClick={() => setActiveIndex(isActive ? null : index)}
            >
              {/* Floating elements for visual interest */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-[40%] opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] rotate-12 animate-float-slow"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-[40%] opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)] rotate-[-8deg] animate-float-medium"></div>
              
              {/* Content with theme-aware styling */}
              <div className="relative">
                <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-1">{member.name}</h2>
                <h3 className={`text-lg ${member.accentColor} mb-4`}>{member.title}</h3>
                
                <div className="flex justify-center mb-6">
                  <img 
                    src={member.images.main.cutout} 
                    alt={member.name}
                    className="h-[200px] object-contain"
                  />
                </div>
                
                <div className="bg-[var(--theme-bg-surface)]/90 backdrop-blur-md p-4 mb-4 shadow-[var(--theme-shadow-sm)]">
                  <p className="text-[var(--theme-text-primary)]">{member.bio}</p>
                </div>
                
                <div 
                  className="bg-[var(--theme-bg-surface)]/90 backdrop-blur-md p-4 shadow-[var(--theme-shadow-sm)]"
                  style={{ 
                    borderLeft: `4px solid var(--theme-team-${member.name.split(' ')[0].toLowerCase()}-accent)` 
                  }}
                >
                  <p className="italic text-[var(--theme-text-primary)]">&ldquo;{member.quote}&rdquo;</p>
                  <p className="text-[var(--theme-text-tertiary)] text-right mt-2">- {member.quoteAuthor}</p>
                </div>
                
                {/* Show likes/dislikes only when clicked (mobile) */}
                {isActive && (
                  <div className="bg-[var(--theme-bg-surface)]/90 backdrop-blur-md p-4 mt-4 shadow-[var(--theme-shadow-sm)] animate-fadeIn">
                    <div className="mb-4">
                      <h4 className={`text-lg font-medium mb-2 ${member.accentColor}`}>Likes:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {member.likes.map((item, i) => (
                          <li key={i} className="text-[var(--theme-text-primary)]">{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-[var(--theme-accent-tertiary)]">Dislikes:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {member.dislikes.map((item, i) => (
                          <li key={i} className="text-[var(--theme-text-primary)]">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Click indicator for mobile */}
                {!isActive && (
                  <div className="mt-4 text-center text-[var(--theme-text-secondary)] text-sm">
                    <span>Tap to see more</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSection;