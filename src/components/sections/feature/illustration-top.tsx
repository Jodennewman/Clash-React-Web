import { Section } from "../../ui/section";
import { BarChart3 } from "lucide-react";

export default function Feature() {
  return (
    <Section className="relative w-full overflow-hidden">
      <div className="relative">
        <div className="mx-auto flex max-w-container flex-col gap-8 sm:gap-24">
          <div className="overflow-visable w-full">
            <BarChart3 className="w-36 h-36" />
          </div>
          <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
            <h1 className="inline-block max-w-[920px] text-balance bg-linear-to-r from-foreground to-foreground bg-clip-text text-3xl font-semibold text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight ">
              You can change anything. But you don&apos;t have to.
            </h1>
            <p className="text-md max-w-[620px] text-balance font-medium text-muted-foreground sm:text-xl">
              Get the full control of the code of your website. Change it or
              just use the defaults. Customize it in seconds with CSS variables.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
