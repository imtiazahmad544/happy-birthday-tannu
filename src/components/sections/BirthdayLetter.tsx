"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { letter } from "@/data/content";
import { useAudio } from "@/providers/AudioProvider";

export function BirthdayLetter() {
  const [open, setOpen] = useState(false);
  const { playSfx } = useAudio();

  const handleOpen = () => {
    playSfx("envelope");
    setOpen(true);
  };

  return (
    <SectionWrapper id="birthday-letter" className="bg-deep-navy">
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">A Letter for You</h2>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              onClick={handleOpen}
              className="relative flex h-56 w-80 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5E6C8] to-[#E8D5A8] shadow-2xl"
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 90 }}
              aria-label="Open the letter"
            >
              <div
                className="absolute left-0 top-0 h-0 w-0 border-l-[160px] border-r-[160px] border-t-[112px] border-l-transparent border-r-transparent border-t-[#D8C088]"
                aria-hidden
              />
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-blush text-lg font-bold text-white shadow-lg">
                ✉
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="max-w-xl bg-[#FFF8E7]/95 p-8 text-ink">
                <p className="font-serif text-xl">{letter.salutation}</p>
                <div className="mt-4 space-y-3 font-serif text-base leading-relaxed">
                  {letter.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.4, duration: 0.6 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                <p className="mt-6 text-right font-serif italic">{letter.signature}</p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
