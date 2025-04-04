import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import courseUtils from '../lib/course-utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
// Define TypeScript interfaces
interface ModuleItem {
  title: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CategoryColor {
  bg: string;
  text: string;
}

interface CategoryColors {
  [key: string]: CategoryColor;
}

interface ModulesByCategory {
  [key: string]: ModuleItem[];
}

interface CategorySectionProps {
  category: string;
  modules: ModuleItem[];
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
}

// Module categories with color mapping
const categoryColors: CategoryColors = {
  "Theory Basics": { bg: "#0F474A", text: "#FDF7E4" },
  "Cardinal Principles": { bg: "#123C55", text: "#FDF7E4" },
  "Hook Mastery": { bg: "#186080", text: "#FDF7E4" },
  "Scripting": { bg: "#3196AD", text: "#FDF7E4" },
  "Metrics & Analysis": { bg: "#D45D56", text: "#FDF7E4" },
  "Platform Strategy": { bg: "#F49272", text: "#08141B" },
  "Authority Building": { bg: "#FFC590", text: "#08141B" },
  "Content Management": { bg: "#FDF7E4", text: "#08141B" },
  "Production": { bg: "#A12C3B", text: "#FDF7E4" },
  "Research": { bg: "#E76662", text: "#FDF7E4" },
  "Repurposing": { bg: "#33626F", text: "#FDF7E4" },
  "Planning & Distribution": { bg: "#378596", text: "#FDF7E4" },
  "Delegation & Team": { bg: "#FEAF52", text: "#08141B" },
  "Conversion Strategy": { bg: "#FA9644", text: "#08141B" }
};

const modulesByCategory: ModulesByCategory = {
  "Theory Basics": [
    { title: "Starting an account", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Naming your account", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Creating a bio", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Managing highlights", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Intermediate" as const },
    { title: "Developing your Linkspace", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Intermediate" as const },
    { title: "Using Pinned Videos", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "The Frame", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Safe Zones & Clutter", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Intermediate" as const },
    { title: "Visual Hierarchy", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Advanced" as const },
    { title: "Movement & Contrast", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Advanced" as const }
  ],
  "Cardinal Principles": [
    { title: "Cardinal Sins", thumbnail: "/vite.svg", difficulty: "Beginner" as const },
    { title: "Cardinal Virtues", thumbnail: "/vite.svg", difficulty: "Beginner" as const },
    { title: "Algorithmic Reality", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "How Videos Actually Grow", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "Good Vs Bad in Short Form", thumbnail: "/vite.svg", difficulty: "Beginner" as const },
    { title: "Nailing What Actually Counts", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "Applying it Across Platforms", thumbnail: "/vite.svg", difficulty: "Advanced" as const }
  ],
  "Hook Mastery": [
    { title: "Using Clarity and Intrigue", thumbnail: "/vite.svg", difficulty: "Beginner" as const },
    { title: "Developing Authority", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "Nailing Delivery", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "The Text Hook", thumbnail: "/vite.svg", difficulty: "Beginner" as const },
    { title: "The Visual Hook", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "Nuanced Hooks", thumbnail: "/vite.svg", difficulty: "Advanced" as const },
    { title: "BIG vs small", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "False Assumptions", thumbnail: "/vite.svg", difficulty: "Advanced" as const },
    { title: "The Impossible Question", thumbnail: "/vite.svg", difficulty: "Advanced" as const },
    { title: "A Contrarian Statement", thumbnail: "/vite.svg", difficulty: "Intermediate" as const },
    { title: "This Just Happened!!?!", thumbnail: "/vite.svg", difficulty: "Beginner" as const },
    { title: "PR: Who Are You?", thumbnail: "/vite.svg", difficulty: "Intermediate" as const }
  ]
};

// Component for displaying course module statistics
const ModuleStatistics = () => {
  // Calculate totals
  const totalCategories = Object.keys(modulesByCategory).length;
  const totalModules = Object.values(modulesByCategory).reduce((acc, modules) => acc + modules.length, 0);
  const totalHours = Math.round(totalModules * 35 / 60); // Approximately 35 minutes per module
  
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-primary-salmon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-orange to-primary-salmon bg-clip-text text-transparent mb-3">
              {totalModules}+
            </div>
            <div className="text-dark-navy font-medium text-lg">Total Lessons</div>
          </div>
        </div>
        
        <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-primary-salmon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-orange to-primary-salmon bg-clip-text text-transparent mb-3">
              {totalCategories}
            </div>
            <div className="text-dark-navy font-medium text-lg">Core Tracks</div>
          </div>
        </div>
        
        <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-primary-salmon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-orange to-primary-salmon bg-clip-text text-transparent mb-3">
              {totalHours}
            </div>
            <div className="text-dark-navy font-medium text-lg">Hours of Content</div>
          </div>
        </div>
        
        <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-primary-salmon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-orange to-primary-salmon bg-clip-text text-transparent mb-3">
              10
            </div>
            <div className="text-dark-navy font-medium text-lg">Beta Cohort Slots</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Module card component
interface ModuleCardProps {
  title: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
}

const ModuleCard = ({ title, thumbnail, difficulty, color }: ModuleCardProps) => {
  // Modern difficulty badges using brand colors
  const difficultyClasses: Record<'Beginner' | 'Intermediate' | 'Advanced', string> = {
    "Beginner": "bg-dark-azure/90 text-white",
    "Intermediate": "bg-primary-amber/90 text-dark-black",
    "Advanced": "bg-primary-red/90 text-white"
  };
  
  return (
    <div 
      className="group flex flex-col overflow-hidden bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={courseUtils.getThumbnailPath(thumbnail)} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={`
          absolute bottom-3 right-3 
          text-xs font-semibold px-3 py-1.5 
          rounded-full backdrop-blur-sm 
          ${difficultyClasses[difficulty]}
          transform transition-all duration-300
          shadow-lg
        `}>
          {difficulty}
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-dark-black group-hover:text-primary-orange transition-colors duration-300">
          {title}
        </h4>
      </div>
    </div>
  );
};

// Category section component
const CategorySection = ({ category, modules, expandedCategories, toggleCategory }: CategorySectionProps) => {
  const colors = categoryColors[category] || { bg: "#123C55", text: "#FDF7E4" };
  const isOpen = expandedCategories.includes(category);
  
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <Disclosure
        as="div"
        defaultOpen={isOpen}
        onChange={() => toggleCategory(category)}
      >
        {({ open }) => (
          <>
            <Disclosure.Button 
              className="
                flex w-full justify-between items-center 
                px-6 py-5 text-left 
                transition-all duration-300 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
                hover:brightness-110
              "
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              <h3 className="text-xl font-bold tracking-wide">{category}</h3>
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium opacity-90 bg-black/10 px-3 py-1 rounded-full">
                  {modules.length} modules
                </span>
                <ChevronUpIcon
                  className={`
                    ${open ? 'rotate-180' : ''} 
                    w-6 h-6 
                    transition-transform duration-300
                    opacity-75
                  `}
                />
              </div>
            </Disclosure.Button>
            
            <Transition
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modules.map((module: ModuleItem, idx: number) => (
                    <div 
                      className="animate-fadeIn" 
                      style={{ 
                        animationDelay: `${idx * 50}ms`,
                        animationFillMode: 'both' 
                      }}
                      key={`${category}-${idx}`} 
                    >
                      <ModuleCard
                        title={module.title} 
                        thumbnail={module.thumbnail} 
                        difficulty={module.difficulty}
                        color={colors.bg}
                      />
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

// The main module display component
const ModuleDisplayGrid = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Theory Basics']);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
    
    // Schedule a ScrollTrigger refresh after state updates
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  };
  
  // Reference to the module display container
  const moduleDisplayRef = useRef(null);
  
  // Initialize animations using useGSAP for proper cleanup
  useGSAP(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Only use GSAP for staggered animations that Tailwind can't handle
      gsap.from('.module-stat', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.module-stat',
          start: 'top bottom-=100px',
          toggleActions: 'play none none none',
        }
      });
    }, moduleDisplayRef); // Scope to the module display container
    
    // The context will automatically clean up when the component unmounts
    return () => ctx.revert();
  }, []); // Empty dependency array means this runs once on mount
  
  // Handle category changes with useGSAP
  useGSAP(() => {
    // Create context for animations related to expandedCategories
    const ctx = gsap.context(() => {
      // Set a delay to ensure DOM updates are complete
      const timer = setTimeout(() => {
        // Refresh ScrollTrigger to ensure any GSAP animations update
        ScrollTrigger.refresh();
      }, 200);
      
      return () => clearTimeout(timer);
    }, moduleDisplayRef);
    
    return () => ctx.revert();
  }, [expandedCategories]); // This runs whenever expandedCategories changes
  
  return (
    <div ref={moduleDisplayRef} className="px-4 py-16 md:px-8 lg:px-16 xl:px-24 bg-gradient-to-b from-primary-cream to-light-200">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-dark-black to-dark-navy bg-clip-text text-transparent">
          Complete Course Curriculum
        </h2>
        <p className="text-xl text-dark-navy/80 max-w-2xl mx-auto leading-relaxed">
          A comprehensive framework designed specifically for founders and their teams
        </p>
      </div>
      
      <ModuleStatistics />
      
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-orange to-primary-salmon rounded-2xl p-8 my-16 text-center text-white shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/pattern.svg')] opacity-10" />
        <div className="relative z-10">
          <div className="inline-block bg-white/90 backdrop-blur-sm text-primary-orange font-bold px-4 py-2 rounded-full text-sm mb-4 shadow-lg">
            Limited Offer
          </div>
          <p className="text-xl font-medium text-white/90 max-w-2xl mx-auto">
            Join our beta cohort - only 10 slots available!
          </p>
        </div>
      </div>
      
      <div className="space-y-6 my-16">
        {Object.entries(modulesByCategory).map(([category, modules]) => (
          <CategorySection 
            key={category}
            category={category}
            modules={modules}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
          />
        ))}
      </div>
      
      <div className="text-center mt-20">
        <a 
          href="#pricing" 
          className="
            inline-block bg-gradient-to-r from-primary-orange to-primary-salmon 
            text-white font-bold px-10 py-5 rounded-xl shadow-lg 
            transform transition-all duration-300 
            hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
            focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2
          "
        >
          Secure Your Spot Now
        </a>
      </div>
    </div>
  );
};

export default ModuleDisplayGrid;