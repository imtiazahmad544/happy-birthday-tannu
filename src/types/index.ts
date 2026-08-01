export interface SiteConfig {
  recipientName: string;
  birthdayDateISO: string; // e.g. "2026-09-14T00:00:00+05:00"
  authorName: string;
  siteUrl: string;
  ogImage: string;
  languages: ("en" | "ur")[];
}

export interface MemoryItem {
  id: string;
  date: string; // display string, e.g. "March 2021"
  title: string;
  caption: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  thumbSrc?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  tag: "funny" | "travel" | "friends" | "candid" | "throwback";
  width: number;
  height: number;
}

export interface FunnyMoment {
  id: string;
  type: "meme" | "gif" | "quote";
  src?: string;
  text: string;
  reaction: string; // emoji
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
}

export interface AchievementCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface WishEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  color?: string;
}

export interface LetterContent {
  salutation: string;
  paragraphs: string[];
  signature: string;
}

export interface PrayerContent {
  arabicOrUrdu: string;
  translationEn: string;
  audioSrc: string;
  syncTimestamps?: number[]; // seconds, aligns with sentence highlighting
}

export type SectionId =
  | "loader"
  | "hero"
  | "story-intro"
  | "countdown"
  | "gift-box"
  | "welcome-celebration"
  | "memory-timeline"
  | "memory-gallery"
  | "funny-moments"
  | "friendship-stats"
  | "cake-experience"
  | "birthday-letter"
  | "prayer-section"
  | "wish-wall"
  | "achievement-room"
  | "surprise-video"
  | "fireworks-finale"
  | "final-goodbye";
