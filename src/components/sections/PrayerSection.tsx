"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { prayer } from "@/data/content";

/** Splits the prayer text into sentences aligned with syncTimestamps for highlighting. */
export function PrayerSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sentences = prayer.arabicOrUrdu.split(/(?<=[۔.])\s*/).filter(Boolean);
  const timestamps = useMemo(() => prayer.syncTimestamps ?? [], []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      const idx = timestamps.findIndex((t, i) => {
        const next = timestamps[i + 1] ?? Infinity;
        return audio.currentTime >= t && audio.currentTime < next;
      });
      if (idx !== -1) setActiveIndex(idx);
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [timestamps]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <SectionWrapper
      id="prayer-section"
      className="bg-gradient-to-b from-[#2A1B3D] via-[#3D2650] to-ink"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0E23] to-transparent" aria-hidden />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-2xl text-white/90 sm:text-3xl">A Prayer for You</h2>

        <audio ref={audioRef} src={prayer.audioSrc} preload="none" />
        <Button variant="glass" onClick={toggle} aria-label={playing ? "Pause prayer audio" : "Play prayer audio"}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? "Pause" : "Play Dua"}
        </Button>

        <div dir="rtl" className="space-y-2 font-serif text-2xl leading-loose text-white">
          {sentences.map((s, i) => (
            <span
              key={i}
              className={i === activeIndex ? "text-gold transition-colors" : "text-white/50 transition-colors"}
            >
              {s}{" "}
            </span>
          ))}
        </div>

        <p className="text-sm italic text-white/50">{prayer.translationEn}</p>
      </div>
    </SectionWrapper>
  );
}
