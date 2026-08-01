import type { SectionId } from "@/types";

export interface SectionMeta {
  id: SectionId;
  label: string;
  /** Background tone used for scroll-linked theme transitions (see useThemeTransition). */
  tone: "near-black" | "deep-navy" | "royal" | "warm";
}

/** Ordered list driving the entire page flow. Reorder here to reorder the experience. */
export const SECTIONS: SectionMeta[] = [
  { id: "loader", label: "Loading", tone: "near-black" },
  { id: "hero", label: "Welcome", tone: "deep-navy" },
  { id: "story-intro", label: "Our Story", tone: "near-black" },
  { id: "countdown", label: "Countdown", tone: "royal" },
  { id: "gift-box", label: "A Gift", tone: "deep-navy" },
  { id: "welcome-celebration", label: "Happy Birthday", tone: "warm" },
  { id: "memory-timeline", label: "Memories", tone: "near-black" },
  { id: "memory-gallery", label: "Gallery", tone: "deep-navy" },
  { id: "funny-moments", label: "Funny Moments", tone: "warm" },
  { id: "friendship-stats", label: "By the Numbers", tone: "royal" },
  { id: "cake-experience", label: "Cake Time", tone: "warm" },
  { id: "birthday-letter", label: "A Letter", tone: "deep-navy" },
  { id: "prayer-section", label: "A Prayer", tone: "near-black" },
  { id: "wish-wall", label: "Wish Wall", tone: "royal" },
  { id: "achievement-room", label: "Achievements", tone: "deep-navy" },
  { id: "surprise-video", label: "Surprise", tone: "near-black" },
  { id: "fireworks-finale", label: "Celebration", tone: "warm" },
  { id: "final-goodbye", label: "Goodnight", tone: "near-black" },
];

export const TONE_BG: Record<SectionMeta["tone"], string> = {
  "near-black": "#05060A",
  "deep-navy": "#0A0E23",
  royal: "#0F1F4D",
  warm: "#1A0F2E",
};
