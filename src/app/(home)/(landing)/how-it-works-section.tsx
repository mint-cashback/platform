"use client";

import React from "react";

import { MailIcon, ShoppingCartIcon, DollarSignIcon } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";

import { useIsMobile } from "@/lib/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const steps = [
  {
    title: "Join for free",
    description: "Add Mint to your browser and sign up with your email. One click and you're ready.",
    icon: MailIcon,
  },
  {
    title: "Start earning cash back",
    description: "Shop as usual. Mint pops up with cashback offers you can activate instantly.",
    icon: ShoppingCartIcon,
  },
  {
    title: "Redeem your cash back",
    description: "Cash out your rewards anytime—PayPal, Venmo, or gift card.",
    icon: DollarSignIcon,
  },
];

function AnimatedCardWrapper({ children, index, isMobile }: {
  children: React.ReactNode;
  index: number;
  isMobile: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  if (!isMobile) {
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const start = index * 0.2;
    const end = 0.6;
    const y = useTransform(scrollYProgress, [start, end], [40, 0]);
    const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0, 0.7, 1]);
    return (
      <motion.div ref={ref} style={{ y, opacity }} className="flex-1 flex min-w-[260px] items-stretch">
        {children}
      </motion.div>
    );
  } else {
    return (
      <BlurFade inView={true} direction="up" delay={index * 0.1} blur="8px">
        {children}
      </BlurFade>
    );
  }
}

function HowItWorksCard({ title, description, icon: Icon, index }: {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}) {
  return (
    <div className="w-full max-w-lg p-6 bg-muted/75 dark:bg-muted border border-foreground/20 rounded-2xl shadow-sm flex flex-col items-center">
      <div className="flex flex-col items-center pb-2">
        <div
          className="rounded-full bg-background/25 p-5 mb-3 flex items-center justify-center border-2 border-primary"
        >
          <Icon size={40} className="text-primary" />
        </div>

        <span className="text-xl text-center mb-1">
          {index + 1}. {title}
        </span>
      </div>

      <div className="flex flex-col items-center pb-2">
        <TextAnimate
          className="text-center text-base text-muted-foreground mb-2"
          by="word"
          animation="fadeIn"
          once={true}
        >
          {description}
        </TextAnimate>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const isMobile = useIsMobile();
  return (
    <section className="w-full py-20 px-6 flex flex-col items-center">
      <TextAnimate
        className="text-4xl sm:text-5xl font-bold text-center mb-4"
        by="word"
        animation="blurInUp"
        once={true}
      >
        Here's How Mint Works
      </TextAnimate>
      <TextAnimate
        className="text-lg sm:text-xl text-muted-foreground text-center mb-12 max-w-2xl"
        by="word"
        animation="slideUp"
        once={true}
      >
        Get started in just three simple steps and start earning cashback today
      </TextAnimate>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl items-center sm:items-stretch justify-center">
        {steps.map((step, i) => (
          <AnimatedCardWrapper key={step.title} index={i} isMobile={isMobile}>
            <HowItWorksCard
              title={step.title}
              description={step.description}
              icon={step.icon}
              index={i}
            />
          </AnimatedCardWrapper>
        ))}
      </div>
    </section>
  );
} 