import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Individual team member component with horizontal hover expansion
const TeamMember = ({ 
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
  onMouseEnter
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animation for the expanded state is handled by CSS transitions
      // This GSAP animation is just for initial reveal on scroll
      
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
  
  // Function to create floating elements for visual interest
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
      className={`team-member-panel transition-all duration-500 ease-in-out relative overflow-hidden bg-theme-gradient shadow-theme-md rounded-lg
                 ${isActive ? 'flex-grow' : 'flex-shrink cursor-pointer'}`}
      style={{ 
        zIndex: isActive ? 20 : (10 - index),
        minHeight: isActive ? '500px' : '100%'
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background with theme-aware gradient */}
      <div className="absolute inset-0 opacity-90">
        {/* Theme-aware floating elements for visual interest */}
        {generateFloatingElements()}
      </div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--theme-pattern-color) 1.5px,transparent 1.5px)] bg-[length:20px_20px] opacity-10"></div>
      
      {/* Main content container */}
      <div ref={contentRef} className="relative z-10 w-full h-full flex flex-col p-6">
        {/* Collapsed view - just name, title and image */}
        <div className={`flex ${isActive ? 'flex-row items-start' : 'flex-col items-center justify-center h-full'}`}>
          {/* Name and title shown in both collapsed and expanded modes */}
          <div className={`text-center transition-all duration-300 ${isActive ? 'text-left mb-4 w-1/2' : 'mb-0'}`}>
            <h2 className={`font-bold tracking-tight text-theme-text-primary transition-all duration-300 ${isActive ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
              {name}
            </h2>
            {title && 
              <h3 className={`text-theme-primary transition-all duration-300 ${isActive ? 'text-xl' : 'text-lg'}`}>
                {title}
              </h3>
            }
          </div>
          
          {/* Image - shown differently in collapsed vs expanded modes */}
          <div className={`relative transition-all duration-300 
                         ${isActive ? 'w-1/2' : 'w-full max-w-[150px] mt-4 mb-2'}`}>
            <img 
              src={images?.main?.cutout} 
              alt={name}
              className={`object-contain transition-all duration-300 
                         ${isActive ? 'max-h-[200px] ml-auto' : 'max-h-[120px] mx-auto'}`}
            />
            {/* Halftone effect over the image */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--theme-pattern-color) 1px,transparent 1px)] bg-[length:4px_4px] mix-blend-multiply dark:mix-blend-screen opacity-30"></div>
          </div>
        </div>
        
        {/* Expanded view - additional content */}
        {isActive && (
          <div className="expanded-content mt-6 animate-fadeIn">
            {/* Bio Card */}
            <div className="bg-white/80 dark:bg-[var(--card-bg-navy)]/80 backdrop-blur-sm rounded-theme-md p-6 shadow-theme-md mb-6">
              <p className="text-lg text-theme-text-secondary leading-relaxed">{bio}</p>
            </div>
            
            {/* Likes and Dislikes Cards in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
            
            {/* Quote */}
            <div className="mt-auto">
              <div className="relative bg-theme-bg-secondary/50 p-6 rounded-theme-md shadow-theme-sm border-l-4 border-theme-primary">
                <p className="italic text-theme-text-primary text-lg">&ldquo;{quote}&rdquo;</p>
                <p className="text-theme-text-tertiary text-right mt-3">- {quoteAuthor}</p>
                
                {/* Quote marks decoration */}
                <div className="absolute top-2 left-2 text-theme-primary opacity-20 text-4xl">&ldquo;</div>
                <div className="absolute bottom-2 right-4 text-theme-primary opacity-20 text-4xl">&rdquo;</div>
              </div>
            </div>
          </div>
        )}
        
        {/* If not active, show "hover to expand" hint */}
        {!isActive && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-theme-text-tertiary text-sm opacity-75">
            Hover to expand
          </div>
        )}
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
    <div ref={sectionRef} className="team-section bg-theme-bg-primary py-16 relative overflow-hidden">
      {/* Theme-aware floating elements for section background */}
      <div className="absolute top-20 right-20 w-24 h-24 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow hidden md:block"></div>
      <div className="absolute bottom-10 left-40 w-32 h-32 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)] animate-float-medium hidden md:block"></div>
      
      {/* Section heading with introduction */}
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
      
      {/* Horizontal team members grid (vertical on mobile) */}
      <div className="container mx-auto px-4">
        <div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px]"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {teamData.map((member, index) => (
            <TeamMember 
              key={member.name} 
              {...member} 
              index={index}
              isActive={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;