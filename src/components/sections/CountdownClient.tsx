"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { GlassCard } from "@/components/ui/GlassCard";

const UNITS: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function CountdownClient({ targetISO }: { targetISO: string }) {
  const parts = useCountdown(targetISO);

  if (parts.isPast) {
    return <p className="text-2xl text-gold">It&apos;s the big day! 🎂</p>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {UNITS.map((u) => (
        <GlassCard key={u.key} glow className="flex w-24 flex-col items-center gap-1 py-5">
          <span
            className="animate-pulse-glow font-mono text-3xl font-bold text-gold [text-shadow:0_0_20px_rgba(212,175,55,0.6)]"
            aria-hidden
          >
            {String(parts[u.key]).padStart(2, "0")}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-white/50">{u.label}</span>
        </GlassCard>
      ))}
    </div>
  );
}
