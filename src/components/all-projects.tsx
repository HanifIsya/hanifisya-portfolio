"use client";

import { useMemo, useState } from "react";
import { projects, teamCredits, type Project } from "@/data/projects";
import { SplitHeading, Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { ArrowUpRight } from "@/components/icons";

const FILTERS = [
  "All",
  "AI / ML",
  "Platform",
  "Mobile",
  "Web",
  "Marketplace",
] as const;

type Filter = (typeof FILTERS)[number];

/** Bento span classes per project size. */
const spanClass: Record<Project["span"], string> = {
  wide: "sm:col-span-2",
  tall: "sm:col-span-1",
  normal: "sm:col-span-1",
};

export function AllProjects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.domain === filter),
    [filter],
  );

  return (
    <section
      id="projects"
      className="grain relative bg-black py-24 text-paper sm:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-telemetry text-ink-3">02 — All work</span>
            <SplitHeading className="mt-4 text-display text-white">
              Ten repositories, all mine to answer for.
            </SplitHeading>
            <p className="mt-6 text-body text-ink-2">
              Every project below is one I committed to. The badge shows how much
              of the codebase I personally wrote — most are the sole author.
            </p>
          </div>

          {/* Filter */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by domain"
          >
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  className={[
                    "rounded-full border px-4 py-2 text-telemetry transition-all duration-500 ease-expo",
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-white/12 text-ink-3 hover:border-white/30 hover:text-paper",
                  ].join(" ")}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento grid */}
        <div
          key={filter}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project, i) => (
            <div
              key={project.name}
              className={[
                spanClass[project.span],
                "animate-[fadeUp_0.6s_var(--ease-expo)_both]",
              ].join(" ")}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* Team contribution note */}
        {filter === "All" && (
          <Reveal className="mt-14">
            <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <span className="text-telemetry text-ink-3">Team contribution</span>
                <p className="mt-2 text-body text-paper">
                  {teamCredits[0].name} — contributed to{" "}
                  <span className="text-ink-3">{teamCredits[0].org}</span> as the
                  sole author across {teamCredits[0].commits} commits.
                </p>
              </div>
              <a
                href={teamCredits[0].repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2.5 text-control text-paper transition-all duration-500 ease-expo hover:border-white/35 hover:bg-white/[0.06] sm:self-auto"
              >
                Open repository
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
