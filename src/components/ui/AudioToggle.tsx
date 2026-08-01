"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/providers/AudioProvider";

export function AudioToggle() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      aria-pressed={isMuted}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
}
