import {
  Tile,
  TileVisual,
  TileTitle,
  TileDescription,
  TileContent,
  TileLink,
} from "../../ui/tile";
import { Section } from "../../ui/section";
import RippleIllustration from "../../illustrations/ripple";
import ChatIllustration from "../../illustrations/chat";
import { MousePointerClick, Shield, TextCursor, Wrench } from "lucide-react";
import MockupBrowserIllustration from "../../illustrations/mockup-browser";
import MockupResponsiveBottomIllustration from "../../illustrations/mockup-responsive-bottom";
import RadarSmallIllustration from "../../illustrations/radar-small";
import React from "react";

export default function BentoGrid() {
  return (
    <Section>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
          Build a website that is hard to forget.
        </h2>
        <p className="text-md text-muted-foreground max-w-[720px] text-center font-medium text-balance sm:text-xl">
          Build a top-notch landing page even if you don&apos;t have the time
          for it. Create an irresistible offer that speaks professionalism and
          hi-end design.
        </p>
        <div className="grid grid-cols-12 gap-4">
          <Tile className="col-span-12 md:flex-row">
            <TileLink />
            <TileContent className="grow basis-0 md:justify-end">
              <Wrench className="text-muted-foreground size-8 stroke-1" />
              <TileTitle>The code is yours</TileTitle>
              <TileDescription>
                <p className="max-w-[320px] lg:max-w-[460px]">
                  With Launch UI, the code is yours forever. You can use it as a
                  starting point for your own projects and customize it to your
                  needs.
                </p>
                <p> Never bother about subscriptions and lock-ins.</p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[240px] basis-0 sm:p-4 md:min-h-[320px] md:py-12 lg:min-h-[360px]">
              <MockupBrowserIllustration />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-5">
            <TileLink />
            <TileVisual className="items-center sm:px-4 md:px-8">
              <ChatIllustration />
            </TileVisual>
            <TileContent>
              <TextCursor className="text-muted-foreground size-8 stroke-1" />
              <TileTitle>Data-agnostic</TileTitle>
              <TileDescription>
                <p>
                  All the data is separate from components so you can edit it in
                  seconds or make it dynamic.
                </p>
                <p>Easily connect to a CMS of your choice.</p>
              </TileDescription>
            </TileContent>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-7">
            <TileLink />
            <TileVisual className="-mx-32 pt-8">
              <RippleIllustration />
            </TileVisual>
            <TileContent>
              <MousePointerClick className="text-muted-foreground size-8 stroke-1" />
              <TileTitle>Integrate website and product</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Integrate your landing page directly in the product and forget
                  about multiple codebases and unnecessary APIs.
                </p>
                <p>No extra dependencies, no extra maintenance.</p>
              </TileDescription>
            </TileContent>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-6">
            <TileVisual className="min-h-[240px] sm:p-4 md:min-h-[320px] lg:px-12">
              <MockupResponsiveBottomIllustration />
            </TileVisual>
            <TileContent>
              <Wrench className="text-muted-foreground size-8 stroke-1" />
              <TileTitle>Top-level performance</TileTitle>
              <TileDescription>
                Made for static sites while avoiding heavy assets, your website
                will feel snappy and load instantly.
              </TileDescription>
            </TileContent>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-6">
            <TileLink />
            <TileVisual className="relative min-h-[240px]">
              <RadarSmallIllustration className="absolute top-1/2 left-1/2 -mt-24 h-[512px] w-[512px] -translate-x-1/2 -translate-y-1/2" />
            </TileVisual>
            <TileContent>
              <Shield className="text-muted-foreground size-8 stroke-1" />
              <TileTitle>Made for search engines</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Unlike the bloated no-code solutions, Launch UI is built to be
                  perfectly optimized for search engines.
                </p>
              </TileDescription>
            </TileContent>
          </Tile>
        </div>
      </div>
    </Section>
  );
}
