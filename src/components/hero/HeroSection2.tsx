import { useEffect, useRef } from 'react';
import { Application, Assets, Container, Sprite, Graphics } from 'pixi.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Matter from 'matter-js';

gsap.registerPlugin(ScrollTrigger);

// HSL utility function for eyeball tinting
const hsl = (h: number, s: number, l: number) => {
  return parseInt(
    ((Math.round(h) << 16) + 
    (Math.round(s * 2.55) << 8) + 
    Math.round(l * 2.55)).toString()
  );
};

interface HeroSection2Props {
  /** Props for Hero Section 2 */
  _?: never;
}

const HeroSection2: React.FC<HeroSection2Props> = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const billionEyesRef = useRef<HTMLHeadingElement>(null);
  const dateSinceRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const initialize = async () => {
      console.log("Initializing Hero2 section with Matter.js");
      
      try {
        // Initialize PixiJS Application
        const isMobile = window.innerWidth < 768;
        const app = new Application();
        await app.init({
          background: "#000000",
          resizeTo: window,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          backgroundAlpha: 0
        });

        // Add canvas to container
        if (pixiContainerRef.current) {
          pixiContainerRef.current.appendChild(app.canvas);
        }

        // Load eyeball textures
        const eyeballTextures = await Promise.all([
          Assets.load("/assets/main/eyeballSprite1.svg"),
          Assets.load("/assets/main/eyeballSprite2.svg"),
          Assets.load("/assets/main/eyeballSprite3.svg"),
          Assets.load("/assets/main/eyeballSprite4.svg"),
          Assets.load("/assets/main/eyeballSprite5.svg"),
          Assets.load("/assets/main/eyeballSprite6.svg"),
        ]);

        // Fix variable scope issue
        const MAX_EYEBALLS = isMobile ? 120 : 290;
        
        // Initialize Matter.js Physics Engine
        const engine = Matter.Engine.create();
        const world = engine.world;
        engine.gravity.y = 1;

        // Create scene container with proper positioning
        const sceneContainer = new Container();
        sceneContainer.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
        sceneContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
        sceneContainer.scale.set(1);
        app.stage.addChild(sceneContainer);
        
        // Create the bucket immediately
        createBucket();
        
        // Create bucket function
        function createBucket() {
          const x = window.innerWidth / 2;
          const y = window.innerHeight / 2 - 100;
          
          // PixiJS Graphics for the Bucket
          const bucket = new Sprite();
          bucket.anchor.set(0.5);
          // Create a semicircle
          const graphics = new Graphics();
          graphics.lineStyle(60, 0xff976c);
          graphics.arc(0, 0, 270, Math.PI + 0.05, 2 * Math.PI - 0.05, true);
          bucket.addChild(graphics);

          bucket.position.x = x;
          bucket.position.y = y;
          if (isMobile) {
            bucket.scale.set(0.6);
          }
          sceneContainer.addChild(bucket);

          // Matter.js Static Physics Bodies
          const bucketSegments = [];
          const segmentCount = 30;
          const radius = 270;

          for (let i = 0; i < segmentCount; i++) {
            const angleStart = Math.PI + (i / segmentCount) * -Math.PI;
            const angleEnd = Math.PI + ((i + 1) / segmentCount) * -Math.PI;

            const x1 = x + Math.cos(angleStart) * radius;
            const y1 = y + Math.sin(angleStart) * radius;
            const x2 = x + Math.cos(angleEnd) * radius;
            const y2 = y + Math.sin(angleEnd) * radius;

            const segment = Matter.Bodies.rectangle(
              (x1 + x2) / 2, (y1 + y2) / 2,
              60, 100,
              {
                isStatic: true,
                angle: angleStart + Math.PI / segmentCount,
                render: { visible: true }
              }
            );

            bucketSegments.push(segment);
          }

          Matter.World.add(world, bucketSegments);
        }

        // Eyeballs array to track sprites and bodies
        const eyeballs: { sprite: Sprite; body: Matter.Body; originalRadius: number }[] = [];

        // Create eyeball function
        function createEyeball() {
          if (eyeballs.length >= MAX_EYEBALLS) return;
          
          const spawnX = window.innerWidth / 2 + (Math.random() * 10 - 5);
          const spawnY = Math.random() * -50;
          const radius = Math.random() * 7 + 7;

          const originalRadius = radius;

          const randomTexture = eyeballTextures[Math.floor(Math.random() * eyeballTextures.length)];
          const sprite = Sprite.from(randomTexture);
          sprite.width = sprite.height = radius * 2;
          sprite.anchor.set(0.5);
          sprite.x = spawnX;
          sprite.y = spawnY;
          
          const hueValue = Math.random() * (55 - 25) + 30;
          sprite.tint = hsl(hueValue, Math.random() * 50 + 50, Math.random() * 20 + 80);

          sceneContainer.addChild(sprite);

          const body = Matter.Bodies.circle(spawnX, spawnY, radius + 1, { 
            restitution: 0.005, 
            friction: 0.2, 
            density: 0.2 
          });
          
          Matter.World.add(world, body);

          eyeballs.push({ sprite, body, originalRadius });
        }

        // Mouse interaction
        let isMouseDown = false;
        window.addEventListener("mousedown", () => { isMouseDown = true; });
        window.addEventListener("mouseup", () => { isMouseDown = false; });

        window.addEventListener("mousemove", (event) => {
          const mouseX = event.clientX;
          const mouseY = event.clientY;

          eyeballs.forEach(({ body }) => {
            const dx = body.position.x - mouseX;
            const dy = body.position.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              let forceMagnitude = 0.20;
              if (isMouseDown) forceMagnitude *= 50;

              const forceX = (dx / distance) * forceMagnitude;
              const forceY = (dy / distance) * forceMagnitude;

              Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
            }
          });
        });

        // Track if section is active
        let sectionActive = false;
        let spawnInterval: number | null = null;

        // Set up ScrollTrigger with correct callbacks
        const scrollOptions = {
          trigger: "#heroSection2",
          start: "top top",
          pin: true,
          scrub: 1,
          end: "+=3000",
          id: "hero2ScrollTrigger"
        };
        
        // Create the ScrollTrigger
        const bowlScrollTrigger = ScrollTrigger.create(scrollOptions);
        
        // Add event listeners manually
        bowlScrollTrigger.on("enter", () => {
          console.log("Hero2 section entered - starting eyeball spawning");
          sectionActive = true;
          engine.gravity.y = 1;
          
          // Clear any existing interval
          if (spawnInterval) clearInterval(spawnInterval);
          
          // Start creating eyeballs
          spawnInterval = window.setInterval(() => {
            if (sectionActive && eyeballs.length < MAX_EYEBALLS) {
              createEyeball();
            }
          }, 20);
        });
        
        bowlScrollTrigger.on("leave", () => {
          engine.gravity.y = -1;
          sectionActive = false;
          setTimeout(() => {
            clearEyeballs();
          }, 600);
          if (spawnInterval) {
            clearInterval(spawnInterval);
            spawnInterval = null;
          }
        });
        
        bowlScrollTrigger.on("enterBack", () => {
          engine.gravity.y = 1;
          sectionActive = true;
          if (!spawnInterval) {
            spawnInterval = window.setInterval(() => {
              if (sectionActive && eyeballs.length < MAX_EYEBALLS) {
                createEyeball();
              }
            }, 7);
          }
        });
        
        bowlScrollTrigger.on("leaveBack", () => {
          sectionActive = false;
          setTimeout(() => {
            engine.gravity.y = -1;
            clearEyeballs();
          }, 300);
          if (spawnInterval) {
            clearInterval(spawnInterval);
            spawnInterval = null;
          }
        });
        
        // Create animation timeline for bowl
        const bowlTL = gsap.timeline();

        // Clear eyeballs function
        function clearEyeballs() {
          eyeballs.forEach(({ body, sprite }) => {
            Matter.World.remove(world, body);
            sceneContainer.removeChild(sprite);
          });
          eyeballs.length = 0;
        }

        // Animate text
        const billionEyesEl = billionEyesRef.current;
        if (billionEyesEl) {
          const billionEyesAnimation = gsap.timeline();
          
          // Split text animation for billionEyesEl
          const elements = Array.from(billionEyesEl.childNodes).filter(node => 
            node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE
          );
          
          billionEyesAnimation.from(elements, {
            y: 200, 
            opacity: 0, 
            duration: 1.2, 
            stagger: 0.05,
            ease: "elastic.out(1,0.6)"
          });
          
          // Create scroll trigger for text animation
          const textScrollTrigger = ScrollTrigger.create({
            trigger: "#billionEyesText",
            start: "50% 80%",
            end: "bottom top",
            pin: false,
            scrub: false,
            toggleActions: "play none none reverse",
            animation: billionEyesAnimation,
            id: "billionEyesTextTrigger"
          });
          
          // Manually refresh when needed
          billionEyesAnimation.eventCallback('onComplete', () => {
            ScrollTrigger.refresh();
          });
        }

        // Date since calculation
        function getTimeSince(startDate: Date) {
          const now = new Date();

          let years = now.getFullYear() - startDate.getFullYear();
          let months = now.getMonth() - startDate.getMonth();
          let days = now.getDate() - startDate.getDate();

          if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days = prevMonth.getDate() + days;
          }

          if (months < 0) {
            years--;
            months = 12 + months;
          }

          let hours = now.getHours() - startDate.getHours();
          let minutes = now.getMinutes() - startDate.getMinutes();
          let seconds = now.getSeconds() - startDate.getSeconds();

          if (seconds < 0) {
            minutes--;
            seconds = 60 + seconds;
          }

          if (minutes < 0) {
            hours--;
            minutes = 60 + minutes;
          }

          if (hours < 0) {
            days--;
            hours = 24 + hours;
          }

          return { years, months, days, hours, minutes, seconds };
        }

        function updateTimeSince(startDate: Date) {
          function updateCounter() {
            const elapsed = getTimeSince(startDate);
            const container = dateSinceRef.current;

            if (container) {
              container.innerHTML = formatTimeSince(elapsed);
            }
          }

          updateCounter();
          setInterval(updateCounter, 1000);
        }

        function formatTimeSince(timeObj: { years: number; months: number; days: number; hours: number; minutes: number; seconds: number }) {
          const { years, months, days, hours, minutes, seconds } = timeObj;
          const yearLabel = pluralize(years, "Year", "Years");
          const monthLabel = pluralize(months, "Month", "Months");
          const dayLabel = pluralize(days, "Day", "Days");
          const hoursLabel = pluralize(hours, "Hour", "Hours");
          const minutesLabel = pluralize(minutes, "Minute", "Minutes");
          const secondsLabel = pluralize(seconds, "Second", "Seconds");
          
          return `<span style="color:#ffce91;">In only:</span>
         ${years} ${yearLabel},
            ${months} ${monthLabel}, 
               ${days} ${dayLabel},
                  <p style="opacity: 75%; position: absolute; display: inline-block; line-height: 1; font-size: clamp(2rem, 4.3vw, 3.2rem); font-weight: 500;">${hours} ${hoursLabel}, </p>
                      <p style="opacity: 60%; position: absolute; display: inline-block; font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: -0.8rem; font-weight: 400;">${minutes} ${minutesLabel}, </p>
                         <p style="opacity: 42%; position: absolute; display: inline-block; font-size: clamp(1.5rem, 3vw, 2rem); margin-top: -2.1rem; font-weight: 300;">${seconds} ${secondsLabel}.  </p>
                                              `;
        }

        function pluralize(value: number, singular: string, plural: string) {
          return (value === 1 ? singular : plural);
        }

        // Initialize the date counter
        const myStartDate = new Date("2023-03-04");
        updateTimeSince(myStartDate);
        const elapsed = getTimeSince(myStartDate);

        // Animation timeline
        bowlTL.from(sceneContainer.scale, {
          x: 20,
          y: 20,
          duration: 0.8,
          ease: "power4.out",
        }, 0)
        .from(sceneContainer, {
          alpha: 1,
          duration: 0.2,
          ease: "expo.in",
        }, 0)
        .from(sceneContainer.position, {
          y: 1400,
          duration: 1.2,
          ease: "expo.out",
        }, 0);

        bowlTL.fromTo(engine.gravity, { y: -40 }, { y: 1, duration: 0.4, ease: "power4.out" }, 0);

        const dateSinceContainer = dateSinceRef.current;
        if (dateSinceContainer) {
          bowlTL.from(dateSinceContainer, {
            opacity: 0,
            y: "+=200",
            duration: 1.2,
            ease: "power3.inOut",
          }, 0.5);
          
          dateSinceContainer.innerHTML = formatTimeSince(elapsed);
        }

        // Update function for physics
        function update() {
          Matter.Engine.update(engine);
          eyeballs.forEach((obj, index) => {
            obj.sprite.x = obj.body.position.x;
            obj.sprite.y = obj.body.position.y;
            obj.sprite.rotation = obj.body.angle;

            // Get velocity magnitude and direction
            const velocityX = obj.body.velocity.x;
            const velocityY = obj.body.velocity.y;
            const velocityMagnitude = Math.sqrt(velocityX ** 2 + velocityY ** 2) || 0.001;

            // Compute movement direction angle
            const velocityAngle = Math.atan2(velocityY, velocityX);

            // Define squash & stretch factors
            const stretchFactor = Math.min(1 + velocityMagnitude * 0.03, 1.3);
            const squashFactor = Math.max(1 - velocityMagnitude * 0.05, 0.7);

            // Apply scale relative to radius
            const newWidth = obj.originalRadius * 2 * squashFactor;
            const newHeight = obj.originalRadius * 2 * stretchFactor;

            // Only update scale if there's a noticeable change
            if (
              Math.abs(obj.sprite.width - newWidth) > 0.5 ||
              Math.abs(obj.sprite.height - newHeight) > 0.5
            ) {
              gsap.to(obj.sprite, {
                width: newHeight,
                height: newWidth,
                duration: 0.1,
                ease: "power2.out"
              });
            }

            // Reduce crazy spinning
            if (velocityMagnitude > 0.5) {
              gsap.to(obj.sprite, {
                rotation: velocityAngle,
                duration: 0.5,
                ease: "power2.out"
              });
            }

            // Remove offscreen eyeballs
            if (obj.body.position.y > window.innerHeight + 200 || obj.body.position.y < -200) {
              Matter.World.remove(world, obj.body);
              sceneContainer.removeChild(obj.sprite);
              eyeballs.splice(index, 1);
            }
          });
          requestAnimationFrame(update);
        }

        // Start update loop
        update();

        console.log("Hero2 section initialized successfully");
        return true;
      } catch (error) {
        console.error("Hero2 section initialization error:", error);
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

  return (
    <section id="heroSection2" className="relative min-h-screen w-full bg-gradient-to-b from-[#DE6B59]/80 to-[#FEA35D]/90 overflow-hidden">
      <div 
        id="dateSinceWrap" 
        className="relative grid grid-cols-6 grid-rows-6 gap-4 h-screen w-full"
      >
        <div id="app" className="col-start-1 col-end-8 row-start-1 row-end-7">
          <div id="pixi-container" ref={pixiContainerRef} className="w-full h-full"></div>
        </div>
        
        <h2 
          id="billionEyesText" 
          ref={billionEyesRef}
          className="text-white font-bold leading-[0.9] filter drop-shadow-lg mt-4 text-[clamp(2.5rem,3vw,4rem)] text-left col-start-2 col-end-4 row-start-2 row-end-4 self-center justify-self-center"
        >
          Over<br />
          <span className="font-bold text-[clamp(3rem,6vw,5rem)]">1.5 Billion </span><br />
          <span className="text-right ml-[69%] -mt-8">Eyes. </span>
        </h2>
        
        <pre 
          id="dateSince" 
          ref={dateSinceRef}
          className="filter drop-shadow-lg col-start-2 col-end-4 row-start-4 row-end-6 -mr-8 -mt-5 relative self-center justify-self-center overflow-visible text-left text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white"
        ></pre>
      </div>
    </section>
  );
};

export default HeroSection2; 