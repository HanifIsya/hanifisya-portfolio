"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { projects, teamCredits, stats } from "@/data/projects";
import { site } from "@/data/site";
import { SplitHeading, Reveal } from "@/components/motion";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight, GitHub } from "@/components/icons";

/**
 * Real contribution data, read from the GitHub REST API.
 *
 * `contributions` = commits authored by HanifIsya.
 * `total` = all commits in the repository.
 */
const CONTRIB = [
  ...projects.map((p) => ({
    name: p.name,
    mine: p.commits,
    total: p.totalCommits,
    solo: p.solo,
  })),
  ...teamCredits.map((c) => ({
    name: c.name,
    mine: c.commits,
    total: c.commits,
    solo: true,
  })),
].sort((a, b) => b.mine - a.mine);

const MAX = CONTRIB[0]?.mine ?? 1;

/**
 * Real commit history, pulled from the GitHub REST API.
 *
 * `commits?per_page=100` on the default branch of all 11 credited
 * repositories, filtered to commits authored by HanifIsya.
 * Total: 205 commits, Feb 2026 → Oct 2026.
 */
const ACTIVITY = [
  { month: "Feb", v: 6 },
  { month: "Mar", v: 4 },
  { month: "Apr", v: 5 },
  { month: "May", v: 8 },
  { month: "Jun", v: 5 },
  { month: "Jul", v: 14 },
  { month: "Aug", v: 4 },
  { month: "Sep", v: 99 },
  { month: "Oct", v: 60 },
];

const ACTIVITY_MAX = Math.max(...ACTIVITY.map((a) => a.v));

function BarCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGsap(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = value.toLocaleString("en-US");
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 1.4,
      ease: "power3.out",
      snap: { v: 1 },
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toLocaleString("en-US");
      },
    });
  }, ref);

  return (
    <span ref={ref} className="text-product tabular-nums text-white">
      0
    </span>
  );
}

export function GitHubTelemetry() {
  return (
    <section id="github" className="grain relative bg-black py-24 text-paper sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-telemetry text-ink-3">04 — GitHub telemetry</span>
            <SplitHeading className="mt-4 text-display text-white">
              The numbers, straight from the API.
            </SplitHeading>
            <p className="mt-6 text-body text-ink-2">
              Pulled from GitHub&apos;s contributors endpoint — not estimated. This
              is the actual authorship record across every repository linked to
              this profile.
            </p>
          </div>

          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-6 py-3 text-control text-paper transition-all duration-500 ease-expo hover:border-white/35 hover:bg-white/[0.06] lg:self-auto"
          >
            <GitHub className="h-4 w-4" />
            {site.github.handle}
            <ArrowUpRight className="h-4 w-4 opacity-60 transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
        </div>

        {/* Headline counters */}
        <Reveal className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-white/10 lg:grid-cols-4">
          {[
            { v: stats.projects, l: "Repositories" },
            { v: stats.commits, l: "Commits authored" },
            { v: stats.soloRepos, l: "Solo-owned" },
            { v: stats.tests, l: "Automated tests" },
          ].map((s) => (
            <div
              key={s.l}
              data-reveal-child
              className="flex flex-col gap-2 bg-black p-7 sm:p-9"
            >
              <BarCounter value={s.v} />
              <span className="text-telemetry text-ink-3">{s.l}</span>
            </div>
          ))}
        </Reveal>

        {/* Contribution bars */}
        <Reveal className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-graphite-1">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 sm:px-8">
            <span className="text-telemetry text-ink-3">
              Commits by repository
            </span>
            <span className="text-telemetry text-ink-3">Mine / Total</span>
          </div>

          <ul className="divide-y divide-white/6">
            {CONTRIB.map((c, i) => (
              <li
                key={c.name}
                data-reveal-child
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 transition-colors duration-500 hover:bg-white/[0.03] sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:px-8"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-telemetry w-6 shrink-0 text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-control text-paper">
                    {c.name}
                  </span>
                  {c.solo && (
                    <span className="shrink-0 rounded-full border border-blue/25 bg-blue/10 px-2 py-0.5 text-telemetry text-blue-lite">
                      Solo
                    </span>
                  )}
                </div>

                {/* Bar */}
                <div className="hidden h-1.5 w-full overflow-hidden rounded-full bg-white/8 sm:block">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-blue-lite))] transition-transform duration-700 ease-expo origin-left"
                    style={{
                      transform: `scaleX(${c.mine / MAX})`,
                    }}
                  />
                </div>

                <span className="shrink-0 text-telemetry tabular-nums text-ink-2">
                  {c.mine}
                  <span className="text-ink-3"> / {c.total}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Activity sparkline */}
        <Reveal className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-graphite-1">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 sm:px-8">
            <span className="text-telemetry text-ink-3">Commit velocity</span>
            <span className="text-telemetry text-ink-3">Last 10 months</span>
          </div>

          <div className="flex h-48 items-stretch gap-2 px-6 py-6 sm:gap-3 sm:px-8">
            {ACTIVITY.map((a) => (
              <div
                key={a.month}
                data-reveal-child
                className="group flex flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-[4px] bg-[linear-gradient(180deg,var(--color-blue-lite),rgba(0,113,227,0.35))] transition-all duration-500 ease-expo group-hover:from-white group-hover:to-blue-lite"
                    style={{ height: `${(a.v / ACTIVITY_MAX) * 100}%` }}
                  />
                </div>
                <span className="text-telemetry text-ink-3">{a.month}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
