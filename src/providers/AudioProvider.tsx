"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";

type SfxKey =
  | "click"
  | "hover"
  | "confetti"
  | "envelope"
  | "typing"
  | "cake-cut"
  | "cheer"
  | "sparkle";

interface AudioContextValue {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  playMusic: (src: string, opts?: { loop?: boolean; fadeMs?: number }) => void;
  crossfadeMusic: (nextSrc: string, fadeMs?: number) => void;
  playSfx: (key: SfxKey) => void;
  registerSfx: (key: SfxKey, src: string) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

/** SFX sources are registered lazily by sections as they mount, keyed by name. */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
  const musicRef = useRef<Howl | null>(null);
  const sfxMap = useRef<Map<SfxKey, Howl>>(new Map());

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      Howler.mute(!m);
      return !m;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    Howler.volume(v);
  }, []);

  const playMusic = useCallback(
    (src: string, opts?: { loop?: boolean; fadeMs?: number }) => {
      musicRef.current?.stop();
      const howl = new Howl({
        src: [src],
        loop: opts?.loop ?? true,
        volume: 0,
        html5: true,
      });
      musicRef.current = howl;
      howl.play();
      howl.fade(0, volume, opts?.fadeMs ?? 1500);
    },
    [volume]
  );

  const crossfadeMusic = useCallback(
    (nextSrc: string, fadeMs = 2000) => {
      const prev = musicRef.current;
      const next = new Howl({ src: [nextSrc], loop: true, volume: 0, html5: true });
      next.play();
      next.fade(0, volume, fadeMs);
      if (prev) {
        prev.fade(volume, 0, fadeMs);
        setTimeout(() => prev.stop(), fadeMs + 100);
      }
      musicRef.current = next;
    },
    [volume]
  );

  const registerSfx = useCallback((key: SfxKey, src: string) => {
    if (!sfxMap.current.has(key)) {
      sfxMap.current.set(key, new Howl({ src: [src], volume: 0.7 }));
    }
  }, []);

  const playSfx = useCallback((key: SfxKey) => {
    sfxMap.current.get(key)?.play();
  }, []);

  const value = useMemo(
    () => ({
      isMuted,
      volume,
      toggleMute,
      setVolume,
      playMusic,
      crossfadeMusic,
      playSfx,
      registerSfx,
    }),
    [isMuted, volume, toggleMute, setVolume, playMusic, crossfadeMusic, playSfx, registerSfx]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
