"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { site } from "@/data/site";
import { stats } from "@/data/projects";
import { useGsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { ArrowDown, ArrowUpRight, MapPin } from "@/components/icons";

/** Live-ish counters driven by GSAP, formatted with Intl. */
function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useGsap(() => {
    const el = numRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = value.toLocaleString("en-US") + suffix;
      return;
    }

    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: "power3.out",
      delay: 1.2,
      snap: { v: 1 },
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toLocaleString("en-US") + suffix;
      },
    });
  }, numRef);

  return (
    <div className="flex flex-col gap-1.5">
      <span ref={numRef} className="text-utility tabular-nums text-white">
        0
      </span>
      <span className="text-telemetry text-ink-3">{label}</span>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const rootEl = root.current;
    const headline = headlineRef.current;
    if (!rootEl || !headline) return;

    if (prefersReducedMotion()) {
      gsap.set(rootEl.querySelectorAll("[data-hero]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // --- Headline: masked line reveal ---
      const split = new SplitText(headline, {
        type: "lines",
        mask: "lines",
        linesClass: "gsap-split-line",
        autoSplit: true,
      });

      const tl = gsap.timeline({ delay: 0.25 });

      tl.set(split.lines, { yPercent: 115 })
        .to(split.lines, {
          yPercent: 0,
          duration: 1.15,
          ease: "expo.out",
          stagger: 0.1,
        })
        .fromTo(
          "[data-hero='kicker']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: EASE.expo },
          "<0.25",
        )
        .fromTo(
          "[data-hero='lead']",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: EASE.expo },
          "<0.1",
        )
        .fromTo(
          "[data-hero='cta'] > *",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: EASE.expo, stagger: 0.08 },
          "<0.05",
        )
        .fromTo(
          "[data-hero='chip']",
          { opacity: 0, y: 14, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: EASE.expo, stagger: 0.06 },
          "<0.05",
        )
        .fromTo(
          "[data-hero='avatar']",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.9, ease: EASE.expo },
          "<0.2",
        );

      // --- Scroll parallax ---
      const glow = glowRef.current;
      if (glow) {
        gsap.to(glow, {
          yPercent: 32,
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const avatar = avatarRef.current;
      if (avatar) {
        gsap.to(avatar, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // --- Avatar idle float ---
      if (avatar) {
        gsap.to(avatar, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }

      // --- Scroll cue ---
      gsap.to("[data-hero='cue']", {
        y: 6,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.4,
      });
    }, rootEl);

    return () => ctx.revert();
  }, root);

  return (
    <section
      ref={root}
      id="top"
      className="grain relative flex min-h-[100dvh] items-center overflow-hidden bg-black pt-28 pb-20 sm:pt-32"
    >
      {/* Bloom — the only gradient on the site, and it lives here. */}
      <div
        ref={glowRef}
        aria-hidden
        className="bloom left-1/2 top-[-20%] h-[42rem] w-[42rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.5),rgba(0,113,227,0)_68%)]"
      />
      <div
        aria-hidden
        className="bloom left-[8%] top-[45%] hidden h-[26rem] w-[26rem] bg-[radial-gradient(circle_at_center,rgba(41,151,255,0.22),rgba(41,151,255,0)_70%)] lg:block"
      />

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-4xl">
            <div
              data-hero="kicker"
              className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 opacity-0"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-telemetry text-paper/80 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-lite opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-lite" />
                </span>
                {site.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 text-telemetry text-ink-3">
                <MapPin className="h-3.5 w-3.5" />
                {site.location}
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-display-xl text-white"
            >
              {site.name} builds{" "}
              <span className="text-ink-3">software that</span> holds up.
            </h1>

            <p
              data-hero="lead"
              className="mt-7 max-w-2xl text-body text-ink-2 opacity-0"
            >
              {site.tagline} Built across{" "}
              <span className="text-paper">Next.js</span>,{" "}
              <span className="text-paper">Laravel</span>,{" "}
              <span className="text-paper">Flutter</span>, and{" "}
              <span className="text-paper">Python</span> —{" "}
              <span className="text-paper">{stats.commits} commits</span> across{" "}
              <span className="text-paper">{stats.projects} repositories</span>,
              most of them authored end to end.
            </p>

            <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-control text-white transition-all duration-500 ease-expo hover:bg-blue-link"
              >
                View selected work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={site.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-control text-paper backdrop-blur-sm transition-all duration-500 ease-expo hover:border-white/30 hover:bg-white/[0.08]"
              >
                GitHub profile
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            </div>

            {/* Telemetry strip */}
            <div
              ref={chipsRef}
              className="mt-14 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {[
                { v: stats.projects, s: "", l: "Projects" },
                { v: stats.commits, s: "", l: "Commits" },
                { v: stats.soloRepos, s: "", l: "Solo repos" },
                { v: stats.tests, s: "+", l: "Tests" },
              ].map((stat) => (
                <div data-hero="chip" key={stat.l} className="opacity-0">
                  <StatCounter value={stat.v} suffix={stat.s} label={stat.l} />
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div
            data-hero="avatar"
            className="relative hidden shrink-0 opacity-0 lg:block"
          >
            <div
              ref={avatarRef}
              className="relative h-64 w-64 xl:h-80 xl:w-80"
            >
              <div className="absolute inset-0 rounded-[36px] bg-[linear-gradient(150deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] ring-1 ring-white/12" />
              <div className="absolute inset-[1.5px] overflow-hidden rounded-[34px] bg-graphite-1">
                <Image
                  src={site.github.avatar}
                  alt={site.name}
                  width={460}
                  height={460}
                  priority
                  className="h-full w-full object-cover opacity-90 grayscale-[35%]"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,113,227,0.3),transparent_60%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero="cue"
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-telemetry text-ink-3">Scroll</span>
        <ArrowDown className="h-4 w-4 text-ink-3" />
      </div>
    </section>
  );
}
