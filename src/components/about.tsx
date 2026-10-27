"use client";

import { site } from "@/data/site";
import { SplitHeading, Reveal } from "@/components/motion";
import { MapPin } from "@/components/icons";

/**
 * Journey timeline.
 *
 * TODO: replace the entries with your real milestones.
 */
const TIMELINE = [
  {
    period: "2026 · Now",
    title: "Building AI & safety systems",
    body: "TemplaFill, temuUNAIR, and SiBeni — AI extraction pipelines, campus lost-and-found matching, and offline-first industrial safety tooling.",
  },
  {
    period: "2026 · H1",
    title: "Full-stack product work",
    body: "IdentraStudio, bacaloka, and market_core — Laravel platforms with real auth, payments, realtime chat, and role-separated dashboards.",
  },
  {
    period: "2026 · Q1",
    title: "Mobile & frontend",
    body: "Flutter clients paired with Laravel APIs, plus Porto-Fifi — a portfolio with a Three.js hero and a Supabase-backed admin panel.",
  },
  {
    period: "2025 · Q4",
    title: "Where it started",
    body: "Learning web and mobile development, and building the first small things to learn how systems actually behave.",
  },
];

const FACTS = [
  { label: "Based in", value: site.location },
  { label: "Focus", value: "AI systems · Web · Mobile" },
  { label: "Working in", value: "TypeScript · PHP · Dart · Python" },
  { label: "Currently", value: site.availability },
];

export function About() {
  return (
    <section id="about" className="relative bg-white py-24 text-ink sm:py-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* Left: heading + bio */}
          <div>
            <span className="text-telemetry text-ink-3">05 — About</span>
            <SplitHeading className="mt-4 text-display text-ink">
              I build the parts that have to work.
            </SplitHeading>

            <Reveal className="mt-8 flex flex-col gap-5">
              <p data-reveal-child className="text-body text-ink-2">
                {site.bio}
              </p>
              <p data-reveal-child className="text-body text-ink-2">
                Most of my work sits where three things meet: an AI model that
                needs a reliable fallback, a database that has to stay correct
                under real usage, and an interface people can actually trust.
                I care about all three at once — a beautiful screen over a
                fragile backend is not a finished product.
              </p>
            </Reveal>

            {/* Facts grid */}
            <Reveal className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-black/[0.07]">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  data-reveal-child
                  className="flex flex-col gap-1.5 bg-white p-5"
                >
                  <span className="text-telemetry text-ink-3">{f.label}</span>
                  <span className="text-control text-ink">{f.value}</span>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Right: timeline */}
          <div className="relative">
            <span className="text-telemetry text-ink-3">The road so far</span>

            <Reveal className="mt-6 flex flex-col">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal-child
                  className="group relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Rail */}
                  <div className="relative flex w-4 shrink-0 justify-center">
                    <span className="absolute top-1.5 h-2.5 w-2.5 rounded-full bg-ink transition-all duration-500 ease-expo group-hover:scale-125 group-hover:bg-blue" />
                    {i < TIMELINE.length - 1 && (
                      <span className="absolute top-4 h-full w-px bg-black/10" />
                    )}
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <span className="text-telemetry text-ink-3">
                      {item.period}
                    </span>
                    <h3 className="mt-2 text-utility text-ink">{item.title}</h3>
                    <p className="mt-2.5 text-body text-[0.9375rem] leading-relaxed text-ink-2">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>

            <div className="mt-10 flex items-center gap-2 text-control text-ink-2">
              <MapPin className="h-4 w-4 text-ink-3" />
              {site.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
