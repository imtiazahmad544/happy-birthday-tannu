import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassCard({ className, glow = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
        glow && "shadow-[0_0_40px_rgba(212,175,55,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
