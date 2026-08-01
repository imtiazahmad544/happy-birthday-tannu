"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Mic } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { useMicBlowDetection } from "@/hooks/useMicBlowDetection";
import { useAudio } from "@/providers/AudioProvider";
import { siteConfig } from "@/data/content";

const CakeScene = dynamic(
  () => import("@/components/three/CakeScene").then((m) => m.CakeScene),
  { ssr: false, loading: () => <div className="h-[420px] w-full animate-pulse rounded-3xl bg-white/5" /> }
);

export function CakeExperience() {
  const [candlesLit, setCandlesLit] = useState(true);
  const { playSfx } = useAudio();

  const extinguish = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    playSfx("cheer");
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
  };

  const { supported, permissionDenied, requestAccess } = useMicBlowDetection({
    onBlow: extinguish,
  });

  return (
    <SectionWrapper id="cake-experience" className="bg-[#1A0F2E]">
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <SplitHeading
          as="h2"
          text={candlesLit ? "Make a wish..." : "Happy Birthday! 🎉"}
          className="text-3xl font-bold text-white sm:text-5xl"
        />
        <p className="max-w-md text-white/60">
          {candlesLit
            ? `Blow into your mic to blow out ${siteConfig.recipientName}'s candles — or just tap.`
            : "Wish made. May everything you hoped for come true."}
        </p>

        <div className="h-[420px] w-full max-w-xl">
          <CakeScene candlesLit={candlesLit} />
        </div>

        {candlesLit && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {supported && !permissionDenied && (
              <Button variant="glass" onClick={requestAccess}>
                <Mic size={16} /> Enable mic to blow
              </Button>
            )}
            <Button variant="primary" onClick={extinguish}>
              Blow out candles
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
