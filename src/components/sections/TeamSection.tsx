import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Team section with static content and moving viewports
const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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
      accentColor: "text-[var(--theme-team-joden-accent)]",
      position: 0
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
      accentColor: "text-[var(--theme-team-alex-accent)]",
      position: 25
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
      accentColor: "text-[var(--theme-team-tia-accent)]",
      position: 50 
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
      accentColor: "text-[var(--theme-team-aydan-accent)]",
      position: 75
    }
  ];
  
  return (
    <div ref={sectionRef} className="team-section bg-theme-bg-primary">
      {/* Section heading */}
      <div className="container mx-auto pt-16 pb-8 px-4">
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
      
      {/* Team container - desktop - STATIC CONTENT WITH MOVING VIEWPORTS */}
      <div className="hidden md:flex h-screen">
        {/* FIXED POSITION TEAM MEMBERS - THE ACTUAL CONTENT NEVER MOVES */}
        <div className="fixed inset-0 w-screen h-screen">
          {teamData.map((member, index) => (
            <div 
              key={`content-${member.name}`}
              className="absolute inset-0 w-full h-full"
              style={{ 
                zIndex: activeIndex === index ? 10 : 1, 
                opacity: activeIndex === null ? (index === 0 ? 1 : 0) : (activeIndex === index ? 1 : 0),
                transition: 'opacity 0.3s ease-in-out, z-index 0.3s',
                background: member.bgColor.replace('bg-', '') 
              }}
            >
              {/* Fixed content - NEVER MOVES */}
              <div className="relative w-full h-full">
                {/* Background elements */}
                <div className="absolute top-[10%] left-[15%] w-36 h-36 rounded-[40%] opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] rotate-12 animate-float-slow"></div>
                <div className="absolute bottom-[15%] right-[10%] w-48 h-48 rounded-[40%] opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)] rotate-[-8deg] animate-float-medium"></div>
                <div className="absolute top-[60%] right-[20%] w-24 h-24 rounded-[45%] opacity-[var(--theme-float-opacity)] bg-[var(--theme-primary)] rotate-[22deg] animate-float-medium"></div>
                <div className="absolute bottom-[60%] left-[25%] w-16 h-16 rounded-[35%] opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-accent)] rotate-[-15deg] animate-float-slow"></div>
                
                {/* Main content - this is FIXED and never moves */}
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  <div className="container mx-auto px-8 py-12 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                      {/* Left column with image */}
                      <div className="lg:w-1/3 flex-shrink-0">
                        <div className="relative">
                          <img
                            src={member.images.main.cutout}
                            alt={member.name}
                            className="w-[300px] mx-auto object-contain"
                          />
                          {member.images.secondary && (
                            <img
                              src={member.images.secondary.cutout}
                              alt={`${member.name} secondary`}
                              className="absolute -bottom-10 -right-0 w-[180px] opacity-80"
                            />
                          )}
                        </div>
                      </div>
                      
                      {/* Right column with content */}
                      <div className="lg:w-2/3">
                        <div className="mb-8">
                          <h2 className="text-4xl lg:text-5xl font-bold text-theme-text-primary">{member.name}</h2>
                          <h3 className={`text-2xl ${member.accentColor} mt-2`}>{member.title}</h3>
                        </div>
                        
                        <div className="bg-theme-bg-surface/90 backdrop-blur-md p-6 rounded-md shadow-theme-md mb-6">
                          <p className="text-theme-text-primary text-lg leading-relaxed">{member.bio}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Quote */}
                          <div className="bg-theme-bg-surface/80 backdrop-blur-md p-6 rounded-md shadow-theme-sm" 
                               style={{ borderLeft: `4px solid var(--theme-team-${member.name.split(' ')[0].toLowerCase()}-accent)` }}>
                            <p className="italic text-theme-text-primary">&ldquo;{member.quote}&rdquo;</p>
                            <p className="text-theme-text-tertiary text-right mt-2">- {member.quoteAuthor}</p>
                          </div>
                          
                          {/* Likes/Dislikes */}
                          <div className="bg-theme-bg-surface/80 backdrop-blur-md p-6 rounded-md shadow-theme-sm">
                            <div className="mb-4">
                              <h4 className={`text-lg font-medium mb-2 ${member.accentColor}`}>Likes:</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {member.likes.map((item, i) => (
                                  <li key={i} className="text-theme-text-primary">{item}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium mb-2 text-theme-accent-tertiary">Dislikes:</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {member.dislikes.map((item, i) => (
                                  <li key={i} className="text-theme-text-primary">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* THE VIEWPORT WINDOWS - these expand and contract */}
        <div className="relative w-full h-full flex z-20">
          {teamData.map((member, index) => (
            <div
              key={`viewport-${member.name}`}
              className="h-full border-r border-theme-border-light last:border-0 overflow-hidden transition-all duration-500 relative z-30"
              style={{ 
                width: activeIndex === index ? '100%' : '25%',
                transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Only show name overlay when not expanded */}
              {activeIndex !== index && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden">
                      <img 
                        src={member.images.main.cutout} 
                        alt={member.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-white text-lg">{member.title}</p>
                    <div className="mt-4 text-white text-opacity-70 text-sm">
                      Hover to expand
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile version - stacked cards with theme-aware styling */}
      <div className="md:hidden space-y-8 px-4 pb-16">
        {teamData.map((member, index) => (
          <div 
            key={member.name}
            className={`p-6 rounded-lg shadow-theme-md relative overflow-hidden transition-all duration-500 ease-in-out ${activeIndex !== index ? 'hover-bubbly' : ''}`}
            style={{ 
              background: member.bgColor.replace('bg-', ''),
              transform: activeIndex === index ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: activeIndex === index ? 
                        `0 15px 30px rgba(0, 0, 0, 0.12), 0 0 20px var(--theme-team-${member.name.split(' ')[0].toLowerCase()}-accent)` : 
                        'var(--theme-shadow-md)'
            }}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {/* Floating elements for visual interest */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-[40%] opacity-[var(--theme-float-opacity)] bg-theme-float-bg-primary rotate-12 animate-float-slow"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-[40%] opacity-[var(--theme-float-opacity-secondary)] bg-theme-float-bg-secondary rotate-[-8deg] animate-float-medium"></div>
            
            {/* Content with theme-aware styling */}
            <div className="relative">
              <h2 className="text-2xl font-bold text-theme-text-primary mb-1">{member.name}</h2>
              <h3 className={`text-lg ${member.accentColor} mb-4`}>{member.title}</h3>
              
              <div className="flex justify-center mb-6">
                <img 
                  src={member.images.main.cutout} 
                  alt={member.name}
                  className="h-[200px] object-contain"
                />
              </div>
              
              <div className="bg-theme-bg-surface/90 backdrop-blur-md p-4 mb-4 shadow-theme-sm">
                <p className="text-theme-text-primary">{member.bio}</p>
              </div>
              
              <div 
                className="bg-theme-bg-surface/90 backdrop-blur-md p-4 shadow-theme-sm"
                style={{ 
                  borderLeft: `4px solid var(--theme-team-${member.name.split(' ')[0].toLowerCase()}-accent)` 
                }}
              >
                <p className="italic text-theme-text-primary">&ldquo;{member.quote}&rdquo;</p>
                <p className="text-theme-text-tertiary text-right mt-2">- {member.quoteAuthor}</p>
              </div>
              
              {/* Show likes/dislikes only when clicked (mobile) */}
              {activeIndex === index && (
                <div className="bg-theme-bg-surface/90 backdrop-blur-md p-4 mt-4 shadow-theme-sm animate-fadeIn">
                  <div className="mb-4">
                    <h4 className={`text-lg font-medium mb-2 ${member.accentColor}`}>Likes:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {member.likes.map((item, i) => (
                        <li key={i} className="text-theme-text-primary">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2 text-theme-accent-tertiary">Dislikes:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {member.dislikes.map((item, i) => (
                        <li key={i} className="text-theme-text-primary">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Click indicator for mobile */}
              {activeIndex !== index && (
                <div className="mt-4 text-center text-theme-text-secondary text-sm">
                  <span>Tap to see more</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;