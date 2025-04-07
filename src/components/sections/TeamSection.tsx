import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Full-screen team member section
const TeamMemberFullSection = ({ 
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
  
  // Define background colors for each section to differentiate them
  const gradients = [
    'bg-gradient-to-br from-[var(--theme-bg-primary)] to-[var(--theme-bg-secondary)]',
    'bg-gradient-to-br from-[var(--theme-bg-secondary)] to-[var(--theme-bg-tertiary)]',
    'bg-gradient-to-br from-[var(--theme-bg-tertiary)] to-[var(--theme-bg-primary)]',
    'bg-gradient-to-br from-[var(--primary-orange)]/5 to-[var(--theme-bg-primary)]'
  ];
  
  // Calculate positions for the window effect
  const getClipPath = () => {
    // Calculate 25% wide section for each member
    const startPercent = (index * 25);
    const endPercent = startPercent + 25;
    
    if (isActive) {
      // When active, expand to 70%, pushing others aside
      return 'none'; // No clipping when active
    } else {
      // In default state, each takes exactly 25% width
      return `inset(0 ${100 - endPercent}% 0 ${startPercent}%)`;
    }
  };
  
  return (
    <div 
      ref={sectionRef}
      className={`absolute inset-0 transition-all duration-500 ease-in-out ${gradients[index % gradients.length]} ${isActive ? 'z-20' : `z-${10 - index}`} ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ 
        clipPath: getClipPath(),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Full content section */}
      <div className="w-full h-full p-12 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">
          {/* Top section with name and title */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-theme-text-primary">{name}</h2>
            <h3 className="text-2xl text-theme-primary mt-2">{title}</h3>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left column - Image and quote */}
            <div className="col-span-12 md:col-span-5">
              {/* Main image */}
              <div className="relative mb-8 flex justify-center">
                <img 
                  src={images?.main?.cutout} 
                  alt={name}
                  className="w-[300px] max-w-full"
                />
                
                {/* Secondary image */}
                {images?.secondary?.cutout && (
                  <img 
                    src={images.secondary.cutout} 
                    alt={`${name} secondary pose`}
                    className="absolute -bottom-16 -right-8 w-[200px] opacity-90"
                  />
                )}
              </div>
              
              {/* Quote */}
              <div className="bg-theme-bg-secondary rounded-md p-6 border-l-4 border-theme-primary shadow-theme-md">
                <p className="italic text-theme-text-primary">&ldquo;{quote}&rdquo;</p>
                <p className="text-theme-text-tertiary text-right mt-3">- {quoteAuthor}</p>
              </div>
            </div>
            
            {/* Right column - Bio and likes/dislikes */}
            <div className="col-span-12 md:col-span-7">
              {/* Bio */}
              <div className="bg-theme-bg-secondary p-6 rounded-md shadow-theme-md mb-8">
                <p className="text-theme-text-secondary leading-relaxed">{bio}</p>
              </div>
              
              {/* Likes and Dislikes grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Likes card */}
                <div className="bg-[var(--secondary-teal-light)]/10 p-6 rounded-md shadow-theme-sm">
                  <h4 className="text-xl font-medium mb-4 text-[var(--secondary-teal)]">Likes:</h4>
                  <ul className="space-y-3">
                    {likes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--secondary-teal)] mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-theme-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dislikes card */}
                <div className="bg-[var(--accent-coral)]/10 p-6 rounded-md shadow-theme-sm">
                  <h4 className="text-xl font-medium mb-4 text-[var(--accent-coral)]">Dislikes:</h4>
                  <ul className="space-y-3">
                    {dislikes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-coral)] mt-2 mr-2 flex-shrink-0"></span>
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
  const sectionWrapperRef = useRef(null);
  
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
      
      {/* Team sections container - full screen sections stacked with clip paths */}
      <div ref={sectionWrapperRef} className="relative h-[700px] w-full overflow-hidden shadow-theme-lg rounded-md hidden md:block">
        {teamData.map((member, index) => (
          <TeamMemberFullSection 
            key={member.name} 
            {...member} 
            index={index}
            isActive={activeIndex === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            totalMembers={teamData.length}
          />
        ))}
        
        {/* Hover guides - visual indicators for the sections */}
        <div className="absolute inset-0 pointer-events-none flex">
          {teamData.map((_, index) => (
            <div 
              key={`guide-${index}`} 
              className={`flex-1 border-x border-theme-border/20 ${activeIndex === index ? 'bg-theme-primary/5' : ''}`}
            />
          ))}
        </div>
      </div>
      
      {/* Mobile version - stacked cards */}
      <div className="md:hidden">
        {teamData.map((member, index) => (
          <div 
            key={member.name}
            className="p-4 mb-8 bg-theme-gradient rounded-md shadow-theme-md"
          >
            <h2 className="text-2xl font-bold text-theme-text-primary">{member.name}</h2>
            <h3 className="text-lg text-theme-primary mb-4">{member.title}</h3>
            
            <div className="flex justify-center mb-4">
              <img 
                src={member.images?.main?.cutout} 
                alt={member.name}
                className="w-[180px]"
              />
            </div>
            
            <div className="bg-theme-bg-secondary rounded-md p-4 mb-4">
              <p className="text-theme-text-secondary text-sm">{member.bio}</p>
            </div>
            
            <div className="bg-theme-bg-secondary rounded-md p-4 mb-4 border-l-4 border-theme-primary">
              <p className="italic text-theme-text-primary text-sm">&ldquo;{member.quote}&rdquo;</p>
              <p className="text-theme-text-secondary text-right text-xs mt-2">- {member.quoteAuthor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;