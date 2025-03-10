import React, { useState, useEffect, useRef, FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JSX } from 'react/jsx-runtime';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Import only common Hero Icons
import { 
  UserIcon, 
  VideoCameraIcon, 
  PencilIcon, 
  DocumentIcon,
  ClockIcon,
  CogIcon, 
  CheckCircleIcon,
  BookOpenIcon,
  ChartBarIcon,
  StarIcon,
  BeakerIcon,
  CubeIcon,
  CurrencyPoundIcon
} from '@heroicons/react/24/solid';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface Track {
  name: string;
  color: string;
  icon: JSX.Element;
}

interface Resource {
  type: 'PDF' | 'Workshop' | 'Test' | 'Video' | 'Template' | 'Worksheet' | 'Code' | 'System' | 'Framework';
  name: string;
}

interface ModuleNames {
  [key: string]: string[];
}

interface ResourceColors {
  [key: string]: string;
}

interface Submodule {
  title: string;
  duration: string;
}

interface Module {
  id: number;
  name: string;
  category: string;
  tracks: string[];
  resources: Resource[];
  description: string;
  submodules: Submodule[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  durationHours: number;
}

const ContentOverwhelmer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animationsRef = useRef<(gsap.core.Timeline | gsap.core.Tween)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  
  // State for active track filtering and expanded module
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Define tracks with their respective colors and Hero Icons
  const tracks: Track[] = [
    { name: "FOUNDER", color: "#FEA35D", icon: <UserIcon className="w-5 h-5" /> },
    { name: "CREATOR", color: "#F89A67", icon: <VideoCameraIcon className="w-5 h-5" /> },
    { name: "WRITER", color: "#154D59", icon: <PencilIcon className="w-5 h-5" /> },
    { name: "EDITOR", color: "#387292", icon: <BeakerIcon className="w-5 h-5" /> },
    { name: "VIDEOGRAPHER", color: "#DE6B59", icon: <VideoCameraIcon className="w-5 h-5" /> },
  ];
  
  // Expanded curriculum categories for more content
  const categories: string[] = [
    "Theory Basics", "Theory Advanced", "Shooting", "Research & Writing", 
    "Editing", "Monetisation", "Content Strategy", "Growth Systems",
    "Audience Building", "Platform Mastery", "Production Workflow", "Creator Automation"
  ];

  // Generate much more content for overwhelming effect
  const generateModules = (): Module[] => {
    const modules: Module[] = [];
    let id = 0;
    
    categories.forEach(category => {
      // 5-8 modules per category for overwhelming effect
      const moduleCount = 5 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < moduleCount; i++) {
        // Assign 1-4 random tracks to each module
        const moduleTrackCount = 1 + Math.floor(Math.random() * 3);
        const moduleTrackIndices = new Set<number>();
        
        while (moduleTrackIndices.size < moduleTrackCount) {
          moduleTrackIndices.add(Math.floor(Math.random() * tracks.length));
        }
        
        const moduleTracks = Array.from(moduleTrackIndices).map(idx => tracks[idx].name);
        
        // 3-6 resources per module for overwhelming effect
        const resourceCount = 3 + Math.floor(Math.random() * 4);
        
        // 3-6 submodules
        const submoduleCount = 3 + Math.floor(Math.random() * 4);
        
        // Difficulty level
        const difficulties: ('Beginner' | 'Intermediate' | 'Advanced' | 'Expert')[] = 
          ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        
        modules.push({
          id: id++,
          name: getRandomModuleName(category),
          category,
          tracks: moduleTracks,
          resources: getResources(resourceCount),
          description: getRandomDescription(category),
          submodules: getRandomSubmodules(submoduleCount),
          difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
          durationHours: 2 + Math.floor(Math.random() * 8)
        });
      }
    });
    
    return modules;
  };
  
  // Generate all modules
  const allModules = useRef(generateModules()).current;
  
  // Filter modules by active track
  const filteredModules = activeTrack 
    ? allModules.filter(module => module.tracks.includes(activeTrack))
    : allModules;

  // Handle module expansion
  const handleModuleClick = (moduleId: number) => {
    setExpandedModuleId(prevId => prevId === moduleId ? null : moduleId);
  };

  // Setup and cleanup animations
  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;
    
    // Clear previous animations and scroll triggers
    animationsRef.current.forEach(tl => tl.kill());
    scrollTriggersRef.current.forEach(st => st.kill());
    animationsRef.current = [];
    scrollTriggersRef.current = [];
    
    // Animation for the path that connects modules
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
    
    const pathTween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.inOut",
      paused: true
    });
    
    const pathTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: (self) => {
        pathTween.progress(self.progress);
      }
    });
    
    scrollTriggersRef.current.push(pathTrigger);
    
    // Animate modules in without ScrollTrigger for filtering
    const moduleElements = gsap.utils.toArray('.module');
    if (moduleElements.length) {
      gsap.set(moduleElements, { opacity: 0, y: 20 });
      
      const modulesTl = gsap.to(moduleElements, {
        opacity: 1,
        y: 0,
        stagger: 0.01,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          // After modules are visible, animate resource cards
          animateResourceCards();
        }
      });
      
      animationsRef.current.push(modulesTl);
    }
    
    // Add subtle floating animations to resource cards
    function animateResourceCards() {
      const resourceCards = document.querySelectorAll('.resource-card');
      resourceCards.forEach(card => {
        const tl = gsap.to(card, {
          // Reduced animation by ~70%
          y: () => Math.random() * 2.5 - 1.25,
          x: () => Math.random() * 2 - 1,
          rotation: () => Math.random() * 1.2 - 0.6,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        animationsRef.current.push(tl);
      });
    }
    
    // Add counter animation for stats
    const statCounters = document.querySelectorAll('.stat-counter');
    statCounters.forEach(counter => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const target = Number(counter.getAttribute('data-target') || 0);
      const counterTl = gsap.from(counter, {
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
        }
      });
      
      animationsRef.current.push(counterTl);
    });
    
    // Cleanup on unmount
    return () => {
      animationsRef.current.forEach(tl => tl.kill());
      scrollTriggersRef.current.forEach(st => st.kill());
    };
  }, [activeTrack]); // Only run when activeTrack changes
  
  // Handle expanded module animations
  useEffect(() => {
    // Clean up any existing expand/collapse animations
    gsap.killTweensOf(".module-expanded-content");
    
    // Handle animation for expanded content
    if (expandedModuleId !== null) {
      const expandedContent = document.querySelector(`#module-${expandedModuleId} .module-expanded-content`);
      if (expandedContent) {
        // Expand animation
        gsap.fromTo(
          expandedContent, 
          { height: 0, opacity: 0, overflow: "hidden" },
          { 
            height: "auto", 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out",
            onComplete: function() {
              gsap.set(expandedContent, { overflow: "visible" });
            }
          }
        );
      }
    }
  }, [expandedModuleId]);
  
  // Handle track selection
  const handleTrackClick = (trackName: string) => {
    setExpandedModuleId(null); // Close any expanded module
    setActiveTrack(prevTrack => prevTrack === trackName ? null : trackName);
  };

  return (
    <section className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Content That Overwhelms
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See exactly what you'll learn in each module of the program.
          </p>
        </div>

        <div className={`transition-all duration-500 ${isExpanded ? 'max-h-[2000px]' : 'max-h-[500px] overflow-hidden relative'}`}>
          <div className="bg-gradient-to-b from-[#09232F] to-[#350013] text-white py-14 w-full overflow-hidden relative">
            {/* Floating background elements to create visual overwhelm */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-lg opacity-10"
                  style={{
                    width: 20 + Math.random() * 100,
                    height: 20 + Math.random() * 100,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    backgroundColor: tracks[i % tracks.length].color,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
            
            <div className="max-w-full mx-auto px-6 relative z-10">
              {/* Headline */}
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#FEAC6D]">INSANE AMOUNT OF CONTENT</h2>
                <p className="text-xl md:text-2xl max-w-4xl mx-auto text-[#FDEBDD] mb-6">
                  No fluff. <span className="font-bold">178+ modules</span>, <span className="font-bold">450+ resources</span>, and <span className="font-bold">1000+ hours</span> of content creation expertise.
                </p>
                
                {/* Resource types preview - overwhelming amount of resources */}
                <div className="flex justify-center flex-wrap gap-2 max-w-4xl mx-auto mb-8">
                  {[
                    {name: 'Workshops', icon: <BookOpenIcon className="w-4 h-4" />},
                    {name: 'PDFs', icon: <DocumentIcon className="w-4 h-4" />},
                    {name: 'Templates', icon: <DocumentIcon className="w-4 h-4" />},
                    {name: 'Frameworks', icon: <CubeIcon className="w-4 h-4" />},
                    {name: 'Systems', icon: <CogIcon className="w-4 h-4" />},
                    {name: 'Code Snippets', icon: <CogIcon className="w-4 h-4" />},
                    {name: 'Worksheets', icon: <CheckCircleIcon className="w-4 h-4" />},
                    {name: 'Swipe Files', icon: <DocumentIcon className="w-4 h-4" />},
                    {name: 'Checklists', icon: <CheckCircleIcon className="w-4 h-4" />},
                    {name: 'Video Tutorials', icon: <VideoCameraIcon className="w-4 h-4" />}
                  ].map((resource, i) => (
                    <div 
                      key={resource.name}
                      className="text-sm px-3 py-1.5 rounded-full flex items-center"
                      style={{ 
                        backgroundColor: `${tracks[i % tracks.length].color}30`,
                        borderLeft: `3px solid ${tracks[i % tracks.length].color}`
                      }}
                    >
                      <span className="mr-1.5">{resource.icon}</span>
                      {resource.name}
                    </div>
                  ))}
                </div>
                
                {/* Track Buttons */}
                <div className="flex justify-center flex-wrap mb-8 max-w-4xl mx-auto">
                  {tracks.map((track) => (
                    <button 
                      key={track.name}
                      onClick={() => handleTrackClick(track.name)}
                      className={`group m-1.5 px-5 py-2.5 rounded-full border-2 transition-all flex items-center ${
                        activeTrack === track.name ? 'scale-105 shadow-lg' : 'hover:scale-105'
                      }`}
                      style={{ 
                        borderColor: track.color, 
                        backgroundColor: activeTrack === track.name ? track.color : `${track.color}20`
                      }}
                    >
                      <span className="mr-2 text-white">{track.icon}</span>
                      <span className={`font-bold text-base ${activeTrack === track.name ? 'text-white' : ''}`}>{track.name}</span>
                      <span className={`ml-2 text-sm px-2 py-0.5 rounded-full ${
                        activeTrack === track.name ? 'bg-white/20 text-white' : 'bg-white/10 text-white'
                      }`}>TRACK</span>
                    </button>
                  ))}
                  
                  {activeTrack && (
                    <button 
                      onClick={() => setActiveTrack(null)}
                      className="m-1.5 px-5 py-2.5 rounded-full border-2 border-white/30 transition-all hover:border-white/60"
                    >
                      <span className="font-bold text-base">SHOW ALL</span>
                    </button>
                  )}
                </div>
                
                {/* Filtered Results Count */}
                {activeTrack && (
                  <div className="text-[#FDEBDD] text-lg mb-6">
                    Showing {filteredModules.length} modules for the {activeTrack} track
                  </div>
                )}
              </div>
              
              {/* Module visualization - larger 3 column grid */}
              <div ref={containerRef} className="relative pb-10 max-w-7xl mx-auto">
                {/* Connecting path */}
                <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                  <path
                    ref={pathRef}
                    d="M50,50 C150,100 250,150 350,100 S450,50 550,100 S650,150 750,100 S850,50 950,100"
                    fill="none"
                    stroke="#FEA35D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="5,5"
                    className="path-animation"
                  />
                </svg>
                
                {/* "Value Explosion" elements - scattered content indicators */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const size = 30 + Math.random() * 60;
                    return (
                      <div
                        key={`value-${i}`}
                        className="absolute rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          width: size,
                          height: size,
                          top: `${10 + Math.random() * 80}%`,
                          left: `${Math.random() * 100}%`,
                          backgroundColor: `${tracks[i % tracks.length].color}20`,
                          border: `1px solid ${tracks[i % tracks.length].color}`,
                          opacity: 0.7,
                        }}
                      >
                        {i % 6 === 0 && <DocumentIcon className="w-5 h-5" />}
                        {i % 6 === 1 && <BookOpenIcon className="w-5 h-5" />}
                        {i % 6 === 2 && <StarIcon className="w-5 h-5" />}
                        {i % 6 === 3 && <CogIcon className="w-5 h-5" />}
                        {i % 6 === 4 && <CogIcon className="w-5 h-5" />}
                        {i % 6 === 5 && <StarIcon className="w-5 h-5" />}
                      </div>
                    );
                  })}
                </div>
                
                {/* Module grid - 3 columns with larger modules */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
                  {filteredModules.map((module) => (
                    <div 
                      key={module.id}
                      id={`module-${module.id}`}
                      onClick={() => handleModuleClick(module.id)}
                      className={`module p-5 rounded-lg backdrop-blur-sm bg-black/30 border transition-all cursor-pointer group ${
                        expandedModuleId === module.id 
                          ? 'border-[#FEAC6D] shadow-lg shadow-[#FEAC6D]/10'
                          : 'border-[#154D59]/50 hover:border-[#154D59]'
                      }`}
                      style={{
                        transform: `rotate(${Math.random() * 0.6 - 0.3}deg)`,
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-3"
                          style={{ backgroundColor: tracks[module.id % tracks.length].color }}
                        >
                          {module.id + 1}
                        </div>
                        <h3 className={`text-lg font-bold group-hover:text-[#FEAC6D] transition-colors ${
                          expandedModuleId === module.id ? 'text-[#FEAC6D]' : ''
                        }`}>
                          {module.name}
                        </h3>
                      </div>
                      
                      {/* Category tag */}
                      <div className="ml-12 mb-3">
                        <span className="text-sm px-2.5 py-1 rounded bg-black/30 text-[#FDEBDD]">
                          {module.category}
                        </span>
                      </div>
                      
                      {/* Track indicators */}
                      <div className="ml-12 flex mb-3">
                        {module.tracks.map((trackName, idx) => {
                          const track = tracks.find(t => t.name === trackName);
                          return track ? (
                            <div 
                              key={idx}
                              className="flex items-center mr-2 px-2 py-1 rounded-full text-sm" 
                              style={{ backgroundColor: `${track.color}40` }}
                              title={track.name}
                            >
                              <span className="mr-1.5 text-white">{track.icon}</span>
                              <span>{track.name.substring(0, 1)}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                      
                      {/* Resources - stacked with overlap for overwhelming effect */}
                      <div className="ml-10 flex flex-wrap relative">
                        {module.resources.slice(0, expandedModuleId === module.id ? 4 : 3).map((resource, i) => (
                          <div 
                            key={i}
                            className="resource-card px-2.5 py-1 text-sm rounded mr-1.5 mb-1.5 flex items-center transition-transform hover:scale-105 hover:z-10 shadow-sm"
                            style={{ 
                              backgroundColor: getResourceColor(resource.type),
                              transform: `translateX(${i * -3}px) translateY(${i % 2 === 0 ? -2 : 2}px)`,
                              zIndex: module.resources.length - i,
                            }}
                          >
                            {getResourceIcon(resource.type)}
                            <span className="ml-1.5">{resource.name.split(' ').slice(0, 2).join(' ')}</span>
                          </div>
                        ))}
                        
                        {/* Resource count badge */}
                        <div 
                          className="absolute right-0 -top-3 w-6 h-6 rounded-full bg-[#B92234] text-white text-xs flex items-center justify-center"
                          title={`${module.resources.length} resources`}
                        >
                          {module.resources.length}
                        </div>
                      </div>
                      
                      {/* Expanded view when clicked */}
                      <div className="module-expanded-content overflow-hidden h-0 opacity-0">
                        <div className="mt-6 pt-4 border-t border-[#154D59]/50">
                          {/* Module description */}
                          <div className="mb-4">
                            <h4 className="text-base font-bold mb-2 text-[#FEAC6D]">About This Module:</h4>
                            <p className="text-[#FDEBDD]/90">{module.description}</p>
                          </div>
                          
                          {/* Module metadata */}
                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center bg-black/30 px-3 py-1.5 rounded">
                              <ChartBarIcon className="w-4 h-4 mr-1.5 text-[#FEAC6D]" />
                              <span>{module.difficulty}</span>
                            </div>
                            <div className="flex items-center bg-black/30 px-3 py-1.5 rounded">
                              <ClockIcon className="w-4 h-4 mr-1.5 text-[#FEAC6D]" />
                              <span>{module.durationHours} hours</span>
                            </div>
                          </div>
                          
                          {/* Submodules */}
                          <div className="mb-4">
                            <h4 className="text-base font-bold mb-2 text-[#FEAC6D]">What You'll Learn:</h4>
                            <ul className="space-y-2.5 ml-1">
                              {module.submodules.map((submodule, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="min-w-5 w-5 h-5 rounded-full bg-[#154D59] flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-xs">{idx + 1}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium">{submodule.title}</div>
                                    <div className="text-sm text-[#FDEBDD]/70">{submodule.duration}</div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Resources */}
                          <div>
                            <h4 className="text-base font-bold mb-2 text-[#FEAC6D]">Included Resources:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {module.resources.map((resource, idx) => (
                                <div 
                                  key={idx}
                                  className="resource-full flex items-center p-2 rounded"
                                  style={{ backgroundColor: `${getResourceColor(resource.type)}30` }}
                                >
                                  {getResourceIcon(resource.type)}
                                  <span className="ml-2 text-sm">{resource.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Overwhelming resource statistics */}
                <div className="bg-black/20 backdrop-blur-sm mt-10 p-5 rounded-lg border border-[#FEA35D]/30">
                  <div className="text-xl font-bold mb-3 text-center text-[#FDEBDD]">WHAT YOU'RE GETTING</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { count: 178, label: "Modules", icon: <DocumentIcon className="w-5 h-5" /> },
                      { count: 42, label: "Workshops", icon: <BookOpenIcon className="w-5 h-5" /> },
                      { count: 89, label: "PDFs", icon: <DocumentIcon className="w-5 h-5" /> },
                      { count: 64, label: "Templates", icon: <DocumentIcon className="w-5 h-5" /> },
                      { count: 37, label: "Systems", icon: <CogIcon className="w-5 h-5" /> },
                      { count: 146, label: "Resources", icon: <CheckCircleIcon className="w-5 h-5" /> },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-3 bg-black/20 rounded">
                        <div className="flex justify-center mb-1">{stat.icon}</div>
                        <div 
                          className="stat-counter text-2xl font-bold text-[#FEAC6D]" 
                          data-target={stat.count}
                        >
                          {stat.count}
                        </div>
                        <div className="text-sm uppercase tracking-wider mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Extra content metrics for overwhelming effect */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
                    <div className="w-10 h-10 rounded-full bg-[#FEA35D] flex items-center justify-center">
                      <DocumentIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-[#FDEBDD]/70">CONTENT LENGTH</div>
                      <div className="font-bold text-lg">1,000+ Hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
                    <div className="w-10 h-10 rounded-full bg-[#154D59] flex items-center justify-center">
                      <BookOpenIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-[#FDEBDD]/70">EXPERIENCE LEVEL</div>
                      <div className="font-bold text-lg">Beginner to Expert</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
                    <div className="w-10 h-10 rounded-full bg-[#DE6B59] flex items-center justify-center">
                      <CogIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-[#FDEBDD]/70">UPDATES</div>
                      <div className="font-bold text-lg">Monthly New Content</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
                    <div className="w-10 h-10 rounded-full bg-[#B92234] flex items-center justify-center">
                      <CurrencyPoundIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-[#FDEBDD]/70">VALUE</div>
                      <div className="font-bold text-lg">£50,000+</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content organization preview - to show structure amid overwhelm */}
              <div className="max-w-5xl mx-auto my-10 bg-[#09232F]/60 p-5 rounded-lg border border-[#154D59]">
                <div className="text-center mb-5">
                  <div className="text-2xl font-bold text-[#FEAC6D]">CONTENT ORGANIZATION</div>
                  <p className="text-base text-[#FDEBDD]/80">All meticulously structured for your learning journey</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="text-lg text-[#FEAC6D] font-bold mb-3">FOUNDATIONS</div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#FEAC6D] rounded-full mr-2"></span>
                        <span>Theory Basics (12 modules)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#FEAC6D] rounded-full mr-2"></span>
                        <span>Platform Mechanics (9 modules)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#FEAC6D] rounded-full mr-2"></span>
                        <span>Content Framework (15 modules)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="text-lg text-[#DE6B59] font-bold mb-3">PRODUCTION</div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#DE6B59] rounded-full mr-2"></span>
                        <span>Filming & Editing (18 modules)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#DE6B59] rounded-full mr-2"></span>
                        <span>Script Writing (14 modules)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#DE6B59] rounded-full mr-2"></span>
                        <span>Production Value (11 modules)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="text-lg text-[#154D59] font-bold mb-3">GROWTH</div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#154D59] rounded-full mr-2"></span>
                        <span>Algorithmic Strategy (16 modules)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#154D59] rounded-full mr-2"></span>
                        <span>Audience Building (13 modules)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#154D59] rounded-full mr-2"></span>
                        <span>Monetization (15 modules)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09232F] to-transparent" />
          )}
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="gap-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

// Helper functions for module generation
function getRandomModuleName(category: string): string {
  const prefixes: string[] = ["Mastering", "Advanced", "Essential", "Practical", "Strategic", "Complete", "Professional"];
  const suffixes: string[] = ["Techniques", "Framework", "System", "Approach", "Methodology", "Blueprint", "Formula", "Playbook"];
  
  const moduleNames: ModuleNames = {
    "Theory Basics": ["Hooks", "Framing", "Scripting", "Algorithmic Reality", "Cardinal Rules"],
    "Theory Advanced": ["Nuanced Hooks", "Complex Formats", "Script Mastery", "Data Iteration"],
    "Shooting": ["Camera Setup", "Lighting", "Movement", "Solo Production", "Studio Setup"],
    "Editing": ["Pacing", "Transitions", "Color Theory", "Audio Enhancement", "Visual Effects"],
    "Monetisation": ["Platform Strategy", "Partnerships", "Business Models", "Conversion"],
    "Research & Writing": ["Keyword Research", "Scriptwriting", "Idea Generation", "Content Planning"],
    "Content Strategy": ["Pillar Content", "Content Franchises", "Topic Research", "Audience Targeting"],
    "Growth Systems": ["Viral Triggers", "Engagement Loops", "Growth Frameworks", "Scaling Content"],
    "Audience Building": ["Community Strategy", "Loyalty Systems", "Audience Segmentation", "Fan Activation"],
    "Platform Mastery": ["Algorithm Hacking", "Platform Features", "Cross-Platform Strategy", "Platform Selection"],
    "Production Workflow": ["Team Coordination", "Content Calendar", "Batch Production", "Approval Processes"],
    "Creator Automation": ["Content Systems", "Delegation Strategy", "Tools & Software", "Scaling Production"]
  };
  
  const names: string[] = moduleNames[category] || ["Content", "Strategy", "Creation", "Growth", "Engagement"];
  const prefix: string = prefixes[Math.floor(Math.random() * prefixes.length)];
  const name: string = names[Math.floor(Math.random() * names.length)];
  const suffix: string = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${name} ${suffix}`;
}

function getRandomDescription(category: string): string {
  const descriptions = [
    `Master the core principles of ${category.toLowerCase()} with practical examples and industry insights that have generated millions of views for top creators.`,
    `Learn advanced strategies for ${category.toLowerCase()} that will set your content apart from competitors and dramatically increase your engagement rates.`,
    `A comprehensive guide to ${category.toLowerCase()} with proven techniques from top creators who have built multi-million pound businesses through short-form content.`,
    `Build your skills in ${category.toLowerCase()} from fundamentals to advanced applications, with frameworks that work across all major platforms.`,
    `Transform your approach to ${category.toLowerCase()} with data-driven methods and frameworks that consistently outperform standard industry practices.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function getRandomSubmodules(count: number): Submodule[] {
  const submodulePrefixes = ['Introduction to', 'Understanding', 'Applying', 'Mastering', 'Advanced', 'Practical'];
  const submoduleTopics = ['Hooks', 'Audience Engagement', 'Visual Storytelling', 'Script Structure', 'Analytics', 
                           'Platform Optimization', 'Content Planning', 'Editing Techniques', 'Growth Tactics',
                           'Monetization Methods', 'Community Building', 'Performance Analysis'];
  
  const submodules: Submodule[] = [];
  
  for (let i = 0; i < count; i++) {
    const prefix = submodulePrefixes[Math.floor(Math.random() * submodulePrefixes.length)];
    const topic = submoduleTopics[Math.floor(Math.random() * submoduleTopics.length)];
    
    // Generate random duration between 10 and 70 minutes
    const minutes = 10 + Math.floor(Math.random() * 60);
    const duration = `${minutes} minutes`;
    
    submodules.push({
      title: `${prefix} ${topic}`,
      duration
    });
  }
  
  return submodules;
}

function getResources(count: number): Resource[] {
  // Expanded resource types for more variety
  const resourceTypes: Resource['type'][] = [
    'PDF', 'Workshop', 'Test', 'Video', 'Template', 
    'Worksheet', 'Code', 'System', 'Framework'
  ];
  
  // Resource name prefixes and suffixes for variety
  const prefixes: string[] = [
    "Complete", "Ultimate", "Advanced", "Pro", "Quick", 
    "Expert", "Mastery", "Essential", "Core", "Strategic"
  ];
  
  const suffixes: string[] = [
    "Guide", "Toolkit", "Workbook", "Checklist", "Template", 
    "Framework", "System", "Breakdown", "Resource", "Cheatsheet"
  ];
  
  const resources: Resource[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    resources.push({
      type,
      name: `${prefix} ${type} ${suffix}`
    });
  }
  
  return resources;
}

function getResourceColor(type: Resource['type']): string {
  const colors: ResourceColors = {
    "PDF": "#DE6B59",
    "Workshop": "#387292",
    "Test": "#B92234",
    "Video": "#154D59",
    "Template": "#F89A67",
    "Worksheet": "#FEA35D",
    "Code": "#350013",
    "System": "#FEAC6D",
    "Framework": "#09232F"
  };
  
  return colors[type] || "#FEA35D";
}

function getResourceIcon(type: Resource['type']): JSX.Element {
  switch (type) {
    case 'PDF':
      return <DocumentIcon className="w-4 h-4" />;
    case 'Workshop':
      return <BookOpenIcon className="w-4 h-4" />;
    case 'Test':
      return <CheckCircleIcon className="w-4 h-4" />;
    case 'Video':
      return <VideoCameraIcon className="w-4 h-4" />;
    case 'Template':
      return <DocumentIcon className="w-4 h-4" />;
    case 'Worksheet':
      return <DocumentIcon className="w-4 h-4" />;
    case 'Code':
      return <CogIcon className="w-4 h-4" />;
    case 'System':
      return <CogIcon className="w-4 h-4" />;
    case 'Framework':
      return <CubeIcon className="w-4 h-4" />;
    default:
      return <DocumentIcon className="w-4 h-4" />;
  }
}

export default ContentOverwhelmer;