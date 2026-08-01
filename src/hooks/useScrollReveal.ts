"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

/**
 * Applies a fade + rise entrance animation to all direct children matching
 * `selector` within the returned ref, triggered as they scroll into view.
 */
export function useScrollReveal<T extends HTMLElement>(
  selector = "[data-reveal]",
  { y = 40, duration = 0.9, stagger = 0.12, start = "top 80%", once = true }: RevealOptions = {}
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, y, duration, stagger, start, once]);

  return containerRef;
}
