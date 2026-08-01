"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import type { WishEntry } from "@/types";

const wishSchema = z.object({
  name: z.string().min(1, "Name is required").max(40),
  message: z.string().min(3, "Say a little more").max(280),
});
type WishFormValues = z.infer<typeof wishSchema>;

const SEED_WISHES: WishEntry[] = [
  { id: "seed-1", name: "A Friend", message: "Wishing you the happiest year ahead!", createdAt: new Date().toISOString() },
];

/**
 * Client-only wish wall. Swap the local `useState` for a real API/service
 * (see src/services) to persist wishes across visitors — this demo keeps
 * everything in-memory so it works with zero backend.
 */
export function WishWall() {
  const [wishes, setWishes] = useState<WishEntry[]>(SEED_WISHES);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WishFormValues>({ resolver: zodResolver(wishSchema) });

  const onSubmit = async (values: WishFormValues) => {
    const entry: WishEntry = {
      id: crypto.randomUUID(),
      name: values.name,
      message: values.message,
      createdAt: new Date().toISOString(),
    };
    setWishes((prev) => [entry, ...prev]);
    reset();
  };

  return (
    <SectionWrapper id="wish-wall" className="bg-royal" fullHeight={false}>
      <div className="relative z-10 mb-10 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">Wish Wall</h2>
        <p className="mt-2 text-white/60">Leave a birthday wish below.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 mb-10 flex w-full max-w-md flex-col gap-3"
        noValidate
      >
        <div>
          <input
            {...register("name")}
            placeholder="Your name"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-gold"
          />
          {errors.name && <p className="mt-1 text-xs text-blush">{errors.name.message}</p>}
        </div>
        <div>
          <textarea
            {...register("message")}
            placeholder="Write your wish..."
            rows={3}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-gold"
          />
          {errors.message && <p className="mt-1 text-xs text-blush">{errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Add Wish"}
        </Button>
      </form>

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wishes.map((wish) => (
          <GlassCard key={wish.id} className="p-5">
            <p className="text-white/90">&ldquo;{wish.message}&rdquo;</p>
            <div className="mt-3 flex items-center justify-between text-xs text-white/50">
              <span>— {wish.name}</span>
              <Heart size={14} className="text-blush" aria-hidden />
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
