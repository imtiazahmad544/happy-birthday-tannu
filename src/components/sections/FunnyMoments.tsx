"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAudio } from "@/providers/AudioProvider";
import { funnyMoments } from "@/data/content";

export function FunnyMoments() {
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]");
  const { playSfx } = useAudio();

  return (
    <SectionWrapper id="funny-moments" className="bg-[#1A0F2E]" fullHeight={false}>
      <div className="relative z-10 mb-10 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">Funny Moments</h2>
      </div>
      <div ref={containerRef} className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
        {funnyMoments.map((moment) => (
          <GlassCard
            key={moment.id}
            data-reveal
            className="cursor-pointer p-6 transition-transform hover:-translate-y-1"
            onClick={() => playSfx("click")}
          >
            <p className="text-lg text-white/90">{moment.text}</p>
            <span className="mt-3 block text-2xl">{moment.reaction}</span>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
