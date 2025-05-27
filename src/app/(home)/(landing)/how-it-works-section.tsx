"use client";

import { Mail, ShoppingCart, DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useScroll, useTransform } from "framer-motion";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Join for free ✉️",
    description: "Add Mint to your browser and sign up with your email. One click and you're ready.",
    icon: Mail,
    cta: "Download Mint",
  },
  {
    title: "Start earning cash back 🛒",
    description: "Shop as usual. Mint pops up with cashback offers you can activate instantly.",
    icon: ShoppingCart,
    cta: "Activate",
  },
  {
    title: "Redeem your cash back 💸",
    description: "Cash out your rewards anytime—PayPal, Venmo, or gift card.",
    icon: DollarSign,
    cta: "Withdraw",
  },
];

function HowItWorksCard({ title, description, icon: Icon, cta, index, isMobile }: {
  title: string;
  description: string;
  icon: React.ElementType;
  cta: string;
  index: number;
  isMobile: boolean;
}) {
  // Determine the correct href for the CTA
  let href = "/auth";
  if (cta === "Download Mint") href = "/download";

  // Parallax/scroll-linked effect for desktop
  if (!isMobile) {
    // Use framer-motion's useScroll and useTransform
    const ref = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // Staggered scroll ranges for each card
    const start = index * 0.2; // 0, 0.2, 0.4
    const end = 0.6;
    // y: from 40px to 0, opacity: from 0 to 1, all cards unify at end
    const y = useTransform(scrollYProgress, [start, end], [40, 0]);
    const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0, 0.7, 1]);
    return (
      <motion.div
        ref={ref}
        style={{ y, opacity }}
        className="flex-1 flex min-w-[260px] items-stretch"
      >
        <Card className="w-full max-w-lg min-h-[420px] p-6 bg-background dark:bg-muted border border-foreground/20 rounded-2xl shadow-sm flex flex-col items-center justify-start">
          <CardHeader className="flex flex-col items-center pb-2">
            <div
              className="rounded-full bg-primary/10 p-5 mb-3 flex items-center justify-center border-2 border-primary group-hover:scale-105 transition-transform"
            >
              <Icon size={40} className="text-primary" />
            </div>
            <CardTitle className="text-xl text-center mb-1">
              {index + 1}. {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pb-2">
            <TextAnimate
              className="text-center text-base text-muted-foreground mb-2"
              by="word"
              animation="fadeIn"
              once={true}
            >
              {description}
            </TextAnimate>
          </CardContent>
          <CardFooter className="flex flex-col items-center mt-2">
            <Link href={href} passHref legacyBehavior>
              <Button className="w-full max-w-[180px] text-base mt-2">
                {cta}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }
  // Mobile: scale/blur fade in
  return (
    <BlurFade inView={true} direction="up" delay={index * 0.1} blur="8px">
      <Card className="w-full max-w-lg min-h-[420px] p-6 bg-background dark:bg-muted border border-foreground/20 rounded-2xl shadow-sm flex flex-col items-center justify-start">
        <CardHeader className="flex flex-col items-center pb-2">
          <div
            className="rounded-full bg-primary/10 p-5 mb-3 flex items-center justify-center border-2 border-primary group-hover:scale-105 transition-transform"
          >
            <Icon size={40} className="text-primary" />
          </div>
          <CardTitle className="text-xl text-center mb-1">
            {index + 1}. {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-2">
          <TextAnimate
            className="text-center text-base text-muted-foreground mb-2"
            by="word"
            animation="fadeIn"
            once={true}
          >
            {description}
          </TextAnimate>
        </CardContent>
        <CardFooter className="flex flex-col items-center mt-2">
          <Link href={href} passHref legacyBehavior>
            <Button className="w-full max-w-[180px] text-base mt-2">
              {cta}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </BlurFade>
  );
}

export function HowItWorksSection() {
  const isMobile = useIsMobile();
  return (
    <section className="w-full py-20 px-6 flex flex-col items-center bg-gradient-to-b from-background to-muted/40">
      <TextAnimate
        className="text-4xl sm:text-5xl font-bold text-center mb-4"
        by="word"
        animation="blurInUp"
        once={true}
      >
        {"Here's How Mint Works"}
      </TextAnimate>
      <TextAnimate
        className="text-lg sm:text-xl text-muted-foreground text-center mb-12 max-w-2xl"
        by="word"
        animation="slideUp"
        once={true}
      >
        {"Get started in just three simple steps and start earning cashback today"}
      </TextAnimate>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-stretch justify-center">
        {steps.map((step, i) => (
          <HowItWorksCard
            key={step.title}
            title={step.title}
            description={step.description}
            icon={step.icon}
            cta={step.cta}
            index={i}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
} 