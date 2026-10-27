"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { featured } from "@/data/projects";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";
import { SplitHeading } from "@/components/motion";
import { ProjectArtwork } from "@/components/project-artwork";
import { ArrowUpRight, GitHub } from "@/components/icons";

/**
 * Selected work — a pinned horizontal track.
 *
 * The section pins to the viewport while the track translates horizontally
 * with scroll. This is the "chapter" that carries the three flagship
 * projects, and it is the single most cinematic moment on the site.
 */
export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (prefersReducedMotion()) {
      gsap.set(track, { x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 80);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Progress indicator
      gsap.fromTo(
        "[data-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="grain relative overflow-hidden bg-paper py-20 text-ink sm:py-24"
    >
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-telemetry text-ink-3">01 — Selected work</span>
            <SplitHeading className="mt-4 text-display text-ink">
              Three things I built end to end.
            </SplitHeading>
          </div>
          <p className="max-w-sm text-body text-ink-2">
            Each of these was designed, documented, implemented, and shipped by me
            alone — from the first architecture decision to the last migration.
          </p>
        </div>
      </div>

      {/* Pinned track */}
      <div className="mt-4 overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-[clamp(1.25rem,5vw,2.5rem)] will-change-transform"
        >
          {featured.map((project, i) => (
            <article
              key={project.name}
              className="group relative w-[min(88vw,880px)] shrink-0"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] sm:w-[min(80vw,880px)]">
                <div className="relative h-56 overflow-hidden sm:h-72">
                  <ProjectArtwork project={project} />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent_55%)]" />
                  <span className="absolute left-6 top-6 rounded-full bg-black/45 px-3 py-1.5 text-telemetry text-white/85 backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-6 left-6 rounded-full bg-white/15 px-3 py-1.5 text-telemetry text-white backdrop-blur-md">
                    {project.domain}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="text-product text-ink">{project.title}</h3>
                    <span className="text-telemetry text-ink-3">
                      {project.commits} commits
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-body text-ink-2">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-black/[0.07] py-6">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-1">
                        <dt className="text-telemetry text-ink-3">{m.label}</dt>
                        <dd className="text-utility text-ink">{m.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-paper px-3 py-1.5 text-telemetry text-ink-2"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-5 pt-8">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/repo inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-control text-white transition-colors duration-500 ease-expo hover:bg-blue"
                    >
                      <GitHub className="h-4 w-4" />
                      View source
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/live inline-flex items-center gap-1.5 text-control text-blue transition-colors duration-300 hover:text-blue-link"
                      >
                        Live site
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Progress rail */}
      <div className="container-x mt-10">
        <div className="h-px w-full bg-black/10">
          <div
            data-progress
            className="h-px w-full origin-left scale-x-0 bg-blue"
          />
        </div>
      </div>
    </section>
  );
}
