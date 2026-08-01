"use client";

import { useRef, useState } from "react";
import { Play, Pause, Maximize } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { surpriseVideoSrc } from "@/data/content";

export function SurpriseVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.pause();
    else video.play().catch(() => {});
    setPlaying(!playing);
  };

  const goFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <SectionWrapper id="surprise-video" className="bg-ink">
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">One More Surprise</h2>
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <video
            ref={videoRef}
            src={surpriseVideoSrc}
            poster="/images/surprise-video-poster.jpg"
            className="aspect-video w-full bg-black"
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4">
            <Button size="sm" variant="glass" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button size="sm" variant="glass" onClick={goFullscreen} aria-label="Fullscreen">
              <Maximize size={16} />
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
