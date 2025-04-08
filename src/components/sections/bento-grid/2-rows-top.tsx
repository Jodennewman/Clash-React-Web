import React from "react";
import {
  Tile,
  TileVisual,
  TileTitle,
  TileDescription,
  TileContent,
  TileLink,
} from "../../ui/tile";
import { Section } from "../../ui/section";
import { Globe, Zap, Database, PieChart, VideoIcon } from "lucide-react";

export default function BentoGrid() {
  return (
    <Section>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-12">
        <h2 className="text-balance text-center text-3xl font-semibold sm:text-5xl">
          Build a website that is hard to forget.
        </h2>
        <p className="text-md max-w-[720px] text-balance text-center font-medium text-muted-foreground sm:text-xl">
          Build a top-notch landing page even if you don&apos;t have the time
          for it. Create an irresistible offer that speaks professionalism and
          hi-end design.
        </p>
        <div className="grid grid-cols-12 gap-4">
          <Tile className="col-span-12 md:col-span-5">
            <TileLink />
            <TileContent>
              <TileTitle>Made for search engines</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Unlike the bloated no-code solutions, Launch UI is built to be
                  perfectly optimized for search engines.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[160px] grow items-center">
              <Database className="w-16 h-16" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-7">
            <TileLink />
            <TileContent>
              <TileTitle>The code is yours</TileTitle>
              <TileDescription>
                <p className="max-w-[320px] lg:max-w-[460px]">
                  With Launch UI, the code is yours forever. You can use it as a
                  starting point for your own projects and customize it to your
                  needs.
                </p>
                <p>Never bother about subscriptions and lock-ins.</p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[240px] sm:p-4 md:min-h-[360px] md:py-12 lg:px-12">
              <Code className="w-16 h-16" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-4">
            <TileLink />
            <TileContent>
              <TileTitle>Mobile-first</TileTitle>
              <TileDescription>
                <p>
                  Optimized to look and feel great on all devices, operating
                  systems, and screen sizes.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[300px] py-12">
              <Smartphone className="w-16 h-16" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-4">
            <TileLink />
            <TileContent>
              <TileTitle>Top-level performance</TileTitle>
              <TileDescription>
                Lightweight and optimized, your website will will feel snappy
                and load instantly.
              </TileDescription>
            </TileContent>
            <TileVisual className="-mb-20 -mt-12 [&_svg]:h-[420px] [&_svg]:w-[420px]">
              <Globe className="w-12 h-12" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-4">
            <TileContent>
              <TileTitle>Fits right into your stack</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Integrate your landing page directly in the product while
                  using your favorite tools.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="-ml-40 -mr-32">
              <Layout className="w-16 h-16" />
            </TileVisual>
          </Tile>
        </div>
      </div>
    </Section>
  );
}
