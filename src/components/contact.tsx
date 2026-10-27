"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/data/site";
import { useGsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight, GitHub, Mail } from "@/components/icons";

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    if (prefersReducedMotion()) {
      gsap.set(rootEl.querySelectorAll("[data-cta]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta='eyebrow']",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.expo,
          scrollTrigger: { trigger: rootEl, start: "top 75%", once: true },
        },
      );

      gsap.fromTo(
        "[data-cta='line']",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: EASE.expo,
          stagger: 0.1,
          scrollTrigger: { trigger: rootEl, start: "top 75%", once: true },
        },
      );

      gsap.fromTo(
        "[data-cta='button']",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.expo,
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: { trigger: rootEl, start: "top 75%", once: true },
        },
      );

      // Social row
      gsap.fromTo(
        "[data-cta='social']",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE.expo,
          stagger: 0.07,
          delay: 0.4,
          scrollTrigger: { trigger: rootEl, start: "top 75%", once: true },
        },
      );
    }, rootEl);

    return () => ctx.revert();
  }, root);

  return (
    <section
      ref={root}
      id="contact"
      className="grain relative overflow-hidden bg-black py-28 text-paper sm:py-40"
    >
      <div
        aria-hidden
        className="bloom left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.32),rgba(0,113,227,0)_70%)]"
      />

      <div className="container-x relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span data-cta="eyebrow" className="text-telemetry text-ink-3 opacity-0">
            06 — Contact
          </span>

          <h2 className="mt-6 text-display-xl text-white">
            <span data-cta="line" className="block opacity-0">
              Let&apos;s build
            </span>
            <span data-cta="line" className="block opacity-0">
              something
            </span>
            <span
              data-cta="line"
              className="block text-ink-3 opacity-0"
            >
              that lasts.
            </span>
          </h2>

          <p
            data-cta="button"
            className="mt-8 max-w-xl text-body text-ink-2 opacity-0"
          >
            I&apos;m open to internships, junior roles, and freelance work on AI
            tooling, web platforms, and mobile apps. The fastest way to reach me
            is GitHub or email.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="button"
              className="group inline-flex items-center gap-2.5 rounded-full bg-blue px-8 py-4 text-control text-white opacity-0 transition-all duration-500 ease-expo hover:bg-blue-link"
            >
              <GitHub className="h-4 w-4" />
              {site.github.handle}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={`mailto:${site.email}`}
              data-cta="button"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-control text-paper opacity-0 backdrop-blur-sm transition-all duration-500 ease-expo hover:border-white/35 hover:bg-white/[0.08]"
            >
              <Mail className="h-4 w-4" />
              Send an email
            </a>
          </div>

          {/* Socials */}
          <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
            {site.socials.map((s) => (
              <li key={s.label} data-cta="social" className="opacity-0">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-2"
                >
                  <span className="text-telemetry text-ink-3 transition-colors duration-300 group-hover:text-paper">
                    {s.label}
                  </span>
                  <span className="text-control text-paper link-sweep">
                    {s.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
