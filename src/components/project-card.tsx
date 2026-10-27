"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import type { Project } from "@/data/projects";
import { useGsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { ProjectArtwork } from "@/components/project-artwork";
import { ArrowUpRight, GitHub } from "@/components/icons";

export function ProjectCard({
  project,
  index,
  children,
}: {
  project: Project;
  index: number;
  children?: ReactNode;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Pointer-driven 3D tilt + image scale.
  useGsap(() => {
    const card = cardRef.current;
    const art = artRef.current;
    const inner = innerRef.current;
    if (!card || !art || !inner) return;

    if (prefersReducedMotion()) return;

    const rotX = gsap.quickTo(inner, "rotationX", {
      duration: 0.5,
      ease: EASE.quart,
    });
    const rotY = gsap.quickTo(inner, "rotationY", {
      duration: 0.5,
      ease: EASE.quart,
    });
    const scale = gsap.quickTo(art, "scale", {
      duration: 0.7,
      ease: EASE.quart,
    });

    const onMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 7);
      rotX(-py * 7);
      scale(1.05);
    };

    const onLeave = () => {
      rotX(0);
      rotY(0);
      scale(1);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, cardRef);

  return (
    <article
      ref={cardRef}
      className="group relative h-full [perspective:1200px]"
      data-reveal-child
    >
      <div
        ref={innerRef}
        className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-graphite-1 ring-1 ring-white/10 transition-colors duration-500 ease-expo group-hover:ring-white/20 [transform-style:preserve-3d]"
      >
        {/* Artwork */}
        <div
          ref={artRef}
          className="relative h-44 shrink-0 overflow-hidden sm:h-52"
        >
          <ProjectArtwork project={project} />

          {/* Index badge */}
          <span className="absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-telemetry text-white/80 backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Domain badge */}
          <span className="absolute right-4 top-4 rounded-full bg-white/12 px-2.5 py-1 text-telemetry text-white/90 backdrop-blur-md">
            {project.domain}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-utility text-white">{project.title}</h3>
            <span
              className="mt-1 shrink-0 text-telemetry text-ink-3"
              title={`${project.commits} of ${project.totalCommits} commits authored`}
            >
              {project.commits} commits
            </span>
          </div>

          <p className="mt-3 text-body text-[0.9375rem] leading-relaxed text-ink-2">
            {project.tagline}
          </p>

          {children}

          {/* Stack chips */}
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 px-2.5 py-1 text-telemetry text-ink-3 transition-colors duration-500 group-hover:border-white/20"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Spacer pushes the footer to the bottom of the card. */}
          <div aria-hidden className="min-h-4 flex-1" />

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-4">
            <div className="flex items-center gap-4">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/git inline-flex items-center gap-1.5 text-telemetry text-ink-2 transition-colors duration-300 hover:text-white"
              >
                <GitHub className="h-3.5 w-3.5" />
                Source
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live inline-flex items-center gap-1.5 text-telemetry text-ink-2 transition-colors duration-300 hover:text-white"
                >
                  Live
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                </a>
              )}
            </div>

            {project.solo ? (
              <span className="rounded-full border border-blue/30 bg-blue/10 px-2.5 py-1 text-telemetry text-blue-lite">
                Solo
              </span>
            ) : (
              <span className="text-telemetry text-ink-3">
                {project.commits}/{project.totalCommits}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
