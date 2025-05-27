"use client";

import Image from "next/image";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";

export function Backed() {
  return (
    <div className="py-16 w-full flex flex-col items-center">
      <TextAnimate
        className="text-3xl font-semibold text-center mb-6"
        by="word"
        animation="blurInUp"
        once={true}
      >
        Backed by
      </TextAnimate>

      <BlurFade inView={true}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 w-full px-4">
          <Link href="https://ltf.vc/portfolio" target="_blank">
            <Image
              src={"/partners/ltf-ventures.png"}
              alt="LTF Ventures logo"
              width={512}
              height={128}
              className="object-contain w-auto transition-all h-16 p-4 dark:border dark:bg-white/100 rounded-xl cursor-pointer hover:scale-105"
            />
          </Link>

          <Link href="https://www.uchicago.edu" target="_blank">
            <Image
              src={"/partners/university-of-chicago.png"}
              alt="University of Chicago logo"
              width={512}
              height={128}
              className="object-contain w-auto transition-all h-20 p-4 dark:border dark:bg-white rounded-xl cursor-pointer hover:scale-105"
            />
          </Link>
        </div>
      </BlurFade>
    </div>
  );
}
