# Hanif Isya Annafi — Portfolio Website

> Building plan & progress tracker. **This file is the source of truth — updated as work progresses.**

---

## 1. Objective

A premium, motion-rich personal portfolio for **Hanif Isya Annafi** (GitHub: `HanifIsya`),
built with **Next.js 16 (App Router) + React 19 + Tailwind 4 + GSAP 3**, designed from the
**OpenDesign `apple` design system**, and deployable to **Vercel**.

**Design goal:** *"premium and clean like apple.com"* — cinematic black ↔ pale-gray chapter
rhythm, single blue accent, tight grotesk typography, generous whitespace, and continuous
fluid motion. It must **not** feel like a generic dev portfolio.

---

## 2. Ground Truth — Verified GitHub Data

Contribution data was pulled from the GitHub REST API (`/contributors` + commit search across
**all branches**) for all 50 accessible repositories. **No guessing — only repos where
`HanifIsya` actually has commits are shown.**

### 2.1 Repos EXCLUDED (0 commits by HanifIsya)

All `AgilePemdigi-2026/*` class-group repos were verified as **not authored by HanifIsya** on
any branch, and are therefore **excluded** from the portfolio:

`atlas` · `CIRCLO---KELOMPOK-3` · `CIVIFLOW` · `Deksi` · `DupIssue` · `EmergencyChain` ·
`FeedbackRise-kelompok5` · `GambleWatch` · `KataWarga` · `lilac-list` · `LokerLens` ·
`MaintainGov` · `MEDSCRIBE-AI---Kelompok-7` · `Netra` · `PedestriRoute` · `ReqFlow` ·
`RTConnect` · `sage` · `SatuDuka` · `SCMS-AI-PPL-PRAK` · `SigapBPOM` · `SIMTicketingKRM` ·
`SINAPSIS_K05` · `sop-guard-ai` · `Story2Gherkin` · `TwinBug`

> ⚠️ `AgilePemdigi-2026/SimLog` **IS** included — HanifIsya is the **sole contributor (7 commits)**.

### 2.2 Repos INCLUDED — 10 featured projects

| # | Repo | My commits | Solo? | Stack | Home |
|---|------|-----------|-------|-------|-------|
| 1 | **TemplaFill** | 82 | ✅ 100% | FastAPI · Next.js 16 · Gemini 3.6 Flash · DeepSeek · RAG | github.com/HanifIsya/TemplaFill |
| 2 | **temuUNAIR-v2** | 37 | ✅ 100% | Turborepo pnpm monorepo · TypeScript · Next.js · Python ML · Postgres | github.com/HanifIsya/temuUNAIR-v2 |
| 3 | **SiBeni** | 22 | ✅ 100% | Flutter 3 · Next.js · Supabase Postgres/Auth · Offline-First | github.com/HanifIsya/SiBeni |
| 4 | **IdentraStudio** | 12 / 27 | 🤝 co-authored | Laravel · Blade · Tailwind · Auth · Payments · Chat | github.com/HanifIsya/IdentraStudio |
| 5 | **Porto-Fifi** | 11 | ✅ 100% | Next.js 16 · React 19 · Tailwind 4 · Framer Motion · Three.js · Supabase | porto-fifi.vercel.app |
| 6 | **IdentraStudio-Mobile** | 8 | ✅ 100% | Flutter · Laravel API (Chat/Order/Project/Offer) | github.com/HanifIsya/IdentraStudio-Mobile |
| 7 | **Porto-Nura** | 8 / 10 | ✅ primary | Laravel · Blade · Tailwind · Vite | github.com/HanifIsya/Porto-Nura |
| 8 | **bacaloka** | 8 | ✅ 100% | Laravel · Perpustakaan Digital (Book/Member/Loan) | github.com/HanifIsya/bacaloka |
| 9 | **find_gas_station** | 6 | ✅ 100% | Laravel API (SPBU) · Flutter frontend | github.com/HanifIsya/find_gas_station |
| 10 | **market_core** | 4 | ✅ 100% | Laravel · Multi-vendor marketplace (Seller role) | github.com/HanifIsya/market_core |

**Also credited (team contribution):** `AgilePemdigi-2026/SimLog` — 7 commits, sole contributor.

### 2.3 Project details (extracted from actual repos — READMEs, routes, models)

**TemplaFill** — AI-Powered Document Field Extraction & Multi-Format Template Population Engine.
RAG + Gemini 3.6 Flash with deterministic heuristic fallback; auto-maps variables into
`.docx` / `.xlsx` / `.pptx` preserving 100% of original formatting. Optional account tier routes
to DeepSeek with zero Google calls. **286 pytest + 64 frontend tests**, evaluation **F1 = 1.00
across 5 domains**. FastAPI backend + Next.js 16 frontend, Docker, MIT licensed.
→ *Proof points: 286 tests · F1 1.00 · 3 output formats · dual-engine fallback*

**temuUNAIR-v2** — "Lost Today, Found Together". AI lost-and-found platform for Universitas
Airlangga with matching across **text + photo + location + time**. Turborepo + pnpm workspace
monorepo (`apps/`, `packages/`, `services/`, `infra/`, `tests/`). **Docs-before-code** discipline:
`docs/00-BLUEPRINT.md` is the single source of truth, with 9 numbered doc domains (product,
design, architecture, contracts, workflow, quality, ops, project, course). Contracts
`BE-01..13` / `FE-01..12` written before implementation.
→ *Proof points: 9 doc domains · 25 numbered contracts · monorepo · ML matching pipeline*

**SiBeni** (Siaga Bencana Dini) — K3 (occupational health & safety) system for **PT Consnet
Mining**. Connects field workers (open pit, haul road, workshop) with HSE, Supervisors and
Executive Management in real time **and offline**. Flutter 3 mobile app + Next.js dashboard +
Supabase (Postgres + Auth). Ships `PRD.md`, `IMPLEMENTATION_PLAN.md`, and a **DESIGN.md v3.0**
with a 4-level K3 risk taxonomy, dual typography (Plus Jakarta Sans + JetBrains Mono),
motion/vibration tokens, and responsive NavigationBar → NavigationRail rules.
→ *Proof points: 4-level risk taxonomy · Offline-First · design system v3.0 · multi-role*

**IdentraStudio** — Laravel service-studio marketplace. Full auth, service catalogue with
admin CRUD, **payment processing, real-time chat, asset admin, and transaction history**.
Backend + Blade/Tailwind frontend + a Flutter mobile companion.

**Porto-Fifi** — A complete, production-grade portfolio site. Next.js 16 (App Router) +
React 19 + Tailwind 4, **Three.js / React-Three-Fiber** hero with soft blob + grain particles,
Framer Motion scroll reveals, anime.js staggered stats, **Supabase Auth + Postgres + RLS**
with a full **admin panel** at `/admin` (CRUD every section, drag-and-drop base64 upload,
cloud sync), `next/font` Plus Jakarta Sans + JetBrains Mono, Vercel-deployed.
→ *Proof points: Three.js + R3F · Supabase RLS · admin panel · Vercel shipped*

**IdentraStudio-Mobile** — Flutter client + `laravel-identra-mobile` API. Models: `Chat`,
`Message`, `Offer`, `Order`, `Project`, `ProjectFile`, `Service`, `Transaction`.

**Porto-Nura** — Laravel portfolio with `HeroSlide`, `Education`, `Experience`, `Setting`
models; Tailwind + Vite asset pipeline; role-aware admin controllers.

**bacaloka** — Perpustakaan Digital (digital library). `Buku` (Book), `Anggota` (Member),
`Pengembalian` (Return) + Admin/User controller split, dual-role dashboards.

**find_gas_station** — SPBU (gas station) finder. `gas_station_backend` (Laravel API,
`Spbu` model, `routes/api.php`) + `gas_station_frontend` (Flutter, `models/spbu.dart`).

**market_core** — Multi-vendor marketplace. `Produk`, `Keranjang` (cart), `Order`, plus a
**Seller** role with separate product/order controllers alongside buyer routes.

**SimLog** — TypeScript project under `AgilePemdigi-2026`; sole contributor (7 commits).

### 2.4 Aggregate stats (real, derived)

- **11** repositories credited · **205** commits authored by HanifIsya
  (198 across the ten featured repos + 7 in `AgilePemdigi-2026/SimLog`)
- **9** of the 10 featured repos are **solo-authored**
- **5** distinct core stacks: TypeScript, PHP/Laravel, Dart/Flutter, Python, Astro
- **286** automated tests in a single repo (TemplaFill)
- Commit velocity spans **Feb → Oct 2026**, peaking at 99 commits in September

> **Counting method.** Commits were counted via
> `GET /repos/{owner}/{repo}/commits?per_page=100` on the default branch of all
> eleven repos, filtered to `author = HanifIsya`. The `/contributors` endpoint
> was used to cross-check (198 + 7 = 205). The two methods agree.

---

## 3. Design System — OpenDesign `apple`

Source: `od://design-systems/apple/DESIGN.md` (read via OpenDesign MCP).
Combined with `od://skills/high-end-visual-design/SKILL.md` (anti-slop rules) and
`od://skills/design-taste-frontend/SKILL.md`.

### 3.1 Color tokens

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1d1d1f` | Primary text on light |
| `--ink-secondary` | `#6e6e73` | Body secondary, metadata |
| `--paper` | `#f5f5f7` | Light chapter canvas |
| `--white` | `#ffffff` | Retail/white surfaces |
| `--black` | `#000000` | Dark chapter canvas |
| `--blue` | `#0071e3` | Primary action / focus |
| `--blue-link` | `#0066cc` | Inline link on light |
| `--blue-bright` | `#2997ff` | Link on dark |
| `--hairline` | `#d2d2d7` | Soft dividers, borders |
| `--hairline-strong` | `#86868b` | Field outlines |
| `--graphite-1..4` | `#272729` `#262629` `#28282b` `#2a2a2c` | Dark elevated surfaces |
| `--utility-dark` | `#424245` | Dark/text crossover |

> **Rule:** blue is *scarce and purposeful*. If everything is blue, hierarchy collapses.

### 3.2 Typography

- **Display:** `Plus Jakarta Sans` (600/700) — tight leading (1.02–1.08), negative tracking
  at display sizes. Chosen over banned Inter/Roboto/Helvetica, and it matches the design
  system already shipped in the user's own SiBeni + Porto-Fifi work.
- **Text:** `Plus Jakarta Sans` (400/500).
- **Mono:** `JetBrains Mono` — telemetry layer: repo stats, commit counts, stack tags,
  section indices. This is the "developer instrumentation" signature of the site.
- Scale (Apple DS): Hero XL 80/600 → Section 48/600 → Product 40/600 → Card 28/600 →
  Utility 24/600 → Subhead 19/600 → Body 17/400 → Control 14 → Micro 12 → Legal 10.

### 3.3 Radius / spacing / depth

- Radius: `5` · `8–12` · `16–18` · `28–36` · `56/100` · `980` (capsule) · `50%`
- Spacing base unit: **8px**
- Depth is **restrained**: tonal contrast + surface stepping over heavy shadows.
  Elevation L2 = `rgba(0,0,0,0.08)–0.22` only.

### 3.4 Layout rhythm — "cinematic chapters"

The page alternates **absolute black** and **pale gray** full-bleed chapters, exactly like
apple.com. Section separation comes from *surface change*, not decorative dividers.

---

## 4. Information Architecture

| # | Section | Canvas | Purpose |
|---|---------|--------|---------|
| 0 | **Nav** | translucent | Compact pill nav, blur, scroll-reactive |
| 1 | **Hero** | `#000` | Name, role, tagline, live GitHub stat chips, scroll cue |
| 2 | **Selected Work** | `#f5f5f7` | 3 flagship projects, pinned horizontal scroll |
| 3 | **All Work** | `#000` | 10-project bento grid + filterable stack tags |
| 4 | **Stack / Capabilities** | `#f5f5f7` | Marquee of technologies + grouped capability cards |
| 5 | **GitHub Telemetry** | `#000` | Real contribution heatmap, live repo stats |
| 6 | **About** | `#fff` | Bio, journey timeline, education/experience |
| 7 | **Contact / CTA** | `#000` | Big capsule CTA, social links, footer |

---

## 5. Motion System (GSAP 3)

Every animation is **fluid, interruptible, and reduced-motion aware**.

| Technique | Where | Detail |
|---|---|---|
| **SplitText** reveal | Hero headline, section titles | Word/line mask-reveal, `y: 110%` → `0`, `expo.out` |
| **ScrollTrigger scrub** | Hero parallax, chapter scale | `scrub: 1`, smooth-scrub for lag-free catch-up |
| **Stagger reveal** | Cards, list items | `stagger: 0.08`, `y: 40`, `opacity`, `clip-path` |
| **Pinned horizontal scroll** | Selected Work | Pin section, translate track by scroll distance |
| **Counter tween** | Stat numbers | `gsap.to` with `snap`, `onUpdate` → formatted text |
| **Marquee** | Stack section | Infinite `x` loop, `modifiers` wrap |
| **Magnetic / cursor-follow** | Buttons, project cards | `quickTo` for cheap per-frame updates |
| **Scroll-linked nav** | Nav bar | Shrink + blur-in after 40px, section-aware active pill |
| **Hover micro-interaction** | Project cards | 3D tilt + image scale + accent ring |
| **SVG path draw** | Contact divider, icons | `strokeDashoffset` animation |

**Rules (from `gsap-react` / `gsap-scrolltrigger` / `gsap-timeline` skills):**
- Use the **`useGSAP()` hook** from `@gsap/react` with a **scope ref** → auto cleanup.
- Register plugins once: `gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)`.
- Use **timelines + position parameters** (`"<"`, `"+=0.2"`, labels) for sequencing.
- `ScrollTrigger.refresh()` on layout change; `matchMedia` for reduced motion.
- `prefers-reduced-motion: reduce` → all scroll animations become instant/static.

---

## 6. Tech Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 16.4.3** (App Router, Turbopack) |
| UI | **React 19.3**, **TypeScript 5** |
| Styling | **Tailwind CSS 4** (`@theme` tokens, no config file) |
| Animation | **GSAP 3** + `@gsap/react` (`useGSAP`) + ScrollTrigger + SplitText |
| Fonts | `next/font` → Plus Jakarta Sans + JetBrains Mono (self-hosted, zero CLS) |
| Icons | Custom inline SVG (ultra-light, 1.25px stroke) — no Lucide |
| Data | Typed local data module `src/data/projects.ts` (verified GitHub facts) |
| Deploy | **Vercel** via Vercel MCP + GitHub integration |

---

## 7. Progress Tracker

### Phase 1 — Foundation ✅
- [x] Verify GitHub identity & authenticate
- [x] Enumerate all 50 repos; compute per-repo contribution counts
- [x] **Exclude all class-group repos with 0 contributions by HanifIsya**
- [x] Read 10 target repo READMEs / route files / models for accurate copy
- [x] Read OpenDesign `apple` DESIGN.md + 6 relevant skills
- [x] Scaffold Next.js 16 + React 19 + Tailwind 4
- [x] Write `PLAN.md` + `DESIGN.md`

### Phase 2 — Design system ✅
- [x] Tailwind `@theme` tokens (color / type / radius / spacing / easing)
- [x] `globals.css` — base, typography scale, utilities, reduced-motion
- [x] Motion primitives: `useGsap` (scoped, dependency-aware), easing + duration tokens,
      `prefers-reduced-motion` guard, `useMagnetic` (quickTo-based)

### Phase 3 — Content ✅
- [x] `src/data/projects.ts` — 10 projects w/ verified facts, stack, links, metrics
- [x] `src/data/site.ts` — identity, nav, socials, GitHub profile
- [x] `public/avatar.png` — GitHub avatar (real `H` identicon)
- [x] Commit-velocity series built from the real API history (Feb–Oct 2026)

### Phase 4 — Build sections ✅
- [x] Nav (scroll-reactive, section-aware, adaptive contrast) + Mobile sheet menu
- [x] Hero (SplitText reveal, parallax, live stat counters, portrait float)
- [x] Selected Work (pinned horizontal scroll, 3 flagships, progress rail)
- [x] All Work (bento grid, 10 projects, domain filter, team-contribution note)
- [x] Stack / Capabilities (infinite marquee + 4 capability cards)
- [x] GitHub Telemetry (per-repo bars, velocity chart, headline counters)
- [x] About (bio, facts grid, journey timeline)
- [x] Contact CTA (staggered line reveal, capsule CTAs, socials)
- [x] Footer (server component, cached year)

### Phase 5 — QA ✅
- [x] `npm run build` — clean, fully static (`○ /`, revalidate 15m)
- [x] `npm run lint` — 0 errors, 0 warnings
- [x] Browser QA via Playwright (system Chrome) — desktop 1440×900 + mobile 390×844
- [x] 0 console errors on both viewports
- [x] 0 horizontal overflow on both viewports
- [x] Reduced-motion verified (content visible, counters land on final values, no pin/scrub)
- [x] Accessibility verified (1× H1, ordered headings, all links/buttons labelled, alt text, focus ring)
- [x] Mobile menu verified (open → scroll to section → close → body scroll unlocked)
- [x] Screenshot review → 7 design fixes applied (artwork saturation, card spacing,
      nav contrast, velocity bar height, logo duplication, monogram collisions, mobile menu)

### Phase 6 — Ship ⏳
- [ ] Create GitHub repo `HanifIsya/hanifisya-portfolio`
- [ ] Push code
- [ ] Connect + deploy via Vercel MCP
- [ ] Verify live URL

---

## 8. Open Items / Placeholders (user to edit later)

Marked `TODO` in `src/data/site.ts`:
- Tagline / one-line role statement
- Location
- Email
- LinkedIn / X / Instagram handles
- Availability status

---

## 9. Change Log

- **v1.0** — Plan created, GitHub data verified & filtered, design system locked to OpenDesign `apple`.
- **v1.1** — Commit counts reconciled across three API methods (default-branch list,
  `/contributors`, all-branch scan) → final figure **205**. Commit-velocity series
  built from real history instead of a placeholder series.
- **v1.2** — All seven sections built. QA pass applied 7 design fixes:
  artwork saturation (radial → layered linear), bento card spacing (fixed auto-rows
  causing voids), nav contrast on light chapters, velocity bar height (`items-end`
  collapsed the bars to zero), logo text duplication, monogram collisions
  (TF/TU/IS/PF/IM/PN/BA/FG/MC), and the mobile sheet (portalled to `body` so
  `position: fixed` resolves against the viewport).
- **v1.3** — Lint clean (0/0), build static, reduced-motion + a11y verified,
  mobile menu interaction verified end to end.
