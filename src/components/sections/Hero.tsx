"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/data/content";

const BALLOON_COLORS = ["#D4AF37", "#7C3AED", "#EC4899", "#3B5BDB", "#F59E0B"];

interface HeroProps {
  onEnter?: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".balloon", {
        y: "-=24",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.6, from: "random" },
      });
      gsap.fromTo(
        ".hero-fade-in",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, stagger: 0.15, ease: "power3.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="hero" ref={rootRef} className="bg-deep-navy relative">
      {/* Aurora glow */}
      <div className="pointer-events-none absolute inset-0 bg-aurora-radial" aria-hidden />

      {/* Floating balloons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {BALLOON_COLORS.map((color, i) => (
          <div
            key={i}
            className="balloon absolute rounded-full opacity-70 blur-[1px]"
            style={{
              backgroundColor: color,
              width: 40 + (i % 3) * 14,
              height: 52 + (i % 3) * 18,
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 4) * 12}%`,
              filter: `drop-shadow(0 0 20px ${color})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <GlassCard className="hero-fade-in px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          A Cinematic Birthday Experience
        </GlassCard>

        <SplitHeading
          as="h1"
          text={`Happy Birthday,\n${siteConfig.recipientName}`}
          mode="words"
          className="hero-fade-in text-5xl font-bold leading-tight text-white sm:text-7xl"
        />

        <p className="hero-fade-in max-w-xl text-balance text-base text-white/60 sm:text-lg">
          Something has been made just for you — scroll to begin.
        </p>

        <Button
          onClick={onEnter}
          size="lg"
          className="hero-fade-in mt-4"
          aria-label="Begin the experience"
        >
          Begin the Journey
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
        <ChevronDown size={28} aria-hidden />
        <span className="sr-only">Scroll down</span>
      </div>
    </SectionWrapper>
  );
}
