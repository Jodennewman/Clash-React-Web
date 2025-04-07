import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Team section with stacked, cropped layers
const TeamSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  
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
      bgColor: "bg-gradient-to-b from-[var(--bg-cream)] to-[var(--bg-cream-darker)]",
      darkBgColor: "dark:bg-gradient-to-b dark:from-[var(--bg-navy)] dark:to-[var(--bg-navy-darker)]",
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
      bgColor: "bg-gradient-to-b from-[var(--bg-cream-darker)] to-[var(--bg-cream)]",
      darkBgColor: "dark:bg-gradient-to-b dark:from-[var(--bg-navy-darker)] dark:to-[var(--bg-navy)]",
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
      bgColor: "bg-gradient-to-b from-[var(--bg-cream)] to-[var(--secondary-teal-light)]/10",
      darkBgColor: "dark:bg-gradient-to-b dark:from-[var(--bg-navy)] dark:to-[var(--secondary-teal-light)]/10",
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
      bgColor: "bg-gradient-to-b from-[var(--secondary-teal-light)]/10 to-[var(--bg-cream)]",
      darkBgColor: "dark:bg-gradient-to-b dark:from-[var(--secondary-teal-light)]/10 dark:to-[var(--bg-navy)]",
    }
  ];
  
  return (
    <div ref={sectionRef} className="team-section py-16 bg-theme-bg-primary">
      {/* Section heading */}
      <div className="container mx-auto mb-12 px-4">
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
      
      {/* Team sections container - stacked full sections with fixed viewports */}
      <div className="relative h-[650px] overflow-hidden rounded-md hidden md:block">
        {/* These are full, stacked sections where each one is visible through a fixed viewport */}
        {teamData.map((member, index) => {
          // Calculate position for this section's viewport
          const viewportLeft = `${index * 25}%`;
          const viewportWidth = '25%';
          
          return (
            <div 
              key={member.name}
              className={`absolute top-0 h-full ${member.bgColor} ${member.darkBgColor}`}
              style={{
                left: activeIndex === index ? '0' : viewportLeft, 
                width: activeIndex === index ? '100%' : viewportWidth,
                zIndex: activeIndex === index ? 20 : 10,
                transition: 'all 0.5s ease'
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Full content - always present, just cropped by viewport normally */}
              <div className="h-full flex items-center justify-center relative">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute top-[5%] left-[10%] w-28 h-28 rounded-[40%] opacity-10 bg-theme-primary rotate-12"></div>
                  <div className="absolute bottom-[20%] right-[8%] w-32 h-32 rounded-[40%] opacity-10 bg-theme-accent rotate-[-8deg]"></div>
                </div>
                
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto z-10 p-6 md:p-12">
                  {/* Left column with image */}
                  <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
                    <div className="relative">
                      <img
                        src={member.images.main.cutout}
                        alt={member.name}
                        className="max-h-[300px] md:max-h-[400px] object-contain"
                      />
                      {member.images.secondary && (
                        <img
                          src={member.images.secondary.cutout}
                          alt={`${member.name} secondary`}
                          className="absolute -bottom-10 -right-10 max-h-[200px] opacity-80"
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Right column with content */}
                  <div className="md:w-2/3 md:pl-8">
                    <div className="mb-6">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-text-primary">{member.name}</h2>
                      <h3 className="text-xl text-theme-primary mt-2">{member.title}</h3>
                    </div>
                    
                    <div className="bg-theme-bg-secondary/80 backdrop-blur p-6 rounded-md shadow-theme-md mb-6">
                      <p className="text-theme-text-secondary text-lg leading-relaxed">{member.bio}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Quote */}
                      <div className="bg-theme-bg-tertiary/80 backdrop-blur p-6 rounded-md shadow-theme-sm border-l-4 border-theme-primary">
                        <p className="italic text-theme-text-primary">&ldquo;{member.quote}&rdquo;</p>
                        <p className="text-theme-text-tertiary text-right mt-2">- {member.quoteAuthor}</p>
                      </div>
                      
                      {/* Likes/Dislikes */}
                      <div className="bg-theme-bg-tertiary/80 backdrop-blur p-6 rounded-md shadow-theme-sm">
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2 text-[var(--secondary-teal)]">Likes:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {member.likes.map((item, i) => (
                              <li key={i} className="text-theme-text-primary">{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium mb-2 text-[var(--accent-coral)]">Dislikes:</h4>
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
          );
        })}
        
        {/* Visual guides for hover areas */}
        <div className="absolute inset-0 pointer-events-none z-30 flex">
          {teamData.map((_, i) => (
            <div 
              key={`guide-${i}`} 
              className="flex-1 border-x border-white/10 dark:border-white/5"
            />
          ))}
        </div>
      </div>
      
      {/* Mobile version - stacked cards */}
      <div className="md:hidden space-y-8">
        {teamData.map((member) => (
          <div 
            key={member.name}
            className={`p-6 rounded-lg shadow-theme-md ${member.bgColor} ${member.darkBgColor}`}
          >
            <h2 className="text-2xl font-bold text-theme-text-primary mb-1">{member.name}</h2>
            <h3 className="text-lg text-theme-primary mb-4">{member.title}</h3>
            
            <div className="flex justify-center mb-6">
              <img 
                src={member.images.main.cutout} 
                alt={member.name}
                className="h-[200px] object-contain"
              />
            </div>
            
            <div className="bg-theme-bg-secondary/90 rounded-md p-4 mb-4 shadow-theme-sm">
              <p className="text-theme-text-secondary">{member.bio}</p>
            </div>
            
            <div className="bg-theme-bg-tertiary/90 rounded-md p-4 border-l-4 border-theme-primary shadow-theme-sm">
              <p className="italic text-theme-text-primary">&ldquo;{member.quote}&rdquo;</p>
              <p className="text-theme-text-tertiary text-right mt-2">- {member.quoteAuthor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;