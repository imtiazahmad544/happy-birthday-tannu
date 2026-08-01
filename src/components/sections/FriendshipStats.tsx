import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { friendshipStats } from "@/data/content";

export function FriendshipStats() {
  return (
    <SectionWrapper id="friendship-stats" className="bg-royal" fullHeight={false}>
      <div className="relative z-10 mb-10 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">Our Friendship, By the Numbers</h2>
      </div>
      <div className="relative z-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {friendshipStats.map((stat) => (
          <GlassCard key={stat.id} glow className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-mono text-3xl font-bold text-gold"
            />
            <span className="text-xs uppercase tracking-widest text-white/60">{stat.label}</span>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
