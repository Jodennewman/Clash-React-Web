import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Individual team member section that will be stacked and cropped
const TeamMemberSection = ({ 
  name, 
  title, 
  bio, 
  likes, 
  dislikes, 
  quote, 
  quoteAuthor, 
  images,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave,
  teamLength
}) => {
  const sectionRef = useRef(null);

  // Full height of each section divided by team length
  const getVisibleHeight = () => {
    return isActive ? '100%' : `${100 / teamLength}px`;
  };

  return (
    <div 
      ref={sectionRef}
      className={`absolute left-0 right-0 overflow-hidden bg-theme-bg-primary transition-all duration-300 ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ 
        height: isActive ? '100%' : `${100 / teamLength}px`,
        top: isActive ? '0' : `${index * (100 / teamLength)}px`,
        zIndex: isActive ? 20 : 10 - index,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header bar that's always visible */}
      <div className="h-[100px] bg-theme-gradient flex items-center px-6 border-b border-theme-border">
        <h2 className="text-2xl md:text-3xl font-bold text-theme-text-primary">{name}</h2>
        <span className="ml-4 text-theme-text-secondary">{title}</span>
      </div>
      
      {/* Full content */}
      <div className={`p-8 md:p-12 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left column - Image and quote */}
            <div className="md:col-span-4">
              <div className="relative mb-8">
                <img 
                  src={images?.main?.cutout} 
                  alt={name}
                  className="w-full max-w-[300px] mx-auto object-contain"
                />
                {images?.secondary?.cutout && (
                  <img 
                    src={images.secondary.cutout} 
                    alt={`${name} secondary`}
                    className="absolute -bottom-10 -right-10 w-3/4 max-w-[200px] opacity-80"
                  />
                )}
              </div>
              
              {/* Quote */}
              <div className="bg-theme-bg-secondary p-6 rounded-md border-l-4 border-theme-primary mt-8">
                <p className="italic text-theme-text-primary">&ldquo;{quote}&rdquo;</p>
                <p className="text-theme-text-tertiary text-right mt-2">- {quoteAuthor}</p>
              </div>
            </div>
            
            {/* Right column - Bio and likes/dislikes */}
            <div className="md:col-span-8">
              <div className="bg-theme-bg-secondary p-6 rounded-md mb-8">
                <p className="text-theme-text-secondary text-lg leading-relaxed">{bio}</p>
              </div>
              
              {/* Likes and Dislikes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Likes */}
                <div className="bg-[var(--secondary-teal-light)]/10 p-6 rounded-md">
                  <h4 className="text-lg font-medium mb-4 text-[var(--secondary-teal)]">Likes</h4>
                  <ul className="space-y-2">
                    {likes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--secondary-teal)] mt-2 mr-2"></span>
                        <span className="text-theme-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dislikes */}
                <div className="bg-[var(--accent-coral)]/10 p-6 rounded-md">
                  <h4 className="text-lg font-medium mb-4 text-[var(--accent-coral)]">Dislikes</h4>
                  <ul className="space-y-2">
                    {dislikes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-coral)] mt-2 mr-2"></span>
                        <span className="text-theme-text-primary">{item}</span>
                      </li>
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
};

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in for section heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
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
  
  // Handle mouse enter/leave
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  
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
      }
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
      }
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
      }
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
      }
    }
  ];
  
  return (
    <div ref={sectionRef} className="team-section py-16 relative">
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
      
      {/* Stacked team sections container */}
      <div className="container mx-auto px-4">
        <div className="relative h-[600px] md:h-[700px]">
          {teamData.map((member, index) => (
            <TeamMemberSection 
              key={member.name} 
              {...member} 
              index={index}
              isActive={activeIndex === index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              teamLength={teamData.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;