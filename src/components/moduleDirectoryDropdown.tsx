import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from './ui/badge.tsx';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  BookOpen, CheckCircle, Star, AlertCircle, ArrowRightCircle, Clock, 
  BarChart3, Zap, Flame, Lightbulb, Award, Repeat, DollarSign, BriefcaseBusiness, 
  UserCheck, Rocket, VideoIcon, Pencil, PencilRuler, Scissors, Palette,
  WrenchIcon
} from 'lucide-react';
/* eslint-enable @typescript-eslint/no-unused-vars */

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ModuleDirectoryMap = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeTrack, setActiveTrack] = useState(null);
  const containerRef = React.useRef(null);

  // Group modules by main category
  const modulesByCategory = {
    "Theory Basics": [
      "The Big Picture on Short Form", "The 3 Cardinal Sins and Virtues", "Algorithmic Reality", 
      "Strategy: Pillars, Topics, Buckets", "Hooking Fundamentals", "The Frame", 
      "Safe Zones & Clutter", "Visual Hierarchy", "Movement & Contrast"
    ],
    "Theory Advanced": [
      "Nuanced Hook: Morally Dubious", "Advanced Emotional Positioning", "Script Mastery", 
      "Complex Formats & Remixing", "Data-Led Iteration", "Authority and Brand Holism",
      "Advanced Engagement Metrics", "Handling a Comment Section", "The Importance of Lo-Fi",
      "The Founders Paradox", "PR and Positioning Basics"
    ],
    "Research & Writing": [
      "Research Basics", "Research Advanced Tasks", "Generating Ideas",
      "Targeted Search", "Keyword Mapping", "Tailoring Your Algorithm",
      "Inspiration Through Different Sources", "Refining Your Script",
      "The Research Toolkit"
    ],
    "Content Production": [
      "Solo Phone Shooter", "Setting up a Studio Space", "Camera Confidence", 
      "Videography Pro", "Producing a Podcast for Clips", "Editing Basics",
      "Editing Advanced", "Editing Team", "Podcast Clipping"
    ],
    "Business Growth": [
      "P&S Individual", "P&S Founder", "Introduction to Delegation",
      "First Bottlenecks", "Creation of the Creative Team", "Videography Delegated",
      "Make Content Run Itself", "Creating a Team Workflow"
    ],
    "Monetisation": [
      "Monetisation Basics", "Monetisation Pro", "Monetisation Founder",
      "Taking People off Platform", "Lead Magnets", "Podcasting",
      "YouTube", "Speaking Engagements", "Outreach and Finding Work/Clients",
      "Newsletter"
    ]
  };

  // Define color schemes for each category (using your brand colors)
  const categoryColors = {
    "Theory Basics": { bg: "#09232F", text: "#FDF7E4", accent: "#FEA35D", icon: BookOpen },
    "Theory Advanced": { bg: "#154D59", text: "#FDF7E4", accent: "#F89A67", icon: Star },
    "Research & Writing": { bg: "#387292", text: "#FDF7E4", accent: "#FEAC6D", icon: Pencil },
    "Content Production": { bg: "#DE6B59", text: "#FDF7E4", accent: "#FEA35D", icon: VideoIcon },
    "Business Growth": { bg: "#B92234", text: "#FDF7E4", accent: "#FEAC6D", icon: BriefcaseBusiness },
    "Monetisation": { bg: "#350013", text: "#FDF7E4", accent: "#FEA35D", icon: DollarSign }
  };

  // Define tracks with their respective colors and Hero Icons
  const tracks = [
    { name: "Content Creator Growth", color: "#4A90E2", icon: <Rocket className="w-5 h-5" /> },
    { name: "Founders", color: "#FF3B30", icon: <BriefcaseBusiness className="w-5 h-5" /> },
    { name: "Technical Skills", color: "#8E8E93", icon: <WrenchIcon className="w-5 h-5" /> },
    { name: "Scriptwriters", color: "#FFCC00", icon: <Pencil className="w-5 h-5" /> },
    { name: "Video Producers", color: "#5856D6", icon: <VideoIcon className="w-5 h-5" /> }
  ];

  // Count total modules
  const totalModules = Object.values(modulesByCategory).reduce(
    (total, modules) => total + modules.length, 0
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // Animation for category headers
    gsap.from(".category-header", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Add pulsing animation to draw attention to the module count
    const interval = setInterval(() => {
      const element = document.getElementById('module-counter');
      if (element) {
        element.classList.add('pulse');
        setTimeout(() => {
          element.classList.remove('pulse');
        }, 1000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle category click to expand/collapse
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Handle track selection
  const handleTrackClick = (trackName) => {
    setActiveTrack(activeTrack === trackName ? null : trackName);
  };

  return (
    <div ref={containerRef} className="bg-[#09232F] text-white p-8 rounded-xl max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-white">
          <span className="bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] bg-clip-text text-transparent">
            Complete Course Curriculum
          </span>
        </h2>
        <p className="text-white/80 mb-6">
          A comprehensive framework with <span id="module-counter" className="font-bold text-[#FEA35D]">{totalModules}+ lessons</span> designed specifically for founders and their teams
        </p>
        
        {/* Track filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => handleTrackClick(track.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                activeTrack === track.name 
                  ? 'bg-white/10 border-white' 
                  : 'border-white/30 hover:border-white/50'
              } transition-all`}
            >
              <div style={{ color: track.color }}>
                {track.icon}
              </div>
              <span>{track.name}</span>
            </button>
          ))}
          
          {activeTrack && (
            <button
              onClick={() => setActiveTrack(null)}
              className="px-4 py-2 rounded-full border border-white/30 hover:border-white/50"
            >
              Clear Filter
            </button>
          )}
        </div>
        
        {/* Selected track info */}
        {activeTrack && (
          <div className="mb-8 p-4 rounded-lg bg-white/5 inline-block max-w-xl">
            <Badge variant="outline" className="bg-white/5 mb-2 border-[#FEA35D]">
              Track Focus
            </Badge>
            <p className="text-white/80">
              Showing modules relevant to the <span className="font-bold text-white">{activeTrack}</span> learning path
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(modulesByCategory).map((category) => {
          const { bg, text, accent, icon: CategoryIcon } = categoryColors[category];
          
          return (
            <div 
              key={category}
              className={`category-header rounded-xl overflow-hidden transition-all duration-300 ${
                expandedCategory === category ? 'shadow-lg shadow-black/30' : 'shadow hover:shadow-md'
              }`}
            >
              {/* Category Header */}
              <div 
                className="px-5 py-4 flex items-center justify-between cursor-pointer"
                style={{ backgroundColor: bg }}
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: accent }}
                  >
                    <CategoryIcon className="w-5 h-5 text-[#09232F]" />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: text }}>{category}</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm px-2 py-1 rounded-full bg-black/20 mr-2" style={{ color: accent }}>
                    {modulesByCategory[category].length} modules
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${expandedCategory === category ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke={accent}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Module List (Expandable) */}
              <div 
                className={`transition-all duration-300 overflow-hidden bg-gradient-to-b from-[#08141B] to-[#09232F] ${
                  expandedCategory === category ? 'max-h-[400px] overflow-y-auto' : 'max-h-0'
                }`}
              >
                <div className="p-4 grid grid-cols-1 gap-3">
                  {modulesByCategory[category].map((module, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[#09232F]"
                        style={{ backgroundColor: accent }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">{module}</div>
                        
                        {/* Track tags would go here - sample for visualization */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {Math.random() > 0.5 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#4A90E2]/20 text-[#4A90E2] border border-[#4A90E2]/30">
                              Creator
                            </span>
                          )}
                          {Math.random() > 0.5 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30">
                              Founder
                            </span>
                          )}
                          {Math.random() > 0.7 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#8E8E93]/20 text-[#8E8E93] border border-[#8E8E93]/30">
                              Technical
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="text-white/70 mb-4">
          And this is just a preview! The full curriculum includes comprehensive worksheets, templates, and personalized feedback.
        </p>
        <a 
          href="#pricing" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#B92234] to-[#DE6B59] text-white font-semibold rounded-lg transition-transform hover:-translate-y-1"
        >
          See Pricing Options
        </a>
      </div>

      {/* CSS for the pulse animation */}
      <style jsx>{`
        .pulse {
          animation: pulse-animation 1s ease-out;
        }
        @keyframes pulse-animation {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ModuleDirectoryMap;