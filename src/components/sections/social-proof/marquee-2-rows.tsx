import { Section } from "../../ui/section";
import SocialProofItem from "../../ui/social-proof-item";
import Marquee from "../../ui/marquee";

const socialProof = [
  {
    name: "James Torres",
    username: "jamescreates",
    text: (
      <>
        The <span className="text-[#FEA35D]">@VerticalShortcut</span> course has transformed my content. 3 weeks in and I'm seeing 500% more engagement than before.
      </>
    ),
    image: "/avatars/james.jpg",
    url: "#",
  },
  {
    name: "Sarah Chen",
    username: "sarahcontent",
    text: (
      <>
        Finally understanding why some videos blow up while others flop thanks to <span className="text-[#FEA35D]">@VerticalShortcut</span>. The algorithm section alone was worth the investment.
      </>
    ),
    image: "/avatars/sarah.jpg",
    url: "#",
  },
  {
    name: "Mike Johnson",
    username: "mikevideo",
    text: (
      <>
        As a business owner with no time, <span className="text-[#FEA35D]">@VerticalShortcut</span> gave me a system to batch create a month of content in just one afternoon. Game changer.
      </>
    ),
    image: "/avatars/mike.jpg",
    url: "#",
  },
  {
    name: "Olivia Zhang",
    username: "oliviazhang",
    text: (
      <>
        <span className="text-[#FEA35D]">@VerticalShortcut</span> is f*cking brilliant. My first video using their hook framework hit 2.3M views. I'm still in shock.
      </>
    ),
    image: "/avatars/olivia.jpg",
    url: "#",
  },
  {
    name: "David Parker",
    username: "davidp",
    text: (
      <>
        Signing up for <span className="text-[#FEA35D]">@VerticalShortcut</span> was the best business decision I've made this year. Landed 3 brand deals in my first month after implementing their strategy.
      </>
    ),
    image: "/avatars/david.jpg",
    url: "#",
  },
  {
    name: "Emma Rodriguez",
    username: "emmacreates",
    text: (
      <>
        No more guesswork. <span className="text-[#FEA35D]">@VerticalShortcut</span> gives you a clear framework that just works. My content is converting at 3x the rate it was before.
      </>
    ),
    image: "/avatars/emma.jpg",
    url: "#",
  },
  {
    name: "Alex Thompson",
    username: "alexthompson",
    text: (
      <>
        After 6 months of posting with no traction, two weeks of applying <span className="text-[#FEA35D]">@VerticalShortcut</span> methods and I've grown by 22K followers. Worth every penny.
      </>
    ),
    image: "/avatars/alex.jpg",
    url: "#",
  },
  {
    name: "Lisa Wang",
    username: "lisawangg",
    text: (
      <>
        My agency implemented <span className="text-[#FEA35D]">@VerticalShortcut</span> systems for our client work and we've doubled our pricing. Clients are amazed at the results.
      </>
    ),
    image: "/avatars/lisa.jpg",
    url: "#",
  },
  {
    name: "Jordan Miller",
    username: "jordancreates",
    text: (
      <>
        I was skeptical about another course, but <span className="text-[#FEA35D]">@VerticalShortcut</span> delivered beyond expectations. Their Cardinal Sins module changed how I approach content forever.
      </>
    ),
    image: "/avatars/jordan.jpg",
    url: "#",
  },
  {
    name: "Priya Patel",
    username: "priyapatelofficial",
    text: (
      <>
        From struggling creator to booking out my services 3 months in advance. That's what happened after I applied <span className="text-[#FEA35D]">@VerticalShortcut</span> strategies. Unreal results.
      </>
    ),
    image: "/avatars/priya.jpg",
    url: "#",
  },
];

// Create two rows for the marquee with different items for variety
const firstRow = socialProof.slice(0, 5);
const secondRow = socialProof.slice(5);

export default function SocialProof() {
  return (
    <Section className="w-full overflow-hidden bg-[#08141B] py-24 border-t border-[#154D59]/30 px-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[800px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Real People, Real Results. No Bullsh*t.
          </h2>
          <p className="text-md max-w-[700px] text-white/70 sm:text-xl">
            Our students aren't just getting views—they're building businesses, booking clients, and generating real revenue with short-form content.
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* First row scrolls left to right */}
          <Marquee pauseOnHover className="[--duration:40s] py-4">
            {firstRow.map((item) => (
              <SocialProofItem key={item.username} {...item} />
            ))}
          </Marquee>
          
          {/* Second row scrolls right to left (reversed) */}
          <Marquee reverse pauseOnHover className="[--duration:35s] py-4">
            {secondRow.map((item) => (
              <SocialProofItem key={item.username} {...item} />
            ))}
          </Marquee>
          
          {/* Edge gradients for a smoother appearance */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-[#08141B] to-transparent sm:block"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-[#08141B] to-transparent sm:block"></div>
        </div>
      </div>
    </Section>
  );
}