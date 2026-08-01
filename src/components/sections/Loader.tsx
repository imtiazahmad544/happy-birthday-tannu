"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/data/content";
import { useAudio } from "@/providers/AudioProvider";

const BOOT_LINES = [
  "initializing memories...",
  "loading friendship archive...",
  "tuning fireworks...",
  "warming up candles...",
  `preparing something for ${siteConfig.recipientName}...`,
];

interface LoaderProps {
  onComplete: () => void;
}

/**
 * 5-8s cinematic boot sequence: starfield canvas, typing terminal lines,
 * progress bar, then logo reveal + camera-zoom-style scale/fade exit.
 */
export function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const { playMusic } = useAudio();

  // Starfield background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 220 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#05060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.twinkle += 0.02;
        const alpha = 0.4 + Math.sin(s.twinkle) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(241, 217, 122, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Progress + typing sequence, ~6.5s total
  useEffect(() => {
    const totalMs = 6500;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const pct = Math.min(1, (now - start) / totalMs);
      setProgress(pct);
      setLineIndex(Math.min(BOOT_LINES.length - 1, Math.floor(pct * BOOT_LINES.length)));
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    playMusic("/audio/ambient-intro.mp3", { fadeMs: 2000 });
    const tl = gsap.timeline({ onComplete });
    tl.to(".loader-content", { opacity: 0, duration: 0.5 })
      .to(".loader-logo", { scale: 1.15, opacity: 1, duration: 0.6, ease: "power2.out" }, "<")
      .to(rootRef.current, { scale: 1.4, opacity: 0, duration: 1, ease: "power3.inOut" });
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />
      <div className="loader-content relative z-10 flex w-full max-w-md flex-col items-center gap-8 px-6 text-center">
        <div className="loader-logo font-serif text-3xl tracking-[0.3em] text-gold opacity-90">
          {siteConfig.recipientName.toUpperCase()}
        </div>

        <div className="h-6 font-mono text-xs text-white/50" role="status" aria-live="polite">
          {BOOT_LINES[lineIndex]}
        </div>

        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gold-shimmer bg-[length:200%_100%] transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="font-mono text-[10px] tracking-widest text-white/30">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}
