"use client";

import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const STORY_TEXT = "The story begins with a friendship worth celebrating...";

/** Typewriter reveal, triggered once the section scrolls into view. */
export function StoryIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) setTriggered(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const id = setInterval(() => {
      setVisibleChars((c) => {
        if (c >= STORY_TEXT.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, [triggered]);

  return (
    <SectionWrapper id="story-intro" className="bg-ink" ref={rootRef}>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent)",
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />
      <p className="relative z-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-white sm:text-4xl">
        {STORY_TEXT.slice(0, visibleChars)}
        <span className="animate-pulse text-gold">|</span>
      </p>
    </SectionWrapper>
  );
}
