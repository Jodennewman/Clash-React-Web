import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Individual team member component as a fullscreen expandable window
const TeamMemberWindow = ({ 
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
  isFullscreen,
  onActivate,
  onClose
}) => {
  const windowRef = useRef(null);
  const contentRef = useRef(null);
  const expandedContentRef = useRef(null);
  
  // Create timeline for expanding and collapsing animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Initial animation on scroll - reveal the windows
      gsap.fromTo(
        windowRef.current,
        { 
          opacity: 0,
          scale: 0.9
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: windowRef.current,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => ctx.revert(); // Proper cleanup
  }, [index]);

  // Handle fullscreen expansion/collapse animations
  useGSAP(() => {
    if (!windowRef.current) return;
    
    const ctx = gsap.context(() => {
      // Get all window elements
      const allWindows = document.querySelectorAll('.team-window');
      
      if (isFullscreen) {
        // Create the expansion animation
        const tl = gsap.timeline();
        
        // Fade out other windows
        allWindows.forEach((window, i) => {
          if (i !== index) {
            gsap.to(window, { 
              opacity: 0, 
              scale: 0.8, 
              duration: 0.5, 
              ease: "power2.inOut" 
            });
          }
        });
        
        // Expand this window to fullscreen
        tl.to(windowRef.current, { 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 50,
          borderRadius: 0,
          duration: 0.7,
          ease: "power2.inOut"
        });
        
        // Reveal expanded content
        tl.to(expandedContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        });
      } else {
        // If returning from fullscreen
        if (windowRef.current.style.position === 'fixed') {
          // Hide expanded content first
          gsap.to(expandedContentRef.current.children, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in"
          });
          
          // Create the collapse timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // Reset inline styles after animation completes
              gsap.set(windowRef.current, {
                clearProps: "all"
              });
            }
          });
          
          // Return to original position
          tl.to(windowRef.current, { 
            position: 'relative',
            top: '',
            left: '',
            right: '',
            bottom: '',
            width: '',
            height: '',
            zIndex: 10 - index,
            borderRadius: '1rem',
            duration: 0.7,
            ease: "power2.inOut"
          });
          
          // Fade other windows back in
          tl.to(allWindows, { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5,
            ease: "power2.out"
          }, "-=0.3");
        }
      }
    });
    
    return () => ctx.revert(); // Proper cleanup
  }, [isFullscreen, index]);
  
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
      ref={windowRef}
      className={`team-window relative overflow-hidden bg-theme-gradient rounded-lg shadow-theme-md
                ${isActive && !isFullscreen ? 'scale-[1.03]' : ''}
                ${isFullscreen ? '' : 'cursor-pointer transition-transform duration-300'}`}
      style={{ zIndex: isFullscreen ? 50 : (10 - index) }}
      onClick={() => !isFullscreen && onActivate(index)}
      onMouseEnter={() => !isFullscreen && onActivate(index)}
    >
      {/* Add close button for fullscreen mode */}
      {isFullscreen && (
        <button 
          className="absolute top-6 right-6 z-50 bg-theme-bg-surface/30 p-3 rounded-full shadow-theme-sm backdrop-blur-sm text-theme-text-primary hover:bg-theme-bg-surface/50 transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-90">
        {generateFloatingElements()}
      </div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--theme-pattern-color) 1.5px,transparent 1.5px)] bg-[length:20px_20px] opacity-10"></div>
      
      {/* Window frame border */}
      <div className="absolute inset-0 border-2 border-theme-primary/20 rounded-lg"></div>
      
      {/* Preview content (always visible) */}
      <div 
        ref={contentRef} 
        className={`w-full h-full flex flex-col items-center justify-center p-8
                  ${isFullscreen ? 'opacity-0' : 'opacity-100'} 
                  transition-opacity duration-300`}
      >
        <img 
          src={images?.main?.cutout} 
          alt={name}
          className="object-contain max-h-[220px] mb-4"
        />
        <h2 className="text-4xl font-bold text-theme-text-primary text-center mb-2">{name}</h2>
        <h3 className="text-xl text-theme-primary text-center">{title}</h3>
        
        {/* Hover indicator */}
        {!isFullscreen && (
          <div className="absolute bottom-6 left-0 right-0 text-center text-theme-text-tertiary text-sm opacity-75">
            {isActive ? 'Click to expand' : 'Hover to preview'}
          </div>
        )}
      </div>
      
      {/* Expanded content (visible only in fullscreen) */}
      <div 
        ref={expandedContentRef}
        className={`absolute inset-0 w-full h-full overflow-auto ${isFullscreen ? 'z-30' : '-z-10'}`}
      >
        <div className="container mx-auto py-24 px-6 flex flex-col md:flex-row items-start gap-12">
          {/* Left column - Image and Name */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start opacity-0 translate-y-10">
            <img 
              src={images?.main?.cutout} 
              alt={name}
              className="object-contain max-h-[350px] mb-8"
            />
            
            {images?.secondary?.cutout && (
              <img 
                src={images.secondary.cutout} 
                alt={`${name} secondary`}
                className="object-contain max-h-[250px] ml-12 -mt-24 opacity-80"
              />
            )}
          </div>
          
          {/* Right column - Content */}
          <div className="w-full md:w-2/3 space-y-8">
            {/* Name and title - duplicated in expanded view for layout purposes */}
            <div className="opacity-0 translate-y-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-theme-text-primary tracking-tight mb-2">{name}</h2>
              <h3 className="text-2xl text-theme-primary">{title}</h3>
            </div>
            
            {/* Bio */}
            <div className="bg-white/80 dark:bg-[var(--card-bg-navy)]/80 backdrop-blur-sm rounded-theme-md p-6 shadow-theme-md opacity-0 translate-y-10">
              <p className="text-lg text-theme-text-secondary leading-relaxed">{bio}</p>
            </div>
            
            {/* Likes and Dislikes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 translate-y-10">
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
            <div className="opacity-0 translate-y-10">
              <div className="relative bg-theme-bg-secondary/50 p-6 rounded-theme-md shadow-theme-sm border-l-4 border-theme-primary">
                <p className="italic text-theme-text-primary text-lg">&ldquo;{quote}&rdquo;</p>
                <p className="text-theme-text-tertiary text-right mt-3">- {quoteAuthor}</p>
                
                {/* Quote marks decoration */}
                <div className="absolute top-2 left-2 text-theme-primary opacity-20 text-4xl">&ldquo;</div>
                <div className="absolute bottom-2 right-4 text-theme-primary opacity-20 text-4xl">&rdquo;</div>
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
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  // Lock body scroll when fullscreen is active
  useEffect(() => {
    if (fullscreenIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullscreenIndex]);
  
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
  
  // Set active panel for hover effects
  const handleActivate = (index) => {
    setActiveIndex(index);
  };
  
  // Set fullscreen mode
  const handleExpand = (index) => {
    setFullscreenIndex(index);
  };
  
  // Close fullscreen mode
  const handleClose = () => {
    setFullscreenIndex(null);
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
      {/* Theme-aware floating elements for section background */}
      <div className="absolute top-20 right-20 w-24 h-24 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow hidden md:block"></div>
      <div className="absolute bottom-10 left-40 w-32 h-32 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)] animate-float-medium hidden md:block"></div>
      
      {/* Only show heading when not in fullscreen mode */}
      {fullscreenIndex === null && (
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
      )}
      
      {/* Window Grid - full viewport size grid */}
      <div 
        className={`team-window-grid ${fullscreenIndex !== null ? 'h-screen' : 'min-h-[calc(100vh-100px)]'}`}
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full h-full"
          onMouseLeave={() => fullscreenIndex === null && setActiveIndex(null)}
        >
          {teamData.map((member, index) => (
            <TeamMemberWindow 
              key={member.name} 
              {...member} 
              index={index}
              isActive={activeIndex === index}
              isFullscreen={fullscreenIndex === index}
              onActivate={handleActivate}
              onClose={handleClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;