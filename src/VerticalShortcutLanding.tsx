import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ThemeProvider } from './components/ui/theme-provider';
import FloatingNavbar from './components/sections/navbar/floating';
import IsometricGrid, { COLORS } from './components/isometricGrid';
import ContentOverwhelmer from './components/ContentOverwhelmer';
import FAQ from './components/sections/faq-raised';
import { Pricing3ColsSubscription } from './components/sections/pricing-3-cols-subscription';
import { Section } from './components/ui/section';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import SocialProofItem from './components/ui/social-proof-item';
import Glow from './components/ui/glow';
import { Item, ItemIcon, ItemTitle, ItemDescription } from './components/ui/item';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import FeatureStickyLeft from './components/sections/feature/sticky-left';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import ModuleBreakdown from './components/sections/module-breakdown';
import VideoEmbed from './components/ui/video-embed';
import VSLogo from './components/logos/Hero/vs-hero-logo';
import { vsNavbar as NavbarComponent } from './components/sections/navbar/vs-navbar';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel';
import {
  Slide,
  SlideContent,
  SlideTitle,
  SlideDescription,
  SlideVisual,
  SlideButton,
  SlideExpandedContent,
} from './components/ui/slide';
import { Image } from './components/ui/image';
import {
  Tile,
  TileVisual,
  TileTitle,
  TileDescription,
  TileContent,
  TileLink,
} from './components/ui/tile';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
} from './components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

// Chart imports
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Label, Pie, PieChart, Sector } from 'recharts';

// Import only the icons we're using
import { 
  CheckCircle, 
  ArrowRightCircle, 
  Clock, 
  BarChart3, 
  Zap, 
  Flame, 
  Lightbulb, 
  Award, 
  Repeat, 
  DollarSign, 
  BriefcaseBusiness, 
  Rocket,
  ChevronLeft,
  ChevronRight,
  Users,
  Code,
  BookOpen,
  Youtube,
  Share2,
  TrendingUp,
  Menu,
  TrendingDown,
} from 'lucide-react';

// Import GSAP and plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// TypeScript Interfaces
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  span: string;
}

interface VideoEmbedProps {
  videoUrl: string;
}

// Define the isometric grid cubes for hero section
const mainGridCubes = [
  // Central structure with vibrant colors to create visual impact
  { row: 5, col: 1, color: COLORS.WHITE, isGlowing: true },
  { row: 5, col: 2, color: COLORS.MAROON },
  { row: 5, col: 3, color: COLORS.TEAL_LIGHT},
  { row: 6, col: 1, color: COLORS.DEFAULT },
  { row: 6, col: 2, color: COLORS.RED, isGlowing: true },
  { row: 6, col: 3, color: COLORS.DEFAULT },
  { row: 7, col: 1, color: COLORS.DEFAULT },
  { row: 7, col: 2, color: COLORS.DEFAULT },
  { row: 7, col: 3, color: COLORS.DEFAULT },
  { row: 8, col: 2, color: COLORS.DEFAULT },
  
  // Right-side highlight cube - draws attention with glow
  { row: 4, col: 6, color: COLORS.ORANGE, isGlowing: true },
  
  // Additional cubes for visual interest and structure
  { row: 6, col: 5, color: COLORS.DEFAULT },
  { row: 7, col: 4, color: COLORS.DEFAULT },
  { row: 9, col: 3, color: COLORS.TEAL_DARK }
];

// Background grid with smaller, more distant cubes to create depth
const backgroundGridCubes = [
  // Bottom-right area
  { row: 10, col: 7, color: COLORS.DEFAULT },
  { row: 11, col: 6, color: COLORS.DEFAULT },
  { row: 11, col: 8, color: COLORS.DEFAULT },
  { row: 12, col: 7, color: COLORS.ORANGE, isGlowing: true },
  
  // Top-right area
  { row: 2, col: 10, color: COLORS.WHITE, isGlowing: true },
  { row: 3, col: 11, color: COLORS.DEFAULT },
  { row: 4, col: 12, color: COLORS.DEFAULT },
  
  // Left area
  { row: 9, col: 0, color: COLORS.DEFAULT },
  { row: 10, col: 1, color: COLORS.DEFAULT },
  { row: 11, col: 0, color: COLORS.DEFAULT }
];

// Far background grid with even smaller cubes to enhance the 3D effect
const farBackgroundGridCubes = [
  // Scattered pattern for visual interest
  { row: 1, col: 14, color: COLORS.DEFAULT },
  { row: 2, col: 13, color: COLORS.DEFAULT },
  { row: 3, col: 15, color: COLORS.DEFAULT },
  { row: 15, col: 1, color: COLORS.RED, isGlowing: true },
  { row: 16, col: 2, color: COLORS.DEFAULT },
  { row: 14, col: 3, color: COLORS.DEFAULT },
  { row: 15, col: 18, color: COLORS.DEFAULT },
  { row: 16, col: 11, color: COLORS.DEFAULT },
  { row: 14, col: 10, color: COLORS.DEFAULT }
];

// Testimonials data
const testimonials = [
  {
    name: "James Lewis",
    username: "jameslewisvideo",
    text: "Before Vertical Shortcut, I was posting content that went nowhere. Now I've gone from barely making £1,000/month to consistently earning £12,000+ in just 8 weeks. The ROI is f*cking incredible.",
    image: "/avatars/james.jpg"
  },
  {
    name: "Sarah Chen",
    username: "sarahcreates",
    text: "The hook mastery module alone was worth every penny. My engagement skyrocketed 400% and I landed three brand deals within a month. This isn't just theory—it's a proven system that delivers real results.",
    image: "/avatars/sarah.jpg"
  },
  {
    name: "Alex Rodriguez",
    username: "alexrodriguezbiz",
    text: "As a busy founder, I thought I'd never have time for content. The Founders Paradox module showed me how to batch create months of content in just a few hours. Complete game changer for my business.",
    image: "/avatars/alex.jpg"
  },
  {
    name: "Maya Johnson",
    username: "mayatalks",
    text: "I struggled with imposter syndrome and camera anxiety for years. The Camera Confidence module transformed how I present myself. Now my content converts at 3x my previous rate. Worth every penny.",
    image: "/avatars/maya.jpg"
  }
];

// Program benefits data 
const benefits = [
  {
    title: "Hook Your Audience Instantly",
    description: "Master the psychological triggers that make people stop scrolling and start watching. Our students see average engagement increases of 300% within 14 days.",
    icon: <Zap className="h-6 w-6 text-white" />,
    color: "#FEA35D"
  },
  {
    title: "Create Content That Converts",
    description: "Learn our proven script structures that turn passive viewers into paying customers. Stop creating content that gets views but no sales.",
    icon: <DollarSign className="h-6 w-6 text-white" />,
    color: "#B92234"
  },
  {
    title: "Build A Content Machine",
    description: "Transform from a one-person show to a content production powerhouse with our delegation systems. Produce more without sacrificing quality or authenticity.",
    icon: <Repeat className="h-6 w-6 text-white" />,
    color: "#387292"
  },
  {
    title: "Never Run Out Of Ideas",
    description: "Our content research system gives you an endless supply of proven topics your audience wants. No more staring at a blank screen wondering what to post.",
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    color: "#154D59"
  },
  {
    title: "Stand Out From The Noise",
    description: "Develop your unique voice and content style that makes you unmistakable in your industry. Stop blending in with thousands of forgettable creators.",
    icon: <Award className="h-6 w-6 text-white" />,
    color: "#DE6B59"
  },
  {
    title: "Scale With Systems",
    description: "Implement our proven workflows that let you produce more content with less personal time. Our students average 5X output with 50% less effort.",
    icon: <Rocket className="h-6 w-6 text-white" />,
    color: "#FEAC6D"
  }
];

// Course tracks data
const tracks = [
  {
    name: "Content Creator Growth",
    description: "For ambitious creators looking to rapidly scale from zero to millions of views and build sustainable income streams.",
    icon: <Rocket className="h-6 w-6" />,
    color: "#4A90E2"
  },
  {
    name: "Founders Track",
    description: "For entrepreneurs and business leaders who need to build personal brands while minimizing time investment.",
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    color: "#FF3B30"
  },
  {
    name: "Technical Skills",
    description: "For those focused on mastering the production aspects of content creation, from filming to editing.",
    icon: <Zap className="h-6 w-6" />,
    color: "#8E8E93"
  },
  {
    name: "Holistic Approach",
    description: "The complete system covering strategy, production, and monetization for those who want to master it all.",
    icon: <Flame className="h-6 w-6" />,
    color: "#FF9500"
  }
];

// Testimonial Carousel data
const carouselTestimonials = [
  {
    quote: "I was skeptical about another course, but this is different. After 10 years of posting content, I finally understand why some videos blow up while others die. Everything finally makes sense.",
    name: "Christopher Lee",
    role: "Business Coach",
    image: "/avatars/chris.jpg"
  },
  {
    quote: "I've taken every short form course out there. None of them come close to the depth and actionable strategies in Vertical Shortcut. My first video using these principles hit 1.2M views.",
    name: "Jennifer Martinez",
    role: "Content Creator",
    image: "/avatars/jennifer.jpg"
  },
  {
    quote: "As a founder of a SaaS company, I never thought short-form would work for our complex product. Within 8 weeks, our content was driving 40% of our new trial signups.",
    name: "David Wilson",
    role: "Tech Founder",
    image: "/avatars/david.jpg"
  },
  {
    quote: "The delegation frameworks alone are worth 10x the investment. I went from shooting everything myself to having a team that delivers better content than I ever could alone.",
    name: "Michelle Thompson",
    role: "Agency Owner",
    image: "/avatars/michelle.jpg"
  }
];

// Learning outcomes data
const learningOutcomes = [
  {
    title: "Master Hook Creation",
    description: "Learn 15+ hook formats that immediately capture viewer attention, including the 'Impossible Question', 'False Assumption' and 'Big-Small' techniques.",
    icon: <Zap />
  },
  {
    title: "Decode Platform Algorithms",
    description: "Understand exactly what TikTok, Instagram and YouTube algorithms prioritize, and how to craft content specifically for each platform's nuances.",
    icon: <BarChart3 />
  },
  {
    title: "Build Converting Funnels",
    description: "Create seamless pathways that turn casual viewers into email subscribers, leads, and ultimately paying customers.",
    icon: <ArrowRightCircle />
  },
  {
    title: "Create Content at Scale",
    description: "Implement our batch production system to create a month of content in a single day, without sacrificing quality or authenticity.",
    icon: <Repeat />
  },
  {
    title: "Leverage Data-Driven Iteration",
    description: "Use our analytics framework to systematically improve your content performance based on real audience behavior, not guesswork.",
    icon: <BarChart3 />
  },
  {
    title: "Develop Your Unique Voice",
    description: "Find and amplify what makes you distinctive to stand out in a crowded market and build a recognizable brand.",
    icon: <Zap />
  }
];

// Course stats data
const courseStats = [
  { label: "Views Generated", value: "800M+" },
  { label: "Program Cost", value: "£6,500" },
  { label: "Course Modules", value: "178+" },
  { label: "Hours of Content", value: "1000+" }
];

// Key features data
const keyFeatures = [
  { 
    title: "No More Guesswork", 
    description: "Stop wondering why some videos work while others flop. Our system reveals exactly what drives algorithmic success.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  },
  { 
    title: "Templates For Everything", 
    description: "Over 50 plug-and-play templates for hooks, scripts, and content structures that you can implement immediately.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  },
  { 
    title: "Weekly Live Coaching", 
    description: "Direct access to our team of experts who've generated over 800M views for personalized feedback and advice.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  },
  { 
    title: "Private Community", 
    description: "Connect with other serious creators and founders for collaboration, feedback, and accountability.",
    icon: <CheckCircle className="h-5 w-5 text-[#FEA35D]" />
  }
];

// Bento grid items data
const bentoItems = [
  {
    title: "Creator Network",
    description: "Connect with 100+ top creators who've built 7+ figure businesses with short-form content.",
    icon: <Users className="h-8 w-8" />,
    color: "#FEA35D",
    span: "col-span-1 row-span-1"
  },
  {
    title: "AI-Powered Tools",
    description: "Exclusive access to our custom AI tools for content research, script generation, and trend prediction.",
    icon: <Code className="h-8 w-8" />,
    color: "#B92234",
    span: "col-span-1 row-span-1"
  },
  {
    title: "Platform Mastery",
    description: "Deep dives into TikTok, Instagram, YouTube Shorts, and LinkedIn algorithms with platform-specific strategies.",
    icon: <Share2 className="h-8 w-8" />,
    color: "#154D59",
    span: "col-span-2 row-span-1 md:col-span-1 md:row-span-2"
  },
  {
    title: "Viral Case Studies",
    description: "Detailed breakdowns of 45+ videos that reached millions of views across different niches and industries.",
    icon: <Youtube className="h-8 w-8" />,
    color: "#DE6B59",
    span: "col-span-2 md:col-span-1 row-span-1"
  },
  {
    title: "Weekly Growth Labs",
    description: "Live weekly sessions where we review your content and provide actionable feedback for immediate improvement.",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "#FEAC6D",
    span: "col-span-2 row-span-1"
  },
  {
    title: "Content Library",
    description: "Over 200+ video templates, swipe files, and script formats for every type of business and creator niche.",
    icon: <BookOpen className="h-8 w-8" />,
    color: "#387292",
    span: "col-span-2 md:col-span-1 row-span-1"
  }
];

// Custom Carousel component using GSAP Context
const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationCtx = useRef<ReturnType<typeof gsap.context> | null>(null);
  
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  
  // Use Layout Effect to prioritize animation timing
  useLayoutEffect(() => {
    // Clear previous context if it exists
    if (animationCtx.current) {
      animationCtx.current.revert();
    }
    
    // Create a new GSAP context for proper cleanup
    animationCtx.current = gsap.context(() => {
      const activeItem = document.querySelector(".carousel-item-active");
      
      if (activeItem) {
        gsap.fromTo(activeItem, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: "power2.out",
            clearProps: "all" // Important for performance 
          }
        );
      }
    }, carouselRef); // Scope to our carousel ref
    
    // Cleanup function
    return () => {
      if (animationCtx.current) {
        animationCtx.current.revert(); // Clean up all animations
      }
    };
  }, [current]);

  return (
    <div ref={carouselRef} className="relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className={`transition-opacity duration-300 ease-in-out ${
            index === current ? 'opacity-100 carousel-item-active' : 'opacity-0 hidden'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Avatar className="w-24 h-24 border-4 border-[#FEA35D]/20">
                <AvatarImage src={testimonial.image} />
                <AvatarFallback className="bg-[#FEA35D]">{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xl md:text-2xl italic text-white/90 text-center mb-6">
              "{testimonial.quote}"
            </p>
            <div className="text-center">
              <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
              <p className="text-[#FEA35D]">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? 'bg-[#FEA35D] w-4' : 'bg-white/30'
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FEA35D]"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FEA35D]"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

// Custom Bento Grid component 
const BentoGrid = ({ items }: { items: BentoItem[] }) => {
  const bentoRef = useRef<HTMLDivElement>(null);
  const animationCtx = useRef<ReturnType<typeof gsap.context> | null>(null);
  
  useLayoutEffect(() => {
    if (animationCtx.current) {
      animationCtx.current.revert();
    }
    
    animationCtx.current = gsap.context(() => {
      // Create a single staggered animation for all items
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 80%",
          once: true, // Only animate once
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all"
      });
    }, bentoRef);
    
    return () => {
      if (animationCtx.current) {
        animationCtx.current.revert();
      }
    };
  }, []);

  return (
    <div ref={bentoRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`${item.span} bento-item bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[${item.color}]/40 transition-all duration-300 group`}
        >
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            style={{ backgroundColor: item.color }}
          >
            {React.cloneElement(item.icon, { 
              className: "h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" 
            })}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FEA35D] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// Optimized VideoEmbed component 
const SafeVideoEmbed = ({ videoUrl }: VideoEmbedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  return (
    <div className="relative pt-[56.25%] w-full overflow-hidden rounded-xl">
      <iframe
        ref={iframeRef}
        src={`${videoUrl}?enablejsapi=1&rel=0&playsinline=1&modestbranding=1`}
        title="Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
};

// Main component with proper GSAP implementation
const VerticalShortcutLanding = () => {
  // Create refs for DOM elements and animation contexts
  const mainRef = useRef(null);
  const smoother = useRef<ScrollSmoother | null>(null);
  const contentRef = useRef(null);
  const mainCtx = useRef<ReturnType<typeof gsap.context> | null>(null);
  
  // Section refs
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const tracksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const bentoRef = useRef(null);

  // Initialize ScrollSmoother and main animations
  useLayoutEffect(() => {
    // Create main GSAP context
    mainCtx.current = gsap.context(() => {
      // Setup ScrollSmoother first
      smoother.current = ScrollSmoother.create({
        smooth: 0.7, // Smooth value of 1.5 as requested
        effects: true,
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        normalizeScroll: true,
        ignoreMobileResize: true,
        preventDefault: true
      });
      
      // Hero section animations - batch for performance
      const heroTl = gsap.timeline();
      
      heroTl.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(".hero-accent", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.3")
      .from(".hero-badge", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
      
      // Stats section - batch animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(".stat-item", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "all"
          });
        }
      });
      
      // Benefits section - batch animation
      ScrollTrigger.create({
        trigger: benefitsRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.from(".benefit-item", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
          });
        }
      });
      
      // Tracks section - batch animation
      ScrollTrigger.create({
        trigger: tracksRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.from(".track-item", {
            x: -20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "all"
          });
        }
      });
      
      // Video section animation - simple fade in
      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.from(".video-container", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
          });
        }
      });
      
      // Testimonials animations - batch with delay
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.from(".testimonial-item", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out",
            clearProps: "all"
          });
        }
      });
      
      // CTA section animations - sequence for emphasis
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const ctaTl = gsap.timeline();
          
          ctaTl.from(".cta-badge", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
          })
          .from(".cta-title", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
          }, "-=0.3")
          .from(".cta-description", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
          }, "-=0.4")
          .from(".cta-button", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.5)"
          }, "-=0.3");
        }
      });
      
    }, mainRef); // Scoped to the main container ref
    
    // Cleanup function for all GSAP animations and ScrollTrigger
    return () => {
      if (mainCtx.current) {
        mainCtx.current.revert();
      }
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      {/* Main wrapper for ScrollSmoother */}
      <div id="smooth-wrapper" ref={mainRef} className="min-h-screen overflow-hidden">
        {/* Floating Navbar stays outside the smooth content for fixed positioning */}
        <FloatingNavbar />
        
        {/* Smooth content container */}
        <div id="smooth-content" ref={contentRef} className="min-h-screen bg-gradient-to-b from-[#09232F] to-[#08141B] text-white overflow-hidden">
          {/* Hero Section */}
          <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-32 pb-24">
            {/* Background gradient */}
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[#FEA35D]/20 to-transparent opacity-40 blur-3xl"></div>
            
            {/* Floating accent elements */}
            <div className="absolute top-1/4 right-[15%] w-24 h-24 rounded-full bg-[#B92234]/10 blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-[10%] w-32 h-32 rounded-full bg-[#FEA35D]/10 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] items-center">
                {/* Isometric Grid Column */}
                <div className="lg:col-span-5 relative order-2 lg:order-1">
                  <div className="w-full h-[550px] relative">
                    {/* Far background layer - Smaller cubes */}
                    <div className="absolute inset-0" style={{ opacity: 0.3 }}>
                      <IsometricGrid 
                        rows={18}                 
                        cols={16}                 
                        cubeSize={50}             
                        horizontalSpacing={70}    
                        verticalSpacing={40}      
                        containerWidth={550}     
                        containerHeight={550}
                        customCubes={farBackgroundGridCubes}
                        offsetX={-100}
                        offsetY={50}
                      />
                    </div>
                  
                    {/* Background layer - Medium-sized cubes */}
                    <div className="absolute inset-0" style={{ opacity: 0.7 }}>
                      <IsometricGrid 
                        rows={14}                 
                        cols={14}                 
                        cubeSize={70}            
                        horizontalSpacing={80}   
                        verticalSpacing={60}     
                        containerWidth={550}     
                        containerHeight={550}
                        customCubes={backgroundGridCubes}
                        offsetX={-50}
                        offsetY={20}
                      />
                    </div>
                    
                    {/* Main foreground layer - Largest cubes */}
                    <div className="absolute inset-0" style={{ zIndex: 10 }}>
                      <IsometricGrid 
                        rows={12}                 
                        cols={8}                 
                        cubeSize={95}            
                        horizontalSpacing={135}   
                        verticalSpacing={114}     
                        containerWidth={550}     
                        containerHeight={550}
                        customCubes={mainGridCubes}
                        offsetX={0}
                        offsetY={0}
                      />
                    </div>
                    
                    {/* Dotted path between cubes */}
                    <svg width="100%" height="100%" className="absolute top-0 left-0" 
                         style={{ zIndex: 0, pointerEvents: 'none' }}>
                      <path 
                        d="M200,310 Q250,350 300,330 L390,150" 
                        stroke="#FEA35D" 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                        fill="none" 
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Text Column */}
                <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
                  <div className="hero-badge inline-block mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full max-w-max">
                    <span className="text-[#FEA35D] font-semibold">10-Week Transformation Program</span>
                  </div>
                  
                  <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="hero-accent bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] bg-clip-text text-transparent">800 million views</span>,<br />
                    zero spent on ads
                  </h1>
                  
                  <p className="hero-description text-white/80 text-xl mb-10 max-w-xl leading-relaxed">
                    A proven turn-key system to survive, thrive, and monetise with short-form content. Stop posting into the void. Start creating content that converts.
                  </p>
                  
                  <div className="hero-cta flex flex-wrap gap-4">
                    <Button className="px-8 py-7 bg-[#FEA35D] hover:bg-[#F89A67] text-lg font-semibold">
                      Apply Now <span className="ml-2">&rarr;</span>
                    </Button>
                    <Button variant="outline" className="px-8 py-7 border border-white/20 hover:bg-white/10 text-lg font-semibold">
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Stats Section with Social Proof */}
          <Section ref={statsRef} className="bg-[#08141B] py-20 border-t border-[#154D59]/30">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Course Stats That Speak for Themselves</h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Vertical Shortcut isn't just another course. It's the culmination of years creating content that drove real business results.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
                {courseStats.map((stat, index) => (
                  <div key={index} className="stat-item text-center relative">
                    <div className="absolute inset-0 bg-[#FEA35D]/5 blur-xl rounded-full"></div>
                    <div className="relative">
                      <div className="text-4xl md:text-6xl font-bold text-[#FEA35D] mb-2">{stat.value}</div>
                      <div className="text-lg text-white/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mb-10">
                <Badge variant="outline" className="bg-[#B92234]/10 text-[#FEA35D] border-[#FEA35D]/30 py-2 px-4">
                  Don't Just Take Our Word For It
                </Badge>
              </div>
              
              {/* Testimonial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="testimonial-item">
                    <SocialProofItem
                      name={testimonial.name}
                      username={testimonial.username}
                      text={testimonial.text}
                      image={testimonial.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Section>
          
          {/* Video Showcase Section with Fixed Component */}
          <div ref={videoRef} className="relative py-16 bg-[#09232F]">
            <div className="container mx-auto px-4">
              <div className="video-container max-w-4xl mx-auto">
                <SafeVideoEmbed videoUrl="https://www.youtube.com/embed/your-video-id" />
              </div>
            </div>
          </div>
          
          {/* Bento Grid Section */}
          <Section ref={bentoRef} className="bg-[#08141B] py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                  Program Resources
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Everything You Need</span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Vertical Shortcut gives you all the tools, resources, and support to succeed with short-form content.
                </p>
              </div>
              
              <BentoGrid items={bentoItems} />
            </div>
          </Section>
          
          {/* Core Benefits Section */}
          <Section ref={benefitsRef} className="benefits-section bg-gradient-to-b from-[#08141B] to-[#09232F] py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                  What You'll Achieve
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">What Makes This Different</span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Vertical Shortcut isn't about generic advice. It's a complete system for creating content that stands out and drives real business results.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="benefit-item bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FEA35D]/30 transition-all duration-300"
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: benefit.color }}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <Button className="px-8 py-6 bg-[#B92234] hover:bg-[#DE6B59] text-lg font-semibold">
                  See The Full Curriculum
                </Button>
              </div>
            </div>
          </Section>
          
          {/* Feature Highlight Section - Using FeatureStickyLeft component */}
          <FeatureStickyLeft />
          
          {/* Learning Tracks Section */}
          <Section ref={tracksRef} className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                  Specialized Learning Paths
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Choose Your Path to Mastery</span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Vertical Shortcut adapts to your specific goals, whether you're a founder with limited time or a dedicated creator looking to scale.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {tracks.map((track, index) => (
                  <div 
                    key={index} 
                    className="track-item bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FEA35D]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: track.color }}
                      >
                        {track.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{track.name}</h3>
                    </div>
                    <p className="text-white/70">
                      {track.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          
          {/* Curriculum Preview Section - Custom Module Breakdown */}
          <Section className="bg-[#08141B] py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                  Inside The Program
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Curriculum Preview</span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Explore the key modules that will transform your content strategy and production capabilities.
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <ModuleBreakdown />
              </div>
              
              <div className="mt-16 text-center">
                <Alert className="bg-[#154D59]/50 border-[#FEA35D] max-w-3xl mx-auto mb-8">
                  <AlertTitle className="text-[#FEA35D] text-lg">This is just a preview!</AlertTitle>
                  <AlertDescription className="text-white/90">
                    The full Vertical Shortcut program contains over 178 modules across 10 categories, with new content added monthly.
                  </AlertDescription>
                </Alert>
                
                <Button className="px-8 py-6 bg-[#B92234] hover:bg-[#DE6B59] text-lg font-semibold">
                  View Complete Curriculum
                </Button>
              </div>
            </div>
          </Section>
          
          {/* Content Overwhelmer Section - Shows the massive amount of content */}
          <ContentOverwhelmer />
          
          {/* What You'll Learn Section */}
          <Section className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                  Real-World Skills
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">What You'll Learn</span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Concrete, actionable skills you can implement immediately to see dramatic results in your content performance.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {learningOutcomes.map((outcome, index) => (
                  <Item 
                    key={index} 
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#FEA35D]/30 transition-all duration-300"
                  >
                    <ItemIcon className="text-[#FEA35D] mb-4">
                      {outcome.icon}
                    </ItemIcon>
                    <ItemTitle className="text-white mb-2">{outcome.title}</ItemTitle>
                    <ItemDescription className="text-white/70">
                      {outcome.description}
                    </ItemDescription>
                  </Item>
                ))}
              </div>
            </div>
          </Section>
          
          {/* Testimonials Full Section */}
          <Section ref={testimonialsRef} className="testimonials-section bg-[#08141B] py-24 border-t border-[#154D59]/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                  Success Stories
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">From Our Students</span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Real transformations from people who applied the Vertical Shortcut system to their content.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-item">
                    <SocialProofItem
                      name={testimonial.name}
                      username={testimonial.username}
                      text={testimonial.text}
                      image={testimonial.image}
                    />
                  </div>
                ))}
              </div>
              
              {/* Testimonial Carousel */}
              <div className="mt-16 text-center mb-8">
                <h3 className="text-2xl font-bold mb-6">More Success Stories</h3>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <TestimonialCarousel testimonials={carouselTestimonials} />
              </div>
            </div>
          </Section>
          
          {/* Key Features Section */}
          <Section className="bg-[#09232F] py-24 border-t border-[#154D59]/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                <div>
                  <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
                    Program Features
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">What You Get</span>
                  </h2>
                  <p className="text-white/70 text-lg mb-8">
                    Beyond just the course content, Vertical Shortcut provides everything you need to implement what you learn successfully.
                  </p>
                  
                  <div className="space-y-6">
                    {keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="mt-1">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                          <p className="text-white/70">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Program Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <div className="text-lg">Duration</div>
                      <div className="text-lg font-bold">10 Weeks</div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <div className="text-lg">Commitment</div>
                      <div className="text-lg font-bold">4 Hours/Week</div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <div className="text-lg">Format</div>
                      <div className="text-lg font-bold">Online + Live Sessions</div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <div className="text-lg">Next Cohort</div>
                      <div className="text-lg font-bold text-[#B92234]">March 25, 2025</div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <div className="text-lg">Class Size</div>
                      <div className="text-lg font-bold">Limited to 20 Students</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg">Investment</div>
                      <div className="text-xl font-bold text-[#FEA35D]">£6,500</div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button className="w-full py-5 bg-[#B92234] hover:bg-[#DE6B59] text-lg font-semibold">
                      Apply Now
                    </Button>
                    
                    <p className="text-white/50 text-sm text-center mt-4">
                      4 monthly installments of £1,625 available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
          
          {/* Pricing Section */}
          <Pricing3ColsSubscription />
          
          {/* FAQ Section */}
          <FAQ />
          
          {/* Final CTA Section */}
          <Section ref={ctaRef} className="bg-[#08141B] py-24 border-t border-[#154D59]/30 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FEA35D]/5 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#B92234]/10 to-transparent opacity-30 blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="max-w-3xl mx-auto">
                <Glow variant="center" />
                <div className="cta-badge inline-block mb-6 bg-[#FEAC6D]/10 px-6 py-3 rounded-full border border-[#FEAC6D]/30">
                  <span className="text-[#FEAC6D] font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Limited spots available for next cohort
                  </span>
                </div>
                
                <h2 className="cta-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to <span className="bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] bg-clip-text text-transparent">Transform</span> Your Content?
                </h2>
                
                <p className="cta-description text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  Join Vertical Shortcut today and get access to our complete system for creating high-converting content that drives real business results.
                </p>
                
                <div className="space-y-6 cta-button">
                  <Button className="px-10 py-7 bg-[#B92234] hover:bg-[#DE6B59] text-xl font-semibold">
                    Apply Now <span className="ml-2">&rarr;</span>
                  </Button>
                  
                  <p className="text-white/50 text-sm">
                    Applications for our next cohort close in 7 days
                  </p>
                </div>
              </div>
            </div>
          </Section>
          
          {/* Footer */}
          <footer className="bg-[#09232F] py-16 border-t border-[#154D59]/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white mb-4">Vertical Shortcut</h4>
                  <p className="text-white/60 max-w-xs">
                    The premium 10-week program for founders and creators who want to master short-form content and generate consistent leads and revenue.
                  </p>
                  
                  <div className="pt-4">
                    <p className="text-white/40 text-sm">
                      &copy; {new Date().getFullYear()} Clash Creation
                    </p>
                    <p className="text-white/40 text-sm">
                      All rights reserved
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Program</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Curriculum</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Pricing</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Success Stories</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">FAQ</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Apply Now</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Company</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">About Us</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Blog</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Careers</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Contact</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">Cookie Policy</a></li>
                  </ul>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                    <div className="flex gap-4">
                      <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a href="#" className="text-white/60 hover:text-[#FEA35D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default VerticalShortcutLanding;