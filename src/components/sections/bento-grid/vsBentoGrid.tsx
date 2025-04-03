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
import { Globe, Zap, Database, PieChart, VideoIcon, BarChart, Code, Smartphone, Layout, Activity, MessageSquare } from "lucide-react";

export default function VSBentoGrid() {
  return (
    <Section className="py-24 bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-[var(--primary-orange)]/5 dark:bg-white/5 border-[var(--primary-orange)]/30 mb-4 py-2 px-4">
            <span style={{ color: 'var(--primary-orange)' }} className="dark:text-white">Program Resources</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-navy)' }}>
            <span className="dark:text-white">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-navy)', opacity: 0.7 }}>
            <span className="dark:text-white/70">
              Vertical Shortcut gives you all the tools, resources, and support to succeed with short-form content.
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Top row with horizontal layout */}
          <Tile className="col-span-12 md:flex-row bg-white dark:bg-[var(--card-bg-navy)]">
            <TileLink />
            <TileContent className="grow basis-0 md:justify-end">
              <Zap className="size-8" style={{ color: 'var(--primary-orange)' }} />
              <TileTitle style={{ color: 'var(--text-navy)' }} className="dark:text-white">Weekly Growth Labs</TileTitle>
              <TileDescription>
                <p className="max-w-[320px] lg:max-w-[460px] dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
                  Live weekly sessions where we review your content and provide actionable feedback for immediate improvement.
                </p>
                <p className="dark:text-white/70" style={{ color: 'var(--text-navy)' }}>Our experts analyze your videos and give you specific steps to increase engagement and reach.</p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[240px] basis-0 sm:p-4 md:min-h-[320px] md:py-12 lg:min-h-[360px]">
              <Database className="w-24 h-24 text-[var(--secondary-teal)] dark:text-[var(--secondary-teal-light)]" />
            </TileVisual>
          </Tile>
          
          {/* Middle row - two columns */}
          <Tile className="col-span-12 md:col-span-6 lg:col-span-5 bg-white dark:bg-[var(--card-bg-navy)]">
            <TileLink />
            <TileVisual className="items-center sm:px-4 md:px-8">
              <MessageSquare className="w-24 h-24 text-[var(--primary-orange)] dark:text-[var(--primary-orange-light)]" />
            </TileVisual>
            <TileContent>
              <PieChart className="size-8" style={{ color: 'var(--secondary-teal)' }} />
              <TileTitle style={{ color: 'var(--text-navy)' }} className="dark:text-white">Platform Mastery</TileTitle>
              <TileDescription>
                <p className="dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
                  Deep dives into TikTok, Instagram, YouTube Shorts, and LinkedIn algorithms with platform-specific strategies.
                </p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          <Tile className="col-span-12 md:col-span-6 lg:col-span-7 bg-white dark:bg-[var(--card-bg-navy)]">
            <TileLink />
            <TileVisual className="-mx-32 pt-8">
              <Layout className="w-24 h-24 text-[var(--primary-orange)] dark:text-[var(--primary-orange-light)]" />
            </TileVisual>
            <TileContent>
              <Globe className="size-8" style={{ color: 'var(--primary-orange)' }} />
              <TileTitle style={{ color: 'var(--text-navy)' }} className="dark:text-white">Creator Network</TileTitle>
              <TileDescription>
                <p className="max-w-[460px] dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
                  Connect with 100+ top creators who've built 7+ figure businesses with short-form content.
                </p>
                <p className="dark:text-white/70" style={{ color: 'var(--text-navy)' }}>Learn directly from experts who are succeeding right now.</p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          {/* Third row - two columns */}
          <Tile className="col-span-12 md:col-span-6 lg:col-span-6 bg-white dark:bg-[var(--card-bg-navy)]">
            <TileVisual className="min-h-[240px] sm:p-4 md:min-h-[320px] lg:px-12">
              <Smartphone className="w-24 h-24 text-[var(--secondary-teal)] dark:text-[var(--secondary-teal-light)]" />
            </TileVisual>
            <TileContent>
              <VideoIcon className="size-8" style={{ color: 'var(--primary-orange-hover)' }} />
              <TileTitle style={{ color: 'var(--text-navy)' }} className="dark:text-white">Viral Case Studies</TileTitle>
              <TileDescription>
                <p className="dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
                  Detailed breakdowns of 45+ videos that reached millions of views across different niches and industries.
                </p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          <Tile className="col-span-12 md:col-span-6 lg:col-span-6 bg-white dark:bg-[var(--card-bg-navy)]">
            <TileLink />
            <TileVisual className="relative min-h-[240px]">
              <Activity className="w-24 h-24 text-[var(--accent-coral)] dark:text-[var(--accent-coral-dark)]" />
            </TileVisual>
            <TileContent>
              <BarChart className="size-8" style={{ color: 'var(--accent-coral)' }} />
              <TileTitle style={{ color: 'var(--text-navy)' }} className="dark:text-white">AI-Powered Tools</TileTitle>
              <TileDescription>
                <p className="max-w-[460px] dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
                  Exclusive access to our custom AI tools for content research, script generation, and trend prediction.
                </p>
              </TileDescription>
            </TileContent>
          </Tile>
          
          {/* Bottom row - full width */}
          <Tile className="col-span-12 md:flex-row bg-white dark:bg-[var(--card-bg-navy)]">
            <TileContent className="grow basis-0 md:justify-end">
              <Database className="size-8" style={{ color: 'var(--secondary-teal-light)' }} />
              <TileTitle style={{ color: 'var(--text-navy)' }} className="dark:text-white">Content Library</TileTitle>
              <TileDescription>
                <p className="max-w-[720px] dark:text-white/70" style={{ color: 'var(--text-navy)' }}>
                  Over 200+ video templates, swipe files, and script formats for every type of business and creator niche.
                </p>
              </TileDescription>
            </TileContent>
            <TileVisual className="min-h-[240px] basis-0 sm:p-4 md:min-h-[320px] md:py-12">
              <Code className="w-24 h-24 text-[var(--secondary-teal)] dark:text-[var(--secondary-teal-light)]" />
            </TileVisual>
          </Tile>
        </div>
      </div>
    </Section>
  );
}