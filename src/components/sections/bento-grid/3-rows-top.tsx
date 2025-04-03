import {
  Tile,
  TileVisual,
  TileTitle,
  TileDescription,
  TileContent,
  TileLink,
} from "../../ui/tile";
import React from "react";
import { Section } from "../../ui/section";

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
          <Tile className="col-span-12 md:col-span-6 lg:col-span-5">
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
          <Tile className="col-span-12 md:col-span-6 lg:col-span-7">
            <TileLink />
            <TileContent>
              <TileTitle>Made for fast development</TileTitle>
              <TileDescription>
                <p className="max-w-[520px]">
                  With lightweight code, modern tooling and best practice,
                  Launch UI is as fast in the browser as it is to build with.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[160px] grow items-center">
              <Database className="w-16 h-16" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-7">
            <TileLink />
            <TileContent>
              <TileTitle>The code is yours</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  With Launch UI, the code is yours forever. Never bother about
                  subscriptions and lock-ins.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[240px] grow items-center p-4 lg:p-12">
              <Code className="w-16 h-16" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-5">
            <TileLink />
            <TileContent>
              <TileTitle>Top-level performance</TileTitle>
              <TileDescription>
                Made for static sites while avoiding heavy assets, your website
                will feel snappy and load instantly.
              </TileDescription>
            </TileContent>
            <TileVisual className="-mb-[96px] sm:-mb-[186px] md:-mx-32">
              <Globe className="w-12 h-12" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-5">
            <TileLink />
            <TileContent>
              <TileTitle>Data-agnostic</TileTitle>
              <TileDescription>
                <p>
                  All the data is separate from components so you can edit it in
                  seconds or make it dynamic.
                </p>
                <p>Easily connect to a CMS of your choice.</p>
              </TileDescription>
            </TileContent>
            <TileVisual className="sm:p-4 md:p-8">
              <MessageSquare className="w-16 h-16" />
            </TileVisual>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 lg:col-span-7">
            <TileLink />
            <TileContent>
              <TileTitle>Fits right into your stack</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Integrate your landing page directly in the product and forget
                  about multiple codebases and unnecessary APIs.
                </p>
                <p>No extra dependencies, no extra maintenance.</p>
              </TileDescription>
            </TileContent>
            <TileVisual className="mt-12 -mb-48">
              <Activity className="w-16 h-16" />
            </TileVisual>
          </Tile>
        </div>
      </div>
    </Section>
  );
}
