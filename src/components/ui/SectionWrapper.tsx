import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: SectionId;
  fullHeight?: boolean;
}

/**
 * Every top-level section should be wrapped in this for consistent anchors
 * (used by the nav + progress indicator), spacing, and semantic <section> tags.
 * Forwards its ref to the underlying <section> so sections can target it with
 * GSAP contexts / ScrollTrigger.
 */
export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, fullHeight = true, className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        aria-label={id.replace(/-/g, " ")}
        className={cn(
          "relative w-full overflow-hidden px-6 py-24 sm:px-10 lg:px-16",
          fullHeight && "min-h-screen flex flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";
