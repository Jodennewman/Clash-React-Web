"use client";

import { cn } from "../../lib/utils";
import { CircleCheckBig, User, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Section } from "../ui/section";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Link } from "../ui/link";
import { courseStats, tracks } from "../../lib/course-utils";
import { pricingTiers } from "../../data/pricing";

type Plan = {
  name: string;
  description: string;
  icon?: React.ReactNode;
  monthlyPrice: number;
  yearlyPrice: number;
  cta: {
    variant: "outline" | "default" | "glow";
    label: string;
    href: string;
  };
  features: string[];
  featured: boolean;
  classes?: string;
};

// Transform pricing tiers from course-utils into the format needed for this component
const plans: Plan[] = [
  {
    name: pricingTiers[0].name,
    description: pricingTiers[0].description,
    icon: <User className="size-4" />,
    monthlyPrice: pricingTiers[0].basePrice / 100, // Convert to smaller display value
    yearlyPrice: Math.round(pricingTiers[0].basePrice * 0.8) / 100, // 20% discount
    cta: {
      variant: "outline" as const,
      label: pricingTiers[0].ctaText,
      href: "#",
    },
    features: pricingTiers[0].features,
    featured: pricingTiers[0].popular,
    classes: "glass-1 to-transparent dark:glass-2",
  },
  {
    name: pricingTiers[1].name,
    description: pricingTiers[1].description,
    icon: <User className="size-4" />,
    monthlyPrice: pricingTiers[1].basePrice / 100,
    yearlyPrice: Math.round(pricingTiers[1].basePrice * 0.8) / 100, // 20% discount
    cta: {
      variant: "default" as const,
      label: pricingTiers[1].ctaText,
      href: "#",
    },
    features: pricingTiers[1].features,
    featured: pricingTiers[1].popular,
    classes:
      "glass-3 from-card/100 to-card/100 dark:glass-4 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
  },
  {
    name: pricingTiers[2].name,
    description: pricingTiers[2].description,
    icon: <Users className="size-4" />,
    monthlyPrice: pricingTiers[2].basePrice / 100,
    yearlyPrice: Math.round(pricingTiers[2].basePrice * 0.8) / 100, // 20% discount
    cta: {
      variant: "glow" as const,
      label: pricingTiers[2].ctaText,
      href: "#",
    },
    features: pricingTiers[2].features,
    featured: pricingTiers[2].popular,
    classes:
      "glass-2 to-trasparent dark:glass-3 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] dark:after:bg-foreground/30 after:blur-[72px]",
  },
];

export function Pricing3ColsSubscription() {
  const [isYearly, setIsYearly] = useState(true);
  const yearlyDiscount = 20; // 20% discount for yearly plans

  return (
    <Section>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
          <h2 className="max-w-[720px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            Pricing
          </h2>
          <p className="text-md text-muted-foreground max-w-[760px] font-medium sm:text-xl">
            Get access to {courseStats?.totalModules || 0} modules across {tracks?.length || 0} tracks with 
            over {courseStats?.totalHours || 0} hours of content and bonus resources.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm">Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-brand"
            />
            <span className="text-sm">
              Yearly
              <span className="bg-brand/10 text-brand ml-1.5 rounded-full px-2 py-0.5 text-xs">
                Save {yearlyDiscount}%
              </span>
            </span>
          </div>
        </div>

        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "max-w-container relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] bg-gradient-to-br from-white to-[var(--theme-bg-primary)]/80 dark:bg-gradient-to-br dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)] border border-[var(--theme-bg-secondary)]/10 dark:border-white/10 hover-bubbly",
                plan.classes,
              )}
            >
              {/* Add floating elements for visual interest */}
              <div className="absolute -z-10 bottom-8 right-8 w-16 h-16 rounded-[40%] rotate-12 opacity-5
                           bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>
              <div className="absolute -z-10 bottom-8 right-8 w-16 h-16 rounded-[40%] rotate-12 opacity-10
                           vs-btn-primary-gradient
                           animate-float-slow hidden dark:block"></div>
              
              <hr
                className={cn(
                  "via-foreground/60 absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent to-transparent",
                  plan.featured && "via-[var(--theme-primary)] dark:via-[var(--theme-primary-light)]",
                )}
              />
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <h2 className="flex items-center gap-2 font-bold text-[var(--theme-text-primary)] dark:text-white">
                    {plan.icon && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full
                                  vs-btn-primary-gradient 
                                  dark:bg-gradient-to-br dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)]
                                  shadow-sm dark:shadow-[0_0_5px_rgba(53,115,128,0.2)]">
                        {plan.icon}
                      </div>
                    )}
                    {plan.name}
                  </h2>
                  <p className="text-[var(--theme-text-primary)]/70 dark:text-white/70 max-w-[220px] text-sm">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:flex-col lg:items-start xl:flex-row xl:items-center relative">
                  {/* Add subtle pattern behind price */}
                  <div className="absolute inset-0 -z-10 opacity-5 dot-bg dark:opacity-10"></div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-[var(--theme-text-primary)]/70 dark:text-white/70 text-2xl font-bold">
                      $
                    </span>
                    <span className="text-6xl font-bold text-[var(--theme-primary)] ">
                      {isYearly
                        ? Math.round(plan.yearlyPrice / 12)
                        : plan.monthlyPrice}
                    </span>
                  </div>
                  <div className="flex min-h-[40px] flex-col">
                    <span className="text-sm text-[var(--theme-text-primary)] dark:text-white">
                      {plan.monthlyPrice > 0 ? "/ month" : "free"}
                    </span>
                    <span className="text-[var(--theme-text-primary)]/70 dark:text-white/70 text-sm">
                      {plan.monthlyPrice > 0
                        ? isYearly
                          ? "billed yearly"
                          : "billed monthly"
                        : "for everyone"}
                    </span>
                  </div>
                </div>
                <Button variant={plan.cta.variant} size="lg" asChild className="vs-btn-primary-gradient text-white">
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
                <hr className="border-[var(--theme-bg-secondary)]/10 dark:border-white/10" />
              </div>
              <div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm group hover:bg-white/5 dark:hover:bg-white/5 rounded-md p-1 transition-colors"
                    >
                      <CircleCheckBig className="text-[var(--theme-primary)]  size-4 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-[var(--theme-text-primary)]/80 dark:text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
