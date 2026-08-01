# Happy Birthday, Tannu 🎂

A cinematic, interactive birthday experience built with Next.js 15, React 19,
TypeScript, GSAP, Three.js/React Three Fiber, and Howler.js.

This is a **scaffold**: the architecture, animation system, and all 18
sections are wired up and working with placeholder content. Follow the steps
below to make it real.

---

## 1. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Personalize content (the only file you *need* to edit)

Open `src/data/content.ts` and replace:

- `siteConfig` — recipient name, real birthday date/time (with timezone), your name
- `memories` — timeline entries (date, title, caption, image/video path)
- `gallery` — gallery photos (path, tag, aspect ratio)
- `funnyMoments` — inside jokes / memes
- `friendshipStats` — years, photo count, trips, etc.
- `achievements` — personality "achievement" cards
- `letter` — the birthday letter paragraphs
- `prayer` — dua text (Urdu/Arabic), English translation, audio path

## 3. Add real assets

Drop files into `public/`:

```
public/
  images/
    memories/        → memory timeline photos (placeholder-1.jpg ... )
    gallery/          → gallery photos (placeholder-1.jpg ... )
    og-cover.jpg       → social share preview image
    surprise-video-poster.jpg
    surprise-video-placeholder.mp4   → the montage video
  audio/
    ambient-intro.mp3      → plays during/after the loader
    celebration-theme.mp3  → plays after the gift box opens
    prayer-dua.mp3
  icon-192.png / icon-512.png   → PWA icons
```

Optional SFX (register + call via `useAudio()` — see
`src/providers/AudioProvider.tsx`): click, hover, confetti, envelope,
typing, cake-cut, cheer, sparkle. Add files under `public/audio/sfx/` and
call `registerSfx("click", "/audio/sfx/click.mp3")` once (e.g. in `layout.tsx`
or a small `useEffect` in `page.tsx`), then `playSfx("click")` anywhere.

## 4. Architecture notes

- **Section flow** is defined in `src/constants/sections.ts` and assembled in
  `src/app/page.tsx`. Reorder both to change the experience order.
- **3D sections** (`GiftBox`, `CakeExperience`) use React Three Fiber and are
  dynamically imported with `ssr: false` — Three.js needs a real WebGL
  context, so this is required, not optional.
- **Audio** is centralized in `AudioProvider` (Howler.js) — background music
  crossfades, one mute toggle controls everything globally.
- **Smooth scroll** (Lenis) is wired into GSAP's ticker in
  `SmoothScrollProvider` so `ScrollTrigger` animations stay in sync; it's
  automatically disabled for users with `prefers-reduced-motion`.
- **Mic-based candle blow-out** (`useMicBlowDetection`) requires a user
  gesture to request mic access (browser requirement) and falls back to a
  tap button if mic access is denied or unsupported.

## 5. Performance & accessibility checklist before shipping

- [ ] Compress all images to WebP/AVIF (Next/Image handles format negotiation
      automatically if you serve `.jpg`/`.png` — but pre-compressing large
      originals still helps)
- [ ] Keep the surprise video under ~15MB or host it externally (e.g.
      Cloudinary/Mux) and embed via `<video src="https://...">`
      instead of bundling it in `/public`
  - [ ] Run `npm run build` and check the Lighthouse report
  - [ ] Test with `prefers-reduced-motion` enabled
  - [ ] Test keyboard-only navigation (Tab through CTAs, close modals with Esc
        — currently modals close on backdrop click; add `onKeyDown` Esc
        handlers if you want strict WCAG AA)
  - [ ] Verify mic permission flow on iOS Safari specifically (strictest
        autoplay/mic policies)

## 6. Deploy

```bash
vercel
```

Set `NEXT_PUBLIC_SITE_URL` in your Vercel project settings to the deployed
URL so Open Graph previews resolve correctly.

---

### Folder structure

```
src/
  app/            → Next.js App Router (layout, page, manifest)
  components/
    sections/     → the 18 experience sections
    three/        → React Three Fiber scenes (gift box, cake)
    ui/           → shared primitives (Button, GlassCard, etc.)
  hooks/          → useCountdown, useMicBlowDetection, useScrollReveal
  providers/      → AudioProvider, SmoothScrollProvider
  data/           → content.ts — all editable copy/content lives here
  constants/      → sections.ts — drives page order + theming
  types/          → shared TypeScript interfaces
  lib/            → utils (cn, lerp, clamp, id helpers)
```
