# DESIGN.md — Design Contract

> Contract between the OpenDesign `apple` design system and this implementation.
> Every value below is intentional. Deviating requires updating this file.

---

## 1. Design Read

> *"Reading this as: **developer portfolio** for **recruiters / engineering leads / potential
> collaborators**, with an **Apple-cinematic, premium-minimal** language, leaning toward
> **OpenDesign `apple` design system + GSAP scroll choreography**."*

**Audience decides the aesthetic.** A recruiter scanning for signal needs: who, what stack,
proof of depth, and a fast path to contact. Motion must never delay that. So: motion is
*ambient and continuous*, never a gate.

---

## 2. Visual Thesis

> **"Black chapters of silence, punctuated by pale-gray rooms of light."**

The page is a **sequence of chapters**, not a stack of sections. Each chapter is a full-bleed
canvas that owns the viewport. The reader experiences *scrolling through a film*, where the
act of scrolling drives the edit. Apple does this with static HTML. We do it with a timeline.

### The Three Laws

1. **Contrast does the separating.** Never a decorative divider line between chapters.
   Black → Pale Gray → Black. The surface change *is* the transition.
2. **Blue is a spice, not a meal.** `#0071e3` appears on primary actions, focus rings, and
   one or two accents per chapter. Everything else is neutral.
3. **The interface disappears.** No drop-shadow stacks, no glassmorphism clichés, no
   multi-hue gradients, no neon. Depth comes from surface stepping and light.

---

## 3. Color System

### 3.1 Tokens

```
--c-black        #000000   dark chapter canvas
--c-ink         #1d1d1f   primary text on light
--c-ink-2       #6e6e73   secondary text, metadata
--c-ink-3       #86868b   tertiary / field outline
--c-paper       #f5f5f7   light chapter canvas
--c-white       #ffffff   white surface
--c-blue        #0071e3   primary action + focus
--c-blue-link   #0066cc   inline link on light
--c-blue-lite   #2997ff   link on dark
--c-hairline    #d2d2d7   soft divider
--c-graphite-1  #272729   dark elevated surface
--c-graphite-2  #262629   dark utility surface
--c-graphite-3  #28282b   dark elevated surface
--c-graphite-4  #2a2a2c   darkest elevated step
--c-utility     #424245   dark/text crossover
```

### 3.2 Usage matrix

| Canvas | Text | Sub-text | Rule | Accent |
|---|---|---|---|---|
| `#000000` | `#f5f5f7` | `#86868b` | `rgba(255,255,255,.12)` | `#2997ff` |
| `#f5f5f7` | `#1d1d1f` | `#6e6e73` | `#d2d2d7` | `#0071e3` |
| `#ffffff` | `#1d1d1f` | `#6e6e73` | `#e5e5ea` | `#0071e3` |

### 3.3 Forbidden

- ❌ Gradients as decoration (only a subtle radial "light bloom" on the black hero is allowed)
- ❌ Colored glow / neon
- ❌ More than one accent hue per chapter
- ❌ Colored shadows — shadows are neutral or absent

---

## 4. Typography

| Role | Family | Size / Weight | Line-height | Tracking |
|---|---|---|---|---|
| Hero XL | Plus Jakarta Sans 600 | `clamp(3.2rem, 9vw, 5rem)` | 1.02 | -0.03em |
| Hero L | Plus Jakarta Sans 600 | `clamp(2.6rem, 6.5vw, 3.5rem)` | 1.05 | -0.025em |
| Section Display | Plus Jakarta Sans 600 | `clamp(2.1rem, 4.6vw, 3rem)` | 1.08 | -0.02em |
| Product Heading | Plus Jakarta Sans 600 | `clamp(1.6rem, 3vw, 2.5rem)` | 1.1 | -0.015em |
| Card Title | Plus Jakarta Sans 600 | 1.75rem | 1.14 | -0.008em |
| Utility Heading | Plus Jakarta Sans 600 | 1.5rem | 1.17 | -0.01em |
| Subhead | Plus Jakarta Sans 600 | 1.1875rem | 1.21 | 0.01em |
| Body | Plus Jakarta Sans 400 | 1.0625rem | 1.47 | -0.022em |
| Control | Plus Jakarta Sans 500 | 0.875rem | 1.35 | -0.014em |
| Micro | Plus Jakarta Sans 500 | 0.75rem | 1.33 | -0.01em |
| **Telemetry** | **JetBrains Mono 500** | 0.6875rem | 1.4 | 0.06em (**uppercase**) |

**The mono layer is the signature.** Repo names, commit counts, stack tags, section indices,
and metric values are all set in JetBrains Mono uppercase. This is what makes it read as a
*developer's* portfolio rather than a generic template — it's the "instrumentation" layer.

**Banned:** Inter, Roboto, Arial, Open Sans, Helvetica.

---

## 5. Spacing & Grid

- **Base unit:** 8px
- **Section padding:** `clamp(6rem, 14vh, 11rem)` block, `clamp(1.25rem, 5vw, 2.5rem)` inline
- **Container:** `max-w-[1200px]`, `mx-auto`
- **Wide container:** `max-w-[1440px]` (hero, pinned track)
- **Gutters:** 24px mobile → 32px tablet → 40px desktop

### Breakpoints

| Name | Width | Change |
|---|---|---|
| Mobile | < 640px | 1 column, `px-5`, stacked |
| Tablet | 640–1024px | 2 columns, asymmetric bento |
| Desktop | ≥ 1024px | 3–4 columns, full bento |
| Wide | ≥ 1440px | max chapter breathing room |

> **Mobile override is mandatory:** any asymmetric layout collapses to single column with
> generous vertical gaps. `min-h-[100dvh]`, never `h-screen`.

---

## 6. Radius Scale

| Radius | Use |
|---|---|
| `5px` | tiny tags, inline links |
| `8–12px` | standard controls, compact fields |
| `16–18px` | cards, module frames |
| `28–36px` | large modules, spotlight shells |
| `56px` | capsules, large pills |
| `980px` | full pill CTA |
| `50%` | circular media/controls |

---

## 7. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 | flat `#000` / `#f5f5f7` / `#fff` | narrative stages |
| 1 | hairline border `#d2d2d7` / `rgba(255,255,255,.12)` | utility cards, dividers |
| 2 | soft shadow `rgba(0,0,0,.08)`→`.22` | highlighted cards only |
| 3 | graphite step `#272729`→`#2a2a2c` | overlays, media controls |
| A11y | blue focus ring `#0071e3` | keyboard focus |

**No harsh shadows. No `shadow-md` stacks. No glow.**

---

## 8. Motion Contract

### 8.1 Easing tokens

| Token | Curve | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrances, reveals |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | micro-interactions |
| `--ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | hovers, state changes |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | playful pops only |

> **Banned:** `linear`, `ease-in-out`, and any instant state change.

### 8.2 Duration tokens

| Token | Value | Use |
|---|---|---|
| `--d-fast` | 0.2s | micro (hover, press) |
| `--d-base` | 0.45s | standard tween |
| `--d-slow` | 0.8s | reveal, mask |
| `--d-scrub` | 1.0s | scroll scrub smoothing |

### 8.3 Motion inventory

| Element | Technique | Detail |
|---|---|---|
| Hero headline | SplitText + timeline | per-line `y:110%` mask reveal, `expo.out`, stagger 0.08 |
| Hero glow | scrub parallax | `yPercent` tied to scroll, `scrub:1` |
| Hero portrait | scrub parallax + scale | subtle depth |
| Section titles | ScrollTrigger batch | `y:36` + opacity, `once:true` |
| Cards | ScrollTrigger batch | stagger 0.08, `clip-path` inset reveal |
| Pinned work track | ScrollTrigger pin + x | translate X by scroll distance |
| Stat counters | `gsap.to` + snap | `onUpdate` → `Intl.NumberFormat` |
| Tech marquee | infinite x loop | `modifiers` wrap, `repeat:-1` |
| Nav state | ScrollTrigger / scroll listener | shrink + blur after 40px |
| Card hover | `quickTo` + tilt | magnetic pointer, 3D tilt, image scale 1.04 |
| Footer divider | SVG draw | `strokeDashoffset` scrub |
| Progress rail | scroll spy | active section pill indicator |

### 8.4 GSAP implementation rules

1. `useGSAP()` hook from `@gsap/react` — always with a **scope ref**.
2. `gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)` once, client-side.
3. **Timelines** for anything multi-step; position params (`"<"`, `"+=0.2"`) and `addLabel()`.
4. `ScrollTrigger.refresh()` after layout-affecting changes.
5. `gsap.matchMedia()` — `(prefers-reduced-motion: reduce)` → no scrub, no pin, instant states.
6. All transforms on `transform`/`opacity` only (compositor-friendly).
7. `will-change` applied only during active animation.

### 8.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Plus GSAP `matchMedia` guards so pins/scrubs never initialize.

---

## 9. Component Inventory

| Component | Notes |
|---|---|
| `Nav` | compact, translucent blur, scroll-reactive, section-aware pill |
| `Hero` | black canvas, split reveal, glow bloom, mono stat chips, scroll cue |
| `ProjectCard` | bento variant, hover tilt, stack chips, GitHub link |
| `ProjectRow` | horizontal-scroll variant for pinned track |
| `StatChip` | mono label + value, hairline border |
| `TechMarquee` | infinite loop, edge fade mask |
| `TelemetryPanel` | mono grid of real GitHub numbers |
| `Timeline` | vertical journey with hairline rail + node dots |
| `CTA` | `980px` pill, primary + ghost |
| `Footer` | mono metadata, social row, back-to-top |
| `Reveal` | generic ScrollTrigger reveal wrapper |
| `SplitHeading` | reusable SplitText heading |

---

## 10. Anti-Slop Checklist (from `design-taste-frontend` + `high-end-visual-design`)

- [x] No banned fonts (Inter / Roboto / Arial / Helvetica)
- [x] No stock thick-stroke icon sets — custom 1.25px SVG
- [x] No generic 1px gray borders as the *only* containment — use surface stepping
- [x] No harsh dark drop shadows
- [x] No edge-to-edge sticky nav glued to top — nav is floating capsule
- [x] No symmetric 3-column bootstrap grid — asymmetric bento
- [x] No `linear` / `ease-in-out` easing
- [x] No lorem ipsum — all copy is real, from real repos
- [x] No placeholder images — real avatar, CSS-rendered project artwork
- [x] Asymmetry collapses gracefully on mobile
- [x] `min-h-[100dvh]` not `h-screen`
- [x] Every animation has a reduced-motion path

---

## 11. Change Log

- **v1.0** — Contract created from OpenDesign `apple` + `high-end-visual-design` + `design-taste-frontend`.
