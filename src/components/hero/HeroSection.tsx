import { useEffect, useRef } from 'react';
import { Application, Assets, Container, Sprite, DisplacementFilter } from 'pixi.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const pipeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = async () => {
      console.log("Initializing Hero section with Pixi.js");
      const isMobile = window.innerWidth < 768;
      
      try {
        // Initialize PixiJS Application
        const app = new Application();
        await app.init({
          background: "#000000",
          resizeTo: window,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          backgroundAlpha: 0
        });

        // Attach to container
        if (pixiContainerRef.current) {
          pixiContainerRef.current.appendChild(app.canvas);
        }

        // Load assets
        await Assets.load([
          '/assets/main/simplePipe.webp',
          '/assets/main/simplePipeTop.webp',
          '/assets/main/PipeDispMap.webp',
          '/assets/main/eyeballSprite1.webp',
          '/assets/main/eyeballSprite2.webp',
          '/assets/main/eyeballSprite3.webp',
          '/assets/main/eyeballSprite4.svg',
          '/assets/main/eyeballSprite5.webp',
          '/assets/main/eyeballSprite6.webp',
        ]);

        app.stage.eventMode = 'static';

        // Set up pipe & displacement
        const pipeContainer = new Container();
        app.stage.addChild(pipeContainer);

        const pipeSprite = Sprite.from('/assets/main/simplePipe.webp');
        pipeContainer.addChild(pipeSprite);

        const pipeSpriteTop = Sprite.from('/assets/main/simplePipeTop.webp');
        pipeContainer.addChild(pipeSpriteTop);

        // Position the pipe based on screen size
        if (!isMobile) {
          pipeContainer.x = window.innerWidth / 1.625;
          pipeContainer.y = window.innerHeight / 4.6;
        } else {
          pipeContainer.scale.set(0.7);
          pipeContainer.x = window.innerWidth / 1.3;
          pipeContainer.y = window.innerHeight / 3;
        }
        pipeContainer.rotation = -0.253;

        // Displacement sprite
        const displacementSprite = Sprite.from('/assets/main/PipeDispMap.webp');
        displacementSprite.texture.source.addressMode = 'clamp-to-edge';
        displacementSprite.anchor.set(-0.05);
        displacementSprite.position.set(500, 0);
        pipeContainer.addChild(displacementSprite);

        // Displacement filter
        const displacementFilter = new DisplacementFilter(displacementSprite);
        displacementFilter.scale.set(0, 100);
        displacementFilter.padding = 20;

        // Apply to pipe base & top
        pipeSprite.filters = [displacementFilter];
        pipeSpriteTop.filters = [displacementFilter];

        // Middle container for eyeballs
        const pipeMiddleContainer = new Container();
        pipeContainer.addChildAt(pipeMiddleContainer, pipeContainer.getChildIndex(pipeSpriteTop));

        // Initialize burger menu
        initBurgerMenu();

        // Eyeball spawning functions
        function spawnEyeball() {
          const eyeballContainer = new Container();

          // Random eyeball sprite
          const randomIndex = Math.floor(Math.random() * 6) + 1;
          const newRandom = randomIndex === 4 ? 5 : randomIndex;
          const eyeballSprite = Sprite.from(`/assets/main/eyeballSprite${newRandom}.webp`);
          eyeballSprite.anchor.set(0.5);
          eyeballSprite.scale.set(0.2);

          // Each eyeball's own displacement
          const eyeDispSprite = Sprite.from('/assets/main/PipeDispMap.webp');
          eyeDispSprite.texture.source.addressMode = 'clamp-to-edge';
          eyeDispSprite.anchor.set(-0.05);

          const eyeDispFilter = new DisplacementFilter(eyeDispSprite);
          eyeDispFilter.padding = 20;
          eyeDispFilter.scale.set(30, 30);

          eyeballContainer.addChild(eyeballSprite);

          return eyeballContainer;
        }

        function getPipeTipLocal() {
          const globalPos = pipeSpriteTop.toGlobal({ x: window.innerWidth / 5.5, y: 290 });
          return pipeMiddleContainer.toLocal(globalPos);
        }

        function spawnMultipleEyeballs(count: number, startX: number, startY: number) {
          for (let i = 0; i < count; i++) {
            const eContainer = spawnEyeball();
            eContainer.scale.set(0.1);
            pipeMiddleContainer.addChild(eContainer);
            const randomX = window.innerWidth / (Math.random() * 0.6 + 1.4);
            eContainer.x = startX;
            eContainer.y = startY;
            const delayAmount = i * Math.random() / 10;

            const tween = gsap.to(eContainer, {
              alpha: 1,
              motionPath: {
                path: [
                  { x: startX, y: startY },
                  { x: startX - randomX, y: startY + 450 },
                  { x: startX - randomX, y: startY + 1300 }
                ],
                curviness: Math.random() * 1.3 + 1.7
              },
              duration: 1.2,
              delay: delayAmount,
              ease: "slow(0.7, 0.55)"
            });

            const tween2 = gsap.to(eContainer.children, {
              rotation: (Math.random() - 0.5) > 0 ? 7 : -7,
              duration: 1.2,
              delay: delayAmount,
              ease: "power3.out",
            });

            const tweenScale = gsap.to(eContainer.scale, {
              x: 1,
              y: 1,
              duration: 0.2,
              delay: delayAmount,
              ease: "power4.in"
            });

            const yoyoScale = gsap.to(eContainer.scale, {
              x: 1.4,
              y: 1.4,
              ease: "slow(0.4, 0.55, true)",
              delay: delayAmount,
              duration: 0.8,
            });

            mainTL.add(tweenScale, 0.3);
            mainTL.add(tween, 0.55);
            mainTL.add(tween2, 0.55);
            mainTL.add(yoyoScale, 0.75);
          }
        }

        // The main eyeball that we keep centered
        let mainEyeContainer: Container | null = null;

        function spawnMainEyeball(startX: number, startY: number) {
          mainEyeContainer = spawnEyeball();
          mainEyeContainer.scale.set(0.1);
          pipeMiddleContainer.addChild(mainEyeContainer);

          mainEyeContainer.x = startX;
          mainEyeContainer.y = startY;

          // Animate it upward or outward
          const tween = gsap.to(mainEyeContainer, {
            alpha: 1,
            motionPath: {
              path: [
                { x: startX, y: startY },
                { x: startX - (window.innerWidth / 1.9), y: startY + 480 },
                { x: startX - (window.innerWidth / 1.9), y: startY + 550 }
              ],
              curviness: 2.1
            },
            duration: 1.35,
            ease: "slow(0.4, 0.8)",
          });

          const tween2 = gsap.to(mainEyeContainer.scale, {
            x: 1,
            y: 1,
            duration: 0.5,
            ease: "power3.in"
          });

          const tween3 = gsap.to(mainEyeContainer, {
            y: "+=700",
            x: "-=200",
            duration: 1,
            ease: "power3.in",
          });

          const yoyoScale = gsap.to(mainEyeContainer.scale, {
            x: 1.4,
            y: 1.4,
            ease: "slow(0.4, 0.55, true)",
            duration: 0.8,
          });

          const tweenRotate = gsap.to(mainEyeContainer.children, {
            rotation: 12,
            duration: 1.5,
            ease: "power3.out",
          });

          mainTL.add(tweenRotate, 1.3);
          mainTL.add(tween, 1.3);
          mainTL.add(tween2, 0.3);
          mainTL.add(tween3, 3.2);
          mainTL.add(yoyoScale, 1.5);
        }

        // Set up ScrollTrigger
        const mainTL = gsap.timeline();

        // Create ScrollTrigger
        const scrollOptions = {
          trigger: "#heroSection",
          start: "top top",
          end: "+=1500",
          pinSpacing: false,
          scrub: 1,
          pin: true,
          id: "heroSectionTrigger"
        };

        const mainScrollTrigger = ScrollTrigger.create(scrollOptions);

        // Manually add callback
        mainScrollTrigger.refresh = () => {
          ScrollTrigger.refresh();
        };

        // Animate displacement
        mainTL.to(displacementSprite, {
          x: -pipeContainer.width / 4,
          duration: 1
        }, 0);

        mainTL.to(displacementFilter.scale, {
          x: 0,
          y: 0,
          duration: 1
        }, 0);

        // Move pipe up
        mainTL.to(pipeContainer.position, {
          y: "+=36.3",
          duration: 1
        }, 0);

        // Spawn multiple eyeballs
        mainTL.call(() => {
          const tip = getPipeTipLocal();
          spawnMultipleEyeballs(!isMobile ? 20 : 10, tip.x, tip.y);
        }, [], 0);

        // Spawn main eyeball
        mainTL.call(() => {
          const tip = getPipeTipLocal();
          spawnMainEyeball(tip.x, tip.y);
        }, [], 0);

        // Additional animations
        mainTL.to(pipeContainer, {
          y: pipeContainer.y - 800,
          x: pipeContainer.x + window.innerWidth * 0.12,
          duration: 1.2,
          ease: "power3.Out"
        }, 1.3)
        .to("#titleWrapper", {
          y: "-=800",
          x: window.innerWidth * 0.12,
          duration: 1.2,
          ease: "power3.Out"
        }, "<")
        .to(".hero-bg", {
          opacity: 0,
          duration: 1.2,
          ease: "power2.in"
        }, "<")
        .to(".design-grid", {
          y: "-=800",
          x: "+=100",
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "power3.in"
        }, "<")
        .to("#app1", {
          scale: 0.1,
          duration: 2.4,
          ease: "expo.in"
        }, ">-0.3");

        // Initialize text animations
        initHeroTitleAnimations();

        console.log("Hero section initialized successfully");
        return true;
      } catch (error) {
        console.error("Hero section initialization error:", error);
        return false;
      }
    };

    initialize();

    return () => {
      // Cleanup code here
      const allScrollTriggers = ScrollTrigger.getAll();
      allScrollTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

  // Burger menu initialization
  function initBurgerMenu() {
    const burgerButton = burgerButtonRef.current;
    const menuOverlay = menuOverlayRef.current;
    
    if (burgerButton && menuOverlay) {
      burgerButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        burgerButton.classList.toggle('open');
        menuOverlay.classList.toggle('open');
        
        if (menuOverlay.classList.contains('open')) {
          const menuItems = menuOverlay.querySelectorAll('.menu-item');
          gsap.fromTo(menuItems, 
            {
              y: 50,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.3
            }
          );
        }
      });
      
      // Close menu when clicking menu items
      const menuItems = menuOverlay.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function() {
          burgerButton.classList.remove('open');
          menuOverlay.classList.remove('open');
        });
      });
    }
  }

  // Text animations
  function initHeroTitleAnimations() {
    gsap.to("#heroTitleMain", {
      x: '-20vw',
      duration: 0.2,
      ease: "power4.Out",
    });
    
    gsap.to("#heroTitleMain2", {
      x: '-20vw',
      duration: 0.2,
      ease: "power4.Out",
    });
  }

  return (
    <section id="heroSection" className="relative min-h-screen w-full bg-[#09232F] overflow-hidden">
      {/* Design grid overlay */}
      <div className="design-grid absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="left-column absolute left-0 top-0 h-full w-1/3 flex flex-col">
          <div className="rectangle-left-top h-1/2 border-r border-white/10"></div>
          <div className="rectangle-left-bottom h-1/2 border-r border-white/10"></div>
        </div>
        <div className="rectangle-right absolute right-0 top-0 h-full w-1/3 border-l border-white/10"></div>
      </div>

      {/* Background gradient */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-b from-[#09232F] to-[#154D59]/60"></div>

      {/* Navigation */}
      <div className="intro-header fixed top-0 left-0 w-full z-50">
        <div className="navigation flex justify-between items-center py-6 px-8">
          {/* Logo */}
          <img 
            src="/assets/main/Logo-One-Line-Dark-for-Light.webp" 
            alt="Clash Creation Logo" 
            className="clashlogo h-12"
          />
          
          {/* Burger Menu Button */}
          <div 
            ref={burgerButtonRef}
            className="burger-button relative w-10 h-8 cursor-pointer flex flex-col justify-around z-50"
          >
            <div className="burger-line w-full h-0.5 bg-white transition-all duration-300"></div>
            <div className="burger-line w-full h-0.5 bg-white transition-all duration-300"></div>
            <div className="burger-line w-full h-0.5 bg-white transition-all duration-300"></div>
          </div>
          
          {/* Menu Overlay */}
          <div 
            ref={menuOverlayRef}
            className="menu-overlay fixed inset-0 bg-[#09232F]/95 opacity-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center z-40"
          >
            <div className="menu-items flex flex-col items-center justify-center space-y-8">
              <div className="menu-item text-white text-2xl cursor-pointer hover:text-[#FEA35D] transition-colors">Home</div>
              <div className="menu-item text-white text-2xl cursor-pointer hover:text-[#FEA35D] transition-colors">Services</div>
              <div className="menu-item text-white text-2xl cursor-pointer hover:text-[#FEA35D] transition-colors">About</div>
              <div className="menu-item text-white text-2xl cursor-pointer hover:text-[#FEA35D] transition-colors">Contact</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pixi Container */}
      <div id="app1" className="absolute inset-0 z-10">
        <div id="pixi-container-hero" ref={pixiContainerRef} className="w-full h-full"></div>
      </div>

      {/* Title Container */}
      <div 
        id="titleWrapper" 
        ref={titleWrapperRef}
        className="stage absolute inset-0 flex flex-col justify-center items-center text-white -mt-[12.5%] z-20"
      >
        <h1 
          id="heroTitle" 
          ref={heroTitleRef}
          className="TitleText text-[clamp(1.5rem,3vw+1rem,12rem)] font-normal text-center absolute -translate-x-[8vw]"
        >
          <span id="heroTitleLine1" className="block -z-10">Attention Builds Influence,</span>
          <span 
            id="heroTitleMain" 
            className="sectionHeading !overflow-visible text-[1.3em] font-semibold text-right -ml-[30vw] absolute w-[24ch]"
          >
            We Get
            <span id="Attention" className="Attention text-[#FEA35D]"> Attention.</span>
          </span>
          <span 
            id="heroTitleMain2" 
            className="sectionHeading opacity-0 text-[1.3em] font-semibold text-right -ml-[30vw] absolute w-[24ch]"
          >
            <span id="glitchTitle">We Get</span>
            <span id="Attention" className="Attention text-[#ff8e61]"> Attention.</span>
          </span>
        </h1>
      </div>

      {/* Pipe Container */}
      <div className="pipecontainer" id="pipeContainer" ref={pipeContainerRef}>
        <div className="pipetop hidden" id="pipeTop">
          <img src="/assets/main/simplePipeTop.webp" loading="lazy" alt="" className="w-full h-auto" />
        </div>
        <div className="eyeballpipe1 hidden" id="eyeBallPipe1">
          <img src="/assets/main/eyeballSprite1.webp" loading="lazy" alt="" className="w-full h-auto" />
        </div>
        <img src="/assets/main/simplePipe.webp" loading="lazy" alt="" className="hidden" />
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={onCtaClick} 
          className="px-8 py-4 bg-gradient-to-r from-[#FEA35D] to-[#DE6B59] text-white text-xl font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Get in Touch
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 