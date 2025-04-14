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
  
  // Split for 5 rows on mobile (these will be hidden on desktop)
  const mobileRows = [];
  const mobileRowSize = Math.ceil(thumbnails.length / 5);
  for (let i = 0; i < 5; i++) {
    const start = i * mobileRowSize;
    const end = Math.min(start + mobileRowSize, thumbnails.length);
    mobileRows.push(thumbnails.slice(start, end));
  }

  return (
    <Section className="w-full overflow-hidden bg-theme-bg-secondary py-12 md:py-24 border-t border-theme-border px-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[800px] text-3xl md:text-4xl font-bold leading-tight sm:text-6xl sm:leading-tight">
            {sectionTitle}
          </h2>
          <p className="body-text max-w-[600px] mx-auto md:max-w-none text-sm md:text-base">
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
          
          {/* Mobile layout - 5 rows, hidden on desktop */}
          <div className="block md:hidden">
            {mobileRows.map((rowThumbnails, rowIndex) => (
              <div key={`mobile-row-${rowIndex}`} className="relative overflow-hidden mb-[-16px]">
                <Marquee 
                  reverse={rowIndex % 2 === 1} 
                  pauseOnHover 
                  className="[--duration:45s] py-0"
                >
                  {rowThumbnails.map((item, index) => (
                    <div 
                      key={`mobile-thumb-${rowIndex}-${index}`} 
                      className="-mx-4 -my-2 overflow-hidden rounded-lg transition-transform duration-300 shadow-theme-sm hover:scale-105"
                      style={{ transform: "scale(0.375)" }}
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
            className="pointer-events-none absolute inset-y-0 left-0 w-[25%] md:w-[35%] z-10 bg-theme-gradient-overlay-left"
          ></div>
          <div 
            className="pointer-events-none absolute inset-y-0 right-0 w-[25%] md:w-[35%] z-10 bg-theme-gradient-overlay-left"
            style={{ transform: 'scaleX(-1)' }}
          ></div>
        </div>
      </div>
    </Section>
  );
};

export default MarqueeTwoRows;