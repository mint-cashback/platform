"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import {
  ArrowRightIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  GiftIcon,
  HomeIcon,
  PlaneIcon,
  ShoppingBagIcon,
  TagIcon,
  TicketIcon,
  CoinsIcon,
  CreditCardIcon as CardIcon2,
  StoreIcon
} from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useAuth } from "@/lib/hooks/use-auth";

import { Button } from "@/components/ui/button";

function BackgroundIcon({ icon, left, top, rotate, opacity, scale, index }: {
  icon: React.ReactNode;
  left: string;
  top: string;
  rotate: string;
  opacity: string;
  scale: number;
  index: number;
}) {
  const hoverDuration = 3 + (index % 3);
  const hoverAmount = 10 + (index % 10);

  // Random starting point for the animation
  const randomDelay = -(Math.random() * 5);

  // Create scroll-based motion
  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY,
    [0, 500],
    [0, index % 2 === 0 ? -15 : 15]
  );

  // Smooth spring for hover effect
  const springConfig = { damping: 20, stiffness: 100 };
  const ySpring = useSpring(useMotionValue(0), springConfig);
  const xSpring = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    // Update the spring values based on scroll
    y.onChange(latest => {
      ySpring.set(latest);
    });
  }, [y, ySpring]);

  return (
    <motion.div
      className="absolute bg-gray-500/40 dark:bg-gray-300/20 text-background dark:text-foreground p-3 rounded-full hover:bg-gray-500/60 dark:hover:bg-gray-300/30 transition-all"
      style={{
        left,
        top,
        opacity,
        scale,
        rotate,
        x: xSpring,
        y: ySpring
      }}
      animate={{
        y: [`${0}px`, `${hoverAmount}px`, `${0}px`],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: hoverDuration,
          ease: "easeInOut",
          delay: randomDelay,
        }
      }}
      whileHover={{
        scale: scale * 1.1,
        transition: { duration: 0.3 }
      }}
    >
      {icon}
    </motion.div>
  );
}

export function Banner() {
  const isMobile = useIsMobile();
  const { user } = useAuth?.() || { user: null };

  const containerRef = useRef<HTMLDivElement>(null);

  const layer1 = [
    { icon: <ShoppingCartIcon size={50} />, left: "25%", top: "30%", rotate: "-8deg", opacity: "0.25", scale: 1.4 },
    { icon: <CreditCardIcon size={55} />, left: "72%", top: "35%", rotate: "12deg", opacity: "0.3", scale: 1.5 },
    { icon: <GiftIcon size={60} />, left: "40%", top: "70%", rotate: "-5deg", opacity: "0.25", scale: 1.6 },
  ];
  const layer2 = [
    { icon: <HomeIcon size={40} />, left: "15%", top: "50%", rotate: "10deg", opacity: "0.2", scale: 1.2 },
    { icon: <PlaneIcon size={45} />, left: "80%", top: "25%", rotate: "-8deg", opacity: "0.2", scale: 1.3 },
    { icon: <StoreIcon size={42} />, left: "65%", top: "65%", rotate: "15deg", opacity: "0.18", scale: 1.25 },
    { icon: <CoinsIcon size={38} />, left: "20%", top: "20%", rotate: "5deg", opacity: "0.2", scale: 1.15 },
  ];
  const layer3 = [
    { icon: <ShoppingBagIcon size={30} />, left: "3%", top: "15%", rotate: "-12deg", opacity: "0.15", scale: 0.9 },
    { icon: <CardIcon2 size={25} />, left: "8%", top: "75%", rotate: "8deg", opacity: "0.12", scale: 0.8 },
    { icon: <TagIcon size={28} />, left: "8%", top: "4%", rotate: "5deg", opacity: "0.13", scale: 0.85 },
    { icon: <TicketIcon size={32} />, left: "92%", top: "80%", rotate: "-10deg", opacity: "0.15", scale: 0.95 },
    { icon: <GiftIcon size={24} />, left: "92%", top: "10%", rotate: "-5deg", opacity: "0.12", scale: 0.75 },
    { icon: <ShoppingBagIcon size={27} />, left: "90%", top: "50%", rotate: "15deg", opacity: "0.13", scale: 0.8 },
  ];
  const allIcons = [...layer1, ...layer2, ...layer3];

  // Scroll-based parallax for main content
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 300], [0, 50]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Determine the button text and destination based on login status
  const buttonText = user ? "Go to dashboard" : "Start saving today";
  const buttonHref = user ? "/dashboard" : "/download";

  return (
    <div
      className="sm:h-[85vh] py-28 flex flex-col items-center justify-center relative overflow-hidden px-6"
      ref={containerRef}
    >
      {allIcons.map((props, index) => (
        <BackgroundIcon key={index} index={index} {...props} />
      ))}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex flex-col items-center"
      >
        <div className="text-5xl sm:text-8xl font-bold text-center max-w-3xl relative z-10 transition-all">
          <TextAnimate
            by="word"
            animation="blurInUp"
            delay={0.1}
            className="inline"
            once={true}
          >
            Cashback,
          </TextAnimate>{" "}
          <TextAnimate
            by="word"
            animation="scaleUp"
            delay={0.3}
            className="inline text-primary"
            once={true}
          >
            finally
          </TextAnimate>{" "}
          <TextAnimate
            by="word"
            animation="blurInUp"
            delay={0.5}
            className="inline"
            once={true}
          >
            done right
          </TextAnimate>
        </div>

        <TextAnimate
          className="text-lg sm:text-2xl font-semibold text-center max-w-3xl mt-4 sm:mt-8 relative z-10"
          by="word"
          animation="slideUp"
          delay={0.6}
          once={true}
        >
          Get rewarded for your purchases in just a click, completely free. 💸
        </TextAnimate>

        <Link href={buttonHref} passHref>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            <Button className="mt-4 sm:mt-8 h-14 px-12 text-lg sm:text-xl relative z-10 transition-all hover:shadow-lg">
              {buttonText} <ArrowRightIcon size={20} />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
