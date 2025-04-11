import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useGSAP } from "@gsap/react";
import '../styles/week-by-week.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import for dropdown icon
import { ChevronDown } from 'lucide-react';

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

// Dropdown component for week content
const WeekDropdown: React.FC<{
  week: CourseWeek;
  color: string;
  isOpen: boolean;
  toggle: () => void;
}> = ({ week, color, isOpen, toggle }) => {
  const dropdownHeaderRef = useRef<HTMLDivElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen && dropdownContentRef.current) {
      gsap.fromTo(
        dropdownContentRef.current,
        { height: 0, opacity: 0 },
        { 
          height: 'auto', 
          opacity: 1, 
          duration: 0.4, 
          ease: 'power2.out'
        }
      );
    } else if (!isOpen && dropdownContentRef.current) {
      gsap.to(
        dropdownContentRef.current,
        { 
          height: 0, 
          opacity: 0, 
          duration: 0.3, 
          ease: 'power2.in'
        }
      );
    }
  }, [isOpen]);

  return (
    <div className="week-dropdown bg-theme-surface rounded-lg shadow-theme-sm overflow-hidden">
      {/* Header (always visible) with underline */}
      <div 
        ref={dropdownHeaderRef}
        onClick={toggle} 
        className="flex items-center justify-between p-4 cursor-pointer hover-bubbly-sm transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {week.icon && <span className="week-icon text-xl md:text-2xl">{week.icon}</span>}
          <h4 className="font-medium text-theme-primary text-base md:text-lg">
            {week.highlight || week.title}
          </h4>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-theme-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      
      {/* Orange underline */}
      <div 
        className="h-[2px] w-full" 
        style={{ backgroundColor: color }}
      />
      
      {/* Collapsible content */}
      <div 
        ref={dropdownContentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="p-5">
          {/* Main content */}
          <p className="text-theme-secondary mb-4">
            {week.content}
          </p>
          
          {/* Bullet points */}
          {week.bullets && week.bullets.length > 0 && (
            <ul className="week-bullets space-y-2 mb-4">
              {week.bullets.map((bullet, idx) => (
                <li key={`${week.id}-bullet-${idx}`} className="flex items-start">
                  <span className="text-theme-accent mr-2">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          
          {/* Founder tips */}
          {week.founderTip && (
            <div className="founder-tip bg-theme-bg-secondary/30 border-l-4 border-theme-accent-secondary p-4 rounded-r-md">
              <span className="text-theme-accent-secondary font-medium block mb-1">Founder Tip:</span>
              {week.founderTip}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CourseTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Toggle dropdown function
  const toggleDropdown = (weekId: string) => {
    setOpenDropdown(openDropdown === weekId ? null : weekId);
  };

  // Define color themes for each week (theme-aware)
  const getWeekColors = (weekId: string): string => {
    const colorMap: Record<string, string> = {
      'week0': 'var(--hud-teal)',
      'week1': 'var(--primary-orange)',
      'week2': 'var(--hud-coral)',
      'week3': 'var(--accent-coral)',
      'week4': 'var(--secondary-teal)',
      'week5': 'var(--accent-pink)',
      'week6': 'var(--accent-yellow)',
      'week7': 'var(--hud-red)',
      'week8': 'var(--secondary-teal-light)',
      'week9-10': 'var(--primary-orange-light)',
      'week10plus': 'var(--hud-orange)',
    };
    
    return colorMap[weekId] || 'var(--primary-orange)';
  };

  const courseWeeks: CourseWeek[] = [
    {
      id: 'week0',
      week: 'Week 0',
      title: 'For the Nerds',
      icon: '🧠',
      highlight: 'Immediate access to the exclusive founder community',
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
      highlight: 'Master the key theory, algorithms, and strategies',
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
      highlight: 'Position yourself as the go-to expert in your field',
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
      highlight: 'Learn advanced hooking and storytelling techniques',
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
      highlight: 'Take a breather, practice, or catch up on content',
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
      highlight: 'Create an efficient content machine with minimal input',
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
      highlight: 'Turn those views into actual revenue',
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
      highlight: 'Convert viewers into paying customers and leads',
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
      highlight: 'Get hands-on troubleshooting for your content',
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
      highlight: 'Book a personalized call with our experts',
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
      highlight: 'Lifetime access to resources and our community',
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

    // Split text for animations
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
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: animDuration * 1.5,
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
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: animDuration * 1.2,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    };
    
    // Create timeline animations with scroll-based drawing
    const createScrollAnimations = (): void => {
      // Setup progress bar animation that draws on scroll
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
                start: 'top 90%',
                end: 'bottom 20%',
                scrub: 0.5, // Smoother scrubbing effect
              }
            }
          );
        }
      }
      
      // Setup animations for each timeline item
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        // Week title and number animations
        const weekTitle = section.querySelector('.week-title');
        const weekNum = section.querySelector('.week-num');
        
        if (weekTitle) {
          gsap.fromTo(
            weekTitle,
            { opacity: 0, x: -15 },
            {
              opacity: 1,
              x: 0,
              duration: animDuration * 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
        
        if (weekNum) {
          gsap.fromTo(
            weekNum,
            { opacity: 0, x: -10 },
            {
              opacity: 0.7, // Slightly less opaque to show it's secondary
              x: 0,
              duration: animDuration,
              delay: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
        
        // Circle marker animation
        const circle = section.querySelector('.timeline-circle');
        if (circle) {
          gsap.fromTo(
            circle,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: animDuration,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
        
        // Dropdown animation
        const dropdown = section.querySelector('.week-dropdown');
        if (dropdown) {
          gsap.fromTo(
            dropdown,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: animDuration * 1.2,
              ease: 'power2.out',
              delay: 0.2,
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    };
    
    // Initialize animations
    splitText();
    
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      createHeaderAnimations();
      createScrollAnimations();
    }, 100);
    
  }, []);

  // Save section refs
  const addToRefs = (el: HTMLDivElement | null): void => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 timeline-groovy-bg relative overflow-hidden">
      {/* Theme-aware floating elements (reduced amount for less visual clutter) */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-[40%] rotate-12 
                 opacity-theme-float
                 bg-theme-float-primary
                 animate-float-slow"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 rounded-[35%] -rotate-12 
                 opacity-theme-float-secondary
                 bg-theme-float-secondary
                 animate-float-medium"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 
            ref={titleRef}
            className="text-2xl md:text-3xl font-semibold mb-6 text-theme-primary"
          >
            We know it's a lot.
          </h2>
          <p 
            ref={introRef}
            className="text-theme-secondary text-lg md:text-xl mx-auto max-w-[90%] md:max-w-3xl"
          >
            That's why we've broken it down into 8 weeks of structured learning to take you from short form newbie, to millions of views, in just 8 weeks.
          </p>
        </div>
        
        <div 
          ref={timelineRef}
          className="timeline-container relative"
        >
          {/* Timeline line */}
          <div className="absolute left-[24px] md:left-[38.2%] top-0 bottom-0 w-[2px] md:w-[3px] bg-theme-bg-secondary/30"
               style={{ transform: 'translateX(-50%)' }}>
            {/* Progress bar that draws on scroll */}
            <div className="timeline-progress-bar absolute top-0 left-0 w-full h-0 bg-theme-primary"></div>
          </div>
          
          {/* Timeline items */}
          <div className="relative z-10 space-y-12 md:space-y-16">
            {courseWeeks.map((week) => (
              <div 
                key={week.id}
                id={week.id}
                ref={addToRefs}
                className="relative grid md:grid-cols-[38.2%_61.8%] gap-4 md:gap-6"
              >
                {/* Circle marker */}
                <div 
                  className={`timeline-circle absolute left-[24px] md:left-[38.2%] top-0 w-12 h-12 rounded-full border-[3px] shadow-theme-sm z-10`}
                  style={{ 
                    transform: 'translate(-50%, 0)',
                    backgroundColor: getWeekColors(week.id),
                    borderColor: 'var(--theme-bg-surface)'
                  }}
                ></div>
                
                {/* LEFT SIDE: Week number followed by title (rearranged) */}
                <div className="hidden md:flex md:flex-col md:justify-start md:items-end pt-0 pr-10">
                  {/* Week number first (now above title) with colon */}
                  <span className="week-num text-xl font-medium text-theme-secondary mb-1">
                    {week.week}:
                  </span>
                  
                  {/* Week title below, MUCH smaller */}
                  <h3 className="week-title text-base font-medium vs-text-gradient-orange">
                    {week.title}
                  </h3>
                </div>
                
                {/* RIGHT SIDE: Mobile title + dropdown content */}
                <div className="pl-16 md:pl-0">
                  {/* Mobile week title and number - only visible on small screens */}
                  <div className="md:hidden mb-3">
                    {/* Week number first with colon */}
                    <span className="week-num text-lg font-medium text-theme-secondary block mb-0.5">
                      {week.week}:
                    </span>
                    {/* Week title below, smaller */}
                    <h3 className="week-title text-sm font-medium vs-text-gradient-orange">
                      {week.title}
                    </h3>
                  </div>
                  
                  {/* Week dropdown component */}
                  <WeekDropdown
                    week={week}
                    color={getWeekColors(week.id)}
                    isOpen={openDropdown === week.id}
                    toggle={() => toggleDropdown(week.id)}
                  />
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