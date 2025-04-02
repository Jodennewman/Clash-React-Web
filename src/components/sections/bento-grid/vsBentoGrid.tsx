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
import { Badge } from "../../ui/badge";
import { Globe, Zap, Database, PieChart, VideoIcon, BarChart } from "lucide-react";

// Import illustrations
import PipelineIllustration from "../../illustrations/pipeline";
import MockupMobileIllustration from "../../illustrations/mockup-mobile";
import TilesIllustration from "../../illustrations/tiles";
import CodeEditorIllustration from "../../illustrations/code-editor";
import RadarSmallIllustration from "../../illustrations/radar-small";
import GlobeIllustration from "../../illustrations/globe";

export default function VSBentoGrid() {
  return (
    <Section className="py-24 bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-[var(--primary-orange)]/5 dark:bg-white/5 text-[var(--primary-orange)] border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
            Program Resources
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
            <span className="dark:bg-gradient-to-r dark:from-[var(--text-white)] dark:to-[var(--text-white)]/70 dark:bg-clip-text dark:text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-dark)', opacity: 0.7 }}>
            <span className="dark:text-[var(--text-white)]/70">
              Vertical Shortcut gives you all the tools, resources, and support to succeed with short-form content.
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Main row with horizontal layout */}
          <Tile className="col-span-12 md:flex-row">
            <TileLink />
            <TileContent className="grow basis-0 md:justify-end">
              <Zap className="size-8" style={{ color: 'var(--primary-orange)' }} />
              <TileTitle>Weekly Growth Labs</TileTitle>
              <TileDescription>
                <p className="max-w-[320px] lg:max-w-[460px]">
                  Live weekly sessions where we review your content and provide actionable feedback for immediate improvement.
                </p>
                <p>Our experts analyze your videos and give you specific steps to increase engagement and reach.</p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[240px] basis-0 sm:p-4 md:min-h-[320px] md:py-12 lg:min-h-[360px]">
              <PipelineIllustration />
            </TileVisual>
          </Tile>
          
          {/* Two column layout */}
          <Tile className="col-span-12 md:col-span-6 lg:col-span-5">
            <TileLink />
            <TileVisual className="items-center sm:px-4 md:px-8">
              <TilesIllustration />
            </TileVisual>
            <TileContent>
              <PieChart className="size-8" style={{ color: 'var(--secondary-teal)' }} />
              <TileTitle>Platform Mastery</TileTitle>
              <TileDescription>
                <p>
                  Deep dives into TikTok, Instagram, YouTube Shorts, and LinkedIn algorithms with platform-specific strategies.
                </p>
                <p>Optimize your content for each platform's unique requirements.</p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          <Tile className="col-span-12 md:col-span-6 lg:col-span-7">
            <TileLink />
            <TileVisual className="-mx-32 pt-8">
              <GlobeIllustration />
            </TileVisual>
            <TileContent>
              <Globe className="size-8" style={{ color: 'var(--primary-orange)' }} />
              <TileTitle>Creator Network</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Connect with 100+ top creators who've built 7+ figure businesses with short-form content.
                </p>
                <p>Learn directly from experts who are succeeding right now.</p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          {/* Two column layout */}
          <Tile className="col-span-12 md:col-span-6 lg:col-span-6">
            <TileVisual className="min-h-[240px] sm:p-4 md:min-h-[320px] lg:px-12">
              <MockupMobileIllustration />
            </TileVisual>
            <TileContent>
              <VideoIcon className="size-8" style={{ color: 'var(--primary-orange-hover)' }} />
              <TileTitle>Viral Case Studies</TileTitle>
              <TileDescription>
                Detailed breakdowns of 45+ videos that reached millions of views across different niches and industries.
              </TileDescription>
            </TileContent>
          </Tile>
          
          <Tile className="col-span-12 md:col-span-6 lg:col-span-6">
            <TileLink />
            <TileVisual className="relative min-h-[240px]">
              <RadarSmallIllustration className="absolute top-1/2 left-1/2 -mt-24 h-[512px] w-[512px] -translate-x-1/2 -translate-y-1/2" />
            </TileVisual>
            <TileContent>
              <BarChart className="size-8" style={{ color: 'var(--accent-coral)' }} />
              <TileTitle>AI-Powered Tools</TileTitle>
              <TileDescription>
                <p className="max-w-[460px]">
                  Exclusive access to our custom AI tools for content research, script generation, and trend prediction.
                </p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          {/* Final row */}
          <Tile className="col-span-12">
            <TileContent>
              <Database className="size-8" style={{ color: 'var(--secondary-teal-light)' }} />
              <TileTitle>Content Library</TileTitle>
              <TileDescription>
                <p className="max-w-[720px]">
                  Over 200+ video templates, swipe files, and script formats for every type of business and creator niche.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[160px]">
              <CodeEditorIllustration />
            </TileVisual>
          </Tile>
        </div>
      </div>
    </Section>
  );
}