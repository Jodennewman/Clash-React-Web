import React from "react";
import { Section } from "../../ui/section";
import { Badge } from "../../ui/badge";
import { Globe, Zap, Database, PieChart, VideoIcon, BarChart, Code, Smartphone, Layout, Activity, MessageSquare, Shield, ArrowUpRight } from "lucide-react";

export default function VSBentoGrid() {
  return (
    <Section className="bg-[var(--theme-bg-primary)] py-24 relative overflow-hidden dark:bg-[var(--theme-bg-primary)]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 dot-bg pointer-events-none dark:hidden" />
      <div className="absolute inset-0 opacity-0 opacity- grid-bg pointer-events-none" />
      
      {/* Floating elements - light mode only */}
      <div className="absolute top-40 right-10 w-32 h-32 rounded-[40%] rotate-12 opacity-5 
                    bg-[var(--theme-primary)] animate-pulse hidden md:block dark:hidden"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-[30%] -rotate-6 opacity-5
                    bg-[var(--theme-accent-secondary-light)] hidden md:block dark:hidden"></div>
      
      {/* Floating elements - dark mode only */}
      <div className="absolute top-40 right-10 w-32 h-32 rounded-[40%] rotate-12 opacity-10 
                    vs-float-orange animate-pulse hidden dark:block"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-[30%] -rotate-6 opacity-10
                    vs-float-teal hidden dark:block"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <Badge variant="section" size="xl" className="mb-4">
            Program Resources
          </Badge>
          <h2 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-4xl md:text-5xl font-bold mb-6">
            Everything You Need
          </h2>
          <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70 text-xl max-w-3xl mx-auto">
            Vertical Shortcut gives you all the tools, resources, and support to succeed with short-form content.
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* First row - 3 cards with col-span-4 each */}
          <div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.05)] shadow-theme- transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] group relative overflow-hidden bg-[var(--theme-bg-primary)] ">
            {/* Light mode floating element */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-[40%] rotate-12 opacity-5 
                         bg-[var(--theme-accent-secondary-light)] dark:hidden"></div>
            
            {/* Dark mode floating element */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-[40%] rotate-12 opacity-10 
                         vs-btn-secondary-gradient
                         hidden dark:block"></div>
            
            <div className="flex flex-col relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-accent-secondary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">
                  <Database className="w-10 h-10 text-theme-on-primary" />
                </div>
              </div>
              <Zap className="size-8 text-[var(--theme-primary)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">
                Weekly Growth Labs
              </h3>
              <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">
                Live weekly sessions where we review your content and provide actionable feedback for immediate improvement.
              </p>
            </div>
          </div>
          
          <div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.05)] shadow-theme- transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[-0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(254,163,93,0.2)] group relative overflow-hidden bg-theme-gradient dark:from-[var(--theme-card-bg-navy)] ">
            {/* Light mode floating element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-[30%] -rotate-6 opacity-5 
                         bg-[var(--theme-primary-light)] dark:hidden"></div>
            
            {/* Dark mode floating element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-[30%] -rotate-6 opacity-10 
                         vs-btn-primary-gradient
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-primary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">
                  <MessageSquare className="w-10 h-10 text-theme-on-primary" />
                </div>
              </div>
              <PieChart className="size-8 text-[var(--theme-accent-secondary)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">
                Platform Mastery
              </h3>
              <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">
                Deep dives into platform algorithms with strategies specifically tailored for each one.
              </p>
            </div>
          </div>
          
          <div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.05)] shadow-theme- transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(254,163,93,0.2)] group relative overflow-hidden bg-theme-gradient dark:from-[var(--theme-card-bg-navy)] ">
            {/* Light mode floating element */}
            <div className="absolute top-10 right-10 w-16 h-16 rounded-[35%] rotate-12 opacity-5 
                         bg-[var(--theme-primary-light)] dark:hidden"></div>
            
            {/* Dark mode floating element */}
            <div className="absolute top-10 right-10 w-16 h-16 rounded-[35%] rotate-12 opacity-10 
                         vs-btn-primary-gradient
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-primary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">
                  <Layout className="w-10 h-10 text-theme-on-primary" />
                </div>
              </div>
              <Globe className="size-8 text-[var(--theme-primary)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">
                Creator Network
              </h3>
              <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">
                Connect with 100+ top creators who've built 7+ figure businesses with short-form content.
              </p>
            </div>
          </div>
          
          {/* Second row - 2 cards with col-span-6 each */}
          <div className="col-span-6 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.05)] shadow-theme- transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[-0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] group relative overflow-hidden bg-theme-gradient dark:from-[var(--theme-card-bg-navy)] ">
            {/* Light mode floating elements */}
            <div className="absolute bottom-16 right-16 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                         bg-[var(--theme-accent-secondary-light)] dark:hidden"></div>
            <div className="absolute top-10 left-20 w-16 h-16 rounded-[30%] -rotate-6 opacity-5
                         bg-[var(--theme-accent-secondary)] dark:hidden"></div>
            
            {/* Dark mode floating elements */}
            <div className="absolute bottom-16 right-16 w-24 h-24 rounded-[40%] rotate-12 opacity-10 
                         vs-btn-secondary-gradient
                         hidden dark:block"></div>
            <div className="absolute top-10 left-20 w-16 h-16 rounded-[30%] -rotate-6 opacity-10
                         vs-btn-secondary-gradient
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-accent-secondary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">
                  <Smartphone className="w-10 h-10 text-theme-on-primary" />
                </div>
              </div>
              <VideoIcon className="size-8 text-[var(--theme-primary-hover)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">
                Viral Case Studies
              </h3>
              <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">
                Detailed breakdowns of 45+ videos that reached millions of views across different niches and industries.
              </p>
            </div>
          </div>
          
          <div className="col-span-6 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.05)] shadow-theme- transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(222,107,89,0.2)] group relative overflow-hidden bg-theme-gradient dark:from-[var(--theme-card-bg-navy)] ">
            {/* Light mode floating elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-[35%] rotate-12 opacity-5 
                         bg-[var(--theme-accent-tertiary)] dark:hidden"></div>
            <div className="absolute top-16 left-24 w-20 h-20 rounded-[30%] -rotate-6 opacity-5
                         bg-[var(--theme-accent-quaternary)] dark:hidden"></div>
            
            {/* Dark mode floating elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-[35%] rotate-12 opacity-10 
                         vs-gradient-coral-diagonal
                         hidden dark:block"></div>
            <div className="absolute top-16 left-24 w-20 h-20 rounded-[30%] -rotate-6 opacity-10
                         vs-btn-primary-gradient
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center vs-gradient-coral-diagonal dark:from-[var(--theme-accent-coral-dark)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">
                  <Activity className="w-10 h-10 text-theme-on-primary" />
                </div>
              </div>
              <Shield className="size-8 text-[var(--theme-accent-tertiary)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">
                AI-Powered Tools
              </h3>
              <p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">
                Exclusive access to our custom AI tools for content research, script generation, and trend prediction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}