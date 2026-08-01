"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { siteConfig } from "@/data/content";
import { useAudio } from "@/providers/AudioProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const COLORS = ["#D4AF37", "#F1D97A", "#7C3AED", "#EC4899", "#3B5BDB", "#F59E0B"];

/** Full-screen canvas fireworks: random bursts + a name-spelling burst finale. */
export function FireworksFinale() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const { playSfx } = useAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !started) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles: Particle[] = [];
    let raf: number;

    const burst = (x: number, y: number, count = 60) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
        });
      }
      playSfx("sparkle");
    };

    const spawnInterval = setInterval(() => {
      burst(Math.random() * canvas.width, Math.random() * canvas.height * 0.6 + canvas.height * 0.1);
    }, 900);

    const draw = () => {
      ctx.fillStyle = "rgba(5,6,10,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.life -= 0.012;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    // Camera shake on mount
    if (rootRef.current) {
      gsap.fromTo(
        rootRef.current,
        { x: -6 },
        { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" }
      );
    }

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [started, playSfx]);

  useEffect(() => {
    // Big confetti bloom once the section is visible
    const el = document.getElementById("fireworks-finale");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          confetti({ particleCount: 200, spread: 160, origin: { y: 0.3 } });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <SectionWrapper id="fireworks-finale" className="bg-[#1A0F2E]" ref={rootRef}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <SplitHeading
          as="h2"
          mode="chars"
          text={siteConfig.recipientName.toUpperCase()}
          className="bg-gold-shimmer bg-[length:200%_100%] bg-clip-text text-6xl font-bold text-transparent sm:text-8xl"
        />
        <p className="text-lg text-white/70">Today, the sky celebrates with us.</p>
      </div>
    </SectionWrapper>
  );
}
