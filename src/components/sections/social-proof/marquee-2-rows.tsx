import { Section } from "../../ui/section";
import Marquee from "../../ui/marquee";

// Create a ThumbnailItem component for the marquee
const ThumbnailItem = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="-mx-8 -my-5 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl" style={{ transform: "scale(0.75)" }}>
      <img 
        src={src} 
        alt={alt} 
        width={320} 
        height={180}
        className="object-cover"
      />
    </div>
  );
};

// Thumbnail paths from your webp folder
const thumbnails = [
  { src: "/assets/main/thumbnails-with-views-webp/JW-Hiring-Sea.webp", alt: "JW Hiring Sea" },
  { src: "/assets/main/thumbnails-with-views-webp/JW-Socialtip-rorysutherland.webp", alt: "JW Social Tip Rory Sutherland" },
  { src: "/assets/main/thumbnails-with-views-webp/JW-jellycat.webp", alt: "JW Jellycat" },
  { src: "/assets/main/thumbnails-with-views-webp/JS-David D.webp", alt: "JS David D" },
  { src: "/assets/main/thumbnails-with-views-webp/JS-sidemenenightclub.webp", alt: "JS Sidemen Nightclub" },
  { src: "/assets/main/thumbnails-with-views-webp/JW-BrewBeers-1.webp", alt: "JW Brew Beers" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-insanecults.webp", alt: "JC Insane Cults" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-taylorswift.webp", alt: "JC Taylor Swift" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-evilcriminals.webp", alt: "JC Evil Criminals" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-deadlyfilmaccidents.webp", alt: "JC Deadly Film Accidents" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-conspiracies.webp", alt: "JC Conspiracies" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-Slime.webp", alt: "JC Slime" },
  { src: "/assets/main/thumbnails-with-views-webp/JC-Stupid-Deaths.webp", alt: "JC Stupid Deaths" },
  { src: "/assets/main/thumbnails-with-views-webp/CM-brat-summer.webp", alt: "CM Brat Summer" },
  { src: "/assets/main/thumbnails-with-views-webp/CM-chappelle.webp", alt: "CM Chappelle" },
  { src: "/assets/main/thumbnails-with-views-webp/CM-FYOU.webp", alt: "CM F You" },
  { src: "/assets/main/thumbnails-with-views-webp/CM-Jlo.webp", alt: "CM JLo" },
  { src: "/assets/main/thumbnails-with-views-webp/CM-Marketing.webp", alt: "CM Marketing" },
  { src: "/assets/main/thumbnails-with-views-webp/CD-TOXIC#55.webp", alt: "CD Toxic #55" },
  { src: "/assets/main/thumbnails-with-views-webp/CM -Successful women.webp", alt: "CM Successful Women" },
  { src: "/assets/main/thumbnails-with-views-webp/CM-Agency Predictions.webp", alt: "CM Agency Predictions" },
  { src: "/assets/main/thumbnails-with-views-webp/Baskins worse boss.webp", alt: "Baskins Worse Boss" },
  { src: "/assets/main/thumbnails-with-views-webp/CD COFFEE.webp", alt: "CD Coffee" },
  { src: "/assets/main/thumbnails-with-views-webp/CD-REGRET.webp", alt: "CD Regret" },
  { src: "/assets/main/thumbnails-with-views-webp/BA-something.webp", alt: "BA Something" },
  { src: "/assets/main/thumbnails-with-views-webp/BA.BOOMERSVGENZ.webp", alt: "BA Boomers vs Gen Z" },
];

// Split thumbnails into two roughly equal groups for the two rows
const firstRowThumbnails = thumbnails.slice(0, 13);
const secondRowThumbnails = thumbnails.slice(13);

export default function SocialProof() {
  return (
    <Section className="w-full overflow-hidden bg-[#08141B] py-24 border-t border-[#154D59]/30 px-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[800px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Our Videos Get Millions of Views
          </h2>
          <p className="text-md max-w-[700px] text-theme-on-primary/70 sm:text-xl">
            We've created content that's reached over 800M views across platforms. Here's a small sample of our work.
          </p>
        </div>
        
        {/* Full-width mask with vignette */}
        <div className="w-full max-w-full relative">
          {/* First row scrolls left to right */}
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover className="[--duration:60s] py-0 mb-[-36px]">
              {firstRowThumbnails.map((item, index) => (
                <ThumbnailItem key={`first-${index}`} src={item.src} alt={item.alt} />
              ))}
            </Marquee>
          </div>
          
          {/* Second row scrolls right to left (reversed) */}
          <div className="relative overflow-hidden">
            <Marquee reverse pauseOnHover className="[--duration:70s] py-0 mt-[-36px]">
              {secondRowThumbnails.map((item, index) => (
                <ThumbnailItem key={`second-${index}`} src={item.src} alt={item.alt} />
              ))}
            </Marquee>
          </div>
          
          {/* Deep side vignettes that fade out thumbnails completely */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[35%] z-10" 
               style={{ background: 'linear-gradient(to right, #08141B 0%, #08141B 15%, rgba(8, 20, 27, 0.95) 30%, rgba(8, 20, 27, 0.8) 50%, rgba(8, 20, 27, 0.4) 70%, rgba(8, 20, 27, 0) 100%)' }}></div>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[35%] z-10" 
               style={{ background: 'linear-gradient(to left, #08141B 0%, #08141B 15%, rgba(8, 20, 27, 0.95) 30%, rgba(8, 20, 27, 0.8) 50%, rgba(8, 20, 27, 0.4) 70%, rgba(8, 20, 27, 0) 100%)' }}></div>
        </div>
      </div>
    </Section>
  );
}