"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { memories } from "@/data/content";
import type { MemoryItem } from "@/types";

export function MemoryTimeline() {
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]", { y: 60, stagger: 0.1 });
  const [active, setActive] = useState<MemoryItem | null>(null);

  return (
    <SectionWrapper id="memory-timeline" className="bg-ink" fullHeight={false}>
      <div className="relative z-10 mb-12 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">A Timeline of Memories</h2>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
      >
        {memories.map((memory) => (
          <button
            key={memory.id}
            data-reveal
            onClick={() => setActive(memory)}
            className="group w-72 flex-shrink-0 snap-center text-left"
          >
            <GlassCard className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="relative aspect-[4/5] w-full bg-white/5">
                <Image
                  src={memory.thumbSrc || memory.mediaSrc}
                  alt={memory.title}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-gold">{memory.date}</p>
                <h3 className="mt-1 font-medium text-white">{memory.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/50">{memory.caption}</p>
              </div>
            </GlassCard>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-white/70 hover:text-white"
          >
            <X size={28} />
          </button>
          <div className="relative max-h-[80vh] w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/5] w-full">
              <Image src={active.mediaSrc} alt={active.title} fill className="object-contain" />
            </div>
            <p className="mt-4 text-center text-white/80">{active.caption}</p>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
