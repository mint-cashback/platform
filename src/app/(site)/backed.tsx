"use client";

import Image from "next/image";

import { TextAnimate } from "@/components/magicui/text-animate";

export function Backed() {
  const partners = [
    {
      name: "LTF Ventures",
      logo: "/partners/ltf-ventures.png",
      alt: "LTF Ventures logo"
    },
    {
      name: "University of Chicago",
      logo: "/partners/university-of-chicago.png",
      alt: "University of Chicago logo"
    }
  ];

  return (
    <div className="py-16 w-full flex flex-col items-center">
      <TextAnimate
        className="text-3xl font-semibold text-center mb-10"
        by="word"
        animation="blurInUp"
        once={true}
      >
        Backed by
      </TextAnimate>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 w-full">
        {partners.map((partner, index) => (
          <div
            key={partner.name}
            className={`relative h-16 sm:h-20 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards`}
            style={{
              animationDelay: `${300 + (index * 150)}ms`,
              opacity: 0
            }}
          >
            <Image
              src={partner.logo}
              alt={partner.alt}
              width={200}
              height={80}
              className="object-contain h-full w-auto transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
