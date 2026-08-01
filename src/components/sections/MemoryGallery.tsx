"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { gallery } from "@/data/content";
import type { GalleryItem } from "@/types";

const TAGS: (GalleryItem["tag"] | "all")[] = ["all", "funny", "travel", "friends", "candid", "throwback"];

export function MemoryGallery() {
  const [filter, setFilter] = useState<(typeof TAGS)[number]>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.tag === filter)),
    [filter]
  );

  return (
    <SectionWrapper id="memory-gallery" className="bg-deep-navy" fullHeight={false}>
      <div className="relative z-10 mb-8 flex flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">Gallery</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {TAGS.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={filter === tag ? "primary" : "glass"}
              onClick={() => setFilter(tag)}
              className="capitalize"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative z-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10"
            style={{ aspectRatio: `${item.width}/${item.height}` }}
          >
            <div className="relative h-full w-full bg-white/5">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-white/70 hover:text-white"
          >
            <X size={28} />
          </button>
          <div className="relative h-[70vh] w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" />
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
