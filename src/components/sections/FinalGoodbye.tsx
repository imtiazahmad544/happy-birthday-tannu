"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/data/content";

export function FinalGoodbye() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".lantern", {
        y: "-=30",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="final-goodbye" className="bg-ink" ref={rootRef}>
      {/* Moon */}
      <div
        className="pointer-events-none absolute right-16 top-16 h-24 w-24 rounded-full bg-[#F1D97A] opacity-90 shadow-[0_0_80px_30px_rgba(241,217,122,0.35)]"
        aria-hidden
      />
      {/* Lanterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="lantern absolute h-10 w-8 rounded-md bg-gradient-to-b from-amber to-gold opacity-80 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
            style={{ left: `${10 + i * 18}%`, bottom: `${5 + (i % 3) * 15}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-5xl">
          Goodnight, {siteConfig.recipientName}.
        </h2>
        <p className="max-w-md text-white/60">
          Here&apos;s to another year of stories worth telling. Thank you for being you.
        </p>
        <p className="mt-6 font-serif italic text-white/40">— {siteConfig.authorName}</p>
      </div>
    </SectionWrapper>
  );
}
