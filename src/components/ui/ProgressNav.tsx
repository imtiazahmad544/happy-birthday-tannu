"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/constants/sections";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = SECTIONS.filter((s) => s.id !== "loader");

/** Fixed dot navigation on the right edge; highlights the section in view. */
export function ProgressNav() {
  const [activeId, setActiveId] = useState(NAV_SECTIONS[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id as typeof activeId);
      },
      { threshold: 0.5 }
    );
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {NAV_SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          aria-current={activeId === s.id ? "true" : undefined}
          className={cn(
            "h-2 w-2 rounded-full border border-white/30 transition-all",
            activeId === s.id ? "h-3 w-3 bg-gold border-gold" : "bg-transparent hover:bg-white/30"
          )}
        />
      ))}
    </nav>
  );
}
