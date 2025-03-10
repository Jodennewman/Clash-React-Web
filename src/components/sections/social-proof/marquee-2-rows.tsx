import { Section } from "../../ui/section";
import SocialProofItem from "../../ui/social-proof-item";
import Marquee from "../../ui/marquee";

const socialProof = [
  {
    name: "Fabrizio Fernandez",
    username: "fab3304",
    text: (
      <>
        Playing around with <span className="text-brand">@launchui</span>{" "}
        suddenly made me feeling inspired to launch that side project.
      </>
    ),
    image: "/avatars/fabrizio.jpg",
    url: "https://twitter.com/mikolajdobrucki",
  },
  {
    name: "Darius Flynn",
    username: "flynnn",
    text: (
      <>
        Exploring <span className="text-brand">@launchui</span>
        &apos;s sleek UI. It&apos;s like a dark mode enthusiast&apos;s
        playground.
      </>
    ),
    image: "/avatars/darius.jpg",
    url: "https://twitter.com/mikolajdobrucki",
  },
  {
    name: "Felix B.",
    username: "felixbs",
    text: (
      <>
        Digging into <span className="text-brand">@launchui</span>. Those
        shadows are giving me serious design envy.
      </>
    ),
    image: "/avatars/felix.jpg",
    url: "https://twitter.com/mikolajdobrucki",
  },
  {
    name: "Olivia Blackwood",
    username: "olivia1992",
    text: (
      <>
        <span className="text-brand">@launchui</span> is not messing around with
        its component library game.
      </>
    ),
    image: "/avatars/olivia.jpg",
    url: "https://twitter.com/mikolajdobrucki",
  },
  {
    name: "Esme Rothschild",
    username: "EmeRothArt",
    text: (
      <>
        <span className="text-brand">@launchui</span> is slick. That globe
        graphic though. Making me feel like I&apos;m building websites for a
        sci-fi movie.
      </>
    ),
    image: "/avatars/esme.jpg",
    url: "https://twitter.com/mikolajdobrucki",
  },
  {
    name: "Kai Nakamura",
    username: "KaiNakWaves",
    text: (
      <>
        Just made my first website with{" "}
        <span className="text-brand">@launchui</span>. Its flexibility is
        speaking my language. No drama, just seamless integration.
      </>
    ),
    image: "/avatars/kai.jpg",
    url: "https://twitter.com/mikolajdobrucki",
  },
];

const firstRow = socialProof.slice(0, socialProof.length / 2);
const secondRow = socialProof.slice(socialProof.length / 2);

export default function SocialProof() {
  return (
    <Section className="w-full overflow-hidden px-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            Loved by designers and developers across the planet
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            These are some dummy testimonials from made-up names displayed to
            preview the social proof components in action.
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((item) => (
              <SocialProofItem key={item.username} {...item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((item) => (
              <SocialProofItem key={item.username} {...item} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-linear-to-r from-background sm:block"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-background sm:block"></div>
        </div>
      </div>
    </Section>
  );
}
