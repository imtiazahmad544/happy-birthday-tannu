"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { siteConfig } from "@/data/content";

const EMOJIS = ["🎉", "🎈", "✨", "🎂", "💫", "🥳", "🎊", "💛"];

export function WelcomeCelebration() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floating-emoji", {
        y: "-=40",
        x: (i) => (i % 2 === 0 ? "+=12" : "-=12"),
        rotation: (i) => (i % 2 === 0 ? 15 : -15),
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="welcome-celebration" className="bg-[#1A0F2E]" ref={rootRef}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {EMOJIS.map((emoji, i) => (
          <span
            key={i}
            className="floating-emoji absolute text-4xl opacity-70"
            style={{ left: `${8 + i * 11}%`, top: `${15 + (i % 3) * 22}%` }}
          >
            {emoji}
          </span>
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <SplitHeading
          as="h2"
          text={`Happy Birthday, ${siteConfig.recipientName}!`}
          mode="words"
          className="text-4xl font-bold text-white sm:text-6xl"
        />
        <p className="max-w-lg text-white/70">
          Wishing you a day as wonderful and radiant as you are.
        </p>
      </div>
    </SectionWrapper>
  );
}
