import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useGSAP } from "@gsap/react"; // Add useGSAP for proper cleanup
import '../styles/week-by-week.css'; // Import custom styles for timeline

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define types for course weeks
interface CourseWeek {
  id: string;
  week: string;
  title: string;
  content: string;
  icon?: string;
  highlight?: string;
  founderTip?: string;
  bullets?: string[];
  modules?: string[];
}

// Define module colors for each week
interface ModuleInfo {
  color: string;
  title: string;
}

const CourseTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  // Define simple color themes for each week (not modules)
  const getWeekColors = (weekId: string): string[] => {
    const colorMap: Record<string, string[]> = {
      'week0': ['var(--hud-teal)'],
      'week1': ['var(--primary-orange)'],
      'week2': ['var(--hud-coral)'],
      'week3': ['var(--accent-coral)'],
      'week4': ['var(--secondary-teal)'],
      'week5': ['var(--accent-pink)'],
      'week6': ['var(--accent-yellow)'],
      'week7': ['var(--hud-red)'],
      'week8': ['var(--secondary-teal-light)'],
      'week9-10': ['var(--primary-orange-light)'],
      'week10plus': ['var(--hud-orange)'],
    };
    
    return colorMap[weekId] || ['var(--primary-orange)'];
  };

  const courseWeeks: CourseWeek[] = [
    {
      id: 'week0',
      week: 'Week 0',
      title: 'For the Nerds',
      icon: '🧠',
      highlight: 'Immediate access to the exclusive founder community and all upskiller sections for your team.',
      content: 'Once your application has gone though you\'ll have immediate access to our first week of content: that\'s the basic theory plus all three upskiller sections for your team, AND immediate access to our exclusive founder community. We\'d recommend you start watching the content as soon as you get access (or getting your team to watch it and summarise it), so you can feel smarter than everyone else in the first group call.',
      bullets: [
        'Get a head start with the basic theory content',
        'Access upskiller sections for your team',
        'Join the exclusive founder community'
      ]
    },
    {
      id: 'week1',
      week: 'Week 1',
      title: 'Theory',
      icon: '💡',
      highlight: 'Your brain will be 50% bigger with all the key theory, algorithms, and strategies.',
      founderTip: 'Have your team watch the content and summarize the key points for you - this saves valuable founder time while ensuring your team is aligned with your vision.',
      content: 'At the end of this week you\'ll be exhausted, but your brain will probably be 50% bigger. You\'ll have the basic theory down, the dos and don\'ts of short form, how to actually \'hack\' the algorithm. Plus all the knowledge to write a good hook, a good script, feel good on camera, AND you\'ll come away with a unique content strategy personalised to you ready to start posting immediately. We did say it\'s a lot. PLUS. Your team will have access to everything they need in the upskillers to start mastering researching, scripting, filming and editing. At the end of this week we\'ll have our first group call, with the other founders in the community. This week we\'ll focus on introductions, getting to know each other, and help on refining your content strategy. Plus answering the many questions I\'m sure you\'ll have.',
      bullets: [
        'Master the algorithm and short form dos & don\'ts',
        'Learn compelling hook and script writing',
        'Develop your personalized content strategy',
        'Join our first community group call'
      ]
    },
    {
      id: 'week2',
      week: 'Week 2',
      title: 'Authority',
      icon: '👑',
      highlight: 'Learn how to position yourself as the go-to expert in your field through short-form content.',
      content: 'It\'s all well and good making good short form content. But you want more than that - you want to be an authority. At the end of this week you\'ll know all there is to know about building authority on short form, at all levels, specifically as a founder. You\'ll learn how to build authority into your strategy, embed it into your content, and engage with your audience. The group coaching call at the end of this week will focus on how to tailor this authority to your specific niche, business, and personality.',
      bullets: [
        'Build authority-focused content strategy',
        'Learn to embed authority signals in your videos',
        'Master audience engagement techniques',
        'Personalize authority tactics to your niche'
      ]
    },
    {
      id: 'week3',
      week: 'Week 3',
      title: 'Advanced Theory',
      icon: '🚀',
      highlight: 'Take it up a notch with advanced hooking, engagement and storytelling techniques.',
      founderTip: 'The founder paradox is real - your audience wants authenticity but also expertise. This week helps you balance both effectively.',
      content: 'Time to take it up a notch. All that theory you\'ve spent weeks learning? There\'s even more. At the end of this week you\'ll know all the advanced techniques we use for hooking, engagement, storytelling and iteration, to build the best content possible. Plus we\'ll finally address the founder paradox you\'ll definitely be running into… The call at the end of this week will focus on putting all of this theory into practice with a group workshop.',
      bullets: [
        'Master advanced hooking techniques',
        'Learn sophisticated engagement strategies',
        'Understand the founder paradox and how to overcome it',
        'Apply advanced theory in practical workshop'
      ]
    },
    {
      id: 'week4',
      week: 'Week 4',
      title: 'Reading week',
      icon: '📚',
      highlight: 'Take a breather, practice what you\'ve learned, or catch up on missed content.',
      content: 'The first few weeks may be heavy, and we know you\'re busy, so take this week as a breather. You can use it to catch up on theory you may have missed, start practicing everything you\'ve learnt so far with your team, or just go on holiday. But if you do go on holiday, make sure to log on for the group call at the end of the week (no rest for us). This one will be an open Q&A and we promise no question is off the table (no matter how stupid) so everyone feels up to date and confident in the content so far.',
      bullets: [
        'Catch up on any missed content',
        'Begin practicing with your team',
        'Join the week\'s open Q&A session',
        'Ask ANY question (nothing is off limits!)'
      ]
    },
    {
      id: 'week5',
      week: 'Week 5',
      title: 'Delegation',
      icon: '👥',
      highlight: 'Transform your team into an efficient in-house content machine with minimal founder input.',
      founderTip: 'This is where your time investment starts to decrease dramatically. Set up systems this week that will save you hundreds of hours later.',
      content: 'Maybe your team had a nice break last week. Maybe not. Either way it\'s now time to give them more work. At the end of week 5 you\'ll know exactly how to manage your creative team, and turn them into the efficient in-house content machine you\'ve always dreamed of. The week 5 group call will focus on how to efficiently get your team to execute your vision, and create content that represents you, with minimal founder time and input.',
      bullets: [
        'Learn effective creative team management',
        'Build systems for consistent content creation',
        'Create workflows that minimize founder input',
        'Maintain quality while scaling production'
      ]
    },
    {
      id: 'week6',
      week: 'Week 6',
      title: 'Monetisation',
      icon: '💰',
      highlight: 'Everyone\'s favorite part — turn those views into actual revenue.',
      content: 'Views are great. But we all know why you\'re really doing this course. At the end of this week you\'ll know everything we know (so everything there is to know) on lead mags, CTAs, the creator fund, speaking engagements and sponsorship deals. The call at the end of this week will be focussed on which monetisation option is best for you.',
      bullets: [
        'Master lead magnets and effective CTAs',
        'Learn to leverage the creator fund',
        'Secure speaking engagements',
        'Negotiate profitable sponsorship deals',
        'Identify your optimal monetization path'
      ]
    },
    {
      id: 'week7',
      week: 'Week 7',
      title: 'Conversion',
      icon: '🎯',
      highlight: 'Turn views into paying customers with short-form funnels and expert conversion tactics.',
      content: 'By week 7, the views will be coming in, and now it\'s time to convert them into paying customers or leads. After watching this week\'s modules you\'ll learn about every type of short-form funnel, whether its direct to your website, your lead magnet, or another platform. And how to make people actually click on it. This group call will be our last one on course content (congrats you\'ve made it this far) and will centre around the best conversion strategy for your business.',
      bullets: [
        'Master short-form conversion funnels',
        'Drive traffic to websites, lead magnets, and platforms',
        'Increase click-through rates with proven tactics',
        'Develop a tailored conversion strategy for your business'
      ]
    },
    {
      id: 'week8',
      week: 'Week 8',
      title: 'Dark Arts',
      icon: '✨',
      highlight: 'Implement everything you\'ve learned and get hands-on troubleshooting for your content.',
      founderTip: 'This is when most founders see their first viral hit—because you now have all the knowledge but haven\'t overthought implementation yet.',
      content: 'We\'ve taught you everything we know. Now it\'s time to put it all into practice. Be brave and try it out yourself this week, no hand holding… …Well a bit of hand holding. This week\'s call will be an open Q&A where we\'ll troubleshoot, advice and analyse everything you\'ve been through in your first week out in the wild.',
      bullets: [
        'Put everything into practice',
        'Create and publish your first content pieces',
        'Get real-time feedback and analysis',
        'Troubleshoot and optimize on the fly'
      ]
    },
    {
      id: 'week9-10',
      week: 'Week 9-10',
      title: 'Expert Support',
      icon: '🤝',
      highlight: 'Book a personalized 45-minute call with any of our experts for dedicated help.',
      content: 'Yes. But we assume you\'ll still want some help. So in this two week period you and/or your team can book in a personalised 45 minute call with any one of our experts you desire. We\'ll help in any way we can to get your content up and running smoothly.',
      bullets: [
        'Schedule a personalized expert call',
        'Address specific challenges in your content',
        'Get tailored advice for your business',
        'Fine-tune your content creation machine'
      ]
    },
    {
      id: 'week10plus',
      week: 'Week 10+',
      title: 'Alumni Status',
      icon: '🎓',
      highlight: 'Lifetime access to all resources, videos, and our founder community.',
      content: 'But don\'t forgot you\'ll continue to have lifetime access to all the course resources and videos. Plus whether you\'re looking for advice (or just wanting a chat) you\'ll still have direct communication with the founder community and our team of experts. We\'re not going anywhere. Also i\'m in love with you.',
      bullets: [
        'Ongoing access to all course content',
        'Continued founder community participation',
        'Direct access to our team of experts',
        'Stay up-to-date with short-form best practices'
      ]
    }
  ];

  useGSAP(() => {
    // Get theme variables for animations
    const styles = getComputedStyle(document.documentElement);
    const animDistance = styles.getPropertyValue('--theme-anim-distance') || '-4px';
    const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');

    // Split text into spans for animations
    const splitText = (): void => {
      const elements = document.querySelectorAll('[data-text-split]');
      elements.forEach(element => {
        new SplitType(element as HTMLElement, {
          types: 'words, chars',
          reduceWhiteSpace: false,
          tagName: 'span',
        });
      });
    };
    
    // Create header animations
    const createHeaderAnimations = (): void => {
      if (titleRef.current) {
        // For non-gradient title, animate the whole element
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: animDuration * 2, // Slightly longer for title
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            }
          }
        );
      }
      
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: animDuration * 1.5,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    };
    
    // Create timeline animations
    const createScrollAnimations = (): void => {
      // Setup progress bar animation
      if (timelineRef.current) {
        const progressBar = timelineRef.current.querySelector('.timeline-progress-bar');
        
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { height: '0%' },
            {
              height: '100%',
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 0.3
              }
            }
          );
        }
      }
      
      // Setup animations for each timeline item
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        
        // Words sliding from right animation for week titles
        const weekTitle = section.querySelector('.week-title');
        const weekHeading = section.querySelector('.week-heading');
        
        if (weekTitle) {
          const words = weekTitle.querySelectorAll('.word');
          if (words.length > 0) {
            // Set initial styles
            gsap.set(words, { 
              opacity: 0,
              x: '0.5em'
            });
            
            // Animate
            gsap.to(words, {
              opacity: 1,
              x: 0,
              duration: animDuration * 1.5,
              ease: 'power2.out',
              stagger: { amount: 0.3 },
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            });
          }
        }
        
        if (weekHeading) {
          const words = weekHeading.querySelectorAll('.word');
          if (words.length > 0) {
            gsap.set(words, { 
              opacity: 0,
              x: '0.5em'
            });
            
            gsap.to(words, {
              opacity: 1,
              x: 0,
              duration: animDuration * 1.5,
              ease: 'power2.out',
              stagger: { amount: 0.3 },
              delay: 0.2,
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            });
          }
        }
        
        // Circle animation
        const circle = section.querySelector('.timeline-circle');
        if (circle) {
          gsap.fromTo(
            circle,
            {
              scale: 0.5,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: animDuration,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
        
        // Animate decorative squares that replaced modules
        const weekSquares = section.querySelectorAll('div[class*="w-16"]');
        if (weekSquares.length > 0) {
          gsap.fromTo(
            weekSquares,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: animDuration,
              ease: 'back.out(1.7)',
              delay: 0.5,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
          
          // Add a subtle animation to the squares
          weekSquares.forEach((square) => {
            gsap.to(square, {
              boxShadow: '0 0 15px 5px rgba(var(--primary-orange-rgb), 0.2)',
              rotate: '135deg',
              repeat: -1,
              yoyo: true,
              duration: 3 + Math.random(),
              delay: Math.random() * 1.5
            });
          });
        }
        
        // Content fade in animation
        const content = section.querySelector('.content');
        if (content) {
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: animDuration * 2,
              ease: 'power2.out',
              delay: 0.3,
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
        
        // Week separator animation
        const separator = section.querySelector('.timeline-week-separator');
        if (separator) {
          gsap.fromTo(
            separator,
            {
              scaleX: 0,
              opacity: 0
            },
            {
              scaleX: 1,
              opacity: 0.2,
              duration: animDuration * 1.5,
              ease: 'power3.inOut',
              delay: 0.6,
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    };
    
    // Initialize animations
    splitText();
    
    // Need a small delay to ensure DOM is fully updated after splitting text
    setTimeout(() => {
      createHeaderAnimations();
      createScrollAnimations();
    }, 100);
    
    // Cleanup is handled automatically by useGSAP
  }, []);

  // Save section refs
  const addToRefs = (el: HTMLDivElement | null): void => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 timeline-groovy-bg relative overflow-visible">
      {/* Theme-aware floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-[40%] rotate-12 
                 opacity-[var(--theme-float-opacity)]
                 bg-[var(--theme-float-bg-primary)]
                 animate-float-slow"></div>
      <div className="absolute bottom-40 right-10 w-28 h-28 rounded-[35%] -rotate-12 
                 opacity-[var(--theme-float-opacity-secondary)]
                 bg-[var(--theme-float-bg-secondary)]
                 animate-float-medium"></div>
      
      {/* Enhanced floating elements for additional visual interest */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-[45%] rotate-45
                 opacity-[0.08] md:opacity-[0.1]
                 bg-[var(--theme-primary)]
                 animate-float-medium"></div>
      <div className="absolute bottom-1/3 left-1/5 w-36 h-36 rounded-[38%] -rotate-12
                 opacity-[0.09] md:opacity-[0.12]
                 bg-[var(--theme-accent-tertiary)]
                 animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-[30%] rotate-30
                 opacity-[0.07] md:opacity-[0.09]
                 bg-[var(--hud-orange)]
                 animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-[50%] rotate-12
                 opacity-[0.06] md:opacity-[0.08]
                 bg-[var(--accent-coral)]
                 animate-float-medium"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 overflow-visible">
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
          <h2 
            ref={titleRef}
            data-text-split="true"
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 text-theme-primary"
            style={{ opacity: 1 }}
          >
            Week by week structure
          </h2>
          <p 
            ref={introRef}
            className="text-xl md:text-2xl lg:text-3xl text-theme-primary max-w-4xl mx-auto font-medium"
            style={{ opacity: 1 }}
          >
            We know it's a lot. That's why we've broken it down into 8 weeks of structured learning to take you from short form newbie, to millions of views, in just 8 weeks.
          </p>
        </div>
        
        <div 
          ref={timelineRef}
          className="timeline-container relative"
        >
          {/* Golden ratio grid for timeline positioning */}
          <div className="absolute inset-0 grid-cols-golden-ratio">
            {/* Timeline progress bar - positioned using golden ratio */}
            <div 
              className="timeline-progress absolute left-[30px] md:left-[38.2%] top-0 bottom-0 w-[2px] md:w-[4px] bg-theme-bg-secondary"
              style={{ transform: 'translateX(-50%)' }} /* Center the line */
            >
              <div 
                className="progress-bar timeline-progress-bar absolute top-0 left-0 w-full origin-top h-0" 
              ></div>
            </div>
          </div>
          
          {/* Timeline items */}
          <div className="relative z-10 space-y-20 md:space-y-28 lg:space-y-36">
            {courseWeeks.map((week) => (
              <div 
                key={week.id}
                id={week.id}
                ref={addToRefs}
                className="relative grid-cols-golden-ratio gap-6 md:gap-8"
                style={{ display: 'grid' }}
              >
                {/* Timeline week separator */}
                <div className="timeline-week-separator"></div>
                
                {/* Circle marker - positioned using golden ratio with proper centering on line */}
                <div 
                  className={`timeline-circle week-${week.id.replace('week', '')}-circle absolute left-[30px] md:left-[38.2%] top-0 w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full border-[4px] shadow-theme-md z-10 border-theme-surface`}
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    marginTop: '8px',
                    opacity: 1
                  }}
                ></div>
                
                {/* Left side (week number) - golden ratio aligned */}
                <div className="hidden md:flex md:flex-col md:justify-start md:items-end pt-2 pr-12">
                  <h3 
                    data-text-split="true"
                    className="week-title vs-text-gradient-orange font-black mb-6 tracking-tight"
                    style={{ opacity: 1 }}
                  >
                    {week.week}
                  </h3>
                  
                  {/* Visual element for the week (just a decorative square) */}
                  <div 
                    className="w-16 h-16 rounded-lg mb-4 shadow-theme-md week-visual-element"
                    style={{ 
                      backgroundColor: getWeekColors(week.id)[0]
                    }}
                  ></div>
                </div>
                
                {/* Right side (content) - takes remaining space */}
                <div className="pl-20 md:pl-6">
                  {/* Mobile week number - only visible on small screens */}
                  <h3 
                    data-text-split="true"
                    className="week-title vs-text-gradient-orange font-black mb-6 md:hidden tracking-tight"
                    style={{ opacity: 1 }}
                  >
                    {week.week}
                  </h3>
                  
                  {/* Mobile visual element - only visible on small screens */}
                  <div className="md:hidden flex flex-row flex-wrap gap-3 mb-4">
                    <div 
                      className="w-14 h-14 rounded-lg shadow-theme-md week-visual-element"
                      style={{ backgroundColor: getWeekColors(week.id)[0] }}
                    ></div>
                  </div>
                  
                  <h3 
                    data-text-split="true"
                    className="week-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight text-theme-accent-tertiary flex items-center" 
                    style={{ opacity: 1 }}
                  >
                    {week.icon && <span className="week-icon">{week.icon}</span>} {week.title}
                  </h3>
                  
                  <div 
                    className={`content timeline-card week-${week.id.replace('week', '')}-card rounded-lg p-7 md:p-9 lg:p-11 relative overflow-hidden bg-theme-surface shadow-theme-md border-l-[6px]`}
                    style={{ opacity: 1 }}
                  >
                    
                    {/* Decorative corner */}
                    <div 
                      className="timeline-corner-accent absolute top-0 right-0 w-24 h-24 bg-theme-bg-secondary"
                    ></div>
                    
                    {/* Multiple floating elements for enhanced visual interest */}
                    <div 
                      className="timeline-float absolute -bottom-8 -left-8 w-16 h-16 rounded-[40%] rotate-12 
                               bg-[var(--theme-float-bg-secondary)]">
                    </div>
                    <div 
                      className="timeline-float absolute top-1/3 -right-6 w-10 h-10 rounded-[38%] -rotate-12 
                               opacity-[0.15]
                               bg-[var(--theme-float-bg-primary)]
                               animate-float-medium">
                    </div>
                    
                    {/* Highlighted key phrase */}
                    {week.highlight && (
                      <div className="highlight-text">{week.highlight}</div>
                    )}
                    
                    {/* Main content paragraph */}
                    <p className="text-theme-secondary relative z-10 text-lg md:text-xl lg:text-2xl leading-relaxed">
                      {week.content}
                    </p>
                    
                    {/* Bullet points for easy scanning */}
                    {week.bullets && week.bullets.length > 0 && (
                      <ul className="week-bullets">
                        {week.bullets.map((bullet, idx) => (
                          <li key={`${week.id}-bullet-${idx}`}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Founder tips */}
                    {week.founderTip && (
                      <div className="founder-tip">
                        {week.founderTip}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseTimeline; 