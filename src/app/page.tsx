"use client";

import { useRef, useState } from "react";
import { Loader } from "@/components/sections/Loader";
import { Hero } from "@/components/sections/Hero";
import { StoryIntro } from "@/components/sections/StoryIntro";
import { Countdown } from "@/components/sections/Countdown";
import { GiftBox } from "@/components/sections/GiftBox";
import { WelcomeCelebration } from "@/components/sections/WelcomeCelebration";
import { MemoryTimeline } from "@/components/sections/MemoryTimeline";
import { MemoryGallery } from "@/components/sections/MemoryGallery";
import { FunnyMoments } from "@/components/sections/FunnyMoments";
import { FriendshipStats } from "@/components/sections/FriendshipStats";
import { CakeExperience } from "@/components/sections/CakeExperience";
import { BirthdayLetter } from "@/components/sections/BirthdayLetter";
import { PrayerSection } from "@/components/sections/PrayerSection";
import { WishWall } from "@/components/sections/WishWall";
import { AchievementRoom } from "@/components/sections/AchievementRoom";
import { SurpriseVideo } from "@/components/sections/SurpriseVideo";
import { FireworksFinale } from "@/components/sections/FireworksFinale";
import { FinalGoodbye } from "@/components/sections/FinalGoodbye";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { ProgressNav } from "@/components/ui/ProgressNav";

/**
 * Composes the full experience in the order defined conceptually by
 * src/constants/sections.ts (SECTIONS). Reorder sections here — and in that
 * file — to change the flow.
 */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <main
        ref={mainRef}
        aria-hidden={!loaded}
        className="relative"
        style={{ visibility: loaded ? "visible" : "hidden" }}
      >
        <ProgressNav />
        <AudioToggle />

        <Hero onEnter={scrollToHero} />
        <StoryIntro />
        <Countdown />
        <GiftBox />
        <WelcomeCelebration />
        <MemoryTimeline />
        <MemoryGallery />
        <FunnyMoments />
        <FriendshipStats />
        <CakeExperience />
        <BirthdayLetter />
        <PrayerSection />
        <WishWall />
        <AchievementRoom />
        <SurpriseVideo />
        <FireworksFinale />
        <FinalGoodbye />
      </main>
    </>
  );
}
