"use client";

import { cn } from "../../lib/utils";
import { CircleCheckBig, User, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Section } from "../ui/section";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Link } from "../ui/link";

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

const plans: Plan[] = [
  {
    name: "Free",
    description: "For everyone starting out on a website for their big idea",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: {
      variant: "outline",
      label: "Get started for free",
      href: "/docs/getting-started/introduction",
    },
    features: [
      "9 landing page sections",
      "36 components",
      "5 custom animations",
    ],
    featured: false,
    classes: "glass-1 to-transparent dark:glass-2 hidden lg:flex",
  },
  {
    name: "Starter",
    description: "Perfect for small teams and growing businesses",
    icon: <User className="size-4" />,
    monthlyPrice: 15,
    yearlyPrice: 144,
    cta: {
      variant: "default",
      label: "Get started",
      href: "#",
    },
    features: [
      "Up to 5 team members",
      "20GB storage",
      "Basic analytics",
      "24/7 email support",
      "API access",
    ],
    featured: true,
    classes:
      "glass-3 from-card/100 to-card/100 dark:glass-4 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
  },
  {
    name: "Enterprise",
    description: "For larger teams with advanced needs",
    icon: <Users className="size-4" />,
    monthlyPrice: 75,
    yearlyPrice: 720,
    cta: {
      variant: "glow",
      label: "Contact sales",
      href: "#",
    },
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Advanced analytics",
      "24/7 priority support",
      "Custom integrations",
      "SSO authentication",
      "Dedicated account manager",
    ],
    featured: false,
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
            This is just a preview of a component variant for subscription
            products. Launch UI Pro version is available as one-time purchase
            with lifetime access.
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
                "max-w-container relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 shadow-xl",
                plan.classes,
              )}
            >
              <hr
                className={cn(
                  "via-foreground/60 absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent to-transparent",
                  plan.featured && "via-brand",
                )}
              />
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <h2 className="flex items-center gap-2 font-bold">
                    {plan.icon && (
                      <div className="text-muted-foreground flex items-center gap-2">
                        {plan.icon}
                      </div>
                    )}
                    {plan.name}
                  </h2>
                  <p className="text-muted-foreground max-w-[220px] text-sm">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:flex-col lg:items-start xl:flex-row xl:items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-muted-foreground text-2xl font-bold">
                      $
                    </span>
                    <span className="text-6xl font-bold">
                      {isYearly
                        ? Math.round(plan.yearlyPrice / 12)
                        : plan.monthlyPrice}
                    </span>
                  </div>
                  <div className="flex min-h-[40px] flex-col">
                    <span className="text-sm">
                      {plan.monthlyPrice > 0 ? "/ month" : "free"}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {plan.monthlyPrice > 0
                        ? isYearly
                          ? "billed yearly"
                          : "billed monthly"
                        : "for everyone"}
                    </span>
                  </div>
                </div>
                <Button variant={plan.cta.variant} size="lg" asChild>
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
                <hr className="border-input" />
              </div>
              <div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CircleCheckBig className="text-muted-foreground size-4 shrink-0" />
                      {feature}
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
