import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Individual full team member section that will be initially cropped
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
  totalMembers
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  // Calculate the initial collapsed width/height as a percentage
  // For 4 members, each gets 25% when collapsed in a row, but we make the active one slightly larger
  const getCollapsedSize = () => {
    const baseSize = 100 / totalMembers;
    return `${baseSize}%`;
  }
  
  // Calculate the expanded size - the active section takes up most of the space
  const getExpandedSize = () => {
    // Active section gets 70%, others share the remaining 30%
    const otherSections = totalMembers - 1;
    const otherSectionSize = otherSections > 0 ? 30 / otherSections : 0;
    return isActive ? '70%' : `${otherSectionSize}%`;
  }
  
  // Animation for initial reveal
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, [index]);
  
  // Generate floating elements for visual interest
  const generateFloatingElements = (count = 3) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      const size = 20 + (i * 10); // Varying sizes
      const top = 10 + (i * 25); // Varying positions
      const left = 5 + (i * 15);
      const rotation = -15 + (i * 12);
      
      elements.push(
        <div 
          key={i}
          className="absolute -z-10 rounded-[40%] opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      );
    }
    return elements;
  };

  return (
    <div 
      ref={sectionRef}
      className={`team-member-section transition-all duration-700 ease-in-out overflow-hidden relative bg-theme-gradient shadow-theme-md
                ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ 
        width: isActive ? getExpandedSize() : getCollapsedSize(),
        height: '100%',
        zIndex: isActive ? 20 : 10,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Theme-aware floating elements for visual interest */}
        {generateFloatingElements(5)}
        
        {/* Halftone pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--theme-pattern-color) 1.5px,transparent 1.5px)] bg-[length:20px_20px] opacity-10"></div>
      </div>
      
      {/* Section border/divider */}
      <div className="absolute inset-0 border-r border-theme-border opacity-30"></div>
      
      <div 
        ref={contentRef} 
        className={`w-full h-full flex flex-col justify-center items-center transition-opacity duration-500 p-8
                  ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-80 pointer-events-none'}`}
      >
        {/* Content visible in both collapsed and expanded states */}
        <div className={`transition-all duration-700 ease-in-out ${isActive ? 'scale-100' : 'scale-90'}`}>
          {/* Name as vertical text in collapsed state, normal in expanded */}
          <div className={`transition-all duration-700 ${isActive ? '' : 'writing-vertical'}`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-theme-text-primary mb-4 whitespace-nowrap">{name}</h2>
            <h3 className={`text-xl sm:text-2xl text-theme-primary transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>{title}</h3>
          </div>
          
          {/* Expanded content only visible when active */}
          <div className={`transition-all duration-500 mt-8 ${isActive ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            {/* Main Content Layout */}
            <div className="max-w-4xl mx-auto">
              {/* Image & Bio Layout */}
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                {/* Images */}
                <div className="md:w-1/3 flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src={images?.main?.cutout} 
                      alt={name}
                      className="object-contain max-h-[300px]"
                    />
                    
                    {images?.secondary?.cutout && (
                      <img 
                        src={images.secondary.cutout} 
                        alt={`${name} secondary`}
                        className="absolute -bottom-10 -right-10 object-contain max-h-[200px] opacity-70"
                      />
                    )}
                  </div>
                </div>
                
                {/* Bio */}
                <div className="md:w-2/3">
                  <div className="bg-white/80 dark:bg-[var(--card-bg-navy)]/80 backdrop-blur-sm rounded-theme-md p-6 shadow-theme-md mb-6">
                    <p className="text-lg text-theme-text-secondary leading-relaxed">{bio}</p>
                  </div>
                  
                  {/* Quote */}
                  <div className="relative bg-theme-bg-secondary/50 p-6 rounded-theme-md shadow-theme-sm border-l-4 border-theme-primary">
                    <p className="italic text-theme-text-primary text-lg">&ldquo;{quote}&rdquo;</p>
                    <p className="text-theme-text-tertiary text-right mt-3">- {quoteAuthor}</p>
                    
                    {/* Quote marks decoration */}
                    <div className="absolute top-2 left-2 text-theme-primary opacity-20 text-4xl">&ldquo;</div>
                    <div className="absolute bottom-2 right-4 text-theme-primary opacity-20 text-4xl">&rdquo;</div>
                  </div>
                </div>
              </div>
              
              {/* Likes and Dislikes Cards in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Likes Card */}
                <div className="bg-[var(--secondary-teal-light)]/20 dark:bg-[var(--neutral-blue-1)]/20 backdrop-blur-sm rounded-theme-md p-6 shadow-theme-sm">
                  <h4 className="text-lg font-medium mb-3 flex items-center text-[var(--secondary-teal)] dark:text-[var(--secondary-teal-light)]">
                    Likes:
                  </h4>
                  <ul className="list-none space-y-2">
                    {likes.map((like, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--secondary-teal)] dark:bg-[var(--secondary-teal-light)] mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-theme-text-primary">{like}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dislikes Card */}
                <div className="bg-[var(--accent-coral)]/20 dark:bg-[var(--accent-coral)]/10 backdrop-blur-sm rounded-theme-md p-6 shadow-theme-sm">
                  <h4 className="text-lg font-medium mb-3 flex items-center text-[var(--accent-coral)] dark:text-[var(--accent-coral-glow)]">
                    Dislikes:
                  </h4>
                  <ul className="list-none space-y-2">
                    {dislikes.map((dislike, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-coral)] dark:bg-[var(--accent-coral-glow)] mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-theme-text-primary">{dislike}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Show hover indication in collapsed state */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-theme-bg-primary/30 backdrop-blur-sm p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-theme-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate the section heading
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert(); // Proper cleanup
  }, []);
  
  // Handle mouse enter/leave for sections
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
    <div ref={sectionRef} className="team-section bg-theme-bg-primary py-16 relative">
      {/* Section heading */}
      <div className="container mx-auto mb-16 relative px-4">
        <div ref={headingRef} className="opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary mb-6">
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
      
      {/* Horizontal team sections - each initially showing just a slither */}
      <div className="flex flex-col lg:flex-row h-[80vh] w-full overflow-hidden">
        {teamData.map((member, index) => (
          <TeamMemberSection 
            key={member.name} 
            {...member} 
            index={index}
            isActive={activeIndex === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            totalMembers={teamData.length}
          />
        ))}
      </div>
    </div>
  );
};

// Add custom CSS class for vertical writing mode
const styles = document.createElement('style');
styles.textContent = `
  .writing-vertical {
    writing-mode: vertical-lr;
    text-orientation: mixed;
    transform: rotate(180deg);
  }
`;
document.head.appendChild(styles);

export default TeamSection;