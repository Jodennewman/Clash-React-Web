import { Section } from "../../ui/section";

export default function Feature() {
  return (
    <Section className="fade-bottom relative pb-0 sm:pb-0 md:pb-0">
      <div className="relative">
        <div className="mx-auto flex max-w-container flex-col gap-8 sm:gap-24">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
            <h1 className="inline-block max-w-[840px] bg-linear-to-r from-foreground to-foreground bg-clip-text text-3xl font-semibold text-transparent drop-shadow-2xl sm:text-7xl sm:leading-tight dark:to-muted-foreground">
              Title
            </h1>
            <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
              Description
            </p>
          </div>
          <div className="w-full">{/* illustration */}</div>
        </div>
      </div>
    </Section>
  );
}
