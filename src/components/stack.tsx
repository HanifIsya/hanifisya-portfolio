"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitHeading, Reveal } from "@/components/motion";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";
import { Layers, Sparkle, Terminal, Code } from "@/components/icons";

/** Technologies actually used across the featured repos. */
const TECH = [
  "TypeScript",
  "Next.js 16",
  "React 19",
  "Tailwind CSS 4",
  "Laravel",
  "PHP",
  "Flutter",
  "Dart",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Turborepo",
  "GSAP",
  "Three.js",
  "Gemini",
  "DeepSeek",
  "RAG",
  "Tailwind",
  "Vite",
  "Redis",
];

const CAPABILITIES = [
  {
    icon: Sparkle,
    title: "AI systems that ship",
    body: "Retrieval-augmented extraction, dual-engine fallbacks, evaluation harnesses, and matching pipelines — designed to degrade gracefully when the model doesn't.",
    items: ["RAG pipelines", "LLM orchestration", "Evaluation & F1", "Fallback design"],
  },
  {
    icon: Layers,
    title: "Full-stack product engineering",
    body: "From Postgres schemas to the pixels on screen. Auth, payments, realtime chat, admin tooling, and the deployment pipeline that ties it together.",
    items: ["API design", "Auth & RLS", "Payments", "Admin tooling"],
  },
  {
    icon: Terminal,
    title: "Mobile that works offline",
    body: "Flutter clients paired with Laravel APIs, designed for field conditions where connectivity is unreliable and safety cannot wait for a network round-trip.",
    items: ["Flutter", "Offline-first", "REST APIs", "Push & sync"],
  },
  {
    icon: Code,
    title: "Quality as a habit",
    body: "Contracts written before code, 286 automated tests in a single repository, monorepo boundaries that keep things honest, and documentation that stays true.",
    items: ["Test suites", "Docs-first", "Monorepos", "CI/CD"],
  },
];

function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const track = trackRef.current;
    if (!track) return;
    if (prefersReducedMotion()) return;

    const tween = gsap.to(track, {
      x: "-50%",
      duration: 42,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % 50}%`,
      },
    });

    return () => {
      tween.kill();
    };
  }, trackRef);

  const row = [...TECH, ...TECH];

  return (
    <div className="mask-fade-x relative overflow-hidden py-8">
      <div ref={trackRef} className="flex w-max items-center gap-3">
        {row.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-telemetry text-ink-2"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="text-telemetry text-ink-3">03 — Capabilities</span>
          <SplitHeading className="mt-4 text-display text-ink">
            A stack built by shipping, not by listing.
          </SplitHeading>
          <p className="mt-6 text-body text-ink-2">
            Every technology below is one I have actually used in a repository
            above. Nothing here is aspirational.
          </p>
        </div>
      </div>

      <TechMarquee />

      {/* Capability cards */}
      <div className="container-x">
        <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                data-reveal-child
                className="group relative flex flex-col rounded-[28px] bg-white p-7 ring-1 ring-black/[0.06] transition-all duration-500 ease-expo hover:ring-black/12 sm:p-9"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-paper text-ink transition-colors duration-500 group-hover:bg-blue group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-6 text-utility text-ink">{cap.title}</h3>
                <p className="mt-3 text-body text-[0.9375rem] leading-relaxed text-ink-2">
                  {cap.body}
                </p>

                <ul className="mt-7 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-6">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-paper px-3 py-1.5 text-telemetry text-ink-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
