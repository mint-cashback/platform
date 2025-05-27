"use client";

import { Mail, ShoppingCart, DollarSign } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const steps = [
  {
    title: "Join for free",
    description:
      "Add Mint to your browser and sign up with your email. No forms, no hassle — just one click and you're ready to start earning.",
    icon: Mail,
    cta: "Download Mint",
    animate: {
      initial: { y: 40, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 60, damping: 12, delay: 0.1 },
    },
  },
  {
    title: "Start earning cash back",
    description:
      "Browse your favorite stores like you always do. When Mint spots a cashback offer, it'll pop up and let you activate it instantly.",
    icon: ShoppingCart,
    cta: "Activate",
    animate: {
      initial: { y: 40, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 60, damping: 12, delay: 0.2 },
    },
  },
  {
    title: "Redeem your cash back",
    description:
      "Watch your cashback pile up as you shop. When you're ready to cash out, claim it however you like — PayPal, Venmo, or a gift card. You're in control.",
    icon: DollarSign,
    cta: "Withdraw",
    animate: {
      initial: { y: 40, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 60, damping: 12, delay: 0.3 },
    },
  },
];

function HowItWorksCard({ title, description, icon: Icon, cta, index }: {
  title: string;
  description: string;
  icon: React.ElementType;
  cta: string;
  index: number;
}) {
  return (
    <BlurFade inView={true} direction="up" delay={index * 0.1}>
      <Card className="h-full flex flex-col items-center shadow group">
        <CardHeader className="flex flex-col items-center">
          <div
            className="rounded-full bg-primary/10 p-5 mb-4 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
          >
            <Icon size={40} className="text-primary" />
          </div>
          <CardTitle className="text-xl text-center mb-2">
            {index + 1}. {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center">
          <TextAnimate
            className="text-center text-base text-muted-foreground mb-4"
            by="word"
            animation="fadeIn"
            once={true}
          >
            {description}
          </TextAnimate>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button className="w-full max-w-[180px] text-base mt-2" variant="default">
            {cta}
          </Button>
        </CardFooter>
      </Card>
    </BlurFade>
  );
}

export function HowItWorksSection() {
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
          />
        ))}
      </div>
    </section>
  );
} 