import type {
  SiteConfig,
  MemoryItem,
  GalleryItem,
  FunnyMoment,
  StatItem,
  AchievementCard,
  LetterContent,
  PrayerContent,
} from "@/types";
import { makeId } from "@/lib/utils";

/**
 * ⚠️ PLACEHOLDER CONTENT
 * This is the only file you should need to touch to personalize the site.
 * Replace names, dates, image/video/audio paths, and copy below with real
 * material (see /public/images, /public/audio, /public/models).
 */

export const siteConfig: SiteConfig = {
  recipientName: "Tannu",
  birthdayDateISO: "2026-12-31T00:00:00+05:00", // TODO: set real birthday date/time
  authorName: "Your Name",
  siteUrl: "https://happy-birthday-tannu.vercel.app",
  ogImage: "/images/og-cover.jpg",
  languages: ["en", "ur"],
};

export const memories: MemoryItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: makeId("memory", i + 1),
  date: `Memory ${i + 1}`,
  title: `Placeholder Memory Title ${i + 1}`,
  caption: "Replace this with a real caption about this memory.",
  mediaType: "image",
  mediaSrc: `/images/memories/placeholder-${i + 1}.jpg`,
  thumbSrc: `/images/memories/placeholder-${i + 1}-thumb.jpg`,
}));

export const gallery: GalleryItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: makeId("gallery", i + 1),
  src: `/images/gallery/placeholder-${i + 1}.jpg`,
  alt: `Placeholder gallery photo ${i + 1}`,
  tag: (["funny", "travel", "friends", "candid", "throwback"] as const)[i % 5],
  width: 800,
  height: i % 3 === 0 ? 1000 : 600,
}));

export const funnyMoments: FunnyMoment[] = Array.from({ length: 4 }).map((_, i) => ({
  id: makeId("funny", i + 1),
  type: "quote",
  text: `Placeholder funny quote or inside joke #${i + 1} goes here.`,
  reaction: ["😂", "🤣", "😭", "💀"][i % 4],
}));

export const friendshipStats: StatItem[] = [
  { id: "years", label: "Years of Friendship", value: 5, icon: "Calendar" },
  { id: "photos", label: "Photos Together", value: 1240, icon: "Camera" },
  { id: "laughs", label: "Times We Laughed Till We Cried", value: 87, icon: "Laugh" },
  { id: "trips", label: "Trips Taken", value: 6, icon: "Plane" },
  { id: "chats", label: "Messages Exchanged", value: 48210, icon: "MessageCircle" },
  { id: "memories", label: "Core Memories", value: 32, icon: "Heart" },
];

export const achievements: AchievementCard[] = [
  { id: "best-friend", title: "Best Friend", description: "Always there, no matter what.", icon: "Users", unlocked: true },
  { id: "supportive", title: "Supportive Soul", description: "Lifts everyone around them up.", icon: "HeartHandshake", unlocked: true },
  { id: "funny", title: "Certified Funny", description: "Can turn any bad day around.", icon: "Laugh", unlocked: true },
  { id: "kind", title: "Kind Heart", description: "Generous with time and love.", icon: "Sparkles", unlocked: true },
  { id: "dreamer", title: "The Dreamer", description: "Never stops chasing what's next.", icon: "Star", unlocked: true },
];

export const letter: LetterContent = {
  salutation: "Dear Tannu,",
  paragraphs: [
    "Placeholder paragraph one — write something real about what this friendship means.",
    "Placeholder paragraph two — a specific memory or moment worth mentioning.",
    "Placeholder paragraph three — your wish for their year ahead.",
  ],
  signature: "With love, Your Name",
};

export const prayer: PrayerContent = {
  arabicOrUrdu: "یہاں دعا کا متن شامل کریں۔",
  translationEn: "Placeholder English translation of the dua goes here.",
  audioSrc: "/audio/prayer-dua.mp3",
  syncTimestamps: [0, 4, 9, 14],
};

export const surpriseVideoSrc = "/images/surprise-video-placeholder.mp4";
