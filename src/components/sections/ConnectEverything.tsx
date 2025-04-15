import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getImage } from "../../utils/imageMap";

interface ConnectEverythingProps {
  className?: string;
  id?: string;
}

export const ConnectEverything: React.FC<ConnectEverythingProps> = ({ className = "", id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use our image mapping utility to get the actual images with proper error handling
  const appIcons = {
    creatorHud: getImage('main', 'AppIcons', 'Hud') ?? '',
    scranAr: getImage('main', 'AppIcons', 'Scran-ar') ?? '',
    spitt: getImage('main', 'AppIcons', 'Scranar-prPRO extension') ?? ''
  };

  // Check if any required images are missing
  const missingImages = Object.entries(appIcons).filter(([, value]) => !value);
  if (missingImages.length > 0) {
    console.warn('Missing required images:', missingImages.map(([key]) => key));
  }

  // Simplified GSAP animations to reduce lag
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Only do minimal icon animations - simplified to reduce lag
      gsap.utils.toArray<Element>('.app-icon').forEach((icon, index) => {
        // Simple floating animation instead of complex 3D movement
        gsap.to(icon, {
          y: -10,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });

        // Simple hover effect with reduced motion preference check
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.05,
              duration: 0.3
            });
          });

          icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3
            });
          });
        }
      });

      // Simplified glow effect with reduced motion check
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray<Element>('.app-icon-glow').forEach((glow, i) => {
          gsap.to(glow, {
            opacity: 0.6,
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            delay: i * 0.5
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-[1874px] h-[3383px] px-[262px] py-[25px] bg-radial-[at_75%_-11%] from-cyan-950 to-black to 78% inline-flex flex-col justify-center items-center gap-[200px] overflow-hidden">
      <div className="size- flex flex-col justify-center items-center gap-[49px]">
        <div className="justify-start"><span className="text-white text-[85px] font-semibold">Connect </span><span className=" text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 text-clip  text-[85px] font-semibold">Everything</span></div>
        <div className="w-[880px] text-center justify-center text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">Short-form is still a new medium, and most modern video pipelines just aren’t fit to deal with the quantity (and quality) demands of the medium.</div>
        <div className="w-[1158px] h-[295px] min-h-[295px] text-center justify-center text-white text-[55px] font-semibold font-['Neue_Haas_Grotesk_Display_Pro']">Packaged intrinsically with the Vertical Shortcut are utilities, apps, and extensions we’ve developed in house.</div>
        <div className="w-[880px] text-center justify-center text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">Altogether implementing these made our team about 4x more efficient as an agency, while also increasing  quality</div>
      </div>
      <div className="w-[880px] inline-flex justify-center items-center gap-[41px] flex-wrap content-center">
        <div className="flex-1 flex justify-center items-center gap-[123px] flex-wrap content-center">
          <img className="size-[300px] glow-theme-secondary halftone-image max-w-none object-contain drop-shadow-2xl" src={appIcons.creatorHud} />
          <div className="w-[453px] h-[226px] justify-start"><span className="text-sky-300 text-[64px] font-normal font-['Neue_Haas_Grotesk_Display_Pro'] leading-[57.15px]">Creator HUD</span><span className="text-background text-[64px] font-normal font-['Neue_Haas_Grotesk_Display_Pro'] leading-[57.15px]"> </span><span className="text-background text-[28px] font-normal font-['Neue_Haas_Grotesk_Display_Pro'] leading-[25px]">for Notion<br /></span><span className="text-background text-2xl font-normal font-['Neue_Haas_Grotesk_Display_Pro'] leading-snug"><br /></span><span className="text-background text-2xl font-normal font-['Neue_Haas_Grotesk_Display_Pro']">A custom-code heavy Notion Template<br />This tool works natively with Premiere Pro and<br />the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.<br /></span></div>
        </div>
        <div className="h-[295px] flex justify-center items-center gap-[123px] flex-wrap content-center">
          <img className="size-[300px] halftone-image max-w-none object-contain drop-shadow-2xl" src={appIcons.scranAr} />
          <div className="justify-start"><span className="text-rose-200 text-[64px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">Scran.ar</span><span className="text-background text-[64px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']"> </span><span className="text-background text-2xl font-normal font-['Neue_Haas_Grotesk_Display_Pro']">(beta)<br /></span><span className="text-background text-2xl font-normal font-['Neue_Haas_Grotesk_Display_Pro'] leading-loose">A powerful video ingest application,<br /></span><span className="text-background text-2xl font-normal font-['Neue_Haas_Grotesk_Display_Pro']">specifically for editing buckets of shorts, </span><span className="text-background text-2xl font-medium font-['Neue_Haas_Grotesk_Display_Pro']">quickly</span><span className="text-background text-[27px] font-medium font-['Neue_Haas_Grotesk_Display_Pro']">.<br /><br /></span><span className="text-background text-lg font-medium font-['Neue_Haas_Grotesk_Display_Pro']">By communicating directly with the Creator HUD,<br />this tool knows everything about your raw footage<br />before even you do.<br /></span></div>
        </div>
        <div className="size- flex justify-center items-center gap-[123px] flex-wrap content-center">
          <img className="size-[300px] halftone-image max-w-none object-contain drop-shadow-2xl" src={appIcons.spitt} />
          <div className="w-[453px] h-[306px] justify-start"><span className="text-purple-500 text-[64px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">Spitt.ar </span><span className="text-purple-500 text-3xl font-normal font-['Neue_Haas_Grotesk_Display_Pro']"> </span><span className="text-background text-2xl font-normal font-['Neue_Haas_Grotesk_Display_Pro']">A  Premiere Pro Extension for Scran.ar<br /><br />Video editing can be cruel, whether you’re the one doing it or not.<br /><br />This tool works natively with Premiere Pro and<br />the data from Scran.ar to, in a single click of a button, create uniquely named timelines and populate them with the appropriate footage.</span></div>
        </div>
      </div>
      <div className="w-[1158px] flex flex-col justify-center items-center gap-[49px]">
        <div className="self-stretch text-center justify-center text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">The best part is,</div>
        <div className="self-stretch text-center justify-center text-orange-400 text-[80px] font-semibold font-['Neue_Haas_Grotesk_Display_Pro']">They speak to each-other.</div>
        <div className="w-[1074px] h-[184px] text-center justify-center"><span className="text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">As we work towards offering more of our custom systems publicly, you, as a part of</span><span className="text-white text-[38px] font-semibold font-['Neue_Haas_Grotesk_Display_Pro']"> </span><span className="text-blue-500 text-[38px] font-semibold font-['Neue_Haas_Grotesk_Display_Pro']">Vertical Shortcut Cohort α</span><span className="text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">, will have permanent access to the entire suite, as well as permanent updates  and expansions to the course. </span></div>
        <div className="w-[1074px] h-[92px] text-center justify-center text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">We have custom analytics tools,  video editing automators, A.I driven ‘authentic performance’ checkers.</div>
        <div className="w-[1074px] h-[46px] text-center justify-center text-white text-[38px] font-normal font-['Neue_Haas_Grotesk_Display_Pro']">You would be one of the only 12 people we would </div>
      </div>
    </div>
  );
};

export default ConnectEverything;