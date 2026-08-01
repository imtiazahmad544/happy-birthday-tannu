"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  mode?: "chars" | "words";
  className?: string;
  delay?: number;
  trigger?: boolean; // set true to (re)play the animation, e.g. on scroll-into-view
}

/**
 * Splits text into spans and staggers them in. Avoids the paid GSAP
 * SplitText plugin by doing a lightweight manual split — swap for the real
 * SplitText plugin if you have a Club GreenSock license.
 */
export function SplitHeading({
  text,
  as = "h2",
  mode = "words",
  className,
  delay = 0,
  trigger = true,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const Tag = as;

  const pieces = mode === "chars" ? text.split("") : text.split(" ");

  useEffect(() => {
    if (!trigger || !ref.current) return;
    const spans = ref.current.querySelectorAll("span[data-piece]");
    gsap.fromTo(
      spans,
      { opacity: 0, y: 30, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay,
        stagger: mode === "chars" ? 0.02 : 0.08,
        ease: "back.out(1.7)",
      }
    );
  }, [trigger, delay, mode]);

  return (
    <Tag ref={ref} className={cn("font-serif [perspective:800px]", className)}>
      {pieces.map((piece, i) => (
        <span
          key={i}
          data-piece
          className="inline-block will-change-transform"
          style={{ opacity: 0 }}
        >
          {piece === " " ? "\u00A0" : piece}
          {mode === "words" && i < pieces.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
