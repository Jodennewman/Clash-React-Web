import { Section } from "../../ui/section";
import { TrendingUp } from "lucide-react";

export default function Feature() {
  return (
    <Section className="fade-bottom relative mb-12 w-full overflow-hidden pb-0 sm:mb-24 sm:pb-0 md:mb-32 md:pb-0">
      <div className="relative">
        <div className="mx-auto flex max-w-container flex-col gap-8 sm:gap-24">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-12">
            <h1 className="relative z-10 inline-block max-w-[920px] text-balance bg-linear-to-r from-foreground to-foreground bg-clip-text text-3xl font-semibold text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight dark:to-muted-foreground">
              You can change anything. But you don&apos;t have to.
            </h1>
            <p className="text-md relative z-10 max-w-[620px] text-balance font-medium text-muted-foreground sm:text-xl">
              Get the full control of the code of your website. Change it or
              just use the defaults. Customize it in seconds with CSS variables.
            </p>
          </div>
          <div className="w-full">
            <TrendingUp className="w-36 h-36" />
          </div>
        </div>
      </div>
    </Section>
  );
}
