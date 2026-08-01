"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { achievements } from "@/data/content";

const ICONS = Icons as unknown as Record<string, LucideIcon>;

export function AchievementRoom() {
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]", { y: 50, stagger: 0.1 });

  return (
    <SectionWrapper id="achievement-room" className="bg-deep-navy" fullHeight={false}>
      <div className="relative z-10 mb-10 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">Achievement Room</h2>
        <p className="mt-2 text-white/60">Unlocked, every single one.</p>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 grid w-full max-w-5xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 [perspective:1000px]"
      >
        {achievements.map((a) => {
          const Icon = ICONS[a.icon] ?? Icons.Star;
          return (
            <GlassCard
              key={a.id}
              data-reveal
              glow
              className="group flex flex-col items-center gap-3 p-5 text-center transition-transform duration-500 hover:[transform:rotateY(10deg)_rotateX(6deg)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-shimmer bg-[length:200%_100%] text-ink">
                <Icon size={24} />
              </div>
              <h3 className="text-sm font-semibold text-white">{a.title}</h3>
              <p className="text-xs text-white/50">{a.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
