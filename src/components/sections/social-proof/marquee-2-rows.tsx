import React from 'react';
import Marquee from "../../ui/marquee";
import { viewsThumbnails } from '../../../utils/thumbnailMapper';
import { Section } from "../../ui/section";

interface MarqueeTwoRowsProps {
  className?: string;
  sectionTitle?: string;
  sectionDescription?: string;
}

const MarqueeTwoRows: React.FC<MarqueeTwoRowsProps> = ({ 
  sectionTitle = "You may have seen some of our work before:",
  sectionDescription = "These are just some of the videos we've created that have gone viral, reaching hundreds of millions of views across platforms."
}) => {
  // Get thumbnails directly from the viewsThumbnails mapping
  const thumbnails = Object.entries(viewsThumbnails).map(([key, src]) => ({
    src,
    alt: key.replace(/-/g, ' ')
  }));
  
  // Split thumbnails into two roughly equal groups for the two rows (desktop) 
  const firstRowThumbnails = thumbnails.slice(0, Math.ceil(thumbnails.length / 2));
  const secondRowThumbnails = thumbnails.slice(Math.ceil(thumbnails.length / 2));
  
  // Split for 3 rows on mobile with more items per row (these will be hidden on desktop)
  const mobileRows = [];
  // Spread thumbnails more evenly
  const repeatedThumbnails = [...thumbnails, ...thumbnails].slice(0, thumbnails.length * 1.5);
  const mobileRowSize = Math.ceil(repeatedThumbnails.length / 3);
  for (let i = 0; i < 3; i++) {
    const start = i * mobileRowSize;
    const end = Math.min(start + mobileRowSize, repeatedThumbnails.length);
    mobileRows.push(repeatedThumbnails.slice(start, end));
  }

  return (
    <Section className="w-full overflow-hidden bg-theme-bg-secondary/90 py-2 sm:py-4 md:py-24 px-0 pt-12 md:pt-6 pb-16 sm:pb-8 md:pb-4 mt-[50px] sm:mt-[20px] md:mt-[-80px]">
      <div className="mx-auto flex max-w-container flex-col items-center gap-0 sm:gap-2 text-center md:gap-16">
        <div className="flex flex-col items-center gap-2 px-4 sm:gap-4 md:gap-8">
          <h2 className="max-w-[800px] text-lg xs:text-xl sm:text-2xl md:text-4xl font-bold leading-tight sm:leading-tight mb-0">
            {sectionTitle}
          </h2>
          <p className="body-text max-w-[600px] mx-auto md:max-w-none text-xs sm:text-sm md:text-base mt-0">
            {sectionDescription}
          </p>
        </div>
        
        {/* Full-width mask with vignette */}
        <div className="w-full max-w-full relative">
          {/* Desktop layout - 2 rows, hidden on mobile */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden mb-[-36px]">
              <Marquee pauseOnHover className="[--duration:60s] py-0">
                {firstRowThumbnails.map((item, index) => (
                  <div 
                    key={`desktop-first-${index}`} 
                    className="-mx-8 -my-5 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300 shadow-theme-md"
                    style={{ transform: "scale(0.75)" }}
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      width={320} 
                      height={180}
                      className="object-cover"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
            
            <div className="relative overflow-hidden">
              <Marquee reverse pauseOnHover className="[--duration:60s] py-0">
                {secondRowThumbnails.map((item, index) => (
                  <div 
                    key={`desktop-second-${index}`} 
                    className="-mx-8 -my-5 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300 shadow-theme-md"
                    style={{ transform: "scale(0.75)" }}
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      width={320} 
                      height={180}
                      className="object-cover"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          
          {/* Mobile layout - 3 rows, hidden on desktop */}
          <div className="block md:hidden">
            {mobileRows.map((rowThumbnails, rowIndex) => (
              <div key={`mobile-row-${rowIndex}`} className="relative overflow-hidden mb-[-80px] xs:mb-[-70px] sm:mb-[-60px]">
                <Marquee 
                  reverse={rowIndex % 2 === 1} 
                  pauseOnHover 
                  className="[--duration:25s] py-0 -my-6"
                >
                  {rowThumbnails.map((item, index) => (
                    <div 
                      key={`mobile-thumb-${rowIndex}-${index}`} 
                      className="mx-[-30px] -my-0 overflow-hidden rounded-lg transition-transform duration-300 shadow-theme-sm hover:scale-105"
                      style={{ transform: "scale(0.32)" }}
                    >
                      <img 
                        src={item.src} 
                        alt={item.alt} 
                        width={320} 
                        height={180}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            ))}
          </div>
          
          {/* Deep side vignettes that fade out thumbnails completely using theme-aware colors */}
          <div 
            className="pointer-events-none absolute inset-y-0 left-0 w-[10%] sm:w-[15%] md:w-[35%] z-10 bg-theme-gradient-overlay-left opacity-90"
          ></div>
          <div 
            className="pointer-events-none absolute inset-y-0 right-0 w-[10%] sm:w-[15%] md:w-[35%] z-10 bg-theme-gradient-overlay-left opacity-90"
            style={{ transform: 'scaleX(-1)' }}
          ></div>
        </div>
      </div>
    </Section>
  );
};

export default MarqueeTwoRows;