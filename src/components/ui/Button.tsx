"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
}

/** Reusable CTA button with hover/click sound feedback and premium styling. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", onClick, onMouseEnter, children, ...props }, ref) => {
    const { playSfx } = useAudio();

    return (
      <button
        ref={ref}
        onMouseEnter={(e) => {
          playSfx("hover");
          onMouseEnter?.(e);
        }}
        onClick={(e) => {
          playSfx("click");
          onClick?.(e);
        }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          "active:scale-95",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          variant === "primary" &&
            "bg-gold-shimmer bg-[length:200%_100%] text-ink shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] hover:bg-[position:100%_0%]",
          variant === "glass" &&
            "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/25",
          variant === "ghost" && "text-white/80 hover:text-white",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
