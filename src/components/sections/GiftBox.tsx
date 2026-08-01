"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useAudio } from "@/providers/AudioProvider";

// three.js needs a real DOM/WebGL context, so this must never render on the server.
const GiftBoxScene = dynamic(
  () => import("@/components/three/GiftBoxScene").then((m) => m.GiftBoxScene),
  { ssr: false, loading: () => <div className="h-[420px] w-full animate-pulse rounded-3xl bg-white/5" /> }
);

export function GiftBox() {
  const [opened, setOpened] = useState(false);
  const { crossfadeMusic, playSfx } = useAudio();

  const handleOpen = () => {
    setOpened(true);
    playSfx("confetti");
    crossfadeMusic("/audio/celebration-theme.mp3", 1800);

    const duration = 1500;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#D4AF37", "#7C3AED", "#EC4899"] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#D4AF37", "#7C3AED", "#EC4899"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
  };

  return (
    <SectionWrapper id="gift-box" className="bg-deep-navy">
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <SplitHeading
          as="h2"
          text={opened ? "You just opened it!" : "A gift, just for you"}
          className="text-3xl font-bold text-white sm:text-5xl"
        />
        <p className="max-w-md text-white/60">
          {opened ? "Keep scrolling — there's more." : "Tap the box to open it."}
        </p>
        <div className="h-[420px] w-full max-w-xl">
          <GiftBoxScene opened={opened} onOpen={handleOpen} />
        </div>
      </div>
    </SectionWrapper>
  );
}
