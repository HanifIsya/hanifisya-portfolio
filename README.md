# hanifisya-portfolio

Personal portfolio for **Hanif Isya Annafi** — built with Next.js 16, React 19,
Tailwind CSS 4, and GSAP 3.

**Live:** https://hanifisya-portfolio.vercel.app

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 (`@theme` tokens, no config file) |
| Animation | GSAP 3 + `@gsap/react` — ScrollTrigger, SplitText |
| Fonts | `next/font` — Plus Jakarta Sans + JetBrains Mono |
| Icons | Custom inline SVG (1.25px stroke) |
| Deploy | Vercel |

---

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

---

## Editing your content

Almost everything you'll want to change lives in **two files**.

### 1. `src/data/site.ts` — who you are

```ts
export const site = {
  name: "Hanif Isya Annafi",
  role: "Full-stack & AI Engineer",              // ← edit
  tagline: "I build AI extraction pipelines…",  // ← edit
  bio: "Full-stack and AI engineer building…", // ← edit
  location: "Surabaya, Indonesia",              // ← edit
  email: "hanifisya.annafi02@gmail.com",        // ← edit
  availability: "Open to new opportunities",    // ← edit
  socials: [ /* ← edit */ ],
};
```

Every field above is marked with a `// TODO` comment.

### 2. `src/data/projects.ts` — what you've built

Each project is a typed object. `commits` and `totalCommits` are real numbers
pulled from the GitHub API.

```ts
{
  name: "TemplaFill",
  title: "TemplaFill",
  tagline: "AI document engine that fills your templates — perfectly.",
  description: "…",
  commits: 82,          // ← your commits
  totalCommits: 82,     // ← all commits in the repo
  solo: true,           // ← shows the "Solo" badge
  domain: "AI / ML",    // ← drives the filter tabs
  stack: ["FastAPI", "Next.js 16", …],
  metrics: [{ label: "Tests", value: "286" }],
  repo: "https://github.com/HanifIsya/TemplaFill",
  live: "https://…",    // optional
  hue: 212,             // ← accent colour for the generated artwork
  span: "wide",         // ← "wide" | "tall" | "normal" (bento size)
}
```

**To add a project:** copy a block, change the values, and add it to the
`projects` array. The featured track (`featured`) and the bento grid
(`AllProjects`) pick it up automatically.

**To refresh the commit counts** from the GitHub API:

```bash
gh api "repos/HanifIsya/REPO/commits?author=HanifIsya&per_page=100" \
  --jq 'length'
```

---

## Design system

All tokens live in `src/app/globals.css` under `@theme`. The contract —
colors, type scale, radius, motion easings — is documented in
**[`DESIGN.md`](./DESIGN.md)**, derived from the OpenDesign `apple` design
system.

Key decisions:

- **Chapters.** The page alternates `#000000` and `#f5f5f7` full-bleed
  surfaces. Contrast does the separating; there are no decorative dividers.
- **One accent.** `#0071e3` is used for actions and focus only.
- **Mono layer.** Repo names, counts, and labels are set in JetBrains Mono
  uppercase — the "instrumentation" signature that makes it read as a
  developer's portfolio.
- **No stock imagery.** Every project visual is generated from its own name
  and accent hue as pure CSS/SVG, so it stays crisp and costs no payload.

---

## Motion

Motion is implemented in `src/lib/gsap.ts` and the per-section components.

| Primitive | Purpose |
|---|---|
| `useGsap(setup, scope, deps)` | Scoped `useGSAP` with auto-cleanup |
| `useMagnetic(strength)` | Pointer-follow using `gsap.quickTo` |
| `EASE` / `DURATION` | Easing + duration tokens matching `DESIGN.md` |
| `prefersReducedMotion()` | Guard for all scroll/pin behaviour |

Techniques in use: SplitText masked line reveals, ScrollTrigger scrub
parallax, a pinned horizontal scroll track, batched card reveals, animated
counters, an infinite marquee, 3D card tilt, and a scroll-spy nav.

**Accessibility:** every animation has a reduced-motion path. Under
`prefers-reduced-motion: reduce`, pins and scrubs never initialise and all
content renders in its final state.

---

## QA

A Playwright harness lives in `scripts/qa.mjs`. It captures screenshots at
desktop (1440×900) and mobile (390×844), scrolls through every chapter, and
fails on console errors or horizontal overflow.

```bash
npm run dev                # in one terminal
node scripts/qa.mjs        # in another
# → screenshots in ./qa
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, viewport
│   ├── page.tsx          # section composition
│   └── globals.css       # design tokens
├── components/
│   ├── nav.tsx           # scroll-reactive nav
│   ├── mobile-menu.tsx   # portalled mobile sheet
│   ├── hero.tsx          # split-text hero + counters
│   ├── selected-work.tsx # pinned horizontal track
│   ├── all-projects.tsx  # bento grid + filter
│   ├── project-card.tsx  # tilt hover card
│   ├── project-artwork.tsx # generated CSS artwork
│   ├── stack.tsx         # marquee + capabilities
│   ├── github-telemetry.tsx # real contribution data
│   ├── about.tsx
│   ├── contact.tsx
│   ├── footer.tsx
│   ├── motion.tsx        # Reveal + SplitHeading
│   └── icons.tsx         # custom SVG icon set
├── data/
│   ├── site.ts           # ← your identity
│   └── projects.ts       # ← your projects
└── lib/
    └── gsap.ts           # motion primitives
```

---

## License

MIT
